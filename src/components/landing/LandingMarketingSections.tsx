import { Link } from 'react-router-dom'
import { LEARNING_DISCOVERY_CATEGORIES } from '../../data/learning/learningDiscoveryCatalog'
import { FLAGSHIP_COURSES } from '../../data/learning/flagshipCoursesCatalog'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { FlagshipCourseCard } from '../learn/FlagshipCourseCard'

function truncateIntro(text: string, max = 140): string {
  const t = text.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max).trim()}…`
}

/**
 * Homepage: flagship depth story, featured paths, catalog entry, teaching model, outputs, topic browse, pricing.
 */
export function LandingMarketingSections() {
  const featuredCourses = FLAGSHIP_COURSES.filter((c) => c.featured)

  return (
    <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20" data-testid="landing-marketing-slim">
      {/* Featured flagship paths — eight strongest tracks */}
      <section
        id="featured-courses"
        aria-labelledby="landing-featured-heading"
        className="scroll-mt-28"
        data-testid="landing-featured-flagship"
      >
        <div className="mx-auto max-w-6xl px-1 sm:px-0">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Flagship paths</p>
            <h2
              id="landing-featured-heading"
              className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[1.75rem] sm:leading-snug"
            >
              Deep tracks, not shallow tutorials
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
              Eight curated mastery paths across AI fluency, growth, business judgment, data literacy, career craft, communication, and leadership—each built as
              layered progression with practice and outputs.
            </p>
          </header>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredCourses.map((course) => (
              <FlagshipCourseCard key={course.slug} course={course} testId={`landing-featured-${course.slug}`} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to={LEGAL_ROUTES.learn}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/[0.12] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="landing-catalog-see-all"
            >
              See all 15 paths in the catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Full catalog invitation */}
      <section
        aria-labelledby="landing-catalog-invite-heading"
        className="mx-auto max-w-6xl scroll-mt-28 rounded-[2rem] border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-6 py-12 shadow-[var(--jf-shadow-soft)] ring-1 ring-white/[0.03] sm:px-12 sm:py-14"
        data-testid="landing-catalog-cta"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="landing-catalog-invite-heading" className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-2xl">
            Flagship learning paths built for depth
          </h2>
          <p className="mx-auto mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Explore 15 deep courses across AI, digital fluency, business, career growth, communication, leadership, and learning systems — all designed to move
            learners from understanding into practice, execution, and real output creation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={LEGAL_ROUTES.learn}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-8 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="landing-browse-courses-cta"
            >
              Open the full catalog
            </Link>
            <Link
              to={LEGAL_ROUTES.pricing}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/[0.1] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:border-white/[0.14] hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="landing-catalog-pricing"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </section>

      {/* Depth promise */}
      <section
        aria-labelledby="landing-depth-heading"
        className="scroll-mt-28 border-y border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] py-12 shadow-[var(--jf-shadow-soft)] ring-1 ring-white/[0.025] sm:py-14"
        data-testid="landing-depth-promise"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="landing-depth-heading" className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-2xl">
              Built for depth, not quick overviews
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
              Every Jifunze course is structured as a serious learning path — from foundations and guided practice to professional execution, revision, and real
              output creation.
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Foundations', d: 'Conceptual clarity you can reuse—not one-off definitions.' },
              { t: 'Applied practice', d: 'Scenarios and drills that reward careful judgment.' },
              { t: 'Professional execution', d: 'Workflows and standards that hold up at work.' },
              { t: 'Mastery and outputs', d: 'Artifacts, briefs, and packs built for revision.' },
            ].map((item) => (
              <li
                key={item.t}
                className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-5 py-5 text-left ring-1 ring-black/[0.02]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-muted)]">{item.t}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{item.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How Jifunze teaches */}
      <section aria-labelledby="landing-how-heading" className="mx-auto max-w-6xl scroll-mt-28" data-testid="landing-how-teaches">
        <div className="rounded-[2rem] border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-6 py-11 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="landing-how-heading" className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-2xl">
              A better way to learn deeply
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
              Jifunze is built for learners who want more than fragmented lessons and shallow summaries. Each flagship course combines clear teaching, guided
              progression, practical scenarios, revision support, and useful outputs so learning becomes something you can apply, not just consume.
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
            {[
              'Guided progression from beginner-ready foundations toward advanced execution.',
              'Practice grounded in realistic scenarios—not trivia.',
              'Retention hooks: revision prompts, weak-area follow-up, and packs you can revisit.',
              'Outputs you keep: briefs, plans, rubrics, and blueprints tailored to modern work.',
            ].map((line) => (
              <li key={line} className="flex gap-3 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-4 py-4 text-left">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-muted)]" aria-hidden />
                <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What learners create */}
      <section aria-labelledby="landing-outputs-heading" className="mx-auto max-w-6xl scroll-mt-28" data-testid="landing-learners-create">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="landing-outputs-heading" className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-2xl">
            Learning that turns into real outputs
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Serious paths should leave serious artifacts. Across Jifunze tracks, learners build durable work products—not disposable screen time.
          </p>
        </div>
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {[
            'Reports',
            'Briefs',
            'Study notes',
            'Revision packs',
            'Campaign plans',
            'Business blueprints',
            'Project plans',
            'Product briefs',
            'Dashboards',
            'Facilitation guides',
          ].map((label) => (
            <li
              key={label}
              className="rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-4 py-2 text-[12px] font-medium text-[color:var(--jf-text)] shadow-[var(--jf-shadow-soft)]"
            >
              {label}
            </li>
          ))}
        </ul>
      </section>

      {/* Topic lanes — secondary browse */}
      <section
        id="browse-courses"
        aria-labelledby="browse-courses-heading"
        data-testid="landing-course-discovery"
        className="scroll-mt-28"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Also browse</p>
            <h2 id="browse-courses-heading" className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[1.75rem] sm:leading-snug">
              Explore by topic lane
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
              Curated lanes into libraries and specialist tracks—supporting the flagship paths with focused deep dives where you need them.
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
              data-testid="landing-secondary-hub"
            >
              Learning hub
            </Link>
            <Link
              to={LEGAL_ROUTES.pricing}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/[0.1] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:border-white/[0.14] hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
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

      {/* Pricing entry */}
      <section
        aria-labelledby="landing-pricing-teaser-heading"
        className="mx-auto max-w-6xl rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface-elevated)] px-6 py-8 ring-1 ring-white/[0.04] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-10"
        data-testid="landing-pricing-teaser"
      >
        <div className="max-w-xl">
          <h2 id="landing-pricing-teaser-heading" className="text-lg font-semibold text-[color:var(--jf-text)] sm:text-xl">
            Simple ways to access deep tracks
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            Monthly, annual, single-course, or free tier—pick what matches how you learn. Details and billing notes live on the pricing page.
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
