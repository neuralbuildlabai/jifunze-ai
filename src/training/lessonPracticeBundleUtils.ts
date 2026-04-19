import type { LessonPracticeBundle, LessonPracticeState } from './practiceTypes'

export function parseLessonPracticeBundle(raw: unknown): LessonPracticeBundle | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (o.version !== 1 || !Array.isArray(o.exercises)) return null
  return raw as LessonPracticeBundle
}

export function defaultLessonPracticeState(): LessonPracticeState {
  return { current_tier: 1, attempt_count: 0 }
}

export function mergeLessonPracticePersisted(raw: unknown): LessonPracticeState {
  if (!raw || typeof raw !== 'object') return defaultLessonPracticeState()
  const o = raw as Record<string, unknown>
  const tier = typeof o.current_tier === 'number' && (o.current_tier === 1 || o.current_tier === 2 || o.current_tier === 3)
    ? (o.current_tier as LessonPracticeState['current_tier'])
    : 1
  return {
    current_tier: tier,
    attempt_count: typeof o.attempt_count === 'number' ? o.attempt_count : 0,
    last_submission_at: typeof o.last_submission_at === 'string' ? o.last_submission_at : undefined,
    last_submission: typeof o.last_submission === 'string' ? o.last_submission : undefined,
    last_feedback_lines: Array.isArray(o.last_feedback_lines)
      ? (o.last_feedback_lines as string[])
      : undefined,
    passed: typeof o.passed === 'boolean' ? o.passed : undefined,
    revealed_solution: typeof o.revealed_solution === 'boolean' ? o.revealed_solution : undefined,
  }
}

export function getPracticeBundleFromLesson(lesson: { practice_bundle?: unknown | null }): LessonPracticeBundle | null {
  return parseLessonPracticeBundle(lesson.practice_bundle ?? null)
}
