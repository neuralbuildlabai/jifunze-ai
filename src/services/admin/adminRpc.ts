import type { SupabaseClient } from '@supabase/supabase-js'

export type AdminLearnerRow = {
  id: string
  email: string | null
  created_at: string | null
  last_sign_in_at: string | null
  profile_created_at: string | null
  global_access_tier: string | null
}

export type AdminPlatformMetrics = {
  users_total: number
  signups_last_7d: number
  learner_self_paced_progress_rows: number
  flagship_course_progress_rows: number
  self_paced_completed_rows: number
  flagship_rows_with_session_completions: number
  assignments_active: number
  certificates_issued_rows: number
  support_submissions_new: number
  active_learners_last_7d_distinct: number
}

export type AdminAtRiskCounts = {
  stalled_in_progress_7d: number
  under_twenty_pct_after_14d: number
  enrolled_not_started_3d: number
}

function num(v: unknown): number {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
  }
  return 0
}

export async function rpcAdminPlatformMetrics(
  supabase: SupabaseClient,
): Promise<{ data: AdminPlatformMetrics | null; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_platform_metrics')
  if (error) return { data: null, error: error.message }
  if (!data || typeof data !== 'object') return { data: null, error: 'Empty metrics' }
  const o = data as Record<string, unknown>
  return {
    data: {
      users_total: num(o.users_total),
      signups_last_7d: num(o.signups_last_7d),
      learner_self_paced_progress_rows: num(o.learner_self_paced_progress_rows),
      flagship_course_progress_rows: num(o.flagship_course_progress_rows),
      self_paced_completed_rows: num(o.self_paced_completed_rows),
      flagship_rows_with_session_completions: num(o.flagship_rows_with_session_completions),
      assignments_active: num(o.assignments_active),
      certificates_issued_rows: num(o.certificates_issued_rows),
      support_submissions_new: num(o.support_submissions_new),
      active_learners_last_7d_distinct: num(o.active_learners_last_7d_distinct),
    },
    error: null,
  }
}

export async function rpcAdminAtRiskCounts(
  supabase: SupabaseClient,
): Promise<{ data: AdminAtRiskCounts | null; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_at_risk_counts')
  if (error) return { data: null, error: error.message }
  if (!data || typeof data !== 'object') return { data: null, error: 'Empty at-risk payload' }
  const o = data as Record<string, unknown>
  return {
    data: {
      stalled_in_progress_7d: num(o.stalled_in_progress_7d),
      under_twenty_pct_after_14d: num(o.under_twenty_pct_after_14d),
      enrolled_not_started_3d: num(o.enrolled_not_started_3d),
    },
    error: null,
  }
}

export async function rpcAdminSearchLearners(
  supabase: SupabaseClient,
  args: { limit?: number; offset?: number; search?: string | null },
): Promise<{ data: AdminLearnerRow[]; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_search_learners', {
    p_limit: args.limit ?? 50,
    p_offset: args.offset ?? 0,
    p_search: args.search ?? null,
  })
  if (error) return { data: [], error: error.message }
  const raw = data as unknown
  const arr = Array.isArray(raw) ? raw : raw ? [raw] : []
  return {
    data: arr.map((row) => {
      const r = row as Record<string, unknown>
      return {
        id: String(r.id ?? ''),
        email: r.email != null ? String(r.email) : null,
        created_at: r.created_at != null ? String(r.created_at) : null,
        last_sign_in_at: r.last_sign_in_at != null ? String(r.last_sign_in_at) : null,
        profile_created_at: r.profile_created_at != null ? String(r.profile_created_at) : null,
        global_access_tier: r.global_access_tier != null ? String(r.global_access_tier) : null,
      }
    }),
    error: null,
  }
}

export async function rpcAdminUserSummary(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_user_public_summary', {
    p_user_id: userId,
  })
  if (error) return { data: null, error: error.message }
  if (!data || typeof data !== 'object') return { data: null, error: 'Not found' }
  return { data: data as Record<string, unknown>, error: null }
}

export async function rpcAdminDatabaseHealth(
  supabase: SupabaseClient,
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_database_health')
  if (error) return { data: null, error: error.message }
  return { data: (data as Record<string, unknown>) ?? null, error: null }
}

export async function rpcAdminLargestTables(
  supabase: SupabaseClient,
  limit = 12,
): Promise<{ data: { table: string; total_bytes: number; total_pretty: string }[]; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_largest_public_tables', { p_limit: limit })
  if (error) return { data: [], error: error.message }
  const raw = data as unknown
  const arr = Array.isArray(raw) ? raw : raw ? [raw] : []
  return {
    data: arr.map((row) => {
      const r = row as Record<string, unknown>
      return {
        table: String(r.table ?? ''),
        total_bytes: num(r.total_bytes),
        total_pretty: String(r.total_pretty ?? ''),
      }
    }),
    error: null,
  }
}

