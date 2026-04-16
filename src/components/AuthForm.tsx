import { useState, type FormEvent } from 'react'
import { authFailureMessage } from '../auth/authErrorMessage'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'

export function AuthForm() {
  const { signIn, signUp, error, authInfo, clearAuthMessages } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [localError, setLocalError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!isSupabaseConfigured()) {
    return (
      <p className="text-xs text-zinc-500">
        Supabase env not set — running in local demo mode (no login).
      </p>
    )
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLocalError(null)
    setBusy(true)
    try {
      if (mode === 'signin') {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
    } catch (err) {
      setLocalError(authFailureMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-left"
    >
      <h2 className="text-sm font-semibold text-zinc-200">Sign in to your workspace</h2>
      <p className="text-[11px] text-zinc-500">
        Each account gets an isolated tenant; brands and learning data are scoped by workspace.
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
      <label className="block space-y-1">
        <span className="text-xs text-zinc-500">Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
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
        className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 disabled:opacity-40"
      >
        {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
      </button>
      <button
        type="button"
        onClick={() => {
          setMode(mode === 'signin' ? 'signup' : 'signin')
          setLocalError(null)
          clearAuthMessages()
        }}
        className="w-full text-xs text-violet-300/90 hover:text-violet-200"
      >
        {mode === 'signin' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
      </button>
    </form>
  )
}
