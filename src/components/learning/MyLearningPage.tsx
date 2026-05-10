import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { findStandaloneCourseBySlug } from '../../data/courses'
import {
  getFullCourseCatalogItems,
  getMicrolearningCatalogItems,
} from '../../data/learning/availablePublicLearnCatalog'
import { learnerPublicCatalogFlagshipCourses } from '../../data/learning/flagshipLearnerCatalogPolicy'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { useAppAccess } from '../../access/useAppAccess'
import { useAuth } from '../../auth/AuthContext'
import { useTeamAssignmentsBoard } from '../../training/teamTrainingHooks'
import { SignedInContinueLearning } from '../SignedInContinueLearning'
import { LearnerPageShell } from '../learner-shell/LearnerPageShell'
import { learnerShellTokens } from '../learner-shell/learnerShellTokens'

const operatorCard =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04] transition hover:border-violet-400/15'

const warmCard = 'rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_20px_50px_-24px_rgba(120,53,15,0.15)] sm:p-6'

export function MyLearningPage() {
  const { supabase, user, workspaceShellReady } = useAuth()
  const { navVariant } = useAppAccess()
  const { rows: myAssignments, loading: assignLoading, error: assignError } = useTeamAssignmentsBoard('self')
  const isLearner = navVariant === 'learner'
  const catalogCourses = useMemo(() => learnerPublicCatalogFlagshipCourses(), [])
  const recommended = catalogCourses[1] ?? catalogCourses[0] ?? null

  const microItems = useMemo(() => getMicrolearningCatalogItems(), [])
  const fullItems = useMemo(() => getFullCourseCatalogItems(), [])
  const hasPublicCatalogItems = microItems.length > 0 || fullItems.length > 0

  if (isLearner) {
    return (
      <div data-testid="learner-my-learning-home">
        <LearnerPageShell
          title="My Learning"
          purpose="Self-paced courses and practical skills — open the same catalog as the public learning page."
        >
          <div className="flex flex-wrap gap-2">
            <Link className={learnerShellTokens.primaryButton} to={LEGAL_ROUTES.learn} data-testid="my-learning-open-catalog">
              Open catalog
            </Link>
            <Link className={learnerShellTokens.ghostButton} to="/reports">
              View reports
            </Link>
            <Link className={learnerShellTokens.ghostButton} to="/account">
              Account
            </Link>
          </div>

          <SignedInContinueLearning supabase={supabase} userId={user?.id} surface="warm" />

          {hasPublicCatalogItems ? (
            <section className={warmCard} data-testid="my-learning-available-catalog">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Available courses &amp; workshops</p>
              <p className="mt-1 text-sm text-stone-600">
                Grouped like the public catalog. Completion for shorter starters may stay on this device until account-wide sync is available.
              </p>

              {microItems.length ? (
                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-800">Free Microlearning</p>
                  <ul className="mt-3 space-y-2">
                    {microItems.map((item) => (
                      <li key={item.slug}>
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200/80 bg-[#fffdfb] px-3 py-3">
                          <div className="min-w-0">
                            <Link to={item.route} className="font-medium text-zinc-900 hover:text-orange-700">
                              {item.title}
                            </Link>
                            <p className="mt-1 text-[12px] text-stone-600">
                              {item.publicLabel} · {item.durationLabel} · {item.entry.learnerDisplayFormat}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Link className={learnerShellTokens.primaryButton} to={item.route}>
                              {item.ctaLabel}
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {fullItems.length ? (
                <div className="mt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-800">Free Full Courses</p>
                  <ul className="mt-3 space-y-2">
                    {fullItems.map((item) => {
                      const standalone = findStandaloneCourseBySlug(item.slug)
                      const firstModuleSlug = standalone?.source.modules[0]?.slug
                      return (
                        <li key={item.slug}>
                          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200/80 bg-[#fffdfb] px-3 py-3">
                            <div className="min-w-0">
                              <Link to={item.route} className="font-medium text-zinc-900 hover:text-orange-700">
                                {item.title}
                              </Link>
                              <p className="mt-1 text-[12px] text-stone-600">
                                {item.publicLabel}
                                {standalone
                                  ? ` · ${standalone.source.modules.length} modules · ~${standalone.estimatedHours} hours`
                                  : null}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Link className={learnerShellTokens.ghostButton} to={item.route}>
                                Open course
                              </Link>
                              {firstModuleSlug ? (
                                <Link
                                  className={learnerShellTokens.primaryButton}
                                  to={`${item.route}/modules/${firstModuleSlug}`}
                                >
                                  Start course
                                </Link>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}

          {catalogCourses.length ? (
            <section className={warmCard} data-testid="my-learning-catalog-courses">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Your courses</p>
                  <p className="mt-1 text-sm text-stone-600">Flagship paths included in your workspace — free access.</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {catalogCourses.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/learn/courses/${c.slug}`}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200/80 bg-[#fffdfb] px-3 py-3 text-sm text-zinc-900 transition hover:border-orange-200/90"
                    >
                      <span className="font-medium">{c.title}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-orange-700/90">Free</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {recommended ? (
            <section className={warmCard} data-testid="my-learning-recommended">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Recommended next</p>
              <p className="mt-2 text-sm font-medium text-zinc-900">{recommended.title}</p>
              <p className="mt-1 text-sm text-stone-600">Start or continue when you are ready — progress saves to your account.</p>
              <div className="mt-4">
                <Link className={learnerShellTokens.primaryButton} to={`/learn/courses/${recommended.slug}`}>
                  Start free
                </Link>
              </div>
            </section>
          ) : null}

          <section className={warmCard} data-testid="my-learning-progress-summary">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Progress summary</p>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Session completion, checkpoints, and module quizzes are summarized in Reports so you can see where you are strong and what to
              revisit next.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className={learnerShellTokens.primaryButton} to="/reports">
                Open reports
              </Link>
              <Link className={learnerShellTokens.ghostButton} to="/account">
                Account &amp; sign-in
              </Link>
            </div>
          </section>
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
