import type { ExternalSignal } from '../../../types/signal'
import type { SignalIngestionContext, TrendsSignalProvider } from '../types'
import { buildDynamicAiSignals } from '../mockAiSignalScenario'

/**
 * Mock trends-style pulses — dynamic, AI-educator oriented (rotates with each fetch).
 */
export const mockTrendsProvider: TrendsSignalProvider = {
  id: 'mock_trends_pulse',
  kind: 'trends',
  async fetchSignals(context: SignalIngestionContext): Promise<ExternalSignal[]> {
    const count = 4 + (Math.floor(Date.now() / 120000) % 2)
    return buildDynamicAiSignals({
      kind: 'trends',
      providerId: 'mock_trends_pulse',
      sourceLabel: 'Jifunze · Synthetic trends desk',
      context,
      count,
    })
  },
}
