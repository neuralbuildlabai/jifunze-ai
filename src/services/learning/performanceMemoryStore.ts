import type { PublishedContentPerformance } from '../../types/performanceLearning'

/**
 * Persistence boundary — swap for Supabase without changing analysis/recommendations.
 */
export type PerformanceMemoryStore = {
  /** Insert or replace by `record.id`. */
  put(record: PublishedContentPerformance): void
  listForBrand(brandProfileId: string): PublishedContentPerformance[]
  countForBrand(brandProfileId: string): number
}

export class InMemoryPerformanceMemory implements PerformanceMemoryStore {
  private byId = new Map<string, PublishedContentPerformance>()

  put(record: PublishedContentPerformance): void {
    this.byId.set(record.id, { ...record })
  }

  listForBrand(brandProfileId: string): PublishedContentPerformance[] {
    return [...this.byId.values()].filter((r) => r.brandProfileId === brandProfileId)
  }

  countForBrand(brandProfileId: string): number {
    return this.listForBrand(brandProfileId).length
  }
}

let defaultStore: PerformanceMemoryStore = new InMemoryPerformanceMemory()

export function getPerformanceMemoryStore(): PerformanceMemoryStore {
  return defaultStore
}

/** Tests or future DI (e.g. Supabase adapter). */
export function setPerformanceMemoryStore(store: PerformanceMemoryStore): void {
  defaultStore = store
}
