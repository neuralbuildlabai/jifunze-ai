/** Heuristic 0–1 source trust until connectors expose explicit quality scores. */
const SOURCE_QUALITY: Record<string, number> = {
  mock_news_wire: 0.9,
  mock_rss_digest: 0.88,
  mock_trends_pulse: 0.74,
  mock_web_watch: 0.68,
}

export function inferSourceQuality(sourceId: string): number {
  return SOURCE_QUALITY[sourceId] ?? 0.72
}
