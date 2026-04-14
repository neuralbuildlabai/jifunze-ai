/**
 * Canonical surface types for downstream renderers (image APIs, editors, NLE, motion tools).
 * Add vendors later without changing this contract.
 */
export type MediaPlanKind =
  | 'image_post'
  | 'carousel'
  | 'story'
  | 'reel'
  | 'animated_promo'
  | 'motion_graphic'

export type ProductionComplexity = 'low' | 'medium' | 'high'

/**
 * One executable creative unit: enough for humans or generators to produce assets later.
 */
export type MediaPlan = {
  kind: MediaPlanKind
  title: string
  visual_style: string
  scene_description: string
  /** Omitted or empty when the format is static-first. */
  motion_direction?: string
  on_screen_text_suggestions: string
  /** Omitted when audio is not part of the format. */
  music_mood_suggestion?: string
  /** Primary vendor-neutral prompt string (image/video/motion). */
  asset_prompt: string
  production_complexity: ProductionComplexity
  /** Human-readable; typically aligns with brand.visual_realism_preference plus plan nuance. */
  realism_level: string
}
