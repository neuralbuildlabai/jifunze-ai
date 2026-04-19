/**
 * Client-side disclaimer acknowledgment (localStorage).
 *
 * **Limitation:** Stored only in this browser. Not synced across devices or enforced server-side.
 * Bump {@link DISCLAIMER_ACK_VERSION} when in-product summary material changes so users can re-acknowledge.
 */

export const DISCLAIMER_ACK_VERSION = 2 as const

const STORAGE_KEY = 'jifunze.disclaimerAcknowledgment.v1'

export type StoredDisclaimerAcknowledgment = {
  version: typeof DISCLAIMER_ACK_VERSION
  userId: string
  acknowledgedAt: string
}

function safeParse(raw: string | null): StoredDisclaimerAcknowledgment | null {
  if (!raw) return null
  try {
    const v = JSON.parse(raw) as Partial<StoredDisclaimerAcknowledgment>
    if (v.version !== DISCLAIMER_ACK_VERSION) return null
    if (typeof v.userId !== 'string' || !v.userId) return null
    if (typeof v.acknowledgedAt !== 'string' || !v.acknowledgedAt) return null
    return {
      version: DISCLAIMER_ACK_VERSION,
      userId: v.userId,
      acknowledgedAt: v.acknowledgedAt,
    }
  } catch {
    return null
  }
}

export function readDisclaimerAcknowledgment(): StoredDisclaimerAcknowledgment | null {
  if (typeof window === 'undefined') return null
  try {
    return safeParse(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

/** True when this user has acknowledged the current {@link DISCLAIMER_ACK_VERSION}. */
export function isDisclaimerAcknowledgmentCurrent(userId: string | undefined): boolean {
  if (!userId) return true
  const s = readDisclaimerAcknowledgment()
  return Boolean(s && s.userId === userId && s.version === DISCLAIMER_ACK_VERSION)
}

export function writeDisclaimerAcknowledgment(userId: string): void {
  if (typeof window === 'undefined') return
  const payload: StoredDisclaimerAcknowledgment = {
    version: DISCLAIMER_ACK_VERSION,
    userId,
    acknowledgedAt: new Date().toISOString(),
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* quota / private mode — acknowledgment may not persist */
  }
}
