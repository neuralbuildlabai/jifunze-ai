import { getBrandDomains } from '../../config/brandDomains'
import { getDomainDefinition } from '../../config/domains'
import type { BrandProfile } from '../../types/brand'
import type { ContentFormat } from '../../types/contentFormat'
import type { CreativeBrief } from '../../types/creativeBrief'
import type { ContentOpportunity } from '../../types/opportunity'
import { buildTeachingRubric } from '../teaching/buildTeachingRubric'

function aspectForFormat(format: ContentFormat): string {
  switch (format) {
    case 'caption_only_post':
      return 'N/A — text-first; optional 1:1 card if platform adds media'
    case 'short_form_video_concept':
    case 'motion_poster':
    case 'animation_concept':
      return '9:16 primary, 1:1 cutdown for feeds'
    case 'carousel_concept':
      return '4:5 carousel frames + 1:1 cover'
    case 'near_realistic_promo_visual':
    case 'single_static_graphic':
      return '4:5 hero still, 16:9 web banner optional'
    default:
      return '1:1 safe default + platform-native crops'
  }
}

/**
 * Creative director layer: opportunity + brand → actionable brief for copy and visual pipelines.
 */
export function buildCreativeBriefFromOpportunity(
  opportunity: ContentOpportunity,
  brand: BrandProfile,
): CreativeBrief {
  const domains = getBrandDomains(brand).join(', ')
  const platformLine = `${opportunity.suggested_platforms.join(', ')} — weight first-touch on ${opportunity.suggested_platforms[0] ?? 'primary channel'}.`

  const domainDef = getDomainDefinition(opportunity.content_domain)
  const aiEditorial =
    opportunity.content_domain === 'ai' && domainDef.guidanceNotes?.length
      ? ` AI vertical: ${domainDef.guidanceNotes.join(' ')} Prefer tone: ${domainDef.tone.join(', ')}. Shape ideas around: ${domainDef.contentTypes.slice(0, 6).join(', ')}. Where useful, add numbered steps or a “how to start / how to use” block — teach first, hype second.`
      : ''

  const teachingHint = ` Teaching: ${opportunity.teaching_level} audience · ${opportunity.explanation_style.replace(/_/g, ' ')} explanation. Include structured steps, one concrete example, and progressive depth (simple → nuance).`
  const teaching_rubric = buildTeachingRubric(opportunity, brand)

  return {
    caption_direction: `${brand.voice} voice, ${brand.creative_risk_level} risk. Hook with "${opportunity.topic.slice(0, 64)}…" then land CTA: ${opportunity.suggested_cta}. Angle: ${opportunity.suggested_angle}${aiEditorial}${teachingHint}`,
    visual_direction: `${opportunity.suggested_media_direction} Emphasize ${brand.media_style.layout_bias}. Typography: ${brand.media_style.typography_notes}.`,
    animation_direction:
      brand.animation_preference === 'none'
        ? 'Static-first; micro-motion only if platform auto-enhances.'
        : brand.animation_preference === 'subtle_loop'
          ? 'Subtle parallax / light leaks; 2–4s loop, no busy background.'
          : 'Expressive kinetic type + subject isolation; keep legibility for small screens.',
    mood_style_notes: `${brand.media_style.reference_mood}. Palette: ${brand.media_style.palette_notes}. Brand domains: ${domains}. Opportunity domain: ${opportunity.content_domain}. Trend: ${opportunity.trend_category.replace(/_/g, ' ')}.`,
    recommended_aspect_ratio: aspectForFormat(opportunity.suggested_content_format),
    recommended_platform_usage: platformLine,
    teaching_rubric,
  }
}
