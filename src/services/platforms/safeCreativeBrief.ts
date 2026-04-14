import type { CreativeBrief } from '../../types/creativeBrief'

const FALLBACK_CAPTION =
  'Lead with the clearest benefit; keep voice authentic; end with one decisive ask.'
const FALLBACK_VISUAL = 'Single strong hero frame; brand palette; readable at small size.'
const FALLBACK_ANIMATION = 'Subtle motion that supports the message—no distraction from the hook.'
const FALLBACK_MOOD = 'On-brand, confident, audience-appropriate energy.'
const FALLBACK_ASPECT = '1:1 safe default; crop 9:16 for vertical surfaces.'
const FALLBACK_USAGE = 'Weight the primary surface first; adapt crops per channel later.'

/**
 * Ensures adaptation never fails on empty brief fields (graceful degradation).
 */
export function normalizeCreativeBriefForAdaptation(brief: CreativeBrief): CreativeBrief {
  return {
    caption_direction: brief.caption_direction?.trim() || FALLBACK_CAPTION,
    visual_direction: brief.visual_direction?.trim() || FALLBACK_VISUAL,
    animation_direction: brief.animation_direction?.trim() || FALLBACK_ANIMATION,
    mood_style_notes: brief.mood_style_notes?.trim() || FALLBACK_MOOD,
    recommended_aspect_ratio: brief.recommended_aspect_ratio?.trim() || FALLBACK_ASPECT,
    recommended_platform_usage: brief.recommended_platform_usage?.trim() || FALLBACK_USAGE,
  }
}
