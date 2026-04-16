import type { BrandProfile } from '../../types/brand'
import type { ContentDomain } from '../../types/contentDomain'
import type { ContentFormat } from '../../types/contentFormat'
import type { ConversionIntent } from '../../types/conversion'
import type {
  LearningDecisionSnapshot,
  OpportunityLearningImpactComparison,
} from '../../types/opportunityLearningImpact'
import type {
  CtaLearningEmphasis,
  LearningInfluenceTrace,
  PatternStrength,
} from '../../types/performanceLearning'
import type { PriorityLabel } from '../../types/priorityLabel'
import type { TrendCategory } from '../../types/trendCategory'
import { decideAutonomy } from '../autonomy/decideAutonomy'
import { generateConversionCta } from '../conversion/generateConversionCta'
import { firstAdaptationPlatformFromSuggestions } from '../conversion/mapSuggestedPlatform'
import { applyLearningToPriorityScore, resolveCtaLearningEmphasis } from '../learning/applyLearningFeedback'
import { priorityLabelFromScore } from '../../types/priorityLabel'
import type { ScoredSignal } from '../relevance/types'
import type { ResolvedTeachingProfile } from '../teaching/resolveTeachingProfile'

function platformsEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  return a.every((v, i) => v === b[i])
}

function strengthTierLabel(s?: PatternStrength): string {
  if (!s) return 'n/a'
  if (s === 'confirmed') return 'strong'
  return s
}

function strengthNote(t: LearningInfluenceTrace): string {
  const tier = strengthTierLabel(t.patternStrength)
  return `${t.pattern} (${tier} evidence)`
}

function buildChangeSummaries(
  baseline: LearningDecisionSnapshot,
  learned: LearningDecisionSnapshot,
  traces: OpportunityLearningImpactComparison['traces_by_axis'],
): string[] {
  const out: string[] = []
  if (Math.abs(learned.priority_score - baseline.priority_score) > 0.0005) {
    const hint = traces.priority[0] ? ` — ${strengthNote(traces.priority[0])}` : ''
    out.push(
      `Priority ${(baseline.priority_score * 100).toFixed(1)} → ${(learned.priority_score * 100).toFixed(1)}${hint}`,
    )
  }
  if (!platformsEqual(baseline.suggested_platforms, learned.suggested_platforms)) {
    const hint = traces.platform[0] ? ` — ${strengthNote(traces.platform[0])}` : ''
    out.push(`Platform order changed${hint}`)
  }
  if (baseline.suggested_content_format !== learned.suggested_content_format) {
    const hint = traces.format[0] ? ` — ${strengthNote(traces.format[0])}` : ''
    out.push(
      `Format ${baseline.suggested_content_format.replace(/_/g, ' ')} → ${learned.suggested_content_format.replace(/_/g, ' ')}${hint}`,
    )
  }
  if (baseline.cta_emphasis !== learned.cta_emphasis || baseline.suggested_cta !== learned.suggested_cta) {
    const hint = traces.cta[0] ? ` — ${strengthNote(traces.cta[0])}` : ''
    out.push(`CTA emphasis ${baseline.cta_emphasis} → ${learned.cta_emphasis}${hint}`)
  }
  if (
    baseline.explanation_style !== learned.explanation_style ||
    baseline.teaching_level !== learned.teaching_level
  ) {
    const hint = traces.teaching[0] ? ` — ${strengthNote(traces.teaching[0])}` : ''
    out.push(
      `Teaching style ${baseline.explanation_style.replace(/_/g, ' ')} → ${learned.explanation_style.replace(/_/g, ' ')}${hint}`,
    )
  }
  if (
    baseline.confidence_score !== learned.confidence_score ||
    baseline.autonomy_action !== learned.autonomy_action ||
    baseline.risk_level !== learned.risk_level
  ) {
    const hint = traces.confidence[0] ? ` — ${strengthNote(traces.confidence[0])}` : ''
    out.push(
      `Autonomy ${baseline.autonomy_action.replace(/_/g, ' ')} → ${learned.autonomy_action.replace(/_/g, ' ')} · confidence ${(baseline.confidence_score * 100).toFixed(0)}% → ${(learned.confidence_score * 100).toFixed(0)}%${hint}`,
    )
  }
  if (!out.length) {
    out.push('No strategy-learning deltas on this row — baseline matches learned for these axes.')
  }
  return out.slice(0, 8)
}

