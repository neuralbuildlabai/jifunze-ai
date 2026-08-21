/**
 * The evergreen guide library — Jifunze.ai's own written content, published on this website.
 *
 * These are the same approved, hand-written lessons the content engine draws from
 * (`orchestrator/contentBank.ts`). They are published here as readable text so the content hub
 * does not depend on fragile third-party embeds and so every lesson has an accessible,
 * indexable home that outlives any single platform post.
 *
 * GENERATED from `orchestrator/contentBank.ts` — the ids are identical, and
 * `scripts/test-social-ops.ts` fails if the two drift apart. Edit the content bank, then
 * regenerate; do not hand-edit the records below.
 *
 * No metrics, partnerships, accreditations, certificates or outcomes are claimed anywhere here.
 */
import type { PillarId } from './pillars.ts'

export type Guide = {
  /** Internal content id — matches the evergreen topic id in the content engine. */
  id: string
  /** URL segment under /content/. */
  slug: string
  pillar: PillarId
  /** Short, concrete title. */
  title: string
  /** One-sentence summary. Also the meta description for the detail page. */
  summary: string
  /** The lesson itself, as ordered steps. This is the accessible full text. */
  steps: readonly string[]
  tags: readonly string[]
}

/** The date this library was authored into the site. Not a per-item publication claim. */
export const GUIDE_LIBRARY_DATE = '2026-08-20'

