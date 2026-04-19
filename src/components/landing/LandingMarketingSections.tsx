import { Link } from 'react-router-dom'
import { LEARNING_DISCOVERY_CATEGORIES } from '../../data/learning/learningDiscoveryCatalog'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'

function truncateIntro(text: string, max = 140): string {
  const t = text.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max).trim()}…`
}

/**
 * Homepage sections after hero: value props, catalog hub, practical outcomes, pricing entry, trust.
 * Composed as a premium learning-platform flow (catalog-first, not tool-demo).
 */
export function LandingMarketingSections() {
  return (
    <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20" data-testid="landing-marketing-slim">
      {/* Why Jifunze — credibility strip */}
      <section
        aria-labelledby="landing-value-heading"
        className="scroll-mt-28 border-y border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] py-12 shadow-[var(--jf-shadow-soft)] ring-1 ring-white/[0.025] sm:py-14"
        data-testid="landing-value-props"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="landing-value-heading" className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-2xl">
              Built like a training platform—not a one-off AI gimmick
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
              Clear lessons, ordered paths, and space to practice. When you need a draft for social or messaging, optional previews sit alongside your learning—not
              instead of it.
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3 sm:gap-8">
            <li className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-5 py-6 text-center ring-1 ring-white/[0.03]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Structured paths</p>
              <p className="mt-2 text-[15px] font-medium leading-snug text-[color:var(--jf-text)]">Courses you can follow in order</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                Foundations through applied topics—so you build judgment and habits, not isolated tricks.
              </p>
            </li>
            <li className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-5 py-6 text-center ring-1 ring-white/[0.03]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Practice that sticks</p>
              <p className="mt-2 text-[15px] font-medium leading-snug text-[color:var(--jf-text)]">Verify before you rely on outputs</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                Exercises and framing that reinforce checking facts, tone, and fit—especially before anything goes live.
              </p>
            </li>
            <li className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-5 py-6 text-center ring-1 ring-white/[0.03]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Outputs when useful</p>
              <p className="mt-2 text-[15px] font-medium leading-snug text-[color:var(--jf-text)]">Drafts that support real work</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                Optional previews help you move from learning to a starting draft—always edited and approved by you.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Course hub — substantial catalog grid */}
      <section
        id="browse-courses"
        aria-labelledby="browse-courses-heading"
        data-testid="landing-course-discovery"
        className="scroll-mt-28"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Learning library</p>
            <h2 id="browse-courses-heading" className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[1.75rem] sm:leading-snug">
              Explore topics across the catalog
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
              Each lane links to a curated browse path—standalone courses, starter libraries, and deeper tracks where available. Start anywhere; pay only when you
              want full access.
            </p>
          </header>

          <nav className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Learning categories">
            {LEARNING_DISCOVERY_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/learn/category/${cat.slug}`}
                className="group flex flex-col rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] ring-1 ring-white/[0.03] transition-colors duration-200 hover:border-white/[0.12] hover:bg-[color:var(--jf-surface-elevated)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                data-testid={`landing-category-chip-${cat.slug}`}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-muted)]">{cat.eyebrow}</span>
                <span className="mt-2 text-[16px] font-semibold leading-snug text-[color:var(--jf-text)] group-hover:text-[color:var(--jf-text)]">
                  {cat.title}
                </span>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{truncateIntro(cat.intro, 130)}</p>
                <span className="mt-4 text-[13px] font-semibold text-[color:var(--jf-text)]">
                  Browse lane <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to={LEGAL_ROUTES.learn}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-8 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="landing-browse-courses-cta"
            >
              Open the full learning hub
            </Link>
            <Link
              to={LEGAL_ROUTES.pricing}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/[0.1] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:border-white/[0.14] hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="landing-secondary-plans"
            >
              Compare plans
            </Link>
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            <TrustBoundaryStrip
              density="legalLink"
              variant="inline"
              compact
              className="justify-center text-center text-[13px] leading-relaxed text-[color:var(--jf-subtle)]"
              dataTestId="landing-post-hero-trust-line"
            />
          </div>
        </div>
      </section>

      {/* Practical outcomes */}
      <section
        aria-labelledby="landing-outcomes-heading"
        className="mx-auto max-w-6xl rounded-[2rem] border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-6 py-11 shadow-[var(--jf-shadow-soft)] ring-1 ring-white/[0.03] sm:px-10 sm:py-12"
        data-testid="landing-outcomes"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="landing-outcomes-heading" className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-2xl">
            From skills to useful work
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Use Jifunze to learn how AI fits your role, practice judgment on real-style tasks, and—when it helps—generate starting drafts you still own and edit.
            Nothing ships without your review.
          </p>
        </div>
        <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          <li className="flex gap-3 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-4 py-4 text-left">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-muted)]" aria-hidden />
            <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              <span className="font-semibold text-[color:var(--jf-text)]">Learn</span> with structured lessons and clear progression.
            </p>
          </li>
          <li className="flex gap-3 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-4 py-4 text-left">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-muted)]" aria-hidden />
            <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              <span className="font-semibold text-[color:var(--jf-text)]">Practice</span> with exercises that reward careful review.
            </p>
          </li>
          <li className="flex gap-3 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-4 py-4 text-left">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-muted)]" aria-hidden />
            <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              <span className="font-semibold text-[color:var(--jf-text)]">Apply</span> with optional drafts you control end to end.
            </p>
          </li>
        </ul>
      </section>

      {/* Pricing entry */}
      <section
        aria-labelledby="landing-pricing-teaser-heading"
        className="mx-auto max-w-6xl rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface-elevated)] px-6 py-8 ring-1 ring-white/[0.04] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-10"
        data-testid="landing-pricing-teaser"
      >
        <div className="max-w-xl">
          <h2 id="landing-pricing-teaser-heading" className="text-lg font-semibold text-[color:var(--jf-text)] sm:text-xl">
            Simple ways to access the full library
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            Monthly, annual, single-course, or free tier—pick what matches how you learn. See details and billing notes on the pricing page.
          </p>
        </div>
        <div className="mt-6 flex shrink-0 flex-wrap gap-3 sm:mt-0">
          <Link
            to={LEGAL_ROUTES.pricing}
            className="inline-flex items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
          >
            View pricing
          </Link>
          <Link
            to={LEGAL_ROUTES.learn}
            className="inline-flex items-center justify-center rounded-full border border-white/[0.12] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
          >
            Browse courses first
          </Link>
        </div>
      </section>
    </div>
  )
}
