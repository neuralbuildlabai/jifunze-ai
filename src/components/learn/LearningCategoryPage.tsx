import { Link, Navigate, useParams } from 'react-router-dom'
import { CATEGORY_BROWSE_BADGES } from '../../data/learning/discoveryBrowseLabels'
import { learningDiscoveryCategoryBySlug } from '../../data/learning/learningDiscoveryCatalog'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { DiscoveryBadgeChips } from './DiscoveryBadgeChips'

export function LearningCategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = learningDiscoveryCategoryBySlug(slug)

  if (!category) {
    return <Navigate to="/learn" replace />
  }

  const browseBadges = CATEGORY_BROWSE_BADGES[category.slug]

  return (
    <div className="min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-zinc-100">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" />
          <div className="flex flex-wrap items-center gap-3">
            <Link className="text-xs font-medium text-violet-300/90 hover:text-violet-200" to="/learn">
              Catalog
            </Link>
            {LEARNER_MONETIZATION_UI_DISABLED ? null : (
              <Link className="text-xs font-medium text-zinc-500 hover:text-zinc-200" to={LEGAL_ROUTES.pricing}>
                Plans
              </Link>
            )}
          </div>
        </header>

        <div data-testid={`learning-discovery-category-${category.slug}`}>
          <DiscoveryBadgeChips tokens={browseBadges} max={4} testId={`category-top-badges-${category.slug}`} />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{category.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{category.title}</h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-400">{category.intro}</p>
        </div>

        {category.learnMoreAbout ? (
          <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-7" data-testid={`category-learn-more-${category.slug}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Learn more about this topic</p>
            <p className="mt-3 text-[14px] leading-relaxed text-zinc-300">{category.learnMoreAbout}</p>
          </section>
        ) : null}

        <TrustBoundaryStrip density="legalLink" variant="inline" compact />

        <section className="rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.06] p-5 sm:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200/75">Subscriptions · claim-safe framing</p>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-200">{category.subscriptionNote}</p>
          {LEARNER_MONETIZATION_UI_DISABLED ? (
            <div className="mt-4 space-y-3">
              <p className="text-[12px] leading-relaxed text-zinc-400">
                Public checkout is not active in this release—browse the catalog and pathways while access stays open for review.
              </p>
              <Link
                to="/learn"
                className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[12px] font-semibold text-zinc-100 transition hover:border-emerald-400/25 hover:bg-white/[0.06]"
              >
                Back to discovery hub
              </Link>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to={LEGAL_ROUTES.pricing}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-[12px] font-semibold text-white shadow-lg shadow-emerald-950/25 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/60"
                data-testid={`category-pricing-cta-${category.slug}`}
              >
                View subscription options
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[12px] font-semibold text-zinc-100 transition hover:border-emerald-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/55"
              >
                Back to discovery hub
              </Link>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-7" data-testid={`category-featured-${category.slug}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Structured flagship catalog</p>
          <p className="mt-2 text-[14px] leading-relaxed text-zinc-300">
            Topic pages stay as orientation and FAQ. For session-based flagship courses that are open in this release, use the main{' '}
            <Link className="font-semibold text-violet-300/90 hover:text-violet-200" to="/learn">
              learning catalog
            </Link>{' '}
            and your pathway view for sequencing.
          </p>
        </section>

        {category.faq?.length ? (
          <section className="rounded-2xl border border-white/[0.06] bg-black/20 p-5 sm:p-7" data-testid={`category-faq-${category.slug}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">FAQ</p>
            <h2 className="mt-2 text-lg font-semibold text-white">What to expect</h2>
            <div className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {category.faq.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="cursor-pointer list-none text-[14px] font-medium text-zinc-200 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-3">
                      {item.question}
                      <svg
                        aria-hidden
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.09 1.03l-4.25 4.5a.75.75 0 0 1-1.09 0l-4.25-4.5a.75.75 0 0 1 .02-1.05Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <nav className="flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[0.06] pt-6 text-xs text-zinc-500">
          <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.disclaimer}>
            Disclaimer
          </Link>
          <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.terms}>
            Terms
          </Link>
          <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.privacy}>
            Privacy
          </Link>
          <Link className="hover:text-zinc-300" to={LEGAL_ROUTES.refunds}>
            Refunds
          </Link>
        </nav>
      </div>
    </div>
  )
}
