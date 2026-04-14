import type { ContentDomain } from '../../types/contentDomain'
import type { ExternalSignal } from '../../types/signal'

const DEFAULT_DOMAIN: ContentDomain = 'lifestyle'

/**
 * Keyword routing into one of the five Jifunze domains. Replace with ML later; contract stays stable.
 */
export function classifySignal(
  signal: Pick<ExternalSignal, 'title' | 'summary' | 'topic_tags'>,
): ContentDomain {
  const t = `${signal.title} ${signal.summary} ${signal.topic_tags.join(' ')}`.toLowerCase()

  if (
    /\b(ai|ml|llm|gpt|openai|anthropic|model weights|neural|gpu|cuda|api|saas|software|developer|devops|kubernetes|typescript|javascript|python|chip|semiconductor|startup tech|machine learning)\b/.test(
      t,
    )
  ) {
    return 'ai'
  }

  if (
    /\b(beauty|skincare|makeup|cosmetic|serum|spf|retinol|moisturi|foundation|lip|lash|derm|aesthetic|self-care|wellness routine|glow)\b/.test(
      t,
    )
  ) {
    return 'beauty'
  }

  if (
    /\b(music|album|single|remix|dj|festival|tour|billboard|spotify|soundcloud|track|lyrics|snippet|viral sound|audiotrend)\b/.test(
      t,
    )
  ) {
    return 'music'
  }

  if (
    /\b(movie|film|cinema|streaming|netflix|hbo|show|season|episode|celebrity|fandom|trailer|oscar|grammy|entertainment|viral clip|creator drama)\b/.test(
      t,
    )
  ) {
    return 'entertainment'
  }

  if (
    /\b(lifestyle|home|routine|productivity|travel|morning routine|haul|aesthetic vlog|day in the life)\b/.test(t)
  ) {
    return 'lifestyle'
  }

  return DEFAULT_DOMAIN
}
