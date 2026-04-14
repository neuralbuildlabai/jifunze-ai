import type { ExternalSignal } from '../../../types/signal'
import type { NewsSignalProvider, SignalIngestionContext } from '../types'

function isoHoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
}

/**
 * Mock news-style headlines. Replace with a licensed news API + Edge normalization.
 */
export const mockNewsProvider: NewsSignalProvider = {
  id: 'mock_news_wire',
  kind: 'news',
  async fetchSignals(context: SignalIngestionContext): Promise<ExternalSignal[]> {
    void context
    return [
      {
        id: 'mock-news-1',
        source: 'mock_news_wire',
        title: 'Retailers double down on transparent supply chains',
        summary:
          'Major retailers are publishing supplier maps and sustainability KPIs as shoppers demand proof, not promises.',
        url: 'https://example.com/news/supply-chain-transparency',
        published_at: isoHoursAgo(6),
        topic_tags: ['retail', 'sustainability', 'supply chain'],
        sentiment: 'neutral',
      },
      {
        id: 'mock-news-2',
        source: 'mock_news_wire',
        title: 'Short-form video drives discovery for new product launches',
        summary:
          'Analysts note a spike in launch-week traffic when brands pair teasers with creator-led explainers.',
        url: 'https://example.com/news/short-form-launch',
        published_at: isoHoursAgo(20),
        topic_tags: ['social', 'video', 'product launch'],
        sentiment: 'positive',
      },
    ]
  },
}
