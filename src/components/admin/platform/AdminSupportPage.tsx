import * as React from 'react'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import { rpcAdminAppendAudit } from '../../../services/admin/adminRpc'

export function AdminSupportPage() {
  const { supabase } = useAuth()
  const [rows, setRows] = React.useState<Record<string, unknown>[]>([])
  const [err, setErr] = React.useState<string | null>(null)

  const reload = React.useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) return
    const { data, error } = await supabase.from('support_submissions').select('*').order('created_at', { ascending: false }).limit(100)
    setErr(error?.message ?? null)
    setRows((data as Record<string, unknown>[]) ?? [])
  }, [supabase])

  React.useEffect(() => {
    void reload()
  }, [reload])

  return (
    <div className="space-y-6" data-testid="admin-support-page">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Support</h1>
        <p className="mt-1 max-w-2xl text-sm text-zinc-600">
          Submissions stored in `support_submissions`. Public inserts are insert-only; only admins can read or change status here.
        </p>
      </div>
      {err ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-950">{err}</div> : null}
      {rows.length === 0 && !err ? (
        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-10 text-center text-sm text-zinc-600 shadow-sm">
          No support submissions yet. When contact forms write to this table, tickets will appear here.
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={String(r.id)} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{String(r.subject)}</p>
                  <p className="text-xs text-zinc-500">
                    {String(r.name)} · {String(r.email)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['new', 'open', 'resolved', 'archived'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                      onClick={() => {
                        void (async () => {
                          if (!supabase) return
                          const { error } = await supabase.from('support_submissions').update({ status: st }).eq('id', r.id)
                          if (error) window.alert(error.message)
                          else {
                            await rpcAdminAppendAudit(supabase, {
                              action: 'support_status_change',
                              entityType: 'support_submissions',
                              entityId: String(r.id),
                              summary: `Status → ${st}`,
                            })
                            void reload()
                          }
                        })()
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-3 line-clamp-4 text-sm text-zinc-600">{String(r.message)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
