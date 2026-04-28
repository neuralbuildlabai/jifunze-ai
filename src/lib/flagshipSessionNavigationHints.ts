import type { FlagshipCourseCurriculum } from '../data/learning/flagshipCourseCurricula'
import {
  priorModulesQuizSatisfied,
  type FlagshipCourseProgressState,
} from './flagshipCourseProgressDerived'
import { FLAGSHIP_CAPSTONE_MODULE_ID, type FlagshipSession } from '../data/learning/flagshipCourseSessions'
import { lockedForwardReason, lockedModuleQuizReason, sessionPrerequisitesMet } from '../learner/flagshipSessionPrereq'

/** Human-readable reason the next session is still locked (or null if reachable / no next). */
export function flagshipNextSessionBlockedReason(
  next: FlagshipSession | undefined,
  completed: Set<string>,
  curriculum: FlagshipCourseCurriculum | undefined,
  state: FlagshipCourseProgressState | undefined,
  capstonePrepAccessible: boolean,
): string | null {
  if (!next) return null
  if (completed.has(next.id)) return null
  if (!sessionPrerequisitesMet(completed, next)) {
    return lockedForwardReason(next)
  }
  if (next.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID && !capstonePrepAccessible) {
    return lockedForwardReason(next, { capstonePrep: true })
  }
  if (curriculum && state && !priorModulesQuizSatisfied(curriculum, next.moduleId, state)) {
    return lockedModuleQuizReason()
  }
  return 'Finish earlier requirements in this course to continue.'
}
