import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { authFailureMessage } from '../../auth/authErrorMessage'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { passwordPolicyErrorMessage, passwordPolicyHint } from '../../auth/passwordPolicy'
import { AuthPageShell } from './AuthPageShell'

const INPUT_CLASS =
  'w-full rounded-xl border border-white/15 bg-[#0B0B12] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/40'

/** Sets a new password from a recovery link (administrator accounts). */
export function ResetPasswordPage() {
  const { supabase, error, clearAuthMessages } = useAuth()
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  if (!isSupabaseConfigured() || !supabase) {
    return (
      <AuthPageShell eyebrow="Administrator access" title="Password reset unavailable">
        <p className="text-sm text-zinc-400">Password reset isn&apos;t available in this environment.</p>
      </AuthPageShell>
    )
  }

  const client = supabase

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLocalError(null)
    clearAuthMessages()
    const pwErr = passwordPolicyErrorMessage(password)
    if (pwErr) {
      setLocalError(pwErr)
      return
    }
    if (password !== password2) {
      setLocalError('Passwords do not match.')
      return
    }
    setBusy(true)
    try {
      const { error: updErr } = await client.auth.updateUser({ password })
      if (updErr) {
        setLocalError(authFailureMessage(updErr))
        return
      }
      setDone(true)
    } catch (err) {
      setLocalError(authFailureMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthPageShell
      eyebrow="Administrator access"
      title="Choose a new password"
      intro={`Use the link from your email to open this page, then set a new password below. ${passwordPolicyHint()}`}
    >
      {done ? (
        <div className="w-full max-w-sm space-y-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-center">
          <p className="text-sm font-medium text-emerald-300">Password updated</p>
          <p className="text-[13px] text-emerald-200/80">You can sign in with your new password.</p>
          <Link
            to="/admin/login"
            className="inline-flex justify-center rounded-full bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8B5CF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            Go to sign in
          </Link>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left sm:p-6"
        >
          <label className="block space-y-1.5">
            <span className="text-[12px] font-medium text-zinc-400">New password</span>
            <input
              type="password"
              required
              minLength={12}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={INPUT_CLASS}
              autoComplete="new-password"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-[12px] font-medium text-zinc-400">Confirm password</span>
            <input
              type="password"
              required
              minLength={12}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className={INPUT_CLASS}
              autoComplete="new-password"
            />
          </label>
          {(localError || error) ? (
            <p className="text-xs text-rose-400" role="alert">
              {localError ?? error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            {busy ? 'Please wait…' : 'Update password'}
          </button>
        </form>
      )}
    </AuthPageShell>
  )
}
