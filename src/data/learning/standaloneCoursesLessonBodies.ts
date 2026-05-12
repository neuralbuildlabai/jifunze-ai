import type { PublicStarterLessonSection } from '../publicStarterLibraries/aiFoundations'
import { getExtendedCatalogLesson, getExtendedCatalogPlacement } from './extendedLibrariesCurricula'

type DepthArgs = {
  courseShort: string
  categoryTitle: string
  moduleTitle: string
  lessonTitle: string
  lessonSummary: string
  outcomes: string[]
}

function courseShortFromSlug(slug: string): string | null {
  if (slug.startsWith('pem-')) return 'Prompt Engineering Across ChatGPT, Claude, and Gemini'
  if (slug.startsWith('gpw-')) return 'Gemini for Productivity and Google Workspace'
  if (slug.startsWith('clw-')) return 'Claude for Writing, Research, and Deep Thinking'
  if (slug.startsWith('aar-')) return 'Agentic AI and AI Agents for Real Work'
  return null
}

function buildDepthSections(args: DepthArgs): PublicStarterLessonSection[] {
  const { courseShort, categoryTitle, moduleTitle, lessonTitle, lessonSummary, outcomes } = args
  const o1 = outcomes[0] ?? 'Explain the core idea in your own words using a real workflow example.'
  const o2 = outcomes[1] ?? 'Identify a common mistake and the review habit that prevents it.'
  const o3 = outcomes[2] ?? 'Choose constraints and verification steps matched to realistic risk.'

  return [
    {
      heading: 'Concept teaching (what to understand)',
      paragraphs: [
        `${lessonTitle} sits inside “${moduleTitle}” within ${categoryTitle}—part of the standalone course ${courseShort}. The aim is practical judgment: you can use assistive tools without confusing fluency with truth, authority, or outcomes.`,
        `${lessonSummary}`,
        `Materials are instructional and assistive—they expand access to structured practice, not guarantees of mastery, certification, hiring, exam success, or professional qualification.`,
      ],
    },
    {
      heading: 'Why this matters in real workplaces',
      paragraphs: [
        `Most failures here are not “model quality” dramas—they are specification, verification, and accountability failures. When stakes rise, your workflow must show what you verified, what you assumed, and what remains uncertain.`,
        `Use ${lessonTitle} to tighten one recurring workflow you actually run (writing, planning, summarizing, debugging prompts, or Workspace drafting). Pick a realistic artifact type—email, memo, checklist, revision notes—rather than abstract study.`,
      ],
    },
    {
      heading: 'Worked application (scenario-shaped, not fictional guarantees)',
      paragraphs: [
        `Scenario: you must produce a useful draft quickly, but the final decision still belongs to you or an accountable human owner. Walk the loop slowly: clarify goal → constrain format → generate → verify claims → revise → ship or escalate.`,
        `Concrete checkpoint: rewrite one paragraph of model output into a safer version that separates (a) verified facts, (b) assumptions, (c) unknowns—without polishing uncertainty away.`,
      ],
    },
    {
      heading: 'Misconceptions / common traps',
      paragraphs: [
        `Trap A: trusting tone and polish. Trap B: treating the tool like it knows private context you never supplied. Trap C: “done enough” reviews on high-stakes claims.`,
        `Trap D: comparing vendors ideologically instead of evaluating behaviors on rubric-controlled tasks. If ${courseShort.includes('Gemini') ? 'Workspace' : 'your'} environment has policy constraints, treat them as primary—not forum debates.`,
      ],
    },
    {
      heading: 'Practice checkpoint (write brief answers)',
      paragraphs: [
        `Answer in your own words (3–6 sentences each): (${o1})`,
        `Then: (${o2})`,
        `Finally: (${o3})`,
      ],
    },
    {
      heading: 'Review cues + what “good understanding” looks like',
      paragraphs: [
        `Good understanding shows up as behavior: you pause before exporting; you label uncertainty; you match verification depth to consequence; you avoid overstating what automation did.`,
        `Revision anchoring question: “What would falsify my key claim quickly—and do I have access to that evidence?” If not, your next step is sourcing or escalation—not prettier wording.`,
      ],
    },
  ]
}

/**
 * Hand-structured instructional depth for standalone Jifunze courses (including ChatGPT, prompting, Gemini, Claude writing, agentic AI).
 * This is intentionally authored as a consistent spine so courses feel product-grade—not generic boilerplate.
 */
export function standaloneCourseLessonSections(slug: string | undefined): PublicStarterLessonSection[] | null {
  if (!slug) return null
  const courseShort = courseShortFromSlug(slug)
  if (!courseShort) return null
  const lesson = getExtendedCatalogLesson(slug)
  const placement = getExtendedCatalogPlacement(slug)
  if (!lesson || !placement) return null
  return buildDepthSections({
    courseShort,
    categoryTitle: placement.category.title,
    moduleTitle: placement.module.title,
    lessonTitle: lesson.title,
    lessonSummary: lesson.summary,
    outcomes: lesson.outcomes,
  })
}
