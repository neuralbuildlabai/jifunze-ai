import type { AdminHealthCheck, AdminHealthStatus } from './adminEnv'

const STATUS_ORDER: AdminHealthStatus[] = ['critical', 'warning', 'unknown', 'info', 'healthy']

function rankStatus(s: AdminHealthStatus): number {
  const i = STATUS_ORDER.indexOf(s)
  return i === -1 ? 99 : i
}

export function sortHealthChecksBySeverity(checks: AdminHealthCheck[]): AdminHealthCheck[] {
  return [...checks].sort((a, b) => rankStatus(a.status) - rankStatus(b.status))
}

/** Plain-text summary safe to paste in tickets — no raw URLs or JWT-like strings. */
export function sanitizeAdminHealthSummaryForClipboard(checks: AdminHealthCheck[]): string {
  const lines: string[] = []
  const jwtLike = /eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/
  for (const c of sortHealthChecksBySeverity(checks)) {
    const desc = scrubLine(c.description)
    const rem = c.remediation ? scrubLine(c.remediation) : ''
    const ev = c.evidence ? scrubLine(c.evidence) : ''
    let block = `${c.status.toUpperCase()} · ${scrubLine(c.label)}\n${desc}`
    if (rem) block += `\nRecommended: ${rem}`
    if (ev && !jwtLike.test(ev)) block += `\nEvidence: ${ev}`
    lines.push(block)
  }
  return lines.join('\n\n')
}

function scrubLine(s: string): string {
  return s
    .replace(/https?:\/\/\S+/gi, '[url]')
    .replace(/\bsk_live_[a-z0-9]+\b/gi, '[secret]')
    .replace(/\bsk_test_[a-z0-9]+\b/gi, '[secret]')
    .replace(/eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_.-]+\.[a-zA-Z0-9_-]+/g, '[jwt]')
}

export function parseStorageHealthRpc(data: Record<string, unknown> | null, checkedAt?: string): AdminHealthCheck[] {
  const ts = checkedAt ?? new Date().toISOString()
  if (!data) {
    return [
      {
        status: 'unknown',
        label: 'Storage (RPC)',
        description: 'Storage health RPC returned no payload.',
        remediation: 'Apply migration `20260516120000_admin_diagnostics_health_rpcs.sql` and confirm `admin_get_storage_health_summary` is granted.',
        lastCheckedAt: ts,
      },
    ]
  }
  const buckets = data.buckets
  const warns = data.warnings
  const warnList = Array.isArray(warns) ? warns.map((w) => String(w)) : []
  const checks: AdminHealthCheck[] = []
  if (!Array.isArray(buckets) || buckets.length === 0) {
    checks.push({
      status: warnList.length ? 'warning' : 'unknown',
      label: 'Storage buckets',
      description: warnList.length ? warnList.join(' · ') : 'No buckets returned from storage schema (or storage unavailable).',
      remediation: 'Confirm Storage is enabled and the definer can read `storage.buckets`.',
      lastCheckedAt: String(data.checked_at ?? ts),
    })
  } else {
    const pub = buckets.filter((b: unknown) => (b as { public?: boolean }).public === true).length
    checks.push({
      status: pub > 0 ? 'warning' : 'healthy',
      label: 'Storage buckets',
      description: `${buckets.length} bucket(s). Public buckets: ${pub}. Counts are estimates from storage.objects aggregates.`,
      remediation: pub > 0 ? 'Review public vs private buckets for course assets.' : undefined,
      lastCheckedAt: String(data.checked_at ?? ts),
    })
    for (const b of buckets as { name?: string; public?: boolean; file_count_estimate?: number }[]) {
      checks.push({
        status: 'info',
        label: `Bucket · ${String(b.name ?? '—')}`,
        description: `Public: ${b.public === true ? 'yes' : 'no'} · estimated objects: ${String(b.file_count_estimate ?? 0)}`,
        remediation: 'Bucket names only — no paths or signed URLs.',
        lastCheckedAt: String(data.checked_at ?? ts),
      })
    }
  }
  for (const w of warnList) {
    checks.push({
      status: w.includes('public bucket') ? 'warning' : 'info',
      label: 'Storage policy note',
      description: w,
      lastCheckedAt: String(data.checked_at ?? ts),
    })
  }
  return checks
}

