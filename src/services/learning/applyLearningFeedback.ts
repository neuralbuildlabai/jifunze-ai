import { DEFAULT_OPTIMIZATION_LEARNING_WEIGHTS } from '../../config/optimizationLearning'
import { getTrendCategoryBehavior } from '../../config/trendCategoryBehavior'
import type { BrandProfile } from '../../types/brand'
import type { ContentDomain } from '../../types/contentDomain'
import type { ContentFormat } from '../../types/contentFormat'
import type { TrendCategory } from '../../types/trendCategory'
import type {
  CtaLearningEmphasis,
  LearningInfluenceTrace,
  PatternStrength,
  PerformancePlatformId,
  StrategyAdjustmentRecommendation,
} from '../../types/performanceLearning'
import type { TeachingLevel, TeachingExplainabilityEntry } from '../../types/teaching'
import type { ResolvedTeachingProfile } from '../teaching/resolveTeachingProfile'
import { educationalFramingForStyleAndTrend } from '../teaching/resolveTeachingProfile'

const cfg = () => DEFAULT_OPTIMIZATION_LEARNING_WEIGHTS

function strengthMultiplier(s?: PatternStrength): number {
  const c = cfg()
  if (!s) return 1
  if (s === 'weak') return c.weakPatternWeightScale
  if (s === 'emerging') return c.emergingPatternWeightScale
  return 1
}

function strengthRank(s: PatternStrength): number {
  const m: Record<PatternStrength, number> = { weak: 0, emerging: 1, confirmed: 2 }
  return m[s]
}

/** Gate positive steering so weak evidence rarely flips defaults unless weight is high (reduces overfitting). */
export function allowsPositivePreference(patternStrength?: PatternStrength, weight = 0.72): boolean {
  const min = cfg().positiveTeachingMinStrength as PatternStrength
  const minRank = strengthRank(min)
  if (patternStrength && strengthRank(patternStrength) >= minRank) return true
  if (!patternStrength && weight >= 0.58) return true
  if (patternStrength === 'weak' && weight >= 0.64) return true
  return false
}

/**
 * When memory shows a winning format, bias the heuristic pick toward it (still bounded by brand/trend prefs).
 */
export function applyPositiveFormatPreference(
  brand: BrandProfile,
  heuristic: ContentFormat,
  trend: TrendCategory,
  platform: PerformancePlatformId | undefined,
  domain: ContentDomain,
  recommendations: StrategyAdjustmentRecommendation[],
): { format: ContentFormat; trace: LearningInfluenceTrace[] } {
  const candidates = recommendations.filter(
    (r) =>
      r.kind === 'prefer_format' &&
      r.payload?.contentFormat &&
      allowsPositivePreference(r.sourcePatternStrength, r.weight) &&
      (!r.payload.domain || r.payload.domain === domain) &&
      (!r.payload.trendCategory || r.payload.trendCategory === trend) &&
      (!r.payload.platform || !platform || r.payload.platform === platform),
  )
  if (!candidates.length) return { format: heuristic, trace: [] }
  candidates.sort((a, b) => b.weight - a.weight)
  const top = candidates[0]!
  const want = top.payload!.contentFormat!
  const prefs = brand.preferred_content_formats
  const trendPrefs = getTrendCategoryBehavior(trend).preferredFormats
  const allowed = new Set([...trendPrefs.filter((f) => prefs.includes(f)), ...prefs])
  if (!allowed.has(want)) return { format: heuristic, trace: [] }
  if (want === heuristic) {
    return {
      format: heuristic,
      trace: [
        {
          pattern: `Format aligned with winning pattern (${want.replace(/_/g, ' ')})`,
          direction: 'boost',
          delta: top.weight * cfg().positiveSteeringBoostScale,
          why: top.rationale,
          patternStrength: top.sourcePatternStrength,
        },
      ],
    }
  }
  return {
    format: want,
    trace: [
      {
        pattern: `Prefer format: ${want.replace(/_/g, ' ')}`,
        direction: 'boost',
        delta: top.weight,
        why: top.rationale,
        patternStrength: top.sourcePatternStrength,
      },
    ],
  }
}

