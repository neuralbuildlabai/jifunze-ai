import type { ContentAnalyticsFeedback } from './contentAnalytics'
import type { ConversionFunnelFeedback } from './conversionFeedback'
import type { ContentLifecycleStatus, LifecycleDriver } from './contentLifecycle'
import type { CreativeBrief } from './creativeBrief'
import type { SocialContent } from './content'
import type { MediaPlan } from './mediaPlan'
import type { MockMediaPrompts } from './mockMediaPrompts'
import type { PlatformAdaptationResult } from './platformAdaptation'
import type { TeachingExplainabilityEntry } from './teaching'

export type ContentGenerationMode =
  | 'caption_only'
  | 'caption_visual_concept'
  | 'caption_media_brief'
  | 'full_content_package'

/** Assembled output across copy, creative direction, and mock media planning. */
export type ContentPackage = {
  mode: ContentGenerationMode
  social: SocialContent
  creative_brief?: CreativeBrief
  /** Short prose concept when modes include visual ideation. */
  visual_concept_summary?: string
  media_prompts?: MockMediaPrompts
  /** Six parallel surface plans (image, carousel, story, reel, animated promo, motion graphic). */
  media_plans?: MediaPlan[]
  /** Lifecycle for this artifact (set when produced from an opportunity in-app). */
  lifecycle_status?: ContentLifecycleStatus
  lifecycle_updated_at?: string
  lifecycle_driver?: LifecycleDriver
  source_opportunity_id?: string
  /** Placeholder until analytics warehouse feeds back (see `ContentAnalyticsFeedback`). */
  analytics_feedback?: ContentAnalyticsFeedback
  /** Placeholder funnel metrics (no warehouse wiring yet). */
  conversion_funnel_feedback?: ConversionFunnelFeedback
  /** Present when `platformAdaptation: 'multi'` was requested on generate. */
  platform_adaptation?: PlatformAdaptationResult
  /** What teaching layer changed on this artifact and why (rule-based). */
  teaching_explainability?: TeachingExplainabilityEntry[]
}
