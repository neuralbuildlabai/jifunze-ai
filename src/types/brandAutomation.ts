import type { TrendCategory } from './trendCategory'

/**
 * Per-brand knobs for how far automation runs before a human is involved.
 * Omitted fields are filled by {@link mergeBrandAutomationSettings}.
 */
export type BrandAutomationSettings = {
  automation_enabled: boolean
  auto_draft_enabled: boolean
  auto_queue_enabled: boolean
  auto_publish_enabled: boolean
  require_review_for_sensitive_topics: boolean
  require_review_for_low_confidence: boolean
  minimum_confidence_for_auto_publish: number
  minimum_priority_for_auto_queue: number
  allowed_auto_publish_categories: TrendCategory[]
  blocked_auto_publish_categories: TrendCategory[]
}
