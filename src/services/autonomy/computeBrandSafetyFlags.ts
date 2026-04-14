import type { BrandProfile } from '../../types/brand'
import type { BrandSafetyFlags } from '../../types/autonomy'

function containsPhrase(haystack: string, phrase: string): boolean {
  const p = phrase.trim().toLowerCase()
  return p.length > 1 && haystack.toLowerCase().includes(p)
}

export function computeBrandSafetyFlags(
  brand: BrandProfile,
  haystack: string,
): BrandSafetyFlags {
  const h = haystack
  const banned_topic_match = brand.banned_topics.some((t) => containsPhrase(h, t))
  const competitor_mention = brand.competitor_keywords.some((t) => containsPhrase(h, t))
  const sens = brand.sensitive_review_keywords ?? []
  const sensitive_topic_match = sens.some((t) => containsPhrase(h, t))
  return { banned_topic_match, competitor_mention, sensitive_topic_match }
}