export const GUIDES: readonly Guide[] = [
  {
    id: 'cv-ats-language',
    slug: 'cv-ats-language',
    pillar: 'career_growth',
    title: 'Your CV never reached a human',
    summary: 'Software reads your CV before any human does. Mirror the advert wording, keep every fact true.',
    steps: [
      'Software screens it first',
      'Paste the advert into an AI',
      'Ask it to mirror the wording',
      'Keep every fact true',
      'Same truth, their words',
    ],
    tags: ['cv', 'jobs', 'ai'],
  },
  {
    id: 'cv-responsible-for',
    slug: 'cv-responsible-for',
    pillar: 'career_growth',
    title: 'Delete two words from your CV',
    summary: 'Responsible for says nothing. What you did, plus the number, plus what it changed.',
    steps: [
      'Responsible for says nothing',
      'Write what you actually did',
      'Add the real number',
      'Then add what it changed',
      'Cut stock waste by 30 percent',
    ],
    tags: ['cv', 'jobs'],
  },
  {
    id: 'cv-top-three-lines',
    slug: 'cv-top-three-lines',
    pillar: 'career_growth',
    title: 'Your CV objective is wasting space',
    summary: 'Swap the objective for three lines: who you are, one proof with a number, the role you want.',
    steps: [
      'Cut the objective statement',
      'Write three lines instead',
      'Who you are, how long',
      'One proof with a number',
      'The exact role you want',
    ],
    tags: ['cv', 'jobs'],
  },
  {
    id: 'cv-tailor-4min',
    slug: 'cv-tailor-4min',
    pillar: 'career_growth',
    title: 'Tailor any CV in four minutes',
    summary: 'Three edits tailor a CV in four minutes: reorder, mirror the wording, cut the rest.',
    steps: [
      'Three edits, nothing else',
      'Move relevant experience to the top',
      'Swap your words for theirs',
      'Cut everything the advert ignores',
    ],
    tags: ['cv', 'applications'],
  },
  {
    id: 'interview-mock-ai',
    slug: 'interview-mock-ai',
    pillar: 'career_growth',
    title: 'Rehearse your interview free tonight',
    summary: 'Free interview rehearsal: one question at a time, follow-ups on vague answers, then your three weakest.',
    steps: [
      'Open any AI chat',
      'Ask for one question at a time',
      'Make it push on vague answers',
      'Ask for your three weakest answers',
    ],
    tags: ['interview', 'ai'],
  },
  {
    id: 'interview-salary',
    slug: 'interview-salary',
    pillar: 'career_growth',
    title: 'Never say the first salary number',
    summary: 'Do not name the first number. Ask what band is budgeted, then offer a range you would accept.',
    steps: [
      'They ask your expectation first',
      'Ask what band is budgeted',
      'If pushed, offer a range',
      'Its bottom is what you accept',
    ],
    tags: ['interview', 'salary'],
  },
  {
    id: 'interview-predict-qs',
    slug: 'interview-predict-qs',
    pillar: 'career_growth',
    title: 'Know the questions before the interview',
    summary: 'Paste the advert into an AI, ask for the 15 likely questions and what each one really tests.',
    steps: [
      'Paste the advert into an AI',
      'Ask for fifteen likely questions',
      'In the order they will come',
      'Ask what each one tests',
    ],
    tags: ['interview', 'ai'],
  },
  {
    id: 'ai-skill-plan',
    slug: 'ai-skill-plan',
    pillar: 'practical_ai',
    title: 'Turn I want to learn into a plan',
    summary: 'One prompt turns I want to learn X into a 30-day plan with something to show at the end.',
    steps: [
      'One prompt builds thirty days',
      'One hour a day',
      'Each day one visible output',
      'Free resources only',
      'Day thirty shows an employer something',
    ],
    tags: ['ai', 'skills', 'learn'],
  },
  {
    id: 'ai-cover-letter',
    slug: 'ai-cover-letter',
    pillar: 'practical_ai',
    title: 'Cover letters take six minutes now',
    summary: 'Three paragraphs: why this company, one proof with a number, and your first three months.',
    steps: [
      'Three paragraphs, no waffle',
      'Why this company, one real detail',
      'One proof with a number',
      'Name your first three months',
    ],
    tags: ['ai', 'cv', 'applications'],
  },
  {
    id: 'money-narrow-service',
    slug: 'money-narrow-service',
    pillar: 'income_business',
    title: 'Stop selling design. Sell one task.',
    summary: 'Narrow beats broad on freelance platforms. Search one specific task and check the competition.',
    steps: [
      'Broad services drown in competition',
      'Search one narrow service instead',
      'Check how many sellers appear',
      'Boring and specific gets booked',
    ],
    tags: ['freelance', 'money'],
  },
  {
    id: 'money-portfolio-weekend',
    slug: 'money-portfolio-weekend',
    pillar: 'income_business',
    title: 'Build a portfolio with zero clients',
    summary: 'No clients yet? Fix one real local problem, label it self-initiated, write the case study.',
    steps: [
      'Pick a real local business',
      'Fix one visible problem',
      'Label it self-initiated, honestly',
      'Write it up as a case study',
      'Save it behind one link',
    ],
    tags: ['freelance', 'skills'],
  },
  {
    id: 'money-async-work',
    slug: 'money-async-work',
    pillar: 'income_business',
    title: 'Unreliable power? Choose async work.',
    summary: 'Async work survives power cuts: deadlines not live calls, work offline, finish a day early.',
    steps: [
      'Live calls punish bad internet',
      'Pick work with deadlines instead',
      'Write offline, sync when you can',
      'Finish a day early',
      'Keep one backup connection',
    ],
    tags: ['freelance', 'remote work'],
  },
  {
    id: 'apps-follow-up',
    slug: 'apps-follow-up',
    pillar: 'opportunities',
    title: 'The follow-up almost nobody sends',
    summary: 'Seven days after applying, send three sentences: what you applied for, one new thing, a short close.',
    steps: [
      'Wait seven days after applying',
      'Send three sentences, no more',
      'Remind them what and when',
      'Add one new thing since',
      'Once only, not three times',
    ],
    tags: ['jobs', 'applications'],
  },
  {
    id: 'apps-no-experience',
    slug: 'apps-no-experience',
    pillar: 'opportunities',
    title: 'No experience means nobody paid you',
    summary: 'No experience usually means nobody paid you. Your project, your team, the family business all count.',
    steps: [
      'Your final-year project counts',
      'So does any team you organised',
      'Family business work counts',
      'List them like real work',
    ],
    tags: ['jobs', 'cv'],
  },
  {
    id: 'apps-scam-signs',
    slug: 'apps-scam-signs',
    pillar: 'opportunities',
    title: 'Spot a fake job in one minute',
    summary: 'Fake job advert signs: upfront fees, WhatsApp-only interviews, personal email domains, no real company.',
    steps: [
      'Any upfront fee is a scam',
      'Interview only on WhatsApp',
      'Personal email, no company domain',
      'Huge salary, no job description',
      'Check the company exists first',
    ],
    tags: ['jobs', 'kenya'],
  },
  {
    id: 'mindset-3-months',
    slug: 'mindset-3-months',
    pillar: 'career_growth',
    title: 'Plan the three months after graduation',
    summary: 'The three months after graduation, planned: master CV, twenty tailored applications, then earn online.',
    steps: [
      'Month one: build a master CV',
      'Month two: send twenty tailored applications',
      'Month three: earn something online',
      'Waiting is not on the list',
    ],
    tags: ['graduate', 'jobs'],
  },
  {
    id: 'tools-two-tool-stack',
    slug: 'tools-two-tool-stack',
    pillar: 'digital_tools',
    title: 'You only need two tools',
    summary: 'Tool-hopping kills momentum. Pick one writing tool and one planning tool, use them for a month, delete the rest.',
    steps: [
      'Stop collecting new apps',
      'Pick one writing tool',
      'Pick one planning tool',
      'Use both for a month',
      'Delete the rest',
    ],
    tags: ['tools', 'workflow'],
  },
  {
    id: 'productivity-first-hour',
    slug: 'productivity-first-hour',
    pillar: 'productivity',
    title: 'Your first hour decides your day',
    summary: 'The first hour decides the day. Pick the hardest task tonight, do it before any messages tomorrow.',
    steps: [
      'Guard your first hour',
      'Pick the hardest task tonight',
      'Do it before any messages',
      'Open email only after',
      'Check results in a week',
    ],
    tags: ['productivity', 'focus'],
  },
] as const

const BY_SLUG = new Map<string, Guide>(GUIDES.map((g) => [g.slug, g]))

export function guideBySlug(slug: string | undefined): Guide | undefined {
  if (!slug) return undefined
  return BY_SLUG.get(slug)
}

export function guidesForPillar(pillar: PillarId): Guide[] {
  return GUIDES.filter((g) => g.pillar === pillar)
}

/** Related guides: same pillar first, then shared tags, never the guide itself. */
export function relatedGuides(guide: Guide, limit = 3): Guide[] {
  const samePillar = GUIDES.filter((g) => g.id !== guide.id && g.pillar === guide.pillar)
  const sharedTag = GUIDES.filter(
    (g) => g.id !== guide.id && g.pillar !== guide.pillar && g.tags.some((t) => guide.tags.includes(t)),
  )
  return [...samePillar, ...sharedTag].slice(0, limit)
}
