/**
 * Public learner-facing catalog for content currently available on Jifunze.ai.
 *
 * Everything listed here is shown as free public learning on `/learn`.
 * Internal ops metadata must never be rendered in learner UI.
 */

import { BUSINESS_ANALYTICS_DECISION_MAKING_SLUG } from '../courses/businessAnalyticsDecisionMakingIds'
import { BUSINESS_PROCESS_AUTOMATION_SLUG } from '../courses/businessProcessAutomationConstants'
import { PRACTICAL_MATH_SLUG } from '../courses/practicalMathematicsCourseConstants'
import {
  AI_AT_WORK_CHATGPT_FREE_STARTER,
  FREE_STARTER_RISE_COURSES,
  SMART_WORKFLOWS_WITH_AI_FREE_STARTER,
  type FreeStarterRiseCourseEntry,
} from './freeStarterRiseCoursesCatalog'

export type StandaloneCourseListing = {
  slug: string
  title: string
  /** Internal listing context — do not render as learner-facing microlearning badge. */
  listingKind: 'standalone_course'
  route: string
  learningAreaId: string
  /** Dev-only if needed — never shown to learners. */
  futureMonetizationCandidate?: boolean
}

export type LearningAreaDefinition = {
  id: string
  title: string
  description: string
}

/** Microlearning cards on /learn */
export type MicrolearningCatalogItem = {
  slug: string
  title: string
  shortTitle: string
  route: string
  publicLabel: string
  access: 'free'
  courseType: 'microlearning'
  learningAreaId: string
  level?: string
  durationLabel?: string
  descriptionLearner: string
  ctaLabel: string
  isAvailable: true
  /** Same entry reference as catalog — lesson player path is internal wiring only. */
  entry: FreeStarterRiseCourseEntry
}

/** Full-course cards on /learn */
export type FullCourseCatalogItem = {
  slug: string
  title: string
  route: string
  publicLabel: string
  access: 'free'
  courseType: 'full_course'
  learningAreaId: string
  descriptionLearner: string
  ctaLabel: string
  isAvailable: true
  futureMonetizationCandidate?: boolean
}

export const AVAILABLE_PUBLIC_STANDALONE_COURSES: readonly StandaloneCourseListing[] = [
  {
    slug: PRACTICAL_MATH_SLUG,
    title: 'Practical Mathematics for Life, Work, and Business',
    listingKind: 'standalone_course',
    route: `/learn/${PRACTICAL_MATH_SLUG}`,
    learningAreaId: 'mathematics',
    futureMonetizationCandidate: true,
  },
  {
    slug: BUSINESS_PROCESS_AUTOMATION_SLUG,
    title: 'Business Process Automation for Work',
    listingKind: 'standalone_course',
    route: `/learn/${BUSINESS_PROCESS_AUTOMATION_SLUG}`,
    learningAreaId: 'business_operations',
    futureMonetizationCandidate: true,
  },
  {
    slug: BUSINESS_ANALYTICS_DECISION_MAKING_SLUG,
    title: 'Business Analytics for Decision-Making',
    listingKind: 'standalone_course',
    route: `/learn/${BUSINESS_ANALYTICS_DECISION_MAKING_SLUG}`,
    learningAreaId: 'data_decisions',
    futureMonetizationCandidate: true,
  },
]

export const AVAILABLE_PUBLIC_LEARNING_AREAS: readonly LearningAreaDefinition[] = [
  {
    id: 'ai_productivity',
    title: 'AI & Productivity',
    description:
      'Use AI responsibly for everyday tasks—prompting, checking outputs, and practical workflows.',
  },
  {
    id: 'business_operations',
    title: 'Business & Operations',
    description: 'Document processes, reduce repeated work, and plan improvements you can apply at work.',
  },
  {
    id: 'mathematics',
    title: 'Mathematics',
    description: 'Build practical math confidence for decisions, budgets, and everyday quantitative reasoning.',
  },
  {
    id: 'data_decisions',
    title: 'Data & Decisions',
    description: 'Use metrics and simple analysis to support clearer, evidence-informed decisions.',
  },
]

