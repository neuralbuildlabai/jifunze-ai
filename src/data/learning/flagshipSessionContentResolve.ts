import type { FlagshipCourseCurriculum } from './flagshipCourseCurricula'
import type { FlagshipSession } from './flagshipCourseSessions'
import { PREMIUM_DEPTH_TARGET_CHARS } from './flagshipDepthTargets'
import { FLAGSHIP_SESSION_CONTENT_OVERRIDES, flagshipSessionContentOverrideKey } from './flagshipSessionContentOverrides'
import { generateFlagshipSessionBlocks } from './flagshipSessionContentGenerate'
import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'

function blockTextLength(b: FlagshipSessionContentBlock): number {
  let n = 0
  if (b.eyebrow) n += b.eyebrow.length
  if (b.body) n += b.body.length
  if (b.title) n += b.title.length
  if (b.prompt) n += b.prompt.length
  if (b.example) n += b.example.length
  if (b.outputExpectation) n += b.outputExpectation.length
  if (b.bullets?.length) n += b.bullets.join(' ').length
  return n
}

/** Total learner-visible instructional text across resolved blocks (matches merge / QA audits). */
export function instructionalBodyCharTotal(blocks: FlagshipSessionContentBlock[]): number {
  return blocks.reduce((sum, b) => sum + blockTextLength(b), 0)
}

/** Resolved flagship session depth after overrides + generator merge — use with {@link MIN_OVERRIDE_CHARS} for audits. */
export function resolvedFlagshipSessionInstructionalChars(
  session: FlagshipSession,
  curriculum: FlagshipCourseCurriculum | undefined,
): number {
  const blocks = getFlagshipSessionContentBlocks(session, curriculum)
  return instructionalBodyCharTotal(blocks)
}

/** Shallow overrides get merged with generated instructional depth so no session ships as “empty cards”. */
export const MIN_OVERRIDE_CHARS = 900

/**
 * When authored blocks meet the baseline merge gate but stay below the premium editorial target,
 * append a single curriculum-grounded bridge block (not a duplicate of the full generator stack).
 */
function premiumOrientationBridgeBlock(
  session: FlagshipSession,
  curriculum: FlagshipCourseCurriculum,
): FlagshipSessionContentBlock | null {
  if (session.type === 'capstone_prep' || session.moduleId === 'capstone') {
    const cap = curriculum.capstone
    return {
      id: `${session.id}-premium-capstone-bridge`,
      type: 'concept_explanation',
      eyebrow: 'Capstone orientation',
      title: 'Align this checkpoint with your final deliverable',
      body: [
        `Capstone you are building toward: ${cap.title}.`,
        cap.description,
        '',
        'Before you advance, write three bullets: the reviewer archetype you are optimizing for (role + incentives), the strongest proof artifact you already have, and the single gap that would most embarrass you if a mentor found it first. If you cannot name the gap, your next step is inquiry—not more drafting.',
      ].join('\n\n'),
    }
  }

  const module = curriculum.modules.find((m) => m.id === session.moduleId)
  if (!module) return null

  const goal =
    module.learningGoals[0] ??
    (session.objectives[0] ? String(session.objectives[0]) : null) ??
    'the measurable shift this module expects in your judgment or behavior.'
  const stageHint =
    module.summary.trim().length > 0
      ? module.summary.trim()
      : 'Use the module spine in your path overview to keep claims proportionate to evidence.'

  return {
    id: `${session.id}-premium-context-bridge`,
    type: 'concept_explanation',
    eyebrow: 'Apply before you advance',
    title: `Turn “${module.title}” into a reviewable thread`,
    body: [
      `This chapter sits inside “${module.title}.” Treat it as incomplete until you can explain your next move to someone who does not share your context—without borrowed jargon.`,
      '',
      `Anchor to this outcome: ${goal}`,
      '',
      `Module spine (orientation): ${stageHint}`,
      '',
      'Pick a situation in the next two weeks where this matters: name the decision owner, what evidence you already hold, what you still need to observe, and what would change your mind. If the scenario is still “my career” or “the business,” narrow until you can falsify a claim in a week.',
      '',
      'Separate facts you have observed from interpretations you are making—then label unknowns explicitly. Cheap clarity beats confident vagueness.',
      '',
      'Close with one sentence a skeptical peer could argue with on substance—trade-offs, evidence, or scope—not tone or motivation.',
    ].join('\n'),
  }
}

