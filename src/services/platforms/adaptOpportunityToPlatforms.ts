import { mergeBrandAutomationSettings } from '../../config/brandAutomationDefaults'
import { mergeBrandConversionProfile } from '../../config/brandConversionDefaults'
import { getPlatformAdaptationPolicy } from '../../config/platformAdaptationPolicies'
import { ADAPTATION_PLATFORM_IDS } from '../../types/adaptationPlatform'
import type { AdaptationPlatformId } from '../../types/adaptationPlatform'
import type { BrandProfile } from '../../types/brand'
import type { CreativeBrief } from '../../types/creativeBrief'
import type { ContentOpportunity } from '../../types/opportunity'
import type {
  CharacterLimitStatus,
  PlatformAdaptationResult,
  PlatformPostVariant,
} from '../../types/platformAdaptation'
import type { ContentFormat } from '../../types/contentFormat'
import { buildCreativeBriefFromOpportunity } from '../creative/buildCreativeBrief'
import { generateConversionCta } from '../conversion/generateConversionCta'
import { pickDestinationReference } from '../conversion/pickDestinationReference'
import { normalizeCreativeBriefForAdaptation } from './safeCreativeBrief'
import { refinePlatformVariant } from './validatePlatformVariant'

function conversionLayerForPlatform(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  platform: AdaptationPlatformId,
) {
  const conv = mergeBrandConversionProfile(brand)
  return {
    conversion_intent: opportunity.conversion_intent,
    destination_reference: pickDestinationReference(brand, conv, platform, opportunity.conversion_intent),
    cta: generateConversionCta({
      domain: opportunity.content_domain,
      trend: opportunity.trend_category,
      intent: opportunity.conversion_intent,
      platform,
      brandName: brand.name,
    }),
  }
}

export type AdaptOpportunityToPlatformsInput = {
  brand: BrandProfile
  opportunity: ContentOpportunity
  /** When omitted, a brief is built from the opportunity (deterministic, no extra LLM). */
  creativeBrief?: CreativeBrief
  /** Defaults to X, Instagram, TikTok, Facebook. */
  targetPlatforms?: AdaptationPlatformId[]
  /** Short titles from the learning layer; appended to each variant rationale. */
  learningSurfaceNotes?: string[]
}

function clipWithStatus(text: string, max: number): { text: string; status: CharacterLimitStatus } {
  const t = text.trim()
  if (t.length <= max) {
    return { text: t, status: t.length > max * 0.88 ? 'near_limit' : 'within_limit' }
  }
  return { text: `${t.slice(0, Math.max(0, max - 1)).trimEnd()}…`, status: 'trimmed' }
}

function trendLabel(t: ContentOpportunity['trend_category']): string {
  return t.replace(/_/g, ' ')
}

function pickFormat(
  preferred: ContentOpportunity['suggested_content_format'],
  allowed: ContentFormat[],
): ContentFormat {
  if (allowed.includes(preferred)) return preferred
  return allowed[0] ?? preferred
}

function buildHashtags(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  max: number,
  style: 'minimal' | 'cluster' | 'tiktok' | 'light',
): string | undefined {
  const raw = [
    brand.name.replace(/\s+/g, ''),
    opportunity.content_domain,
    opportunity.trend_category.replace(/_/g, ''),
  ]
    .map((w) => `#${w.replace(/[^a-zA-Z0-9]/g, '')}`)
    .filter((h) => h.length > 1)

  if (style === 'minimal') return raw.slice(0, Math.min(3, max)).join(' ') || undefined
  if (style === 'tiktok') return raw.slice(0, Math.min(4, max)).join(' ')
  if (style === 'light') return raw.slice(0, Math.min(5, max)).join(' ')
  return raw.slice(0, max).join(' ')
}

