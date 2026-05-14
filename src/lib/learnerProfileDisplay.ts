import type { User } from '@supabase/supabase-js'
import type { ProfileDisplayRow } from '../profile/profileDisplayTypes'

function titleCaseToken(s: string): string {
  const t = s.trim()
  if (!t) return ''
  return t.slice(0, 1).toUpperCase() + t.slice(1).toLowerCase()
}

/**
 * Human-readable label from email local-part only (never includes @domain).
 * Strips faux TLD segments like `neuralbuildlab.ai` → `Neuralbuildlab`.
 */
export function humanizeEmailLocalPart(email: string | null | undefined): string {
  const raw = email?.split('@')[0]?.trim() ?? ''
  if (!raw) return 'Learner'
  const segments = raw.split('.').filter(Boolean)
  if (segments.length >= 2) {
    const last = segments[segments.length - 1] ?? ''
    if (/^[a-z]{2,4}$/i.test(last)) {
      const base = segments.slice(0, -1).join(' ')
      const cleaned = base.replace(/[_-]+/g, ' ').trim()
      if (cleaned) {
        return cleaned
          .split(/\s+/g)
          .map(titleCaseToken)
          .filter(Boolean)
          .join(' ')
      }
    }
  }
  const spaced = raw.replace(/[._-]+/g, ' ').trim()
  return (
    spaced
      .split(/\s+/g)
      .map(titleCaseToken)
      .filter(Boolean)
      .join(' ') || 'Learner'
  )
}

function readMeta(user: User | null | undefined) {
  const m = (user?.user_metadata ?? {}) as Record<string, unknown>
  const str = (k: string) => (typeof m[k] === 'string' ? (m[k] as string).trim() : '')
  return {
    first_name: str('first_name'),
    last_name: str('last_name'),
    display_name: str('display_name'),
    full_name: str('full_name'),
    name: str('name'),
  }
}

/**
 * Preferred resolution:
 * 1. profiles.first_name + profiles.last_name (or display_name on profile)
 * 2. user_metadata.display_name
 * 3. user_metadata.full_name (first token for greeting)
 * 4. user_metadata.name
 * 5. user_metadata.first_name
 * 6. humanized email local-part (no domain / no `.ai` faux-domain artifacts)
 */
export function learnerDisplayFirstName(
  user: User | null | undefined,
  profile?: ProfileDisplayRow | null,
): string {
  if (!user) return 'Learner'

  const p = profile ?? null
  const pFirst = p?.first_name?.trim() ?? ''
  const pLast = p?.last_name?.trim() ?? ''
  const pDisp = p?.display_name?.trim() ?? ''
  if (pDisp) {
    const tok = pDisp.split(/\s+/)[0]
    if (tok) return titleCaseToken(tok)
  }
  if (pFirst) return titleCaseToken(pFirst)
  if (pFirst || pLast) {
    const full = `${pFirst} ${pLast}`.trim()
    const tok = full.split(/\s+/)[0]
    if (tok) return titleCaseToken(tok)
  }

  const meta = readMeta(user)
  if (meta.display_name) {
    const tok = meta.display_name.split(/\s+/)[0]
    if (tok) return titleCaseToken(tok)
  }
  if (meta.full_name) {
    const tok = meta.full_name.split(/\s+/)[0]
    if (tok) return titleCaseToken(tok)
  }
  if (meta.name) {
    const tok = meta.name.split(/\s+/)[0]
    if (tok) return titleCaseToken(tok)
  }
  if (meta.first_name) return titleCaseToken(meta.first_name)

  return humanizeEmailLocalPart(user.email)
}

/** Full primary line for headers (first + last when available). */
export function learnerPrimaryDisplayLabel(
  user: User | null | undefined,
  profile?: ProfileDisplayRow | null,
): string {
  if (!user) return 'Learner'
  const p = profile ?? null
  const pDisp = p?.display_name?.trim() ?? ''
  if (pDisp) return pDisp
  const pFirst = p?.first_name?.trim() ?? ''
  const pLast = p?.last_name?.trim() ?? ''
  if (pFirst || pLast) return `${pFirst} ${pLast}`.trim()

  const meta = readMeta(user)
  if (meta.display_name) return meta.display_name
  if (meta.full_name) return meta.full_name
  if (meta.name) return meta.name
  if (meta.first_name || meta.last_name) return `${meta.first_name} ${meta.last_name}`.trim()

  return humanizeEmailLocalPart(user.email)
}

export function learnerProfileInitials(
  user: User | null | undefined,
  profile?: ProfileDisplayRow | null,
): string {
  const p = profile ?? null
  const pFirst = p?.first_name?.trim() ?? ''
  const pLast = p?.last_name?.trim() ?? ''
  if (pFirst && pLast) return `${pFirst[0] ?? ''}${pLast[0] ?? ''}`.toUpperCase()
  if (pFirst.length >= 2) return pFirst.slice(0, 2).toUpperCase()

  const meta = readMeta(user)
  if (meta.first_name && meta.last_name) {
    return `${meta.first_name[0] ?? ''}${meta.last_name[0] ?? ''}`.toUpperCase()
  }
  if (meta.first_name.length >= 2) return meta.first_name.slice(0, 2).toUpperCase()
  if (meta.full_name) {
    const parts = meta.full_name.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase()
    if (parts[0] && parts[0].length >= 2) return parts[0].slice(0, 2).toUpperCase()
  }

  const email = user?.email?.split('@')[0]?.trim()
  if (email && email.length >= 2) {
    const cleaned = email.replace(/\./g, '')
    return cleaned.slice(0, 2).toUpperCase()
  }
  return 'Me'
}
