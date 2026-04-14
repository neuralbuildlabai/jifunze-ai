import type { ExternalSignal } from '../../../types/signal'
import type { RssSignalProvider, SignalIngestionContext } from '../types'

function isoHoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
}

/**
 * Mock RSS-style items. Replace with feed fetch + parse running on the server.
 */
export const mockRssProvider: RssSignalProvider = {
  id: 'mock_rss_digest',
  kind: 'rss',
  async fetchSignals(context: SignalIngestionContext): Promise<ExternalSignal[]> {
    void context
    return [
      {
        id: 'mock-rss-1',
        source: 'mock_rss_digest',
        title: 'Founder letter: why we publish our impact metrics monthly',
        summary:
          'RSS-style long read excerpt: transparency cadence is becoming a retention lever for DTC brands.',
        url: 'https://example.com/blog/impact-metrics',
        published_at: isoHoursAgo(14),
        topic_tags: ['transparency', 'brand trust', 'reporting'],
        sentiment: 'positive',
      },
    ]
  },
}
