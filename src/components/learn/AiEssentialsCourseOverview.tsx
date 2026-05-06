import { Link } from 'react-router-dom'
import type { FlagshipCourse, FlagshipSchool } from '../../data/learning/flagshipCoursesCatalog'
import type { FlagshipCourseCurriculum } from '../../data/learning/flagshipCourseCurricula'
import {
  firstSessionInCourseOrder,
  type FlagshipSession,
} from '../../data/learning/flagshipCourseSessions'
import type { FlagshipCourseProgressApi } from '../../hooks/useFlagshipCourseProgress'
import { sessionOpenForLearner } from '../../learner/flagshipSessionPrereq'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { getAiEssentialsMilestonesReachedCount } from '../../lib/aiEssentialsProgressMilestones'
import { MODULE_QUIZ_DRAW_COUNT, MODULE_QUIZ_MIN_CORRECT } from '../../lib/flagshipModuleQuizPools'
import { AI_ESSENTIALS_PATHWAY_BLURBS, AI_ESSENTIALS_PORTFOLIO_SHOWCASE } from '../../lib/aiEssentialsCourseUiMeta'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { LearnHeroAbstractFigure, LearnSectionSparkIcon } from '../visuals/JifunzeLearnVisuals'
import { FlagshipCourseLearningPath } from './FlagshipCourseLearningPath'
import { FlagshipSupportMaterials } from './FlagshipSupportMaterials'

const COURSE_PROMISE = 'Build practical AI skills through guided lessons, practice, and a final capstone.'

const WHAT_YOU_LEARN = [
  'Use prompts with clear task, context, constraints, format, and audience.',
  'Review AI outputs for accuracy, bias, and missing evidence.',
  'Communicate with better tone, audience fit, and responsibility.',
  'Use AI for study without replacing your own understanding.',
  'Build safe workflows, decision support, and team-use guardrails.',
  'Complete a final AI-supported workflow capstone.',
]

const WHAT_YOU_CREATE = [
  'Prompt improvement pack (versions + rationale)',
  'Verification / evidence checklist or sample',
  'AI-assisted writing or research sample with your review visible',
  'Workflow or SOP slice with human gates',
  'Decision-support memo with tradeoffs and next information buys',
  'Personal AI operating system plan (tools, data tiers, boundaries)',
  'Final Responsible AI fluency portfolio + short reflection',
]

type Props = {
  slug: string
  course: FlagshipCourse
  school: FlagshipSchool
  curriculum: FlagshipCourseCurriculum
  sessions: FlagshipSession[]
  progress: FlagshipCourseProgressApi
  purchaseGateEnabled: boolean
  hasCourseAccess: boolean
}

