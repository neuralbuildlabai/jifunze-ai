import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MENTAL_WELLBEING_RESET_FREE_STARTER } from '../../data/learning/freeStarterRiseCoursesCatalog'
import {
  MENTAL_WELLBEING_RESET_MICROLEARNING_HERO_BADGE,
  MENTAL_WELLBEING_RESET_MICROLEARNING_HERO_DESCRIPTION,
  MENTAL_WELLBEING_RESET_MICROLEARNING_LESSON_FLOW,
  MENTAL_WELLBEING_RESET_MICROLEARNING_METADATA_ROW,
  MENTAL_WELLBEING_RESET_YOU_WILL_PRACTICE,
} from '../../data/learning/mentalWellbeingResetMicrolearningPageCopy'
import { WELLBEING_RESET_DAY_SLUGS } from '../../data/learning/wellbeingResetProgressPlan'
import {
  getLearnerResumeTarget,
  markLearnerDayComplete,
  migrateLocalInteractiveStartersToSupabase,
  saveLearnerCourseActivity,
} from '../../lib/learnerProgressHub'
import { markRisePilotCourseSessionStarted } from '../../lib/risePilotCourseProgress'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'
import { CourseInteractiveEmbed } from './CourseInteractiveEmbed'
import { LearnerCatalogFooterBar } from './LearnerCatalogFooterBar'

const course = MENTAL_WELLBEING_RESET_FREE_STARTER

const dayFlow = MENTAL_WELLBEING_RESET_MICROLEARNING_LESSON_FLOW.map((label, i) => ({
  label,
  daySlug: WELLBEING_RESET_DAY_SLUGS[i]!,
}))

/**
 * Free wellbeing micro-course — embedded interactive Monday–Friday challenge.
 */
export function MentalWellbeingResetFreeStarterPage() {
  const { user, supabase } = useAuth()
  const location = useLocation()
  const [resume, setResume] = useState({ href: `${course.publicRoute}#course-player`, cta: 'Start course' })
  const [markingDay, setMarkingDay] = useState<string | null>(null)

  useEffect(() => {
    markRisePilotCourseSessionStarted(course.progressInternalKey, course.progressSessionStartedMarker)
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!user?.id || !supabase || !isSupabaseConfigured()) {
        const t = await getLearnerResumeTarget(null, undefined, course.slug)
        if (!cancelled) setResume({ href: t.href, cta: t.cta })
        return
      }
      await migrateLocalInteractiveStartersToSupabase(supabase, user.id)
      await saveLearnerCourseActivity(supabase, user.id, course.slug, { markOpened: true })
      const t = await getLearnerResumeTarget(supabase, user.id, course.slug)
      if (!cancelled) setResume({ href: t.href, cta: t.cta })
    })()
    return () => {
      cancelled = true
    }
  }, [user, supabase])

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '')
    if (!hash) return
    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.hash])

  const onOpenDay = useCallback(
    (daySlug: string) => {
      if (!user?.id || !supabase || !isSupabaseConfigured()) return
      void saveLearnerCourseActivity(supabase, user.id, course.slug, { daySlug, markOpened: true })
    },
    [user, supabase],
  )

  const onMarkDayDone = useCallback(
    (daySlug: string) => {
      if (!user?.id || !supabase || !isSupabaseConfigured()) return
      setMarkingDay(daySlug)
      void (async () => {
        await markLearnerDayComplete(supabase, user.id, course.slug, daySlug)
        const t = await getLearnerResumeTarget(supabase, user.id, course.slug)
        setResume({ href: t.href, cta: t.cta })
        setMarkingDay(null)
      })()
    },
    [user, supabase],
  )

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-8 text-[color:var(--jf-text)] sm:px-6 sm:py-10"
      data-testid="free-starter-5-day-mental-wellbeing-reset-page"
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
          aria-labelledby="wellbeing-reset-hero-title"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full bg-stone-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
              data-testid="wellbeing-reset-free-badge"
            >
              {MENTAL_WELLBEING_RESET_MICROLEARNING_HERO_BADGE}
            </span>
            <span className="rounded-full border border-stone-200/90 bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-600">
              {course.category}
            </span>
          </div>
          <h1 id="wellbeing-reset-hero-title" className="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[1.75rem]">
            {course.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            {MENTAL_WELLBEING_RESET_MICROLEARNING_HERO_DESCRIPTION}
          </p>
          <p className="mt-3 text-[13px] text-[color:var(--jf-muted)]">{MENTAL_WELLBEING_RESET_MICROLEARNING_METADATA_ROW}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              to={resume.href}
              className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-7 text-[14px] font-semibold text-white shadow-md shadow-orange-500/20 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
              data-testid="free-starter-wellbeing-reset-start"
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

        <section className="rounded-xl border border-stone-200/70 bg-white/60 px-5 py-4 sm:px-6" aria-labelledby="wellbeing-you-practice">
          <h2 id="wellbeing-you-practice" className="text-[13px] font-semibold text-[color:var(--jf-text)]">
            You will practice
          </h2>
          <ul className="mt-2 space-y-1.5 text-[13px] leading-snug text-[color:var(--jf-muted)]">
            {MENTAL_WELLBEING_RESET_YOU_WILL_PRACTICE.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-400/90" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="wellbeing-reset-flow-heading">
          <h2 id="wellbeing-reset-flow-heading" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            Five-day rhythm
          </h2>
          <ol className="mt-3 divide-y divide-stone-200/80 rounded-xl border border-stone-200/80 bg-[color:var(--jf-surface)]">
            {dayFlow.map(({ label, daySlug }) => (
              <li key={daySlug} id={daySlug} className="scroll-mt-28 px-4 py-3 sm:px-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <button
                    type="button"
                    onClick={() => onOpenDay(daySlug)}
                    className="min-w-0 text-left text-[14px] font-medium leading-snug text-[color:var(--jf-text)] transition hover:text-orange-800"
                  >
                    {label}
                  </button>
                  {user && supabase && isSupabaseConfigured() ? (
                    <button
                      type="button"
                      disabled={markingDay === daySlug}
                      onClick={() => onMarkDayDone(daySlug)}
                      className="shrink-0 text-[11px] font-medium text-stone-500 underline decoration-stone-300 underline-offset-2 hover:text-stone-800 disabled:opacity-50"
                    >
                      {markingDay === daySlug ? 'Saving…' : 'Mark day complete'}
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <CourseInteractiveEmbed
          title={`${course.shortTitle} — challenge`}
          playerSrc={course.lessonPlayerSrc}
          heading="Begin the challenge"
          description="Work through each day in order, at your own pace. Your place saves when you are signed in."
          newWindowHref={course.lessonPlayerSrc}
          newWindowTestId="free-starter-wellbeing-reset-open-tab"
          testId="wellbeing-reset-embed"
        />

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
