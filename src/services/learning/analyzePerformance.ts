import type { SupabaseClient } from '@supabase/supabase-js'
import { DEFAULT_OPTIMIZATION_LEARNING_WEIGHTS } from '../../config/optimizationLearning'
import type { ContentDomain } from '../../types/contentDomain'
import type { ContentFormat } from '../../types/contentFormat'
import type { TrendCategory } from '../../types/trendCategory'
import type {
  ContentPerformanceSnapshot,
  LearningInfluenceDirection,
  OptimizationInsight,
  OptimizationInsightKind,
  PatternStrength,
  PerformancePlatformId,
  PublishedContentPerformance,
  StrategyAdjustmentPayload,
} from '../../types/performanceLearning'
import type { TeachingLevel } from '../../types/teaching'
import { getPerformanceMemoryStore } from './performanceMemoryStore'
import { learningMemoryRowWeight } from './learningMemoryRowWeight'
import {
  insightConfidenceForStrength,
  strengthForStrongSignal,
  strengthForWeakSignal,
} from './patternStrength'

const W = () => DEFAULT_OPTIMIZATION_LEARNING_WEIGHTS

function recencyWeight(publishedAt: string): number {
  const days = Math.max(0, (Date.now() - Date.parse(publishedAt)) / 86400000)
  return Math.exp(-days / W().recencyHalfLifeDays)
}

function effectiveEngagementRate(r: PublishedContentPerformance): number | null {
  if (r.engagementRate != null) return Math.min(1, Math.max(0, r.engagementRate))
  const imp = r.impressions ?? 0
  if (imp <= 0) return null
  const actions =
    (r.likes ?? 0) + (r.comments ?? 0) + (r.shares ?? 0) + (r.saves ?? 0) + (r.clicks ?? 0) * 0.5
  return Math.min(1, actions / imp)
}

type WeightedStat = { w: number; wv: number; n: number }

function bump(stat: WeightedStat, weight: number, value: number): void {
  stat.w += weight
  stat.wv += weight * value
  stat.n += 1
}

function mean(stat: WeightedStat): number | null {
  if (stat.w <= 0) return null
  return stat.wv / stat.w
}

function mkInsight(
  brandId: string,
  kind: OptimizationInsightKind,
  subject: string,
  metric: string,
  value: number | null,
  sampleSize: number,
  confidence: OptimizationInsight['confidence'],
  tags?: StrategyAdjustmentPayload,
  evidence?: string[],
  extras?: {
    patternStrength?: PatternStrength
    patternKey?: string
    learningDirection?: LearningInfluenceDirection
    estimatedDelta?: number
  },
): OptimizationInsight {
  return {
    id: `ins-${brandId}-${kind}-${subject}`.replace(/\s+/g, '_').slice(0, 120),
    brandProfileId: brandId,
    kind,
    subject,
    metric,
    value,
    sampleSize,
    confidence,
    evidence,
    tags,
    createdAt: new Date().toISOString(),
    patternStrength: extras?.patternStrength,
    patternKey: extras?.patternKey,
    learningDirection: extras?.learningDirection,
    estimatedDelta: extras?.estimatedDelta,
  }
}

/** Lower weighted-support floor so format/platform, CTA/platform, and teaching/platform fire earlier. */
const COMBO_EVIDENCE_FLOOR = { minW: 0.2, perN: 0.1 } as const

function scanAxis(
  brandId: string,
  map: Map<string, WeightedStat>,
  gMean: number,
  kindStrong: OptimizationInsightKind,
  kindWeak: OptimizationInsightKind,
  label: (key: string) => string,
  tagFor: (key: string) => StrategyAdjustmentPayload | undefined,
  minN: number,
  evidenceFloor?: { minW: number; perN: number },
): OptimizationInsight[] {
  const cfg = W()
  const out: OptimizationInsight[] = []
  const minW = evidenceFloor?.minW ?? 0.35
  const perN = evidenceFloor?.perN ?? 0.15
  for (const [k, st] of map) {
    if (st.n < minN || st.w < Math.max(minW, st.n * perN)) continue
    const m = mean(st)
    if (m == null) continue
    const ratio = m / gMean
    const ev = [
      `Global baseline ER ≈ ${(gMean * 100).toFixed(2)}%`,
      `Axis ratio ≈ ${ratio.toFixed(3)} (n=${st.n})`,
    ]
    const strong = strengthForStrongSignal(st.n, ratio, cfg)
    if (strong) {
      const deltaHint = Math.min(0.12, Math.abs(ratio - 1) * 0.22)
      out.push(
        mkInsight(
          brandId,
          kindStrong,
          label(k),
          'weighted_avg_engagement_rate',
          m,
          st.n,
          insightConfidenceForStrength(strong),
          tagFor(k),
          ev,
          {
            patternStrength: strong,
            patternKey: k,
            learningDirection: 'boost',
            estimatedDelta: deltaHint,
          },
        ),
      )
      continue
    }
    const weak = strengthForWeakSignal(st.n, ratio, cfg)
    if (weak) {
      const deltaHint = Math.min(0.12, Math.abs(ratio - 1) * 0.22)
      out.push(
        mkInsight(
          brandId,
          kindWeak,
          label(k),
          'weighted_avg_engagement_rate',
          m,
          st.n,
          insightConfidenceForStrength(weak),
          tagFor(k),
          ev,
          {
            patternStrength: weak,
            patternKey: k,
            learningDirection: 'penalty',
            estimatedDelta: deltaHint,
          },
        ),
      )
    }
  }
  return out
}

