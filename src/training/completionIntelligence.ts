import type { TrainingKnowledgeSpec } from '../knowledge/types'
import { TRUST_COPY } from './trustCopy'
import { computeReadinessSnapshot, type ReadinessSnapshot } from './readinessIndicators'
import type { WeakAreaReport } from './remediationTypes'
import { isPlanComplete } from './trainingProgress'
import {
  buildRemediationRevisionContinuityFromSnapshots,
  type RemediationRevisionContinuity,
} from './intelligenceContinuity'
import type {
  LessonProgressRow,
  QuizAttemptRow,
  TrainingLearnerIntelligenceSnapshotRow,
  TrainingPlanLearnerPlacementRow,
  TrainingPlanWithTree,
} from './trainingTypes'

export type CompletionRevisionStep = {
  title: string
  detail: string
  href?: string
}

export type CompletionReadinessSignals = {
  band: ReadinessSnapshot['band']
  bandLabel: string
  /** In-product practice signals — not validated workplace performance or HR endorsement. */
  workUseLine: string
  /** Exam-style rehearsal guidance — supports preparation; does not predict credential outcomes. */
  examPreparationLine: string
  /** Mirrors dashboard readiness one-liner for consistency. */
  readinessConfidenceLine: string
}

export type CompletionIntelligence = {
  generatedAtIso: string
  planId: string
  planTitle: string
  complete: true
  completionSummary: string
  strengthsDemonstrated: string[]
  weakAreasRemaining: string[]
  recommendedRevisionPath: CompletionRevisionStep[]
  recommendedNextCourse: {
    headline: string
    detail: string
  }
  readiness: CompletionReadinessSignals
  /** Longitudinal readiness vs earlier checkpoints when snapshot history exists. */
  longitudinalReadinessComparison?: string
  /** Spotlight lines from repeated weak signals across checkpoints (summaries only). */
  persistentWeakSpotlight?: string[]
}

function normLevel(raw: string | null | undefined): string {
  return (raw ?? '').trim().toLowerCase()
}

function learnerLevelFromSpec(spec: TrainingKnowledgeSpec | null | undefined): string | null {
  return spec?.domain.learner_level ? String(spec.domain.learner_level).toLowerCase() : null
}

function quizPassed(att: QuizAttemptRow | undefined, total: number): boolean {
  if (!att || att.status !== 'completed') return false
  return total > 0 && att.score >= total
}

export function recommendedNextCourseCopy(input: {
  planTitle: string
  topic: string | null | undefined
  skillLevelPlan: string | null | undefined
  knowledgeSpec: TrainingKnowledgeSpec | null | undefined
}): { headline: string; detail: string } {
  const topic = (input.topic ?? input.planTitle).trim() || 'this topic'
  const fromSpec = learnerLevelFromSpec(input.knowledgeSpec)
  const raw = fromSpec ?? normLevel(input.skillLevelPlan)
  const isBegin =
    raw.includes('begin') || raw === '' || raw === 'foundation' || raw === 'intro' || raw === 'foundational'
  const isInt = raw.includes('intermediate') || raw === 'mid' || raw === 'working' || raw === 'practitioner'
  const isAdv = raw.includes('advanced') || raw.includes('expert') || raw.includes('lead')

  if (isBegin) {
    return {
      headline: 'Next course: intermediate application on the same topic',
      detail: `You closed the foundational path for “${topic}”. Follow with a plan that emphasizes decision tradeoffs, stakeholder communication, and one sustained workplace artifact — or browse your workspace for the next-level plan.`,
    }
  }
  if (isInt && !isAdv) {
    return {
      headline: 'Next course: advanced depth, leadership, or credential-focused rehearsal',
      detail: `You’ve completed the core arc for “${topic}”. Choose either a narrower advanced plan (synthesis / edge cases) or a track oriented to external credential rehearsal—always pair with official syllabi and materials when applicable.`,
    }
  }
  if (isAdv) {
    return {
      headline: 'Next course: specialization, facilitation, or maintainer tracks',
      detail: `You finished an advanced path on “${topic}”. Rotate into teaching/facilitating others, a adjacent domain, or periodic retrieval drills rather than stacking more breadth.`,
    }
  }
  return {
    headline: 'Next course: choose depth or credential-oriented rehearsal',
    detail: `Plan complete on “${topic}”. Pick the next plan based on whether you want deeper craft, broader coverage, or exam-style rehearsal for external credentials (supplement—not replace—official prep).`,
  }
}

