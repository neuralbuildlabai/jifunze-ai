/**
 * Compact, privacy-safe payloads for persisted learner intelligence (no raw quiz answers).
 * Ontology: docs/jifunze-ontology-and-contracts.md §4 · contracts: `./contracts/snapshotContract`
 */
import type { TrainingKnowledgeSpec } from '../knowledge/types'
import { INTELLIGENCE_SNAPSHOT_PAYLOAD_VERSION } from './contracts/snapshotContract'
import { computeReadinessSnapshot } from './readinessIndicators'
import type {
  LessonProgressRow,
  QuizAttemptRow,
  TrainingPlanLearnerPlacementRow,
  TrainingPlanWithTree,
} from './trainingTypes'
import { isPlanComplete } from './trainingProgress'
import { buildLearnerWeakAreaReport, formatWeakAreaSummaryLine } from './weakAreaAnalysis'

export { INTELLIGENCE_SNAPSHOT_PAYLOAD_VERSION }

export type IntelligenceSnapshotPayloadV1 = {
  version: typeof INTELLIGENCE_SNAPSHOT_PAYLOAD_VERSION
  trigger_kind: 'checkpoint'
  source_quiz_id: string | null
  quiz_score: number | null
  quiz_total: number | null
  quiz_passed: boolean
  plan_complete_after: boolean
  weak_summary_line: string
  weak_concepts: Array<{ conceptKey: string; label: string; severity: string; quizWrongCount: number }>
  revisit_lesson_titles: string[]
  readiness_band: number
  readiness_band_label: string
  readiness_confidence_line: string
  mixed_review_unlocked: boolean
  exam_practice_enabled: boolean
  remediation_titles: string[]
}

export function parseIntelligenceSnapshotPayload(
  payloadJson: unknown,
): IntelligenceSnapshotPayloadV1 | null {
  if (!payloadJson || typeof payloadJson !== 'object') return null
  const o = payloadJson as Partial<IntelligenceSnapshotPayloadV1>
  if (o.version !== INTELLIGENCE_SNAPSHOT_PAYLOAD_VERSION) return null
  if (o.trigger_kind !== 'checkpoint') return null
  return o as IntelligenceSnapshotPayloadV1
}

export function buildIntelligenceSnapshotPayloadV1(input: {
  tree: TrainingPlanWithTree
  progress: LessonProgressRow[]
  quizAttempts: QuizAttemptRow[]
  placement: TrainingPlanLearnerPlacementRow | null
  knowledgeSpec: TrainingKnowledgeSpec | null
  quizId: string
  quizScore: number
  quizTotal: number
}): IntelligenceSnapshotPayloadV1 {
  const { tree, progress, quizAttempts, placement, knowledgeSpec, quizId, quizScore, quizTotal } = input
  const weakReport = buildLearnerWeakAreaReport({
    tree,
    progress,
    quizAttempts,
    placement,
    knowledgeSpec,
  })
  const readiness = computeReadinessSnapshot({
    tree,
    progress,
    attempts: quizAttempts,
    knowledgeSpec,
    placement,
  })
  const planCompleteAfter = isPlanComplete(tree, progress, quizAttempts)
  const passed = quizTotal > 0 && quizScore >= quizTotal

  return {
    version: INTELLIGENCE_SNAPSHOT_PAYLOAD_VERSION,
    trigger_kind: 'checkpoint',
    source_quiz_id: quizId,
    quiz_score: quizScore,
    quiz_total: quizTotal,
    quiz_passed: passed,
    plan_complete_after: planCompleteAfter,
    weak_summary_line: formatWeakAreaSummaryLine(weakReport),
    weak_concepts: weakReport.weakConcepts.slice(0, 12).map((c) => ({
      conceptKey: c.conceptKey,
      label: c.label,
      severity: c.severity,
      quizWrongCount: c.quizWrongCount,
    })),
    revisit_lesson_titles: weakReport.revisitSuggestions.slice(0, 6).map((r) => r.lessonTitle),
    readiness_band: readiness.band,
    readiness_band_label: readiness.bandLabel,
    readiness_confidence_line: readiness.confidenceLine,
    mixed_review_unlocked: readiness.mixedReviewUnlocked,
    exam_practice_enabled: readiness.examPracticeEnabled,
    remediation_titles: weakReport.remediation.slice(0, 4).map((m) => m.title),
  }
}
