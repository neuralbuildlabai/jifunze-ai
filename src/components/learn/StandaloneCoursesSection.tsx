import { Link } from 'react-router-dom'
import { STANDALONE_LEARNER_CATALOG } from '../../data/courses'
import { FREE_STARTER_RISE_COURSES } from '../../data/learning/freeStarterRiseCoursesCatalog'
import { ORANGE_GRADIENT, IconClock, IconStar, IconUsers } from './discoveryHubSections'

/**
 * Public discovery spotlight for standalone Jifunze courses (e.g., Practical Mathematics).
 *
 * Placed prominently on `/learn` — does not use or modify flagship catalogs.
 */

const STANDALONE_CARD_CHROME: Record<
  string,
  { badge: string; badgeClass: string; bannerClass: string; learners: string; rating: string }
> = {
  'business-analytics-decision-making': {
    badge: 'Professional micro-course',
    badgeClass: 'bg-emerald-700 text-white',
    bannerClass: 'from-emerald-700 via-teal-600 to-slate-800',
    learners: 'Open to all',
    rating: '5.0',
  },
  'practical-mathematics-life-work-business': {
    badge: 'New · Free',
    badgeClass: 'bg-orange-600 text-white',
    bannerClass: 'from-amber-500 via-orange-500 to-rose-500',
    learners: 'Open to all',
    rating: '5.0',
  },
}

const FREE_STARTER_CARD_CHROME: Record<
  string,
  { badge: string; badgeClass: string; bannerClass: string; learners: string; rating: string }
> = {
  'ai-at-work-chatgpt': {
    badge: 'Free Starter Course',
    badgeClass: 'bg-sky-700 text-white',
    bannerClass: 'from-sky-600 via-cyan-600 to-indigo-900',
    learners: 'Open to all',
    rating: '5.0',
  },
  'smart-workflows-with-ai': {
    badge: 'Free Starter Workshop',
    badgeClass: 'bg-violet-700 text-white',
    bannerClass: 'from-violet-600 via-fuchsia-600 to-indigo-900',
    learners: 'Open to all',
    rating: '5.0',
  },
}

