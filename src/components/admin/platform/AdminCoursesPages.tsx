import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import { buildAdminCourseInventoryRows, type AdminCourseInventoryRow } from '../../../lib/admin/adminCourseInventory'
import { buildCourseHealthWarnings } from '../../../lib/admin/adminCourseHealthRules'

export function AdminCoursesPage() {
  const [filter, setFilter] = React.useState<'all' | 'public' | 'hidden_flagship'>('all')
  const rows = React.useMemo(() => buildAdminCourseInventoryRows(), [])

  const filtered = React.useMemo(() => {
    if (filter === 'public') return rows.filter((r) => r.onPublicLearnerCatalog)
    if (filter === 'hidden_flagship') return rows.filter((r) => r.kind === 'flagship' && !r.onPublicLearnerCatalog)
    return rows
  }, [rows, filter])

  return (
    <div className="space-y-6" data-testid="admin-courses-page">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Courses</h1>
        <p className="mt-1 max-w-2xl text-sm text-zinc-600">
          Operational inventory merged from flagship metadata, free starters, and standalone slugs. Public learner catalog
          allowlists stay tighter than this view by design.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ['all', 'All'],
            ['public', 'Public catalog'],
            ['hidden_flagship', 'Flagship not on /learn'],
          ] as const
        ).map(([k, lab]) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
              filter === k ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-700'
            }`}
          >
            {lab}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Kind</th>
              <th className="px-4 py-3 font-medium">Public /learn</th>
              <th className="px-4 py-3 font-medium">Health</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r: AdminCourseInventoryRow) => {
              const hw = buildCourseHealthWarnings(r)
              return (
              <tr key={`${r.kind}-${r.slug}`} className="border-b border-zinc-50">
                <td className="px-4 py-3 text-zinc-900">{r.title}</td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-600">{r.slug}</td>
                <td className="px-4 py-3 text-zinc-600">{r.kind}</td>
                <td className="px-4 py-3 text-zinc-600">{r.onPublicLearnerCatalog ? 'Yes' : 'No'}</td>
                <td className="max-w-[14rem] px-4 py-3 text-xs text-amber-900">
                  {hw.length ? (
                    <ul className="list-disc space-y-0.5 pl-4">
                      {hw.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-emerald-800">No automated warnings.</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/admin/courses/${encodeURIComponent(r.slug)}`} className="font-medium text-zinc-900 hover:underline">
                    Analytics
                  </Link>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminCourseDetailPage() {
  const { courseSlug = '' } = useParams<{ courseSlug: string }>()
  const slug = decodeURIComponent(courseSlug)
  const { supabase } = useAuth()
  const [rows, setRows] = React.useState<Record<string, unknown>[]>([])
  const [err, setErr] = React.useState<string | null>(null)

  React.useEffect(() => {
    let on = true
    void (async () => {
      if (!slug || !isSupabaseConfigured() || !supabase) return
      const [a, b] = await Promise.all([
        supabase.from('learner_self_paced_progress').select('*').eq('course_slug', slug).order('updated_at', { ascending: false }).limit(80),
        supabase.from('flagship_course_progress').select('*').eq('course_slug', slug).order('updated_at', { ascending: false }).limit(80),
      ])
      if (!on) return
      const e = a.error ?? b.error
      setErr(e?.message ?? null)
      const merged = [...(a.data ?? []), ...(b.data ?? [])]
      setRows(merged as Record<string, unknown>[])
    })()
    return () => {
      on = false
    }
  }, [slug, supabase])

  const meta = React.useMemo(() => buildAdminCourseInventoryRows().find((c) => c.slug === slug), [slug])
  const selfPacedCount = React.useMemo(
    () => rows.filter((row) => row.progress_percentage != null).length,
    [rows],
  )
  const healthWarnings = React.useMemo(
    () => (meta ? buildCourseHealthWarnings(meta, { progressRowCount: selfPacedCount }) : []),
    [meta, selfPacedCount],
  )

  return (
    <div className="space-y-6" data-testid="admin-course-detail">
      <Link to="/admin/courses" className="text-sm font-medium text-zinc-900 underline-offset-2 hover:underline">
        ← Courses
      </Link>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{meta?.title ?? slug}</h1>
        <p className="mt-1 font-mono text-xs text-zinc-500">{slug}</p>
      </div>
      {err ? <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-950">{err}</div> : null}
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Health checks</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600">
          <li>{meta ? `Route hint: ${meta.route}` : 'Slug not found in merged admin inventory — verify routing.'}</li>
          <li>{rows.length === 0 ? 'No progress rows in Supabase for this slug yet.' : `${rows.length} progress row(s) loaded.`}</li>
        </ul>
        {healthWarnings.length ? (
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-amber-900">
            {healthWarnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        ) : null}
      </section>
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Learner progress (this course)</h2>
        <p className="mt-1 text-xs text-zinc-500">Combined self-paced and flagship rows; user ids truncated.</p>
        <div className="mt-4 overflow-x-auto text-sm">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-zinc-100 text-xs uppercase text-zinc-500">
                <th className="py-2 pr-4">User</th>
                <th className="py-2 pr-4">Source</th>
                <th className="py-2 pr-4">Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={`${String(row.user_id)}-${i}`} className="border-b border-zinc-50">
                  <td className="py-2 pr-4 font-mono text-xs">{String(row.user_id).slice(0, 10)}…</td>
                  <td className="py-2 pr-4">{row.progress_percentage != null ? 'self-paced' : 'flagship'}</td>
                  <td className="py-2 text-zinc-600">
                    {row.updated_at ? new Date(String(row.updated_at)).toLocaleString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
