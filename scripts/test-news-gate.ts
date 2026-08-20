/**
 * Human-readable view of the strict news gate.
 *
 *   npm run video:test-news-gate
 *   npm run video:test-news-gate -- --title "Employers now screen CVs with AI" --summary "..."
 *
 * Prints the decision and the reason for a canonical set of headlines (the ones
 * the brand keeps having to reject), or for a headline you pass in. Assertions
 * live in scripts/test-content-engine.ts; this is the tool you reach for when
 * tuning the bar.
 */
import { careerFamilies, careerRelevance, offBrandVeto, type Signal } from '../orchestrator/score.ts'
import { NEWS_BAR } from '../orchestrator/select.ts'

const argv = process.argv.slice(2)
const argOf = (n: string) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : undefined }

const CANON: Array<[string, string]> = [
  ['OpenAI launches new teen safety controls', 'Parents get new parental control tools for teens.'],
  ['Celebrity chef launches AI recipe app', 'A red carpet launch party for the celebrity backed app.'],
  ['AI takes centre stage in the election', 'The president and congress debated AI on the campaign trail.'],
  ['AI startup raises $200m at a $3bn valuation', 'Series B funding round values the startup at three billion.'],
  ['AI could take your jobs, report warns', 'A broad report says AI will affect jobs everywhere.'],
  ['Employers are increasingly using AI to screen resumes', 'Applicant tracking systems rank CVs before a human reads them.'],
  ['Remote work hiring rebounds for junior roles', 'Employers reopened remote job postings and changed how they interview.'],
  ['Freelance platform changes its fees for new freelancers', 'Upwork adjusted rates, affecting how a freelancer prices gig work.'],
]

const rows: Array<[string, string]> = argOf('title')
  ? [[argOf('title')!, argOf('summary') ?? '']]
  : CANON

const mk = (title: string, summary: string): Signal => ({
  id: 'probe', source: 'probe', title, summary, url: 'https://example.com',
  published_at: new Date().toISOString(), topic_tags: [],
})

console.log(`\nJifunze.ai news gate — a story must reach careerScore ${NEWS_BAR} (two distinct career concepts) and be fresh.\n`)
let accepted = 0
for (const [title, summary] of rows) {
  const s = mk(title, summary)
  const veto = offBrandVeto(s)
  const score = careerRelevance(s)
  const ok = !veto && score >= NEWS_BAR
  if (ok) accepted++
  const detail = veto ? `vetoed: ${veto}` : `concepts: ${careerFamilies(s).join(' + ') || 'none'}`
  console.log(`${ok ? 'ACCEPT' : 'REJECT'}  ${score.toFixed(2)}  ${title}`)
  console.log(`                ${detail}\n`)
}
console.log(`${accepted}/${rows.length} would be allowed to displace the evergreen backbone.\n`)
