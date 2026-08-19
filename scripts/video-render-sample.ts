/**
 * Render one real video end to end, offline.
 *
 *   npm run video:render:designed      # branded default, $0, no keys needed
 *   npm run video:render:stock         # same treatment over Pexels B-roll
 *   npm run video:render:designed -- --date 2026-09-01
 *
 * Output lands in loop-artifacts/ (gitignored): the mp4, a poster.jpg for a
 * quick look, and decision.json explaining what was chosen and why.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { selectContent, NEWS_BAR } from '../orchestrator/select.ts'
import { buildEvergreenBrief, buildNewsBrief } from '../orchestrator/brief.ts'
import { TARGET_AUDIENCE } from '../orchestrator/contentBank.ts'
import { validateBrief, formatReport } from '../orchestrator/scriptQuality.ts'
import { renderBrief, grabFrame } from '../render/src/render.ts'

const argv = process.argv.slice(2)
const argOf = (n: string) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : undefined }
const runDate = argOf('date') ?? process.env.RUN_DATE ?? new Date().toISOString().slice(0, 10)

const decision = selectContent({ signals: [], runDate })
const brief = decision.mode === 'news'
  ? await buildNewsBrief(decision.opportunity!)
  : await buildEvergreenBrief(decision.topic!)

const quality = validateBrief(brief)
console.log(formatReport(quality))
if (!quality.ok && process.env.CONTENT_STRICT !== 'false') {
  console.error('refusing to render a script that fails the quality gate (CONTENT_STRICT=false to override)')
  process.exit(1)
}

const dir = join(process.cwd(), 'loop-artifacts')
mkdirSync(dir, { recursive: true })
const out = join(dir, `${brief.id}.mp4`)

await renderBrief(brief, out)
const poster = grabFrame(out, 1.2, join(dir, 'poster.jpg'))

writeFileSync(join(dir, 'decision.json'), JSON.stringify({
  run_date: runDate, audience: TARGET_AUDIENCE, mode: brief.mode, news_bar: NEWS_BAR,
  selection_reason: decision.reason,
  source: { evergreen: decision.mode === 'evergreen', topic: decision.topic?.id, pillar: decision.topic?.pillar },
  quality, brief,
  visual_provider: process.env.VISUAL_PROVIDER || 'designed',
  dry_run: true, rendered: true,
}, null, 2))

console.log(`\nwrote ${out}`)
if (poster) console.log(`wrote ${poster}`)
console.log('wrote loop-artifacts/decision.json')
