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
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { FlagshipCourseLearningPath } from './FlagshipCourseLearningPath'
import { FlagshipSupportMaterials } from './FlagshipSupportMaterials'

const WHAT_YOU_LEARN = [
  'Prompt with clear intent, constraints, and output shape—and iterate with evidence, not guesswork.',
  'Verify AI outputs against sources and stakes; know when to slow down or refuse automation.',
  'Use AI for writing, study, research, workflows, and decisions while keeping human accountability visible.',
  'Collaborate with others on norms, disclosure, and quality gates for AI-assisted work.',
  'Build reusable prompt habits, light review loops, and a personal safety boundary for data and risk.',
  'Turn lessons into a steady rhythm: small experiments, short notes, and visible improvement week to week.',
  'Ship a Responsible AI fluency portfolio you could walk a mentor or manager through.',
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
  const { completed, certificateReady, capstonePrepAccessible, capstonePrepComplete, state } = progress
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
          : 'Resume learning'

  const primaryHref =
    purchaseGateEnabled && !hasCourseAccess
      ? `/learn/checkout?course=${slug}`
      : nextOpen
        ? resumeHref
        : firstOpen
          ? startHref
          : `/learn/courses/${slug}#curriculum`

  return (
    <div className="space-y-12">
      <section
        id="ai-essentials-hero"
        className="scroll-mt-24 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/60 px-5 py-8 sm:px-8 sm:py-10"
        aria-labelledby="ae-hero-title"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--jf-muted)]">
          {school.label} · Course 1
        </p>
        <h1 id="ae-hero-title" className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight text-[color:var(--jf-text)] sm:text-[2.25rem]">
          {course.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[color:var(--jf-muted)]">
          Build practical AI fluency: prompt clearly, verify outputs, use AI responsibly, design light workflows, and assemble a
          Responsible AI fluency portfolio.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-[13px] text-[color:var(--jf-muted)]">
          <span className="rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 py-1 font-medium text-[color:var(--jf-text)]">
            {course.levelRange}
          </span>
          <span className="rounded-full border border-[color:var(--jf-border)] px-3 py-1">16 modules</span>
          <span className="rounded-full border border-[color:var(--jf-border)] px-3 py-1">{curriculum.estimatedDurationLabel}</span>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            to={primaryHref}
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
            data-testid="ae-hero-primary-cta"
          >
            {primaryLabel}
          </Link>
          <a
            href="#curriculum"
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/[0.12] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-white/[0.05]"
          >
            View curriculum
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
      </section>

      <section
        className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-5 py-6 sm:px-7"
        aria-labelledby="ae-progress-heading"
      >
        <h2 id="ae-progress-heading" className="text-[15px] font-semibold text-[color:var(--jf-text)]">
          Your progress
        </h2>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-3xl font-semibold tabular-nums text-[color:var(--jf-text)]">{progress.progressPercent}%</span>
          <span className="text-[14px] text-[color:var(--jf-muted)]">
            {progress.modulesCompleted} / {progress.modulesTotal} modules complete
          </span>
        </div>
        <div className="mt-3 h-2 max-w-md overflow-hidden rounded-full bg-[color:var(--jf-bg-page)]">
          <div className="h-full rounded-full bg-emerald-600/50 transition-[width]" style={{ width: `${progress.progressPercent}%` }} />
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
          {next && nextOpen ? (
            <>
              Next: <span className="font-medium text-[color:var(--jf-text)]">{next.title}</span>
            </>
          ) : (
            <>Pick up from the curriculum below—sessions open in order after quizzes and checkpoints where required.</>
          )}
        </p>
        <div className="mt-5 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/80 px-4 py-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
          <span className="font-semibold text-[color:var(--jf-text)]">Certificate readiness: </span>
          {certificateReady ? (
            <span className="text-emerald-200/90">You have met the completion bar (sessions, quizzes, checkpoints, capstone prep).</span>
          ) : (
            <>
              Finish all sessions, pass each module quiz (six of eight correct), complete mastery checkpoints, and capstone prep. The
              product does not issue PDF certificates yet—this summary tracks readiness for future credentialing.
            </>
          )}
        </div>
      </section>

      <section aria-labelledby="ae-learn-heading">
        <h2 id="ae-learn-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
          What you will learn
        </h2>
        <ul className="mt-5 space-y-3">
          {WHAT_YOU_LEARN.map((line) => (
            <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-text)]/35" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ae-create-heading">
        <h2 id="ae-create-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
          What you will create
        </h2>
        <ul className="mt-5 space-y-3">
          {WHAT_YOU_CREATE.map((line) => (
            <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600/45" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/40 px-5 py-5 sm:px-6" aria-labelledby="ae-access-heading">
        <h2 id="ae-access-heading" className="text-[15px] font-semibold text-[color:var(--jf-text)]">
          Access
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
          Purchase this course or subscribe for all-access. Either way, modules unlock in order—checkout opens the interactive path.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={`/learn/checkout?course=${slug}`}
            className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-4 py-2 text-[13px] font-semibold text-zinc-950 hover:bg-[var(--jf-brand-hover)]"
          >
            Buy this course
          </Link>
          <Link
            to="/learn/checkout?plan=all"
            className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-4 py-2 text-[13px] font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.04]"
          >
            All-access
          </Link>
          <Link
            to={`/learn/readiness/${slug}`}
            className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-4 py-2 text-[13px] font-semibold text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]"
          >
            Readiness challenge
          </Link>
        </div>
      </section>

      <div id="curriculum" className="scroll-mt-24">
        <FlagshipCourseLearningPath courseSlug={slug} curriculum={curriculum} sessions={sessions} progress={progress} layout="accordion" />
      </div>

      <section className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/70 px-5 py-6 sm:px-7" aria-labelledby="ae-capstone-heading">
        <h2 id="ae-capstone-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
          Capstone preview
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{curriculum.capstone.title}</p>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-[13px] font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline">
            Full brief and deliverables
          </summary>
          <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{curriculum.capstone.description}</p>
          <ul className="mt-4 space-y-2">
            {curriculum.capstone.deliverables.map((d) => (
              <li key={d} className="flex gap-2 text-[14px] text-[color:var(--jf-text)]">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--jf-muted)]" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
          {capstonePrepAccessible && capstonePrepSession ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-[13px] text-emerald-200/85">
                Capstone prep is open{capstonePrepComplete ? ' (you marked it complete).' : '.'}
              </p>
              <Link
                to={`/learn/courses/${slug}/session/${capstonePrepSession.id}`}
                className="inline-flex min-h-[2.5rem] items-center rounded-full bg-[var(--jf-brand)] px-4 py-2 text-[12px] font-semibold text-zinc-950 hover:bg-[var(--jf-brand-hover)]"
              >
                {capstonePrepComplete ? 'Review capstone prep' : 'Open capstone prep'}
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-[color:var(--jf-subtle)]">Detailed prep unlocks after modules and checkpoints are on track.</p>
          )}
        </details>
      </section>

      <FlagshipSupportMaterials courseSlug={slug} curriculum={curriculum} sessions={sessions} progress={progress} collapsedByDefault />

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