/** Nudge explanation style toward a strong teaching+platform pattern after baseline profile resolution. */
export function nudgeTeachingWithPositiveLearning(
  profile: ResolvedTeachingProfile,
  recommendations: StrategyAdjustmentRecommendation[],
  ctx: {
    domain: ContentDomain
    trend: TrendCategory
    platform?: PerformancePlatformId
  },
): { profile: ResolvedTeachingProfile; traces: LearningInfluenceTrace[] } {
  const matches = recommendations.filter(
    (r) =>
      r.kind === 'prefer_teaching_style' &&
      r.payload?.explanationStyle &&
      (!r.payload.platform || !ctx.platform || r.payload.platform === ctx.platform) &&
      (!r.payload.domain || r.payload.domain === ctx.domain) &&
      (!r.payload.trendCategory || r.payload.trendCategory === ctx.trend),
  )
  if (!matches.length) return { profile, traces: [] }
  matches.sort((a, b) => b.weight - a.weight)
  const top = matches[0]!
  if (!allowsPositivePreference(top.sourcePatternStrength, top.weight)) return { profile, traces: [] }
  const want = top.payload!.explanationStyle!
  if (want === profile.explanation_style) return { profile, traces: [] }

  let framing = educationalFramingForStyleAndTrend(want, ctx.trend)
  if (ctx.domain === 'ai' && want === 'use_case' && framing === 'decision_guide') {
    framing = 'how_it_works'
  }
  const extra: TeachingExplainabilityEntry[] = [
    {
      what: `Explanation style → ${want.replace(/_/g, ' ')}`,
      why: top.rationale,
      influencedBy: 'learning:prefer_teaching_style',
    },
  ]
  const traces: LearningInfluenceTrace[] = [
    {
      pattern: `prefer_teaching_style: ${want.replace(/_/g, ' ')}`,
      direction: 'boost',
      delta: top.weight,
      why: top.rationale,
      patternStrength: top.sourcePatternStrength,
    },
  ]
  return {
    profile: {
      ...profile,
      explanation_style: want,
      educational_framing: framing,
      teaching_explainability: [...profile.teaching_explainability, ...extra].slice(0, 10),
    },
    traces,
  }
}

/** Extra lift when payload matches prioritized combos (format + platform, teaching + platform). */
function rapidComboMultiplier(
  r: StrategyAdjustmentRecommendation,
  input: {
    format: ContentFormat
    platform?: PerformancePlatformId
    explanationStyle?: string
  },
): number {
  const c = cfg()
  const p = r.payload?.platform
  if (!p || !input.platform || p !== input.platform) return 1
  let m = 1
  if (r.payload?.contentFormat && r.payload.contentFormat === input.format) {
    m *= c.comboFormatPlatformBoost
  }
  if (
    r.payload?.explanationStyle &&
    input.explanationStyle &&
    r.payload.explanationStyle === input.explanationStyle
  ) {
    m *= c.comboTeachingPlatformBoost
  }
  return Math.min(1.55, m)
}

