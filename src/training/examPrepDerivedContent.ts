/**
 * Deterministic exam-prep appendices for derived assets (Part 8B).
 * Privacy: facilitator/manager paths must never echo learner prompts, answer choices,
 * or per-item stems — only aggregates, blueprint labels, and graph concepts.
 */
import type { TrainingKnowledgeSpec } from '../knowledge/types'
import { effectiveAssessmentBlueprint, type AssessmentBlueprintV1, type BlueprintSection } from './assessmentBlueprint'
import type { QuizAttemptRow, TrainingPlanWithTree } from './trainingTypes'
import type { WeakAreaReport } from './remediationTypes'
import { buildHeuristicRemediationSequenceLines } from './remediationActionLoop'
import { TRUST_COPY } from './trustCopy'

function parseAnswersJson(raw: unknown): Record<string, string> | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === 'string' || typeof v === 'number') out[k] = String(v)
  }
  return Object.keys(out).length ? out : null
}

function supplementalExamQuizzes(tree: TrainingPlanWithTree) {
  return (tree.plan_supplemental_quizzes ?? []).filter((q) =>
    ['exam_practice', 'mixed_review', 'recap_checkpoint'].includes(String(q.quiz_kind)),
  )
}

function questionInSection(qIndex: number, s: BlueprintSection, total: number): boolean {
  const from = s.question_sort_order_from ?? 0
  const to = s.question_sort_order_to ?? total - 1
  return qIndex >= from && qIndex <= to
}

/** Strip stems/prompt-like weak labels so exports stay privacy-safe. */
export function sanitizeDerivationWeakLabel(label: string): string {
  const t = label.trim()
  if (t.length > 96 || t.includes('?')) {
    return 'Scoped retrieval gap — map to nearest lesson + concept in the graph'
  }
  return t
}

export type ExamPrepLearnerAppendixInput = {
  tree: TrainingPlanWithTree
  quizAttempts: QuizAttemptRow[]
  knowledgeSpec: TrainingKnowledgeSpec | null
  weakAreaReport: WeakAreaReport | null
  planTitle?: string | null
}

/**
 * Learner-private appendix: rehearsal scores, segment pressure (counts only),
 * blueprint domains, prioritized concept review lines, last-mile checklist.
 * Does not include raw answer indices or cohort data.
 */
