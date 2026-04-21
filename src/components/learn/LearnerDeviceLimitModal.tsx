import { useLearnerCommerce } from '@/learner/LearnerCommerceContext'

export function LearnerDeviceLimitModal() {
  const { deviceLimitExceeded, dismissDeviceLimitUi, resolveDeviceLimitKeepThisDevice } = useLearnerCommerce()
  if (!deviceLimitExceeded) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="device-limit-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)]">
        <h2 id="device-limit-title" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
          Active device limit
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
          You&apos;ve reached your active device limit for this account. Sign out on another browser or device, or continue here and we&apos;ll keep only this session
          active.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] transition hover:bg-white/[0.05]"
            onClick={dismissDeviceLimitUi}
          >
            Not now
          </button>
          <button
            type="button"
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)]"
            onClick={resolveDeviceLimitKeepThisDevice}
          >
            Continue on this device
          </button>
        </div>
      </div>
    </div>
  )
}
