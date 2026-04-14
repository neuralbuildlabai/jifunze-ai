/** Normalized band for UI and routing (from {@link priorityLabelFromScore}). */
export type PriorityLabel = 'low' | 'medium' | 'high' | 'critical'

export function priorityLabelFromScore(score: number): PriorityLabel {
  if (score >= 0.88) return 'critical'
  if (score >= 0.68) return 'high'
  if (score >= 0.42) return 'medium'
  return 'low'
}
