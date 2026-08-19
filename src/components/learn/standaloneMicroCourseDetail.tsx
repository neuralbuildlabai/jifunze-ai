import { Link } from 'react-router-dom'
import {
  BUSINESS_PROCESS_AUTOMATION_SLUG,
  getStandaloneCertificatePath,
  getStandaloneFirstLessonPath,
} from '../../data/courses'
import type { PracticalMathematicsCourse } from '../../data/courses/practicalMathematicsCourseTypes'
import type { StandaloneCatalogEntry } from '../../data/courses/standaloneCoursesCatalog'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'
import { SlidePreviewGrid } from './StandaloneVisualBlocks'
import { BpaNarratedCourseOverview } from './BpaNarratedCourseOverview'

/**
 * Course overview layout for `productTier: professional_micro` standalone courses.
 */
export function StandaloneMicroCourseDetailView({ entry }: { entry: StandaloneCatalogEntry }) {
  const { source } = entry
  const micro = source.microWorkshopDetail
  if (!micro) return null

  if (entry.slug === BUSINESS_PROCESS_AUTOMATION_SLUG) {
    return <BpaNarratedCourseOverview entry={entry} />
  }

  const startHref =
    getStandaloneFirstLessonPath(entry.slug, source as PracticalMathematicsCourse) ?? `/learn/${entry.slug}`
  const certificateHref = getStandaloneCertificatePath(entry.slug)

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6"
      data-testid={`standalone-course-detail-${entry.slug}`}
    >
      <div className="mx-auto w-full max-w-3xl space-y-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="md" surface="light" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
              Catalog
            </Link>
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to="/learn#new-free-courses">
              Workshops
            </Link>
            <SignedInPublicLearningActions />
          </div>
        </header>

        <section className="jf-learn-section-blush rounded-2xl border border-orange-100/70 p-6 sm:p-8" data-testid={`standalone-course-hero-${entry.slug}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">
            Professional micro-course · {source.school}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2rem]">{source.title}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{micro.cardSubtitle}</p>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[14px] text-[color:var(--jf-text)]">
            <span className="text-[color:var(--jf-muted)]">{source.level}</span>
            <span className="text-[color:var(--jf-border)]" aria-hidden>
              ·
            </span>
            <span>{entry.durationLabel ?? `${source.estimatedHours} hours estimated`}</span>
            <span className="text-[color:var(--jf-border)]" aria-hidden>
              ·
            </span>
            <span>{source.format}</span>
            <span className="text-[color:var(--jf-border)]" aria-hidden>
              ·
            </span>
            <span className="font-semibold text-orange-600" data-testid={`standalone-course-access-label-${entry.slug}`}>
              {source.accessLabel}
            </span>
          </p>
          <p className="mt-2 text-[13px] text-[color:var(--jf-muted)]">{micro.cardMeta}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {micro.cardTags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-orange-100 bg-white/90 px-3 py-1 text-[11px] font-semibold text-orange-900"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={startHref}
              className={`inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
              data-testid={`standalone-course-start-${entry.slug}`}
            >
              Start course
            </Link>
            {source.downloadableResources?.map((r) => (
              <a
                key={r.href}
                href={r.href}
                download
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-[15px] font-semibold text-zinc-800 shadow-sm transition hover:bg-stone-50"
              >
                {r.label}
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">What you will learn</h2>
          <ul className="mt-4 space-y-2.5 text-[14px] leading-snug text-[color:var(--jf-muted)]">
            {source.learningOutcomes.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Who this is for</h2>
          <ul className="mt-4 space-y-2 text-[14px] text-[color:var(--jf-muted)]">
            {micro.whoThisIsFor.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-orange-600" aria-hidden>
                  →
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-100/90 bg-emerald-50/40 p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-emerald-950">Case study: {micro.caseStudy.headline}</h2>
          <p className="mt-2 text-[13px] font-medium text-emerald-950/90">{micro.caseStudy.businessType}</p>
          <p className="mt-4 text-[14px] leading-relaxed text-emerald-950/90">{micro.caseStudy.centralProblem}</p>
          <p className="mt-4 text-[14px] leading-relaxed text-emerald-950/90">{micro.caseStudy.diagnosisFraming}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-[12px] font-semibold uppercase tracking-wide text-emerald-900/80">Revenue streams</h3>
              <ul className="mt-2 space-y-1 text-[13px] text-emerald-950/90">
                {micro.caseStudy.revenueStreams.map((x) => (
                  <li key={x}>· {x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[12px] font-semibold uppercase tracking-wide text-emerald-900/80">Sales channels</h3>
              <ul className="mt-2 space-y-1 text-[13px] text-emerald-950/90">
                {micro.caseStudy.salesChannels.map((x) => (
                  <li key={x}>· {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {micro.slidePreviewCards?.length ? (
          <section>
            <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
              Course deck — module by module
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
              Each module maps to a section of the professional slide deck. The deck includes workflow maps, data tables,
              charts, and decision frameworks.
            </p>
            <div className="mt-5">
              <SlidePreviewGrid cards={micro.slidePreviewCards} />
            </div>
          </section>
        ) : null}

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">What the course covers</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            {source.modules.length} modules aligned to the professional slide deck — from foundations through {micro.caseStudy.headline} case analysis and an executive-style recommendation.
          </p>
          <ol className="mt-6 space-y-3">
            {source.modules.map((m) => (
              <li
                key={m.slug}
                className="rounded-xl border border-stone-200/90 bg-white px-4 py-4 shadow-sm"
                data-testid={`standalone-course-module-${entry.slug}-${m.slug}`}
              >
                <p className="text-[11px] font-medium uppercase tracking-wide text-orange-700">Module {m.moduleNumber}</p>
                <Link to={`/learn/${entry.slug}/modules/${m.slug}`} className="mt-0.5 block text-[16px] font-semibold text-zinc-900 hover:text-orange-700">
                  {m.title}
                </Link>
                <p className="mt-2 text-[13px] leading-snug text-stone-600">{m.overview}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Analytics methods included</h2>
          <ul className="mt-4 grid gap-2 text-[14px] text-[color:var(--jf-muted)] sm:grid-cols-2">
            {micro.analyticsMethods.map((m) => (
              <li key={m} className="flex gap-2">
                <span className="text-orange-600" aria-hidden>
                  ✓
                </span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-orange-100/80 bg-gradient-to-b from-orange-50/50 to-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Learner practice</h2>
          <p className="mt-2 text-[15px] font-semibold text-zinc-900">{micro.learnerPractice.title}</p>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{micro.learnerPractice.prompt}</p>
          <p className="mt-4 text-[12px] font-semibold uppercase tracking-wide text-stone-500">Portfolio artifact</p>
          <p className="mt-1 text-[14px] font-medium text-zinc-900">{micro.learnerPractice.artifactTitle}</p>
          <ul className="mt-4 space-y-1.5 text-[13px] text-[color:var(--jf-muted)]">
            {micro.learnerPractice.metricsChecklist.map((x) => (
              <li key={x}>· {x}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Quiz &amp; completion</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{micro.quizSummary}</p>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{source.completionRequirements.rule}</p>
          <p className="mt-4 text-[13px] text-[color:var(--jf-muted)]">{source.completionRequirements.passThreshold}</p>
          <p className="mt-6">
            <Link to={certificateHref} className="font-semibold text-orange-700 hover:underline" data-testid={`standalone-course-certificate-link-${entry.slug}`}>
              Certificate of Completion
            </Link>
            <span className="text-[color:var(--jf-muted)]"> — printable when you meet the requirements above.</span>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Visuals in the slide deck</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            The downloadable PowerPoint includes professional visuals such as:
          </p>
          <ul className="mt-4 space-y-1.5 text-[14px] text-[color:var(--jf-muted)]">
            {micro.visualsInDeck.map((v) => (
              <li key={v}>· {v}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Downloadable resources</h2>
          <ul className="mt-4 space-y-3">
            {(source.downloadableResources ?? []).map((r) => (
              <li key={r.href}>
                <a href={r.href} download className="font-semibold text-orange-700 hover:underline">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Suggested next courses</h2>
          <ul className="mt-4 space-y-4">
            {micro.suggestedNextCourses.map((c) => (
              <li key={c.href} className="rounded-xl border border-stone-200/90 bg-white p-4 shadow-sm">
                <Link to={c.href} className="text-[16px] font-semibold text-zinc-900 hover:text-orange-700">
                  {c.title}
                </Link>
                {c.subtitle ? <p className="mt-2 text-[13px] text-stone-600">{c.subtitle}</p> : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-7" data-testid={`standalone-course-disclaimer-${entry.slug}`}>
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Safety &amp; scope</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{source.safetyDisclaimer}</p>
          <p className="mt-5 text-[12px] leading-relaxed text-[color:var(--jf-muted)]">{source.assessmentApproach}</p>
        </section>

        <section className="rounded-2xl border border-orange-100/80 bg-gradient-to-b from-orange-50/50 to-white p-6 sm:p-8" data-testid={`standalone-course-capstone-final-${entry.slug}`}>
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Roadmap after this workshop</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            Use flagship Jifunze paths to deepen spreadsheet modeling, financial judgment, and data storytelling. This micro-course is
            intentionally short: it installs a professional diagnosis habit you can reuse weekly.
          </p>
          <p className="mt-4 text-[14px] font-medium text-[color:var(--jf-text)]">{source.capstoneDescription}</p>
        </section>

        <div className="flex flex-wrap justify-center gap-3 pb-10">
          <Link to="/learn" className="text-sm font-medium text-orange-700 hover:underline">
            ← Back to catalog
          </Link>
        </div>
      </div>
    </div>
  )
}
