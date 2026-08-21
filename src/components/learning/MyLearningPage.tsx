import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LEGAL_ROUTES } from '../../shared/legalRoutes'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { LEARNER_PROGRESS_HUB_EVENT, loadLearnerUnifiedActiveCourses, type LearnerUnifiedActiveCourse } from '../../lib/learnerProgressHub'
import { SignedInContinueLearning } from '../SignedInContinueLearning'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
import { learnerShellTokens } from '../learner-shell/learnerShellTokens'

export function MyLearningPage() {
  const { supabase, user } = useAuth()

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
            Progress
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