const SENSITIVE_TABLES = new Set([
  'learner_self_paced_progress',
  'flagship_course_progress',
  'learner_certificates',
  'support_submissions',
  'learner_course_assignments',
  'admin_audit_log',
])

export function parseSchemaHealthRpc(data: Record<string, unknown> | null, checkedAt?: string): AdminHealthCheck[] {
  const ts = checkedAt ?? new Date().toISOString()
  if (!data) {
    return [
      {
        status: 'unknown',
        label: 'Schema (RPC)',
        description: 'Schema health RPC returned no payload.',
        remediation: 'Apply `20260516120000_admin_diagnostics_health_rpcs.sql`.',
        lastCheckedAt: ts,
      },
    ]
  }
  const checks: AdminHealthCheck[] = []
  const tables = data.required_tables
  const funcs = data.required_functions
  const tArr = Array.isArray(tables) ? tables : []
  const fArr = Array.isArray(funcs) ? funcs : []
  for (const row of tArr as { name?: string; exists?: boolean; rls_enabled?: boolean }[]) {
    const name = String(row.name ?? '')
    const ex = row.exists === true
    const rls = row.rls_enabled === true
    let status: AdminHealthStatus = 'healthy'
    let remediation: string | undefined
    if (!ex) {
      status = 'critical'
      remediation = `Apply migrations that create public.${name}.`
    } else if (SENSITIVE_TABLES.has(name) && !rls) {
      status = 'critical'
      remediation = `Enable RLS on public.${name} and ship policies before production traffic.`
    } else if (name === 'profiles' && !rls) {
      status = 'warning'
      remediation = 'Confirm profiles RLS matches your tenant model.'
    }
    checks.push({
      status,
      label: `Table · ${name}`,
      description: ex ? `Exists · RLS ${rls ? 'on' : 'off'}.` : 'Missing from public schema.',
      remediation,
      lastCheckedAt: String(data.checked_at ?? ts),
    })
  }
  for (const row of fArr as { name?: string; exists?: boolean }[]) {
    const name = String(row.name ?? '')
    const ex = row.exists === true
    checks.push({
      status: ex ? 'healthy' : 'critical',
      label: `RPC · ${name}`,
      description: ex ? 'Function exists in public schema.' : 'Missing function — migrations incomplete.',
      remediation: ex ? undefined : 'Deploy latest SQL migrations to this database.',
      lastCheckedAt: String(data.checked_at ?? ts),
    })
  }
  return checks
}

