import type { ComponentType } from 'react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  getStandaloneCertificatePath,
  getStandaloneLessonPath,
  getStandaloneLessonSlug,
  getStandaloneQuizPath,
  lessonKey,
  practicalMathQuizPassed,
  type PracticalMathProgressState,
} from '../../data/courses'
import type { StandaloneCatalogEntry } from '../../data/courses/standaloneCoursesCatalog'
import type { PracticalMathematicsCourse, StandaloneCourseModule } from '../../data/courses/practicalMathematicsCourseTypes'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeSlidePlayer } from './JifunzeSlidePlayer'
import { StandaloneCapstonePanel } from './StandaloneCapstonePanel'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'
import type { BusinessProcessAutomationSlideEntry } from '../../data/courses/businessProcessAutomationSlides'
import { businessProcessAutomationSlideManifest } from '../../data/courses/businessProcessAutomationSlides'
import {
  businessProcessAutomationNarrationManifest,
  getBpaAudioSrcWhenReady,
  getBpaModuleNarrationAudioSrc,
  getBpaSlideTranscriptsForSlides,
} from '../../data/courses/businessProcessAutomationNarration'

function moduleDisplayTitle(module: StandaloneCourseModule): string {
  return module.title.replace(/^Module \d+:\s*/i, '').trim() || module.title
}

type BpaStandaloneModulePageProps = {
  entry: StandaloneCatalogEntry
  module: StandaloneCourseModule
  source: PracticalMathematicsCourse
  slides: readonly BusinessProcessAutomationSlideEntry[]
  progress: PracticalMathProgressState
  prev: StandaloneCourseModule | null
  next: StandaloneCourseModule | null
  devManualScoreEnabled: boolean
  ModuleQuizDevManualScore: ComponentType<{
    module: StandaloneCourseModule
    courseInternalKey: string
  }>
}

