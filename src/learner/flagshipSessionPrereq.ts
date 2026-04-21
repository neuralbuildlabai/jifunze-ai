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
    return 'Complete checkpoints across modules to open capstone preparation.'
  }
  const n = session.prerequisites?.length ?? 0
  if (n === 0) return 'Continue from the start of this course.'
  return 'Unlocks after earlier sessions in this path are complete.'
}

export function lockedModuleQuizReason(): string {
  return 'Pass the module quiz for the previous module with the required score to continue—review that module if you need another attempt.'
}
