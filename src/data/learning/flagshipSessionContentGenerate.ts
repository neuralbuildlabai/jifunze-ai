/**
 * Builds instructive session blocks from curriculum metadata + session shell.
 * Keeps session pages deep without duplicating giant prose in React components.
 */

import type { FlagshipCourseCurriculum, FlagshipCurriculumModule } from './flagshipCourseCurricula'
import { flagshipStageLabel } from './flagshipCourseCurricula'
import { FLAGSHIP_OPENING_LESSON_SUPPLEMENT } from './flagshipCourseOpeningSupplements'
import type { FlagshipSession } from './flagshipCourseSessions'
import { FLAGSHIP_CAPSTONE_MODULE_ID } from './flagshipCourseSessions'
import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'

function stageForModule(module: FlagshipCurriculumModule): string {
  return flagshipStageLabel(module.stage)
}

function lessonBlocks(
  session: FlagshipSession,
  module: FlagshipCurriculumModule,
  curriculum: FlagshipCourseCurriculum,
): FlagshipSessionContentBlock[] {
  const stage = stageForModule(module)
  const opening = FLAGSHIP_OPENING_LESSON_SUPPLEMENT[curriculum.slug]
  const isCourseOpening = session.orderInCourse === 1 && session.type === 'lesson'

  const conceptBody = [
    session.summary.trim(),
    '',
    `Stage lens (${stage}): ${module.summary.trim()}`,
    '',
    'Instructional standard: prefer claims you can defend with evidence, scenarios, or artifacts. When stakes rise, slow down and name your verification standard.',
  ].join('\n')

  const workedNarrative = [
    `Trace one realistic thread for “${module.title}”.`,
    module.learningGoals[0]
      ? `Anchor to this outcome: ${module.learningGoals[0]} List inputs you truly have, missing information you should flag, and a falsifier—what observation would prove you wrong?`
      : `List inputs you have, missing information, and what would change your conclusion.`,
    module.practiceActivities[0]
      ? `Link forward to practice: ${module.practiceActivities[0]}`
      : `Keep the chain explicit: observation → interpretation → accountable next action.`,
  ].join('\n')

  const introBody = [
    isCourseOpening && opening ? `${opening}\n\n` : '',
    `You are building usable judgment in “${module.title}”—not collecting terminology.`,
    session.summary.trim(),
  ]
    .filter(Boolean)
    .join('\n\n')

  return [
    {
      id: `${session.id}-intro`,
      type: 'intro',
      eyebrow: 'Lesson',
      title: isCourseOpening ? 'Start of this flagship path' : 'How this session fits',
      body: introBody,
      visualAid: { kind: 'prompt_review_cycle', caption: 'Use this loop whenever outputs influence decisions.' },
    },
    {
      id: `${session.id}-concept`,
      type: 'concept_explanation',
      eyebrow: stage,
      title: 'Core ideas to internalize',
      body: conceptBody,
    },
    {
      id: `${session.id}-keys`,
      type: 'key_points',
      title: 'Learning objectives',
      bullets: module.learningGoals.length ? module.learningGoals : session.objectives,
    },
    {
      id: `${session.id}-worked`,
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'From concept to a concrete pass',
      body: workedNarrative,
      example:
        module.practiceActivities[1] ??
        `Constraint: write your reasoning in short bullets a colleague could challenge in one minute.`,
      visualAid: {
        kind: 'comparison',
        weakLabel: 'Shallow prompt',
        strongLabel: 'Evidence-seeking prompt',
        weak: '“Explain this topic in detail.” (No audience, no constraints, no falsifier.)',
        strong:
          '“For a skeptical ops manager, give three tradeoffs with sources—then state what would change your recommendation.”',
        caption: 'Specificity creates signal the model can amplify.',
      },
    },
    {
      id: `${session.id}-bridge`,
      type: 'concept_explanation',
      eyebrow: 'Toward practice',
      title: 'What you will stress-test next',
      body: module.practiceActivities[0]
        ? `The paired practice session is designed around this move: ${module.practiceActivities[0]} Use this lesson to assemble vocabulary and checks—then bring one real scenario into practice so judgment forms under constraint.`
        : `The paired practice session will force application under constraint. Capture vocabulary and checks here so you are not improvising guardrails during the drill.`,
    },
    {
      id: `${session.id}-reflect`,
      type: 'reflection_prompt',
      eyebrow: 'Slow down',
      title: 'Before you leave this lesson',
      prompt: `Where are you most tempted to rush or outsource thinking in “${module.title}”? What single check would slow that down constructively?`,
    },
    {
      id: `${session.id}-takeaway`,
      type: 'takeaway',
      title: 'Carry forward',
      bullets: [
        `Stage focus: ${stage} — tie recommendations to evidence, downside, and revision rules.`,
        `Prefer claims you could defend if someone skeptical asked “how do you know?”`,
      ],
    },
    {
      id: `${session.id}-next`,
      type: 'next_step',
      title: 'Recommended next move',
      body: `Continue to applied practice when you can explain the tradeoffs aloud. Bring one concrete scenario—work, study, or civic—so reps stay grounded.`,
    },
  ]
}

