/**
 * Readiness snapshot — composite heuristic today (chiefly coverage + completion + placement confidence).
 * Dimensions ontology: `contracts/readinessDimensions.ts`, doc §1. Trajectory is not computed here.
 */
import { countPlanProgress, isPlanComplete } from './trainingProgress'
import { defaultReadinessArchitecture } from '../knowledge/readinessArchitecture'
import type { ReadinessArchitectureV1 } from '../knowledge/readinessArchitecture'
import type { TrainingKnowledgeSpec } from '../knowledge/types'
import type {
  LessonProgressRow,
  QuizAttemptRow,
  TrainingPlanLearnerPlacementRow,
  TrainingPlanWithTree,
} from './trainingTypes'

export type ReadinessSnapshot = {
  /** 0 = building … 3 = stretch / exam orientation */
  band: 0 | 1 | 2 | 3
  bandLabel: string
  /** One-line confidence / preparation summary. */
  confidenceLine: string
  /** Spaced reinforcement: next suggested review moment (deterministic heuristic). */
  nextSpacedReview: { dueIso: string; label: string } | null
  fastReviewAvailable: boolean
  mixedReviewUnlocked: boolean
  examPracticeEnabled: boolean
  revisionExcerpts: string[]
}

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x))
}

function readinessArch(spec: TrainingKnowledgeSpec | null | undefined): ReadinessArchitectureV1 {
  if (spec?.readiness_architecture) return spec.readiness_architecture
  const topic = spec?.domain.topic?.trim() || 'your topic'
  const objective = spec?.domain.objective?.trim() || 'your objective'
  return defaultReadinessArchitecture({ topic, objective })
}

/**
 * Bands + spaced-review hints for dashboards. Designed to evolve into stronger signals (weak areas, item banks).
 */
export function computeReadinessSnapshot(input: {
  tree: TrainingPlanWithTree
  progress: LessonProgressRow[]
  attempts: QuizAttemptRow[]
  knowledgeSpec?: TrainingKnowledgeSpec | null
  placement?: TrainingPlanLearnerPlacementRow | null
}): ReadinessSnapshot {
  const { tree, progress, attempts, knowledgeSpec, placement } = input
  const arch = readinessArch(knowledgeSpec ?? undefined)
  const bands = arch.readiness_band_labels

  const counts = countPlanProgress({ tree, progress, attempts })
  const denom = counts.totalLessons + counts.totalQuizzes
  const completionRatio = denom > 0 ? (counts.completedLessons + counts.completedQuizzes) / denom : 0

  const quizRatio =
    counts.totalQuizzes > 0 ? clamp01(counts.completedQuizzes / counts.totalQuizzes) : completionRatio

  let blend = 0.55 * completionRatio + 0.45 * quizRatio
  if (placement?.self_confidence_1_5 != null && !Number.isNaN(placement.self_confidence_1_5)) {
    blend = blend * 0.72 + clamp01((placement.self_confidence_1_5 - 1) / 4) * 0.28
  }

  const band: 0 | 1 | 2 | 3 =
    blend < 0.28 ? 0 : blend < 0.55 ? 1 : blend < 0.82 ? 2 : 3

  let confidenceLine = ''
  if (band <= 1) {
    confidenceLine =
      'Focus on finishing lessons + checkpoints — spaced reviews activate as you accumulate completions.'
  } else if (band === 2) {
    confidenceLine =
      'Core path underway — use mixed-review and recap drills before treating sessions as exam-like.'
  } else {
    confidenceLine =
      'Solid coverage — rotate mixed-topic retrieval and timed exam-practice slots when preparing for stakes.'
  }

  if (placement?.diagnostic_score_percent != null && placement.diagnostic_score_percent < 60) {
    confidenceLine =
      `Diagnostic (${placement.diagnostic_score_percent}%) suggests slower pacing until recap checkpoints stabilize.`
  }

  let nextSpacedReview: ReadinessSnapshot['nextSpacedReview'] = null
  const intervals = arch.spaced_reinforcement.intervals_days
  const lessonCompletions = progress
    .filter((p) => p.status === 'completed' && p.completed_at)
    .map((p) => ({ id: p.lesson_id, at: Date.parse(p.completed_at!) }))
    .filter((x) => !Number.isNaN(x.at))

  const now = Date.now()
  if (lessonCompletions.length && intervals.length) {
    let best: { due: number; label: string } | null = null
    for (const lc of lessonCompletions) {
      const firstGap = intervals[0] ?? 1
      const due = lc.at + firstGap * 86_400_000
      if (due > now && (!best || due < best.due)) {
        best = { due, label: `First-interval refresh for a completed lesson (${firstGap}d cadence)` }
      }
    }
    if (!best && lessonCompletions.length) {
      /** All first-interval windows elapsed — bump to next spacing hint. */
      const secondGap = intervals[1] ?? intervals[0] ?? 7
      const latest = lessonCompletions.reduce((a, b) => (a.at > b.at ? a : b))
      const due = latest.at + secondGap * 86_400_000
      best = { due, label: `Next reinforcement pass (${secondGap}d rhythm)` }
    }
    if (best) nextSpacedReview = { dueIso: new Date(best.due).toISOString(), label: best.label }
  }

  const modulesDone = counts.modulesDone
  const mixedReviewUnlocked = modulesDone >= arch.mixed_review.min_modules_before_unlock && arch.mixed_review.enabled

  const planDone = isPlanComplete(tree, progress, attempts)

  return {
    band,
    bandLabel: bands[band] ?? bands[1] ?? 'On track',
    confidenceLine,
    nextSpacedReview,
    fastReviewAvailable: arch.fast_review.enabled && !planDone,
    mixedReviewUnlocked,
    examPracticeEnabled: arch.exam_practice.enabled && arch.exam_practice.item_bank_mode !== undefined,
    revisionExcerpts: arch.revision_excerpts.slice(0, 5),
  }
}
