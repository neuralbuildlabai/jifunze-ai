import type { ContentDomain } from '../../types/contentDomain'
import type { UrgencyLevel } from '../../types/opportunity'
import type { TrendCategory } from '../../types/trendCategory'
import type { ExplanationStyle, TeachingExplainabilityEntry, TeachingLevel } from '../../types/teaching'
import {
  analyzeTeachingPerformance,
  inferBaseExplanationStyle,
  inferBaseTeachingLevel,
} from './analyzeTeachingPerformance'

const MIN_STYLE_SWITCH = 4

function pickWinningStyle(
  analysis: ReturnType<typeof analyzeTeachingPerformance>,
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
  analysis: ReturnType<typeof analyzeTeachingPerformance>,
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
  teaching_explainability: TeachingExplainabilityEntry[]
}

/**
 * Editorial defaults → performance-tagged memory nudges (rule-based).
 */
export function resolveTeachingProfile(input: {
  brandProfileId: string
  domain: ContentDomain
  trend: TrendCategory
  urgency: UrgencyLevel
}): ResolvedTeachingProfile {
  const analysis = analyzeTeachingPerformance(input.brandProfileId)
  const baseLevel = inferBaseTeachingLevel(input.domain, input.trend, input.urgency)
  const baseStyle = inferBaseExplanationStyle(input.domain, input.trend)

  const explain: TeachingExplainabilityEntry[] = [
    {
      what: `Baseline teaching plan: ${baseLevel} / ${baseStyle.replace(/_/g, ' ')}`,
      why: 'Editorial defaults from domain + trend (anchor for cold start).',
      influencedBy: 'domain_policy',
    },
  ]

  if (analysis.sampleCount < 6) {
    explain.push({
      what: 'Teaching adaptation on hold',
      why: `Only ${analysis.sampleCount} tagged teaching rows in memory — not enough to shift style/level.`,
      influencedBy: 'sample_floor',
    })
    if (input.domain === 'ai') {
      explain.push({
        what: 'AI clarity preset active',
        why: 'AI vertical defaults to educational tone with optional “how to start” even without memory.',
        influencedBy: 'ai_domain_policy',
      })
    }
    return {
      teaching_level: baseLevel,
      explanation_style: baseStyle,
      teaching_explainability: explain,
    }
  }

  let level = pickWinningLevel(analysis, baseLevel)
  let style = pickWinningStyle(analysis, baseStyle)

  if (analysis.simplifyComplex) {
    explain.push({
      what: 'Forced beginner pacing + step-by-step',
      why: 'Complex explainers (advanced/breakdown) trailed simpler pacing in teaching effectiveness composite.',
      influencedBy: 'memory:simplify_complex',
    })
    level = 'beginner'
    style = 'step_by_step'
  } else if (analysis.deepenOk && input.domain === 'ai') {
    explain.push({
      what: 'Deepen explanations slightly',
      why: 'Audience depth signals (comments + completion proxies) reward richer AI walk-throughs.',
      influencedBy: 'memory:deepen_ok',
    })
    if (level === 'beginner') level = 'intermediate'
    if (style === 'quick_tip') style = 'use_case'
  }

  if (!analysis.simplifyComplex && style !== baseStyle && analysis.byStyle[0]?.count >= MIN_STYLE_SWITCH) {
    explain.push({
      what: `Explanation style → ${style.replace(/_/g, ' ')}`,
      why: 'Weighted teaching effectiveness (ER + depth + completion proxies) favored this structure.',
      influencedBy: `memory:style:${style}`,
    })
  }

  if (!analysis.simplifyComplex && level !== baseLevel && analysis.byLevel[0]?.count >= MIN_STYLE_SWITCH) {
    explain.push({
      what: `Teaching level → ${level}`,
      why: 'Historical engagement band for this depth outperformed the editorial default.',
      influencedBy: `memory:level:${level}`,
    })
  }

  if (input.domain === 'ai') {
    explain.push({
      what: 'AI vertical clarity mode',
      why: 'Clarity over hype; progressive teaching (basic → deeper); optional “how to start”.',
      influencedBy: 'ai_domain_policy',
    })
  }

  return {
    teaching_level: level,
    explanation_style: style,
    teaching_explainability: explain.slice(0, 8),
  }
}
