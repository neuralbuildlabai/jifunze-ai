import type { SocialContent } from '../../types/content'

/**
 * Safely narrows unknown JSON to {@link SocialContent}, or returns null.
 */
export function parseSocialContentResponse(data: unknown): SocialContent | null {
  if (data === null || typeof data !== 'object') {
    return null
  }

  const record = data as Record<string, unknown>
  const caption = record.caption
  const hashtags = record.hashtags

  if (typeof caption !== 'string' || typeof hashtags !== 'string') {
    return null
  }

  const captionTrimmed = caption.trim()
  const hashtagsTrimmed = hashtags.trim()

  if (!captionTrimmed || !hashtagsTrimmed) {
    return null
  }

  return {
    caption: captionTrimmed,
    hashtags: hashtagsTrimmed,
  }
}

/**
 * Reads Edge `GenerateContentResponseBody['source']` without affecting {@link SocialContent}
 * validation. Absent or unknown values yield null (older servers / proxies).
 */
export function parseGenerationDeliverySource(
  data: unknown,
): 'backend_llm' | 'backend_mock' | null {
  if (data === null || typeof data !== 'object') return null
  const v = (data as Record<string, unknown>).source
  if (v === 'backend_llm' || v === 'backend_mock') return v
  return null
}
