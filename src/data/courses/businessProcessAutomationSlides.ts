import { BUSINESS_PROCESS_AUTOMATION_SLUG } from './businessProcessAutomationConstants'

/** Module slugs — must match `businessProcessAutomationModules.ts`. */
export const BPA_MODULE_SLUGS = [
  'automation-foundations',
  'understanding-current-workflow',
  'finding-automation-opportunities',
  'designing-future-workflow',
  'business-value-risk-implementation',
] as const

export type BpaModuleSlug = (typeof BPA_MODULE_SLUGS)[number]

export type BusinessProcessAutomationSlideEntry = {
  id: string
  slideNumber: number
  title: string
  imageSrc: string
  altText: string
  moduleId: BpaModuleSlug
  lessonId?: string
  keyTakeaway?: string
}

export type BusinessProcessAutomationSlideManifest = {
  courseSlug: typeof BUSINESS_PROCESS_AUTOMATION_SLUG
  deckTitle: string
  deckDownloadUrl: string
  totalSlides: number
  moduleSlideRanges: Record<BpaModuleSlug, { start: number; end: number }>
  slides: readonly BusinessProcessAutomationSlideEntry[]
}

const DECK_FILE = 'Business_Process_Automation_for_Work_Jifunze.pptx'
const ASSET_BASE = `/course-assets/business-process-automation-for-work`

export const BUSINESS_PROCESS_AUTOMATION_DECK_DOWNLOAD_URL = `${ASSET_BASE}/deck/${DECK_FILE}` as const

const SLIDE_TITLES: readonly string[] = [
  'Title slide',
  'Course promise and business value',
  'What business process automation means',
  'Automation vs digitization vs AI',
  'What should and should not be automated',
  'The automation thinking cycle',
  'Meet BrightPath Training Center',
  'The business problem we are solving',
  "BrightPath's current manual workflow",
  'Before workflow map',
  'Swimlane diagram: who does what',
  'Reading the workload dataset',
  'Manual workload calculation',
  'Staff hours by task',
  'Error and delay analysis',
  'Bottlenecks and handoff failures',
  'How to decide if a task is automation-ready',
  'Human judgment vs automation decision tree',
  'Automation suitability scoring',
  'Impact vs effort matrix',
  'Prioritizing high-value automation',
  'What not to automate yet',
  'Data quality and structured intake',
  'Exception handling and escalation',
  'Automation option 1 — structured enquiry and registration forms',
  'Automation option 2 — automated course info and reminders',
  'Automation option 3 — payment follow-up tracker',
  'Automation option 4 — attendance and certificate workflow',
  'Automation option 5 — feedback and improvement loop',
  'After workflow map',
  'Automation dashboard mockup',
  'Time saved analysis',
  'Cost savings estimate',
  'Error and delay reduction estimate',
  'Risk and control checklist',
  'Change management for automation',
  '30-60-90 day implementation roadmap',
  'Executive recommendation for BrightPath',
  'Learner practice: redesign a manual workflow',
  'Mini quiz and final roadmap',
] as const

function moduleIdForSlideNumber(n: number): BpaModuleSlug {
  if (n <= 8) return 'automation-foundations'
  if (n <= 16) return 'understanding-current-workflow'
  if (n <= 24) return 'finding-automation-opportunities'
  if (n <= 31) return 'designing-future-workflow'
  return 'business-value-risk-implementation'
}

function slideImageSrc(index1: number): string {
  const num = String(index1).padStart(2, '0')
  return `${ASSET_BASE}/slides/slide-${num}.png`
}

function buildSlides(): readonly BusinessProcessAutomationSlideEntry[] {
  return SLIDE_TITLES.map((title, i) => {
    const slideNumber = i + 1
    return {
      id: `bpa-slide-${String(slideNumber).padStart(2, '0')}`,
      slideNumber,
      title,
      imageSrc: slideImageSrc(slideNumber),
      altText: `Slide ${slideNumber}: ${title}`,
      moduleId: moduleIdForSlideNumber(slideNumber),
    }
  })
}

