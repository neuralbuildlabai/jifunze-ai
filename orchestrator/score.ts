/**
 * Server-side signal scoring — the authoritative scorer.
 *
 * Runs in CI (GitHub Actions), NOT the browser, so its scores can be trusted for
 * unattended decisions (per docs/signal-ingestion-architecture.md). Reads
 * ingested_signals, scores each against Jifunze's brand config, and returns a
 * ranked list of opportunities with a plain-language selection_reason.
 *
 * The number that gates publishing is `careerScore`, not `relevance`: relevance
 * says "this is in our world", careerScore says "a job seeker can DO something
 * because of this". Only the latter is allowed to unseat the evergreen backbone.
 */
export type Signal = {
  id: string
  source: string
  source_label?: string
  title: string
  summary: string
  url: string
  published_at: string
  topic_tags: string[]
}

export type ScoredOpportunity = Signal & {
  relevance: number
  freshness: number
  /** Strict career/skill relevance (0-1). News must clear NEWS_BAR on THIS. */
  careerScore: number
  /** Which career concepts the story actually touched — used in the audit trail. */
  careerFamilies: string[]
  /** Set when the story is vetoed outright as off-brand for a skills channel. */
  offBrandReason: string | null
  priority: number
  selection_reason: string
}

/**
 * Career concepts, not keywords. Grouped deliberately: matching "job", "jobs"
 * and "job market" in one headline is ONE concept, not three. The old flat list
 * let "AI will take your jobs" clear the bar on substring double-counting alone.
 */
export const CAREER_FAMILIES: Record<string, string[]> = {
  jobs: ['job', 'jobs', 'job market', 'job search', 'employment', 'employer', 'employers', 'vacancy', 'vacancies', 'workforce'],
  hiring: ['hiring', 'hire', 'hires', 'recruit', 'recruiter', 'recruitment', 'applicant tracking', 'screening candidates', 'screen resumes', 'screen cvs'],
  cv: ['cv', 'cvs', 'resume', 'resumes', 'resumé', 'cover letter', 'portfolio'],
  interview: ['interview', 'interviews', 'interviewing'],
  application: ['job application', 'applications', 'applying for jobs', 'apply for a job'],
  freelance: ['freelance', 'freelancing', 'freelancer', 'gig work', 'gig economy', 'upwork', 'fiverr', 'contractor'],
  remote: ['remote work', 'remote job', 'remote hiring', 'work from home', 'hybrid work', 'return to office'],
  skills: ['upskill', 'reskill', 'skills gap', 'digital skills', 'certification', 'apprenticeship', 'internship', 'training programme', 'training program'],
  pay: ['salary', 'salaries', 'wage', 'wages', 'pay rise', 'pay raise', 'salary negotiation',
    // what you actually earn on a platform is a pay question too
    'platform fee', 'service fee', 'its fees', 'commission', 'take rate', 'pricing', 'day rate', 'hourly rate'],
  career: ['career', 'careers', 'promotion', 'layoff', 'layoffs', 'redundancies', 'career change'],
  workertools: ['productivity tool', 'workflow automation', 'workplace ai', 'ai at work', 'ai tools for work', 'employee productivity'],
}

/**
 * Hard veto. These are the shapes of "AI news" that keep trying to become a
 * Jifunze video and must never succeed, however many career words they contain.
 */
const OFF_BRAND_VETO: Array<[string, string[]]> = [
  ['child/teen safety story', ['teen safety', 'teenager', 'teens', 'minors', 'child safety', 'kids online', 'parental control']],
  ['celebrity story', ['celebrity', 'kardashian', 'taylor swift', 'influencer drama', 'red carpet']],
  ['political story', ['election', 'president', 'senate', 'parliament', 'congress', 'political party', 'campaign trail', 'impeach']],
  ['religious/festival content', ['christmas', 'easter', 'ramadan', 'eid', 'diwali', 'church', 'mosque', 'temple', 'festival']],
  ['funding/valuation hype', ['raises $', 'valuation', 'series a', 'series b', 'ipo', 'market cap', 'stock surges', 'share price']],
  ['model-launch hype', ['launches new model', 'unveils', 'announces gpt', 'benchmark record', 'state of the art model']],
  ['gambling/crypto', ['crypto price', 'nft', 'gambling', 'casino', 'betting']],
]

