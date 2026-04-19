/**
 * Heuristic, explainable “library growth” hints from existing learner + cohort signals.
 * No ML — aggregates labels already computed for weak areas and continuity.
 */

import type { RemediationRevisionContinuity } from './intelligenceContinuity'
import type { WeakAreaReport } from './remediationTypes'

export type SignalDrivenLibraryHints = {
  /** Concrete improvements for authors iterating this track or sibling tracks. */
  trackImprovementBullets: string[]
  /** How to expand reusable library artifacts (revision packs, micro-paths). */
  libraryGrowthBullets: string[]
}

/**
 * Turns repeated weak concepts, revisit lessons, and trajectory into **library backlog** hints.
 * Privacy: uses only labels/counts already surfaced in-plan — no new personal data classes.
 */
export function buildSignalDrivenLibraryHints(input: {
  topic: string
  continuity: RemediationRevisionContinuity | null
  weakReport: WeakAreaReport | null
}): SignalDrivenLibraryHints {
  const trackImprovementBullets: string[] = []
  const libraryGrowthBullets: string[] = []

  const topic = input.topic.trim() || 'this topic'

  for (const w of input.weakReport?.weakConcepts.filter((x) => x.severity === 'high').slice(0, 4) ?? []) {
    trackImprovementBullets.push(
      `High-friction concept “${w.label}” — strengthen the lesson example + misconception pairing; add one applied scenario drill in the next curriculum revision.`,
    )
  }

  for (const r of input.continuity?.repeatedWeakConcepts.slice(0, 4) ?? []) {
    libraryGrowthBullets.push(
      `Repeated weak label “${r.label}” (${r.appearances}× across snapshots) — good candidate for a **micro-path** or **focused revision pack** in the starter library.`,
    )
  }

  for (const rv of input.continuity?.recurringRevisitLessons.slice(0, 3) ?? []) {
    trackImprovementBullets.push(
      `Lesson “${rv.title}” shows up often as a revisit — add facilitator recap + FAQ sheet variants for cohort rollouts.`,
    )
  }

  if (input.continuity?.readinessTrajectory === 'dip') {
    trackImprovementBullets.push(
      `Readiness dipped across checkpoints — before broadening ${topic}, tighten prerequisite module copy and checkpoint explanations (signal: trajectory, not blame).`,
    )
  }

  libraryGrowthBullets.push(
    `Bundle **revision_sheet + study_notes + facilitator_discussion_guide** for “${topic}” as a reusable folder — same graph, different audiences.`,
  )

  if (!trackImprovementBullets.length && !libraryGrowthBullets.length) {
    libraryGrowthBullets.push(
      `As signals accrue (more checkpoints), Jifunze will suggest richer revision packs — keep saving derived assets with lineage enabled.`,
    )
  }

  return { trackImprovementBullets, libraryGrowthBullets }
}
