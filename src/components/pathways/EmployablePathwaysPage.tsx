import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { EMPLOYABLE_PATHWAYS, featuredEmployablePathways } from '../../data/learning/employablePathwaysCatalog'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { EmployablePathwaysPublicNav } from './EmployablePathwaysPublicNav'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { EmployablePathwayCard } from './EmployablePathwayCard'
import type { EmployablePathway } from '../../data/learning/employablePathwaysCatalog'

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
    <div className="jf-public-surface min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6">
      <div className="mx-auto max-w-6xl space-y-12 sm:space-y-14">
        <EmployablePathwaysPublicNav />

        <section className="mx-auto max-w-3xl text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2.1rem] sm:leading-tight">Choose a learning pathway</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Pick the direction that matches your goal. You can change it later.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Link
              to={LEGAL_ROUTES.learn}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
            >
              Open catalog
            </Link>
          </div>
        </section>

        <section aria-labelledby="pathways-grid-heading" className="scroll-mt-24 space-y-6">
          <h2 id="pathways-grid-heading" className="sr-only">
            Pathways
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {browsePathways.map((p) => (
              <EmployablePathwayCard key={p.slug} pathway={p} presentation="browse" />
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
