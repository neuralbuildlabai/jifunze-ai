import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useLearnerCommerceOptional } from '../../learner/LearnerCommerceContext'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { FLAGSHIP_SCHOOLS, getFlagshipCourseBySlug } from '../../data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum } from '../../data/learning/flagshipCourseCurricula'
import { useFlagshipCourseProgress } from '../../hooks/useFlagshipCourseProgress'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { buildSessionsForCurriculum, firstSessionInCourseOrder } from '../../data/learning/flagshipCourseSessions'
import { LearnHeroAbstractFigure } from '../visuals/JifunzeLearnVisuals'
import { AiEssentialsCourseOverview } from './AiEssentialsCourseOverview'
import { FlagshipCourseCurriculumSections } from './FlagshipCourseCurriculumSections'
import { PaidFlagshipCertificateBanner } from './PaidFlagshipCertificateBanner'
import { PaidHostedInteractiveFlagshipSection } from './PaidHostedInteractiveFlagshipSection'
import { FlagshipDetailAccessPill } from './premiumCourseShell/FlagshipDetailAccessPill'

const DEPTH_LABELS = [
  { key: 'foundations', title: 'Foundations', descKey: 'foundations' as const },
  { key: 'applied', title: 'Applied practice', descKey: 'appliedPractice' as const },
  { key: 'execution', title: 'Professional execution', descKey: 'professionalExecution' as const },
  { key: 'mastery', title: 'Mastery and outputs', descKey: 'masteryOutputs' as const },
]

