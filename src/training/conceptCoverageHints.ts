/**
 * Lightweight coverage visibility from the knowledge graph vs weak-area heuristics.
 * Not a formal exam blueprint or psychometric coverage map — see trust copy on call sites.
 */
import type { TrainingKnowledgeSpec } from '../knowledge/types'
import type { WeakAreaReport } from './remediationTypes'

export function formatConceptCoverageSummaryLine(
  knowledgeSpec: TrainingKnowledgeSpec | null | undefined,
  weakReport: WeakAreaReport | null | undefined,
): string | null {
  const n = knowledgeSpec?.concepts?.length ?? 0
  if (!n) return null
  const weakN = weakReport?.weakConcepts?.length ?? 0
  return `Knowledge graph lists ${n} concepts · weak-area analysis is surfacing ${weakN} prioritized construct(s) from recent signals (heuristic).`
}