function ctaStyleFromTrackedLabel(ctaType: string): string {
  if (ctaType.includes('dm')) return 'dm'
  if (ctaType.includes('link')) return 'link_in_bio'
  if (ctaType.includes('engagement')) return 'save_share'
  if (ctaType.includes('traffic')) return 'link_in_bio'
  if (ctaType.includes('sales')) return 'link_in_bio'
  return 'save_share'
}

function compositeKey(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join('::')
}

/**
 * Aggregates historical performance into a snapshot + typed insights.
 */
export async function analyzeBrandPerformance(
  brandProfileId: string,
  tenantId: string,
  supabase?: SupabaseClient,
): Promise<{
  snapshot: ContentPerformanceSnapshot
  insights: OptimizationInsight[]
}> {
  const rows = await getPerformanceMemoryStore(tenantId, supabase).listForBrand(brandProfileId)
  const iso = new Date().toISOString()

  if (rows.length === 0) {
    return {
      snapshot: {
        id: `snap-empty-${brandProfileId}`,
        brandProfileId,
        capturedAt: iso,
        sampleCount: 0,
        weightedAvgEngagementRate: null,
        totals: {
          impressions: null,
          reach: null,
          clicks: null,
          likes: null,
          comments: null,
          shares: null,
          saves: null,
        },
      },
      insights: [],
    }
  }

  const global: WeightedStat = { w: 0, wv: 0, n: 0 }
  const byDomain = new Map<string, WeightedStat>()
  const byTrend = new Map<string, WeightedStat>()
  const byCta = new Map<string, WeightedStat>()
  const byFormat = new Map<string, WeightedStat>()
  const byDomainPlatform = new Map<string, WeightedStat>()
  const byTrendPlatform = new Map<string, WeightedStat>()
  const byCtaPlatform = new Map<string, WeightedStat>()
  const byFormatPlatform = new Map<string, WeightedStat>()
  const byTeachingStylePlatform = new Map<string, WeightedStat>()
  const byTeachingLevelDomain = new Map<string, WeightedStat>()
  const byHour = new Map<number, WeightedStat>()
  const byCombo = new Map<string, WeightedStat>()

  let timp = 0,
    trch = 0,
    tclk = 0,
    tlike = 0,
    tcmt = 0,
    tshr = 0,
    tsav = 0

  for (const r of rows) {
    const rw = recencyWeight(r.publishedAt) * learningMemoryRowWeight(r)
    const er = effectiveEngagementRate(r)
    if (er == null) continue
    bump(global, rw, er)
    timp += r.impressions ?? 0
    trch += r.reach ?? 0
    tclk += r.clicks ?? 0
    tlike += r.likes ?? 0
    tcmt += r.comments ?? 0
    tshr += r.shares ?? 0
    tsav += r.saves ?? 0

    const dk = r.domain
    if (!byDomain.has(dk)) byDomain.set(dk, { w: 0, wv: 0, n: 0 })
    bump(byDomain.get(dk)!, rw, er)

    const tk = r.trendCategory
    if (!byTrend.has(tk)) byTrend.set(tk, { w: 0, wv: 0, n: 0 })
    bump(byTrend.get(tk)!, rw, er)

    if (!byCta.has(r.ctaType)) byCta.set(r.ctaType, { w: 0, wv: 0, n: 0 })
    bump(byCta.get(r.ctaType)!, rw, er)

    const fk = r.contentFormat
    if (!byFormat.has(fk)) byFormat.set(fk, { w: 0, wv: 0, n: 0 })
    bump(byFormat.get(fk)!, rw, er)

    const dp = compositeKey(r.domain, r.platform)
    if (!byDomainPlatform.has(dp)) byDomainPlatform.set(dp, { w: 0, wv: 0, n: 0 })
    bump(byDomainPlatform.get(dp)!, rw, er)

    const tp = compositeKey(r.trendCategory, r.platform)
    if (!byTrendPlatform.has(tp)) byTrendPlatform.set(tp, { w: 0, wv: 0, n: 0 })
    bump(byTrendPlatform.get(tp)!, rw, er)

    const cp = compositeKey(ctaStyleFromTrackedLabel(r.ctaType), r.platform)
    if (!byCtaPlatform.has(cp)) byCtaPlatform.set(cp, { w: 0, wv: 0, n: 0 })
    bump(byCtaPlatform.get(cp)!, rw, er)

    const fp = compositeKey(r.contentFormat, r.platform)
    if (!byFormatPlatform.has(fp)) byFormatPlatform.set(fp, { w: 0, wv: 0, n: 0 })
    bump(byFormatPlatform.get(fp)!, rw, er)

    if (r.explanationStyle) {
      const tsp = compositeKey(r.explanationStyle, r.platform)
      if (!byTeachingStylePlatform.has(tsp)) byTeachingStylePlatform.set(tsp, { w: 0, wv: 0, n: 0 })
      bump(byTeachingStylePlatform.get(tsp)!, rw, er)
    }

    if (r.teachingLevel) {
      const tld = compositeKey(r.teachingLevel, r.domain)
      if (!byTeachingLevelDomain.has(tld)) byTeachingLevelDomain.set(tld, { w: 0, wv: 0, n: 0 })
      bump(byTeachingLevelDomain.get(tld)!, rw, er)
    }

    const hr = new Date(r.publishedAt).getUTCHours()
    if (!byHour.has(hr)) byHour.set(hr, { w: 0, wv: 0, n: 0 })
    bump(byHour.get(hr)!, rw, er)

    const comboKey = `${r.domain}::${r.trendCategory}`
    if (!byCombo.has(comboKey)) byCombo.set(comboKey, { w: 0, wv: 0, n: 0 })
    bump(byCombo.get(comboKey)!, rw, er)
  }

  const gMean = mean(global)
  const minN = W().minSamplesDirectional
  const insights: OptimizationInsight[] = []

  if (gMean != null && gMean > 0) {
    insights.push(
      ...scanAxis(
        brandProfileId,
        byDomain,
        gMean,
        'strong_domain',
        'weak_domain',
        (k) => `Domain: ${k}`,
        (k) => ({ domain: k as ContentDomain }),
        minN,
      ),
    )
    insights.push(
      ...scanAxis(
        brandProfileId,
        byDomainPlatform,
        gMean,
        'strong_domain_platform',
        'weak_domain_platform',
        (k) => {
          const [d, p] = k.split('::')
          return `Domain+platform: ${d} on ${p}`
        },
        (k) => {
          const [d, p] = k.split('::')
          return { domain: d as ContentDomain, platform: p as PerformancePlatformId }
        },
        minN,
        COMBO_EVIDENCE_FLOOR,
      ),
    )
    insights.push(
      ...scanAxis(
        brandProfileId,
        byTrend,
        gMean,
        'strong_trend',
        'weak_trend',
        (k) => `Trend: ${k.replace(/_/g, ' ')}`,
        (k) => ({ trendCategory: k as TrendCategory }),
        minN,
      ),
    )
    insights.push(
      ...scanAxis(
        brandProfileId,
        byTrendPlatform,
        gMean,
        'strong_trend_platform',
        'weak_trend_platform',
        (k) => {
          const [t, p] = k.split('::')
          return `Trend+platform: ${t.replace(/_/g, ' ')} on ${p}`
        },
        (k) => {
          const [t, p] = k.split('::')
          return { trendCategory: t as TrendCategory, platform: p as PerformancePlatformId }
        },
        minN,
        COMBO_EVIDENCE_FLOOR,
      ),
    )
    insights.push(
      ...scanAxis(
        brandProfileId,
        byCta,
        gMean,
        'strong_cta',
        'weak_cta',
        (k) => `CTA pattern: ${k}`,
        (k) => ({ ctaStyle: ctaStyleFromTrackedLabel(k) }),
        minN,
      ),
    )
    insights.push(
      ...scanAxis(
        brandProfileId,
        byCtaPlatform,
        gMean,
        'strong_cta_platform',
        'weak_cta_platform',
        (k) => {
          const [c, p] = k.split('::')
          return `CTA+platform: ${c} on ${p}`
        },
        (k) => {
          const [c, p] = k.split('::')
          return { ctaStyle: c, platform: p as PerformancePlatformId }
        },
        minN,
        COMBO_EVIDENCE_FLOOR,
      ),
    )
    insights.push(
      ...scanAxis(
        brandProfileId,
        byFormat,
        gMean,
        'strong_format',
        'weak_format',
        (k) => `Format: ${k.replace(/_/g, ' ')}`,
        (k) => ({ contentFormat: k as ContentFormat }),
        minN,
      ),
    )
    insights.push(
      ...scanAxis(
        brandProfileId,
        byFormatPlatform,
        gMean,
        'strong_format_platform',
        'weak_format_platform',
        (k) => {
          const [f, p] = k.split('::')
          return `Format+platform: ${f.replace(/_/g, ' ')} on ${p}`
        },
        (k) => {
          const [f, p] = k.split('::')
          return { contentFormat: f as ContentFormat, platform: p as PerformancePlatformId }
        },
        minN,
        COMBO_EVIDENCE_FLOOR,
      ),
    )
    insights.push(
      ...scanAxis(
        brandProfileId,
        byTeachingStylePlatform,
        gMean,
        'strong_teaching_style_platform',
        'weak_teaching_style_platform',
        (k) => {
          const [s, p] = k.split('::')
          return `Teaching+platform: ${s.replace(/_/g, ' ')} on ${p}`
        },
        (k) => {
          const [s, p] = k.split('::')
          return {
            explanationStyle: s as StrategyAdjustmentPayload['explanationStyle'],
            platform: p as PerformancePlatformId,
          }
        },
        minN,
        COMBO_EVIDENCE_FLOOR,
      ),
    )
    insights.push(
      ...scanAxis(
        brandProfileId,
        byTeachingLevelDomain,
        gMean,
        'strong_teaching_level_domain',
        'weak_teaching_level_domain',
        (k) => {
          const [lvl, dom] = k.split('::')
          return `Teaching level+domain: ${lvl} · ${dom}`
        },
        (k) => {
          const [lvl, dom] = k.split('::')
          return { teachingLevel: lvl as TeachingLevel, domain: dom as ContentDomain }
        },
        minN,
      ),
    )

    let bestH: number | null = null
    let bestM = -1
    for (const [h, st] of byHour) {
      const m = mean(st)
      if (st.n < W().minSamplesDirectional || m == null) continue
      if (m > bestM) {
        bestM = m
        bestH = h
      }
    }
    if (bestH != null && bestM >= 0) {
      const nBest = byHour.get(bestH)?.n ?? 0
      const hourStrength: PatternStrength =
        nBest >= W().minSamplesForPattern ? 'confirmed' : nBest >= W().minSamplesEmerging ? 'emerging' : 'weak'
      insights.push(
        mkInsight(
          brandProfileId,
          'strong_posting_hour',
          `UTC hour ~${bestH}:00`,
          'weighted_avg_engagement_rate',
          bestM,
          nBest,
          insightConfidenceForStrength(hourStrength),
          { postingHour: bestH },
          [`Posting-time band shows relative lift vs other hours (n=${nBest}).`],
          {
            patternStrength: hourStrength,
            patternKey: `hour:${bestH}`,
            learningDirection: 'boost',
            estimatedDelta: Math.min(0.1, Math.abs(bestM / gMean - 1) * 0.2),
          },
        ),
      )
    }

    for (const [combo, st] of byCombo) {
      const m = mean(st)
      if (m == null) continue
      const ratio = m / gMean
      const weak = strengthForWeakSignal(st.n, ratio, W())
      if (!weak) continue
      const [dom, tr] = combo.split('::') as [ContentDomain, TrendCategory]
      insights.push(
        mkInsight(
          brandProfileId,
          'weak_combo',
          `${dom} × ${tr.replace(/_/g, ' ')}`,
          'weighted_avg_engagement_rate',
          m,
          st.n,
          insightConfidenceForStrength(weak),
          { domain: dom, trendCategory: tr },
          ['Underperforming vs brand baseline for this pairing'],
          {
            patternStrength: weak,
            patternKey: combo,
            learningDirection: 'penalty',
            estimatedDelta: Math.min(0.12, Math.abs(ratio - 1) * 0.22),
          },
        ),
      )
    }
  }

  const snapshot: ContentPerformanceSnapshot = {
    id: `snap-${brandProfileId}-${Date.now()}`,
    brandProfileId,
    capturedAt: iso,
    sampleCount: rows.length,
    weightedAvgEngagementRate: gMean,
    totals: {
      impressions: timp || null,
      reach: trch || null,
      clicks: tclk || null,
      likes: tlike || null,
      comments: tcmt || null,
      shares: tshr || null,
      saves: tsav || null,
    },
    rollupHints: {
      domains: Object.fromEntries(byDomain),
      trends: Object.fromEntries(byTrend),
    },
  }

  return { snapshot, insights: insights.slice(0, 34) }
}