function automationPublishingNotes(brand: BrandProfile): string {
  const a = mergeBrandAutomationSettings(brand)
  return [
    `Automation ${a.automation_enabled ? 'on' : 'paused'}.`,
    `Draft ${a.auto_draft_enabled ? '✓' : '✗'} · Queue ${a.auto_queue_enabled ? '✓' : '✗'} · Publish ${a.auto_publish_enabled ? '✓' : '✗'} (always gated by policy + safety).`,
  ].join(' ')
}

function xTimelyPrefix(trendCat: ContentOpportunity['trend_category']): string {
  if (trendCat === 'breaking_news' || trendCat === 'viral_trend') return 'Now:'
  if (trendCat === 'product_launch') return 'New:'
  return ''
}

function buildVariantX(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  brief: CreativeBrief,
): PlatformPostVariant {
  const layer = conversionLayerForPlatform(brand, opportunity, 'x')
  const pol = getPlatformAdaptationPolicy('x')
  const trend = trendLabel(opportunity.trend_category)
  const prefix = xTimelyPrefix(opportunity.trend_category)
  const topicLine = opportunity.topic.trim() || 'Signal worth tracking.'
  const hook = clipWithStatus(`${prefix} ${topicLine}`.trim(), 95).text

  const angle = opportunity.suggested_angle.trim() || brief.caption_direction.slice(0, 120)
  const voice = `${brand.voice} tone · ${brand.creative_risk_level} risk.`
  const body = `${angle} (${trend} · ${opportunity.content_domain}). ${voice} ${brief.caption_direction.split('.').slice(0, 1).join('.').slice(0, 85)}`
  const { text: caption, status } = clipWithStatus(body, 175)

  const ctaSeed = layer.cta.trim() || opportunity.suggested_cta.trim() || 'Share your take.'
  const cta = clipWithStatus(ctaSeed, 72).text

  const thread =
    body.length > 120
      ? `Thread 2/…: add proof, link to source, or quote the stat that backs “${topicLine.slice(0, 48)}…”.`
      : undefined

  const draft: PlatformPostVariant = {
    platform: 'x',
    hook,
    caption,
    hashtags: buildHashtags(brand, opportunity, pol.maxHashtags, 'minimal'),
    cta,
    conversion_intent: layer.conversion_intent,
    destination_reference: layer.destination_reference,
    thread_continuation_hint: thread,
    recommendedFormat: pickFormat(opportunity.suggested_content_format, pol.typicalContentFormats),
    mediaPlanSummary: `One still or short clip; punch in first frame. ${brief.visual_direction.slice(0, 100)}`,
    characterLimitStatus: status,
    publishingNotes: automationPublishingNotes(brand),
    adaptationRationale: `X-native: ${pol.hookStyleGuidance} ${pol.captionStyleGuidance} Hook carries timeliness; body stays argumentative, not IG-style polish. Tone: ${pol.preferredToneTendencies.join(', ')}.`,
  }
  return refinePlatformVariant(draft, pol, opportunity, brand)
}

