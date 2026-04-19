import type { TrainingKnowledgeSpec } from '../knowledge/types'
import { mergeLessonPracticePersisted } from './lessonPracticeBundleUtils'
import {
  formatRemediationSequenceAppendixSection,
  buildHeuristicRemediationSequenceLines,
} from './remediationActionLoop'
import type {
  LessonRevisitSuggestion,
  LowConfidenceSignal,
  RemediationRecommendation,
  RepeatedErrorPattern,
  TeamWeakAreaRollup,
  WeakAreaReport,
  WeakConceptSignal,
  WeakSignalSource,
} from './remediationTypes'
import type {
  LessonProgressRow,
  QuizAttemptRow,
  TrainingLessonRow,
  TrainingPlanLearnerPlacementRow,
  TrainingPlanWithTree,
  TrainingQuizWithQuestions,
} from './trainingTypes'

const PRACTICE_STRUGGLE_ATTEMPTS = 3
const DIAGNOSTIC_WEAK_PERCENT = 58
const CHECKPOINT_WEAK_RATIO = 0.65

function lessonWithModule(
  tree: TrainingPlanWithTree,
  lessonId: string,
): { lesson: TrainingLessonRow; moduleTitle: string } | null {
  for (const m of tree.modules) {
    const hit = m.lessons.find((l) => l.id === lessonId)
    if (hit) return { lesson: hit, moduleTitle: m.title }
  }
  return null
}

function quizById(tree: TrainingPlanWithTree, quizId: string): TrainingQuizWithQuestions | null {
  if (tree.diagnostic_quiz?.id === quizId) return tree.diagnostic_quiz
  const sup = tree.plan_supplemental_quizzes.find((q) => q.id === quizId)
  if (sup) return sup
  for (const m of tree.modules) {
    if (m.quiz?.id === quizId) return m.quiz
  }
  return null
}

function severityRankConcept(s: WeakConceptSignal['severity']): number {
  return s === 'high' ? 3 : s === 'medium' ? 2 : 1
}

function conceptLabelForLessonFromTitle(
  spec: TrainingKnowledgeSpec | null | undefined,
  fallbackTitle: string,
): string {
  if (!spec) return fallbackTitle
  const norm = (s: string) => s.trim().toLowerCase()
  for (const m of spec.modules) {
    const les = m.lessons.find((l) => norm(l.title) === norm(fallbackTitle))
    if (!les) continue
    const labels = les.concept_ids
      .map((id) => spec.concepts.find((c) => c.id === id)?.label)
      .filter(Boolean) as string[]
    if (labels.length) return `${fallbackTitle} · ${labels.slice(0, 2).join(' · ')}`
  }
  return fallbackTitle
}

function parseAnswersJson(raw: unknown): Record<string, string> | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === 'string' || typeof v === 'number') out[k] = String(v)
  }
  return Object.keys(out).length ? out : null
}

function mergeConceptSignals(target: Map<string, WeakConceptSignal>, next: WeakConceptSignal) {
  const prev = target.get(next.conceptKey)
  if (!prev) {
    target.set(next.conceptKey, next)
    return
  }
  const sources = new Set<WeakSignalSource>([...prev.sources, ...next.sources])
  target.set(next.conceptKey, {
    ...prev,
    severity: severityMax(prev.severity, next.severity),
    sources: [...sources],
    quizWrongCount: prev.quizWrongCount + next.quizWrongCount,
    narrative:
      prev.narrative === next.narrative ? prev.narrative : `${prev.narrative} ${next.narrative}`.trim(),
  })
}

function severityMax(a: WeakConceptSignal['severity'], b: WeakConceptSignal['severity']): WeakConceptSignal['severity'] {
  const rank = { high: 3, medium: 2, low: 1 }
  return rank[a] >= rank[b] ? a : b
}

function inferSeverity(wrongCount: number, attempts: number): WeakConceptSignal['severity'] {
  if (wrongCount >= 3 || attempts >= 4) return 'high'
  if (wrongCount >= 2 || attempts >= 2) return 'medium'
  return 'low'
}

