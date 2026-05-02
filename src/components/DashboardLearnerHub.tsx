import { useEffect, useMemo, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { canLearnerSelectPathwayAsPrimary } from '../data/learning/employablePathwaysCatalog'
import { getFlagshipCurriculum } from '../data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum, firstSessionInCourseOrder } from '../data/learning/flagshipCourseSessions'
import { useFlagshipCourseProgress } from '../hooks/useFlagshipCourseProgress'
import { useSelectedPathway } from '../hooks/useSelectedPathway'
import { getAiEssentialsMilestonesReachedCount, getAiEssentialsNextMilestoneHint } from '../lib/aiEssentialsProgressMilestones'
import { FLAGSHIP_PROGRESS_EVENT } from '../lib/flagshipCourseLocalProgress'
import { sessionOpenForLearner } from '../learner/flagshipSessionPrereq'
import { LEGAL_ROUTES } from '../training/trustCopy'

const AI_SLUG = 'ai-essentials' as const

const surface =
  'rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.04]'
const eyebrow = 'text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500'
const btnPrimary =
  'inline-flex min-h-[2.5rem] items-center justify-center rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500'
const btnGhost =
  'inline-flex min-h-[2.5rem] items-center justify-center rounded-lg border border-white/[0.1] px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/[0.04]'

/**
 * Learning-first dashboard: continue AI Essentials, progress, pathway, portfolio entry.
 */
export function DashboardLearnerHub() {
  const { user, supabase } = useAuth()
  const { selectedPathway, loading: prefLoading } = useSelectedPathway()

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

  const continueLabel = progress.completed.size === 0 ? 'Start course' : 'Continue'

  const milestonesReached = getAiEssentialsMilestonesReachedCount(progress.progressPercent)
  const nextMilestoneHint = getAiEssentialsNextMilestoneHint(curriculum, sessions, progress.state)
  const sessionDone = sessions.filter((s) => progress.completed.has(s.id)).length

  const [tick, refresh] = useReducer((n: number) => n + 1, 0)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const on = () => refresh()
    window.addEventListener(FLAGSHIP_PROGRESS_EVENT, on as EventListener)
    return () => window.removeEventListener(FLAGSHIP_PROGRESS_EVENT, on as EventListener)
  }, [])

  void tick

  return (
    <div className="space-y-6">
      <section className={surface} data-testid="dashboard-continue-learning">
        <p className={eyebrow}>Continue learning</p>
        <h2 className="mt-2 text-lg font-semibold text-white">AI Essentials</h2>
        <p className="mt-2 text-sm text-zinc-400">
          {next && nextOpen ? (
            <>
              Next: <span className="font-medium text-zinc-200">{next.title}</span>
            </>
          ) : (
            <>Begin with Module 1 and complete your first checkpoint.</>
          )}
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Progress: <span className="font-semibold tabular-nums text-zinc-200">{progress.progressPercent}%</span>
        </p>
        <Link className={`${btnPrimary} mt-4 inline-flex`} to={continueHref} data-testid="dashboard-continue-primary">
          {continueLabel}
        </Link>
      </section>

      <section className={surface} data-testid="dashboard-my-progress">
        <p className={eyebrow}>My progress</p>
        <p className="mt-2 text-sm text-zinc-400">
          <span className="font-semibold tabular-nums text-zinc-100">{progress.progressPercent}%</span> complete ·{' '}
          <span className="tabular-nums text-zinc-300">{milestonesReached}</span> / 10 milestones ·{' '}
          <span className="tabular-nums text-zinc-300">{sessionDone}</span> / {sessions.length} sessions complete
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-500">{nextMilestoneHint}</p>
        <Link className={`${btnPrimary} mt-4 inline-flex`} to="/reports">
          View reports
        </Link>
      </section>

      <section className={surface} data-testid="dashboard-your-pathway">
        <p className={eyebrow}>My pathway</p>
        {prefLoading ? <p className="mt-2 text-sm text-zinc-500">Loading pathway…</p> : null}
        {selectedPathway && canLearnerSelectPathwayAsPrimary(selectedPathway) ? (
          <>
            <h2 className="mt-2 text-lg font-semibold text-white">{selectedPathway.title}</h2>
            <p className="mt-2 text-sm text-zinc-400">{selectedPathway.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className={btnGhost} to={LEGAL_ROUTES.paths}>
                Change pathway
              </Link>
              <Link className={btnPrimary} to={`/paths/${selectedPathway.slug}`} data-testid="dashboard-your-pathway-view">
                View pathway
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm text-zinc-400">
              Pick the direction that matches your goal. You can change it later.
            </p>
            <Link className={`${btnPrimary} mt-4 inline-flex`} to={LEGAL_ROUTES.paths} data-testid="dashboard-choose-pathway">
              Choose pathway
            </Link>
          </>
        )}
      </section>

      <section className={surface} data-testid="dashboard-build-proof">
        <p className={eyebrow}>Portfolio outputs</p>
        <p className="mt-2 text-sm text-zinc-400">
          Complete sessions in AI Essentials to build checkpoint and portfolio evidence tracked in Reports.
        </p>
        <Link className={`${btnPrimary} mt-4 inline-flex`} to={`/learn/courses/${AI_SLUG}`}>
          View course
        </Link>
      </section>
    </div>
  )
}
