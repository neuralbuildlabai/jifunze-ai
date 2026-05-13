import * as React from 'react'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'

export function AdminCertificatesPage() {
  const { supabase } = useAuth()
  const [rows, setRows] = React.useState<Record<string, unknown>[]>([])
  const [err, setErr] = React.useState<string | null>(null)

  React.useEffect(() => {
    let on = true
    void (async () => {
      if (!isSupabaseConfigured() || !supabase) return
      const { data, error } = await supabase.from('learner_certificates').select('*').order('issued_at', { ascending: false }).limit(100)
      if (!on) return
      setErr(error?.message ?? null)
      setRows((data as Record<string, unknown>[]) ?? [])
    })()
    return () => {
      on = false
    }
  }, [supabase])

  return (
    <div className="space-y-6" data-testid="admin-certificates-page">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Certificates</h1>
        <p className="mt-1 max-w-2xl text-sm text-zinc-600">
          Database-backed certificate rows only. The learner-facing `getLearnerCertificates` helper is still a stub — we never
          fabricate certificate UI from the client stub.
        </p>
      </div>
      {err ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-950">{err}</div> : null}
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-10 text-center text-sm text-zinc-600 shadow-sm">
          No certificate records found yet. Certificates will appear here once eligible courses issue them into
          `learner_certificates`.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs uppercase text-zinc-500">
                <th className="px-4 py-3 font-medium">Learner</th>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Issued</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={String(r.id)} className="border-b border-zinc-50">
                  <td className="px-4 py-3 font-mono text-xs">{String(r.user_id).slice(0, 10)}…</td>
                  <td className="px-4 py-3">{String(r.course_slug)}</td>
                  <td className="px-4 py-3">{String(r.certificate_code ?? '—')}</td>
                  <td className="px-4 py-3 text-zinc-600">
                    {r.issued_at ? new Date(String(r.issued_at)).toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-3">{String(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
