import type { SupabaseClient } from '@supabase/supabase-js'
import { mergeBrandConversionProfile } from '../../config/brandConversionDefaults'
import { getBrandDomains } from '../../config/brandDomains'
import { getDomainDefinition } from '../../config/domains'
import { getTrendCategoryBehavior } from '../../config/trendCategoryBehavior'
import type { BrandProfile } from '../../types/brand'
import type { ContentDomain } from '../../types/contentDomain'
import type { ContentFormat } from '../../types/contentFormat'
import type { LearningInfluenceTrace } from '../../types/performanceLearning'
import type { ContentOpportunity, UrgencyLevel } from '../../types/opportunity'
import { priorityLabelFromScore } from '../../types/priorityLabel'
import type { TrendCategory } from '../../types/trendCategory'
import { describeFreshnessSummary } from '../relevance/freshness'
import { extractMatchedKeywords } from '../relevance/matchKeywords'
import { decideAutonomy } from '../autonomy/decideAutonomy'
import { opportunityLifecycleFromAutonomy } from '../lifecycle/mapAutonomyToLifecycle'
import { classifySignal } from '../domains/classifySignal'
import { classifyTrendCategory } from '../trends/classifyTrendCategory'
import { inferConversionIntent } from '../conversion/inferConversionIntent'
import { generateConversionCta } from '../conversion/generateConversionCta'
import { summarizeOpportunityDestination } from '../conversion/pickDestinationReference'
import { firstAdaptationPlatformFromSuggestions } from '../conversion/mapSuggestedPlatform'
import {
  adjustFormatWithLearning,
  applyLearningToPriorityScore,
  applyPositiveFormatPreference,
  drivingCtaStyleRecommendation,
  learningConfidenceAdjustment,
  nudgeTeachingWithPositiveLearning,
  resolveCtaLearningEmphasis,
} from '../learning/applyLearningFeedback'
import { getBrandLearningState } from '../learning/learningContext'
import { ensureBrandLearningDemoSeed } from '../learning/seedDemoLearningData'
import {
  buildLearningVisibilityFields,
  reorderSuggestedPlatformsForLearning,
} from '../learning/buildLearningVisibility'
import { buildOpportunityLearningImpactComparison } from './buildOpportunityLearningImpactComparison'
import { resolveTeachingProfile } from '../teaching/resolveTeachingProfile'
import type { ScoredSignal } from '../relevance/types'

function urgencyFromScores(relevance: number, freshness: number): UrgencyLevel {
  const score = relevance * 0.65 + freshness * 0.35
  if (score >= 0.72) return 'high'
  if (score >= 0.45) return 'medium'
  return 'low'
}

function adjustUrgencyForTrend(
  category: TrendCategory,
  freshness: number,
  base: UrgencyLevel,
): UrgencyLevel {
  if (category === 'breaking_news' || category === 'viral_trend') {
    if (freshness >= 0.55 && base === 'low') return 'medium'
    if (base === 'medium') return 'high'
  }
  if (category === 'viral_audio' && freshness >= 0.7 && base !== 'high') {
    return base === 'low' ? 'medium' : 'high'
  }
  if (category === 'educational_topic' && base === 'high') return 'medium'
  if (category === 'meme' && base === 'high') return 'medium'
  if (category === 'industry_update' && base === 'high') return 'medium'
  return base
}

function adjustUrgencyForDomain(
  domain: ContentDomain,
  freshness: number,
  base: UrgencyLevel,
): UrgencyLevel {
  if ((domain === 'music' || domain === 'entertainment') && freshness >= 0.75) {
    if (base === 'low') return 'medium'
    if (base === 'medium') return 'high'
  }
  if (domain === 'ai' && base === 'high') return 'medium'
  return base
}

function formatPlatformLabel(slug: string): string {
  const s = slug.toLowerCase()
  if (s === 'youtube') return 'YouTube'
  if (s === 'linkedin') return 'LinkedIn'
  return slug.slice(0, 1).toUpperCase() + slug.slice(1)
}