function practiceBlocks(session: FlagshipSession, module: FlagshipCurriculumModule): FlagshipSessionContentBlock[] {
  const stage = stageForModule(module)
  const tasks =
    session.activityPrompt?.split(/\n\n+/).filter(Boolean) ??
    module.practiceActivities.map((a, i) => `${i + 1}. ${a}`)

  return [
    {
      id: `${session.id}-intro`,
      type: 'intro',
      eyebrow: 'Practice',
      title: 'Apply with constraints',
      body: [
        `Deliberate practice for “${module.title}” (${stage}).`,
        'Fewer iterations with explicit review beat ten rushed passes.',
        'Complete the mastery checkpoints on this page—they record defensible evidence, not button clicks.',
      ].join('\n\n'),
      visualAid: {
        kind: 'callout',
        variant: 'practice_tip',
        title: 'Slow is smooth',
        body: 'After each model pass, pause for verification: what did you assume, cite, or still need to observe?',
      },
    },
    {
      id: `${session.id}-tasks`,
      type: 'practice_task',
      title: 'Tasks',
      bullets: tasks.length ? tasks : ['Follow the objectives above with a real or realistic scenario.'],
      prompt: session.activityPrompt,
    },
    {
      id: `${session.id}-output`,
      type: 'output_prompt',
      eyebrow: 'Deliverable',
      title: 'What you should produce',
      body: session.outputExpectation ?? module.expectedOutputs?.join(' · ') ?? 'A short artifact you could show someone else: structured, dated, and scoped.',
      outputExpectation: session.outputExpectation,
    },
    {
      id: `${session.id}-reflect`,
      type: 'reflection_prompt',
      title: 'Review gate',
      prompt:
        'After you finish: what changed between draft one and final? What did you verify, and what remains uncertain on purpose?',
    },
    {
      id: `${session.id}-next`,
      type: 'next_step',
      title: 'Next',
      body: 'Save outputs where you will see them this week—then continue to the next session in the path when your review is done.',
    },
  ]
}

function revisionBlocks(session: FlagshipSession, module: FlagshipCurriculumModule): FlagshipSessionContentBlock[] {
  return [
    {
      id: `${session.id}-intro`,
      type: 'intro',
      eyebrow: 'Revision',
      title: 'Tighten your model',
      body: `Revision for “${module.title}” (${stageForModule(module)}): compress, test, and surface misunderstandings before they compound.`,
    },
    {
      id: `${session.id}-recap`,
      type: 'recap',
      title: 'Restate with precision',
      bullets: [
        'Write the module’s core claims in your own words—no jargon borrowed without meaning.',
        'Identify one claim you would now qualify more carefully than before.',
      ],
    },
    {
      id: `${session.id}-practice`,
      type: 'practice_task',
      title: 'Structured check',
      prompt: session.activityPrompt,
    },
    {
      id: `${session.id}-reflect`,
      type: 'reflection_prompt',
      title: 'Honest uncertainty',
      prompt: 'What is one question you still need to answer before you would stake a decision on this material?',
    },
    {
      id: `${session.id}-next`,
      type: 'next_step',
      body: 'If anything felt fuzzy, revisit the lesson notes—then move forward only when you can explain the tradeoffs aloud.',
    },
  ]
}

function recapBlocks(session: FlagshipSession, module: FlagshipCurriculumModule): FlagshipSessionContentBlock[] {
  return [
    {
      id: `${session.id}-intro`,
      type: 'intro',
      eyebrow: 'Recap',
      title: 'Consolidate so it survives the week',
      body: `Lightweight consolidation for “${module.title}”—you are compressing, not re‑reading.`,
    },
    {
      id: `${session.id}-recap`,
      type: 'recap',
      title: 'Module recap card',
      prompt: session.activityPrompt,
      bullets: ['Keywords worth keeping', 'Traps you will watch for', 'When to reuse vs. when to rethink'],
    },
    {
      id: `${session.id}-takeaway`,
      type: 'takeaway',
      title: 'Takeaway',
      body: `Link this module to the next stage of the path (${stageForModule(module)}): what single habit will you reinforce this week?`,
    },
    {
      id: `${session.id}-next`,
      type: 'next_step',
      title: 'Continue the path',
      body: 'Proceed to the next module when your recap card is saved somewhere you review weekly.',
    },
  ]
}

