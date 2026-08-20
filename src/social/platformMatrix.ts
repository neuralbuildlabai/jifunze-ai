/**
 * The platform capability + readiness matrix — one source of truth shared by the publishing
 * adapters (`orchestrator/social/`), the two-hour metrics sync and the `/admin/social-ops`
 * dashboard.
 *
 * `readiness` is a statement about what is TRUE TODAY, not about what the code could do. An
 * adapter whose code is finished but which has no credentials is `credentials_missing`, never
 * `ready` — pretending otherwise is how an operator ends up trusting a channel that cannot post.
 *
 * This file contains no secrets: only public API names, scope names, documented limits and costs.
 */

export type PlatformId =
  | 'instagram'
  | 'facebook'
  | 'threads'
  | 'tiktok'
  | 'youtube'
  | 'linkedin'
  | 'x'
  | 'pinterest'
  | 'telegram'
  | 'whatsapp_channel'

export type Readiness =
  /** Credentials exist, the API is approved, the adapter works end to end. */
  | 'ready'
  /** The adapter is written; a developer app, OAuth token or account link is missing. */
  | 'credentials_missing'
  /** A platform review/audit must be passed before real publishing is possible. */
  | 'api_approval_required'
  /** The API works but costs money per call or per post. Blocked by the no-spend rule. */
  | 'paid_access_required'
  /** No usable publishing API exists. A human posts it. */
  | 'manual_only'
  /** Not supported and not planned. */
  | 'unsupported'

export type PlatformCapability = {
  id: PlatformId
  label: string
  /** Can the metrics sync read account-level numbers? */
  readsAccountMetrics: boolean
  /** Can the metrics sync read per-post numbers? */
  readsPostMetrics: boolean
  /** Can the publishing adapter create a post through an official API? */
  canPublish: boolean
  readiness: Readiness
  /** Official API this adapter targets. */
  api: string
  /** OAuth scopes / permissions required. Names only — never values. */
  scopes: readonly string[]
  /** Names of the server-side environment variables this adapter needs. Never values. */
  envVars: readonly string[]
  /** Documented publishing limit, as prose. */
  publishLimit: string
  /** What it costs to operate. `$0` where the API is free at this scale. */
  cost: string
  /** The single sentence an operator needs: what is blocking this platform right now. */
  blocker: string
}

