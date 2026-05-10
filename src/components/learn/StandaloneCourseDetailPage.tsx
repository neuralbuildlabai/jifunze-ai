import { Link, Navigate, useParams } from 'react-router-dom'
import {
  findStandaloneCourseBySlug,
  getStandaloneCertificatePath,
  getStandaloneFirstLessonPath,
  type PracticalMathematicsCourse,
} from '../../data/courses'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { formatCourseDurationLabel, formatHoursFromMinutes, truncateWords } from './standaloneCoursePresentation'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'
import { StandaloneMicroCourseDetailView } from './standaloneMicroCourseDetail'

const COURSE_SUCCESS_CHECKLIST = [
  'Complete all 16 modules in order',
  'Study every lesson (mark as studied on each lesson page)',
  'Pass each module quiz at 75% or higher',
  'Keep your overall quiz score at 75% or higher',
  'Finish the practice labs',
  'Review safety and scope notes where they apply',
  'Complete the Module 16 capstone artifact and mark it complete on the Module 16 page',
  'Unlock the printable Certificate of Completion (free)',
  'Reflect where a licensed professional should verify your numbers before you act',
] as const

const FINAL_COMPLETION_REMINDERS = [
  'Meet the 75% pass threshold on every module quiz before moving on.',
  'Finish the Module 16 capstone and use “Mark capstone complete” on that module when your artifact is ready.',
  'Name assumptions, limits, and what you would still verify with a qualified professional.',
] as const

/**
 * Public detail page for standalone Jifunze courses (e.g., Practical Mathematics).
 */
