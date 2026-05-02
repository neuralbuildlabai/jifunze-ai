import type { FlagshipCourse, FlagshipSchoolId } from './flagshipCoursesCatalog'
import { FLAGSHIP_COURSES } from './flagshipCoursesCatalog'

/**
 * Flagship courses shown on learner/public catalog browse (/learn, school pages, featured grids).
 * Expand this allowlist only when a course is content-complete and product-approved for discovery;
 * deep links, pathways, and progress stay available for all flagship slugs elsewhere.
 */
const LEARNER_PUBLIC_CATALOG_FLAGSHIP_SLUGS = new Set<string>(['ai-essentials'])

export function isFlagshipSlugInLearnerPublicCatalog(slug: string): boolean {
  return LEARNER_PUBLIC_CATALOG_FLAGSHIP_SLUGS.has(slug)
}

export function learnerPublicCatalogFlagshipCourses(): FlagshipCourse[] {
  return FLAGSHIP_COURSES.filter((c) => LEARNER_PUBLIC_CATALOG_FLAGSHIP_SLUGS.has(c.slug))
}

export function learnerPublicCatalogCoursesForSchool(schoolId: FlagshipSchoolId): FlagshipCourse[] {
  return learnerPublicCatalogFlagshipCourses().filter((c) => c.schoolId === schoolId)
}

const SCHOOL_ORDER: FlagshipSchoolId[] = ['ai_digital', 'business_growth', 'career_intellect', 'leadership_learning']

/** Schools that currently have at least one learner-catalog flagship course (stable browse order). */
export function learnerPublicCatalogSchoolIdsInOrder(): FlagshipSchoolId[] {
  const withCourses = new Set(
    learnerPublicCatalogFlagshipCourses().map((c) => c.schoolId),
  )
  return SCHOOL_ORDER.filter((id) => withCourses.has(id))
}
