import type { BrandProfile } from '../../types/brand'
import type { CreativeBrief } from '../../types/creativeBrief'
import type { MockMediaPrompts } from '../../types/mockMediaPrompts'
import type { MediaPlan } from '../../types/mediaPlan'
import type { ContentOpportunity } from '../../types/opportunity'
import { buildAllMediaPlans } from '../mediaPlanning/buildMediaPlans'

/**
 * Short prose “visual concept” for modes that stop short of full prompt bundles.
 */
export function buildVisualConceptSummary(
  brief: CreativeBrief,
  opportunity: ContentOpportunity,
): string {
  return [
    `Single hero visual echoing: ${brief.mood_style_notes.slice(0, 120)}…`,
    `Anchor object or scene tied to “${opportunity.topic.slice(0, 56)}…”.`,
    `Keep ${brief.recommended_aspect_ratio}; ${brief.visual_direction.slice(0, 140)}…`,
  ].join(' ')
}

function planByKind(plans: MediaPlan[], kind: MediaPlan['kind']): MediaPlan | undefined {
  return plans.find((p) => p.kind === kind)
}

/**
 * Mock-only structured prompts aligned with {@link buildAllMediaPlans} (single source of truth).
 */
export function buildMockMediaPrompts(
  brief: CreativeBrief,
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  existingPlans?: MediaPlan[],
): MockMediaPrompts {
  const plans = existingPlans ?? buildAllMediaPlans(brand, opportunity)
  const image = planByKind(plans, 'image_post')
  const promo = planByKind(plans, 'animated_promo')
  const reel = planByKind(plans, 'reel')
  const carousel = planByKind(plans, 'carousel')

  const risk = brand.creative_risk_level

  return {
    image_prompt:
      image?.asset_prompt ??
      `[${brand.visual_realism_preference}] ${brand.media_style.reference_mood}. Subject: ${opportunity.topic}.`,
    poster_prompt:
      promo?.asset_prompt ??
      `[poster ${risk}] Kinetic headline over hero still; CTA "${opportunity.suggested_cta}".`,
    animation_prompt:
      [
        reel?.motion_direction,
        reel?.asset_prompt,
        promo?.motion_direction,
        promo?.asset_prompt,
      ]
        .filter(Boolean)
        .join(' ') ||
      `[${brand.animation_preference}] Motion on ${opportunity.suggested_content_format}. ${brief.visual_direction.slice(0, 160)}`,
    storyboard_summary:
      [
        carousel?.scene_description.slice(0, 120),
        reel?.scene_description.slice(0, 120),
        `CTA: ${opportunity.suggested_cta}.`,
        `Platforms: ${opportunity.suggested_platforms.join(', ')}.`,
      ]
        .filter(Boolean)
        .join(' '),
  }
}
