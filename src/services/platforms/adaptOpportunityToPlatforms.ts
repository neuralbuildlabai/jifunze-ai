import type { SupabaseClient } from '@supabase/supabase-js'
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
import {
  learningNotesForPlatform,
  resolveCtaLearningEmphasis,
} from '../learning/applyLearningFeedback'
import { getBrandLearningState } from '../learning/learningContext'
import type { BrandLearningState } from '../../types/performanceLearning'
import { pickDestinationReference } from '../conversion/pickDestinationReference'
import { onPlatformAdapted } from '../pipeline'
import { normalizeCreativeBriefForAdaptation } from './safeCreativeBrief'
import { refinePlatformVariant } from './validatePlatformVariant'

function conversionLayerForPlatform(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  platform: AdaptationPlatformId,
  recommendations: BrandLearningState['recommendations'],
) {
  const conv = mergeBrandConversionProfile(brand)
  const learningEmphasis = resolveCtaLearningEmphasis(recommendations, platform)
  return {
    conversion_intent: opportunity.conversion_intent,
    destination_reference: pickDestinationReference(brand, conv, platform, opportunity.conversion_intent),
    cta: generateConversionCta({
      domain: opportunity.content_domain,
      trend: opportunity.trend_category,
      intent: opportunity.conversion_intent,
      platform,
      brandName: brand.name,
      learningEmphasis,
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
  tenantId: string
  supabase?: SupabaseClient
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

/** Shared narrative spine so every surface teaches the same lesson with native shape. */
type CreatorAdaptationSpine = {
  topic: string
  angle: string
  teachingCue: string
  ctaPrimary: string
  oneLineLesson: string
  consistency_spine: string
}

function buildCreatorAdaptationSpine(
  opportunity: ContentOpportunity,
  brief: CreativeBrief,
): CreatorAdaptationSpine {
  const topic = opportunity.topic.trim() || 'This signal'
  const angle = (opportunity.suggested_angle.trim() || brief.caption_direction).slice(0, 520)
  const teachingCue = `${opportunity.teaching_level} audience · ${opportunity.explanation_style.replace(/_/g, ' ')} · ${opportunity.educational_framing.replace(/_/g, ' ')}`
  const ctaPrimary =
    opportunity.suggested_cta.trim() ||
    (opportunity.content_domain === 'ai'
      ? 'Comment TEMPLATE if you want the exact prompt text.'
      : 'Tell us what you’d try first in the comments.')
  const oneLineLesson =
    opportunity.content_domain === 'ai'
      ? `One practical takeaway about: ${topic.split('.')[0] || topic}.`
      : `Here’s what to know: ${topic.split('.')[0] || topic}.`
  const consistency_spine = `Same lesson on every surface: "${topic.slice(0, 72)}${topic.length > 72 ? '…' : ''}" · ${oneLineLesson} · CTA: ${ctaPrimary.slice(0, 80)}${ctaPrimary.length > 80 ? '…' : ''}.`
  return { topic, angle, teachingCue, ctaPrimary, oneLineLesson, consistency_spine }
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
  recommendations: BrandLearningState['recommendations'],
  spine: CreatorAdaptationSpine,
): PlatformPostVariant {
  const layer = conversionLayerForPlatform(brand, opportunity, 'x', recommendations)
  const pol = getPlatformAdaptationPolicy('x')
  const trend = trendLabel(opportunity.trend_category)
  const prefix = xTimelyPrefix(opportunity.trend_category)

  const hook = clipWithStatus(
    opportunity.content_domain === 'ai'
      ? `${prefix} ${spine.oneLineLesson}`.trim()
      : `${prefix} ${spine.topic}`.trim(),
    108,
  ).text

  const bodyRaw =
    opportunity.content_domain === 'ai'
      ? `${spine.angle.slice(0, 320)}\n\nWhy it lands: ${spine.teachingCue} · ${trend} lens.`
      : `${spine.angle.slice(0, 300)}\n\n${brand.voice} tone · ${trend} · ${opportunity.content_domain}.`

  const body = clipWithStatus(bodyRaw, 220).text
  const leadCombined = clipWithStatus(`${hook}\n\n${body}`, pol.roughMaxCaptionChars)
  const caption = leadCombined.text
  const status = leadCombined.status

  const cta = clipWithStatus(layer.cta.trim() || spine.ctaPrimary, 95).text

  const thread_beats =
    opportunity.content_domain === 'ai'
      ? [
          `2/x — One-line definition readers can reuse (no acronym pile-up).`,
          `3/x — 3 numbered steps to try in order (copy-paste friendly).`,
          `4/x — One “gotcha” or limitation people miss.`,
          `5/x — ${spine.ctaPrimary}`,
        ]
      : [
          `2/x — Proof or source that backs “${spine.topic.slice(0, 48)}…”.`,
          `3/x — What you’d do next (single action).`,
          `4/x — ${spine.ctaPrimary}`,
        ]

  const draft: PlatformPostVariant = {
    platform: 'x',
    hook,
    body,
    caption,
    consistency_spine: spine.consistency_spine,
    thread_beats,
    hashtags: buildHashtags(brand, opportunity, pol.maxHashtags, 'minimal'),
    cta,
    conversion_intent: layer.conversion_intent,
    destination_reference: layer.destination_reference,
    thread_continuation_hint: thread_beats[0],
    recommendedFormat: pickFormat(opportunity.suggested_content_format, pol.typicalContentFormats),
    mediaPlanSummary: clipWithStatus(
      `Still or diagram-first. ${brief.visual_direction.slice(0, 120)} Alt text: restate the hook in plain language.`,
      380,
    ).text,
    characterLimitStatus: status,
    publishingNotes: automationPublishingNotes(brand),
    adaptationRationale: `X · concise + insightful: lead post = hook + tight body under the cap; thread_beats are ready-to-post replies. Tone: ${pol.preferredToneTendencies.join(', ')}. ${pol.captionStyleGuidance}`,
  }
  const extra = learningNotesForPlatform({
    platform: 'x',
    domain: opportunity.content_domain,
    trend: opportunity.trend_category,
    format: draft.recommendedFormat,
    recommendations,
  })
  const staged =
    extra.notes.length > 0
      ? { ...draft, adaptationRationale: `${draft.adaptationRationale} ${extra.notes.join(' ')}` }
      : draft
  return refinePlatformVariant(staged, pol, opportunity, brand)
}

function buildVariantInstagram(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  brief: CreativeBrief,
  recommendations: BrandLearningState['recommendations'],
  spine: CreatorAdaptationSpine,
): PlatformPostVariant {
  const layer = conversionLayerForPlatform(brand, opportunity, 'instagram', recommendations)
  const pol = getPlatformAdaptationPolicy('instagram')
  const trend = trendLabel(opportunity.trend_category)

  const hook = clipWithStatus(
    opportunity.content_domain === 'ai'
      ? `Save this carousel: ${spine.topic.split('.')[0] || spine.topic} — by the last slide you can copy the workflow.`
      : `Save this: ${spine.topic.split('.')[0] || spine.topic} — ${trend}, ${brand.name} lens.`,
    130,
  ).text

  const body = clipWithStatus(
    [
      spine.oneLineLesson,
      '',
      spine.angle.slice(0, 520),
      '',
      `Structure: ${spine.teachingCue}`,
      '',
      'Caption expands the slides — keep each slide to one idea.',
    ].join('\n'),
    1100,
  ).text

  const captionBlock = clipWithStatus(
    [hook, '', body, '', layer.cta.trim() || spine.ctaPrimary].join('\n'),
    pol.roughMaxCaptionChars,
  )

  const carousel_slides =
    opportunity.content_domain === 'ai'
      ? [
          `Slide 1 — Cover: big title “${spine.topic.slice(0, 42)}${spine.topic.length > 42 ? '…' : ''}” + sub “free tutorial”.`,
          `Slide 2 — Problem: what beginners get wrong (1 diagram or 3 bullets max).`,
          `Slide 3 — Definition: one plain-English sentence + icon.`,
          `Slide 4 — Steps: 3–5 numbered actions (match ${opportunity.explanation_style.replace(/_/g, ' ')} pacing).`,
          `Slide 5 — Demo frame: “watch the setting / prompt” (UI crop or sketch).`,
          `Slide 6 — Recap: one-line takeaway + “save for later”.`,
          `Slide 7 — CTA: ${spine.ctaPrimary}`,
        ]
      : [
          `Slide 1 — Cover: ${spine.topic.slice(0, 48)}`,
          `Slide 2 — Context`,
          `Slide 3 — Key insight`,
          `Slide 4 — Proof`,
          `Slide 5 — CTA: ${spine.ctaPrimary}`,
        ]

  const visualNote = clipWithStatus(
    `4:5 carousel. Slide 1 is the scroll-stopper. Type large; one idea per slide. Reels cutdown: reuse slides 1→4 with hook burned in 0–2s. ${brief.visual_direction.slice(0, 120)}`,
    340,
  ).text

  const draft: PlatformPostVariant = {
    platform: 'instagram',
    title: clipWithStatus(`${brand.name} · ${trend}`, 72).text,
    hook,
    body,
    caption: captionBlock.text,
    consistency_spine: spine.consistency_spine,
    carousel_slides,
    hashtags: buildHashtags(brand, opportunity, pol.maxHashtags, 'cluster'),
    cta: clipWithStatus(layer.cta.trim() || spine.ctaPrimary, 140).text,
    conversion_intent: layer.conversion_intent,
    destination_reference: layer.destination_reference,
    visual_note: visualNote,
    recommendedFormat: pickFormat(opportunity.suggested_content_format, pol.typicalContentFormats),
    mediaPlanSummary: clipWithStatus(
      `Educational carousel + caption pair. ${brief.visual_direction.slice(0, 200)} Mood: ${brief.mood_style_notes.slice(0, 100)}`,
      400,
    ).text,
    characterLimitStatus: captionBlock.status,
    publishingNotes: automationPublishingNotes(brand),
    adaptationRationale: `Instagram · structured + educational: caption = hook + teachable body + CTA; carousel_slides are ready art direction. ${pol.hookStyleGuidance} ${pol.captionStyleGuidance}`,
  }
  const extra = learningNotesForPlatform({
    platform: 'instagram',
    domain: opportunity.content_domain,
    trend: opportunity.trend_category,
    format: draft.recommendedFormat,
    recommendations,
  })
  const staged =
    extra.notes.length > 0
      ? { ...draft, adaptationRationale: `${draft.adaptationRationale} ${extra.notes.join(' ')}` }
      : draft
  return refinePlatformVariant(staged, pol, opportunity, brand)
}

function buildVariantTikTok(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  brief: CreativeBrief,
  recommendations: BrandLearningState['recommendations'],
  spine: CreatorAdaptationSpine,
): PlatformPostVariant {
  const layer = conversionLayerForPlatform(brand, opportunity, 'tiktok', recommendations)
  const pol = getPlatformAdaptationPolicy('tiktok')
  const trend = trendLabel(opportunity.trend_category)

  const hook = clipWithStatus(
    opportunity.content_domain === 'ai'
      ? `Watch me prove: ${spine.topic.slice(0, 44)}${spine.topic.length > 44 ? '…' : ''} (screen demo)`
      : brand.creative_risk_level === 'bold'
        ? `POV: ${trend} hits different today`
        : `Wait for it — ${trend} × ${opportunity.content_domain}`,
    72,
  ).text

  const body = clipWithStatus(
    [
      `${spine.topic} · ${trend} · ${opportunity.content_domain}`,
      `${spine.teachingCue}`,
      'Sound-optional: captions carry the lesson if viewers are muted.',
    ].join('\n'),
    220,
  ).text

  const capBlock = clipWithStatus([hook, '', body].join('\n'), pol.roughMaxCaptionChars)

  const tiktok_flow = [
    'Flow — Beat 1 (0–1s): pattern interrupt; show finished result or “after” UI first.',
    'Flow — Beat 2 (1–3s): name the tool + who it’s for (burned-in text, plain words).',
    'Flow — Beat 3 (3–10s): screen-led demo — follow the cursor; one action per cut.',
    'Flow — Beat 4 (10–14s): recap 3 taught steps as on-screen checklist.',
    'Flow — Beat 5 (end): point at caption CTA / comment keyword; invite stitch with your variant.',
  ].join('\n')

  const videoConcept = [
    `Shot 0–1s: hard cut + hook text: "${spine.topic.slice(0, 32)}…"`,
    `Shot 1–4s: setup tension / wrong default for ${spine.topic.slice(0, 40)}…`,
    `Shot 4–12s: payoff demo (UI capture); narrate each click.`,
    `Shot 12–15s: lip + on-screen CTA: ${(layer.cta || spine.ctaPrimary).slice(0, 48)}`,
  ].join(' ')

  const onScreen = clipWithStatus(
    `${spine.topic.slice(0, 34)}${spine.topic.length > 34 ? '…' : ''} → copy my steps`,
    42,
  ).text

  const draft: PlatformPostVariant = {
    platform: 'tiktok',
    hook,
    body,
    caption: capBlock.text,
    consistency_spine: spine.consistency_spine,
    tiktok_flow,
    hashtags: buildHashtags(brand, opportunity, pol.maxHashtags, 'tiktok'),
    cta: clipWithStatus(layer.cta.trim() || spine.ctaPrimary, 120).text,
    conversion_intent: layer.conversion_intent,
    destination_reference: layer.destination_reference,
    video_concept: clipWithStatus(videoConcept, 420).text,
    on_screen_text_suggestion: onScreen,
    recommendedFormat: pickFormat(opportunity.suggested_content_format, pol.typicalContentFormats),
    mediaPlanSummary: clipWithStatus(
      `9:16 vertical demo-first. Motion: ${brief.animation_direction.slice(0, 120)} Visual: ${brief.visual_direction.slice(0, 120)}`,
      400,
    ).text,
    characterLimitStatus: capBlock.status,
    publishingNotes: automationPublishingNotes(brand),
    adaptationRationale: `TikTok · engaging + demo: hook opens on outcome; tiktok_flow + video_concept are ready shot plans; caption names tool + outcome. ${pol.hookStyleGuidance}`,
  }
  const extra = learningNotesForPlatform({
    platform: 'tiktok',
    domain: opportunity.content_domain,
    trend: opportunity.trend_category,
    format: draft.recommendedFormat,
    recommendations,
  })
  const staged =
    extra.notes.length > 0
      ? { ...draft, adaptationRationale: `${draft.adaptationRationale} ${extra.notes.join(' ')}` }
      : draft
  return refinePlatformVariant(staged, pol, opportunity, brand)
}

function buildVariantFacebook(
  brand: BrandProfile,
  opportunity: ContentOpportunity,
  brief: CreativeBrief,
  recommendations: BrandLearningState['recommendations'],
  spine: CreatorAdaptationSpine,
): PlatformPostVariant {
  const layer = conversionLayerForPlatform(brand, opportunity, 'facebook', recommendations)
  const pol = getPlatformAdaptationPolicy('facebook')
  const trend = trendLabel(opportunity.trend_category)

  const hook = clipWithStatus(
    opportunity.content_domain === 'ai'
      ? `Hey ${brand.name} community — bookmarkable mini-lesson: ${spine.topic.split('.')[0] || spine.topic}.`
      : `Hey ${brand.name} community — quick context on something we’re watching:`,
    140,
  ).text

  const body = clipWithStatus(
    [
      spine.oneLineLesson,
      '',
      spine.angle.slice(0, 620),
      '',
      `Teach track: ${spine.teachingCue}`,
      '',
      `Why it matters for you: ${brand.audience_summary.slice(0, 200)}${brand.audience_summary.length > 200 ? '…' : ''}`,
      '',
      'Optional: add a 3-image album mirroring the Instagram carousel beats for parity.',
    ].join('\n'),
    1600,
  ).text

  const captionBlock = clipWithStatus(
    [hook, '', body, '', layer.cta.trim() || spine.ctaPrimary].join('\n'),
    pol.roughMaxCaptionChars,
  )

  const community =
    'If this helped, tag someone learning the same stack — we read thoughtful comments and pin good follow-ups.'

  const draft: PlatformPostVariant = {
    platform: 'facebook',
    title: clipWithStatus(`${brand.name} · ${trend}`, 80).text,
    hook,
    body,
    caption: captionBlock.text,
    consistency_spine: spine.consistency_spine,
    hashtags: buildHashtags(brand, opportunity, pol.maxHashtags, 'light'),
    cta: clipWithStatus(layer.cta.trim() || spine.ctaPrimary, 160).text,
    conversion_intent: layer.conversion_intent,
    destination_reference: layer.destination_reference,
    community_cta: community,
    recommendedFormat: pickFormat(opportunity.suggested_content_format, pol.typicalContentFormats),
    mediaPlanSummary: clipWithStatus(
      `Page feed: short paragraphs + optional carousel album for the same lesson as IG. ${opportunity.suggested_media_direction.slice(0, 180)} Mood: ${brief.mood_style_notes.slice(0, 90)} ${pol.mediaExpectations}`,
      420,
    ).text,
    characterLimitStatus: captionBlock.status,
    publishingNotes: automationPublishingNotes(brand),
    adaptationRationale: `Facebook · warm + explanatory: same spine as other surfaces; longer body + community invite. ${pol.captionStyleGuidance}`,
  }
  const extra = learningNotesForPlatform({
    platform: 'facebook',
    domain: opportunity.content_domain,
    trend: opportunity.trend_category,
    format: draft.recommendedFormat,
    recommendations,
  })
  const staged =
    extra.notes.length > 0
      ? { ...draft, adaptationRationale: `${draft.adaptationRationale} ${extra.notes.join(' ')}` }
      : draft
  return refinePlatformVariant(staged, pol, opportunity, brand)
}

/**
 * Transforms one shared opportunity (+ brief + brand) into distinct platform-native variants.
 */
export async function adaptOpportunityToPlatforms(
  input: AdaptOpportunityToPlatformsInput,
): Promise<PlatformAdaptationResult> {
  const targets = input.targetPlatforms ?? [...ADAPTATION_PLATFORM_IDS]
  const rawBrief =
    input.creativeBrief ?? buildCreativeBriefFromOpportunity(input.opportunity, input.brand)
  const brief = normalizeCreativeBriefForAdaptation(rawBrief)
  const spine = buildCreatorAdaptationSpine(input.opportunity, brief)

  const builders: Record<
    AdaptationPlatformId,
    (
      b: BrandProfile,
      o: ContentOpportunity,
      br: CreativeBrief,
      recs: BrandLearningState['recommendations'],
      sp: CreatorAdaptationSpine,
    ) => PlatformPostVariant
  > = {
    x: buildVariantX,
    instagram: buildVariantInstagram,
    tiktok: buildVariantTikTok,
    facebook: buildVariantFacebook,
  }
  const recommendations = (
    await getBrandLearningState(input.brand.id, input.tenantId, input.supabase)
  ).recommendations

  const notes = input.learningSurfaceNotes?.filter(Boolean) ?? []
  const learningSuffix =
    notes.length > 0 ? ` Learning layer: ${notes.join(' · ')}.` : ''

  const preferredOrder: AdaptationPlatformId[] = ['instagram', 'tiktok', 'x', 'facebook']
  const targetsSorted = [
    ...preferredOrder.filter((p) => targets.includes(p)),
    ...targets.filter((p) => !preferredOrder.includes(p)),
  ]

  const variants = targetsSorted
    .map((p) => builders[p](input.brand, input.opportunity, brief, recommendations, spine))
    .map((v) =>
      learningSuffix
        ? { ...v, adaptationRationale: `${v.adaptationRationale}${learningSuffix}` }
        : v,
    )

  onPlatformAdapted({
    brand_id: input.brand.id,
    summary: {
      opportunity_id: input.opportunity.id,
      platforms: variants.map((v) => v.platform),
      variants: variants.length,
    },
  })

  return {
    opportunity_id: input.opportunity.id,
    brand_id: input.brand.id,
    brand_name: input.brand.name,
    variants,
    created_at_iso: new Date().toISOString(),
  }
}
