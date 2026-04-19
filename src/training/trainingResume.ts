import type {
  LessonProgressRow,
  QuizAttemptRow,
  TrainingDashboardSummary,
  TrainingLessonRow,
  TrainingPlanRow,
  TrainingPlanWithTree,
  TrainingQuizRow,
} from './trainingTypes'

/** Initial / blocked state for dashboard hooks (matches `buildDashboardSummary` empty shape). */
export const EMPTY_TRAINING_DASHBOARD_SUMMARY: TrainingDashboardSummary = {
  plan: null,
  completedCount: 0,
  totalLessons: 0,
  completedQuizzes: 0,
  totalQuizzes: 0,
  modulesDone: 0,
  totalModules: 0,
  planDone: false,
  nextLesson: null,
  nextQuiz: null,
  resumeHref: null,
  resumeLabel: null,
}
import { countPlanProgress, pickNextTrainingStep } from './trainingProgress'

export { flattenLessonsInOrder } from './trainingProgress'

export function pickPrimaryPlan(plans: TrainingPlanRow[]): TrainingPlanRow | null {
  const active = plans.filter((p) => p.status === 'active')
  if (active.length > 0) return active[0]!
  if (plans.length > 0) return plans[0]!
  return null
}

export function buildDashboardSummary(input: {
  plans: TrainingPlanRow[]
  tree: TrainingPlanWithTree | null
  progress: LessonProgressRow[]
  attempts: QuizAttemptRow[]
}): TrainingDashboardSummary {
  const plan = input.tree?.plan ?? pickPrimaryPlan(input.plans)
  if (!plan) {
    return {
      plan: null,
      completedCount: 0,
      totalLessons: 0,
      completedQuizzes: 0,
      totalQuizzes: 0,
      modulesDone: 0,
      totalModules: 0,
      planDone: false,
      nextLesson: null,
      nextQuiz: null,
      resumeHref: null,
      resumeLabel: null,
    }
  }
  const tree = input.tree ?? null
  if (!tree) {
    return {
      plan,
      completedCount: 0,
      totalLessons: 0,
      completedQuizzes: 0,
      totalQuizzes: 0,
      modulesDone: 0,
      totalModules: 0,
      planDone: false,
      nextLesson: null,
      nextQuiz: null,
      resumeHref: null,
      resumeLabel: null,
    }
  }

  const counts = countPlanProgress({
    tree,
    progress: input.progress,
    attempts: input.attempts,
  })

  const step = pickNextTrainingStep(tree, input.progress, input.attempts)

  let resumeHref: string | null = null
  let resumeLabel: string | null = null
  let nextLesson: TrainingLessonRow | null = null
  let nextQuiz: TrainingQuizRow | null = null

  if (step.kind === 'lesson') {
    resumeHref = step.href
    resumeLabel = step.label
    nextLesson = step.lesson
  } else if (step.kind === 'quiz') {
    resumeHref = step.href
    resumeLabel = step.label
    nextQuiz = step.quiz
  } else {
    resumeHref = `/training/${plan.id}`
    resumeLabel = counts.planDone ? 'Plan complete — review' : 'Review plan'
  }

  return {
    plan,
    completedCount: counts.completedLessons,
    totalLessons: counts.totalLessons,
    completedQuizzes: counts.completedQuizzes,
    totalQuizzes: counts.totalQuizzes,
    modulesDone: counts.modulesDone,
    totalModules: counts.totalModules,
    planDone: counts.planDone,
    nextLesson,
    nextQuiz,
    resumeHref,
    resumeLabel,
  }
}
