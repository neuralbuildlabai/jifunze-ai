/**
 * Structured instructional blocks for flagship session pages — scalable authoring model.
 */

/** Optional instructional visuals — presentation-only; omit from merge/depth audits as non-prose. */
export type LessonVisualAid =
  | { kind: 'prompt_review_cycle'; caption?: string }
  /** Practice-lab rhythm figure */
  | { kind: 'practice_sequence'; caption?: string }
  /** Assessment / judgment framing */
  | { kind: 'judgment_flow'; caption?: string }
  | {
      kind: 'process_steps'
      orientation?: 'horizontal' | 'vertical'
      title?: string
      steps: readonly string[]
    }
  | {
      kind: 'comparison'
      weakLabel?: string
      strongLabel?: string
      weak: string
      strong: string
      caption?: string
    }
  | {
      kind: 'callout'
      variant: 'insight' | 'caution' | 'privacy' | 'verify' | 'practice_tip'
      title: string
      body: string
    }
  | {
      kind: 'artifact_expectations'
      title?: string
      summary?: string
      bullets?: readonly string[]
    }
  | {
      kind: 'verification_checklist'
      title?: string
      items: readonly string[]
    }

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
  visualAid?: LessonVisualAid
}
