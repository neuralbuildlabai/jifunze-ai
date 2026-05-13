import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import { rpcAdminSearchLearners, type AdminLearnerRow } from '../../../services/admin/adminRpc'

export function AdminLearnersPage() {
  const { supabase } = useAuth()
  const [q, setQ] = React.useState('')
  const [rows, setRows] = React.useState<AdminLearnerRow[]>([])
  const [err, setErr] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const load = React.useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setRows([])
      return
    }
    setLoading(true)
    const res = await rpcAdminSearchLearners(supabase, { search: q.trim() || null, limit: 75, offset: 0 })
    setErr(res.error)
    setRows(res.data)
    setLoading(false)
  }, [supabase, q])

  React.useEffect(() => {
    void load()
  }, [load])

  return (
    <div className="space-y-6" data-testid="admin-learners-page">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Learners</h1>
          <p className="mt-1 max-w-2xl text-sm text-zinc-600">
            Search by email. Profile tier shows `global_access_tier`; canonical super/platform emails override via RPC.
          </p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-2 sm:w-auto">
          <label className="text-xs font-medium text-zinc-500" htmlFor="learner-search">
            Search
          </label>
          <div className="flex gap-2">
            <input
              id="learner-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Email contains…"
              className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-zinc-900/10 focus:ring-2"
            />
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {err ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-950">{err}</div>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Signup</th>
              <th className="px-4 py-3 font-medium">Last sign-in</th>
              <th className="px-4 py-3 font-medium">Tier (profile)</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-zinc-500">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-zinc-500">
                  No learners found (or Supabase not configured).
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-zinc-50">
                  <td className="px-4 py-3 text-zinc-900">{r.email}</td>
                  <td className="px-4 py-3 text-zinc-600">{r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'}</td>
                  <td className="px-4 py-3 text-zinc-600">
                    {r.last_sign_in_at ? new Date(r.last_sign_in_at).toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{r.global_access_tier ?? '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/learners/${r.id}`} className="font-medium text-zinc-900 underline-offset-2 hover:underline">
                      View
                    </Link>
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
