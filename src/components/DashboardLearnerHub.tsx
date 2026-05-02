import { useEffect, useMemo, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { canLearnerSelectPathwayAsPrimary } from '../data/learning/employablePathwaysCatalog'
import { getFlagshipCourseBySlug } from '../data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum } from '../data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum, firstSessionInCourseOrder } from '../data/learning/flagshipCourseSessions'
import { useFlagshipCourseProgress } from '../hooks/useFlagshipCourseProgress'
import { useSelectedPathway } from '../hooks/useSelectedPathway'
import { getAiEssentialsMilestonesReachedCount } from '../lib/aiEssentialsProgressMilestones'
import { nextAiEssentialsPortfolioOutput } from '../lib/learnerDashboardPortfolioHint'
import { FLAGSHIP_PROGRESS_EVENT } from '../lib/flagshipCourseLocalProgress'
import { sessionOpenForLearner } from '../learner/flagshipSessionPrereq'
import { LEGAL_ROUTES } from '../training/trustCopy'
import { learnerShellTokens } from './learner-shell/learnerShellTokens'

const AI_SLUG = 'ai-essentials' as const

function pathwayOneLine(description: string): string {
  const t = description.replace(/\s+/g, ' ').trim()
  if (!t) return ''
  const first = t.split(/(?<=[.!?])\s/)[0] ?? t
  return first.length > 150 ? `${first.slice(0, 147)}…` : first
}

/**
 * Learning-first dashboard — continue course, progress, portfolio hint, optional pathway, account.
 * Course-specific copy is localized here (single allowlisted flagship); shell primitives stay generic elsewhere.
 */