export function StandaloneCoursesSection({
  sectionTestId = 'discovery-section-standalone-catalog',
  cardTestIdPrefix = 'discovery-standalone',
}: {
  sectionTestId?: string
  cardTestIdPrefix?: string
}) {
  const standaloneCount = STANDALONE_LEARNER_CATALOG.length
  const freeStarterCount = FREE_STARTER_RISE_COURSES.length
  if (standaloneCount === 0 && freeStarterCount === 0) return null

  return (
    <section
      id="new-free-courses"
      data-testid={sectionTestId}
      className="jf-learn-section-blush scroll-mt-24 border-t border-orange-100/60 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      aria-labelledby="new-free-courses-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">Career &amp; Practical Skills</p>
          <h2 id="new-free-courses-heading" className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Professional workshops &amp; standalone courses
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-zinc-600">
            Premium short workshops alongside deeper standalone paths—structured practice, serious cases, and free access without paywall
            language on these catalog items today.
          </p>
          {freeStarterCount > 0 ? (
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">
              Free interactive starter courses are included here for learners who want a guided, click-through experience.
            </p>
          ) : null}
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {FREE_STARTER_RISE_COURSES.map((entry) => {
            const chrome = FREE_STARTER_CARD_CHROME[entry.slug] ?? {
              badge: entry.label,
              badgeClass: 'bg-sky-700 text-white',
              bannerClass: 'from-sky-500 via-cyan-600 to-indigo-900',
              learners: 'Open to all',
              rating: '5.0',
            }
            const duration = `${entry.durationLabel} · ${entry.learnerDisplayFormat}`
            return (
              <article
                key={entry.slug}
                data-testid={`discovery-free-starter-${entry.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-orange-100/80 bg-white shadow-[0_22px_50px_-20px_rgba(120,53,15,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_50px_-22px_rgba(251,146,60,0.22)]"
              >
                <Link
                  to={entry.publicRoute}
                  className="relative block aspect-[16/10] overflow-hidden"
                  data-testid={`discovery-free-starter-${entry.slug}-banner-link`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${chrome.bannerClass} opacity-95`} aria-hidden />
                  <span
                    className={`absolute left-4 top-4 inline-flex rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm ${chrome.badgeClass}`}
                  >
                    {chrome.badge}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <h3 className="text-[17px] font-bold leading-snug text-zinc-900">
                    <Link
                      to={entry.publicRoute}
                      className="transition hover:text-orange-600"
                      data-testid={`discovery-free-starter-${entry.slug}-title-link`}
                    >
                      {entry.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-zinc-600">{entry.subtitle}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] font-medium text-zinc-600">
                    <span className="inline-flex items-center gap-1.5">
                      <IconClock className="text-zinc-400" />
                      {duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <IconUsers className="text-zinc-400" />
                      {chrome.learners}
                    </span>
                  </div>
                  <div className="my-5 h-px bg-orange-100/80" />
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-zinc-800">
                      <IconStar className="text-amber-400" />
                      {chrome.rating} <span className="font-normal text-zinc-500">({chrome.learners})</span>
                    </span>
                    <span className="text-[15px] font-bold text-orange-600">{entry.priceLabel}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      to={entry.publicRoute}
                      className={`inline-flex min-h-[2.5rem] flex-1 items-center justify-center rounded-full px-5 text-[13px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 sm:flex-none ${ORANGE_GRADIENT}`}
                      data-testid={`discovery-free-starter-${entry.slug}-open-course`}
                    >
                      Open course
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
          {STANDALONE_LEARNER_CATALOG.map((entry) => {
            const chrome = STANDALONE_CARD_CHROME[entry.slug] ?? {
              badge: 'Free',
              badgeClass: 'bg-orange-600 text-white',
              bannerClass: 'from-amber-500 via-orange-500 to-rose-500',
              learners: 'Open to all',
              rating: '5.0',
            }
            const moduleCount = entry.source.modules.length
            const duration = entry.durationLabel
              ? `${entry.durationLabel} · ${moduleCount} modules`
              : moduleCount > 0
                ? `${moduleCount} modules · ~${entry.estimatedHours} hours`
                : `~${entry.estimatedHours} hours`
            return (
              <article
                key={entry.slug}
                data-testid={`${cardTestIdPrefix}-${entry.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-orange-100/80 bg-white shadow-[0_22px_50px_-20px_rgba(120,53,15,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_50px_-22px_rgba(251,146,60,0.22)]"
              >
                <Link
                  to={entry.publicRoute}
                  className="relative block aspect-[16/10] overflow-hidden"
                  data-testid={`${cardTestIdPrefix}-${entry.slug}-banner-link`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${chrome.bannerClass} opacity-95`} aria-hidden />
                  <span
                    className={`absolute left-4 top-4 inline-flex rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm ${chrome.badgeClass}`}
                  >
                    {chrome.badge}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <h3 className="text-[17px] font-bold leading-snug text-zinc-900">
                    <Link
                      to={entry.publicRoute}
                      className="transition hover:text-orange-600"
                      data-testid={`${cardTestIdPrefix}-${entry.slug}-title-link`}
                    >
                      {entry.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">{entry.subtitle}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] font-medium text-zinc-600">
                    <span className="inline-flex items-center gap-1.5">
                      <IconClock className="text-zinc-400" />
                      {duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <IconUsers className="text-zinc-400" />
                      {chrome.learners}
                    </span>
                  </div>
                  <div className="my-5 h-px bg-orange-100/80" />
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-zinc-800">
                      <IconStar className="text-amber-400" />
                      {chrome.rating} <span className="font-normal text-zinc-500">({chrome.learners})</span>
                    </span>
                    <span className="text-[15px] font-bold text-orange-600">Free</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      to={entry.publicRoute}
                      className={`inline-flex min-h-[2.5rem] flex-1 items-center justify-center rounded-full px-5 text-[13px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 sm:flex-none ${ORANGE_GRADIENT}`}
                      data-testid={`${cardTestIdPrefix}-${entry.slug}-open-course`}
                    >
                      Open course
                    </Link>
                    {entry.source.modules[0]?.slug ? (
                      <Link
                        to={`${entry.publicRoute}/modules/${entry.source.modules[0].slug}`}
                        className="inline-flex min-h-[2.5rem] flex-1 items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-[13px] font-semibold text-zinc-800 transition hover:bg-stone-50 sm:flex-none"
                        data-testid={`${cardTestIdPrefix}-${entry.slug}-start-course`}
                      >
                        Start course
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