export function buildLearnerWeakAreaReport(input: {
  tree: TrainingPlanWithTree
  progress: LessonProgressRow[]
  quizAttempts: QuizAttemptRow[]
  placement?: TrainingPlanLearnerPlacementRow | null
  knowledgeSpec?: TrainingKnowledgeSpec | null
}): WeakAreaReport {
  const { tree, progress, quizAttempts, placement, knowledgeSpec } = input
  const planId = tree.plan.id
  const generatedAtIso = new Date().toISOString()

  const conceptByKey = new Map<string, WeakConceptSignal>()
  const lowConfidence: LowConfidenceSignal[] = []
  const questionWrongCounts = new Map<string, number>()
  const wrongSelectionCounts = new Map<string, number>()

  if (placement?.self_confidence_1_5 != null && placement.self_confidence_1_5 <= 2) {
    lowConfidence.push({
      kind: 'self_report',
      detail: `Self-confidence at setup was ${placement.self_confidence_1_5}/5 — prioritize small wins and retrieval practice.`,
    })
  }
  if (
    placement?.diagnostic_score_percent != null &&
    placement.diagnostic_score_percent < DIAGNOSTIC_WEAK_PERCENT
  ) {
    lowConfidence.push({
      kind: 'diagnostic_score',
      detail: `Diagnostic score ${placement.diagnostic_score_percent}% suggests foundational gaps; slow down and revisit linked lessons.`,
    })
  }

  const gapIds = Array.isArray(placement?.foundation_gap_concept_ids)
    ? (placement!.foundation_gap_concept_ids as string[])
    : []
  for (const cid of gapIds) {
    const label =
      knowledgeSpec?.concepts.find((c) => c.id === cid)?.label ??
      `Concept ${cid.slice(0, 8)}`
    mergeConceptSignals(conceptByKey, {
      conceptKey: `concept:${cid}`,
      label,
      severity: 'medium',
      sources: ['placement'],
      quizWrongCount: 0,
      narrative: `Placement flagged this foundation topic for reinforcement.`,
    })
  }

  for (const att of quizAttempts) {
    if (att.status !== 'completed') continue
    const quiz = quizById(tree, att.quiz_id)
    if (!quiz) continue
    const answers = parseAnswersJson(att.answers_json)
    if (!answers) continue

    const total = quiz.questions.length
    const ratio = total > 0 ? att.score / total : 1
    const isDiagnostic = tree.diagnostic_quiz?.id === att.quiz_id

    if (!isDiagnostic && total > 0 && ratio < CHECKPOINT_WEAK_RATIO) {
      lowConfidence.push({
        kind: 'checkpoint_struggle',
        detail: `Checkpoint "${quiz.title}" scored ${att.score}/${total}. Revisit the lessons that feed this quiz before retrying.`,
      })
    }

    for (const q of quiz.questions) {
      const sel = answers[q.id]
      if (sel === undefined) continue
      const ok = String(sel) === String(q.correct_answer)
      if (ok) continue

      questionWrongCounts.set(q.id, (questionWrongCounts.get(q.id) ?? 0) + 1)
      const selKey = `${q.id}::${String(sel)}`
      wrongSelectionCounts.set(selKey, (wrongSelectionCounts.get(selKey) ?? 0) + 1)

      const lessonId = q.source_lesson_id ?? null
      let titleFallback = quiz.title
      let moduleTitle = ''
      if (lessonId) {
        const lw = lessonWithModule(tree, lessonId)
        if (lw) {
          titleFallback = lw.lesson.title
          moduleTitle = lw.moduleTitle
        }
      }
      const label = lessonId
        ? conceptLabelForLessonFromTitle(knowledgeSpec, titleFallback)
        : `${quiz.title}: ${q.prompt.slice(0, 72)}${q.prompt.length > 72 ? '…' : ''}`

      const src: WeakSignalSource = isDiagnostic ? 'diagnostic' : 'quiz'
      mergeConceptSignals(conceptByKey, {
        conceptKey: lessonId ? `lesson:${lessonId}` : `question:${q.id}`,
        label,
        severity: inferSeverity(1, att.total_questions),
        sources: [src],
        quizWrongCount: 1,
        lessonId,
        narrative:
          lessonId && moduleTitle
            ? `Missed an item tied to “${titleFallback}” (${moduleTitle}). Compare your answer with the explanation and rework one applied example.`
            : `Missed a checkpoint item — review the prompt and correct rationale, then retry with a concrete scenario.`,
      })
    }
  }

  for (const pr of progress) {
    const ps = mergeLessonPracticePersisted(pr.practice_state ?? null)
    if (ps.passed) continue
    if (ps.attempt_count < PRACTICE_STRUGGLE_ATTEMPTS) continue
    const lw = lessonWithModule(tree, pr.lesson_id)
    if (!lw) continue
    const label = conceptLabelForLessonFromTitle(knowledgeSpec, lw.lesson.title)
    mergeConceptSignals(conceptByKey, {
      conceptKey: `lesson:${pr.lesson_id}`,
      label,
      severity: ps.attempt_count >= 6 ? 'high' : 'medium',
      sources: ['practice'],
      quizWrongCount: 0,
      lessonId: pr.lesson_id,
      narrative: `Practice loop shows repeated retries (${ps.attempt_count} attempts) without completing all tiers — use cues, then shorten scope and resubmit.`,
    })
  }

  const weakConcepts = [...conceptByKey.values()].sort((a, b) => {
    const wr = b.quizWrongCount - a.quizWrongCount
    if (wr !== 0) return wr
    const sr = severityRankConcept(b.severity) - severityRankConcept(a.severity)
    if (sr !== 0) return sr
    return a.label.localeCompare(b.label)
  })

  const errorPatterns: RepeatedErrorPattern[] = []
  for (const [qid, n] of questionWrongCounts) {
    if (n >= 2) {
      errorPatterns.push({
        patternKey: `repeat_wrong:${qid}`,
        description: `Same checkpoint item missed ${n} times — likely systematic misconception or retrieval gap.`,
        occurrences: n,
        questionIds: [qid],
      })
    }
  }
  for (const [key, n] of wrongSelectionCounts) {
    if (n >= 2) {
      const [qid] = key.split('::')
      errorPatterns.push({
        patternKey: `repeat_pick:${key}`,
        description: `Repeatedly selected the same distractor (${n}×) — compare with the worked explanation and contrast examples.`,
        occurrences: n,
        questionIds: qid ? [qid] : [],
      })
    }
  }
  errorPatterns.sort((a, b) => b.occurrences - a.occurrences)

  const revisitMap = new Map<string, LessonRevisitSuggestion>()
  for (const c of weakConcepts) {
    if (!c.lessonId) continue
    const lw = lessonWithModule(tree, c.lessonId)
    if (!lw) continue
    const prev = revisitMap.get(c.lessonId)
    const prio = severityRankConcept(c.severity) * 10 + c.quizWrongCount
    if (!prev || prio > prev.priority) {
      revisitMap.set(c.lessonId, {
        lessonId: c.lessonId,
        lessonTitle: lw.lesson.title,
        moduleTitle: lw.moduleTitle,
        reason: c.narrative,
        priority: prio,
      })
    }
  }
  const revisitSuggestions = [...revisitMap.values()].sort((a, b) => b.priority - a.priority).slice(0, 8)

  const remediation: RemediationRecommendation[] = []
  if (weakConcepts.length || lowConfidence.length) {
    remediation.push({
      title: 'This week: retrieval + constraints',
      actions: [
        `Pick one weak lesson and redo its practice tier with half the scope — explicit stakeholder + signal.`,
        `For each checkpoint miss, write one sentence on why the keyed answer is stronger than your pick.`,
        weakConcepts[0]?.lessonId
          ? `Revisit “${revisitSuggestions[0]?.lessonTitle ?? weakConcepts[0].label}” before the next checkpoint.`
          : `Skim misconceptions in the revision sheet for this plan and tie one to your workplace scenario.`,
      ].filter(Boolean) as string[],
      priority: 100,
    })
  }
  if (errorPatterns.length) {
    remediation.push({
      title: 'Break the repeat pattern',
      actions: [
        `Space retries: schedule a second pass 24–48h after reading the explanation.`,
        `Explain the concept aloud in <60s — if you stall, return to the lesson diagram/examples.`,
      ],
      priority: 90,
    })
  }

  const seqReportForLoop: WeakAreaReport = {
    generatedAtIso,
    planId,
    weakConcepts,
    errorPatterns,
    lowConfidence,
    revisitSuggestions,
    remediation: [],
  }

  remediation.unshift({
    title: 'Suggested order before retry (heuristic)',
    priority: 110,
    actions: buildHeuristicRemediationSequenceLines(seqReportForLoop),
  })

  return {
    generatedAtIso,
    planId,
    weakConcepts,
    errorPatterns,
    lowConfidence,
    revisitSuggestions,
    remediation,
  }
}

