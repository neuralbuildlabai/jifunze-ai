import type { User } from '@supabase/supabase-js'

/**
 * Learner-facing first name from Supabase user metadata, then email local-part.
 */
export function learnerDisplayFirstName(user: User | null | undefined): string {
  if (!user) return 'Learner'
  const meta = user.user_metadata as Record<string, unknown> | undefined
  const raw =
    (typeof meta?.first_name === 'string' && meta.first_name.trim()) ||
    (typeof meta?.full_name === 'string' && meta.full_name.trim()) ||
    (typeof meta?.name === 'string' && meta.name.trim()) ||
    ''
  if (raw) {
    const first = raw.split(/\s+/)[0]
    if (first) return first.slice(0, 1).toUpperCase() + first.slice(1)
  }
  const email = user.email?.split('@')[0]?.trim()
  if (email) return email.slice(0, 1).toUpperCase() + email.slice(1)
  return 'Learner'
}

export function learnerProfileInitials(user: User | null | undefined): string {
  const meta = user?.user_metadata as Record<string, unknown> | undefined
  const fn = typeof meta?.first_name === 'string' ? meta.first_name.trim() : ''
  const ln = typeof meta?.last_name === 'string' ? meta.last_name.trim() : ''
  if (fn && ln) return `${fn[0] ?? ''}${ln[0] ?? ''}`.toUpperCase()
  if (fn.length >= 2) return fn.slice(0, 2).toUpperCase()
  const email = user?.email?.split('@')[0]?.trim()
  if (email && email.length >= 2) return email.slice(0, 2).toUpperCase()
  return 'Me'
}
