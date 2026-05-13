/**
 * Free microlearning catalog entries (interactive player under /public/course-assets; routes under /learn/free/...).
 *
 * INTERNAL (not for learner UI): packaging notes live on `internalProductionMeta` only — never render those fields in learner surfaces.
 */

import {
  AI_AT_WORK_MICROLEARNING_HERO_DESCRIPTION,
  AI_AT_WORK_MICROLEARNING_LESSON_FLOW,
  AI_AT_WORK_MICROLEARNING_OUTCOMES,
} from './aiAtWorkMicrolearningPageCopy'
import {
  BUSINESS_ANALYTICS_MICROLEARNING_HERO_DESCRIPTION,
  BUSINESS_ANALYTICS_MICROLEARNING_LESSON_FLOW,
  BUSINESS_ANALYTICS_MICROLEARNING_OUTCOMES,
} from './businessAnalyticsMicrolearningPageCopy'
import {
  MENTAL_WELLBEING_RESET_MICROLEARNING_HERO_DESCRIPTION,
  MENTAL_WELLBEING_RESET_MICROLEARNING_LESSON_FLOW,
  MENTAL_WELLBEING_RESET_MICROLEARNING_OUTCOMES,
} from './mentalWellbeingResetMicrolearningPageCopy'
import {
  SMART_WORKFLOWS_MICROLEARNING_HERO_DESCRIPTION,
  SMART_WORKFLOWS_MICROLEARNING_LESSON_FLOW,
  SMART_WORKFLOWS_MICROLEARNING_OUTCOMES,
} from './smartWorkflowsMicrolearningPageCopy'

/** Single hero access pill text (avoid repeating “Free” in metadata rows and labels). */
export const FREE_STARTER_HERO_ACCESS_BADGE = 'Free' as const

/** Completion panel intro — device-local only; no account-sync phrasing. */
export const FREE_STARTER_COMPLETION_INTRO =
  'When you are finished, mark complete below. Your progress is saved in this browser.'

export const FREE_STARTER_COMPLETION_THANKS =
  'Thanks — we saved your completion in this browser.'

export const FREE_STARTER_BODY_PROSE =
  'text-[15px] leading-[1.65] text-[color:var(--jf-muted)] [word-spacing:normal] [letter-spacing:normal] [font-variant:normal] antialiased'

export type InternalProductionMeta = {
  /** Authoring/source record for ops — never render in learner-facing components. */
  source: string
  /** Delivery implementation — never render in learner-facing components. */
  deliveryEngine: string
}

export type FreeStarterRiseCourseEntry = {
  slug: string
  progressInternalKey: string
  progressSessionStartedMarker: string
  title: string
  shortTitle: string
  subtitle: string
  label: string
  /** Internal flags only — do not surface “pilot” or similar in public learner UI. */
  status: 'pilot'
  level: string
  durationLabel: string
  priceLabel: string
  category: string
  /** Learner-safe format line (no vendor/tool names). */
  learnerDisplayFormat: string
  internalProductionMeta: InternalProductionMeta
  /** Shown on completion panel — device-local sync messaging only; no vendor terms. */
  learnerCompletionNote: string
  publicRoute: string
  /** Site path to lesson player — internal wiring only (not shown as a raw URL to learners). */
  lessonPlayerSrc: string
  /** Used for learning-area counts on `/learn` (must match `AVAILABLE_PUBLIC_LEARNING_AREAS`). */
  learningCatalogAreaId: 'ai_productivity' | 'data_decisions' | 'wellbeing'
  descriptionShort: string
  descriptionLong: string
  learningOutcomes: readonly string[]
  lessonsIncluded: readonly string[]
}

