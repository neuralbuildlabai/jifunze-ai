import { Link } from 'react-router-dom'
import type { FlagshipCourseCurriculum, FlagshipCurriculumModule } from '../../data/learning/flagshipCourseCurricula'
import { flagshipStageLabel } from '../../data/learning/flagshipCourseCurricula'
import {
  FLAGSHIP_CAPSTONE_MODULE_ID,
  FLAGSHIP_SESSION_TYPE_LABEL,
  flagshipSessionEffortDisplay,
  firstSessionInCourseOrder,
  type FlagshipSession,
} from '../../data/learning/flagshipCourseSessions'
import {
  lockedForwardReason,
  lockedModuleQuizReason,
  sessionOpenForLearner,
  sessionPrerequisitesMet,
} from '../../learner/flagshipSessionPrereq'
import { useCallback, useState } from 'react'
import { useLearnerCommerceOptional } from '../../learner/LearnerCommerceContext'
import type { FlagshipCourseProgressApi } from '../../hooks/useFlagshipCourseProgress'
import type { FlagshipCourseProgressState } from '../../lib/flagshipCourseProgressDerived'
import {
  moduleFullyComplete,
  moduleSessionStats,
  moduleSessionsAllDone,
  priorModulesQuizSatisfied,
} from '../../lib/flagshipCourseProgressDerived'
import {
  AI_ESSENTIALS_MODULE_LEARNER_CARD,
  AI_ESSENTIALS_MODULE_PORTFOLIO_LABEL,
  AI_ESSENTIALS_MODULE_TIME_HINT,
  AI_ESSENTIALS_STAGE_SECTION_LABEL,
} from '../../lib/aiEssentialsCourseUiMeta'
import {
  AI_ESSENTIALS_SLUG,
  getAiEssentialsMilestonesReachedCount,
  getAiEssentialsNextMilestoneHint,
} from '../../lib/aiEssentialsProgressMilestones'
import { MODULE_QUIZ_DRAW_COUNT, MODULE_QUIZ_MIN_CORRECT } from '../../lib/flagshipModuleQuizPools'
import { LearnSectionSparkIcon } from '../visuals/JifunzeLearnVisuals'
import { FlagshipModuleQuizPanel } from './FlagshipModuleQuizPanel'

const STAGE_FLOW = ['foundations', 'applied_practice', 'professional_execution', 'mastery_outputs'] as const

function SessionStatusDot({ done, active }: { done: boolean; active: boolean }) {
  if (done) {
    return <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-700/55" aria-label="Completed" />
  }
  if (active) {
    return <span className="h-2 w-2 shrink-0 rounded-full bg-amber-600/55 ring-2 ring-amber-600/25" aria-label="Current" />
  }
  return <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--jf-border)]" aria-label="Not started" />
}

