import { Link } from 'react-router-dom'
import { featuredEmployablePathways } from '../../data/learning/employablePathwaysCatalog'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { EmployablePathwayCard } from './EmployablePathwayCard'

/**
 * Homepage section — pathways before deep catalog marketing.
 */
export function EmployablePathwaysHomeSection() {
  const cards = featuredEmployablePathways().slice(0, 8)

  return (
    <section
      aria-labelledby="employable-pathways-heading"
      className="relative z-10 mx-auto mt-16 max-w-6xl border-t border-[color:var(--jf-border)] pt-14 sm:mt-[4.5rem] sm:pt-16"
      data-testid="home-employable-pathways"
    >
      <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Employable pathways</p>
        <h2 id="employable-pathways-heading" className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[1.75rem]">
          Learn skills. Build proof. Become employable.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)] lg:mx-0">
          Start from a pathway: it sequences flagship courses, shows what is still planned, and highlights portfolio-ready outputs that support certificate
          readiness—without promising placement or external credentials.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
          <Link
            to={LEGAL_ROUTES.paths}
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-7 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
            data-testid="home-pathways-primary-cta"
          >
            Browse pathways
          </Link>
          <Link
            to={LEGAL_ROUTES.learn}
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/[0.1] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-white/[0.05]"
          >
            Explore courses
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {cards.map((p) => (
          <EmployablePathwayCard key={p.slug} pathway={p} compact />
        ))}
      </div>
    </section>
  )
}
