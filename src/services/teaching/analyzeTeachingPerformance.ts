import type { SupabaseClient } from '@supabase/supabase-js'
import type { ContentDomain } from '../../types/contentDomain'
import type { UrgencyLevel } from '../../types/opportunity'
import type { TrendCategory } from '../../types/trendCategory'
import type { PublishedContentPerformance } from '../../types/performanceLearning'
import type { ExplanationStyle, TeachingLevel } from '../../types/teaching'
import { getPerformanceMemoryStore } from '../learning/performanceMemoryStore'
import { learningMemoryRowWeight } from '../learning/learningMemoryRowWeight'

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

export type StyleSavesShareAggregate = {
  style: ExplanationStyle
  /** Recency-weighted mean of saves/shares proxy (0–1-ish). */
  weightedSavesShare: number
  weight: number
  count: number
}

export type TeachingPerformanceAnalysis = {
  brandProfileId: string
  sampleCount: number
  globalTeachingScore: number | null
  byStyle: TeachingStyleAggregate[]
  byLevel: TeachingLevelAggregate[]
  /** Per-style rollup emphasizing saves + shares (distribution-friendly posts). */
  byStyleSavesShare: StyleSavesShareAggregate[]
  /** True when “complex” combos trail simpler ones. */
  simplifyComplex: boolean
  /** True when deeper content is winning vs baseline. */
  deepenOk: boolean
  /** Breakdown style leads on saves/shares vs other styles (enough samples). */
  breakdownSavesSharesStrong: boolean
  /** Dense explainers (comparison/analogy/advanced breakdown) trail plain pacing. */
  jargonHeavyWeak: boolean
  /** Among beginner-tagged posts, step-by-step outperforms other styles. */
  beginnerStepByStepStrong: boolean
}

function aggregateBy<K extends string>(
  rows: PublishedContentPerformance[],
  keyFn: (r: PublishedContentPerformance) => K | undefined,
): Map<K, { w: number; ws: number; n: number }> {
  const m = new Map<K, { w: number; ws: number; n: number }>()
  for (const r of rows) {
    const k = keyFn(r)
    if (!k) continue
    const rw = recencyWeight(r.publishedAt) * learningMemoryRowWeight(r)
    const sc = teachingEffectivenessScore(r)
    const cur = m.get(k) ?? { w: 0, ws: 0, n: 0 }
    cur.w += rw
    cur.ws += rw * sc
    cur.n += 1
    m.set(k, cur)
  }
  return m
}

/** Saves + bookmarks + shares as a lightweight “worth keeping” signal. */
function savesShareSignal(r: PublishedContentPerformance): number {
  const imp = r.impressions ?? 1
  const s = (r.saves ?? 0) + (r.bookmarks ?? 0)
  const sh = r.shares ?? 0
  return norm(s, imp * 0.08) * 0.55 + norm(sh, imp * 0.05) * 0.45
}

function aggregateByStyleMetric(
  rows: PublishedContentPerformance[],
  metricFn: (r: PublishedContentPerformance) => number,
): Map<ExplanationStyle, { w: number; ws: number; n: number }> {
  const m = new Map<ExplanationStyle, { w: number; ws: number; n: number }>()
  for (const r of rows) {
    const st = r.explanationStyle as ExplanationStyle | undefined
    if (!st) continue
    const rw = recencyWeight(r.publishedAt) * learningMemoryRowWeight(r)
    const cur = m.get(st) ?? { w: 0, ws: 0, n: 0 }
    cur.w += rw
    cur.ws += rw * metricFn(r)
    cur.n += 1
    m.set(st, cur)
  }
  return m
}

const JARGON_HEAVY_STYLES: ReadonlySet<ExplanationStyle> = new Set([
  'comparison',
  'analogy',
  'breakdown',
])

function isJargonHeavyRow(r: PublishedContentPerformance): boolean {
  const st = r.explanationStyle as ExplanationStyle | undefined
  if (!st) return false
  if (st === 'breakdown') return r.teachingLevel === 'advanced'
  return JARGON_HEAVY_STYLES.has(st)
}

function isPlainPacingRow(r: PublishedContentPerformance): boolean {
  const st = r.explanationStyle as ExplanationStyle | undefined
  if (!st) return false
  if (r.teachingLevel !== 'beginner' && r.teachingLevel !== 'intermediate') return false
  return st === 'step_by_step' || st === 'quick_tip' || st === 'use_case'
}

