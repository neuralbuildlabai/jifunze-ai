import { getBrandDomains } from '../../config/brandDomains'
import type { BrandProfile } from '../../types/brand'
import type { ContentOpportunity } from '../../types/opportunity'
import type { MediaPlan, MediaPlanKind, ProductionComplexity } from '../../types/mediaPlan'

export const MEDIA_PLAN_KINDS: MediaPlanKind[] = [
  'image_post',
  'carousel',
  'story',
  'reel',
  'animated_promo',
  'motion_graphic',
]

function complexityFor(kind: MediaPlanKind, risk: BrandProfile['creative_risk_level']): ProductionComplexity {
  const base: Record<MediaPlanKind, ProductionComplexity> = {
    image_post: 'low',
    carousel: 'medium',
    story: 'medium',
    reel: 'high',
    animated_promo: 'high',
    motion_graphic: 'medium',
  }
  const c = base[kind]
  if (risk === 'bold' && c === 'low') return 'medium'
  if (risk === 'conservative' && c === 'high') return 'medium'
  return c
}

function realismLabel(brand: BrandProfile, suffix: string): string {
  return `${brand.visual_realism_preference} — ${suffix}`
}

/**
 * Provider-agnostic media depth: six parallel plans from the same brand + opportunity context.
 * Wire outputs to FAL, Replicate, Runway, in-house models, or editors without changing this layer.
 */
