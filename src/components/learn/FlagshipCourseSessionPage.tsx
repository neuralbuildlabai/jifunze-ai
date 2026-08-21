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
import { buildPracticeLabNav, computeGuidedLessonNavItems } from '../../lib/flagshipSessionGuidedLayout'
import { partitionFlagshipSessionBlocks } from '../../lib/flagshipSessionBlockLayout'
import { buildLessonNavFull } from '../../lib/flagshipSessionLessonFlow'
import { flagshipNextSessionBlockedReason } from '../../lib/flagshipSessionNavigationHints'
import { blockAllowsLearnerResponse } from '../../lib/flagshipSessionResponseBlocks'
import { archiveLocalDraftsForModule } from '../../lib/learnerCourseArtifactsLocal'
import { isWorkspaceTenantId } from '../../persistence/tenantPersistenceMode'
import { archiveNonAcceptedArtifactsForModule } from '../../services/learning/learnerCourseArtifactsRemote'
import { useFlagshipLessonTimer } from '../../hooks/useFlagshipLessonTimer'
import { getPaidFlagshipCertificateConfig } from '../../lib/paidFlagshipCertificateConfig'
import { LEGAL_ROUTES } from '../../shared/legalRoutes'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'
import { FlagshipSessionAssessment } from './flagshipSession/FlagshipSessionAssessment'
import type { FlagshipSessionResponseContext } from './flagshipSession/flagshipSessionResponseTypes'
import { AeCapstoneRubricSelfGradePanel } from './AeCapstoneRubricSelfGradePanel'
import { FlagshipSessionBlocks } from './flagshipSession/FlagshipSessionBlocks'
import { FlagshipSessionCompletionFooter } from './flagshipSession/FlagshipSessionCompletionFooter'
import { FlagshipSessionMobileSectionMenu } from './flagshipSession/FlagshipSessionMobileSectionMenu'
import {
  FlagshipSessionModuleStepper,
  FlagshipSessionPlayerHeader,
  FlagshipSessionPracticeLessonReminder,
  FlagshipSessionRevisionLessonLinks,
} from './flagshipSession/FlagshipSessionPlayerSurfaces'
import { FlagshipSessionSectionRail } from './flagshipSession/FlagshipSessionSectionRail'
import { GuidedLessonShell } from '../learner-shell/GuidedLessonShell'
import { PracticeLabShell } from '../learner-shell/PracticeLabShell'