const hay = (s: Signal): string => `${s.title} ${s.summary} ${(s.topic_tags ?? []).join(' ')}`.toLowerCase()

/** Returns the veto reason, or null when the story is not obviously off-brand. */
export function offBrandVeto(s: Signal): string | null {
  const text = hay(s)
  for (const [reason, terms] of OFF_BRAND_VETO) {
    if (terms.some((t) => text.includes(t))) return reason
  }
  return null
}

/** Which career concepts a story genuinely touches. */
export function careerFamilies(s: Signal): string[] {
  const text = hay(s)
  return Object.entries(CAREER_FAMILIES)
    .filter(([, terms]) => terms.some((t) => text.includes(t)))
    .map(([family]) => family)
}

/**
 * 0–1 strict career relevance. Two distinct concepts (0.66) is the working bar:
 * "employers ... screen resumes" = jobs + hiring/cv, "AI takes jobs" = jobs only.
 * A vetoed story scores 0 no matter what it mentions.
 */
export function careerRelevance(s: Signal): number {
  if (offBrandVeto(s)) return 0
  return Math.min(careerFamilies(s).length / 3, 1)
}

/** Jifunze brand config: what the audience (ambitious African and diaspora professionals) cares about. */
const BRAND = {
  keywords: {
    'ai': 3, 'chatgpt': 3, 'artificial intelligence': 3, 'openai': 2.5, 'llm': 2,
    'jobs': 3, 'hiring': 3, 'career': 3, 'cv': 3, 'resume': 3, 'interview': 3,
    'freelance': 2.5, 'remote work': 2.5, 'skills': 2.5, 'salary': 2, 'productivity': 2,
    'automation': 2, 'tools': 1.5, 'startup': 1.5, 'tech': 1.5, 'learn': 2, 'course': 1.5,
    'africa': 2, 'kenya': 2.5, 'nigeria': 1.5, 'graduate': 2,
  } as Record<string, number>,
  block: ['crypto price', 'nft', 'gambling', 'casino'],
}

function relevanceScore(s: Signal): { score: number; hits: string[] } {
  const text = hay(s)
  if (BRAND.block.some((b) => text.includes(b))) return { score: 0, hits: [] }
  let score = 0
  const hits: string[] = []
  for (const [kw, w] of Object.entries(BRAND.keywords)) {
    if (text.includes(kw)) { score += w; hits.push(kw) }
  }
  return { score: Math.min(score / 8, 1), hits: hits.slice(0, 4) }
}

function freshnessScore(publishedAt: string, nowMs: number): number {
  const ageH = (nowMs - new Date(publishedAt).getTime()) / 3.6e6
  if (Number.isNaN(ageH) || ageH < 0) return 0.5
  // 1.0 fresh, decays; ~0.5 at 24h, ~0.2 at 72h
  return Math.max(0, Math.min(1, Math.exp(-ageH / 34)))
}

export function scoreSignals(signals: Signal[], nowMs: number): ScoredOpportunity[] {
  return signals
    .map((s) => {
      const { score: relevance, hits } = relevanceScore(s)
      const offBrandReason = offBrandVeto(s)
      const families = offBrandReason ? [] : careerFamilies(s)
      const careerScore = offBrandReason ? 0 : Math.min(families.length / 3, 1)
      const freshness = freshnessScore(s.published_at, nowMs)
      const priority = Number((relevance * 0.7 + freshness * 0.3).toFixed(4))
      const reason = offBrandReason
        ? `rejected: ${offBrandReason}`
        : relevance === 0
          ? 'rejected: off-brand or blocked'
          : families.length < 2
            ? `rejected: no actionable career angle (touches ${families.join(', ') || 'nothing concrete'})`
            : `usable: ${families.join(' + ')}; ${freshness > 0.6 ? 'fresh' : 'still relevant'}; matches ${hits.join(', ') || 'brand topics'}`
      return { ...s, relevance, careerScore, careerFamilies: families, offBrandReason, freshness, priority, selection_reason: reason }
    })
    .filter((o) => o.relevance > 0)
    .sort((a, b) => b.priority - a.priority)
}
