import type { ExternalSignal } from '../../types/signal'

/**
 * Canonicalizes provider payloads before guards and scoring.
 * Remote responses should pass through here once JSON is parsed.
 */
export function normalizeExternalSignals(signals: ExternalSignal[]): ExternalSignal[] {
  return signals.map((signal) => ({
    ...signal,
    title: signal.title.trim(),
    summary: signal.summary.trim(),
    url: signal.url.trim(),
    topic_tags: signal.topic_tags.map((t) => t.trim()).filter(Boolean),
    source_label: signal.source_label?.trim() || undefined,
    signal_strength:
      typeof signal.signal_strength === 'number' && Number.isFinite(signal.signal_strength)
        ? Math.min(1, Math.max(0, signal.signal_strength))
        : undefined,
  }))
}
