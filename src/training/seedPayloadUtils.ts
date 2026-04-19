import type { SeedLesson, SeedModule } from './seedStructure'

export function normalizeLessonForPayload(les: SeedLesson): Record<string, unknown> {
  const row: Record<string, unknown> = {
    title: les.title.trim(),
    content: les.content.trim(),
    objectives: les.objectives.trim(),
    lesson_summary: les.lesson_summary.trim(),
    practical_example: les.practical_example.trim(),
    action_exercise: les.action_exercise.trim(),
    reflection_prompt: les.reflection_prompt.trim(),
    mistakes_to_avoid: les.mistakes_to_avoid.trim(),
    takeaway: les.takeaway.trim(),
    sort_order: les.sort_order,
    estimated_minutes: les.estimated_minutes ?? null,
  }
  if (les.practice_bundle) {
    row.practice_bundle = les.practice_bundle as unknown as Record<string, unknown>
  }
  return row
}

export function validateSeedOrThrow(modules: SeedModule[]): void {
  if (modules.length < 3 || modules.length > 6) {
    throw new Error('Training seed: expected 3–6 modules.')
  }
  for (const m of modules) {
    if (m.lessons.length < 3 || m.lessons.length > 8) {
      throw new Error('Training seed: each module expects 3–8 lessons.')
    }
    if (!m.quiz.questions.length) {
      throw new Error('Training seed: each module needs a checkpoint quiz.')
    }
    for (const qn of m.quiz.questions) {
      const opts = qn.options_json
      if (!Array.isArray(opts) || opts.length < 3) {
        throw new Error('Training seed: each question needs at least 3 options.')
      }
      const idx = Number.parseInt(qn.correct_answer, 10)
      if (Number.isNaN(idx) || idx < 0 || idx >= opts.length) {
        throw new Error('Training seed: invalid correct_answer index.')
      }
    }
  }
}
