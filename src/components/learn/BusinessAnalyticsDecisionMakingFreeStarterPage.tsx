import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BUSINESS_ANALYTICS_DECISION_MAKING_FREE_STARTER,
  FREE_STARTER_COMPLETION_THANKS,
  FREE_STARTER_HERO_ACCESS_BADGE,
} from '../../data/learning/freeStarterRiseCoursesCatalog'
import {
  BUSINESS_ANALYTICS_MICROLEARNING_HERO_DESCRIPTION,
  BUSINESS_ANALYTICS_MICROLEARNING_LESSON_FLOW,
  BUSINESS_ANALYTICS_MICROLEARNING_METADATA_ROW,
  BUSINESS_ANALYTICS_MICROLEARNING_OUTCOMES,
  BUSINESS_ANALYTICS_MICROLEARNING_SUPPORT_NOTE,
} from '../../data/learning/businessAnalyticsMicrolearningPageCopy'
import {
  isRisePilotCourseLearnerComplete,
  markRisePilotCourseLearnerComplete,
  markRisePilotCourseSessionStarted,
} from '../../lib/risePilotCourseProgress'
import { PRACTICAL_MATH_PROGRESS_EVENT } from '../../lib/practicalMathProgressStorage'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'

const course = BUSINESS_ANALYTICS_DECISION_MAKING_FREE_STARTER

const bodyProse =
  'text-[15px] leading-[1.65] text-[color:var(--jf-muted)] [word-spacing:normal] [letter-spacing:normal] [font-variant:normal] antialiased'

