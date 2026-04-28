import type { EmployablePathway } from '../data/learning/employablePathwaysTypes'
import type { FlagshipCourseProgressState } from './flagshipCourseProgressDerived'
import { mergeLocalRemoteReconciledForSlug } from './flagshipCourseProgressLocalRemoteMerge'
import { isFlagshipCoursePublished } from './pathwayProgressDerived'

/**
 * Per-course merged progress for pathway UI (local + optional remote after hydration).
 */
export function buildMergedPathwayProgressMap(
  pathway: EmployablePathway,
  remoteBySlug: Partial<Record<string, FlagshipCourseProgressState>>,
  applyRemote: boolean,
): Record<string, FlagshipCourseProgressState> {
  const m: Record<string, FlagshipCourseProgressState> = {}
  for (const slug of pathway.includedCourseSlugs) {
    if (!isFlagshipCoursePublished(slug)) continue
    const remote = remoteBySlug[slug]
    m[slug] = mergeLocalRemoteReconciledForSlug(slug, remote ?? null, applyRemote)
  }
  return m
}