function premiumReadinessCheckBlock(session: FlagshipSession): FlagshipSessionContentBlock {
  return {
    id: `${session.id}-premium-readiness-check`,
    type: 'key_points',
    eyebrow: 'Quality gate',
    title: 'Before you mark this chapter complete',
    bullets: [
      'Can you state your claim and your evidence in separate sentences (no blended “because I feel”)?',
      'Can you name what would falsify your next step—and what observation would trigger a pivot?',
      'Can you point to one artifact (note, metric, screenshot, quote, draft) that grounds this chapter in reality?',
      'If a busy reviewer skimmed your write-up in two minutes, would they know what decision you need from them?',
    ],
  }
}

/** After baseline merge (override + generator or generated-only), lift thin stacks toward premium depth without duplicating full generators. */
function applyPremiumLift(
  blocks: FlagshipSessionContentBlock[],
  session: FlagshipSession,
  curriculum: FlagshipCourseCurriculum | undefined,
): FlagshipSessionContentBlock[] {
  /** Course 1 ships authored overrides + generator merge; skip auto-appended orientation blocks to avoid stacked repetition. */
  if (session.courseSlug === 'ai-essentials') {
    return blocks
  }
  if (!curriculum || instructionalBodyCharTotal(blocks) >= PREMIUM_DEPTH_TARGET_CHARS) {
    return blocks
  }

  let out = [...blocks]
  if (
    !out.some(
      (b) =>
        b.id.endsWith('-premium-context-bridge') ||
        b.id.endsWith('-premium-capstone-bridge'),
    )
  ) {
    const bridge = premiumOrientationBridgeBlock(session, curriculum)
    if (bridge) out = [...out, bridge]
  }
  if (
    instructionalBodyCharTotal(out) < PREMIUM_DEPTH_TARGET_CHARS &&
    !out.some((b) => b.id.endsWith('-premium-readiness-check'))
  ) {
    out = [...out, premiumReadinessCheckBlock(session)]
  }
  return out
}

/**
 * Resolved instructional blocks for a session — authored overrides replace generated defaults when present.
 *
 * All fifteen flagship paths ship **full session override maps** (`FLAGSHIP_SESSION_CONTENT_OVERRIDES`);
 * the generator fallback exists for non-flagship surfaces and defensive gaps only.
 */
export function getFlagshipSessionContentBlocks(
  session: FlagshipSession,
  curriculum: FlagshipCourseCurriculum | undefined,
): FlagshipSessionContentBlock[] {
  const key = flagshipSessionContentOverrideKey(session.courseSlug, session.id)
  const override = FLAGSHIP_SESSION_CONTENT_OVERRIDES[key]
  const generated = generateFlagshipSessionBlocks(session, curriculum)

  let blocks: FlagshipSessionContentBlock[]
  if (override && override.length > 0) {
    const totalOverride = override.reduce((sum, b) => sum + blockTextLength(b), 0)
    if (totalOverride < MIN_OVERRIDE_CHARS && curriculum) {
      const usedIds = new Set(override.map((o) => o.id))
      const fillFromGenerated = generated.filter((g) => !usedIds.has(g.id))
      blocks = [...override, ...fillFromGenerated]
    } else if (totalOverride < MIN_OVERRIDE_CHARS && !curriculum) {
      blocks = [...override, ...generated.slice(1)]
    } else {
      blocks = [...override]
    }
  } else {
    blocks = generated
  }

  return applyPremiumLift(blocks, session, curriculum)
}
