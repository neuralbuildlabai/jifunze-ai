import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { passwordPolicyHint } from '../../auth/passwordPolicy'
import { useProfileDisplay } from '../../profile/useProfileDisplay'
import { learnerShellTokens } from './learnerShellTokens'

function readMeta(user: User | null | undefined) {
  const m = (user?.user_metadata ?? {}) as Record<string, unknown>
  const str = (k: string) => (typeof m[k] === 'string' ? (m[k] as string) : '')
  return {
    first_name: str('first_name').trim(),
    last_name: str('last_name').trim(),
    display_name: str('display_name').trim(),
    phone: str('phone').trim(),
  }
}

export function LearnerAccountSettingsForm() {
  const { user, supabase } = useAuth()
  const { profileRow, refreshProfileDisplay } = useProfileDisplay()
  const initial = useMemo(() => readMeta(user), [user])
  const [firstName, setFirstName] = useState(initial.first_name)
  const [lastName, setLastName] = useState(initial.last_name)
  const [displayName, setDisplayName] = useState(initial.display_name)
  const [phone, setPhone] = useState(initial.phone)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const m = readMeta(user)
    setFirstName((profileRow?.first_name?.trim() || m.first_name) ?? '')
    setLastName((profileRow?.last_name?.trim() || m.last_name) ?? '')
    setDisplayName((profileRow?.display_name?.trim() || m.display_name) ?? '')
    setPhone(m.phone)
  }, [user, profileRow?.first_name, profileRow?.last_name, profileRow?.display_name])

  const onSaveProfile = useCallback(async () => {
    if (!supabase || !user || !isSupabaseConfigured()) return
    setBusy(true)
    setErr(null)
    setMsg(null)
    try {
      const fn = firstName.trim()
      const ln = lastName.trim()
      const dn = displayName.trim()
      const { error: authErr } = await supabase.auth.updateUser({
        data: {
          first_name: fn || null,
          last_name: ln || null,
          display_name: dn || null,
          phone: phone.trim() || null,
        },
      })
      if (authErr) throw authErr

      const { error: profErr } = await supabase
        .from('profiles')
        .update({
          first_name: fn || null,
          last_name: ln || null,
          display_name: dn || null,
        })
        .eq('id', user.id)

      if (profErr) {
        console.warn('[account] profiles display columns update:', profErr.message)
      }

      await supabase.auth.refreshSession()
      await refreshProfileDisplay()
      setMsg('Profile saved.')
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Could not save profile.')
    } finally {
      setBusy(false)
    }
  }, [supabase, user, firstName, lastName, displayName, phone, refreshProfileDisplay])

  const onChangePassword = useCallback(async () => {
    if (!supabase || !user || !isSupabaseConfigured()) return
    if (password.length < 8) {
      setErr('Password must be at least 8 characters.')
      return
    }
    if (password !== password2) {
      setErr('Passwords do not match.')
      return
    }
    setBusy(true)
    setErr(null)
    setMsg(null)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setPassword('')
      setPassword2('')
      setMsg('Password updated.')
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Could not update password.')
    } finally {
      setBusy(false)
    }
  }, [supabase, user, password, password2])

  if (!isSupabaseConfigured() || !user) {
    return <p className="text-sm text-stone-600">Sign in with a live account to update your profile.</p>
  }

  return (
    <div className="space-y-6" data-testid="learner-account-settings-form">
      <section className={`${learnerShellTokens.card} space-y-4`}>
        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Profile</h3>
        <label className="block text-sm">
          <span className="text-stone-600">First name</span>
          <input
            className="mt-1 w-full rounded-lg border border-stone-200/90 bg-white px-3 py-2 text-sm text-zinc-900"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            data-testid="learner-account-first-name"
          />
        </label>
        <label className="block text-sm">
          <span className="text-stone-600">Last name</span>
          <input
            className="mt-1 w-full rounded-lg border border-stone-200/90 bg-white px-3 py-2 text-sm text-zinc-900"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            data-testid="learner-account-last-name"
          />
        </label>
        <label className="block text-sm">
          <span className="text-stone-600">Display name (optional)</span>
          <input
            className="mt-1 w-full rounded-lg border border-stone-200/90 bg-white px-3 py-2 text-sm text-zinc-900"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Shown in greetings when set"
            data-testid="learner-account-display-name"
          />
        </label>
        <label className="block text-sm">
          <span className="text-stone-600">Email</span>
          <input
            className="mt-1 w-full rounded-lg border border-stone-200/90 bg-stone-50 px-3 py-2 text-sm text-zinc-700"
            value={user.email ?? ''}
            readOnly
          />
        </label>
        <label className="block text-sm">
          <span className="text-stone-600">Phone (optional)</span>
          <input
            className="mt-1 w-full rounded-lg border border-stone-200/90 bg-white px-3 py-2 text-sm text-zinc-900"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
        </label>
        <button
          type="button"
          disabled={busy}
          onClick={() => void onSaveProfile()}
          className={learnerShellTokens.primaryButton}
          data-testid="learner-account-save-profile"
        >
          Save profile
        </button>
      </section>

      <section className={`${learnerShellTokens.card} space-y-3`} id="password">
        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Password</h3>
        <p className="text-[12px] leading-relaxed text-stone-600">{passwordPolicyHint()}</p>
        <label className="block text-sm">
          <span className="text-stone-600">New password</span>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-stone-200/90 bg-white px-3 py-2 text-sm text-zinc-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>
        <label className="block text-sm">
          <span className="text-stone-600">Confirm new password</span>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-stone-200/90 bg-white px-3 py-2 text-sm text-zinc-900"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            autoComplete="new-password"
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={busy || !password}
            onClick={() => void onChangePassword()}
            className={learnerShellTokens.ghostButton}
          >
            Update password
          </button>
          <Link to="/forgot-password" className={`${learnerShellTokens.ghostButton} inline-flex items-center`}>
            Email reset link
          </Link>
        </div>
      </section>

      {err ? <p className="text-sm text-rose-700">{err}</p> : null}
      {msg ? <p className="text-sm text-emerald-800">{msg}</p> : null}
    </div>
  )
}
