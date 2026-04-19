/**
 * Canonical readiness dimensions for Jifunze (orthogonal lenses; may share inputs).
 * Doc: docs/jifunze-ontology-and-contracts.md §1
 *
 * Implementation note: `computeReadinessSnapshot` today produces a **composite band**
 * chiefly reflecting coverage + completion (+ placement confidence), while **trajectory**
 * is derived separately from learner intelligence snapshots (`intelligenceContinuity`).
 */
export const READINESS_DIMENSIONS = {
  coverage: 'coverage',
  transfer: 'transfer',
  stakes: 'stakes',
  trajectory: 'trajectory',
} as const

export type ReadinessDimension = (typeof READINESS_DIMENSIONS)[keyof typeof READINESS_DIMENSIONS]

/** Safe learner-facing framing — exam preparation support without credential claims */
export const READINESS_SAFE_COPY_GUARDRAILS = {
  prefer: ['readiness indicators', 'preparation support', 'practice signals', 'suggested next steps'],
  avoid: ['guaranteed pass', 'certified', 'official exam result', 'legally endorsed'],
} as const
