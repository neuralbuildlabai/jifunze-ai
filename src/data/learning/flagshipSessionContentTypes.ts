/**
 * Structured instructional blocks for flagship session pages — scalable authoring model.
 */

export type FlagshipSessionBlockType =
  | 'intro'
  | 'concept_explanation'
  | 'key_points'
  | 'worked_example'
  | 'practice_task'
  | 'reflection_prompt'
  | 'output_prompt'
  | 'recap'
  | 'takeaway'
  | 'next_step'

/** Unified authoring shape — optional fields apply by block type */
export type FlagshipSessionContentBlock = {
  id: string
  type: FlagshipSessionBlockType
  /** Short label above title */
  eyebrow?: string
  title?: string
  /** Primary narrative */
  body?: string
  bullets?: string[]
  /** Learner instructions / prompt */
  prompt?: string
  /** Illustrative scenario or sample */
  example?: string
  /** What “done” looks like */
  outputExpectation?: string
}
