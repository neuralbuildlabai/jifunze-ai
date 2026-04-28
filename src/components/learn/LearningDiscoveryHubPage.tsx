import { Link } from 'react-router-dom'
import { CATEGORY_BROWSE_BADGES } from '../../data/learning/discoveryBrowseLabels'
import { LEARNING_DISCOVERY_CATEGORIES } from '../../data/learning/learningDiscoveryCatalog'
import { EXTENDED_PUBLIC_LIBRARY_CONFIGS } from '../../data/learning/extendedPublicLibraryConfigs'
import {
  DISCOVERY_BEGINNER_FRIENDLY,
  DISCOVERY_EDITORS_PICKS,
  DISCOVERY_PRACTICAL_DEEPER,
  DISCOVERY_TRENDING_EDITORIAL,
} from '../../data/learning/standaloneCourseDiscoveryMeta'
import {
  FLAGSHIP_COURSES,
  FLAGSHIP_SCHOOLS,
  flagshipCoursesForSchool,
  type FlagshipSchoolId,
} from '../../data/learning/flagshipCoursesCatalog'
import type { ExtendedPublicLibraryKey } from '../../data/learning/extendedPublicLibraryConfigs'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { DiscoveryBadgeChips } from './DiscoveryBadgeChips'
import { StandaloneCourseDiscoveryCard } from './StandaloneCourseDiscoveryCard'
import { FlagshipCourseCard } from './FlagshipCourseCard'

const ALL_STANDALONE_KEYS: ExtendedPublicLibraryKey[] = [
  'course_chatgpt_everyday',
  'course_prompt_engineering_models',
  'course_gemini_workspace',
  'course_claude_writing',
  'course_agentic_ai_real_work',
]

const SCHOOL_ORDER: FlagshipSchoolId[] = ['ai_digital', 'business_growth', 'career_intellect', 'leadership_learning']

function SectionHeading(props: { eyebrow: string; title: string; description?: string }) {
  const { eyebrow, title, description } = props
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--jf-muted)]">{eyebrow}</p>
      <h2 className="text-xl font-semibold tracking-tight text-[color:var(--jf-text)]">{title}</h2>
      {description ? <p className="max-w-3xl text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{description}</p> : null}
    </div>
  )
}

