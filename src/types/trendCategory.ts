/**
 * Focused trend / signal shapes for prioritization and copy tone.
 * Replace rule-based {@link classifyTrendCategory} with ML later without changing ids.
 */
export type TrendCategory =
  | 'breaking_news'
  | 'product_launch'
  | 'viral_trend'
  | 'meme'
  | 'viral_audio'
  | 'celebrity_event'
  | 'cultural_moment'
  | 'local_event'
  | 'educational_topic'
  | 'industry_update'
