import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { quizKindToAssessmentMode } from '../../training/contracts/assessmentModes'
import { effectiveAssessmentBlueprint } from '../../training/assessmentBlueprint'
import { buildExamPrepDebrief } from '../../training/examPrepDebrief'
import { pickNextTrainingStep } from '../../training/trainingProgress'
import { submitQuizCheckpointMvp, useTrainingPlanDetail } from '../../training/trainingHooks'
import { useTrainingWorkspace } from '../../training/useTrainingWorkspace'
import { TRUST_COPY } from '../../training/trustCopy'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { buildHeuristicRemediationSequenceLinesFromParts } from '../../training/remediationActionLoop'
import type { LessonRevisitSuggestion } from '../../training/remediationTypes'
import type { TrainingPlanWithTree, TrainingQuizQuestionRow } from '../../training/trainingTypes'
import { ExamPrepDebriefPanel } from './ExamPrepDebriefPanel'
import { TrainingInlineAlert } from './TrainingInlineAlert'
import { recordTeachingSignal } from '../../data/teaching/teachingSignals'

function lessonMetaForId(tree: TrainingPlanWithTree, lessonId: string): { title: string; moduleTitle: string } | null {
  for (const m of tree.modules) {
    const hit = m.lessons.find((l) => l.id === lessonId)
    if (hit) return { title: hit.title, moduleTitle: m.title }
  }
  return null
}

function optionsAsStrings(q: TrainingQuizQuestionRow): string[] {
  const raw = q.options_json
  if (Array.isArray(raw) && raw.every((x) => typeof x === 'string')) {
    return raw as string[]
  }
  return []
}

