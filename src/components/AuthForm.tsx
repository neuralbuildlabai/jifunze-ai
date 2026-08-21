import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { TrustLegalFooterLinks } from './TrustLegalFooterLinks'
import { authFailureMessage } from '../auth/authErrorMessage'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { passwordPolicyErrorMessage, passwordPolicyHint } from '../auth/passwordPolicy'
import { resolvePostAuthNavigatePath } from '../lib/signedInDefaultRoute'
import { LEGAL_ROUTES } from '../shared/legalRoutes'
import { TRUST_COPY } from '../training/trustCopy'

type AuthFormProps = {
  initialMode?: 'signin' | 'signup'
  /**
   * Visual surface:
   *  - `default`: dark card (legacy auth layouts).
   *  - `quiet`:   subtle dark variant for embedded use on dark public surfaces.
   *  - `warm`:    cream/white card with orange CTA — matches `.jf-learn-warm` shell.
   */
  appearance?: 'default' | 'quiet' | 'warm'
}

export function AuthForm({ initialMode = 'signin', appearance = 'default' }: AuthFormProps) {
  const { signIn, signUp, error, authInfo, clearAuthMessages, supabase } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode)
  const [localError, setLocalError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [disclaimerAck, setDisclaimerAck] = useState(false)

  useEffect(() => {
    setMode(initialMode)
    setLocalError(null)
    clearAuthMessages()
  }, [clearAuthMessages, initialMode])

  if (!isSupabaseConfigured()) {
    return (
      <p className="text-xs text-zinc-500">
        Sign-in isn&apos;t available in this environment. Use a configured deployment to create an account.
      </p>
    )
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLocalError(null)
    if (mode === 'signup' && !disclaimerAck) {
      setLocalError('Please confirm you have reviewed the disclaimer before continuing.')
      return
    }
    if (mode === 'signup') {
      const pwErr = passwordPolicyErrorMessage(password)
      if (pwErr) {
        setLocalError(pwErr)
        return
      }
    }
    setBusy(true)
    try {
      const postAuth = resolvePostAuthNavigatePath(email.trim(), searchParams.get('returnUrl'))
      if (mode === 'signin') {
        await signIn(email, password)
        navigate(postAuth, { replace: true })
      } else {
        await signUp(email, password)
        if (supabase) {
          const { data } = await supabase.auth.getSession()
          if (data.session?.user) {
            navigate(postAuth, { replace: true })
          }
        }
      }
    } catch (err) {
      setLocalError(authFailureMessage(err))
    } finally {
      setBusy(false)
    }
  }

  const isWarm = appearance === 'warm'
  const shell = isWarm
    ? 'border border-orange-100/90 bg-white p-5 sm:p-6 shadow-[0_22px_50px_-20px_rgba(120,53,15,0.18)]'
    : appearance === 'quiet'
      ? 'border border-white/[0.06] bg-zinc-950/35 p-3.5 shadow-none backdrop-blur-[1px]'
      : 'border border-zinc-800/90 bg-zinc-950/70 p-4 shadow-none'

  const headingClass = isWarm ? 'text-stone-900' : 'text-zinc-100'
  const subTextClass = isWarm ? 'text-stone-600' : 'text-zinc-400'
  const labelClass = isWarm ? 'text-[12px] font-medium text-stone-700' : 'text-xs text-zinc-500'
  const inputClass = isWarm
    ? 'w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200/70'
    : 'w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50'
  const linkAccent = isWarm
    ? 'text-orange-700 hover:text-orange-800'
    : 'text-violet-300/85 hover:text-violet-200'
  const submitClass = isWarm
    ? 'w-full rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50'
    : 'w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40'
  const switchClass = isWarm
    ? 'w-full text-[13px] font-semibold text-orange-700 hover:text-orange-800'
    : 'w-full text-xs font-medium text-violet-300/90 hover:text-violet-200'
  const errorClass = isWarm ? 'text-[13px] text-rose-700' : 'text-xs text-rose-400'
  const infoClass = isWarm ? 'text-[13px] text-emerald-700' : 'text-xs text-emerald-300/95'
  const trustLinkClass = isWarm
    ? 'justify-start text-stone-500 [&_a]:text-stone-600 [&_a]:hover:text-orange-700'
    : 'justify-start text-zinc-500 [&_a]:text-zinc-400 [&_a]:hover:text-zinc-200'
  const guidanceClass = isWarm ? 'text-[11px] leading-relaxed text-stone-500' : 'text-[11px] leading-relaxed text-zinc-500'
  const disclaimerLabelClass = isWarm
    ? 'flex cursor-pointer items-start gap-3 rounded-xl border border-orange-100 bg-orange-50/60 p-3 text-[12px] leading-snug text-stone-700'
    : 'flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-3 text-[11px] leading-snug text-zinc-300'
  const disclaimerLinkClass = isWarm
    ? 'font-semibold text-orange-700 underline-offset-2 hover:underline'
    : 'font-semibold text-zinc-200 underline-offset-2 hover:underline'
  const policyHintClass = isWarm
    ? 'text-[11px] leading-relaxed text-stone-500'
    : 'text-[11px] leading-relaxed text-zinc-500'

  return (
    <form onSubmit={onSubmit} className={`w-full max-w-sm space-y-3.5 rounded-2xl text-left ${shell}`}>
      <h2 className={`text-base font-semibold ${headingClass}`}>
        {mode === 'signin' ? 'Sign in to continue' : 'Create your free account'}
      </h2>
      <p className={`text-[12px] ${subTextClass}`}>
        Continue courses, preserve progress across sessions, and pick up lessons where you left off.
      </p>
      <div className="space-y-2" data-testid="auth-trust-boundary">
        <TrustLegalFooterLinks variant="compact" className={trustLinkClass} />
      </div>
      {mode === 'signup' ? (
        <>
          <p className={guidanceClass} data-testid="signup-age-guidance">
            {TRUST_COPY.selfServeAgeGuidance}
          </p>
          <label className={disclaimerLabelClass}>
            <input
              type="checkbox"
              checked={disclaimerAck}
              onChange={(e) => setDisclaimerAck(e.target.checked)}
              className={`mt-1 rounded ${isWarm ? 'border-stone-400 accent-orange-500' : 'border-zinc-600'}`}
              data-testid="signup-disclaimer-checkbox"
              required={mode === 'signup'}
            />
            <span>
              I understand Jifunze provides assistive learning tools (not certifications or guaranteed outcomes). I&apos;ve reviewed the{' '}
              <Link className={disclaimerLinkClass} to={LEGAL_ROUTES.disclaimer}>
                disclaimer
              </Link>
              .
            </span>
          </label>
        </>
      ) : null}
      <label className="block space-y-1">
        <span className={labelClass}>Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          autoComplete="email"
        />
      </label>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className={labelClass}>Password</span>
          {mode === 'signin' ? (
            <Link
              to="/forgot-password"
              className={`text-[11px] font-medium ${linkAccent}`}
            >
              Forgot password?
            </Link>
          ) : null}
        </div>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={mode === 'signup' ? 12 : 8}
          className={inputClass}
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
        />
        {mode === 'signup' ? (
          <p className={policyHintClass} data-testid="password-policy-hint">
            Password: {passwordPolicyHint()}
          </p>
        ) : null}
      </div>
      {(localError || error) ? (
        <p className={errorClass} role="alert">
          {localError ?? error}
        </p>
      ) : null}
      {authInfo ? (
        <p className={infoClass} role="status">
          {authInfo}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className={submitClass}
      >
        {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
      </button>
      <button
        type="button"
        onClick={() => {
          setMode(mode === 'signin' ? 'signup' : 'signin')
          setDisclaimerAck(false)
          setLocalError(null)
          clearAuthMessages()
        }}
        className={switchClass}
      >
        {mode === 'signin' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
      </button>
    </form>
  )
}