function buildVariantInstagram(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  brief: CreativeBrief,
): PlatformPostVariant {
  const layer = conversionLayerForPlatform(brand, opportunity, 'instagram')
  const pol = getPlatformAdaptationPolicy('instagram')
  const trend = trendLabel(opportunity.trend_category)
  const hook = clipWithStatus(
    `First-frame promise: ${opportunity.topic.trim().split('.')[0] || opportunity.topic} — ${trend} energy, ${brand.name} lens.`,
    110,
  ).text

  const caption = [
    opportunity.topic.trim(),
    '',
    opportunity.suggested_angle.trim() || brief.caption_direction.slice(0, 200),
    '',
    brief.caption_direction.slice(0, 280),
    '',
    `✨ ${layer.cta.trim() || opportunity.suggested_cta.trim() || 'Tap in — link in bio when live.'}`,
  ].join('\n')
  const { text: clipped, status } = clipWithStatus(caption, pol.roughMaxCaptionChars)

  const visualNote = `Cover / first slide: bold type + product or face; 4:5 feed safe; Reels use 9:16 with hook text burned in first 2s. ${brief.visual_direction.slice(0, 140)}`

  const draft: PlatformPostVariant = {
    platform: 'instagram',
    title: clipWithStatus(`${brand.name} · ${trend}`, 72).text,
    hook,
    caption: clipped,
    hashtags: buildHashtags(brand, opportunity, pol.maxHashtags, 'cluster'),
    cta: layer.cta.trim() || opportunity.suggested_cta.trim() || 'Save this + follow for part 2.',
    conversion_intent: layer.conversion_intent,
    destination_reference: layer.destination_reference,
    visual_note: clipWithStatus(visualNote, 320).text,
    recommendedFormat: pickFormat(opportunity.suggested_content_format, pol.typicalContentFormats),
    mediaPlanSummary: clipWithStatus(
      `${brief.visual_direction.slice(0, 220)} Mood: ${brief.mood_style_notes.slice(0, 100)}`,
      360,
    ).text,
    characterLimitStatus: status,
    publishingNotes: automationPublishingNotes(brand),
    adaptationRationale: `Instagram-native: ${pol.hookStyleGuidance} Caption body intentionally does not repeat the hook line; visual_note isolates frame thinking. ${pol.captionStyleGuidance}`,
  }
  return refinePlatformVariant(draft, pol, opportunity, brand)
}

function buildVariantTikTok(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  brief: CreativeBrief,
): PlatformPostVariant {
  const layer = conversionLayerForPlatform(brand, opportunity, 'tiktok')
  const pol = getPlatformAdaptationPolicy('tiktok')
  const trend = trendLabel(opportunity.trend_category)
  const hook =
    brand.creative_risk_level === 'bold'
      ? clipWithStatus(`POV: ${trend} hits different today`, 52).text
      : clipWithStatus(`Wait for it — ${trend} × ${opportunity.content_domain}`, 54).text

  const caption = [
    `${trend} · ${opportunity.content_domain} · sound-native later`,
    `${brand.name} · ${brand.voice} energy`,
  ].join('\n')
  const { text: cap, status } = clipWithStatus(caption, 220)

  const videoConcept = [
    `0–1s: hard cut + on-screen hook (see below).`,
    `2–6s: show the “before” or tension from: ${opportunity.topic.slice(0, 56)}…`,
    `7–12s: payoff / CTA lip + text: ${(layer.cta || opportunity.suggested_cta || 'engage').slice(0, 40)}`,
  ].join(' ')

  const onScreen = clipWithStatus(
    `${opportunity.topic.slice(0, 36)}${opportunity.topic.length > 36 ? '…' : ''} → watch`,
    38,
  ).text

  const draft: PlatformPostVariant = {
    platform: 'tiktok',
    hook,
    caption: cap,
    hashtags: buildHashtags(brand, opportunity, pol.maxHashtags, 'tiktok'),
    cta: layer.cta.trim() || 'Full arc in-frame — stitch if you remix this take.',
    conversion_intent: layer.conversion_intent,
    destination_reference: layer.destination_reference,
    video_concept: clipWithStatus(videoConcept, 380).text,
    on_screen_text_suggestion: onScreen,
    recommendedFormat: pickFormat(opportunity.suggested_content_format, pol.typicalContentFormats),
    mediaPlanSummary: clipWithStatus(
      `9:16 vertical. Motion: ${brief.animation_direction.slice(0, 140)} Visual: ${brief.visual_direction.slice(0, 120)}`,
      380,
    ).text,
    characterLimitStatus: status,
    publishingNotes: automationPublishingNotes(brand),
    adaptationRationale: `TikTok-native: ${pol.hookStyleGuidance} Caption is discovery-only; video_concept + on_screen_text carry the native feel (not X argument or FB essay).`,
  }
  return refinePlatformVariant(draft, pol, opportunity, brand)
}

