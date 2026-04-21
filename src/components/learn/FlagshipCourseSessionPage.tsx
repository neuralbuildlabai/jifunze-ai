import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useLearnerCommerceOptional } from '../../learner/LearnerCommerceContext'
import { sessionOpenForLearner } from '../../learner/flagshipSessionPrereq'
import { getFlagshipCourseBySlug } from '../../data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum, type FlagshipCurriculumModule } from '../../data/learning/flagshipCourseCurricula'
import {
  buildSessionsForCurriculum,
  chapterOrdinalInModule,
  FLAGSHIP_SESSION_TYPE_LABEL,
  flagshipSessionEffortDisplay,
  getSessionById,
  type FlagshipSession,
} from '../../data/learning/flagshipCourseSessions'
import { getFlagshipSessionContentBlocks } from '../../data/learning/flagshipSessionContentResolve'
import { useFlagshipCourseProgress } from '../../hooks/useFlagshipCourseProgress'
import {
  capstonePrepAccessible,
  forwardProgressionAllowsNewCompletion,
  masteryCheckpointCompletionSet,
} from '../../lib/flagshipCourseProgressDerived'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'
import { FlagshipSessionAssessment } from './flagshipSession/FlagshipSessionAssessment'
import { FlagshipSessionBlocks } from './flagshipSession/FlagshipSessionBlocks'

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
  const { user, supabase, signOut, signOutPending } = useAuth()
  const commerce = useLearnerCommerceOptional()
  const course = slug ? getFlagshipCourseBySlug(slug) : undefined
  const curriculum = slug ? getFlagshipCurriculum(slug) : undefined
  const sessions = curriculum ? buildSessionsForCurriculum(curriculum) : []
  const flagshipSync = useMemo(
    () => (user && supabase ? { supabase, userId: user.id } : null),
    [user, supabase],
  )
  const progress = useFlagshipCourseProgress(slug ?? '', curriculum, sessions, flagshipSync)
  const { touchActiveSession, learningGuidanceLine, readinessDetailHint } = progress
  const session = sessionId ? getSessionById(sessions, sessionId) : undefined

  const contentBlocks = useMemo(() => {
    if (!session) return []
    return getFlagshipSessionContentBlocks(session, curriculum)
  }, [session, curriculum])

  const learnerReachable = Boolean(
    session &&
      sessionOpenForLearner(progress.completed, session, {
        capstonePrepAccessible: progress.capstonePrepAccessible,
        curriculum: curriculum ?? undefined,
        progressState: progress.state,
      }),
  )

  useEffect(() => {
    if (!sessionId || !slug || !session || !learnerReachable) return
    touchActiveSession(sessionId)
  }, [sessionId, slug, session, learnerReachable, touchActiveSession])

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
  const openOpts = {
    capstonePrepAccessible: progress.capstonePrepAccessible,
    curriculum: curriculum ?? undefined,
    progressState: progress.state,
  }
  const prevReachable = !!prev && sessionOpenForLearner(progress.completed, prev, openOpts)
  const nextReachable = !!next && sessionOpenForLearner(progress.completed, next, openOpts)
  const totalSessions = sessions.length
  const showStandaloneObjectives = contentBlocks.length === 0
  const moduleMeta = curriculum.modules.find((m: FlagshipCurriculumModule) => m.id === session.moduleId)
  const showPracticeAssessment = session.type === 'practice' && Boolean(moduleMeta)
  const chapterN = chapterOrdinalInModule(session, sessions)

  const canMarkThisChapterComplete = useMemo(() => {
    if (done) return true
    const ck = masteryCheckpointCompletionSet(progress.state)
    const prepOk = capstonePrepAccessible(curriculum, sessions, progress.completed, ck)
    return forwardProgressionAllowsNewCompletion(
      progress.completed,
      session,
      curriculum,
      progress.state,
      prepOk,
    )
  }, [done, session, curriculum, sessions, progress.completed, progress.state])

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

      <main className="jf-reading-surface mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--jf-muted)]">{course.title}</p>
        {moduleMeta ? (
          <p className="mt-2 text-[12px] text-[color:var(--jf-muted)]">
            Module: <span className="font-medium text-[color:var(--jf-text)]">{moduleMeta.title}</span>
            {' · '}
            Chapter {chapterN} of {sessions.filter((s) => s.moduleId === session.moduleId).length}
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[color:var(--jf-border)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-muted)]">
            {FLAGSHIP_SESSION_TYPE_LABEL[session.type]}
          </span>
          <span className="text-[12px] text-[color:var(--jf-muted)]">{flagshipSessionEffortDisplay(session)}</span>
          {done ? (
            <span className="rounded-full border border-emerald-900/35 bg-emerald-950/[0.2] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-100/85">
              Completed
            </span>
          ) : null}
        </div>

        <h1 className="mt-5 text-[1.65rem] font-semibold leading-snug tracking-tight text-[color:var(--jf-text)] sm:text-[1.85rem]">
          {session.title}
        </h1>

        <div className="relative mt-6 overflow-hidden rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/90 px-5 py-6 shadow-[var(--jf-shadow-soft)] ring-1 ring-black/[0.03] sm:px-7 sm:py-7">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-violet-500/50 via-violet-400/25 to-transparent"
            aria-hidden
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-subtle)]">Session summary</p>
          <p className="mt-3 text-[15px] leading-[1.75] text-[color:var(--jf-muted)]">{session.summary}</p>
        </div>

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

        <FlagshipSessionBlocks blocks={contentBlocks} />

        {showPracticeAssessment && moduleMeta ? (
          <FlagshipSessionAssessment
            module={moduleMeta}
            completedIds={checkpointDone}
            onToggleCheckpoint={(id, done) => progress.toggleMasteryCheckpoint(id, done)}
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
                  ? 'Complete earlier chapters in order, or pass the previous module quiz, before marking this chapter complete.'
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

        <nav className="mt-14 flex flex-col gap-3 border-t border-[color:var(--jf-border)] pt-8 sm:flex-row sm:justify-between">
          <div>
            {prev && prevReachable ? (
              <Link
                className="text-[13px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline"
                to={`/learn/courses/${slug}/session/${prev.id}`}
              >
                ← Previous
              </Link>
            ) : prev ? (
              <span className="text-[13px] text-[color:var(--jf-subtle)]">Previous (locked)</span>
            ) : (
              <span className="text-[13px] text-[color:var(--jf-subtle)]">First session</span>
            )}
          </div>
          <div className="text-right">
            {next && nextReachable ? (
              <Link
                className="text-[13px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline"
                to={`/learn/courses/${slug}/session/${next.id}`}
                data-testid="flagship-session-next"
              >
                Next session →
              </Link>
            ) : next ? (
              <span className="text-[13px] text-[color:var(--jf-subtle)]">Next session (locked)</span>
            ) : (
              <Link className="text-[13px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline" to={`/learn/courses/${slug}`}>
                Back to course overview →
              </Link>
            )}
          </div>
        </nav>
      </main>
      <LearnerHelpAssistant />
    </div>
  )
}
