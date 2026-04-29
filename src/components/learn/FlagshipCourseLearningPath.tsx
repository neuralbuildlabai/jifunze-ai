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
  AI_ESSENTIALS_MODULE_MILESTONE_LINE,
  AI_ESSENTIALS_MODULE_TIME_HINT,
  AI_ESSENTIALS_STAGE_SECTION_LABEL,
} from '../../lib/aiEssentialsCourseUiMeta'
import {
  AI_ESSENTIALS_SLUG,
  getAiEssentialsMilestonesReachedCount,
  getAiEssentialsNextMilestoneHint,
} from '../../lib/aiEssentialsProgressMilestones'
import { MODULE_QUIZ_DRAW_COUNT, MODULE_QUIZ_MIN_CORRECT } from '../../lib/flagshipModuleQuizPools'
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
      : 'border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] hover:border-white/[0.12]'
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
}) {
  const { courseSlug, curriculum, sessions, progress, layout: layoutProp } = props
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
    <section className="mt-14" aria-labelledby="learning-path-heading" data-testid="flagship-learning-path">
      <h2 id="learning-path-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
        {layout === 'accordion' ? 'Curriculum' : 'Your learning path'}
      </h2>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
        {layout === 'accordion'
          ? 'Expand a module to see its sessions. Complete them in order, then take the short module quiz to unlock the next module. Progress saves on this device.'
          : 'Each module is a sequence of sessions—complete them in order, then pass the module quiz to unlock the next module. Progress saves on this device.'}
      </p>

      {/* Progress summary */}
      <div
        className="mt-8 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-4 py-5 shadow-[var(--jf-shadow-soft)] sm:px-6 sm:py-6"
        data-testid="flagship-progress-summary"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 space-y-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Overall progress</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-2xl font-semibold tabular-nums text-[color:var(--jf-text)]">{progressPercent}%</span>
                <span className="text-[13px] text-[color:var(--jf-muted)]">
                  {modulesCompleted} / {modulesTotal} modules · {sessions.filter((s) => completed.has(s.id)).length} / {sessions.length} sessions
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-[color:var(--jf-bg-page)]">
                <div
                  className="h-full rounded-full bg-[color:var(--jf-text)]/35 transition-[width]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {isAeAccordion ? (
                <p className="mt-3 max-w-2xl text-[12px] leading-relaxed text-[color:var(--jf-muted)]" data-testid="ae-curriculum-milestone-line">
                  <span className="font-medium text-[color:var(--jf-text)]">
                    {getAiEssentialsMilestonesReachedCount(progressPercent)} / 10 milestones
                  </span>
                  {' · '}
                  {getAiEssentialsNextMilestoneHint(curriculum, sessions, state)}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 text-[12px] text-[color:var(--jf-muted)]">
              <span className="rounded-full border border-[color:var(--jf-border)] px-2.5 py-1">
                Active stage focus: <span className="font-medium text-[color:var(--jf-text)]">{currentStageLabel}</span>
              </span>
              {isAe ? (
                !capstoneUnlocked ? (
                  <span className="rounded-full border border-[color:var(--jf-border)] px-2.5 py-1">
                    Capstone prep unlocks when prior modules, module quizzes, and mastery checkpoints satisfy the course gates (not a raw
                    session count).
                  </span>
                ) : !capstonePrepAccessible ? (
                  <span className="rounded-full border border-amber-900/35 bg-amber-950/[0.12] px-2.5 py-1 text-amber-100/90">
                    Capstone prep: checkpoints pending
                  </span>
                ) : (
                  <span className="rounded-full border border-emerald-900/25 bg-emerald-950/[0.15] px-2.5 py-1 text-emerald-100/90">
                    Capstone prep ready
                  </span>
                )
              ) : !capstoneUnlocked ? (
                <span className="rounded-full border border-[color:var(--jf-border)] px-2.5 py-1">
                  Capstone path: <span className="font-medium text-[color:var(--jf-text)]">{remainingBeforeCapstone}</span> sessions left before prep
                </span>
              ) : !capstonePrepAccessible ? (
                <span className="rounded-full border border-amber-900/35 bg-amber-950/[0.12] px-2.5 py-1 text-amber-100/90">
                  Capstone prep: checkpoints pending
                </span>
              ) : (
                <span className="rounded-full border border-emerald-900/25 bg-emerald-950/[0.15] px-2.5 py-1 text-emerald-100/90">
                  Capstone prep ready
                </span>
              )}
              <span
                className="rounded-full border border-[color:var(--jf-border)] px-2.5 py-1"
                data-testid="flagship-mastery-summary"
              >
                Checkpoint evidence:{' '}
                <span className="font-medium text-[color:var(--jf-text)]">
                  {masteryCheckpointsDone}/{masteryCheckpointsTotal}
                </span>
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
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
                data-testid="flagship-resume-primary"
              >
                Get course access
              </Link>
            ) : nextSession && resumeReachable ? (
              <Link
                to={sessionHref(nextSession.id)}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
                data-testid="flagship-resume-primary"
              >
                {completed.size === 0 ? 'Start course' : resumeCtaLabel}
              </Link>
            ) : firstSession && startReachable && completed.size === 0 ? (
              <Link
                to={sessionHref(firstSession.id)}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
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
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/[0.12] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-white/[0.05]"
              >
                Back to top
              </a>
            ) : (
              <Link
                to={`/learn/courses/${courseSlug}`}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/[0.12] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-white/[0.05]"
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
          <div className="mt-6 rounded-xl border border-violet-900/25 bg-violet-950/[0.12] px-4 py-3" data-testid="flagship-mastery-pending">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-200/75">Continue strengthening this area</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              Before moving forward: finish both mastery checkpoints on the practice session for{' '}
              <span className="font-medium text-[color:var(--jf-text)]">{pendingMasteryModuleTitles[0]}</span>
              {pendingMasteryModuleTitles.length > 1 ? ' (and other completed modules).' : '.'}
            </p>
          </div>
        ) : null}

        {needsAttention.length > 0 ? (
          <div className="mt-6 rounded-xl border border-amber-900/30 bg-amber-950/[0.12] px-4 py-3" data-testid="flagship-needs-attention">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-200/75">Suggested follow-up</p>
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

      {/* Modules + sessions */}
      <div className="mt-12 space-y-12" data-testid="flagship-modules-with-sessions">
        {modulesByStage.map(({ stage, modules }) => (
          <div key={stage}>
            <div className="border-b border-[color:var(--jf-border)] pb-3">
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
                    ? 'rounded-2xl border border-emerald-900/35 bg-emerald-950/[0.1] p-4 sm:p-5'
                    : isAe && sessionsOnlyDone
                      ? 'rounded-2xl border border-amber-900/35 bg-amber-950/[0.12] p-4 sm:p-5'
                      : isAe && lockedModule
                        ? 'rounded-2xl border border-dashed border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/55 p-4 sm:p-5'
                        : 'rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-4 sm:p-5'
                const header = (
                  <div className="flex min-w-0 flex-1 flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] font-semibold text-[color:var(--jf-muted)]">Module {mod.order}</span>
                        {fullyComplete ? (
                          <span className="rounded-full border border-emerald-900/35 bg-emerald-950/[0.2] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-100/85">
                            Module complete
                          </span>
                        ) : sessionsOnlyDone ? (
                          <span className="rounded-full border border-amber-900/35 bg-amber-950/[0.15] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-100/90">
                            Quiz pending
                          </span>
                        ) : (
                          <>
                            <span className="rounded-full border border-[color:var(--jf-border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-muted)]">
                              {stats.done}/{stats.total} sessions
                            </span>
                            {lockedModule ? (
                              <span className="rounded-full border border-zinc-600/40 bg-zinc-950/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-200/90">
                                Locked
                              </span>
                            ) : null}
                          </>
                        )}
                      </div>
                      <p className="mt-2 text-[16px] font-semibold text-[color:var(--jf-text)]">{mod.title}</p>
                      {compactRows && isAe ? (
                        <div className="mt-2 space-y-1">
                          {mod.expectedOutputs?.[0] ? (
                            <p className="text-[12px] leading-snug text-[color:var(--jf-muted)]">
                              <span className="font-medium text-[color:var(--jf-text)]">Output: </span>
                              {mod.expectedOutputs[0]}
                              {mod.expectedOutputs.length > 1 ? ` (+${mod.expectedOutputs.length - 1} more)` : ''}
                            </p>
                          ) : null}
                          <p className="text-[11px] leading-snug text-[color:var(--jf-subtle)]">
                            Est. {AI_ESSENTIALS_MODULE_TIME_HINT[mod.id] ?? '~2–3h'} · Checkpoint: 3 mastery items on practice · Module quiz:{' '}
                            {MODULE_QUIZ_DRAW_COUNT} questions (at least {MODULE_QUIZ_MIN_CORRECT} of {MODULE_QUIZ_DRAW_COUNT} correct)
                          </p>
                          <p className="text-[11px] leading-snug text-emerald-200/75">{AI_ESSENTIALS_MODULE_MILESTONE_LINE[mod.id]}</p>
                          <p className="text-[12px] leading-snug text-[color:var(--jf-muted)]">{mod.summary}</p>
                        </div>
                      ) : !compactRows ? (
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
                return (
                  <div id={`flagship-module-${mod.id}`} key={mod.id} className={moduleShellClass}>
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
                          <FlagshipModuleQuizPanel
                            module={mod}
                            sessions={sessions}
                            courseSlug={courseSlug}
                            quizState={state.moduleQuiz?.[mod.id]}
                            onUpdateQuiz={(partial) => updateModuleQuizRecord(mod.id, partial)}
                          />
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
              ? 'mt-12 rounded-2xl border border-violet-900/25 bg-violet-950/[0.1] px-5 py-6 sm:px-7'
              : 'mt-12 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-5 py-6'
          }
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--jf-muted)]">Capstone preparation session</p>
          {isAeAccordion ? (
            <>
              <p className="mt-3 text-[15px] font-semibold text-[color:var(--jf-text)]">Final capstone: End-to-End AI-Supported Workflow</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                Capstone prep opens after required lessons, module quizzes, and mastery checkpoints clear the product gates—not after a raw
                session tally.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                100% milestone progress requires Module 16 completion plus every capstone rubric row at Ready or Strong.
              </p>
              {!capstonePrepAccessible ? (
                <p className="mt-2 text-[12px] text-[color:var(--jf-subtle)]">
                  Finish pending checkpoints on practice sessions where shown; prep unlocks automatically when the path is consistent.
                </p>
              ) : capstonePrepComplete ? (
                <p className="mt-2 text-[12px] text-emerald-200/85">Capstone prep is marked complete—you can still refine deliverables.</p>
              ) : (
                <p className="mt-2 text-[12px] text-[color:var(--jf-subtle)]">Open the prep session to align filenames, rubric rows, and disclosure with the Module 16 brief.</p>
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
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950"
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
