import type { ExternalSignal } from '../../types/signal'

export type SignalIngestionContext = {
  /** ISO time the batch was requested (providers may use for pagination later). */
  fetched_at: string
}

/**
 * Discriminator for ingestion connectors.
 * Each kind can later map to different Edge workers, rate limits, and compliance rules.
 */
export type SignalProviderKind = 'news' | 'rss' | 'trends' | 'web_monitoring'

/**
 * Base contract for any signal source (news API, RSS, trends, crawled pages, etc.).
 */
export type SignalSourceProvider = {
  readonly id: string
  readonly kind: SignalProviderKind
  fetchSignals(context: SignalIngestionContext): Promise<ExternalSignal[]>
}

/** Headlines and articles from licensed news APIs or similar. */
export type NewsSignalProvider = SignalSourceProvider & { readonly kind: 'news' }

/** RSS / Atom feeds and syndication endpoints. */
export type RssSignalProvider = SignalSourceProvider & { readonly kind: 'rss' }

/** Trends indices, search interest spikes, social velocity (where ToS allows). */
export type TrendsSignalProvider = SignalSourceProvider & { readonly kind: 'trends' }

/** Public web pages, mention monitoring, competitor pages (robots.txt / site ToS apply). */
export type WebMonitoringSignalProvider = SignalSourceProvider & { readonly kind: 'web_monitoring' }

export type AnySignalSourceProvider =
  | NewsSignalProvider
  | RssSignalProvider
  | TrendsSignalProvider
  | WebMonitoringSignalProvider