/** Free microlearning — embedded interactive; completion is stored in this browser only. */
export function BusinessAnalyticsDecisionMakingFreeStarterPage() {
  const [complete, setComplete] = useState(() => isRisePilotCourseLearnerComplete(course.progressInternalKey))

  useEffect(() => {
    markRisePilotCourseSessionStarted(course.progressInternalKey, course.progressSessionStartedMarker)
  }, [])

  useEffect(() => {
    const sync = () => setComplete(isRisePilotCourseLearnerComplete(course.progressInternalKey))
    window.addEventListener(PRACTICAL_MATH_PROGRESS_EVENT, sync)
    return () => window.removeEventListener(PRACTICAL_MATH_PROGRESS_EVENT, sync)
  }, [])

  const onMarkComplete = useCallback(() => {
    markRisePilotCourseLearnerComplete(course.progressInternalKey)
    setComplete(true)
  }, [])

  const scrollToPlayer = useCallback(() => {
    document.getElementById('free-starter-lesson-player-business-analytics')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-8 text-[color:var(--jf-text)] sm:px-6 sm:py-10"
      data-testid="free-starter-business-analytics-decision-making-page"
    >
      <div className="mx-auto w-full max-w-3xl [word-spacing:normal] [letter-spacing:normal]">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-5">
          <JifunzeBrandLogo to="/" size="md" variant="compact" surface="light" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
              Catalog
            </Link>
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to="/learn#available-now">
              More courses
            </Link>
            <SignedInPublicLearningActions />
          </div>
        </header>

        <section
          className="jf-learn-section-blush relative overflow-hidden rounded-3xl border border-orange-200/50 px-6 py-8 shadow-[var(--jf-shadow-soft)] ring-1 ring-orange-100/40 sm:px-10 sm:py-10"
          aria-labelledby="business-analytics-hero-title"
        >
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex max-w-full rounded-full bg-orange-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                {FREE_STARTER_HERO_ACCESS_BADGE}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--jf-muted)]">{course.category}</span>
            </div>
            <h1
              id="business-analytics-hero-title"
              className="mt-5 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2.125rem] sm:leading-tight"
            >
              {course.title}
            </h1>
            <p className={`mt-4 max-w-2xl ${bodyProse}`}>{BUSINESS_ANALYTICS_MICROLEARNING_HERO_DESCRIPTION}</p>
            <p className="mt-4 text-[13px] font-medium text-[color:var(--jf-text)] sm:text-sm">{BUSINESS_ANALYTICS_MICROLEARNING_METADATA_ROW}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className={`inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                data-testid="free-starter-business-analytics-start"
                onClick={scrollToPlayer}
              >
                Start course
              </button>
              <Link
                to="/learn"
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-stone-300/90 bg-white/90 px-6 text-[14px] font-semibold text-stone-800 transition hover:bg-white"
              >
                Back to catalog
              </Link>
            </div>

            <p className={`mt-8 max-w-2xl rounded-2xl border border-amber-200/60 bg-white/60 px-4 py-3 text-[13px] text-amber-950/90 sm:px-5 ${bodyProse}`}>
              {BUSINESS_ANALYTICS_MICROLEARNING_SUPPORT_NOTE}
            </p>
          </div>
        </section>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] shadow-[var(--jf-shadow-soft)]">
          <section className="border-b border-[color:var(--jf-border)] px-6 py-8 sm:px-10 sm:py-10" aria-labelledby="business-analytics-outcomes-heading">
            <h2 id="business-analytics-outcomes-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-xl">
              What you will be able to do
            </h2>
            <ul className="mt-5 space-y-3">
              {BUSINESS_ANALYTICS_MICROLEARNING_OUTCOMES.map((line) => (
                <li key={line} className={`flex gap-3 ${bodyProse}`}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-b border-[color:var(--jf-border)] px-6 py-8 sm:px-10 sm:py-10" aria-labelledby="business-analytics-flow-heading">
            <h2 id="business-analytics-flow-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-xl">
              Lesson flow
            </h2>
            <ol className="mt-6 space-y-2.5">
              {BUSINESS_ANALYTICS_MICROLEARNING_LESSON_FLOW.map((title, i) => (
                <li key={title}>
                  <div className="flex gap-3 rounded-xl border border-stone-200/80 bg-[color:var(--jf-bg-page)] px-3.5 py-3 sm:gap-4 sm:px-4">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <p className="min-w-0 flex-1 text-[14px] font-medium leading-snug text-[color:var(--jf-text)] [word-spacing:normal] [letter-spacing:normal]">
                      {title}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section
            id="free-starter-lesson-player-business-analytics"
            className="scroll-mt-24 bg-gradient-to-b from-[color:var(--jf-surface)] to-orange-50/20 px-6 py-8 sm:px-10 sm:py-10"
            aria-labelledby="business-analytics-player-heading"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 id="business-analytics-player-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-xl">
                  Start learning
                </h2>
                <p className={`mt-2 max-w-xl text-sm sm:text-[15px] ${bodyProse}`}>
                  Open the interactive course below, or use a new window if you prefer.
                </p>
              </div>
              <a
                href={course.lessonPlayerSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium text-orange-700 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-900 hover:decoration-orange-500"
                data-testid="free-starter-business-analytics-open-tab"
              >
                Open in new window
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200/90 bg-stone-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-black/[0.04]">
              <iframe
                title="Business Analytics for Decision-Making — interactive course"
                src={course.lessonPlayerSrc}
                className="block h-[min(72vh,880px)] w-full min-h-[520px] md:min-h-[640px]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="fullscreen"
              />
            </div>

            <div className="mt-8 border-t border-stone-200/80 pt-6">
              <p className={`text-[13px] ${bodyProse}`}>{course.learnerCompletionNote}</p>
              {complete ? (
                <p className="mt-3 text-[14px] font-medium text-emerald-800" data-testid="free-starter-business-analytics-complete-label">
                  {FREE_STARTER_COMPLETION_THANKS}
                </p>
              ) : (
                <button
                  type="button"
                  className="mt-4 inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-orange-300 bg-white px-6 text-[13px] font-semibold text-orange-900 transition hover:bg-orange-50"
                  data-testid="free-starter-business-analytics-mark-complete"
                  onClick={onMarkComplete}
                >
                  Mark complete
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
