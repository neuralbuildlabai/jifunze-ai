/**
 * Shared “completion layer” appended to flagship lesson readers: rubric-style checks,
 * KB/lab bridges, and remediation/next-step loops (curriculum-grounded).
 */
import type { PublicStarterLessonSection } from '../publicStarterLibraries/aiFoundations'
import { getAdjacentChatbotLessons, getChatbotCurriculumLesson } from './chatbotEverydayCurriculum'
import { getAdjacentExtendedLessons, getExtendedCatalogLesson } from './extendedLibrariesCurricula'
import { getAdjacentAiCurriculumLessons, getAiCurriculumLesson } from './aiEverydayWorkCurriculum'
import { getAdjacentMlLessons, getMlCurriculumLesson } from './machineLearningCurriculum'
import { conceptsForLessonSlug } from '../teaching/teachingKbIndex'
import { teachingLabById, teachingLabsAnchoredToLessonSlug } from '../teaching/teachingLabsCatalog'
import { PUBLIC_AI_LABS_BASE_PATH } from '../teaching/aiLabsCurriculum'
import { teachingLabRubricRows } from '../teaching/teachingTypes'

function lessonTitleForSlug(slug: string): string | undefined {
  return (
    getAiCurriculumLesson(slug)?.title ??
    getMlCurriculumLesson(slug)?.title ??
    getChatbotCurriculumLesson(slug)?.title ??
    getExtendedCatalogLesson(slug)?.title
  )
}

function nextLessonLine(slug: string): string | null {
  const ai = getAdjacentAiCurriculumLessons(slug).next
  if (ai) return `Continue the sequence with “${ai.title}”—keep notes on what changed in your prompts or verification steps.`

  const ml = getAdjacentMlLessons(slug).next
  if (ml) return `Continue the ML path with “${ml.title}”—bring one concrete metric or failure-mode question forward from this lesson.`

  const cb = getAdjacentChatbotLessons(slug).next
  if (cb) return `Continue the chatbot path with “${cb.title}”—explicitly decide scope boundaries before designing flows.`

  const ext = getAdjacentExtendedLessons(slug).next
  if (ext) return `Continue with “${ext.title}”—carry forward one checklist or escalation rule you drafted here.`

  return null
}

