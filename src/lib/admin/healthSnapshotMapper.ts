import type { AdminHealthCheck, AdminHealthStatus } from './adminEnv'
import { adminEnvironmentLabel } from './adminEnv'

export type OperationsHealthSnapshot = {
  checked_at?: string
  database?: Record<string, unknown>
  progress?: Record<string, unknown>
  canonical_operators?: Record<string, unknown>
}

export function mapSnapshotToStripItems(
  snap: OperationsHealthSnapshot | null,
  extras: {
    storageStatus: AdminHealthStatus
    storageDetail: string
    certStatus: AdminHealthStatus
    certDetail: string
    integrationStatus: AdminHealthStatus
    integrationDetail: string
  },
): { key: string; title: string; status: AdminHealthStatus; detail: string }[] {
  const db = snap?.database ?? {}
  const prog = snap?.progress ?? {}
  const canon = snap?.canonical_operators ?? {}

  const rlsSelf = db.rls_learner_self_paced_progress === true
  const rlsFlag = db.rls_flagship_course_progress === true
  const dup = Number(db.duplicate_self_paced_user_course_groups ?? 0) > 0
  const usersNoProf = Number(db.users_without_profile_rows ?? 0) > 0

  const dbStatus: AdminHealthStatus =
    !snap || db.connection_status !== 'ok'
      ? 'unknown'
      : !rlsSelf
        ? 'critical'
        : dup || usersNoProf
          ? 'warning'
          : 'healthy'

  const dbDetail =
    typeof db.database_size_pretty === 'string'
      ? `${String(db.database_size_pretty)} · self-paced RLS ${rlsSelf ? 'on' : 'off'}`
      : 'Database snapshot unavailable.'

  const progStatus: AdminHealthStatus =
    !snap ? 'unknown' : dup ? 'critical' : rlsFlag ? 'healthy' : 'warning'
  const progDetail = dup
    ? 'Duplicate self-paced (user,course) groups detected.'
    : `Recent self-paced write: ${prog.recent_self_paced_write_max_at ? String(prog.recent_self_paced_write_max_at) : 'none'}`

  const superFound = canon.super_admin_user_found === true
  const superTier = canon.super_admin_resolved_tier != null ? String(canon.super_admin_resolved_tier) : undefined
  const platFound = canon.platform_admin_user_found === true
  const platTier = canon.platform_admin_resolved_tier != null ? String(canon.platform_admin_resolved_tier) : undefined

  const authStatus: AdminHealthStatus = (() => {
    if (!superFound || superTier !== 'super_admin') return 'critical'
    if (!platFound || platTier !== 'platform_admin') return 'warning'
    return 'healthy'
  })()
  const authDetail = `Super: ${superFound ? superTier : 'missing'} · Platform: ${platFound ? platTier : 'missing'}`

  const courseStatus: AdminHealthStatus = 'info'
  const courseDetail = 'Use Courses + Health tabs for route/catalog checks.'

  const secStatus: AdminHealthStatus = !rlsSelf || !rlsFlag ? 'critical' : 'healthy'
  const secDetail = `RLS flagship ${rlsFlag ? 'on' : 'off'} · duplicate groups ${Number(db.duplicate_self_paced_user_course_groups ?? 0)}`

  const supportNew = Number(db.support_submissions_new_count ?? 0)
  const supportTotal = Number(db.support_submissions_total ?? 0)
  const supportStatus: AdminHealthStatus =
    snap == null ? 'unknown' : supportNew > 25 ? 'warning' : 'healthy'
  const supportDetail =
    snap == null
      ? 'Ticket counts unavailable.'
      : `${supportNew} new · ${supportTotal} total submissions in table.`

  return [
    { key: 'env', title: 'Environment', status: 'healthy', detail: adminEnvironmentLabel() },
    { key: 'db', title: 'Database', status: dbStatus, detail: dbDetail },
    { key: 'auth', title: 'Auth / operators', status: authStatus, detail: authDetail },
    { key: 'storage', title: 'Storage', status: extras.storageStatus, detail: extras.storageDetail },
    { key: 'courses', title: 'Course delivery', status: courseStatus, detail: courseDetail },
    { key: 'progress', title: 'Progress', status: progStatus, detail: progDetail },
    { key: 'certs', title: 'Certificates', status: extras.certStatus, detail: extras.certDetail },
    { key: 'sec', title: 'Security / RLS', status: secStatus, detail: secDetail },
    { key: 'support', title: 'Support', status: supportStatus, detail: supportDetail },
    { key: 'int', title: 'Integrations', status: extras.integrationStatus, detail: extras.integrationDetail },
  ]
}

export function snapshotToHealthChecks(snap: OperationsHealthSnapshot | null): AdminHealthCheck[] {
  if (!snap) {
    return [
      {
        status: 'unknown',
        label: 'Operations snapshot',
        description: 'Run migrations including admin_get_operations_health_snapshot, then reload.',
        lastCheckedAt: new Date().toISOString(),
      },
    ]
  }
  const db = snap.database ?? {}
  return [
    {
      status: 'healthy',
      label: 'Snapshot timestamp',
      description: `Last assembled at ${String(snap.checked_at ?? '')}.`,
      lastCheckedAt: String(snap.checked_at ?? ''),
    },
    {
      status: db.connection_status === 'ok' ? 'healthy' : 'unknown',
      label: 'Database connection',
      description: String(db.connection_status ?? 'unknown'),
      lastCheckedAt: String(snap.checked_at ?? ''),
    },
    {
      status: Number(db.duplicate_self_paced_user_course_groups ?? 0) > 0 ? 'critical' : 'healthy',
      label: 'Duplicate self-paced keys',
      description: `Groups with duplicate (user_id, course_slug): ${String(db.duplicate_self_paced_user_course_groups ?? '—')}.`,
      remediation: 'Investigate and merge duplicate rows in Supabase.',
      lastCheckedAt: String(snap.checked_at ?? ''),
    },
    {
      status: Number(db.users_without_profile_rows ?? 0) > 0 ? 'warning' : 'healthy',
      label: 'Users without profiles',
      description: `Count: ${String(db.users_without_profile_rows ?? 0)}.`,
      lastCheckedAt: String(snap.checked_at ?? ''),
    },
    {
      status: Number(db.profiles_without_auth_user_rows ?? 0) > 0 ? 'warning' : 'healthy',
      label: 'Profiles without auth users',
      description: `Count: ${String(db.profiles_without_auth_user_rows ?? 0)}.`,
      remediation: 'Orphan profile rows — reconcile in Supabase Studio.',
      lastCheckedAt: String(snap.checked_at ?? ''),
    },
    {
      status: 'healthy',
      label: 'Support submissions (table)',
      description: `${String(db.support_submissions_new_count ?? 0)} new · ${String(db.support_submissions_total ?? 0)} total.`,
      lastCheckedAt: String(snap.checked_at ?? ''),
    },
    {
      status: 'healthy',
      label: 'Certificates (table rows)',
      description: `learner_certificates count: ${String(db.learner_certificates_count ?? 0)}.`,
      lastCheckedAt: String(snap.checked_at ?? ''),
    },
  ]
}
