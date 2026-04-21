import { Link, Navigate, useParams } from 'react-router-dom'
import {
  FLAGSHIP_SCHOOLS,
  flagshipCoursesForSchool,
  type FlagshipSchoolId,
} from '../../data/learning/flagshipCoursesCatalog'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { FlagshipCourseCard } from './FlagshipCourseCard'

const VALID_SCHOOL_IDS = new Set<string>(Object.keys(FLAGSHIP_SCHOOLS))

export function LearningSchoolCatalogPage() {
  const { schoolId } = useParams<{ schoolId: string }>()
  if (!schoolId || !VALID_SCHOOL_IDS.has(schoolId)) {
    return <Navigate to="/learn" replace />
  }
  const id = schoolId as FlagshipSchoolId
  const school = FLAGSHIP_SCHOOLS[id]
  const courses = flagshipCoursesForSchool(id)

  return (
    <div className="jf-public-surface min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" />
          <nav className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <Link className="text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.learn}>
              ← All schools
            </Link>
            <Link className="text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to="/">
              Home
            </Link>
          </nav>
        </header>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">{school.shortLabel}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-3xl">{school.label}</h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{school.description}</p>
        </div>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <FlagshipCourseCard key={course.slug} course={course} testId={`school-catalog-${course.slug}`} />
          ))}
        </section>
      </div>
    </div>
  )
}
