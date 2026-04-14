import type { PublishedContentPerformance } from '../../types/performanceLearning'
import { getPerformanceMemoryStore } from './performanceMemoryStore'

/**
 * Data capture entry point (publish connector / analytics worker would call this later).
 */
export function recordPublishedContentPerformance(
  record: PublishedContentPerformance,
): void {
  getPerformanceMemoryStore().put(record)
}
