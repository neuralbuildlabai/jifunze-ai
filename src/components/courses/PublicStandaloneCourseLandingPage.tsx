import { Link } from 'react-router-dom'
import type { ExtendedPublicLibraryConfig } from '../../data/learning/extendedPublicLibraryConfigs'
import { firstPublicLessonPreviewLinks, getStandaloneCourseScanStats } from '../../data/learning/standaloneCourseScanStats'
import { STANDALONE_COURSE_DISCOVERY_META } from '../../data/learning/standaloneCourseDiscoveryMeta'
import { paletteForStandaloneCourse } from '../../data/learning/standaloneCoursePalettes'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { PublicStarterLibraryChrome } from '../libraries/PublicStarterLibraryChrome'
import { DiscoveryBadgeChips } from '../learn/DiscoveryBadgeChips'

function commerceHint(cfg: ExtendedPublicLibraryConfig): string {
  if (!cfg.landingPath) return ''
  return 'Commercial posture (public-facing): buy this course alone when one-time checkout exists for your deployment, or choose Monthly / Annual full access designed to include curated standalone courses alongside broader libraries when your subscription tier supports it. Access boundaries on lesson cards still apply (public preview → signed-in → deeper plans where enabled)—materials expand access, not mastery or hiring outcomes.'
}

function discoveryMetaForConfig(cfg: ExtendedPublicLibraryConfig) {
  if (cfg.key in STANDALONE_COURSE_DISCOVERY_META) {
    return STANDALONE_COURSE_DISCOVERY_META[cfg.key as keyof typeof STANDALONE_COURSE_DISCOVERY_META]
  }
  return null
}

