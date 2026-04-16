import type { SupabaseClient } from '@supabase/supabase-js'
import type { BrandProfile } from '../../types/brand'
import type { ContentOpportunity } from '../../types/opportunity'
import { buildOpportunitiesFromSignals } from '../opportunities/buildOpportunities'
import { appendSimulatedPerformanceFromTrendBatch } from '../learning/appendSimulatedPerformanceFromTrendBatch'
import type { ScoredSignal } from '../relevance/types'

/**
 * Append synthetic publish outcomes for the current scored set + opportunity slice, then rebuild
 * opportunities so learning rules apply — **without** re-fetching external signals.
 */
export async function simulatePerformanceOnly(input: {
  brand: BrandProfile
  scored: ScoredSignal[]
  opportunities: ContentOpportunity[]
  tenantId: string
  supabase?: SupabaseClient
  minRelevance?: number
}): Promise<{ rowsWritten: number; opportunities: ContentOpportunity[]; batchId: string }> {
  const batchId = `sim-only-${input.brand.id}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  const sim = await appendSimulatedPerformanceFromTrendBatch({
    brand: input.brand,
    scored: input.scored,
    opportunities: input.opportunities,
    tenantId: input.tenantId,
    supabase: input.supabase,
    batchId,
  })
  const opportunities = await buildOpportunitiesFromSignals(
    input.scored,
    input.brand,
    input.minRelevance ?? 0.18,
    { tenantId: input.tenantId, supabase: input.supabase },
  )
  return { rowsWritten: sim.rowsWritten, opportunities, batchId }
}