/** One-line summary for tables (team board). */
export function formatWeakAreaSummaryLine(report: WeakAreaReport): string {
  const nConcepts = report.weakConcepts.length
  const nPatterns = report.errorPatterns.length
  const nRev = report.revisitSuggestions.length
  if (!nConcepts && !report.lowConfidence.length) return 'No weak signals detected yet'
  const bits: string[] = []
  if (nConcepts) bits.push(`${nConcepts} weak concept${nConcepts === 1 ? '' : 's'}`)
  if (nPatterns) bits.push(`${nPatterns} repeat pattern${nPatterns === 1 ? '' : 's'}`)
  if (nRev) bits.push(`${nRev} revisit`)
  return bits.join(' · ')
}

/** Markdown block appended to revision/study derived assets. */
export function formatRemediationAppendixMarkdown(report: WeakAreaReport, input?: { planTitle?: string | null }): string {
  const lines: string[] = []
  lines.push(`## Targeted remediation`)
  lines.push(``)
  if (input?.planTitle) lines.push(`_Plan: ${input.planTitle}_`, ``)
  lines.push(`_Generated ${report.generatedAtIso} — heuristic signals from quizzes, practice loops, and placement._`)
  lines.push(``)
  if (!report.weakConcepts.length && !report.lowConfidence.length && !report.errorPatterns.length) {
    lines.push(`No prioritized weak areas detected from current activity. Keep checkpoints spaced and practice artifacts specific.`)
    return lines.join('\n')
  }

  lines.push(formatRemediationSequenceAppendixSection(report))
  lines.push(``)
  if (report.lowConfidence.length) {
    lines.push(`### Confidence / calibration`)
    for (const l of report.lowConfidence) lines.push(`- (${l.kind}) ${l.detail}`)
    lines.push(``)
  }
  if (report.weakConcepts.length) {
    lines.push(`### Weak concepts (prioritized)`)
    for (const c of report.weakConcepts.slice(0, 12)) {
      lines.push(
        `- **${c.label}** (${c.severity}) — ${c.sources.join(', ')} · misses ${c.quizWrongCount}. ${c.narrative}`,
      )
    }
    lines.push(``)
  }
  if (report.errorPatterns.length) {
    lines.push(`### Repeated error patterns`)
    for (const p of report.errorPatterns.slice(0, 8)) {
      lines.push(`- ${p.description}`)
    }
    lines.push(``)
  }
  if (report.revisitSuggestions.length) {
    lines.push(`### Revisit first`)
    for (const r of report.revisitSuggestions) {
      lines.push(`- **${r.lessonTitle}** (${r.moduleTitle}) — ${r.reason}`)
    }
    lines.push(``)
  }
  if (report.remediation.length) {
    lines.push(`### Recommended actions`)
    for (const m of report.remediation) {
      lines.push(`#### ${m.title}`)
      for (const a of m.actions) lines.push(`- ${a}`)
    }
  }
  return lines.join('\n')
}

