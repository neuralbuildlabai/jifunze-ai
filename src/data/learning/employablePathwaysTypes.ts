import type { FlagshipSchoolId } from './flagshipCoursesCatalog'

export type EmployablePathwayStatus = 'active' | 'planned' | 'coming_soon'

export type EmployablePathway = {
  slug: string
  title: string
  shortTitle: string
  description: string
  targetLearner: string
  levelRange: string
  estimatedDuration: string
  /** Primary school alignment (catalog organization). */
  schoolId: FlagshipSchoolId
  /** Optional secondary browse tags — learner goals, not separate schools. */
  learnerGoals: string[]
  /** Published flagship courses in this pathway (must exist in `FLAGSHIP_COURSES`). */
  includedCourseSlugs: string[]
  /** Future courses — metadata only; see `plannedCoursesCatalog`. */
  plannedCourseSlugs: string[]
  skillsGained: string[]
  possibleRoles: string[]
  portfolioOutputs: string[]
  finalProjectCapstone: string
  /** Readiness / certificate framing — honest, no PDF issuance implied. */
  certificateReadinessCriteria: string
  kenyaRelevance: string
  globalRelevance: string
  recommendedNextPathwaySlug: string | null
  status: EmployablePathwayStatus
  featured: boolean
}
