import { Link, Navigate, useParams } from 'react-router-dom'
import { findStandaloneCourseBySlug } from '../../data/courses'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'

function formatModuleDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.round((minutes / 60) * 10) / 10
  return `${h} hrs`
}

/**
 * Public detail page for standalone Jifunze courses (e.g., Practical Mathematics).
 *
 * Unknown slugs redirect to `/learn`. Flagship slugs stay on `/learn/courses/:slug`.
 */
export function StandaloneCourseDetailPage() {
  const { standaloneCourseSlug } = useParams<{ standaloneCourseSlug: string }>()
  const entry = standaloneCourseSlug ? findStandaloneCourseBySlug(standaloneCourseSlug) : undefined

  if (!entry) {
    return <Navigate to="/learn" replace />
  }

  const { source } = entry
  const firstModuleSlug = source.modules[0]?.slug
  const startHref = firstModuleSlug ? `/learn/${entry.slug}/modules/${firstModuleSlug}` : `/learn/${entry.slug}`

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6"
      data-testid={`standalone-course-detail-${entry.slug}`}
    >
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
                Catalog
              </Link>
              <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to="/learn#schools">
                Schools
              </Link>
            </div>
            <SignedInPublicLearningActions />
          </div>
        </header>

        <section
          className="jf-learn-section-blush rounded-2xl border border-orange-100/70 p-6 shadow-[var(--jf-shadow-soft)] sm:p-8"
          data-testid={`standalone-course-hero-${entry.slug}`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-600">
            {source.school} · {source.modules.length} modules · Included
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-4xl">{source.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--jf-muted)]">{entry.subtitle}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[color:var(--jf-muted)]">
            Practical math for life, work, business, finance, data, projects, property, healthcare cost understanding, and trade calculations — structured as a
            complete self-paced course.
          </p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Level</dt>
              <dd className="mt-1 text-sm font-medium text-[color:var(--jf-text)]">{source.level}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Estimated duration</dt>
              <dd className="mt-1 text-sm font-medium text-[color:var(--jf-text)]">About {source.estimatedHours} hours</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Access</dt>
              <dd
                className="mt-1 text-sm font-bold text-orange-600"
                data-testid={`standalone-course-access-label-${entry.slug}`}
              >
                Free Access · {entry.accessLabel}
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={startHref}
              className={`inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
              data-testid={`standalone-course-start-${entry.slug}`}
            >
              Start course
            </Link>
            <Link
              to={startHref}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-[15px] font-semibold text-zinc-800 shadow-sm transition hover:bg-stone-50"
            >
              Open Module 1
            </Link>
          </div>
          <p className="mt-4 text-[12px] text-[color:var(--jf-muted)]">
            Starts in module preview — full interactive lesson player may ship in a later release. Your progress model remains sequential with module quizzes.
          </p>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8">
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Course description</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--jf-muted)]">{source.description}</p>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8">
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Learning outcomes</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[color:var(--jf-muted)]">
            {source.learningOutcomes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8">
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Completion requirements</h2>
          <p className="mt-3 text-sm text-[color:var(--jf-muted)]">{source.completionRequirements.rule}</p>
          <p className="mt-2 text-sm text-[color:var(--jf-muted)]">
            <span className="font-semibold text-[color:var(--jf-text)]">Pass threshold:</span> {source.completionRequirements.passThreshold}
          </p>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8">
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Capstone</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--jf-muted)]">{source.capstoneDescription}</p>
          <p className="mt-3 text-sm font-medium text-[color:var(--jf-text)]">{source.completionRequirements.capstone}</p>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8" data-testid={`standalone-course-curriculum-${entry.slug}`}>
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">16-module outline</h2>
          <p className="mt-3 text-sm text-[color:var(--jf-muted)]">
            Each row links to a module preview with lessons, practice lab, quiz count, and completion checklist.{' '}
            <span className="font-semibold text-[color:var(--jf-text)]">{source.modules.length} modules</span> total.
          </p>
          <ol className="mt-6 space-y-4">
            {source.modules.map((m) => (
              <li
                key={m.slug}
                className="rounded-xl border border-[color:var(--jf-border)] bg-white p-4 sm:p-5"
                data-testid={`standalone-course-module-${entry.slug}-${m.slug}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-600">Module {m.moduleNumber}</p>
                    <Link
                      to={`/learn/${entry.slug}/modules/${m.slug}`}
                      className="mt-1 block text-[17px] font-semibold text-[color:var(--jf-text)] hover:text-orange-700"
                    >
                      {m.title}
                    </Link>
                    <p className="mt-2 text-[13px] text-[color:var(--jf-muted)]">
                      {formatModuleDuration(m.durationMinutes)} · {m.lessons.length} lessons · {m.moduleQuiz.length} quiz questions · Practice lab:{' '}
                      {m.practiceLab.title} (~{m.practiceLab.durationMinutes} min)
                    </p>
                  </div>
                  <Link
                    to={`/learn/${entry.slug}/modules/${m.slug}`}
                    className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold text-white shadow-md shadow-orange-500/20 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                  >
                    Open module
                  </Link>
                </div>
                {m.safetyNote ? (
                  <div
                    className="mt-4 rounded-lg border border-amber-200/80 bg-amber-50/90 p-3 text-[12px] leading-relaxed text-amber-950"
                    data-testid={`standalone-course-module-safety-${entry.slug}-${m.slug}`}
                  >
                    <span className="font-semibold">Safety:</span> {m.safetyNote}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <section
          className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8"
          data-testid={`standalone-course-disclaimer-${entry.slug}`}
        >
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Course safety &amp; scope</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--jf-muted)]">{source.safetyDisclaimer}</p>
          <p className="mt-4 text-sm text-[color:var(--jf-muted)]">{source.assessmentApproach}</p>
        </section>

        <div className="flex flex-wrap justify-center gap-3 pb-8">
          <Link
            to={startHref}
            className={`inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
          >
            Start free
          </Link>
          <Link to="/learn" className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-[15px] font-semibold text-zinc-800">
            Back to catalog
          </Link>
        </div>
      </div>
    </div>
  )
}
