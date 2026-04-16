import type { SocialPlatformId } from '../../types/socialPlatform'

export type PublishIntent = {
  social_account_id: string
  platform: SocialPlatformId
  primary_text: string
  hashtags_or_topics_line?: string
  /** When set, connector schedules instead of immediate publish. */
  scheduled_at_iso?: string
}

export type PublishResult = {
  ok: boolean
  provider_ref?: string
  error?: string
}

export type PublishValidation = {
  ok: boolean
  errors: string[]
}

/**
 * Provider-agnostic surface: Meta, X, TikTok, LinkedIn SDKs plug in behind this boundary.
 */
export type PublishingConnector = {
  platform: SocialPlatformId
  /** `simulated` = no real post to the vendor; `live` = real network publish. */
  readonly delivery: 'simulated' | 'live'
  validate(intent: PublishIntent): Promise<PublishValidation>
  publish(intent: PublishIntent): Promise<PublishResult>
}
