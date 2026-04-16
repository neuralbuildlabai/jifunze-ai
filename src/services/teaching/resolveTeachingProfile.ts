import type { SupabaseClient } from '@supabase/supabase-js'
import type { ContentDomain } from '../../types/contentDomain'
import type { UrgencyLevel } from '../../types/opportunity'
import type { TrendCategory } from '../../types/trendCategory'
import type {
  ClarityPreference,
  EducationalFraming,
  ExplanationStyle,
  TeachingExplainabilityEntry,
  TeachingLevel,
} from '../../types/teaching'
import {
  analyzeTeachingPerformance,
  inferBaseExplanationStyle,
  inferBaseTeachingLevel,
  type TeachingPerformanceAnalysis,
} from './analyzeTeachingPerformance'

/** Fewer tagged rows needed before memory can steer style/level (rapid teaching feedback). */
const MIN_STYLE_SWITCH = 2

function baseEducationalFraming(style: ExplanationStyle, trend: TrendCategory): EducationalFraming {
  if ((trend === 'breaking_news' || trend === 'industry_update') && style === 'quick_tip') {
    return 'news_with_context'
  }
  switch (style) {
    case 'step_by_step':
    case 'breakdown':
      return 'how_it_works'
    case 'quick_tip':
    case 'analogy':
      return 'why_it_matters'
    case 'comparison':
    case 'use_case':
      return 'decision_guide'
    default:
      return 'why_it_matters'
  }
}

/** Exported for positive learning nudges that change explanation style after baseline resolution. */
export function educationalFramingForStyleAndTrend(
  style: ExplanationStyle,
  trend: TrendCategory,
): EducationalFraming {
  return baseEducationalFraming(style, trend)
}

function resolveClarityPreference(input: {
  level: TeachingLevel
  domain: ContentDomain
  simplifyComplex: boolean
  jargonHeavyWeak: boolean
  deepenOk: boolean
}): ClarityPreference {
  if (input.simplifyComplex || input.jargonHeavyWeak) return 'plain'
  if (input.level === 'beginner') return 'plain'
  if (input.level === 'advanced' && input.deepenOk && input.domain === 'ai') return 'concise_technical'
  return 'balanced'
}

function pickWinningStyle(
  analysis: TeachingPerformanceAnalysis,
  fallback: ExplanationStyle,
): ExplanationStyle {
  const top = analysis.byStyle[0]
  if (!top || top.count < MIN_STYLE_SWITCH) return fallback
  if (analysis.globalTeachingScore != null && top.weightedScore < analysis.globalTeachingScore * 1.02) {
    return fallback
  }
  return top.style
}

function pickWinningLevel(
  analysis: TeachingPerformanceAnalysis,
  fallback: TeachingLevel,
): TeachingLevel {
  const top = analysis.byLevel[0]
  if (!top || top.count < MIN_STYLE_SWITCH) return fallback
  if (analysis.deepenOk && top.level === 'advanced') return 'advanced'
  if (analysis.globalTeachingScore != null && top.weightedScore > analysis.globalTeachingScore * 1.05) {
    return top.level
  }
  return fallback
}

export type ResolvedTeachingProfile = {
  teaching_level: TeachingLevel
  explanation_style: ExplanationStyle
  clarity_preference: ClarityPreference
  educational_framing: EducationalFraming
  teaching_explainability: TeachingExplainabilityEntry[]
}

/**
 * Editorial defaults → performance-tagged memory nudges (rule-based).
 */