export function BpaStandaloneModulePage({
  entry,
  module,
  source,
  slides,
  progress,
  prev,
  next,
  devManualScoreEnabled,
  ModuleQuizDevManualScore,
}: BpaStandaloneModulePageProps) {
  const base = `/learn/${entry.slug}`
  const modulePath = (slug: string) => `${base}/modules/${slug}`
  const certificateHref = getStandaloneCertificatePath(entry.slug)
  const quizPath = getStandaloneQuizPath(entry.slug, module.slug)
  const showCapstonePanel = module.slug === source.capstoneModuleSlug

  const savedQuizScore = progress.passedModuleQuizzes.get(module.slug) ?? null
  const savedQuizPassed =
    module.moduleQuiz.length === 0 ? true : savedQuizScore ? practicalMathQuizPassed(savedQuizScore) : false

  const purposeLine = module.learningObjectives[0] ?? module.moduleSummary

  const moduleAudioSrc = useMemo(
    () =>
      getBpaAudioSrcWhenReady(
        businessProcessAutomationNarrationManifest.status,
        getBpaModuleNarrationAudioSrc(module.slug),
      ),
    [module.slug],
  )
  const slideTranscripts = useMemo(() => getBpaSlideTranscriptsForSlides(slides), [slides])

  const firstIncomplete = module.lessons.find((l) => !progress.completedLessonKeys.has(lessonKey(module, l.lessonNumber)))
  const anyLessonStarted = module.lessons.some((l) => progress.completedLessonKeys.has(lessonKey(module, l.lessonNumber)))
  const primaryLesson = firstIncomplete ?? module.lessons[0]
  const primaryLessonHref =
    primaryLesson != null
      ? getStandaloneLessonPath(entry.slug, module.slug, getStandaloneLessonSlug(primaryLesson))
      : base

  let primaryLabel = 'Start narrated module'
  if (firstIncomplete) primaryLabel = anyLessonStarted ? 'Continue narrated training' : 'Start narrated module'
  else if (module.lessons.length > 0) primaryLabel = 'Review lesson checkpoints'

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-8 text-[color:var(--jf-text)] sm:px-6 sm:py-10"
      data-testid={`standalone-module-detail-${entry.slug}-${module.slug}`}
    >
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-5">
          <JifunzeBrandLogo to="/" size="md" variant="compact" surface="light" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to="/learn">
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

        <Link to={base} className="inline-block text-[13px] font-medium text-stone-600 hover:text-stone-900">
          ← Back to course
        </Link>

        <section className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Module {module.moduleNumber}</p>
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-3xl" data-testid={`standalone-module-title-${module.slug}`}>
            {moduleDisplayTitle(module)}
          </h1>
          <p className="text-[13px] text-stone-600">
            {module.durationMinutes} min · narrated module · slides first
          </p>
          <p className="max-w-2xl text-[15px] leading-relaxed text-stone-700">{purposeLine}</p>
        </section>

        <section data-testid={`standalone-bpa-slide-player-module-${module.slug}`}>
          <JifunzeSlidePlayer
            title="Narrated module slides"
            subtitle="Work through this chapter in order. Open a lesson only when you want a short checkpoint or to mark progress."
            slides={slides}
            slideCounterTotal={businessProcessAutomationSlideManifest.totalSlides}
            deckDownloadUrl={businessProcessAutomationSlideManifest.deckDownloadUrl}
            showDownload
            audioSrc={moduleAudioSrc}
            narrationStatus={businessProcessAutomationNarrationManifest.status}
            slideTranscripts={slideTranscripts}
            showTranscript
          />
        </section>

        <div>
          <Link
            to={primaryLessonHref}
            className={`inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-8 text-[15px] font-semibold text-white shadow-md shadow-orange-500/20 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
            data-testid={`standalone-bpa-module-primary-cta-${module.slug}`}
          >
            {primaryLabel}
          </Link>
        </div>

        <section data-testid={`standalone-module-lessons-${module.slug}`}>
          <h2 className="text-[15px] font-semibold tracking-tight text-stone-900">Lessons</h2>
          <ul className="mt-3 divide-y divide-stone-200/90 rounded-xl border border-stone-200/90 bg-white">
            {module.lessons.map((lesson) => {
              const lslug = getStandaloneLessonSlug(lesson)
              const lessonHref = getStandaloneLessonPath(entry.slug, module.slug, lslug)
              const done = progress.completedLessonKeys.has(lessonKey(module, lesson.lessonNumber))
              return (
                <li key={lesson.lessonNumber} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:py-2" data-testid={`standalone-module-lesson-card-${module.slug}-${lslug}`}>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-[12px] font-semibold tabular-nums text-stone-500">{lesson.lessonNumber}</span>
                      <span className="text-[14px] font-semibold text-stone-900">{lesson.title}</span>
                      <span className="text-[12px] text-stone-500">· {lesson.estimatedMinutes} min</span>
                      <span className="text-[12px] text-stone-500">· {done ? 'Studied' : 'Not started'}</span>
                    </div>
                  </div>
                  <Link
                    to={lessonHref}
                    className="shrink-0 rounded-full border border-stone-300 bg-stone-50 px-4 py-1.5 text-[12px] font-semibold text-stone-800 transition hover:bg-stone-100"
                    data-testid={`standalone-module-open-lesson-${module.slug}-${lslug}`}
                  >
                    Open
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <section id="bpa-module-completion" className="rounded-xl border border-stone-200/90 bg-white p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold text-stone-900">Complete this module</h2>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-stone-700">
            <li>· Finish the slides above.</li>
            <li>· Use lessons only for short checkpoints and to mark progress.</li>
            <li>· Finish the practice lab prompts below.</li>
            {module.moduleQuiz.length === 0 ? (
              <li>· The graded quiz (12 questions) is in Module 5 after you work through all modules.</li>
            ) : (
              <li>· Pass the Module 5 quiz (12 questions, 75%+) to count toward your certificate.</li>
            )}
          </ul>

          <details className="mt-5 rounded-lg border border-stone-100 bg-stone-50/80 px-4 py-3">
            <summary className="cursor-pointer text-[13px] font-semibold text-stone-800">Open practice lab</summary>
            <div className="mt-3 border-t border-stone-200/80 pt-3">
              <p className="text-[14px] font-medium text-stone-900">{module.practiceLab.title}</p>
              <p className="mt-2 text-[13px] text-stone-600">{module.practiceLab.learnerGoal}</p>
              <ul className="mt-3 space-y-2 text-[13px] text-stone-700">
                {module.practiceLab.scenarios.map((s) => (
                  <li key={s.id}>· {s.prompt}</li>
                ))}
              </ul>
            </div>
          </details>

          {module.moduleQuiz.length > 0 ? (
            <div className="mt-5 rounded-lg border border-stone-200/80 bg-stone-50/50 p-4">
              <p className="text-[13px] font-semibold text-stone-800">
                Quiz status:{' '}
                <span
                  className={
                    savedQuizPassed ? 'text-emerald-700' : savedQuizScore ? 'text-rose-700' : 'text-stone-600'
                  }
                  data-testid={`standalone-module-quiz-status-${module.slug}`}
                >
                  {savedQuizPassed ? 'Passed' : savedQuizScore ? 'Needs retry' : 'Not started'}
                </span>
              </p>
              {savedQuizScore ? (
                <p className="mt-1 text-[12px] text-stone-500" data-testid={`standalone-module-quiz-latest-score-${module.slug}`}>
                  Latest: {savedQuizScore.correct}/{savedQuizScore.total}
                </p>
              ) : null}
              <div className="mt-3">
                <Link
                  to={quizPath}
                  className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                  data-testid={`standalone-module-take-quiz-${module.slug}`}
                >
                  {savedQuizPassed ? 'Retake quiz' : savedQuizScore ? 'Retry quiz' : 'Take Module 5 quiz'}
                </Link>
              </div>
              {devManualScoreEnabled ? <ModuleQuizDevManualScore module={module} courseInternalKey={entry.internalKey} /> : null}
            </div>
          ) : null}

          {showCapstonePanel ? (
            <div className="mt-5 border-t border-stone-200/80 pt-5">
              <StandaloneCapstonePanel courseInternalKey={entry.internalKey} acknowledgement={source.capstoneAcknowledgement} />
            </div>
          ) : null}

          <p className="mt-5 text-[12px] text-stone-500">
            <Link to={certificateHref} className="font-medium text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-stone-900">
              Certificate of Completion
            </Link>
            <span> — available when you meet all course requirements.</span>
          </p>
        </section>

        {module.safetyNote ? (
          <aside
            className="rounded-lg border-l-[3px] border-amber-400 bg-amber-50/85 px-4 py-3 text-[12px] leading-snug text-amber-950"
            data-testid={`standalone-module-safety-${module.slug}`}
          >
            <span className="font-semibold text-amber-950">Safety:</span> {module.safetyNote}
          </aside>
        ) : null}

        <div className="flex flex-wrap gap-6 border-t border-[color:var(--jf-border)] pt-6 text-[13px] text-stone-600">
          {prev ? (
            <Link to={modulePath(prev.slug)} className="font-medium hover:text-stone-900">
              ← Previous module
            </Link>
          ) : null}
          {next ? (
            <Link to={modulePath(next.slug)} className="font-medium hover:text-stone-900">
              Next module →
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}
