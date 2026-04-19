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
import type { ExtendedPublicLibraryKey } from '../../data/learning/extendedPublicLibraryConfigs'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { DiscoveryBadgeChips } from './DiscoveryBadgeChips'
import { StandaloneCourseDiscoveryCard } from './StandaloneCourseDiscoveryCard'

const ALL_STANDALONE_KEYS: ExtendedPublicLibraryKey[] = [
  'course_chatgpt_everyday',
  'course_prompt_engineering_models',
  'course_gemini_workspace',
  'course_claude_writing',
  'course_agentic_ai_real_work',
]

function SectionHeading(props: { eyebrow: string; title: string; description?: string }) {
  const { eyebrow, title, description } = props
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{eyebrow}</p>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {description ? <p className="max-w-3xl text-[13px] leading-relaxed text-zinc-500">{description}</p> : null}
    </div>
  )
}

export function LearningDiscoveryHubPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-zinc-100">
      <div className="mx-auto w-full max-w-6xl space-y-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" />
          <div className="flex flex-wrap items-center gap-3">
            <Link className="text-xs font-medium text-zinc-400 hover:text-zinc-200" to="/generate">
              Try generation
            </Link>
            <Link className="text-xs font-medium text-violet-300/90 hover:text-violet-200" to="/">
              Home
            </Link>
            <Link className="text-xs font-medium text-zinc-500 hover:text-zinc-200" to={LEGAL_ROUTES.pricing}>
              Plans
            </Link>
          </div>
        </header>

        <div data-testid="learning-discovery-hub">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Learn</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Browse courses first—like a marketplace for skills</h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-400">
            Pick a lane by topic, compare standalone courses, then decide how you want to pay. Subscription and one-time purchases stay simple and
            secondary to finding the right course.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {LEARNING_DISCOVERY_CATEGORIES.map((c) => (
              <Link
                key={`shortcut-${c.slug}`}
                to={`/learn/category/${c.slug}`}
                className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-zinc-200 transition hover:border-white/15 hover:bg-white/[0.06]"
                data-testid={`discovery-topic-shortcut-${c.slug}`}
              >
                {c.eyebrow}
              </Link>
            ))}
          </div>
        </div>

        <TrustBoundaryStrip density="legalLink" variant="inline" compact dataTestId="learning-discovery-trust-boundary" />

        <section className="space-y-5" data-testid="discovery-section-editors-picks">
          <SectionHeading
            eyebrow="Editorial picks"
            title="Featured courses"
            description="Curated highlights chosen for clarity and usefulness—not “ratings,” because Jifunze doesn’t surface fake review scores."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {DISCOVERY_EDITORS_PICKS.map((key) => (
              <StandaloneCourseDiscoveryCard key={key} libraryKey={key} testId={`discovery-editors-pick-${key}`} />
            ))}
          </div>
        </section>

        <section className="space-y-5" data-testid="discovery-section-trending">
          <SectionHeading
            eyebrow="Popular right now"
            title="Trending courses"
            description="Editorial “Popular” signals what learners are opening frequently—it's not a marketplace popularity contest."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {DISCOVERY_TRENDING_EDITORIAL.map((key) => (
              <StandaloneCourseDiscoveryCard key={key} libraryKey={key} testId={`discovery-trending-${key}`} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6" data-testid="discovery-section-beginner">
            <SectionHeading
              eyebrow="Beginner-friendly"
              title="Lower-friction entry lanes"
              description="Good starting points when you want orientation before depth."
            />
            <div className="grid gap-4">
              {DISCOVERY_BEGINNER_FRIENDLY.map((key) => (
                <StandaloneCourseDiscoveryCard key={key} libraryKey={key} testId={`discovery-beginner-${key}`} />
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6" data-testid="discovery-section-practical-deeper">
            <SectionHeading
              eyebrow="Practical / deeper"
              title="Workflow realism and advanced lanes"
              description="For practitioners ready to compare tools, tighten discipline, or operationalize agents."
            />
            <div className="grid gap-4">
              {DISCOVERY_PRACTICAL_DEEPER.map((key) => (
                <StandaloneCourseDiscoveryCard key={key} libraryKey={key} testId={`discovery-deeper-${key}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6" data-testid="discovery-section-course-index">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Catalog"
              title="Full course index"
              description="Quick links to every standalone product—avoid repeating full cards above."
            />
            <Link
              to={LEGAL_ROUTES.pricing}
              className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[12px] font-semibold text-zinc-100 transition hover:border-violet-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
              data-testid="discovery-plans-secondary"
            >
              Compare plans (secondary)
            </Link>
          </div>
          <ul className="grid gap-2 md:grid-cols-2">
            {ALL_STANDALONE_KEYS.map((key) => {
              const cfg = EXTENDED_PUBLIC_LIBRARY_CONFIGS[key]
              const landing = cfg.landingPath
              if (!landing) return null
              return (
                <li key={key} className="rounded-xl border border-white/[0.06] bg-[rgba(18,16,26,0.45)] px-4 py-3">
                  <Link className="text-[13px] font-semibold text-zinc-100 hover:text-violet-100" to={landing}>
                    {cfg.title} →
                  </Link>
                  <p className="mt-1 text-[11px] text-zinc-500">Standalone course · browse overview + curriculum map</p>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="space-y-5">
          <SectionHeading
            eyebrow="Categories"
            title="Browse by topic"
            description="Each category page is a real browse surface: featured courses, libraries, FAQs, and preview hooks."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {LEARNING_DISCOVERY_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/learn/category/${cat.slug}`}
                className="group rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.45)] p-5 transition hover:border-violet-400/25 hover:bg-[rgba(22,18,32,0.72)]"
                data-testid={`learning-discovery-category-card-${cat.slug}`}
              >
                <DiscoveryBadgeChips tokens={CATEGORY_BROWSE_BADGES[cat.slug]} max={3} testId={`discovery-category-badges-${cat.slug}`} />
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{cat.eyebrow}</p>
                <p className="mt-2 text-[16px] font-semibold text-white group-hover:text-violet-100">{cat.title}</p>
                <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-zinc-400">{cat.intro}</p>
                <p className="mt-4 text-[12px] font-semibold text-violet-300/90 group-hover:text-violet-200">Browse category →</p>
              </Link>
            ))}
          </div>
        </section>

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