export async function rpcAdminAppendAudit(
  supabase: SupabaseClient,
  payload: {
    action: string
    entityType?: string | null
    entityId?: string | null
    summary?: string | null
    before?: Record<string, unknown> | null
    after?: Record<string, unknown> | null
  },
): Promise<{ error: string | null }> {
  const { error } = await supabase.rpc('admin_append_audit_log', {
    p_action: payload.action,
    p_entity_type: payload.entityType ?? null,
    p_entity_id: payload.entityId ?? null,
    p_summary: payload.summary ?? null,
    p_before: payload.before ?? null,
    p_after: payload.after ?? null,
  })
  return { error: error?.message ?? null }
}

export async function rpcAdminResetSelfPacedProgress(
  supabase: SupabaseClient,
  userId: string,
  courseSlug: string,
): Promise<{ error: string | null }> {
  const { error } = await supabase.rpc('admin_reset_self_paced_progress', {
    p_user_id: userId,
    p_course_slug: courseSlug,
  })
  return { error: error?.message ?? null }
}

export async function rpcAdminOperationsHealthSnapshot(
  supabase: SupabaseClient,
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_operations_health_snapshot')
  if (error) return { data: null, error: error.message }
  return { data: (data as Record<string, unknown>) ?? null, error: null }
}

export async function rpcAdminStorageHealthSummary(
  supabase: SupabaseClient,
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_storage_health_summary')
  if (error) return { data: null, error: error.message }
  return { data: (data as Record<string, unknown>) ?? null, error: null }
}

export async function rpcAdminSchemaHealth(
  supabase: SupabaseClient,
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_schema_health')
  if (error) return { data: null, error: error.message }
  return { data: (data as Record<string, unknown>) ?? null, error: null }
}

export async function rpcAdminProgressIntegrityHealth(
  supabase: SupabaseClient,
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_progress_integrity_health')
  if (error) return { data: null, error: error.message }
  return { data: (data as Record<string, unknown>) ?? null, error: null }
}

export async function rpcAdminCertificateHealthStats(
  supabase: SupabaseClient,
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_certificate_health_stats')
  if (error) return { data: null, error: error.message }
  return { data: (data as Record<string, unknown>) ?? null, error: null }
}

export async function rpcAdminRoleHealth(
  supabase: SupabaseClient,
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_get_admin_role_health')
  if (error) return { data: null, error: error.message }
  return { data: (data as Record<string, unknown>) ?? null, error: null }
}

export type SystemAccountRow = {
  user_id: string
  display_name: string | null
  email: string | null
  effective_access_tier: string
  profile_global_access_tier: string | null
  is_super_admin: boolean
  is_platform_admin: boolean
  is_admin: boolean
  profile_exists: boolean
  auth_user_exists: boolean
  email_confirmed: boolean
  created_at: string | null
  last_sign_in_at: string | null
  last_activity_at: string | null
  warnings: string[]
}

export async function rpcAdminListSystemAccounts(
  supabase: SupabaseClient,
  args: { limit?: number; offset?: number; search?: string | null },
): Promise<{ data: SystemAccountRow[]; error: string | null }> {
  const { data, error } = await supabase.rpc('admin_list_system_accounts', {
    p_limit: args.limit ?? 100,
    p_offset: args.offset ?? 0,
    p_search: args.search ?? null,
  })
  if (error) return { data: [], error: error.message }
  let parsed: unknown = data
  if (typeof data === 'string') {
    try {
      parsed = JSON.parse(data) as unknown
    } catch {
      parsed = []
    }
  }
  const arr = Array.isArray(parsed) ? parsed : []
  return {
    data: arr.map((row) => {
      const r = row as Record<string, unknown>
      const w = r.warnings
      return {
        user_id: String(r.user_id ?? ''),
        display_name: r.display_name != null ? String(r.display_name) : null,
        email: r.email != null ? String(r.email) : null,
        effective_access_tier: String(r.effective_access_tier ?? 'member'),
        profile_global_access_tier: r.profile_global_access_tier != null ? String(r.profile_global_access_tier) : null,
        is_super_admin: Boolean(r.is_super_admin),
        is_platform_admin: Boolean(r.is_platform_admin),
        is_admin: Boolean(r.is_admin),
        profile_exists: Boolean(r.profile_exists),
        auth_user_exists: Boolean(r.auth_user_exists),
        email_confirmed: Boolean(r.email_confirmed),
        created_at: r.created_at != null ? String(r.created_at) : null,
        last_sign_in_at: r.last_sign_in_at != null ? String(r.last_sign_in_at) : null,
        last_activity_at: r.last_activity_at != null ? String(r.last_activity_at) : null,
        warnings: Array.isArray(w) ? w.map((x) => String(x)) : [],
      }
    }),
    error: null,
  }
}
