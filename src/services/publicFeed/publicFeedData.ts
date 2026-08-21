/**
 * Public latest-post feed — the controlled data layer between the cached publication store and
 * the landing page.
 *
 * Architecture (docs/social/WEBSITE_CONTENT_HUB.md + docs/IMPLEMENTATION_PLAN_2026-08-21.md §9):
 * the browser NEVER calls a social platform API. Server-side sync normalizes permitted post
 * metadata into `content_publications` (+ `content_items`), RLS exposes only display-safe rows
 * (approved + published), and this module maps them to display-safe fields. Until the social-ops
 * migration is applied and sync is connected, every state here is honestly empty/unavailable —
 * the landing page must render without live credentials.
 *
 * Display-safe fields ONLY: no tokens, no service-role access, no raw API payloads, no
 * moderation notes, no internal identifiers beyond what a public post card needs.
 */
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { getSupabaseBrowserClient } from '../../lib/supabaseClient'
import type { PillarId } from '../../social/pillars'
import type { SocialPlatformId } from '../../social/socialAccounts'

export type PublicFeedPost = {
  id: string
  platform: SocialPlatformId
  /** Canonical public permalink. Cards without one are not rendered. */
  post_url: string
  post_type: string | null
  pillar: PillarId | null
  caption_excerpt: string | null
  thumbnail_url: string | null
  video_poster_url: string | null
  published_at: string | null
  /** Permitted public counters only, as last synced. Never estimated. */
  metrics: { views?: number; likes?: number; comments?: number } | null
  featured: boolean
  last_synced_at: string | null
}

export type PublicFeedState =
  | 'loading'
  | 'live'
  | 'stale'
  | 'empty'
  | 'unavailable'
  | 'not_configured'

export type PublicFeed = {
  state: Exclude<PublicFeedState, 'loading'>
  posts: PublicFeedPost[]
  loadedAt: string
}

/** Metrics older than this are labeled stale rather than presented as current. */
const STALE_AFTER_MS = 48 * 3600_000

type PublicationRowShape = {
  id?: string | number
  platform?: string
  platform_post_url?: string | null
  post_type?: string | null
  published_at?: string | null
  last_metrics_sync_at?: string | null
  metrics?: Record<string, unknown> | null
  featured?: boolean | null
  thumbnail_url?: string | null
  video_poster_url?: string | null
  caption_excerpt?: string | null
  pillar?: string | null
}

const KNOWN_PLATFORMS: readonly string[] = [
  'instagram',
  'tiktok',
  'threads',
  'youtube',
  'facebook',
  'x',
  'linkedin',
  'pinterest',
]

function toPost(row: PublicationRowShape): PublicFeedPost | null {
  if (!row.platform_post_url || !row.platform || !KNOWN_PLATFORMS.includes(row.platform)) return null
  const metrics = row.metrics && typeof row.metrics === 'object' ? row.metrics : null
  const num = (k: string): number | undefined => {
    const v = metrics?.[k]
    return typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : undefined
  }
  return {
    id: String(row.id ?? row.platform_post_url),
    platform: row.platform as SocialPlatformId,
    post_url: row.platform_post_url,
    post_type: row.post_type ?? null,
    pillar: (row.pillar as PillarId | undefined) ?? null,
    caption_excerpt: row.caption_excerpt ?? null,
    thumbnail_url: row.thumbnail_url ?? null,
    video_poster_url: row.video_poster_url ?? null,
    published_at: row.published_at ?? null,
    metrics: metrics ? { views: num('views'), likes: num('likes'), comments: num('comments') } : null,
    featured: Boolean(row.featured),
    last_synced_at: row.last_metrics_sync_at ?? null,
  }
}

export function feedFreshness(posts: PublicFeedPost[], nowMs: number): 'live' | 'stale' {
  const newest = posts
    .map((p) => (p.last_synced_at ? Date.parse(p.last_synced_at) : NaN))
    .filter((t) => Number.isFinite(t))
    .sort((a, b) => b - a)[0]
  if (newest === undefined) return 'stale'
  return nowMs - newest > STALE_AFTER_MS ? 'stale' : 'live'
}

export async function loadPublicFeed(limit = 9): Promise<PublicFeed> {
  const loadedAt = new Date().toISOString()
  if (!isSupabaseConfigured()) {
    return { state: 'not_configured', posts: [], loadedAt }
  }

  try {
    const db = getSupabaseBrowserClient()
    const { data, error } = await db
      .from('content_publications')
      .select('*')
      .eq('status', 'published')
      .not('platform_post_url', 'is', null)
      .order('published_at', { ascending: false })
      .limit(limit * 2)

    if (error) {
      // Table absent (migration not applied) or RLS denies anonymous reads — both are the
      // honest "temporarily unavailable" state, never a fabricated feed.
      return { state: 'unavailable', posts: [], loadedAt }
    }

    const posts = ((data ?? []) as PublicationRowShape[])
      .map(toPost)
      .filter((p): p is PublicFeedPost => p !== null)
      .slice(0, limit)

    if (posts.length === 0) return { state: 'empty', posts: [], loadedAt }
    return { state: feedFreshness(posts, Date.parse(loadedAt)), posts, loadedAt }
  } catch {
    return { state: 'unavailable', posts: [], loadedAt }
  }
}
