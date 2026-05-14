import * as React from 'react'
import { CANONICAL_PLATFORM_ADMIN_EMAIL, CANONICAL_SUPER_ADMIN_EMAIL } from '../../../access/appAccess'
import { useAuth } from '../../../auth/AuthContext'
import { isSupabaseConfigured } from '../../../config/supabaseEnv'
import { rpcAdminListSystemAccounts, rpcAdminRoleHealth, type SystemAccountRow } from '../../../services/admin/adminRpc'

type Filter =
  | 'all'
  | 'super'
  | 'platform'
  | 'learner'
  | 'missing_profile'
  | 'role_mismatch'
  | 'inactive'

function shortId(id: string) {
  if (id.length <= 14) return id
  return `${id.slice(0, 6)}…${id.slice(-4)}`
}

function badgeClass(kind: 'super' | 'platform' | 'learner' | 'warn'): string {
  switch (kind) {
    case 'super':
      return 'bg-violet-100 text-violet-900'
    case 'platform':
      return 'bg-sky-100 text-sky-900'
    case 'learner':
      return 'bg-zinc-100 text-zinc-800'
    default:
      return 'bg-amber-100 text-amber-900'
  }
}

export function AdminSystemAccountsPanel(props: { readOnlyMessage?: string | null }) {
  const { supabase } = useAuth()
  const [rows, setRows] = React.useState<SystemAccountRow[]>([])
  const [roleHealth, setRoleHealth] = React.useState<Record<string, unknown> | null>(null)
  const [err, setErr] = React.useState<string | null>(null)
  const [filter, setFilter] = React.useState<Filter>('all')
  const [search, setSearch] = React.useState('')
  const [evaluatedAt] = React.useState(() => Date.now())

  const load = React.useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase || props.readOnlyMessage) return
    setErr(null)
    const rh = await rpcAdminRoleHealth(supabase)
    if (rh.error) {
      setErr(rh.error)
      setRoleHealth(null)
    } else {
      setRoleHealth(rh.data)
    }
    const { data, error } = await rpcAdminListSystemAccounts(supabase, { limit: 500, offset: 0, search: null })
    if (error) setErr((prev) => (prev ? `${prev} · ${error}` : error))
    setRows(data)
  }, [supabase, props.readOnlyMessage])

  React.useEffect(() => {
    void load()
  }, [load])

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = rows
    if (filter === 'super') list = list.filter((r) => r.is_super_admin)
    if (filter === 'platform') list = list.filter((r) => r.is_platform_admin && !r.is_super_admin)
    if (filter === 'learner') list = list.filter((r) => !r.is_admin)
    if (filter === 'missing_profile') list = list.filter((r) => !r.profile_exists)
    if (filter === 'role_mismatch') {
      list = list.filter((r) => {
        const pg = r.profile_global_access_tier
        const mismatch =
          (pg && pg !== r.effective_access_tier) ||
          r.warnings.includes('unexpected_super') ||
          (pg === 'super_admin' && !r.is_super_admin) ||
          (pg === 'platform_admin' && !r.is_platform_admin)
        return Boolean(mismatch)
      })
    }
    if (filter === 'inactive') {
      const cutoff = evaluatedAt - 90 * 24 * 60 * 60 * 1000
      list = list.filter((r) => {
        const la = r.last_activity_at ? new Date(r.last_activity_at).getTime() : 0
        const ls = r.last_sign_in_at ? new Date(r.last_sign_in_at).getTime() : 0
        const mx = Math.max(la, ls)
        return mx === 0 || mx < cutoff
      })
    }
    if (q) {
      list = list.filter((r) => `${r.email ?? ''} ${r.display_name ?? ''}`.toLowerCase().includes(q))
    }
    return list
  }, [rows, filter, search, evaluatedAt])

  const warningsRaw = roleHealth?.warnings
  const warningsList: Record<string, unknown>[] = Array.isArray(warningsRaw)
    ? (warningsRaw as unknown[]).map((w) => (w && typeof w === 'object' ? (w as Record<string, unknown>) : { message: String(w) }))
    : []

  if (props.readOnlyMessage) {
    return (
      <p className="mt-3 text-sm text-zinc-600" data-testid="admin-system-accounts-readonly">
        {props.readOnlyMessage}
      </p>
    )
  }

  return (
    <div className="space-y-4" data-testid="admin-system-accounts-panel">
      {err ? <p className="text-sm text-rose-700">{err}</p> : null}
      <div className="rounded-xl border border-amber-100 bg-amber-50/80 p-3 text-xs text-amber-950">
        <p className="font-semibold">Canonical operators (expected)</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>Super admin: {CANONICAL_SUPER_ADMIN_EMAIL}</li>
          <li>Platform admin: {CANONICAL_PLATFORM_ADMIN_EMAIL}</li>
        </ul>
      </div>
      {warningsList.length ? (
        <ul className="space-y-2 text-sm">
          {warningsList.map((o, i) => (
            <li
              key={i}
              className={`rounded-lg border px-3 py-2 ${
                o.severity === 'critical' ? 'border-rose-200 bg-rose-50 text-rose-950' : 'border-amber-200 bg-amber-50 text-amber-950'
              }`}
            >
              {String(o.message ?? JSON.stringify(o))}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="block min-w-[12rem] flex-1 text-sm">
          <span className="text-xs font-medium text-zinc-500">Search name / email (client-side)</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            placeholder="Type to filter loaded accounts…"
          />
        </label>
        <button type="button" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white" onClick={() => void load()}>
          Reload
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ['all', 'All'],
            ['super', 'Super admins'],
            ['platform', 'Platform admins'],
            ['learner', 'Learners'],
            ['missing_profile', 'Missing profile'],
            ['role_mismatch', 'Role mismatch'],
            ['inactive', 'Inactive 90d+'],
          ] as const
        ).map(([k, lab]) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              filter === k ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-700'
            }`}
          >
            {lab}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-[40rem] w-full text-left text-sm" data-testid="admin-system-accounts-table">
          <thead>
            <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-3 py-2 font-medium">Account</th>
              <th className="px-3 py-2 font-medium">User id</th>
              <th className="px-3 py-2 font-medium">Tier / role</th>
              <th className="px-3 py-2 font-medium">Profile</th>
              <th className="px-3 py-2 font-medium">Activity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-zinc-500">
                  No rows match this filter.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <AccountRow key={r.user_id} r={r} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AccountRow({ r }: { r: SystemAccountRow }) {
  const adminType = r.is_super_admin ? 'super_admin' : r.is_platform_admin ? 'platform_admin' : 'none'
  const badges: { label: string; cls: string }[] = []
  if (r.is_super_admin) badges.push({ label: 'Super Admin', cls: badgeClass('super') })
  else if (r.is_platform_admin) badges.push({ label: 'Platform Admin', cls: badgeClass('platform') })
  else badges.push({ label: 'Learner', cls: badgeClass('learner') })
  if (!r.profile_exists) badges.push({ label: 'Missing Profile', cls: badgeClass('warn') })
  if (r.warnings.length) badges.push({ label: 'Warning', cls: badgeClass('warn') })

  return (
    <tr className="border-b border-zinc-50 align-top">
      <td className="px-3 py-2">
        <p className="font-medium text-zinc-900">{r.display_name || '—'}</p>
        <p className="text-xs text-zinc-500">{r.email ?? '—'}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {badges.map((b) => (
            <span key={b.label} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${b.cls}`}>
              {b.label}
            </span>
          ))}
        </div>
      </td>
      <td className="px-3 py-2 font-mono text-xs text-zinc-600">{shortId(r.user_id)}</td>
      <td className="px-3 py-2 text-xs text-zinc-700">
        <p>Effective: {r.effective_access_tier}</p>
        <p>Profile tier: {r.profile_global_access_tier ?? '—'}</p>
        <p className="mt-1 text-zinc-500">Admin: {r.is_admin ? 'Yes' : 'No'} · {adminType}</p>
      </td>
      <td className="px-3 py-2 text-xs text-zinc-600">
        <p>Profile: {r.profile_exists ? 'Yes' : 'No'}</p>
        <p>Auth user: {r.auth_user_exists ? 'Yes' : 'No'}</p>
        <p>Email confirmed: {r.email_confirmed ? 'Yes' : 'No'}</p>
      </td>
      <td className="px-3 py-2 text-xs text-zinc-600">
        <p>Created: {r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'}</p>
        <p>Last sign-in: {r.last_sign_in_at ? new Date(r.last_sign_in_at).toLocaleString() : '—'}</p>
        <p>Last activity: {r.last_activity_at ? new Date(r.last_activity_at).toLocaleString() : '—'}</p>
      </td>
    </tr>
  )
}