export const PLATFORM_MATRIX: readonly PlatformCapability[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    readsAccountMetrics: true,
    readsPostMetrics: true,
    canPublish: true,
    readiness: 'ready',
    api: 'Instagram Graph API (Content Publishing + Insights)',
    scopes: [
      'instagram_basic',
      'instagram_content_publish',
      'instagram_manage_insights',
      'pages_show_list',
      'pages_read_engagement',
    ],
    envVars: ['IG_ACCESS_TOKEN', 'IG_USER_ID', 'IG_PUBLISH_ENABLED', 'PUBLISH_SECRET'],
    publishLimit:
      'Rolling 24h cap per account — read content_publishing_limit before each run rather than assuming a constant.',
    cost: '$0',
    blocker:
      'None for reads. Publishing stays off until IG_PUBLISH_ENABLED is "true" and a human has approved the first live post.',
  },
  {
    id: 'facebook',
    label: 'Facebook Page',
    readsAccountMetrics: true,
    readsPostMetrics: true,
    canPublish: true,
    readiness: 'credentials_missing',
    api: 'Facebook Graph API — Pages',
    scopes: [
      'pages_manage_posts',
      'pages_read_engagement',
      'pages_manage_metadata',
      'pages_show_list',
    ],
    envVars: ['FB_PAGE_ID', 'FB_PAGE_ACCESS_TOKEN'],
    publishLimit: 'Standard Page posting limits; no separate publishing cap at this volume.',
    cost: '$0',
    blocker:
      'Same Meta app as Instagram, but no Page access token has been issued to the server yet.',
  },
  {
    id: 'threads',
    label: 'Threads',
    readsAccountMetrics: true,
    readsPostMetrics: true,
    canPublish: true,
    readiness: 'api_approval_required',
    api: 'Threads API',
    scopes: ['threads_basic', 'threads_content_publish', 'threads_manage_insights'],
    envVars: ['THREADS_USER_ID', 'THREADS_ACCESS_TOKEN'],
    publishLimit: 'Per-user daily post cap documented by Meta; well above this volume.',
    cost: '$0',
    blocker:
      'Needs its own Meta app with the Threads use case (the Instagram app id does not work), plus app review before non-tester accounts can grant publishing scopes.',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    readsAccountMetrics: true,
    readsPostMetrics: true,
    canPublish: true,
    readiness: 'api_approval_required',
    api: 'TikTok Content Posting API + Display API',
    scopes: ['user.info.basic', 'video.upload', 'video.publish'],
    envVars: ['TIKTOK_CLIENT_KEY', 'TIKTOK_CLIENT_SECRET', 'TIKTOK_REFRESH_TOKEN'],
    publishLimit:
      'Unaudited clients force every posted video to SELF_ONLY (private) and serve at most 5 users per 24h.',
    cost: '$0',
    blocker:
      'No developer app, and no sign-in access to @jifunze_ai from the operating machine. Client audit required before anything posted through the API can be public.',
  },
  {
    id: 'youtube',
    label: 'YouTube Shorts',
    readsAccountMetrics: true,
    readsPostMetrics: true,
    canPublish: true,
    readiness: 'api_approval_required',
    api: 'YouTube Data API v3 + YouTube Analytics API',
    scopes: [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/yt-analytics.readonly',
    ],
    envVars: ['YOUTUBE_CLIENT_ID', 'YOUTUBE_CLIENT_SECRET', 'YOUTUBE_REFRESH_TOKEN', 'YOUTUBE_CHANNEL_ID'],
    publishLimit:
      'Default quota 10,000 units/day; videos.insert costs ~1,600 units, so roughly 6 uploads/day before the quota, not the call cap, bites.',
    cost: '$0',
    blocker:
      'No Google Cloud project or OAuth client. While the consent screen is in Testing, refresh tokens expire after 7 days. Extra quota and public uploads need the YouTube API compliance audit.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    readsAccountMetrics: true,
    readsPostMetrics: true,
    canPublish: true,
    readiness: 'api_approval_required',
    api: 'LinkedIn Community Management API (Posts + Organization analytics)',
    scopes: ['w_organization_social', 'r_organization_social', 'rw_organization_admin'],
    envVars: ['LINKEDIN_CLIENT_ID', 'LINKEDIN_CLIENT_SECRET', 'LINKEDIN_REFRESH_TOKEN', 'LINKEDIN_ORG_URN'],
    publishLimit: 'Development Tier: 500 requests per app, 100 per member, per day.',
    cost: '$0',
    blocker:
      'No developer app verified against the Page. Community Management API is a vetted product: Development Tier first, then a screencast review for Standard Tier.',
  },
  {
    id: 'x',
    label: 'X',
    readsAccountMetrics: true,
    readsPostMetrics: true,
    canPublish: true,
    readiness: 'paid_access_required',
    api: 'X API v2',
    scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    envVars: ['X_CLIENT_ID', 'X_CLIENT_SECRET', 'X_REFRESH_TOKEN'],
    publishLimit: 'Governed by prepaid credits rather than a rate cap at this volume.',
    cost:
      'Not free. Pay-per-use since 2026 — roughly $0.015 per post, and about $0.200 when the post contains a link. One daily link post is about $6/month before any read calls.',
    blocker:
      'Blocked by the no-spend rule. X is manual-post-only until there is an explicit budget decision.',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    readsAccountMetrics: true,
    readsPostMetrics: true,
    canPublish: true,
    readiness: 'api_approval_required',
    api: 'Pinterest API v5',
    scopes: ['boards:read', 'boards:write', 'pins:read', 'pins:write', 'user_accounts:read'],
    envVars: ['PINTEREST_APP_ID', 'PINTEREST_APP_SECRET', 'PINTEREST_REFRESH_TOKEN'],
    publishLimit: 'Trial access creates sandbox Pins visible only to the creator.',
    cost: '$0',
    blocker:
      'No developer app. Trial → Standard access needs a working OAuth flow, a published privacy policy and a screen recording of a real API action. Domain claim also needs the verification tag deployed.',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    readsAccountMetrics: true,
    readsPostMetrics: false,
    canPublish: true,
    readiness: 'credentials_missing',
    api: 'Telegram Bot API',
    scopes: [],
    envVars: ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHANNEL_ID'],
    publishLimit: '~30 messages/second overall, ~20 messages/minute to one chat.',
    cost: '$0',
    blocker:
      'The channel and the bot do not exist yet and creating them needs owner approval. No app review and no cost once they do.',
  },
  {
    id: 'whatsapp_channel',
    label: 'WhatsApp Channel',
    readsAccountMetrics: false,
    readsPostMetrics: false,
    canPublish: false,
    readiness: 'manual_only',
    api: 'None — Channels are not part of any WhatsApp Business Platform API',
    scopes: [],
    envVars: [],
    publishLimit: 'n/a',
    cost: '$0',
    blocker:
      'No official Channel API exists. Every update is posted from a phone by a person. Third-party "Channel API" vendors drive an unofficial client and risk the number being banned — do not use them.',
  },
] as const

const BY_ID = new Map<PlatformId, PlatformCapability>(PLATFORM_MATRIX.map((p) => [p.id, p]))

export function platformCapability(id: PlatformId): PlatformCapability {
  const found = BY_ID.get(id)
  if (!found) throw new Error(`Unknown platform: ${id}`)
  return found
}

/** Platforms the two-hour sync should attempt at all. */
export function metricsCapablePlatforms(): PlatformCapability[] {
  return PLATFORM_MATRIX.filter((p) => p.readsAccountMetrics || p.readsPostMetrics)
}

/** Platforms that could publish today if asked. Only `ready` qualifies. */
export function publishReadyPlatforms(): PlatformCapability[] {
  return PLATFORM_MATRIX.filter((p) => p.canPublish && p.readiness === 'ready')
}

export const READINESS_LABEL: Record<Readiness, string> = {
  ready: 'Ready',
  credentials_missing: 'Code ready — credentials missing',
  api_approval_required: 'API approval required',
  paid_access_required: 'Paid access required',
  manual_only: 'Manual only',
  unsupported: 'Unsupported',
}
