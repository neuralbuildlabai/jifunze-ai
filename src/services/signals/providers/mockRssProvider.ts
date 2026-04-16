import type { ExternalSignal } from '../../../types/signal'
import type { RssSignalProvider, SignalIngestionContext } from '../types'
import { buildDynamicAiSignals } from '../mockAiSignalScenario'

/**
 * Mock RSS-style items — dynamic AI builder / OSS / tooling digest.
 */
export const mockRssProvider: RssSignalProvider = {
  id: 'mock_rss_digest',
  kind: 'rss',
  async fetchSignals(context: SignalIngestionContext): Promise<ExternalSignal[]> {
    const count = 2 + (Math.floor(Date.now() / 150000) % 2)
    return buildDynamicAiSignals({
      kind: 'rss',
      providerId: 'mock_rss_digest',
      sourceLabel: 'Jifunze · RSS-style digest (simulated)',
      context,
      count,
    })
  },
}
