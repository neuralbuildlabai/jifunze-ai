export type SignalProviderMode = 'mock' | 'remote'

export function getSignalProviderMode(): SignalProviderMode {
  const explicit = import.meta.env.VITE_SIGNAL_MODE?.toLowerCase().trim()
  if (explicit === 'remote' || explicit === 'mock') {
    return explicit === 'remote' ? 'remote' : 'mock'
  }
  const raw = import.meta.env.VITE_SIGNAL_PROVIDER_MODE?.toLowerCase().trim()
  return raw === 'remote' ? 'remote' : 'mock'
}

export function isTrendOpportunitiesEnabled(): boolean {
  const raw = import.meta.env.VITE_ENABLE_TREND_OPPORTUNITIES
  if (raw === undefined || raw === '') return true
  return raw === 'true' || raw === '1'
}

export function getSignalIngestionUrl(): string | undefined {
  const url = import.meta.env.VITE_SIGNAL_INGESTION_URL?.trim()
  return url || undefined
}