function platformsForContext(
  domain: ContentDomain,
  trend: TrendCategory,
  tags: string[],
): string[] {
  const fromDef = getDomainDefinition(domain).platforms.map(formatPlatformLabel)
  const t = tags.join(' ').toLowerCase()

  if (domain === 'ai') {
    const out = [...fromDef]
    if (trend === 'viral_audio' || trend === 'viral_trend' || trend === 'meme') {
      if (!out.some((p) => p.toLowerCase() === 'tiktok')) out.unshift('TikTok')
    }
    const order = ['TikTok', 'Instagram', 'X', 'YouTube', 'LinkedIn', 'Threads']
    const byLower = new Map(out.map((p) => [p.toLowerCase(), p]))
    const reordered: string[] = []
    for (const o of order) {
      const hit = byLower.get(o.toLowerCase())
      if (hit) {
        reordered.push(hit)
        byLower.delete(o.toLowerCase())
      }
    }
    for (const rest of byLower.values()) reordered.push(rest)
    if (t.includes('linkedin')) {
      const merged = ['LinkedIn', ...reordered.filter((p) => p.toLowerCase() !== 'linkedin')]
      return merged.slice(0, 4)
    }
    return reordered.slice(0, 4)
  }

  const out = [...fromDef]

  if (trend === 'viral_audio' || trend === 'viral_trend' || trend === 'meme') {
    if (!out.some((p) => p.toLowerCase() === 'tiktok')) out.unshift('TikTok')
  }
  if (trend === 'industry_update' || trend === 'educational_topic') {
    if (!out.some((p) => p.toLowerCase() === 'linkedin')) out.unshift('LinkedIn')
  }
  if (t.includes('linkedin')) {
    const merged = ['LinkedIn', ...out.filter((p) => p !== 'LinkedIn')]
    return merged.slice(0, 4)
  }
  return out.slice(0, 4)
}

function pickSuggestedFormatForOpportunity(
  brand: BrandProfile,
  urgency: UrgencyLevel,
  domain: ContentDomain,
  trend: TrendCategory,
): ContentFormat {
  const prefs = brand.preferred_content_formats
  if (prefs.length === 0) return 'caption_only_post'

  const trendPrefs = getTrendCategoryBehavior(trend).preferredFormats
  const intersect = trendPrefs.find((f) => prefs.includes(f))
  if (intersect) {
    if (urgency === 'high') return prefs.includes(trendPrefs[0]) ? trendPrefs[0] : intersect
    return intersect
  }

  if (domain === 'ai') {
    if (
      (trend === 'educational_topic' || trend === 'industry_update') &&
      prefs.includes('carousel_concept')
    ) {
      return 'carousel_concept'
    }
    if (
      (trend === 'viral_trend' || trend === 'viral_audio' || trend === 'product_launch') &&
      prefs.includes('short_form_video_concept')
    ) {
      return 'short_form_video_concept'
    }
    if (trend === 'cultural_moment' && prefs.includes('carousel_concept')) {
      return 'carousel_concept'
    }
  }

  const domainBias: Record<ContentDomain, ContentFormat> = {
    ai: 'carousel_concept',
    beauty: 'short_form_video_concept',
    lifestyle: 'carousel_concept',
    entertainment: 'short_form_video_concept',
    music: 'short_form_video_concept',
  }
  const bias = domainBias[domain]
  if (prefs.includes(bias)) {
    if (urgency === 'high') return prefs[0]
    return bias
  }

  if (urgency === 'high') return prefs[0]
  if (urgency === 'medium') return prefs[Math.min(1, prefs.length - 1)]
  return prefs[prefs.length - 1]
}

function buildAngleForContext(domain: ContentDomain, topic: string, trend: TrendCategory): string {
  const clip = topic.slice(0, 56)
  const hint = getTrendCategoryBehavior(trend).angleHint
  const base = (() => {
    switch (domain) {
      case 'ai':
        return `Educator-first around “${clip}…”: tutorial, tool walkthrough, comparison, or practical use-case — numbered steps or a demo beat; skip generic lifestyle framing.`
      case 'beauty':
        return `Educational + trust-building: routine-first framing around “${clip}…”.`
      case 'lifestyle':
        return `Relatable, practical: micro-story + doable takeaway from “${clip}…”.`
      case 'entertainment':
        return `Reactive, conversational: hook on why “${clip}…” matters now.`
      case 'music':
        return `Fast, trend-native: hook first line; energy match for “${clip}…”.`
    }
  })()
  return `${base} Trend lens: ${hint}`
}

function buildMediaDirection(
  brand: BrandProfile,
  topic: string,
  format: ContentFormat,
  domain: ContentDomain,
  trend: TrendCategory,
): string {
  const domains = getBrandDomains(brand).join(', ')
  const def = getDomainDefinition(domain)
  const trendLabel = trend.replace(/_/g, ' ')
  const lines = [
    `Jifunze domain: ${def.name}. Trend type: ${trendLabel}. Brand focus: ${domains}.`,
    `Format: ${format.replace(/_/g, ' ')}.`,
    `Tone cues: ${def.tone.join(', ')}.`,
    `Style: ${brand.media_style.reference_mood}; palette: ${brand.media_style.palette_notes}.`,
    `Hero: "${topic.slice(0, 72)}${topic.length > 72 ? '…' : ''}".`,
    `Realism: ${brand.visual_realism_preference}; motion: ${brand.animation_preference}; risk: ${brand.creative_risk_level}.`,
  ]
  if (domain === 'ai') {
    lines.push(
      'Educator visual bias: UI capture, diagrams, on-screen steps; TikTok favors a tight demo/use-case; Instagram favors carousel frames or an educational hook; X favors one sharp insight or a thread outline.',
    )
  }
  return lines.join(' ')
}

