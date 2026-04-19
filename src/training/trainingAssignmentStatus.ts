import { countPlanProgress, isPlanComplete } from './trainingProgress'
import type {
  LessonProgressRow,
  QuizAttemptRow,
  TrainingAssignmentStatus,
  TrainingPlanWithTree,
} from './trainingTypes'

export function deriveAssignmentProgress(input: {
  tree: TrainingPlanWithTree
  progress: LessonProgressRow[]
  attempts: QuizAttemptRow[]
  assignedUserId: string
  dueDateIso: string | null
}): {
  progressPercent: number
  effectiveStatus: TrainingAssignmentStatus
  planDone: boolean
} {
  const userProgress = input.progress.filter((p) => p.user_id === input.assignedUserId)
  const userAttempts = input.attempts.filter((a) => a.user_id === input.assignedUserId)
  const counts = countPlanProgress({
    tree: input.tree,
    progress: userProgress,
    attempts: userAttempts,
  })
  const planDone = isPlanComplete(input.tree, userProgress, userAttempts)
  const denom = counts.totalLessons + counts.totalQuizzes
  const num = counts.completedLessons + counts.completedQuizzes
  const progressPercent = denom > 0 ? Math.round((num / denom) * 100) : 0

  let effectiveStatus: TrainingAssignmentStatus
  if (planDone) {
    effectiveStatus = 'completed'
  } else if (input.dueDateIso) {
    const due = Date.parse(input.dueDateIso)
    if (!Number.isNaN(due) && due < Date.now()) {
      effectiveStatus = 'overdue'
    } else if (num > 0) {
      effectiveStatus = 'in_progress'
    } else {
      effectiveStatus = 'assigned'
    }
  } else if (num > 0) {
    effectiveStatus = 'in_progress'
  } else {
    effectiveStatus = 'assigned'
  }

  return { progressPercent, effectiveStatus, planDone }
}
