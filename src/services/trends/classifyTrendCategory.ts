import type { ExternalSignal } from '../../types/signal'
import type { TrendCategory } from '../../types/trendCategory'

const DEFAULT_CATEGORY: TrendCategory = 'cultural_moment'

/**
 * Rule-based trend typing. Swap for model-based {@link TrendCategory} classification later.
 */
export function classifyTrendCategory(
  signal: Pick<ExternalSignal, 'title' | 'summary' | 'topic_tags' | 'source'>,
): TrendCategory {
  const t = `${signal.title} ${signal.summary} ${signal.topic_tags.join(' ')}`.toLowerCase()

  if (/\b(breaking|just in|developing|live updates|news alert|urgent:|special report)\b/.test(t)) {
    return 'breaking_news'
  }

  if (
    /\b(viral audio|sound trend|tiktok sound|audio trend|capcut template|remix challenge|phonk|sped up audio)\b/.test(
      t,
    ) ||
    (/\btiktok\b/.test(t) && /\b(sound|audio)\b/.test(t))
  ) {
    return 'viral_audio'
  }

  if (/\b(meme|starter pack|internet is divided|this is fine|\bratio\b|shitpost)\b/.test(t)) {
    return 'meme'
  }

  if (
    /\b(launch|drops? today|pre-?order|now live|introducing|new collection|ships? |sku|waitlist opens)\b/.test(t)
  ) {
    return 'product_launch'
  }

  if (/\b(celebrity|red carpet|gala|a-?lister|feud|paparazzi|afterparty|award show)\b/.test(t)) {
    return 'celebrity_event'
  }

  if (
    /\b(tickets on sale|tonight at|doors at|meetup at|pop-?up at|local event|town hall|citywide)\b/.test(t)
  ) {
    return 'local_event'
  }

  if (/\b(how to|explained|why you should|guide to|learn:|tutorial:?|deep dive|whitepaper)\b/.test(t)) {
    return 'educational_topic'
  }

  if (/\b(earnings|regulator|forecast|industry report|market share|analyst|policy update|sec filing)\b/.test(t)) {
    return 'industry_update'
  }

  if (/\b(going viral|trending on|everyone is talking|challenge accepted|fyp)\b/.test(t)) {
    return 'viral_trend'
  }

  if (/\b(cultural moment|heritage month|movement|identity|community gathers|conversation about)\b/.test(t)) {
    return 'cultural_moment'
  }

  if (/\b(event|ticket|venue|conference|pop-?up)\b/.test(t)) {
    return 'local_event'
  }

  return DEFAULT_CATEGORY
}
