import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  getStandaloneCertificatePath,
  getStandaloneModulePath,
  getStandaloneQuizPath,
  lessonKey,
} from '../../data/courses'
import type { PracticalMathematicsCourse } from '../../data/courses/practicalMathematicsCourseTypes'
import type { StandaloneCatalogEntry } from '../../data/courses/standaloneCoursesCatalog'
import { useStandaloneCourseProgress } from '../../hooks/usePracticalMathProgress'
import { truncateWords } from './standaloneCoursePresentation'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'
import { BusinessAnalyticsCourseTrainingBlock } from './BusinessAnalyticsTrainingMedia'

function baResumeTrainingHref(slug: string, source: PracticalMathematicsCourse, progress: ReturnType<typeof useStandaloneCourseProgress>['progress']): string {
  for (const mod of source.modules) {
    for (const l of mod.lessons) {
      if (!progress.completedLessonKeys.has(lessonKey(mod, l.lessonNumber))) {
        return getStandaloneModulePath(slug, mod.slug)
      }
    }
  }
  const cap = source.modules.find((x) => x.slug === source.capstoneModuleSlug)
  return cap ? getStandaloneQuizPath(slug, cap.slug) : getStandaloneModulePath(slug, source.modules[0]!.slug)
}

function hasAnyProgress(source: PracticalMathematicsCourse, progress: ReturnType<typeof useStandaloneCourseProgress>['progress']): boolean {
  for (const mod of source.modules) {
    for (const l of mod.lessons) {
      if (progress.completedLessonKeys.has(lessonKey(mod, l.lessonNumber))) return true
    }
  }
  return false
}

export function BusinessAnalyticsNarratedCourseOverview({ entry }: { entry: StandaloneCatalogEntry }) {
  const { source } = entry
  const micro = source.microWorkshopDetail
  const { progress } = useStandaloneCourseProgress(entry.internalKey)
  const certificateHref = getStandaloneCertificatePath(entry.slug)
  const firstModuleHref = getStandaloneModulePath(entry.slug, source.modules[0]!.slug)
  const resumeHref = useMemo(
    () => baResumeTrainingHref(entry.slug, source as PracticalMathematicsCourse, progress),
    [entry.slug, source, progress],
  )
  const started = useMemo(() => hasAnyProgress(source as PracticalMathematicsCourse, progress), [source, progress])
  const totalMinutes = useMemo(
    () => (source as PracticalMathematicsCourse).modules.reduce((s, m) => s + m.durationMinutes, 0),
    [source],
  )
  const practiceModuleHref = `${getStandaloneModulePath(entry.slug, 'business-analytics-foundations')}#ba-module-completion`

  if (!micro) return null

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-8 text-[color:var(--jf-text)] sm:px-6 sm:py-10"
      data-testid={`standalone-course-detail-${entry.slug}`}
    >
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-5">
          <JifunzeBrandLogo to="/" size="md" variant="compact" surface="light" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to="/learn">
              Catalog
            </Link>
            <SignedInPublicLearningActions />
          </div>
        </header>

        <section className="space-y-4" data-testid={`standalone-course-hero-${entry.slug}`}>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Slide-first training · {source.school}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2rem]">{entry.title}</h1>
          <p className="text-[16px] font-medium leading-snug text-stone-800">{micro.cardSubtitle}</p>
          <p className="text-[14px] text-stone-600">
            {totalMinutes} min · {source.modules.length} modules · narration-ready · certificate
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to={firstModuleHref}
              className={`inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 text-[15px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
              data-testid={`standalone-course-start-${entry.slug}`}
            >
              Start training
            </Link>
            {started ? (
              <Link
                to={resumeHref}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-[15px] font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50"
              >
                Resume training
              </Link>
            ) : null}
          </div>
        </section>

        <BusinessAnalyticsCourseTrainingBlock />

        <section>
          <h2 className="text-[15px] font-semibold tracking-tight text-stone-900">Module chapters</h2>
          <ol className="mt-3 divide-y divide-stone-200/90 rounded-xl border border-stone-200/90 bg-white">
            {source.modules.map((mod) => {
              const shortTitle = mod.title.replace(/^Module \d+:\s*/i, '').trim()
              return (
                <li key={mod.slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3" data-testid={`standalone-course-module-${entry.slug}-${mod.slug}`}>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-stone-500">
                      Module {mod.moduleNumber} · {mod.durationMinutes} min
                    </p>
                    <Link to={getStandaloneModulePath(entry.slug, mod.slug)} className="mt-0.5 block text-[15px] font-semibold text-stone-900 hover:text-orange-800">
                      {shortTitle}
                    </Link>
                  </div>
                  <Link
                    to={getStandaloneModulePath(entry.slug, mod.slug)}
                    className="shrink-0 rounded-full border border-stone-300 bg-stone-50 px-3 py-1 text-[12px] font-semibold text-stone-800 hover:bg-stone-100"
                  >
                    Open
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="rounded-xl border border-stone-200/90 bg-white p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold text-stone-900">Complete the course</h2>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-stone-700">
            <li>
              ·{' '}
              <Link to={practiceModuleHref} className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-2 hover:text-stone-950">
                Practice labs
              </Link>
              {' '}
              (prompts on each module page).
            </li>
            <li>· Pass the 12-question application quiz in Module 6 (75%+).</li>
            <li>· Confirm the portfolio acknowledgment on Module 6 for your certificate.</li>
          </ul>
          <p className="mt-4 text-[12px] text-stone-500">
            <Link
              to={certificateHref}
              className="font-medium text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-stone-900"
              data-testid={`standalone-course-certificate-link-${entry.slug}`}
            >
              Certificate of Completion
            </Link>
            <span> — requirements are listed on the certificate page.</span>
          </p>
        </section>

        <details className="rounded-xl border border-stone-200/80 bg-stone-50/50 px-4 py-3">
          <summary className="cursor-pointer text-[13px] font-semibold text-stone-800">More about this course</summary>
          <div className="mt-3 space-y-4 border-t border-stone-200/80 pt-3 text-[13px] leading-relaxed text-stone-700">
            <div>
              <p className="font-semibold text-stone-900">What you will learn</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {source.learningOutcomes.slice(0, 5).map((line) => (
                  <li key={line}>{truncateWords(line, 24)}</li>
                ))}
              </ul>
            </div>
            <p>
              <span className="font-semibold text-stone-900">Case study: </span>
              {micro.caseStudy.headline}. {truncateWords(micro.caseStudy.centralProblem, 40)}
            </p>
            <p className="text-[12px] text-stone-600">{truncateWords(source.safetyDisclaimer, 55)}</p>
          </div>
        </details>

        <div className="pb-8 text-center">
          <Link to="/learn" className="text-sm font-medium text-stone-600 hover:text-stone-900">
            ← Back to catalog
          </Link>
        </div>
      </div>
    </div>
  )
}
