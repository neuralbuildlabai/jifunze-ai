/**
 * Canonical weak-area / remediation vocabulary (cross-links to runtime types).
 * Doc: docs/jifunze-ontology-and-contracts.md §2
 *
 * Runtime shapes live in `remediationTypes.ts`:
 * - `WeakConceptSignal` — **current** weak concept signal
 * - `LessonRevisitSuggestion` — **revisit target**
 * - `RemediationRecommendation` — **remediation recommendation**
 * - Repeated weakness — derived in `intelligenceContinuity` from snapshots
 */

/** Distinct learner cognitive states used in UI priority (ordered conceptually, not enum-enforced) */
export const WEAK_AREA_STATES = ['current', 'repeated', 'remediation_candidate', 'revision_candidate'] as const

export type WeakAreaState = (typeof WEAK_AREA_STATES)[number]