export function buildFlagshipPostSectionsForLessonSlug(slug: string): PublicStarterLessonSection[] {
  const title = lessonTitleForSlug(slug) ?? slug.replace(/-/g, ' ')
  const concepts = conceptsForLessonSlug(slug)

  const sections: PublicStarterLessonSection[] = []

  sections.push({
    heading: 'Serious learning checks (self-scored, rubric-style)',
    paragraphs: [
      `Timed explanation (3 minutes): teach “${title}” to a teammate using only your notes—then mark where you relied on vibes instead of falsifiable checks.`,
      `Contrast task: write two mini-paragraphs advocating opposite approaches to the same situation—then choose one and defend the tradeoff with one risk you accept.`,
      `Approve / revise / reject: draft a naive policy (“fast drafts are fine if they read well”). Revise it until it mentions verification, stakes, roles, and escalation.`,
      `Scenario reasoning: describe a realistic bad outcome if someone applied this lesson shallowly—then name one guardrail that prevents it without killing speed.`,
    ],
  })

  const labIds = new Set<string>()
  for (const c of concepts) {
    for (const lid of c.relatedLabIds) labIds.add(lid)
  }
  for (const l of teachingLabsAnchoredToLessonSlug(slug)) {
    labIds.add(l.id)
  }

  if (labIds.size) {
    const paras: string[] = [
      'Practice loop (intended order): read the concepts in this lesson → open the lab in a new tab → complete structured capture with an honest first pass → self-grade against the rubric and “what good looks like” → if you are under the bar, use the gentle hint, then the stronger hint, then the lab’s remediation block (not a model) → retry by changing one concrete thing (a field, a metric, a scope line) → return here and re-run the “serious learning checks” at the top of this page.',
      'These teaching labs are designed as capability practice—not busywork. Bring evidence of judgment (answers in the fields, not vibes in the margin), and keep a one-line “what would prove you wrong” next to your final attempt.',
    ]
    for (const id of [...labIds].slice(0, 5)) {
      const lab = teachingLabById(id)
      if (!lab) continue
      const href =
        lab.labAccess === 'public'
          ? `${PUBLIC_AI_LABS_BASE_PATH}#${lab.id}`
          : `/learning/labs#${lab.id}`
      const rubric = teachingLabRubricRows(lab)
      const proofLine = rubric[0]
        ? `Proof-of-capability check (pick one rubric row and cite evidence from your draft): ${rubric[0]}`
        : `Proof-of-capability check: show your work mapped to “${lab.task.slice(0, 120)}${lab.task.length > 120 ? '…' : ''}”.`
      paras.push(
        `Teaching lab · ${lab.title}: ${lab.summary} — learning objective: ${lab.learningObjective ?? lab.task} — open: ${href}`,
      )
      paras.push(proofLine)
      if (lab.commonMistakes[0]) {
        paras.push(`Trap to rehearse before you declare “done”: ${lab.commonMistakes[0]}`)
      }
      if (lab.remediation[0]) {
        paras.push(`If stuck after hints: start remediation with—${lab.remediation[0]}`)
      }
      if (lab.hintStrong?.length) {
        paras.push(`Stronger-process hint available on the lab sheet (after a weak attempt): ${lab.hintStrong}`)
      }
      if (lab.whatGoodLooksLike[0]) {
        paras.push(`What “good” looks like (excerpt): ${lab.whatGoodLooksLike[0]}`)
      }
      if (lab.nextSteps[0]) {
        paras.push(`After the lab / before the next lesson: ${lab.nextSteps[0]} — then skim “Anchored lessons” inside the lab if you need vocabulary repair.`)
      }
    }
    paras.push(
      `Recovery routing: reopen this lesson later from your lab via “Anchored lessons” links on /learning/labs—or ask embedded help using exact terms from “${title}”, not generic “explain this lesson.”`,
    )
    sections.push({
      heading: 'Labs linked to this lesson (capability practice)',
      paragraphs: paras,
    })
  }

  const kbParas: string[] = []
  if (concepts.length) {
    kbParas.push(
      `Indexed KB atoms tied to this lesson: ${concepts
        .slice(0, 6)
        .map((c) => c.title)
        .join(' · ')}.`,
    )
    kbParas.push(
      'Use embedded help with specific nouns from this page (constraints, risks, metrics)—short queries grounded in vocabulary beat broad asks.',
    )
    const misconception = concepts.find((c) => c.misconceptions?.length)?.misconceptions?.[0]
    if (misconception) {
      kbParas.push(`Misconception to rehearse: ${misconception}`)
    }
  } else {
    kbParas.push(
      'No dedicated KB atom cluster is indexed for this slug yet—still ask grounded help using lesson vocabulary; retrieval quality improves with specific terms.',
    )
  }

  sections.push({
    heading: 'Knowledge anchors & tutor-style prompts',
    paragraphs: kbParas,
  })

  const remediation: string[] = [
    `Revision drill: restate “${title}” as a checklist of 6 bullets—half must be “what would prove you wrong.”`,
    `Weak-signal watch: pick one mistake class you personally repeat (too trusting, skipping review, vague prompts) and schedule a 10-minute retry tomorrow with a different constraint.`,
    `Retry guidance: if you failed the timed explanation, shrink scope—explain one sub-idea until crisp, then expand.`,
  ]
  const nextLine = nextLessonLine(slug)
  if (nextLine) remediation.push(nextLine)

  sections.push({
    heading: 'Remediation, revisit, and next-best step',
    paragraphs: remediation,
  })

  return sections
}

export function mergeLessonSectionsWithFlagshipCompletion(
  slug: string | undefined,
  base: PublicStarterLessonSection[] | null,
): PublicStarterLessonSection[] | null {
  if (!slug || !base?.length) return base
  return [...base, ...buildFlagshipPostSectionsForLessonSlug(slug)]
}
