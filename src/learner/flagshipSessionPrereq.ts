import { FLAGSHIP_CAPSTONE_MODULE_ID, type FlagshipSession } from '@/data/learning/flagshipCourseSessions'
import type { FlagshipCourseCurriculum } from '@/data/learning/flagshipCourseCurricula'
import { priorModulesQuizSatisfied, type FlagshipCourseProgressState } from '@/lib/flagshipCourseProgressDerived'

/** True when all prerequisite session ids are in the completed set. */
export function sessionPrerequisitesMet(completedSessionIds: Set<string>, session: FlagshipSession): boolean {
  const reqs = session.prerequisites
  if (!reqs?.length) return true
  return reqs.every((id) => completedSessionIds.has(id))
}

/**
 * Forward access: learner can open this session if prerequisites are met.
 * Backward access: completed sessions remain navigable regardless.
 */
export function sessionIsUnlockedForProgression(completedSessionIds: Set<string>, session: FlagshipSession): boolean {
  if (completedSessionIds.has(session.id)) return true
  return sessionPrerequisitesMet(completedSessionIds, session)
}

export function sessionOpenForLearner(
  completedSessionIds: Set<string>,
  session: FlagshipSession,
  opts: {
    capstonePrepAccessible: boolean
    curriculum?: FlagshipCourseCurriculum
    progressState?: FlagshipCourseProgressState
  },
): boolean {
  if (completedSessionIds.has(session.id)) return true
  if (!sessionPrerequisitesMet(completedSessionIds, session)) return false
  if (session.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID && !opts.capstonePrepAccessible) return false
  if (!priorModulesQuizSatisfied(opts.curriculum, session.moduleId, opts.progressState)) return false
  return true
}

export function lockedForwardReason(session: FlagshipSession, opts?: { capstonePrep?: boolean }): string {
  if (opts?.capstonePrep) {
    return 'Finish mastery checkpoints across modules to open capstone preparation.'
  }
  const n = session.prerequisites?.length ?? 0
  if (n === 0) return 'Start from the first session in this course.'
  return 'Finish the prior session in order first.'
}

export function lockedModuleQuizReason(): string {
  return 'Pass the previous module quiz to unlock this module.'
}
