/**
 * Pure derivations for the social-ops dashboard.
 *
 * Everything here is a plain function over plain data so it can be unit-tested with no browser,
 * no Supabase and no network (`scripts/test-social-ops.ts`). The React layer only renders what
 * these functions return.
 *
 * Honesty rules baked in:
 *   - A metric with no snapshot is `null`, never `0`. "No data" and "zero" are different facts.
 *   - Every figure carries the timestamp it came from, and anything older than one sync window is
 *     labelled stale rather than presented as current.
 *   - No number here is ever estimated, interpolated or back-filled.
 */
import type { PlatformId, Readiness } from '../../social/platformMatrix'

export type MetricSnapshotRow = {
  platform: PlatformId
  subject_type: 'account' | 'post'
  subject_id: string
  window_start: string
  captured_at: string
  followers: number | null
  views: number | null
  reach: number | null
  impressions: number | null
  engagement: number | null
  likes: number | null
  comments: number | null
  shares: number | null
  saves: number | null
}

export type ConnectionRow = {
  platform: PlatformId
  connection_status: 'connected' | 'disconnected' | 'manual_only' | 'approval_pending' | 'error'
  missing_env_vars: string[]
  token_expires_at: string | null
  last_sync_attempt_at: string | null
  last_successful_sync_at: string | null
  last_sync_status: string | null
  last_publish_attempt_at: string | null
  last_publish_success_at: string | null
  last_error_summary: string | null
  required_action: string | null
}

export type AccountRow = {
  platform: PlatformId
  display_name: string
  handle: string
  profile_url: string
  readiness: Readiness
  manual_only: boolean
  enabled: boolean
  profile_completeness: number | null
}

export type SyncRunRow = {
  id: string
  dry_run: boolean
  status: 'running' | 'ok' | 'failed'
  started_at: string
  finished_at: string | null
  platforms_ok: number
  platforms_skipped: number
  platforms_failed: number
}

export type AlertRow = {
  id: number
  platform: PlatformId | null
  severity: 'info' | 'warning' | 'error'
  code: string
  message: string
  resolved_at: string | null
  created_at: string
}

export type PublicationRow = {
  content_id: string
  platform: PlatformId
  platform_post_id: string | null
  platform_post_url: string | null
  status: 'queued' | 'publishing' | 'published' | 'failed' | 'skipped'
  published_at: string | null
  last_metrics_sync_at: string | null
}

export type ContentRow = {
  id: string
  title: string
  pillar: string
  approval_status: 'pending' | 'approved' | 'rejected'
  publication_status: 'draft' | 'scheduled' | 'published' | 'retracted'
  safety_status: 'ok' | 'review' | 'blocked'
  published_at: string | null
}

/** One sync window. Anything older than this is stale. */
export const SYNC_WINDOW_MS = 2 * 60 * 60 * 1000

export type Freshness = {
  /** ISO timestamp of the newest data point behind a figure, or null when there is none. */
  asOf: string | null
  stale: boolean
  ageMs: number | null
  label: string
}

export function freshness(asOf: string | null, nowMs: number, windowMs = SYNC_WINDOW_MS): Freshness {
  if (!asOf) return { asOf: null, stale: true, ageMs: null, label: 'never synced' }
  const ageMs = nowMs - Date.parse(asOf)
  const stale = ageMs > windowMs * 1.5
  return { asOf, stale, ageMs, label: stale ? `stale — ${humanAge(ageMs)} old` : `updated ${humanAge(ageMs)} ago` }
}

