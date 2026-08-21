/**
 * The six editorial pillars — THE single authoritative configuration, locked by
 * `docs/AMENDMENT_003_2026-08-21_INSTAGRAM_FIRST.md` §4 (supersedes Amendment 001 §5).
 *
 * Consumed by: signal scoring (advisory keywords), content generation
 * (`orchestrator/contentBank.ts` imports `PillarId`), the admin console, the public website
 * (nav, topic pages, sitemap/feed generators) and analytics. The SQL CHECK constraint in the
 * not-yet-applied social-ops migration mirrors `PILLAR_IDS`; `scripts/test-social-ops.ts`
 * asserts the two never drift. Do not define pillar lists anywhere else.
 */

export type PillarId =
  | 'practical_ai'
  | 'career_growth'
  | 'income_business'
  | 'digital_tools'
  | 'productivity'
  | 'opportunities'

export type Pillar = {
  id: PillarId
  /** URL segment under /topics/. */
  slug: string
  label: string
  /** One line for cards and nav. */
  blurb: string
  /** Paragraph for the pillar landing page and its meta description. */
  description: string
  /** Advisory signal-scoring vocabulary. Scoring weight changes remain reviewed code changes. */
  keywords: readonly string[]
}

export const PILLARS: readonly Pillar[] = [
  {
    id: 'practical_ai',
    slug: 'practical-ai',
    label: 'Practical AI',
    blurb: 'Use AI for one concrete task at a time.',
    description:
      'Practical uses of AI for real work: specific, repeatable tasks you can hand to an AI tool today, with the checks that keep the output truthful.',
    keywords: ['ai', 'chatgpt', 'claude', 'gemini', 'copilot', 'prompt', 'llm', 'automation', 'ai tool'],
  },
  {
    id: 'career_growth',
    slug: 'career-growth',
    label: 'Career growth',
    blurb: 'Grow your career and stay employable as work changes.',
    description:
      'Career growth and employability: presenting real achievements, interviewing well, staying visible, and building the habits that keep a career moving as work changes.',
    keywords: ['career', 'cv', 'resume', 'interview', 'hiring', 'job', 'promotion', 'skills', 'employability'],
  },
  {
    id: 'income_business',
    slug: 'income-business',
    label: 'Income & business skills',
    blurb: 'Earn, price and keep more of what you make.',
    description:
      'Income and business skills: narrowing a service, pricing it, building proof of work, finding clients who pay, and running the numbers behind a small business or side income.',
    keywords: ['income', 'freelance', 'business', 'pricing', 'clients', 'side hustle', 'money', 'revenue'],
  },
  {
    id: 'digital_tools',
    slug: 'digital-tools',
    label: 'Digital tools',
    blurb: 'Choose and master the tools that actually help.',
    description:
      'Digital tools worth your time: choosing a small set of tools, learning them properly, and skipping the hype — so the tools serve the work instead of replacing it.',
    keywords: ['tools', 'apps', 'software', 'workflow', 'notion', 'sheets', 'no-code', 'digital'],
  },
  {
    id: 'productivity',
    slug: 'productivity',
    label: 'Productivity',
    blurb: 'Get the important work done, consistently.',
    description:
      'Productivity that survives real life: focus habits, planning that takes minutes, and systems that keep the important work moving without burning you out.',
    keywords: ['productivity', 'focus', 'habits', 'time management', 'planning', 'deep work', 'routine'],
  },
  {
    id: 'opportunities',
    slug: 'opportunities',
    label: 'Opportunities & resources',
    blurb: 'Find real opportunities and apply in a way that works.',
    description:
      'Opportunities and useful resources: real programs, gigs, and openings worth applying to, how to apply in a way that survives the first filter — and how to spot the scams.',
    keywords: ['opportunity', 'application', 'apply', 'scholarship', 'grant', 'program', 'remote work', 'resources'],
  },
] as const

/**
 * Legacy (Amendment 001) → current pillar mapping. Historical guide records, metric rows and
 * old topic URLs re-map through this instead of breaking. Old `/topics/<slug>` URLs 301 to the
 * absorbing pillar's page (see vercel.json + the router).
 */
export const LEGACY_PILLAR_MAP: Readonly<Record<string, PillarId>> = {
  cv: 'career_growth',
  interview: 'career_growth',
  mindset: 'career_growth',
  ai_task: 'practical_ai',
  money: 'income_business',
  applications: 'opportunities',
}

/** Legacy topic-page slugs → current slugs, for redirects. */
export const LEGACY_PILLAR_SLUGS: Readonly<Record<string, string>> = {
  cv: 'career-growth',
  interview: 'career-growth',
  mindset: 'career-growth',
  'ai-task': 'practical-ai',
  money: 'income-business',
  applications: 'opportunities',
}

const BY_ID = new Map<PillarId, Pillar>(PILLARS.map((p) => [p.id, p]))
const BY_SLUG = new Map<string, Pillar>(PILLARS.map((p) => [p.slug, p]))

export function pillarById(id: PillarId): Pillar {
  const found = BY_ID.get(id)
  if (!found) throw new Error(`Unknown pillar id: ${id}`)
  return found
}

export function pillarBySlug(slug: string | undefined): Pillar | undefined {
  if (!slug) return undefined
  return BY_SLUG.get(slug)
}

export const PILLAR_IDS: readonly PillarId[] = PILLARS.map((p) => p.id)
