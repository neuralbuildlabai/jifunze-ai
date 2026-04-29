import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useAppAccess } from '../../access/useAppAccess'
import {
  getAdjacentLessonsWithinCurriculum,
  getExtendedCatalogLesson,
  getExtendedCatalogPlacement,
} from '../../data/learning/extendedLibrariesCurricula'
import { resolveExtendedLessonReaderSections } from '../../data/learning/extendedLessonReaderContent'
import type { ExtendedPublicLibraryConfig } from '../../data/learning/extendedPublicLibraryConfigs'
import { recordLibraryLessonSurface } from '../../data/learning/curriculumEvolutionSignals'
import { recordTeachingSignal } from '../../data/teaching/teachingSignals'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { PublicStarterLibraryChrome } from './PublicStarterLibraryChrome'
import { useLearningAccess } from '../../learning/LearningAccessContext'
import { evaluateLessonReadAccess, extendedLibraryModuleKey } from '../../learning/learningEntitlement'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'

export function PublicExtendedCatalogLessonPage({ config }: { config: ExtendedPublicLibraryConfig }) {
  const { user } = useAuth()
  const { tier } = useAppAccess()
  const learningAccess = useLearningAccess()
  const { lessonSlug } = useParams<{ lessonSlug: string }>()

  const lesson = getExtendedCatalogLesson(lessonSlug)

  useEffect(() => {
    if (!lesson) return
    recordLibraryLessonSurface({
      libraryKey: config.key,
      lessonSlug: lesson.slug,
      lessonAccess: lesson.access,
    })
  }, [config.key, lesson])

  if (!lesson) {
    return <Navigate to={config.publicBasePath} replace />
  }

  const sections = resolveExtendedLessonReaderSections(lesson.slug)
  const accessDecision = evaluateLessonReadAccess({
    lessonAccess: lesson.access,
    userPresent: Boolean(user),
    tier,
    moduleKey: extendedLibraryModuleKey(config.key),
    extendedLibraryKey: config.key,
    summary: learningAccess.summary,
    summaryLoading: learningAccess.loading,
    summaryError: learningAccess.error,
  })
  const canRead = accessDecision.kind === 'allow'
  const accessPending = accessDecision.kind === 'loading'
  const placement = getExtendedCatalogPlacement(lesson.slug)

  const eyebrowExtra =
    lesson.access === 'premium'
      ? 'Premium curriculum (eligible plans)'
      : lesson.access === 'signed_in'
        ? 'Signed-in curriculum'
        : 'Public starter curriculum'

  const eyebrowText = placement
    ? `${placement.category.title} · ${placement.module.title} · ${eyebrowExtra}`
    : eyebrowExtra

  const { prev, next } = getAdjacentLessonsWithinCurriculum(lesson.slug, config.curriculum)

  return (
    <PublicStarterLibraryChrome
      eyebrow={eyebrowText}
      browseHref={config.publicBasePath}
      browseLabel={config.browseLabel}
      title={lesson.title}
      description={lesson.summary}
    >
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Capability outcomes</p>
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
              ? 'This lesson continues in the signed-in library path. Create a free account (or sign in) to read the full instructional sections.'
              : 'This deeper lesson requires an eligible subscription or module unlock tied to your signed-in account when billing verification is enabled (all-access may apply for some extended libraries). Materials access only—not guaranteed job, exam, or certification outcomes.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {!user ? (
              <Link
                to="/?auth=signup#auth"
                onClick={() =>
                  recordTeachingSignal({
                    kind: 'browse_to_signup_signal',
                    payload: {
                      from: 'extended_lesson_gate',
                      libraryKey: config.key,
                      lessonSlug: lesson.slug,
                      lessonAccess: lesson.access,
                    },
                  })
                }
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
                    onClick={() =>
                      recordTeachingSignal({
                        kind: 'premium_interest_signal',
                        payload: {
                          from: 'extended_lesson_gate',
                          libraryKey: config.key,
                          lessonSlug: lesson.slug,
                        },
                      })
                    }
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
              to={config.publicBasePath}
              className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-violet-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
            >
              Back to library overview
            </Link>
          </div>
        </div>
      ) : null}

      {canRead && !accessPending && sections && sections.length > 0 ? (
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
          Full instructional reader stays gated until eligible access—this preserves trust and prevents fake “free depth.”
        </p>
      )}

      {canRead && !accessPending && config.embeddedLearnerHelp ? (
        <LearnerHelpAssistant key={lesson.slug} currentLessonSlug={lesson.slug} />
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {prev ? (
          <Link
            to={`${config.publicBasePath}/${prev.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            ← {prev.shortTitle}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`${config.publicBasePath}/${next.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300/95 transition hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Next: {next.shortTitle} →
          </Link>
        ) : (
          <Link
            to={config.publicBasePath}
            className="text-sm font-semibold text-violet-300/95 transition hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Back to library overview →
          </Link>
        )}
      </div>

      <p className="mt-10 text-[12px] leading-relaxed text-zinc-600">
        Instructional content only—verify anything legal, safety-, or compliance-sensitive with authoritative sources and responsible
        humans.
      </p>
      <p className="mt-3 text-[11px] text-zinc-600">
        <Link to={LEGAL_ROUTES.disclaimer} className="font-medium text-violet-300/85 underline-offset-2 hover:underline">
          Full disclaimer
        </Link>
      </p>
    </PublicStarterLibraryChrome>
  )
}
