import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { useAppAccess } from '../../access/useAppAccess'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { useTeamAssignmentsBoard } from '../../training/teamTrainingHooks'
import { LEARNER_PROGRESS_HUB_EVENT, loadLearnerUnifiedActiveCourses, type LearnerUnifiedActiveCourse } from '../../lib/learnerProgressHub'
import { SignedInContinueLearning } from '../SignedInContinueLearning'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
import { learnerShellTokens } from '../learner-shell/learnerShellTokens'
import { learnerPublicCatalogFlagshipCourses } from '../../data/learning/flagshipLearnerCatalogPolicy'

const operatorCard =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04] transition hover:border-violet-400/15'

export function MyLearningPage() {
  const { supabase, user, workspaceShellReady } = useAuth()
  const { navVariant } = useAppAccess()
  const { rows: myAssignments, loading: assignLoading, error: assignError } = useTeamAssignmentsBoard('self')
  const isLearner = navVariant === 'learner'
  const catalogCourses = learnerPublicCatalogFlagshipCourses()

  const [active, setActive] = useState<LearnerUnifiedActiveCourse[]>([])
  const [activeLoading, setActiveLoading] = useState(true)

  const reloadActive = useCallback(async () => {
    if (!user?.id || !supabase || !isSupabaseConfigured()) {
      setActive([])
      setActiveLoading(false)
      return
    }
    setActiveLoading(true)
    try {
      const rows = await loadLearnerUnifiedActiveCourses(supabase, user.id)
      setActive(rows)
    } catch {
      setActive([])
    } finally {
      setActiveLoading(false)
    }
  }, [user?.id, supabase])

  useEffect(() => {
    void reloadActive()
  }, [reloadActive])

  useEffect(() => {
    const on = () => void reloadActive()
    window.addEventListener(LEARNER_PROGRESS_HUB_EVENT, on as EventListener)
    return () => window.removeEventListener(LEARNER_PROGRESS_HUB_EVENT, on as EventListener)
  }, [reloadActive])

  if (isLearner) {
    return (
      <div data-testid="learner-my-learning-home">
        <LearnerPageShell
          title="My Learning"
          purpose="Courses you have started or been assigned — pick up where you left off."
        >
          <div className="flex flex-wrap gap-2">
            <Link className={learnerShellTokens.primaryButton} to={LEGAL_ROUTES.learn} data-testid="my-learning-open-catalog">
              Browse catalog
            </Link>
            <Link className={learnerShellTokens.ghostButton} to="/dashboard">
              Dashboard
            </Link>
            <Link className={learnerShellTokens.ghostButton} to="/reports">
              Reports
            </Link>
          </div>

          <SignedInContinueLearning supabase={supabase} userId={user?.id} surface="warm" />

          {activeLoading ? (
            <p className="text-sm text-stone-600">Loading your courses…</p>
          ) : active.length === 0 ? (
            <section
              className="rounded-2xl border border-stone-200/90 bg-white p-8 text-center shadow-[0_20px_50px_-24px_rgba(120,53,15,0.15)]"
              data-testid="my-learning-empty-state"
            >
              <h2 className="text-lg font-semibold text-zinc-900">No courses started yet</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-stone-600">
                Browse the catalog and start your first course when you are ready.
              </p>
              <div className="mt-6">
                <Link className={learnerShellTokens.primaryButton} to={LEGAL_ROUTES.learn}>
                  Browse catalog
                </Link>
              </div>
            </section>
          ) : (
            <section className="space-y-3" data-testid="my-learning-active-courses">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Your courses</h2>
              <ul className="space-y-3">
                {active.map((c) => (
                  <li
                    key={`${c.kind}-${c.slug}`}
                    className="rounded-xl border border-stone-200/90 bg-white p-4 shadow-[0_14px_40px_-18px_rgba(120,53,15,0.14)] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">{c.category}</p>
                      <p className="mt-0.5 font-medium text-zinc-900">{c.title}</p>
                      <p className="mt-1 text-xs text-stone-600">
                        Progress <span className="tabular-nums font-medium text-zinc-800">{c.progressPercent}%</span>
                        {c.nextLabel ? (
                          <>
                            {' '}
                            · {c.nextLabel}
                          </>
                        ) : null}
                      </p>
                      <div className="mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-stone-200/90">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-rose-500"
                          style={{ width: `${Math.min(100, c.progressPercent)}%` }}
                        />
                      </div>
                    </div>
                    <div className="mt-4 shrink-0 sm:mt-0">
                      <Link className={learnerShellTokens.primaryButton} to={c.resumeHref} data-testid={`my-learning-resume-${c.slug}`}>
                        {c.resumeCta}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </LearnerPageShell>
      </div>
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

      <section className={operatorCard}>
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
        <section className={operatorCard} data-testid="my-learning-catalog-courses">
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
