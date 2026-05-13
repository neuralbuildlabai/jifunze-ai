import type { SupabaseClient } from '@supabase/supabase-js'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { getLearnerCertificates } from '../../lib/learnerProgressHub'
import { rpcAdminDatabaseHealth, rpcAdminLargestTables } from '../../services/admin/adminRpc'
import { adminBuildLabel, adminEnvironmentLabel, type AdminHealthCheck, type AdminHealthStatus } from './adminEnv'

export type AdminEnvironmentHealth = {
  overall: AdminHealthStatus
  sections: AdminHealthCheck[]
  lastCheckedAt: string
}

export function worstHealth(a: AdminHealthStatus, b: AdminHealthStatus): AdminHealthStatus {
  const rank: Record<AdminHealthStatus, number> = {
    healthy: 0,
    info: 0,
    unknown: 1,
    warning: 2,
    critical: 3,
  }
  return rank[a] >= rank[b] ? a : b
}

export async function getDatabaseHealthSummary(
  supabase: SupabaseClient | null,
): Promise<{ checks: AdminHealthCheck[]; overall: AdminHealthStatus }> {
  const ts = new Date().toISOString()
  if (!isSupabaseConfigured() || !supabase) {
    return {
      overall: 'unknown',
      checks: [
        {
          status: 'unknown',
          label: 'Database',
          description: 'Supabase is not configured in this build.',
          remediation: 'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for live metrics.',
          lastCheckedAt: ts,
        },
      ],
    }
  }
  const { data, error } = await rpcAdminDatabaseHealth(supabase)
  if (error || !data) {
    return {
      overall: 'warning',
      checks: [
        {
          status: 'warning',
          label: 'Database',
          description: 'Could not load database health (migrations may not be applied yet).',
          evidence: error ?? undefined,
          remediation: 'Apply latest Supabase migrations including admin RPCs.',
          lastCheckedAt: ts,
        },
      ],
    }
  }
  const sizePretty = String(data.database_size_pretty ?? '—')
  const stats = data.table_stats as Record<string, { approx_rows?: number | null; rls_enabled?: boolean }> | undefined
  const self = stats?.learner_self_paced_progress
  const checks: AdminHealthCheck[] = [
    {
      status: 'healthy',
      label: 'Database size',
      description: `Current database size: ${sizePretty}.`,
      lastCheckedAt: String(data.checked_at ?? ts),
    },
  ]
  let overall: AdminHealthStatus = 'healthy'
  if (!self) {
    checks.push({
      status: 'critical',
      label: 'learner_self_paced_progress',
      description: 'Table statistics missing from health payload.',
      remediation: 'Verify migration 20260513120000_learner_self_paced_progress.sql is applied.',
      lastCheckedAt: ts,
    })
    overall = worstHealth(overall, 'critical')
  } else {
    if (self.rls_enabled === false) {
      checks.push({
        status: 'critical',
        label: 'RLS: learner_self_paced_progress',
        description: 'Row level security appears disabled for learner progress.',
        remediation: 'Enable RLS and learner-scoped policies immediately.',
        lastCheckedAt: ts,
      })
      overall = worstHealth(overall, 'critical')
    } else {
      checks.push({
        status: 'healthy',
        label: 'learner_self_paced_progress',
        description: `Approximate rows: ${self.approx_rows ?? '—'}; RLS enabled.`,
        lastCheckedAt: ts,
      })
    }
  }
  return { checks, overall }
}

export async function getStorageHealthSummary(supabase: SupabaseClient | null): Promise<AdminHealthCheck[]> {
  const ts = new Date().toISOString()
  if (!supabase || !isSupabaseConfigured()) {
    return [
      {
        status: 'unknown',
        label: 'Storage',
        description: 'Storage metrics are unavailable without Supabase.',
        lastCheckedAt: ts,
      },
    ]
  }
  try {
    const { data, error } = await supabase.storage.listBuckets()
    if (error) {
      return [
        {
          status: 'warning',
          label: 'Storage',
          description: 'Bucket list could not be retrieved with the current session.',
          evidence: error.message,
          remediation: 'Confirm storage policies allow authenticated operators, or inspect buckets in Supabase Studio.',
          lastCheckedAt: ts,
        },
      ]
    }
    const n = data?.length ?? 0
    return [
      {
        status: n > 0 ? 'healthy' : 'warning',
        label: 'Storage',
        description: n > 0 ? `${n} bucket(s) visible to this session.` : 'No buckets returned.',
        lastCheckedAt: ts,
      },
    ]
  } catch (e) {
    return [
      {
        status: 'unknown',
        label: 'Storage',
        description: 'Unexpected error while listing buckets.',
        evidence: e instanceof Error ? e.message : String(e),
        lastCheckedAt: ts,
      },
    ]
  }
}

