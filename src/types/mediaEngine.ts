import type { ContentDomain } from './contentDomain'
import type { ContentFormat } from './contentFormat'

export type VisualRealismPreference = 'stylized' | 'near_realistic' | 'illustration' | 'abstract'

export type AnimationPreference = 'none' | 'subtle_loop' | 'expressive_motion'

export type CreativeRiskLevel = 'conservative' | 'balanced' | 'bold'

/** Art direction defaults a creative director would lock before production. */
export type MediaStyleProfile = {
  palette_notes: string
  typography_notes: string
  reference_mood: string
  layout_bias: string
}

/**
 * Future request to image/video/animation workers (Edge, queue, vendor).
 * Stays serializable for APIs; no binary payloads here.
 */
export type MediaGenerationRequest = {
  brand_id: string
  opportunity_id: string
  domains: ContentDomain[]
  target_format: ContentFormat
  style: MediaStyleProfile
  visual_realism: VisualRealismPreference
  animation: AnimationPreference
  creative_risk: CreativeRiskLevel
  /** Populated by mock planner today; swap for model-generated prompts later. */
  prompt_summary: string
}
