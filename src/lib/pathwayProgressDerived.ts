import type { EmployablePathway } from '../data/learning/employablePathwaysCatalog'
import { FLAGSHIP_COURSES } from '../data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum } from '../data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum } from '../data/learning/flagshipCourseSessions'
import { completionSet, type FlagshipCourseProgressState } from './flagshipCourseProgressDerived'
import { getFlagshipCourseDisplayProgressPercent } from './aiEssentialsProgressMilestones'
import { loadFlagshipCourseProgress } from './flagshipCourseLocalProgress'

export type PathwayCourseProgressRow = {
  slug: string
  title: string
  /** 0–1 session completion fraction for this course when curriculum exists. */
  sessionFraction: number
  started: boolean
}

export type PathwayAggregateProgress = {
  rows: PathwayCourseProgressRow[]
  /** Average of per-course fractions for included slugs that exist in the flagship catalog. */
  averageSessionFraction: number
  includedAvailableCount: number
  startedCount: number
}

const flagshipSlugSet = new Set(FLAGSHIP_COURSES.map((c) => c.slug))

export function isFlagshipCoursePublished(slug: string): boolean {
  return flagshipSlugSet.has(slug)
}

export function derivePathwayCourseProgress(
  pathway: EmployablePathway,
  /** When set (e.g. merged local+remote), used instead of reading localStorage per slug. */
  progressBySlug?: Record<string, FlagshipCourseProgressState>,
): PathwayAggregateProgress {
  const rows: PathwayCourseProgressRow[] = []
  let sum = 0
  let n = 0
  let startedCount = 0

  for (const slug of pathway.includedCourseSlugs) {
    if (!isFlagshipCoursePublished(slug)) continue
    const meta = FLAGSHIP_COURSES.find((c) => c.slug === slug)
    const curriculum = getFlagshipCurriculum(slug)
    const sessions = curriculum ? buildSessionsForCurriculum(curriculum) : []
    const state = progressBySlug?.[slug] ?? loadFlagshipCourseProgress(slug)
    const completed = completionSet(state)
    const sessionFraction = sessions.length
      ? getFlagshipCourseDisplayProgressPercent(slug, curriculum, sessions, state) / 100
      : 0
    const started = completed.size > 0 || Boolean(state.startedAt)
    if (started) startedCount += 1
    sum += sessionFraction
    n += 1
    rows.push({
      slug,
      title: meta?.title ?? slug,
      sessionFraction,
      started,
    })
  }

  return {
    rows,
    averageSessionFraction: n ? sum / n : 0,
    includedAvailableCount: n,
    startedCount,
  }
}
