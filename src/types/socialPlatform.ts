/**
 * First-class channel identifiers for connectors, policies, and adaptation.
 * Extend this tuple (and `PLATFORM_POLICIES`) when adding e.g. Threads or YouTube.
 */
export const SOCIAL_PLATFORM_IDS = [
  'x',
  'instagram',
  'facebook',
  'tiktok',
  'linkedin',
] as const

export type SocialPlatformId = (typeof SOCIAL_PLATFORM_IDS)[number]

export function isSocialPlatformId(value: string): value is SocialPlatformId {
  return (SOCIAL_PLATFORM_IDS as readonly string[]).includes(value)
}