export const businessProcessAutomationSlideManifest: BusinessProcessAutomationSlideManifest = {
  courseSlug: BUSINESS_PROCESS_AUTOMATION_SLUG,
  deckTitle: 'Business Process Automation for Work — Jifunze training deck',
  deckDownloadUrl: BUSINESS_PROCESS_AUTOMATION_DECK_DOWNLOAD_URL,
  totalSlides: SLIDE_TITLES.length,
  moduleSlideRanges: {
    'automation-foundations': { start: 1, end: 8 },
    'understanding-current-workflow': { start: 9, end: 16 },
    'finding-automation-opportunities': { start: 17, end: 24 },
    'designing-future-workflow': { start: 25, end: 31 },
    'business-value-risk-implementation': { start: 32, end: 40 },
  },
  slides: buildSlides(),
}

/** Lesson-specific slide ranges (inclusive). Fallback: use module range via `getBpaSlidesForModule`. */
const BPA_LESSON_SLIDE_MAP: Readonly<Record<string, { start: number; end: number }>> = {
  'automation-foundations|1.1': { start: 3, end: 3 },
  'automation-foundations|1.2': { start: 4, end: 4 },
  'automation-foundations|1.3': { start: 6, end: 6 },
  'automation-foundations|1.4': { start: 5, end: 5 },
  'automation-foundations|1.5': { start: 7, end: 8 },
  'understanding-current-workflow|2.1': { start: 10, end: 10 },
  'understanding-current-workflow|2.2': { start: 12, end: 12 },
  'understanding-current-workflow|2.3': { start: 13, end: 13 },
  'understanding-current-workflow|2.4': { start: 14, end: 15 },
  'understanding-current-workflow|2.5': { start: 16, end: 16 },
  'finding-automation-opportunities|3.1': { start: 17, end: 17 },
  'finding-automation-opportunities|3.2': { start: 18, end: 18 },
  'finding-automation-opportunities|3.3': { start: 19, end: 19 },
  'finding-automation-opportunities|3.4': { start: 20, end: 21 },
  'finding-automation-opportunities|3.5': { start: 23, end: 24 },
  'designing-future-workflow|4.1': { start: 25, end: 25 },
  'designing-future-workflow|4.2': { start: 26, end: 26 },
  'designing-future-workflow|4.3': { start: 27, end: 27 },
  'designing-future-workflow|4.4': { start: 28, end: 28 },
  'designing-future-workflow|4.5': { start: 30, end: 30 },
  'business-value-risk-implementation|5.1': { start: 32, end: 33 },
  'business-value-risk-implementation|5.2': { start: 35, end: 35 },
  'business-value-risk-implementation|5.3': { start: 36, end: 36 },
  'business-value-risk-implementation|5.4': { start: 37, end: 37 },
  'business-value-risk-implementation|5.5': { start: 38, end: 38 },
  'business-value-risk-implementation|5.6': { start: 39, end: 40 },
}

export function getBpaLessonSlideRange(
  moduleSlug: string,
  lessonNumber: string,
): { start: number; end: number } | undefined {
  return BPA_LESSON_SLIDE_MAP[`${moduleSlug}|${lessonNumber}`]
}

export function getBpaSlidesForModule(moduleSlug: string): readonly BusinessProcessAutomationSlideEntry[] {
  const range = businessProcessAutomationSlideManifest.moduleSlideRanges[moduleSlug as BpaModuleSlug]
  if (!range) return []
  return businessProcessAutomationSlideManifest.slides.filter(
    (s) => s.slideNumber >= range.start && s.slideNumber <= range.end,
  )
}

export function getBpaSlidesForLesson(
  moduleSlug: string,
  lessonNumber: string,
): readonly BusinessProcessAutomationSlideEntry[] {
  const mapped = getBpaLessonSlideRange(moduleSlug, lessonNumber)
  if (mapped) {
    return businessProcessAutomationSlideManifest.slides.filter(
      (s) => s.slideNumber >= mapped.start && s.slideNumber <= mapped.end,
    )
  }
  return getBpaSlidesForModule(moduleSlug)
}
