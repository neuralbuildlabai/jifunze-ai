/**
 * Reads for the social-ops dashboard.
 *
 * Every query below runs with the browser ANON key under RLS: `public.is_admin()` gates each
 * operational table, so a non-admin session gets zero rows even if it reaches this code. The
 * client never sees a token — `social_account_connections` stores expiry and status only.
 *
 * When Supabase is not configured (local demo, Playwright bundle) every loader returns an empty
 * result with `configured: false` so the dashboard renders an honest "not connected" state
 * instead of inventing numbers.
 */
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { getSupabaseBrowserClient } from '../../lib/supabaseClient'
import type {
  AccountRow,
  AlertRow,
  ConnectionRow,
  ContentRow,
  MetricSnapshotRow,
  PublicationRow,
  SyncRunRow,
} from './socialOpsSummary'

export type SocialOpsSnapshot = {
  configured: boolean
  loadedAt: string
  accounts: AccountRow[]
  connections: ConnectionRow[]
  snapshots: MetricSnapshotRow[]
  runs: SyncRunRow[]
  alerts: AlertRow[]
  publications: PublicationRow[]
  content: ContentRow[]
  /** Non-fatal load errors, one per table that failed. Never contains a secret. */
  errors: string[]
}

function emptySnapshot(configured: boolean, errors: string[] = []): SocialOpsSnapshot {
  return {
    configured,
    loadedAt: new Date().toISOString(),
    accounts: [],
    connections: [],
    snapshots: [],
    runs: [],
    alerts: [],
    publications: [],
    content: [],
    errors,
  }
}

/** How far back the dashboard loads snapshots. 90 days covers the 7/30/90 day views. */
const SNAPSHOT_WINDOW_DAYS = 90

export async function loadSocialOpsSnapshot(): Promise<SocialOpsSnapshot> {
  if (!isSupabaseConfigured()) return emptySnapshot(false)

  const db = getSupabaseBrowserClient()
  const since = new Date(Date.now() - SNAPSHOT_WINDOW_DAYS * 86_400_000).toISOString()
  const result = emptySnapshot(true)

  const [accounts, connections, snapshots, runs, alerts, publications, content] = await Promise.all([
    db.from('social_accounts').select('*').order('platform'),
    db.from('social_account_connections').select('*'),
    db
      .from('social_metric_snapshots')
      .select('*')
      .gte('window_start', since)
      .order('window_start', { ascending: false })
      .limit(5000),
    db.from('sync_runs').select('*').order('started_at', { ascending: false }).limit(50),
    db.from('social_alerts').select('*').order('created_at', { ascending: false }).limit(100),
    db.from('content_publications').select('*').order('published_at', { ascending: false }).limit(500),
    db.from('content_items').select('id, title, pillar, approval_status, publication_status, safety_status, published_at').limit(500),
  ])

  const collect = <T,>(
    label: string,
    res: { data: unknown; error: { message: string } | null },
    into: T[],
  ) => {
    if (res.error) {
      result.errors.push(`${label}: ${res.error.message}`)
      return
    }
    if (Array.isArray(res.data)) into.push(...(res.data as T[]))
  }

  collect<AccountRow>('social_accounts', accounts, result.accounts)
  collect<ConnectionRow>('social_account_connections', connections, result.connections)
  collect<MetricSnapshotRow>('social_metric_snapshots', snapshots, result.snapshots)
  collect<SyncRunRow>('sync_runs', runs, result.runs)
  collect<AlertRow>('social_alerts', alerts, result.alerts)
  collect<PublicationRow>('content_publications', publications, result.publications)
  collect<ContentRow>('content_items', content, result.content)

  return result
}

export type ManualRefreshOutcome = {
  ok: boolean
  message: string
  /** Set when the caller is rate-limited, so the UI can show when to try again. */
  retryAfterSeconds?: number
}

/**
 * Asks the server to run a metrics refresh now.
 *
 * The browser never holds a platform credential, so this cannot call a platform API directly. It
 * calls the `social-ops-admin` Edge Function, which re-checks the caller's admin tier server-side,
 * applies its own rate limit and holds the secrets. A 429 here is the server's rate limit, not a
 * platform's.
 */
export async function requestManualRefresh(): Promise<ManualRefreshOutcome> {
  if (!isSupabaseConfigured()) {
    return { ok: false, message: 'Supabase is not configured in this build.' }
  }
  const db = getSupabaseBrowserClient()
  const { data: sessionData } = await db.auth.getSession()
  const accessToken = sessionData.session?.access_token
  if (!accessToken) return { ok: false, message: 'Sign in again — no active session.' }

  const { data, error } = await db.functions.invoke('social-ops-admin', {
    body: { action: 'refresh_metrics' },
  })

  if (error) {
    const status = (error as { context?: { status?: number } }).context?.status
    if (status === 429) {
      return { ok: false, message: 'Refresh is rate limited. Try again shortly.', retryAfterSeconds: 300 }
    }
    return { ok: false, message: error.message }
  }
  const body = (data ?? {}) as { ok?: boolean; message?: string }
  return { ok: Boolean(body.ok), message: body.message ?? 'Refresh requested.' }
}
