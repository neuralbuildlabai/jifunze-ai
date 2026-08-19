/**
 * The autonomous loop, one pass.
 *
 *   ingest (separate cron)  →  [ this script: score → brief → render → upload → publish ]
 *
 * Runs in GitHub Actions (server-side, free). Idempotent per day: it derives a
 * stable idempotency key from the chosen signal + date, so re-runs never
 * double-post. Honours the IG_PUBLISH_ENABLED kill switch end-to-end.
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PUBLISH_SECRET,
 *      OPENAI_API_KEY (optional), PEXELS_API_KEY (optional),
 *      VISUAL_PROVIDER (default stock), DRY_RUN ("true" = render+log, no publish),
 *      RUN_DATE (YYYY-MM-DD, injected by CI for determinism).
 */
import { mkdtempSync, mkdirSync, writeFileSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { scoreSignals, type Signal } from './score.ts'
import { buildEvergreenBrief, buildNewsBrief } from './brief.ts'
import { pickEvergreen } from './contentBank.ts'
import { uploadReel } from './storage.ts'
import { renderBrief } from '../render/src/render.ts'

const RUN_DATE = (process.env.RUN_DATE || new Date().toISOString().slice(0, 10))
const DRY_RUN = process.env.DRY_RUN === 'true'

function log(msg: string, extra?: unknown) {
  console.log(`[loop ${RUN_DATE}] ${msg}${extra ? ' ' + JSON.stringify(extra) : ''}`)
}

async function main() {
  const url = process.env.SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !service) throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY required')
  const admin = createClient(url, service, { auth: { persistSession: false } })

  // 1. recent signals (last 3 days)
  const since = new Date(Date.now() - 3 * 86400_000).toISOString()
  const { data: rows, error } = await admin
    .from('ingested_signals')
    .select('id, source:provider_id, source_label, title, summary, url, published_at, topic_tags')
    .gte('published_at', since)
    .order('published_at', { ascending: false })
    .limit(200)
  if (error) throw new Error(`read signals: ${error.message}`)
  const signals = (rows ?? []) as Signal[]
  log(`fetched ${signals.length} signals`)
  if (!signals.length) { log('no signals — nothing to do'); return }

  // 2. HYBRID selection.
  // News only wins if it clears a strict CAREER-SKILL bar and is fresh; otherwise
  // the evergreen how-to backbone runs (brand-right, always useful).
  const NEWS_BAR = 0.66      // careerScore threshold (>= 2 genuine career terms)
  const ranked = scoreSignals(signals, Date.now())
  const newsTop = ranked.find((o) => o.careerScore >= NEWS_BAR && o.freshness >= 0.5) || null

  // persist ranked opportunities (audit + future learning) regardless of choice
  if (ranked.length) {
    await admin.from('content_opportunities').upsert(
      ranked.slice(0, 20).map((o) => ({
        signal_id: o.id, priority: o.priority, relevance: o.relevance, freshness: o.freshness,
        selection_reason: o.selection_reason, title: o.title, url: o.url, run_date: RUN_DATE,
      })), { onConflict: 'signal_id,run_date' },
    )
  }

  let brief
  if (newsTop) {
    log('mode: NEWS (cleared career bar)', { id: newsTop.id, career: newsTop.careerScore, title: newsTop.title.slice(0, 60) })
    brief = await buildNewsBrief(newsTop)
  } else {
    const topic = pickEvergreen(RUN_DATE)
    log('mode: EVERGREEN (no news cleared the bar)', { topic: topic.id, pillar: topic.pillar })
    brief = await buildEvergreenBrief(topic)
  }
  log('brief built', { mode: brief.mode, hook: brief.hook, segments: brief.segments.length })

  // idempotency: one post per day, keyed by the chosen brief + date
  const idemKey = `${RUN_DATE}:${brief.id}`
  const { data: already } = await admin
    .from('instagram_publish_log').select('status').eq('idempotency_key', idemKey).maybeSingle()
  if (already?.status === 'published') { log('already published today — done'); return }

  // 5. render
  const work = mkdtempSync(join(tmpdir(), 'jf-loop-'))
  const out = join(work, `${brief.id}.mp4`)
  await renderBrief(brief as any, out)
  log('rendered', { out })

  // Also drop the render + the decision into a stable dir so CI can upload them
  // as a downloadable artifact (visible in DRY_RUN without publishing anything).
  try {
    const artDir = join(process.cwd(), 'loop-artifacts')
    mkdirSync(artDir, { recursive: true })
    copyFileSync(out, join(artDir, `${brief.id}.mp4`))
    writeFileSync(join(artDir, 'decision.json'), JSON.stringify({
      run_date: RUN_DATE,
      mode: brief.mode,
      source: newsTop ? { id: newsTop.id, title: newsTop.title, careerScore: newsTop.careerScore, url: newsTop.url } : { evergreen: true },
      brief,
      dry_run: DRY_RUN,
    }, null, 2))
    log('artifact ready', { dir: 'loop-artifacts' })
  } catch (e) {
    log('artifact copy skipped', { err: String(e) })
  }

  if (DRY_RUN) { log('DRY_RUN — skipping upload + publish'); return }

  // 6. upload to public URL
  const videoUrl = await uploadReel(out, `${RUN_DATE}_${brief.id}`)
  log('uploaded', { videoUrl })

  // 7. publish (honours IG_PUBLISH_ENABLED inside the function)
  const res = await fetch(`${url}/functions/v1/publish-instagram`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-publish-secret': process.env.PUBLISH_SECRET ?? '' },
    body: JSON.stringify({ video_url: videoUrl, caption: brief.caption, media_type: 'REELS', idempotency_key: idemKey }),
  })
  const body = await res.json()
  log('publish result', body)
  if (!res.ok || body.error) process.exitCode = 1
}

main().catch((e) => { console.error('[loop] fatal', e); process.exit(1) })