function SessionRow(props: {
  session: FlagshipSession
  completed: Set<string>
  isNext: boolean
  courseSlug: string
  capstonePrepAccessible: boolean
  purchaseGateEnabled: boolean
  hasCourseAccess: boolean
  curriculum: FlagshipCourseCurriculum
  progressState: FlagshipCourseProgressState | undefined
  chapterOrdinal: number
  /** Calmer overview: shorter lock copy, less metadata in each row */
  compact?: boolean
}) {
  const {
    session,
    completed,
    isNext,
    courseSlug,
    capstonePrepAccessible,
    purchaseGateEnabled,
    hasCourseAccess,
    curriculum,
    progressState,
    chapterOrdinal,
    compact,
  } = props
  const done = completed.has(session.id)
  const prereqOk = sessionPrerequisitesMet(completed, session)
  const capPrepLocked =
    session.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID && !done && !capstonePrepAccessible
  const quizBlocked =
    Boolean(progressState && prereqOk && !capPrepLocked && !priorModulesQuizSatisfied(curriculum, session.moduleId, progressState))

  const open = sessionOpenForLearner(completed, session, {
    capstonePrepAccessible,
    curriculum,
    progressState,
  })

  const lockExplain = capPrepLocked
    ? lockedForwardReason(session, { capstonePrep: true })
    : !prereqOk
      ? lockedForwardReason(session)
      : quizBlocked
        ? lockedModuleQuizReason()
        : lockedForwardReason(session)

  const rowClass = `flex flex-wrap items-start gap-x-3 gap-y-2 rounded-lg border px-3 py-2.5 text-left transition sm:items-center ${
    isNext && !done && open
      ? 'border-[color:var(--jf-text)]/20 bg-[color:var(--jf-surface)]'
      : 'border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] hover:border-stone-400/45'
  }`

  if (purchaseGateEnabled && !hasCourseAccess) {
    return (
      <li>
        <Link
          to={`/learn/checkout?course=${courseSlug}`}
          className={`${rowClass} opacity-95`}
          data-testid={`flagship-session-row-${session.id}`}
        >
          <SessionStatusDot done={done} active={false} />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
              {compact ? `Session ${chapterOrdinal}` : `Chapter ${chapterOrdinal}`}
            </p>
            <p className="text-[13px] font-medium leading-snug text-[color:var(--jf-text)]">{session.title}</p>
            <p className="mt-0.5 text-[11px] text-[color:var(--jf-muted)]">
              Purchase or subscribe to unlock sessions.
            </p>
          </div>
          <span className="rounded-full border border-[color:var(--jf-border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[color:var(--jf-subtle)]">
            View checkout
          </span>
        </Link>
      </li>
    )
  }

  if (!open && !done) {
    return (
      <li>
        <div
          className={`${rowClass} cursor-not-allowed opacity-[0.88]`}
          data-testid={`flagship-session-row-${session.id}`}
          aria-current={false}
          title={lockExplain}
        >
          <SessionStatusDot done={done} active={false} />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
              {compact ? `Session ${chapterOrdinal}` : `Chapter ${chapterOrdinal}`}
            </p>
            <p className="text-[13px] font-medium leading-snug text-[color:var(--jf-text)]">{session.title}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-[color:var(--jf-muted)]">{lockExplain}</p>
            {!compact ? (
              <p className="mt-0.5 line-clamp-2 text-[11px] text-[color:var(--jf-subtle)]">{session.summary}</p>
            ) : null}
          </div>
          <span className="rounded-full border border-[color:var(--jf-border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[color:var(--jf-subtle)]">
            Locked
          </span>
        </div>
      </li>
    )
  }

  return (
    <li>
      <Link
        to={`/learn/courses/${courseSlug}/session/${session.id}`}
        className={`${rowClass}`}
        data-testid={`flagship-session-row-${session.id}`}
      >
        <SessionStatusDot done={done} active={isNext && !done} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
            {compact ? `Session ${chapterOrdinal}` : `Chapter ${chapterOrdinal}`}
          </p>
          <p className="text-[13px] font-medium leading-snug text-[color:var(--jf-text)]">{session.title}</p>
          {!compact ? <p className="mt-0.5 line-clamp-2 text-[11px] text-[color:var(--jf-muted)]">{session.summary}</p> : null}
        </div>
        {!compact ? (
          <div className="flex w-full shrink-0 flex-wrap items-center justify-end gap-2 sm:w-auto sm:justify-start">
            <span className="rounded-full border border-[color:var(--jf-border)] px-2 py-0.5 text-[10px] font-medium text-[color:var(--jf-subtle)]">
              {FLAGSHIP_SESSION_TYPE_LABEL[session.type]}
            </span>
            <span className="text-[11px] leading-snug text-[color:var(--jf-muted)]">{flagshipSessionEffortDisplay(session)}</span>
          </div>
        ) : null}
      </Link>
    </li>
  )
}

export type FlagshipLearningPathLayout = 'default' | 'accordion'

