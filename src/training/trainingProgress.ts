import type {
  LessonProgressRow,
  QuizAttemptRow,
  TrainingLessonRow,
  TrainingModuleWithContent,
  TrainingPlanWithTree,
  TrainingQuizRow,
} from './trainingTypes'

function lessonPm(rows: LessonProgressRow[]): Map<string, LessonProgressRow> {
  const m = new Map<string, LessonProgressRow>()
  for (const r of rows) m.set(r.lesson_id, r)
  return m
}

function quizPassed(attempt: QuizAttemptRow | undefined, totalQuestions: number): boolean {
  if (!attempt || attempt.status !== 'completed') return false
  return attempt.score >= totalQuestions && totalQuestions > 0
}

export function isLessonDone(
  lessonId: string,
  progress: LessonProgressRow[],
): boolean {
  return lessonPm(progress).get(lessonId)?.status === 'completed'
}

export function moduleLessonsComplete(
  mod: TrainingModuleWithContent,
  progress: LessonProgressRow[],
): boolean {
  const pm = lessonPm(progress)
  for (const l of mod.lessons) {
    if (pm.get(l.id)?.status !== 'completed') return false
  }
  return true
}

export function moduleQuizTotalQuestions(mod: TrainingModuleWithContent): number {
  return mod.quiz?.questions.length ?? 0
}

export function moduleQuizComplete(
  mod: TrainingModuleWithContent,
  attemptsByQuizId: Map<string, QuizAttemptRow>,
): boolean {
  if (!mod.quiz) return true
  const n = mod.quiz.questions.length
  const att = attemptsByQuizId.get(mod.quiz.id)
  return quizPassed(att, n)
}

export function isModuleComplete(
  mod: TrainingModuleWithContent,
  progress: LessonProgressRow[],
  attemptsByQuizId: Map<string, QuizAttemptRow>,
): boolean {
  return moduleLessonsComplete(mod, progress) && moduleQuizComplete(mod, attemptsByQuizId)
}

function planSupplementalQuizzesComplete(
  tree: TrainingPlanWithTree,
  attemptsByQuizId: Map<string, QuizAttemptRow>,
): boolean {
  for (const q of tree.plan_supplemental_quizzes) {
    const n = q.questions.length
    if (!quizPassed(attemptsByQuizId.get(q.id), n)) return false
  }
  return true
}

export function isPlanComplete(tree: TrainingPlanWithTree, progress: LessonProgressRow[], attempts: QuizAttemptRow[]): boolean {
  const am = new Map<string, QuizAttemptRow>()
  for (const a of attempts) am.set(a.quiz_id, a)
  if (tree.diagnostic_quiz) {
    const n = tree.diagnostic_quiz.questions.length
    const att = am.get(tree.diagnostic_quiz.id)
    if (!quizPassed(att, n)) return false
  }
  for (const m of tree.modules) {
    if (!isModuleComplete(m, progress, am)) return false
  }
  if (!planSupplementalQuizzesComplete(tree, am)) return false
  return true
}

export function flattenLessonsInOrder(tree: TrainingPlanWithTree): TrainingLessonRow[] {
  const out: TrainingLessonRow[] = []
  for (const m of tree.modules) {
    for (const l of m.lessons) out.push(l)
  }
  return out
}

export type NextTrainingStep =
  | { kind: 'lesson'; lesson: TrainingLessonRow; href: string; label: string }
  | { kind: 'quiz'; quiz: TrainingQuizRow; href: string; label: string }
  | { kind: 'done' }

/**
 * Walk modules in order: incomplete lesson first; then module quiz if lessons done but quiz not passed.
 */
