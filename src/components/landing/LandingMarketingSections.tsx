import { Link } from 'react-router-dom'
import { learnerPublicCatalogFlagshipCourses } from '../../data/learning/flagshipLearnerCatalogPolicy'
import { LEGAL_ROUTES } from '../../training/trustCopy'

/**
 * Public homepage: learning platform positioning, one allowlisted course, no catalog wall or monetization.
 */
export function LandingMarketingSections() {
  const courses = learnerPublicCatalogFlagshipCourses()
  const primary = courses[0]

  return (
    <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20" data-testid="landing-marketing-slim">
      <section className="mx-auto max-w-3xl" aria-labelledby="landing-what-learners-do">
        <h2 id="landing-what-learners-do" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-xl">
          What learners do here
        </h2>
        <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-text)]/35" aria-hidden />
            Learn through structured modules
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-text)]/35" aria-hidden />
            Complete checkpoints
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-text)]/35" aria-hidden />
            Build portfolio outputs
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-text)]/35" aria-hidden />
            Finish a capstone
          </li>
        </ul>
      </section>

      <section className="mx-auto max-w-3xl" aria-labelledby="landing-available-heading" data-testid="landing-available-course">
        <h2 id="landing-available-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-xl">
          Available now
        </h2>
        {primary ? (
          <div className="mt-6 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] ring-1 ring-white/[0.03] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">{primary.title}</p>
            <p className="mt-2 text-[15px] font-semibold text-[color:var(--jf-text)]">AI and Digital Fluency — Course 1</p>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
              Build practical AI fluency: prompt clearly, verify outputs, use AI responsibly, and complete a guided capstone workflow.
            </p>
            <p className="mt-4 text-[13px] text-[color:var(--jf-subtle)]">
              16 modules · 32–45 hours · 10 milestones · Portfolio + capstone
            </p>
            <Link
              to={`/learn/courses/${primary.slug}`}
              className="mt-6 inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="landing-browse-courses-cta"
            >
              Open course
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-[14px] text-[color:var(--jf-muted)]">Complete courses will appear here as they are reviewed for learners.</p>
        )}
      </section>

      <section className="mx-auto max-w-3xl border-t border-[color:var(--jf-border)] pt-12" aria-labelledby="landing-model-heading">
        <h2 id="landing-model-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
          Learning model
        </h2>
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-medium text-[color:var(--jf-muted)]">
          <span>Lessons</span>
          <span aria-hidden className="text-[color:var(--jf-subtle)]">
            →
          </span>
          <span>Practice</span>
          <span aria-hidden className="text-[color:var(--jf-subtle)]">
            →
          </span>
          <span>Checkpoints</span>
          <span aria-hidden className="text-[color:var(--jf-subtle)]">
            →
          </span>
          <span>Portfolio</span>
          <span aria-hidden className="text-[color:var(--jf-subtle)]">
            →
          </span>
          <span>Capstone</span>
        </p>
      </section>

      <section className="mx-auto max-w-2xl rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/50 px-5 py-4 text-center sm:px-6">
        <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
          Prefer a direction first?{' '}
          <Link className="font-medium text-[color:var(--jf-text)] underline-offset-2 hover:underline" to={LEGAL_ROUTES.paths}>
            Browse learning pathways
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
