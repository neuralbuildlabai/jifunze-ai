import type { AdaptationPlatformId } from '../../types/adaptationPlatform'

/** Map UI / ingest labels to supported adaptation surfaces. */
export function mapSuggestedPlatformLabel(label: string): AdaptationPlatformId | undefined {
  const l = label.trim().toLowerCase()
  if (l.includes('tiktok')) return 'tiktok'
  if (l.includes('instagram') || l === 'ig') return 'instagram'
  if (l.includes('facebook') || l === 'fb' || l.includes('meta')) return 'facebook'
  if (l === 'x' || l.includes('twitter')) return 'x'
  return undefined
}

export function firstAdaptationPlatformFromSuggestions(
  suggested: string[],
): AdaptationPlatformId | undefined {
  for (const label of suggested) {
    const m = mapSuggestedPlatformLabel(label)
    if (m) return m
  }
  return undefined
}
