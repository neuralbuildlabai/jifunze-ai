/**
 * Standalone learner-catalog entries.
 *
 * Lives alongside, not inside, the flagship catalog (`flagshipCoursesCatalog.ts`,
 * `flagshipLearnerCatalogPolicy.ts`). UI consumers that already render flagship cards can
 * separately read this list to render standalone courses without any change to flagship code.
 *
 * Adding a course here does not register it as a flagship and does not affect flagship slugs,
 * progression, capstone rubrics, or pathway integration.
 */

import { practicalMathematicsCourse } from './practicalMathematicsCourse'
import type {
  PracticalMathematicsCourse,
  StandaloneCourseAccessLabel,
  StandaloneCourseLevel,
  StandaloneCourseModule,
} from './practicalMathematicsCourseTypes'

export type StandaloneCatalogEntry = {
  slug: string
  internalKey: string
  title: string
  /** Short marketing line for cards. */
  subtitle: string
  level: StandaloneCourseLevel
  /** Estimated total instructional + lab hours. */
  estimatedHours: number
  /** Always free-facing; no pricing/paywall in the standalone catalog. */
  accessLabel: StandaloneCourseAccessLabel
  /** A school label string — does NOT need to match flagship `FlagshipSchoolId`. */
  school: string
  /** Public route hint; final routing is owned by the consuming app. */
  publicRoute: string
  /** Source-of-truth course object for renderers that want full content. */
  source: PracticalMathematicsCourse
}

const PRACTICAL_MATH_CATALOG_ENTRY: StandaloneCatalogEntry = {
  slug: practicalMathematicsCourse.slug,
  internalKey: practicalMathematicsCourse.internalKey,
  title: practicalMathematicsCourse.title,
  subtitle:
    'Foundational to Intermediate · Practical math for life, work, business, finance, data, projects, property, healthcare cost understanding, and trade calculations.',
  level: practicalMathematicsCourse.level,
  estimatedHours: practicalMathematicsCourse.estimatedHours,
  accessLabel: practicalMathematicsCourse.accessLabel,
  school: practicalMathematicsCourse.school,
  publicRoute: `/learn/${practicalMathematicsCourse.slug}`,
  source: practicalMathematicsCourse,
}

export const STANDALONE_LEARNER_CATALOG: readonly StandaloneCatalogEntry[] = [
  PRACTICAL_MATH_CATALOG_ENTRY,
]

export function isStandaloneCourseSlug(slug: string): boolean {
  return STANDALONE_LEARNER_CATALOG.some((c) => c.slug === slug)
}

export function findStandaloneCourseBySlug(slug: string): StandaloneCatalogEntry | undefined {
  return STANDALONE_LEARNER_CATALOG.find((c) => c.slug === slug)
}

export function findStandaloneModule(
  courseSlug: string,
  moduleSlug: string,
): { entry: StandaloneCatalogEntry; module: StandaloneCourseModule } | undefined {
  const entry = findStandaloneCourseBySlug(courseSlug)
  if (!entry) return undefined
  const module = entry.source.modules.find((m) => m.slug === moduleSlug)
  if (!module) return undefined
  return { entry, module }
}

export function findStandaloneCourseByInternalKey(
  internalKey: string,
): StandaloneCatalogEntry | undefined {
  return STANDALONE_LEARNER_CATALOG.find((c) => c.internalKey === internalKey)
}