export function PublicStandaloneCourseLandingPage({ config }: { config: ExtendedPublicLibraryConfig }) {
  const scan = getStandaloneCourseScanStats(config.curriculum)
  const previews = firstPublicLessonPreviewLinks(config.publicBasePath, config.curriculum, 3)
  const meta = discoveryMetaForConfig(config)

  const curriculumHref = config.publicBasePath
  const palette = paletteForStandaloneCourse(config.key)

  return (
    <PublicStarterLibraryChrome
      eyebrow="Standalone Jifunze course"
      browseHref={curriculumHref}
      browseLabel={config.browseLabel}
      title={config.title}
      description={config.description}
      shellClassName={palette?.shellAccent}
    >
      <TrustBoundaryStrip density="legalLink" variant="inline" compact />

      <section
        aria-labelledby="standalone-depth-heading"
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6"
        data-testid="standalone-course-depth-structure"
      >
        <h2 id="standalone-depth-heading" className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Depth structure
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
          This specialist course follows the same Jifunze depth model: foundations, applied practice, professional execution, and outputs you can reuse—layered
          modules with practice and review, not a thin overview.
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { t: 'Foundations', d: 'Clear teaching, mental models, and common failure modes.' },
            { t: 'Applied practice', d: 'Scenarios, drills, and verification habits for real work.' },
            { t: 'Professional execution', d: 'Workflow fit, handoffs, and disciplined review.' },
            { t: 'Mastery and outputs', d: 'Templates, packs, and capstone artifacts you revise over time.' },
          ].map((stage, idx) => (
            <li key={stage.t} className="rounded-xl border border-white/[0.06] bg-black/15 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Stage {idx + 1} · {stage.t}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">{stage.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {meta ? (
        <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6" data-testid="standalone-course-product-snapshot">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Product snapshot</p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">
                <span className="font-semibold text-zinc-200">Who it&apos;s for:</span> {meta.audience}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <DiscoveryBadgeChips tokens={meta.badges} />
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-zinc-500">
            {scan.moduleCount} modules · {scan.lessonCount} lessons · {scan.publicPreviewLessonCount} free preview lessons (where labeled on the map)
          </p>
        </section>
      ) : null}

      <section
        aria-label="Standalone course purchase and subscription inclusion"
        className="rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.06] p-5 sm:p-6"
        data-testid="standalone-course-subscription-inclusion"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200/75">Included in subscription (positioning)</p>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-200">
          Monthly / Annual full access is designed to include curated standalone courses alongside broader flagship libraries when your subscription
          tier supports it—final entitlements follow checkout and account state.
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">
          Prefer a single product? When one-time course checkout exists for your deployment, you can purchase just this course instead of
          subscribing—lesson access labels still describe what reads publicly versus deeper layers.
        </p>
      </section>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 sm:p-6">
        <p className="text-[13px] leading-relaxed text-zinc-300">{config.subtitle}</p>
        <p className="mt-4 text-[12px] leading-relaxed text-zinc-600">
          {LEARNER_MONETIZATION_UI_DISABLED
            ? 'Public checkout is not active in this release—use the curriculum map and labeled previews below.'
            : commerceHint(config)}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to={curriculumHref}
            className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
            data-testid="standalone-course-primary-curriculum"
          >
            Open full curriculum map
          </Link>
          <Link
            to={LEGAL_ROUTES.learn}
            className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-violet-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Browse courses hub
          </Link>
          {LEARNER_MONETIZATION_UI_DISABLED ? null : (
            <Link
              to={LEGAL_ROUTES.pricing}
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
              data-testid="standalone-course-secondary-plans"
            >
              Simple plans
            </Link>
          )}
          <Link
            to="/library"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Workspace library overview
          </Link>
        </div>
      </div>

      {previews.length ? (
        <section className="rounded-2xl border border-white/[0.06] bg-black/20 p-5 sm:p-6" data-testid="standalone-course-free-previews">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Free lesson previews</p>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
            Start with labeled public-preview lessons—then continue based on access tiers shown on each lesson card.
          </p>
          <ul className="mt-4 space-y-2">
            {previews.map((p) => (
              <li key={p.href}>
                <Link className="text-[13px] font-semibold text-violet-300/95 hover:text-violet-200" to={p.href}>
                  Preview: {p.title} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.06] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200/75">Course structure</p>
          <p className="mt-2 text-2xl font-semibold text-white">{scan.moduleCount}</p>
          <p className="mt-1 text-[12px] leading-relaxed text-zinc-400">modules · {scan.lessonCount} substantive lessons</p>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
            Each lesson includes concept teaching, scenarios, misconception traps, practice checkpoints, and review cues—built for real understanding,
            not titles-only browsing.
          </p>
        </div>
        <div className="rounded-2xl border border-violet-400/15 bg-violet-500/[0.06] p-5 lg:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200/75">Trust positioning</p>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">
            This is assistive learning material: it can strengthen skills and habits, but it does not guarantee mastery, certification, exam results,
            hiring outcomes, or professional qualification. Review AI-assisted drafts carefully—especially facts, numbers, obligations, and anything
            safety- or policy-sensitive.
          </p>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
            <Link className="font-medium text-violet-300/85 underline-offset-2 hover:underline" to={LEGAL_ROUTES.disclaimer}>
              Full disclaimer
            </Link>{' '}
            ·{' '}
            <Link className="font-medium text-violet-300/85 underline-offset-2 hover:underline" to={LEGAL_ROUTES.refunds}>
              Refunds &amp; billing policy
            </Link>
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/[0.06] bg-black/20 p-5 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Module outline</p>
        <ol className="mt-4 space-y-4">
          {config.curriculum.map((cat) => (
            <li key={cat.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Module {cat.order} · {cat.modules[0]?.lessons.length ?? 0} lessons
              </p>
              <p className="mt-2 text-[16px] font-semibold text-white">{cat.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">{cat.summary}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[12px] leading-relaxed text-zinc-600">
          Lesson access tiers are labeled on the curriculum map (public preview → signed-in continuation → deeper materials where eligible plans apply).
          Start reading where your account allows—then tighten verification discipline as stakes rise.
        </p>
      </section>
    </PublicStarterLibraryChrome>
  )
}
