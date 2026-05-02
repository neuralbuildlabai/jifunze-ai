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
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'

export function LearningDiscoveryHubPage() {
  const catalogCourses = learnerPublicCatalogFlagshipCourses()
  const schoolIds = learnerPublicCatalogSchoolIdsInOrder()
  const showSchoolBrowse = catalogCourses.length > 1

  return (
    <div className="jf-public-surface min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6">
      <div className="mx-auto w-full max-w-3xl space-y-12 sm:space-y-14">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
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
            <SignedInPublicLearningActions />
          </div>
        </header>

        <div data-testid="learning-discovery-hub">
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)]">Available courses</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
            Start with the course currently open for learner review.
          </p>
        </div>

        {showSchoolBrowse ? (
          <section className="space-y-4" data-testid="discovery-school-chooser">
            <h2 className="text-lg font-semibold text-[color:var(--jf-text)]">Browse by school</h2>
            <div className="grid gap-4 sm:grid-cols-2">
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
          <div className="grid gap-5">
            {catalogCourses.map((course) => (
              <FlagshipCourseCard
                key={course.slug}
                course={course}
                testId={`discovery-featured-${course.slug}`}
                maxOutputs={3}
              />
            ))}
          </div>
          <p className="text-[13px] leading-relaxed text-[color:var(--jf-subtle)]">
            More courses will appear here as they are completed and reviewed.
          </p>
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
