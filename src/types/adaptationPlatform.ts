/**
 * Platforms supported by the adaptation layer (extend tuple + policies to add more).
 */
export const ADAPTATION_PLATFORM_IDS = ['x', 'instagram', 'tiktok', 'facebook'] as const

export type AdaptationPlatformId = (typeof ADAPTATION_PLATFORM_IDS)[number]
