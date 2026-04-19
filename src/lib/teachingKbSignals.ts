/**
 * Lightweight client-side aggregates for learner-help grounding (signals are directional, not judgments).
 */

import { readTeachingSignals } from '../data/teaching/teachingSignals'
import type { TeachingSignalKind } from '../data/teaching/teachingTypes'

export function recentTeachingSignals(kind: TeachingSignalKind, limit = 60): ReturnType<typeof readTeachingSignals> {
  return readTeachingSignals()
    .filter((e) => e.kind === kind)
    .slice(0, limit)
}

export function recentHelpQueries(limit = 40): string[] {
  return recentTeachingSignals('help_query', limit)
    .map((e) => String(e.payload.query ?? ''))
    .filter(Boolean)
}
