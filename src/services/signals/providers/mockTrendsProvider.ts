import type { ExternalSignal } from '../../../types/signal'
import type { SignalIngestionContext, TrendsSignalProvider } from '../types'

function isoHoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
}

/**
 * Mock trends-style pulses. Replace with Trends API / approved social signals via Edge.
 */
export const mockTrendsProvider: TrendsSignalProvider = {
  id: 'mock_trends_pulse',
  kind: 'trends',
  async fetchSignals(context: SignalIngestionContext): Promise<ExternalSignal[]> {
    void context
    return [
      {
        id: 'mock-trend-1',
        source: 'mock_trends_pulse',
        title: 'Conversation spike: refillable packaging',
        summary:
          'Shoppers are comparing refill programs across categories; authenticity beats novelty in comment threads.',
        url: 'https://example.com/trends/refill-packaging',
        published_at: isoHoursAgo(2),
        topic_tags: ['packaging', 'sustainability', 'customer trust'],
        sentiment: 'positive',
      },
      {
        id: 'mock-trend-2',
        source: 'mock_trends_pulse',
        title: 'Micro-moments: “Tuesday drop” cadence trending',
        summary:
          'Midweek drops are outperforming Friday launches for engagement in lifestyle categories.',
        url: 'https://example.com/trends/tuesday-drop',
        published_at: isoHoursAgo(30),
        topic_tags: ['product launch', 'cadence', 'engagement'],
        sentiment: 'neutral',
      },
      {
        id: 'mock-trend-3',
        source: 'mock_trends_pulse',
        title: 'Industry watch: competitor positioning on “carbon neutral” claims',
        summary:
          'Regulators are scrutinizing vague climate claims; brands with third-party verification are winning trust.',
        url: 'https://example.com/trends/carbon-claims',
        published_at: isoHoursAgo(48),
        topic_tags: ['compliance', 'sustainability', 'trust'],
        sentiment: 'neutral',
      },
    ]
  },
}
