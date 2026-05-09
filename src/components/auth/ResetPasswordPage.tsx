import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { authFailureMessage } from '../../auth/authErrorMessage'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { passwordPolicyErrorMessage, passwordPolicyHint } from '../../auth/passwordPolicy'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'

export function ResetPasswordPage() {
  const { supabase, error, clearAuthMessages } = useAuth()
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  if (!isSupabaseConfigured() || !supabase) {
    return (
      <div className="jf-learn-warm flex min-h-screen items-center justify-center bg-[var(--jf-bg-page)] px-4 text-sm text-stone-600">
        Password reset isn&apos;t available in this environment.
      </div>
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
    <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-5 py-14 sm:px-8">
        <div className="mb-8 flex justify-center">
          <JifunzeBrandLogo to="/" size="xxl" surface="light" />
        </div>
        {done ? (
          <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-[0_22px_50px_-20px_rgba(120,53,15,0.18)]">
            <p className="text-sm font-medium text-emerald-800">Password updated</p>
            <p className="text-[13px] text-emerald-700/95">You can sign in with your new password.</p>
            <Link
              to="/?auth=signin#auth"
              className="inline-flex justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105"
            >
              Go to sign in
            </Link>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border border-orange-100/90 bg-white p-6 shadow-[0_22px_50px_-20px_rgba(120,53,15,0.18)]"
          >
            <h1 className="text-lg font-semibold text-stone-900">Choose a new password</h1>
            <p className="text-[13px] leading-relaxed text-stone-600">
              Use the link from your email to open this page, then set a new password below. {passwordPolicyHint()}
            </p>
            <label className="block space-y-1">
              <span className="text-[12px] font-medium text-stone-700">New password</span>
              <input
                type="password"
                required
                minLength={12}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200/70"
                autoComplete="new-password"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-[12px] font-medium text-stone-700">Confirm password</span>
              <input
                type="password"
                required
                minLength={12}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200/70"
                autoComplete="new-password"
              />
            </label>
            {(localError || error) ? (
              <p className="text-[13px] text-rose-700" role="alert">
                {localError ?? error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? 'Please wait…' : 'Update password'}
            </button>
          </form>
        )}
        <div className="mt-6">
          <TrustLegalFooterLinks
            variant="compact"
            className="justify-center text-stone-500 [&_a]:text-stone-600 [&_a]:hover:text-orange-700"
          />
        </div>
        <p className="mt-6 text-center text-[13px] text-stone-500">
          <Link
            to="/?auth=signin#auth"
            className="font-semibold text-orange-700 underline-offset-2 hover:text-orange-800 hover:underline"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
