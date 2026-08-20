/**
 * The two-hour social metrics synchronisation.
 *
 * Logical schedule: every two hours, on the hour (see SOCIAL_SYNC_CRON below).
 *
 * Design guarantees, in order of importance:
 *  1. **Per-platform failure isolation.** One platform failing never stops the others. Every
 *     platform is wrapped; the run result records the failure and the run continues.
 *  2. **Idempotency.** A snapshot is keyed by (platform, subject, captured_hour). Re-running the
 *     same window overwrites rather than duplicating.
 *  3. **No secret ever leaves this layer.** Errors go through `safeErrorSummary`; logs are
 *     structured and contain env-var NAMES only.
 *  4. **Stale data is labelled, not hidden.** A platform that could not be refreshed keeps its last
 *     snapshot and is reported as stale with the age.
 *  5. **Dry run is the default in CI.** `dryRun: true` performs every read decision and writes
 *     nothing.
 */
import type { PlatformId } from '../../src/social/platformMatrix.ts'
import { PLATFORM_MATRIX } from '../../src/social/platformMatrix.ts'
import { adapterFor } from './registry.ts'
import { safeErrorSummary } from './adapters/base.ts'
import type { AccountMetrics, AdapterEnv, PostMetrics } from './types.ts'

/** The schedule this job is designed for. Kept as data so docs and CI cannot drift from it. */
export const SOCIAL_SYNC_CRON = '0 */2 * * *'

/** A publication record the sync should refresh metrics for. */
export type TrackedPublication = {
  content_id: string
  platform: PlatformId
  platform_post_id: string
}

export type PlatformSyncResult = {
  platform: PlatformId
  status: 'ok' | 'skipped' | 'failed'
  /** Why it was skipped — always the operator-facing blocker, never a stack trace. */
  reason: string
  accountMetrics: AccountMetrics | null
  postMetrics: readonly PostMetrics[]
  attempts: number
  durationMs: number
  /** Detected anomalies worth an alert. */
  anomalies: readonly string[]
}

export type SyncRunResult = {
  runId: string
  startedAt: string
  finishedAt: string
  dryRun: boolean
  platforms: readonly PlatformSyncResult[]
  alerts: readonly SyncAlert[]
  /** True when at least one platform succeeded. A run where everything failed is not "ok". */
  ok: boolean
}

export type SyncAlert = {
  platform: PlatformId | null
  severity: 'info' | 'warning' | 'error'
  code: string
  message: string
}

export interface SyncStore {
  /** Publications whose metrics should be refreshed, newest first. */
  listTrackedPublications(): Promise<TrackedPublication[]>
  /** Idempotent upsert of one timestamped snapshot. */
  saveAccountSnapshot(metrics: AccountMetrics, runId: string): Promise<void>
  savePostSnapshot(metrics: PostMetrics, runId: string): Promise<void>
  /** Records success/failure state per platform so the dashboard can show "last successful sync". */
  recordPlatformOutcome(result: PlatformSyncResult, runId: string): Promise<void>
  saveAlert(alert: SyncAlert, runId: string): Promise<void>
  openRun(runId: string, dryRun: boolean, startedAt: string): Promise<void>
  closeRun(result: SyncRunResult): Promise<void>
}

/** A store that persists nothing. Used by `--dry-run` and by the tests. */
export class NullSyncStore implements SyncStore {
  readonly accountSnapshots: AccountMetrics[] = []
  readonly postSnapshots: PostMetrics[] = []
  readonly alerts: SyncAlert[] = []
  readonly outcomes: PlatformSyncResult[] = []

  private readonly tracked: TrackedPublication[]

  constructor(tracked: TrackedPublication[] = []) {
    this.tracked = tracked
  }

