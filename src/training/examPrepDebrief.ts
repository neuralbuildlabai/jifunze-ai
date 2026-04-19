import type { AssessmentBlueprintV1, BlueprintSection } from './assessmentBlueprint'
import type { TrainingQuizQuestionRow } from './trainingTypes'
import { TRUST_COPY } from './trustCopy'

export type ExamPrepDebrief = {
  modeLabel: string
  scoreLine: string
  percentLine: string
  timingLine: string | null
  strongest: string[]
  weakest: string[]
  sectionHighlights: string[]
  coverageNote: string
  revisionPriorities: string[]
  nextAction: string
  readinessNote: string
  trustFooter: string
}

function questionInSection(qIndex: number, s: BlueprintSection, total: number): boolean {
  const from = s.question_sort_order_from ?? 0
  const to = s.question_sort_order_to ?? total - 1
  return qIndex >= from && qIndex <= to
}

export function buildExamPrepDebrief(input: {
  assessmentMode: 'mock_exam' | 'mixed_review' | 'recap_checkpoint' | 'module_checkpoint' | 'diagnostic' | 'revision'
  blueprint: AssessmentBlueprintV1
  questions: TrainingQuizQuestionRow[]
  answersByQuestionId: Record<string, string>
  /** Elapsed seconds for timed run, or null if not timed */
  elapsedSeconds: number | null
}): ExamPrepDebrief {
  const { questions, answersByQuestionId, blueprint, assessmentMode, elapsedSeconds } = input
  const total = questions.length
  let correct = 0
  for (const q of questions) {
    if (String(answersByQuestionId[q.id] ?? '') === String(q.correct_answer)) correct += 1
  }
  const pct = total > 0 ? Math.round((100 * correct) / total) : 0
  const modeLabel =
    assessmentMode === 'mock_exam'
      ? 'Mock exam · preparation rehearsal'
      : assessmentMode === 'mixed_review'
        ? 'Mixed-topic review'
        : 'Checkpoint / review'

  const perSection: { title: string; correct: number; n: number }[] = []
  for (const s of blueprint.sections) {
    let c = 0
    let n = 0
    questions.forEach((q, idx) => {
      if (!questionInSection(idx, s, total)) return
      n += 1
      if (String(answersByQuestionId[q.id] ?? '') === String(q.correct_answer)) c += 1
    })
    if (n > 0) perSection.push({ title: s.title, correct: c, n })
  }
  perSection.sort((a, b) => a.correct / a.n - b.correct / b.n)
  const weakest = perSection.length
    ? [perSection[0]!].map((x) => `${x.title} (${x.correct}/${x.n} correct)`)
    : []
  const strongest = perSection.length
    ? [perSection[perSection.length - 1]!].map((x) => `${x.title} (${x.correct}/${x.n} correct)`)
    : []

  const sectionHighlights = perSection.map((x) => `${x.title}: ${x.correct}/${x.n} correct`)

  const hardMisses = questions
    .map((q, i) => ({ q, i, ok: String(answersByQuestionId[q.id] ?? '') === String(q.correct_answer) }))
    .filter((x) => !x.ok && (x.q.difficulty === 'hard' || x.q.difficulty === 'medium'))

  const revisionPriorities = hardMisses.slice(0, 4).map((x, j) => {
    const snippet = x.q.prompt.trim().slice(0, 72)
    return `Redo explanation for missed item ${j + 1}: “${snippet}${x.q.prompt.length > 72 ? '…' : ''}”`
  })

  const timingLine =
    elapsedSeconds != null
      ? `Elapsed time: ${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s · suggested target was ~${blueprint.timing?.suggested_duration_minutes ?? '—'} min for rehearsal pacing.`
      : blueprint.timing?.suggested_duration_minutes != null
        ? `Suggested rehearsal pacing: ~${blueprint.timing.suggested_duration_minutes} minutes (not enforced). Start the timer next time to compare against this target.`
        : null

  const coverageDomains = blueprint.coverage_domains.map((d) => d.label).slice(0, 8)

  const nextAction =
    pct >= 85
      ? 'Rotate into mixed-review or apply one workplace artifact while concepts are warm.'
      : pct >= 65
        ? 'Export a revision sheet from the plan and rework the two weakest domains above.'
        : 'Return to targeted lessons tied to misses, then retry this rehearsal after one revision cycle.'

  const readinessNote = `${TRUST_COPY.readinessTrajectoryVsBand} Stakes readiness here reflects this quiz only — not a credential prediction.`

  return {
    modeLabel,
    scoreLine: `${correct} / ${total} correct (${pct}%)`,
    percentLine: `Weighted toward plan concepts in “${blueprint.blueprint_name}”.`,
    timingLine,
    strongest,
    weakest,
    sectionHighlights,
    coverageNote: `Domains referenced in this rehearsal blueprint: ${coverageDomains.join(' · ') || '—'} — this is internal graph alignment, not an external exam-body objective list.`,
    revisionPriorities:
      revisionPriorities.length > 0
        ? revisionPriorities
        : [`Skim weakest section explanation(s) above, then rerun mixed-topic items for those constructs.`],
    nextAction,
    readinessNote,
    trustFooter:
      blueprint.trust_note ??
      `${TRUST_COPY.examPrepPracticeShort} ${TRUST_COPY.assessmentScoresContext}`,
  }
}
