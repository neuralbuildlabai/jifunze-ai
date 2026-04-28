/**
 * Merge device-local flagship progress with a remote snapshot, then reconcile against curriculum.
 * Call from client hooks only (reads localStorage via loadFlagshipCourseProgress).
 *
 * Shared by pathway surfaces (`usePathwayProgressMap`, `buildMergedPathwayProgressMap`) and
 * learner Reports (`LearnerReportsPage`): `applyRemote` mirrors pathway “hydrated” semantics
 * (false = local + reconcile only; true = merge then reconcile).
 */

import { getFlagshipCurriculum } from '../data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum } from '../data/learning/flagshipCourseSessions'
import { mergeFlagshipProgressStates } from './flagshipCourseProgressMerge'
import { reconcileFlagshipProgressState, type FlagshipCourseProgressState } from './flagshipCourseProgressDerived'
import { loadFlagshipCourseProgress } from './flagshipCourseLocalProgress'

export function mergeLocalRemoteReconciledForSlug(
  courseSlug: string,
  remote: FlagshipCourseProgressState | null,
  /** When false, skip remote (local + reconcile only — avoids regressions before remote hydration). */
  applyRemote: boolean,
): FlagshipCourseProgressState {
  const local = loadFlagshipCourseProgress(courseSlug)
  const mergedRaw = applyRemote ? mergeFlagshipProgressStates(local, remote) : local
  const curriculum = getFlagshipCurriculum(courseSlug)
  const sessions = curriculum ? buildSessionsForCurriculum(curriculum) : []
  if (!curriculum || sessions.length === 0) return mergedRaw
  return reconcileFlagshipProgressState(mergedRaw, curriculum, sessions)
}
