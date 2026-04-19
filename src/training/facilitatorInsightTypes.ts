import type { TeamWeakAreaRollup } from './remediationTypes'

/** Facilitator / manager-focused derived outputs (Part 15). */
export type FacilitatorDerivedAssetType =
  | 'refresher_handout'
  | 'manager_coaching_brief'
  | 'facilitator_discussion_guide'
  | 'team_recap_sheet'

export type DerivedContentAssetRecommendation = {
  asset_type: FacilitatorDerivedAssetType
  priority: number
  rationale: string
}

export type TeamFacilitatorInsight = {
  generatedAtIso: string
  planId: string
  learner_count: number
  progress_summary: {
    avg_completion_percent: number
    spread_completion_percent: number
    per_learner_completion_percent: Array<{ userId: string; percent: number }>
  }
  weak_area_rollup: TeamWeakAreaRollup | null
  common_mistakes: Array<{
    pattern_line: string
    occurrences: number
    affected_learners: number
  }>
  recommended_follow_up: Array<{
    kind: 'revisit_lesson' | 'micro_drill'
    title: string
    detail: string
    href?: string
  }>
  recommended_derived_assets: DerivedContentAssetRecommendation[]
  /** Optional spec-linked misconception callouts when team weak labels overlap graph myths. */
  misconception_bridges?: string[]
  summaryLine: string
}
