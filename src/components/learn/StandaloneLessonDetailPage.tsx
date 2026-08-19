import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  BUSINESS_PROCESS_AUTOMATION_SLUG,
  findStandaloneCourseBySlug,
  findStandaloneLesson,
  getStandaloneLessonNavTargets,
  getStandaloneLessonSlug,
} from '../../data/courses'
import {
  businessProcessAutomationNarrationManifest,
  getBpaAudioSrcWhenReady,
  getBpaModuleNarrationAudioSrc,
  getBpaSlideTranscriptsForSlides,
} from '../../data/courses/businessProcessAutomationNarration'
import { businessProcessAutomationSlideManifest, getBpaSlidesForLesson } from '../../data/courses/businessProcessAutomationSlides'
import { lessonKey } from '../../data/courses/practicalMathematicsProgression'
import type { StandaloneCatalogEntry } from '../../data/courses/standaloneCoursesCatalog'
import type { StandaloneCourseLesson, StandaloneCourseModule } from '../../data/courses/practicalMathematicsCourseTypes'
import { pickBpaCheckpointBlock, pickBpaKeyIdeaBlock } from '../../lib/bpaLessonNarrative'
import { useStandaloneCourseProgress } from '../../hooks/usePracticalMathProgress'
import { ORANGE_GRADIENT } from './discoveryHubSections'
import { JifunzeSlidePlayer } from './JifunzeSlidePlayer'
import { StandaloneLessonBlocks } from './StandaloneLessonBlocks'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'
import type { StandaloneLessonNavTargets } from '../../data/courses/standaloneCourseLearnPaths'

type StandaloneLessonLoadedProps = {
  entry: StandaloneCatalogEntry
  module: StandaloneCourseModule
  lesson: StandaloneCourseLesson
  nav: StandaloneLessonNavTargets
}

function BpaLessonParagraphs({ text }: { text: string | undefined }) {
  if (!text?.trim()) return null
  const parts = text.trim().split(/\n{2,}/)
  return (
    <div className="space-y-2 text-[14px] leading-relaxed text-stone-800">
      {parts.map((p, i) => (
        <p key={i}>{p.replace(/\n/g, ' ')}</p>
      ))}
    </div>
  )
}

