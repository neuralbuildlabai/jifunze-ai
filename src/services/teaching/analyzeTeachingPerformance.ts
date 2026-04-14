import type { ContentDomain } from '../../types/contentDomain'
import type { UrgencyLevel } from '../../types/opportunity'
import type { TrendCategory } from '../../types/trendCategory'
import type { PublishedContentPerformance } from '../../types/performanceLearning'
import type { ExplanationStyle, TeachingLevel } from '../../types/teaching'
import { getPerformanceMemoryStore } from '../learning/performanceMemoryStore'

const HALF_LIFE_DAYS = 14

function recencyWeight(publishedAt: string): number {
  const days = Math.max(0, (Date.now() - Date.parse(publishedAt)) / 86400000)
  return Math.exp(-days / HALF_LIFE_DAYS)
}

function norm(n: number, max: number): number {
  if (max <= 0) return 0
  return Math.min(1, n / max)
}

/**
 * Single scalar for comparing teaching approaches (rule-based composite).
 */
export function teachingEffectivenessScore(r: PublishedContentPerformance): number {
  const er = r.engagementRate ?? 0
  const imp = r.impressions ?? 1
  const depth =
    r.engagementDepthScore ??
    Math.min(1, ((r.comments ?? 0) * 1.4 + (r.shares ?? 0) * 0.9) / Math.max(40, imp * 0.025))
  const completion = r.completionSignal ?? 0
  const watch = r.watchTimeProxySeconds != null ? Math.min(1, r.watchTimeProxySeconds / 90) : 0
  const saveBookmark = Math.max(r.saves ?? 0, r.bookmarks ?? 0)
  const retention = norm(saveBookmark, imp * 0.08) * 0.18 + norm(r.shares ?? 0, imp * 0.05) * 0.12
  return (
    0.32 * er +
    0.22 * depth +
    0.18 * completion +
    0.14 * watch +
    retention +
    0.08 * norm(r.clicks ?? 0, imp * 0.04)
  )
}

export type TeachingStyleAggregate = {
  style: ExplanationStyle
  weightedScore: number
  weight: number
  count: number
}

export type TeachingLevelAggregate = {
  level: TeachingLevel
  weightedScore: number
  weight: number
  count: number
}

export type TeachingPerformanceAnalysis = {
  brandProfileId: string
  sampleCount: number
  globalTeachingScore: number | null
  byStyle: TeachingStyleAggregate[]
  byLevel: TeachingLevelAggregate[]
  /** True when “complex” combos trail simpler ones. */
  simplifyComplex: boolean
  /** True when deeper content is winning vs baseline. */
  deepenOk: boolean
}

function aggregateBy<K extends string>(
  rows: PublishedContentPerformance[],
  keyFn: (r: PublishedContentPerformance) => K | undefined,
): Map<K, { w: number; ws: number; n: number }> {
  const m = new Map<K, { w: number; ws: number; n: number }>()
  for (const r of rows) {
    const k = keyFn(r)
    if (!k) continue
    const rw = recencyWeight(r.publishedAt)
    const sc = teachingEffectivenessScore(r)
    const cur = m.get(k) ?? { w: 0, ws: 0, n: 0 }
    cur.w += rw
    cur.ws += rw * sc
    cur.n += 1
    m.set(k, cur)
  }
  return m
}

/**
 * Analyzes historically tagged posts for teaching style + level effectiveness.
 */
