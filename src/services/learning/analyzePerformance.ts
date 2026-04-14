import { DEFAULT_OPTIMIZATION_LEARNING_WEIGHTS } from '../../config/optimizationLearning'
import type { ContentDomain } from '../../types/contentDomain'
import type { ContentFormat } from '../../types/contentFormat'
import type { TrendCategory } from '../../types/trendCategory'
import type {
  ContentPerformanceSnapshot,
  OptimizationInsight,
  OptimizationInsightKind,
  PublishedContentPerformance,
  StrategyAdjustmentPayload,
} from '../../types/performanceLearning'
import { getPerformanceMemoryStore } from './performanceMemoryStore'

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
  }
}

function scanAxis(
  brandId: string,
  map: Map<string, WeightedStat>,
  gMean: number,
  kindStrong: OptimizationInsightKind,
  kindWeak: OptimizationInsightKind,
  label: (key: string) => string,
  tagFor: (key: string) => StrategyAdjustmentPayload | undefined,
  minN: number,
): OptimizationInsight[] {
  const out: OptimizationInsight[] = []
  for (const [k, st] of map) {
    if (st.n < minN || st.w < minN * 0.2) continue
    const m = mean(st)
    if (m == null) continue
    const ratio = m / gMean
    const ev = [`Global baseline ER ≈ ${(gMean * 100).toFixed(2)}%`]
    if (ratio >= W().strongRatioThreshold) {
      out.push(
        mkInsight(
          brandId,
          kindStrong,
          label(k),
          'weighted_avg_engagement_rate',
          m,
          st.n,
          st.n >= minN + 2 ? 'high' : 'medium',
          tagFor(k),
          ev,
        ),
      )
    } else if (ratio <= W().weakRatioThreshold) {
      out.push(
        mkInsight(
          brandId,
          kindWeak,
          label(k),
          'weighted_avg_engagement_rate',
          m,
          st.n,
          'medium',
          tagFor(k),
          ev,
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

/**
 * Aggregates historical performance into a snapshot + typed insights.
 */
export function analyzeBrandPerformance(brandProfileId: string): {
  snapshot: ContentPerformanceSnapshot
  insights: OptimizationInsight[]
} {
  const rows = getPerformanceMemoryStore().listForBrand(brandProfileId)
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
    const rw = recencyWeight(r.publishedAt)
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

    const hr = new Date(r.publishedAt).getUTCHours()
    if (!byHour.has(hr)) byHour.set(hr, { w: 0, wv: 0, n: 0 })
    bump(byHour.get(hr)!, rw, er)

    const comboKey = `${r.domain}::${r.trendCategory}`
    if (!byCombo.has(comboKey)) byCombo.set(comboKey, { w: 0, wv: 0, n: 0 })
    bump(byCombo.get(comboKey)!, rw, er)
  }

  const gMean = mean(global)
  const minN = W().minSamplesForPattern
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
        byFormat,
        gMean,
        'strong_format',
        'weak_format',
        (k) => `Format: ${k.replace(/_/g, ' ')}`,
        (k) => ({ contentFormat: k as ContentFormat }),
        minN,
      ),
    )

    let bestH: number | null = null
    let bestM = -1
    for (const [h, st] of byHour) {
      const m = mean(st)
      if (st.n < minN - 1 || m == null) continue
      if (m > bestM) {
        bestM = m
        bestH = h
      }
    }
    if (bestH != null && bestM >= 0) {
      insights.push(
        mkInsight(
          brandProfileId,
          'strong_posting_hour',
          `UTC hour ~${bestH}:00`,
          'weighted_avg_engagement_rate',
          bestM,
          byHour.get(bestH)?.n ?? 0,
          'medium',
          { postingHour: bestH },
        ),
      )
    }

    for (const [combo, st] of byCombo) {
      const m = mean(st)
      if (st.n < minN || m == null) continue
      if (m / gMean <= W().weakRatioThreshold) {
        const [dom, tr] = combo.split('::') as [ContentDomain, TrendCategory]
        insights.push(
          mkInsight(
            brandProfileId,
            'weak_combo',
            `${dom} × ${tr.replace(/_/g, ' ')}`,
            'weighted_avg_engagement_rate',
            m,
            st.n,
            'medium',
            { domain: dom, trendCategory: tr },
            ['Underperforming vs brand baseline for this pairing'],
          ),
        )
      }
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

  return { snapshot, insights: insights.slice(0, 18) }
}
