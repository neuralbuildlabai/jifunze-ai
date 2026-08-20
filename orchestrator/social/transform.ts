/**
 * Content transformation: one canonical item becomes N platform-specific variants.
 *
 * The same caption everywhere is lazy and reads badly. These rules preserve the core meaning,
 * the source accuracy, the audience fit, the brand voice and the approved tagline, while
 * respecting each platform's limits and conventions.
 *
 * The rules are pure functions so `scripts/test-social-ops.ts` can assert them without a network.
 */
import type { PlatformId } from '../../src/social/platformMatrix.ts'
import { findProhibitedClaims } from '../../src/social/brand.ts'
import type { PlatformVariant, PublishableContent } from './types.ts'

type Limits = {
  /** Hard character limit for the caption body. */
  caption: number
  /** Hard character limit for a title/headline, when the platform has one. */
  title: number | null
  /** How many hashtags read as natural here. */
  hashtags: number
  /** May a URL appear in the post body? */
  linkInBody: boolean
  /** Do hashtags conventionally go in a first comment instead of the body? */
  hashtagsInFirstComment: boolean
  /** Required media shape, as prose shown to the operator. */
  media: string
}

export const PLATFORM_LIMITS: Record<PlatformId, Limits> = {
  instagram: {
    caption: 2200,
    title: null,
    hashtags: 5,
    linkInBody: false,
    hashtagsInFirstComment: true,
    media: 'Vertical video 9:16, 1080x1920, 3–90s for Reels. MP4/MOV, H.264 + AAC.',
  },
  facebook: {
    caption: 5000,
    title: null,
    hashtags: 3,
    linkInBody: true,
    hashtagsInFirstComment: false,
    media: 'Vertical video 9:16 for Reels, or 1:1 / 4:5 for feed video.',
  },
  threads: {
    caption: 500,
    title: null,
    hashtags: 1,
    linkInBody: true,
    hashtagsInFirstComment: false,
    media: 'Vertical video up to 5 minutes, or a still image.',
  },
  tiktok: {
    caption: 2200,
    title: null,
    hashtags: 5,
    linkInBody: false,
    hashtagsInFirstComment: false,
    media: 'Vertical video 9:16, 1080x1920, 3s–10min. MP4/MOV/WEBM.',
  },
  youtube: {
    caption: 5000,
    title: 100,
    hashtags: 3,
    linkInBody: true,
    hashtagsInFirstComment: false,
    media: 'Vertical video 9:16 up to 3 minutes to qualify as a Short.',
  },
  linkedin: {
    caption: 3000,
    title: null,
    hashtags: 3,
    linkInBody: true,
    hashtagsInFirstComment: false,
    media: 'Vertical or square video; 9:16 is accepted and plays well in feed.',
  },
  x: {
    caption: 280,
    title: null,
    hashtags: 2,
    linkInBody: true,
    hashtagsInFirstComment: false,
    media: 'Video up to 2:20 on the standard tier.',
  },
  pinterest: {
    caption: 500,
    title: 100,
    hashtags: 0,
    linkInBody: true,
    hashtagsInFirstComment: false,
    media: 'Still image or video Pin, 2:3 or 9:16. A still cover is required.',
  },
  telegram: {
    caption: 1024,
    title: null,
    hashtags: 2,
    linkInBody: true,
    hashtagsInFirstComment: false,
    media: 'Video up to 2GB. No aspect-ratio requirement.',
  },
  whatsapp_channel: {
    caption: 4096,
    title: null,
    hashtags: 0,
    linkInBody: true,
    hashtagsInFirstComment: false,
    media: 'Whatever the phone can send. Posted by a person.',
  },
}

/** Trim to `limit` on a word boundary, never mid-word, never with a dangling separator. */
export function trimToLimit(text: string, limit: number): string {
  const clean = text.trim().replace(/\s+/g, ' ')
  if (clean.length <= limit) return clean
  const cut = clean.slice(0, limit)
  const lastSpace = cut.lastIndexOf(' ')
  const body = lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut
  return body.replace(/[\s,;:.\-–—]+$/, '')
}

function normaliseHashtags(tags: readonly string[], max: number): string[] {
  if (max <= 0) return []
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of tags) {
    const tag = `#${raw.replace(/[^A-Za-z0-9]/g, '')}`
    if (tag.length <= 1) continue
    const key = tag.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(tag)
    if (out.length >= max) break
  }
  return out
}

/** Alt text for the media. Describes what is on screen, not what we wish were on screen. */
export function buildAltText(content: PublishableContent): string {
  const beats = content.body.slice(0, 3).join('. ')
  const base = content.video_url
    ? `Vertical video with on-screen captions. ${content.title}. ${beats}`
    : `${content.title}. ${beats}`
  return trimToLimit(base, 420)
}

/**
 * A call to action is only eligible when there is a real, verified destination for it.
 * The Kazi Kit does not exist, so `permalink` must be a live jifunze.ai URL or there is no CTA.
 */
export function ctaEligible(content: PublishableContent): boolean {
  if (!content.permalink) return false
  return /^https:\/\/(www\.)?jifunze\.ai\//.test(content.permalink)
}

export function transformForPlatform(
  content: PublishableContent,
  platform: PlatformId,
): PlatformVariant {
  const limits = PLATFORM_LIMITS[platform]
  const warnings: string[] = []

  const hashtags = normaliseHashtags(content.hashtags, limits.hashtags)
  const inlineTags = limits.hashtagsInFirstComment ? [] : hashtags
  const firstCommentTags = limits.hashtagsInFirstComment ? hashtags : []

  const cta = limits.linkInBody && ctaEligible(content) ? `\n\nFull steps: ${content.permalink}` : ''
  if (limits.linkInBody && !ctaEligible(content)) {
    warnings.push('No verified destination — the post ships without a link rather than promising one.')
  }

  const tagSuffix = inlineTags.length ? `\n\n${inlineTags.join(' ')}` : ''
  const reserved = cta.length + tagSuffix.length
  const captionBody = trimToLimit(content.caption, Math.max(limits.caption - reserved, 40))
  const caption = `${captionBody}${cta}${tagSuffix}`

  if (caption.length > limits.caption) {
    warnings.push(`Caption exceeds the ${limits.caption}-character limit after assembly.`)
  }

  const title = limits.title ? trimToLimit(content.title, limits.title) : null

  if (!content.video_url && platform !== 'x' && platform !== 'threads') {
    warnings.push('No rendered video for a video-first platform.')
  }
  if (platform === 'pinterest' && !content.thumbnail_url) {
    warnings.push('Pinterest needs a still cover image; none is attached.')
  }

  const prohibited = findProhibitedClaims(caption)
  if (prohibited.length) {
    warnings.push(`Prohibited claim in caption: ${prohibited.join(', ')}`)
  }

  return {
    platform,
    title,
    caption,
    hashtags,
    firstComment: firstCommentTags.length ? firstCommentTags.join(' ') : null,
    altText: buildAltText(content),
    linkAllowed: limits.linkInBody,
    warnings,
  }
}

export function transformForAll(
  content: PublishableContent,
  platforms: readonly PlatformId[],
): PlatformVariant[] {
  return platforms.map((p) => transformForPlatform(content, p))
}
