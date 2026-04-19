import { useCallback, useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { authFailureMessage } from '../../auth/authErrorMessage'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'

/**
 * Full-screen gate when the user is signed in but email is not confirmed yet.
 */
export function EmailVerificationGate() {
  const {
    user,
    error,
    authInfo,
    signOut,
    signOutPending,
    resendConfirmationEmail,
    clearAuthMessages,
  } = useAuth()
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const onResend = useCallback(async () => {
    setLocalError(null)
    clearAuthMessages()
    setBusy(true)
    try {
      await resendConfirmationEmail()
    } catch (e) {
      setLocalError(authFailureMessage(e))
    } finally {
      setBusy(false)
    }
  }, [clearAuthMessages, resendConfirmationEmail])

  const email = user?.email ?? null

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
      <div className="w-full max-w-lg space-y-6 rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.04]">
        <header className="space-y-2 text-center">
          <h1 className="text-xl font-semibold text-white">Confirm your email</h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            We sent a confirmation link
            {email ? (
              <>
                {' '}
                to <span className="font-medium text-zinc-200">{email}</span>
              </>
            ) : null}
            . Open the link to activate your account and set up your workspace.
          </p>
        </header>
        {(localError || error) ? (
          <p className="rounded-lg border border-rose-500/30 bg-rose-950/40 px-3 py-2 text-xs text-rose-200" role="alert">
            {localError ?? error}
          </p>
        ) : null}
        {authInfo ? (
          <p className="rounded-lg border border-emerald-500/25 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-200/95" role="status">
            {authInfo}
          </p>
        ) : null}
        <TrustBoundaryStrip compact className="text-left" dataTestId="verify-email-trust-boundary" />
        <TrustLegalFooterLinks variant="compact" className="justify-center" />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            disabled={busy || signOutPending}
            onClick={() => void onResend()}
            className="rounded-lg border border-violet-500/45 bg-violet-600/30 px-4 py-2.5 text-sm font-medium text-violet-100 transition hover:bg-violet-600/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? 'Sending…' : 'Resend confirmation email'}
          </button>
          <button
            type="button"
            disabled={signOutPending}
            onClick={() => void signOut()}
            className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-4 py-2.5 text-sm text-zinc-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign out
          </button>
        </div>
        <p className="text-center text-[11px] leading-relaxed text-zinc-500">
          After confirming, return here and refresh the page, or sign in again.
        </p>
      </div>
    </div>
  )
}
