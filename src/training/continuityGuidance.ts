/**
 * Composes existing progress + intelligence continuity + weak-area signals into one guidance surface.
 * No parallel scoring — reuses pickNextTrainingStep and snapshot-derived continuity only.
 */
import type { RemediationRevisionContinuity } from './intelligenceContinuity'
import { buildHeuristicRemediationSequenceLines } from './remediationActionLoop'
import type { WeakAreaReport } from './remediationTypes'
import { TRUST_COPY } from './trustCopy'
import type { NextTrainingStep } from './trainingProgress'

export type PlanContinuityGuidance = {
  headline: string
  primaryCta: { href: string; label: string } | null
  /** Ordered heuristic loop — same source as weak-area / appendix ordering. */
  actionSequence: string[]
  bullets: string[]
  secondaryNote: string | null
  trustLine: string
}

function dedupeLines(lines: string[], max: number): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const line of lines) {
    const t = line.trim()
    if (!t) continue
    const key = t.slice(0, 64)
    if (seen.has(key)) continue
    seen.add(key)
    out.push(t)
    if (out.length >= max) break
  }
  return out
}

/**
 * Highest-leverage single card: aligns “what to open next” with memory-backed revision cues.
 */
export function buildPlanContinuityGuidance(input: {
  nextStep: NextTrainingStep
  continuity: RemediationRevisionContinuity | null
  weakAreaReport: WeakAreaReport | null
}): PlanContinuityGuidance {
  const { nextStep, continuity, weakAreaReport } = input

  let headline: string
  if (nextStep.kind === 'done') {
    headline =
      'Core path complete — keep retrieval honest with revision assets and any mixed-review / rehearsal quizzes still open.'
  } else if (nextStep.kind === 'lesson') {
    headline = `Next step: “${nextStep.lesson.title}” — same knowledge graph as checkpoints and derived content below.`
  } else {
    headline = `Next step: “${nextStep.label}” — outcomes update your learning memory for revision priorities (snapshots store summaries, not raw answers).`
  }

  const primaryCta =
    nextStep.kind === 'done'
      ? null
      : { href: nextStep.href, label: nextStep.kind === 'lesson' ? 'Go to lesson' : 'Go to checkpoint' }

  const bullets: string[] = []
  if (continuity?.readinessTrajectoryLine) bullets.push(continuity.readinessTrajectoryLine)
  bullets.push(...(continuity?.revisionFocusBullets.slice(0, 2) ?? []))
  bullets.push(...(continuity?.remediationContinuityBullets.slice(0, 2) ?? []))
  if (continuity?.mixedReviewHint) bullets.push(continuity.mixedReviewHint)

  const topRevisit = weakAreaReport?.revisitSuggestions[0]
  if (topRevisit) {
    bullets.push(`Weak-area revisit: “${topRevisit.lessonTitle}” (${topRevisit.moduleTitle}).`)
  }

  const secondaryNote =
    weakAreaReport?.remediation.find((r) => r.priority < 110)?.actions[0] ??
    weakAreaReport?.remediation[1]?.actions[0] ??
    (weakAreaReport?.weakConcepts[0]
      ? `Tighten retrieval on “${weakAreaReport.weakConcepts[0].label}” before the next checkpoint.`
      : null)

  const actionSequence = buildHeuristicRemediationSequenceLines(weakAreaReport)

  return {
    headline,
    primaryCta,
    actionSequence,
    bullets: dedupeLines(bullets, 6),
    secondaryNote,
    trustLine: `${TRUST_COPY.readinessTrajectoryVsBand} ${TRUST_COPY.weakAreasHeuristic}`,
  }
}