export async function resolveTeachingProfile(input: {
  brandProfileId: string
  domain: ContentDomain
  trend: TrendCategory
  urgency: UrgencyLevel
  tenantId: string
  supabase?: SupabaseClient
}): Promise<ResolvedTeachingProfile> {
  const analysis = await analyzeTeachingPerformance(
    input.brandProfileId,
    input.tenantId,
    input.supabase,
  )
  const baseLevel = inferBaseTeachingLevel(input.domain, input.trend, input.urgency)
  const baseStyle = inferBaseExplanationStyle(input.domain, input.trend)

  const explain: TeachingExplainabilityEntry[] = [
    {
      what: `Baseline teaching plan: ${baseLevel} / ${baseStyle.replace(/_/g, ' ')}`,
      why: 'Editorial defaults from domain + trend (anchor for cold start).',
      influencedBy: 'domain_policy',
    },
  ]

  const finish = (
    level: TeachingLevel,
    style: ExplanationStyle,
    extra: TeachingExplainabilityEntry[],
  ): ResolvedTeachingProfile => {
    const clarity = resolveClarityPreference({
      level,
      domain: input.domain,
      simplifyComplex: analysis.simplifyComplex,
      jargonHeavyWeak: analysis.jargonHeavyWeak,
      deepenOk: analysis.deepenOk,
    })
    let framing = baseEducationalFraming(style, input.trend)
    if (analysis.breakdownSavesSharesStrong && style === 'breakdown') {
      framing = 'how_it_works'
    }
    if (input.domain === 'ai' && style === 'use_case' && framing === 'decision_guide') {
      framing = 'how_it_works'
    }
    return {
      teaching_level: level,
      explanation_style: style,
      clarity_preference: clarity,
      educational_framing: framing,
      teaching_explainability: [...explain, ...extra].slice(0, 10),
    }
  }

  if (analysis.sampleCount < 3) {
    explain.push({
      what: 'Teaching adaptation on hold',
      why: `Only ${analysis.sampleCount} tagged teaching rows in memory — add a few more publishes to steer style/level.`,
      influencedBy: 'sample_floor',
    })
    if (input.domain === 'ai') {
      explain.push({
        what: 'AI clarity preset active',
        why: 'AI vertical defaults to educational tone with optional “how to start” even without memory.',
        influencedBy: 'ai_domain_policy',
      })
    }
    return finish(baseLevel, baseStyle, [])
  }

  let level = pickWinningLevel(analysis, baseLevel)
  let style = pickWinningStyle(analysis, baseStyle)
  const extraAfter: TeachingExplainabilityEntry[] = []

  if (analysis.simplifyComplex) {
    extraAfter.push({
      what: 'Forced beginner pacing + step-by-step',
      why: 'Complex explainers (advanced/breakdown) trailed simpler pacing in teaching effectiveness composite.',
      influencedBy: 'memory:simplify_complex',
    })
    level = 'beginner'
    style = 'step_by_step'
  } else if (analysis.deepenOk && input.domain === 'ai') {
    extraAfter.push({
      what: 'Deepen explanations slightly',
      why: 'Audience depth signals (comments + completion proxies) reward richer AI walk-throughs.',
      influencedBy: 'memory:deepen_ok',
    })
    if (level === 'beginner') level = 'intermediate'
    if (style === 'quick_tip') style = 'use_case'
  }

  if (!analysis.simplifyComplex && analysis.breakdownSavesSharesStrong) {
    if (!(analysis.beginnerStepByStepStrong && level === 'beginner')) {
      extraAfter.push({
        what: 'Prefer structured breakdowns',
        why: 'Saves and shares on memory-tagged posts are strongest for “breakdown” pacing — audience keeps and shares this framing.',
        influencedBy: 'memory:saves_shares:breakdown',
      })
      style = 'breakdown'
    }
  }

  if (!analysis.simplifyComplex && analysis.jargonHeavyWeak) {
    const dense =
      style === 'comparison' ||
      style === 'analogy' ||
      (style === 'breakdown' && level === 'advanced')
    if (dense) {
      extraAfter.push({
        what: 'Simplify dense explainer style',
        why: 'Comparison/analogy-heavy (and advanced breakdown) rows underperformed plainer pacing in memory — fewer saves and weaker composite teaching score.',
        influencedBy: 'memory:jargon_weak',
      })
      style = 'step_by_step'
    }
  }

  if (!analysis.simplifyComplex && analysis.beginnerStepByStepStrong && level === 'beginner') {
    extraAfter.push({
      what: 'Lock step-by-step for beginners',
      why: 'Beginner-tagged posts with numbered steps beat other structures on teaching effectiveness in memory.',
      influencedBy: 'memory:beginner_step_by_step',
    })
    style = 'step_by_step'
  }

  if (
    !analysis.simplifyComplex &&
    style !== baseStyle &&
    analysis.byStyle[0]?.style === style &&
    analysis.byStyle[0]?.count >= MIN_STYLE_SWITCH
  ) {
    extraAfter.push({
      what: `Explanation style → ${style.replace(/_/g, ' ')}`,
      why: 'Weighted teaching effectiveness (ER + depth + completion proxies) favored this structure.',
      influencedBy: `memory:style:${style}`,
    })
  }

  if (!analysis.simplifyComplex && level !== baseLevel && analysis.byLevel[0]?.count >= MIN_STYLE_SWITCH) {
    extraAfter.push({
      what: `Teaching level → ${level}`,
      why: 'Historical engagement band for this depth outperformed the editorial default.',
      influencedBy: `memory:level:${level}`,
    })
  }

  if (input.domain === 'ai') {
    extraAfter.push({
      what: 'AI vertical clarity mode',
      why: 'Clarity over hype; progressive teaching (basic → deeper); optional “how to start”.',
      influencedBy: 'ai_domain_policy',
    })
  }

  const clarity = resolveClarityPreference({
    level,
    domain: input.domain,
    simplifyComplex: analysis.simplifyComplex,
    jargonHeavyWeak: analysis.jargonHeavyWeak,
    deepenOk: analysis.deepenOk,
  })
  let framing = baseEducationalFraming(style, input.trend)
  if (analysis.breakdownSavesSharesStrong && style === 'breakdown') {
    framing = 'how_it_works'
  }
  if (input.domain === 'ai' && style === 'use_case' && framing === 'decision_guide') {
    framing = 'how_it_works'
  }

  return {
    teaching_level: level,
    explanation_style: style,
    clarity_preference: clarity,
    educational_framing: framing,
    teaching_explainability: [...explain, ...extraAfter].slice(0, 10),
  }
}
