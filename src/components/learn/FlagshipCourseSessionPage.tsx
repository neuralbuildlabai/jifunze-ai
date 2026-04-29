import { useEffect, useMemo, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useLearnerCommerceOptional } from '../../learner/LearnerCommerceContext'
import { sessionOpenForLearner } from '../../learner/flagshipSessionPrereq'
import { getFlagshipCourseBySlug } from '../../data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum, type FlagshipCurriculumModule } from '../../data/learning/flagshipCourseCurricula'
import {
  buildSessionsForCurriculum,
  FLAGSHIP_CAPSTONE_MODULE_ID,
  FLAGSHIP_SESSION_TYPE_LABEL,
  flagshipSessionEffortDisplay,
  getSessionById,
  sessionsForModule,
  type FlagshipSession,
} from '../../data/learning/flagshipCourseSessions'
import { getFlagshipSessionContentBlocks } from '../../data/learning/flagshipSessionContentResolve'
import { useFlagshipCourseProgress } from '../../hooks/useFlagshipCourseProgress'
import {
  capstonePrepAccessible,
  forwardProgressionAllowsNewCompletion,
  masteryCheckpointCompletionSet,
  moduleFullyComplete,
} from '../../lib/flagshipCourseProgressDerived'
import { flagshipNextSessionBlockedReason } from '../../lib/flagshipSessionNavigationHints'
import { blockAllowsLearnerResponse } from '../../lib/flagshipSessionResponseBlocks'
import { archiveLocalDraftsForModule } from '../../lib/learnerCourseArtifactsLocal'
import { isWorkspaceTenantId } from '../../persistence/tenantPersistenceMode'
import { archiveNonAcceptedArtifactsForModule } from '../../services/learning/learnerCourseArtifactsRemote'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'
import { FlagshipSessionAssessment } from './flagshipSession/FlagshipSessionAssessment'
import type { FlagshipSessionResponseContext } from './flagshipSession/flagshipSessionResponseTypes'
import { AeCapstoneRubricSelfGradePanel } from './AeCapstoneRubricSelfGradePanel'
import { FlagshipSessionBlocks } from './flagshipSession/FlagshipSessionBlocks'
import {
  FlagshipSessionModuleStepper,
  FlagshipSessionPlayerHeader,
  FlagshipSessionPracticeLessonReminder,
  FlagshipSessionRevisionLessonLinks,
} from './flagshipSession/FlagshipSessionPlayerSurfaces'

function neighborSessions(sessions: FlagshipSession[], current: FlagshipSession): {
  prev?: FlagshipSession
  next?: FlagshipSession
} {
  const ordered = [...sessions].sort((a, b) => a.orderInCourse - b.orderInCourse)
  const idx = ordered.findIndex((s) => s.id === current.id)
  return {
    prev: idx > 0 ? ordered[idx - 1] : undefined,
    next: idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : undefined,
  }
}

