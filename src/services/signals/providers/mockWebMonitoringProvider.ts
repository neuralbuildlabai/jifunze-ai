import type { ExternalSignal } from '../../../types/signal'
import type { SignalIngestionContext, WebMonitoringSignalProvider } from '../types'

function isoHoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
}

/**
 * Mock public-page / mention style signals. Real web monitoring must respect robots.txt and site ToS.
 */
export const mockWebMonitoringProvider: WebMonitoringSignalProvider = {
  id: 'mock_web_watch',
  kind: 'web_monitoring',
  async fetchSignals(context: SignalIngestionContext): Promise<ExternalSignal[]> {
    void context
    return [
      {
        id: 'mock-web-1',
        source: 'mock_web_watch',
        title: 'Forum thread: shoppers comparing refill prices across three competitors',
        summary:
          'Synthetic “public web” snippet for demos. Production jobs should store provenance, URL, and crawl policy metadata server-side.',
        url: 'https://example.com/community/refill-prices',
        published_at: isoHoursAgo(8),
        topic_tags: ['pricing', 'competition', 'customer voice'],
        sentiment: 'neutral',
      },
    ]
  },
}