function StandaloneLessonDetailLoaded({ entry, module, lesson, nav }: StandaloneLessonLoadedProps) {
  const { progress, markLessonComplete } = useStandaloneCourseProgress(entry.internalKey)
  const { source } = entry
  const done = progress.completedLessonKeys.has(lessonKey(module, lesson.lessonNumber))
  const slug = getStandaloneLessonSlug(lesson)
  const isBpa = entry.slug === BUSINESS_PROCESS_AUTOMATION_SLUG

  const bpaLessonSlides = useMemo(
    () => (isBpa ? getBpaSlidesForLesson(module.slug, lesson.lessonNumber) : []),
    [isBpa, module.slug, lesson.lessonNumber],
  )
  const bpaLessonSlideTranscripts = useMemo(() => getBpaSlideTranscriptsForSlides(bpaLessonSlides), [bpaLessonSlides])
  const bpaLessonAudioSrc = useMemo(
    () =>
      isBpa
        ? getBpaAudioSrcWhenReady(
            businessProcessAutomationNarrationManifest.status,
            getBpaModuleNarrationAudioSrc(module.slug),
          )
        : undefined,
    [isBpa, module.slug],
  )

  if (isBpa) {
    const bpaKey = pickBpaKeyIdeaBlock(lesson.blocks)
    const bpaCheck = pickBpaCheckpointBlock(lesson.blocks)

    return (
      <div
        className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-8 text-[color:var(--jf-text)] sm:px-6 sm:py-10"
        data-testid={`standalone-lesson-detail-${module.slug}-${slug}`}
      >
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-5">
            <JifunzeBrandLogo to="/" size="md" surface="light" />
            <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
              <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to="/learn">
                Catalog
              </Link>
              <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to={nav.coursePath}>
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
            <Link to={nav.coursePath} className="hover:text-[color:var(--jf-text)]">
              {source.title}
            </Link>
            <span className="mx-1.5">/</span>
            <Link to={nav.modulePath} className="hover:text-[color:var(--jf-text)]">
              Module {module.moduleNumber}
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-[color:var(--jf-text)]">Lesson {lesson.lessonNumber}</span>
          </nav>

          <article data-testid="standalone-lesson-content" className="space-y-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Lesson {lesson.lessonNumber}</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-3xl">{lesson.title}</h1>
              <p className="mt-2 text-[13px] text-stone-500">{lesson.estimatedMinutes} min</p>
            </div>

            {bpaLessonSlides.length > 0 ? (
              <div data-testid={`standalone-bpa-slide-player-lesson-${slug}`}>
                <JifunzeSlidePlayer
                  title="Lesson slides"
                  subtitle="Slides first. Use the key takeaway and checkpoint below when you pause."
                  slides={bpaLessonSlides}
                  slideCounterTotal={businessProcessAutomationSlideManifest.totalSlides}
                  deckDownloadUrl={businessProcessAutomationSlideManifest.deckDownloadUrl}
                  showDownload
                  audioSrc={bpaLessonAudioSrc}
                  narrationStatus={businessProcessAutomationNarrationManifest.status}
                  slideTranscripts={bpaLessonSlideTranscripts}
                  showTranscript
                />
              </div>
            ) : null}

            {bpaKey ? (
              <div className="rounded-xl border border-stone-200/90 bg-white p-5 shadow-sm">
                <h2 className="text-[15px] font-semibold text-stone-900">Key takeaway</h2>
                <div className="mt-2">
                  <BpaLessonParagraphs
                    text={
                      'content' in bpaKey && typeof bpaKey.content === 'string'
                        ? bpaKey.content
                        : 'bullets' in bpaKey && Array.isArray(bpaKey.bullets)
                          ? bpaKey.bullets.join('\n\n')
                          : undefined
                    }
                  />
                </div>
              </div>
            ) : null}

            {bpaCheck ? (
              <div className="rounded-xl border border-orange-100/90 bg-orange-50/50 p-5 shadow-sm">
                <h2 className="text-[15px] font-semibold text-stone-900">Checkpoint</h2>
                <div className="mt-2">
                  <BpaLessonParagraphs
                    text={
                      'content' in bpaCheck && typeof bpaCheck.content === 'string'
                        ? bpaCheck.content
                        : 'bullets' in bpaCheck && Array.isArray(bpaCheck.bullets)
                          ? bpaCheck.bullets.join('\n\n')
                          : undefined
                    }
                  />
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 ${ORANGE_GRADIENT}`}
                disabled={done}
                onClick={() => markLessonComplete(module, lesson.lessonNumber)}
                data-testid="standalone-lesson-mark-complete"
              >
                {done ? 'Marked as studied' : 'Mark lesson as studied'}
              </button>
              {nav.nextLessonPath ? (
                <Link
                  to={nav.nextLessonPath}
                  className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50"
                  data-testid="standalone-lesson-next"
                >
                  Continue →
                </Link>
              ) : (
                <Link
                  to={nav.modulePath}
                  className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50"
                  data-testid="standalone-lesson-next"
                >
                  Back to module →
                </Link>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--jf-border)] pt-6">
              {nav.prevLessonPath ? (
                <Link
                  to={nav.prevLessonPath}
                  className="text-sm font-medium text-stone-600 hover:text-stone-900"
                  data-testid="standalone-lesson-prev"
                >
                  ← Previous lesson
                </Link>
              ) : (
                <Link to={nav.modulePath} className="text-sm font-medium text-stone-600 hover:text-stone-900" data-testid="standalone-lesson-prev">
                  ← Module
                </Link>
              )}
              <Link to={nav.modulePath} className="text-sm text-stone-500 hover:text-stone-800" data-testid="standalone-lesson-back-module">
                All lessons in this module
              </Link>
            </div>
          </article>

          {module.safetyNote ? (
            <aside
              className="rounded-lg border-l-[3px] border-amber-400 bg-amber-50/85 px-4 py-3 text-[12px] leading-snug text-amber-950"
              data-testid={`standalone-lesson-safety-${module.slug}`}
            >
              <span className="font-semibold text-amber-950">Safety: </span>
              {module.safetyNote}
            </aside>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div
      className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6"
      data-testid={`standalone-lesson-detail-${module.slug}-${slug}`}
    >
      <div className="mx-auto w-full max-w-3xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
          <JifunzeBrandLogo to="/" size="md" surface="light" />
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
              Catalog
            </Link>
            <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to={nav.coursePath}>
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
          <Link to={nav.coursePath} className="hover:text-[color:var(--jf-text)]">
            {source.title}
          </Link>
          <span className="mx-1.5">/</span>
          <Link to={nav.modulePath} className="hover:text-[color:var(--jf-text)]">
            Module {module.moduleNumber}
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-[color:var(--jf-text)]">Lesson {lesson.lessonNumber}</span>
        </nav>

        <article data-testid="standalone-lesson-content">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-700">Lesson {lesson.lessonNumber}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[color:var(--jf-text)]">{lesson.title}</h1>
          <p className="mt-3 text-[13px] text-stone-500">{lesson.estimatedMinutes} minutes</p>
          <div className="mt-6 rounded-xl border border-orange-100/90 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-800">Learner goal</p>
            <p className="mt-2 text-[15px] leading-relaxed text-stone-800">{lesson.learnerGoal}</p>
          </div>

          <div className="mt-10">
            <StandaloneLessonBlocks blocks={lesson.blocks} lessonSlug={slug} />
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 ${ORANGE_GRADIENT}`}
              disabled={done}
              onClick={() => markLessonComplete(module, lesson.lessonNumber)}
              data-testid="standalone-lesson-mark-complete"
            >
              {done ? 'Marked as studied' : 'Mark lesson as studied'}
            </button>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[color:var(--jf-border)] pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              {nav.prevLessonPath ? (
                <Link
                  to={nav.prevLessonPath}
                  className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                  data-testid="standalone-lesson-prev"
                >
                  ← Previous lesson
                </Link>
              ) : (
                <Link
                  to={nav.modulePath}
                  className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-stone-50"
                  data-testid="standalone-lesson-prev"
                >
                  ← Back to module
                </Link>
              )}
              {nav.nextLessonPath ? (
                <Link
                  to={nav.nextLessonPath}
                  className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                  data-testid="standalone-lesson-next"
                >
                  Next lesson →
                </Link>
              ) : (
                <Link
                  to={nav.modulePath}
                  className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-stone-50"
                  data-testid="standalone-lesson-next"
                >
                  Continue to module (lab &amp; quiz) →
                </Link>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={nav.modulePath}
                className="text-sm font-medium text-orange-700 hover:underline"
                data-testid="standalone-lesson-back-module"
              >
                Back to module
              </Link>
              <Link to={nav.coursePath} className="text-sm font-medium text-orange-700 hover:underline" data-testid="standalone-lesson-back-course">
                Back to course
              </Link>
            </div>
          </div>
        </article>

        {module.safetyNote ? (
          <aside
            className="rounded-lg border-l-[3px] border-amber-400 bg-amber-50/85 px-4 py-3 text-[12px] leading-snug text-amber-950"
            data-testid={`standalone-lesson-safety-${module.slug}`}
          >
            <span className="font-semibold text-amber-950">Safety: </span>
            {module.safetyNote}
          </aside>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Full standalone lesson reader — Practical Mathematics and future standalone courses.
 */
export function StandaloneLessonDetailPage() {
  const { standaloneCourseSlug, moduleSlug, lessonSlug } = useParams<{
    standaloneCourseSlug: string
    moduleSlug: string
    lessonSlug: string
  }>()

  const catalogEntry = useMemo(
    () => (standaloneCourseSlug ? findStandaloneCourseBySlug(standaloneCourseSlug) : undefined),
    [standaloneCourseSlug],
  )

  const resolved = useMemo(() => {
    if (!standaloneCourseSlug || !moduleSlug || !lessonSlug) return undefined
    return findStandaloneLesson(standaloneCourseSlug, moduleSlug, lessonSlug)
  }, [standaloneCourseSlug, moduleSlug, lessonSlug])

  if (!standaloneCourseSlug) {
    return <Navigate to="/learn" replace />
  }

  if (!catalogEntry) {
    return <Navigate to="/learn" replace />
  }

  if (!moduleSlug || !lessonSlug) {
    return <Navigate to={`/learn/${standaloneCourseSlug}`} replace />
  }

  if (!resolved) {
    const modExists = catalogEntry.source.modules.some((m) => m.slug === moduleSlug)
    if (modExists) {
      return <Navigate to={`/learn/${standaloneCourseSlug}/modules/${moduleSlug}`} replace />
    }
    return <Navigate to={`/learn/${standaloneCourseSlug}`} replace />
  }

  const nav = getStandaloneLessonNavTargets(standaloneCourseSlug, moduleSlug, lessonSlug)
  if (!nav) {
    return <Navigate to={`/learn/${standaloneCourseSlug}/modules/${moduleSlug}`} replace />
  }

  return (
    <StandaloneLessonDetailLoaded entry={catalogEntry} module={resolved.module} lesson={resolved.lesson} nav={nav} />
  )
}
