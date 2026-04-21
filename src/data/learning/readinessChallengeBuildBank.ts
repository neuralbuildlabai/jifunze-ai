import { getFlagshipCourseBySlug } from '@/data/learning/flagshipCoursesCatalog'
import type { ReadinessQuestion } from '@/data/learning/readinessChallengeTypes'

type Template = {
  stem: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
}

/** Course-aware stems: neutral, readiness-oriented, not trivia. Pool size supports shuffled draws. */
const READINESS_TEMPLATES: Template[] = [
  {
    stem: 'Midway through "{course}", which habit best supports retained capability?',
    options: [
      'Rushing to the capstone to finish faster',
      'Completing practice and checkpoint evidence before moving forward',
      'Skipping revision until the path is finished',
      'Replacing guided work with passive video watching',
    ],
    correctIndex: 1,
  },
  {
    stem: 'When a scenario is ambiguous, what is the most disciplined learning move in "{course}"?',
    options: [
      'Pick the first answer that feels reasonable',
      'Interpret the constraints, then choose the option best supported by them',
      'Avoid committing until you have perfect information',
      'Defer practice until after the theory videos',
    ],
    correctIndex: 1,
  },
  {
    stem: 'Which mindset matches a serious guided path like "{course}"?',
    options: [
      'Coverage over depth',
      'Evidence of thinking through structured outputs',
      'Speed over revision',
      'Consuming content without applying it',
    ],
    correctIndex: 1,
  },
  {
    stem: 'If yesterday’s concept felt shaky, what should you do next?',
    options: [
      'Proceed to stay on schedule regardless',
      'Use the recap pathway and rework one applied exercise',
      'Skip practice sessions entirely',
      'Assume it will clarify later without effort',
    ],
    correctIndex: 1,
  },
  {
    stem: 'When feedback suggests your draft misread the brief, what is the strongest response?',
    options: [
      'Argue without revisiting the brief',
      'Re-anchor to objectives and revise against them',
      'Ignore feedback if effort was high',
      'Start over from scratch without comparing to criteria',
    ],
    correctIndex: 1,
  },
  {
    stem: 'Which behavior best protects academic integrity while learning?',
    options: [
      'Paste generated text without understanding',
      'Use assistance to iterate your own reasoning and cite sources',
      'Share assessment answers publicly',
      'Collaborate during individually assessed checkpoints',
    ],
    correctIndex: 1,
  },
  {
    stem: 'You’re tired but want progress. What is fairest to your future self?',
    options: [
      'Mark sessions complete without doing the work',
      'Shorten today’s session but keep evidence quality honest',
      'Avoid checkpoints until the weekend',
      'Skip objectives to save time',
    ],
    correctIndex: 1,
  },
  {
    stem: 'What does "readiness" mean inside a structured course?',
    options: [
      'Finishing videos quickly',
      'Being able to apply ideas under light constraints',
      'Knowing buzzwords without practice',
      'Completing everything perfectly on first try',
    ],
    correctIndex: 1,
  },
  {
    stem: 'Before a major practice session, what preparation most helps?',
    options: [
      'Avoid reviewing prior notes',
      'Scan objectives and jot likely pitfalls',
      'Assume prior modules are irrelevant',
      'Skip the setup checklist',
    ],
    correctIndex: 1,
  },
  {
    stem: 'You realize you forgot a foundational idea. What is the mature path?',
    options: [
      'Hide gaps to keep momentum',
      'Step back briefly to reinforce the foundation, then continue',
      'Quit the challenge',
      'Copy a peer’s notes without reflection',
    ],
    correctIndex: 1,
  },
  {
    stem: 'Which reflection prompt deepens learning after practice?',
    options: [
      'What grade would I guess?',
      'What would I change next time given the constraints?',
      'Was it fast enough?',
      'Did it look polished superficially?',
    ],
    correctIndex: 1,
  },
  {
    stem: 'When collaborating in professional contexts, what boundary is usually appropriate?',
    options: [
      'Share confidential client details for feedback',
      'Protect sensitive information while still seeking useful critique',
      'Avoid all feedback from others',
      'Delegate your own thinking entirely',
    ],
    correctIndex: 1,
  },
  {
    stem: 'A module emphasizes judgment under uncertainty. How should you practice?',
    options: [
      'Avoid tradeoffs by choosing extremes',
      'Practice articulating tradeoffs with clear assumptions',
      'Always wait for certainty',
      'Pick randomly to move on',
    ],
    correctIndex: 1,
  },
  {
    stem: 'You feel behind peers. What is healthiest?',
    options: [
      'Pretend you are caught up',
      'Calibrate your own plan and steady the weekly rhythm',
      'Skip revision to regain position',
      'Compare outputs constantly without criteria',
    ],
    correctIndex: 1,
  },
  {
    stem: 'Which habit builds durable skill rather than short-lived familiarity?',
    options: [
      'Repeating explanations without applying them',
      'Applying concepts in constrained scenarios with feedback loops',
      'Bookmarking content without practice',
      'Skipping checkpoints when confident',
    ],
    correctIndex: 1,
  },
  {
    stem: 'When instructions conflict slightly between resources, what should you prioritize?',
    options: [
      'The newest-looking slide',
      'The brief and assessment criteria for this course activity',
      'Whatever is shortest',
      'Social forums first',
    ],
    correctIndex: 1,
  },
  {
    stem: 'How should you treat mistakes during practice?',
    options: [
      'Erase them from memory quickly',
      'Capture the correction as a reusable rule',
      'Avoid revisiting failed attempts',
      'Assume mistakes mean unsuitability',
    ],
    correctIndex: 1,
  },
  {
    stem: 'What signals that you can move forward responsibly?',
    options: [
      'You watched all media',
      'You can explain tasks and constraints without the script',
      'You feel rushed but finished',
      'You avoided hard prompts',
    ],
    correctIndex: 1,
  },
  {
    stem: 'When time is limited, where should effort concentrate?',
    options: [
      'Decoration of slides',
      'Core objectives and evidence requested by checkpoints',
      'Reading unrelated articles',
      'Finding more tools instead of finishing work',
    ],
    correctIndex: 1,
  },
  {
    stem: 'Which framing matches institutional-quality learning?',
    options: [
      'Completion certificates over substance',
      'Demonstrable reasoning aligned to stated outcomes',
      'Maximum consumption hours',
      'Minimal interaction with feedback',
    ],
    correctIndex: 1,
  },
  {
    stem: 'You disagree with feedback. What is the constructive response?',
    options: [
      'Dismiss it if confident',
      'Test whether your artifact meets stated criteria—revise if not',
      'Debate emotionally',
      'Submit unchanged out of principle',
    ],
    correctIndex: 1,
  },
  {
    stem: 'Why do spaced revision moments exist in structured paths?',
    options: [
      'To slow learners down unnecessarily',
      'To stabilize memory and transfer before harder work',
      'To add busywork',
      'To replace practice entirely',
    ],
    correctIndex: 1,
  },
]

function substitute(label: string, s: string): string {
  return s.replace(/\{course\}/g, label)
}

/** Deterministic shuffle so attempts vary but stays reproducible in tests if needed. */
function seededOrder(seed: string, length: number): number[] {
  const idx = [...Array(length).keys()]
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  for (let i = idx.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) >>> 0
    const j = h % (i + 1)
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return idx
}

export function buildReadinessBankForSlug(courseSlug: string): ReadinessQuestion[] {
  const course = getFlagshipCourseBySlug(courseSlug)
  const label = course?.title ?? courseSlug
  const order = seededOrder(courseSlug, READINESS_TEMPLATES.length)
  return order.map((ti, pos) => {
    const t = READINESS_TEMPLATES[ti]!
    const options = t.options.map((o) => substitute(label, o)) as [string, string, string, string]
    return {
      id: `${courseSlug}-rc-${ti}-${pos}`,
      stem: substitute(label, t.stem),
      options,
      correctIndex: t.correctIndex,
    }
  })
}