export function applyLearningToPriorityScore(input: {
  base: number
  domain: ContentDomain
  trend: TrendCategory
  format: ContentFormat
  platform?: PerformancePlatformId
  explanationStyle?: string
  teachingLevel?: TeachingLevel
  recommendations: StrategyAdjustmentRecommendation[]
}): { score: number; notes: string[]; trace: LearningInfluenceTrace[] } {
  let score = Math.min(1, Math.max(0, input.base))
  const notes: string[] = []
  const trace: LearningInfluenceTrace[] = []

  const matchPlatform = (r: StrategyAdjustmentRecommendation): boolean =>
    !r.payload?.platform || !input.platform || r.payload.platform === input.platform

  const matchTeachingLevel = (r: StrategyAdjustmentRecommendation): boolean =>
    !r.payload?.teachingLevel ||
    !input.teachingLevel ||
    r.payload.teachingLevel === input.teachingLevel

  for (const r of input.recommendations) {
    if (r.kind === 'boost_domain_platform') {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      const matchDom = !d || d === input.domain
      const matchTrend = !tr || tr === input.trend
      if (matchDom && matchTrend && matchPlatform(r) && matchTeachingLevel(r)) {
        const mult = strengthMultiplier(r.sourcePatternStrength)
        const combo = rapidComboMultiplier(r, {
          format: input.format,
          platform: input.platform,
          explanationStyle: input.explanationStyle,
        })
        const delta = cfg().priorityHistoryBoostMax * r.weight * mult * combo
        score += delta
        notes.push(r.title)
        trace.push({
          pattern: r.title,
          direction: 'boost',
          delta,
          why: `${r.rationale}${combo > 1 ? ' (combo: format/teaching + platform match — rapid learning).' : ''}`,
          patternStrength: r.sourcePatternStrength,
        })
      }
    }
    if (r.kind === 'prefer_format' && r.payload?.contentFormat === input.format) {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      const matchDom = !d || d === input.domain
      const matchTrend = !tr || tr === input.trend
      if (
        matchDom &&
        matchTrend &&
        matchPlatform(r) &&
        allowsPositivePreference(r.sourcePatternStrength, r.weight)
      ) {
        const mult = strengthMultiplier(r.sourcePatternStrength)
        const delta = cfg().priorityHistoryBoostMax * cfg().positiveSteeringBoostScale * r.weight * mult
        score += delta
        notes.push(r.title)
        trace.push({
          pattern: r.title,
          direction: 'boost',
          delta,
          why: r.rationale,
          patternStrength: r.sourcePatternStrength,
        })
      }
    }
    if (r.kind === 'prefer_platform' && input.platform && r.payload?.platform === input.platform) {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      const matchDom = !d || d === input.domain
      const matchTrend = !tr || tr === input.trend
      if (matchDom && matchTrend && allowsPositivePreference(r.sourcePatternStrength, r.weight)) {
        const mult = strengthMultiplier(r.sourcePatternStrength)
        const delta =
          cfg().priorityHistoryBoostMax * cfg().positiveSteeringBoostScale * 0.95 * r.weight * mult
        score += delta
        notes.push(r.title)
        trace.push({
          pattern: r.title,
          direction: 'boost',
          delta,
          why: r.rationale,
          patternStrength: r.sourcePatternStrength,
        })
      }
    }
    if (
      r.kind === 'prefer_teaching_style' &&
      input.explanationStyle &&
      r.payload?.explanationStyle === input.explanationStyle &&
      matchPlatform(r)
    ) {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      const matchDom = !d || d === input.domain
      const matchTrend = !tr || tr === input.trend
      if (
        matchDom &&
        matchTrend &&
        matchTeachingLevel(r) &&
        allowsPositivePreference(r.sourcePatternStrength, r.weight)
      ) {
        const mult = strengthMultiplier(r.sourcePatternStrength)
        const delta =
          cfg().priorityHistoryBoostMax * cfg().positiveSteeringBoostScale * 0.88 * r.weight * mult
        score += delta
        notes.push(r.title)
        trace.push({
          pattern: r.title,
          direction: 'boost',
          delta,
          why: r.rationale,
          patternStrength: r.sourcePatternStrength,
        })
      }
    }
    if (
      r.kind === 'prefer_cta_style' &&
      matchPlatform(r) &&
      (r.title.toLowerCase().includes('winning') || r.title.toLowerCase().includes('reuse'))
    ) {
      const mult = strengthMultiplier(r.sourcePatternStrength)
      const delta = cfg().priorityHistoryBoostMax * 0.26 * r.weight * mult * cfg().comboCtaPlatformBoost
      score += delta
      notes.push(`CTA+platform: ${r.title}`)
      trace.push({
        pattern: r.title,
        direction: 'boost',
        delta,
        why: `${r.rationale} Early signal: winning CTA cluster on this surface nudges priority.`,
        patternStrength: r.sourcePatternStrength,
      })
    }
    if (
      r.kind === 'penalize_format' &&
      r.payload?.contentFormat === input.format &&
      matchPlatform(r)
    ) {
      const mult = strengthMultiplier(r.sourcePatternStrength)
      const delta = cfg().priorityWeakPenaltyMax * r.weight * mult
      score -= delta
      notes.push(`Deprioritize format: ${r.title}`)
      trace.push({
        pattern: r.title,
        direction: 'penalty',
        delta,
        why: r.rationale,
        patternStrength: r.sourcePatternStrength,
      })
    }
    if (r.kind === 'penalize_weak_combo') {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      if (d === input.domain && tr === input.trend && matchPlatform(r)) {
        const mult = strengthMultiplier(r.sourcePatternStrength)
        const delta = cfg().priorityWeakPenaltyMax * 0.85 * r.weight * mult
        score -= delta
        notes.push(`Weak pairing: ${r.title}`)
        trace.push({
          pattern: r.title,
          direction: 'penalty',
          delta,
          why: r.rationale,
          patternStrength: r.sourcePatternStrength,
        })
      }
    }
    if (r.kind === 'tighten_autonomy') {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      if (((d && d === input.domain) || (tr && tr === input.trend)) && matchPlatform(r) && matchTeachingLevel(r)) {
        const mult = strengthMultiplier(r.sourcePatternStrength)
        const delta = cfg().priorityWeakPenaltyMax * 0.22 * r.weight * mult
        score -= delta
        trace.push({
          pattern: r.title,
          direction: 'penalty',
          delta,
          why: r.rationale,
          patternStrength: r.sourcePatternStrength,
        })
      }
    }
    if (
      input.explanationStyle &&
      r.payload?.explanationStyle &&
      r.payload.explanationStyle === input.explanationStyle &&
      matchPlatform(r)
    ) {
      if (r.kind === 'boost_domain_platform') {
        const mult = strengthMultiplier(r.sourcePatternStrength)
        const combo = rapidComboMultiplier(r, {
          format: input.format,
          platform: input.platform,
          explanationStyle: input.explanationStyle,
        })
        const delta = cfg().priorityHistoryBoostMax * 0.45 * r.weight * mult * combo
        score += delta
        notes.push(`Teaching style lift: ${r.title}`)
        trace.push({
          pattern: `Teaching style ${input.explanationStyle} on ${input.platform ?? 'any'}`,
          direction: 'boost',
          delta,
          why: `${r.rationale}${combo > 1 ? ' (teaching + platform combo).' : ''}`,
          patternStrength: r.sourcePatternStrength,
        })
      } else if (r.kind === 'tighten_autonomy') {
        const mult = strengthMultiplier(r.sourcePatternStrength)
        const delta = cfg().priorityWeakPenaltyMax * 0.3 * r.weight * mult
        score -= delta
        notes.push(`Teaching style caution: ${r.title}`)
        trace.push({
          pattern: `Teaching style ${input.explanationStyle} on ${input.platform ?? 'any'}`,
          direction: 'penalty',
          delta,
          why: r.rationale,
          patternStrength: r.sourcePatternStrength,
        })
      }
    }
  }

  return {
    score: Math.min(1, Math.max(0, score)),
    notes: [...new Set(notes)].slice(0, 5),
    trace: trace.slice(0, 10),
  }
}

