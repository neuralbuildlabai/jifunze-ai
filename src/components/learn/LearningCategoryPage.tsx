import { Link, Navigate, useParams } from 'react-router-dom'
import { CATEGORY_BROWSE_BADGES } from '../../data/learning/discoveryBrowseLabels'
import { learningDiscoveryCategoryBySlug } from '../../data/learning/learningDiscoveryCatalog'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { DiscoveryBadgeChips } from './DiscoveryBadgeChips'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'

export function LearningCategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = learningDiscoveryCategoryBySlug(slug)

  if (!category) {
    return <Navigate to="/learn" replace />
  }

  const browseBadges = CATEGORY_BROWSE_BADGES[category.slug]

  return (
    <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="md" variant="compact" surface="light" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
                Catalog
              </Link>
              {LEARNER_MONETIZATION_UI_DISABLED ? null : (
                <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.pricing}>
                  Plans
                </Link>
              )}
            </div>
            <SignedInPublicLearningActions />
          </div>
        </header>

        <div data-testid={`learning-discovery-category-${category.slug}`}>
          <DiscoveryBadgeChips tokens={browseBadges} max={4} testId={`category-top-badges-${category.slug}`} />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">{category.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--jf-text)]">{category.title}</h1>
          <p className="mt-3 max-w-3xl text-sm text-[color:var(--jf-muted)]">{category.intro}</p>
        </div>

        {category.learnMoreAbout ? (
          <section
            className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] sm:p-7"
            data-testid={`category-learn-more-${category.slug}`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--jf-muted)]">Learn more about this topic</p>
            <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{category.learnMoreAbout}</p>
          </section>
        ) : null}

        <TrustBoundaryStrip density="legalLink" variant="inline" compact />

        <section
          className="rounded-2xl border border-emerald-200/70 bg-emerald-50/85 p-5 sm:p-7"
          data-testid={`category-access-note-${category.slug}`}
        >
          {LEARNER_MONETIZATION_UI_DISABLED ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-900/80">Learning focus</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                Use the catalog for complete courses and pathways for direction. Topic pages summarize how this track fits structured learning.
              </p>
            </>
          ) : (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-900/80">Subscriptions · claim-safe framing</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{category.subscriptionNote}</p>
            </>
          )}
          {LEARNER_MONETIZATION_UI_DISABLED ? (
            <div className="mt-4 space-y-3">
              <Link
                to="/learn"
                className="inline-flex items-center justify-center rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-4 py-2 text-[12px] font-semibold text-[color:var(--jf-text)] transition hover:bg-stone-50"
              >
                Back to discovery hub
              </Link>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to={LEGAL_ROUTES.pricing}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--jf-brand)] px-4 py-2 text-[12px] font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                data-testid={`category-pricing-cta-${category.slug}`}
              >
                View subscription options
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center justify-center rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-4 py-2 text-[12px] font-semibold text-[color:var(--jf-text)] transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              >
                Back to discovery hub
              </Link>
            </div>
          )}
        </section>

        <section
          className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] sm:p-7"
          data-testid={`category-featured-${category.slug}`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--jf-muted)]">Structured flagship catalog</p>
          <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            Topic pages stay as orientation and FAQ. For session-based flagship courses that are open in this release, use the main{' '}
            <Link className="font-semibold text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
              learning catalog
            </Link>{' '}
            and your pathway view for sequencing.
          </p>
        </section>

        {category.faq?.length ? (
          <section
            className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] p-5 sm:p-7"
            data-testid={`category-faq-${category.slug}`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--jf-muted)]">FAQ</p>
            <h2 className="mt-2 text-lg font-semibold text-[color:var(--jf-text)]">What to expect</h2>
            <div className="mt-5 divide-y divide-[color:var(--jf-border)] border-y border-[color:var(--jf-border)]">
              {category.faq.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="cursor-pointer list-none text-[14px] font-medium text-[color:var(--jf-text)] [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-3">
                      {item.question}
                      <svg
                        aria-hidden
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 shrink-0 text-[color:var(--jf-muted)] transition-transform duration-200 group-open:rotate-180"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.09 1.03l-4.25 4.5a.75.75 0 0 1-1.09 0l-4.25-4.5a.75.75 0 0 1 .02-1.05Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <nav className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[color:var(--jf-border)] pt-6 text-xs text-[color:var(--jf-subtle)]">
          <Link className="hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.disclaimer}>
            Disclaimer
          </Link>
          <Link className="hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.terms}>
            Terms
          </Link>
          <Link className="hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.privacy}>
            Privacy
          </Link>
          <Link className="hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.refunds}>
            Refunds
          </Link>
        </nav>
      </div>
    </div>
  )
}
