import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FlagshipCurriculumModule } from '../../data/learning/flagshipCourseCurricula'
import type { FlagshipSession } from '../../data/learning/flagshipCourseSessions'
import {
  buildModuleQuizPool,
  drawQuizQuestions,
  MODULE_QUIZ_DRAW_COUNT,
  MODULE_QUIZ_LOCK_MS,
  MODULE_QUIZ_MIN_CORRECT,
  type ModuleQuizQuestion,
} from '../../lib/flagshipModuleQuizPools'
import type { FlagshipModuleQuizRecord } from '../../lib/flagshipCourseProgressDerived'
import { recordTeachingSignal } from '../../data/teaching/teachingSignals'

function nowIso(): string {
  return new Date().toISOString()
}

export function FlagshipModuleQuizPanel(props: {
  module: FlagshipCurriculumModule
  sessions: FlagshipSession[]
  courseSlug: string
  quizState: FlagshipModuleQuizRecord | undefined
  onUpdateQuiz: (record: Partial<FlagshipModuleQuizRecord>) => void
}) {
  const { module, sessions, courseSlug, quizState, onUpdateQuiz } = props

  const pool = useMemo(() => buildModuleQuizPool(module, sessions), [module, sessions])
  const [attemptNonce, setAttemptNonce] = useState(0)
  const seed = `${courseSlug}:${module.id}:${attemptNonce}`
  const questions = useMemo(() => drawQuizQuestions(pool, seed), [pool, seed])

  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [cheatSignals, setCheatSignals] = useState(0)
  const [reviewAcknowledged, setReviewAcknowledged] = useState(Boolean(quizState?.reviewAcknowledgedAt))
  const attemptStartedAt = useRef<number>(Date.now())

  const lockUntil = quizState?.lockUntil ? Date.parse(quizState.lockUntil) : 0
  const locked = Date.now() < lockUntil

  useEffect(() => {
    setReviewAcknowledged(Boolean(quizState?.reviewAcknowledgedAt))
  }, [quizState?.reviewAcknowledgedAt])

  useEffect(() => {
    attemptStartedAt.current = Date.now()
  }, [attemptNonce, module.id, courseSlug])

  const onCopyGuard = useCallback(() => {
    setCheatSignals((n) => {
      const next = n + 1
      if (next === 3 || next === 8 || next === 15) {
        recordTeachingSignal({
          kind: 'quiz_integrity_ui_activity',
          payload: { courseSlug, moduleId: module.id, level: next },
        })
      }
      if (import.meta.env.DEV && next > 8) console.warn('[quiz] elevated copy/context activity')
      return next
    })
  }, [courseSlug, module.id])

  const correctCount = useMemo(() => {
    if (!submitted) return 0
    let n = 0
    for (const q of questions) {
      if (answers[q.id] === q.correctIndex) n++
    }
    return n
  }, [submitted, questions, answers])

  const failedAttempt = submitted && correctCount < MODULE_QUIZ_MIN_CORRECT
  const canRetryAfterFail = failedAttempt && !locked && reviewAcknowledged

  function submit() {
    setSubmitted(true)
    let n = 0
    for (const q of questions) {
      if (answers[q.id] === q.correctIndex) n++
    }
    const ts = nowIso()
    const elapsed = Date.now() - attemptStartedAt.current
    recordTeachingSignal({
      kind: 'quiz_module_submit',
      payload: {
        courseSlug,
        moduleId: module.id,
        correct: n,
        drawCount: questions.length,
        elapsedMs: elapsed,
        cheatSignals,
        passed: n >= MODULE_QUIZ_MIN_CORRECT,
      },
    })
    if (elapsed < 4500 && questions.length >= MODULE_QUIZ_DRAW_COUNT) {
      recordTeachingSignal({
        kind: 'quiz_suspicious_timing',
        payload: { courseSlug, moduleId: module.id, elapsedMs: elapsed },
      })
    }

    if (n >= MODULE_QUIZ_MIN_CORRECT) {
      onUpdateQuiz({ passedAt: ts, lockUntil: undefined, lastAttemptAt: ts, reviewAcknowledgedAt: undefined })
      setReviewAcknowledged(false)
      return
    }
    setReviewAcknowledged(false)
    const lockIso = new Date(Date.now() + MODULE_QUIZ_LOCK_MS).toISOString()
    recordTeachingSignal({
      kind: 'quiz_lock_applied',
      payload: { courseSlug, moduleId: module.id, lockUntil: lockIso, correct: n },
    })
    onUpdateQuiz({
      lastAttemptAt: ts,
      lockUntil: lockIso,
      reviewAcknowledgedAt: undefined,
    })
  }

  function startNewAttempt() {
    setSubmitted(false)
    setAnswers({})
    setAttemptNonce((x) => x + 1)
    setReviewAcknowledged(false)
    onUpdateQuiz({ reviewAcknowledgedAt: undefined })
  }

  if (quizState?.passedAt) {
    return (
      <div className="mt-6 rounded-xl border border-emerald-900/35 bg-emerald-950/[0.15] px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200/85">Module check passed</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
          You met the score threshold for this module—you can continue to the next module when earlier gates allow.
        </p>
      </div>
    )
  }

  if (pool.length < MODULE_QUIZ_DRAW_COUNT) {
    return (
      <div className="mt-6 rounded-xl border border-amber-900/35 bg-amber-950/[0.12] px-4 py-4 text-[13px] text-amber-100/90">
        Module quiz is still preparing for this path—finish every session in the module, then refresh.
      </div>
    )
  }

  return (
    <div
      className="mt-6 select-none rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-4 py-5 sm:px-5"
      onCopy={(e) => {
        e.preventDefault()
        onCopyGuard()
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {import.meta.env.DEV && cheatSignals > 10 ? (
        <span className="sr-only" aria-live="polite">
          Activity signals recorded for review.
        </span>
      ) : null}
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Module understanding check</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
        Answer {MODULE_QUIZ_DRAW_COUNT} questions drawn from this module&apos;s sessions. You need at least {MODULE_QUIZ_MIN_CORRECT} correct to unlock the next
        module. Questions change between attempts.
      </p>
      {locked ? (
        <p className="mt-3 text-[13px] text-amber-200/90">
          Review cooldown: retry opens after{' '}
          <span className="font-medium text-amber-50">{new Date(lockUntil).toLocaleTimeString()}</span>. Re-read the module sessions above before trying again.
        </p>
      ) : null}

      <ul className="mt-5 space-y-6">
        {questions.map((q: ModuleQuizQuestion, qi: number) => (
          <li key={q.id}>
            <p className="text-[14px] font-medium text-[color:var(--jf-text)]">
              {qi + 1}. {q.prompt}
            </p>
            <div className="mt-3 space-y-2" role="radiogroup" aria-label={`Question ${qi + 1}`}>
              {q.choices.map((c, ci) => (
                <label
                  key={`${q.id}-${ci}`}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-[color:var(--jf-border)] px-3 py-2 text-[13px] text-[color:var(--jf-muted)] hover:border-white/[0.12]"
                >
                  <input
                    type="radio"
                    name={q.id}
                    disabled={submitted || locked}
                    checked={answers[q.id] === ci}
                    onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: ci }))}
                    className="mt-1"
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
            {submitted ? (
              <p className={`mt-2 text-[12px] ${answers[q.id] === q.correctIndex ? 'text-emerald-200/85' : 'text-amber-200/85'}`}>
                {answers[q.id] === q.correctIndex ? 'Correct.' : 'Incorrect for this attempt.'}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        {!submitted ? (
          <button
            type="button"
            disabled={
              locked || Object.keys(answers).length < questions.length || questions.length < MODULE_QUIZ_DRAW_COUNT
            }
            onClick={submit}
            className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 text-sm font-semibold text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit answers
          </button>
        ) : (
          <>
            <p className="text-[13px] text-[color:var(--jf-muted)]">
              Score:{' '}
              <span className="font-semibold text-[color:var(--jf-text)]">
                {correctCount}/{questions.length}
              </span>{' '}
              correct (need {MODULE_QUIZ_MIN_CORRECT}+).
            </p>
            {correctCount >= MODULE_QUIZ_MIN_CORRECT ? null : (
              <>
                <label className="mt-2 flex w-full max-w-xl cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-[color:var(--jf-border)]"
                    checked={reviewAcknowledged}
                    onChange={(e) => {
                      const on = e.target.checked
                      setReviewAcknowledged(on)
                      onUpdateQuiz({ reviewAcknowledgedAt: on ? nowIso() : undefined })
                      if (on) {
                        recordTeachingSignal({
                          kind: 'quiz_review_acknowledged',
                          payload: { courseSlug, moduleId: module.id },
                        })
                      }
                    }}
                  />
                  <span>I&apos;ve reviewed the lessons in this module since my last attempt.</span>
                </label>
                <button
                  type="button"
                  disabled={!canRetryAfterFail}
                  onClick={startNewAttempt}
                  className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-5 text-sm font-semibold text-[color:var(--jf-text)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {locked ? 'Cooldown active — revisit sessions above' : !reviewAcknowledged ? 'Confirm review to retry' : 'Try again with new questions'}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
