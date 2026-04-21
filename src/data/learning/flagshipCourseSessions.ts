/**
 * Session / lesson units beneath flagship modules — scalable architecture for guided journeys.
 * Sessions are derived from curriculum modules plus a terminal capstone sequence.
 */

import type { FlagshipCourseCurriculum, FlagshipCurriculumModule } from './flagshipCourseCurricula'
import type { FlagshipDepthStage } from './flagshipCurriculumTypes'

export type FlagshipSessionType =
  | 'lesson'
  | 'practice'
  | 'recap'
  | 'reflection'
  | 'revision'
  | 'capstone_prep'

export type FlagshipSession = {
  id: string
  courseSlug: string
  moduleId: string
  /** Sequence within the module */
  orderInModule: number
  /** Sequence across the whole course (1…n) */
  orderInCourse: number
  title: string
  type: FlagshipSessionType
  /**
   * Legacy numeric hint retained for analytics / future timing models — prefer {@link effortLabel} in UI.
   */
  durationMinutes: number
  /** Qualitative pacing — preferred for learner-facing surfaces (no false precision). */
  effortLabel: string
  summary: string
  objectives: string[]
  /** Practice / reflection prompts */
  activityPrompt?: string
  outputExpectation?: string
  /** Prior session ids that should be completed first (soft gate for UX; progress layer enforces) */
  prerequisites?: string[]
}

export const FLAGSHIP_SESSION_TYPE_LABEL: Record<FlagshipSessionType, string> = {
  lesson: 'Lesson',
  practice: 'Practice',
  recap: 'Recap',
  reflection: 'Reflection',
  revision: 'Revision',
  capstone_prep: 'Capstone prep',
}

function stageAnchor(stage: FlagshipDepthStage): string {
  switch (stage) {
    case 'foundations':
      return 'Foundations: vocabulary, constraints, and honest limits before speed.'
    case 'applied_practice':
      return 'Applied practice: repeatable moves under realistic friction.'
    case 'professional_execution':
      return 'Professional execution: stakeholder-ready judgment and communication.'
    case 'mastery_outputs':
      return 'Mastery: integrated artifacts you could defend, ship, or revisit on purpose.'
    default:
      return ''
  }
}

/** Qualitative effort — avoids misleading minute estimates in primary UI. */
export function flagshipSessionEffortDisplay(session: FlagshipSession): string {
  return session.effortLabel
}

function sessionEffortLabel(type: FlagshipSessionType, stage: FlagshipDepthStage): string {
  const tier =
    stage === 'foundations'
      ? 'foundations depth'
      : stage === 'applied_practice'
        ? 'applied depth'
        : stage === 'professional_execution'
          ? 'professional depth'
          : 'mastery depth'
  switch (type) {
    case 'lesson':
      return `Self-paced · ${tier} · study block`
    case 'practice':
      return `Self-paced · ${tier} · practice block`
    case 'revision':
      return `Self-paced · ${tier} · revision gate`
    case 'recap':
      return `Self-paced · ${tier} · consolidation`
    case 'reflection':
      return `Self-paced · ${tier} · reflection`
    case 'capstone_prep':
      return 'Self-paced · synthesis · capstone preparation'
    default:
      return 'Self-paced · structured focus block'
  }
}

function lessonDurationBand(stage: FlagshipDepthStage): number {
  switch (stage) {
    case 'foundations':
      return 28
    case 'applied_practice':
      return 30
    case 'professional_execution':
      return 32
    case 'mastery_outputs':
      return 34
    default:
      return 30
  }
}

function lessonTitle(module: FlagshipCurriculumModule): string {
  return module.title
}

function lessonSummary(module: FlagshipCurriculumModule): string {
  return `${module.summary}\n\n${stageAnchor(module.stage)}`
}

function practiceTitle(module: FlagshipCurriculumModule): string {
  return `Practice lab · ${module.title}`
}

function practiceSummary(module: FlagshipCurriculumModule): string {
  const n = module.practiceActivities.length
  const tasks =
    n > 0
      ? `Work through ${n} concrete task${n === 1 ? '' : 's'} aligned to “${module.title}”. `
      : ''
  return `${tasks}Produce reviewable artifacts: assumptions stated, evidence tied to decisions, and a quick “what would falsify this?” pass. ${stageAnchor(module.stage)}`
}

function revisionTitle(module: FlagshipCurriculumModule): string {
  return `Revision gate · ${module.title}`
}

function revisionSummary(module: FlagshipCurriculumModule): string {
  return `Compress “${module.title}” into precise claims and checks—catch misunderstandings before they compound across the path. ${stageAnchor(module.stage)}`
}

function recapTitle(module: FlagshipCurriculumModule): string {
  return `Consolidate · ${module.title}`
}

function recapSummary(module: FlagshipCurriculumModule): string {
  return `Build a recap artifact you will reopen: keywords, failure modes, and when to reuse vs. rethink this module. ${stageAnchor(module.stage)}`
}

