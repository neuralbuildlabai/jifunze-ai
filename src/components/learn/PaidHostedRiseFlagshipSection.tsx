import { Link } from 'react-router-dom'
import { MODULE_QUIZ_DRAW_COUNT } from '../../lib/flagshipModuleQuizPools'
import { getPaidFlagshipCertificateConfig } from '../../lib/paidFlagshipCertificateConfig'
import { LEGAL_ROUTES } from '../../training/trustCopy'

type Props = {
  courseSlug: string
  courseTitle: string
}

const AI_PRODUCTIVITY_SUBTITLE =
  'Build practical AI habits for planning, writing, research, data, workflows, automation, meetings, support, and responsible review.'

const PATH_STEPS = [
  'Launch the course',
  'Complete the learning sections and checks',
  'Prepare your capstone portfolio',
  'Submit your final capstone',
  'Certificate unlocks after review and pass',
] as const

export function PaidHostedRiseFlagshipSection({ courseSlug, courseTitle }: Props) {
  const cfg = getPaidFlagshipCertificateConfig(courseSlug)
  const risePath = cfg?.hostedRiseIndexPath
  if (!cfg || !risePath) return null

  const capstoneHref = `/learn/courses/${courseSlug}/capstone`

  return (
    <div className="mt-6 space-y-6" data-testid="paid-hosted-rise-flagship-section">
      <div className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] ring-1 ring-stone-900/[0.04] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to={LEGAL_ROUTES.learn}
            className="text-[12px] font-medium text-[color:var(--jf-muted)] transition hover:text-[color:var(--jf-text)]"
          >
            ← All courses
          </Link>
        </div>

        <h1 className="mt-4 text-[1.65rem] font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[1.9rem] sm:leading-tight">
          {courseTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{AI_PRODUCTIVITY_SUBTITLE}</p>

        <p className="mt-4 text-[12px] leading-snug text-[color:var(--jf-subtle)]">
          Paid flagship course · {cfg.provider} · Certificate valid for {cfg.certificateValidityYears} years
        </p>

        <p className="mt-4 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
          Certificate unlocks after required checks are complete and the final capstone is reviewed and passed.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={risePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
            data-testid="paid-rise-launch-course"
          >
            Launch Course
          </a>
          <Link
            to={capstoneHref}
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-stone-100/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
            data-testid="paid-rise-submit-capstone"
          >
            Submit Final Capstone
          </Link>
        </div>
      </div>

      <section
        className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-sm sm:p-7"
        aria-labelledby="your-path-heading"
      >
        <h2 id="your-path-heading" className="text-[15px] font-semibold tracking-tight text-[color:var(--jf-text)]">
          Your path
        </h2>
        <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[14px] leading-snug text-[color:var(--jf-muted)]">
          {PATH_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section
        className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] p-6 sm:p-7"
        aria-labelledby="completion-req-heading"
      >
        <h2 id="completion-req-heading" className="text-[15px] font-semibold tracking-tight text-[color:var(--jf-text)]">
          Completion requirements
        </h2>
        <ul className="mt-4 space-y-2 text-[14px] leading-snug text-[color:var(--jf-muted)]">
          <li className="flex gap-2">
            <span className="text-[color:var(--jf-text)]/50" aria-hidden>
              ·
            </span>
            <span>Complete the course learning sections</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[color:var(--jf-text)]/50" aria-hidden>
              ·
            </span>
            <span>
              Pass required checks: {cfg.moduleQuizMinCorrect} of {MODULE_QUIZ_DRAW_COUNT} correct
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-[color:var(--jf-text)]/50" aria-hidden>
              ·
            </span>
            <span>Submit the final capstone</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[color:var(--jf-text)]/50" aria-hidden>
              ·
            </span>
            <span>Pass capstone review: {cfg.capstonePassScore}% or higher</span>
          </li>
        </ul>
        <p className="mt-4 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
          Certificates are issued by {cfg.provider} and are valid for {cfg.certificateValidityYears} years from the issue date.
        </p>
      </section>

      <section
        className="rounded-2xl border border-stone-200/90 bg-gradient-to-b from-amber-50/35 to-[color:var(--jf-surface)] p-6 sm:p-7"
        aria-labelledby="final-capstone-heading"
      >
        <h2 id="final-capstone-heading" className="text-[15px] font-semibold tracking-tight text-[color:var(--jf-text)]">
          Final capstone
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
          Your capstone proves that you can apply the course skills in a realistic work, study, business, or community scenario.
        </p>
        <p className="mt-4 text-[13px] font-medium text-[color:var(--jf-text)]">Before submitting, include:</p>
        <ul className="mt-2 space-y-1.5 text-[14px] leading-snug text-[color:var(--jf-muted)]">
          <li>Scenario description</li>
          <li>AI productivity system overview</li>
          <li>Selected artifacts</li>
          <li>Prompt library sample</li>
          <li>Workflow or process map</li>
          <li>Risk and privacy checklist</li>
          <li>Human-review notes</li>
          <li>Final reflection</li>
        </ul>
        <div className="mt-6">
          <Link
            to={capstoneHref}
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)]"
          >
            Submit Final Capstone
          </Link>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
          Your certificate is awarded only after your capstone is reviewed and passed.
        </p>
      </section>

      <section
        className="rounded-2xl border border-dashed border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/80 px-5 py-5 sm:px-6"
        aria-labelledby="interactive-rise-heading"
      >
        <h2 id="interactive-rise-heading" className="text-sm font-semibold text-[color:var(--jf-text)]">
          Interactive course
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
          The full Rise experience opens in a new tab—return here anytime for sessions, checks, and capstone submission.
        </p>
        <a
          href={risePath}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] bg-white px-5 text-[13px] font-semibold text-[color:var(--jf-text)] shadow-sm transition hover:bg-stone-50"
        >
          Launch Course
        </a>
      </section>
    </div>
  )
}