function strengthsFromSignals(input: {
  tree: TrainingPlanWithTree
  attemptsByQuizId: Map<string, QuizAttemptRow>
  weakReport: WeakAreaReport
  knowledgeSpec: TrainingKnowledgeSpec | null | undefined
}): string[] {
  const { tree, attemptsByQuizId, weakReport, knowledgeSpec } = input
  const out: string[] = []

  const weakKeys = new Set(weakReport.weakConcepts.map((w) => w.conceptKey))

  for (const mod of tree.modules) {
    if (!mod.quiz) continue
    const n = mod.quiz.questions.length
    const att = attemptsByQuizId.get(mod.quiz.id)
    if (quizPassed(att, n) && att && n > 0 && att.score === n) {
      out.push(`Demonstrated clean checkpoint performance in “${mod.title}”.`)
    } else if (quizPassed(att, n)) {
      out.push(`Passed the checkpoint for “${mod.title}” and closed the module path.`)
    }
  }

  if (tree.diagnostic_quiz) {
    const n = tree.diagnostic_quiz.questions.length
    const att = attemptsByQuizId.get(tree.diagnostic_quiz.id)
    if (quizPassed(att, n) && att && n > 0 && att.score / n >= 0.85) {
      out.push(`Strong diagnostic signal (${att.score}/${n}) — useful baseline for what you already carried in.`)
    }
  }

  if (knowledgeSpec?.concepts?.length) {
    const prioritized = [...knowledgeSpec.concepts]
      .filter((c) => !weakKeys.has(`concept:${c.id}`))
      .slice(0, 3)
    for (const c of prioritized) {
      out.push(`Coverage included “${c.label}” without it rising to a top weak signal in this run.`)
    }
  }

  if (out.length > 8) return out.slice(0, 8)
  return out
}

function weakAreasLines(weakReport: WeakAreaReport): string[] {
  const lines: string[] = []
  const highs = weakReport.weakConcepts.filter((w) => w.severity === 'high' || w.severity === 'medium')
  const lows = weakReport.weakConcepts.filter((w) => w.severity === 'low')
  for (const c of highs.slice(0, 6)) {
    lines.push(`${c.label} (${c.severity}) — ${c.narrative}`)
  }
  for (const c of lows.slice(0, 2)) {
    if (lines.length >= 6) break
    lines.push(`${c.label} — light calibration: ${c.narrative}`)
  }
  if (weakReport.lowConfidence.length) {
    for (const l of weakReport.lowConfidence.slice(0, 2)) {
      lines.push(`Calibration: (${l.kind}) ${l.detail}`)
    }
  }
  if (!lines.length) {
    lines.push(
      'No persistent weak-area flags at the top of the heuristic list — keep skills fresh with spaced retrieval and one applied artifact per week.',
    )
  }
  return lines.slice(0, 8)
}

