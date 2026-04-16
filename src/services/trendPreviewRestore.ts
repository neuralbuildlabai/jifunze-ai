import type { SupabaseClient } from '@supabase/supabase-js'
import type { BrandProfile } from '../types/brand'
import type { ContentOpportunity } from '../types/opportunity'
import type { SignalIngestionBatch, StoredOpportunity } from '../types/storedRecords'
import { getPersistence } from '../persistence/registry'
import type { ScoredSignal } from './relevance/types'

export type CachedTrendUiState = {
  scored_signals: ScoredSignal[]
  opportunities: ContentOpportunity[]
  batch?: SignalIngestionBatch
  rawCount: number
  guardedCount: number
  /** From the latest persisted lab run for this brand, when available. */
  lastSimulationRowsWritten: number
}

function toContentOpportunity(row: StoredOpportunity): ContentOpportunity {
  const { brandProfileId, computedAt, ...rest } = row
  void brandProfileId
  void computedAt
  return rest as ContentOpportunity
}

/**
 * Hydrates the trend UI from durable persistence (no network) so reloads feel continuous.
 * Supabase UUID tenants and browser-backed local tenants both use {@link getPersistence}.
 */
export async function loadCachedTrendStateFromPersistence(
  brand: BrandProfile,
  tenantId: string,
  supabase?: SupabaseClient,
): Promise<CachedTrendUiState | null> {
  const p = getPersistence(tenantId, supabase)
  const [scored, stored, batch, runs] = await Promise.all([
    p.signals.listScoredForBrand(brand.id),
    p.opportunities.listForBrand(brand.id),
    p.signals.latestBatch(brand.id),
    p.labHistory.listRunsForBrand(brand.id, { limit: 1 }),
  ])
  if (!stored.length && !scored.length) return null
  const opportunities = stored.map(toContentOpportunity)
  const lastSimulationRowsWritten = runs[0]?.simulationRowsWritten ?? 0
  return {
    scored_signals: scored,
    opportunities,
    batch,
    rawCount: batch?.rawCount ?? scored.length,
    guardedCount: batch?.guardedCount ?? scored.length,
    lastSimulationRowsWritten,
  }
}
