import type { FlagshipSessionBlockType } from '../data/learning/flagshipSessionContentTypes'
import type { FlagshipSessionContentBlock } from '../data/learning/flagshipSessionContentTypes'

const RESPONSE_BLOCK_TYPES: ReadonlySet<FlagshipSessionBlockType> = new Set([
  'practice_task',
  'reflection_prompt',
  'output_prompt',
])

/** Eyebrow/title cues that imply learner-written work (matches authored overrides + generator). */
const RESPONSE_KEYWORD_RE =
  /structured\s*gate|structured\s*check|practice\s*response|evidence\s*draft|verification\s*table|decision\s*memo|workflow|sop|operating\s*system|portfolio\s*note|capstone\s*preparation|artifact|evidence\s*check|guided\s*practice|independent\s*lab|reflection\s*response|quality\s*gate|honest\s*uncertainty|portfolio\s*evidence|personal\s*operating/i

/** Stronger hint for capstone / portfolio reuse (subset — do not over-badge). */
const PORTFOLIO_KEYWORD_RE =
  /capstone|portfolio|verification|evidence\s*table|decision\s*memo|workflow|sop|operating\s*system|artifact|evidence\s*draft/i

export function blockAllowsLearnerResponse(block: FlagshipSessionContentBlock): boolean {
  if (RESPONSE_BLOCK_TYPES.has(block.type)) return true
  if (block.type === 'concept_explanation' || block.type === 'key_points') {
    const hay = `${block.eyebrow ?? ''} ${block.title ?? ''}`
    return RESPONSE_KEYWORD_RE.test(hay)
  }
  return false
}

export function blockSuggestsPortfolioEvidence(block: FlagshipSessionContentBlock): boolean {
  const hay = `${block.eyebrow ?? ''} ${block.title ?? ''} ${block.prompt ?? ''} ${block.body ?? ''}`
  return PORTFOLIO_KEYWORD_RE.test(hay)
}

/**
 * Friendlier on-card label than raw eyebrow strings like “Structured gate”.
 */
export function learnerFriendlyBlockEyebrow(block: FlagshipSessionContentBlock): string | undefined {
  const e = block.eyebrow ?? ''
  const t = block.title ?? ''
  const hay = `${e} ${t}`
  if (/structured\s*gate/i.test(hay)) return 'Practice response'
  if (/structured\s*check/i.test(hay)) return 'Practice check'
  if (/quality\s*gate/i.test(hay)) return 'Readiness check'
  if (/evidence/i.test(hay) && /check|table|draft/i.test(hay)) return 'Evidence check'
  return undefined
}

export function inferArtifactType(block: FlagshipSessionContentBlock): string {
  if (block.type === 'reflection_prompt') return 'reflection'
  if (block.type === 'output_prompt') return 'output'
  if (block.type === 'practice_task') return 'practice'
  if (/capstone/i.test(block.eyebrow ?? '')) return 'capstone_prep'
  if (/verification|evidence/i.test(block.eyebrow ?? '')) return 'verification'
  if (/decision/i.test(block.eyebrow ?? '')) return 'decision_memo'
  if (/workflow|sop/i.test(block.eyebrow ?? '')) return 'workflow'
  return 'written_response'
}
