import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  BUSINESS_ANALYTICS_DECISION_MAKING_SLUG,
  BUSINESS_PROCESS_AUTOMATION_SLUG,
  findStandaloneCourseBySlug,
  findStandaloneModule,
  getStandaloneCertificatePath,
  getStandaloneLessonPath,
  getStandaloneLessonSlug,
  getStandaloneQuizPath,
  practicalMathQuizPassed,
} from '../../data/courses'
import { getBaSlidesForModule } from '../../data/courses/businessAnalyticsDecisionMakingSlides'
import { getBpaSlidesForModule } from '../../data/courses/businessProcessAutomationSlides'
import { useStandaloneCourseProgress } from '../../hooks/usePracticalMathProgress'
import { BusinessAnalyticsStandaloneModulePage } from './BusinessAnalyticsStandaloneModulePage'
import { BpaStandaloneModulePage } from './BpaStandaloneModulePage'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { buildLessonPreview, formatHoursFromMinutes } from './standaloneCoursePresentation'
import { StandaloneCapstonePanel } from './StandaloneCapstonePanel'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'
import type { StandaloneCatalogEntry } from '../../data/courses/standaloneCoursesCatalog'
import type { StandaloneCourseModule } from '../../data/courses/practicalMathematicsCourseTypes'

/**
 * Dev-only flag that controls whether the legacy manual-score helper is
 * rendered on the module page. The interactive quiz at
 * `/learn/.../modules/:moduleSlug/quiz` is the production flow; this helper
 * is hidden from learners by default and is enabled only when explicitly
 * opted-in via VITE_PRACTICAL_MATH_DEV_MANUAL_SCORE=true (build-time env)
 * or `?devManualScore=1` in the URL.
 */
function isDevManualScoreEnabled(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const url = new URL(window.location.href)
    if (url.searchParams.get('devManualScore') === '1') return true
  } catch {
    /* swallow */
  }
  const env =
    typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, unknown> }).env
      ? ((import.meta as { env?: Record<string, unknown> }).env as Record<string, unknown>)
      : undefined
  if (env && env.VITE_PRACTICAL_MATH_DEV_MANUAL_SCORE === 'true') return true
  return false
}

/**
 * Hidden-by-default manual score input used only for development testing.
 * Real learners take the quiz at `/learn/.../modules/:moduleSlug/quiz`.
 */
function ModuleQuizDevManualScore({
  module,
  courseInternalKey,
}: {
  module: StandaloneCourseModule
  courseInternalKey: string
}) {
  const { progress, setModuleQuizScore } = useStandaloneCourseProgress(courseInternalKey)
  const [correctInput, setCorrectInput] = useState('')
  const [totalInput, setTotalInput] = useState(String(module.moduleQuiz.length))
  const [quizMessage, setQuizMessage] = useState<string | null>(null)

  const savedQuiz = progress.passedModuleQuizzes.get(module.slug)
  const lastPass = savedQuiz && practicalMathQuizPassed(savedQuiz)

  const onSaveQuiz = () => {
    const total = Math.max(0, Math.floor(Number(totalInput) || 0)) || module.moduleQuiz.length
    const correct = Math.max(0, Math.min(total, Math.floor(Number(correctInput) || 0)))
    setModuleQuizScore(module.slug, { correct, total })
    const pass = practicalMathQuizPassed({ correct, total })
    setQuizMessage(
      pass
        ? `Recorded ${correct}/${total}. You meet the 75% pass bar for this module.`
        : `Recorded ${correct}/${total}. You need at least ${Math.ceil(total * 0.75)} correct to pass at 75%.`,
    )
  }

  return (
    <div
      className="mt-5 rounded-xl border border-amber-300 bg-amber-50/80 p-4 sm:p-5"
      data-testid={`standalone-module-quiz-devmanual-${module.slug}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-800">Dev only — manual score override</p>
      <p className="mt-2 text-[12px] leading-relaxed text-stone-700">
        Hidden from learners. Enabled by VITE_PRACTICAL_MATH_DEV_MANUAL_SCORE or ?devManualScore=1.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-[12px] font-medium text-stone-700">
          Correct
          <input
            type="number"
            min={0}
            className="w-24 rounded-lg border border-stone-300 bg-white px-2 py-2 text-[14px]"
            value={correctInput}
            onChange={(e) => setCorrectInput(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-[12px] font-medium text-stone-700">
          Total
          <input
            type="number"
            min={1}
            className="w-24 rounded-lg border border-stone-300 bg-white px-2 py-2 text-[14px]"
            value={totalInput}
            onChange={(e) => setTotalInput(e.target.value)}
          />
        </label>
        <button
          type="button"
          className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 ${ORANGE_GRADIENT}`}
          onClick={onSaveQuiz}
        >
          Save dev score
        </button>
      </div>
      {savedQuiz ? (
        <p className="mt-3 text-[13px] text-stone-700">
          Last saved: {savedQuiz.correct}/{savedQuiz.total}
          {lastPass ? <span className="ml-2 font-semibold text-emerald-700">Passed (75%+)</span> : null}
        </p>
      ) : null}
      {quizMessage ? <p className="mt-2 text-[13px] text-stone-700">{quizMessage}</p> : null}
    </div>
  )
}

