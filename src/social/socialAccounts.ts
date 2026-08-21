/**
 * The official Jifunze.ai social accounts — the single source of truth for the website
 * footer, the /social directory, the Organization JSON-LD `sameAs` list, the sitemap and
 * the social-ops dashboard.
 *
 * Rules baked in here:
 *  - GitHub is NOT a social profile for this brand and must never appear.
 *  - CalmSignal properties are unrelated and must never appear.
 *  - Handles are recorded exactly as the platform shows them.
 *
 * Verified against the live profiles on 20 August 2026 (Bluesky added and verified 21 August 2026).
 */

export type SocialPlatformId =
  | 'instagram'
  | 'tiktok'
  | 'threads'
  | 'youtube'
  | 'facebook'
  | 'x'
  | 'linkedin'
  | 'pinterest'
  | 'bluesky'

export type SocialAccount = {
  id: SocialPlatformId
  /** Platform name as shown to a visitor. */
  name: string
  /** Handle as the platform displays it. */
  handle: string
  /** Canonical public profile URL. */
  href: string
  /** Stable platform identifier used by the API adapters, when one exists publicly. */
  identifier?: string
  /** What this channel is for, in one line. Shown on /social. */
  purpose: string
}

export const OFFICIAL_SOCIAL_ACCOUNTS: readonly SocialAccount[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@jifunze.ai',
    href: 'https://www.instagram.com/jifunze.ai/',
    identifier: '17841433836747759',
    purpose: 'Short vertical lessons and carousels.',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@jifunze_ai',
    href: 'https://www.tiktok.com/@jifunze_ai',
    purpose: 'Short vertical lessons.',
  },
  {
    id: 'threads',
    name: 'Threads',
    handle: '@jifunze.ai',
    href: 'https://www.threads.com/@jifunze.ai',
    purpose: 'Short written notes and replies.',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@jifunze-ai',
    href: 'https://www.youtube.com/@jifunze-ai',
    identifier: 'UCnvVNH52XiLQoNryE1p74Yg',
    purpose: 'Shorts, and longer walkthroughs later.',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Jifunze.AI',
    href: 'https://www.facebook.com/profile.php?id=61593186673039',
    identifier: '61593186673039',
    purpose: 'The same lessons for the Facebook audience.',
  },
  {
    id: 'x',
    name: 'X',
    handle: '@JifunzeAI',
    href: 'https://x.com/JifunzeAI',
    purpose: 'Short written notes.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'jifunze-ai',
    href: 'https://www.linkedin.com/company/jifunze-ai/',
    identifier: '114444495',
    purpose: 'Career and hiring context for professionals.',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    handle: '@jifunzeai',
    href: 'https://www.pinterest.com/jifunzeai/',
    purpose: 'Saveable CV, interview and application visuals.',
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    handle: '@jifunze.bsky.social',
    href: 'https://bsky.app/profile/jifunze.bsky.social',
    identifier: 'did:plc:hez3uufhzodbtwzuvvreri5l',
    purpose: 'Short written notes and links.',
  },
] as const

/** URLs for the Organization JSON-LD `sameAs` array. */
export const SOCIAL_SAME_AS: readonly string[] = OFFICIAL_SOCIAL_ACCOUNTS.map((a) => a.href)

export function socialAccount(id: SocialPlatformId): SocialAccount {
  const found = OFFICIAL_SOCIAL_ACCOUNTS.find((a) => a.id === id)
  if (!found) throw new Error(`Unknown social platform: ${id}`)
  return found
}

/** Hosts that must never appear in the public account list. */
export const FORBIDDEN_SOCIAL_HOSTS: readonly string[] = ['github.com', 'calmsignal']