export function FlagshipCourseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { user, supabase, signOut, signOutPending } = useAuth()
  const commerce = useLearnerCommerceOptional()
  const course = slug ? getFlagshipCourseBySlug(slug) : undefined
  const curriculum = slug ? getFlagshipCurriculum(slug) : undefined
  const sessions = useMemo(() => (curriculum ? buildSessionsForCurriculum(curriculum) : []), [curriculum])
  const flagshipSync = useMemo(
    () => (user && supabase ? { supabase, userId: user.id } : null),
    [user, supabase],
  )
  const progress = useFlagshipCourseProgress(slug ?? '', curriculum, sessions, flagshipSync)

  const purchaseGateEnabled = commerce?.purchaseGateEnabled ?? false
  const hasCourseAccess = slug ? (commerce?.hasCourseAccess(slug) ?? true) : true

  if (!slug || !course) {
    return <Navigate to={LEGAL_ROUTES.learn} replace />
  }

  const school = FLAGSHIP_SCHOOLS[course.schoolId]
  const firstLaunchSession = firstSessionInCourseOrder(sessions)
  const isHostedInteractiveCompactCourse = slug === 'ai-productivity-smart-workflows'

  return (
    <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
      <header className="jf-learn-nav-header sticky top-0 z-10 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-4">
            <Link
              to={LEGAL_ROUTES.learn}
              className="inline-flex min-h-[2.5rem] items-center text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
            >
              ← Catalog
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex min-h-[2.5rem] items-center text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
              >
                Home
              </Link>
            ) : null}
            <span className="hidden h-6 w-px bg-[color:var(--jf-border)] sm:block" aria-hidden />
            <JifunzeBrandLogo to={user ? '/dashboard' : '/'} size="md" surface="light" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={LEGAL_ROUTES.learn}
              className="inline-flex min-h-[2.5rem] items-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
            >
              All courses
            </Link>
            {user ? (
              <button
                type="button"
                disabled={signOutPending}
                onClick={() => void signOut()}
                className="inline-flex min-h-[2.5rem] items-center rounded-full border border-[color:var(--jf-border)] px-3 text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:border-stone-400/45 hover:text-[color:var(--jf-text)] disabled:opacity-50"
                data-testid="flagship-course-header-sign-out"
              >
                {signOutPending ? 'Signing out…' : 'Sign out'}
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14 lg:px-10">
        {slug === 'ai-essentials' && curriculum ? (
          <AiEssentialsCourseOverview
            slug={slug}
            course={course}
            school={school}
            curriculum={curriculum}
            sessions={sessions}
            progress={progress}
            purchaseGateEnabled={purchaseGateEnabled}
            hasCourseAccess={hasCourseAccess}
          />
        ) : (
          <>
        {!isHostedInteractiveCompactCourse ? (
          <div className="jf-learn-section-blush overflow-hidden rounded-2xl border border-[color:var(--jf-border)] shadow-[var(--jf-shadow-soft)]">
            <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,230px)] lg:items-start lg:gap-10">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--jf-muted)]">
                  Flagship learning path · {school.label}
                </p>
                <h1 className="mt-3 text-[1.85rem] font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2.1rem] sm:leading-tight">
                  {course.title}
                </h1>
                <p className="mt-4 text-[17px] leading-relaxed text-[color:var(--jf-muted)]">{course.subtitle}</p>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px] text-[color:var(--jf-muted)]">
                  <span className="rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 py-1 text-[12px] font-medium text-[color:var(--jf-text)] shadow-sm">
                    {course.levelRange}
                  </span>
                  {curriculum ? (
                    <span data-testid="flagship-module-count">
                      <span className="font-semibold text-[color:var(--jf-text)]">{curriculum.modules.length}</span> modules
                    </span>
                  ) : null}
                  <FlagshipDetailAccessPill purchaseGateEnabled={purchaseGateEnabled} hasCourseAccess={hasCourseAccess} />
                </div>

                <TrustBoundaryStrip
                  variant="inline"
                  compact
                  strip="publicHero"
                  presentation="utility"
                  density="legalLink"
                  className="mt-8 max-w-2xl text-[13px] leading-relaxed text-[color:var(--jf-subtle)]"
                  dataTestId="flagship-course-trust"
                />
              </div>
              <div className="mx-auto w-full max-w-[240px] lg:mx-0 lg:max-w-none lg:pt-1">
                <LearnHeroAbstractFigure className="h-auto w-full drop-shadow-md" />
              </div>
            </div>
          </div>
        ) : null}

        {isHostedInteractiveCompactCourse ? (
          <>
            <PaidHostedInteractiveFlagshipSection courseSlug={slug} courseTitle={course.title} courseIntro={course.intro} />
            {curriculum ? (
              <PaidFlagshipCertificateBanner
                courseSlug={slug}
                curriculum={curriculum}
                sessions={sessions}
                progressState={progress.state}
                user={user}
                supabase={supabase}
                suppressCapstoneCta
              />
            ) : null}
          </>
        ) : (
          <>
            {curriculum ? (
              <PaidFlagshipCertificateBanner
                courseSlug={slug}
                curriculum={curriculum}
                sessions={sessions}
                progressState={progress.state}
                user={user}
                supabase={supabase}
              />
            ) : null}
            <PaidHostedInteractiveFlagshipSection courseSlug={slug} courseTitle={course.title} courseIntro={course.intro} />
          </>
        )}

        {LEARNER_MONETIZATION_UI_DISABLED ? null : (
          <section
            className="mt-10 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-5 py-6 sm:px-7"
            aria-labelledby="access-model-heading"
          >
            <h2 id="access-model-heading" className="text-[15px] font-semibold tracking-tight text-[color:var(--jf-text)]">
              Access & progression
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
              You can purchase this course alone or subscribe for all-access to every flagship track. Either way, modules unlock progressively—purchase opens the course, not
              every session at once. Support sheets unlock alongside your milestones.
            </p>
            <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              <li>· Single-course checkout opens only this path on your account.</li>
              <li>· All-access lets you enter each flagship course while pacing stays intact inside each one.</li>
              <li>· The Readiness Challenge is course-specific and can unlock a one-time 5% first single-course discount (not for all-access).</li>
              <li>· Learners may keep two active browser sessions—phone and laptop is fine.</li>
            </ul>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-5 py-2.5 text-center text-[13px] font-semibold text-white shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)]"
                to={`/learn/checkout?course=${slug}`}
                data-testid="flagship-cta-checkout-course"
              >
                Buy this course
              </Link>
              <Link
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-5 py-2.5 text-[13px] font-semibold text-[color:var(--jf-text)] hover:bg-stone-100/90"
                to={`/learn/readiness/${slug}`}
              >
                Course Readiness Challenge
              </Link>
              <Link
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-5 py-2.5 text-[13px] font-semibold text-[color:var(--jf-text)] hover:bg-stone-100/90"
                to="/learn/checkout?plan=all"
              >
                All-access subscription
              </Link>
            </div>
            {purchaseGateEnabled && hasCourseAccess ? (
              <p className="mt-4 text-[12px] leading-relaxed text-emerald-800/90">
                You have access to this course—your full path stays below with clear locked and open states.
              </p>
            ) : purchaseGateEnabled && !hasCourseAccess ? (
              <p className="mt-4 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">Preview the structure below; checkout unlocks interactive sessions.</p>
            ) : import.meta.env.DEV ? (
              <p className="mt-4 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
                Dev: enable purchase gate via env to exercise checkout flows.
              </p>
            ) : (
              <p className="mt-4 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
                Preview the structure below; purchase unlocks the full interactive path when billing is on.
              </p>
            )}
          </section>
        )}

        {!isHostedInteractiveCompactCourse ? (
          <section className="mt-14 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] ring-1 ring-stone-900/[0.04] sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">Course promise</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{course.intro}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-text)]">{course.promise}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-[color:var(--jf-subtle)]">
              This path is built for retained capability—layered progression, serious practice, and outputs you can reuse—not a shallow overview.
            </p>
          </section>
        ) : null}

        {curriculum ? (
          <FlagshipCourseCurriculumSections
            courseSlug={slug}
            course={course}
            curriculum={curriculum}
            sessions={sessions}
            progress={progress}
          />
        ) : (
          <>
            <section className="mt-14" aria-labelledby="depth-structure-heading">
              <h2 id="depth-structure-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
                Depth structure
              </h2>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
                Four stages anchor every flagship course: foundations through work-ready outputs.
              </p>
              <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                {DEPTH_LABELS.map((item, i) => (
                  <li
                    key={item.key}
                    className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] p-5 ring-1 ring-black/[0.02]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
                      Stage {i + 1}
                    </p>
                    <p className="mt-2 text-[15px] font-semibold text-[color:var(--jf-text)]">{item.title}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                      {course.depthStages[item.descKey]}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-14" aria-labelledby="pathway-heading">
              <h2 id="pathway-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
                Module pathway preview
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
                A broad map of the track—each segment unfolds into guided lessons, practice, and reinforcement.
              </p>
              <ol className="mt-6 space-y-3">
                {course.modulePathway.map((m, idx) => (
                  <li
                    key={m}
                    className="flex gap-4 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-4 py-3 text-[14px] text-[color:var(--jf-text)]"
                  >
                    <span className="font-mono text-[12px] font-semibold tabular-nums text-[color:var(--jf-muted)]">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="leading-snug">{m}</span>
                  </li>
                ))}
              </ol>
            </section>
          </>
        )}

        {!isHostedInteractiveCompactCourse ? (
          <section className="mt-14" aria-labelledby="outcomes-heading">
            <h2 id="outcomes-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
              Learning outcomes
            </h2>
            <ul className="mt-6 space-y-3">
              {course.learningOutcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-text)]/35" aria-hidden />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {!isHostedInteractiveCompactCourse ? (
          <section className="mt-14 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 sm:p-8" aria-labelledby="create-heading">
            <h2 id="create-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
              What you will create
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
              Capstone-style artifacts and revision-friendly packs—evidence of depth, not passive consumption.
            </p>
            <ul className="mt-6 space-y-3">
              {course.whatYouCreate.map((w) => (
                <li key={w} className="flex gap-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600/45" aria-hidden />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {!isHostedInteractiveCompactCourse ? (
          <section className="mt-14 flex flex-col gap-4 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface-elevated)] px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[15px] font-semibold text-[color:var(--jf-text)]">
                {LEARNER_MONETIZATION_UI_DISABLED ? 'Start learning' : 'Build your plan'}
              </p>
              <p className="mt-1 text-[13px] text-[color:var(--jf-muted)]">
                {LEARNER_MONETIZATION_UI_DISABLED
                  ? 'Open your first session when ready—modules unlock in order with checkpoints where marked.'
                  : 'Compare access options—then learn with guided progression and practical outputs.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={
                  firstLaunchSession && slug
                    ? `/learn/courses/${slug}/session/${firstLaunchSession.id}`
                    : LEARNER_MONETIZATION_UI_DISABLED
                      ? LEGAL_ROUTES.learn
                      : LEGAL_ROUTES.pricing
                }
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                data-testid="flagship-cta-start"
              >
                Start course
              </Link>
              {LEARNER_MONETIZATION_UI_DISABLED ? null : (
                <Link
                  to="/learn/checkout?plan=all"
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-stone-100/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                  data-testid="flagship-cta-plan"
                >
                  All-access checkout
                </Link>
              )}
              <Link
                to={LEGAL_ROUTES.learn}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              >
                Back to catalog
              </Link>
            </div>
          </section>
        ) : null}
          </>
        )}
      </main>
      <LearnerHelpAssistant />
    </div>
  )
}