const MICRO_DESCRIPTION_OVERRIDES: Record<string, string> = {
  [SMART_WORKFLOWS_WITH_AI_FREE_STARTER.slug]: SMART_WORKFLOWS_WITH_AI_FREE_STARTER.descriptionShort,
  [AI_AT_WORK_CHATGPT_FREE_STARTER.slug]: AI_AT_WORK_CHATGPT_FREE_STARTER.descriptionShort,
}

const FULL_COURSE_DESCRIPTIONS: Record<string, string> = {
  [PRACTICAL_MATH_SLUG]:
    'Build practical math confidence for everyday decisions, work, budgeting, and business use.',
  [BUSINESS_PROCESS_AUTOMATION_SLUG]:
    'Learn how to analyze repeated work, document business processes, and plan practical automation improvements.',
  [BUSINESS_ANALYTICS_DECISION_MAKING_SLUG]:
    'Learn how to use data, metrics, and simple analysis to support better business decisions.',
}

function microlearningFromEntry(entry: FreeStarterRiseCourseEntry): MicrolearningCatalogItem {
  const descriptionLearner = MICRO_DESCRIPTION_OVERRIDES[entry.slug] ?? entry.descriptionShort
  const ctaLabel =
    entry.slug === SMART_WORKFLOWS_WITH_AI_FREE_STARTER.slug ? 'Start workshop' : 'Start course'
  return {
    slug: entry.slug,
    title: entry.title,
    shortTitle: entry.shortTitle,
    route: entry.publicRoute,
    publicLabel: entry.label,
    access: 'free',
    courseType: 'microlearning',
    learningAreaId: 'ai_productivity',
    level: entry.level,
    durationLabel: entry.durationLabel,
    descriptionLearner,
    ctaLabel,
    isAvailable: true,
    entry,
  }
}

function fullCourseFromListing(listing: StandaloneCourseListing): FullCourseCatalogItem {
  return {
    slug: listing.slug,
    title: listing.title,
    route: listing.route,
    publicLabel: 'Free Full Course',
    access: 'free',
    courseType: 'full_course',
    learningAreaId: listing.learningAreaId,
    descriptionLearner: FULL_COURSE_DESCRIPTIONS[listing.slug] ?? '',
    ctaLabel: 'Start course',
    isAvailable: true,
    futureMonetizationCandidate: listing.futureMonetizationCandidate,
  }
}

export function getMicrolearningCatalogItems(): readonly MicrolearningCatalogItem[] {
  return FREE_STARTER_RISE_COURSES.map(microlearningFromEntry)
}

export function getFullCourseCatalogItems(): readonly FullCourseCatalogItem[] {
  return AVAILABLE_PUBLIC_STANDALONE_COURSES.map(fullCourseFromListing)
}

/** Homepage preview: Smart Workflows, AI at Work, Practical Mathematics — in that order. */
export function getHomepageAvailablePreviewItems(): readonly (
  | MicrolearningCatalogItem
  | FullCourseCatalogItem
)[] {
  const micro = getMicrolearningCatalogItems()
  const smart = micro.find((m) => m.slug === SMART_WORKFLOWS_WITH_AI_FREE_STARTER.slug)
  const aiAtWork = micro.find((m) => m.slug === AI_AT_WORK_CHATGPT_FREE_STARTER.slug)
  const math = getFullCourseCatalogItems().find((c) => c.slug === PRACTICAL_MATH_SLUG)
  const out: (MicrolearningCatalogItem | FullCourseCatalogItem)[] = []
  if (smart) out.push(smart)
  if (aiAtWork) out.push(aiAtWork)
  if (math) out.push(math)
  return out
}

export function countCoursesInLearningArea(areaId: string): number {
  let n = 0
  for (const m of getMicrolearningCatalogItems()) {
    if (m.learningAreaId === areaId) n += 1
  }
  for (const f of getFullCourseCatalogItems()) {
    if (f.learningAreaId === areaId) n += 1
  }
  return n
}

export type LearningAreaSummaryRow = {
  id: string
  title: string
  count: number
  blurb: string
}

export function getLearningAreasSummary(): readonly LearningAreaSummaryRow[] {
  return AVAILABLE_PUBLIC_LEARNING_AREAS.map((a) => ({
    id: a.id,
    title: a.title,
    count: countCoursesInLearningArea(a.id),
    blurb: a.description,
  }))
}
