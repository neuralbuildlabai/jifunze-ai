import type { SupabaseClient } from '@supabase/supabase-js'
import type { PublishedContentPerformance } from '../../types/performanceLearning'
import { getPerformanceMemoryStore } from './performanceMemoryStore'

/**
 * Data capture entry point (publish connector / analytics worker would call this later).
 */
export async function recordPublishedContentPerformance(
  record: PublishedContentPerformance,
  tenantId: string,
  supabase?: SupabaseClient,
): Promise<void> {
  await getPerformanceMemoryStore(tenantId, supabase).put(record)
}
