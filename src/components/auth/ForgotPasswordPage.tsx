import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { authFailureMessage } from '../../auth/authErrorMessage'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { AuthPageShell } from './AuthPageShell'

/**
 * Password recovery for administrator accounts. The confirmation copy is identical whether or
 * not the address has an account, so the form does not enable account enumeration.
 */
export function ForgotPasswordPage() {
  const { requestPasswordReset, error, authInfo, clearAuthMessages } = useAuth()
  const [email, setEmail] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!isSupabaseConfigured()) {
    return (
      <AuthPageShell eyebrow="Administrator access" title="Password recovery unavailable">
        <p className="text-sm text-zinc-400">This build has no Supabase configuration.</p>
      </AuthPageShell>
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
    <AuthPageShell
      eyebrow="Administrator access"
      title="Reset your password"
      intro="Enter your account email. If it matches an administrator account, a reset link will be sent."
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left sm:p-6"
      >
        <label className="block space-y-1.5">
          <span className="text-[12px] font-medium text-zinc-400">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-[#0B0B12] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/40"
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
          className="w-full rounded-full bg-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
        >
          {busy ? 'Please wait…' : 'Send reset link'}
        </button>
      </form>
      <p className="text-center text-[13px] text-zinc-500">
        <Link
          to="/admin/login"
          className="font-medium text-[#A78BFA] underline-offset-2 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
        >
          Back to sign in
        </Link>
      </p>
    </AuthPageShell>
  )
}
