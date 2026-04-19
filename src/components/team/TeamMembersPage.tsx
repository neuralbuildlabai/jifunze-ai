import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { TRUST_COPY } from '../../training/trustCopy'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { memberLabel, useTenantMembersList, useWorkspaceTrainingRole } from '../../training/teamTrainingHooks'

export function TeamMembersPage() {
  const { workspaceShellReady, user } = useAuth()
  const { role, isManager, loading: roleLoading, error: roleError } = useWorkspaceTrainingRole()
  const { members, loading, error, refetch } = useTenantMembersList()

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Team</p>
        <h1 className="mt-1 text-xl font-semibold text-white">Members</h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-400">
          Workspace members and roles. Training assignments are managed separately.
        </p>
        <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-zinc-600" data-testid="team-roster-trust">
          {TRUST_COPY.teamWorkspaceRosterBoundary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/team/assignments"
            className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800"
          >
            Assignments
          </Link>
          <Link to="/training" className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800">
            Training
          </Link>
        </div>
      </header>

      {isSupabaseConfigured() && !workspaceShellReady ? (
        <p className="text-sm text-zinc-400">Loading workspace…</p>
      ) : null}

      {roleError ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-200" role="alert">
          {roleError.message}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-200" role="alert">
          <p>{error.message}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-2 text-xs font-medium text-violet-300 hover:text-violet-200"
          >
            Retry
          </button>
        </div>
      ) : null}

      {roleLoading || loading ? (
        <p className="text-sm text-zinc-400">Loading members…</p>
      ) : members.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/[0.12] bg-zinc-950/40 px-6 py-12 text-center">
          <p className="text-sm font-medium text-zinc-200">No members visible yet</p>
          <p className="mt-2 text-sm text-zinc-500">
            {isManager
              ? 'Invite teammates to this workspace to see them listed here.'
              : 'You can only see your own membership row in this workspace.'}
          </p>
        </div>
      ) : (
        <section className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] ring-1 ring-white/[0.04]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/[0.06] bg-zinc-950/40 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
              <tr>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.user_id} className="border-b border-white/[0.04] last:border-0">
                  <td className="px-4 py-3 text-zinc-100">
                    <span title={m.user_id}>{memberLabel(m.user_id, user?.id ?? '')}</span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <p className="text-xs text-zinc-600">
        Your workspace role: <span className="text-zinc-400">{role ?? 'unknown'}</span>
        {isManager ? ' · You can assign training plans from a plan’s detail page.' : null}
      </p>
    </div>
  )
}