export function analyzeTeachingPerformance(brandProfileId: string): TeachingPerformanceAnalysis {
  const rows = getPerformanceMemoryStore().listForBrand(brandProfileId)
  const tagged = rows.filter((r) => r.teachingLevel && r.explanationStyle)
  if (tagged.length === 0) {
    return {
      brandProfileId,
      sampleCount: 0,
      globalTeachingScore: null,
      byStyle: [],
      byLevel: [],
      simplifyComplex: false,
      deepenOk: false,
    }
  }

  let gw = 0,
    gws = 0
  for (const r of tagged) {
    const rw = recencyWeight(r.publishedAt)
    gw += rw
    gws += rw * teachingEffectivenessScore(r)
  }
  const globalTeachingScore = gw > 0 ? gws / gw : null

  const styleMap = aggregateBy(tagged, (r) => r.explanationStyle as ExplanationStyle | undefined)
  const levelMap = aggregateBy(tagged, (r) => r.teachingLevel as TeachingLevel | undefined)

  const byStyle: TeachingStyleAggregate[] = [...styleMap.entries()]
    .map(([style, v]) => ({
      style,
      weightedScore: v.w > 0 ? v.ws / v.w : 0,
      weight: v.w,
      count: v.n,
    }))
    .sort((a, b) => b.weightedScore - a.weightedScore)

  const byLevel: TeachingLevelAggregate[] = [...levelMap.entries()]
    .map(([level, v]) => ({
      level,
      weightedScore: v.w > 0 ? v.ws / v.w : 0,
      weight: v.w,
      count: v.n,
    }))
    .sort((a, b) => b.weightedScore - a.weightedScore)

  const complex = tagged.filter(
    (r) => r.teachingLevel === 'advanced' && (r.explanationStyle === 'breakdown' || r.explanationStyle === 'analogy'),
  )
  const simple = tagged.filter(
    (r) =>
      r.teachingLevel === 'beginner' &&
      (r.explanationStyle === 'step_by_step' || r.explanationStyle === 'quick_tip'),
  )
  const avg = (subset: PublishedContentPerformance[]) => {
    if (subset.length < 3) return null
    let w = 0,
      ws = 0
    for (const r of subset) {
      const rw = recencyWeight(r.publishedAt)
      w += rw
      ws += rw * teachingEffectivenessScore(r)
    }
    return w > 0 ? ws / w : null
  }
  const cAvg = avg(complex)
  const sAvg = avg(simple)
  const simplifyComplex =
    cAvg != null && sAvg != null && globalTeachingScore != null && cAvg < sAvg * 0.9 && cAvg < globalTeachingScore * 0.92

  const deep = tagged.filter((r) => r.teachingLevel === 'advanced' || r.explanationStyle === 'use_case')
  const shallow = tagged.filter((r) => r.teachingLevel === 'beginner')
  const dAvg = avg(deep)
  const shAvg = avg(shallow)
  const deepenOk =
    dAvg != null && shAvg != null && dAvg > shAvg * 1.08 && tagged.length >= 8 && (byLevel[0]?.level === 'advanced' || byStyle[0]?.style === 'use_case')

  return {
    brandProfileId,
    sampleCount: tagged.length,
    globalTeachingScore,
    byStyle,
    byLevel,
    simplifyComplex,
    deepenOk,
  }
}

export function inferBaseTeachingLevel(
  domain: ContentDomain,
  trend: TrendCategory,
  urgency: UrgencyLevel,
): TeachingLevel {
  if (domain === 'ai') {
    if (trend === 'educational_topic' || trend === 'industry_update') {
      return urgency === 'high' ? 'intermediate' : 'beginner'
    }
    if (trend === 'product_launch' || trend === 'breaking_news') return 'intermediate'
    return 'intermediate'
  }
  if (trend === 'educational_topic') return 'beginner'
  if (trend === 'meme' || trend === 'viral_trend') return 'beginner'
  return 'intermediate'
}

export function inferBaseExplanationStyle(domain: ContentDomain, trend: TrendCategory): ExplanationStyle {
  if (domain === 'ai') {
    if (trend === 'product_launch') return 'comparison'
    if (trend === 'educational_topic') return 'step_by_step'
    if (trend === 'industry_update') return 'breakdown'
    return 'use_case'
  }
  if (trend === 'educational_topic') return 'step_by_step'
  if (trend === 'product_launch') return 'comparison'
  if (trend === 'cultural_moment') return 'analogy'
  return 'quick_tip'
}
