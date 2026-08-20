/**
 * The autonomous loop, one pass.
 *
 *   ingest (separate cron)  →  [ this script: select → brief → validate → render → upload → publish ]
 *
 * Runs in GitHub Actions (server-side, free). Idempotent per day: it derives a
 * stable idempotency key from the chosen brief + date, so re-runs never
 * double-post. Honours the IG_PUBLISH_ENABLED kill switch end-to-end.
 *
 * Degradation ladder — the loop is designed to still produce something useful
 * when the optional pieces are absent:
 *   no OPENAI_API_KEY  → hand-written evergreen script from the content bank
 *   no PEXELS_API_KEY  → designed provider (the branded default) instead of stock
 *   no Supabase creds  → only allowed with DRY_RUN/LOOP_OFFLINE; evergreen-only,
 *                        renders to loop-artifacts/ and publishes nothing
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PUBLISH_SECRET,
 *      OPENAI_API_KEY (optional), PEXELS_API_KEY (optional),
 *      VISUAL_PROVIDER (default "designed"), DRY_RUN ("true" = render+log, no publish),
 *      LOOP_OFFLINE ("true" = never touch Supabase), CONTENT_STRICT ("false" to
 *      downgrade script-quality errors to warnings), RUN_DATE (YYYY-MM-DD).
 */
import { mkdtempSync, mkdirSync, writeFileSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Signal } from './score.ts'
import { selectContent, NEWS_BAR } from './select.ts'
import { buildEvergreenBrief, buildNewsBrief, type ProductionBrief } from './brief.ts'
import { TARGET_AUDIENCE } from './contentBank.ts'
import { validateBrief, formatReport } from './scriptQuality.ts'
import { uploadReel } from './storage.ts'
import { renderBrief, grabFrame } from '../render/src/render.ts'

const RUN_DATE = process.env.RUN_DATE || new Date().toISOString().slice(0, 10)
const DRY_RUN = process.env.DRY_RUN === 'true'
const OFFLINE = process.env.LOOP_OFFLINE === 'true'
const STRICT = process.env.CONTENT_STRICT !== 'false'
const ARTIFACT_DIR = join(process.cwd(), 'loop-artifacts')

function log(msg: string, extra?: unknown) {
  console.log(`[loop ${RUN_DATE}] ${msg}${extra ? ' ' + JSON.stringify(extra) : ''}`)
}

async function readSignals(admin: SupabaseClient): Promise<Signal[]> {
  const since = new Date(Date.now() - 3 * 86400_000).toISOString()
  const { data, error } = await admin
    .from('ingested_signals')
    .select('id, source:provider_id, source_label, title, summary, url, published_at, topic_tags')
    .gte('published_at', since)
    .order('published_at', { ascending: false })
    .limit(200)
  if (error) throw new Error(`read signals: ${error.message}`)
  return (data ?? []) as Signal[]
}

