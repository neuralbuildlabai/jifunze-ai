/**
 * Remediation + revision continuity from persisted checkpoint snapshots (privacy-safe labels only).
 * **Trajectory readiness** and repeated-weak signals are derived here; see `contracts/readinessDimensions.ts`.
 */
import type { TrainingLearnerIntelligenceSnapshotRow } from './trainingTypes'
import {
  parseIntelligenceSnapshotPayload,
  type IntelligenceSnapshotPayloadV1,
} from './learnerIntelligencePayload'

export type ReadinessTrajectoryKind = 'improving' | 'holding' | 'dip'

export type RepeatedWeakConcept = {
  conceptKey: string
  label: string
  appearances: number
  /** Highest severity seen across snapshots for this concept key (ordinal: high > medium > low). */
  worstSeverity: 'high' | 'medium' | 'low'
}

export type RemediationRevisionContinuity = {
  snapshotCount: number
  readinessTrajectory: ReadinessTrajectoryKind
  readinessTrajectoryLine: string
  /** Compared earliest vs latest checkpoint band in history window. */
  earliestBand: number | null
  latestBand: number | null
  repeatedWeakConcepts: RepeatedWeakConcept[]
  /** Lesson titles that appeared multiple times as revisit targets (prior checkpoints). */
  recurringRevisitLessons: Array<{ title: string; mentions: number }>
  remediationContinuityBullets: string[]
  revisionFocusBullets: string[]
  mixedReviewHint: string | null
  /** Short lines for facilitator aggregate display (labels only). */
  cohortRepeatedWeakHints?: string[]
}

function severityRank(s: string): number {
  if (s === 'high') return 3
  if (s === 'medium') return 2
  return 1
}

function normalizeSeverity(s: string): 'high' | 'medium' | 'low' {
  if (s === 'high' || s === 'medium' || s === 'low') return s
  return 'low'
}

function parsedTimeline(
  snapshots: TrainingLearnerIntelligenceSnapshotRow[],
): IntelligenceSnapshotPayloadV1[] {
  const rows = [...snapshots].sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
  const out: IntelligenceSnapshotPayloadV1[] = []
  for (const r of rows) {
    const p = parseIntelligenceSnapshotPayload(r.payload_json)
    if (p) out.push(p)
  }
  return out
}

/**
 * Learner-focused continuity across their own snapshots (newest snapshots array may be unsorted — we sort by created_at).
 */
export function buildRemediationRevisionContinuityFromSnapshots(
  snapshots: TrainingLearnerIntelligenceSnapshotRow[],
): RemediationRevisionContinuity | null {
  if (!snapshots.length) return null
  const timeline = parsedTimeline(snapshots)
  if (!timeline.length) return null

  const earliest = timeline[0]!
  const latest = timeline[timeline.length - 1]!
  const eb = earliest.readiness_band
  const lb = latest.readiness_band
  let readinessTrajectory: ReadinessTrajectoryKind = 'holding'
  if (lb > eb) readinessTrajectory = 'improving'
  else if (lb < eb) readinessTrajectory = 'dip'

  let readinessTrajectoryLine = ''
  if (timeline.length < 2) {
    readinessTrajectoryLine = 'One checkpoint captured — next attempts will establish a trend.'
  } else if (readinessTrajectory === 'improving') {
    readinessTrajectoryLine = `Readiness moved up across checkpoints (band ${eb} → ${lb}). Keep momentum with retrieval + one applied artifact.`
  } else if (readinessTrajectory === 'dip') {
    readinessTrajectoryLine = `Readiness slipped vs earlier checkpoints (band ${eb} → ${lb}). Slow down and revisit the lessons below before the next checkpoint.`
  } else {
    readinessTrajectoryLine = `Readiness held steady across checkpoints (band ${lb}). Reinforce repeated weak spots below before pushing new scope.`
  }

  const conceptAcc = new Map<string, { label: string; n: number; worst: 'high' | 'medium' | 'low' }>()
  for (const p of timeline) {
    for (const c of p.weak_concepts) {
      const prev = conceptAcc.get(c.conceptKey) ?? {
        label: c.label,
        n: 0,
        worst: 'low' as const,
      }
      prev.n += 1
      prev.label = c.label
      const incoming = normalizeSeverity(c.severity)
      prev.worst = severityRank(prev.worst) >= severityRank(incoming) ? prev.worst : incoming
      conceptAcc.set(c.conceptKey, prev)
    }
  }
  const repeatedWeakConcepts: RepeatedWeakConcept[] = [...conceptAcc.entries()]
    .filter(([, v]) => v.n >= 2)
    .map(([conceptKey, v]) => ({
      conceptKey,
      label: v.label,
      appearances: v.n,
      worstSeverity: v.worst,
    }))
    .sort((a, b) => b.appearances - a.appearances || severityRank(b.worstSeverity) - severityRank(a.worstSeverity))
    .slice(0, 8)

  const revisitAcc = new Map<string, number>()
  for (const p of timeline) {
    for (const t of p.revisit_lesson_titles) {
      const k = t.trim()
      if (!k) continue
      revisitAcc.set(k, (revisitAcc.get(k) ?? 0) + 1)
    }
  }
  const recurringRevisitLessons = [...revisitAcc.entries()]
    .filter(([, n]) => n >= 2)
    .map(([title, mentions]) => ({ title, mentions }))
    .sort((a, b) => b.mentions - a.mentions)
    .slice(0, 6)

  const remediationContinuityBullets: string[] = []
  for (const r of repeatedWeakConcepts.slice(0, 4)) {
    remediationContinuityBullets.push(
      `“${r.label}” showed up in ${r.appearances} checkpoint summaries — prioritize retrieval and the linked lesson rework.`,
    )
  }
  for (const rv of recurringRevisitLessons.slice(0, 3)) {
    remediationContinuityBullets.push(
      `You were pointed back to “${rv.title}” multiple times across checkpoints — do a tight rework pass before the next quiz.`,
    )
  }
  if (!remediationContinuityBullets.length && timeline.length >= 2) {
    remediationContinuityBullets.push(
      'No single concept repeated yet across summaries — keep spacing retries so patterns have time to surface.',
    )
  }

  const revisionFocusBullets: string[] = []
  if (latest.mixed_review_unlocked) {
    revisionFocusBullets.push(
      'Mixed-topic review is available — use it to force retrieval outside lesson order on your recurring weak labels.',
    )
  } else {
    revisionFocusBullets.push(
      'Finish more module checkpoints to unlock mixed-topic review — best antidote to “familiar in-order, fragile out-of-order” gaps.',
    )
  }
  if (latest.exam_practice_enabled) {
    revisionFocusBullets.push(
      'Exam-style drills are enabled on this plan — rehearse under light time pressure once mixed review feels stable.',
    )
  }
  for (const r of repeatedWeakConcepts.slice(0, 3)) {
    revisionFocusBullets.push(`Revision priority: rehearse “${r.label}” with one scenario + one explicit tradeoff.`)
  }

  let mixedReviewHint: string | null = null
  if (repeatedWeakConcepts.length && latest.mixed_review_unlocked) {
    mixedReviewHint = `Start mixed review emphasizing: ${repeatedWeakConcepts
      .slice(0, 3)
      .map((x) => x.label)
      .join(' · ')}.`
  } else if (repeatedWeakConcepts.length) {
    mixedReviewHint = `When mixed review unlocks, lead with: ${repeatedWeakConcepts
      .slice(0, 3)
      .map((x) => x.label)
      .join(' · ')}.`
  }

  if (timeline.length >= 1) {
    revisionFocusBullets.unshift(
      'Before your next checkpoint: rehearse one scenario for each repeated weak label surfaced in your latest snapshot summary (summaries only — not raw answers).',
    )
  }

  return {
    snapshotCount: timeline.length,
    readinessTrajectory,
    readinessTrajectoryLine,
    earliestBand: eb,
    latestBand: lb,
    repeatedWeakConcepts,
    recurringRevisitLessons,
    remediationContinuityBullets,
    revisionFocusBullets,
    mixedReviewHint,
  }
}