export function getAuthHealthSummary(): AdminHealthCheck[] {
  const ts = new Date().toISOString()
  const url = isSupabaseConfigured()
  return [
    {
      status: url ? 'healthy' : 'warning',
      label: 'Authentication',
      description: url
        ? 'Supabase Auth is configured for this deployment.'
        : 'Demo mode: no Supabase URL — auth flows use local persistence only.',
      lastCheckedAt: ts,
    },
    {
      status: 'info',
      label: 'Canonical admin accounts',
      description:
        'Super admin and platform admin resolution is enforced in `public.my_effective_access_tier` (canonical emails).',
      remediation: 'Never rely on the UI alone — keep RPC and RLS aligned.',
      lastCheckedAt: ts,
    },
  ]
}

export function getCertificateHealthSummary(): AdminHealthCheck[] {
  const ts = new Date().toISOString()
  return [
    {
      status: 'warning',
      label: 'Certificate issuance (app)',
      description:
        'Client certificate listing is not wired to Supabase yet (`getLearnerCertificates` is a stub). Database table `learner_certificates` is ready for future issuance.',
      remediation: 'Connect completion pipelines to `learner_certificates` before showing learner-facing records.',
      lastCheckedAt: ts,
    },
  ]
}

export function getIntegrationHealthSummary(): AdminHealthCheck[] {
  const ts = new Date().toISOString()
  return [
    {
      status: isSupabaseConfigured() ? 'healthy' : 'unknown',
      label: 'Supabase',
      description: isSupabaseConfigured() ? 'URL and anon key are present (values not shown).' : 'Not configured.',
      lastCheckedAt: ts,
    },
    {
      status: 'unknown',
      label: 'Email / payments',
      description: 'Operational status for transactional email and payments is not queried from this UI.',
      lastCheckedAt: ts,
    },
  ]
}

export function getSecurityHealthSummary(): AdminHealthCheck[] {
  const ts = new Date().toISOString()
  return [
    {
      status: 'healthy',
      label: 'Admin route isolation',
      description: '/admin routes are wrapped with RequireAdminAccess and tier checks.',
      lastCheckedAt: ts,
    },
    {
      status: 'healthy',
      label: 'Learner progress RLS',
      description: 'Learner progress remains user-scoped; admins use explicit policies and RPCs.',
      lastCheckedAt: ts,
    },
  ]
}

export async function getSystemWarnings(
  supabase: SupabaseClient | null,
): Promise<{ severity: AdminHealthStatus; message: string }[]> {
  const out: { severity: AdminHealthStatus; message: string }[] = []
  const stub = await getLearnerCertificates()
  if (stub.length === 0) {
    out.push({
      severity: 'info',
      message:
        'Learner certificate list in the app is still a stub — admin certificate metrics stay database-backed only.',
    })
  }
  const { overall } = await getDatabaseHealthSummary(supabase)
  if (overall === 'critical') {
    out.push({ severity: 'critical', message: 'Database or learner progress RLS needs immediate attention.' })
  }
  if (!isSupabaseConfigured()) {
    out.push({
      severity: 'warning',
      message: 'Supabase is not configured — admin metrics and health are partially unavailable.',
    })
  }
  return out
}

export async function getAdminEnvironmentHealth(supabase: SupabaseClient | null): Promise<AdminEnvironmentHealth> {
  const ts = new Date().toISOString()
  const sections: AdminHealthCheck[] = [
    {
      status: 'healthy',
      label: 'Frontend deployment',
      description: `Environment: ${adminEnvironmentLabel()}. Build ref: ${adminBuildLabel()}.`,
      evidence: `mode=${import.meta.env.MODE}`,
      lastCheckedAt: ts,
    },
  ]

  const db = await getDatabaseHealthSummary(supabase)
  sections.push({
    status: db.overall,
    label: 'Database',
    description: 'Aggregated size and key table statistics via `admin_get_database_health`.',
    lastCheckedAt: ts,
  })

  const storage = await getStorageHealthSummary(supabase)
  sections.push(...storage)

  let overall: AdminHealthStatus = 'healthy'
  for (const s of sections) overall = worstHealth(overall, s.status)

  return { overall, sections, lastCheckedAt: ts }
}

export async function getLargestTablesOrEmpty(supabase: SupabaseClient | null) {
  if (!supabase || !isSupabaseConfigured()) return []
  const { data } = await rpcAdminLargestTables(supabase, 12)
  return data
}
