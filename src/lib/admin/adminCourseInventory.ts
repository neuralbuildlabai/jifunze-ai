import { FREE_STARTER_RISE_COURSES } from '../../data/learning/freeStarterRiseCoursesCatalog'
import { FLAGSHIP_COURSES } from '../../data/learning/flagshipCoursesCatalog'
import { isFlagshipSlugInLearnerPublicCatalog } from '../../data/learning/flagshipLearnerCatalogPolicy'
import { isFlagshipCoursePublished } from '../../lib/pathwayProgressDerived'
import { STANDALONE_LEARNER_CATALOG } from '../../data/courses/standaloneCoursesCatalog'

export type AdminCourseInventoryKind =
  | 'flagship'
  | 'free_starter'
  | 'microlearning'
  | 'standalone'
  | 'paid'
  | 'other'

export type AdminCourseInventoryRow = {
  slug: string
  title: string
  route: string
  schoolOrCategory: string
  kind: AdminCourseInventoryKind
  /** True when the course appears on the public `/learn` discovery paths. */
  onPublicLearnerCatalog: boolean
  /** True when slug is part of the flagship product catalog metadata. */
  flagshipCatalog: boolean
}

export function buildAdminCourseInventoryRows(): AdminCourseInventoryRow[] {
  const rows: AdminCourseInventoryRow[] = []

  for (const c of FLAGSHIP_COURSES) {
    rows.push({
      slug: c.slug,
      title: c.title,
      route: `/learn/courses/${c.slug}`,
      schoolOrCategory: c.schoolId,
      kind: 'flagship',
      onPublicLearnerCatalog: isFlagshipSlugInLearnerPublicCatalog(c.slug),
      flagshipCatalog: true,
    })
  }

  for (const e of FREE_STARTER_RISE_COURSES) {
    rows.push({
      slug: e.slug,
      title: e.title,
      route: e.publicRoute,
      schoolOrCategory: e.category,
      kind: 'free_starter',
      onPublicLearnerCatalog: true,
      flagshipCatalog: false,
    })
  }

  for (const s of STANDALONE_LEARNER_CATALOG) {
    rows.push({
      slug: s.slug,
      title: s.title,
      route: s.publicRoute,
      schoolOrCategory: s.school,
      kind: 'standalone',
      onPublicLearnerCatalog: true,
      flagshipCatalog: false,
    })
  }

  return rows
}

export function adminFlagshipPublishedCount(): number {
  return FLAGSHIP_COURSES.filter((c) => isFlagshipCoursePublished(c.slug)).length
}

export function adminFlagshipHiddenFromPublicCatalogCount(): number {
  return FLAGSHIP_COURSES.filter((c) => !isFlagshipSlugInLearnerPublicCatalog(c.slug)).length
}
