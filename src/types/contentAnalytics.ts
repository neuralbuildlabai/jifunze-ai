/**
 * Placeholder for post-publish metrics and closed-loop learning (Edge / warehouse).
 * All fields nullable until connectors ingest real data.
 */
export type ContentAnalyticsFeedback = {
  impressions: number | null
  clicks: number | null
  /** Composite rate or score — vendor-normalized later. */
  engagement: number | null
  /** Soft signal (save, click-out, lead) — 0–1 placeholder. */
  conversion_hint: number | null
  /** How the slot performed vs typical (0–1); null = not evaluated. */
  publish_time_performance: number | null
}

export const EMPTY_CONTENT_ANALYTICS_FEEDBACK: ContentAnalyticsFeedback = {
  impressions: null,
  clicks: null,
  engagement: null,
  conversion_hint: null,
  publish_time_performance: null,
}
