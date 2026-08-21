/**
 * Lightweight client-side signal capture for future KB/curriculum tuning.
 * Replace with Supabase ingestion when analytics pipelines exist—structure is intentionally forward-compatible.
 */

import type { TeachingSignal } from './teachingTypes'
import { persistTeachingLearningEvent } from '../../services/learnerState/persistTeachingLearningEvent'

const STORAGE_KEY = 'jifunze.teachingSignals.v1'
const MAX_EVENTS = 200

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function recordTeachingSignal(input: Omit<TeachingSignal, 'id' | 'createdAtIso'>): TeachingSignal {
  const evt: TeachingSignal = {
    id: uid(),
    createdAtIso: new Date().toISOString(),
    ...input,
  }
  if (typeof window === 'undefined') return evt
  try {
    const prev = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]') as TeachingSignal[]
    const next = [evt, ...(Array.isArray(prev) ? prev : [])].slice(0, MAX_EVENTS)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event('jifunze-teaching-signals-updated'))
  } catch {
    // ignore quota / privacy mode
  }
  void persistTeachingLearningEvent(evt).catch(() => {
    // Server mirror is optional—never surface to learners.
  })
  return evt
}

export function readTeachingSignals(): TeachingSignal[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(raw ?? '[]') as TeachingSignal[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
