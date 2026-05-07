/**
 * Sequential progression for the Practical Mathematics course.
 *
 * Standalone — does NOT use, mutate, or read flagship progression keys.
 * Each lesson must be completed and the module quiz must be passed before the next module unlocks.
 *
 * Pass rule: ≥70% correct, with explicit fallback that an 8-question quiz needs ≥6 correct.
 */

import type {
  PracticalMathematicsCourse,
  StandaloneCourseModule,
} from './practicalMathematicsCourseTypes'
import { PRACTICAL_MATH_INTERNAL_KEY } from './practicalMathematicsCourseConstants'

export type PracticalMathQuizScore = {
  correct: number
  total: number
}

/**
 * Returns true when a quiz score meets the practical-math pass threshold.
 * - 8-question quizzes: 6 correct out of 8 (the explicit Jifunze fallback the spec asks for).
 * - Longer quizzes:     70% rounded up to the next whole correct answer.
 */
export function practicalMathQuizPassed(score: PracticalMathQuizScore): boolean {
  if (score.total <= 0) return false
  if (score.total === 8) return score.correct >= 6
  const required = Math.ceil(score.total * 0.7)
  return score.correct >= required
}

export type PracticalMathProgressState = {
  /** Lesson keys (`${moduleSlug}::${lessonNumber}`) the learner has completed. */
  completedLessonKeys: Set<string>
  /** Module slug → most recent passing quiz score (presence implies pass). */
  passedModuleQuizzes: Map<string, PracticalMathQuizScore>
}

export function emptyPracticalMathProgress(): PracticalMathProgressState {
  return {
    completedLessonKeys: new Set<string>(),
    passedModuleQuizzes: new Map<string, PracticalMathQuizScore>(),
  }
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

/** Internal-key + course-slug echo so consumers that route by key find the right course. */
export const PRACTICAL_MATH_PROGRESSION_KEY = PRACTICAL_MATH_INTERNAL_KEY
