import type { ExternalSignal } from '../types/signal'

/**
 * Hooks for source validation, abuse prevention, and brand safety.
 * Implementations stay server-side in production; these are UI-era stubs.
 */
export function validateSignalSource(signal: ExternalSignal): boolean {
  return typeof signal.url === 'string' && signal.url.startsWith('http')
}

export function isLikelyDuplicateSignal(
  signal: ExternalSignal,
  others: ExternalSignal[],
): boolean {
  const key = signal.title.trim().toLowerCase()
  return others.some((o) => o.id !== signal.id && o.title.trim().toLowerCase() === key)
}

export function isStaleSignal(signal: ExternalSignal, maxAgeHours: number): boolean {
  const t = Date.parse(signal.published_at)
  if (Number.isNaN(t)) return true
  const hours = (Date.now() - t) / (1000 * 60 * 60)
  return hours > maxAgeHours
}

export function flagMisinformationRisk(signal: ExternalSignal): boolean {
  void signal
  return false
}

export function flagBrandSafetyConflict(signal: ExternalSignal): boolean {
  void signal
  return false
}

export function hasSensitiveTopicOverlap(
  signal: ExternalSignal,
  bannedPhrases: string[],
): boolean {
  const haystack = `${signal.title} ${signal.summary}`.toLowerCase()
  return bannedPhrases.some((p) => haystack.includes(p.toLowerCase()))
}
