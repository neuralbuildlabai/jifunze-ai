/**
 * Single source of truth for derived content asset type strings (app + DB CHECK alignment).
 * Keep in sync with `supabase/migrations/*derived_content_asset*sql` and `DerivedContentAssetType`.
 */
import type { DerivedContentAssetType } from './types'

export const DERIVED_CONTENT_ASSET_TYPES = [
  'study_notes',
  'revision_sheet',
  'trainer_guide',
  'handout',
  'slide_outline',
  'faq_sheet',
  'educational_brief',
  'refresher_handout',
  'manager_coaching_brief',
  'facilitator_discussion_guide',
  'team_recap_sheet',
] as const satisfies readonly DerivedContentAssetType[]

const ASSET_TYPE_SET = new Set<string>(DERIVED_CONTENT_ASSET_TYPES)

export function isDerivedContentAssetType(value: string): value is DerivedContentAssetType {
  return ASSET_TYPE_SET.has(value)
}
