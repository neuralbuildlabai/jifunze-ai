import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AI_AT_WORK_CHATGPT_FREE_STARTER } from '../../data/learning/freeStarterRiseCoursesCatalog'
import {
  isRisePilotCourseLearnerComplete,
  markRisePilotCourseLearnerComplete,
  markRisePilotCourseSessionStarted,
} from '../../lib/risePilotCourseProgress'
import { PRACTICAL_MATH_PROGRESS_EVENT } from '../../lib/practicalMathProgressStorage'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'

/** Free microlearning course — embedded interactive player; completion is tracked locally on this device until account sync is available. */
export function AiAtWorkChatgptFreeStarterPage() {
  const course = AI_AT_WORK_CHATGPT_FREE_STARTER
  const [complete, setComplete] = useState(() => isRisePilotCourseLearnerComplete(course.progressInternalKey))

  useEffect(() => {
    markRisePilotCourseSessionStarted(course.progressInternalKey, course.progressSessionStartedMarker)
  }, [course.progressInternalKey, course.progressSessionStartedMarker])

  useEffect(() => {
    const sync = () => setComplete(isRisePilotCourseLearnerComplete(course.progressInternalKey))
    window.addEventListener(PRACTICAL_MATH_PROGRESS_EVENT, sync)
    return () => window.removeEventListener(PRACTICAL_MATH_PROGRESS_EVENT, sync)
  }, [course.progressInternalKey])

  const onMarkComplete = useCallback(() => {
    markRisePilotCourseLearnerComplete(course.progressInternalKey)
    setComplete(true)
  }, [course.progressInternalKey])

  const scrollToCourse = useCallback(() => {
    document.getElementById('free-starter-lesson-player-ai-at-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6"
      data-testid="free-starter-ai-at-work-chatgpt-page"
    >
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="md" variant="compact" surface="light" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
              Catalog
            </Link>
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to="/learn#available-now">
              Free courses
            </Link>
            <SignedInPublicLearningActions />
          </div>
        </header>

        <section className="jf-learn-section-blush rounded-2xl border border-orange-100/70 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-lg bg-orange-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              {course.label}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--jf-muted)]">{course.category}</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2rem]">{course.title}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{course.descriptionShort}</p>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[14px] text-[color:var(--jf-text)]">
            <span>{course.level}</span>
            <span className="text-[color:var(--jf-border)]" aria-hidden>
              ·
            </span>
            <span>{course.durationLabel}</span>
            <span className="text-[color:var(--jf-border)]" aria-hidden>
              ·
            </span>
            <span>{course.learnerDisplayFormat}</span>
            <span className="text-[color:var(--jf-border)]" aria-hidden>
              ·
            </span>
            <span className="font-semibold text-orange-600">{course.priceLabel}</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className={`inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
              data-testid="free-starter-ai-at-work-start"
              onClick={scrollToCourse}
            >
              Start course
            </button>
            <Link
              to="/learn"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-[14px] font-semibold text-zinc-800 transition hover:bg-stone-50"
            >
              Back to catalog
            </Link>
          </div>

          <p className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/90 p-4 text-[13px] leading-relaxed text-amber-950/90">
            Work through the interactive course on this page on Jifunze.ai. For the best experience, use an up-to-date desktop browser.
          </p>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Overview</h2>
          <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{course.descriptionLong}</p>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">What you&apos;ll learn</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            {course.learningOutcomes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Lessons in this course</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            {course.lessonsIncluded.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </section>

        <section
          id="free-starter-lesson-player-ai-at-work"
          className="scroll-mt-28 space-y-4 rounded-2xl border border-orange-100/80 bg-white p-4 shadow-[0_22px_50px_-20px_rgba(120,53,15,0.12)] sm:p-6"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Your course</h2>
              <p className="mt-1 text-[13px] text-[color:var(--jf-muted)]">
                Learn with a guided Jifunze.ai interactive course. Use the player below, or open the course in a new window if you prefer.
              </p>
            </div>
            <a
              href={course.lessonPlayerSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-orange-700 underline-offset-2 hover:text-orange-800 hover:underline"
              data-testid="free-starter-ai-at-work-open-tab"
            >
              Open course
            </a>
          </div>

          <div className="relative w-full overflow-hidden rounded-xl border border-stone-200/90 bg-stone-100/80 shadow-inner">
            <iframe
              title={`${course.shortTitle} — interactive lesson`}
              src={course.lessonPlayerSrc}
              className="block h-[min(72vh,880px)] w-full min-h-[520px] md:min-h-[720px]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="fullscreen"
            />
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-[#fffdfb] p-4 sm:p-5">
            <h3 className="text-[15px] font-semibold text-[color:var(--jf-text)]">Completion</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{course.learnerCompletionNote}</p>
            {complete ? (
              <p className="mt-4 text-[14px] font-medium text-emerald-800" data-testid="free-starter-ai-at-work-complete-label">
                Marked complete — thank you for finishing this course. On this device, your completion may show here before account-wide sync is
                available.
              </p>
            ) : (
              <button
                type="button"
                className="mt-4 inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-orange-300 bg-white px-6 text-[13px] font-semibold text-orange-900 transition hover:bg-orange-50"
                data-testid="free-starter-ai-at-work-mark-complete"
                onClick={onMarkComplete}
              >
                Mark complete
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
