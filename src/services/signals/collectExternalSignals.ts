import type { ExternalSignal } from '../../types/signal'
import { getSignalProviderMode } from '../../config/signalIngestionEnv'
import { fetchSignalsFromRemoteAggregate } from './remoteSignalsClient'
import { getRegisteredLocalProviders } from './providerRegistry'
import type { SignalIngestionContext } from './types'

export type CollectExternalSignalsResult =
  | { status: 'ok'; signals: ExternalSignal[] }
  | { status: 'error'; reason: string; source: 'remoteSignalsClient' }

/**
 * Aggregates signals from enabled sources.
 *
 * - **mock** (default): parallel fetch from local {@link getRegisteredLocalProviders}.
 * - **remote**: POST to {@link import.meta.env.VITE_SIGNAL_INGESTION_URL}; failures return explicit errors (no silent []).
 */
export async function collectExternalSignals(
  context: SignalIngestionContext,
): Promise<CollectExternalSignalsResult> {
  const mode = getSignalProviderMode()

  if (mode === 'remote') {
    const r = await fetchSignalsFromRemoteAggregate(context)
    if (r.status === 'error') return r
    return { status: 'ok', signals: r.signals }
  }

  const providers = getRegisteredLocalProviders()
  const batches = await Promise.all(providers.map((p) => p.fetchSignals(context)))
  return { status: 'ok', signals: batches.flat() }
}
