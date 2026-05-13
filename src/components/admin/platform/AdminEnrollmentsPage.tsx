import * as React from 'react'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import { rpcAdminAppendAudit } from '../../../services/admin/adminRpc'

export function AdminEnrollmentsPage() {
  const { supabase, user } = useAuth()
  const [rows, setRows] = React.useState<Record<string, unknown>[]>([])
  const [userId, setUserId] = React.useState('')
  const [courseSlug, setCourseSlug] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [msg, setMsg] = React.useState<string | null>(null)

  const reload = React.useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setRows([])
      return
    }
    const { data, error } = await supabase
      .from('learner_course_assignments')
      .select('*')
      .order('assigned_at', { ascending: false })
      .limit(100)
    if (error) setMsg(error.message)
    else setMsg(null)
    setRows((data as Record<string, unknown>[]) ?? [])
  }, [supabase])

  React.useEffect(() => {
    void reload()
  }, [reload])

  return (
    <div className="space-y-8" data-testid="admin-enrollments-page">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Enrollments & assignments</h1>
        <p className="mt-1 max-w-2xl text-sm text-zinc-600">
          Operational assignments in `learner_course_assignments`. Removing an assignment uses status updates; hard delete is
          super-admin only in the database layer.
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Assign course</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div>
            <label className="text-xs font-medium text-zinc-500">Learner user id</label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              placeholder="uuid"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500">Course slug</label>
            <input
              value={courseSlug}
              onChange={(e) => setCourseSlug(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              placeholder="e.g. smart-workflows-with-ai"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500">Notes</label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          onClick={() => {
            void (async () => {
              if (!supabase || !userId.trim() || !courseSlug.trim()) return
              const { error } = await supabase.from('learner_course_assignments').upsert(
                {
                  user_id: userId.trim(),
                  course_slug: courseSlug.trim(),
                  assigned_by: user?.id ?? null,
                  status: 'active',
                  source: 'manual',
                  notes: notes.trim() || null,
                },
                { onConflict: 'user_id,course_slug' },
              )
              if (error) {
                setMsg(error.message)
                return
              }
              await rpcAdminAppendAudit(supabase, {
                action: 'assign_course',
                entityType: 'learner_course_assignments',
                entityId: `${userId}:${courseSlug}`,
                summary: 'Course assignment upserted',
              })
              setMsg('Saved.')
              setUserId('')
              setCourseSlug('')
              setNotes('')
              void reload()
            })()
          }}
        >
          Save assignment
        </button>
      </section>

      {msg ? <p className="text-sm text-zinc-600">{msg}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs uppercase text-zinc-500">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Assigned</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-zinc-500">
                  No assignments yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={String(r.id)} className="border-b border-zinc-50">
                  <td className="px-4 py-3 font-mono text-xs">{String(r.user_id).slice(0, 10)}…</td>
                  <td className="px-4 py-3">{String(r.course_slug)}</td>
                  <td className="px-4 py-3">{String(r.status)}</td>
                  <td className="px-4 py-3">{String(r.source)}</td>
                  <td className="px-4 py-3 text-zinc-600">
                    {r.assigned_at ? new Date(String(r.assigned_at)).toLocaleString() : '—'}
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
