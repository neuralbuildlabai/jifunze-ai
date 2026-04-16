import type { ExternalSignal } from '../../../types/signal'
import type { NewsSignalProvider, SignalIngestionContext } from '../types'
import { buildDynamicAiSignals } from '../mockAiSignalScenario'

/**
 * Mock news-style headlines — dynamic AI / product / policy wire (demo only).
 */
export const mockNewsProvider: NewsSignalProvider = {
  id: 'mock_news_wire',
  kind: 'news',
  async fetchSignals(context: SignalIngestionContext): Promise<ExternalSignal[]> {
    const count = 2 + (Math.floor(Date.now() / 180000) % 2)
    return buildDynamicAiSignals({
      kind: 'news',
      providerId: 'mock_news_wire',
      sourceLabel: 'Jifunze · Synthetic news wire',
      context,
      count,
    })
  },
}
