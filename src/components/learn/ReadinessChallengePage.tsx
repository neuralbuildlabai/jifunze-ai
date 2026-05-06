import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { buildReadinessBankForSlug } from '@/data/learning/readinessChallengeBuildBank'
import type { ReadinessQuestion } from '@/data/learning/readinessChallengeTypes'
import { evaluateAdaptiveStep, READINESS_MAX_QUESTIONS } from '@/learner/readinessChallengeAdaptive'
import { useLearnerCommerce } from '@/learner/LearnerCommerceContext'
import { LEARNER_MONETIZATION_UI_DISABLED } from '@/learner/learnerCommerceConstants'
import { getFlagshipCourseBySlug } from '@/data/learning/flagshipCoursesCatalog'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'

function shuffleInPlace<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function shuffleQuestionOptions(q: ReadinessQuestion): { labels: string[]; correctIndex: number } {
  const idx = shuffleInPlace([0, 1, 2, 3])
  const labels = idx.map((i) => q.options[i])
  const correctIndex = idx.indexOf(q.correctIndex)
  return { labels, correctIndex }
}

type Phase = 'running' | 'passed' | 'failed'

export function ReadinessChallengePage() {
  const { slug } = useParams<{ slug: string }>()
  const { recordReadinessPass, discount } = useLearnerCommerce()
  const course = slug ? getFlagshipCourseBySlug(slug) : undefined
  const recordedPass = useRef(false)

  const questionRun = useMemo(() => {
    if (!slug) return []
    const bank = buildReadinessBankForSlug(slug)
    const shuffled = shuffleInPlace(bank)
    return shuffled.slice(0, READINESS_MAX_QUESTIONS)
  }, [slug])

  const [st, setSt] = useState({
    qi: 0,
    correct: 0,
    answered: 0,
    phase: 'running' as Phase,
    failReason: null as 'below_bar' | 'impossible' | null,
  })

  const currentQ = questionRun[st.qi]
  const optionLayout = useMemo(() => (currentQ ? shuffleQuestionOptions(currentQ) : null), [currentQ])

  useEffect(() => {
    if (st.phase === 'passed' && slug && !recordedPass.current) {
      recordedPass.current = true
      recordReadinessPass(slug)
    }
  }, [st.phase, slug, recordReadinessPass])

  const onPick = useCallback(
    (choiceIndex: number) => {
      if (!currentQ || !optionLayout) return
      const isRight = choiceIndex === optionLayout.correctIndex
      setSt((s) => {
        if (s.phase !== 'running') return s
        const nextCorrect = s.correct + (isRight ? 1 : 0)
        const nextAnswered = s.answered + 1
        const out = evaluateAdaptiveStep(nextCorrect, nextAnswered)
        if (out.status === 'passed') {
          return { ...s, correct: nextCorrect, answered: nextAnswered, phase: 'passed', failReason: null }
        }
        if (out.status === 'failed') {
          return {
            correct: nextCorrect,
            answered: nextAnswered,
            qi: s.qi,
            phase: 'failed',
            failReason: out.reason,
          }
        }
        if (nextAnswered >= READINESS_MAX_QUESTIONS) {
          return {
            correct: nextCorrect,
            answered: nextAnswered,
            qi: s.qi,
            phase: 'failed',
            failReason: 'below_bar',
          }
        }
        return {
          correct: nextCorrect,
          answered: nextAnswered,
          qi: s.qi + 1,
          phase: 'running',
          failReason: null,
        }
      })
    },
    [currentQ, optionLayout],
  )

  if (!slug || !course) {
    return <Navigate to={LEGAL_ROUTES.learn} replace />
  }

  const progressPct = st.answered === 0 ? 0 : Math.round((st.answered / READINESS_MAX_QUESTIONS) * 100)

  return (
    <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
      <header className="jf-learn-nav-header sticky top-0 z-10 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link to={`/learn/courses/${slug}`} className="text-[12px] font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]">
            ← Course
          </Link>
          <JifunzeBrandLogo to="/" size="sm" surface="light" />
        </div>
      </header>

      <main className="mx-auto max-w-xl px-5 pb-28 pt-10 sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--jf-muted)]">Course Readiness Challenge</p>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-2xl">{course.title}</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
          {LEARNER_MONETIZATION_UI_DISABLED
            ? 'A calm, course-aware check—not trivia. Use it to see how this course expects you to work through material.'
            : 'A calm, course-aware check—not trivia. Results can unlock a one-time 5% discount on your first eligible single-course purchase for this track. All-access subscriptions are unchanged.'}
        </p>

        <div className="mt-8 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-[color:var(--jf-muted)]">
            <span>
              Question {Math.min(st.answered + 1, READINESS_MAX_QUESTIONS)} · up to {READINESS_MAX_QUESTIONS}
            </span>
            <span className="font-mono tabular-nums">
              {st.correct}/{st.answered || 0} correct
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[color:var(--jf-bg-page)]">
            <div className="h-full rounded-full bg-[color:var(--jf-text)]/35 transition-[width]" style={{ width: `${progressPct}%` }} />
          </div>

          {st.phase === 'running' && currentQ && optionLayout ? (
            <div className="mt-8 space-y-6">
              <p className="text-[15px] leading-relaxed text-[color:var(--jf-text)]">{currentQ.stem}</p>
              <div className="flex flex-col gap-2.5">
                {optionLayout.labels.map((label, i) => (
                  <button
                    key={`${currentQ.id}-${i}`}
                    type="button"
                    className="min-h-[3rem] rounded-xl border border-[color:var(--jf-border)] px-4 py-3 text-left text-[14px] leading-snug text-[color:var(--jf-muted)] transition hover:border-white/[0.14] hover:bg-white/[0.03]"
                    onClick={() => onPick(i)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {st.phase === 'passed' ? (
            <div className="mt-8 space-y-5">
              <p className="text-[15px] leading-relaxed text-[color:var(--jf-text)]">
                Strong alignment with how this course expects you to work through material.
              </p>
              {LEARNER_MONETIZATION_UI_DISABLED ? (
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Link
                    className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)]"
                    to={`/learn/courses/${slug}`}
                    data-testid="readiness-back-to-course"
                  >
                    Back to course overview
                  </Link>
                </div>
              ) : (
                <>
                  <p className="text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
                    You&apos;ve unlocked a one-time 5% discount on your first eligible single-course checkout for{' '}
                    <span className="font-medium text-[color:var(--jf-text)]">{course.title}</span>, if you haven&apos;t used it yet.
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <Link
                      className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)]"
                      to={`/learn/checkout?course=${slug}`}
                      data-testid="readiness-goto-checkout"
                    >
                      Continue to checkout
                    </Link>
                    <Link
                      className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.05]"
                      to={`/learn/courses/${slug}`}
                    >
                      Back to course overview
                    </Link>
                  </div>
                  {discount.consumed ? (
                    <p className="text-[12px] text-[color:var(--jf-subtle)]">Note: discount already used on an earlier purchase.</p>
                  ) : null}
                </>
              )}
            </div>
          ) : null}

          {st.phase === 'failed' ? (
            <div className="mt-8 space-y-5">
              <p className="text-[15px] leading-relaxed text-[color:var(--jf-text)]">Nice effort — you can still continue.</p>
              <p className="text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
                {LEARNER_MONETIZATION_UI_DISABLED
                  ? 'This check is not an admissions gate. Explore courses, sign in when you are ready, and continue learning at your pace.'
                  : 'This challenge only unlocks a small first-course discount. It isn&apos;t an admissions gate. Explore courses, sign up when you&apos;re ready, and start learning at your pace.'}
              </p>
              {st.failReason === 'impossible' ? (
                <p className="text-[13px] leading-relaxed text-[color:var(--jf-subtle)]">
                  We stopped early because the remaining questions couldn&apos;t reach the threshold—this saves time while keeping the experience fair.
                </p>
              ) : null}
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Link
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)]"
                  to="/?auth=signup#auth"
                >
                  Continue to signup
                </Link>
                <Link
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.05]"
                  to="/learn"
                >
                  Explore courses
                </Link>
                <Link
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.05]"
                  to={`/learn/courses/${slug}`}
                >
                  Return to this course
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}