function computePriorityScore(
  relevance: number,
  freshness: number,
  trend: TrendCategory,
): number {
  const um = getTrendCategoryBehavior(trend).urgencyMultiplier
  const pulse = Math.min(1, um / 1.22)
  const raw = 0.52 * relevance + 0.33 * freshness + 0.15 * pulse
  return Math.min(1, Math.max(0, raw))
}

function matchedDomainLine(brand: BrandProfile, content_domain: ContentDomain): string {
  const def = getDomainDefinition(content_domain)
  const label = `${def.name} (${content_domain})`
  const doms = getBrandDomains(brand)
  if (content_domain === brand.primaryDomain) return `${label} — primary`
  if (doms.includes(content_domain)) return `${label} — secondary`
  const cross = brand.allow_cross_domain_signals ? 'cross-domain allowed' : 'outside profile'
  return `${label} — ${cross}`
}

function buildSelectionReason(
  brand: BrandProfile,
  scored: ScoredSignal,
  trend_category: TrendCategory,
  content_domain: ContentDomain,
  matched_keywords: string[],
): string {
  const parts: string[] = []
  const doms = getBrandDomains(brand)

  if (content_domain === brand.primaryDomain) {
    parts.push(`Strong alignment with your primary domain (${content_domain}).`)
  } else if (doms.includes(content_domain)) {
    parts.push(`Fits a secondary vertical (${content_domain}).`)
  } else {
    parts.push(`Classified as ${content_domain} — outside declared domains; kept because relevance cleared the bar.`)
  }

  parts.push(`Trend pattern: ${trend_category.replace(/_/g, ' ')}.`)

  if (brand.allowed_trend_categories.includes(trend_category)) {
    parts.push('This pattern is on your watchlist.')
  }

  const fresh = scored.freshness_score ?? 0
  if (fresh >= 0.75) parts.push('High freshness — good window to post soon.')
  else if (fresh < 0.45) parts.push('Older signal — consider an evergreen or commentary angle.')

  const rel = scored.relevance_score ?? 0
  if (rel >= 0.55) parts.push('Solid match to your priorities and positioning.')

  if (matched_keywords.length) {
    parts.push(`Keyword hits: ${matched_keywords.slice(0, 6).join(', ')}${matched_keywords.length > 6 ? '…' : ''}.`)
  }

  return parts.join(' ')
}

/**
 * Maps scored signals into reviewable opportunities (no auto-posting).
 * Drops signals whose trend category is forbidden for the brand.
 * Attaches autonomy and `lifecycle_status` via `opportunityLifecycleFromAutonomy`.
 */
