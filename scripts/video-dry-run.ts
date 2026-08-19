/**
 * Offline dry run of the content half of the loop: select → brief → quality gate.
 * No Supabase, no OpenAI (unless OPENAI_API_KEY happens to be set), no ffmpeg.
 *
 *   npm run video:dry-run
 *   npm run video:dry-run -- --date 2026-09-01
 *   npm run video:dry-run -- --signals path/to/signals.json
 *
 * Writes loop-artifacts/decision.json and exits non-zero if the script would
 * not pass the quality gate — so CI can run it before spending render minutes.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { selectContent, NEWS_BAR } from '../orchestrator/select.ts'
import { buildEvergreenBrief, buildNewsBrief } from '../orchestrator/brief.ts'
import { TARGET_AUDIENCE } from '../orchestrator/contentBank.ts'
import { validateBrief, formatReport } from '../orchestrator/scriptQuality.ts'
import type { Signal } from '../orchestrator/score.ts'

const argv = process.argv.slice(2)
const argOf = (name: string): string | undefined => {
  const i = argv.indexOf(`--${name}`)
  return i >= 0 ? argv[i + 1] : undefined
}

const runDate = argOf('date') ?? process.env.RUN_DATE ?? new Date().toISOString().slice(0, 10)
const signalsPath = argOf('signals')
const signals: Signal[] = signalsPath && existsSync(signalsPath)
  ? JSON.parse(readFileSync(signalsPath, 'utf8'))
  : []

if (signalsPath && !existsSync(signalsPath)) {
  console.error(`signals file not found: ${signalsPath}`)
  process.exit(1)
}

const decision = selectContent({ signals, runDate })
const brief = decision.mode === 'news'
  ? await buildNewsBrief(decision.opportunity!)
  : await buildEvergreenBrief(decision.topic!)
const quality = validateBrief(brief)

console.log(`\nJifunze.ai — content dry run (${runDate})`)
console.log(`audience   ${TARGET_AUDIENCE}`)
console.log(`signals    ${signals.length}${signalsPath ? ` from ${signalsPath}` : ' (none supplied — evergreen path)'}`)
console.log(`mode       ${decision.mode.toUpperCase()}`)
console.log(`why        ${decision.reason}`)
if (decision.rejected.length) {
  console.log(`\nrejected news (bar = ${NEWS_BAR}):`)
  for (const r of decision.rejected) console.log(`  [${r.careerScore.toFixed(2)}] ${r.title.slice(0, 60)}\n         ${r.reason}`)
}
console.log(`\nhook       ${brief.hook}`)
brief.segments.forEach((s, i) => console.log(`  ${i + 1}.       ${s}`))
console.log(`caption    ${brief.caption}`)
console.log(`\n${formatReport(quality)}\n`)

const dir = join(process.cwd(), 'loop-artifacts')
mkdirSync(dir, { recursive: true })
writeFileSync(join(dir, 'decision.json'), JSON.stringify({
  run_date: runDate, audience: TARGET_AUDIENCE, mode: brief.mode, news_bar: NEWS_BAR,
  selection_reason: decision.reason, rejected_news: decision.rejected,
  source: decision.opportunity
    ? { id: decision.opportunity.id, title: decision.opportunity.title, careerScore: decision.opportunity.careerScore, families: decision.opportunity.careerFamilies, url: decision.opportunity.url }
    : { evergreen: true, topic: decision.topic?.id, pillar: decision.topic?.pillar },
  quality, brief, dry_run: true, rendered: false,
}, null, 2))
console.log(`wrote loop-artifacts/decision.json`)

if (!quality.ok) process.exit(1)