/**
 * Cohort-safe: counts label frequency across many learners’ snapshots (no answers).
 * Returns short hint lines for facilitator UI / team asset appendix.
 */
export function buildCohortRepeatedWeakHintsFromSnapshots(
  rows: TrainingLearnerIntelligenceSnapshotRow[],
): string[] {
  const labelCounts = new Map<string, number>()
  for (const r of rows) {
    const p = parseIntelligenceSnapshotPayload(r.payload_json)
    if (!p) continue
    for (const c of p.weak_concepts) {
      const lab = c.label.trim()
      if (!lab) continue
      labelCounts.set(lab, (labelCounts.get(lab) ?? 0) + 1)
    }
  }
  const hints = [...labelCounts.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, n]) => `Multiple checkpoint summaries flagged “${label}” (${n} mentions across learners).`)
  return hints
}

export function formatPriorCheckpointHistoryMarkdown(
  continuity: RemediationRevisionContinuity | null,
  input?: { planTitle?: string | null },
): string {
  if (!continuity) return ''
  const lines: string[] = []
  lines.push(`## Prior checkpoint memory`)
  lines.push(``)
  if (input?.planTitle) lines.push(`_Plan: ${input.planTitle}_`, ``)
  lines.push(continuity.readinessTrajectoryLine)
  lines.push(``)
  if (continuity.repeatedWeakConcepts.length) {
    lines.push(`### Repeated weak signals (summaries only)`)
    for (const r of continuity.repeatedWeakConcepts.slice(0, 8)) {
      lines.push(`- **${r.label}** — appeared ${r.appearances}× across checkpoints (${r.worstSeverity}).`)
    }
    lines.push(``)
  }
  if (continuity.recurringRevisitLessons.length) {
    lines.push(`### Recurring lesson revisits`)
    for (const rv of continuity.recurringRevisitLessons) {
      lines.push(`- ${rv.title} — suggested ${rv.mentions}× across checkpoints.`)
    }
    lines.push(``)
  }
  if (continuity.revisionFocusBullets.length) {
    lines.push(`### Revision focus`)
    for (const b of continuity.revisionFocusBullets.slice(0, 6)) {
      lines.push(`- ${b}`)
    }
    lines.push(``)
  }
  if (continuity.mixedReviewHint) {
    lines.push(`### Mixed review`)
    lines.push(continuity.mixedReviewHint)
  }
  return lines.join('\n').trim()
}

export function formatCohortWeakHistoryAppendixMarkdown(hints: string[]): string {
  if (!hints.length) return ''
  const lines = [`## Cohort checkpoint patterns (aggregate, no raw answers)`, ``]
  for (const h of hints) lines.push(`- ${h}`)
  return lines.join('\n')
}