export async function buildOpportunitiesFromSignals(
  signals: ScoredSignal[],
  brand: BrandProfile,
  minRelevance = 0.18,
  tenantContext: { tenantId: string; supabase?: SupabaseClient },
): Promise<ContentOpportunity[]> {
  await ensureBrandLearningDemoSeed(brand, tenantContext)
  const learningState = await getBrandLearningState(brand.id, tenantContext.tenantId, tenantContext.supabase)

  const hayFor = (s: ScoredSignal) =>
    `${s.title} ${s.summary} ${s.topic_tags.join(' ')}`

  const filtered = signals.filter((s) => (s.relevance_score ?? 0) >= minRelevance)

  const out = await Promise.all(
    filtered.map(async (s) => {
      const trend_category = s.classified_trend_category ?? classifyTrendCategory(s)
      if (brand.forbidden_trend_categories.includes(trend_category)) {
        return null
      }

      const content_domain = s.classified_domain ?? classifySignal(s)
      const def = getDomainDefinition(content_domain)

      let urgency = urgencyFromScores(s.relevance_score ?? 0, s.freshness_score ?? 0)
      urgency = adjustUrgencyForTrend(trend_category, s.freshness_score ?? 0, urgency)
      urgency = adjustUrgencyForDomain(content_domain, s.freshness_score ?? 0, urgency)

      const platformsBaseline = platformsForContext(content_domain, trend_category, s.topic_tags)
      const platformLearning = reorderSuggestedPlatformsForLearning(
        [...platformsBaseline],
        content_domain,
        trend_category,
        learningState.recommendations,
      )
      const suggested_platforms = platformLearning.platforms
      const brandConversion = mergeBrandConversionProfile(brand)
      const conversion_intent = inferConversionIntent({
        primary: brandConversion.primary_conversion_goal,
        secondary: brandConversion.secondary_conversion_goals,
        trend: trend_category,
        urgency,
      })
      const primarySurface = firstAdaptationPlatformFromSuggestions(suggested_platforms)
      const ctaEmphasis = resolveCtaLearningEmphasis(learningState.recommendations, primarySurface)
      const suggested_cta = generateConversionCta({
        domain: content_domain,
        trend: trend_category,
        intent: conversion_intent,
        platform: primarySurface,
        brandName: brand.name,
        learningEmphasis: ctaEmphasis,
      })
      const target_destination = summarizeOpportunityDestination(
        brand,
        brandConversion,
        conversion_intent,
        suggested_platforms,
        'instagram',
      )
      const formatPicked = pickSuggestedFormatForOpportunity(
        brand,
        urgency,
        content_domain,
        trend_category,
      )
      const positiveFormat = applyPositiveFormatPreference(
        brand,
        formatPicked,
        trend_category,
        primarySurface,
        content_domain,
        learningState.recommendations,
      )
      const formatDecision = adjustFormatWithLearning(
        brand,
        positiveFormat.format,
        trend_category,
        primarySurface,
        learningState.recommendations,
      )
      const suggested_content_format = formatDecision.format
      const formatLearningTrace = [...positiveFormat.trace, ...formatDecision.trace]
      const teachingResolved = await resolveTeachingProfile({
        brandProfileId: brand.id,
        domain: content_domain,
        trend: trend_category,
        urgency,
        tenantId: tenantContext.tenantId,
        supabase: tenantContext.supabase,
      })
      const { profile: teaching, traces: teachingLearningTraces } = nudgeTeachingWithPositiveLearning(
        teachingResolved,
        learningState.recommendations,
        {
          domain: content_domain,
          trend: trend_category,
          platform: primarySurface,
        },
      )
      const topic = s.title
      const basePriority = computePriorityScore(
        s.relevance_score ?? 0,
        s.freshness_score ?? 0,
        trend_category,
      )
      const {
        score: priority_score,
        notes: learningPriorityNotes,
        trace: priorityTrace,
      } = applyLearningToPriorityScore({
        base: basePriority,
        domain: content_domain,
        trend: trend_category,
        format: suggested_content_format,
        platform: primarySurface,
        explanationStyle: teaching.explanation_style,
        teachingLevel: teaching.teaching_level,
        recommendations: learningState.recommendations,
      })
      const priority_label = priorityLabelFromScore(priority_score)
      const matched_keywords = extractMatchedKeywords(brand, hayFor(s))
      const freshness_summary = describeFreshnessSummary(
        s.published_at,
        s.freshness_score ?? 0,
      )
      const matched_domain = matchedDomainLine(brand, content_domain)
      const { delta: learningConfidenceDelta, reasons: learningReasons, trace: confidenceTrace } =
        learningConfidenceAdjustment({
          domain: content_domain,
          trend: trend_category,
          platform: primarySurface,
          teachingLevel: teaching.teaching_level,
          recommendations: learningState.recommendations,
        })

      let selection_reason = buildSelectionReason(
        brand,
        s,
        trend_category,
        content_domain,
        matched_keywords,
      )
      if (learningPriorityNotes.length) {
        selection_reason += ` Learning: ${learningPriorityNotes.join(' ')}`
      }
      if (suggested_content_format !== formatPicked) {
        const steeredPositive = formatLearningTrace.some((t) => t.pattern.includes('Prefer format'))
        selection_reason += steeredPositive
          ? ` Format steered toward a high-performing pattern (${formatPicked.replace(/_/g, ' ')} → ${suggested_content_format.replace(/_/g, ' ')}).`
          : ` Format adjusted by performance memory (${formatPicked.replace(/_/g, ' ')} → ${suggested_content_format.replace(/_/g, ' ')}).`
      }
      const ctaDrivingRec = drivingCtaStyleRecommendation(
        learningState.recommendations,
        primarySurface,
      )
      const ctaLearningTrace: LearningInfluenceTrace[] =
        ctaEmphasis !== 'none'
          ? [
              {
                pattern: `CTA shaped by learning (${ctaEmphasis.replace(/_/g, ' ')})`,
                direction: 'boost',
                delta: ctaDrivingRec?.weight ?? 0,
                why:
                  ctaDrivingRec?.rationale ??
                  'Past published outcomes on this surface weighted this CTA cluster.',
                patternStrength: ctaDrivingRec?.sourcePatternStrength,
              },
            ]
          : []

      const learning_influence_trace = [
        ...platformLearning.trace,
        ...ctaLearningTrace,
        ...formatLearningTrace,
        ...priorityTrace,
        ...confidenceTrace,
        ...teachingLearningTraces,
      ].slice(0, 14)
      const learningVisibility = buildLearningVisibilityFields({
        snapshot: learningState.snapshot,
        insights: learningState.insights,
        learnedSummaryLines: learningState.learnedSummaryLines,
        content_domain,
        trend_category,
        suggested_content_format,
        format_before_learning: formatPicked,
        explanation_style: teaching.explanation_style,
        teaching_level: teaching.teaching_level,
        teaching_explainability: teaching.teaching_explainability,
        cta_emphasis: ctaEmphasis,
        priority_trace: priorityTrace,
        format_trace: formatLearningTrace,
        platform_trace: platformLearning.trace,
        confidence_trace: confidenceTrace,
      })
      if (learning_influence_trace.length) {
        selection_reason += ` Learning trace: ${learning_influence_trace
          .map((t) => `${t.direction} ${t.pattern}`)
          .slice(0, 3)
          .join(' · ')}.`
      }

      const autonomy = decideAutonomy({
        brand,
        signal: s,
        opportunity: {
          priority_score,
          trend_category,
          content_domain,
          topic,
          matched_keywords,
        },
        learning:
          learningConfidenceDelta !== 0
            ? {
                confidenceDelta: learningConfidenceDelta,
                reasonFragment: learningReasons.join('; '),
              }
            : undefined,
      })

      const learning_impact_comparison = buildOpportunityLearningImpactComparison({
        brand,
        signal: s,
        topic,
        trend_category,
        content_domain,
        matched_keywords,
        basePriority,
        platformsBaseline,
        formatPicked,
        teachingResolved,
        conversion_intent,
        learned: {
          suggested_platforms,
          suggested_content_format,
          suggested_cta,
          teaching,
          priority_score,
          priority_label,
          cta_emphasis: ctaEmphasis,
          autonomy_action: autonomy.autonomy_action,
          confidence_score: autonomy.confidence_score,
          risk_level: autonomy.risk_level,
        },
        traces: {
          platform: platformLearning.trace,
          format: formatLearningTrace,
          cta: ctaLearningTrace,
          teaching: teachingLearningTraces,
          priority: priorityTrace,
          confidence: confidenceTrace,
        },
      })

      const lifecycle_status = opportunityLifecycleFromAutonomy(autonomy.autonomy_action)
      const lifecycle_updated_at = new Date().toISOString()

      return {
        id: `opp-${s.id}`,
        signal_id: s.id,
        topic,
        why_it_matters: `${((s.relevance_score ?? 0) * 100).toFixed(0)}% relevance · priority ${(priority_score * 100).toFixed(0)} (${priority_label}) · ${def.name} (${content_domain}) + ${trend_category.replace(/_/g, ' ')} · ${autonomy.autonomy_action.replace(/_/g, ' ')}.`,
        suggested_angle: buildAngleForContext(content_domain, topic, trend_category),
        urgency,
        suggested_platforms,
        conversion_intent,
        suggested_cta,
        target_destination,
        teaching_level: teaching.teaching_level,
        explanation_style: teaching.explanation_style,
        clarity_preference: teaching.clarity_preference,
        educational_framing: teaching.educational_framing,
        teaching_explainability: teaching.teaching_explainability,
        suggested_content_format,
        suggested_media_direction: buildMediaDirection(
          brand,
          topic,
          suggested_content_format,
          content_domain,
          trend_category,
        ),
        source_links: [s.url],
        trend_category,
        content_domain,
        priority_score,
        priority_label,
        matched_domain,
        matched_keywords,
        freshness_summary,
        selection_reason,
        learning_influence_trace,
        ...learningVisibility,
        autonomy_action: autonomy.autonomy_action,
        autonomy_reason: autonomy.autonomy_reason,
        requires_human_review: autonomy.requires_human_review,
        risk_level: autonomy.risk_level,
        confidence_score: autonomy.confidence_score,
        lifecycle_status,
        lifecycle_updated_at,
        lifecycle_driver: 'autonomy',
        learning_impact_comparison,
      } as ContentOpportunity
    })
  )

  const narrowed = out.filter((o) => o !== null) as ContentOpportunity[]
  return narrowed.sort((a, b) => b.priority_score - a.priority_score)
}
