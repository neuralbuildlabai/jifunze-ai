import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { learnerPublicCatalogFlagshipCourses } from '../../data/learning/flagshipLearnerCatalogPolicy'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { useAppAccess } from '../../access/useAppAccess'
import { useAuth } from '../../auth/AuthContext'
import { useTeamAssignmentsBoard } from '../../training/teamTrainingHooks'
import { SignedInContinueLearning } from '../SignedInContinueLearning'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
import { learnerShellTokens } from '../learner-shell/learnerShellTokens'

const card =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04] transition hover:border-violet-400/15'

export function MyLearningPage() {
  const { supabase, user, workspaceShellReady } = useAuth()
  const { navVariant } = useAppAccess()
  const { rows: myAssignments, loading: assignLoading, error: assignError } = useTeamAssignmentsBoard('self')
  const isLearner = navVariant === 'learner'
  const catalogCourses = useMemo(() => learnerPublicCatalogFlagshipCourses(), [])

  if (isLearner) {
    return (
      <LearnerPageShell
        title="My Learning"
        purpose="Continue your course and open the catalog when you want to browse what is available to you."
      >
        <div className="flex flex-wrap gap-2">
          <Link className={learnerShellTokens.primaryButton} to="/dashboard">
            Dashboard
          </Link>
          <Link className={learnerShellTokens.ghostButton} to={LEGAL_ROUTES.learn}>
            Catalog
          </Link>
          <Link className={learnerShellTokens.ghostButton} to={LEGAL_ROUTES.paths}>
            Pathways
          </Link>
        </div>

        <SignedInContinueLearning supabase={supabase} userId={user?.id} />

        {catalogCourses.length ? (
          <section className={card} data-testid="my-learning-catalog-courses">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Your catalog</p>
            <ul className="mt-4 space-y-2">
              {catalogCourses.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/learn/courses/${c.slug}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2 text-sm text-zinc-100 transition hover:border-violet-400/25"
                  >
                    <span>{c.title}</span>
                    <span className="text-[11px] text-violet-300/90">View course</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </LearnerPageShell>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Learning</p>
        <h1 className="mt-1 text-xl font-semibold text-white">My Learning</h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-400">
          Continue flagship courses, open assignments from your workspace, and browse the catalog to add what you want to learn next.
        </p>
      </header>

      <section className="flex flex-wrap gap-2">
        <Link
          to={LEGAL_ROUTES.learn}
          className="inline-flex rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-950/25 transition hover:bg-violet-500"
        >
          Browse courses
        </Link>
        <Link
          to="/library"
          className="inline-flex rounded-lg border border-white/[0.1] px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-violet-400/25"
        >
          Library
        </Link>
      </section>

      <SignedInContinueLearning supabase={supabase} userId={user?.id} />

      <section className={card}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Assigned courses &amp; plans</p>
            <p className="mt-1 text-sm text-zinc-400">
              Learning your admin assigned stays linked to the same lessons and checkpoints.
            </p>
          </div>
          <Link to="/team/assignments" className="text-xs font-medium text-violet-300 hover:text-violet-200">
            Assignment board
          </Link>
        </div>
        {!workspaceShellReady ? (
          <p className="mt-3 text-sm text-zinc-400">Loading workspace…</p>
        ) : assignError ? (
          <p className="mt-3 text-sm text-rose-300/90">{assignError.message}</p>
        ) : assignLoading ? (
          <p className="mt-3 text-sm text-zinc-400">Loading assignments…</p>
        ) : myAssignments.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">No active assignments for your account in this workspace.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {myAssignments.slice(0, 8).map((a) => (
              <li key={a.id}>
                <Link
                  to={`/training/${a.training_plan_id}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2 text-sm text-zinc-100 transition hover:border-violet-400/25"
                >
                  <span>{a.planTitle ?? 'Training plan'}</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    {a.effectiveStatus.replace(/_/g, ' ')} · {a.progressPercent}%
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {catalogCourses.length ? (
        <section className={card} data-testid="my-learning-catalog-courses">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Recommended next</p>
          <p className="mt-1 text-sm text-zinc-400">Popular flagship paths from the catalog.</p>
          <ul className="mt-4 space-y-2">
            {catalogCourses.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/learn/courses/${c.slug}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2 text-sm text-zinc-100 transition hover:border-violet-400/25"
                >
                  <span>{c.title}</span>
                  <span className="text-[11px] text-violet-300/90">View course</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
