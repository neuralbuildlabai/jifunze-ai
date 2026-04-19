/**
 * Single AI library family model: public starter → signed-in fuller library → premium/deeper tracks.
 * Monetization is **access** to deeper materials—not credentials, mastery, exams, jobs, or professional qualification.
 */

import { AI_CURRICULUM_SPEC } from './aiCurriculumSpec'
import { getFirstPublicLessonSlugInCategory } from './aiEverydayWorkCurriculum'
import { PUBLIC_AI_FOUNDATIONS_BASE_PATH } from '../publicStarterLibraries/aiFoundations'

/** Use with {@link resolveStarterLinkHref} to open the public starter index. */
export const STARTER_LIBRARY_INDEX_SENTINEL = '__index__'

export type StarterDeepLink = {
  label: string
  /** Public lesson slug under {@link PUBLIC_AI_FOUNDATIONS_BASE_PATH}, or {@link STARTER_LIBRARY_INDEX_SENTINEL} for the overview. */
  lessonSlug: string
}

export type SignedInAiCategory = {
  id: string
  /** Display title in the workspace AI library (Part 3). */
  title: string
  summary: string
  /** Where this category connects to the free starter readers (overlap / orientation). */
  starterLinks: StarterDeepLink[]
  /** What expands with eligible plans—always framed as materials & practice depth, not outcomes. */
  deeperWithAccess: string[]
}

export type PremiumAiTrack = {
  id: string
  title: string
  summary: string
  /** Deeper bundles may be sold individually when enabled—pricing remains the canonical surface. */
  monetization: 'subscription' | 'bundle_or_subscription'
}

/** Free public starter path (readable without account). Canonical library lives at this route family. */
export const AI_FAMILY_STARTER_PUBLIC_PATH = PUBLIC_AI_FOUNDATIONS_BASE_PATH

/** Workspace signed-in UI maps 1:1 onto the curriculum categories (same titles/summaries as public skeleton). */
export const SIGNED_IN_AI_CATEGORIES: SignedInAiCategory[] = AI_CURRICULUM_SPEC.map((cat) => {
  const firstPublicSlug = getFirstPublicLessonSlugInCategory(cat.id)
  const starterLinks: StarterDeepLink[] = [
    { label: 'Browse public library overview', lessonSlug: STARTER_LIBRARY_INDEX_SENTINEL },
    ...(firstPublicSlug
      ? [{ label: 'Open a free starter lesson in this category', lessonSlug: firstPublicSlug }]
      : []),
  ]

  return {
    id: cat.id,
    title: cat.title,
    summary: cat.summary,
    starterLinks,
    deeperWithAccess: [
      'More lesson readers + workspace practice flows as features ship—eligibility varies by plan',
      'Templates, drills, and structured packs expand access—still assistive materials, not certification or hiring guarantees',
    ],
  }
})

/** Paid / deeper catalog — materials & features, not outcomes. Surfaced via `/pricing` (subscriptions or bundles). */
export const PREMIUM_AI_TRACKS: PremiumAiTrack[] = [
  {
    id: 'advanced-prompting-lab',
    title: 'Advanced prompting lab',
    summary:
      'Longer scenarios, adversarial critiques, and constraint stress-tests—more exercises, not a certificate of mastery.',
    monetization: 'subscription',
  },
  {
    id: 'workflow-systems',
    title: 'AI workflow systems',
    summary:
      'Design hand-offs between prompts, checks, and owners for recurring operations—still requires human accountability.',
    monetization: 'subscription',
  },
  {
    id: 'agentic-supervised',
    title: 'Supervised agentic workflows',
    summary:
      'Multi-step patterns with explicit supervision hooks and rollback—availability depends on tools and plan limits.',
    monetization: 'bundle_or_subscription',
  },
  {
    id: 'team-ai-application',
    title: 'Team AI application kits',
    summary:
      'Shared templates, review gates, and lightweight governance prompts for small teams—feature-gated, not HR certification.',
    monetization: 'subscription',
  },
  {
    id: 'advanced-revision-content',
    title: 'Advanced revision & content systems',
    summary:
      'Deeper revision packs and structured content variants—more practice paths, not guaranteed publication outcomes.',
    monetization: 'bundle_or_subscription',
  },
  {
    id: 'premium-review-packs',
    title: 'Premium review packs',
    summary:
      'Additional checklists and exemplars for high-stakes drafts—assistive review aids, not legal or compliance sign-off.',
    monetization: 'bundle_or_subscription',
  },
]

export function starterLessonHref(lessonSlug: string) {
  return `${PUBLIC_AI_FOUNDATIONS_BASE_PATH}/${lessonSlug}`
}

export function resolveStarterLinkHref(lessonSlug: string) {
  if (lessonSlug === STARTER_LIBRARY_INDEX_SENTINEL) return PUBLIC_AI_FOUNDATIONS_BASE_PATH
  return starterLessonHref(lessonSlug)
}
