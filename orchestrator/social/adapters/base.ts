/**
 * Shared adapter behaviour.
 *
 * `BaseAdapter` gives every platform the same honest defaults: content validation, connection
 * checking from env-var PRESENCE only, pure copy transformation, and a hard refusal for any
 * operation the platform's current readiness does not permit.
 *
 * Subclasses override only what they can genuinely do today.
 */
import type { PlatformCapability, PlatformId } from '../../../src/social/platformMatrix.ts'
import { platformCapability } from '../../../src/social/platformMatrix.ts'
import { findProhibitedClaims } from '../../../src/social/brand.ts'
import { PLATFORM_LIMITS, transformForPlatform } from '../transform.ts'
import {
  AdapterUnavailableError,
  missingEnvVars,
  type AccountMetrics,
  type AdapterEnv,
  type ConnectionState,
  type PlatformAdapter,
  type PlatformVariant,
  type PostMetrics,
  type PublishResult,
  type PublishableContent,
} from '../types.ts'

export abstract class BaseAdapter implements PlatformAdapter {
  readonly platform: PlatformId
  readonly capability: PlatformCapability

  protected constructor(platform: PlatformId) {
    this.platform = platform
    this.capability = platformCapability(platform)
  }

  validateContent(content: PublishableContent): string[] {
    const errors: string[] = []
    if (!content.content_id.trim()) errors.push('content_id is required')
    if (!content.title.trim()) errors.push('title is required')
    if (!content.caption.trim()) errors.push('caption is required')
    if (!content.body.length) errors.push('body must have at least one beat')

    const prohibited = findProhibitedClaims(`${content.title} ${content.caption} ${content.body.join(' ')}`)
    if (prohibited.length) {
      errors.push(`prohibited claim(s): ${prohibited.join(', ')}`)
    }
    if (
      this.capability.canPublish &&
      !content.video_url &&
      this.platform !== 'x' &&
      this.platform !== 'threads' &&
      this.platform !== 'bluesky'
    ) {
      errors.push('video_url is required for a video-first platform')
    }
    return errors
  }

  mediaRequirements(): string[] {
    return [PLATFORM_LIMITS[this.platform].media]
  }

  validateConnection(env: AdapterEnv): ConnectionState {
    const missing = missingEnvVars(this.capability, env)
    const connected = this.capability.readiness === 'ready' && missing.length === 0
    return {
      platform: this.platform,
      connected,
      tokenExpiresAt: null,
      missingEnv: missing,
      detail: connected ? 'Credentials present.' : this.capability.blocker,
    }
  }

  prepare(content: PublishableContent): PlatformVariant {
    return transformForPlatform(content, this.platform)
  }

  /** The refusal an operator needs, as a value. */
  protected refusal(operation: string): AdapterUnavailableError {
    return new AdapterUnavailableError(
      this.platform,
      this.capability.readiness,
      `${operation} — ${this.capability.blocker}`,
    )
  }

  /** Refuse, with the reason an operator needs. Never silently no-ops. */
  protected unavailable(operation: string): never {
    throw this.refusal(operation)
  }

  /** Refuse unless credentials are actually present. */
  protected requireConnection(env: AdapterEnv, operation: string): void {
    const state = this.validateConnection(env)
    if (!state.connected) {
      throw new AdapterUnavailableError(
        this.platform,
        this.capability.readiness,
        `${operation} — missing ${state.missingEnv.join(', ') || 'approval'}. ${state.detail}`,
      )
    }
  }

  publish(_content: PublishableContent, _env: AdapterEnv): Promise<PublishResult> {
    void _content
    void _env
    return Promise.reject(this.refusal('publish'))
  }

  fetchAccountMetrics(_env: AdapterEnv): Promise<AccountMetrics> {
    void _env
    return Promise.reject(this.refusal('fetchAccountMetrics'))
  }

  fetchPostMetrics(_postIds: readonly string[], _env: AdapterEnv): Promise<PostMetrics[]> {
    void _postIds
    void _env
    return Promise.reject(this.refusal('fetchPostMetrics'))
  }
}

/** Small helper: a fetch with a timeout that never leaks the request headers into the error. */
export async function safeFetchJson(
  url: string,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<{ ok: boolean; status: number; body: unknown }> {
  const { timeoutMs = 15_000, ...rest } = init
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { ...rest, signal: controller.signal })
    const text = await res.text()
    let body: unknown = text
    try {
      body = JSON.parse(text)
    } catch {
      /* non-JSON response body kept as text */
    }
    return { ok: res.ok, status: res.status, body }
  } finally {
    clearTimeout(timer)
  }
}

/** Turn any thrown value into a message safe to store and log. Strips token-looking substrings. */
export function safeErrorSummary(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  return raw
    .replace(/(access_token|client_secret|refresh_token|api[_-]?key|bearer)\s*[=:]\s*\S+/gi, '$1=[redacted]')
    .replace(/\b[A-Za-z0-9_-]{40,}\b/g, '[redacted]')
    .slice(0, 500)
}
