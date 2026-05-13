import * as React from 'react'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'

export type AdminProgressRow = {
  user_id: string
  course_slug: string
  source: 'self-paced' | 'flagship'
  progress_label: string
  status: string
  last_activity: string | null
  updated_at: string | null
}

export function AdminProgressPage() {
  const { supabase } = useAuth()
  const [rows, setRows] = React.useState<AdminProgressRow[]>([])
  const [err, setErr] = React.useState<string | null>(null)

  React.useEffect(() => {
    let on = true
    void (async () => {
      if (!isSupabaseConfigured() || !supabase) return
      const [a, b] = await Promise.all([
        supabase.from('learner_self_paced_progress').select('*').order('updated_at', { ascending: false }).limit(120),
        supabase.from('flagship_course_progress').select('*').order('updated_at', { ascending: false }).limit(120),
      ])
      if (!on) return
      const e = a.error ?? b.error
      setErr(e?.message ?? null)
      const out: AdminProgressRow[] = []
      for (const r of a.data ?? []) {
        const row = r as Record<string, unknown>
        out.push({
          user_id: String(row.user_id),
          course_slug: String(row.course_slug),
          source: 'self-paced',
          progress_label: `${String(row.progress_percentage ?? 0)}%`,
          status: String(row.status ?? ''),
          last_activity: row.last_activity_at ? String(row.last_activity_at) : null,
          updated_at: row.updated_at ? String(row.updated_at) : null,
        })
      }
      for (const r of b.data ?? []) {
        const row = r as Record<string, unknown>
        const n = Array.isArray(row.completed_session_ids) ? row.completed_session_ids.length : 0
        out.push({
          user_id: String(row.user_id),
          course_slug: String(row.course_slug),
          source: 'flagship',
          progress_label: `${n} sessions marked`,
          status: 'flagship',
          last_activity: row.last_active_at ? String(row.last_active_at) : null,
          updated_at: row.updated_at ? String(row.updated_at) : null,
        })
      }
      out.sort((x, y) => (Date.parse(y.updated_at ?? '') || 0) - (Date.parse(x.updated_at ?? '') || 0))
      setRows(out.slice(0, 150))
    })()
    return () => {
      on = false
    }
  }, [supabase])

  return (
    <div className="space-y-6" data-testid="admin-progress-page">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Progress monitoring</h1>
        <p className="mt-1 max-w-2xl text-sm text-zinc-600">
          Normalized view across self-paced and flagship tables. Internal storage keys are not surfaced as columns.
        </p>
      </div>
      {err ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-950">{err}</div> : null}
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs uppercase text-zinc-500">
              <th className="px-4 py-3 font-medium">Learner</th>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Progress</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Last activity</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-zinc-500">
                  No progress rows (or Supabase unavailable).
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={`${r.user_id}-${r.course_slug}-${r.source}-${i}`} className="border-b border-zinc-50">
                  <td className="px-4 py-3 font-mono text-xs text-zinc-700">{r.user_id.slice(0, 10)}…</td>
                  <td className="px-4 py-3">{r.course_slug}</td>
                  <td className="px-4 py-3 text-zinc-600">{r.source}</td>
                  <td className="px-4 py-3">{r.progress_label}</td>
                  <td className="px-4 py-3 text-zinc-600">{r.status}</td>
                  <td className="px-4 py-3 text-zinc-600">
                    {r.last_activity ? new Date(r.last_activity).toLocaleString() : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
