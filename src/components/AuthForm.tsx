import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { TrustLegalFooterLinks } from './TrustLegalFooterLinks'
import { authFailureMessage } from '../auth/authErrorMessage'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { passwordPolicyErrorMessage, passwordPolicyHint } from '../auth/passwordPolicy'
import { safeReturnUrl } from '../lib/safeReturnUrl'
import { LEGAL_ROUTES, TRUST_COPY } from '../training/trustCopy'

type AuthFormProps = {
  initialMode?: 'signin' | 'signup'
  /** Lighter surface for the public landing “Save your work” block */
  appearance?: 'default' | 'quiet'
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
      const postAuth = safeReturnUrl(searchParams.get('returnUrl')) ?? '/dashboard'
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

  const shell =
    appearance === 'quiet'
      ? 'border border-white/[0.06] bg-zinc-950/35 p-3.5 shadow-none backdrop-blur-[1px]'
      : 'border border-zinc-800/90 bg-zinc-950/70 p-4 shadow-none'

  return (
    <form onSubmit={onSubmit} className={`w-full max-w-sm space-y-3 rounded-2xl text-left ${shell}`}>
      <h2 className="text-base font-semibold text-zinc-100">
        {mode === 'signin' ? 'Sign in to continue' : 'Create your free account'}
      </h2>
      <p className="text-[12px] text-zinc-400">
        Continue courses, preserve progress across sessions, and pick up lessons where you left off.
      </p>
      <div className="space-y-2" data-testid="auth-trust-boundary">
        <TrustLegalFooterLinks variant="compact" className="justify-start text-zinc-500 [&_a]:text-zinc-400 [&_a]:hover:text-zinc-200" />
      </div>
      {mode === 'signup' ? (
        <>
          <p className="text-[11px] leading-relaxed text-zinc-500" data-testid="signup-age-guidance">
            {TRUST_COPY.selfServeAgeGuidance}
          </p>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-3 text-[11px] leading-snug text-zinc-300">
            <input
              type="checkbox"
              checked={disclaimerAck}
              onChange={(e) => setDisclaimerAck(e.target.checked)}
              className="mt-1 rounded border-zinc-600"
              data-testid="signup-disclaimer-checkbox"
              required={mode === 'signup'}
            />
            <span>
              I understand Jifunze provides assistive learning tools (not certifications or guaranteed outcomes). I&apos;ve reviewed the{' '}
              <Link className="font-semibold text-zinc-200 underline-offset-2 hover:underline" to={LEGAL_ROUTES.disclaimer}>
                disclaimer
              </Link>
              .
            </span>
          </label>
        </>
      ) : null}
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
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-zinc-500">Password</span>
          {mode === 'signin' ? (
            <Link
              to="/forgot-password"
              className="text-[11px] font-medium text-violet-300/85 hover:text-violet-200"
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
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
        />
        {mode === 'signup' ? (
          <p className="text-[11px] leading-relaxed text-zinc-500" data-testid="password-policy-hint">
            Password: {passwordPolicyHint()}
          </p>
        ) : null}
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
        className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
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
        className="w-full text-xs font-medium text-violet-300/90 hover:text-violet-200"
      >
        {mode === 'signin' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
      </button>
    </form>
  )
}
