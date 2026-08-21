import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { authFailureMessage } from '../auth/authErrorMessage'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { resolvePostAuthNavigatePath } from '../lib/signedInDefaultRoute'

/**
 * Credential sign-in form. Sign-in ONLY — public registration does not exist
 * (Amendment 003): there is no signup mode, no account-creation link and no
 * path to `signUp` anywhere in the active application.
 *
 * Error copy is identical for wrong-password and unknown-account cases
 * (see `authFailureMessage`), so the form does not enable account enumeration.
 */
export function AuthForm() {
  const { signIn, error, authInfo, clearAuthMessages } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setLocalError(null)
    clearAuthMessages()
  }, [clearAuthMessages])

  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm leading-relaxed text-zinc-400">
        Sign-in isn&apos;t available in this environment: this build has no Supabase configuration,
        so there is no way to check who you are. Use a configured deployment.
      </p>
    )
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLocalError(null)
    setBusy(true)
    try {
      await signIn(email, password)
      navigate(resolvePostAuthNavigatePath(email.trim(), searchParams.get('returnUrl')), { replace: true })
    } catch (err) {
      setLocalError(authFailureMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
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
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12px] font-medium text-zinc-400">Password</span>
          <Link
            to="/forgot-password"
            className="text-[11px] font-medium text-[#A78BFA] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          className="w-full rounded-xl border border-white/15 bg-[#0B0B12] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/40"
          autoComplete="current-password"
        />
      </div>
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
        {busy ? 'Please wait…' : 'Sign in'}
      </button>
      <p className="text-[11px] leading-relaxed text-zinc-500">
        Access is invite-only for administrators. There is no public registration.
      </p>
    </form>
  )
}
