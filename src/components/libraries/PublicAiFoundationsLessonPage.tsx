import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useAppAccess } from '../../access/useAppAccess'
import { getAiCurriculumPlacement } from '../../data/learning/aiEverydayWorkCurriculum'
import { LEGACY_PUBLIC_AI_FOUNDATIONS_LESSON_SLUG_REDIRECTS } from '../../data/learning/curriculumLessonReaderMap'
import { resolveAiLessonReaderSections } from '../../data/learning/aiLessonReaderContent'
import {
  PUBLIC_AI_FOUNDATIONS_BASE_PATH,
  getAdjacentAiFoundationsLessons,
  getAiFoundationsLesson,
} from '../../data/publicStarterLibraries/aiFoundations'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../shared/legalRoutes'
import { useAiCurriculumLocalProgress } from '../../hooks/useAiCurriculumLocalProgress'
import { loadAiCurriculumProgress } from '../../lib/aiCurriculumLocalProgress'
import { recordTeachingSignal } from '../../data/teaching/teachingSignals'
import { PublicStarterLibraryChrome } from './PublicStarterLibraryChrome'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'
import { useLearningAccess } from '../../learning/LearningAccessContext'
import { evaluateLessonReadAccess } from '../../learning/learningEntitlement'

export function PublicAiFoundationsLessonPage() {
  const { user } = useAuth()
  const { tier } = useAppAccess()
  const learningAccess = useLearningAccess()
  const { lessonSlug } = useParams<{ lessonSlug: string }>()
  const { markViewed, isCompleted, setCompleted } = useAiCurriculumLocalProgress()

  const forwardedSlug =
    lessonSlug !== undefined ? LEGACY_PUBLIC_AI_FOUNDATIONS_LESSON_SLUG_REDIRECTS[lessonSlug] ?? lessonSlug : undefined

  const lesson = getAiFoundationsLesson(forwardedSlug)

  useEffect(() => {
    if (!lesson) return
    const prev = loadAiCurriculumProgress()
    const hadViewed = Boolean(prev.viewedAt[lesson.slug])
    markViewed(lesson.slug)
    recordTeachingSignal({
      kind: 'library_lesson_view',
      payload: {
        libraryKey: 'ai_foundations',
        lessonSlug: lesson.slug,
        lessonAccess: lesson.access,
        surface: 'lesson_view',
        schemaVersion: 2,
      },
    })
    if (hadViewed) {
      recordTeachingSignal({
        kind: 'lesson_revisit',
        payload: {
          libraryKey: 'ai_foundations',
          lessonSlug: lesson.slug,
          lessonAccess: lesson.access,
        },
      })
    }
  }, [lesson, markViewed])

  if (lessonSlug && forwardedSlug && forwardedSlug !== lessonSlug) {
    return <Navigate to={`${PUBLIC_AI_FOUNDATIONS_BASE_PATH}/${forwardedSlug}`} replace />
  }

  if (!lesson) {
    return <Navigate to={PUBLIC_AI_FOUNDATIONS_BASE_PATH} replace />
  }

  const sections = resolveAiLessonReaderSections(lesson.slug)
  const accessDecision = evaluateLessonReadAccess({
    lessonAccess: lesson.access,
    userPresent: Boolean(user),
    tier,
    moduleKey: 'ai_foundations',
    extendedLibraryKey: null,
    summary: learningAccess.summary,
    summaryLoading: learningAccess.loading,
    summaryError: learningAccess.error,
  })
  const canRead = accessDecision.kind === 'allow'
  const accessPending = accessDecision.kind === 'loading'
  const placement = getAiCurriculumPlacement(lesson.slug)

  const eyebrowExtra =
    lesson.access === 'premium'
      ? 'Premium curriculum (eligible plans)'
      : lesson.access === 'signed_in'
        ? 'Signed-in curriculum'
        : 'Public starter curriculum'

  const eyebrowText = placement
    ? `Lesson ${lesson.order} · ${placement.category.title} · ${placement.module.title} · ${eyebrowExtra}`
    : `Lesson ${lesson.order} · ${eyebrowExtra}`

  const { prev, next } = getAdjacentAiFoundationsLessons(lesson.slug)

  return (
    <PublicStarterLibraryChrome
      eyebrow={eyebrowText}
      title={lesson.title}
      description={lesson.summary}
    >
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">What you&apos;ll practice</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-zinc-300">
          {lesson.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      {accessPending ? (
        <div className="mt-10 rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.65)] p-5 sm:p-6">
          <p className="text-[13px] leading-relaxed text-zinc-300">Checking subscription access for this lesson…</p>
        </div>
      ) : null}

      {!canRead && !accessPending ? (
        <div className="mt-10 rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.65)] p-5 sm:p-6">
          <p className="text-[13px] leading-relaxed text-zinc-300">
            {lesson.access === 'signed_in'
              ? 'This lesson is part of the fuller signed-in AI library. Create a free account (or sign in) to read the full lesson.'
              : 'This deeper lesson requires an eligible subscription, module unlock, or all-access plan tied to your signed-in account (verified via billing when enabled). Materials access only—still not mastery, certification, or hiring guarantees.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {!user ? (
              <Link
                to="/?auth=signup#auth"
                className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
              >
                Create free account
              </Link>
            ) : lesson.access === 'premium' ? (
              LEARNER_MONETIZATION_UI_DISABLED ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
                >
                  Open workspace
                </Link>
              ) : (
                <>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
                  >
                    View plans &amp; modules
                  </Link>
                  <Link
                    to="/settings/subscription"
                    className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-violet-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                  >
                    Subscription status
                  </Link>
                </>
              )
            ) : (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
              >
                Open workspace
              </Link>
            )}
            <Link
              to={PUBLIC_AI_FOUNDATIONS_BASE_PATH}
              className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-violet-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
            >
              Back to library browse
            </Link>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
            Assistive instructional content only—payment unlocks expanded materials where available, not outcomes.
          </p>
        </div>
      ) : null}

      {canRead && sections && !accessPending ? (
        <article className="mt-10 max-w-none">
          {sections.map((sec) => (
            <section key={sec.heading} className="mb-10">
              <h2 className="text-lg font-semibold tracking-tight text-white">{sec.heading}</h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-zinc-300/95">
                {sec.paragraphs.map((p, i) => (
                  <p key={`${sec.heading}-${i}`}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
      ) : (
        <p className="mt-10 text-[11px] leading-relaxed text-zinc-600">
          Full lesson reader stays gated until eligible access—outcomes above describe intended practice, not promised results.
        </p>
      )}

      <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:flex-1">
          <button
            type="button"
            onClick={() => {
              const next = !isCompleted(lesson.slug)
              setCompleted(lesson.slug, next)
              if (next) {
                recordTeachingSignal({
                  kind: 'lesson_complete',
                  payload: {
                    libraryKey: 'ai_foundations',
                    lessonSlug: lesson.slug,
                    lessonAccess: lesson.access,
                  },
                })
              }
            }}
            className="inline-flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-violet-400/30 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            {isCompleted(lesson.slug) ? 'Completed (undo)' : 'Mark lesson complete'}
          </button>
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
            Local device progress only—useful for your own continuity, not a certificate or official record.
          </p>
        </div>
      </div>

      {canRead && !accessPending ? <LearnerHelpAssistant key={lesson.slug} currentLessonSlug={lesson.slug} /> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {prev ? (
          <Link
            to={`${PUBLIC_AI_FOUNDATIONS_BASE_PATH}/${prev.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            ← {prev.shortTitle}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`${PUBLIC_AI_FOUNDATIONS_BASE_PATH}/${next.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300/95 transition hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Next: {next.shortTitle} →
          </Link>
        ) : (
          <Link
            to={PUBLIC_AI_FOUNDATIONS_BASE_PATH}
            className="text-sm font-semibold text-violet-300/95 transition hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Back to library overview →
          </Link>
        )}
      </div>

      <p className="mt-10 text-[12px] leading-relaxed text-zinc-600">
        Assistive instructional content only—no guarantee of mastery, certification, or employment outcomes. Review outputs
        before professional, academic, public, or commercial reliance.
      </p>
      <p className="mt-3 text-[11px] text-zinc-600">
        <Link to={LEGAL_ROUTES.disclaimer} className="font-medium text-violet-300/85 underline-offset-2 hover:underline">
          Full disclaimer
        </Link>
      </p>
    </PublicStarterLibraryChrome>
  )
}
