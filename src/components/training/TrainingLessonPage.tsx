import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { pickNextTrainingStep } from '../../training/trainingProgress'
import type { LessonPracticeState } from '../../training/practiceTypes'
import { setLessonProgressMvp, useTrainingPlanDetail } from '../../training/trainingHooks'
import { useTrainingWorkspace } from '../../training/useTrainingWorkspace'
import { TRUST_COPY } from '../../training/trustCopy'
import { TrainingInlineAlert } from './TrainingInlineAlert'
import { LessonContentSections, LessonMetaBar } from './LessonContentSections'
import { getPracticeBundleFromLesson } from '../../training/lessonPracticeBundleUtils'
import { LessonPracticeLoop } from './LessonPracticeLoop'

export function TrainingLessonPage() {
  const { planId, lessonId } = useParams<{ planId: string; lessonId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, tenantId, supabase, workspaceShellReady } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const { tree, loading, error, progress, quizAttempts, refetch } = useTrainingPlanDetail(planId)

  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const fastReview =
    searchParams.get('fast') === '1' ||
    searchParams.get('fast') === 'true' ||
    searchParams.get('review') === 'fast'

  const lesson = useMemo(() => {
    if (!tree || !lessonId) return null
    for (const m of tree.modules) {
      const hit = m.lessons.find((l) => l.id === lessonId)
      if (hit) return hit
    }
    return null
  }, [tree, lessonId])

  const lessonStatus = progress.find((p) => p.lesson_id === lessonId)?.status ?? 'not_started'

  const progressRow = useMemo(
    () => (lessonId ? progress.find((p) => p.lesson_id === lessonId) : undefined),
    [lessonId, progress],
  )

  const practiceBundle = useMemo(() => (lesson ? getPracticeBundleFromLesson(lesson) : null), [lesson])

  const practicePassed = useMemo(() => {
    if (!practiceBundle) return true
    const raw = progressRow?.practice_state
    if (!raw || typeof raw !== 'object') return false
    return (raw as { passed?: boolean }).passed === true
  }, [practiceBundle, progressRow])

  useEffect(() => {
    if (!planId || !lessonId || !lesson || mode.kind === 'blocked') return
    if (lessonStatus !== 'not_started') return
    let cancelled = false
    ;(async () => {
      const { error: e } = await setLessonProgressMvp({
        mode,
        planId,
        lessonId,
        status: 'in_progress',
        completedAt: null,
      })
      if (e) {
        console.error('[JifunzeAI training] mark in_progress failed', e)
        setLocalError(e.message)
      } else if (!cancelled) {
        void refetch()
      }
    })()
    return () => {
      cancelled = true
    }
  }, [lessonId, lessonStatus, lesson, mode, planId, refetch])

  async function persistPracticeState(next: LessonPracticeState) {
    if (!planId || !lessonId || mode.kind === 'blocked') return
    const prev = progress.find((p) => p.lesson_id === lessonId)
    const { error: e } = await setLessonProgressMvp({
      mode,
      planId,
      lessonId,
      status: prev?.status === 'completed' ? 'completed' : 'in_progress',
      completedAt: prev?.completed_at ?? null,
      practiceState: next,
    })
    if (e) {
      setLocalError(e.message)
      return
    }
    void refetch()
  }

  async function onComplete() {
    if (!planId || !lessonId || !lesson) return
    if (practiceBundle && !practicePassed) {
      setLocalError('Complete the practice loop (all tiers) before marking this lesson done.')
      return
    }
    setBusy(true)
    setLocalError(null)
    try {
      const { error: e } = await setLessonProgressMvp({
        mode,
        planId,
        lessonId,
        status: 'completed',
        completedAt: new Date().toISOString(),
      })
      if (e) {
        setLocalError(e.message)
        return
      }
      const snap = await refetch()
      if (!snap?.tree) {
        navigate(`/training/${planId}`, { replace: true })
        return
      }
      const step = pickNextTrainingStep(snap.tree, snap.progress, snap.quizAttempts)
      if (step.kind === 'lesson') {
        navigate(step.href, { replace: true })
      } else if (step.kind === 'quiz') {
        navigate(step.href, { replace: true })
      } else {
        navigate(`/training/${planId}`, { replace: true })
      }
    } finally {
      setBusy(false)
    }
  }

  const recommendedNext = useMemo(() => {
    if (!tree || !lessonId) return null
    const step = pickNextTrainingStep(tree, progress, quizAttempts)
    if (step.kind === 'lesson' && step.lesson.id === lessonId) return null
    if (step.kind === 'lesson') {
      return { label: `Next: ${step.lesson.title}`, to: step.href }
    }
    if (step.kind === 'quiz') {
      return { label: step.label, to: step.href }
    }
    return null
  }, [tree, lessonId, progress, quizAttempts])

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Lesson</p>
        <h1 className="mt-1 text-xl font-semibold text-white">{lesson?.title ?? 'Lesson'}</h1>
        {tree?.plan.title ? (
          <p className="mt-2 text-sm text-zinc-500">
            Plan: <span className="text-zinc-300">{tree.plan.title}</span>
          </p>
        ) : null}
        {lesson ? <LessonMetaBar lesson={lesson} /> : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={planId ? `/training/${planId}` : '/training'}
            className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800"
          >
            Back to plan
          </Link>
          {planId && recommendedNext ? (
            <Link
              to={recommendedNext.to}
              className="rounded-lg bg-violet-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
            >
              {recommendedNext.label}
            </Link>
          ) : null}
        </div>
        <p className="mt-4 max-w-prose text-[11px] leading-relaxed text-zinc-600" data-testid="lesson-trust-boundary">
          {TRUST_COPY.lessonInstructionalAssistive}
        </p>
      </header>

      {isSupabaseConfigured() && !workspaceShellReady ? (
        <p className="text-sm text-zinc-400">Loading workspace…</p>
      ) : null}

      {error ? (
        <TrainingInlineAlert error={error} onRetry={() => void refetch()} />
      ) : null}

      {localError ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-200" role="alert">
          {localError}
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-zinc-400">Loading lesson…</p>
      ) : !lesson ? (
        <p className="text-sm text-zinc-500">Lesson not found.</p>
      ) : (
        <>
          <LessonContentSections lesson={lesson} variant={fastReview ? 'fast' : 'full'} />

          {practiceBundle ? (
            <LessonPracticeLoop
              bundle={practiceBundle}
              persistedState={progressRow?.practice_state ?? null}
              busy={busy}
              onPersistState={(s) => persistPracticeState(s)}
            />
          ) : null}

          <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6">
            <button
              type="button"
              disabled={busy || lessonStatus === 'completed' || (Boolean(practiceBundle) && !practicePassed)}
              onClick={() => void onComplete()}
              className="rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {lessonStatus === 'completed' ? 'Completed' : busy ? 'Saving…' : 'Mark complete & continue'}
            </button>
            <span className="text-[11px] text-zinc-500">
              Status: {lessonStatus.replace(/_/g, ' ')}
              {practiceBundle && !practicePassed ? ' · Practice required' : null}
            </span>
          </div>

          <section
            data-testid="lesson-learning-loop"
            className="rounded-xl border border-white/[0.06] bg-zinc-950/35 p-4 ring-1 ring-white/[0.04]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
              Same knowledge engine · next actions
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Lessons, checkpoints, snapshots, and derived revision assets share one graph in this workspace — not a
              separate content generator.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to={planId ? `/training/${planId}#plan-derived-content` : '/training'}
                className="rounded-lg border border-violet-500/35 bg-violet-950/25 px-3 py-1.5 text-xs font-semibold text-violet-100 hover:bg-violet-950/40"
              >
                Revision & study assets
              </Link>
              <Link
                to={planId ? `/training/${planId}` : '/training'}
                className="rounded-lg border border-zinc-600 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-900"
              >
                Plan overview · weak signals
              </Link>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.assessmentScoresContext}</p>
          </section>
        </>
      )}
    </div>
  )
}
