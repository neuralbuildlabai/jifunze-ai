import { Link } from 'react-router-dom'
import { DISCLAIMER_ACKNOWLEDGMENT_MODAL_BODY, LEGAL_ROUTES } from '../../training/trustCopy'

type Props = {
  onAcknowledge: () => void
}

/**
 * Blocking acknowledgment after sign-in — summarizes boundaries; full legal text remains on linked pages.
 */
export function DisclaimerAcknowledgmentModal(props: Props) {
  const { onAcknowledge } = props

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 px-4 py-10 backdrop-blur-[2px]"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-ack-title"
        data-testid="disclaimer-acknowledgment-modal"
        className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.06),rgba(24,22,34,0.96))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.05] sm:p-7"
      >
        <h1 id="disclaimer-ack-title" className="text-xl font-semibold tracking-tight text-white">
          Before you continue
        </h1>

        <p className="mt-4 text-[13px] leading-relaxed text-zinc-300">{DISCLAIMER_ACKNOWLEDGMENT_MODAL_BODY}</p>

        <nav
          className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/[0.06] pt-5 text-[11px] text-zinc-500"
          aria-label="Legal links"
          data-testid="disclaimer-acknowledgment-policy-links"
        >
          <Link className="text-violet-300/90 underline-offset-2 hover:text-violet-200 hover:underline" to={LEGAL_ROUTES.disclaimer}>
            Disclaimer
          </Link>
          <span aria-hidden className="text-zinc-600">
            {' '}
            ·{' '}
          </span>
          <Link className="text-violet-300/90 underline-offset-2 hover:text-violet-200 hover:underline" to={LEGAL_ROUTES.terms}>
            Terms
          </Link>
          <span aria-hidden className="text-zinc-600">
            {' '}
            ·{' '}
          </span>
          <Link className="text-violet-300/90 underline-offset-2 hover:text-violet-200 hover:underline" to={LEGAL_ROUTES.privacy}>
            Privacy
          </Link>
          <span aria-hidden className="text-zinc-600">
            {' '}
            ·{' '}
          </span>
          <Link className="text-violet-300/90 underline-offset-2 hover:text-violet-200 hover:underline" to={LEGAL_ROUTES.refunds}>
            Refunds
          </Link>
        </nav>

        <button
          type="button"
          data-testid="disclaimer-acknowledgment-confirm"
          onClick={onAcknowledge}
          className="mt-7 w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
        >
          Acknowledge and continue
        </button>

        <div className="mt-4 text-center">
          <Link
            to={LEGAL_ROUTES.disclaimer}
            data-testid="disclaimer-acknowledgment-review-full"
            className="text-[11px] font-medium text-zinc-500 underline-offset-2 hover:text-zinc-300 hover:underline"
          >
            Review full disclaimer
          </Link>
        </div>
      </div>
    </div>
  )
}
