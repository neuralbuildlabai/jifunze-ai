import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { TRUST_COPY } from '../../training/trustCopy'
import { memberLabel, useTeamAssignmentsBoard, useWorkspaceTrainingRole } from '../../training/teamTrainingHooks'
import { TrainingInlineAlert } from '../training/TrainingInlineAlert'

/**
 * Institution / platform operators: roster-linked assignment progress — not learner trend analytics.
 */
export function TeamLearningReportsPage() {
  const { workspaceShellReady, user } = useAuth()
  const { isManager, loading: roleLoading, error: roleError } = useWorkspaceTrainingRole()
  const scope = isManager ? 'workspace' : 'self'
  const { rows, loading, error, refetch } = useTeamAssignmentsBoard(scope)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Learning operations</p>
        <h1 className="mt-1 text-xl font-semibold text-white">Learning reports</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Assignment progress for training plans your organization assigns. Member roster and roles live under Members; assignment setup lives under Assignments.
        </p>
        <p className="mt-3 max-w-2xl text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.teamWorkspaceRosterBoundary}</p>
      </header>

      {isSupabaseConfigured() && !workspaceShellReady ? <p className="text-sm text-zinc-400">Loading reports…</p> : null}

      {roleError ? (
        <p className="text-sm text-amber-200/90">{roleError.message}</p>
      ) : null}

      {roleLoading ? <p className="text-sm text-zinc-400">Loading permissions…</p> : null}

      {error ? (
        <TrainingInlineAlert error={error} onRetry={() => void refetch()} />
      ) : loading ? (
        <p className="text-sm text-zinc-400">Loading assignment progress…</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-zinc-950/35">
          <table className="min-w-[42rem] w-full text-left text-sm">
            <thead className="border-b border-white/[0.06] bg-zinc-950/40 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
              <tr>
                {isManager ? <th className="px-4 py-3">Member</th> : null}
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Due</th>
                <th className="px-4 py-3">Progress</th>
                {isManager ? <th className="px-4 py-3">Weak areas</th> : null}
                <th className="px-4 py-3">Status</th>
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
                  <td className="px-4 py-3 text-zinc-400">{r.due_date ? new Date(r.due_date).toLocaleDateString() : '—'}</td>
                  <td className="px-4 py-3 text-zinc-300">{r.progressPercent}%</td>
                  {isManager ? (
                    <td className="max-w-[14rem] px-4 py-3 text-[11px] leading-snug text-zinc-400" title={r.weakAreaSummary ?? ''}>
                      {r.weakAreaSummary ?? '—'}
                    </td>
                  ) : null}
                  <td className="px-4 py-3 text-zinc-300">{r.effectiveStatus ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap gap-3 text-xs">
        <Link className="text-violet-300 hover:underline" to="/team/members">
          Members
        </Link>
        <Link className="text-violet-300 hover:underline" to="/team/assignments">
          Assignments
        </Link>
        <Link className="text-violet-300 hover:underline" to="/training">
          Training plans
        </Link>
      </div>
    </div>
  )
}