export function pickNextTrainingStep(
  tree: TrainingPlanWithTree,
  progress: LessonProgressRow[],
  attempts: QuizAttemptRow[],
): NextTrainingStep {
  const planId = tree.plan.id
  const am = new Map<string, QuizAttemptRow>()
  for (const a of attempts) am.set(a.quiz_id, a)
  const pm = lessonPm(progress)

  if (tree.diagnostic_quiz) {
    const n = tree.diagnostic_quiz.questions.length
    const att = am.get(tree.diagnostic_quiz.id)
    if (!quizPassed(att, n)) {
      return {
        kind: 'quiz',
        quiz: tree.diagnostic_quiz,
        href: `/training/${planId}/quizzes/${tree.diagnostic_quiz.id}`,
        label: `Diagnostic: ${tree.diagnostic_quiz.title}`,
      }
    }
  }

  for (const mod of tree.modules) {
    for (const l of mod.lessons) {
      if (pm.get(l.id)?.status !== 'completed') {
        return {
          kind: 'lesson',
          lesson: l,
          href: `/training/${planId}/lessons/${l.id}`,
          label: `Lesson: ${l.title}`,
        }
      }
    }
    if (mod.quiz) {
      const n = mod.quiz.questions.length
      const att = am.get(mod.quiz.id)
      if (!quizPassed(att, n)) {
        return {
          kind: 'quiz',
          quiz: mod.quiz,
          href: `/training/${planId}/quizzes/${mod.quiz.id}`,
          label: `Checkpoint: ${mod.quiz.title}`,
        }
      }
    }
  }

  for (const sq of tree.plan_supplemental_quizzes) {
    const sn = sq.questions.length
    const att = am.get(sq.id)
    if (!quizPassed(att, sn)) {
      const kind = sq.quiz_kind ?? ''
      const label =
        kind === 'recap_checkpoint'
          ? `Recap: ${sq.title}`
          : kind === 'mixed_review'
            ? `Mixed review: ${sq.title}`
            : kind === 'exam_practice'
              ? `Exam-style practice: ${sq.title}`
              : `Review: ${sq.title}`
      return {
        kind: 'quiz',
        quiz: sq,
        href: `/training/${planId}/quizzes/${sq.id}`,
        label,
      }
    }
  }

  return { kind: 'done' }
}

export function countPlanProgress(input: {
  tree: TrainingPlanWithTree
  progress: LessonProgressRow[]
  attempts: QuizAttemptRow[]
}): {
  completedLessons: number
  totalLessons: number
  completedQuizzes: number
  totalQuizzes: number
  modulesDone: number
  totalModules: number
  planDone: boolean
} {
  const { tree, progress, attempts } = input
  const am = new Map<string, QuizAttemptRow>()
  for (const a of attempts) am.set(a.quiz_id, a)

  const totalLessons = flattenLessonsInOrder(tree).length
  let completedLessons = 0
  for (const l of flattenLessonsInOrder(tree)) {
    if (lessonPm(progress).get(l.id)?.status === 'completed') completedLessons += 1
  }

  let totalQuizzes = 0
  let completedQuizzes = 0
  let modulesDone = 0
  const totalModules = tree.modules.length

  if (tree.diagnostic_quiz) {
    totalQuizzes += 1
    const dn = tree.diagnostic_quiz.questions.length
    if (quizPassed(am.get(tree.diagnostic_quiz.id), dn)) completedQuizzes += 1
  }

  for (const mod of tree.modules) {
    if (mod.quiz) {
      totalQuizzes += 1
      const n = mod.quiz.questions.length
      if (quizPassed(am.get(mod.quiz.id), n)) completedQuizzes += 1
    }
    if (isModuleComplete(mod, progress, am)) modulesDone += 1
  }

  for (const sq of tree.plan_supplemental_quizzes) {
    totalQuizzes += 1
    const n = sq.questions.length
    if (quizPassed(am.get(sq.id), n)) completedQuizzes += 1
  }

  const planDone = isPlanComplete(tree, progress, attempts)

  return {
    completedLessons,
    totalLessons,
    completedQuizzes,
    totalQuizzes,
    modulesDone,
    totalModules,
    planDone,
  }
}