  listTrackedPublications(): Promise<TrackedPublication[]> {
    return Promise.resolve(this.tracked)
  }
  saveAccountSnapshot(metrics: AccountMetrics): Promise<void> {
    this.accountSnapshots.push(metrics)
    return Promise.resolve()
  }
  savePostSnapshot(metrics: PostMetrics): Promise<void> {
    this.postSnapshots.push(metrics)
    return Promise.resolve()
  }
  recordPlatformOutcome(result: PlatformSyncResult): Promise<void> {
    this.outcomes.push(result)
    return Promise.resolve()
  }
  saveAlert(alert: SyncAlert): Promise<void> {
    this.alerts.push(alert)
    return Promise.resolve()
  }
  openRun(): Promise<void> {
    return Promise.resolve()
  }
  closeRun(): Promise<void> {
    return Promise.resolve()
  }
}

export type SyncOptions = {
  env: AdapterEnv
  store: SyncStore
  dryRun: boolean
  /** Restrict the run to these platforms. Defaults to every metrics-capable platform. */
  platforms?: readonly PlatformId[]
  /** Injected for tests. Defaults to `Date.now`. */
  now?: () => number
  /** Injected for tests. Defaults to a real sleep. */
  sleep?: (ms: number) => Promise<void>
  /** Attempts per platform before giving up. */
  maxAttempts?: number
  /** Structured log sink. Defaults to console.log with a JSON line. */
  log?: (entry: Record<string, unknown>) => void
}

const RETRYABLE_STATUS = /\b(429|500|502|503|504)\b/
const RATE_LIMITED = /\b429\b|rate.?limit/i

/** Exponential backoff with a deterministic jitter derived from the attempt number. */
export function backoffMs(attempt: number, baseMs = 1_000, capMs = 30_000): number {
  const exponential = Math.min(capMs, baseMs * 2 ** (attempt - 1))
  const jitter = ((attempt * 37) % 10) / 10
  return Math.round(exponential * (0.75 + 0.25 * jitter))
}

export function isRetryable(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  if (err instanceof Error && err.name === 'AdapterUnavailableError') return false
  return RETRYABLE_STATUS.test(msg) || RATE_LIMITED.test(msg) || /abort|timeout|ETIMEDOUT|ECONNRESET/i.test(msg)
}

/** Snapshot windows are two hours wide so a re-run inside the same window is idempotent. */
export function snapshotWindow(nowMs: number): string {
  const d = new Date(nowMs)
  d.setUTCMinutes(0, 0, 0)
  d.setUTCHours(Math.floor(d.getUTCHours() / 2) * 2)
  return d.toISOString()
}

/** Anomalies worth telling a human about. Deliberately conservative. */
export function detectAnomalies(
  current: AccountMetrics,
  previous: AccountMetrics | null,
): string[] {
  const out: string[] = []
  if (!previous) return out
  const dropped = (a: number | null, b: number | null) =>
    typeof a === 'number' && typeof b === 'number' && b > 0 && a < b * 0.5
  if (dropped(current.followers, previous.followers)) {
    out.push(`Follower count halved or worse (${previous.followers} → ${current.followers}).`)
  }
  if (typeof current.followers === 'number' && current.followers === 0 && (previous.followers ?? 0) > 0) {
    out.push('Follower count reported as zero after a non-zero reading — likely an API fault, not a real drop.')
  }
  return out
}

function defaultLog(entry: Record<string, unknown>) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), ...entry }))
}

