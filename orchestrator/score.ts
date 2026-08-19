/**
 * Server-side signal scoring — the authoritative scorer.
 *
 * Runs in CI (GitHub Actions), NOT the browser, so its scores can be trusted for
 * unattended decisions (per docs/signal-ingestion-architecture.md). Reads
 * ingested_signals, scores each against Jifunze's brand config, and returns a
 * ranked list of opportunities with a plain-language selection_reason.
 *
 * Deliberately lean: keyword relevance + freshness + a light domain fit, mirroring
 * the intent of the client-side scoreSignalForBrand without dragging in 600 files.
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
  priority: number
  selection_reason: string
}

/** Words that mean the story actually helps a job seeker act — not just 'mentions AI'. */
const CAREER_TERMS = [
  'job','jobs','hiring','hire','career','careers','cv','resume','resumé','interview',
  'salary','recruit','recruiter','freelance','freelancing','remote work','upskill',
  'skills','apprenticeship','internship','layoff','job market','job search','portfolio',
  'get hired','land a job','application','cover letter',
]

/** 0-1 strict career relevance: fraction of career-signal presence in the text. */
export function careerRelevance(s: Signal): number {
  const hay = `${s.title} ${s.summary} ${s.topic_tags.join(' ')}`.toLowerCase()
  let hits = 0
  for (const t of CAREER_TERMS) if (hay.includes(t)) hits++
  // needs at least a couple of genuine career terms to score meaningfully
  return Math.min(hits / 3, 1)
}

/** Jifunze brand config: what the audience (Kenyan/emerging-market job seekers & learners) cares about. */
const BRAND = {
  // weighted keywords; higher = more on-brand
  keywords: {
    'ai': 3, 'chatgpt': 3, 'artificial intelligence': 3, 'openai': 2.5, 'llm': 2,
    'jobs': 3, 'hiring': 3, 'career': 3, 'cv': 3, 'resume': 3, 'interview': 3,
    'freelance': 2.5, 'remote work': 2.5, 'skills': 2.5, 'salary': 2, 'productivity': 2,
    'automation': 2, 'tools': 1.5, 'startup': 1.5, 'tech': 1.5, 'learn': 2, 'course': 1.5,
    'africa': 2, 'kenya': 2.5, 'nigeria': 1.5, 'graduate': 2,
  } as Record<string, number>,
  // topics that dampen (off-brand noise)
  block: ['crypto price', 'nft', 'gambling', 'casino'],
}

function relevanceScore(s: Signal): { score: number; hits: string[] } {
  const hay = `${s.title} ${s.summary} ${s.topic_tags.join(' ')}`.toLowerCase()
  if (BRAND.block.some((b) => hay.includes(b))) return { score: 0, hits: [] }
  let score = 0
  const hits: string[] = []
  for (const [kw, w] of Object.entries(BRAND.keywords)) {
    if (hay.includes(kw)) { score += w; hits.push(kw) }
  }
  // normalise to 0–1 (cap contribution so one spammy title can't dominate)
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
      const careerScore = careerRelevance(s)
      const freshness = freshnessScore(s.published_at, nowMs)
      // priority weights relevance higher than freshness — on-brand beats merely new
      const priority = Number((relevance * 0.7 + freshness * 0.3).toFixed(4))
      const reason = relevance === 0
        ? 'off-brand or blocked'
        : `matches ${hits.join(', ') || 'brand topics'}; ${freshness > 0.6 ? 'fresh' : 'still relevant'}`
      return { ...s, relevance, careerScore, freshness, priority, selection_reason: reason }
    })
    .filter((o) => o.relevance > 0)
    .sort((a, b) => b.priority - a.priority)
}