type StandaloneModuleLoadedProps = {
  entry: StandaloneCatalogEntry
  module: StandaloneCourseModule
}

function StandaloneModuleDetailLoaded({ entry, module }: StandaloneModuleLoadedProps) {
  const { progress } = useStandaloneCourseProgress(entry.internalKey)
  const { source } = entry
  const idx = source.modules.findIndex((m) => m.slug === module.slug)
  const prev = idx > 0 ? source.modules[idx - 1] : null
  const next = idx >= 0 && idx < source.modules.length - 1 ? source.modules[idx + 1] : null
  const base = `/learn/${entry.slug}`
  const modulePath = (slug: string) => `${base}/modules/${slug}`
  const quizPath = getStandaloneQuizPath(entry.slug, module.slug)
  const certificateHref = getStandaloneCertificatePath(entry.slug)
  const showCapstonePanel = module.slug === source.capstoneModuleSlug
  const devManualScoreEnabled = isDevManualScoreEnabled()

  const savedQuizScore = progress.passedModuleQuizzes.get(module.slug) ?? null
  const savedQuizPassed =
    module.moduleQuiz.length === 0 ? true : savedQuizScore ? practicalMathQuizPassed(savedQuizScore) : false
  let quizStatusLabel: 'Passed' | 'Needs retry' | 'Not started' | 'N/A (reflection modules)'
  if (module.moduleQuiz.length === 0) quizStatusLabel = 'N/A (reflection modules)'
  else if (savedQuizPassed) quizStatusLabel = 'Passed'
  else if (savedQuizScore) quizStatusLabel = 'Needs retry'
  else quizStatusLabel = 'Not started'

  const durationPart = formatHoursFromMinutes(module.durationMinutes)
  const statsParts = [
    durationPart,
    `${module.lessons.length} lessons`,
    `${module.moduleQuiz.length} quiz questions`,
    `Lab: ${module.practiceLab.title}`,
  ].filter((p) => p.length > 0)
  const statsLine = statsParts.join(' · ')

  if (entry.slug === BUSINESS_PROCESS_AUTOMATION_SLUG) {
    const slides = getBpaSlidesForModule(module.slug)
    return (
      <BpaStandaloneModulePage
        entry={entry}
        module={module}
        source={source}
        slides={slides}
        progress={progress}
        prev={prev}
        next={next}
        devManualScoreEnabled={devManualScoreEnabled}
        ModuleQuizDevManualScore={ModuleQuizDevManualScore}
      />
    )
  }

  if (entry.slug === BUSINESS_ANALYTICS_DECISION_MAKING_SLUG) {
    const slides = getBaSlidesForModule(module.slug)
    return (
      <BusinessAnalyticsStandaloneModulePage
        entry={entry}
        module={module}
        source={source}
        slides={slides}
        progress={progress}
        prev={prev}
        next={next}
        devManualScoreEnabled={devManualScoreEnabled}
        ModuleQuizDevManualScore={ModuleQuizDevManualScore}
      />
    )
  }

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6"
      data-testid={`standalone-module-detail-${entry.slug}-${module.slug}`}
    >
      <div className="mx-auto w-full max-w-3xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="md" variant="compact" surface="light" />
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
          <span className="text-[color:var(--jf-text)]">Module {module.moduleNumber}</span>
        </nav>

        <section>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-700">Module {module.moduleNumber}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)]" data-testid={`standalone-module-title-${module.slug}`}>
            {module.title}
          </h1>
          <p className="mt-4 text-[14px] leading-snug text-[color:var(--jf-muted)]">{statsLine}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={base}
              className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
            >
              Back to course
            </Link>
            <Link
              to={certificateHref}
              className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-stone-50"
            >
              Certificate
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--jf-text)]">Module summary</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{module.moduleSummary}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--jf-text)]">Overview</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{module.overview}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--jf-text)]">What you will learn</h2>
          <ul className="mt-4 space-y-2 text-[14px] leading-snug text-[color:var(--jf-muted)]">
            {module.learningObjectives.map((o) => (
              <li key={o} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" aria-hidden />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </section>

        {showCapstonePanel ? (
          <div className="space-y-4">
            <StandaloneCapstonePanel courseInternalKey={entry.internalKey} acknowledgement={source.capstoneAcknowledgement} />
          </div>
        ) : null}

        <section data-testid={`standalone-module-lessons-${module.slug}`}>
          <h2 className="text-lg font-semibold text-[color:var(--jf-text)]">Lessons</h2>
          <ol className="mt-5 space-y-4">
            {module.lessons.map((lesson) => {
              const preview = buildLessonPreview(lesson)
              const lessonHref = getStandaloneLessonPath(entry.slug, module.slug, getStandaloneLessonSlug(lesson))
              const lslug = getStandaloneLessonSlug(lesson)
              return (
                <li
                  key={lesson.lessonNumber}
                  className="rounded-xl border border-stone-200/90 bg-white p-4 shadow-sm sm:p-5"
                  data-testid={`standalone-module-lesson-card-${module.slug}-${lslug}`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-700">Lesson {lesson.lessonNumber}</p>
                  <h3 className="mt-1 text-[16px] font-semibold text-zinc-900">{lesson.title}</h3>
                  <p className="mt-2 text-[13px] font-medium text-stone-800">{preview.takeaway}</p>
                  {preview.summary ? (
                    <p className="mt-2 text-[13px] leading-relaxed text-stone-600">{preview.summary}</p>
                  ) : null}
                  {preview.practiceLine ? (
                    <p className="mt-2 text-[12px] text-stone-500">
                      <span className="font-semibold text-stone-600">What you&apos;ll practice:</span> {preview.practiceLine}
                    </p>
                  ) : null}
                  <p className="mt-3 text-[11px] text-stone-400">{lesson.estimatedMinutes} min</p>
                  <div className="mt-4">
                    <Link
                      to={lessonHref}
                      className={`inline-flex min-h-[2.25rem] items-center justify-center rounded-full px-5 text-[13px] font-semibold text-white shadow-sm transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                      data-testid={`standalone-module-open-lesson-${module.slug}-${lslug}`}
                    >
                      Open lesson
                    </Link>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="rounded-xl border border-stone-200/90 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[color:var(--jf-text)]">Practice lab</h2>
          <p className="mt-2 text-[15px] font-medium text-zinc-900">{module.practiceLab.title}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{module.practiceLab.learnerGoal}</p>
          <p className="mt-3 text-[12px] text-stone-500">
            {module.practiceLab.scenarios.length} scenario{module.practiceLab.scenarios.length === 1 ? '' : 's'} ·{' '}
            {module.practiceLab.durationMinutes >= 60
              ? formatHoursFromMinutes(module.practiceLab.durationMinutes)
              : `${module.practiceLab.durationMinutes} min`}
          </p>
        </section>

        <section data-testid={`standalone-module-quiz-section-${module.slug}`}>
          <h2 className="text-lg font-semibold text-[color:var(--jf-text)]">Module quiz</h2>
          {module.moduleQuiz.length === 0 ? (
            <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
              This module uses reflection labs instead of an auto-graded quiz. Complete the lessons and practice lab, then continue.
              {source.productTier === 'professional_micro'
                ? ' The graded mini quiz is scheduled in the final module.'
                : null}
            </p>
          ) : (
            <>
              <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
                {module.moduleQuiz.length} questions · pass at 75% or higher ({Math.ceil(module.moduleQuiz.length * 0.75)} or more
                correct for this length).
              </p>
              <div className="mt-5 rounded-xl border border-orange-100/90 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="text-[13px] font-semibold text-stone-800">
                    Quiz status:{' '}
                    <span
                      className={
                        quizStatusLabel === 'Passed'
                          ? 'text-emerald-700'
                          : quizStatusLabel === 'Needs retry'
                            ? 'text-rose-700'
                            : 'text-stone-600'
                      }
                      data-testid={`standalone-module-quiz-status-${module.slug}`}
                    >
                      {quizStatusLabel}
                    </span>
                  </p>
                  {savedQuizScore ? (
                    <p className="mt-2 text-[12px] text-stone-500" data-testid={`standalone-module-quiz-latest-score-${module.slug}`}>
                      Latest score: {savedQuizScore.correct}/{savedQuizScore.total}
                    </p>
                  ) : null}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-stone-600">
                  Take the interactive quiz. Your answers are graded against the answer keys; you must score 75% or higher to pass
                  and progress toward your certificate.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={quizPath}
                    className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                    data-testid={`standalone-module-take-quiz-${module.slug}`}
                  >
                    {savedQuizPassed ? 'Retake module quiz' : savedQuizScore ? 'Retry module quiz' : 'Take module quiz'}
                  </Link>
                </div>
              </div>
              {devManualScoreEnabled ? (
                <ModuleQuizDevManualScore key={module.slug} module={module} courseInternalKey={entry.internalKey} />
              ) : null}
            </>
          )}
        </section>

        {module.safetyNote ? (
          <aside
            className="rounded-lg border-l-[3px] border-amber-400 bg-amber-50/85 px-4 py-3 text-[12px] leading-snug text-amber-950"
            data-testid={`standalone-module-safety-${module.slug}`}
          >
            <span className="font-semibold text-amber-950">Safety:</span> {module.safetyNote}
          </aside>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--jf-border)] pt-8">
          <div className="flex flex-wrap gap-3 text-sm">
            {prev ? (
              <Link to={modulePath(prev.slug)} className="font-medium text-orange-700 hover:underline">
                ← Previous module
              </Link>
            ) : null}
            {next ? (
              <Link to={modulePath(next.slug)} className="font-medium text-orange-700 hover:underline">
                Next module →
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export function StandaloneModuleDetailPage() {
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

  return <StandaloneModuleDetailLoaded entry={entry} module={resolved.module} />
}
