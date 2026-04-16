import { mapSuggestedPlatformLabel } from '../conversion/mapSuggestedPlatform'
import type { ContentDomain } from '../../types/contentDomain'
import type { ContentFormat } from '../../types/contentFormat'
import type { LearningAffectsFlags, LearningConfidenceBand } from '../../types/opportunity'
import type {
  BrandLearningState,
  CtaLearningEmphasis,
  LearningInfluenceTrace,
  OptimizationInsight,
  PatternStrength,
  StrategyAdjustmentRecommendation,
} from '../../types/performanceLearning'
import type { TrendCategory } from '../../types/trendCategory'
import type { ExplanationStyle, TeachingExplainabilityEntry, TeachingLevel } from '../../types/teaching'

function maxEvidenceTier(traces: LearningInfluenceTrace[]): PatternStrength | undefined {
  let best: PatternStrength | undefined
  const rank: Record<PatternStrength, number> = { weak: 0, emerging: 1, confirmed: 2 }
  for (const t of traces) {
    const s = t.patternStrength
    if (!s) continue
    if (!best || rank[s] > rank[best]) best = s
  }
  return best
}

/**
 * Coarse band for UI: how much performance memory is shaping decisions (distinct from autonomy confidence).
 */
export function computeLearningConfidenceBand(
  sampleCount: number,
  traces: LearningInfluenceTrace[],
): LearningConfidenceBand {
  const tier = maxEvidenceTier(traces)
  const active = traces.filter((t) => t.patternStrength).length
  if (sampleCount === 0 && traces.length === 0) return 'weak'
  if (sampleCount <= 3) {
    if (tier === 'confirmed') return 'emerging'
    if (tier === 'emerging' || active >= 1) return 'emerging'
    return 'weak'
  }
  if (sampleCount < 10) {
    if (tier === 'confirmed') return 'strong'
    if (tier === 'emerging' || active >= 2) return 'emerging'
    return traces.length >= 2 ? 'emerging' : 'weak'
  }
  if (sampleCount < 22) return tier === 'weak' && active === 0 ? 'emerging' : 'strong'
  return 'strong'
}

function insightMatches(
  ins: OptimizationInsight,
  domain: ContentDomain,
  trend: TrendCategory,
  format: ContentFormat,
  explanationStyle: ExplanationStyle,
  teachingLevel: TeachingLevel,
): boolean {
  const t = ins.tags
  if (!t) return false
  if (t.domain && t.domain !== domain) return false
  if (t.trendCategory && t.trendCategory !== trend) return false
  if (t.contentFormat && t.contentFormat !== format) return false
  if (t.explanationStyle && t.explanationStyle !== explanationStyle) return false
  if (t.teachingLevel && t.teachingLevel !== teachingLevel) return false
  return true
}

function ctaEmphasisLabel(emphasis: CtaLearningEmphasis): string | null {
  switch (emphasis) {
    case 'dm':
      return 'Past performance favors DM-style CTAs on this surface — copy nudged toward that pattern.'
    case 'link_in_bio':
      return 'Past performance favors link-in-bio CTAs — wording steered to match what converted before.'
    case 'save_share':
      return 'Past performance favors save/share CTAs — aligned with high-engagement tutorial-style posts.'
    case 'follow':
      return 'Past performance favors follow-growth CTAs — tone adjusted to match that winning pattern.'
    default:
      return null
  }
}

/**
 * Re-order suggested platforms when learning says a domain+trend+surface combo is strong.
 */
export function reorderSuggestedPlatformsForLearning(
  suggested: string[],
  domain: ContentDomain,
  trend: TrendCategory,
  recommendations: StrategyAdjustmentRecommendation[],
): { platforms: string[]; trace: LearningInfluenceTrace[] } {
  const boosts = recommendations.filter(
    (r) =>
      (r.kind === 'boost_domain_platform' || r.kind === 'prefer_platform') &&
      (!r.payload?.domain || r.payload.domain === domain) &&
      (!r.payload?.trendCategory || r.payload.trendCategory === trend) &&
      Boolean(r.payload?.platform),
  )
  boosts.sort((a, b) => b.weight - a.weight)
  const top = boosts[0]
  const want = top?.payload?.platform
  if (!want) return { platforms: suggested, trace: [] }

  const idx = suggested.findIndex((label) => mapSuggestedPlatformLabel(label) === want)
  if (idx <= 0) return { platforms: suggested, trace: [] }

  const next = [...suggested]
  const [picked] = next.splice(idx, 1)
  next.unshift(picked)
  return {
    platforms: next,
    trace: [
      {
        pattern: `Platform order: lead with ${want}`,
        direction: 'boost',
        delta: top.weight,
        why: top.rationale,
        patternStrength: top.sourcePatternStrength,
      },
    ],
  }
}

export type LearningVisibilityInput = {
  snapshot: BrandLearningState['snapshot']
  insights: OptimizationInsight[]
  learnedSummaryLines: string[]
  content_domain: ContentDomain
  trend_category: TrendCategory
  suggested_content_format: ContentFormat
  format_before_learning: ContentFormat
  explanation_style: ExplanationStyle
  teaching_level: TeachingLevel
  teaching_explainability: TeachingExplainabilityEntry[]
  cta_emphasis: CtaLearningEmphasis
  priority_trace: LearningInfluenceTrace[]
  format_trace: LearningInfluenceTrace[]
  platform_trace: LearningInfluenceTrace[]
  confidence_trace: LearningInfluenceTrace[]
}

