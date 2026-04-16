import type { PublishedContentPerformance } from '../../types/performanceLearning'

/**
 * Weights rows when aggregating **learning** signals (insights, teaching rollups).
 * Demo seed fills cold-start UI but must not drown user-driven / simulation batches.
 */
export function learningMemoryRowWeight(r: PublishedContentPerformance): number {
  const meta = r.metadata as { source?: string; simulation_batch_id?: string } | undefined
  if (meta?.source === 'demo_seed') return 0.28
  if (meta?.simulation_batch_id) return 1.12
  return 1
}