export function FlagshipCourseLearningPath(props: {
  courseSlug: string
  curriculum: FlagshipCourseCurriculum
  sessions: FlagshipSession[]
  progress: FlagshipCourseProgressApi
  /** Accordion: one module expanded at a time; calmer session rows (Course 1 overview). */
  layout?: FlagshipLearningPathLayout
  /** When false, the parent supplies the Curriculum heading and intro copy (avoid duplicate h2). */
  showSectionIntro?: boolean
  /** When true, omit the large embedded progress panel (parent shows a simple progress card). */
  hideProgressSummary?: boolean
}) {
  const { courseSlug, curriculum, sessions, progress, layout: layoutProp, showSectionIntro = true, hideProgressSummary = false } = props
  const layout = layoutProp ?? 'default'
  const compactRows = layout === 'accordion'
  const isAe = courseSlug === AI_ESSENTIALS_SLUG
  const isAeAccordion = isAe && layout === 'accordion'
  const commerce = useLearnerCommerceOptional()
  const purchaseGateEnabled = commerce?.purchaseGateEnabled ?? false
  const hasCourseAccess = commerce?.hasCourseAccess(courseSlug) ?? true
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null)
  const toggleModule = useCallback((id: string) => {
    setExpandedModuleId((cur) => (cur === id ? null : id))
  }, [])

  const {
    completed,
    progressPercent,
    modulesCompleted,
    modulesTotal,
    stageSummary,
    currentStageLabel,
    nextSession,
    resumeLabel: resumeCtaLabel,
    needsAttention,
    capstoneUnlocked,
    capstonePrepAccessible,
    capstonePrepComplete,
    remainingBeforeCapstone,
    masteryCheckpointsDone,
    masteryCheckpointsTotal,
    pendingMasteryModuleTitles,
    learningGuidanceLine,
    readinessCompactLabel,
    readinessDetailHint,
    state,
    updateModuleQuizRecord,
  } = progress

  const modulesByStage = STAGE_FLOW.map((stage) => ({
    stage,
    modules: curriculum.modules.filter((m) => m.stage === stage),
  })).filter((g) => g.modules.length > 0)

  const sessionHref = (id: string) => `/learn/courses/${courseSlug}/session/${id}`

  const nextId = nextSession?.id
  const resumeReachable =
    !!nextSession &&
    sessionOpenForLearner(completed, nextSession, {
      capstonePrepAccessible,
      curriculum,
      progressState: state,
    })
  const firstSession = firstSessionInCourseOrder(sessions)
  const startReachable =
    !!firstSession &&
    sessionOpenForLearner(completed, firstSession, {
      capstonePrepAccessible,
      curriculum,
      progressState: state,
    })

  function moduleById(id: string): FlagshipCurriculumModule | undefined {
    return curriculum.modules.find((m) => m.id === id)
  }

  return (
    <section
      className={showSectionIntro ? 'mt-14' : 'mt-0'}
      aria-labelledby={showSectionIntro ? 'learning-path-heading' : undefined}
      data-testid="flagship-learning-path"
    >
      {showSectionIntro ? (
        <>
          <h2
            id="learning-path-heading"
            className="flex flex-wrap items-center gap-2 text-lg font-semibold tracking-tight text-[color:var(--jf-text)]"
          >
            <LearnSectionSparkIcon className="h-6 w-6 shrink-0" aria-hidden />
            {layout === 'accordion' ? 'Curriculum' : 'Your learning path'}
          </h2>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
            {layout === 'accordion'
              ? 'Expand a module to see sessions and the module check. Your place saves on this device.'
              : 'Work through sessions in order, then pass the module check to continue. Progress saves on this device.'}
          </p>
        </>
      ) : null}

      {!hideProgressSummary ? (
        <div
          className={`rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-4 py-5 shadow-[var(--jf-shadow-soft)] sm:px-6 sm:py-6 ${showSectionIntro ? 'mt-8' : 'mt-0'}`}
          data-testid="flagship-progress-summary"
        >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 space-y-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Overall progress</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-2xl font-semibold tabular-nums text-[color:var(--jf-text)]">{progressPercent}%</span>
                <span className="text-[13px] text-[color:var(--jf-muted)]">
                  {isAe ? (
                    <>
                      <span className="font-medium text-[color:var(--jf-text)]">{modulesCompleted}</span> of {modulesTotal} modules complete
                    </>
                  ) : (
                    <>
                      {modulesCompleted} / {modulesTotal} modules · {sessions.filter((s) => completed.has(s.id)).length} / {sessions.length}{' '}
                      sessions
                    </>
                  )}
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-[color:var(--jf-bg-page)]">
                <div
                  className="h-full rounded-full bg-[color:var(--jf-brand)]/75 transition-[width]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {isAeAccordion ? (
                <div className="mt-3 max-w-2xl space-y-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]" data-testid="ae-curriculum-milestone-line">
                  <p>
                    {getAiEssentialsMilestonesReachedCount(progressPercent) === 0 ? (
                      <>You&apos;re just getting started—complete each module step by step.</>
                    ) : (
                      <>
                        You&apos;re{' '}
                        <span className="font-medium text-[color:var(--jf-text)]">
                          {getAiEssentialsMilestonesReachedCount(progressPercent)} of 10
                        </span>{' '}
                        milestones along.
                      </>
                    )}
                  </p>
                  <details className="rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/60 px-3 py-2 text-[12px]">
                    <summary className="cursor-pointer font-semibold text-[color:var(--jf-text)]">Next milestone</summary>
                    <p className="mt-2 leading-relaxed text-[color:var(--jf-muted)]">
                      {getAiEssentialsNextMilestoneHint(curriculum, sessions, state)}
                    </p>
                  </details>
                </div>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 text-[12px] text-[color:var(--jf-muted)]">
              <span className="rounded-full border border-[color:var(--jf-border)] px-2.5 py-1">
                Active stage focus: <span className="font-medium text-[color:var(--jf-text)]">{currentStageLabel}</span>
              </span>
              {isAe ? (
                !capstoneUnlocked ? (
                  <span className="rounded-full border border-[color:var(--jf-border)] px-2.5 py-1">
                    Capstone prep unlocks after modules and checkpoints—not a raw session tally.
                  </span>
                ) : !capstonePrepAccessible ? (
                  <span className="rounded-full border border-amber-200/70 bg-amber-50/90 px-2.5 py-1 text-amber-950/90">
                    Capstone prep: checkpoints pending
                  </span>
                ) : (
                  <span className="rounded-full border border-emerald-200/70 bg-emerald-50/90 px-2.5 py-1 text-emerald-950/90">
                    Capstone prep ready
                  </span>
                )
              ) : !capstoneUnlocked ? (
                <span className="rounded-full border border-[color:var(--jf-border)] px-2.5 py-1">
                  Capstone path: <span className="font-medium text-[color:var(--jf-text)]">{remainingBeforeCapstone}</span> sessions left before prep
                </span>
              ) : !capstonePrepAccessible ? (
                <span className="rounded-full border border-amber-200/70 bg-amber-50/90 px-2.5 py-1 text-amber-950/90">
                  Capstone prep: checkpoints pending
                </span>
              ) : (
                <span className="rounded-full border border-emerald-200/70 bg-emerald-50/90 px-2.5 py-1 text-emerald-950/90">
                  Capstone prep ready
                </span>
              )}
              <span
                className="rounded-full border border-[color:var(--jf-border)] px-2.5 py-1"
                data-testid="flagship-mastery-summary"
              >
                {isAe ? (
                  <>
                    Practice checkpoints:{' '}
                    <span className="font-medium text-[color:var(--jf-text)]">
                      {masteryCheckpointsDone}/{masteryCheckpointsTotal}
                    </span>
                  </>
                ) : (
                  <>
                    Checkpoint evidence:{' '}
                    <span className="font-medium text-[color:var(--jf-text)]">
                      {masteryCheckpointsDone}/{masteryCheckpointsTotal}
                    </span>
                  </>
                )}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {readinessCompactLabel ? (
                <span
                  className="inline-flex rounded-full border border-[color:var(--jf-border)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--jf-muted)]"
                  data-testid="flagship-readiness-compact"
                >
                  {readinessCompactLabel}
                </span>
              ) : null}
            </div>
            {learningGuidanceLine ? (
              <p className="text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">{learningGuidanceLine}</p>
            ) : readinessDetailHint ? (
              <p className="text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">{readinessDetailHint}</p>
            ) : null}
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row lg:w-auto lg:flex-col">
            {purchaseGateEnabled && !hasCourseAccess ? (
              <Link
                to={`/learn/checkout?course=${courseSlug}`}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
                data-testid="flagship-resume-primary"
              >
                Get course access
              </Link>
            ) : nextSession && resumeReachable ? (
              <Link
                to={sessionHref(nextSession.id)}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
                data-testid="flagship-resume-primary"
              >
                {completed.size === 0 ? 'Start course' : resumeCtaLabel}
              </Link>
            ) : firstSession && startReachable && completed.size === 0 ? (
              <Link
                to={sessionHref(firstSession.id)}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
                data-testid="flagship-resume-primary"
              >
                Start course
              </Link>
            ) : nextSession ? (
              <span className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-medium text-[color:var(--jf-muted)]">
                Open an unlocked session below to continue
              </span>
            ) : (
              <span className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-medium text-[color:var(--jf-muted)]">
                Path complete
              </span>
            )}
            {layout === 'accordion' ? (
              <a
                href="#ai-essentials-hero"
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-stone-50"
              >
                Back to top
              </a>
            ) : (
              <Link
                to={`/learn/courses/${courseSlug}`}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-stone-50"
              >
                Course overview
              </Link>
            )}
          </div>
        </div>

        {/* Stage breakdown — compact */}
        {layout !== 'accordion' ? (
          <div className="mt-8 grid gap-3 border-t border-[color:var(--jf-border)] pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {STAGE_FLOW.map((st) => {
              const s = stageSummary[st]
              const pct =
                s.sessionsTotal === 0 ? 0 : Math.round((s.sessionsDone / s.sessionsTotal) * 100)
              return (
                <div key={st} className="rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">{flagshipStageLabel(st)}</p>
                  <p className="mt-2 font-mono text-[13px] tabular-nums text-[color:var(--jf-text)]">
                    {s.sessionsDone}/{s.sessionsTotal} sessions · {pct}%
                  </p>
                </div>
              )
            })}
          </div>
        ) : null}

        {pendingMasteryModuleTitles.length > 0 ? (
          <div className="mt-6 rounded-xl border border-orange-200/65 bg-orange-50/80 px-4 py-3" data-testid="flagship-mastery-pending">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-950/80">Continue strengthening this area</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              Before moving forward: finish both mastery checkpoints on the practice session for{' '}
              <span className="font-medium text-[color:var(--jf-text)]">{pendingMasteryModuleTitles[0]}</span>
              {pendingMasteryModuleTitles.length > 1 ? ' (and other completed modules).' : '.'}
            </p>
          </div>
        ) : null}

        {needsAttention.length > 0 ? (
          <div className="mt-6 rounded-xl border border-amber-200/70 bg-amber-50/85 px-4 py-3" data-testid="flagship-needs-attention">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-950/85">Suggested follow-up</p>
            <ul className="mt-2 space-y-2">
              {needsAttention.slice(0, 3).map((s) => (
                <li key={s.id}>
                  <Link className="text-[13px] font-medium text-[color:var(--jf-text)] underline-offset-2 hover:underline" to={sessionHref(s.id)}>
                    {FLAGSHIP_SESSION_TYPE_LABEL[s.type]} · {moduleById(s.moduleId)?.title ?? 'Session'}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        </div>
      ) : null}

      {/* Modules + sessions */}
      <div className="mt-12 space-y-12" data-testid="flagship-modules-with-sessions">
        {modulesByStage.map(({ stage, modules }) => (
          <div key={stage}>
            <div className="flex items-center gap-2 border-b border-[color:var(--jf-border)] pb-3">
              <LearnSectionSparkIcon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-muted)]">
                {isAe ? AI_ESSENTIALS_STAGE_SECTION_LABEL[stage] : flagshipStageLabel(stage)}
              </h3>
            </div>
            <div className={layout === 'accordion' ? 'mt-6 space-y-3' : 'mt-6 space-y-8'}>
              {modules.map((mod) => {
                const modSessions = sessions.filter((s) => s.moduleId === mod.id).sort((a, b) => a.orderInModule - b.orderInModule)
                const stats = moduleSessionStats(mod.id, sessions, completed)
                const fullyComplete = moduleFullyComplete(mod.id, sessions, completed, state)
                const sessionsOnlyDone = moduleSessionsAllDone(mod.id, sessions, completed)
                const moduleExpanded = layout !== 'accordion' || expandedModuleId === mod.id
                const firstSess = modSessions[0]
                const canEnterFirst =
                  !!firstSess &&
                  sessionOpenForLearner(completed, firstSess, {
                    capstonePrepAccessible,
                    curriculum,
                    progressState: state,
                  })
                const lockedModule = isAe && !fullyComplete && !sessionsOnlyDone && stats.done === 0 && !canEnterFirst
                const moduleShellClass =
                  isAe && fullyComplete
                    ? 'rounded-2xl border border-emerald-200/70 bg-emerald-50/75 p-4 sm:p-5'
                    : isAe && sessionsOnlyDone
                      ? 'rounded-2xl border border-amber-200/70 bg-amber-50/80 p-4 sm:p-5'
                      : isAe && lockedModule
                        ? 'rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/80 p-4 sm:p-5'
                        : 'rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-4 sm:p-5'
                const moduleFocus =
                  layout === 'accordion' && moduleExpanded
                    ? 'ring-1 ring-[color:var(--jf-text)]/12 shadow-md'
                    : 'shadow-[var(--jf-shadow-soft)]'
                const moduleHover =
                  layout === 'accordion' ? 'transition-[box-shadow,border-color,ring] duration-200 hover:border-stone-400/45' : ''
                const aeAccordionCard = layout === 'accordion' && isAe
                const summaryTeaser =
                  mod.summary.includes('.') && mod.summary.trim().length > 0
                    ? `${mod.summary.split('.')[0].trim()}.`
                    : mod.summary
                const accordionHeaderMinimal = (
                  <div className="flex min-w-0 flex-1 flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-2.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums text-[color:var(--jf-text)]">
                          Module {mod.order}
                        </span>
                        {fullyComplete ? (
                          <span className="rounded-full border border-emerald-200/70 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-900/90">
                            Complete
                          </span>
                        ) : sessionsOnlyDone ? (
                          <span className="rounded-full border border-amber-200/70 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-950/90">
                            Quiz due
                          </span>
                        ) : (
                          <>
                            <span className="rounded-full border border-[color:var(--jf-border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-muted)]">
                              {stats.done}/{stats.total} sessions
                            </span>
                            {lockedModule ? (
                              <span className="rounded-full border border-stone-300/80 bg-stone-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-700">
                                Locked
                              </span>
                            ) : null}
                          </>
                        )}
                      </div>
                      <p className="mt-2 text-[16px] font-semibold text-[color:var(--jf-text)]">{mod.title}</p>
                      <p className="mt-1 line-clamp-3 text-[13px] leading-snug text-[color:var(--jf-muted)]">
                        {moduleExpanded ? mod.summary : summaryTeaser}
                      </p>
                    </div>
                    <span className="shrink-0 pt-1 text-[11px] text-[color:var(--jf-subtle)]" aria-hidden>
                      {moduleExpanded ? '▼' : '▶'}
                    </span>
                  </div>
                )
                const headerDefault = (
                  <div className="flex min-w-0 flex-1 flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-2.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums text-[color:var(--jf-text)]">
                          Module {mod.order}
                        </span>
                        {fullyComplete ? (
                          <span className="rounded-full border border-emerald-200/70 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-900/90">
                            Module complete
                          </span>
                        ) : sessionsOnlyDone ? (
                          <span className="rounded-full border border-amber-200/70 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-950/90">
                            Quiz pending
                          </span>
                        ) : (
                          <>
                            <span className="rounded-full border border-[color:var(--jf-border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-muted)]">
                              {stats.done}/{stats.total} sessions
                            </span>
                            {lockedModule ? (
                              <span className="rounded-full border border-stone-300/80 bg-stone-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-700">
                                Locked
                              </span>
                            ) : null}
                          </>
                        )}
                      </div>
                      <p className="mt-2 text-[16px] font-semibold text-[color:var(--jf-text)]">{mod.title}</p>
                      {!compactRows ? (
                        <p className="mt-1 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{mod.summary}</p>
                      ) : moduleExpanded ? (
                        <p className="mt-1 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{mod.summary}</p>
                      ) : null}
                    </div>
                    {layout === 'accordion' ? (
                      <span className="shrink-0 pt-1 text-[11px] text-[color:var(--jf-subtle)]" aria-hidden>
                        {moduleExpanded ? '▼' : '▶'}
                      </span>
                    ) : null}
                  </div>
                )
                const header = aeAccordionCard ? accordionHeaderMinimal : headerDefault
                const learnerCard = AI_ESSENTIALS_MODULE_LEARNER_CARD[mod.id]
                const aeModuleDetailPanel = aeAccordionCard ? (
                  <div className="border-t border-[color:var(--jf-border)]/70 px-4 pb-4 pt-3 sm:px-5">
                    <details className="rounded-lg bg-[color:var(--jf-bg-page)]/40 px-1 py-1">
                      <summary className="cursor-pointer rounded-md px-2 py-1.5 text-[12px] font-semibold text-[color:var(--jf-text)] hover:bg-[color:var(--jf-bg-page)]">
                        What you&apos;ll do in this module
                      </summary>
                      <div className="mt-2 space-y-2.5 px-2 pb-2 text-[12px] leading-relaxed text-[color:var(--jf-muted)]">
                        <p>
                          <span className="font-medium text-[color:var(--jf-text)]">Purpose · </span>
                          {learnerCard?.purpose ?? mod.summary}
                        </p>
                        <p>
                          <span className="font-medium text-[color:var(--jf-text)]">Activities · </span>
                          {learnerCard?.whatYouWillDo ?? 'Follow the sessions in order, then complete the module check when it appears.'}
                        </p>
                        <p>
                          <span className="font-medium text-[color:var(--jf-text)]">Portfolio artifact · </span>
                          {AI_ESSENTIALS_MODULE_PORTFOLIO_LABEL[mod.id] ?? 'Artifact from practice'}
                        </p>
                        <p>
                          <span className="font-medium text-[color:var(--jf-text)]">Practice focus · </span>
                          {learnerCard?.practiceFocus ?? 'Apply the module ideas to your own context with notes you could show a reviewer.'}
                        </p>
                        <details className="rounded-md border border-[color:var(--jf-border)]/80 bg-[color:var(--jf-surface)]/90 px-2.5 py-2 text-[11px] text-[color:var(--jf-subtle)]">
                          <summary className="cursor-pointer font-semibold text-[color:var(--jf-text)]">Time and module check</summary>
                          <div className="mt-2 space-y-1.5 leading-relaxed text-[color:var(--jf-muted)]">
                            <p>
                              <span className="font-medium text-[color:var(--jf-text)]">Pacing: </span>
                              {AI_ESSENTIALS_MODULE_TIME_HINT[mod.id] ?? 'About 2–3 hours'}
                            </p>
                            <p>
                              After sessions: short module check ({MODULE_QUIZ_DRAW_COUNT} questions, at least {MODULE_QUIZ_MIN_CORRECT} correct).
                              Finish the practice checkpoints in this module first—they keep the check grounded in real work, then unlock forward progress
                              with a passing score.
                            </p>
                          </div>
                        </details>
                      </div>
                    </details>
                  </div>
                ) : null
                return (
                  <div
                    id={`flagship-module-${mod.id}`}
                    key={mod.id}
                    className={`${moduleShellClass} ${moduleFocus} ${moduleHover}`}
                  >
                    {layout === 'accordion' ? (
                      <button
                        type="button"
                        className="flex w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                        onClick={() => toggleModule(mod.id)}
                        aria-expanded={moduleExpanded}
                        aria-controls={`module-sessions-${mod.id}`}
                      >
                        {header}
                      </button>
                    ) : (
                      header
                    )}
                    {aeModuleDetailPanel}
                    {moduleExpanded ? (
                      <>
                        <ul id={`module-sessions-${mod.id}`} className="mt-5 space-y-2">
                          {modSessions.map((sess, chapterIdx) => (
                            <SessionRow
                              key={sess.id}
                              courseSlug={courseSlug}
                              session={sess}
                              completed={completed}
                              isNext={sess.id === nextId}
                              capstonePrepAccessible={capstonePrepAccessible}
                              purchaseGateEnabled={purchaseGateEnabled}
                              hasCourseAccess={hasCourseAccess}
                              curriculum={curriculum}
                              progressState={state}
                              chapterOrdinal={chapterIdx + 1}
                              compact={compactRows}
                            />
                          ))}
                        </ul>
                        {sessionsOnlyDone ? (
                          isAeAccordion ? (
                            <details className="mt-4 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/60 px-4 py-3">
                              <summary className="cursor-pointer text-[13px] font-semibold text-[color:var(--jf-text)]">Module check</summary>
                              <div className="mt-3">
                                <FlagshipModuleQuizPanel
                                  module={mod}
                                  sessions={sessions}
                                  courseSlug={courseSlug}
                                  quizState={state.moduleQuiz?.[mod.id]}
                                  onUpdateQuiz={(partial) => updateModuleQuizRecord(mod.id, partial)}
                                />
                              </div>
                            </details>
                          ) : (
                            <FlagshipModuleQuizPanel
                              module={mod}
                              sessions={sessions}
                              courseSlug={courseSlug}
                              quizState={state.moduleQuiz?.[mod.id]}
                              onUpdateQuiz={(partial) => updateModuleQuizRecord(mod.id, partial)}
                            />
                          )
                        ) : null}
                      </>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Capstone prep block — navigational */}
      {sessions.some((s) => s.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID) ? (
        <div
          className={
            isAeAccordion
              ? 'mt-12 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-5 py-6 sm:px-7 shadow-[var(--jf-shadow-soft)]'
              : 'mt-12 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-5 py-6'
          }
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--jf-muted)]">Capstone preparation session</p>
          {isAeAccordion ? (
            <>
              <p className="mt-3 text-[15px] font-semibold text-[color:var(--jf-text)]">Capstone &amp; final workflow</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                Prep opens when your course work shows you&apos;re ready.
              </p>
              <details className="mt-3 rounded-lg border border-[color:var(--jf-border)] bg-white/80 px-3 py-2 text-[12px] text-[color:var(--jf-muted)]">
                <summary className="cursor-pointer font-semibold text-[color:var(--jf-text)]">What “done” includes</summary>
                <p className="mt-2 leading-relaxed">
                  Module 16 work plus the in-app capstone rubric self-check—each row honestly marked Ready or Strong. Use prep to line up filenames, evidence, and disclosure with the brief.
                </p>
              </details>
              {!capstonePrepAccessible ? (
                <p className="mt-2 text-[12px] text-[color:var(--jf-subtle)]">
                  Finish the practice checkpoints the map expects—prep opens automatically when you are in range.
                </p>
              ) : capstonePrepComplete ? (
                <p className="mt-2 text-[12px] text-emerald-800/90">Prep complete—you can still refine work.</p>
              ) : (
                <p className="mt-2 text-[12px] text-[color:var(--jf-subtle)]">Open prep when you&apos;re ready.</p>
              )}
            </>
          ) : (
            <>
              <p className="mt-3 text-[15px] font-semibold text-[color:var(--jf-text)]">
                {!capstoneUnlocked ? 'Still preparing' : capstonePrepAccessible ? 'Ready when you are' : 'Checkpoints before prep'}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                {layout === 'accordion'
                  ? !capstoneUnlocked
                    ? `${remainingBeforeCapstone} sessions left before capstone prep opens.`
                    : !capstonePrepAccessible
                      ? 'Finish mastery checkpoints on practice sessions, then capstone prep unlocks.'
                      : capstonePrepComplete
                        ? 'Capstone prep is complete—you can still refine deliverables.'
                        : 'Open the prep session when you are ready to align deliverables with the brief.'
                  : !capstoneUnlocked
                    ? `Complete the remaining ${remainingBeforeCapstone} sessions across modules to reach capstone preparation.`
                    : !capstonePrepAccessible
                      ? 'All sessions are marked complete—finish mastery checkpoints on each module’s practice session so capstone prep reflects defensible readiness.'
                      : capstonePrepComplete
                        ? 'You marked capstone preparation complete—keep iterating on deliverables until they meet your own bar.'
                        : 'Walk through the prep session to align deliverables with the brief before you call the capstone finished.'}
              </p>
            </>
          )}
          {capstonePrepAccessible ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white"
                to={sessionHref(sessions.find((s) => s.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID)?.id ?? '')}
                data-testid="flagship-capstone-prep-link"
              >
                {capstonePrepComplete ? 'Review capstone prep' : 'Open capstone prep'}
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
