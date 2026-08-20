/**
 * The common publishing + metrics interface every platform adapter implements.
 *
 * Design rules:
 *  - Official APIs only. Browser scraping is never a publishing mechanism here.
 *  - An adapter reports what is TRUE TODAY. If credentials or an approval are missing it must
 *    refuse loudly (`AdapterUnavailableError`) rather than pretend to succeed.
 *  - Nothing in this layer reads or writes a secret value into a log, an error message or a
 *    database row. Adapters receive already-resolved credentials from the caller.
 */
import type { PlatformCapability, PlatformId, Readiness } from '../../src/social/platformMatrix.ts'
import { PLATFORM_MATRIX, platformCapability } from '../../src/social/platformMatrix.ts'

/** A content item as the publishing layer sees it. Mirrors the canonical ledger record. */
export type PublishableContent = {
  content_id: string
  title: string
  /** Long-form caption before platform-specific transformation. */
  caption: string
  /** Ordered spoken/on-screen beats. Used to build alt text and platform descriptions. */
  body: readonly string[]
  hashtags: readonly string[]
  pillar: string
  /** Publicly reachable URL of the rendered vertical video, when there is one. */
  video_url: string | null
  /** Publicly reachable URL of a still cover/thumbnail, when there is one. */
  thumbnail_url: string | null
  /** Canonical link back to the lesson on jifunze.ai. */
  permalink: string | null
}

/** The platform-specific variant produced by `orchestrator/social/transform.ts`. */
export type PlatformVariant = {
  platform: PlatformId
  /** Title/headline where the platform has one. */
  title: string | null
  /** The caption/description body, already trimmed to the platform limit. */
  caption: string
  hashtags: readonly string[]
  /** Text posted as the first comment, where that is the convention. */
  firstComment: string | null
  /** Accessibility text for the media. */
  altText: string
  /** Whether a link may appear in the post body on this platform. */
  linkAllowed: boolean
  /** Warnings a human should see before approving. Never blocks on its own. */
  warnings: readonly string[]
}

export type ConnectionState = {
  platform: PlatformId
  connected: boolean
  /** ISO timestamp. Null when the platform issues non-expiring credentials. */
  tokenExpiresAt: string | null
  /** Which required env var names are absent. Names only — never values. */
  missingEnv: readonly string[]
  detail: string
}

export type PublishResult = {
  platform: PlatformId
  /** Stable id assigned by the platform. The duplicate guard keys on (platform, postId). */
  postId: string | null
  postUrl: string | null
  status: 'published' | 'pending' | 'draft' | 'failed' | 'skipped'
  /** Safe, secret-free summary. */
  detail: string
}

export type AccountMetrics = {
  platform: PlatformId
  followers: number | null
  views: number | null
  reach: number | null
  engagement: number | null
  capturedAt: string
}

export type PostMetrics = {
  platform: PlatformId
  postId: string
  views: number | null
  likes: number | null
  comments: number | null
  shares: number | null
  saves: number | null
  capturedAt: string
}

/** Thrown whenever an adapter is asked to do something its current readiness does not allow. */
export class AdapterUnavailableError extends Error {
  readonly platform: PlatformId
  readonly readiness: Readiness

  constructor(platform: PlatformId, readiness: Readiness, reason: string) {
    super(`[${platform}] unavailable (${readiness}): ${reason}`)
    this.name = 'AdapterUnavailableError'
    this.platform = platform
    this.readiness = readiness
  }
}

export type AdapterEnv = Readonly<Record<string, string | undefined>>

export interface PlatformAdapter {
  readonly platform: PlatformId
  readonly capability: PlatformCapability

  /** Static content checks that do not need a network call. */
  validateContent(content: PublishableContent): string[]
  /** Media-shape checks (dimensions, duration, format) expressed as requirements. */
  mediaRequirements(): string[]
  /** Are the credentials this adapter needs actually present? Never returns a secret. */
  validateConnection(env: AdapterEnv): ConnectionState
  /** Platform-specific copy. Pure. */
  prepare(content: PublishableContent): PlatformVariant

  publish(content: PublishableContent, env: AdapterEnv): Promise<PublishResult>
  fetchAccountMetrics(env: AdapterEnv): Promise<AccountMetrics>
  fetchPostMetrics(postIds: readonly string[], env: AdapterEnv): Promise<PostMetrics[]>
}

/** Env presence check shared by every adapter. Returns the MISSING variable names only. */
export function missingEnvVars(capability: PlatformCapability, env: AdapterEnv): string[] {
  return capability.envVars.filter((name) => !env[name]?.trim())
}

export function capabilityFor(platform: PlatformId): PlatformCapability {
  return platformCapability(platform)
}

export const ALL_PLATFORM_IDS: readonly PlatformId[] = PLATFORM_MATRIX.map((p) => p.id)