export function rollupTeamWeakAreas(reports: WeakAreaReport[]): TeamWeakAreaRollup | null {
  if (!reports.length) return null
  const planId = reports[0].planId
  const conceptAcc = new Map<string, { label: string; learnerHits: number; quizWrongTotal: number }>()
  const lessonHits = new Map<string, { lessonTitle: string; hits: number }>()

  for (const r of reports) {
    for (const c of r.weakConcepts) {
      const acc = conceptAcc.get(c.conceptKey) ?? { label: c.label, learnerHits: 0, quizWrongTotal: 0 }
      acc.quizWrongTotal += c.quizWrongCount
      acc.learnerHits += 1
      conceptAcc.set(c.conceptKey, acc)
    }
    for (const v of r.revisitSuggestions) {
      const prev = lessonHits.get(v.lessonId) ?? { lessonTitle: v.lessonTitle, hits: 0 }
      lessonHits.set(v.lessonId, { lessonTitle: v.lessonTitle, hits: prev.hits + 1 })
    }
  }

  const concepts = [...conceptAcc.entries()]
    .map(([conceptKey, v]) => ({ conceptKey, label: v.label, learnerHits: v.learnerHits, quizWrongTotal: v.quizWrongTotal }))
    .sort((a, b) => b.learnerHits - a.learnerHits || b.quizWrongTotal - a.quizWrongTotal)
    .slice(0, 12)

  const topRevisitLessonIds = [...lessonHits.entries()]
    .map(([lessonId, v]) => ({ lessonId, lessonTitle: v.lessonTitle, hits: v.hits }))
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 8)

  const summaryLine =
    concepts.length === 0
      ? `No cross-learner weak-area overlap yet (${reports.length} learner${reports.length === 1 ? '' : 's'}).`
      : `Team hotspots: ${concepts
          .slice(0, 3)
          .map((c) => c.label)
          .join('; ')}`

  return {
    planId,
    learnerCount: reports.length,
    concepts,
    topRevisitLessonIds,
    summaryLine,
  }
}
