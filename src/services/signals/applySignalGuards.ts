import type { ExternalSignal } from '../../types/signal'
import {
  flagBrandSafetyConflict,
  flagMisinformationRisk,
  hasSensitiveTopicOverlap,
  isLikelyDuplicateSignal,
  isStaleSignal,
  validateSignalSource,
} from '../../config/safetyPlaceholders'

const STALE_MAX_HOURS = 168 // 1 week for demo data

export type SignalGuardResult = {
  kept: ExternalSignal[]
  dropped_stale: number
  dropped_invalid: number
  dropped_duplicate: number
  dropped_safety: number
}

/**
 * Client-side preview filtering. Authoritative checks belong on the server later.
 */
export function applySignalGuards(
  signals: ExternalSignal[],
  bannedPhrases: string[],
): SignalGuardResult {
  const kept: ExternalSignal[] = []
  let dropped_stale = 0
  let dropped_invalid = 0
  let dropped_duplicate = 0
  let dropped_safety = 0

  const seen: ExternalSignal[] = []

  for (const signal of signals) {
    if (!validateSignalSource(signal)) {
      dropped_invalid += 1
      continue
    }
    if (isStaleSignal(signal, STALE_MAX_HOURS)) {
      dropped_stale += 1
      continue
    }
    if (isLikelyDuplicateSignal(signal, [...seen, ...kept])) {
      dropped_duplicate += 1
      continue
    }
    if (flagMisinformationRisk(signal) || flagBrandSafetyConflict(signal)) {
      dropped_safety += 1
      continue
    }
    if (hasSensitiveTopicOverlap(signal, bannedPhrases)) {
      dropped_safety += 1
      continue
    }
    kept.push(signal)
    seen.push(signal)
  }

  return { kept, dropped_stale, dropped_invalid, dropped_duplicate, dropped_safety }
}
