import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  findStandaloneCourseBySlug,
  findStandaloneModule,
  getStandaloneCertificatePath,
  getStandaloneModulePath,
  PRACTICAL_MATH_QUIZ_PASS_RATE,
  practicalMathQuizPassed,
  type StandaloneCourseQuizQuestion,
} from '../../data/courses'
import type { StandaloneCatalogEntry } from '../../data/courses/standaloneCoursesCatalog'
import type { StandaloneCourseModule } from '../../data/courses/practicalMathematicsCourseTypes'
import { useStandaloneCourseProgress } from '../../hooks/usePracticalMathProgress'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'
import { quizAnswerMatches } from '../../lib/practicalMathQuizAnswer'

type AnswerMap = Record<string, string>

type GradedQuestion = {
  question: StandaloneCourseQuizQuestion
  learnerAnswer: string
  correct: boolean
}

type GradedQuiz = {
  questions: GradedQuestion[]
  correct: number
  total: number
  passed: boolean
  percent: number
}

function gradeQuiz(
  questions: readonly StandaloneCourseQuizQuestion[],
  answers: AnswerMap,
): GradedQuiz {
  let correct = 0
  const graded: GradedQuestion[] = []
  for (const q of questions) {
    const learner = (answers[q.id] ?? '').toString()
    const isCorrect = quizAnswerMatches(learner, q.correctAnswer)
    if (isCorrect) correct += 1
    graded.push({ question: q, learnerAnswer: learner, correct: isCorrect })
  }
  const total = questions.length
  const percent = total > 0 ? (100 * correct) / total : 0
  return {
    questions: graded,
    correct,
    total,
    passed: practicalMathQuizPassed({ correct, total }),
    percent,
  }
}