export function buildOpportunityLearningImpactComparison(input: {
  brand: BrandProfile
  signal: ScoredSignal
  topic: string
  trend_category: TrendCategory
  content_domain: ContentDomain
  matched_keywords: string[]
  basePriority: number
  platformsBaseline: string[]
  formatPicked: ContentFormat
  teachingResolved: ResolvedTeachingProfile
  conversion_intent: ConversionIntent
  learned: {
    suggested_platforms: string[]
    suggested_content_format: ContentFormat
    suggested_cta: string
    teaching: ResolvedTeachingProfile
    priority_score: number
    priority_label: PriorityLabel
    cta_emphasis: CtaLearningEmphasis
    autonomy_action: LearningDecisionSnapshot['autonomy_action']
    confidence_score: number
    risk_level: LearningDecisionSnapshot['risk_level']
  }
  traces: OpportunityLearningImpactComparison['traces_by_axis']
}): OpportunityLearningImpactComparison {
  const { brand, signal, topic, trend_category, content_domain, matched_keywords } = input
  const baselinePrimary = firstAdaptationPlatformFromSuggestions(input.platformsBaseline)
  const baselineCtaEmphasis = resolveCtaLearningEmphasis([], baselinePrimary)
  const baselineCta = generateConversionCta({
    domain: content_domain,
    trend: trend_category,
    intent: input.conversion_intent,
    platform: baselinePrimary,
    brandName: brand.name,
    learningEmphasis: baselineCtaEmphasis,
  })
  const baselinePriority = applyLearningToPriorityScore({
    base: input.basePriority,
    domain: content_domain,
    trend: trend_category,
    format: input.formatPicked,
    platform: baselinePrimary,
    explanationStyle: input.teachingResolved.explanation_style,
    teachingLevel: input.teachingResolved.teaching_level,
    recommendations: [],
  }).score

  const autonomyBase = decideAutonomy({
    brand,
    signal,
    opportunity: {
      priority_score: baselinePriority,
      trend_category,
      content_domain,
      topic,
      matched_keywords,
    },
    learning: undefined,
  })

  const baseline: LearningDecisionSnapshot = {
    priority_score: baselinePriority,
    priority_label: priorityLabelFromScore(baselinePriority),
    suggested_content_format: input.formatPicked,
    suggested_platforms: [...input.platformsBaseline],
    cta_emphasis: baselineCtaEmphasis,
    suggested_cta: baselineCta,
    explanation_style: input.teachingResolved.explanation_style,
    teaching_level: input.teachingResolved.teaching_level,
    autonomy_action: autonomyBase.autonomy_action,
    confidence_score: autonomyBase.confidence_score,
    risk_level: autonomyBase.risk_level,
  }

  const learned: LearningDecisionSnapshot = {
    priority_score: input.learned.priority_score,
    priority_label: input.learned.priority_label,
    suggested_content_format: input.learned.suggested_content_format,
    suggested_platforms: [...input.learned.suggested_platforms],
    cta_emphasis: input.learned.cta_emphasis,
    suggested_cta: input.learned.suggested_cta,
    explanation_style: input.learned.teaching.explanation_style,
    teaching_level: input.learned.teaching.teaching_level,
    autonomy_action: input.learned.autonomy_action,
    confidence_score: input.learned.confidence_score,
    risk_level: input.learned.risk_level,
  }

  return {
    baseline,
    learned,
    change_summaries: buildChangeSummaries(baseline, learned, input.traces),
    traces_by_axis: input.traces,
  }
}
