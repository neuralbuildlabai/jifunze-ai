import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import { rpcAdminResetSelfPacedProgress, rpcAdminUserSummary } from '../../../services/admin/adminRpc'
import { useAdminAccess } from '../useAdminAccess'

export function AdminLearnerDetailPage() {
  const { userId = '' } = useParams<{ userId: string }>()
  const { supabase } = useAuth()
  const { isSuperAdmin } = useAdminAccess()
  const [summary, setSummary] = React.useState<Record<string, unknown> | null>(null)
  const [selfRows, setSelfRows] = React.useState<Record<string, unknown>[]>([])
  const [flagshipRows, setFlagshipRows] = React.useState<Record<string, unknown>[]>([])
  const [supportRows, setSupportRows] = React.useState<Record<string, unknown>[]>([])
  const [auditRows, setAuditRows] = React.useState<Record<string, unknown>[]>([])
  const [err, setErr] = React.useState<string | null>(null)
  const [banner, setBanner] = React.useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const [resetModal, setResetModal] = React.useState<{ courseSlug: string } | null>(null)
  const [resetBusy, setResetBusy] = React.useState(false)

  const reload = React.useCallback(async () => {
    if (!userId || !isSupabaseConfigured() || !supabase) return
    const s = await rpcAdminUserSummary(supabase, userId)
    if (s.error) setErr(s.error)
    else setErr(null)
    setSummary(s.data)
    const emailLower = String(s.data?.email ?? '').toLowerCase()
    const [a, b, supByUid, supByEmail, aud] = await Promise.all([
      supabase.from('learner_self_paced_progress').select('*').eq('user_id', userId).order('updated_at', { ascending: false }),
      supabase.from('flagship_course_progress').select('*').eq('user_id', userId).order('updated_at', { ascending: false }),
      supabase.from('support_submissions').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(40),
      emailLower
        ? supabase.from('support_submissions').select('*').ilike('email', emailLower).order('created_at', { ascending: false }).limit(40)
        : Promise.resolve({ data: [] as Record<string, unknown>[] }),
      supabase.from('admin_audit_log').select('*').order('created_at', { ascending: false }).limit(120),
    ])
    setSelfRows((a.data as Record<string, unknown>[]) ?? [])
    setFlagshipRows((b.data as Record<string, unknown>[]) ?? [])
    const supA = (supByUid.data as Record<string, unknown>[]) ?? []
    const supB = (supByEmail.data as Record<string, unknown>[]) ?? []
    const merged = [...supA, ...supB]
    const seen = new Set<string>()
    setSupportRows(
      merged.filter((row) => {
        const id = String(row.id)
        if (seen.has(id)) return false
        seen.add(id)
        return true
      }),
    )
    const rawAud = (aud.data as Record<string, unknown>[]) ?? []
    const filteredAud = rawAud.filter((row) => {
      const hay = `${row.summary ?? ''} ${JSON.stringify(row.before_data ?? {})} ${JSON.stringify(row.after_data ?? {})}`
      return hay.includes(userId) || (emailLower && hay.toLowerCase().includes(emailLower))
    })
    setAuditRows(filteredAud.slice(0, 40))
  }, [supabase, userId])

  React.useEffect(() => {
    void reload()
  }, [reload])

  const email = String(summary?.email ?? '')

  return (
    <div className="space-y-8" data-testid="admin-learner-detail">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Learner</p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{email || userId}</h1>
          <p className="mt-1 font-mono text-xs text-zinc-500">{userId}</p>
        </div>
        <Link to="/admin/learners" className="text-sm font-medium text-zinc-900 underline-offset-2 hover:underline">
          ← Back to list
        </Link>
      </div>

      {banner ? (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            banner.kind === 'ok' ? 'border-emerald-200 bg-emerald-50 text-emerald-950' : 'border-rose-200 bg-rose-50 text-rose-950'
          }`}
        >
          {banner.text}
        </div>
      ) : null}

      {err ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-950">{err}</div> : null}

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-900">Profile summary</h2>
          <dl className="mt-3 space-y-2 text-sm text-zinc-600">
            <div className="flex justify-between gap-4">
              <dt>Email</dt>
              <dd className="text-right text-zinc-900">{email || '—'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Profile tier</dt>
              <dd className="text-right text-zinc-900">{String(summary?.global_access_tier ?? '—')}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Signup</dt>
              <dd className="text-right text-zinc-900">
                {summary?.created_at ? new Date(String(summary.created_at)).toLocaleString() : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Last sign-in</dt>
              <dd className="text-right text-zinc-900">
                {summary?.last_sign_in_at ? new Date(String(summary.last_sign_in_at)).toLocaleString() : '—'}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-zinc-500">
            Read-only impersonation is not enabled. Use progress and support sections for operational review.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-900">Resume & activity</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Most recent self-paced update:{' '}
            <span className="font-medium text-zinc-900">
              {selfRows[0]?.course_slug
                ? `${String(selfRows[0].course_slug)} · ${selfRows[0].updated_at ? new Date(String(selfRows[0].updated_at)).toLocaleString() : '—'}`
                : 'None in Supabase'}
            </span>
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Local-only browser progress is not shown here — only rows visible under admin RLS in Supabase.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Self-paced progress</h2>
        <div className="mt-3 space-y-2 text-sm">
          {selfRows.length === 0 ? (
            <p className="text-zinc-500">No self-paced rows.</p>
          ) : (
            selfRows.map((row) => (
              <div key={String(row.course_slug)} className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-50 py-2">
                <div>
                  <p className="font-medium text-zinc-900">{String(row.course_slug)}</p>
                  <p className="text-xs text-zinc-500">
                    {String(row.status)} · {String(row.progress_percentage ?? '')}% ·{' '}
                    {row.last_activity_at ? new Date(String(row.last_activity_at)).toLocaleString() : '—'}
                  </p>
                </div>
                {isSuperAdmin ? (
                  <button
                    type="button"
                    className="text-xs font-medium text-rose-700 underline-offset-2 hover:underline"
                    data-testid="admin-learner-reset-progress-open"
                    onClick={() => setResetModal({ courseSlug: String(row.course_slug) })}
                  >
                    Reset (super admin)
                  </button>
                ) : null}
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Flagship progress</h2>
        <div className="mt-3 overflow-x-auto text-sm">
          {flagshipRows.length === 0 ? (
            <p className="text-zinc-500">No flagship rows.</p>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-zinc-100 text-xs uppercase text-zinc-500">
                  <th className="py-2 pr-4">Course</th>
                  <th className="py-2 pr-4">Sessions completed</th>
                  <th className="py-2 pr-4">Last active</th>
                  <th className="py-2">Updated</th>
                </tr>
              </thead>
              <tbody>
                {flagshipRows.map((row) => (
                  <tr key={String(row.course_slug)} className="border-b border-zinc-50">
                    <td className="py-2 pr-4">{String(row.course_slug)}</td>
                    <td className="py-2 pr-4">{Array.isArray(row.completed_session_ids) ? row.completed_session_ids.length : 0}</td>
                    <td className="py-2 pr-4 text-zinc-600">
                      {row.last_active_at ? new Date(String(row.last_active_at)).toLocaleString() : '—'}
                    </td>
                    <td className="py-2 text-zinc-600">
                      {row.updated_at ? new Date(String(row.updated_at)).toLocaleString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Support history</h2>
        {supportRows.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-500">No linked support rows for this user id.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {supportRows.map((r) => (
              <li key={String(r.id)} className="border-b border-zinc-50 pb-2">
                <span className="font-medium text-zinc-900">{String(r.subject)}</span> · {String(r.status)}
                <span className="block text-xs text-zinc-400">{r.created_at ? new Date(String(r.created_at)).toLocaleString() : ''}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Audit (filtered)</h2>
        <p className="mt-1 text-xs text-zinc-500">Rows mentioning this learner in summary or JSON payloads (recent window).</p>
        {auditRows.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-500">No matching audit entries.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {auditRows.map((r) => (
              <li key={String(r.id)} className="border-b border-zinc-50 pb-2">
                <span className="font-medium text-zinc-900">{String(r.action)}</span> · {String(r.summary ?? '')}
                <span className="block text-xs text-zinc-400">{r.created_at ? new Date(String(r.created_at)).toLocaleString() : ''}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {resetModal && isSuperAdmin ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/50 p-4 sm:items-center" role="presentation">
          <div
            role="dialog"
            aria-modal
            className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl"
            data-testid="admin-learner-reset-modal"
          >
            <h2 className="text-lg font-semibold text-zinc-900">Reset self-paced progress?</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Course <span className="font-mono text-xs">{resetModal.courseSlug}</span> for this learner will be deleted from{' '}
              <span className="font-mono text-xs">learner_self_paced_progress</span>. This is audited and cannot be undone from the UI.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800"
                onClick={() => setResetModal(null)}
                disabled={resetBusy}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                disabled={resetBusy}
                onClick={() => {
                  void (async () => {
                    if (!supabase) return
                    setResetBusy(true)
                    setBanner(null)
                    const { error } = await rpcAdminResetSelfPacedProgress(supabase, userId, resetModal.courseSlug)
                    if (error) {
                      setBanner({ kind: 'err', text: error })
                    } else {
                      setBanner({ kind: 'ok', text: 'Progress reset completed (audit entry written by server RPC).' })
                      setResetModal(null)
                      await reload()
                    }
                    setResetBusy(false)
                  })()
                }}
              >
                Confirm reset
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
