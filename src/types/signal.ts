import type { ContentDomain } from './contentDomain'
import type { TrendCategory } from './trendCategory'

/** Identifies which connector produced a signal (mock or future RSS, news API, etc.). */
export type SignalSourceId = string

/**
 * Normalized internal representation of an external item (article, trend spike, thread, etc.).
 * Providers map their payloads into this shape before relevance scoring.
 */
export type ExternalSignal = {
  id: string
  source: SignalSourceId
  title: string
  summary: string
  url: string
  /** ISO 8601 */
  published_at: string
  topic_tags: string[]
  sentiment?: 'positive' | 'neutral' | 'negative'
  /** Set by {@link classifySignal} in the orchestrator (one of five Jifunze domains). */
  classified_domain?: ContentDomain
  /** Set by {@link classifyTrendCategory} in the orchestrator. */
  classified_trend_category?: TrendCategory
  /** Filled by the relevance engine (0–1). */
  relevance_score?: number
  /** Derived recency score (0–1). */
  freshness_score?: number
}
