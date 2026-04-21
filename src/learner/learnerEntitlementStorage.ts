import type { FirstCourseDiscountState, LearnerEntitlement, PendingLearnerRedirect } from '@/learner/learnerEntitlementTypes'
import {
  DEVICE_ID_STORAGE_KEY,
  DEVICE_SESSIONS_STORAGE_KEY,
  LEARNER_ENTITLEMENT_STORAGE_KEY,
  LEARNER_FIRST_COURSE_DISCOUNT_STORAGE_KEY,
  LEARNER_PENDING_REDIRECT_STORAGE_KEY,
} from '@/learner/learnerCommerceConstants'

function safeParseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function readStoredEntitlement(): LearnerEntitlement {
  const v = safeParseJson<unknown>(typeof localStorage !== 'undefined' ? localStorage.getItem(LEARNER_ENTITLEMENT_STORAGE_KEY) : null, null)
  if (!v || typeof v !== 'object') return { mode: 'none' }
  const m = v as Record<string, unknown>
  if (m.mode === 'single' && typeof m.courseSlug === 'string') return { mode: 'single', courseSlug: m.courseSlug }
  if (m.mode === 'all_access') return { mode: 'all_access' }
  return { mode: 'none' }
}

export function writeStoredEntitlement(next: LearnerEntitlement): void {
  localStorage.setItem(LEARNER_ENTITLEMENT_STORAGE_KEY, JSON.stringify(next))
}

export function readStoredDiscount(): FirstCourseDiscountState {
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(LEARNER_FIRST_COURSE_DISCOUNT_STORAGE_KEY) : null
  const v = safeParseJson<Partial<FirstCourseDiscountState>>(raw, {})
  return {
    eligible: Boolean(v.eligible),
    consumed: Boolean(v.consumed),
    courseSlug: typeof v.courseSlug === 'string' ? v.courseSlug : undefined,
  }
}

export function writeStoredDiscount(next: FirstCourseDiscountState): void {
  localStorage.setItem(LEARNER_FIRST_COURSE_DISCOUNT_STORAGE_KEY, JSON.stringify(next))
}

export function readPendingRedirect(): PendingLearnerRedirect {
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(LEARNER_PENDING_REDIRECT_STORAGE_KEY) : null
  const v = safeParseJson<PendingLearnerRedirect>(raw, null)
  return v ?? null
}

export function writePendingRedirect(next: PendingLearnerRedirect): void {
  if (!next) localStorage.removeItem(LEARNER_PENDING_REDIRECT_STORAGE_KEY)
  else localStorage.setItem(LEARNER_PENDING_REDIRECT_STORAGE_KEY, JSON.stringify(next))
}

export type DeviceSlot = { deviceId: string; label?: string; lastSeen: number }

export function readDeviceSlots(): DeviceSlot[] {
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(DEVICE_SESSIONS_STORAGE_KEY) : null
  const arr = safeParseJson<unknown[]>(raw, [])
  if (!Array.isArray(arr)) return []
  return arr
    .map((x) => (x && typeof x === 'object' ? (x as Record<string, unknown>) : null))
    .filter(Boolean)
    .map((m) => ({
      deviceId: typeof m!.deviceId === 'string' ? m!.deviceId : '',
      label: typeof m!.label === 'string' ? m!.label : undefined,
      lastSeen: typeof m!.lastSeen === 'number' ? m!.lastSeen : Date.now(),
    }))
    .filter((s) => s.deviceId.length > 0)
}

export function writeDeviceSlots(slots: DeviceSlot[]): void {
  localStorage.setItem(DEVICE_SESSIONS_STORAGE_KEY, JSON.stringify(slots))
}

export function readOrCreateDeviceId(): string {
  const existing = typeof localStorage !== 'undefined' ? localStorage.getItem(DEVICE_ID_STORAGE_KEY) : null
  if (existing && existing.length > 8) return existing
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `dev-${Date.now()}-${Math.random().toString(36).slice(2)}`
  localStorage.setItem(DEVICE_ID_STORAGE_KEY, id)
  return id
}