export function humanAge(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return 'unknown'
  const mins = Math.floor(ms / 60_000)
  if (mins < 1) return 'less than a minute'
  if (mins < 60) return `${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 48) return `${hours} h`
  return `${Math.floor(hours / 24)} d`
}

/** Newest account snapshot per platform. */
export function latestAccountSnapshots(
  rows: readonly MetricSnapshotRow[],
): Map<PlatformId, MetricSnapshotRow> {
  const out = new Map<PlatformId, MetricSnapshotRow>()
  for (const row of rows) {
    if (row.subject_type !== 'account') continue
    const current = out.get(row.platform)
    if (!current || Date.parse(row.captured_at) > Date.parse(current.captured_at)) {
      out.set(row.platform, row)
    }
  }
  return out
}

/** Sum a field across the newest snapshot of every platform. `null` when nothing has ever synced. */
export function sumLatest(
  rows: readonly MetricSnapshotRow[],
  field: 'followers' | 'views' | 'reach' | 'impressions' | 'engagement',
): number | null {
  const latest = [...latestAccountSnapshots(rows).values()]
  const values = latest.map((r) => r[field]).filter((v): v is number => typeof v === 'number')
  if (!values.length) return null
  return values.reduce((a, b) => a + b, 0)
}

/**
 * Growth between the newest snapshot and the newest snapshot at or before `sinceMs`.
 * Returns null unless BOTH ends exist — a single reading is not a trend.
 */
export function growthSince(
  rows: readonly MetricSnapshotRow[],
  field: 'followers' | 'views',
  sinceMs: number,
): { absolute: number; percent: number | null } | null {
  const byPlatform = new Map<PlatformId, MetricSnapshotRow[]>()
  for (const row of rows) {
    if (row.subject_type !== 'account') continue
    const list = byPlatform.get(row.platform) ?? []
    list.push(row)
    byPlatform.set(row.platform, list)
  }

  let newest = 0
  let baseline = 0
  let sawBoth = false

  for (const list of byPlatform.values()) {
    const sorted = [...list].sort((a, b) => Date.parse(a.captured_at) - Date.parse(b.captured_at))
    const last = sorted[sorted.length - 1]
    const before = [...sorted].reverse().find((r) => Date.parse(r.captured_at) <= sinceMs)
    if (typeof last?.[field] !== 'number' || typeof before?.[field] !== 'number') continue
    newest += last[field] as number
    baseline += before[field] as number
    sawBoth = true
  }

  if (!sawBoth) return null
  const absolute = newest - baseline
  const percent = baseline > 0 ? Number(((absolute / baseline) * 100).toFixed(1)) : null
  return { absolute, percent }
}

/** Engagement rate = engagement / reach, as a percentage. Null unless both are known and reach > 0. */
export function engagementRate(rows: readonly MetricSnapshotRow[]): number | null {
  const engagement = sumLatest(rows, 'engagement')
  const reach = sumLatest(rows, 'reach')
  if (engagement === null || reach === null || reach <= 0) return null
  return Number(((engagement / reach) * 100).toFixed(2))
}

export type TopItem<T> = { key: string; value: number; item: T }

/** Top posts by views. Only posts that actually have a views figure are ranked. */
export function topPosts(
  snapshots: readonly MetricSnapshotRow[],
  publications: readonly PublicationRow[],
  content: readonly ContentRow[],
  limit = 5,
): Array<TopItem<{ title: string; platform: PlatformId; url: string | null }>> {
  const bestByPost = new Map<string, MetricSnapshotRow>()
  for (const row of snapshots) {
    if (row.subject_type !== 'post' || typeof row.views !== 'number') continue
    const key = `${row.platform}:${row.subject_id}`
    const current = bestByPost.get(key)
    if (!current || Date.parse(row.captured_at) > Date.parse(current.captured_at)) bestByPost.set(key, row)
  }

  const titleById = new Map(content.map((c) => [c.id, c.title]))
  const ranked: Array<TopItem<{ title: string; platform: PlatformId; url: string | null }>> = []

  for (const pub of publications) {
    if (!pub.platform_post_id) continue
    const snap = bestByPost.get(`${pub.platform}:${pub.platform_post_id}`)
    if (!snap || typeof snap.views !== 'number') continue
    ranked.push({
      key: `${pub.platform}:${pub.platform_post_id}`,
      value: snap.views,
      item: {
        title: titleById.get(pub.content_id) ?? pub.content_id,
        platform: pub.platform,
        url: pub.platform_post_url,
      },
    })
  }

  return ranked.sort((a, b) => b.value - a.value).slice(0, limit)
}

/** Top pillar by total post views. Null when no post has a views figure. */
export function topPillar(
  snapshots: readonly MetricSnapshotRow[],
  publications: readonly PublicationRow[],
  content: readonly ContentRow[],
): { pillar: string; views: number } | null {
  const pillarById = new Map(content.map((c) => [c.id, c.pillar]))
  const totals = new Map<string, number>()

  const bestByPost = new Map<string, number>()
  for (const row of snapshots) {
    if (row.subject_type !== 'post' || typeof row.views !== 'number') continue
    const key = `${row.platform}:${row.subject_id}`
    bestByPost.set(key, Math.max(bestByPost.get(key) ?? 0, row.views))
  }

  for (const pub of publications) {
    if (!pub.platform_post_id) continue
    const views = bestByPost.get(`${pub.platform}:${pub.platform_post_id}`)
    if (typeof views !== 'number') continue
    const pillar = pillarById.get(pub.content_id)
    if (!pillar) continue
    totals.set(pillar, (totals.get(pillar) ?? 0) + views)
  }

  let best: { pillar: string; views: number } | null = null
  for (const [pillar, views] of totals) {
    if (!best || views > best.views) best = { pillar, views }
  }
  return best
}

export type AccountHealth = {
  platform: PlatformId
  displayName: string
  handle: string
  profileUrl: string
  readiness: Readiness
  connectionStatus: ConnectionRow['connection_status']
  tokenExpiresAt: string | null
  /** Days until the token expires. Negative means already expired. Null when non-expiring/unknown. */
  tokenExpiresInDays: number | null
  tokenWarning: string | null
  missingEnvVars: readonly string[]
  lastSuccessfulSync: Freshness
  lastPublishAttemptAt: string | null
  lastPublishSuccessAt: string | null
  profileCompleteness: number | null
  error: string | null
  requiredAction: string | null
}

export function accountHealth(
  accounts: readonly AccountRow[],
  connections: readonly ConnectionRow[],
  nowMs: number,
): AccountHealth[] {
  const byPlatform = new Map(connections.map((c) => [c.platform, c]))
  return accounts.map((a) => {
    const c = byPlatform.get(a.platform)
    const expiresAt = c?.token_expires_at ?? null
    const expiresInDays = expiresAt
      ? Math.floor((Date.parse(expiresAt) - nowMs) / 86_400_000)
      : null
    let tokenWarning: string | null = null
    if (expiresInDays !== null) {
      if (expiresInDays < 0) tokenWarning = 'Token has expired.'
      else if (expiresInDays <= 7) tokenWarning = `Token expires in ${expiresInDays} day(s).`
    }
    return {
      platform: a.platform,
      displayName: a.display_name,
      handle: a.handle,
      profileUrl: a.profile_url,
      readiness: a.readiness,
      connectionStatus: c?.connection_status ?? (a.manual_only ? 'manual_only' : 'disconnected'),
      tokenExpiresAt: expiresAt,
      tokenExpiresInDays: expiresInDays,
      tokenWarning,
      missingEnvVars: c?.missing_env_vars ?? [],
      lastSuccessfulSync: freshness(c?.last_successful_sync_at ?? null, nowMs),
      lastPublishAttemptAt: c?.last_publish_attempt_at ?? null,
      lastPublishSuccessAt: c?.last_publish_success_at ?? null,
      profileCompleteness: a.profile_completeness,
      error: c?.last_error_summary ?? null,
      requiredAction: c?.required_action ?? null,
    }
  })
}

export type PipelineHealth = {
  itemsTotal: number
  awaitingApproval: number
  approvedNotPublished: number
  published: number
  blockedBySafety: number
  publicationsFailed: number
  publicationsQueued: number
}

export function pipelineHealth(
  content: readonly ContentRow[],
  publications: readonly PublicationRow[],
): PipelineHealth {
  return {
    itemsTotal: content.length,
    awaitingApproval: content.filter((c) => c.approval_status === 'pending').length,
    approvedNotPublished: content.filter(
      (c) => c.approval_status === 'approved' && c.publication_status !== 'published',
    ).length,
    published: content.filter((c) => c.publication_status === 'published').length,
    blockedBySafety: content.filter((c) => c.safety_status === 'blocked').length,
    publicationsFailed: publications.filter((p) => p.status === 'failed').length,
    publicationsQueued: publications.filter((p) => p.status === 'queued' || p.status === 'publishing').length,
  }
}

export type SyncStatus = {
  lastRun: SyncRunRow | null
  lastRunFreshness: Freshness
  /** True when the newest run finished more than one and a half windows ago. */
  overdue: boolean
  openAlerts: readonly AlertRow[]
}

export function syncStatus(
  runs: readonly SyncRunRow[],
  alerts: readonly AlertRow[],
  nowMs: number,
): SyncStatus {
  const sorted = [...runs].sort((a, b) => Date.parse(b.started_at) - Date.parse(a.started_at))
  const lastRun = sorted[0] ?? null
  const f = freshness(lastRun?.finished_at ?? lastRun?.started_at ?? null, nowMs)
  return {
    lastRun,
    lastRunFreshness: f,
    overdue: f.stale,
    openAlerts: alerts.filter((a) => !a.resolved_at),
  }
}

/** Formats a metric for display. Never invents a zero. */
export function formatMetric(value: number | null): string {
  if (value === null) return '—'
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1)}k`
  return String(value)
}
