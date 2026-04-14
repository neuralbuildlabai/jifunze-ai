import type { ExternalSignal } from '../../types/signal'
import { getSignalProviderMode } from '../../config/signalIngestionEnv'
import { fetchSignalsFromRemoteAggregate } from './remoteSignalsClient'
import { getRegisteredLocalProviders } from './providerRegistry'
import type { SignalIngestionContext } from './types'

/**
 * Aggregates signals from enabled sources.
 *
 * - **mock** (default): parallel fetch from local {@link getRegisteredLocalProviders}.
 * - **remote**: POST to {@link import.meta.env.VITE_SIGNAL_INGESTION_URL}; returns [] if unset or on failure.
 *
 * Production note: heavy ingestion belongs on the server; this entry stays a thin client.
 */
export async function collectExternalSignals(
  context: SignalIngestionContext,
): Promise<ExternalSignal[]> {
  const mode = getSignalProviderMode()

  if (mode === 'remote') {
    return fetchSignalsFromRemoteAggregate(context)
  }

  const providers = getRegisteredLocalProviders()
  const batches = await Promise.all(providers.map((p) => p.fetchSignals(context)))
  return batches.flat()
}