function revisionPath(input: {
  tree: TrainingPlanWithTree
  weakReport: WeakAreaReport
  snapshot: ReadinessSnapshot
  continuity: RemediationRevisionContinuity | null
}): CompletionRevisionStep[] {
  const { tree, weakReport, snapshot, continuity } = input
  const planId = tree.plan.id
  const steps: CompletionRevisionStep[] = []

  if (continuity?.recurringRevisitLessons.length) {
    for (const rv of continuity.recurringRevisitLessons.slice(0, 3)) {
      steps.push({
        title: `Review focus: ${rv.title}`,
        detail: `Suggested ${rv.mentions}× across prior checkpoint summaries — consolidate before taking on new scope.`,
      })
    }
  }
  if (continuity?.mixedReviewHint) {
    steps.push({
      title: 'History-aware mixed review',
      detail: continuity.mixedReviewHint,
    })
  }

  for (const r of weakReport.revisitSuggestions.slice(0, 5)) {
    steps.push({
      title: `Revisit: ${r.lessonTitle}`,
      detail: r.reason,
      href: `/training/${planId}/lessons/${r.lessonId}`,
    })
  }

  for (const sq of tree.plan_supplemental_quizzes) {
    const kind = sq.quiz_kind ?? ''
    if (kind === 'mixed_review' || kind === 'recap_checkpoint' || kind === 'exam_practice') {
      steps.push({
        title:
          kind === 'mixed_review'
            ? `Mixed-topic retrieval: ${sq.title}`
            : kind === 'exam_practice'
              ? `Exam-style rehearsal: ${sq.title}`
              : `Recap drill: ${sq.title}`,
        detail:
          kind === 'mixed_review'
            ? 'Rotate concepts out of lesson order to mimic on-the-job recall.'
            : kind === 'exam_practice'
              ? 'Use for stakes-oriented rehearsal; pair with timed sessions and official materials when preparing for external credentials—not a substitute for licensure bodies’ content.'
              : 'Short consolidation pass after module work.',
        href: `/training/${planId}/quizzes/${sq.id}`,
      })
    }
  }

  if (snapshot.nextSpacedReview) {
    steps.push({
      title: 'Spaced reinforcement',
      detail: `${snapshot.nextSpacedReview.label} — calendared retrieval beats massed cramming.`,
    })
  }

  for (const block of weakReport.remediation.slice(0, 2)) {
    steps.push({
      title: block.title,
      detail: block.actions.slice(0, 3).join(' · '),
    })
  }

  const dedup: CompletionRevisionStep[] = []
  const seen = new Set<string>()
  for (const s of steps) {
    const key = `${s.title}|${s.href ?? ''}`
    if (seen.has(key)) continue
    seen.add(key)
    dedup.push(s)
  }
  return dedup.slice(0, 10)
}

function readinessSplit(input: {
  snapshot: ReadinessSnapshot
  weakReport: WeakAreaReport
  continuity: RemediationRevisionContinuity | null
}): CompletionReadinessSignals {
  const { snapshot, weakReport, continuity } = input
  const nHeavy = weakReport.weakConcepts.filter((w) => w.severity === 'high' || w.severity === 'medium').length

  let workUseLine = ''
  if (snapshot.band >= 2 && nHeavy <= 2) {
    workUseLine =
      `${TRUST_COPY.practiceSignalWorkPrefix} you are in a good position to narrate decisions with stakeholders, tie actions to constraints, and ship small artifacts reviewers can inspect.`
  } else if (snapshot.band >= 1) {
    workUseLine =
      `${TRUST_COPY.practiceSignalWorkPrefix} apply the plan objective in one real workflow this week — keep explanations short and tie each step to an observable signal.`
  } else {
    workUseLine =
      `${TRUST_COPY.practiceSignalWorkPrefix} translate one lesson into a checklist you will actually run twice — repetition beats passive review for operational fluency.`
  }

  let examPreparationLine = ''
  if (continuity?.readinessTrajectory === 'dip') {
    examPreparationLine =
      `${TRUST_COPY.examStylePrepPrefix} your readiness band dipped across checkpoints — rebuild automaticity with mixed sets before simulating high-stakes timing (still not a credential predictor).`
  } else if (snapshot.examPracticeEnabled) {
    examPreparationLine =
      `${TRUST_COPY.examStylePrepPrefix} treat mixed-review and exam-practice quizzes as rehearsal blocks — rewrite misses as flashcards and redo until explanations feel obvious; combine with official materials for real exams.`
  } else if (snapshot.mixedReviewUnlocked) {
    examPreparationLine =
      `${TRUST_COPY.examStylePrepPrefix} mixed-topic drills approximate cross-topic retrieval — rotate scenarios until retrieval feels automatic, then add time pressure; they do not map 1:1 to an external blueprint.`
  } else {
    examPreparationLine =
      `${TRUST_COPY.examStylePrepPrefix} without a dedicated exam-practice lane on this plan, export a revision sheet and run self-timed mixed sets from your weakest checkpoints—pair with official syllabi when preparing for credentials.`
  }

  return {
    band: snapshot.band,
    bandLabel: snapshot.bandLabel,
    workUseLine,
    examPreparationLine,
    readinessConfidenceLine: snapshot.confidenceLine,
  }
}

