import { getContentAdapterMode } from '../services/content/createAdapter'
import { isAllPublishingSimulated } from '../services/publishing/registry'

export type SystemSurfaceMode = 'preview' | 'live'

export const PUBLISHING_SIMULATED_NOTICE =
  'Content is simulated and not posted to social platforms.'

const CONTENT_MOCK_NOTICE =
  'Caption text uses the in-browser demo generator (no remote LLM until the content API is configured).'

/**
 * **Live** only when remote caption generation is enabled and at least one publishing connector
 * declares `delivery: "live"`. Otherwise **preview** so the UI does not imply full automation.
 */
export function getSystemSurfaceMode(): SystemSurfaceMode {
  const remoteContent = getContentAdapterMode() === 'http'
  const anyLivePublish = !isAllPublishingSimulated()
  return remoteContent && anyLivePublish ? 'live' : 'preview'
}

export function getPublishingSimulatedNotice(): string | null {
  return isAllPublishingSimulated() ? PUBLISHING_SIMULATED_NOTICE : null
}

export function getContentMockNotice(): string | null {
  return getContentAdapterMode() === 'mock' ? CONTENT_MOCK_NOTICE : null
}

/** Show a small “demo” hint next to lifecycle chips when the stack is not fully live. */
export function shouldShowLifecycleDemoHint(): boolean {
  return getSystemSurfaceMode() === 'preview'
}
