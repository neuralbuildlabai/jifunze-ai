import { Link } from 'react-router-dom'
import {
  FLAGSHIP_SCHOOLS,
  type FlagshipSchoolId,
} from '../../data/learning/flagshipCoursesCatalog'
import {
  learnerPublicCatalogCoursesForSchool,
  learnerPublicCatalogFlagshipCourses,
  learnerPublicCatalogSchoolIdsInOrder,
} from '../../data/learning/flagshipLearnerCatalogPolicy'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { FlagshipCourseCard } from './FlagshipCourseCard'

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
  const catalogCourses = learnerPublicCatalogFlagshipCourses()
  const schoolIds = learnerPublicCatalogSchoolIdsInOrder()

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
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]" to="/">
              Home
            </Link>
          </div>
        </header>

        <div data-testid="learning-discovery-hub">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Catalog</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-[color:var(--jf-text)]">
            Structured flagship courses
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Depth-first learning with clear modules, session progress, portfolio-oriented outputs, and reports you can use as evidence—without treating the app as
            a content studio.
          </p>
        </div>

        {schoolIds.length ? (
          <section className="space-y-4" data-testid="discovery-school-chooser">
            <SectionHeading
              eyebrow="Browse"
              title="Browse by school"
              description="Each school opens a focused list of courses that are available in this catalog phase."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {schoolIds.map((schoolId) => {
                const school = FLAGSHIP_SCHOOLS[schoolId as FlagshipSchoolId]
                const count = learnerPublicCatalogCoursesForSchool(schoolId as FlagshipSchoolId).length
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
                      {count} course{count === 1 ? '' : 's'} · Open school →
                    </p>
                  </Link>
                )
              })}
            </div>
          </section>
        ) : null}

        <section className="space-y-6" data-testid="discovery-section-flagship-catalog">
          <SectionHeading
            eyebrow="Available now"
            title="Complete flagship courses"
            description="Only courses that are ready for the full structured learner journey are listed here. Pathways may reference additional courses still in preparation."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {catalogCourses.map((course) => (
              <FlagshipCourseCard
                key={course.slug}
                course={course}
                testId={`discovery-featured-${course.slug}`}
                maxOutputs={3}
              />
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
