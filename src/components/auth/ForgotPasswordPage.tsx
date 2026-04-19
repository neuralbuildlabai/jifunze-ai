import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { authFailureMessage } from '../../auth/authErrorMessage'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'

export function ForgotPasswordPage() {
  const { requestPasswordReset, error, authInfo, clearAuthMessages } = useAuth()
  const [email, setEmail] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-sm text-zinc-500">
        Supabase is not configured.
      </div>
    )
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLocalError(null)
    clearAuthMessages()
    setBusy(true)
    try {
      await requestPasswordReset(email)
    } catch (err) {
      setLocalError(authFailureMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_rgba(109,40,217,0.16),_transparent_40%),linear-gradient(180deg,_rgb(30,24,42)_0%,_rgb(21,18,31)_48%,_rgb(18,16,25)_100%)] text-zinc-100">
      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12">
        <div className="mb-8 flex justify-center">
          <JifunzeBrandLogo to="/" size="lg" />
        </div>
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.25)] ring-1 ring-white/[0.04]"
        >
          <h1 className="text-lg font-semibold text-white">Reset password</h1>
          <p className="text-xs leading-relaxed text-zinc-400">
            Enter your account email. If it exists, we will send a link to choose a new password.
          </p>
          <label className="block space-y-1">
            <span className="text-xs text-zinc-500">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
              autoComplete="email"
            />
          </label>
          {(localError || error) ? (
            <p className="text-xs text-rose-400" role="alert">
              {localError ?? error}
            </p>
          ) : null}
          {authInfo ? (
            <p className="text-xs text-emerald-300/95" role="status">
              {authInfo}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? 'Please wait…' : 'Send reset link'}
          </button>
        </form>
        <div className="mt-6 space-y-4">
          <TrustBoundaryStrip compact dataTestId="forgot-password-trust-boundary" />
          <TrustLegalFooterLinks variant="compact" className="justify-center" />
        </div>
        <p className="mt-6 text-center text-xs text-zinc-500">
          <Link to="/?auth=signin#auth" className="font-medium text-violet-300/90 hover:text-violet-200">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