export function StandaloneCourseDetailPage() {
  const { standaloneCourseSlug } = useParams<{ standaloneCourseSlug: string }>()
  const entry = standaloneCourseSlug ? findStandaloneCourseBySlug(standaloneCourseSlug) : undefined

  if (!entry) {
    return <Navigate to="/learn" replace />
  }

  const { source } = entry

  if (source.productTier === 'professional_micro') {
    return <StandaloneMicroCourseDetailView entry={entry} />
  }

  const firstModuleSlug = source.modules[0]?.slug
  const startHref =
    getStandaloneFirstLessonPath(entry.slug, source as PracticalMathematicsCourse) ??
    (firstModuleSlug ? `/learn/${entry.slug}/modules/${firstModuleSlug}` : `/learn/${entry.slug}`)
  const certificateHref = getStandaloneCertificatePath(entry.slug)

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6"
      data-testid={`standalone-course-detail-${entry.slug}`}
    >
      <div className="mx-auto w-full max-w-3xl space-y-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="md" variant="compact" surface="light" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
              Catalog
            </Link>
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to="/learn#available-now">
              Catalog
            </Link>
            <SignedInPublicLearningActions />
          </div>
        </header>

        {/* A — Hero */}
        <section className="jf-learn-section-blush rounded-2xl border border-orange-100/70 p-6 sm:p-8" data-testid={`standalone-course-hero-${entry.slug}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">{source.school}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2rem]">{source.title}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{entry.subtitle}</p>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[14px] text-[color:var(--jf-text)]">
            <span className="text-[color:var(--jf-muted)]">{source.level}</span>
            <span className="text-[color:var(--jf-border)]" aria-hidden>
              ·
            </span>
            <span>{formatCourseDurationLabel(source.estimatedHours)}</span>
            <span className="text-[color:var(--jf-border)]" aria-hidden>
              ·
            </span>
            <span>{source.modules.length} modules</span>
            <span className="text-[color:var(--jf-border)]" aria-hidden>
              ·
            </span>
            <span className="font-semibold text-orange-600" data-testid={`standalone-course-access-label-${entry.slug}`}>
              Free
            </span>
          </p>
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
        </section>

        {/* B — What you will learn */}
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

        {/* C — How this course works + success checklist */}
        <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">How this course works</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{source.completionRequirements.rule}</p>
          <ul className="mt-4 space-y-2 text-[13px] text-[color:var(--jf-muted)]">
            <li>Sequential modules — each unlocks after the prior quiz pass.</li>
            <li>Practice labs reinforce scenarios before the quiz.</li>
            <li>Capstone integrates skills across multiple modules.</li>
            <li>
              <span className="font-medium text-stone-700">Certificate of Completion</span> — free to print when all lessons
              are studied, every module quiz passes at <span className="font-medium text-stone-700">75% or higher</span>, your
              overall quiz average is <span className="font-medium text-stone-700">75% or higher</span>, and the Module 16
              capstone is marked complete.
            </li>
          </ul>
          <p className="mt-4 text-[14px] text-[color:var(--jf-text)]">
            <Link
              to={certificateHref}
              className="font-semibold text-orange-700 hover:underline"
              data-testid={`standalone-course-certificate-link-${entry.slug}`}
            >
              Certificate of Completion
            </Link>
            <span className="text-[color:var(--jf-muted)]"> — locked until you meet completion requirements.</span>
          </p>
          <h3 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-stone-500">How to succeed</h3>
          <ul className="mt-3 space-y-2 text-[14px] text-[color:var(--jf-text)]">
            {COURSE_SUCCESS_CHECKLIST.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-orange-600" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12px] leading-relaxed text-[color:var(--jf-muted)]">
            Quizzes: {source.completionRequirements.passThreshold}
          </p>
        </section>

        {/* D — Modules */}
        <section data-testid={`standalone-course-curriculum-${entry.slug}`}>
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Modules</h2>
          <p className="mt-2 text-[13px] text-[color:var(--jf-muted)]">
            {source.modules.length} modules · each module links to full lessons, the practice lab, and an interactive quiz that
            grades your answers automatically.
          </p>
          <ol className="mt-6 space-y-3">
            {source.modules.map((m) => (
              <li
                key={m.slug}
                className="rounded-xl border border-stone-200/90 bg-white px-4 py-4 shadow-sm"
                data-testid={`standalone-course-module-${entry.slug}-${m.slug}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-orange-700">Module {m.moduleNumber}</p>
                    <Link to={`/learn/${entry.slug}/modules/${m.slug}`} className="mt-0.5 block text-[16px] font-semibold text-zinc-900 hover:text-orange-700">
                      {m.title}
                    </Link>
                    <p className="mt-2 text-[13px] leading-snug text-stone-600">{truncateWords(m.moduleSummary, 28)}</p>
                    <p className="mt-2 text-[12px] text-stone-500">
                      {formatHoursFromMinutes(m.durationMinutes)} · {m.moduleQuiz.length} quiz questions
                    </p>
                  </div>
                  <Link
                    to={`/learn/${entry.slug}/modules/${m.slug}`}
                    className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                  >
                    Open module
                  </Link>
                </div>
                {m.safetyNote ? (
                  <div
                    className="mt-3 border-l-[3px] border-amber-400 bg-amber-50/80 py-2 pl-3 text-[11px] leading-snug text-amber-950"
                    data-testid={`standalone-course-module-safety-${entry.slug}-${m.slug}`}
                  >
                    {m.safetyNote}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        {/* E — Safety & scope */}
        <section className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-7" data-testid={`standalone-course-disclaimer-${entry.slug}`}>
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Safety &amp; scope</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{source.safetyDisclaimer}</p>
          <p className="mt-5 text-[12px] leading-relaxed text-[color:var(--jf-muted)]">{source.assessmentApproach}</p>
        </section>

        {/* F — Capstone & final completion */}
        <section className="rounded-2xl border border-orange-100/80 bg-gradient-to-b from-orange-50/50 to-white p-6 sm:p-8" data-testid={`standalone-course-capstone-final-${entry.slug}`}>
          <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Capstone &amp; finishing</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{source.capstoneDescription}</p>
          <p className="mt-3 text-[14px] font-medium text-[color:var(--jf-text)]">{source.completionRequirements.capstone}</p>
          <h3 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-stone-500">Before you finish</h3>
          <ul className="mt-3 space-y-2 text-[14px] text-[color:var(--jf-text)]">
            {FINAL_COMPLETION_REMINDERS.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-orange-600" aria-hidden>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
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