export const AI_AT_WORK_CHATGPT_FREE_STARTER: FreeStarterRiseCourseEntry = {
  slug: 'ai-at-work-chatgpt',
  progressInternalKey: 'rise_pilot_ai_at_work_chatgpt',
  progressSessionStartedMarker: 'rise-ai-at-work-chatgpt::session-started',
  title: 'AI at Work: Use ChatGPT Safely, Clearly, and Productively',
  shortTitle: 'AI at Work',
  subtitle: AI_AT_WORK_MICROLEARNING_HERO_DESCRIPTION,
  label: 'Microlearning',
  status: 'pilot',
  level: 'Beginner',
  durationLabel: '45–60 minutes',
  priceLabel: 'Free',
  category: 'AI & Productivity',
  learnerDisplayFormat: 'Guided interactive course',
  internalProductionMeta: {
    source: 'Structured HTML export bundle',
    deliveryEngine: 'embedded_html',
  },
  learnerCompletionNote: FREE_STARTER_COMPLETION_INTRO,
  publicRoute: '/learn/free/ai-at-work-chatgpt',
  lessonPlayerSrc: '/course-assets/interactive/ai-at-work-chatgpt/content/index.html',
  learningCatalogAreaId: 'ai_productivity',
  descriptionShort: AI_AT_WORK_MICROLEARNING_HERO_DESCRIPTION,
  descriptionLong:
    'You get a calm, practical path through ChatGPT basics: what it can help with, how to ask for better results, how to check answers before you rely on them, and how to keep sensitive information out of the wrong places. You finish with a small starter kit you can reuse at work or school.',
  learningOutcomes: AI_AT_WORK_MICROLEARNING_OUTCOMES,
  lessonsIncluded: AI_AT_WORK_MICROLEARNING_LESSON_FLOW,
}

export const SMART_WORKFLOWS_WITH_AI_FREE_STARTER: FreeStarterRiseCourseEntry = {
  slug: 'smart-workflows-with-ai',
  progressInternalKey: 'rise_pilot_smart_workflows_with_ai',
  progressSessionStartedMarker: 'rise-smart-workflows-with-ai::session-started',
  title: 'Smart Workflows with AI',
  shortTitle: 'Smart Workflows with AI',
  subtitle: SMART_WORKFLOWS_MICROLEARNING_HERO_DESCRIPTION,
  label: 'Microlearning workshop',
  status: 'pilot',
  level: 'Beginner to early intermediate',
  durationLabel: '75–120 minutes',
  priceLabel: 'Free',
  category: 'AI & Productivity',
  learnerDisplayFormat: 'Guided workshop',
  internalProductionMeta: {
    source: 'Structured HTML export bundle',
    deliveryEngine: 'embedded_html',
  },
  learnerCompletionNote: FREE_STARTER_COMPLETION_INTRO,
  publicRoute: '/learn/free/smart-workflows-with-ai',
  lessonPlayerSrc: '/course-assets/interactive/smart-workflows-with-ai/content/index.html',
  learningCatalogAreaId: 'ai_productivity',
  descriptionShort: SMART_WORKFLOWS_MICROLEARNING_HERO_DESCRIPTION,
  descriptionLong:
    'You work through one repeated task end to end: choose it, map it, decide where AI fits, add review and safety checks, and leave with a short plan you can try immediately.',
  learningOutcomes: SMART_WORKFLOWS_MICROLEARNING_OUTCOMES,
  lessonsIncluded: SMART_WORKFLOWS_MICROLEARNING_LESSON_FLOW,
}

