import { Link } from 'react-router-dom'
import {
  getFullCourseCatalogItems,
  getHomepageAvailablePreviewItems,
  getLearningAreasSummary,
  getMicrolearningCatalogItems,
  type FullCourseCatalogItem,
  type MicrolearningCatalogItem,
} from '../../data/learning/availablePublicLearnCatalog'
import { HeroBrowserMockup, ORANGE_GRADIENT, IconArrowRight, IconSpark } from './discoveryHubSections'

const CARD_SHELL =
  'group flex h-full flex-col overflow-hidden rounded-2xl border border-orange-100/90 bg-white shadow-[0_18px_40px_-24px_rgba(120,53,15,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-22px_rgba(251,146,60,0.2)]'

function MicrolearningCard({ course }: { course: MicrolearningCatalogItem }) {
  const isWorkshop = course.slug === 'smart-workflows-with-ai'
  const isBusinessAnalyticsMicro = course.slug === 'business-analytics-decision-making'
  const isWellbeingReset = course.slug === '5-day-mental-wellbeing-reset'
  const banner = isWorkshop
    ? 'from-violet-600 via-fuchsia-600 to-indigo-900'
    : isBusinessAnalyticsMicro
      ? 'from-emerald-600 via-teal-600 to-slate-900'
      : isWellbeingReset
        ? 'from-teal-500 via-emerald-500 to-sky-700'
        : 'from-sky-600 via-cyan-600 to-indigo-900'
  const fallbackLevelDuration =
    course.level && course.durationLabel
      ? `${course.level} · ${course.durationLabel}`
      : course.level ?? course.durationLabel ?? ''
  const metaLine = course.metaRow ?? fallbackLevelDuration
  return (
    <article className={CARD_SHELL} data-testid={`discovery-microlearning-${course.slug}`}>
      <Link to={course.route} className="relative block aspect-[16/10] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${banner} opacity-95`} aria-hidden />
        <span className="absolute left-4 top-4 inline-flex rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-zinc-900 shadow-sm">
          {course.publicLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="text-[17px] font-bold leading-snug text-zinc-900">
          <Link to={course.route} className="transition hover:text-orange-600">
            {course.shortTitle}
          </Link>
        </h3>
        {metaLine ? <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">{metaLine}</p> : null}
        <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">{course.descriptionLearner}</p>
        <div className="mt-auto pt-6">
          <Link
            to={course.route}
            className={`inline-flex min-h-[2.5rem] w-full items-center justify-center rounded-full px-5 text-[13px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
            data-testid={`discovery-available-cta-${course.slug}`}
          >
            {course.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  )
}

function FullCourseCard({ course }: { course: FullCourseCatalogItem }) {
  return (
    <article className={CARD_SHELL} data-testid={`discovery-full-course-${course.slug}`}>
      <Link to={course.route} className="relative block aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 opacity-95" aria-hidden />
        <span className="absolute left-4 top-4 inline-flex rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-zinc-900 shadow-sm">
          {course.publicLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="text-[17px] font-bold leading-snug text-zinc-900">
          <Link to={course.route} className="transition hover:text-orange-600">
            {course.title}
          </Link>
        </h3>
        <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">{course.descriptionLearner}</p>
        <div className="mt-auto pt-6">
          <Link
            to={course.route}
            className={`inline-flex min-h-[2.5rem] w-full items-center justify-center rounded-full px-5 text-[13px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
            data-testid={`discovery-available-cta-${course.slug}`}
          >
            {course.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  )
}

export function AvailableLearnHero({
  headingId = 'learn-available-heading',
  isLearnPage = true,
  primaryCtaTestId,
}: {
  headingId?: string
  /** When false (homepage), primary CTA navigates to /learn#available-now */
  isLearnPage?: boolean
  /** Defaults: homepage uses `landing-hero-primary-cta`; /learn uses `learn-hero-browse-available`. */
  primaryCtaTestId?: string
}) {
  const primaryTo = isLearnPage ? '#available-now' : '/learn#available-now'
  const resolvedTestId =
    primaryCtaTestId ?? (isLearnPage ? 'learn-hero-browse-available' : 'landing-hero-primary-cta')
  const primaryCtaClass = `inline-flex min-h-[3rem] items-center gap-2 rounded-full px-8 py-3 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 ${ORANGE_GRADIENT}`
  return (
    <section
      className="relative overflow-hidden border-b border-orange-100/60 bg-gradient-to-b from-orange-50 via-amber-50/80 to-white"
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,146,60,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-1.5 text-[12px] font-semibold text-zinc-700 shadow-sm shadow-orange-500/10 ring-1 ring-orange-100">
            <IconSpark className="text-orange-500" />
            Available now
          </p>
          <h1 id={headingId} className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-[2.65rem] sm:leading-[1.08]">
            Available Courses &amp; Workshops
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-zinc-600 sm:text-lg">
            Start with free learning now. Microlearning helps you quickly build confidence, while full courses provide deeper guided practice
            and practical outputs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {isLearnPage ? (
              <a href={primaryTo} data-testid={resolvedTestId} className={primaryCtaClass}>
                Browse available items
                <IconArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link to={primaryTo} data-testid={resolvedTestId} className={primaryCtaClass}>
                Browse available items
                <IconArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
        <HeroBrowserMockup />
      </div>
    </section>
  )
}

export function AvailableNowSection() {
  const micro = getMicrolearningCatalogItems()
  const full = getFullCourseCatalogItems()
  return (
    <div id="available-now" data-testid="discovery-catalog-available" className="scroll-mt-24">
      <section
        data-testid="discovery-section-free-microlearning"
        className="border-t border-orange-100/60 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        aria-labelledby="free-microlearning-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="free-microlearning-heading" className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Free Microlearning
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-zinc-600">
              Short starter courses and workshops you can complete quickly while building useful skills.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {micro.map((c) => (
              <MicrolearningCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>

      <section
        data-testid="discovery-section-free-full-courses"
        className="border-t border-orange-100/50 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        aria-labelledby="free-full-courses-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="free-full-courses-heading" className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Free Full Courses
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-zinc-600">
              Deeper guided courses with structured lessons, practice, and practical learning outputs.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {full.map((c) => (
              <FullCourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export function AvailableLearningAreasSection() {
  const areas = getLearningAreasSummary()
  return (
    <section
      id="learning-areas"
      className="scroll-mt-24 border-t border-orange-100/50 bg-gradient-to-b from-stone-50/90 to-white px-4 py-14 sm:px-6 lg:px-8"
      aria-labelledby="learning-areas-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2 id="learning-areas-heading" className="text-center text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Learning areas
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-zinc-600">
          Simple themes tied to what you can open from this catalog today. Counts include only items listed above.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {areas.map((a) => (
            <li
              key={a.id}
              className="rounded-2xl border border-stone-200/90 bg-white px-5 py-4 shadow-sm shadow-stone-200/40"
              data-testid={`learning-area-${a.id}`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">{a.title}</p>
              <p className="mt-2 text-[14px] font-semibold text-zinc-900">
                {a.count} {a.count === 1 ? 'course' : 'courses'}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">{a.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Homepage-only preview of the top three available offerings. */
export function HomepageAvailablePreviewSection({
  sectionTestId = 'public-home-available-preview',
}: {
  sectionTestId?: string
}) {
  const preview = getHomepageAvailablePreviewItems()
  return (
    <section
      data-testid={sectionTestId}
      className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-22"
      aria-labelledby="home-available-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="home-available-heading" className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Start with available free learning
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-zinc-600">
            Explore practical Jifunze.ai courses and workshops you can open today.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {preview.map((item) => {
            const key = item.slug
            const headline = item.courseType === 'microlearning' ? item.shortTitle : item.title
            return (
              <article
                key={key}
                className="flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.12)]"
                data-testid={`home-available-preview-${item.slug}`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-700">{item.publicLabel}</p>
                <h3 className="mt-3 text-lg font-bold text-zinc-900">{headline}</h3>
                <div className="mt-auto pt-8">
                  <Link
                    to={item.route}
                    className={`inline-flex min-h-[2.5rem] w-full items-center justify-center rounded-full px-5 text-[13px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                  >
                    {item.ctaLabel}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/learn"
            className="text-[14px] font-semibold text-orange-700 underline-offset-2 hover:text-orange-800 hover:underline"
            data-testid="home-available-see-all"
          >
            See all available courses and workshops
          </Link>
        </div>
      </div>
    </section>
  )
}
