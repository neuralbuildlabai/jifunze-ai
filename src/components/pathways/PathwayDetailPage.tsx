import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FLAGSHIP_SCHOOLS } from '../../data/learning/flagshipCoursesCatalog'
import { canLearnerSelectPathwayAsPrimary, getPathwayBySlug } from '../../data/learning/employablePathwaysCatalog'
import { partitionPortfolioOutputsForPathway } from '../../data/learning/portfolioOutputsCatalog'
import { resolveCourseSummaryForSlug } from '../../data/learning/plannedCoursesCatalog'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { usePathwayProgressMap, type PathwayProgressSyncContext } from '../../hooks/usePathwayProgressMap'
import { useSelectedPathway } from '../../hooks/useSelectedPathway'
import { getPathwayNextAction, getPathwayProgressSummary, getPathwayAvailableCourses } from '../../lib/pathwayNextAction'
import { derivePathwayCourseProgress } from '../../lib/pathwayProgressDerived'
import { LEGAL_ROUTES } from '../../shared/legalRoutes'
import { EmployablePathwaysPublicNav } from './EmployablePathwaysPublicNav'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { LearnHeroAbstractFigure, LearnSectionSparkIcon, LearnWorkflowStepsFigure } from '../visuals/JifunzeLearnVisuals'

const sectionTitle = 'text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]'
const prose = 'text-[14px] leading-relaxed text-[color:var(--jf-muted)]'

