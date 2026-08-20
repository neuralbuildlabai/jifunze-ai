/**
 * The canonical content ledger.
 *
 * One record per piece of Jifunze.ai content, whatever surface it ends up on. The ledger — not
 * any platform — is the source of truth. Platform APIs only *enrich* a record with publication
 * results and metrics; nothing here is ever created by scraping a platform.
 *
 * Two kinds of record exist:
 *   1. Website guides (`source_type: 'evergreen'`) — published here, as readable text.
 *   2. Engine-produced items (`source_type: 'engine'`) — briefed, rendered and published to
 *      platforms by the autonomous loop, then written back into `content_items` in Postgres.
 *
 * The public site renders only records that are BOTH `approval_status: 'approved'` and
 * `publication_status: 'published'`.
 */
import { CANONICAL_ORIGIN } from './brand.ts'
import { GUIDES, GUIDE_LIBRARY_DATE, type Guide } from './guides.ts'
import type { PillarId } from './pillars.ts'
import type { SocialPlatformId } from './socialAccounts.ts'

export type PublicationStatus = 'draft' | 'scheduled' | 'published' | 'retracted'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected'
export type ContentSourceType = 'evergreen' | 'engine'
export type ContentSafetyStatus = 'ok' | 'review' | 'blocked'

/** Where a claim in a content item came from. Attribution is never optional for news-derived items. */
export type ContentSource = {
  /** Publisher or feed name, as it should be shown to a reader. */
  attribution: string
  url: string
  retrieved_at?: string
}

/** One record of this content appearing on one platform. */
export type ContentPublication = {
  platform: SocialPlatformId
  /** Platform-assigned post id. Unique per (platform, post_id) — the duplicate guard. */
  platform_post_id: string | null
  /** Canonical permalink to the post. */
  platform_post_url: string | null
  status: 'queued' | 'publishing' | 'published' | 'failed' | 'skipped'
  published_at: string | null
  /** Last time metrics for this post were refreshed. Drives the "stale" label in the UI. */
  last_metrics_sync_at: string | null
  /** Public engagement counters as last synced. Never estimated, never back-filled. */
  metrics?: {
    views?: number
    likes?: number
    comments?: number
    shares?: number
    saves?: number
  }
  /** Human-readable failure summary. Never contains a token or secret. */
  error_summary?: string | null
}

export type ContentItem = {
  id: string
  slug: string
  title: string
  summary: string
  /** Accessible full text — the transcript for a video, the steps for a guide. */
  body: readonly string[]
  pillar: PillarId
  source_type: ContentSourceType
  /** Original signal URL, when the item was derived from one. */
  original_source_url: string | null
  sources: readonly ContentSource[]
  /** Version stamps so a record can be traced back to the brief and script that produced it. */
  brief_version: string | null
  script_version: string | null
  video_asset_ref: string | null
  thumbnail_url: string | null
  caption: string | null
  hashtags: readonly string[]
  publication_status: PublicationStatus
  approval_status: ApprovalStatus
  published_at: string | null
  publications: readonly ContentPublication[]
  safety_status: ContentSafetyStatus
  /** Set when a published item was corrected or withdrawn. Shown to readers. */
  correction_note: string | null
  seo: {
    canonical_url: string
    meta_title: string
    meta_description: string
  }
}

export function guideToContentItem(guide: Guide): ContentItem {
  return {
    id: guide.id,
    slug: guide.slug,
    title: guide.title,
    summary: guide.summary,
    body: guide.steps,
    pillar: guide.pillar,
    source_type: 'evergreen',
    original_source_url: null,
    sources: [],
    brief_version: null,
    script_version: null,
    video_asset_ref: null,
    thumbnail_url: null,
    caption: guide.summary,
    hashtags: [],
    publication_status: 'published',
    approval_status: 'approved',
    published_at: GUIDE_LIBRARY_DATE,
    publications: [],
    safety_status: 'ok',
    correction_note: null,
    seo: {
      canonical_url: `${CANONICAL_ORIGIN}/content/${guide.slug}`,
      meta_title: `${guide.title} — Jifunze.ai`,
      meta_description: guide.summary,
    },
  }
}

/** Every ledger record the public site may render, newest-relevant first. */
export const PUBLIC_CONTENT: readonly ContentItem[] = GUIDES.map(guideToContentItem)

export function isPubliclyVisible(item: ContentItem): boolean {
  return item.approval_status === 'approved' && item.publication_status === 'published'
}

export function publicContent(items: readonly ContentItem[] = PUBLIC_CONTENT): ContentItem[] {
  return items.filter(isPubliclyVisible)
}

export function contentBySlug(
  slug: string | undefined,
  items: readonly ContentItem[] = PUBLIC_CONTENT,
): ContentItem | undefined {
  if (!slug) return undefined
  return publicContent(items).find((i) => i.slug === slug)
}

export function contentForPillar(
  pillar: PillarId,
  items: readonly ContentItem[] = PUBLIC_CONTENT,
): ContentItem[] {
  return publicContent(items).filter((i) => i.pillar === pillar)
}

export function relatedContent(
  item: ContentItem,
  limit = 3,
  items: readonly ContentItem[] = PUBLIC_CONTENT,
): ContentItem[] {
  const pool = publicContent(items).filter((i) => i.id !== item.id)
  const samePillar = pool.filter((i) => i.pillar === item.pillar)
  const rest = pool.filter((i) => i.pillar !== item.pillar)
  return [...samePillar, ...rest].slice(0, limit)
}

/** Live platform posts recorded against a ledger item, for the "where to find this" links. */
export function publishedPlatformLinks(item: ContentItem): ContentPublication[] {
  return item.publications.filter((p) => p.status === 'published' && Boolean(p.platform_post_url))
}
