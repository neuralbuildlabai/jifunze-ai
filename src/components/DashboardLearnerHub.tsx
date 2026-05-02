import { useEffect, useMemo, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { canLearnerSelectPathwayAsPrimary } from '../data/learning/employablePathwaysCatalog'
import { getFlagshipCurriculum } from '../data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum, firstSessionInCourseOrder } from '../data/learning/flagshipCourseSessions'
import { useFlagshipCourseProgress } from '../hooks/useFlagshipCourseProgress'
import { useSelectedPathway } from '../hooks/useSelectedPathway'
import { getAiEssentialsMilestonesReachedCount } from '../lib/aiEssentialsProgressMilestones'
import { FLAGSHIP_PROGRESS_EVENT } from '../lib/flagshipCourseLocalProgress'
import { sessionOpenForLearner } from '../learner/flagshipSessionPrereq'
import { LEGAL_ROUTES } from '../training/trustCopy'
import { LearnerActionCard } from './learner-shell/LearnerActionCard'
import { learnerShellTokens } from './learner-shell/learnerShellTokens'

const AI_SLUG = 'ai-essentials' as const

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
      <LearnerActionCard
        eyebrow="Continue learning"
        title="AI Essentials"
        description={
          next && nextOpen ? (
            <>
              Next: <span className="font-medium text-zinc-200">{next.title}</span>
            </>
          ) : (
            <>Begin with Module 1 and complete your first checkpoint.</>
          )
        }
        footer={
          <p>
            Progress:{' '}
            <span className="font-semibold tabular-nums text-zinc-200">{progress.progressPercent}%</span>
          </p>
        }
        action={
          <Link className={learnerShellTokens.primaryButton} to={continueHref} data-testid="dashboard-continue-primary">
            {continueLabel}
          </Link>
        }
        data-testid="dashboard-continue-learning"
      />

      <LearnerActionCard
        eyebrow="My progress"
        title={`${progress.progressPercent}% complete`}
        description={
          <>
            <span className="tabular-nums text-zinc-300">{milestonesReached}</span> / 10 milestones ·{' '}
            <span className="tabular-nums text-zinc-300">{sessionDone}</span> / {sessions.length} sessions complete
          </>
        }
        action={
          <Link className={learnerShellTokens.primaryButton} to="/reports">
            View reports
          </Link>
        }
        data-testid="dashboard-my-progress"
      />

      <LearnerActionCard
        eyebrow="My pathway"
        title={selectedPathway && canLearnerSelectPathwayAsPrimary(selectedPathway) ? selectedPathway.title : 'Choose a pathway'}
        description={
          prefLoading ? (
            'Loading pathway…'
          ) : selectedPathway && canLearnerSelectPathwayAsPrimary(selectedPathway) ? (
            selectedPathway.description
          ) : (
            'Pick the direction that matches your goal. You can change it later.'
          )
        }
        action={
          selectedPathway && canLearnerSelectPathwayAsPrimary(selectedPathway) ? (
            <>
              <Link className={learnerShellTokens.ghostButton} to={LEGAL_ROUTES.paths}>
                Change pathway
              </Link>
              <Link className={learnerShellTokens.primaryButton} to={`/paths/${selectedPathway.slug}`} data-testid="dashboard-your-pathway-view">
                View pathway
              </Link>
            </>
          ) : (
            <Link className={learnerShellTokens.primaryButton} to={LEGAL_ROUTES.paths} data-testid="dashboard-choose-pathway">
              Choose pathway
            </Link>
          )
        }
        data-testid="dashboard-your-pathway"
      />

      <LearnerActionCard
        eyebrow="Portfolio outputs"
        title="Evidence in AI Essentials"
        description="Complete sessions to build checkpoint and portfolio evidence tracked in Reports."
        action={
          <Link className={learnerShellTokens.primaryButton} to={`/learn/courses/${AI_SLUG}`}>
            View course
          </Link>
        }
        data-testid="dashboard-build-proof"
      />
    </div>
  )
}
