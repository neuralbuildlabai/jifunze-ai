import { getSignalIngestionUrl } from '../../config/signalIngestionEnv'
import type { ContentDomain } from '../../types/contentDomain'
import type { ExternalSignal } from '../../types/signal'
import type { TrendCategory } from '../../types/trendCategory'
import type { SignalIngestionContext } from './types'
import { normalizeExternalSignals } from './normalizeSignals'

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}

const ZURI_DOMAINS = new Set<ContentDomain>(['ai', 'beauty', 'lifestyle', 'entertainment', 'music'])

const ZURI_TRENDS = new Set<TrendCategory>([
  'breaking_news',
  'product_launch',
  'viral_trend',
  'meme',
  'viral_audio',
  'celebrity_event',
  'cultural_moment',
  'local_event',
  'educational_topic',
  'industry_update',
])

function parseClassifiedDomain(value: unknown): ContentDomain | undefined {
  if (typeof value !== 'string') return undefined
  return ZURI_DOMAINS.has(value as ContentDomain) ? (value as ContentDomain) : undefined
}

function parseClassifiedTrend(value: unknown): TrendCategory | undefined {
  if (typeof value !== 'string') return undefined
  return ZURI_TRENDS.has(value as TrendCategory) ? (value as TrendCategory) : undefined
}

/**
 * Best-effort parse for a future Edge response. Returns [] if shape is unknown.
 */
function parseSignalsPayload(data: unknown): ExternalSignal[] {
  if (!Array.isArray(data)) return []
  const out: ExternalSignal[] = []
  for (const item of data) {
    if (!isRecord(item)) continue
    const id = item.id
    const source = item.source
    const title = item.title
    const summary = item.summary
    const url = item.url
    const published_at = item.published_at
    const topic_tags = item.topic_tags
    if (
      typeof id !== 'string' ||
      typeof source !== 'string' ||
      typeof title !== 'string' ||
      typeof summary !== 'string' ||
      typeof url !== 'string' ||
      typeof published_at !== 'string' ||
      !Array.isArray(topic_tags) ||
      !topic_tags.every((t) => typeof t === 'string')
    ) {
      continue
    }
    const sentiment = item.sentiment
    const base: ExternalSignal = {
      id,
      source,
      title,
      summary,
      url,
      published_at,
      topic_tags,
    }
    if (sentiment === 'positive' || sentiment === 'neutral' || sentiment === 'negative') {
      base.sentiment = sentiment
    }
    const classified = parseClassifiedDomain(item.classified_domain)
    if (classified) {
      base.classified_domain = classified
    }
    const trend = parseClassifiedTrend(item.classified_trend_category)
    if (trend) {
      base.classified_trend_category = trend
    }
    out.push(base)
  }
  return out
}

/**
 * Fetches pre-aggregated signals from your backend (recommended for production).
 * The browser should not scrape third-party sites directly at scale.
 */
export async function fetchSignalsFromRemoteAggregate(
  context: SignalIngestionContext,
): Promise<ExternalSignal[]> {
  const url = getSignalIngestionUrl()
  if (!url) {
    return []
  }

  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fetched_at: context.fetched_at }),
    })
  } catch {
    return []
  }

  if (!response.ok) {
    return []
  }

  const text = await response.text()
  if (!text.trim()) return []

  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return []
  }

  const raw = parseSignalsPayload(parsed)
  return normalizeExternalSignals(raw)
}