export function buildLearningAdaptationLabels(input: LearningVisibilityInput): string[] {
  const labels: string[] = []
  const { content_domain, trend_category, suggested_content_format, format_before_learning } = input

  if (format_before_learning !== suggested_content_format && input.format_trace.length) {
    const positive = input.format_trace.some(
      (t) => t.pattern.includes('Prefer format') || t.pattern.includes('aligned with winning'),
    )
    labels.push(
      positive
        ? 'Format leaned into a historically strong pattern for this brand.'
        : 'Format switched based on past underperformance for this type of post.',
    )
  }

  const ctaLine = ctaEmphasisLabel(input.cta_emphasis)
  if (ctaLine) labels.push(ctaLine)

  for (const e of input.teaching_explainability) {
    if (e.influencedBy === 'memory:simplify_complex') {
      labels.push('Simplified due to strong beginner engagement.')
      break
    }
    if (e.influencedBy === 'memory:beginner_step_by_step') {
      labels.push('Structured step-by-step because that pattern outperformed for beginners in memory.')
      break
    }
  }

  const memoryTeaching = input.teaching_explainability.some((e) => e.influencedBy?.startsWith('memory:'))
  if (
    input.explanation_style === 'step_by_step' &&
    (memoryTeaching ||
      input.insights.some(
        (i) =>
          i.kind === 'strong_teaching_style_platform' &&
          insightMatches(
            i,
            content_domain,
            trend_category,
            suggested_content_format,
            input.explanation_style,
            input.teaching_level,
          ),
      ))
  ) {
    labels.push('Based on past high-performing tutorial content.')
  }

  const strongTutorialStyle =
    input.explanation_style === 'step_by_step' ||
    input.explanation_style === 'breakdown' ||
    input.explanation_style === 'use_case'
  for (const ins of input.insights) {
    if (!ins.kind.startsWith('strong_')) continue
    if (!insightMatches(
      ins,
      content_domain,
      trend_category,
      suggested_content_format,
      input.explanation_style,
      input.teaching_level,
    )) {
      continue
    }
    if (ins.kind === 'strong_format' || ins.kind === 'strong_format_platform') {
      labels.push(`Based on past high-performing ${suggested_content_format.replace(/_/g, ' ')} content.`)
    } else if (
      (ins.kind === 'strong_teaching_style_platform' || ins.kind === 'strong_teaching_level_domain') &&
      strongTutorialStyle
    ) {
      if (!labels.some((l) => l.includes('tutorial content'))) {
        labels.push('Based on past high-performing tutorial-style teaching signals in memory.')
      }
    } else if (ins.kind === 'strong_cta' || ins.kind === 'strong_cta_platform') {
      labels.push('CTA shape informed by historically stronger save/click patterns.')
    } else if (ins.kind === 'strong_domain_platform' || ins.kind === 'strong_trend_platform') {
      labels.push('Surface and calendar bias from proven domain + platform performance.')
    }
    break
  }

  if (input.platform_trace.length && !labels.some((l) => l.includes('Surface'))) {
    labels.push('Platform order nudged toward a surface that historically over-indexed for you.')
  }

  if (
    input.priority_trace.length &&
    !labels.some((l) => l.includes('Priority score') || l.includes('outcome patterns'))
  ) {
    labels.push('Priority score adjusted using recent outcome patterns (boosts or cautions).')
  }

  return [...new Set(labels)].slice(0, 6)
}

export function buildLearningPerformanceHints(input: LearningVisibilityInput): string[] {
  const hints: string[] = [...input.learnedSummaryLines.slice(0, 2)]
  const strong = input.insights
    .filter((i) => i.kind.startsWith('strong_'))
    .filter((i) =>
      insightMatches(
        i,
        input.content_domain,
        input.trend_category,
        input.suggested_content_format,
        input.explanation_style,
        input.teaching_level,
      ),
    )
    .slice(0, 2)
  for (const s of strong) {
    const tier = s.patternStrength ? ` (${s.patternStrength} evidence)` : ''
    hints.push(`${s.subject}${tier}`)
  }
  return hints.slice(0, 5)
}

export function computeLearningAffects(input: {
  format_trace: LearningInfluenceTrace[]
  format_changed: boolean
  cta_emphasis: CtaLearningEmphasis
  teaching_explainability: TeachingExplainabilityEntry[]
  platform_trace: LearningInfluenceTrace[]
  priority_trace: LearningInfluenceTrace[]
  confidence_trace: LearningInfluenceTrace[]
}): LearningAffectsFlags {
  const teaching = input.teaching_explainability.some(
    (e) =>
      e.influencedBy?.startsWith('memory:') ||
      e.influencedBy?.startsWith('learning:'),
  )
  return {
    format: input.format_trace.length > 0 || input.format_changed,
    cta: input.cta_emphasis !== 'none',
    teaching,
    platform: input.platform_trace.length > 0,
    priority: input.priority_trace.length > 0 || input.confidence_trace.length > 0,
  }
}

export function buildLearningVisibilityFields(input: LearningVisibilityInput): {
  learning_confidence_band: LearningConfidenceBand
  learning_adaptation_labels: string[]
  learning_performance_hints: string[]
  learning_affects: LearningAffectsFlags
} {
  const mergedTrace = [
    ...input.platform_trace,
    ...input.format_trace,
    ...input.priority_trace,
    ...input.confidence_trace,
  ]
  const band = computeLearningConfidenceBand(input.snapshot.sampleCount, mergedTrace)
  return {
    learning_confidence_band: band,
    learning_adaptation_labels: buildLearningAdaptationLabels(input),
    learning_performance_hints: buildLearningPerformanceHints(input),
    learning_affects: computeLearningAffects({
      format_trace: input.format_trace,
      format_changed: input.format_before_learning !== input.suggested_content_format,
      cta_emphasis: input.cta_emphasis,
      teaching_explainability: input.teaching_explainability,
      platform_trace: input.platform_trace,
      priority_trace: input.priority_trace,
      confidence_trace: input.confidence_trace,
    }),
  }
}
