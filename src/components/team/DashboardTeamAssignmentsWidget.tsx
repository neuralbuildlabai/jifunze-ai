import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { useTeamAssignmentsBoard, useWorkspaceTrainingRole } from '../../training/teamTrainingHooks'
import { TrainingInlineAlert } from '../training/TrainingInlineAlert'

const cardClass =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.04]'

export function DashboardTeamAssignmentsWidget() {
  const { workspaceShellReady } = useAuth()
  const { isManager, loading: roleLoading } = useWorkspaceTrainingRole()
  const { rows, loading, error, refetch } = useTeamAssignmentsBoard('workspace')

  if (!isManager) return null

  if (isSupabaseConfigured() && !workspaceShellReady) {
    return (
      <section className={cardClass}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Team assignments</h2>
        <p className="mt-2 text-sm text-zinc-400">Loading workspace…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={cardClass}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Team assignments</h2>
        <div className="mt-3">
          <TrainingInlineAlert error={error} onRetry={() => void refetch()} />
        </div>
      </section>
    )
  }

  if (roleLoading || loading) {
    return (
      <section className={cardClass}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Team assignments</h2>
        <p className="mt-2 text-sm text-zinc-400">Loading assignment overview…</p>
      </section>
    )
  }

  const open = rows.filter((r) => r.effectiveStatus !== 'completed').length

  return (
    <section className={cardClass}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Team assignments</h2>
          <p className="mt-2 text-sm text-zinc-200">
            {rows.length === 0
              ? 'No workspace assignments yet.'
              : `${open} open · ${rows.length} total in this workspace`}
          </p>
        </div>
        <Link to="/team/assignments" className="text-xs font-medium text-violet-300 hover:text-violet-200">
          Manage
        </Link>
      </div>
    </section>
  )
}
