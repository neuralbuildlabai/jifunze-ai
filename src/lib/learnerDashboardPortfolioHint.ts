import type { PortfolioOutputDefinition } from '../data/learning/portfolioOutputsCatalog'
import { PORTFOLIO_OUTPUT_DEFINITIONS } from '../data/learning/portfolioOutputsCatalog'
import type { FlagshipSession } from '../data/learning/flagshipCourseSessions'
import { completionSet, moduleFullyComplete, type FlagshipCourseProgressState } from './flagshipCourseProgressDerived'

const PO_AI_ID = /^po-ai-m(\d{2})$/i

function aiEssentialsPortfolioDefsOrdered(): PortfolioOutputDefinition[] {
  return PORTFOLIO_OUTPUT_DEFINITIONS.filter((o) => o.courseSlug === 'ai-essentials').sort((a, b) => a.id.localeCompare(b.id))
}

/**
 * Next portfolio-tracked output for AI Essentials, based on module completion (sessions + quiz).
 * Display-only for the learner dashboard.
 */
export function nextAiEssentialsPortfolioOutput(
  sessions: FlagshipSession[],
  state: FlagshipCourseProgressState,
): PortfolioOutputDefinition | null {
  const completed = completionSet(state)
  for (const def of aiEssentialsPortfolioDefsOrdered()) {
    const m = PO_AI_ID.exec(def.id)
    if (!m) continue
    const moduleId = `ae-m${m[1]}`
    if (!moduleFullyComplete(moduleId, sessions, completed, state)) return def
  }
  return null
}
