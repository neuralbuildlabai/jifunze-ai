import { Link } from 'react-router-dom'
import { MODULE_QUIZ_DRAW_COUNT } from '../../lib/flagshipModuleQuizPools'
import { getPaidFlagshipCertificateConfig } from '../../lib/paidFlagshipCertificateConfig'

type Props = {
  courseSlug: string
  courseTitle: string
}

export function PaidHostedRiseFlagshipSection({ courseSlug, courseTitle }: Props) {
  const cfg = getPaidFlagshipCertificateConfig(courseSlug)
  const risePath = cfg?.hostedRiseIndexPath
  if (!cfg || !risePath) return null

  const capstoneHref = `/learn/courses/${courseSlug}/capstone`
  const modulePct = Math.round((cfg.moduleQuizMinCorrect / MODULE_QUIZ_DRAW_COUNT) * 100)

  return (
    <section
      className="mt-10 rounded-2xl border border-emerald-100/90 bg-gradient-to-b from-emerald-50/40 to-[color:var(--jf-surface)] p-6 shadow-sm sm:p-8"
      aria-labelledby="hosted-rise-course-heading"
      data-testid="paid-hosted-rise-flagship-section"
    >
      <h2 id="hosted-rise-course-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
        {courseTitle}
      </h2>
      <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.12em] text-emerald-900/80">Paid flagship · Hosted Rise course</p>

      <ul className="mt-5 space-y-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
        <li>
          <span className="font-medium text-[color:var(--jf-text)]">Provider:</span> {cfg.provider}
        </li>
        <li>
          <span className="font-medium text-[color:var(--jf-text)]">Capstone:</span> Required — submit and pass review (grader pass line {cfg.capstonePassScore}%+).
        </li>
        <li>
          <span className="font-medium text-[color:var(--jf-text)]">Module knowledge checks:</span> At least {cfg.moduleQuizMinCorrect} of {MODULE_QUIZ_DRAW_COUNT} correct
          ({modulePct}%+; meets the 80% bar for this track).
        </li>
        <li>
          <span className="font-medium text-[color:var(--jf-text)]">Certificate validity:</span> {cfg.certificateValidityYears} years from issue date when awarded.
        </li>
      </ul>

      <p className="mt-5 rounded-xl border border-stone-200/80 bg-white/80 px-4 py-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
        The certificate of completion is awarded only after your capstone has been submitted, reviewed, and passed according to the course requirements.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={risePath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--jf-shadow-soft)] transition hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
          data-testid="paid-rise-launch-course"
        >
          Launch course
        </a>
        <Link
          to={capstoneHref}
          className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-emerald-700/35 bg-emerald-50/60 px-6 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-100/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
          data-testid="paid-rise-submit-capstone"
        >
          Submit Final Capstone
        </Link>
      </div>
    </section>
  )
}