export function TrainingQuizPage() {
  const { planId, quizId } = useParams<{ planId: string; quizId: string }>()
  const navigate = useNavigate()
  const { workspaceShellReady, user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const { tree, loading, error, refetch } = useTrainingPlanDetail(planId)

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null)
  const [elapsedLiveSec, setElapsedLiveSec] = useState(0)
  const [submitted, setSubmitted] = useState<{
    score: number
    total: number
    passed: boolean
    answersSnapshot: Record<string, string>
    elapsedSeconds: number | null
  } | null>(null)

  const quiz = useMemo(() => {
    if (!tree || !quizId) return null
    if (tree.diagnostic_quiz?.id === quizId) return tree.diagnostic_quiz
    const sup = tree.plan_supplemental_quizzes?.find((q) => q.id === quizId)
    if (sup) return sup
    for (const m of tree.modules) {
      if (m.quiz?.id === quizId) return m.quiz
    }
    return null
  }, [tree, quizId])

  const questions = useMemo(() => quiz?.questions ?? [], [quiz])

  const moduleTitles = useMemo(() => tree?.modules.map((m) => m.title) ?? [], [tree])

  const effectiveBlueprint = useMemo(() => {
    if (!quiz || !tree) return null
    return effectiveAssessmentBlueprint({
      quizRowAssessmentBlueprintJson: quiz.assessment_blueprint_json,
      quizTitle: quiz.title,
      topic: tree.plan.topic ?? tree.plan.title,
      questionCount: questions.length,
      moduleTitles,
    })
  }, [quiz, tree, questions.length, moduleTitles])

  const assessmentMode = quiz ? quizKindToAssessmentMode(quiz.quiz_kind) : 'module_checkpoint'
  const showExamStyleChrome = assessmentMode === 'mock_exam' || assessmentMode === 'mixed_review'

  useEffect(() => {
    if (!timerStartedAt || submitted) return
    const tick = () =>
      setElapsedLiveSec(Math.max(0, Math.floor((Date.now() - timerStartedAt) / 1000)))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [timerStartedAt, submitted])

  const checkpointRetryLoop = useMemo(() => {
    if (!submitted || submitted.passed || showExamStyleChrome || !tree || !quiz) return null
    const missedLessonIds = new Set<string>()
    for (const q of questions) {
      const sel = submitted.answersSnapshot[q.id]
      if (String(sel) === String(q.correct_answer)) continue
      if (q.source_lesson_id) missedLessonIds.add(q.source_lesson_id)
    }
    const revisit: LessonRevisitSuggestion[] = [...missedLessonIds].slice(0, 3).map((id) => {
      const meta = lessonMetaForId(tree, id)
      return {
        lessonId: id,
        lessonTitle: meta?.title ?? 'Linked lesson',
        moduleTitle: meta?.moduleTitle ?? '',
        reason: 'Miss tied to this lesson from this checkpoint.',
        priority: 10,
      }
    })
    return buildHeuristicRemediationSequenceLinesFromParts({
      revisitSuggestions: revisit,
      weakConcepts: [],
      errorPatterns: [],
    })
  }, [submitted, showExamStyleChrome, tree, quiz, questions])

  const missedLessonLinks = useMemo(() => {
    if (!submitted || submitted.passed || showExamStyleChrome || !tree) return []
    const ids = new Set<string>()
    for (const q of questions) {
      const sel = submitted.answersSnapshot[q.id]
      if (String(sel) === String(q.correct_answer)) continue
      if (q.source_lesson_id) ids.add(q.source_lesson_id)
    }
    return [...ids]
      .map((id) => {
        const meta = lessonMetaForId(tree, id)
        return meta ? { id, title: meta.title, moduleTitle: meta.moduleTitle } : null
      })
      .filter(Boolean) as { id: string; title: string; moduleTitle: string }[]
  }, [submitted, showExamStyleChrome, tree, questions])

  const examDebrief = useMemo(() => {
    if (!submitted || !quiz || !effectiveBlueprint || !showExamStyleChrome) return null
    const mode =
      assessmentMode === 'mock_exam'
        ? 'mock_exam'
        : assessmentMode === 'mixed_review'
          ? 'mixed_review'
          : 'module_checkpoint'
    return buildExamPrepDebrief({
      assessmentMode: mode,
      blueprint: effectiveBlueprint,
      questions,
      answersByQuestionId: submitted.answersSnapshot,
      elapsedSeconds: submitted.elapsedSeconds,
    })
  }, [submitted, quiz, effectiveBlueprint, showExamStyleChrome, assessmentMode, questions])

  async function onSubmit() {
    if (!planId || !quizId || !quiz || mode.kind === 'blocked') return
    for (const q of questions) {
      if (answers[q.id] === undefined) {
        setLocalError('Answer every question before submitting.')
        return
      }
    }
    setBusy(true)
    setLocalError(null)
    let score = 0
    for (const q of questions) {
      const sel = answers[q.id]
      if (String(sel) === String(q.correct_answer)) score += 1
    }
    const total = questions.length
    const passed = total > 0 && score >= total
    const elapsedSeconds =
      timerStartedAt != null ? Math.max(0, Math.floor((Date.now() - timerStartedAt) / 1000)) : null
    const { error: e } = await submitQuizCheckpointMvp({
      mode,
      planId,
      quizId,
      totalQuestions: total,
      score,
      answersJson: answers,
    })
    if (e) {
      setLocalError(e.message)
      setBusy(false)
      return
    }
    recordTeachingSignal({
      kind: 'checkpoint_attempt',
      payload: {
        planId: planId ?? '',
        quizId: quizId ?? '',
        quizKind: String(quiz.quiz_kind ?? ''),
        assessmentMode,
        score,
        total,
        passed: passed ? 1 : 0,
        elapsedSeconds: elapsedSeconds ?? null,
      },
    })
    setSubmitted({ score, total, passed, answersSnapshot: { ...answers }, elapsedSeconds })
    await refetch()
    setBusy(false)
  }

  function onContinue() {
    if (!planId) return
    void (async () => {
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
    })()
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="border-b border-white/[0.06] pb-6">
        {tree?.diagnostic_quiz?.id === quizId ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-violet-400/90">
            Placement diagnostic
          </p>
        ) : quiz?.quiz_kind === 'recap_checkpoint' ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-400/90">
            Recap checkpoint
          </p>
        ) : quiz?.quiz_kind === 'mixed_review' ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-sky-400/90">
            Mixed-topic review
          </p>
        ) : quiz?.quiz_kind === 'exam_practice' ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-amber-400/90">
            Exam-style practice · preparation rehearsal
          </p>
        ) : (
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Checkpoint</p>
        )}
        <h1 className="mt-1 text-xl font-semibold text-white">{quiz?.title ?? 'Quiz'}</h1>
        {quiz?.description ? <p className="mt-2 text-sm text-zinc-400">{quiz.description}</p> : null}
        {tree?.plan.title ? (
          <p className="mt-2 text-sm text-zinc-500">
            Plan: <span className="text-zinc-300">{tree.plan.title}</span>
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={planId ? `/training/${planId}` : '/training'}
            className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800"
          >
            Back to plan
          </Link>
        </div>
        {quiz ? (
          <p
            data-testid="checkpoint-trust-context"
            className="mt-4 rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2 text-[11px] leading-relaxed text-zinc-500"
          >
            {quizKindToAssessmentMode(quiz.quiz_kind) === 'mock_exam'
              ? `${TRUST_COPY.examPrepPracticeShort} ${TRUST_COPY.assessmentScoresContext}`
              : TRUST_COPY.assessmentScoresContext}
          </p>
        ) : null}
        <div className="mt-4">
          <TrustBoundaryStrip compact dataTestId="quiz-trust-boundary" />
        </div>
      </header>

      {isSupabaseConfigured() && !workspaceShellReady ? (
        <p className="text-sm text-zinc-400">Loading workspace…</p>
      ) : null}

      {error ? <TrainingInlineAlert error={error} onRetry={() => void refetch()} /> : null}

      {localError ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-200" role="alert">
          {localError}
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-zinc-400">Loading checkpoint…</p>
      ) : !quiz ? (
        <p className="text-sm text-zinc-500">Checkpoint not found.</p>
      ) : submitted ? (
        <div className="space-y-6">
          {examDebrief && planId ? <ExamPrepDebriefPanel debrief={examDebrief} planId={planId} /> : null}

          <section className="space-y-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 ring-1 ring-white/[0.04]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {showExamStyleChrome ? 'Item-by-item review' : 'Results'}
            </p>
            {!showExamStyleChrome ? (
              <>
                <p className="text-lg font-semibold text-white">
                  {submitted.score} / {submitted.total} correct
                </p>
                <p className={`text-sm ${submitted.passed ? 'text-emerald-300/90' : 'text-amber-200/90'}`}>
                  {submitted.passed
                    ? 'Checkpoint passed. You can move on.'
                    : 'Keep the answers that match the plan — retry until you get them all right.'}
                </p>
              </>
            ) : (
              <p className="text-sm text-zinc-400">
                Review each item below — explanations tie back to the knowledge graph when present.
              </p>
            )}
            <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
              {questions.map((q, i) => {
                const sel = submitted.answersSnapshot[q.id]
                const ok = String(sel) === String(q.correct_answer)
                return (
                  <div
                    key={q.id}
                    className="rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2.5 text-sm"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Question {i + 1}{' '}
                      <span className={ok ? 'text-emerald-300/90' : 'text-rose-300/85'}>
                        {ok ? '· Correct' : '· Review'}
                      </span>
                    </p>
                    <p className="mt-3 text-zinc-100">{q.prompt}</p>
                    {q.explanation ? (
                      <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                        <span className="font-medium text-zinc-300">Why: </span>
                        {q.explanation}
                      </p>
                    ) : (
                      <p className="mt-2 text-[11px] leading-relaxed text-amber-200/85">
                        No explanation attached in the curriculum seed for this item — add one in the knowledge graph for
                        stronger debrief quality.
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
            {!showExamStyleChrome && submitted && !submitted.passed && planId && checkpointRetryLoop?.length ? (
              <div className="mt-4 rounded-lg border border-amber-500/25 bg-amber-950/15 px-3 py-3 ring-1 ring-amber-500/10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300/90">
                  Before you retry this checkpoint
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Heuristic loop — same knowledge graph powers lessons, checkpoints, and revision assets.{' '}
                  {TRUST_COPY.weakAreasHeuristic}
                </p>
                {missedLessonLinks.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                    {missedLessonLinks.map((l) => (
                      <li key={l.id}>
                        <Link className="font-medium text-violet-300 hover:text-violet-200" to={`/training/${planId}/lessons/${l.id}`}>
                          {l.title}
                        </Link>
                        <span className="text-zinc-600"> · </span>
                        <span className="text-zinc-500">{l.moduleTitle}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-xs text-zinc-500">
                    No lesson linkage on missed items — read each explanation above, then draft a revision sheet from the
                    plan’s graph.
                  </p>
                )}
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-xs text-zinc-200">
                  {checkpointRetryLoop.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ol>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    to={`/training/${planId}#plan-derived-content`}
                    className="rounded-lg border border-violet-500/35 bg-violet-950/30 px-3 py-1.5 text-xs font-semibold text-violet-100 hover:bg-violet-950/45"
                  >
                    Open revision content tools
                  </Link>
                  <Link
                    to={`/training/${planId}`}
                    className="rounded-lg border border-zinc-600 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-900"
                  >
                    Plan overview & memory
                  </Link>
                </div>
              </div>
            ) : null}
            <p className="text-[11px] leading-relaxed text-zinc-500">{TRUST_COPY.assessmentScoresContext}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {showExamStyleChrome || submitted.passed ? (
                <button
                  type="button"
                  onClick={() => void onContinue()}
                  className="rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
                >
                  Continue
                </button>
              ) : null}
              {!submitted.passed && !showExamStyleChrome ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null)
                      setAnswers({})
                    }}
                    className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
                  >
                    Try again
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(planId ? `/training/${planId}` : '/training')}
                    className="rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
                  >
                    Back to plan
                  </button>
                </>
              ) : null}
              {!submitted.passed && showExamStyleChrome ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null)
                      setAnswers({})
                      setTimerStartedAt(null)
                      setElapsedLiveSec(0)
                    }}
                    className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
                  >
                    Retry rehearsal
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(planId ? `/training/${planId}` : '/training')}
                    className="rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
                  >
                    Back to plan
                  </button>
                </>
              ) : null}
            </div>
          </section>
        </div>
      ) : (
        <form
          className="space-y-6"
          onSubmit={(ev) => {
            ev.preventDefault()
            void onSubmit()
          }}
        >
          {showExamStyleChrome && effectiveBlueprint ? (
            <section className="rounded-xl border border-amber-500/25 bg-amber-950/15 p-4 ring-1 ring-amber-500/10">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-300/90">
                Rehearsal blueprint · coverage
              </p>
              <p className="mt-2 text-sm font-medium text-white">{effectiveBlueprint.blueprint_name}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                {effectiveBlueprint.trust_note ?? TRUST_COPY.examPrepSeriousnessBoundary}
              </p>
              <div className="mt-3 space-y-2 text-xs text-zinc-400">
                {effectiveBlueprint.sections.map((s) => (
                  <p key={s.id}>
                    <span className="font-medium text-zinc-300">{s.title}</span>
                    {s.question_sort_order_from != null && s.question_sort_order_to != null
                      ? ` · items ${s.question_sort_order_from + 1}–${s.question_sort_order_to + 1}`
                      : null}
                  </p>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-zinc-500">
                Domains (internal graph):{' '}
                {effectiveBlueprint.coverage_domains.map((d) => d.label).join(' · ') || '—'}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-4">
                <p className="text-[11px] text-zinc-500">
                  Suggested pacing: ~{effectiveBlueprint.timing?.suggested_duration_minutes ?? '—'} minutes (guidance
                  only).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setElapsedLiveSec(0)
                    setTimerStartedAt(Date.now())
                  }}
                  className="rounded-lg border border-amber-500/35 bg-amber-950/40 px-3 py-1.5 text-xs font-semibold text-amber-100 hover:bg-amber-950/55"
                >
                  {timerStartedAt ? 'Timer running' : 'Start timed rehearsal'}
                </button>
                {timerStartedAt ? (
                  <span className="font-mono text-xs text-amber-200/90">
                    Elapsed {Math.floor(elapsedLiveSec / 60)}m {elapsedLiveSec % 60}s
                  </span>
                ) : null}
              </div>
            </section>
          ) : null}

          {questions.map((q, i) => {
            const opts = optionsAsStrings(q)
            return (
              <fieldset
                key={q.id}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]"
              >
                <legend className="px-1 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                  Question {i + 1}
                </legend>
                <p className="mt-2 text-sm text-zinc-100">{q.prompt}</p>
                <div className="mt-3 space-y-2">
                  {opts.map((label, idx) => {
                    const v = String(idx)
                    const id = `${q.id}-${idx}`
                    return (
                      <label key={id} className="flex cursor-pointer items-start gap-2 text-sm text-zinc-200">
                        <input
                          type="radio"
                          name={q.id}
                          value={v}
                          checked={answers[q.id] === v}
                          onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
                          className="mt-0.5"
                        />
                        <span>{label}</span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            )
          })}
          <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6">
            <button
              type="submit"
              disabled={busy || questions.length === 0}
              className="rounded-lg bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? 'Saving…' : showExamStyleChrome ? 'Submit rehearsal' : 'Submit answers'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
