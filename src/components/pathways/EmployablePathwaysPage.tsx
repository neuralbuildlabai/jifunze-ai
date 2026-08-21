import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { EMPLOYABLE_PATHWAYS, featuredEmployablePathways } from '../../data/learning/employablePathwaysCatalog'
import { LEGAL_ROUTES } from '../../shared/legalRoutes'
import { LearnHeroAbstractFigure } from '../visuals/JifunzeLearnVisuals'
import { EmployablePathwaysPublicNav } from './EmployablePathwaysPublicNav'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import type { EmployablePathway } from '../../data/learning/employablePathwaysCatalog'
import { EmployablePathwayCard } from './EmployablePathwayCard'

const MAX_BROWSE_PATHWAYS = 5

export function EmployablePathwaysPage() {
  const browsePathways = useMemo(() => {
    const featured = featuredEmployablePathways()
    const seen = new Set<string>()
    const out: EmployablePathway[] = []
    for (const p of featured) {
      if (p.status === 'active' && !seen.has(p.slug)) {
        seen.add(p.slug)
        out.push(p)
      }
    }
    for (const p of EMPLOYABLE_PATHWAYS) {
      if (out.length >= MAX_BROWSE_PATHWAYS) break
      if (p.status === 'active' && !seen.has(p.slug)) {
        seen.add(p.slug)
        out.push(p)
      }
    }
    return out.slice(0, MAX_BROWSE_PATHWAYS)
  }, [])

  return (
    <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6">
      <div className="mx-auto max-w-6xl space-y-12 sm:space-y-14">
        <EmployablePathwaysPublicNav />

        <section className="relative overflow-hidden rounded-2xl border border-[color:var(--jf-border)] bg-gradient-to-br from-orange-50/85 via-white to-amber-50/35 p-6 shadow-[var(--jf-shadow-soft)] sm:p-8 lg:p-10">
          <div className="mx-auto grid max-w-4xl items-center gap-8 lg:grid-cols-[1fr_minmax(0,260px)] lg:gap-10">
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Employable pathways</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2.1rem] sm:leading-tight">
                Choose a learning pathway
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
                Pick a direction that fits your goal. You can change it anytime.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
                <Link
                  to={LEGAL_ROUTES.learn}
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
                >
                  Open catalog
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none lg:justify-self-end">
              <LearnHeroAbstractFigure className="h-auto w-full drop-shadow-sm" />
            </div>
          </div>
        </section>

        <section aria-labelledby="pathways-grid-heading" className="scroll-mt-24 space-y-6">
          <h2 id="pathways-grid-heading" className="sr-only">
            Pathways
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {browsePathways.map((p) => (
              <EmployablePathwayCard key={p.slug} pathway={p} compact />
            ))}
          </div>
        </section>

        <footer className="border-t border-[color:var(--jf-border)] pt-8">
          <TrustLegalFooterLinks variant="compact" className="justify-center text-[color:var(--jf-subtle)] sm:justify-start" />
        </footer>
      </div>
    </div>
  )
}