export function PathwayDetailPage() {
  const { pathwaySlug } = useParams<{ pathwaySlug: string }>()
  const pathway = getPathwayBySlug(pathwaySlug)
  const { user, supabase } = useAuth()
  const pathwaySync: PathwayProgressSyncContext = useMemo(() => {
    if (!user || !supabase || !isSupabaseConfigured()) return null
    return { supabase, userId: user.id }
  }, [user, supabase])
  const { progressBySlug: progressMap, remoteHydrated } = usePathwayProgressMap(pathway ?? null, pathwaySync)
  const {
    selectedPathwaySlug,
    persistenceEnabled,
    setPrimaryPathway,
    saving: prefSaving,
    loading: prefLoading,
    error: prefError,
  } = useSelectedPathway()

  if (!pathwaySlug || !pathway) {
    return <Navigate to={LEGAL_ROUTES.paths} replace />
  }

  const next = pathway.recommendedNextPathwaySlug ? getPathwayBySlug(pathway.recommendedNextPathwaySlug) : null
  const { required: requiredOutputs, optional: optionalOutputs } = partitionPortfolioOutputsForPathway(pathway.slug)
  const summary = getPathwayProgressSummary(pathway, progressMap)
  const nextAction = getPathwayNextAction(pathway, progressMap)
  const availableCourses = getPathwayAvailableCourses(pathway)
  const returnUrl = encodeURIComponent(`/paths/${pathway.slug}`)
  const signedIn = Boolean(user)
  const authConfigured = isSupabaseConfigured()

  const hasAnyAvailableCourse = availableCourses.length > 0
  const courseRows = derivePathwayCourseProgress(pathway, progressMap).rows
  const primarySelectable = canLearnerSelectPathwayAsPrimary(pathway)
  const followingThis = persistenceEnabled && selectedPathwaySlug === pathway.slug
  const showFollowUx = signedIn && authConfigured && primarySelectable && hasAnyAvailableCourse
  const followBusy = prefSaving || prefLoading

  return (
    <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6">
      <div className="mx-auto max-w-3xl space-y-10 sm:space-y-12">
        <EmployablePathwaysPublicNav />

        <div className="relative overflow-hidden rounded-2xl border border-[color:var(--jf-border)] bg-gradient-to-br from-orange-50/90 via-white to-stone-50/80 p-6 shadow-[var(--jf-shadow-soft)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,220px)] lg:items-start lg:gap-8">
            <div>
              <p className={sectionTitle}>{FLAGSHIP_SCHOOLS[pathway.schoolId].label}</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-3xl">{pathway.title}</h1>
              <p className={`mt-4 ${prose}`}>{pathway.description}</p>
              {pathway.status === 'coming_soon' ? (
                <p className="mt-3 rounded-xl border border-amber-200/70 bg-amber-50/95 px-4 py-3 text-[13px] text-amber-950/95">
                  Parts of this pathway are still being prepared: included courses below are the live learning surface; treat add-on builder topics as roadmap until
                  published.
                </p>
              ) : null}
            </div>
            <div className="mx-auto max-w-[220px] pt-2 lg:mx-0 lg:max-w-none lg:pt-1">
              <LearnHeroAbstractFigure className="h-auto w-full drop-shadow-sm" />
            </div>
          </div>
        </div>

        <details className="rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-4 py-3 shadow-[var(--jf-shadow-soft)] ring-1 ring-stone-900/[0.03] sm:px-5">
          <summary className={`${sectionTitle} flex cursor-pointer flex-wrap items-center gap-2`}>
            <LearnSectionSparkIcon className="h-4 w-4 shrink-0" aria-hidden />
            How this pathway flows
          </summary>
          <LearnWorkflowStepsFigure className="mx-auto mt-4 h-auto w-full max-w-md sm:mx-0" />
        </details>

        {hasAnyAvailableCourse ? (
          <section
            className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] sm:p-6"
            aria-labelledby="pathway-progress-heading"
            data-testid="pathway-progress-summary"
          >
            <h2 id="pathway-progress-heading" className={sectionTitle}>
              Your progress
            </h2>
            <p className={`mt-2 text-[13px] ${prose}`}>Your progress on live courses below—not an official transcript.</p>
            {signedIn && pathwaySync && !remoteHydrated ? (
              <p className="mt-2 text-[11px] text-[color:var(--jf-subtle)]">Merging saved progress from your account…</p>
            ) : null}
            <div className="mt-4 rounded-xl border border-[color:var(--jf-border)] bg-orange-50/40 px-4 py-3">
              <p className="text-[14px] font-medium text-[color:var(--jf-text)]">
                About <span className="tabular-nums">{summary.pathwaySessionProgressPercent}%</span> along this pathway&apos;s live courses
              </p>
              <p className="mt-1 text-[12px] text-[color:var(--jf-muted)]">
                <span className="font-semibold text-[color:var(--jf-text)]">Next step: </span>
                {summary.recommendedNextActionLabel}
              </p>
            </div>
            <details className="mt-4 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/70 px-4 py-3 text-[12px] text-[color:var(--jf-muted)]">
              <summary className="cursor-pointer font-semibold text-[color:var(--jf-text)]">Progress detail</summary>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                <div>
                  <dt className="text-[color:var(--jf-subtle)]">Live courses</dt>
                  <dd className="font-semibold tabular-nums text-[color:var(--jf-text)]">{summary.availableCourseCount}</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--jf-subtle)]">Started</dt>
                  <dd className="font-semibold tabular-nums text-[color:var(--jf-text)]">{summary.startedCourseCount}</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--jf-subtle)]">Certificate-ready</dt>
                  <dd className="font-semibold tabular-nums text-[color:var(--jf-text)]">{summary.completedCourseCount}</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--jf-subtle)]">Roadmap courses</dt>
                  <dd className="font-semibold tabular-nums text-[color:var(--jf-text)]">{summary.plannedCourseCount}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[color:var(--jf-subtle)]">Portfolio planning items</dt>
                  <dd className="font-semibold text-[color:var(--jf-text)]">{summary.portfolioOutputTotal}</dd>
                </div>
              </dl>
              <p className="mt-3 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
                Certificate readiness follows each course&apos;s in-app rules. Jifunze does not issue PDF certificates here today.
                {summary.allAvailableCoursesCertificateReady && hasAnyAvailableCourse
                  ? ' You meet the readiness bar for every included course in this pathway on this device.'
                  : null}
              </p>
            </details>
          </section>
        ) : (
          <section
            className="rounded-2xl border border-amber-200/70 bg-amber-50/95 p-5 text-[14px] text-amber-950/95"
            data-testid="pathway-planned-only-banner"
          >
            <p className="font-semibold text-amber-950">This pathway is being prepared</p>
            <p className="mt-2 leading-relaxed">
              There are no published flagship courses linked yet, so you cannot start this pathway in the app. When courses ship, they will appear here—meanwhile,
              explore pathways that already include live courses.
            </p>
            <Link
              className="mt-4 inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-5 py-2 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)]"
              to={LEGAL_ROUTES.paths}
            >
              Explore available pathways
            </Link>
          </section>
        )}

        <section className="grid gap-4 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] sm:grid-cols-2 sm:p-6">
          <div>
            <p className={sectionTitle}>Who it is for</p>
            <p className="mt-2 text-[14px] text-[color:var(--jf-text)]">{pathway.targetLearner}</p>
          </div>
          <div>
            <p className={sectionTitle}>Level</p>
            <p className="mt-2 text-[14px] text-[color:var(--jf-text)]">{pathway.levelRange}</p>
          </div>
          <div className="sm:col-span-2">
            <p className={sectionTitle}>Estimated duration</p>
            <p className="mt-2 text-[14px] text-[color:var(--jf-text)]">{pathway.estimatedDuration}</p>
          </div>
        </section>

        <details className="rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-4 py-4 sm:px-5">
          <summary className="cursor-pointer text-[14px] font-semibold text-[color:var(--jf-text)]">Skills &amp; example roles</summary>
          <div className="mt-4 space-y-5 border-t border-[color:var(--jf-border)] pt-4">
            <div>
              <p className={sectionTitle}>Skills</p>
              <ul className="mt-2 list-inside list-disc space-y-1.5 text-[14px] text-[color:var(--jf-muted)]">
                {pathway.skillsGained.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className={sectionTitle}>Example roles</p>
              <p className={`mt-2 text-[13px] ${prose}`}>Examples only—not job placement or income guarantees.</p>
              <ul className="mt-2 list-inside list-disc space-y-1.5 text-[14px] text-[color:var(--jf-muted)]">
                {pathway.possibleRoles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>

        <section id="pathway-included-courses">
          <h2 className={sectionTitle}>Included courses</h2>
          <p className={`mt-2 max-w-xl text-[13px] ${prose}`}>Live flagship courses in this pathway.</p>
          <ul className="mt-4 space-y-3">
            {pathway.includedCourseSlugs.map((slug) => {
              const meta = resolveCourseSummaryForSlug(slug)
              if (!meta || meta.availability !== 'available') return null
              const row = courseRows.find((r) => r.slug === slug)
              const pct = row ? Math.round(row.sessionFraction * 100) : 0
              return (
                <li
                  key={slug}
                  className="rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-4 py-3 shadow-[var(--jf-shadow-soft)] ring-1 ring-stone-900/[0.03] transition hover:border-stone-300/70 sm:px-5"
                >
                  <Link
                    className="block break-words text-left text-[15px] font-semibold text-[color:var(--jf-text)] hover:underline sm:text-base"
                    to={`/learn/courses/${slug}`}
                  >
                    {meta.title}
                  </Link>
                  <p className="mt-1 text-[13px] text-[color:var(--jf-muted)]">{meta.subtitle}</p>
                  {row ? (
                    <p className="mt-2 text-[11px] leading-relaxed text-[color:var(--jf-subtle)]">
                      About {pct}% complete{row.started ? '' : ' · not started yet'}
                    </p>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </section>

        {pathway.plannedCourseSlugs.length ? (
          <details className="rounded-xl border border-dashed border-[color:var(--jf-border)] bg-stone-50/60 px-4 py-4 sm:px-5">
            <summary className="cursor-pointer text-[14px] font-semibold text-[color:var(--jf-text)]">
              Planned courses ({pathway.plannedCourseSlugs.length})
            </summary>
            <p className={`mt-3 text-[13px] ${prose}`}>Roadmap only—doesn&apos;t affect progress on live courses above.</p>
            <ul className="mt-4 space-y-3">
              {pathway.plannedCourseSlugs.map((slug) => {
                const meta = resolveCourseSummaryForSlug(slug)
                if (!meta) {
                  return (
                    <li key={slug} className="rounded-xl border border-dashed border-[color:var(--jf-border)] px-4 py-3 text-[13px] text-[color:var(--jf-muted)]">
                      <span className="font-mono text-[12px]">{slug}</span> — catalog entry pending
                    </li>
                  )
                }
                return (
                  <li key={slug} className="rounded-xl border border-dashed border-stone-300/80 bg-stone-50/80 px-4 py-3" data-testid="pathway-planned-course-row">
                    <p className="font-semibold text-[color:var(--jf-text)]">{meta.title}</p>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-[color:var(--jf-subtle)]">
                      {meta.availability === 'coming_soon' ? 'Coming soon' : 'Planned'}
                    </p>
                    <p className="mt-2 text-[13px] text-[color:var(--jf-muted)]">{meta.subtitle}</p>
                  </li>
                )
              })}
            </ul>
          </details>
        ) : null}

        <section id="pathway-portfolio-guidance" className="rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-4 py-4 shadow-sm sm:px-5">
          <h2 className={sectionTitle}>Portfolio</h2>
          <p className={`mt-2 max-w-xl text-[14px] ${prose}`}>
            You&apos;ll build practical proof through course work—plan artifacts here; uploads come later.
          </p>
          <details className="mt-4 rounded-lg border border-orange-200/50 bg-orange-50/40 px-4 py-3">
            <summary className="cursor-pointer text-[14px] font-semibold text-[color:var(--jf-text)]">
              View portfolio items ({requiredOutputs.length + optionalOutputs.length})
            </summary>
            <div className="mt-4 space-y-6 border-t border-[color:var(--jf-border)]/60 pt-4">
              {requiredOutputs.length ? (
                <div>
                  <p className="text-[12px] font-semibold text-[color:var(--jf-text)]">Core outputs</p>
                  <ul className="mt-2 space-y-3">
                    {requiredOutputs.map((o) => (
                      <li key={o.id} className="rounded-lg border border-[color:var(--jf-border)] bg-white px-3 py-2.5">
                        <p className="font-semibold text-[color:var(--jf-text)]">{o.title}</p>
                        <p className="mt-0.5 text-[13px] text-[color:var(--jf-muted)]">{o.description}</p>
                        {o.courseSlug ? (
                          <Link className="mt-2 inline-block text-[12px] font-semibold text-[color:var(--jf-brand)]" to={`/learn/courses/${o.courseSlug}`}>
                            Related course
                          </Link>
                        ) : null}
                        {o.filenameGuidance ? (
                          <details className="mt-2 text-[12px] text-[color:var(--jf-muted)]">
                            <summary className="cursor-pointer font-medium text-[color:var(--jf-text)]">File naming</summary>
                            <p className="mt-1 leading-relaxed">{o.filenameGuidance}</p>
                          </details>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div>
                <p className="text-[12px] font-semibold text-[color:var(--jf-text)]">Additional outputs</p>
                <ul className="mt-2 space-y-3">
                  {optionalOutputs.map((o) => (
                    <li key={o.id} className="rounded-lg border border-[color:var(--jf-border)] bg-white px-3 py-2.5">
                      <p className="font-semibold text-[color:var(--jf-text)]">{o.title}</p>
                      <p className="mt-0.5 text-[13px] text-[color:var(--jf-muted)]">{o.description}</p>
                      {o.courseSlug ? (
                        <Link className="mt-2 inline-block text-[12px] font-semibold text-[color:var(--jf-brand)]" to={`/learn/courses/${o.courseSlug}`}>
                          Related course
                        </Link>
                      ) : null}
                      {o.filenameGuidance || o.learnerInstructionsPlaceholder ? (
                        <details className="mt-2 text-[12px] text-[color:var(--jf-muted)]">
                          <summary className="cursor-pointer font-medium text-[color:var(--jf-text)]">Notes</summary>
                          <div className="mt-1 space-y-1 leading-relaxed">
                            {o.filenameGuidance ? <p>{o.filenameGuidance}</p> : null}
                            {o.learnerInstructionsPlaceholder ? <p className="text-[color:var(--jf-subtle)]">{o.learnerInstructionsPlaceholder}</p> : null}
                          </div>
                        </details>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </section>

        <details className="rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/50 px-4 py-4 sm:px-5">
          <summary className="cursor-pointer text-[14px] font-semibold text-[color:var(--jf-text)]">Themes, capstone &amp; certificate detail</summary>
          <div className="mt-4 space-y-6 border-t border-[color:var(--jf-border)] pt-6">
            <section>
              <h2 className={sectionTitle}>Portfolio themes</h2>
              <ul className="mt-3 list-inside list-disc space-y-1.5 text-[14px] text-[color:var(--jf-muted)]">
                {pathway.portfolioOutputs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className={sectionTitle}>Final project</h2>
              <p className={`mt-2 ${prose}`}>{pathway.finalProjectCapstone}</p>
            </section>
            <section>
              <h2 className={sectionTitle}>Certificate readiness</h2>
              <p className={`mt-2 ${prose}`}>{pathway.certificateReadinessCriteria}</p>
            </section>
            <section className="grid gap-4 sm:grid-cols-2">
              <div>
                <h2 className={sectionTitle}>Kenya relevance</h2>
                <p className={`mt-2 ${prose}`}>{pathway.kenyaRelevance}</p>
              </div>
              <div>
                <h2 className={sectionTitle}>Global relevance</h2>
                <p className={`mt-2 ${prose}`}>{pathway.globalRelevance}</p>
              </div>
            </section>
          </div>
        </details>

        {next ? (
          <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)]">
            <p className={sectionTitle}>Recommended next pathway</p>
            <Link className="mt-2 inline-block text-[15px] font-semibold text-[color:var(--jf-text)] hover:underline" to={`/paths/${next.slug}`}>
              {next.title} →
            </Link>
            <p className="mt-2 text-[13px] text-[color:var(--jf-muted)]">{next.description}</p>
          </section>
        ) : null}

        <div className="flex flex-wrap gap-3 border-t border-[color:var(--jf-border)] pt-8" data-testid="pathway-cta-row">
          {!signedIn || !authConfigured ? (
            <>
              {authConfigured ? (
                <Link
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)]"
                  to={`${LEGAL_ROUTES.authSignUp}?returnUrl=${returnUrl}`}
                  data-testid="pathway-cta-signup"
                >
                  Sign up to follow this pathway
                </Link>
              ) : (
                <Link
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)]"
                  to={LEGAL_ROUTES.learn}
                >
                  Explore courses
                </Link>
              )}
              {authConfigured ? (
                <Link
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] hover:bg-stone-50"
                  to={`${LEGAL_ROUTES.authSignIn}?returnUrl=${returnUrl}`}
                  data-testid="pathway-cta-signin"
                >
                  Sign in
                </Link>
              ) : null}
              <a
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-transparent px-6 py-2.5 text-sm font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]"
                href="#pathway-included-courses"
              >
                View included courses
              </a>
            </>
          ) : showFollowUx ? (
            <>
              {followingThis ? (
                <>
                  <Link
                    className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)]"
                    to={nextAction.kind === 'planned_only' ? LEGAL_ROUTES.paths : nextAction.href}
                    data-testid="pathway-cta-primary-signedin"
                  >
                    {nextAction.buttonLabel}
                  </Link>
                  <span
                    className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-emerald-200/80 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-900"
                    data-testid="pathway-following-badge"
                  >
                    Following this pathway
                  </span>
                  <Link
                    className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] hover:bg-stone-50"
                    to={LEGAL_ROUTES.paths}
                    data-testid="pathway-change-pathway"
                  >
                    Change pathway
                  </Link>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)] disabled:opacity-60"
                    data-testid="pathway-cta-follow"
                    disabled={followBusy}
                    onClick={() => {
                      void setPrimaryPathway(pathway.slug).catch(() => {})
                    }}
                  >
                    Follow this pathway
                  </button>
                  {nextAction.kind !== 'planned_only' ? (
                    <Link
                      className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] hover:bg-stone-50"
                      to={nextAction.href}
                      data-testid="pathway-cta-secondary-next"
                    >
                      {nextAction.buttonLabel}
                    </Link>
                  ) : null}
                </>
              )}
              <a
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-transparent px-6 py-2.5 text-sm font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]"
                href="#pathway-included-courses"
              >
                View included courses
              </a>
              <Link
                className="inline-flex min-h-[2.75rem] items-center justify-center px-4 text-sm font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]"
                to={LEGAL_ROUTES.paths}
              >
                All pathways
              </Link>
            </>
          ) : hasAnyAvailableCourse && nextAction.kind !== 'planned_only' ? (
            <>
              <Link
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)]"
                to={nextAction.href}
                data-testid="pathway-cta-primary-signedin"
              >
                {nextAction.buttonLabel}
              </Link>
              <a
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] hover:bg-stone-50"
                href="#pathway-included-courses"
              >
                View included courses
              </a>
              <Link className="inline-flex min-h-[2.75rem] items-center justify-center px-4 text-sm font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.paths}>
                All pathways
              </Link>
            </>
          ) : (
            <>
              <Link
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white"
                to={nextAction.kind === 'planned_only' ? nextAction.hrefExplore : LEGAL_ROUTES.paths}
              >
                {nextAction.kind === 'planned_only' ? nextAction.buttonLabel : 'Explore available pathways'}
              </Link>
              <Link className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] hover:bg-stone-50" to={LEGAL_ROUTES.learn}>
                View courses
              </Link>
            </>
          )}
        </div>

        {prefError ? (
          <p className="mt-3 text-[12px] text-rose-700" role="alert">
            {prefError}
          </p>
        ) : null}

        {signedIn && nextAction.kind === 'planned_only' ? (
          <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{nextAction.message}</p>
        ) : null}

        <footer className="border-t border-[color:var(--jf-border)] pt-8">
          <TrustLegalFooterLinks variant="compact" className="text-[color:var(--jf-subtle)]" />
        </footer>
      </div>
    </div>
  )
}