export function buildAllMediaPlans(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
): MediaPlan[] {
  const ms = brand.media_style
  const domains = getBrandDomains(brand).join(', ')
  const hook = opportunity.topic.slice(0, 72)
  const cta = opportunity.suggested_cta
  const angle = opportunity.suggested_angle
  const platforms = opportunity.suggested_platforms.join(', ')
  const mood = `${ms.reference_mood}; palette: ${ms.palette_notes}; type: ${ms.typography_notes}`

  const image_post: MediaPlan = {
    kind: 'image_post',
    title: `Hero still — ${hook}`,
    visual_style: `${mood}. Layout bias: ${ms.layout_bias}.`,
    scene_description: `Single frame translating “${hook}” with brand-safe context from: ${angle}. Domains: ${domains}.`,
    on_screen_text_suggestions: `Primary: 3–5 word hook. Secondary: subtle CTA chip “${cta}”. Safe zone top/bottom 12%.`,
    asset_prompt: `[static social image] ${realismLabel(brand, 'print-ready')} ${ms.palette_notes}. Subject: ${opportunity.topic}. ${ms.layout_bias}. No busy backgrounds; legible at thumbnail.`,
    production_complexity: complexityFor('image_post', brand.creative_risk_level),
    realism_level: realismLabel(brand, 'single-frame fidelity'),
  }

  const carousel: MediaPlan = {
    kind: 'carousel',
    title: `Carousel narrative — ${hook}`,
    visual_style: `${mood}. Cohesive slide system with one visual parent.`,
    scene_description: `5–7 slides: problem → insight tied to trend → proof → CTA. Thread from: ${opportunity.why_it_matters.slice(0, 120)}…`,
    motion_direction: 'Optional: slide-to-slide parallax on cover only; inner slides static for export safety.',
    on_screen_text_suggestions:
      'Slide 1 punchy headline; slides 2–4 short bullets; final slide CTA + handle. Max 12 words per slide body.',
    music_mood_suggestion: 'Optional lo-fi bed under swipe tutorial variant (15s cutdown).',
    asset_prompt: `[carousel 4:5] ${realismLabel(brand, 'slide masters')} Consistent grid, ${ms.layout_bias}. Topic: ${opportunity.topic}. CTA: ${cta}.`,
    production_complexity: complexityFor('carousel', brand.creative_risk_level),
    realism_level: realismLabel(brand, 'consistent look across frames'),
  }

  const story: MediaPlan = {
    kind: 'story',
    title: `Vertical story — ${hook}`,
    visual_style: `${mood}. 9:16 full-bleed, thumb-stopping first frame.`,
    scene_description: `3–4 story cards: hook, single proof point, social proof cue, swipe-up / link CTA. Platforms: ${platforms}.`,
    motion_direction: 'Gentle push-in on card 1; static typography cards 2–3.',
    on_screen_text_suggestions: 'Card 1: two-line max. Stickers: poll or slider if on-brand. Final: “${cta}”.',
    music_mood_suggestion: '15s trending instrumental stem, BPM 90–110, non-distracting under VO.',
    asset_prompt: `[vertical story 9:16] ${realismLabel(brand, 'mobile-first')} ${opportunity.topic}. ${brand.animation_preference} motion. ${ms.reference_mood}.`,
    production_complexity: complexityFor('story', brand.creative_risk_level),
    realism_level: realismLabel(brand, 'close-up / portrait safe'),
  }

  const reel: MediaPlan = {
    kind: 'reel',
    title: `Short reel — ${hook}`,
    visual_style: `${mood}. Fast-cut native to Reels/TikTok energy without off-brand chaos.`,
    scene_description: `0–2s hook on-topic; mid: b-roll or product macro tied to ${opportunity.trend_category}; end: CTA + follow.`,
    motion_direction:
      'Handheld micro-shake or gimbal glide; match cuts on beat; text safe zones for UI overlay.',
    on_screen_text_suggestions: 'Burned-in hook line + one keyword per beat; final frame CTA text large.',
    music_mood_suggestion:
      'Royalty-cleared upbeat bed or platform library; duck under VO 0–20%; riser into CTA bar.',
    asset_prompt: `[short-form vertical video] ${realismLabel(brand, 'native reel')} Topic: ${opportunity.topic}. Risk: ${brand.creative_risk_level}. Motion: ${brand.animation_preference}.`,
    production_complexity: complexityFor('reel', brand.creative_risk_level),
    realism_level: realismLabel(brand, 'motion + subject priority'),
  }

  const animated_promo: MediaPlan = {
    kind: 'animated_promo',
    title: `Animated promo — ${hook}`,
    visual_style: `${mood}. Promotional beat with logo resolve.`,
    scene_description: `6–10s hero: logo lockup, product or abstract metaphor for “${hook}”, end card CTA.`,
    motion_direction: `Expressive but on-brand: ${brand.animation_preference}; ease curves soft unless risk is bold.`,
    on_screen_text_suggestions: 'Kinetic type for hook; CTA block final 1.5s; avoid tiny supers.',
    music_mood_suggestion: 'Short sting + light percussive bed; optional whoosh transitions (max 3).',
    asset_prompt: `[animated promo 6–10s] ${realismLabel(brand, 'stylized 3D or 2.5D acceptable')} ${opportunity.topic}. ${ms.layout_bias}.`,
    production_complexity: complexityFor('animated_promo', brand.creative_risk_level),
    realism_level: realismLabel(brand, 'stylized motion acceptable'),
  }

  const motion_graphic: MediaPlan = {
    kind: 'motion_graphic',
    title: `Motion graphic — ${hook}`,
    visual_style: `${mood}. Data-forward or typographic explainer tone.`,
    scene_description: `Abstract diagram + iconography supporting: ${angle}. Optional source citation lower-third from links.`,
    motion_direction: 'Linear reveals, chart draw-ons, icon morphs; 24–30fps; loopable 8s master if needed.',
    on_screen_text_suggestions: 'Lower thirds for stats; max 8 words per beat; end slate with CTA.',
    music_mood_suggestion: 'Neutral corporate-to-creator hybrid bed; sidechain under VO.',
    asset_prompt: `[motion graphic explainer] ${realismLabel(brand, 'vector-first')} ${opportunity.topic}. Layout: ${ms.layout_bias}.`,
    production_complexity: complexityFor('motion_graphic', brand.creative_risk_level),
    realism_level: realismLabel(brand, 'graphic / symbolic over literal'),
  }

  return [image_post, carousel, story, reel, animated_promo, motion_graphic]
}
