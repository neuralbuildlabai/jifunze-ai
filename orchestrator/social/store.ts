/**
 * The Supabase-backed `SyncStore`.
 *
 * Uses the service role key, so it runs SERVER-SIDE ONLY — never in a browser bundle. All writes
 * are upserts keyed so a re-run inside the same two-hour window overwrites rather than duplicates.
 *
 * No token or secret is ever written into a row: `social_account_connections` stores expiry and a
 * short non-reversible fingerprint, and error columns are populated from `safeErrorSummary`.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { AccountMetrics, PostMetrics } from './types.ts'
import type {
  PlatformSyncResult,
  SyncAlert,
  SyncRunResult,
  SyncStore,
  TrackedPublication,
} from './sync.ts'
import { snapshotWindow } from './sync.ts'

export class SupabaseSyncStore implements SyncStore {
  private readonly db: SupabaseClient

  constructor(url: string, serviceRoleKey: string) {
    this.db = createClient(url, serviceRoleKey, { auth: { persistSession: false } })
  }

  static fromEnv(env: Record<string, string | undefined> = process.env): SupabaseSyncStore | null {
    const url = env.SUPABASE_URL?.trim()
    const key = env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    if (!url || !key) return null
    return new SupabaseSyncStore(url, key)
  }

  async listTrackedPublications(): Promise<TrackedPublication[]> {
    const { data, error } = await this.db
      .from('content_publications')
      .select('content_id, platform, platform_post_id')
      .eq('status', 'published')
      .not('platform_post_id', 'is', null)
      .order('published_at', { ascending: false })
      .limit(500)
    if (error) throw new Error(`listTrackedPublications: ${error.message}`)
    return (data ?? []) as TrackedPublication[]
  }

  async saveAccountSnapshot(metrics: AccountMetrics, runId: string): Promise<void> {
    const { error } = await this.db.from('social_metric_snapshots').upsert(
      {
        platform: metrics.platform,
        subject_type: 'account',
        subject_id: metrics.platform,
        window_start: snapshotWindow(Date.parse(metrics.capturedAt)),
        captured_at: metrics.capturedAt,
        followers: metrics.followers,
        views: metrics.views,
        reach: metrics.reach,
        engagement: metrics.engagement,
        sync_run_id: runId,
      },
      { onConflict: 'platform,subject_type,subject_id,window_start' },
    )
    if (error) throw new Error(`saveAccountSnapshot: ${error.message}`)
  }

  async savePostSnapshot(metrics: PostMetrics, runId: string): Promise<void> {
    const { error } = await this.db.from('social_metric_snapshots').upsert(
      {
        platform: metrics.platform,
        subject_type: 'post',
        subject_id: metrics.postId,
        window_start: snapshotWindow(Date.parse(metrics.capturedAt)),
        captured_at: metrics.capturedAt,
        views: metrics.views,
        likes: metrics.likes,
        comments: metrics.comments,
        shares: metrics.shares,
        saves: metrics.saves,
        sync_run_id: runId,
      },
      { onConflict: 'platform,subject_type,subject_id,window_start' },
    )
    if (error) throw new Error(`savePostSnapshot: ${error.message}`)
  }

  async recordPlatformOutcome(result: PlatformSyncResult, runId: string): Promise<void> {
    const now = new Date().toISOString()
    const patch: Record<string, unknown> = {
      platform: result.platform,
      last_sync_attempt_at: now,
      last_sync_status: result.status,
      last_error_summary: result.status === 'ok' ? null : result.reason,
      last_sync_run_id: runId,
    }
    if (result.status === 'ok') patch.last_successful_sync_at = now
    const { error } = await this.db
      .from('social_account_connections')
      .upsert(patch, { onConflict: 'platform' })
    if (error) throw new Error(`recordPlatformOutcome: ${error.message}`)
  }

  async saveAlert(alert: SyncAlert, runId: string): Promise<void> {
    const { error } = await this.db.from('social_alerts').insert({
      platform: alert.platform,
      severity: alert.severity,
      code: alert.code,
      message: alert.message,
      sync_run_id: runId,
    })
    if (error) throw new Error(`saveAlert: ${error.message}`)
  }

  async openRun(runId: string, dryRun: boolean, startedAt: string): Promise<void> {
    const { error } = await this.db
      .from('sync_runs')
      .upsert({ id: runId, dry_run: dryRun, started_at: startedAt, status: 'running' }, { onConflict: 'id' })
    if (error) throw new Error(`openRun: ${error.message}`)
  }

  async closeRun(result: SyncRunResult): Promise<void> {
    if (result.dryRun) return
    const { error } = await this.db
      .from('sync_runs')
      .update({
        finished_at: result.finishedAt,
        status: result.ok ? 'ok' : 'failed',
        platforms_ok: result.platforms.filter((p) => p.status === 'ok').length,
        platforms_skipped: result.platforms.filter((p) => p.status === 'skipped').length,
        platforms_failed: result.platforms.filter((p) => p.status === 'failed').length,
      })
      .eq('id', result.runId)
    if (error) throw new Error(`closeRun: ${error.message}`)
  }
}
