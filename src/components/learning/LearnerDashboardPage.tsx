import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { learnerDisplayFirstName } from '../../lib/learnerProfileDisplay'
import {
  getLearnerLastActivity,
  getLearnerProgressSummary,
  loadLearnerUnifiedActiveCourses,
  type LearnerUnifiedActiveCourse,
} from '../../lib/learnerProgressHub'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { WorkspaceRouteReady } from '../workspace/WorkspaceRouteReady'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
import { learnerShellTokens } from '../learner-shell/learnerShellTokens'

const card =
  'rounded-xl border border-stone-200/90 bg-white p-4 shadow-[0_12px_40px_-20px_rgba(120,53,15,0.12)] sm:p-5'

export function LearnerDashboardPage() {
  const { user, supabase } = useAuth()
  const [courses, setCourses] = useState<LearnerUnifiedActiveCourse[]>([])
  const [summary, setSummary] = useState<{ activeCount: number; avgProgress: number; completedCount: number } | null>(null)
  const [lastActive, setLastActive] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const firstName = useMemo(() => learnerDisplayFirstName(user), [user])

  const load = useCallback(async () => {
    if (!user?.id || !supabase || !isSupabaseConfigured()) {
      setCourses([])
      setSummary({ activeCount: 0, avgProgress: 0, completedCount: 0 })
      setLastActive(null)
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const [list, sum, last] = await Promise.all([
        loadLearnerUnifiedActiveCourses(supabase, user.id),
        getLearnerProgressSummary(supabase, user.id),
        getLearnerLastActivity(supabase, user.id),
      ])
      setCourses(list)
      setSummary(sum)
      setLastActive(last)
    } catch {
      setCourses([])
      setSummary({ activeCount: 0, avgProgress: 0, completedCount: 0 })
      setLastActive(null)
    } finally {
      setLoading(false)
    }
  }, [user?.id, supabase])

  useEffect(() => {
    void load()
  }, [load])

  const recent = courses[0]

  return (
    <WorkspaceRouteReady>
      <div data-testid="learner-dashboard-home">
        <LearnerPageShell
          title="Dashboard"
          purpose="Your progress, active courses, and next step — only what you have started or enrolled in."
        >
          <header className="rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white to-orange-50/30 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Welcome back</p>
            <h2 className="mt-1 text-xl font-semibold text-zinc-900">{firstName}</h2>
            {lastActive ? (
              <p className="mt-2 text-sm text-stone-600">
                Last activity:{' '}
                <time dateTime={lastActive}>
                  {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(lastActive))}
                </time>
              </p>
            ) : (
              <p className="mt-2 text-sm text-stone-600">Open a course to start tracking your activity here.</p>
            )}
          </header>

          {loading ? (
            <p className="text-sm text-stone-600">Loading your dashboard…</p>
          ) : (
            <>
              <section className="grid gap-4 sm:grid-cols-3">
                <div className={card}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">Active</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums text-zinc-900">{summary?.activeCount ?? 0}</p>
                  <p className="mt-1 text-xs text-stone-600">Courses in progress</p>
                </div>
                <div className={card}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">Average progress</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums text-zinc-900">{summary?.avgProgress ?? 0}%</p>
                  <p className="mt-1 text-xs text-stone-600">Across active courses</p>
                </div>
                <div className={card}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">Completed</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums text-zinc-900">{summary?.completedCount ?? 0}</p>
                  <p className="mt-1 text-xs text-stone-600">Courses you have finished</p>
                </div>
              </section>

              <section className={card}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">Recommended next step</p>
                {recent ? (
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-zinc-900">{recent.title}</p>
                      <p className="mt-1 text-sm text-stone-600">
                        {recent.nextLabel ? <>Next: {recent.nextLabel}</> : <>Keep going from where you left off.</>}
                      </p>
                    </div>
                    <Link className={learnerShellTokens.primaryButton} to={recent.resumeHref}>
                      {recent.resumeCta}
                    </Link>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-stone-600">
                    Browse the catalog to start your first course when you are ready.
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link className={learnerShellTokens.ghostButton} to={LEGAL_ROUTES.learn}>
                    Open catalog
                  </Link>
                  <Link className={learnerShellTokens.ghostButton} to="/reports">
                    View reports
                  </Link>
                </div>
              </section>

              <section className={card} data-testid="learner-dashboard-certificates">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">Certificates</p>
                <p className="mt-2 text-sm text-stone-600">
                  Certificates will appear here after you complete eligible courses. There is nothing to download until a course
                  confirms you have met its requirements.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-zinc-900">Your active courses</h3>
                {courses.length === 0 ? (
                  <p className="mt-2 text-sm text-stone-600">No started courses yet. My Learning stays focused on what you open.</p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {courses.map((c) => (
                      <li key={`${c.kind}-${c.slug}`} className={card}>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">{c.category}</p>
                            <p className="mt-0.5 font-medium text-zinc-900">{c.title}</p>
                            <p className="mt-2 text-xs text-stone-600">
                              Progress <span className="tabular-nums font-medium text-zinc-800">{c.progressPercent}%</span>
                              {c.currentLabel ? (
                                <>
                                  {' '}
                                  · Current: {c.currentLabel}
                                </>
                              ) : null}
                            </p>
                            <div className="mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-stone-200/90">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-rose-500 transition-[width]"
                                style={{ width: `${Math.min(100, c.progressPercent)}%` }}
                              />
                            </div>
                          </div>
                          <Link className={learnerShellTokens.primaryButton} to={c.resumeHref}>
                            {c.resumeCta}
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className={card}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">Account</p>
                <p className="mt-2 text-sm text-stone-700">{user?.email ?? '—'}</p>
                <Link className="mt-3 inline-flex text-sm font-medium text-orange-700 hover:underline" to="/account">
                  Account settings
                </Link>
              </section>
            </>
          )}
        </LearnerPageShell>
      </div>
    </WorkspaceRouteReady>
  )
}