export function parseProgressIntegrityRpc(
  data: Record<string, unknown> | null,
  inventorySlugs: Set<string>,
  checkedAt?: string,
): AdminHealthCheck[] {
  const ts = checkedAt ?? new Date().toISOString()
  if (!data) {
    return [
      {
        status: 'unknown',
        label: 'Progress integrity (RPC)',
        description: 'No payload from admin_get_progress_integrity_health.',
        remediation: 'Apply diagnostics migration and grant execute to authenticated admins.',
        lastCheckedAt: ts,
      },
    ]
  }
  const checks: AdminHealthCheck[] = []
  const dup = Number(data.duplicate_user_course_groups ?? 0)
  const miss = Number(data.active_progress_missing_resume_pointers ?? 0)
  const stale = Number(data.course_slugs_stale_90d ?? 0)
  checks.push({
    status: dup > 0 ? 'critical' : 'healthy',
    label: 'Duplicate self-paced keys',
    description: `Groups with duplicate (user_id, course_slug): ${dup}.`,
    remediation: dup > 0 ? 'Merge duplicate rows in Supabase; unique constraint should normally prevent this.' : undefined,
    lastCheckedAt: String(data.checked_at ?? ts),
  })
  checks.push({
    status: miss > 0 ? 'warning' : 'healthy',
    label: 'Active progress missing resume pointers',
    description: `Rows in progress with >0% but no current module/session/day slug: ${miss}.`,
    remediation: miss > 0 ? 'Inspect affected rows — resume pointers may not be serialized.' : undefined,
    lastCheckedAt: String(data.checked_at ?? ts),
  })
  checks.push({
    status: stale > 0 ? 'info' : 'healthy',
    label: 'Stale course slugs (90d)',
    description: `Distinct course_slug values with no self-paced update in 90+ days: ${stale}.`,
    remediation: stale > 0 ? 'May be retired courses or inactive cohorts — cross-check catalog.' : undefined,
    lastCheckedAt: String(data.checked_at ?? ts),
  })

  const stats = data.self_paced_slug_stats
  const orphans: string[] = []
  if (Array.isArray(stats)) {
    for (const s of stats as { course_slug?: string }[]) {
      const slug = String(s.course_slug ?? '')
      if (slug && !inventorySlugs.has(slug)) {
        orphans.push(slug)
      }
    }
  }
  if (orphans.length) {
    checks.push({
      status: 'warning',
      label: 'Progress rows for unknown catalog slugs',
      description: `${orphans.length} slug(s) in self-paced table not present in merged admin inventory: ${orphans.slice(0, 12).join(', ')}${orphans.length > 12 ? '…' : ''}.`,
      remediation: 'Add catalog metadata, migrate learners to a new slug, or archive orphan rows after review.',
      lastCheckedAt: String(data.checked_at ?? ts),
    })
  }

  checks.push({
    status: 'info',
    label: 'Local-only progress',
    description:
      'Courses that only persist to localStorage are not visible here. Inventory slugs are the reconciliation source for orphan DB rows.',
    lastCheckedAt: String(data.checked_at ?? ts),
  })
  return checks
}

export function parseCertificateHealthStatsRpc(data: Record<string, unknown> | null, checkedAt?: string): AdminHealthCheck[] {
  const ts = checkedAt ?? new Date().toISOString()
  if (!data) {
    return [
      {
        status: 'unknown',
        label: 'Certificates (RPC)',
        description: 'No payload from admin_get_certificate_health_stats.',
        remediation: 'Apply diagnostics migration.',
        lastCheckedAt: ts,
      },
    ]
  }
  const total = Number(data.total_rows ?? 0)
  const issued = Number(data.issued_rows ?? 0)
  const missCode = Number(data.issued_missing_certificate_code ?? 0)
  const missUrl = Number(data.issued_missing_verification_url ?? 0)
  const expired = Number(data.issued_expired ?? 0)
  const checks: AdminHealthCheck[] = [
    {
      status: 'healthy',
      label: 'Certificate table rows',
      description: `Total rows: ${total} · Issued: ${issued}.`,
      lastCheckedAt: String(data.checked_at ?? ts),
    },
  ]
  if (missCode > 0) {
    checks.push({
      status: 'warning',
      label: 'Issued certificates missing code',
      description: `Count: ${missCode}.`,
      remediation: 'Backfill certificate_code or fix issuance pipeline.',
      lastCheckedAt: String(data.checked_at ?? ts),
    })
  }
  if (missUrl > 0) {
    checks.push({
      status: 'warning',
      label: 'Issued certificates missing verification URL',
      description: `Count: ${missUrl}.`,
      remediation: 'Set verification_url when issuing or hide learner verification until wired.',
      lastCheckedAt: String(data.checked_at ?? ts),
    })
  }
  if (expired > 0) {
    checks.push({
      status: 'warning',
      label: 'Expired issued certificates',
      description: `Count: ${expired}.`,
      remediation: 'Renew or revoke expired rows per policy.',
      lastCheckedAt: String(data.checked_at ?? ts),
    })
  }
  checks.push({
    status: 'warning',
    label: 'Certificate issuance (app)',
    description:
      'Learner-facing certificate list in the app may still be partially stubbed — treat DB rows as source of truth for ops.',
    remediation: 'Wire completion → learner_certificates before marketing verification flows.',
    lastCheckedAt: String(data.checked_at ?? ts),
  })
  return checks
}