export function buildCompletionIntelligence(input: {
  tree: TrainingPlanWithTree
  progress: LessonProgressRow[]
  quizAttempts: QuizAttemptRow[]
  placement: TrainingPlanLearnerPlacementRow | null
  knowledgeSpec: TrainingKnowledgeSpec | null | undefined
  weakReport: WeakAreaReport
  learnerSnapshotHistory?: TrainingLearnerIntelligenceSnapshotRow[]
}): CompletionIntelligence | null {
  const { tree, progress, quizAttempts, placement, knowledgeSpec, weakReport, learnerSnapshotHistory } = input
  if (!isPlanComplete(tree, progress, quizAttempts)) return null

  const generatedAtIso = new Date().toISOString()
  const planId = tree.plan.id
  const planTitle = tree.plan.title

  const attemptsByQuizId = new Map<string, QuizAttemptRow>()
  for (const a of quizAttempts) attemptsByQuizId.set(a.quiz_id, a)

  const snapshot = computeReadinessSnapshot({
    tree,
    progress,
    attempts: quizAttempts,
    knowledgeSpec: knowledgeSpec ?? null,
    placement,
  })

  const continuity = learnerSnapshotHistory?.length
    ? buildRemediationRevisionContinuityFromSnapshots(learnerSnapshotHistory)
    : null

  const topic = tree.plan.topic ?? knowledgeSpec?.domain.topic ?? planTitle
  const completionSummary = [
    `You completed “${planTitle}” — every required lesson, checkpoint, and plan-level review in this path is satisfied.`,
    `Treat this as a learning-progress snapshot (heuristic): strengths reflect what transferred in-product; weak signals are maintenance targets, not a failure state—nor a formal credential.`,
  ].join(' ')

  const longitudinalReadinessComparison = continuity?.readinessTrajectoryLine

  const persistentWeakSpotlight =
    continuity?.repeatedWeakConcepts.length || continuity?.recurringRevisitLessons.length
      ? [
          ...(continuity?.repeatedWeakConcepts.slice(0, 3).map(
            (r) =>
              `Across checkpoints, “${r.label}” surfaced repeatedly (${r.appearances} summaries) — schedule deliberate retrieval, not passive rereading.`,
          ) ?? []),
          ...(continuity?.recurringRevisitLessons.slice(0, 2).map(
            (rv) =>
              `Lesson “${rv.title}” kept appearing as a revisit target (${rv.mentions} references) — anchor your next practice there.`,
          ) ?? []),
        ]
      : undefined

  const strengthsDemonstrated = strengthsFromSignals({
    tree,
    attemptsByQuizId,
    weakReport,
    knowledgeSpec,
  })
  if (!strengthsDemonstrated.length) {
    strengthsDemonstrated.push(
      `Finished the full path including assessments — that consistency is itself a signal of follow-through on “${topic}”.`,
    )
  }

  const weakAreasRemaining = weakAreasLines(weakReport)
  const recommendedRevisionPath = revisionPath({ tree, weakReport, snapshot, continuity })
  const recommendedNextCourse = recommendedNextCourseCopy({
    planTitle,
    topic,
    skillLevelPlan: tree.plan.skill_level,
    knowledgeSpec: knowledgeSpec ?? null,
  })
  const readiness = readinessSplit({ snapshot, weakReport, continuity })

  return {
    generatedAtIso,
    planId,
    planTitle,
    complete: true,
    completionSummary,
    strengthsDemonstrated,
    weakAreasRemaining,
    recommendedRevisionPath,
    recommendedNextCourse,
    readiness,
    longitudinalReadinessComparison,
    persistentWeakSpotlight,
  }
}
