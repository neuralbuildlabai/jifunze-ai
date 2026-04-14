import type { SocialPlatformId } from './socialPlatform'
import type { TrendCategory } from './trendCategory'

export type SocialAccountStatus = 'connected' | 'disconnected' | 'pending' | 'revoked'

export type SocialAccountPublishingEligibility = 'eligible' | 'restricted' | 'blocked'

/**
 * Per-handle automation (overrides brand defaults for this surface only when set).
 * Mirrors key brand automation fields plus cadence and account-level blocks.
 */
export type SocialAccountAutomationSettings = {
  auto_draft_enabled: boolean
  auto_queue_enabled: boolean
  auto_publish_enabled: boolean
  require_review_for_low_confidence: boolean
  /** Soft cap for autonomous posts per 24h on this handle (enforced server-side later). */
  posting_cadence_per_day_max: number
  blocked_trend_categories: TrendCategory[]
}

export const DEFAULT_SOCIAL_ACCOUNT_AUTOMATION: SocialAccountAutomationSettings = {
  auto_draft_enabled: true,
  auto_queue_enabled: true,
  auto_publish_enabled: false,
  require_review_for_low_confidence: true,
  posting_cadence_per_day_max: 4,
  blocked_trend_categories: [],
}

export function mergeSocialAccountAutomation(
  partial?: Partial<SocialAccountAutomationSettings>,
): SocialAccountAutomationSettings {
  if (!partial) return { ...DEFAULT_SOCIAL_ACCOUNT_AUTOMATION }
  return {
    ...DEFAULT_SOCIAL_ACCOUNT_AUTOMATION,
    ...partial,
    blocked_trend_categories:
      partial.blocked_trend_categories ?? DEFAULT_SOCIAL_ACCOUNT_AUTOMATION.blocked_trend_categories,
  }
}

/** Linked social handle under a brand tenant (many accounts per brand). */
export type SocialAccount = {
  id: string
  brand_profile_id: string
  platform: SocialPlatformId
  handle: string
  status: SocialAccountStatus
  automation: SocialAccountAutomationSettings
  publishing_eligibility: SocialAccountPublishingEligibility
}

/**
 * When brand-level `automation_enabled` is false, disable all autonomous execution on this handle.
 */
export function applyBrandMasterSwitchToAccountAutomation(
  accountAutomation: SocialAccountAutomationSettings,
  brandAutomationEnabled: boolean | undefined,
): SocialAccountAutomationSettings {
  if (brandAutomationEnabled === false) {
    return {
      ...accountAutomation,
      auto_draft_enabled: false,
      auto_queue_enabled: false,
      auto_publish_enabled: false,
    }
  }
  return accountAutomation
}
