/**
 * The six fixed content pillars. Locked by `docs/AMENDMENT_001_2026-08-18_PIVOT.md` §5.
 * The pillar ids match `EvergreenTopic['pillar']` in `orchestrator/contentBank.ts`.
 */

export type PillarId = 'cv' | 'interview' | 'ai_task' | 'money' | 'applications' | 'mindset'

export type Pillar = {
  id: PillarId
  /** URL segment under /topics/. */
  slug: string
  label: string
  /** One line for cards and nav. */
  blurb: string
  /** Paragraph for the pillar landing page and its meta description. */
  description: string
}

export const PILLARS: readonly Pillar[] = [
  {
    id: 'cv',
    slug: 'cv',
    label: 'CV',
    blurb: 'Write a CV that gets read by software and by people.',
    description:
      'CV and résumé guidance: what to cut, how to phrase real achievements with numbers, and how to tailor one CV to a specific advert without inventing anything.',
  },
  {
    id: 'interview',
    slug: 'interview',
    label: 'Interview',
    blurb: 'Prepare answers you can actually say out loud.',
    description:
      'Interview preparation: predicting the questions a specific advert implies, rehearsing answers, and handling the salary question without guessing.',
  },
  {
    id: 'ai_task',
    slug: 'ai-task',
    label: 'Practical AI',
    blurb: 'Use AI for one concrete task at a time.',
    description:
      'Practical uses of AI for work: specific, repeatable tasks you can hand to a chat assistant today, with the checks that keep the output truthful.',
  },
  {
    id: 'money',
    slug: 'money',
    label: 'Money',
    blurb: 'Earn, price and keep more of what you make.',
    description:
      'Money and income skills for new freelancers: narrowing a service, pricing it, building proof of work, and finding clients who pay.',
  },
  {
    id: 'applications',
    slug: 'applications',
    label: 'Applications',
    blurb: 'Apply in a way that survives the first filter.',
    description:
      'Job and opportunity applications: following up without nagging, applying with little experience, and spotting the job scams that target new applicants.',
  },
  {
    id: 'mindset',
    slug: 'mindset',
    label: 'Mindset',
    blurb: 'Keep going when the search takes longer than expected.',
    description:
      'Professional confidence, discipline and growth: the habits that keep a long job search or a new freelance practice moving.',
  },
] as const

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