export function AiEssentialsCourseOverview(props: Props) {
  const { slug, course, school, curriculum, sessions, progress, purchaseGateEnabled, hasCourseAccess } = props
  const { completed, certificateReady, capstonePrepAccessible, capstonePrepComplete, state, progressPercent } = progress
  const capstonePrepSession = sessions.find((s) => s.type === 'capstone_prep')

  const first = firstSessionInCourseOrder(sessions)
  const openOpts = {
    capstonePrepAccessible: progress.capstonePrepAccessible,
    curriculum,
    progressState: state,
  }
  const firstOpen = Boolean(first && sessionOpenForLearner(completed, first, openOpts))
  const next = progress.nextSession
  const nextOpen = Boolean(next && sessionOpenForLearner(completed, next, openOpts))

  const startHref = first ? `/learn/courses/${slug}/session/${first.id}` : `/learn/courses/${slug}`
  const resumeHref = next && nextOpen ? `/learn/courses/${slug}/session/${next.id}` : startHref

  const primaryLabel =
    purchaseGateEnabled && !hasCourseAccess
      ? 'Get access'
      : completed.size === 0
        ? 'Start course'
        : progress.resumeLabel === 'Course complete'
          ? 'Review course'
          : 'Continue'

  const primaryHref =
    purchaseGateEnabled && !hasCourseAccess
      ? `/learn/checkout?course=${slug}`
      : nextOpen
        ? resumeHref
        : firstOpen
          ? startHref
          : `/learn/courses/${slug}#curriculum`

  const milestonesReached = getAiEssentialsMilestonesReachedCount(progressPercent)
  const quizPassLine = `${MODULE_QUIZ_DRAW_COUNT} questions · pass with at least ${MODULE_QUIZ_MIN_CORRECT} of ${MODULE_QUIZ_DRAW_COUNT} correct`
  const sessionDone = sessions.filter((s) => completed.has(s.id)).length

  return (
    <div className="space-y-12">
      <section
        id="ai-essentials-hero"
        className="jf-learn-section-blush scroll-mt-24 overflow-hidden rounded-2xl border border-[color:var(--jf-border)] shadow-[var(--jf-shadow-soft)]"
        aria-labelledby="ae-hero-title"
      >
        <div className="grid gap-8 px-5 py-8 sm:px-9 sm:py-11 lg:grid-cols-[minmax(0,1fr)_minmax(0,240px)] lg:items-center lg:gap-10">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--jf-muted)]">AI Essentials</p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
              {school.label} — AI and Digital Fluency, Course 1
            </p>
            <h1 id="ae-hero-title" className="mt-2 text-[2rem] font-semibold leading-tight tracking-tight text-[color:var(--jf-text)] sm:text-[2.35rem]">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] font-medium leading-relaxed text-[color:var(--jf-text)]/90">{COURSE_PROMISE}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-[12px] text-[color:var(--jf-muted)]">
              <span className="rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 py-1 font-medium text-[color:var(--jf-text)] shadow-sm">
                16 modules
              </span>
              <span className="rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/90 px-3 py-1 shadow-sm">About 32–45 hours</span>
              <span className="rounded-full border border-emerald-200/70 bg-emerald-50/95 px-3 py-1 text-emerald-950/90 shadow-sm">Portfolio + capstone</span>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={primaryHref}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
                data-testid="ae-hero-primary-cta"
              >
                {primaryLabel}
              </Link>
              <a
                href="#curriculum"
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] shadow-sm transition hover:bg-stone-50"
              >
                View full course path
              </a>
            </div>
            <TrustBoundaryStrip
              variant="inline"
              compact
              strip="publicHero"
              presentation="utility"
              density="legalLink"
              className="mt-8 max-w-2xl text-[13px] leading-relaxed text-[color:var(--jf-subtle)]"
              dataTestId="ae-hero-trust"
            />
          </div>
          <div className="mx-auto w-full max-w-[260px] opacity-[0.97] lg:mx-0 lg:max-w-none">
            <LearnHeroAbstractFigure className="h-auto w-full drop-shadow-md" />
          </div>
        </div>
      </section>

      <section
        className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-5 py-6 shadow-[var(--jf-shadow-soft)] ring-1 ring-stone-900/[0.04] sm:px-7"
        aria-labelledby="ae-progress-heading"
        data-testid="ae-milestone-progress"
      >
        <h2 id="ae-progress-heading" className="text-[15px] font-semibold text-[color:var(--jf-text)]">
          Your progress
        </h2>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-3xl font-semibold tabular-nums text-[color:var(--jf-text)]">{progressPercent}%</span>
          <span className="text-[14px] text-[color:var(--jf-muted)]">
            {milestonesReached === 0 ? (
              <>You&apos;re just getting started.</>
            ) : (
              <>
                Milestone <span className="font-medium text-[color:var(--jf-text)]">{milestonesReached}</span> of 10 ·{' '}
                <span className="font-medium text-[color:var(--jf-text)]">{sessionDone}</span> of {sessions.length} sessions done
              </>
            )}
          </span>
        </div>
        <div className="mt-3 h-2 max-w-md overflow-hidden rounded-full bg-[color:var(--jf-bg-page)]">
          <div className="h-full rounded-full bg-[color:var(--jf-brand)]/80 transition-[width]" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
          {next && nextOpen ? (
            <>
              Your next lesson: <span className="font-medium text-[color:var(--jf-text)]">{next.title}</span>
            </>
          ) : (
            <>Start with the first module and build step by step.</>
          )}
        </p>
        <div className="mt-5">
          <Link
            to={primaryHref}
            className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-5 py-2 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
            data-testid="ae-progress-resume"
          >
            {primaryLabel}
          </Link>
        </div>
        <details className="mt-6 border-t border-[color:var(--jf-border)] pt-4" data-testid="ae-certificate-readiness">
          <summary className="cursor-pointer text-[13px] font-semibold text-[color:var(--jf-text)]">Completion rules</summary>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400/75" aria-hidden />
              <span>
                Module quizzes: {quizPassLine}.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400/75" aria-hidden />
              <span>
                Full completion: Module 16 plus rubric rows <span className="text-[color:var(--jf-text)]">Ready</span> or{' '}
                <span className="text-[color:var(--jf-text)]">Strong</span>.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-[12px] text-[color:var(--jf-subtle)]">
            {certificateReady ? (
              <span className="text-emerald-800/90">You meet the in-app readiness bar.</span>
            ) : (
              <>In-app readiness only—not a PDF or external credential.</>
            )}
          </p>
        </details>
      </section>

      <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/60 px-5 py-6 sm:px-7" aria-labelledby="ae-learn-main-heading">
        <h2 id="ae-learn-main-heading" className="text-[15px] font-semibold text-[color:var(--jf-text)]">
          What you’ll learn
        </h2>
        <ul className="mt-4 space-y-2">
          {WHAT_YOU_LEARN.slice(0, 4).map((line) => (
            <li key={line} className="flex gap-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-text)]/35" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <details className="mt-4 text-[13px] text-[color:var(--jf-muted)]">
          <summary className="cursor-pointer font-semibold text-[color:var(--jf-text)]">Show full outcomes</summary>
          <ul className="mt-3 space-y-2">
            {WHAT_YOU_LEARN.slice(4).map((line) => (
              <li key={line} className="flex gap-3 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-text)]/35" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <div id="curriculum" className="scroll-mt-24 space-y-4">
        <h2 className="flex flex-wrap items-center gap-2 text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
          <LearnSectionSparkIcon className="h-6 w-6 shrink-0" aria-hidden />
          Curriculum
        </h2>
        <p className="max-w-xl text-[13px] text-[color:var(--jf-muted)]">Start with Module 1 and build your skills step by step.</p>
        <FlagshipCourseLearningPath
          courseSlug={slug}
          curriculum={curriculum}
          sessions={sessions}
          progress={progress}
          layout="accordion"
          showSectionIntro={false}
          hideProgressSummary
        />
      </div>

      <section className="rounded-2xl border border-orange-200/65 bg-orange-50/75 px-5 py-6 sm:px-8" aria-labelledby="ae-capstone-heading" data-testid="ae-capstone-section">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-950/75">Module 16 · Capstone</p>
        <h2 id="ae-capstone-heading" className="mt-2 text-xl font-semibold tracking-tight text-[color:var(--jf-text)]">
          End-to-end AI-supported workflow
        </h2>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
          Bring your artifacts together—plan, verify, and reflect in one integrated project.
        </p>
        <details className="mt-4 rounded-lg border border-orange-200/50 bg-white/60 px-4 py-3">
          <summary className="cursor-pointer text-[13px] font-semibold text-[color:var(--jf-text)]">Brief, deliverables &amp; full completion</summary>
          <p className="mt-3 text-[13px] font-medium text-[color:var(--jf-text)]">{curriculum.capstone.title}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
            100% completion includes Module 16 plus every capstone rubric row Ready or Strong in the app.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{curriculum.capstone.description}</p>
          <ul className="mt-4 space-y-2">
            {curriculum.capstone.deliverables.map((d) => (
              <li key={d} className="flex gap-2 text-[14px] text-[color:var(--jf-text)]">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--jf-muted)]" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </details>
        {capstonePrepAccessible && capstonePrepSession ? (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to={`/learn/courses/${slug}/session/${capstonePrepSession.id}`}
              className="inline-flex min-h-[2.5rem] items-center rounded-full bg-[var(--jf-brand)] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[var(--jf-brand-hover)]"
            >
              {capstonePrepComplete ? 'Review capstone prep' : 'Open capstone prep'}
            </Link>
            <span className="text-[12px] text-emerald-800/90">
              Capstone prep is open{capstonePrepComplete ? ' (marked complete).' : '.'}
            </span>
          </div>
        ) : (
          <p className="mt-4 text-[13px] text-[color:var(--jf-subtle)]">Capstone prep unlocks when earlier modules show you&apos;re ready.</p>
        )}
      </section>

      <p className="text-center text-[13px] text-[color:var(--jf-muted)]">
        You&apos;ll build a small portfolio of practical AI work—examples and filenames stay with each module when you open it.
      </p>

      <FlagshipSupportMaterials courseSlug={slug} curriculum={curriculum} sessions={sessions} progress={progress} collapsedByDefault minimalStrip />

      <details className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/40 px-5 py-4 sm:px-6">
        <summary className="cursor-pointer text-[14px] font-semibold text-[color:var(--jf-text)]">Examples, pathways &amp; full create list</summary>
        <div className="mt-6 space-y-8 border-t border-[color:var(--jf-border)] pt-8">
          <section aria-labelledby="ae-portfolio-showcase-heading">
            <h2 id="ae-portfolio-showcase-heading" className="text-[13px] font-semibold tracking-tight text-[color:var(--jf-text)]">
              Portfolio examples
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {AI_ESSENTIALS_PORTFOLIO_SHOWCASE.slice(0, 6).map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/80 px-3 py-2.5 text-[12px] leading-snug text-[color:var(--jf-muted)]"
                >
                  <p className="font-semibold text-[color:var(--jf-text)]">{item.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="ae-pathways-heading">
            <h2 id="ae-pathways-heading" className="text-[13px] font-semibold tracking-tight text-[color:var(--jf-text)]">
              Related pathways
            </h2>
            <ul className="mt-3 space-y-2">
              {AI_ESSENTIALS_PATHWAY_BLURBS.map((p) => (
                <li key={p.slug} className="flex flex-wrap items-baseline justify-between gap-2 text-[13px] text-[color:var(--jf-muted)]">
                  <span className="font-medium text-[color:var(--jf-text)]">{p.title}</span>
                  <Link to={`/paths/${p.slug}`} className="shrink-0 text-[12px] font-semibold text-[color:var(--jf-brand)] underline-offset-2 hover:underline">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="ae-create-heading">
            <h2 id="ae-create-heading" className="text-[13px] font-semibold tracking-tight text-[color:var(--jf-text)]">
              Full “what you’ll create” list
            </h2>
            <ul className="mt-3 space-y-2">
              {WHAT_YOU_CREATE.map((line) => (
                <li key={line} className="flex gap-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400/60" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </details>

      <section className="flex flex-wrap gap-3 border-t border-[color:var(--jf-border)] pt-10">
        <Link
          to={LEGAL_ROUTES.learn}
          className="inline-flex min-h-[2.5rem] items-center text-[13px] font-semibold text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]"
        >
          ← Back to catalog
        </Link>
      </section>
    </div>
  )
}