export function DashboardLearnerHub() {
  const { user, supabase, signOut, signOutPending } = useAuth()
  const { selectedPathway, loading: prefLoading } = useSelectedPathway()

  const courseCatalog = useMemo(() => getFlagshipCourseBySlug(AI_SLUG), [])
  const courseTitle = courseCatalog?.title ?? 'AI Essentials'

  const curriculum = useMemo(() => getFlagshipCurriculum(AI_SLUG), [])
  const sessions = useMemo(() => (curriculum ? buildSessionsForCurriculum(curriculum) : []), [curriculum])
  const flagshipSync = useMemo(
    () => (user && supabase && isSupabaseConfigured() ? { supabase, userId: user.id } : null),
    [user, supabase],
  )
  const progress = useFlagshipCourseProgress(AI_SLUG, curriculum, sessions, flagshipSync)

  const openOpts = useMemo(
    () => ({
      capstonePrepAccessible: progress.capstonePrepAccessible,
      curriculum: curriculum ?? undefined,
      progressState: progress.state,
    }),
    [progress.capstonePrepAccessible, progress.state, curriculum],
  )

  const first = firstSessionInCourseOrder(sessions)
  const next = progress.nextSession
  const nextOpen = Boolean(next && sessionOpenForLearner(progress.completed, next, openOpts))
  const firstOpen = Boolean(first && sessionOpenForLearner(progress.completed, first, openOpts))

  const continueHref =
    nextOpen && next
      ? `/learn/courses/${AI_SLUG}/session/${next.id}`
      : firstOpen && first
        ? `/learn/courses/${AI_SLUG}/session/${first.id}`
        : `/learn/courses/${AI_SLUG}`

  const hasStarted = progress.completed.size > 0
  const continueCta = hasStarted ? 'Continue' : 'Start course'
  const continueTitle = hasStarted ? `Continue ${courseTitle}` : `Start ${courseTitle}`

  const milestonesReached = getAiEssentialsMilestonesReachedCount(progress.progressPercent)
  const moduleTotal = curriculum?.modules.length ?? 0
  const nextPortfolio = useMemo(
    () => (sessions.length ? nextAiEssentialsPortfolioOutput(sessions, progress.state) : null),
    [sessions, progress.state],
  )

  const nextModuleLabel = useMemo(() => {
    if (!curriculum || !next) return null
    const mod = curriculum.modules.find((m) => m.id === next.moduleId)
    return mod?.title ?? null
  }, [curriculum, next])

  const [tick, refresh] = useReducer((n: number) => n + 1, 0)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const on = () => refresh()
    window.addEventListener(FLAGSHIP_PROGRESS_EVENT, on as EventListener)
    return () => window.removeEventListener(FLAGSHIP_PROGRESS_EVENT, on as EventListener)
  }, [])

  void tick

  const pathwayPrimary = selectedPathway && canLearnerSelectPathwayAsPrimary(selectedPathway)
  const pathwayTitle = pathwayPrimary ? selectedPathway.title : 'Choose a pathway'
  const pathwayBody = prefLoading
    ? 'Loading…'
    : pathwayPrimary
      ? pathwayOneLine(selectedPathway.description)
      : 'Optional context for your goals — your course progress stays the same.'

  const portfolioPrimaryHref = nextPortfolio ? `/learn/courses/${AI_SLUG}` : '/reports'
  const portfolioPrimaryLabel = nextPortfolio ? 'View course' : 'View reports'

  return (
    <div className="space-y-5">
      {/* 1 — Continue learning (primary) */}
      <section className={learnerShellTokens.cardEmphasis} data-testid="dashboard-continue-learning">
        <p className={learnerShellTokens.mutedEyebrow}>Continue learning</p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">{continueTitle}</h2>
        {!hasStarted ? (
          <>
            <p className={`${learnerShellTokens.cardMuted} mt-2`}>Begin with Module 1 and complete your first checkpoint.</p>
            <dl className={learnerShellTokens.specRow}>
              <div>
                <dt className="sr-only">Course</dt>
                <dd>{courseTitle}</dd>
              </div>
              {moduleTotal ? (
                <div>
                  <dt className="sr-only">Modules</dt>
                  <dd>
                    {moduleTotal} modules
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="sr-only">Time</dt>
                <dd>32–45 hours</dd>
              </div>
              <div>
                <dt className="sr-only">Outputs</dt>
                <dd>Portfolio + capstone</dd>
              </div>
            </dl>
          </>
        ) : (
          <div className="mt-3 space-y-2 text-sm text-zinc-400">
            {next && nextOpen ? (
              <p>
                <span className="text-zinc-500">Next session · </span>
                <span className="font-medium text-zinc-100">{next.title}</span>
              </p>
            ) : (
              <p>Open the course overview to pick up where you left off.</p>
            )}
            {nextModuleLabel ? (
              <p className="text-[13px] text-zinc-500">
                Module · <span className="text-zinc-300">{nextModuleLabel}</span>
              </p>
            ) : null}
            <p className="tabular-nums text-zinc-300">
              Progress <span className="font-semibold text-white">{progress.progressPercent}%</span>
              <span className="mx-2 text-zinc-600">·</span>
              Milestones <span className="font-semibold text-white">{milestonesReached}</span> / 10
            </p>
          </div>
        )}
        <div className="mt-6">
          <Link className={learnerShellTokens.primaryButton} to={continueHref} data-testid="dashboard-continue-primary">
            {continueCta}
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* 2 — Progress */}
        <section className={learnerShellTokens.cardCompact} data-testid="dashboard-my-progress">
          <h3 className={learnerShellTokens.cardTitleSm}>Progress</h3>
          <p className={`${learnerShellTokens.cardMutedSm} mt-2 tabular-nums`}>
            <span className="text-lg font-semibold text-white">{progress.progressPercent}%</span> complete
          </p>
          <p className="mt-2 text-[13px] text-zinc-500">
            Milestones reached · <span className="font-medium text-zinc-200">{milestonesReached}</span> / 10
          </p>
          {next && nextOpen ? (
            <p className="mt-2 text-[13px] leading-snug text-zinc-400">
              <span className="text-zinc-500">Now · </span>
              {next.title}
            </p>
          ) : hasStarted ? (
            <p className="mt-2 text-[13px] text-zinc-500">Review reports for session-level detail.</p>
          ) : (
            <p className="mt-2 text-[13px] text-zinc-500">Start the course to begin milestone tracking.</p>
          )}
          <div className="mt-4">
            <Link className={learnerShellTokens.primaryButton} to="/reports">
              View reports
            </Link>
          </div>
        </section>

        {/* 3 — Portfolio */}
        <section className={learnerShellTokens.cardCompact} data-testid="dashboard-build-proof">
          <h3 className={learnerShellTokens.cardTitleSm}>Portfolio output</h3>
          {nextPortfolio ? (
            <p className={`${learnerShellTokens.cardMutedSm} mt-2 text-zinc-300`}>{nextPortfolio.title}</p>
          ) : (
            <p className={`${learnerShellTokens.cardMutedSm} mt-2 text-zinc-300`}>Capstone &amp; final evidence</p>
          )}
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-500">Course work becomes portfolio-ready evidence.</p>
          <div className="mt-4">
            <Link className={learnerShellTokens.primaryButton} to={portfolioPrimaryHref}>
              {portfolioPrimaryLabel}
            </Link>
          </div>
        </section>
      </div>

      {/* 4 — Pathway (single, compact) */}
      <section className={learnerShellTokens.card} data-testid="dashboard-your-pathway">
        <p className={learnerShellTokens.mutedEyebrow}>Pathway</p>
        <h3 className="mt-2 text-sm font-semibold text-white">{pathwayTitle}</h3>
        <p className="mt-2 text-sm text-zinc-400">{pathwayBody}</p>
        <div className="mt-5">
          {pathwayPrimary ? (
            <Link className={learnerShellTokens.primaryButton} to={`/paths/${selectedPathway.slug}`} data-testid="dashboard-your-pathway-view">
              View pathway
            </Link>
          ) : (
            <Link className={learnerShellTokens.primaryButton} to={LEGAL_ROUTES.paths} data-testid="dashboard-choose-pathway">
              Choose pathway
            </Link>
          )}
        </div>
      </section>

      {/* 5 — Account */}
      <section className={learnerShellTokens.card} data-testid="dashboard-learner-account">
        <p className={learnerShellTokens.mutedEyebrow}>Account</p>
        <p className="mt-2 text-sm text-zinc-200">{user?.email ?? '—'}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className={learnerShellTokens.ghostButton} to="/settings">
            Settings
          </Link>
          <button
            type="button"
            disabled={signOutPending}
            onClick={() => void signOut()}
            className={learnerShellTokens.primaryButton}
            data-testid="dashboard-sign-out"
          >
            {signOutPending ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </section>
    </div>
  )
}
