import {
  readStandaloneCourseProgressFromStorage,
  writeStandaloneCourseProgressToStorage,
} from './practicalMathProgressStorage'
import type { PracticalMathProgressState } from '../data/courses/practicalMathematicsProgression'

/**
 * Minimal completion tracking for hosted interactive microlearning pilots — reuses the standalone localStorage blob
 * (`STANDALONE_COURSES_PROGRESS_V2_KEY`) with course-specific keys. Completion is learner-declared on this device.
 */

export function markRisePilotCourseSessionStarted(
  progressInternalKey: string,
  sessionStartedMarkerLessonKey: string,
): void {
  const prev = readStandaloneCourseProgressFromStorage(progressInternalKey)
  if (prev.completedLessonKeys.has(sessionStartedMarkerLessonKey)) return
  const keys = new Set(prev.completedLessonKeys)
  keys.add(sessionStartedMarkerLessonKey)
  const next: PracticalMathProgressState = {
    ...prev,
    completedLessonKeys: keys,
  }
  writeStandaloneCourseProgressToStorage(progressInternalKey, next)
}

export function markRisePilotCourseLearnerComplete(progressInternalKey: string): void {
  const prev = readStandaloneCourseProgressFromStorage(progressInternalKey)
  writeStandaloneCourseProgressToStorage(progressInternalKey, {
    ...prev,
    capstoneComplete: true,
  })
}

export function isRisePilotCourseLearnerComplete(progressInternalKey: string): boolean {
  return readStandaloneCourseProgressFromStorage(progressInternalKey).capstoneComplete === true
}