export function FlagshipCourseSessionPage() {
  const { slug, sessionId } = useParams<{ slug: string; sessionId: string }>()
  const { user, supabase, signOut, signOutPending, usesWorkspacePersistence, tenantId } = useAuth()
  const commerce = useLearnerCommerceOptional()
  const course = slug ? getFlagshipCourseBySlug(slug) : undefined
  const curriculum = slug ? getFlagshipCurriculum(slug) : undefined
  const sessions = useMemo(() => (curriculum ? buildSessionsForCurriculum(curriculum) : []), [curriculum])
  const flagshipSync = useMemo(
    () => (user && supabase ? { supabase, userId: user.id } : null),
    [user, supabase],
  )
  const progress = useFlagshipCourseProgress(slug ?? '', curriculum, sessions, flagshipSync)
  const { touchActiveSession, learningGuidanceLine, readinessDetailHint } = progress
  const session = sessionId ? getSessionById(sessions, sessionId) : undefined

  const openOpts = useMemo(
    () => ({
      capstonePrepAccessible: progress.capstonePrepAccessible,
      curriculum: curriculum ?? undefined,
      progressState: progress.state,
    }),
    [progress.capstonePrepAccessible, curriculum, progress.state],
  )

  const contentBlocks = useMemo(() => {
    if (!session) return []
    return getFlagshipSessionContentBlocks(session, curriculum)
  }, [session, curriculum])

  const learnerReachable = Boolean(session && sessionOpenForLearner(progress.completed, session, openOpts))

  useEffect(() => {
    if (!sessionId || !slug || !session || !learnerReachable) return
    touchActiveSession(sessionId)
  }, [sessionId, slug, session, learnerReachable, touchActiveSession])

  const canMarkThisChapterComplete = useMemo(() => {
    if (!session || !curriculum) return false
    if (progress.completed.has(session.id)) return true
    const ck = masteryCheckpointCompletionSet(progress.state)
    const prepOk = capstonePrepAccessible(curriculum, sessions, progress.completed, ck)
    return forwardProgressionAllowsNewCompletion(
      progress.completed,
      session,
      curriculum,
      progress.state,
      prepOk,
    )
  }, [session, curriculum, sessions, progress.completed, progress.state])

  const moduleDoneForResponses = useMemo(() => {
    if (!session || !curriculum) return false
    return moduleFullyComplete(session.moduleId, sessions, progress.completed, progress.state)
  }, [session, curriculum, sessions, progress.completed, progress.state])

  const responseContext = useMemo((): FlagshipSessionResponseContext | null => {
    if (!session || !slug || !curriculum) return null
    return {
      courseSlug: slug,
      moduleId: session.moduleId,
      sessionId: session.id,
      userId: user?.id ?? null,
      supabase,
      usesWorkspacePersistence,
      tenantId: tenantId && isWorkspaceTenantId(tenantId) ? tenantId : null,
      canEdit: Boolean(learnerReachable),
      moduleFullyComplete: moduleDoneForResponses,
    }
  }, [
    session,
    slug,
    curriculum,
    user?.id,
    supabase,
    usesWorkspacePersistence,
    tenantId,
    learnerReachable,
    moduleDoneForResponses,
  ])

  const archivedModuleRef = useRef<string | null>(null)
  useEffect(() => {
    if (!user?.id || !slug || !session || !curriculum || !supabase || !usesWorkspacePersistence) return
    if (!moduleFullyComplete(session.moduleId, sessions, progress.completed, progress.state)) return
    const key = `${slug}:${session.moduleId}:archived`
    if (archivedModuleRef.current === key) return
    archivedModuleRef.current = key
    void archiveNonAcceptedArtifactsForModule(supabase, user.id, slug, session.moduleId)
    const keys = getFlagshipSessionContentBlocks(session, curriculum)
      .filter(blockAllowsLearnerResponse)
      .map((b) => b.id)
    archiveLocalDraftsForModule(user.id, slug, session.id, keys)
  }, [user?.id, slug, session, curriculum, sessions, supabase, usesWorkspacePersistence, progress.completed, progress.state])

  if (!slug || !course || !curriculum || !sessionId) {
    return <Navigate to={LEGAL_ROUTES.learn} replace />
  }

  if (!session) {
    return <Navigate to={`/learn/courses/${slug}`} replace />
  }

  if (commerce?.purchaseGateEnabled && slug && !commerce.hasCourseAccess(slug)) {
    return <Navigate to={`/learn/checkout?course=${slug}`} replace />
  }

  if (!learnerReachable) {
    return (
      <div className="jf-public-surface min-h-screen w-full bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
        <header className="border-b border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
            <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
              <Link
                to={`/learn/courses/${slug}`}
                className="inline-flex min-h-[2.5rem] items-center text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
              >
                ← Back to course
              </Link>
              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex min-h-[2.5rem] items-center text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
                >
                  Home
                </Link>
              ) : null}
              <JifunzeBrandLogo to={user ? '/dashboard' : '/'} size="sm" surface="dark" />
            </div>
            {user ? (
              <button
                type="button"
                disabled={signOutPending}
                onClick={() => void signOut()}
                className="inline-flex min-h-[2.5rem] items-center rounded-full border border-[color:var(--jf-border)] px-3 text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:border-white/20 hover:text-[color:var(--jf-text)] disabled:opacity-50"
              >
                {signOutPending ? 'Signing out…' : 'Sign out'}
              </button>
            ) : null}
          </div>
        </header>
        <main className="mx-auto max-w-xl px-5 pb-24 pt-12 sm:px-8">
          <h1 className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)]">This session isn&apos;t open yet</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Forward movement stays paced with your evidence and checkpoints. Completed sessions stay available for review—pick up where your path suggests next.
          </p>
          <Link
            className="mt-8 inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)]"
            to={`/learn/courses/${slug}`}
          >
            Back to course overview
          </Link>
        </main>
        <LearnerHelpAssistant />
      </div>
    )
  }

  const checkpointDone = masteryCheckpointCompletionSet(progress.state)
  const done = progress.completed.has(session.id)
  const { prev, next } = neighborSessions(sessions, session)
  const prevReachable = !!prev && sessionOpenForLearner(progress.completed, prev, openOpts)
  const nextReachable = !!next && sessionOpenForLearner(progress.completed, next, openOpts)

  const sessionsInModule = sessionsForModule(session.moduleId, sessions)

  let playerModuleMeta: FlagshipCurriculumModule | null = curriculum.modules.find((m) => m.id === session.moduleId) ?? null
  if (!playerModuleMeta && session.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID) {
    playerModuleMeta = {
      id: FLAGSHIP_CAPSTONE_MODULE_ID,
      order: curriculum.modules.length + 1,
      title: curriculum.capstone.title,
      stage: 'mastery_outputs',
      summary: curriculum.capstone.description,
      learningGoals: [],
      practiceActivities: [],
    }
  }

  const moduleOrdinal = (() => {
    const idx = curriculum.modules.findIndex((m) => m.id === session.moduleId)
    if (idx >= 0) return idx + 1
    if (session.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID) return curriculum.modules.length + 1
    return 1
  })()

  const lessonInModule = sessionsInModule.find((s) => s.type === 'lesson')
  const practiceInModule = sessionsInModule.find((s) => s.type === 'practice')
  const lessonOpen = lessonInModule ? sessionOpenForLearner(progress.completed, lessonInModule, openOpts) : false
  const practiceOpen = practiceInModule ? sessionOpenForLearner(progress.completed, practiceInModule, openOpts) : false

  const nextBlockedReason = flagshipNextSessionBlockedReason(
    next,
    progress.completed,
    curriculum,
    progress.state,
    progress.capstonePrepAccessible,
  )
  const prevBlockedReason =
    prev && !prevReachable
      ? flagshipNextSessionBlockedReason(prev, progress.completed, curriculum, progress.state, progress.capstonePrepAccessible)
      : null
  const totalSessions = sessions.length
  const showStandaloneObjectives = contentBlocks.length === 0
  const lessonTeachingFirst = session.type === 'lesson' && contentBlocks.length > 0
  const moduleMeta = curriculum.modules.find((m: FlagshipCurriculumModule) => m.id === session.moduleId)
  const showPracticeAssessment = session.type === 'practice' && Boolean(moduleMeta)

  return (
    <div className="jf-public-surface min-h-screen w-full bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
      <header className="border-b border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:gap-3">
            <Link
              to={`/learn/courses/${slug}`}
              className="inline-flex min-h-[2.5rem] items-center text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
            >
              ← Back to course
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex min-h-[2.5rem] items-center text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
              >
                Home
              </Link>
            ) : null}
            <JifunzeBrandLogo to={user ? '/dashboard' : '/'} size="sm" surface="dark" />
            <p className="w-full text-[11px] font-medium text-[color:var(--jf-muted)] sm:ml-2 sm:w-auto">
              {session.orderInCourse} / {totalSessions} · {FLAGSHIP_SESSION_TYPE_LABEL[session.type]}
            </p>
          </div>
          {user ? (
            <button
              type="button"
              disabled={signOutPending}
              onClick={() => void signOut()}
              className="inline-flex min-h-[2.5rem] shrink-0 items-center rounded-full border border-[color:var(--jf-border)] px-3 text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:border-white/20 hover:text-[color:var(--jf-text)] disabled:opacity-50"
            >
              {signOutPending ? 'Signing out…' : 'Sign out'}
            </button>
          ) : null}
        </div>
      </header>

      <main className="jf-reading-surface mx-auto max-w-3xl px-5 pb-28 pt-10 sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--jf-muted)]">{course.title}</p>

        {playerModuleMeta ? (
          <>
            <FlagshipSessionPlayerHeader
              courseTitle={course.title}
              moduleMeta={playerModuleMeta}
              moduleOrdinal={moduleOrdinal}
              session={session}
              sessionsInModule={sessionsInModule}
              allSessions={sessions}
              completed={progress.completed}
              sessionDone={done}
            />
            <FlagshipSessionModuleStepper
              slug={slug}
              sessionsInModule={sessionsInModule}
              currentSessionId={session.id}
              completed={progress.completed}
              openOpts={openOpts}
              progressState={progress.state}
              moduleId={session.moduleId}
              showModuleQuizStep={session.moduleId !== FLAGSHIP_CAPSTONE_MODULE_ID}
            />
          </>
        ) : null}

        {(session.type === 'revision' || session.type === 'recap') && (
          <FlagshipSessionRevisionLessonLinks
            slug={slug}
            lesson={lessonInModule}
            practice={practiceInModule}
            lessonOpen={lessonOpen}
            practiceOpen={practiceOpen}
          />
        )}

        {session.type === 'practice' ? (
          <FlagshipSessionPracticeLessonReminder slug={slug} lesson={lessonInModule} lessonOpen={lessonOpen} />
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {done ? (
            <span className="rounded-full border border-emerald-900/35 bg-emerald-950/[0.2] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-100/85">
              Chapter complete
            </span>
          ) : null}
          <span className="text-[12px] text-[color:var(--jf-subtle)]">{flagshipSessionEffortDisplay(session)}</span>
        </div>

        <h1 className="mt-4 text-[1.65rem] font-semibold leading-snug tracking-tight text-[color:var(--jf-text)] sm:text-[1.85rem]">
          {session.title}
        </h1>
        {session.type === 'revision' ? (
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Use this checkpoint to tighten your understanding before moving forward.
          </p>
        ) : null}
        {session.type === 'recap' ? (
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Consolidate this module into notes you will actually reopen—then continue when you are ready.
          </p>
        ) : null}

        {!lessonTeachingFirst ? (
          <div
            id="session-overview"
            className="relative mt-6 overflow-hidden rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/90 px-5 py-6 shadow-[var(--jf-shadow-soft)] ring-1 ring-black/[0.03] sm:px-7 sm:py-7"
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-violet-500/50 via-violet-400/25 to-transparent"
              aria-hidden
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-subtle)]">Session overview</p>
            <p className="mt-3 text-[15px] leading-[1.75] text-[color:var(--jf-muted)]">{session.summary}</p>
          </div>
        ) : null}

        {showStandaloneObjectives ? (
          <section className="mt-10" aria-labelledby="obj-heading">
            <h2 id="obj-heading" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
              Objectives
            </h2>
            <ul className="mt-4 space-y-2">
              {session.objectives.map((o) => (
                <li key={o} className="flex gap-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--jf-text)]/35" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/*
          TODO(stricter-gating): optionally require accepted learner artifacts before marking some practice sessions complete.
          Not enabled here to preserve existing flagship progress + certificate rules.
        */}
        {lessonTeachingFirst ? (
          <FlagshipSessionBlocks
            layout="lesson-teaching-first"
            blocks={contentBlocks}
            responseContext={responseContext}
            sessionType={session.type}
            objectives={session.objectives}
            sessionSummary={session.summary}
          />
        ) : (
          <FlagshipSessionBlocks
            layout="default"
            blocks={contentBlocks}
            responseContext={responseContext}
            sessionType={session.type}
            objectives={session.type === 'lesson' ? session.objectives : []}
          />
        )}

        {showPracticeAssessment && moduleMeta ? (
          <FlagshipSessionAssessment
            module={moduleMeta}
            completedIds={checkpointDone}
            onToggleCheckpoint={(id, done) => progress.toggleMasteryCheckpoint(id, done)}
          />
        ) : null}

        {slug === 'ai-essentials' && (session.type === 'capstone_prep' || session.moduleId === 'ae-m16') ? (
          <AeCapstoneRubricSelfGradePanel
            grade={progress.state.aeCapstoneRubricSelfGrade}
            onChange={(id, level) => progress.setAeCapstoneRubricCriterion(id, level)}
          />
        ) : null}

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {done ? (
            <p className="text-[13px] font-medium text-emerald-200/90" data-testid="flagship-session-complete-toggle">
              Chapter complete — progression is saved. Use &quot;Flag for later review&quot; if you want a reminder to revisit.
            </p>
          ) : (
            <button
              type="button"
              disabled={!canMarkThisChapterComplete}
              onClick={() => progress.markSessionComplete(session.id, true)}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] disabled:cursor-not-allowed disabled:opacity-40"
              data-testid="flagship-session-complete-toggle"
              title={
                !canMarkThisChapterComplete
                  ? 'Complete earlier sessions in order, or pass the previous module quiz, before marking this chapter complete.'
                  : undefined
              }
            >
              Mark chapter complete
            </button>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] text-[color:var(--jf-muted)]">
            <input
              type="checkbox"
              checked={progress.state.flaggedForReviewSessionIds.includes(session.id)}
              onChange={(e) => progress.toggleReviewFlag(session.id, e.target.checked)}
              className="rounded border-[color:var(--jf-border)]"
            />
            Flag for later review
          </label>
        </div>

        {learningGuidanceLine || readinessDetailHint ? (
          <p
            className="mt-10 text-[13px] leading-relaxed text-[color:var(--jf-subtle)]"
            data-testid="flagship-session-guidance"
          >
            {learningGuidanceLine ?? readinessDetailHint}
          </p>
        ) : null}

        <nav
          className="mt-16 grid gap-8 border-t border-white/[0.06] pt-10 sm:grid-cols-3 sm:gap-6"
          aria-label="Session navigation"
        >
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">Previous</p>
            {prev && prevReachable ? (
              <Link
                className="inline-flex text-[14px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline"
                to={`/learn/courses/${slug}/session/${prev.id}`}
              >
                ← {prev.title}
              </Link>
            ) : prev ? (
              <div className="space-y-1">
                <span className="block text-[13px] text-[color:var(--jf-subtle)]">Locked</span>
                {prevBlockedReason ? (
                  <p className="text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">{prevBlockedReason}</p>
                ) : null}
              </div>
            ) : (
              <span className="text-[13px] text-[color:var(--jf-subtle)]">First in course order</span>
            )}
          </div>

          <div className="space-y-3 border-y border-white/[0.05] py-6 sm:border-y-0 sm:py-0 sm:text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)] sm:sr-only">
              Course
            </p>
            <Link
              className="block text-[14px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline"
              to={`/learn/courses/${slug}`}
            >
              Course overview
            </Link>
            {playerModuleMeta && session.moduleId !== FLAGSHIP_CAPSTONE_MODULE_ID ? (
              <Link
                className="block text-[13px] font-medium text-[color:var(--jf-muted)] underline-offset-2 hover:text-[color:var(--jf-text)] hover:underline"
                to={`/learn/courses/${slug}#flagship-module-${session.moduleId}`}
              >
                This module · quiz
              </Link>
            ) : playerModuleMeta ? (
              <Link
                className="block text-[13px] font-medium text-[color:var(--jf-muted)] underline-offset-2 hover:text-[color:var(--jf-text)] hover:underline"
                to={`/learn/courses/${slug}`}
              >
                Capstone on course overview
              </Link>
            ) : null}
          </div>

          <div className="space-y-2 sm:text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">Next</p>
            {next && nextReachable ? (
              <Link
                className="inline-flex text-[14px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline"
                to={`/learn/courses/${slug}/session/${next.id}`}
                data-testid="flagship-session-next"
              >
                {next.title} →
              </Link>
            ) : next ? (
              <div className="space-y-1 sm:ml-auto sm:max-w-xs">
                <span className="block text-[13px] text-[color:var(--jf-subtle)]">Locked</span>
                {nextBlockedReason ? (
                  <p className="text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">{nextBlockedReason}</p>
                ) : null}
              </div>
            ) : (
              <Link
                className="inline-flex text-[14px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline"
                to={`/learn/courses/${slug}`}
              >
                Course overview →
              </Link>
            )}
          </div>
        </nav>
      </main>
      <LearnerHelpAssistant />
    </div>
  )
}