const TIMER_STUB_SESSION: FlagshipSession = {
  id: '__timer_stub__',
  courseSlug: '',
  moduleId: 'stub',
  orderInModule: 1,
  orderInCourse: 1,
  title: '',
  type: 'lesson',
  durationMinutes: 30,
  effortLabel: '',
  summary: '',
  objectives: [],
}

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

  const showStandaloneObjectives = Boolean(session) && contentBlocks.length === 0
  const lessonTeachingFirst = Boolean(session && session.type === 'lesson' && contentBlocks.length > 0)

  const { teachingBlocks, applyBlocks } = useMemo(
    () => partitionFlagshipSessionBlocks(contentBlocks),
    [contentBlocks],
  )

  const sessionNavItems = useMemo(() => {
    if (!session) return []
    const standalone = contentBlocks.length === 0
    const ltf = session.type === 'lesson' && contentBlocks.length > 0
    const practiceWithBlocks = session.type === 'practice' && contentBlocks.length > 0
    const practiceModuleMeta = curriculum?.modules.find((m) => m.id === session.moduleId)

    if (practiceWithBlocks) {
      return buildPracticeLabNav({
        hasArtifact: applyBlocks.length > 0,
        hasReview: Boolean(practiceModuleMeta),
      })
    }
    if (ltf) {
      return computeGuidedLessonNavItems({
        teachingBlocks,
        applyBlocks,
        objectivesCount: session.objectives.length,
        sessionSummary: session.summary,
      })
    }

    const prefix: { anchorId: string; label: string }[] = []
    if (!ltf) {
      prefix.push({ anchorId: 'session-overview', label: 'Start here · overview' })
    }
    if (standalone) {
      prefix.push({ anchorId: 'obj-heading', label: 'Objectives' })
    }
    return buildLessonNavFull({
      prefix,
      teachingBlocks,
      middleOverview: false,
      applyBlocks,
    })
  }, [session, curriculum, contentBlocks, teachingBlocks, applyBlocks])

  const learnerReachable = Boolean(session && sessionOpenForLearner(progress.completed, session, openOpts))

  useEffect(() => {
    if (!sessionId || !slug || !session || !learnerReachable) return
    touchActiveSession(sessionId)
  }, [sessionId, slug, session, learnerReachable, touchActiveSession])

  const progressionAllowsMark = useMemo(() => {
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

  const paidTimerCourse = slug ? getPaidFlagshipCertificateConfig(slug)?.enableLessonTimer : false
  const timerGateActive = Boolean(paidTimerCourse && user && supabase && session)
  const timerSession = session ?? TIMER_STUB_SESSION
  const { activeSeconds, timerSatisfied, minimumSeconds } = useFlagshipLessonTimer({
    enabled: timerGateActive,
    courseSlug: slug ?? '',
    session: timerSession,
    userId: user?.id,
    supabase: supabase ?? undefined,
  })

  const canMarkThisChapterComplete = progressionAllowsMark && (!timerGateActive || timerSatisfied)

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
      <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
        <header className="jf-learn-nav-header sticky top-0 z-10 border-b backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
            <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
              <Link
                to={`/learn/courses/${slug}`}
                className="inline-flex min-h-[2.5rem] items-center text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
                data-testid="flagship-session-back-to-course"
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
              <JifunzeBrandLogo to={user ? '/dashboard' : '/'} size="sm" surface="light" />
            </div>
            {user ? (
              <button
                type="button"
                disabled={signOutPending}
                onClick={() => void signOut()}
                className="inline-flex min-h-[2.5rem] items-center rounded-full border border-[color:var(--jf-border)] px-3 text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:border-stone-400/45 hover:text-[color:var(--jf-text)] disabled:opacity-50"
                data-testid="flagship-session-header-sign-out"
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
            className="mt-8 inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)]"
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
  const aeSessionBreadcrumb =
    slug === 'ai-essentials'
      ? (() => {
          if (session.type === 'lesson') {
            const lessons = sessions.filter((s) => s.type === 'lesson').sort((a, b) => a.orderInCourse - b.orderInCourse)
            const li = lessons.findIndex((s) => s.id === session.id)
            const n = li >= 0 ? li + 1 : session.orderInCourse
            return `${course.title} · Module ${moduleOrdinal} · Lesson ${n} of ${lessons.length}`
          }
          return `${course.title} · Module ${moduleOrdinal} · Session ${session.orderInCourse} of ${totalSessions}`
        })()
      : null
  const moduleMeta = curriculum.modules.find((m: FlagshipCurriculumModule) => m.id === session.moduleId)
  const showPracticeAssessment = session.type === 'practice' && Boolean(moduleMeta)
  const practiceLabLayout = session.type === 'practice' && contentBlocks.length > 0
  const sidebarNavTitle = practiceLabLayout ? 'Practice lab' : lessonTeachingFirst ? 'Lesson steps' : 'This session'

  return (
    <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
      <header className="jf-learn-nav-header sticky top-0 z-10 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:gap-3">
            <Link
              to={`/learn/courses/${slug}`}
              className="inline-flex min-h-[2.5rem] items-center text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
              data-testid="flagship-session-back-to-course"
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
            <JifunzeBrandLogo to={user ? '/dashboard' : '/'} size="sm" surface="light" />
            <div className="w-full min-w-0 sm:ml-2 sm:w-auto">
              {aeSessionBreadcrumb ? (
                <p className="text-[11px] font-medium leading-snug text-[color:var(--jf-muted)]" data-testid="flagship-session-ae-context">
                  {aeSessionBreadcrumb}
                </p>
              ) : (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">{course.title}</p>
                  <p className="text-[11px] font-medium text-[color:var(--jf-subtle)]">
                    Session {session.orderInCourse} of {totalSessions} · {FLAGSHIP_SESSION_TYPE_LABEL[session.type]} ·{' '}
                    {flagshipSessionEffortDisplay(session)}
                  </p>
                </>
              )}
            </div>
          </div>
          {user ? (
            <button
              type="button"
              disabled={signOutPending}
              onClick={() => void signOut()}
              className="inline-flex min-h-[2.5rem] shrink-0 items-center rounded-full border border-[color:var(--jf-border)] px-3 text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:border-stone-400/45 hover:text-[color:var(--jf-text)] disabled:opacity-50"
              data-testid="flagship-session-header-sign-out"
            >
              {signOutPending ? 'Signing out…' : 'Sign out'}
            </button>
          ) : null}
        </div>
      </header>

      <main className="jf-reading-surface mx-auto max-w-6xl px-5 pb-28 pt-8 sm:px-8 lg:pt-10">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-x-8 lg:items-start">
          <div className="min-w-0">
            <FlagshipSessionMobileSectionMenu navItems={sessionNavItems} navTitle={sidebarNavTitle} />

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
                  density="compact"
                  hideCourseTitle={practiceLabLayout}
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

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {done ? (
                <span className="rounded-full border border-emerald-900/35 bg-emerald-950/[0.2] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-100/85">
                  Chapter complete
                </span>
              ) : null}
            </div>

            <h1 className="mt-3 text-[1.65rem] font-semibold leading-snug tracking-tight text-[color:var(--jf-text)] sm:text-[1.85rem]">
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

        {!lessonTeachingFirst && !practiceLabLayout ? (
          <div
            id="session-overview"
            className="relative mt-6 scroll-mt-28 overflow-hidden rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/90 px-5 py-6 shadow-[var(--jf-shadow-soft)] ring-1 ring-black/[0.03] sm:px-7 sm:py-7"
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
          <section id="obj-heading" className="mt-10 scroll-mt-28" aria-labelledby="obj-heading-title">
            <h2 id="obj-heading-title" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
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
        {practiceLabLayout ? (
          <PracticeLabShell>
            <FlagshipSessionBlocks
              layout="practice-lab"
              blocks={contentBlocks}
              responseContext={responseContext}
              sessionType={session.type}
              sessionSummary={session.summary}
            />
          </PracticeLabShell>
        ) : lessonTeachingFirst ? (
          <GuidedLessonShell>
            <FlagshipSessionBlocks
              layout="lesson-teaching-first"
              blocks={contentBlocks}
              responseContext={responseContext}
              sessionType={session.type}
              objectives={session.objectives}
              sessionSummary={session.summary}
            />
          </GuidedLessonShell>
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
          <section id="flagship-practice-review" className="scroll-mt-28 space-y-4" aria-label="Review checklist">
            <h2 className="mt-10 text-[13px] font-semibold text-[color:var(--jf-text)]">Review checklist</h2>
            <p className="max-w-2xl text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
              Work through each checkpoint below when you are ready to claim mastery for this module.
            </p>
            <FlagshipSessionAssessment
              module={moduleMeta}
              completedIds={checkpointDone}
              onToggleCheckpoint={(id, done) => progress.toggleMasteryCheckpoint(id, done)}
            />
          </section>
        ) : null}

        {slug === 'ai-essentials' && (session.type === 'capstone_prep' || session.moduleId === 'ae-m16') ? (
          <AeCapstoneRubricSelfGradePanel
            grade={progress.state.aeCapstoneRubricSelfGrade}
            onChange={(id, level) => progress.setAeCapstoneRubricCriterion(id, level)}
          />
        ) : null}

            {!lessonTeachingFirst && !practiceLabLayout && (learningGuidanceLine || readinessDetailHint) ? (
              <p
                className="mt-10 text-[13px] leading-relaxed text-[color:var(--jf-subtle)]"
                data-testid="flagship-session-guidance"
              >
                {learningGuidanceLine ?? readinessDetailHint}
              </p>
            ) : null}

            <FlagshipSessionCompletionFooter
              sessionTitle={session.title}
              objectives={session.objectives}
              completionKind={
                session.type === 'lesson' ? 'lesson' : session.type === 'practice' ? 'practice' : 'other'
              }
              hasMasteryCheckpoint={showPracticeAssessment}
              done={done}
              canMarkThisChapterComplete={canMarkThisChapterComplete}
              timerHint={
                timerGateActive && progressionAllowsMark && !timerSatisfied
                  ? `Review this section a little longer before continuing. Active time with this tab visible: about ${activeSeconds}s (aim for at least ${minimumSeconds}s).`
                  : null
              }
              onMarkComplete={() => progress.markSessionComplete(session.id, true)}
              flagged={progress.state.flaggedForReviewSessionIds.includes(session.id)}
              onToggleFlag={(checked) => progress.toggleReviewFlag(session.id, checked)}
              slug={slug}
              prev={prev}
              next={next}
              prevReachable={prevReachable}
              nextReachable={nextReachable}
              prevBlockedReason={prevBlockedReason}
              nextBlockedReason={nextBlockedReason}
              moduleAnchorId={session.moduleId !== FLAGSHIP_CAPSTONE_MODULE_ID ? session.moduleId : null}
              capstoneLinkOnly={session.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID}
            />
          </div>

          <aside className="mt-10 hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-4">
              <FlagshipSessionSectionRail navItems={sessionNavItems} navTitle={sidebarNavTitle} />
            </div>
          </aside>
        </div>
      </main>
      <LearnerHelpAssistant />
    </div>
  )
}