export function buildExamPrepLearnerAppendixMarkdown(input: ExamPrepLearnerAppendixInput): string {
  const { tree, quizAttempts, knowledgeSpec, weakAreaReport, planTitle } = input
  const lines: string[] = []
  lines.push(`_Exam-prep derivation · ${new Date().toISOString()} · learner-private history only._`)
  lines.push(``)
  if (planTitle) lines.push(`**Plan:** ${planTitle}`)
  lines.push(``)
  lines.push(TRUST_COPY.examPrepPracticeShort)
  lines.push(TRUST_COPY.assessmentCoverageVisibility)
  lines.push(``)

  const supp = supplementalExamQuizzes(tree)
  if (!supp.length) {
    lines.push(`No supplemental rehearsal quizzes detected on this plan — exam-style appendices will activate when mixed-review / mock drills exist.`)
    return lines.join('\n')
  }

  lines.push(`### Recent rehearsal attempts`)
  for (const q of supp.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))) {
    const attempts = quizAttempts.filter((a) => a.quiz_id === q.id && a.status === 'completed')
    const latest = [...attempts].sort((a, b) => (b.completed_at ?? '').localeCompare(a.completed_at ?? ''))[0]
    if (!latest) {
      lines.push(`- **${q.title}** (${q.quiz_kind}) — no completed attempt yet`)
      continue
    }
    const pct =
      latest.total_questions > 0 ? Math.round((100 * latest.score) / latest.total_questions) : 0
    lines.push(
      `- **${q.title}** (${q.quiz_kind}): ${latest.score}/${latest.total_questions} (${pct}%)`,
    )
  }
  lines.push(``)

  const moduleTitles = tree.modules.map((m) => m.title)
  const ranked = [...quizAttempts]
    .filter((a) => a.status === 'completed' && supp.some((q) => q.id === a.quiz_id))
    .sort((a, b) => (b.completed_at ?? '').localeCompare(a.completed_at ?? ''))

  const focalAttempt = ranked[0]
  const focalQuiz = focalAttempt ? supp.find((q) => q.id === focalAttempt.quiz_id) : null

  if (focalQuiz && focalAttempt) {
    const answers = parseAnswersJson(focalAttempt.answers_json)
    const questions = focalQuiz.questions ?? []
    const blueprint = effectiveAssessmentBlueprint({
      quizRowAssessmentBlueprintJson: focalQuiz.assessment_blueprint_json,
      quizTitle: focalQuiz.title,
      topic: tree.plan.topic ?? tree.plan.title,
      questionCount: questions.length,
      moduleTitles,
    })
    lines.push(`### Mock / mixed rehearsal focal summary`)
    lines.push(
      `- Latest completed rehearsal: **${focalQuiz.title}** — score ${focalAttempt.score}/${focalAttempt.total_questions}.`,
    )
    lines.push(`- **Blueprint:** ${blueprint.blueprint_name}`)
    if (blueprint.timing?.suggested_duration_minutes != null) {
      lines.push(`- **Suggested pacing (guidance):** ~${blueprint.timing.suggested_duration_minutes} minutes`)
    }
    lines.push(``)

    if (answers && questions.length) {
      lines.push(`### Segment pressure (counts only)`)
      const total = questions.length
      for (const s of blueprint.sections) {
        let c = 0
        let n = 0
        questions.forEach((q, idx) => {
          if (!questionInSection(idx, s, total)) return
          n += 1
          if (String(answers[q.id] ?? '') === String(q.correct_answer)) c += 1
        })
        if (n > 0) lines.push(`- **${s.title}**: ${c}/${n} correct`)
      }
      lines.push(``)
    }

    lines.push(`### Internal blueprint domains (not an external exam-body list)`)
    for (const d of blueprint.coverage_domains.slice(0, 12)) {
      lines.push(`- ${d.label}`)
    }
    lines.push(``)

    lines.push(formatMockExamDebriefSummaryMarkdown(blueprint, focalAttempt, questions.length))
    lines.push(``)
  }

  lines.push(`### Prioritized concept review (graph-aligned)`)
  const concepts = knowledgeSpec?.concepts ?? []
  const weak = weakAreaReport?.weakConcepts ?? []
  if (!weak.length) {
    lines.push(`_No prioritized weak constructs detected yet — complete another rehearsal or checkpoint to sharpen this list._`)
  } else {
    const top = weak.slice(0, 10)
    for (const w of top) {
      const match = concepts.find((c) => w.label.includes(c.label) || c.label.includes(w.label))
      const label = match ? match.label : sanitizeDerivationWeakLabel(w.label)
      lines.push(`- **${label}** (${w.severity}) · ${w.sources.join('/')}`)
    }
  }
  lines.push(``)

  const revisits = weakAreaReport?.revisitSuggestions.slice(0, 4) ?? []
  if (revisits.length) {
    lines.push(`### Checkpoint recap targets (lesson titles)`)
    for (const r of revisits) {
      lines.push(`- ${r.lessonTitle} · ${r.moduleTitle}`)
    }
    lines.push(``)
  }

  if (knowledgeSpec?.revision_summary) {
    lines.push(`### Last-mile revision pack (deterministic capsule)`)
    lines.push(knowledgeSpec.revision_summary.split('\n').slice(0, 10).join('\n'))
    lines.push(``)
  }

  lines.push(`### Follow-on revision loop (same knowledge graph)`)
  buildHeuristicRemediationSequenceLines(weakAreaReport).forEach((x, i) => {
    lines.push(`${i + 1}. ${x}`)
  })
  lines.push(``)

  lines.push(`### Trust boundary`)
  lines.push(TRUST_COPY.readinessTrajectoryVsBand)
  return lines.join('\n')
}

