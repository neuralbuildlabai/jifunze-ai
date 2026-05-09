/**
 * Sequential progression for the Practical Mathematics course.
 *
 * Standalone — does NOT use, mutate, or read flagship progression keys.
 * Each lesson must be completed and the module quiz must be passed before the next module unlocks.
 *
 * Pass rule (this course only): ≥75% correct on each module quiz, using ceil(0.75 × N) whole-question minimum.
 */

import type {
  PracticalMathematicsCourse,
  StandaloneCourseModule,
} from './practicalMathematicsCourseTypes'
import { PRACTICAL_MATH_INTERNAL_KEY } from './practicalMathematicsCourseConstants'

/** Practical Mathematics module quiz pass rate — isolated from flagship courses. */
export const PRACTICAL_MATH_QUIZ_PASS_RATE = 0.75 as const

export type PracticalMathQuizScore = {
  correct: number
  total: number
}

/**
 * Returns true when a quiz score meets the practical-math pass threshold (75%+, whole questions).
 */
export function practicalMathQuizPassed(score: PracticalMathQuizScore): boolean {
  if (score.total <= 0) return false
  const required = Math.ceil(score.total * PRACTICAL_MATH_QUIZ_PASS_RATE)
  return score.correct >= required
}

export type PracticalMathProgressState = {
  /** Lesson keys (`${moduleSlug}::${lessonNumber}`) the learner has completed. */
  completedLessonKeys: Set<string>
  /** Module slug → most recent passing quiz score (presence implies pass). */
  passedModuleQuizzes: Map<string, PracticalMathQuizScore>
  /**
   * Learner-confirmed completion of the Module 16 capstone artifact (standalone local progress only).
   * Does not replace professional verification before acting on any numbers.
   */
  capstoneComplete: boolean
}

export function emptyPracticalMathProgress(): PracticalMathProgressState {
  return {
    completedLessonKeys: new Set<string>(),
    passedModuleQuizzes: new Map<string, PracticalMathQuizScore>(),
    capstoneComplete: false,
  }
}

/** True when the learner has marked the Module 16 capstone complete in local progress. */
export function practicalMathCapstoneComplete(progress: PracticalMathProgressState): boolean {
  return progress.capstoneComplete === true
}

export function lessonKey(module: StandaloneCourseModule, lessonNumber: string): string {
  return `${module.slug}::${lessonNumber}`
}

export function moduleAllLessonsComplete(
  module: StandaloneCourseModule,
  progress: PracticalMathProgressState,
): boolean {
  return module.lessons.every((l) =>
    progress.completedLessonKeys.has(lessonKey(module, l.lessonNumber)),
  )
}

export function moduleQuizPassed(
  module: StandaloneCourseModule,
  progress: PracticalMathProgressState,
): boolean {
  if (module.moduleQuiz.length === 0) return true
  const score = progress.passedModuleQuizzes.get(module.slug)
  if (!score) return false
  return practicalMathQuizPassed(score)
}

export function moduleFullyComplete(
  module: StandaloneCourseModule,
  progress: PracticalMathProgressState,
): boolean {
  return moduleAllLessonsComplete(module, progress) && moduleQuizPassed(module, progress)
}

/**
 * Returns the next module the learner should work on, respecting sequential progression.
 * Returns `undefined` once the entire course is complete.
 */
export function findNextPracticalMathModule(
  course: PracticalMathematicsCourse,
  progress: PracticalMathProgressState,
): StandaloneCourseModule | undefined {
  for (const m of course.modules) {
    if (!moduleFullyComplete(m, progress)) return m
  }
  return undefined
}

/**
 * Returns true when every module has its lessons complete and module quiz passed
 * (capstone artifact submission and rubric self-grade are handled separately).
 */
export function isPracticalMathCourseFullyComplete(
  course: PracticalMathematicsCourse,
  progress: PracticalMathProgressState,
): boolean {
  return course.modules.every((m) => moduleFullyComplete(m, progress))
}

/**
 * Aggregate score across all recorded module quiz attempts (all 16 modules must have scores).
 * Returns null if any module quiz score is missing.
 */
export function practicalMathWeightedScorePercent(
  course: PracticalMathematicsCourse,
  progress: PracticalMathProgressState,
): number | null {
  let correct = 0
  let total = 0
  for (const m of course.modules) {
    if (m.moduleQuiz.length === 0) continue
    const s = progress.passedModuleQuizzes.get(m.slug)
    if (!s) return null
    correct += s.correct
    total += s.total
  }
  if (total <= 0) return null
  return (100 * correct) / total
}

/**
 * Certificate eligibility: all modules fully complete and overall quiz aggregate ≥ 75%.
 * (Per-module pass already enforces a 75% bar; the aggregate check matches the course completion rule.)
 */
export function practicalMathCertificateEligible(
  course: PracticalMathematicsCourse,
  progress: PracticalMathProgressState,
): boolean {
  if (!isPracticalMathCourseFullyComplete(course, progress)) return false
  const pct = practicalMathWeightedScorePercent(course, progress)
  if (pct === null) return false
  if (pct + 1e-9 < 75) return false
  if (course.capstoneModuleSlug && !practicalMathCapstoneComplete(progress)) return false
  return true
}

/** Internal-key + course-slug echo so consumers that route by key find the right course. */
export const PRACTICAL_MATH_PROGRESSION_KEY = PRACTICAL_MATH_INTERNAL_KEY
