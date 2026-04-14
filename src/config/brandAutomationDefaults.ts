import type { BrandProfile } from '../types/brand'
import type { BrandAutomationSettings } from '../types/brandAutomation'

/** Safe defaults: automate drafts/queue; publishing off until explicitly enabled. */
export const DEFAULT_BRAND_AUTOMATION: BrandAutomationSettings = {
  automation_enabled: true,
  auto_draft_enabled: true,
  auto_queue_enabled: true,
  auto_publish_enabled: false,
  require_review_for_sensitive_topics: true,
  require_review_for_low_confidence: true,
  minimum_confidence_for_auto_publish: 0.82,
  minimum_priority_for_auto_queue: 0.52,
  allowed_auto_publish_categories: [
    'product_launch',
    'cultural_moment',
    'educational_topic',
    'industry_update',
  ],
  blocked_auto_publish_categories: ['breaking_news', 'meme'],
}

export function mergeBrandAutomationSettings(
  brand: BrandProfile,
): BrandAutomationSettings {
  const o = brand.automation
  if (!o) return { ...DEFAULT_BRAND_AUTOMATION }
  return {
    ...DEFAULT_BRAND_AUTOMATION,
    ...o,
    allowed_auto_publish_categories:
      o.allowed_auto_publish_categories ?? DEFAULT_BRAND_AUTOMATION.allowed_auto_publish_categories,
    blocked_auto_publish_categories:
      o.blocked_auto_publish_categories ?? DEFAULT_BRAND_AUTOMATION.blocked_auto_publish_categories,
  }
}
