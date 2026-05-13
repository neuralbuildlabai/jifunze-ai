import { useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { SMART_WORKFLOWS_WITH_AI_FREE_STARTER } from '../../data/learning/freeStarterRiseCoursesCatalog'
import {
  SMART_WORKFLOWS_MICROLEARNING_HERO_BADGE,
  SMART_WORKFLOWS_MICROLEARNING_HERO_DESCRIPTION,
  SMART_WORKFLOWS_MICROLEARNING_LESSON_FLOW,
  SMART_WORKFLOWS_MICROLEARNING_METADATA_ROW,
  SMART_WORKFLOWS_MICROLEARNING_OUTCOMES,
  SMART_WORKFLOWS_MICROLEARNING_OUTCOMES_INTRO,
  SMART_WORKFLOWS_MICROLEARNING_SUPPORT_NOTE,
} from '../../data/learning/smartWorkflowsMicrolearningPageCopy'
import { markRisePilotCourseSessionStarted } from '../../lib/risePilotCourseProgress'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'

const course = SMART_WORKFLOWS_WITH_AI_FREE_STARTER

const bodyProse =
  'text-[15px] leading-[1.65] text-[color:var(--jf-muted)] [word-spacing:normal] [letter-spacing:normal] [font-variant:normal] antialiased'

/**
 * Smart Workflows with AI — premium microlearning workshop layout (single-page, no vendor chrome).
 */
export function SmartWorkflowsWithAiFreeStarterPage() {
  useEffect(() => {
    markRisePilotCourseSessionStarted(course.progressInternalKey, course.progressSessionStartedMarker)
  }, [])

  const scrollToPlayer = useCallback(() => {
    document.getElementById('smart-workflows-start-learning')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-8 text-[color:var(--jf-text)] sm:px-6 sm:py-10"
      data-testid="free-starter-smart-workflows-with-ai-page"
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

        {/* A. Premium hero */}
        <section
          className="jf-learn-section-blush relative overflow-hidden rounded-3xl border border-orange-200/50 px-6 py-8 shadow-[var(--jf-shadow-soft)] ring-1 ring-orange-100/40 sm:px-10 sm:py-10"
          aria-labelledby="smart-workflows-hero-title"
        >
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex max-w-full rounded-full bg-orange-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm"
                data-testid="smart-workflows-free-badge"
              >
                {SMART_WORKFLOWS_MICROLEARNING_HERO_BADGE}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--jf-muted)]">
                {course.category}
              </span>
            </div>
            <h1
              id="smart-workflows-hero-title"
              className="mt-5 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2.125rem] sm:leading-tight"
            >
              {course.title}
            </h1>
            <p className={`mt-4 max-w-2xl ${bodyProse}`}>{SMART_WORKFLOWS_MICROLEARNING_HERO_DESCRIPTION}</p>
            <p className="mt-4 text-[13px] font-medium text-[color:var(--jf-text)] sm:text-sm">{SMART_WORKFLOWS_MICROLEARNING_METADATA_ROW}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className={`inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                data-testid="free-starter-smart-workflows-start"
                onClick={scrollToPlayer}
              >
                Start workshop
              </button>
              <Link
                to="/learn"
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-stone-300/90 bg-white/90 px-6 text-[14px] font-semibold text-stone-800 transition hover:bg-white"
              >
                Back to catalog
              </Link>
            </div>

            <p className={`mt-8 rounded-2xl border border-amber-200/60 bg-white/60 px-4 py-3 text-[13px] text-amber-950/90 sm:px-5 ${bodyProse}`}>
              {SMART_WORKFLOWS_MICROLEARNING_SUPPORT_NOTE}
            </p>
          </div>
        </section>

        {/* B–D: one elevated surface — clearer hierarchy, fewer stacked boxes */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] shadow-[var(--jf-shadow-soft)]">
          {/* B. What you will be able to do */}
          <section className="border-b border-[color:var(--jf-border)] px-6 py-8 sm:px-10 sm:py-10" aria-labelledby="smart-workflows-outcomes-heading">
            <h2 id="smart-workflows-outcomes-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-xl">
              What you will be able to do
            </h2>
            {SMART_WORKFLOWS_MICROLEARNING_OUTCOMES_INTRO ? (
              <p className={`mt-3 ${bodyProse}`}>{SMART_WORKFLOWS_MICROLEARNING_OUTCOMES_INTRO}</p>
            ) : null}
            <ul className="mt-5 space-y-3">
              {SMART_WORKFLOWS_MICROLEARNING_OUTCOMES.map((line) => (
                <li key={line} className={`flex gap-3 ${bodyProse}`}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* C. Workshop flow */}
          <section className="border-b border-[color:var(--jf-border)] px-6 py-8 sm:px-10 sm:py-10" aria-labelledby="smart-workflows-flow-heading">
            <h2 id="smart-workflows-flow-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-xl">
              Workshop flow
            </h2>
            <ol className="mt-6 space-y-2.5">
              {SMART_WORKFLOWS_MICROLEARNING_LESSON_FLOW.map((title, i) => (
                <li key={title}>
                  <div className="flex gap-3 rounded-xl border border-stone-200/80 bg-[color:var(--jf-surface-elevated)] px-3.5 py-3 sm:gap-4 sm:px-4">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium leading-snug text-[color:var(--jf-text)] [word-spacing:normal] [letter-spacing:normal]">
                        {title}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* D. Start learning / player */}
          <section
            id="smart-workflows-start-learning"
            className="scroll-mt-24 bg-gradient-to-b from-[color:var(--jf-surface)] to-orange-50/20 px-6 py-8 sm:px-10 sm:py-10"
            aria-labelledby="smart-workflows-player-heading"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 id="smart-workflows-player-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-xl">
                  Start learning
                </h2>
                <p className={`mt-2 max-w-xl text-sm sm:text-[15px] ${bodyProse}`}>
                  Use the interactive workshop below, or open it in a new window.
                </p>
              </div>
              <a
                href={course.lessonPlayerSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium text-orange-700 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-900 hover:decoration-orange-500"
                data-testid="free-starter-smart-workflows-open-tab"
              >
                Open in new window
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200/90 bg-stone-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-black/[0.04]">
              <iframe
                title={`${course.shortTitle} — interactive workshop`}
                src={course.lessonPlayerSrc}
                className="block h-[min(72vh,880px)] w-full min-h-[520px] md:min-h-[640px]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="fullscreen"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