function buildVariantFacebook(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  brief: CreativeBrief,
): PlatformPostVariant {
  const layer = conversionLayerForPlatform(brand, opportunity, 'facebook')
  const pol = getPlatformAdaptationPolicy('facebook')
  const trend = trendLabel(opportunity.trend_category)
  const hook = `Hey ${brand.name} community — quick context on something we’re watching:`

  const caption = [
    `${opportunity.topic.trim()}`,
    '',
    `${opportunity.suggested_angle.trim() || brief.caption_direction.slice(0, 240)}`,
    '',
    `${brief.caption_direction.slice(0, 380)}`,
    '',
    `Why it matters: ${brand.audience_summary.slice(0, 160)}${brand.audience_summary.length > 160 ? '…' : ''}`,
    '',
    `${layer.cta.trim() || opportunity.suggested_cta.trim() || 'Learn more in comments if you want the full breakdown.'}`,
  ].join('\n')
  const { text: clipped, status } = clipWithStatus(caption, pol.roughMaxCaptionChars)

  const community = 'If this resonates, tag someone who should see it — we read every thoughtful comment.'

  const draft: PlatformPostVariant = {
    platform: 'facebook',
    title: clipWithStatus(`${brand.name} · ${trend}`, 80).text,
    hook,
    caption: clipped,
    hashtags: buildHashtags(brand, opportunity, pol.maxHashtags, 'light'),
    cta: layer.cta.trim() || opportunity.suggested_cta.trim() || 'Tell us what you’d do differently in the comments.',
    conversion_intent: layer.conversion_intent,
    destination_reference: layer.destination_reference,
    community_cta: community,
    recommendedFormat: pickFormat(opportunity.suggested_content_format, pol.typicalContentFormats),
    mediaPlanSummary: clipWithStatus(
      `Page feed story-first: ${opportunity.suggested_media_direction.slice(0, 220)} ${pol.mediaExpectations}`,
      400,
    ).text,
    characterLimitStatus: status,
    publishingNotes: automationPublishingNotes(brand),
    adaptationRationale: `Facebook-native: ${pol.captionStyleGuidance} Longer explanatory arc + community_cta invite; distinct from X brevity, IG visual-first hook, and TikTok motion-first beats.`,
  }
  return refinePlatformVariant(draft, pol, opportunity, brand)
}

/**
 * Transforms one shared opportunity (+ brief + brand) into distinct platform-native variants.
 */
export function adaptOpportunityToPlatforms(
  input: AdaptOpportunityToPlatformsInput,
): PlatformAdaptationResult {
  const targets = input.targetPlatforms ?? [...ADAPTATION_PLATFORM_IDS]
  const rawBrief =
    input.creativeBrief ?? buildCreativeBriefFromOpportunity(input.opportunity, input.brand)
  const brief = normalizeCreativeBriefForAdaptation(rawBrief)

  const builders: Record<
    AdaptationPlatformId,
    (b: BrandProfile, o: ContentOpportunity, br: CreativeBrief) => PlatformPostVariant
  > = {
    x: buildVariantX,
    instagram: buildVariantInstagram,
    tiktok: buildVariantTikTok,
    facebook: buildVariantFacebook,
  }

  const notes = input.learningSurfaceNotes?.filter(Boolean) ?? []
  const learningSuffix =
    notes.length > 0 ? ` Learning layer: ${notes.join(' · ')}.` : ''

  const variants = targets
    .map((p) => builders[p](input.brand, input.opportunity, brief))
    .map((v) =>
      learningSuffix
        ? { ...v, adaptationRationale: `${v.adaptationRationale}${learningSuffix}` }
        : v,
    )

  return {
    opportunity_id: input.opportunity.id,
    brand_id: input.brand.id,
    brand_name: input.brand.name,
    variants,
    created_at_iso: new Date().toISOString(),
  }
}