export function formatMockExamDebriefSummaryMarkdown(
  blueprint: AssessmentBlueprintV1,
  attempt: QuizAttemptRow,
  questionCount: number,
): string {
  const pct = questionCount > 0 ? Math.round((100 * attempt.score) / questionCount) : 0
  const lines: string[] = []
  lines.push(`#### Mock-exam debrief summary (derived, no item text)`)
  lines.push(
    `- Outcome band: ${attempt.score}/${questionCount} correct (${pct}%) for blueprint **${blueprint.blueprint_name}**.`,
  )
  lines.push(
    `- Coverage note: domains reference the plan knowledge graph — ${TRUST_COPY.assessmentCoverageVisibility.split('.')[0]}.`,
  )
  return lines.join('\n')
}

export type ExamPrepAggregateAppendixInput = {
  planTitle?: string | null
  knowledgeSpec: TrainingKnowledgeSpec | null
  /** Aggregate-safe cohort weak labels from intelligence (no raw answers). */
  cohortRepeatedWeakHints: string[]
}

/**
 * Facilitator / manager-safe aggregate appendix only.
 */
export function buildExamPrepAggregateAppendixMarkdown(input: ExamPrepAggregateAppendixInput): string {
  const { planTitle, knowledgeSpec, cohortRepeatedWeakHints } = input
  const lines: string[] = []
  lines.push(`_Exam-prep cohort derivation · ${new Date().toISOString()} · aggregate-safe (no learner responses)._`)
  lines.push(``)
  if (planTitle) lines.push(`**Plan:** ${planTitle}`)
  lines.push(``)
  lines.push(
    `> These signals intentionally avoid individual scores, prompts, or selected answers — use them to steer group practice, not performance management on their own.`,
  )
  lines.push(``)

  if (cohortRepeatedWeakHints.length) {
    lines.push(`### Cohort weak-area patterns (label-frequency)`)
    for (const h of cohortRepeatedWeakHints.slice(0, 16)) lines.push(`- ${h}`)
    lines.push(``)
  } else {
    lines.push(`_No cohort weak-label patterns captured yet — run more mixed-review or mock rehearsals to populate this block._`)
    lines.push(``)
  }

  lines.push(formatFacilitatorRecapAndCoachingOutline(knowledgeSpec))
  lines.push(``)
  lines.push(`### Team reinforcement recommendations`)
  lines.push(
    `- Pair a short mixed-topic retrieval drill with one workplace artifact while patterns are visible.`,
    `- Keep discussion on observable signals and constraints — not learner callouts.`,
  )
  lines.push(`- ${TRUST_COPY.weakAreasHeuristic}`)
  return lines.join('\n')
}

/** Mock-exam group review outline + facilitator recap spine (aggregate-only content). */
export function formatFacilitatorRecapAndCoachingOutline(spec: TrainingKnowledgeSpec | null): string {
  if (!spec) {
    return [`### Facilitator / manager mock-exam review outline`, `_No knowledge graph loaded — outline unavailable._`].join(
      '\n',
    )
  }
  const lines: string[] = []
  lines.push(`### Facilitator recap + mock-exam group review outline`)
  lines.push(`**Duration:** 35–45 minutes`)
  lines.push(`1. **Calibration (5m)** — restate objective: ${spec.domain.objective}`)
  lines.push(
    `2. **Aggregate hotspot review (10m)** — discuss the most common misconception patterns from this plan’s graph (not individual errors).`,
  )
  lines.push(
    `3. **Mixed retrieval (10m)** — use two scenarios from the spec; learners sketch decision + signal without sharing private attempt details.`,
  )
  lines.push(`4. **Blueprint honesty (5m)** — clarify internal graph coverage vs external exam objectives (${TRUST_COPY.assessmentCoverageVisibility})`)
  lines.push(
    `5. **Commitment (5m)** — each learner names one retrieval action + one artifact to produce before next rehearsal.`,
  )
  lines.push(`6. **Manager/facilitator coaching cue** — reinforce ${TRUST_COPY.examPrepSeriousnessBoundary}`)
  return lines.join('\n')
}
