import { SOCIAL_PLATFORM_IDS } from '../../types/socialPlatform'
import type { SocialPlatformId } from '../../types/socialPlatform'
import { createMockPublishingConnector } from './mockPublishingConnectors'
import type { PublishingConnector } from './types'

const registry = new Map<SocialPlatformId, PublishingConnector>()

for (const p of SOCIAL_PLATFORM_IDS) {
  registry.set(p, createMockPublishingConnector(p))
}

/** Swap a real vendor connector at bootstrap (Edge worker or app init). */
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