/**
 * Analyzes historically tagged posts for teaching style + level effectiveness.
 */
export async function analyzeTeachingPerformance(
  brandProfileId: string,
  tenantId: string,
  supabase?: SupabaseClient,
): Promise<TeachingPerformanceAnalysis> {
  const rows = await getPerformanceMemoryStore(tenantId, supabase).listForBrand(brandProfileId)
  const tagged = rows.filter((r) => r.teachingLevel && r.explanationStyle)
  if (tagged.length === 0) {
    return {
      brandProfileId,
      sampleCount: 0,
      globalTeachingScore: null,
      byStyle: [],
      byLevel: [],
      byStyleSavesShare: [],
      simplifyComplex: false,
      deepenOk: false,
      breakdownSavesSharesStrong: false,
      jargonHeavyWeak: false,
      beginnerStepByStepStrong: false,
    }
  }

  let gw = 0,
    gws = 0
  for (const r of tagged) {
    const rw = recencyWeight(r.publishedAt) * learningMemoryRowWeight(r)
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

  const ssMap = aggregateByStyleMetric(tagged, savesShareSignal)
  const byStyleSavesShare: StyleSavesShareAggregate[] = [...ssMap.entries()]
    .map(([style, v]) => ({
      style,
      weightedSavesShare: v.w > 0 ? v.ws / v.w : 0,
      weight: v.w,
      count: v.n,
    }))
    .sort((a, b) => b.weightedSavesShare - a.weightedSavesShare)

  let globalSavesShare: number | null = null
  {
    let w = 0,
      ws = 0
    for (const r of tagged) {
      const rw = recencyWeight(r.publishedAt) * learningMemoryRowWeight(r)
      w += rw
      ws += rw * savesShareSignal(r)
    }
    globalSavesShare = w > 0 ? ws / w : null
  }

  const topSs = byStyleSavesShare[0]
  const breakdownSs = byStyleSavesShare.find((x) => x.style === 'breakdown')
  const breakdownSavesSharesStrong =
    Boolean(breakdownSs && breakdownSs.count >= 4) &&
    breakdownSs!.style === topSs?.style &&
    globalSavesShare != null &&
    breakdownSs!.weightedSavesShare > globalSavesShare * 1.04

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
      const rw = recencyWeight(r.publishedAt) * learningMemoryRowWeight(r)
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

  const jargonRows = tagged.filter(isJargonHeavyRow)
  const plainRows = tagged.filter(isPlainPacingRow)
  const jAvg = avg(jargonRows)
  const pAvg = avg(plainRows)
  const jargonHeavyWeak =
    jAvg != null &&
    pAvg != null &&
    jargonRows.length >= 4 &&
    plainRows.length >= 4 &&
    jAvg < pAvg * 0.9 &&
    jAvg < (globalTeachingScore ?? jAvg) * 0.94

  const beginners = tagged.filter((r) => r.teachingLevel === 'beginner')
  const begMap = aggregateBy(beginners, (r) => r.explanationStyle as ExplanationStyle | undefined)
  const begByStyle: TeachingStyleAggregate[] = [...begMap.entries()]
    .map(([style, v]) => ({
      style,
      weightedScore: v.w > 0 ? v.ws / v.w : 0,
      weight: v.w,
      count: v.n,
    }))
    .sort((a, b) => b.weightedScore - a.weightedScore)
  const begStep = begByStyle.find((x) => x.style === 'step_by_step')
  const beginnerStepByStepStrong =
    beginners.length >= 6 &&
    Boolean(begStep && begStep.count >= 4 && begByStyle[0]?.style === 'step_by_step')

  return {
    brandProfileId,
    sampleCount: tagged.length,
    globalTeachingScore,
    byStyle,
    byLevel,
    byStyleSavesShare,
    simplifyComplex,
    deepenOk,
    breakdownSavesSharesStrong,
    jargonHeavyWeak,
    beginnerStepByStepStrong,
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
    if (trend === 'industry_update' || trend === 'breaking_news') return 'breakdown'
    if (trend === 'viral_trend' || trend === 'viral_audio') return 'quick_tip'
    if (trend === 'cultural_moment') return 'use_case'
    return 'use_case'
  }
  if (trend === 'educational_topic') return 'step_by_step'
  if (trend === 'product_launch') return 'comparison'
  if (trend === 'cultural_moment') return 'analogy'
  return 'quick_tip'
}
