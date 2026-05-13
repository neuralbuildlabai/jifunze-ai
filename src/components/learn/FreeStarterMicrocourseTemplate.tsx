import { Link } from 'react-router-dom'
import type { FreeStarterRiseCourseEntry } from '../../data/learning/freeStarterRiseCoursesCatalog'
import { FREE_STARTER_COMPLETION_THANKS, FREE_STARTER_HERO_ACCESS_BADGE } from '../../data/learning/freeStarterRiseCoursesCatalog'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'
import { CourseInteractiveEmbed } from './CourseInteractiveEmbed'
import { LearnerCatalogFooterBar } from './LearnerCatalogFooterBar'

export type FreeStarterFlowStep = { id: string; label: string }

type Props = {
  pageTestId: string
  course: FreeStarterRiseCourseEntry
  heroDescription: string
  metadataRow: string
  /** Up to three short bullets; omit to hide the block. */
  practiceBullets?: readonly string[]
  flowHeading: string
  flowSteps: readonly FreeStarterFlowStep[]
  onFlowStepOpen?: (stepId: string) => void
  resume: { href: string; cta: string }
  embedHeading: string
  iframeTitle: string
  newWindowTestId?: string
  complete: boolean
  onMarkComplete?: () => void | Promise<void>
  /** When false, no completion panel is shown (use true once learner can mark complete). */
  showMarkComplete?: boolean
  /** Optional stable test id for the primary CTA link (defaults to `${pageTestId}-primary-cta`). */
  primaryCtaTestId?: string
  /** Optional test id for the first hero pill (e.g. course-specific badge check). */
  firstHeroBadgeTestId?: string
}

/**
 * Shared layout for short free interactive starters — matches the 5-Day Mental Wellbeing Reset pattern.
 */
export function FreeStarterMicrocourseTemplate(props: Props) {
  const {
    pageTestId,
    course,
    heroDescription,
    metadataRow,
    practiceBullets,
    flowHeading,
    flowSteps,
    onFlowStepOpen,
    resume,
    embedHeading,
    iframeTitle,
    newWindowTestId,
    complete,
    onMarkComplete,
    showMarkComplete = true,
    primaryCtaTestId,
    firstHeroBadgeTestId,
  } = props

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-8 text-[color:var(--jf-text)] sm:px-6 sm:py-10"
      data-testid={pageTestId}
    >
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-5">
          <JifunzeBrandLogo to="/" size="md" variant="compact" surface="light" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
              Catalog
            </Link>
            <SignedInPublicLearningActions />
          </div>
        </header>

        <section
          className="rounded-2xl border border-stone-200/90 bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-7"
          aria-labelledby="free-starter-hero-title"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full bg-stone-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
              data-testid={firstHeroBadgeTestId}
            >
              {FREE_STARTER_HERO_ACCESS_BADGE}
            </span>
            <span className="rounded-full border border-stone-200/90 bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-600">
              {course.category}
            </span>
          </div>
          <h1 id="free-starter-hero-title" className="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[1.75rem]">
            {course.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{heroDescription}</p>
          <p className="mt-3 text-[13px] text-[color:var(--jf-muted)]">{metadataRow}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              to={resume.href}
              className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-7 text-[14px] font-semibold text-white shadow-md shadow-orange-500/20 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
              data-testid={primaryCtaTestId ?? `${pageTestId}-primary-cta`}
            >
              {resume.cta}
            </Link>
            <Link
              to="/learn"
              className="text-[13px] font-medium text-[color:var(--jf-muted)] underline decoration-stone-300 underline-offset-4 transition hover:text-[color:var(--jf-text)]"
            >
              Back to catalog
            </Link>
          </div>
        </section>

        {practiceBullets?.length ? (
          <section className="rounded-xl border border-stone-200/70 bg-white/60 px-5 py-4 sm:px-6" aria-labelledby="free-starter-practice">
            <h2 id="free-starter-practice" className="text-[13px] font-semibold text-[color:var(--jf-text)]">
              You will practice
            </h2>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-snug text-[color:var(--jf-muted)]">
              {practiceBullets.slice(0, 3).map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-400/90" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="free-starter-flow-heading">
          <h2 id="free-starter-flow-heading" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            {flowHeading}
          </h2>
          <ol className="mt-3 divide-y divide-stone-200/80 rounded-xl border border-stone-200/80 bg-[color:var(--jf-surface)]">
            {flowSteps.map(({ id, label }) => (
              <li key={id} id={id} className="scroll-mt-28 px-4 py-3 sm:px-5">
                <button
                  type="button"
                  className="w-full text-left text-[14px] font-medium leading-snug text-[color:var(--jf-text)] transition hover:text-orange-800"
                  onClick={() => onFlowStepOpen?.(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ol>
        </section>

        <CourseInteractiveEmbed
          title={iframeTitle}
          playerSrc={course.lessonPlayerSrc}
          heading={embedHeading}
          description="Work at your own pace. When you are signed in, your place and completion save to your account."
          newWindowHref={course.lessonPlayerSrc}
          newWindowTestId={newWindowTestId}
          testId={`${pageTestId}-embed`}
        />

        {showMarkComplete ? (
          <section className="rounded-xl border border-stone-200/80 bg-white/80 px-5 py-4 sm:px-6">
            <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              When you have finished the interactive course, mark it complete so your dashboard and My Learning stay accurate.
            </p>
            {complete ? (
              <p className="mt-3 text-[14px] font-medium text-emerald-800" data-testid={`${pageTestId}-complete-label`}>
                {FREE_STARTER_COMPLETION_THANKS}
              </p>
            ) : (
              <button
                type="button"
                className="mt-4 inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300/90 bg-white px-6 text-[13px] font-semibold text-zinc-800 transition hover:bg-stone-50"
                data-testid={`${pageTestId}-mark-complete`}
                onClick={() => void onMarkComplete?.()}
              >
                Mark complete
              </button>
            )}
          </section>
        ) : null}

        <div className="pt-2 text-center">
          <Link to="/learn" className="text-[13px] font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)] hover:underline">
            Return to course catalog
          </Link>
        </div>

        <LearnerCatalogFooterBar />
      </div>
    </div>
  )
}