export function LearningDiscoveryHubPage() {
  const featuredFlagship = FLAGSHIP_COURSES.filter((c) => c.featured)

  return (
    <div className="jf-public-surface min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-14 sm:space-y-16">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" />
          <div className="flex flex-wrap items-center gap-3">
            <Link
              className="text-xs font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
              to={LEGAL_ROUTES.paths}
            >
              Pathways
            </Link>
            <Link
              className="text-xs font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
              to="/generate"
            >
              Try generation
            </Link>
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]" to="/">
              Home
            </Link>
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.pricing}>
              Plans
            </Link>
          </div>
        </header>

        <div data-testid="learning-discovery-hub">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Catalog</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-[color:var(--jf-text)]">
            Flagship learning paths built for depth
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Explore 15 deep courses across AI, digital fluency, business, career growth, communication, leadership, and learning systems — all designed to move
            learners from understanding into practice, execution, and real output creation.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {LEARNING_DISCOVERY_CATEGORIES.map((c) => (
              <Link
                key={`shortcut-${c.slug}`}
                to={`/learn/category/${c.slug}`}
                className="inline-flex items-center rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 py-1.5 text-[11px] font-semibold text-[color:var(--jf-text)] shadow-[var(--jf-shadow-soft)] transition hover:bg-[color:var(--jf-surface-elevated)]"
                data-testid={`discovery-topic-shortcut-${c.slug}`}
              >
                {c.eyebrow}
              </Link>
            ))}
          </div>
        </div>

        {/* Entry by school — each school opens its own catalog page */}
        <section className="space-y-4" data-testid="discovery-school-chooser">
          <SectionHeading
            eyebrow="Browse"
            title="Choose a school"
            description="Four flagship schools — open one for the full course list without scrolling through everything at once."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SCHOOL_ORDER.map((schoolId) => {
              const school = FLAGSHIP_SCHOOLS[schoolId]
              const count = flagshipCoursesForSchool(schoolId).length
              return (
                <Link
                  key={schoolId}
                  to={`/learn/school/${schoolId}`}
                  className="flex flex-col rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] ring-1 ring-black/[0.03] transition hover:border-white/[0.12] hover:bg-[color:var(--jf-surface-elevated)]"
                  data-testid={`discovery-school-card-${schoolId}`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--jf-muted)]">{school.shortLabel}</p>
                  <p className="mt-2 text-[15px] font-semibold leading-snug text-[color:var(--jf-text)]">{school.label}</p>
                  <p className="mt-2 flex-1 text-[12px] leading-relaxed text-[color:var(--jf-muted)]">{school.description}</p>
                  <p className="mt-4 text-[12px] font-semibold text-[color:var(--jf-text)]">
                    {count} courses · Open school →
                  </p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Featured flagship — eight curated paths */}
        <section className="space-y-6" data-testid="discovery-section-flagship-featured">
          <SectionHeading
            eyebrow="Featured"
            title="Strongest flagship paths"
            description="Eight curated tracks—each framed as a mastery path with progressive depth, not a shallow intro."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredFlagship.map((course) => (
              <FlagshipCourseCard key={course.slug} course={course} testId={`discovery-featured-${course.slug}`} />
            ))}
          </div>
        </section>

        {/* Flagship catalog — preview + drill-down per school */}
        <section className="space-y-10" data-testid="discovery-section-flagship-catalog">
          <SectionHeading
            eyebrow="Full catalog"
            title="Flagship paths by school"
            description="Preview a couple of courses per school, or open the full school page for the complete list."
          />

          {SCHOOL_ORDER.map((schoolId) => {
            const school = FLAGSHIP_SCHOOLS[schoolId]
            const courses = flagshipCoursesForSchool(schoolId)
            const preview = courses.slice(0, 2)
            return (
              <div key={schoolId} className="scroll-mt-28 space-y-5">
                <div className="flex flex-col gap-4 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-5 py-5 shadow-[var(--jf-shadow-soft)] ring-1 ring-black/[0.03] sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--jf-muted)]">{school.label}</p>
                    <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{school.description}</p>
                  </div>
                  <Link
                    to={`/learn/school/${schoolId}`}
                    className="inline-flex shrink-0 items-center justify-center rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-4 py-2 text-[12px] font-semibold text-[color:var(--jf-text)] transition hover:border-white/[0.14] hover:bg-[color:var(--jf-surface-elevated)]"
                    data-testid={`discovery-school-open-${schoolId}`}
                  >
                    All {courses.length} courses →
                  </Link>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {preview.map((course) => (
                    <FlagshipCourseCard key={course.slug} course={course} testId={`discovery-catalog-${course.slug}`} />
                  ))}
                </div>
                {courses.length > preview.length ? (
                  <p className="text-[12px] text-[color:var(--jf-muted)]">
                    +{courses.length - preview.length} more on the{' '}
                    <Link className="font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline" to={`/learn/school/${schoolId}`}>
                      {school.shortLabel} school page
                    </Link>
                    .
                  </p>
                ) : null}
              </div>
            )
          })}
        </section>

        {/* Specialist tracks — collapsed by default so the flagship + schools entry stays clean */}
        <details className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 sm:p-6 shadow-[var(--jf-shadow-soft)] ring-1 ring-black/[0.03]" data-testid="discovery-section-specialist-standalone">
          <summary className="cursor-pointer list-none text-[15px] font-semibold leading-snug text-[color:var(--jf-text)] [&::-webkit-details-marker]:hidden">
            <span className="mr-2 text-[color:var(--jf-muted)]">▸</span>
            Specialist standalone courses &amp; tool tracks (optional){' '}
            <span className="block pt-2 text-[13px] font-normal leading-relaxed text-[color:var(--jf-muted)]">
              Deep dives beside flagship schools — ChatGPT-style assistants, prompting across models, Gemini in Workspace, Claude writing &amp; research, agentic workflows.
            </span>
          </summary>

          <section className="mt-8 space-y-10">
          <section className="space-y-5" data-testid="discovery-section-editors-picks">
            <SectionHeading eyebrow="Editorial picks" title="Standout specialist courses" />
            <div className="grid gap-4 md:grid-cols-2">
              {DISCOVERY_EDITORS_PICKS.map((key) => (
                <StandaloneCourseDiscoveryCard key={key} libraryKey={key} testId={`discovery-editors-pick-${key}`} tone="light" />
              ))}
            </div>
          </section>

          <section className="space-y-5" data-testid="discovery-section-trending">
            <SectionHeading eyebrow="Popular right now" title="Trending specialist courses" />
            <div className="grid gap-4 md:grid-cols-3">
              {DISCOVERY_TRENDING_EDITORIAL.map((key) => (
                <StandaloneCourseDiscoveryCard key={key} libraryKey={key} testId={`discovery-trending-${key}`} tone="light" />
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 sm:p-6" data-testid="discovery-section-beginner">
              <SectionHeading eyebrow="Beginner-friendly" title="Lower-friction specialist lanes" />
              <div className="grid gap-4">
                {DISCOVERY_BEGINNER_FRIENDLY.map((key) => (
                  <StandaloneCourseDiscoveryCard key={key} libraryKey={key} testId={`discovery-beginner-${key}`} tone="light" />
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 sm:p-6" data-testid="discovery-section-practical-deeper">
              <SectionHeading eyebrow="Practical / deeper" title="Workflow realism and advanced lanes" />
              <div className="grid gap-4">
                {DISCOVERY_PRACTICAL_DEEPER.map((key) => (
                  <StandaloneCourseDiscoveryCard key={key} libraryKey={key} testId={`discovery-deeper-${key}`} tone="light" />
                ))}
              </div>
            </div>
          </section>

        <section className="space-y-4 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] p-5 sm:p-6" data-testid="discovery-section-course-index">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Index"
              title="Specialist course links"
              description="Quick links to every standalone specialist product—curriculum maps and lesson access as labeled."
            />
            <Link
              to={LEGAL_ROUTES.pricing}
              className="inline-flex items-center justify-center rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-4 py-2 text-[12px] font-semibold text-[color:var(--jf-text)] transition hover:border-white/[0.14] hover:bg-[color:var(--jf-surface-elevated)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="discovery-plans-secondary"
            >
              Compare plans
            </Link>
          </div>
          <ul className="grid gap-2 md:grid-cols-2">
            {ALL_STANDALONE_KEYS.map((key) => {
              const cfg = EXTENDED_PUBLIC_LIBRARY_CONFIGS[key]
              const landing = cfg.landingPath
              if (!landing) return null
              return (
                <li key={key} className="rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-4 py-3">
                  <Link className="text-[13px] font-semibold text-[color:var(--jf-text)] hover:underline" to={landing}>
                    {cfg.title} →
                  </Link>
                  <p className="mt-1 text-[11px] text-[color:var(--jf-muted)]">Standalone specialist · overview + curriculum map</p>
                </li>
              )
            })}
          </ul>
        </section>
          </section>
        </details>

        <section className="space-y-5">
          <SectionHeading
            eyebrow="Categories"
            title="Browse by topic"
            description="Topic lanes into libraries, FAQs, and previews—alongside the flagship catalog above."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {LEARNING_DISCOVERY_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/learn/category/${cat.slug}`}
                className="group rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] transition hover:border-white/[0.12] hover:bg-[color:var(--jf-surface-elevated)]"
                data-testid={`learning-discovery-category-card-${cat.slug}`}
              >
                <DiscoveryBadgeChips tokens={CATEGORY_BROWSE_BADGES[cat.slug]} max={3} testId={`discovery-category-badges-${cat.slug}`} />
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">{cat.eyebrow}</p>
                <p className="mt-2 text-[16px] font-semibold text-[color:var(--jf-text)] group-hover:underline">{cat.title}</p>
                <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{cat.intro}</p>
                <p className="mt-4 text-[12px] font-semibold text-[color:var(--jf-text)]">Browse category →</p>
              </Link>
            ))}
          </div>
        </section>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[color:var(--jf-border)] pt-6 text-xs text-[color:var(--jf-muted)]">
          <Link className="transition hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.disclaimer}>
            Disclaimer
          </Link>
          <Link className="transition hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.terms}>
            Terms
          </Link>
          <Link className="transition hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.privacy}>
            Privacy
          </Link>
          <Link className="transition hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.refunds}>
            Refunds
          </Link>
        </nav>
      </div>
    </div>
  )
}
