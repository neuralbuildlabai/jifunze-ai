import * as React from 'react'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import { rpcAdminPlatformMetrics, type AdminPlatformMetrics } from '../../../services/admin/adminRpc'

function downloadCsv(filename: string, lines: string[]) {
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const METRICS_CSV_KEYS: (keyof AdminPlatformMetrics)[] = [
  'users_total',
  'signups_last_7d',
  'learner_self_paced_progress_rows',
  'flagship_course_progress_rows',
  'self_paced_completed_rows',
  'flagship_rows_with_session_completions',
  'assignments_active',
  'certificates_issued_rows',
  'support_submissions_new',
  'active_learners_last_7d_distinct',
]

export function AdminReportsPage() {
  const { supabase } = useAuth()
  const [hint, setHint] = React.useState<string | null>(null)

  const exportLearnerActivity = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setHint('Supabase not configured.')
      return
    }
    const { data, error } = await supabase
      .from('learner_self_paced_progress')
      .select('user_id, course_slug, status, progress_percentage, last_activity_at, updated_at')
      .order('updated_at', { ascending: false })
      .limit(500)
    if (error) {
      setHint(error.message)
      return
    }
    const header = ['learner_user_id', 'course', 'progress_pct', 'status', 'last_activity', 'updated_at']
    const rows = (data ?? []).map((r: Record<string, unknown>) =>
      [r.user_id, r.course_slug, r.progress_percentage, r.status, r.last_activity_at, r.updated_at]
        .map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`)
        .join(','),
    )
    downloadCsv('learner-activity.csv', [header.join(','), ...rows])
    setHint('Exported learner activity (self-paced, up to 500 rows).')
  }

  const exportProgressRows = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setHint('Supabase not configured.')
      return
    }
    const { data, error } = await supabase
      .from('learner_self_paced_progress')
      .select('user_id, course_slug, status, progress_percentage, last_activity_at, updated_at')
      .order('updated_at', { ascending: false })
      .limit(500)
    if (error) {
      setHint(error.message)
      return
    }
    const header = ['learner_user_id', 'course', 'progress_pct', 'status', 'last_activity', 'updated_at']
    const rows = (data ?? []).map((r: Record<string, unknown>) =>
      [r.user_id, r.course_slug, r.progress_percentage, r.status, r.last_activity_at, r.updated_at]
        .map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`)
        .join(','),
    )
    downloadCsv('learner-progress.csv', [header.join(','), ...rows])
    setHint('Exported progress rows (same source as activity export; split for reporting workflows).')
  }

  const exportCompletions = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setHint('Supabase not configured.')
      return
    }
    const { data, error } = await supabase
      .from('learner_self_paced_progress')
      .select('user_id, course_slug, status, progress_percentage, last_activity_at, updated_at')
      .or('status.eq.completed,status.eq.certified,status.eq.certificate_eligible,progress_percentage.gte.100')
      .order('updated_at', { ascending: false })
      .limit(500)
    if (error) {
      setHint(error.message)
      return
    }
    const header = ['learner_user_id', 'course', 'progress_pct', 'status', 'last_activity', 'updated_at']
    const rows = (data ?? []).map((r: Record<string, unknown>) =>
      [r.user_id, r.course_slug, r.progress_percentage, r.status, r.last_activity_at, r.updated_at]
        .map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`)
        .join(','),
    )
    downloadCsv('learner-completions.csv', [header.join(','), ...rows])
    setHint('Exported self-paced rows marked completed or ≥100% progress (up to 500).')
  }

  const exportCertificates = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setHint('Supabase not configured.')
      return
    }
    const { data, error } = await supabase
      .from('learner_certificates')
      .select('id, user_id, course_slug, certificate_code, issued_at, status, verification_url')
      .order('issued_at', { ascending: false })
      .limit(500)
    if (error) {
      setHint(error.message)
      return
    }
    const header = ['id', 'user_id', 'course_slug', 'certificate_code', 'issued_at', 'status', 'verification_url']
    const rows = (data ?? []).map((r: Record<string, unknown>) =>
      [r.id, r.user_id, r.course_slug, r.certificate_code, r.issued_at, r.status, r.verification_url]
        .map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`)
        .join(','),
    )
    downloadCsv('certificates.csv', [header.join(','), ...rows])
    setHint('Exported certificate rows (business fields only; metadata column excluded).')
  }

  const exportSupport = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setHint('Supabase not configured.')
      return
    }
    const { data, error } = await supabase
      .from('support_submissions')
      .select('id, user_id, name, email, subject, status, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(500)
    if (error) {
      setHint(error.message)
      return
    }
    const header = ['id', 'user_id', 'name', 'email', 'subject', 'status', 'created_at', 'updated_at']
    const rows = (data ?? []).map((r: Record<string, unknown>) =>
      [r.id, r.user_id, r.name, r.email, r.subject, r.status, r.created_at, r.updated_at]
        .map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`)
        .join(','),
    )
    downloadCsv('support-tickets.csv', [header.join(','), ...rows])
    setHint('Exported support tickets (message body excluded to keep CSV lightweight).')
  }

  const exportSummary = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setHint('Supabase not configured.')
      return
    }
    const m = await rpcAdminPlatformMetrics(supabase)
    if (m.error || !m.data) {
      setHint(m.error ?? 'No metrics')
      return
    }
    const d = m.data
    const header = METRICS_CSV_KEYS.join(',')
    const vals = METRICS_CSV_KEYS.map((k) => `"${String(d[k]).replace(/"/g, '""')}"`).join(',')
    downloadCsv('platform-metrics.csv', [header, vals])
    setHint('Exported platform metrics snapshot (allowlisted aggregate fields only).')
  }

  return (
    <div className="space-y-8" data-testid="admin-reports-page">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Reports</h1>
        <p className="mt-1 max-w-2xl text-sm text-zinc-600">
          CSV exports use operational fields only — no auth tokens, refresh tokens, message bodies (where excluded), or raw JSON metadata
          blobs.
        </p>
      </div>
      {hint ? <p className="text-sm text-zinc-600">{hint}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          className="rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:border-zinc-300"
          onClick={() => void exportLearnerActivity()}
        >
          <p className="text-sm font-semibold text-zinc-900">Activity report</p>
          <p className="mt-1 text-xs text-zinc-500">Self-paced updates · CSV · last 500 rows</p>
        </button>
        <button
          type="button"
          className="rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:border-zinc-300"
          onClick={() => void exportProgressRows()}
        >
          <p className="text-sm font-semibold text-zinc-900">Progress report</p>
          <p className="mt-1 text-xs text-zinc-500">Same progress table export under a dedicated filename</p>
        </button>
        <button
          type="button"
          className="rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:border-zinc-300"
          onClick={() => void exportCompletions()}
        >
          <p className="text-sm font-semibold text-zinc-900">Completion report</p>
          <p className="mt-1 text-xs text-zinc-500">Self-paced rows completed or ≥100% progress</p>
        </button>
        <button
          type="button"
          className="rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:border-zinc-300"
          onClick={() => void exportCertificates()}
        >
          <p className="text-sm font-semibold text-zinc-900">Certificate report</p>
          <p className="mt-1 text-xs text-zinc-500">Certificate table · excludes metadata json</p>
        </button>
        <button
          type="button"
          className="rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:border-zinc-300"
          onClick={() => void exportSupport()}
        >
          <p className="text-sm font-semibold text-zinc-900">Support tickets</p>
          <p className="mt-1 text-xs text-zinc-500">Operational fields only · no full message body</p>
        </button>
        <button
          type="button"
          className="rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:border-zinc-300"
          onClick={() => void exportSummary()}
        >
          <p className="text-sm font-semibold text-zinc-900">Platform metrics snapshot</p>
          <p className="mt-1 text-xs text-zinc-500">RPC aggregates · fixed column allowlist</p>
        </button>
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-left">
          <p className="text-sm font-semibold text-zinc-800">Inactive learners report</p>
          <p className="mt-1 text-xs text-zinc-600">
            Unavailable from CSV until a dedicated admin RPC returns dormant learner rows (avoid heavy client-side scans).
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-left">
          <p className="text-sm font-semibold text-zinc-800">Course performance report</p>
          <p className="mt-1 text-xs text-zinc-600">
            Unavailable as a single export — use per-course admin analytics plus progress tables for now.
          </p>
        </div>
      </div>
    </div>
  )
}
