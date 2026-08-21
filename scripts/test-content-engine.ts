/**
 * Content engine test suite — the guard rail on the hybrid selector, the script
 * quality gate and the visual provider contract.
 *
 *   npm run test
 *
 * Deliberately dependency-free (node:assert + tsx, matching the other
 * scripts/test-*.ts in this repo) and fully offline: no Supabase, no OpenAI, no
 * Pexels, no ffmpeg. It must be runnable on a laptop with no secrets at all.
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { scoreSignals, careerRelevance, careerFamilies, offBrandVeto, type Signal } from '../orchestrator/score.ts'
import { checkHumanApproval } from '../orchestrator/approvalGate.ts'
import { findProhibitedClaims } from '../src/social/brand.ts'
import { selectContent, NEWS_BAR } from '../orchestrator/select.ts'
import { CONTENT_BANK, pickEvergreen, TARGET_AUDIENCE } from '../orchestrator/contentBank.ts'
import { validateBrief } from '../orchestrator/scriptQuality.ts'
import { buildEvergreenBrief, buildNewsBrief } from '../orchestrator/brief.ts'
import { selectVisualProvider } from '../render/providers/registry.ts'
import { stockQueryFor } from '../render/providers/stockProvider.ts'
import { buildAss, END_CARD_SEC, accentLine } from '../render/src/captions.ts'

// no API keys in tests: every path here must be the $0 path
delete process.env.OPENAI_API_KEY

let passed = 0
const failures: string[] = []
async function test(name: string, fn: () => void | Promise<void>) {
  try { await fn(); passed++; console.log(`  ok  ${name}`) }
  catch (err) { failures.push(`${name}: ${(err as Error).message}`); console.log(`  FAIL ${name}\n       ${(err as Error).message}`) }
}

const RUN_DATE = '2026-08-19'
const nowMs = Date.parse('2026-08-19T12:00:00Z')
const fresh = new Date(nowMs - 4 * 3600_000).toISOString()
const stale = new Date(nowMs - 8 * 86400_000).toISOString()

const signal = (over: Partial<Signal>): Signal => ({
  id: 'sig-1', source: 'rss', source_label: 'Test', title: '', summary: '', url: 'https://example.com/a',
  published_at: fresh, topic_tags: [], ...over,
})

// --- news gate: the stories that must NEVER become a Jifunze video ----------
const WEAK_NEWS: Array<[string, string]> = [
  ['OpenAI launches new teen safety controls', 'Parents get new parental control tools for teens using ChatGPT.'],
  ['Celebrity chef launches AI recipe app', 'A red carpet launch party for the celebrity backed app.'],
  ['AI takes centre stage in the election', 'The president and congress debated AI on the campaign trail.'],
  ['Church unveils AI nativity display for Christmas', 'A festival installation at the local church.'],
  ['AI startup raises $200m at a $3bn valuation', 'Series B funding round values the startup at three billion.'],
  ['OpenAI unveils its fastest model yet', 'The company announces GPT successor with a benchmark record.'],
  ['AI could take your jobs, report warns', 'A broad report says AI will affect jobs everywhere.'],
]

// --- news gate: the stories that SHOULD become a lesson ---------------------
const STRONG_NEWS: Array<[string, string]> = [
  ['Employers are increasingly using AI to screen resumes', 'Recruiters say applicant tracking systems now rank CVs before any human reads them.'],
  ['Remote work hiring rebounds for junior roles', 'Employers reopened remote job postings and changed how they interview candidates.'],
  ['Freelance platform changes its fees for new freelancers', 'Upwork adjusted rates, affecting how a freelancer prices gig work.'],
]

console.log('\ncontent engine\n')

for (const [title, summary] of WEAK_NEWS) {
  await test(`rejects weak news: "${title.slice(0, 44)}"`, () => {
    const s = signal({ title, summary })
    assert.ok(careerRelevance(s) < NEWS_BAR, `careerRelevance ${careerRelevance(s)} should be below ${NEWS_BAR}`)
    const d = selectContent({ signals: [s], runDate: RUN_DATE, nowMs })
    assert.equal(d.mode, 'evergreen', 'weak news must fall back to evergreen')
  })
}

for (const [title, summary] of STRONG_NEWS) {
  await test(`accepts career news: "${title.slice(0, 44)}"`, () => {
    const s = signal({ title, summary })
    assert.ok(careerRelevance(s) >= NEWS_BAR, `careerRelevance ${careerRelevance(s)} should clear ${NEWS_BAR} (families: ${careerFamilies(s).join(',')})`)
    const d = selectContent({ signals: [s], runDate: RUN_DATE, nowMs })
    assert.equal(d.mode, 'news')
    assert.equal(d.opportunity?.title, title)
  })
}

await test('no signals at all falls back to evergreen', () => {
  const d = selectContent({ signals: [], runDate: RUN_DATE, nowMs })
  assert.equal(d.mode, 'evergreen')
  assert.ok(d.topic, 'an evergreen topic must be chosen')
  assert.match(d.reason, /no usable signals/)
})

await test('stale career news does not win', () => {
  const s = signal({ title: STRONG_NEWS[0][0], summary: STRONG_NEWS[0][1], published_at: stale })
  const d = selectContent({ signals: [s], runDate: RUN_DATE, nowMs })
  assert.equal(d.mode, 'evergreen')
  assert.ok(d.rejected.some((r) => /stale/.test(r.reason)), 'rejection reason should say stale')
})

await test('every rejected story explains why', () => {
  const signals = WEAK_NEWS.map(([title, summary], i) => signal({ id: `w${i}`, title, summary }))
  const d = selectContent({ signals, runDate: RUN_DATE, nowMs })
  assert.equal(d.mode, 'evergreen')
  assert.ok(d.rejected.length > 0, 'expected rejected candidates')
  for (const r of d.rejected) assert.ok(r.reason.trim().length > 8, `empty reason for ${r.title}`)
})

// REGRESSION (decision.json, 2026-08-18): this exact story was selected with
// relevance 1 by the pre-hybrid scorer and produced a caption with no lesson in
// it. It must never clear the gate again.
await test('regression: the ChatGPT-for-teens story can never be selected', () => {
  const s = signal({
    id: '85b691cc-2cae-4668-9c6c-de6ac2d0266b',
    title: 'OpenAI launches a safer ChatGPT for teens — years after teens started using it',
    summary: 'The company is rolling out a teen-focused ChatGPT experience with parental controls.',
    topic_tags: ['ai', 'tech', 'openai', 'teens'],
  })
  assert.equal(offBrandVeto(s), 'child/teen safety story')
  assert.equal(careerRelevance(s), 0, 'a vetoed story must score 0 career relevance')
  const decision = selectContent({ signals: [s], runDate: RUN_DATE, nowMs })
  assert.equal(decision.mode, 'evergreen', 'must fall back to the evergreen backbone, not publish the news')
  assert.ok(decision.rejected.some((r) => /teen/.test(r.reason)), JSON.stringify(decision.rejected))
})

await test('off-brand veto beats keyword stuffing', () => {
  // stuffed with career words but still a teen-safety story
  const s = signal({
    title: 'Teen safety controls arrive for jobs, hiring, CV and interview tools',
    summary: 'Parental control features for teens across resume and recruitment products.',
  })
  assert.equal(offBrandVeto(s), 'child/teen safety story')
  assert.equal(careerRelevance(s), 0)
  assert.equal(selectContent({ signals: [s], runDate: RUN_DATE, nowMs }).mode, 'evergreen')
})

await test('one career concept is not enough (no substring double counting)', () => {
  const s = signal({ title: 'Jobs, job market and job search all shift', summary: 'A story about jobs.' })
  assert.deepEqual(careerFamilies(s), ['jobs'])
  assert.ok(careerRelevance(s) < NEWS_BAR)
})

await test('scoreSignals keeps an auditable reason on every row', () => {
  const signals = [...WEAK_NEWS, ...STRONG_NEWS].map(([title, summary], i) => signal({ id: `s${i}`, title, summary }))
  for (const o of scoreSignals(signals, nowMs)) {
    assert.ok(/^(usable|rejected):/.test(o.selection_reason), `bad reason: ${o.selection_reason}`)
  }
})

console.log('\nevergreen rotation\n')

await test('rotation covers the whole bank before repeating', () => {
  const seen = new Set<string>()
  for (let i = 0; i < CONTENT_BANK.length; i++) {
    const date = new Date(Date.parse('2026-08-19T00:00:00Z') + i * 86400_000).toISOString().slice(0, 10)
    seen.add(pickEvergreen(date).id)
  }
  assert.equal(seen.size, CONTENT_BANK.length, 'a topic repeated inside one full cycle')
})

await test('recently used topics are skipped', () => {
  const first = pickEvergreen(RUN_DATE)
  const second = pickEvergreen(RUN_DATE, { exclude: [first.id] })
  assert.notEqual(second.id, first.id)
})

await test('audience is recorded and non-empty', () => {
  assert.ok(TARGET_AUDIENCE.length > 20)
  assert.match(TARGET_AUDIENCE, /african and diaspora professionals/i)
})

console.log('\npublish-path gates\n')

await test('the human-approval gate refuses when no approval is recorded (default closed)', async () => {
  const reader = { latestDecisionFor: async () => ({ ok: true as const, row: null }) }
  const verdict = await checkHumanApproval(reader, 'some-item')
  assert.equal(verdict.allowed, false)
  assert.match((verdict as { reason: string }).reason, /no recorded human approval/i)
})

await test('the human-approval gate refuses rejected and changes_requested decisions', async () => {
  for (const decision of ['rejected', 'changes_requested'] as const) {
    const reader = {
      latestDecisionFor: async () => ({
        ok: true as const,
        row: { decision, decided_at: '2026-08-21T00:00:00Z', decided_by: null },
      }),
    }
    const verdict = await checkHumanApproval(reader, 'some-item')
    assert.equal(verdict.allowed, false, `decision '${decision}' must not publish`)
  }
})

await test('the human-approval gate fails CLOSED when the approval store is unreadable', async () => {
  const reader = { latestDecisionFor: async () => ({ ok: false as const, error: 'network down' }) }
  const verdict = await checkHumanApproval(reader, 'some-item')
  assert.equal(verdict.allowed, false)
  assert.match((verdict as { reason: string }).reason, /fail closed/i)
})

await test('the human-approval gate refuses an empty content id', async () => {
  const reader = { latestDecisionFor: async () => ({ ok: true as const, row: null }) }
  const verdict = await checkHumanApproval(reader, '  ')
  assert.equal(verdict.allowed, false)
})

await test('only an explicit approved decision opens the gate', async () => {
  const reader = {
    latestDecisionFor: async () => ({
      ok: true as const,
      row: { decision: 'approved' as const, decided_at: '2026-08-21T00:00:00Z', decided_by: 'operator-uuid' },
    }),
  }
  const verdict = await checkHumanApproval(reader, 'some-item')
  assert.equal(verdict.allowed, true)
})

await test('the publish path lints prohibited claims (brand linter reachable from the pipeline)', () => {
  assert.deepEqual(findProhibitedClaims('Mirror the advert wording, keep every fact true.'), [])
  assert.ok(findProhibitedClaims('Guaranteed jobs for every graduate — link in bio').length >= 2)
})

await test('run.ts wires both gates ahead of upload+publish with no bypass switch', () => {
  const run = readFileSync(new URL('../orchestrator/run.ts', import.meta.url), 'utf8')
  const claims = run.indexOf('findProhibitedClaims([')
  const approval = run.indexOf('await checkHumanApproval')
  const upload = run.indexOf('uploadReel(out')
  assert.ok(claims > 0 && approval > claims && upload > approval, 'gates must precede upload/publish')
  assert.equal(/SKIP_APPROVAL|APPROVAL_DISABLED|BYPASS_APPROVAL|APPROVAL_BYPASS/i.test(run), false, 'no bypass switch may exist')
})

console.log('\nscript quality\n')

await test('every bank script passes the quality gate unaided', () => {
  for (const t of CONTENT_BANK) {
    const report = validateBrief(t.script)
    assert.ok(report.ok, `${t.id}: ${report.errors.join(' | ')}`)
  }
})

await test('rejects generic AI-hype filler', () => {
  const report = validateBrief({
    hook: 'AI is changing everything',
    segments: ["In today's fast-paced world", "Let's dive in", 'This is important for everyone'],
    caption: 'AI is changing everything.',
  })
  assert.equal(report.ok, false)
  assert.ok(report.errors.some((e) => /filler/.test(e)), report.errors.join(' | '))
})

await test('rejects a script with no action for the viewer', () => {
  const report = validateBrief({
    hook: 'Hiring is different now',
    segments: ['Companies changed their systems', 'The market is competitive', 'Many people are affected'],
    caption: 'Hiring changed. Check your CV against it today.',
  })
  assert.equal(report.ok, false)
  assert.ok(report.errors.some((e) => /action verb/.test(e)), report.errors.join(' | '))
})

// The Free Kazi Kit landing page does not exist yet, so the CTA requirement is
// inverted: a caption that PROMISES a link in bio must now be rejected.
await test('rejects a caption that promises a link in bio', () => {
  const t = CONTENT_BANK[0]
  const report = validateBrief({ ...t.script, caption: 'Do this today. Free Kazi Kit — link in bio' })
  assert.equal(report.ok, false)
  assert.ok(report.errors.some((e) => /link in bio/.test(e)), report.errors.join(' | '))
})

await test('accepts a caption with no CTA while the Kazi Kit is unbuilt', () => {
  const t = CONTENT_BANK[0]
  const report = validateBrief({ ...t.script, caption: 'Some caption with no call to action' })
  assert.equal(report.ok, true, report.errors.join(' | '))
})

await test('rejects an over-long hook', () => {
  const t = CONTENT_BANK[0]
  const report = validateBrief({ ...t.script, hook: 'This is a very long hook that goes on and on and never lands' })
  assert.equal(report.ok, false)
})

console.log('\nbrief generation (no API key)\n')

await test('evergreen brief is publishable with zero API keys', async () => {
  const brief = await buildEvergreenBrief(CONTENT_BANK[0])
  assert.equal(brief.mode, 'evergreen')
  assert.ok(validateBrief(brief).ok, validateBrief(brief).errors.join(' | '))
  assert.doesNotMatch(brief.caption, /link in bio/)
})

await test('news brief fallback is publishable with zero API keys', async () => {
  const s = signal({ title: STRONG_NEWS[0][0], summary: STRONG_NEWS[0][1] })
  const op = scoreSignals([s], nowMs)[0]
  const brief = await buildNewsBrief(op)
  assert.equal(brief.mode, 'news')
  assert.equal(brief.source_url, s.url)
  const report = validateBrief(brief)
  assert.ok(report.ok, report.errors.join(' | '))
})

console.log('\nvisual providers\n')

const providerFor = (env: Record<string, string | undefined>) =>
  selectVisualProvider(env as NodeJS.ProcessEnv).id

await test('designed is the default when VISUAL_PROVIDER is unset', () => {
  assert.equal(providerFor({}), 'designed')
})

await test('stock without PEXELS_API_KEY falls back to designed', () => {
  assert.equal(providerFor({ VISUAL_PROVIDER: 'stock' }), 'designed')
})

await test('stock with PEXELS_API_KEY uses stock', () => {
  assert.equal(providerFor({ VISUAL_PROVIDER: 'stock', PEXELS_API_KEY: 'k' }), 'stock')
})

await test('generated is deprecated and maps to designed', () => {
  assert.equal(providerFor({ VISUAL_PROVIDER: 'generated' }), 'designed')
})

await test('unknown provider names never silently downgrade', () => {
  assert.equal(providerFor({ VISUAL_PROVIDER: 'cheap' }), 'designed')
})

await test('fallback is only reachable by asking for it explicitly', () => {
  assert.equal(providerFor({ VISUAL_PROVIDER: 'fallback' }), 'fallback')
})

await test('stock search terms are translated, never raw tags', () => {
  const base = { id: 'x', hook: 'h', segments: ['a'], caption: 'c', duration_sec: 18 }
  assert.equal(stockQueryFor({ ...base, topic_tags: ['cv', 'jobs'] }), 'writing notebook desk closeup')
  assert.equal(stockQueryFor({ ...base, topic_tags: ['interview'] }), 'business meeting handshake office')
  assert.equal(stockQueryFor({ ...base, topic_tags: ['nonsense-tag'] }), 'professional working laptop')
})

console.log('\ncaptions\n')

await test('captions reserve the end card and promise no dead link', () => {
  const t = CONTENT_BANK[0]
  const ass = buildAss({ id: t.id, ...t.script, topic_tags: t.tags, duration_sec: 18 })
  assert.match(ass, /PlayResX: 1080/)
  assert.match(ass, /PlayResY: 1920/)
  // The Free Kazi Kit landing page does not exist, so no rendered frame may
  // point viewers at it. Restore this assertion when the destination is live.
  assert.doesNotMatch(ass, /LINK IN BIO/, 'end card still promises a link in bio')
  assert.match(ass, /Style: Prog/, 'progress indicator missing')
  assert.ok(END_CARD_SEC > 1.5, 'end card too short to read')
})

await test('captions use the approved typeface and violet accent', () => {
  const t = CONTENT_BANK[0]
  const ass = buildAss({ id: t.id, ...t.script, topic_tags: t.tags, duration_sec: 18 })
  assert.doesNotMatch(ass, /DejaVu/, 'DejaVu Sans is not the approved typeface')
  assert.doesNotMatch(ass, /DCB978/, '#78B9DC is the retired ".AI" blue and must not appear')
  // Exact family names as recorded in brand/fonts/*.ttf — anything else makes
  // libass fall back to DejaVu without warning.
  assert.match(ass, /Style: Cap,Plus Jakarta Sans ExtraBold,/, 'caption style must name the ExtraBold face exactly')
  assert.match(ass, /Style: Cta,Plus Jakarta Sans SemiBold,/, 'CTA style must name the SemiBold face exactly')
  assert.match(ass, /Style: Prog,Plus Jakarta Sans ExtraBold,/, 'progress style must name the ExtraBold face exactly')
  assert.match(ass, /&HED3A7C&/, 'keyword accent must be the brand violet #7C3AED')
})

await test('keyword highlighting picks a meaningful word', () => {
  const line = accentLine('Paste the advert into an AI')
  assert.match(line, /\{\\c&HED3A7C&\}ADVERT/, 'keyword accent must be the brand violet #7C3AED')
})

console.log(`\n${passed} passed, ${failures.length} failed\n`)
if (failures.length) { for (const f of failures) console.error(`  ✗ ${f}`); process.exit(1) }