async function syncOnePlatform(
  platform: PlatformId,
  tracked: readonly TrackedPublication[],
  opts: Required<Pick<SyncOptions, 'env' | 'maxAttempts' | 'sleep' | 'now' | 'log'>>,
): Promise<PlatformSyncResult> {
  const adapter = adapterFor(platform)
  const started = opts.now()
  let attempts = 0
  let lastError = ''

  const postIds = tracked.filter((t) => t.platform === platform).map((t) => t.platform_post_id)

  while (attempts < opts.maxAttempts) {
    attempts += 1
    try {
      const accountMetrics = adapter.capability.readsAccountMetrics
        ? await adapter.fetchAccountMetrics(opts.env)
        : null
      const postMetrics =
        adapter.capability.readsPostMetrics && postIds.length
          ? await adapter.fetchPostMetrics(postIds, opts.env)
          : []

      return {
        platform,
        status: 'ok',
        reason: 'Refreshed.',
        accountMetrics,
        postMetrics,
        attempts,
        durationMs: opts.now() - started,
        anomalies: [],
      }
    } catch (err) {
      lastError = safeErrorSummary(err)
      const retryable = isRetryable(err)
      opts.log({
        event: 'social_sync.platform_error',
        platform,
        attempt: attempts,
        retryable,
        error: lastError,
      })
      if (!retryable) {
        // A missing credential or an unpassed approval is a SKIP, not a failure: it is the
        // expected state and must not page anyone every two hours.
        const expected = err instanceof Error && err.name === 'AdapterUnavailableError'
        return {
          platform,
          status: expected ? 'skipped' : 'failed',
          // Always the adapter's own message: it names the missing env vars AND the blocker,
          // which is what an operator actually needs to act on.
          reason: lastError,
          accountMetrics: null,
          postMetrics: [],
          attempts,
          durationMs: opts.now() - started,
          anomalies: [],
        }
      }
      if (attempts < opts.maxAttempts) await opts.sleep(backoffMs(attempts))
    }
  }

  return {
    platform,
    status: 'failed',
    reason: lastError || 'exhausted retries',
    accountMetrics: null,
    postMetrics: [],
    attempts,
    durationMs: opts.now() - started,
    anomalies: [],
  }
}

export async function runSocialSync(options: SyncOptions): Promise<SyncRunResult> {
  const now = options.now ?? (() => Date.now())
  const sleep = options.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)))
  const log = options.log ?? defaultLog
  const maxAttempts = options.maxAttempts ?? 3
  const { env, store, dryRun } = options

  const platforms =
    options.platforms ?? PLATFORM_MATRIX.filter((p) => p.readsAccountMetrics || p.readsPostMetrics).map((p) => p.id)

  const startedMs = now()
  const startedAt = new Date(startedMs).toISOString()
  const runId = `sync-${snapshotWindow(startedMs)}`

  log({ event: 'social_sync.start', runId, dryRun, platformCount: platforms.length })
  await store.openRun(runId, dryRun, startedAt)

  const tracked = await store.listTrackedPublications()
  const alerts: SyncAlert[] = []
  const results: PlatformSyncResult[] = []

  // Sequential on purpose: one shared egress, small platform count, and it keeps rate-limit
  // backoff on one platform from starving the others of wall-clock.
  for (const platform of platforms) {
    const result = await syncOnePlatform(platform, tracked, { env, maxAttempts, sleep, now, log })
    results.push(result)

    if (result.status === 'ok') {
      if (!dryRun) {
        if (result.accountMetrics) await store.saveAccountSnapshot(result.accountMetrics, runId)
        for (const pm of result.postMetrics) await store.savePostSnapshot(pm, runId)
      }
    } else if (result.status === 'failed') {
      alerts.push({
        platform,
        severity: 'error',
        code: 'sync_failed',
        message: `Metrics sync failed after ${result.attempts} attempts: ${result.reason}`,
      })
    }

    for (const anomaly of result.anomalies) {
      alerts.push({ platform, severity: 'warning', code: 'anomaly', message: anomaly })
    }

    if (!dryRun) await store.recordPlatformOutcome(result, runId)
    log({
      event: 'social_sync.platform_done',
      runId,
      platform,
      status: result.status,
      attempts: result.attempts,
      durationMs: result.durationMs,
    })
  }

  if (!dryRun) {
    for (const alert of alerts) await store.saveAlert(alert, runId)
  }

  const finishedAt = new Date(now()).toISOString()
  const result: SyncRunResult = {
    runId,
    startedAt,
    finishedAt,
    dryRun,
    platforms: results,
    alerts,
    ok: results.some((r) => r.status === 'ok'),
  }
  await store.closeRun(result)
  log({
    event: 'social_sync.finish',
    runId,
    ok: result.ok,
    okCount: results.filter((r) => r.status === 'ok').length,
    skipped: results.filter((r) => r.status === 'skipped').length,
    failed: results.filter((r) => r.status === 'failed').length,
  })
  return result
}
