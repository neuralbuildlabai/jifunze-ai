import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { TRUST_COPY } from '../../training/trustCopy'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { memberLabel, useTeamAssignmentsBoard, useWorkspaceTrainingRole } from '../../training/teamTrainingHooks'
import { TrainingInlineAlert } from '../training/TrainingInlineAlert'

export function TeamAssignmentsPage() {
  const { workspaceShellReady, user } = useAuth()
  const { isManager, loading: roleLoading, error: roleError, refetch: refetchRole } = useWorkspaceTrainingRole()
  const scope = isManager ? 'workspace' : 'self'
  const { rows, loading, error, refetch } = useTeamAssignmentsBoard(scope)

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Team</p>
        <h1 className="mt-1 text-xl font-semibold text-white">
          {isManager ? 'Training assignments' : 'Your training assignments'}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-400">
          {isManager
            ? 'Track workspace assignments, due dates, and learner progress. Status reflects lessons and checkpoints.'
            : 'Plans your workspace admin assigned to you appear here with live progress.'}
        </p>
        <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-zinc-600" data-testid="team-assignments-trust">
          {TRUST_COPY.teamAssignmentsBoundary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/team/members"
            className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800"
          >
            Members
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
        <TrainingInlineAlert error={roleError} onRetry={() => void refetchRole()} retryLabel="Retry" />
      ) : null}

      {error ? <TrainingInlineAlert error={error} onRetry={() => void refetch()} retryLabel="Retry" /> : null}

      {roleLoading || loading ? (
        <p className="text-sm text-zinc-400">Loading assignments…</p>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/[0.12] bg-zinc-950/40 px-6 py-12 text-center">
          <p className="text-sm font-medium text-zinc-200">
            {isManager ? 'No assignments yet' : 'No plans assigned to you'}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            {isManager
              ? 'Open a training plan and use “Assign training” to add a member and optional due date.'
              : 'When an admin assigns a plan, it will show up here with progress and due dates.'}
          </p>
        </div>
      ) : (
        <section className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.03] ring-1 ring-white/[0.04]">
          <table className="min-w-[42rem] w-full text-left text-sm">
            <thead className="border-b border-white/[0.06] bg-zinc-950/40 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
              <tr>
                {isManager ? <th className="px-4 py-3">Member</th> : null}
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Due</th>
                <th className="px-4 py-3">Progress</th>
                {isManager ? <th className="px-4 py-3">Weak areas</th> : null}
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-white/[0.04] last:border-0">
                  {isManager ? (
                    <td className="px-4 py-3 text-zinc-100">
                      <span title={r.assigned_to}>{memberLabel(r.assigned_to, user?.id ?? '')}</span>
                    </td>
                  ) : null}
                  <td className="px-4 py-3 text-zinc-100">{r.planTitle ?? 'Plan'}</td>
                  <td className="px-4 py-3 text-zinc-400">
                    {r.due_date ? new Date(r.due_date).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{r.progressPercent}%</td>
                  {isManager ? (
                    <td className="max-w-[14rem] px-4 py-3 text-[11px] leading-snug text-zinc-400" title={r.weakAreaSummary ?? ''}>
                      {r.weakAreaSummary ?? '—'}
                    </td>
                  ) : null}
                  <td className="px-4 py-3">
                    <span
                      className={
                        r.effectiveStatus === 'completed'
                          ? 'text-emerald-300/90'
                          : r.effectiveStatus === 'overdue'
                            ? 'text-amber-200/90'
                            : 'text-zinc-400'
                      }
                    >
                      {r.effectiveStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/training/${r.training_plan_id}`}
                      className="text-xs font-medium text-violet-300 hover:text-violet-200"
                    >
                      Open plan
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  )
}