async function main() {
  const url = process.env.SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  const useSupabase = !OFFLINE && !!url && !!service

  if (!useSupabase) {
    if (!DRY_RUN && !OFFLINE) {
      throw new Error(
        'SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are required to publish. ' +
        'Set DRY_RUN=true (or LOOP_OFFLINE=true) to render an evergreen sample without them.',
      )
    }
    log('running WITHOUT Supabase — evergreen only, nothing will be published')
  }

  const admin = useSupabase ? createClient(url!, service!, { auth: { persistSession: false } }) : null

  // 1. signals (skipped entirely when offline)
  const signals = admin ? await readSignals(admin) : []
  log(`fetched ${signals.length} signals`)

  // 2. HYBRID selection. News only wins if it clears a strict career-skill bar
  //    AND is fresh; otherwise the evergreen how-to backbone runs.
  const decision = selectContent({ signals, runDate: RUN_DATE, nowMs: Date.now() })
  log(`mode: ${decision.mode.toUpperCase()}`, { reason: decision.reason })
  for (const r of decision.rejected) {
    log('news rejected', { title: r.title.slice(0, 70), career: r.careerScore, why: r.reason })
  }

  // persist ranked opportunities (audit + future learning) regardless of choice
  if (admin && decision.ranked.length) {
    const { error } = await admin.from('content_opportunities').upsert(
      decision.ranked.slice(0, 20).map((o) => ({
        signal_id: o.id, priority: o.priority, relevance: o.relevance, freshness: o.freshness,
        selection_reason: o.selection_reason, title: o.title, url: o.url, run_date: RUN_DATE,
      })), { onConflict: 'signal_id,run_date' },
    )
    if (error) log('opportunity audit write failed (non-fatal)', { err: error.message })
  }

  // 3. brief
  const brief: ProductionBrief = decision.mode === 'news'
    ? await buildNewsBrief(decision.opportunity!)
    : await buildEvergreenBrief(decision.topic!)
  log('brief built', { mode: brief.mode, hook: brief.hook, segments: brief.segments.length })

  // 4. script quality gate — a valid-shaped brief can still be off-brand filler
  const quality = validateBrief(brief)
  console.log(formatReport(quality))
  if (!quality.ok && STRICT) {
    writeArtifacts(brief, decision, quality, null)
    throw new Error(`script quality gate failed (${quality.errors.length} errors). Set CONTENT_STRICT=false to render anyway.`)
  }

  // idempotency: one post per day, keyed by the chosen brief + date
  const idemKey = `${RUN_DATE}:${brief.id}`
  if (admin) {
    const { data: already } = await admin
      .from('instagram_publish_log').select('status').eq('idempotency_key', idemKey).maybeSingle()
    if (already?.status === 'published') { log('already published today — done'); return }
  }

  // 5. render
  const work = mkdtempSync(join(tmpdir(), 'jf-loop-'))
  const out = join(work, `${brief.id}.mp4`)
  await renderBrief(brief, out)
  log('rendered', { out })

  // 6. drop the render, a poster frame and the decision into a stable dir so CI
  //    can upload them as a downloadable artifact (inspectable without publishing).
  writeArtifacts(brief, decision, quality, out)

  if (DRY_RUN) { log('DRY_RUN — skipping upload + publish'); return }
  if (!admin) { log('offline — skipping upload + publish'); return }

  // 7. upload to public URL
  const videoUrl = await uploadReel(out, `${RUN_DATE}_${brief.id}`)
  log('uploaded', { videoUrl })

  // 8. publish (honours IG_PUBLISH_ENABLED inside the function)
  const res = await fetch(`${url}/functions/v1/publish-instagram`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-publish-secret': process.env.PUBLISH_SECRET ?? '' },
    body: JSON.stringify({ video_url: videoUrl, caption: brief.caption, media_type: 'REELS', idempotency_key: idemKey }),
  })
  const body = (await res.json()) as { error?: unknown }
  log('publish result', body)
  if (!res.ok || body.error) process.exitCode = 1
}

function writeArtifacts(
  brief: ProductionBrief,
  decision: ReturnType<typeof selectContent>,
  quality: ReturnType<typeof validateBrief>,
  videoPath: string | null,
) {
  try {
    mkdirSync(ARTIFACT_DIR, { recursive: true })
    if (videoPath) {
      copyFileSync(videoPath, join(ARTIFACT_DIR, `${brief.id}.mp4`))
      grabFrame(videoPath, 1.2, join(ARTIFACT_DIR, 'poster.jpg'))
    }
    writeFileSync(join(ARTIFACT_DIR, 'decision.json'), JSON.stringify({
      run_date: RUN_DATE,
      audience: TARGET_AUDIENCE,
      mode: brief.mode,
      news_bar: NEWS_BAR,
      selection_reason: decision.reason,
      rejected_news: decision.rejected,
      source: decision.opportunity
        ? { id: decision.opportunity.id, title: decision.opportunity.title, careerScore: decision.opportunity.careerScore, families: decision.opportunity.careerFamilies, url: decision.opportunity.url }
        : { evergreen: true, topic: decision.topic?.id, pillar: decision.topic?.pillar },
      quality,
      brief,
      visual_provider: process.env.VISUAL_PROVIDER || 'designed',
      dry_run: DRY_RUN,
      rendered: Boolean(videoPath),
    }, null, 2))
    log('artifact ready', { dir: 'loop-artifacts' })
  } catch (e) {
    log('artifact write skipped', { err: String(e) })
  }
}

main().catch((e) => { console.error('[loop] fatal', e); process.exit(1) })
