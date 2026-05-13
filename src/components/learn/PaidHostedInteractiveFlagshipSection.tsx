import { Link } from 'react-router-dom'
import { MODULE_QUIZ_DRAW_COUNT } from '../../lib/flagshipModuleQuizPools'
import { getPaidFlagshipCertificateConfig } from '../../lib/paidFlagshipCertificateConfig'
import { LEGAL_ROUTES } from '../../training/trustCopy'

type Props = {
  courseSlug: string
  courseTitle: string
  /** Optional catalog intro — shown once under the subtitle (not repeated in hero elsewhere). */
  courseIntro?: string
}

const AI_PRODUCTIVITY_SUBTITLE =
  'Structured guided path for repeatable AI-supported productivity systems—hosted interactive lessons plus native capstone submission and staff-reviewed certificate rules in the Learning Hub.'

const PATH_STEPS = [
  'Open the guided interactive lessons and work through each section',
  'Pass the module checks and pacing requirements',
  'Prepare your capstone portfolio',
  'Submit your final capstone for review',
  'Certificate unlocks after review and pass',
] as const

export function PaidHostedInteractiveFlagshipSection({ courseSlug, courseTitle, courseIntro }: Props) {
  const cfg = getPaidFlagshipCertificateConfig(courseSlug)
  const hostedInteractivePath = cfg?.hostedInteractiveIndexPath
  if (!cfg || !hostedInteractivePath) return null

  const capstoneHref = `/learn/courses/${courseSlug}/capstone`

  return (
    <div className="mt-6 space-y-6" data-testid="paid-hosted-interactive-flagship-section">
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
        {courseIntro ? (
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[color:var(--jf-text)]/90">{courseIntro}</p>
        ) : null}

        <p
          className="mt-4 text-[12px] leading-snug text-[color:var(--jf-subtle)]"
          data-testid="paid-hosted-flagship-access"
        >
          Paid flagship · {cfg.provider} · Certificate valid {cfg.certificateValidityYears} years from issue
        </p>

        <p className="mt-4 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
          Your certificate is available only after required checks, capstone submission, and a passing staff review—not automatically on completion.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={hostedInteractivePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
            data-testid="paid-interactive-launch-course"
          >
            Start course
          </a>
          <a
            href={hostedInteractivePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-stone-100/90"
            data-testid="paid-interactive-open-new-tab"
          >
            Open in new window
          </a>
          <Link
            to={capstoneHref}
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-stone-100/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
            data-testid="paid-interactive-submit-capstone"
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
        <div className="mt-5 space-y-2.5">
          {PATH_STEPS.map((step, i) => (
            <div
              key={step}
              className="flex gap-3 rounded-xl border border-stone-200/80 bg-[color:var(--jf-bg-page)] px-3.5 py-3 sm:gap-4 sm:px-4"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--jf-brand)] text-xs font-bold text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <p className="min-w-0 flex-1 text-[14px] font-medium leading-snug text-[color:var(--jf-text)]">{step}</p>
            </div>
          ))}
        </div>
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
            <span>Complete the guided learning sections in the interactive course</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[color:var(--jf-text)]/50" aria-hidden>
              ·
            </span>
            <span>
              Pass required checks: {cfg.moduleQuizMinCorrect} of {MODULE_QUIZ_DRAW_COUNT} correct where quizzes apply
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
          Certificates are issued by {cfg.provider} and remain valid for {cfg.certificateValidityYears} years from the issue date.
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
          Your capstone shows how you apply the course in a realistic work, study, business, or community scenario.
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
    </div>
  )
}
