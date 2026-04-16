import type { SupabaseClient } from '@supabase/supabase-js'
import { getPersistence, LOCAL_DEV_TENANT_ID } from '../../persistence/registry'
import type { BrandProfile } from '../../types/brand'
import type { ContentOpportunity } from '../../types/opportunity'
import type { ExternalSignal } from '../../types/signal'
import { classifySignal } from '../domains/classifySignal'
import { classifyTrendCategory } from '../trends/classifyTrendCategory'
import { applySignalGuards } from './applySignalGuards'
import { collectExternalSignals } from './collectExternalSignals'
import { normalizeExternalSignals } from './normalizeSignals'
import { compareSignalsByRank } from '../relevance/compositeRank'
import { buildOpportunitiesFromSignals } from '../opportunities/buildOpportunities'
import { onOpportunitiesBuilt, onSignalsIngested } from '../pipeline'
import { scoreSignalForBrand } from '../relevance/simpleKeywordScorer'
import type { ScoredSignal } from '../relevance/types'
import { dedupeScoredSignals } from './dedupeScoredSignals'
import { appendSimulatedPerformanceFromTrendBatch } from '../learning/appendSimulatedPerformanceFromTrendBatch'

export type TrendPreviewBundle = {
  raw_signals: ExternalSignal[]
  guarded_signals: ExternalSignal[]
  scored_signals: ScoredSignal[]
  opportunities: ContentOpportunity[]
  /** Ingest batch id used for persistence + simulated analytics dedupe. */
  simulation_batch_id: string
  /** Rows written this refresh from synthetic “publish” outcomes (0 if already recorded for batch). */
  simulation_rows_written: number
  /** Set when remote trend ingestion fails — UI must not treat as an empty success. */
  trend_ingestion_error?: { reason: string; source: string }
}

function rankScoredSignals(signals: ScoredSignal[]): ScoredSignal[] {
  return [...signals].sort(compareSignalsByRank)
}

/**
 * ## Future production architecture (signal ingestion)
 *
 * **Today:** this orchestrator runs in the browser using mock providers or a thin POST to
 * `VITE_SIGNAL_INGESTION_URL` that returns normalized JSON.
 *
 * **Recommended next step:** move real “internet scanning” to **Supabase Edge Functions** or
 * **server jobs** so you can:
 * - run **scheduled fetching** (cron / queue workers) instead of unbounded client calls
 * - apply **rate limiting** and per-source quotas
 * - centralize **caching** (KV / Postgres) to cut API cost and respect vendor limits
 * - enforce **source compliance** (ToS, robots.txt, attribution, paywalls, PII rules)
 * - perform **deduplication**, **staleness**, and **misinformation / brand-safety** checks
 *   authoritatively (client previews are best-effort only)
 *
 * The client should treat this module as a **preview** path: the same pipeline shape can call
 * an Edge aggregate that internally fans out to news, RSS, trends, and web-monitoring workers.
 *
 * **Downstream:** opportunities carry `lifecycle_status` (from autonomy) toward draft / queue /
 * publish; see `docs/near-autonomous-content-operations.md` for scheduled jobs, publishing
 * safeguards, analytics feedback, and rollback patterns.
 */
export async function buildRankedOpportunitiesForBrand(
  brand: BrandProfile,
  options?: {
    minRelevance?: number
    tenantId?: string
    supabase?: SupabaseClient
    /**
     * When false, skips synthetic publish rows and the second opportunity pass (trend preview only).
     * Default true for callers that omit the flag (immediate learning demo).
     */
    enableSyntheticPerformance?: boolean
  },
): Promise<TrendPreviewBundle> {
  const fetched_at = new Date().toISOString()
  const collected = await collectExternalSignals({ fetched_at })
  if (collected.status === 'error') {
    const batchId = `sig-batch-${brand.id}-ingest-error-${Date.now().toString(36)}`
    return {
      raw_signals: [],
      guarded_signals: [],
      scored_signals: [],
      opportunities: [],
      simulation_batch_id: batchId,
      simulation_rows_written: 0,
      trend_ingestion_error: { reason: collected.reason, source: collected.source },
    }
  }
  const raw = collected.signals
  const normalized = normalizeExternalSignals(raw)
  const guard = applySignalGuards(normalized, brand.banned_topics)
  const withDomains: ExternalSignal[] = guard.kept.map((s) => ({
    ...s,
    classified_domain: classifySignal(s),
    classified_trend_category: s.classified_trend_category ?? classifyTrendCategory(s),
  }))
  const scored = withDomains.map((signal) => scoreSignalForBrand({ signal, brand }))
  const ranked = rankScoredSignals(dedupeScoredSignals(scored))
  const tenantId = options?.tenantId ?? brand.tenant_id ?? LOCAL_DEV_TENANT_ID
  const supabase = options?.supabase
  const batch = {
    id: `sig-batch-${brand.id}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    brandProfileId: brand.id,
    fetchedAt: fetched_at,
    rawCount: raw.length,
    guardedCount: withDomains.length,
    scoredCount: ranked.length,
  }

  const enableSynthetic = options?.enableSyntheticPerformance !== false

  const opportunitiesDraft = await buildOpportunitiesFromSignals(ranked, brand, options?.minRelevance, {
    tenantId,
    supabase,
    /** Two-pass mode only: skip snapshot on draft; final pass persists (default). */
    ...(enableSynthetic ? { persistLearningSnapshot: false as const } : {}),
  })
  const sim = enableSynthetic
    ? await appendSimulatedPerformanceFromTrendBatch({
        brand,
        scored: ranked,
        opportunities: opportunitiesDraft,
        tenantId,
        supabase,
        batchId: batch.id,
      })
    : { rowsWritten: 0 }
  const opportunities = enableSynthetic
    ? await buildOpportunitiesFromSignals(ranked, brand, options?.minRelevance, {
        tenantId,
        supabase,
      })
    : opportunitiesDraft

  await getPersistence(tenantId, supabase).signals.replaceScoredForBrand({
    brandProfileId: brand.id,
    batch,
    scored: ranked,
  })
  await getPersistence(tenantId, supabase).opportunities.replaceForBrand(brand.id, opportunities)

  const performanceRowCount = await getPersistence(tenantId, supabase).performance.countForBrand(brand.id)
  await getPersistence(tenantId, supabase).labHistory.appendRun({
    id: `lab-run-${batch.id}`,
    brandProfileId: brand.id,
    ranAt: new Date().toISOString(),
    signalBatchId: batch.id,
    rawCount: batch.rawCount,
    guardedCount: batch.guardedCount,
    scoredCount: batch.scoredCount,
    opportunitiesCount: opportunities.length,
    simulationRowsWritten: sim.rowsWritten,
    performanceRowCount,
  })

  onSignalsIngested({
    brand_id: brand.id,
    counts: {
      raw_signals: raw.length,
      guarded_signals: withDomains.length,
      scored_signals: ranked.length,
      opportunities: opportunities.length,
    },
  })
  onOpportunitiesBuilt({
    brand_id: brand.id,
    opportunities,
  })

  return {
    raw_signals: raw,
    guarded_signals: withDomains,
    scored_signals: ranked,
    opportunities,
    simulation_batch_id: batch.id,
    simulation_rows_written: sim.rowsWritten,
  }
}
