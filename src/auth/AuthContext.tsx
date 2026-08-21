import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { AuthError, Session, SupabaseClient, User } from '@supabase/supabase-js'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { getSupabaseBrowserClient } from '../lib/supabaseClient'

/**
 * Auth context for Jifunze.ai (learning-only, single-user model).
 *
 * Post-Wave-1 (2026-05-18): the multi-brand tenant model was removed entirely. There is no
 * `tenantId`, no `brands`, no workspace bootstrap. Every signed-in user is their own implicit
 * scope; persistence is keyed by `user.id` directly. Team learning (multiple users per
 * organization) will be reintroduced in Wave 6 as a new `organizations` schema — not by reviving
 * the brand-tenancy model.
 */

export type AuthContextValue = {
  supabase: SupabaseClient | null
  user: User | null
  session: Session | null
  /** True when `user.email_confirmed_at` is set (required for protected app areas). */
  emailVerified: boolean
  /** True until the initial session check completes. */
  loading: boolean
  /** Last auth error (Supabase `AuthError.message` when available). */
  error: string | null
  /** Non-error notice, e.g. after sign-up when email confirmation is required. */
  authInfo: string | null
  /** True while a `signOut()` call is in progress (disable duplicate triggers). */
  signOutPending: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  /** Resend signup confirmation email (requires `user.email`). */
  resendConfirmationEmail: () => Promise<void>
  /** Request password reset email (`redirectTo` points at `/reset-password`). */
  requestPasswordReset: (email: string) => Promise<void>
  /** Clears `error` and `authInfo` (e.g. when switching sign-in / sign-up in the form). */
  clearAuthMessages: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function authErrorMessage(err: unknown): string {
  if (!err) return 'Unknown authentication error.'
  if (typeof err === 'string') return err
  if (typeof err === 'object' && err && 'message' in err) {
    const msg = (err as { message?: unknown }).message
    return typeof msg === 'string' ? msg : 'Unknown authentication error.'
  }
  return 'Unknown authentication error.'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo<SupabaseClient | null>(() => {
    if (!isSupabaseConfigured()) return null
    return getSupabaseBrowserClient()
  }, [])

  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [authInfo, setAuthInfo] = useState<string | null>(null)
  const [signOutPending, setSignOutPending] = useState<boolean>(false)

  const mountedRef = useRef<boolean>(true)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const applySession = useCallback((next: Session | null) => {
    if (!mountedRef.current) return
    setSession(next)
    setUser(next?.user ?? null)
  }, [])

  // Initial session restore + listener
  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    let cancelled = false
    void (async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (cancelled) return
        applySession(data.session ?? null)
      } catch (err) {
        if (cancelled) return
        setError(authErrorMessage(err))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      if (cancelled) return
      applySession(next)
      if (event === 'SIGNED_OUT') {
        setError(null)
        setAuthInfo(null)
      }
    })
    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [supabase, applySession])

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        setError('Authentication is not configured for this environment.')
        return
      }
      setError(null)
      setAuthInfo(null)
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError((signInError as AuthError).message)
      }
    },
    [supabase],
  )

  const signUp = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        setError('Authentication is not configured for this environment.')
        return
      }
      setError(null)
      setAuthInfo(null)
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) {
        setError((signUpError as AuthError).message)
        return
      }
      if (!data.session) {
        setAuthInfo('Check your email to confirm your account before signing in.')
      }
    },
    [supabase],
  )

  const signOut = useCallback(async () => {
    if (!supabase) return
    setSignOutPending(true)
    try {
      await supabase.auth.signOut()
      applySession(null)
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      if (mountedRef.current) setSignOutPending(false)
    }
  }, [supabase, applySession])

  const resendConfirmationEmail = useCallback(async () => {
    if (!supabase) {
      setError('Authentication is not configured for this environment.')
      return
    }
    const email = user?.email
    if (!email) {
      setError('No email address on file to resend confirmation to.')
      return
    }
    setError(null)
    const { error: resendError } = await supabase.auth.resend({ type: 'signup', email })
    if (resendError) {
      setError((resendError as AuthError).message)
      return
    }
    setAuthInfo('Confirmation email sent. Check your inbox.')
  }, [supabase, user?.email])

  const requestPasswordReset = useCallback(
    async (email: string) => {
      if (!supabase) {
        setError('Authentication is not configured for this environment.')
        return
      }
      setError(null)
      setAuthInfo(null)
      const redirectTo =
        typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      if (resetError) {
        setError((resetError as AuthError).message)
        return
      }
      setAuthInfo('Password reset email sent. Check your inbox.')
    },
    [supabase],
  )

  const clearAuthMessages = useCallback(() => {
    setError(null)
    setAuthInfo(null)
  }, [])

  const emailVerified = Boolean(user?.email_confirmed_at)

  const value = useMemo<AuthContextValue>(
    () => ({
      supabase,
      user,
      session,
      emailVerified,
      loading,
      error,
      authInfo,
      signOutPending,
      signIn,
      signUp,
      signOut,
      resendConfirmationEmail,
      requestPasswordReset,
      clearAuthMessages,
    }),
    [
      supabase,
      user,
      session,
      emailVerified,
      loading,
      error,
      authInfo,
      signOutPending,
      signIn,
      signUp,
      signOut,
      resendConfirmationEmail,
      requestPasswordReset,
      clearAuthMessages,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// `useAuth` has always lived beside the provider it reads. Splitting it into its own module
// would touch every consumer in the frozen learning platform for no behavioural gain, so the
// Fast Refresh ergonomics rule is disabled on this one export instead.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
