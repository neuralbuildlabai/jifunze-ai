import { getContentAdapterMode } from '../services/content/createAdapter'
import { isAllPublishingSimulated } from '../services/publishing/registry'
import {
  getContentGenerationRuntimeSnapshot,
  probeContentGenerationRuntime,
} from '../services/content/runtimeMode'

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
  const remoteContent = getContentGenerationRuntimeSnapshot().mode === 'backend'
  const anyLivePublish = !isAllPublishingSimulated()
  return remoteContent && anyLivePublish ? 'live' : 'preview'
}

/**
 * True when caption generation is still on the in-browser / mock path (not the configured backend).
 * Used to show a clear demo banner; normal signed-in workspaces with backend generation skip “preview mode”.
 */
export function isStrictDemoContentGeneration(): boolean {
  if (getContentAdapterMode() === 'mock') return true
  return getContentGenerationRuntimeSnapshot().mode !== 'backend'
}

export function getPublishingSimulatedNotice(): string | null {
  return isAllPublishingSimulated() ? PUBLISHING_SIMULATED_NOTICE : null
}

export function getContentMockNotice(): string | null {
  if (getContentAdapterMode() === 'mock') return CONTENT_MOCK_NOTICE
  return getContentGenerationRuntimeSnapshot().mode === 'backend' ? null : CONTENT_MOCK_NOTICE
}

export async function refreshContentRuntimeStatus(accessToken?: string): Promise<void> {
  await probeContentGenerationRuntime({ accessToken })
}

/** Show a small “demo” hint next to lifecycle chips when the stack is not fully live. */
export function shouldShowLifecycleDemoHint(): boolean {
  return getSystemSurfaceMode() === 'preview'
}
