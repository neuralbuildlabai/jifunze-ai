import type { ExternalSignal } from '../../../types/signal'
import type { SignalIngestionContext, WebMonitoringSignalProvider } from '../types'
import { buildDynamicAiSignals } from '../mockAiSignalScenario'

/**
 * Mock public-page / community signals — dynamic forums & repo discussions (simulated).
 */
export const mockWebMonitoringProvider: WebMonitoringSignalProvider = {
  id: 'mock_web_watch',
  kind: 'web_monitoring',
  async fetchSignals(context: SignalIngestionContext): Promise<ExternalSignal[]> {
    const count = 2 + (Math.floor(Date.now() / 200000) % 2)
    return buildDynamicAiSignals({
      kind: 'web_monitoring',
      providerId: 'mock_web_watch',
      sourceLabel: 'Jifunze · Web/community monitor (simulated)',
      context,
      count,
    })
  },
}
