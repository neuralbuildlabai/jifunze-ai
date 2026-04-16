import type { AdaptationPlatformId } from './adaptationPlatform'
import type { BrandProfile } from './brand'
import type { ContentDomain } from './contentDomain'
import type { ContentFormat } from './contentFormat'
import type { ContentLifecycleStatus } from './contentLifecycle'
import type { ConversionIntent } from './conversion'
import type { PriorityLabel } from './priorityLabel'
import type { TrendCategory } from './trendCategory'
import type { TeachingLevel } from './teaching'

export type PipelineFeedbackEventType =
  | 'signals_ingested'
  | 'opportunities_built'
  | 'content_package_generated'
  | 'platform_adapted'

/** Small, safe envelope to keep stage coupling low. */
export type PipelineFeedbackEvent = {
  id: string
  type: PipelineFeedbackEventType
  brand_id: BrandProfile['id']
  created_at_iso: string
  payload: Record<string, unknown>
}

/** Normalized stage counts for quick UI/status readouts. */
export type PipelineStageCounts = {
  raw_signals: number
  guarded_signals: number
  scored_signals: number
  opportunities: number
}

export type OpportunityPipelineSummary = {
  id: string
  domain: ContentDomain
  trend: TrendCategory
  priority: number
  priority_label: PriorityLabel
  lifecycle_status: ContentLifecycleStatus
  autonomy_action: string
  conversion_intent: ConversionIntent
  teaching_level: TeachingLevel
  format: ContentFormat
}

export type AdaptationPipelineSummary = {
  opportunity_id: string
  platforms: AdaptationPlatformId[]
  variants: number
}
