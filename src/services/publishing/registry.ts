import { SOCIAL_PLATFORM_IDS } from '../../types/socialPlatform'
import type { SocialPlatformId } from '../../types/socialPlatform'
import { createMockPublishingConnector } from './mockPublishingConnectors'
import type { PublishingConnector } from './types'

const registry = new Map<SocialPlatformId, PublishingConnector>()

for (const p of SOCIAL_PLATFORM_IDS) {
  registry.set(p, createMockPublishingConnector(p))
}

/**
 * Register a vendor connector. Set `delivery: "live"` on real SDK-backed implementations so the
 * system banner can switch out of preview mode when combined with remote content generation.
 */
export function registerPublishingConnector(connector: PublishingConnector): void {
  registry.set(connector.platform, connector)
}

export function getPublishingConnector(platform: SocialPlatformId): PublishingConnector {
  const existing = registry.get(platform)
  if (existing) return existing
  const created = createMockPublishingConnector(platform)
  registry.set(platform, created)
  return created
}

/** True when every registered connector still uses simulated delivery (no real social posts). */
export function isAllPublishingSimulated(): boolean {
  return SOCIAL_PLATFORM_IDS.every((p) => getPublishingConnector(p).delivery === 'simulated')
}
