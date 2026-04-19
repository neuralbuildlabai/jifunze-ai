/**
 * Derived content lineage — persisted metadata contract for workspace assets.
 * Doc: docs/jifunze-ontology-and-contracts.md §5
 *
 * Stored in `derived_content_assets.metadata_json`; older rows may omit fields.
 */
import type { DerivedContentAssetType } from './types'

export const DERIVED_CONTENT_LINEAGE_SCHEMA_ID = 'derived_content_lineage_v1' as const

export type DerivedContentAudienceClass = 'learner_support' | 'facilitator' | 'manager_team' | 'exam_prep' | 'publishable'

export type DerivedContentLineageV1 = {
  ontology: typeof DERIVED_CONTENT_LINEAGE_SCHEMA_ID
  /** Matches knowledge spec versioning where applicable */
  generated_from: 'knowledge_spec_v1' | string
  knowledge_spec_version?: number
  source_training_plan_id: string
  asset_type: string
  audience_class?: DerivedContentAudienceClass
  weak_area_appendix?: boolean
  facilitator_appendix?: boolean
  prior_intel_appendix?: boolean
  cohort_patterns_appendix?: boolean
  /** Exam-prep learner appendix (scores/segments/graph domains — learner-private). */
  exam_prep_learner_appendix?: boolean
  /** Exam-prep aggregate appendix (facilitator/manager-safe cohort outline). */
  exam_prep_aggregate_appendix?: boolean
}

export function isDerivedContentLineageV1(value: unknown): value is DerivedContentLineageV1 {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<DerivedContentLineageV1>
  return v.ontology === DERIVED_CONTENT_LINEAGE_SCHEMA_ID && typeof v.source_training_plan_id === 'string'
}

/**
 * Coarse audience / trust class for stored assets (not a replacement for RLS).
 * `exam_practice` / future exam pack types would map to `exam_prep` when added to the asset union.
 */
export function audienceClassForAssetType(assetType: DerivedContentAssetType): DerivedContentAudienceClass {
  switch (assetType) {
    case 'manager_coaching_brief':
    case 'team_recap_sheet':
    case 'refresher_handout':
      return 'manager_team'
    case 'trainer_guide':
    case 'facilitator_discussion_guide':
      return 'facilitator'
    case 'educational_brief':
      return 'publishable'
    default:
      return 'learner_support'
  }
}