function reflectionBlocks(session: FlagshipSession, module: FlagshipCurriculumModule): FlagshipSessionContentBlock[] {
  return [
    {
      id: `${session.id}-intro`,
      type: 'intro',
      eyebrow: 'Reflection',
      title: 'Integrate experience',
      body: `Reflection for “${module.title}”—translate ideas into commitments you will actually keep.`,
    },
    {
      id: `${session.id}-reflect`,
      type: 'reflection_prompt',
      title: 'Guided prompts',
      prompt: session.activityPrompt ?? 'What surprised you? What would you do differently with one more iteration?',
    },
    {
      id: `${session.id}-output`,
      type: 'output_prompt',
      title: 'Optional capture',
      body: session.outputExpectation ?? 'Short notes you can revisit: decisions, tensions, and next experiments.',
    },
    {
      id: `${session.id}-next`,
      type: 'next_step',
      body: 'Carry one insight forward as a behavior change—not a vague intention.',
    },
  ]
}

function capstonePrepBlocks(session: FlagshipSession, curriculum: FlagshipCourseCurriculum): FlagshipSessionContentBlock[] {
  const { capstone } = curriculum
  return [
    {
      id: `${session.id}-intro`,
      type: 'intro',
      eyebrow: 'Capstone',
      title: capstone.title,
      body: [
        capstone.description,
        '',
        'Use this session once your module work and checkpoints are done: align drafts and evidence with the brief below.',
      ].join('\n'),
    },
    {
      id: `${session.id}-rubric`,
      type: 'concept_explanation',
      eyebrow: 'Audit-minded',
      title: 'What reviewers should see',
      body: 'Each deliverable should carry provenance: sources, assumptions, decisions, and limits. Prefer tight scope with strong proof over encyclopedic breadth.',
      visualAid: {
        kind: 'callout',
        variant: 'verify',
        title: 'Provenance beats polish',
        body: 'Ship fewer claims with receipts—sources, assumptions, and explicit limits beat glossy prose.',
      },
    },
    {
      id: `${session.id}-keys`,
      type: 'key_points',
      title: 'Deliverables to align',
      bullets: capstone.deliverables,
    },
    {
      id: `${session.id}-tasks`,
      type: 'practice_task',
      title: 'Preparation checklist',
      prompt: session.activityPrompt,
      bullets: [
        'Map evidence you already have vs. gaps you must fill.',
        'Define “done” for each deliverable—reviewers should see crisp acceptance criteria.',
        'Schedule honest review time before you call it finished.',
      ],
    },
    {
      id: `${session.id}-output`,
      type: 'output_prompt',
      title: 'Submission mindset',
      body: session.outputExpectation ?? 'Favor clarity and accountability over breadth—three strong proofs beat ten shallow mentions.',
      outputExpectation: session.outputExpectation,
    },
    {
      id: `${session.id}-next`,
      type: 'next_step',
      title: 'After this session',
      body: 'Complete remaining session markers, then assemble your capstone package with the same verification discipline you practiced throughout the course.',
    },
  ]
}

function minimalBlocks(session: FlagshipSession): FlagshipSessionContentBlock[] {
  return [
    {
      id: `${session.id}-intro`,
      type: 'intro',
      title: session.title,
      body: session.summary,
    },
    {
      id: `${session.id}-keys`,
      type: 'key_points',
      title: 'Focus',
      bullets: session.objectives,
    },
    ...(session.activityPrompt
      ? [
          {
            id: `${session.id}-task`,
            type: 'practice_task' as const,
            title: 'Activity',
            prompt: session.activityPrompt,
          },
        ]
      : []),
    ...(session.outputExpectation
      ? [
          {
            id: `${session.id}-out`,
            type: 'output_prompt' as const,
            title: 'Output',
            body: session.outputExpectation,
          },
        ]
      : []),
  ]
}

export function generateFlagshipSessionBlocks(
  session: FlagshipSession,
  curriculum: FlagshipCourseCurriculum | undefined,
): FlagshipSessionContentBlock[] {
  if (!curriculum) {
    return minimalBlocks(session)
  }

  if (session.moduleId === FLAGSHIP_CAPSTONE_MODULE_ID || session.type === 'capstone_prep') {
    return capstonePrepBlocks(session, curriculum)
  }

  const module = curriculum.modules.find((m) => m.id === session.moduleId)
  if (!module) {
    return minimalBlocks(session)
  }

  switch (session.type) {
    case 'lesson':
      return lessonBlocks(session, module, curriculum)
    case 'practice':
      return practiceBlocks(session, module)
    case 'revision':
      return revisionBlocks(session, module)
    case 'recap':
      return recapBlocks(session, module)
    case 'reflection':
      return reflectionBlocks(session, module)
    default:
      return minimalBlocks(session)
  }
}