function QuestionCard({
  question,
  index,
  total,
  value,
  onChange,
  graded,
  disabled,
}: {
  question: StandaloneCourseQuizQuestion
  index: number
  total: number
  value: string
  onChange: (val: string) => void
  graded?: GradedQuestion
  disabled: boolean
}) {
  const useChoices = (question.type === 'multiple_choice' || question.type === 'scenario') && Array.isArray(question.options)
  const headerColor = graded
    ? graded.correct
      ? 'border-emerald-300 bg-emerald-50/60'
      : 'border-rose-300 bg-rose-50/60'
    : 'border-orange-100/90 bg-white'

  return (
    <li
      className={`rounded-2xl border ${headerColor} p-5 shadow-sm sm:p-6`}
      data-testid={`practical-math-quiz-question-${question.id}`}
      data-question-state={graded ? (graded.correct ? 'correct' : 'incorrect') : 'unanswered'}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-700">
          Question {index + 1} of {total}
        </p>
        <span className="text-[11px] font-medium uppercase tracking-wide text-stone-500">
          {question.difficulty}
        </span>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-stone-900">{question.question}</p>

      <div className="mt-4">
        {useChoices ? (
          <fieldset className="space-y-2">
            <legend className="sr-only">Answer choices</legend>
            {(question.options ?? []).map((opt) => {
              const id = `${question.id}-${opt}`
              const checked = value === opt
              return (
                <label
                  key={opt}
                  htmlFor={id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-[14px] transition ${
                    checked
                      ? 'border-orange-400 bg-orange-50/80'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  } ${disabled ? 'cursor-not-allowed opacity-90' : ''}`}
                >
                  <input
                    type="radio"
                    id={id}
                    name={question.id}
                    value={opt}
                    checked={checked}
                    disabled={disabled}
                    onChange={() => onChange(opt)}
                    className="mt-1 h-4 w-4 accent-orange-500"
                    data-testid={`practical-math-quiz-option-${question.id}-${opt.replace(/\s+/g, '-')}`}
                  />
                  <span className="text-stone-900">{opt}</span>
                </label>
              )
            })}
          </fieldset>
        ) : (
          <label className="block text-[12px] font-medium text-stone-700">
            Your answer
            <input
              type="text"
              value={value}
              disabled={disabled}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-[14px] text-stone-900 outline-none placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200/70 disabled:bg-stone-100"
              placeholder="Type your answer"
              data-testid={`practical-math-quiz-input-${question.id}`}
            />
          </label>
        )}
      </div>

      {graded ? (
        <div
          className="mt-4 space-y-2 rounded-lg border border-stone-200 bg-stone-50/80 p-3 text-[13px] leading-relaxed text-stone-800"
          data-testid={`practical-math-quiz-explanation-${question.id}`}
        >
          <p>
            <span className="font-semibold text-stone-700">Your answer:</span>{' '}
            <span className={graded.correct ? 'text-emerald-700' : 'text-rose-700'}>
              {graded.learnerAnswer ? graded.learnerAnswer : <em className="text-stone-500">(blank)</em>}
            </span>
          </p>
          <p>
            <span className="font-semibold text-stone-700">Correct answer:</span> {question.correctAnswer}
          </p>
          <p>
            <span className="font-semibold text-stone-700">Explanation:</span> {question.explanation}
          </p>
          <p className="text-[11px] uppercase tracking-wide text-stone-500">Lesson {question.relatedLesson}</p>
        </div>
      ) : null}
    </li>
  )
}

type StandaloneQuizLoadedProps = {
  entry: StandaloneCatalogEntry
  module: StandaloneCourseModule
}

function StandaloneQuizLoaded({ entry, module }: StandaloneQuizLoadedProps) {
  const { progress, setModuleQuizScore } = useStandaloneCourseProgress(entry.internalKey)
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [graded, setGraded] = useState<GradedQuiz | null>(null)

  const { source } = entry
  const idx = source.modules.findIndex((m) => m.slug === module.slug)
  const next = idx >= 0 && idx < source.modules.length - 1 ? source.modules[idx + 1] : null
  const base = `/learn/${entry.slug}`
  const modulePath = getStandaloneModulePath(entry.slug, module.slug)
  const certificateHref = getStandaloneCertificatePath(entry.slug)
  const passingNeeded = Math.ceil(module.moduleQuiz.length * PRACTICAL_MATH_QUIZ_PASS_RATE)
  const lastSavedScore = progress.passedModuleQuizzes.get(module.slug) ?? null
  const lastSavedPassed = lastSavedScore ? practicalMathQuizPassed(lastSavedScore) : false

  const onSelect = (id: string, value: string) => {
    if (graded) return
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const onSubmit = () => {
    const result = gradeQuiz(module.moduleQuiz, answers)
    setGraded(result)
    setModuleQuizScore(module.slug, { correct: result.correct, total: result.total })
  }

  const onRetry = () => {
    setAnswers({})
    setGraded(null)
  }

  const allAnswered = module.moduleQuiz.every((q) => (answers[q.id] ?? '').trim().length > 0)

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6"
      data-testid={`practical-math-quiz-page-${module.slug}`}
    >
      <div className="mx-auto w-full max-w-3xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="md" surface="light" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
              Catalog
            </Link>
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to={base}>
              Course overview
            </Link>
            <SignedInPublicLearningActions />
          </div>
        </header>

        <nav className="text-[12px] text-[color:var(--jf-muted)]" aria-label="Breadcrumb">
          <Link to="/learn" className="hover:text-[color:var(--jf-text)]">
            Learn
          </Link>
          <span className="mx-1.5">/</span>
          <Link to={base} className="hover:text-[color:var(--jf-text)]">
            {source.title}
          </Link>
          <span className="mx-1.5">/</span>
          <Link to={modulePath} className="hover:text-[color:var(--jf-text)]">
            Module {module.moduleNumber}
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-[color:var(--jf-text)]">Quiz</span>
        </nav>

        <section>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-700">
            Module {module.moduleNumber} quiz
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-900" data-testid="practical-math-quiz-title">
            {module.title}
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-stone-600">
            {module.moduleQuiz.length} questions · pass at 75% or higher (need {passingNeeded} or more correct).
          </p>
          {lastSavedScore ? (
            <p className="mt-2 text-[12px] text-stone-500" data-testid="practical-math-quiz-last-score">
              Last saved score: {lastSavedScore.correct}/{lastSavedScore.total}
              {lastSavedPassed ? (
                <span className="ml-2 font-semibold text-emerald-700">Passed</span>
              ) : (
                <span className="ml-2 font-semibold text-rose-700">Needs retry</span>
              )}
            </p>
          ) : null}
        </section>

        <ol className="space-y-4">
          {module.moduleQuiz.map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={i}
              total={module.moduleQuiz.length}
              value={answers[q.id] ?? ''}
              onChange={(val) => onSelect(q.id, val)}
              graded={graded?.questions.find((g) => g.question.id === q.id)}
              disabled={graded != null}
            />
          ))}
        </ol>

        {graded ? (
          <section
            className={`rounded-2xl border p-6 sm:p-8 ${
              graded.passed
                ? 'border-emerald-200 bg-emerald-50/70'
                : 'border-rose-200 bg-rose-50/70'
            }`}
            data-testid="practical-math-quiz-result"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-600">Result</p>
            <h2 className="mt-1 text-2xl font-semibold text-stone-900">
              {graded.correct} / {graded.total} ({graded.percent.toFixed(1)}%)
            </h2>
            {graded.passed ? (
              <p
                className="mt-3 text-[14px] font-semibold text-emerald-800"
                data-testid="practical-math-quiz-pass-message"
              >
                Passed — meets the 75% threshold for this module.
              </p>
            ) : (
              <p
                className="mt-3 text-[14px] font-semibold text-rose-800"
                data-testid="practical-math-quiz-fail-message"
              >
                Needs retry — you need at least {passingNeeded} of {graded.total} correct (75%).
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {graded.passed ? null : (
                <button
                  type="button"
                  onClick={onRetry}
                  className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                  data-testid="practical-math-quiz-retry"
                >
                  Retry quiz
                </button>
              )}
              <Link
                to={modulePath}
                className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-stone-50"
                data-testid="practical-math-quiz-back-to-module"
              >
                Back to module
              </Link>
              {graded.passed && next ? (
                <Link
                  to={getStandaloneModulePath(entry.slug, next.slug)}
                  className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                  data-testid="practical-math-quiz-next-module"
                >
                  Continue to Module {next.moduleNumber} →
                </Link>
              ) : null}
              {graded.passed && !next ? (
                <Link
                  to={certificateHref}
                  className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                  data-testid="practical-math-quiz-go-certificate"
                >
                  Go to certificate
                </Link>
              ) : null}
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-orange-100/90 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-stone-700">
                {allAnswered
                  ? 'Ready to submit. You can change answers until you click submit.'
                  : `Answer all ${module.moduleQuiz.length} questions to submit.`}
              </p>
              <button
                type="button"
                onClick={onSubmit}
                disabled={!allAnswered}
                className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-7 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 ${ORANGE_GRADIENT}`}
                data-testid="practical-math-quiz-submit"
              >
                Submit quiz
              </button>
            </div>
          </section>
        )}

        <div className="flex flex-wrap gap-3 border-t border-[color:var(--jf-border)] pt-6 text-sm">
          <Link to={modulePath} className="font-medium text-orange-700 hover:underline">
            ← Back to module
          </Link>
          <Link to={base} className="font-medium text-orange-700 hover:underline">
            Back to course
          </Link>
        </div>
      </div>
    </div>
  )
}

export function StandaloneQuizPage() {
  const { standaloneCourseSlug, moduleSlug } = useParams<{
    standaloneCourseSlug: string
    moduleSlug: string
  }>()

  const entry = useMemo(
    () => (standaloneCourseSlug ? findStandaloneCourseBySlug(standaloneCourseSlug) : undefined),
    [standaloneCourseSlug],
  )
  const resolved = useMemo(() => {
    if (!standaloneCourseSlug || !moduleSlug) return undefined
    return findStandaloneModule(standaloneCourseSlug, moduleSlug)
  }, [standaloneCourseSlug, moduleSlug])

  if (!standaloneCourseSlug || !entry) {
    return <Navigate to="/learn" replace />
  }
  if (!resolved) {
    return <Navigate to={`/learn/${standaloneCourseSlug}`} replace />
  }

  if (resolved.module.moduleQuiz.length === 0) {
    return <Navigate to={getStandaloneModulePath(entry.slug, resolved.module.slug)} replace />
  }

  return <StandaloneQuizLoaded entry={entry} module={resolved.module} />
}
