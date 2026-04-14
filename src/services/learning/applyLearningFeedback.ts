import { DEFAULT_OPTIMIZATION_LEARNING_WEIGHTS } from '../../config/optimizationLearning'
import { getTrendCategoryBehavior } from '../../config/trendCategoryBehavior'
import type { BrandProfile } from '../../types/brand'
import type { ContentDomain } from '../../types/contentDomain'
import type { ContentFormat } from '../../types/contentFormat'
import type { TrendCategory } from '../../types/trendCategory'
import type {
  CtaLearningEmphasis,
  StrategyAdjustmentRecommendation,
} from '../../types/performanceLearning'

const cfg = () => DEFAULT_OPTIMIZATION_LEARNING_WEIGHTS

export function applyLearningToPriorityScore(input: {
  base: number
  domain: ContentDomain
  trend: TrendCategory
  format: ContentFormat
  recommendations: StrategyAdjustmentRecommendation[]
}): { score: number; notes: string[] } {
  let score = Math.min(1, Math.max(0, input.base))
  const notes: string[] = []

  for (const r of input.recommendations) {
    if (r.kind === 'boost_domain_platform') {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      const matchDom = !d || d === input.domain
      const matchTrend = !tr || tr === input.trend
      if (matchDom && matchTrend) {
        score += cfg().priorityHistoryBoostMax * r.weight
        notes.push(r.title)
      }
    }
    if (r.kind === 'penalize_format' && r.payload?.contentFormat === input.format) {
      score -= cfg().priorityWeakPenaltyMax * r.weight
      notes.push(`Deprioritize format: ${r.title}`)
    }
    if (r.kind === 'penalize_weak_combo') {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      if (d === input.domain && tr === input.trend) {
        score -= cfg().priorityWeakPenaltyMax * 0.85 * r.weight
        notes.push(`Weak pairing: ${r.title}`)
      }
    }
    if (r.kind === 'tighten_autonomy') {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      if ((d && d === input.domain) || (tr && tr === input.trend)) {
        score -= cfg().priorityWeakPenaltyMax * 0.22 * r.weight
      }
    }
  }

  return { score: Math.min(1, Math.max(0, score)), notes: [...new Set(notes)].slice(0, 4) }
}

export function learningConfidenceAdjustment(input: {
  domain: ContentDomain
  trend: TrendCategory
  recommendations: StrategyAdjustmentRecommendation[]
}): { delta: number; reasons: string[] } {
  let delta = 0
  const reasons: string[] = []

  for (const r of input.recommendations) {
    if (r.kind === 'relax_autonomy') {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      if ((d && d === input.domain) || (tr && tr === input.trend)) {
        delta += cfg().confidenceRelaxMax * r.weight
        reasons.push(r.title)
      }
    }
    if (r.kind === 'tighten_autonomy') {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      if ((d && d === input.domain) || (tr && tr === input.trend)) {
        delta -= cfg().confidenceTightenMax * r.weight
        reasons.push(r.title)
      }
    }
  }

  return { delta: Math.max(-0.12, Math.min(0.12, delta)), reasons: [...new Set(reasons)].slice(0, 2) }
}

export function adjustFormatWithLearning(
  brand: BrandProfile,
  current: ContentFormat,
  trend: TrendCategory,
  recommendations: StrategyAdjustmentRecommendation[],
): ContentFormat {
  const penalized = new Set(
    recommendations
      .filter((r) => r.kind === 'penalize_format')
      .map((r) => r.payload?.contentFormat)
      .filter(Boolean) as ContentFormat[],
  )
  if (!penalized.has(current)) return current

  const prefs = brand.preferred_content_formats
  const trendPrefs = getTrendCategoryBehavior(trend).preferredFormats
  const ordered = [...trendPrefs.filter((f) => prefs.includes(f)), ...prefs]
  for (const f of ordered) {
    if (f !== current && !penalized.has(f)) return f
  }
  return current
}

export function resolveCtaLearningEmphasis(
  recommendations: StrategyAdjustmentRecommendation[],
): CtaLearningEmphasis {
  const prefers = recommendations.filter((r) => r.kind === 'prefer_cta_style')
  if (!prefers.length) return 'none'
  prefers.sort((a, b) => b.weight - a.weight)
  const style = prefers[0].payload?.ctaStyle
  if (style === 'dm') return 'dm'
  if (style === 'link_in_bio') return 'link_in_bio'
  if (style === 'save_share') return 'save_share'
  if (style === 'follow') return 'follow'
  return 'none'
}
