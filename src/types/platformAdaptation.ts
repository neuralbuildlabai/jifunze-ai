import type { AdaptationPlatformId } from './adaptationPlatform'
import type { ContentFormat } from './contentFormat'
import type { ConversionIntent } from './conversion'

/** Alias: one supported social surface for adaptation output. */
export type Platform = AdaptationPlatformId

export type CharacterLimitStatus = 'within_limit' | 'near_limit' | 'trimmed'

/** Flags from validation (before/after refinement). */
export type PlatformAdaptationIssue =
  | 'caption_over_guideline'
  | 'missing_hook'
  | 'weak_cta'
  | 'thin_media_plan'

/**
 * What the validator saw and how it was corrected (internal QA trail).
 */
export type PlatformAdaptationQuality = {
  /** True when variant is within guardrails after any auto-fixes. */
  passes: boolean
  issues_detected: PlatformAdaptationIssue[]
  /** Human-readable: fallbacks applied, CTA strengthened, etc. */
  adjustments_applied: string[]
}

/**
 * One platform-specific post slice derived from a shared opportunity + brief + brand.
 * Not a duplicate of other platforms — copy structure and emphasis differ per `platform`.
 */
export type PlatformPostVariant = {
  platform: AdaptationPlatformId
  title?: string
  caption: string
  hook?: string
  hashtags?: string
  cta?: string
  /** Echo of opportunity intent for QA and UI (same value across variants unless overridden later). */
  conversion_intent?: ConversionIntent
  /** Where this surface expects the click/DM to go (link in bio, DM, booking, etc.). */
  destination_reference?: string
  /** X: optional second beat if the story should continue in replies. */
  thread_continuation_hint?: string
  /** Instagram: cover / grid / first-frame note (separate from full media plan). */
  visual_note?: string
  /** TikTok: shot-by-shot or beat concept for vertical video. */
  video_concept?: string
  /** TikTok: suggested burned-in line (drafting aid only). */
  on_screen_text_suggestion?: string
  /** Facebook: softer invite line (comment, tag, share) after main CTA. */
  community_cta?: string
  recommendedFormat: ContentFormat
  mediaPlanSummary: string
  characterLimitStatus?: CharacterLimitStatus
  publishingNotes?: string
  /** Why this shape vs other platforms (strategy, not duplicate of `quality_check`). */
  adaptationRationale: string
  /** Validator output + auto-fix trail. */
  quality_check?: PlatformAdaptationQuality
  /** When mapped onto a specific connected handle. */
  social_account_id?: string
}

export type PlatformAdaptationResult = {
  opportunity_id: string
  brand_id: string
  brand_name: string
  variants: PlatformPostVariant[]
  created_at_iso: string
}