export function learningConfidenceAdjustment(input: {
  domain: ContentDomain
  trend: TrendCategory
  platform?: PerformancePlatformId
  teachingLevel?: TeachingLevel
  recommendations: StrategyAdjustmentRecommendation[]
}): { delta: number; reasons: string[]; trace: LearningInfluenceTrace[] } {
  let delta = 0
  const reasons: string[] = []
  const trace: LearningInfluenceTrace[] = []
  const matchPlatform = (r: StrategyAdjustmentRecommendation): boolean =>
    !r.payload?.platform || !input.platform || r.payload.platform === input.platform

  for (const r of input.recommendations) {
    if (r.kind === 'relax_autonomy') {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      const tl = r.payload?.teachingLevel
      const matchTl = !tl || !input.teachingLevel || tl === input.teachingLevel
      if (((d && d === input.domain) || (tr && tr === input.trend)) && matchPlatform(r) && matchTl) {
        const mult = strengthMultiplier(r.sourcePatternStrength)
        const bump = cfg().confidenceRelaxMax * r.weight * mult
        delta += bump
        reasons.push(r.title)
        trace.push({
          pattern: r.title,
          direction: 'boost',
          delta: bump,
          why: r.rationale,
          patternStrength: r.sourcePatternStrength,
        })
      }
    }
    if (r.kind === 'tighten_autonomy') {
      const d = r.payload?.domain
      const tr = r.payload?.trendCategory
      const tl = r.payload?.teachingLevel
      const matchTl = !tl || !input.teachingLevel || tl === input.teachingLevel
      if (((d && d === input.domain) || (tr && tr === input.trend)) && matchPlatform(r) && matchTl) {
        const mult = strengthMultiplier(r.sourcePatternStrength)
        const cut = cfg().confidenceTightenMax * r.weight * mult
        delta -= cut
        reasons.push(r.title)
        trace.push({
          pattern: r.title,
          direction: 'penalty',
          delta: cut,
          why: r.rationale,
          patternStrength: r.sourcePatternStrength,
        })
      }
    }
  }

  return {
    delta: Math.max(-0.12, Math.min(0.12, delta)),
    reasons: [...new Set(reasons)].slice(0, 3),
    trace: trace.slice(0, 5),
  }
}