function buildSessionsForModule(courseSlug: string, module: FlagshipCurriculumModule): Omit<FlagshipSession, 'orderInCourse'>[] {
  const out: Omit<FlagshipSession, 'orderInCourse'>[] = []
  let orderInModule = 0
  const prereqChain: string[] = []
  const st = module.stage

  const lessonId = `${module.id}-lesson`
  out.push({
    id: lessonId,
    courseSlug,
    moduleId: module.id,
    orderInModule: ++orderInModule,
    title: lessonTitle(module),
    type: 'lesson',
    durationMinutes: lessonDurationBand(st),
    effortLabel: sessionEffortLabel('lesson', st),
    summary: lessonSummary(module),
    objectives: module.learningGoals.length ? module.learningGoals : ['Understand the core ideas of this module before applying them.'],
    prerequisites: prereqChain.length ? [...prereqChain] : undefined,
  })
  prereqChain.push(lessonId)

  if (module.practiceActivities.length > 0) {
    const practiceId = `${module.id}-practice`
    out.push({
      id: practiceId,
      courseSlug,
      moduleId: module.id,
      orderInModule: ++orderInModule,
      title: practiceTitle(module),
      type: 'practice',
      durationMinutes: Math.min(56, 24 + module.practiceActivities.length * 7),
      effortLabel: sessionEffortLabel('practice', st),
      summary: practiceSummary(module),
      objectives: [
        'Translate concepts into actions you can repeat and review.',
        'Surface assumptions, tie them to evidence, and record what would change your mind.',
      ],
      activityPrompt: module.practiceActivities.map((a, i) => `${i + 1}. ${a}`).join('\n\n'),
      outputExpectation: module.expectedOutputs?.length ? module.expectedOutputs.join(' · ') : undefined,
      prerequisites: [...prereqChain],
    })
    prereqChain.push(practiceId)
  }

  if (module.revisionCheckpoint) {
    const revisionId = `${module.id}-revision`
    out.push({
      id: revisionId,
      courseSlug,
      moduleId: module.id,
      orderInModule: ++orderInModule,
      title: revisionTitle(module),
      type: 'revision',
      durationMinutes: st === 'mastery_outputs' ? 26 : 24,
      effortLabel: sessionEffortLabel('revision', st),
      summary: revisionSummary(module),
      objectives: [
        'Restate the module’s central claims without borrowed jargon.',
        'Expose one lingering uncertainty and how you will test it.',
      ],
      activityPrompt:
        'In writing: (1) three sentences summarizing what matters most, (2) two questions you still need to answer, (3) one check you will use next time stakes rise.',
      prerequisites: [...prereqChain],
    })
    prereqChain.push(revisionId)
  }

  if (module.recap) {
    const recapId = `${module.id}-recap`
    out.push({
      id: recapId,
      courseSlug,
      moduleId: module.id,
      orderInModule: ++orderInModule,
      title: recapTitle(module),
      type: 'recap',
      durationMinutes: 20,
      effortLabel: sessionEffortLabel('recap', st),
      summary: recapSummary(module),
      objectives: [
        'Compress the module into notes you will actually reopen this month.',
        'Link this module explicitly to the next steps in your path.',
      ],
      activityPrompt:
        'Draft a recap card: keywords, traps, “when to reuse”, and one dependency on another module. Save it where you review weekly.',
      prerequisites: [...prereqChain],
    })
    prereqChain.push(recapId)
  }

  return out
}

/** Course-level capstone sessions (after all module sessions) */
export const FLAGSHIP_CAPSTONE_MODULE_ID = 'capstone'

function capstoneSessions(courseSlug: string, curriculum: FlagshipCourseCurriculum): Omit<FlagshipSession, 'orderInCourse'>[] {
  const prepId = `${courseSlug}-capstone-prep`
  return [
    {
      id: prepId,
      courseSlug,
      moduleId: FLAGSHIP_CAPSTONE_MODULE_ID,
      orderInModule: 1,
      title: `Capstone preparation · ${curriculum.capstone.title}`,
      type: 'capstone_prep',
      durationMinutes: 48,
      effortLabel: sessionEffortLabel('capstone_prep', 'mastery_outputs'),
      summary:
        'Align evidence, drafts, and acceptance criteria with the capstone brief—readiness work for reviewable deliverables, not a narrative skim of the course.',
      objectives: [
        'Map each deliverable to evidence already in your artifacts vs. gaps to close.',
        'Define “done” with crisp acceptance criteria an external reviewer could use.',
        'Schedule an honest review pass before you mark preparation complete.',
      ],
      activityPrompt: curriculum.capstone.deliverables.map((d, i) => `Deliverable ${i + 1}: ${d}`).join('\n\n'),
      outputExpectation: curriculum.capstone.description,
      prerequisites: undefined,
    },
  ]
}

export function buildSessionsForCurriculum(curriculum: FlagshipCourseCurriculum): FlagshipSession[] {
  const flat: FlagshipSession[] = []
  let orderInCourse = 0

  for (const module of curriculum.modules) {
    const built = buildSessionsForModule(curriculum.slug, module)
    for (const row of built) {
      flat.push({ ...row, orderInCourse: ++orderInCourse })
    }
  }

  const cap = capstoneSessions(curriculum.slug, curriculum)
  for (const row of cap) {
    flat.push({ ...row, orderInCourse: ++orderInCourse })
  }

  return flat
}

export function sessionsForModule(moduleId: string, sessions: FlagshipSession[]): FlagshipSession[] {
  return sessions.filter((s) => s.moduleId === moduleId).sort((a, b) => a.orderInModule - b.orderInModule)
}

/** 1-based chapter index within the module (sequential learning units). */
export function chapterOrdinalInModule(session: FlagshipSession, sessions: FlagshipSession[]): number {
  const inMod = sessionsForModule(session.moduleId, sessions)
  const idx = inMod.findIndex((s) => s.id === session.id)
  return idx >= 0 ? idx + 1 : session.orderInModule
}

export function getSessionById(sessions: FlagshipSession[], id: string): FlagshipSession | undefined {
  return sessions.find((s) => s.id === id)
}

/** Non-capstone sessions that must be complete before capstone prep is “unlocked” */
export function nonCapstoneSessionIds(sessions: FlagshipSession[]): string[] {
  return sessions.filter((s) => s.type !== 'capstone_prep').map((s) => s.id)
}

export function capstonePrepSession(sessions: FlagshipSession[]): FlagshipSession | undefined {
  return sessions.find((s) => s.type === 'capstone_prep')
}
