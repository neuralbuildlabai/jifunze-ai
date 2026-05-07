import { Link, Navigate, useParams } from 'react-router-dom'
import { findStandaloneModule } from '../../data/courses'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'

function formatModuleDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.round((minutes / 60) * 10) / 10
  return `${h} hrs`
}

/**
 * Standalone course module preview — lesson list, lab, quiz metadata, checklist.
 * Full interactive lesson player can replace this route later without changing course data.
 */
export function StandaloneModuleDetailPage() {
  const { standaloneCourseSlug, moduleSlug } = useParams<{
    standaloneCourseSlug: string
    moduleSlug: string
  }>()
  const resolved =
    standaloneCourseSlug && moduleSlug ? findStandaloneModule(standaloneCourseSlug, moduleSlug) : undefined

  if (!resolved) {
    return <Navigate to="/learn" replace />
  }

  const { entry, module } = resolved
  const { source } = entry
  const idx = source.modules.findIndex((m) => m.slug === module.slug)
  const prev = idx > 0 ? source.modules[idx - 1] : null
  const next = idx >= 0 && idx < source.modules.length - 1 ? source.modules[idx + 1] : null
  const base = `/learn/${entry.slug}`
  const modulePath = (slug: string) => `${base}/modules/${slug}`

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6"
      data-testid={`standalone-module-detail-${entry.slug}-${module.slug}`}
    >
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
              Catalog
            </Link>
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to={base}>
              Course overview
            </Link>
            <SignedInPublicLearningActions />
          </div>
        </header>

        <nav className="text-[12px] text-[color:var(--jf-muted)]" aria-label="Breadcrumb">
          <Link to="/learn" className="hover:text-[color:var(--jf-text)]">
            Learn
          </Link>
          <span className="mx-1.5">/</span>
          <Link to={base} className="hover:text-[color:var(--jf-text)]">
            {source.title}
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-[color:var(--jf-text)]">Module {module.moduleNumber}</span>
        </nav>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600">
            Module {module.moduleNumber} of {source.modules.length}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--jf-text)]" data-testid={`standalone-module-title-${module.slug}`}>
            {module.title}
          </h1>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Duration</dt>
              <dd className="mt-1 text-sm font-medium text-[color:var(--jf-text)]">{formatModuleDuration(module.durationMinutes)}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Lessons</dt>
              <dd className="mt-1 text-sm font-medium text-[color:var(--jf-text)]">{module.lessons.length}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Module quiz</dt>
              <dd className="mt-1 text-sm font-medium text-[color:var(--jf-text)]">{module.moduleQuiz.length} questions</dd>
            </div>
          </dl>
          <div className="mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Practice lab</p>
            <p className="mt-1 text-sm text-[color:var(--jf-text)]">{module.practiceLab.title}</p>
            <p className="mt-1 text-[13px] text-[color:var(--jf-muted)]">
              ~{module.practiceLab.durationMinutes} min · {module.practiceLab.scenarios.length} scenario
              {module.practiceLab.scenarios.length === 1 ? '' : 's'}
            </p>
          </div>
        </section>

        {module.safetyNote ? (
          <section
            className="rounded-2xl border border-amber-200/80 bg-amber-50/90 p-6 text-sm leading-relaxed text-amber-950 sm:p-8"
            data-testid={`standalone-module-safety-${module.slug}`}
          >
            <h2 className="text-lg font-semibold text-amber-950">Module safety note</h2>
            <p className="mt-3">{module.safetyNote}</p>
          </section>
        ) : null}

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8">
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Overview</h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--jf-muted)]">{module.overview}</p>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8">
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Learning objectives</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[color:var(--jf-muted)]">
            {module.learningObjectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8" data-testid={`standalone-module-lessons-${module.slug}`}>
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Lessons</h2>
          <ol className="mt-4 space-y-3">
            {module.lessons.map((lesson) => (
              <li
                key={lesson.lessonNumber}
                className="rounded-xl border border-[color:var(--jf-border)] bg-white px-4 py-3 text-sm text-[color:var(--jf-text)]"
              >
                <p className="text-[11px] font-semibold text-orange-600">Lesson {lesson.lessonNumber}</p>
                <p className="mt-1 font-medium">{lesson.title}</p>
                <p className="mt-1 text-[13px] text-[color:var(--jf-muted)]">~{lesson.estimatedMinutes} min · {lesson.learnerGoal}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] sm:p-8">
          <h2 className="text-xl font-semibold text-[color:var(--jf-text)]">Completion checklist</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[color:var(--jf-muted)]">
            {module.completionChecklist.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--jf-border)] pt-8">
          <div className="flex flex-wrap gap-2">
            {prev ? (
              <Link to={modulePath(prev.slug)} className="text-sm font-medium text-orange-700 hover:underline">
                ← {prev.title}
              </Link>
            ) : null}
            {next ? (
              <Link to={modulePath(next.slug)} className="text-sm font-medium text-orange-700 hover:underline">
                {next.title} →
              </Link>
            ) : null}
          </div>
          <Link
            to={base}
            className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
          >
            Back to course
          </Link>
        </div>
      </div>
    </div>
  )
}