export const BUSINESS_ANALYTICS_DECISION_MAKING_FREE_STARTER: FreeStarterRiseCourseEntry = {
  slug: 'business-analytics-decision-making',
  progressInternalKey: 'rise_pilot_business_analytics_decision_making',
  progressSessionStartedMarker: 'rise-business-analytics-decision-making::session-started',
  title: 'Business Analytics for Decision-Making',
  shortTitle: 'Business Analytics',
  subtitle: BUSINESS_ANALYTICS_MICROLEARNING_HERO_DESCRIPTION,
  label: 'Microlearning',
  status: 'pilot',
  level: 'Beginner to early intermediate',
  durationLabel: '45–75 minutes',
  priceLabel: 'Free',
  category: 'Data & Decisions',
  learnerDisplayFormat: 'Guided interactive course',
  internalProductionMeta: {
    source: 'Structured HTML export bundle',
    deliveryEngine: 'embedded_html',
  },
  learnerCompletionNote: FREE_STARTER_COMPLETION_INTRO,
  publicRoute: '/learn/free/business-analytics-decision-making',
  lessonPlayerSrc: '/course-assets/interactive/business-analytics-decision-making/content/index.html',
  learningCatalogAreaId: 'data_decisions',
  descriptionShort: BUSINESS_ANALYTICS_MICROLEARNING_HERO_DESCRIPTION,
  descriptionLong:
    'You practice reading numbers and charts the way real decisions get made: naming what you know, what you do not, and what you would recommend next—without overclaiming.',
  learningOutcomes: BUSINESS_ANALYTICS_MICROLEARNING_OUTCOMES,
  lessonsIncluded: BUSINESS_ANALYTICS_MICROLEARNING_LESSON_FLOW,
}

export const MENTAL_WELLBEING_RESET_FREE_STARTER: FreeStarterRiseCourseEntry = {
  slug: '5-day-mental-wellbeing-reset',
  progressInternalKey: 'rise_pilot_5_day_mental_wellbeing_reset',
  progressSessionStartedMarker: 'rise-5-day-mental-wellbeing-reset::session-started',
  title: '5-Day Mental Wellbeing Reset',
  /** Use the full title learner-facing — never shorten to "5-Day Wellbeing Reset" or similar. */
  shortTitle: '5-Day Mental Wellbeing Reset',
  subtitle: MENTAL_WELLBEING_RESET_MICROLEARNING_HERO_DESCRIPTION,
  label: 'Wellbeing challenge',
  status: 'pilot',
  level: 'Beginner',
  durationLabel: '60–90 minutes',
  priceLabel: 'Free',
  category: 'Wellbeing',
  learnerDisplayFormat: 'Monday–Friday challenge',
  internalProductionMeta: {
    source: 'Structured HTML export bundle',
    deliveryEngine: 'embedded_html',
  },
  learnerCompletionNote: FREE_STARTER_COMPLETION_INTRO,
  publicRoute: '/learn/free/5-day-mental-wellbeing-reset',
  lessonPlayerSrc: '/course-assets/interactive/5-day-mental-wellbeing-reset/content/index.html',
  learningCatalogAreaId: 'wellbeing',
  descriptionShort:
    'Practice grounding, reframing, positive emotion, body awareness, and balance through a simple 5-day mental wellbeing reset.',
  descriptionLong:
    'Take five short days to reset healthier weekly habits. Each weekday gives you one simple, practical exercise — grounding, reframing, noticing positive emotion, caring for the body–mind link, and creating balance — and Friday closes with a short reflection you can carry forward.',
  learningOutcomes: MENTAL_WELLBEING_RESET_MICROLEARNING_OUTCOMES,
  lessonsIncluded: MENTAL_WELLBEING_RESET_MICROLEARNING_LESSON_FLOW,
}

/** Catalog display order: Smart Workflows, Business Analytics, AI at Work, 5-Day Mental Wellbeing Reset. */
export const FREE_STARTER_RISE_COURSES: readonly FreeStarterRiseCourseEntry[] = [
  SMART_WORKFLOWS_WITH_AI_FREE_STARTER,
  BUSINESS_ANALYTICS_DECISION_MAKING_FREE_STARTER,
  AI_AT_WORK_CHATGPT_FREE_STARTER,
  MENTAL_WELLBEING_RESET_FREE_STARTER,
]

export function findFreeStarterRiseCourseBySlug(slug: string): FreeStarterRiseCourseEntry | undefined {
  return FREE_STARTER_RISE_COURSES.find((c) => c.slug === slug)
}