export function adjustFormatWithLearning(
  brand: BrandProfile,
  current: ContentFormat,
  trend: TrendCategory,
  platform: PerformancePlatformId | undefined,
  recommendations: StrategyAdjustmentRecommendation[],
): { format: ContentFormat; trace: LearningInfluenceTrace[] } {
  const penalized = new Set(
    recommendations
      .filter(
        (r) =>
          r.kind === 'penalize_format' &&
          (!r.payload?.platform || !platform || r.payload.platform === platform),
      )
      .map((r) => r.payload?.contentFormat)
      .filter(Boolean) as ContentFormat[],
  )
  if (!penalized.has(current)) return { format: current, trace: [] }

  const penalizeRec = recommendations.find(
    (r) =>
      r.kind === 'penalize_format' &&
      r.payload?.contentFormat === current &&
      (!r.payload?.platform || !platform || r.payload.platform === platform),
  )

  const prefs = brand.preferred_content_formats
  const trendPrefs = getTrendCategoryBehavior(trend).preferredFormats
  const ordered = [...trendPrefs.filter((f) => prefs.includes(f)), ...prefs]
  for (const f of ordered) {
    if (f !== current && !penalized.has(f)) {
      return {
        format: f,
        trace: [
          {
            pattern: `Format ${current} underperformed${platform ? ` on ${platform}` : ''}`,
            direction: 'penalty',
            delta: 0.01,
            why: penalizeRec?.rationale ?? 'Learning recommendation penalized this format; switched to nearest preferred alternative.',
            patternStrength: penalizeRec?.sourcePatternStrength,
          },
        ],
      }
    }
  }
  return { format: current, trace: [] }
}

/** Recommendation that won {@link resolveCtaLearningEmphasis} for this surface (for traces / UI). */
export function drivingCtaStyleRecommendation(
  recommendations: StrategyAdjustmentRecommendation[],
  platform?: PerformancePlatformId,
): StrategyAdjustmentRecommendation | undefined {
  const prefers = recommendations.filter(
    (r) =>
      r.kind === 'prefer_cta_style' &&
      (!r.payload?.platform || !platform || r.payload.platform === platform),
  )
  if (!prefers.length) return undefined
  const t = (s: string) => s.toLowerCase()
  const winning = prefers.filter(
    (r) => t(r.title).includes('winning') || t(r.title).includes('reuse'),
  )
  const pool = winning.length ? winning : prefers
  pool.sort((a, b) => b.weight - a.weight)
  return pool[0]
}

export function resolveCtaLearningEmphasis(
  recommendations: StrategyAdjustmentRecommendation[],
  platform?: PerformancePlatformId,
): CtaLearningEmphasis {
  const top = drivingCtaStyleRecommendation(recommendations, platform)
  if (!top) return 'none'
  const style = top.payload?.ctaStyle
  if (style === 'dm') return 'dm'
  if (style === 'link_in_bio') return 'link_in_bio'
  if (style === 'save_share') return 'save_share'
  if (style === 'follow') return 'follow'
  return 'none'
}

export function learningNotesForPlatform(input: {
  platform: PerformancePlatformId
  domain: ContentDomain
  trend: TrendCategory
  format: ContentFormat
  recommendations: StrategyAdjustmentRecommendation[]
}): { notes: string[]; trace: LearningInfluenceTrace[] } {
  const notes: string[] = []
  const trace: LearningInfluenceTrace[] = []
  for (const r of input.recommendations) {
    if (r.payload?.platform && r.payload.platform !== input.platform) continue
    const matchesDomain = !r.payload?.domain || r.payload.domain === input.domain
    const matchesTrend = !r.payload?.trendCategory || r.payload.trendCategory === input.trend
    const matchesFormat = !r.payload?.contentFormat || r.payload.contentFormat === input.format
    if (!matchesDomain || !matchesTrend || !matchesFormat) continue
    if (
      r.kind === 'boost_domain_platform' ||
      r.kind === 'relax_autonomy' ||
      r.kind === 'prefer_format' ||
      r.kind === 'prefer_platform' ||
      r.kind === 'prefer_teaching_style'
    ) {
      notes.push(`Boosted by learning: ${r.title}`)
      trace.push({
        pattern: r.title,
        direction: 'boost',
        delta: r.weight,
        why: r.rationale,
        patternStrength: r.sourcePatternStrength,
      })
    } else if (r.kind === 'penalize_format' || r.kind === 'penalize_weak_combo' || r.kind === 'tighten_autonomy') {
      notes.push(`Caution from learning: ${r.title}`)
      trace.push({
        pattern: r.title,
        direction: 'penalty',
        delta: r.weight,
        why: r.rationale,
        patternStrength: r.sourcePatternStrength,
      })
    }
  }
  return { notes: [...new Set(notes)].slice(0, 3), trace: trace.slice(0, 4) }
}
