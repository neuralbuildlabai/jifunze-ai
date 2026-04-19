/**
 * Workspace-facing catalog for the Machine Learning library family.
 * Monetization language stays access/materials-focused—no mastery, certification, or outcome guarantees.
 */

import { ML_CURRICULUM_SPEC } from './mlCurriculumSpec'
import {
  PUBLIC_ML_LIBRARY_BASE_PATH,
  getFirstPublicMlLessonSlugInCategory,
} from './machineLearningCurriculum'

export const ML_STARTER_INDEX_SENTINEL = '__index__'

export type MlStarterDeepLink = {
  label: string
  lessonSlug: string
}

export type SignedInMlCategory = {
  id: string
  title: string
  summary: string
  starterLinks: MlStarterDeepLink[]
  deeperWithAccess: string[]
}

export type MlPremiumTrack = {
  id: string
  title: string
  summary: string
  monetization: 'subscription' | 'bundle_or_subscription'
}

export const ML_FAMILY_STARTER_PUBLIC_PATH = PUBLIC_ML_LIBRARY_BASE_PATH

export const SIGNED_IN_ML_CATEGORIES: SignedInMlCategory[] = ML_CURRICULUM_SPEC.map((cat) => {
  const firstPublicSlug = getFirstPublicMlLessonSlugInCategory(cat.id)
  const starterLinks: MlStarterDeepLink[] = [
    { label: 'Browse public ML library overview', lessonSlug: ML_STARTER_INDEX_SENTINEL },
    ...(firstPublicSlug ? [{ label: 'Open a free starter lesson in this category', lessonSlug: firstPublicSlug }] : []),
  ]
  return {
    id: cat.id,
    title: cat.title,
    summary: cat.summary,
    starterLinks,
    deeperWithAccess: [
      'Extended readers, datasets-style drills, and workspace templates when shipped—eligibility depends on plan limits',
      'Applied ML path readers may unlock via subscription or curated bundles—access to materials, not portfolio or hiring guarantees',
    ],
  }
})

export const PREMIUM_ML_TRACKS: MlPremiumTrack[] = [
  {
    id: 'applied-ml-production',
    title: 'Applied ML & production literacy',
    summary:
      'Case-style readers on monitoring, drift, and incident patterns—more scenarios, not a certificate of ML engineering competence.',
    monetization: 'subscription',
  },
  {
    id: 'eval-metrics-deep-dive',
    title: 'Evaluation & metrics lab',
    summary:
      'Confusion matrices, calibration, and slice analysis exercises—practice depth, not exam results.',
    monetization: 'bundle_or_subscription',
  },
  {
    id: 'fairness-oversight-pack',
    title: 'Fairness & oversight patterns',
    summary:
      'Structured reviews for bias risks and escalation—assistive governance prompts, not legal advice.',
    monetization: 'bundle_or_subscription',
  },
]

export function mlStarterLessonHref(lessonSlug: string) {
  return `${PUBLIC_ML_LIBRARY_BASE_PATH}/${lessonSlug}`
}

export function resolveMlStarterLinkHref(lessonSlug: string) {
  if (lessonSlug === ML_STARTER_INDEX_SENTINEL) return PUBLIC_ML_LIBRARY_BASE_PATH
  return mlStarterLessonHref(lessonSlug)
}
