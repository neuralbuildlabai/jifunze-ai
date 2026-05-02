import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { EMPLOYABLE_PATHWAYS, featuredEmployablePathways } from '../../data/learning/employablePathwaysCatalog'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { EmployablePathwaysPublicNav } from './EmployablePathwaysPublicNav'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { EmployablePathwayCard } from './EmployablePathwayCard'

const goalBuckets: { label: string; match: (goals: string[]) => boolean }[] = [
  { label: 'Remote & freelance', match: (g) => g.some((x) => /remote|freelance/i.test(x)) },
  { label: 'AI & productivity', match: (g) => g.some((x) => /ai|workflow/i.test(x)) },
  { label: 'Business & data', match: (g) => g.some((x) => /business|data|finance|growth/i.test(x)) },
  { label: 'Leadership & teaching', match: (g) => g.some((x) => /lead|facilitat|team/i.test(x)) },
]

export function EmployablePathwaysPage() {
  const featured = featuredEmployablePathways()
  const featuredSlugs = useMemo(() => new Set(featured.map((p) => p.slug)), [featured])
  const otherPathways = useMemo(
    () => EMPLOYABLE_PATHWAYS.filter((p) => !featuredSlugs.has(p.slug) && p.status === 'active'),
    [featuredSlugs],
  )

  return (
    <div className="jf-public-surface min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6">
      <div className="mx-auto max-w-6xl space-y-12 sm:space-y-14">
        <EmployablePathwaysPublicNav />

        <section className="mx-auto max-w-3xl text-center sm:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-muted)]">Employable pathways</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2.1rem] sm:leading-tight">
            Structured learning. Clear pathways. Evidence you can show.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            A pathway is a curated sequence of flagship courses, portfolio-ready output guidance, and certificate-readiness framing that matches in-app rules—plus
            an honest roadmap for items still in preparation. This is not a job guarantee or external accreditation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
            <a
              href="#pathways-featured"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
            >
              Browse featured pathways
            </a>
            <Link
              to={LEGAL_ROUTES.learn}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-white/[0.06]"
            >
              Open catalog
            </Link>
            {LEARNER_MONETIZATION_UI_DISABLED ? null : (
              <Link
                to={LEGAL_ROUTES.pricing}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-transparent px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
              >
                View plans
              </Link>
            )}
          </div>
        </section>

        <aside className="mx-auto max-w-3xl rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/70 px-5 py-4 text-left sm:px-6">
          <p className="text-[12px] font-semibold text-[color:var(--jf-text)]">What you will see on each pathway</p>
          <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
            Who it is for, what it prepares you for, live courses vs planned additions, portfolio guidance, and certificate readiness framing that matches the
            in-app rules—without treating roadmap courses as finished work.
          </p>
        </aside>

        <section id="pathways-featured" aria-labelledby="pathways-featured-heading" className="scroll-mt-24 space-y-6">
          <div>
            <h2 id="pathways-featured-heading" className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)]">
              Featured pathways
            </h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              Start here—each card opens the full map with CTAs that respect what is live versus planned.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <EmployablePathwayCard key={p.slug} pathway={p} />
            ))}
          </div>
        </section>

        {otherPathways.length ? (
          <section aria-labelledby="pathways-more-heading" className="space-y-6">
            <div>
              <h2 id="pathways-more-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
                More pathways
              </h2>
              <p className="mt-2 max-w-2xl text-[13px] text-[color:var(--jf-muted)]">Same detail pages—grouped here so featured tracks stay easy to scan.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherPathways.map((p) => (
                <EmployablePathwayCard key={p.slug} pathway={p} compact />
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="pathways-goals-heading" className="space-y-4">
          <h2 id="pathways-goals-heading" className="text-lg font-semibold text-[color:var(--jf-text)]">
            Browse by learner goal
          </h2>
          <p className="max-w-2xl text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
            Light grouping only—pathways can span more than one goal. When in doubt, open a pathway detail page.
          </p>
          <div className="flex flex-wrap gap-2">
            {goalBuckets.map((b) => {
              const paths = EMPLOYABLE_PATHWAYS.filter((p) => p.status === 'active' && b.match(p.learnerGoals))
              if (!paths.length) return null
              return (
                <div
                  key={b.label}
                  className="rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 py-1.5 text-[11px] text-[color:var(--jf-muted)]"
                >
                  <span className="font-semibold text-[color:var(--jf-text)]">{b.label}</span>
                  <span className="mx-1.5 text-[color:var(--jf-border)]">·</span>
                  {paths.map((p) => (
                    <Link key={p.slug} className="mr-2 underline-offset-2 hover:underline" to={`/paths/${p.slug}`}>
                      {p.shortTitle}
                    </Link>
                  ))}
                </div>
              )
            })}
          </div>
        </section>

        <footer className="border-t border-[color:var(--jf-border)] pt-8">
          <TrustLegalFooterLinks variant="compact" className="justify-center text-[color:var(--jf-subtle)] sm:justify-start" />
        </footer>
      </div>
    </div>
  )
}
