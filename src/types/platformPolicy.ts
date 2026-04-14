import type { ContentFormat } from './contentFormat'
import type { SocialPlatformId } from './socialPlatform'

export type PlatformMediaConstraints = {
  max_caption_chars: number
  max_hashtag_suggestions: number
  recommended_aspect_ratios: string[]
  /** Upper bound for native video where applicable (connector validates). */
  max_video_seconds?: number
}

/**
 * Platform-specific rules: formats, media, copy voice, cadence expectations, auto-publish guardrails.
 */
export type PlatformPolicy = {
  platform: SocialPlatformId
  display_name: string
  supported_content_formats: ContentFormat[]
  media_constraints: PlatformMediaConstraints
  caption_length_style_guidance: string
  posting_behavior_expectations: string
  auto_publish_limitations: string
}
