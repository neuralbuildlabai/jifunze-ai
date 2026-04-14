import type { AnySignalSourceProvider } from './types'
import { mockNewsProvider } from './providers/mockNewsProvider'
import { mockRssProvider } from './providers/mockRssProvider'
import { mockTrendsProvider } from './providers/mockTrendsProvider'
import { mockWebMonitoringProvider } from './providers/mockWebMonitoringProvider'

/**
 * In-process demo providers. Replace or supplement with remote aggregation via
 * {@link import.meta.env.VITE_SIGNAL_PROVIDER_MODE} = `remote`.
 */
export function getRegisteredLocalProviders(): AnySignalSourceProvider[] {
  return [
    mockNewsProvider,
    mockRssProvider,
    mockTrendsProvider,
    mockWebMonitoringProvider,
  ]
}
