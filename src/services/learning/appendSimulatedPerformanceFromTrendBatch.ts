import type { SupabaseClient } from '@supabase/supabase-js'
import type { BrandProfile } from '../../types/brand'
import type { ContentOpportunity } from '../../types/opportunity'
import type { PerformancePlatformId, PublishedContentPerformance } from '../../types/performanceLearning'
import type { ScoredSignal } from '../relevance/types'
import { firstAdaptationPlatformFromSuggestions } from '../conversion/mapSuggestedPlatform'
import { getPerformanceMemoryStore } from './performanceMemoryStore'
import { recordPublishedContentPerformance } from './recordPerformance'

function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function simulationOutcome(
  priority: number,
  signalStrength: number | undefined,
  rnd: () => number,
): 'success' | 'mixed' | 'underperformed' {
  const blend = (priority + (signalStrength ?? 0.55)) / 2 + (rnd() - 0.5) * 0.08
  if (blend >= 0.52) return 'success'
  if (blend >= 0.36) return 'mixed'
  return 'underperformed'
}

/**
 * Writes a small batch of **simulated** publish outcomes tied to the latest trend opportunities
 * so the learning layer reacts like a live stack (no external analytics required).
 */
export async function appendSimulatedPerformanceFromTrendBatch(input: {
  brand: BrandProfile
  scored: ScoredSignal[]
  opportunities: ContentOpportunity[]
  tenantId: string
  supabase?: SupabaseClient
  batchId: string
}): Promise<{ rowsWritten: number }> {
  const { brand, scored, opportunities, tenantId, supabase, batchId } = input
  const store = getPerformanceMemoryStore(tenantId, supabase)
  const existing = await store.listForBrand(brand.id)
  if (existing.some((r) => r.metadata && (r.metadata as { simulation_batch_id?: string }).simulation_batch_id === batchId)) {
    return { rowsWritten: 0 }
  }

  const scoredById = new Map(scored.map((s) => [s.id, s]))
  const take = opportunities.slice(0, 6)
  if (take.length === 0) return { rowsWritten: 0 }

  let written = 0
  for (const opp of take) {
    const sig = scoredById.get(opp.signal_id)
    const rnd = mulberry32(hash(`${batchId}:${opp.id}:${sig?.id ?? ''}`))
    const platform =
      (firstAdaptationPlatformFromSuggestions(opp.suggested_platforms) as PerformancePlatformId | undefined) ??
      'instagram'
    const impressions = 900 + Math.floor(rnd() * 9200)
    const reach = Math.round(impressions * (0.86 + rnd() * 0.1))
    const outcome = simulationOutcome(opp.priority_score, sig?.signal_strength, rnd)
    const erBase =
      outcome === 'success'
        ? 0.065 + rnd() * 0.05
        : outcome === 'mixed'
          ? 0.038 + rnd() * 0.022
          : 0.015 + rnd() * 0.018
    const engagementRate = Math.min(0.22, Math.max(0.008, erBase))
    const engagementScore = Math.round(engagementRate * 1000) / 10
    const actions = Math.round(impressions * engagementRate)
    const likes = Math.round(actions * 0.42)
    const comments = Math.round(actions * 0.11)
    const shares = Math.round(actions * 0.16)
    const saves = Math.round(actions * 0.26)
    const clicks = Math.round(impressions * (0.006 + rnd() * 0.02))

    const row: PublishedContentPerformance = {
      id: `sim-perf-${batchId}-${opp.id}`.replace(/[^a-zA-Z0-9-]/g, '-'),
      contentItemId: `sim-content-${opp.id}`,
      brandProfileId: brand.id,
      platform,
      publishedAt: new Date().toISOString(),
      domain: opp.content_domain,
      trendCategory: opp.trend_category,
      contentFormat: opp.suggested_content_format,
      ctaType: opp.conversion_intent,
      hookStyle: 'first_frame',
      impressions,
      reach,
      clicks,
      likes,
      comments,
      shares,
      saves,
      engagementRate,
      conversionHint: outcome === 'success' ? 22 : outcome === 'mixed' ? 10 : 3,
      teachingLevel: opp.teaching_level,
      explanationStyle: opp.explanation_style,
      watchTimeProxySeconds: Math.round(18 + rnd() * 52),
      bookmarks: Math.round(saves * 0.85),
      completionSignal: Math.min(1, 0.15 + rnd() * 0.45),
      engagementDepthScore: Math.min(1, 0.12 + rnd() * 0.35),
      metadata: {
        source: 'trend_simulation',
        simulation_batch_id: batchId,
        simulation_outcome: outcome,
        engagement_score: engagementScore,
        reach_estimate: reach,
        linked_opportunity_id: opp.id,
        linked_signal_id: opp.signal_id,
        signal_source_label: sig?.source_label,
        signal_strength: sig?.signal_strength,
      },
    }
    await recordPublishedContentPerformance(row, tenantId, supabase)
    written += 1
  }

  return { rowsWritten: written }
}
