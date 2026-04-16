import type { SupabaseClient } from '@supabase/supabase-js'
import type { PerformanceMemoryRepository } from '../../persistence/contracts'
import { getPersistence, persistenceBackendForTenant, setPersistence } from '../../persistence/registry'

/**
 * Performance / analytics rows (publish outcomes), scoped by tenant via {@link getPersistence}.
 */
export type PerformanceMemoryStore = PerformanceMemoryRepository

export function getPerformanceMemoryStore(
  tenantId: string,
  supabase?: SupabaseClient,
): PerformanceMemoryStore {
  return getPersistence(tenantId, supabase).performance
}

/** Tests or DI — replaces only the performance slice for this tenant. */
export function setPerformanceMemoryStore(
  tenantId: string,
  store: PerformanceMemoryStore,
  supabase?: SupabaseClient,
): void {
  const current = getPersistence(tenantId, supabase)
  setPersistence(
    { ...current, performance: store },
    tenantId,
    persistenceBackendForTenant(tenantId, supabase),
  )
}
