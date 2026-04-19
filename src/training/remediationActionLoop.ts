/**
 * Heuristic remediation / revision loop — ordered steps only.
 * No adaptive engine: reuses weak-area + revisit data from {@link buildLearnerWeakAreaReport}.
 * Wording aligns with ontology + {@link TRUST_COPY}; does not imply mastery guarantees.
 */
import type {
  LessonRevisitSuggestion,
  RepeatedErrorPattern,
  WeakAreaReport,
  WeakConceptSignal,
} from './remediationTypes'
import { TRUST_COPY } from './trustCopy'

export function buildHeuristicRemediationSequenceLinesFromParts(
  input: {
    revisitSuggestions: LessonRevisitSuggestion[]
    weakConcepts: WeakConceptSignal[]
    errorPatterns: RepeatedErrorPattern[]
  },
): string[] {
  const lines: string[] = []
  const rev = input.revisitSuggestions[0]
  if (rev) {
    lines.push(
      `Revisit “${rev.lessonTitle}” (${rev.moduleTitle}) — tighten retrieval before another checkpoint attempt.`,
    )
  }
  lines.push(
    `Generate learner-support revision content from this plan’s graph (Preview → revision sheet / study notes with weak-area targeting when signals exist).`,
  )
  lines.push(
    `Retry checkpoints only after you can state—in one sentence—why the keyed answer fits the plan better than your prior pick on a missed item.`,
  )
  if (input.errorPatterns.length) {
    lines.push(`Space repeats: wait 24–48h before another full retry when the same misses recur — let explanations consolidate first.`)
  }
  if (input.weakConcepts.length && !rev) {
    lines.push(
      `Focus one weak label first: “${input.weakConcepts[0].label.slice(0, 120)}” — then revisit the checkpoint.`,
    )
  }
  lines.push(
    `Return through your training plan overview — progress, snapshots, and derived assets stay tied to the same knowledge spec.`,
  )
  return lines.slice(0, 6)
}

/**
 * Ordered lines for UI (continuity card, weak-areas panel, quiz results).
 * Stays heuristic; same content can be mirrored in derived appendices.
 */
export function buildHeuristicRemediationSequenceLines(report: WeakAreaReport | null): string[] {
  if (!report) {
    return buildHeuristicRemediationSequenceLinesFromParts({
      revisitSuggestions: [],
      weakConcepts: [],
      errorPatterns: [],
    })
  }
  return buildHeuristicRemediationSequenceLinesFromParts({
    revisitSuggestions: report.revisitSuggestions,
    weakConcepts: report.weakConcepts,
    errorPatterns: report.errorPatterns,
  })
}

/** Markdown block for derived assets (after weak signals intro). */
export function formatRemediationSequenceAppendixSection(report: WeakAreaReport): string {
  const lines: string[] = []
  lines.push(`### Suggested learner loop (heuristic)`)
  lines.push(
    `_Ordered steps reduce thrash — not a guaranteed mastery path. Same graph powers lessons, quizzes, and this appendix._`,
  )
  lines.push(``)
  buildHeuristicRemediationSequenceLinesFromParts({
    revisitSuggestions: report.revisitSuggestions,
    weakConcepts: report.weakConcepts,
    errorPatterns: report.errorPatterns,
  }).forEach((x, i) => {
    lines.push(`${i + 1}. ${x}`)
  })
  lines.push(``)
  lines.push(TRUST_COPY.assessmentScoresContext)
  return lines.join('\n')
}
