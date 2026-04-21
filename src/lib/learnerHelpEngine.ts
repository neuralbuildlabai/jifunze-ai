import {
  getAiCurriculumLesson,
  flattenAiCurriculumLessons,
  getAdjacentAiCurriculumLessons,
} from '../data/learning/aiEverydayWorkCurriculum'
import { getAdjacentExtendedLessons } from '../data/learning/extendedLibrariesCurricula'
import {
  PUBLIC_CHATBOT_LIBRARY_BASE_PATH,
  flattenChatbotCurriculumLessons,
  getChatbotCurriculumLesson,
} from '../data/learning/chatbotEverydayCurriculum'
import {
  getMlCurriculumLesson,
  flattenMlCurriculumLessons,
  getAdjacentMlLessons,
} from '../data/learning/machineLearningCurriculum'
import { extendedLessonPublicHref, getExtendedCatalogLesson } from '../data/learning/extendedLibrariesCurricula'
import { PUBLIC_AI_FOUNDATIONS_BASE_PATH } from '../data/publicStarterLibraries/aiFoundations'
import { PUBLIC_ML_LIBRARY_BASE_PATH } from '../data/learning/machineLearningCurriculum'
import { PUBLIC_AI_LABS_BASE_PATH } from '../data/teaching/aiLabsCurriculum'
import { TEACHING_CONCEPTS, teachingConceptById } from '../data/teaching/teachingKnowledgeBase'
import {
  conceptsForLessonSlug,
  conceptsLinkedToLab,
  kbPlacementSentenceForFlagshipSession,
  kbPlacementSentenceForLessonSlug,
} from '../data/teaching/teachingKbIndex'
import { teachingLabById } from '../data/teaching/teachingLabsCatalog'
import type { TeachingConcept } from '../data/teaching/teachingTypes'
import { recordTeachingSignal } from '../data/teaching/teachingSignals'
import { getFlagshipCurriculum } from '../data/learning/flagshipCourseCurricula'
import { curriculumOutlineSnippet, resolveTopicToCourses } from './courseTopicResolver'
import { LEGAL_ROUTES } from '../training/trustCopy'

export type LearnerHelpCitation = {
  label: string
  href: string
}

export type LearnerHelpAnswer = {
  title: string
  body: string[]
  citations: LearnerHelpCitation[]
  confidence: 'high' | 'medium' | 'low'
}

export type LearnerHelpQueryParams = {
  query: string
  /** When embedded in a lesson reader—improves placement + next-step routing. */
  currentLessonSlug?: string
  /** When embedded near a lab surface—narrows hints without dumping answers. */
  labId?: string
  /** Flagship course player: deep-link context for exact chapter routing. */
  currentCourseSlug?: string
  currentSessionId?: string
  /**
   * When the purchase gate is on and the learner lacks access, citations stay entitlement-aware
   * (pricing / catalog) instead of implying full chapter bodies here.
   */
  flagshipCourseAccess?: 'open' | 'locked'
}

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/g)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3)
}

export function lessonPublicHref(slug: string): string | null {
  if (getAiCurriculumLesson(slug)) return `${PUBLIC_AI_FOUNDATIONS_BASE_PATH}/${slug}`
  if (getMlCurriculumLesson(slug)) return `${PUBLIC_ML_LIBRARY_BASE_PATH}/${slug}`
  if (getChatbotCurriculumLesson(slug)) return `${PUBLIC_CHATBOT_LIBRARY_BASE_PATH}/${slug}`
  const extended = extendedLessonPublicHref(slug)
  if (extended) return extended
  return null
}

function scoreConcept(queryTokens: string[], concept: TeachingConcept): number {
  let score = 0
  const hay = `${concept.title} ${concept.explanation} ${concept.keywords.join(' ')}`.toLowerCase()
  for (const t of queryTokens) {
    if (hay.includes(t)) score += 3
  }
  for (const kw of concept.keywords) {
    if (queryTokens.some((t) => kw.toLowerCase().includes(t) || t.includes(kw.toLowerCase()))) score += 4
  }
  return score
}

function rankConcepts(query: string): TeachingConcept[] {
  const tokens = tokenize(query)
  const ranked = TEACHING_CONCEPTS.map((c) => ({ c, s: scoreConcept(tokens, c) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.c)
  return ranked.slice(0, 3)
}

function citationsFromConcept(concept: TeachingConcept): LearnerHelpCitation[] {
  const citations: LearnerHelpCitation[] = []
  for (const slug of concept.lessonSlugs.slice(0, 4)) {
    const href = lessonPublicHref(slug)
    if (!href) continue
    const lesson =
      getAiCurriculumLesson(slug) ??
      getMlCurriculumLesson(slug) ??
      getChatbotCurriculumLesson(slug) ??
      getExtendedCatalogLesson(slug)
    citations.push({ label: lesson?.title ?? slug, href })
  }
  for (const labId of concept.relatedLabIds.slice(0, 2)) {
    const lab = teachingLabById(labId)
    const href =
      lab?.labAccess === 'public' ? `${PUBLIC_AI_LABS_BASE_PATH}#${labId}` : `/learn#lab-${labId}`
    citations.push({ label: `Teaching lab · ${lab?.title ?? labId}`, href })
  }
  return citations
}

function nextLessonCitation(currentSlug?: string): LearnerHelpCitation | null {
  if (!currentSlug) return null
  const ai = getAdjacentAiCurriculumLessons(currentSlug)
  if (ai.next) {
    const href = lessonPublicHref(ai.next.slug)
    if (href) return { label: `Next in AI Foundations sequence: ${ai.next.title}`, href }
  }
  const ml = getAdjacentMlLessons(currentSlug)
  if (ml.next) {
    const href = lessonPublicHref(ml.next.slug)
    if (href) return { label: `Next in ML Foundations sequence: ${ml.next.title}`, href }
  }
  const ext = getAdjacentExtendedLessons(currentSlug)
  if (ext.next) {
    const href = lessonPublicHref(ext.next.slug)
    if (href) return { label: `Next in extended catalog sequence: ${ext.next.title}`, href }
  }
  const chatbotFlat = flattenChatbotCurriculumLessons()
  const cbIdx = chatbotFlat.findIndex((l) => l.slug === currentSlug)
  if (cbIdx >= 0 && cbIdx < chatbotFlat.length - 1) {
    const next = chatbotFlat[cbIdx + 1]!
    const href = lessonPublicHref(next.slug)
    if (href) return { label: `Next in Chatbots sequence: ${next.title}`, href }
  }
  return null
}

function weakAreaEchoLine(query: string): string | null {
  const tokens = tokenize(query)
  if (!tokens.length) return null
  const hits = TEACHING_CONCEPTS.filter((c) =>
    tokens.some((t) => c.keywords.some((k) => k.toLowerCase().includes(t) || t.includes(k.toLowerCase()))),
  ).slice(0, 2)
  if (!hits.length) return null
  return `Related KB concepts to revisit: ${hits.map((h) => h.title).join(' · ')}.`
}

function clipSnippet(s: string, max: number): string {
  const t = s.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1)}…`
}

/** Snippet-only concept answers for the help FAB — full threads stay in library/course readers. */
function conceptAnswerBody(concept: TeachingConcept): string[] {
  const lines: string[] = [
    clipSnippet(concept.explanation, 320),
    concept.misconceptions[0] ? `Common confusion: ${clipSnippet(concept.misconceptions[0], 200)}` : '',
    `Revision anchor: ${clipSnippet(concept.revisionAnchor, 220)}`,
    `Worked example: ${clipSnippet(concept.workedExample, 220)}`,
  ].filter(Boolean)
  if (concept.goodUnderstandingMarkers?.length) {
    lines.push(`Solid grasp often looks like: ${clipSnippet(concept.goodUnderstandingMarkers.join(' · '), 200)}`)
  }
  lines.push('Follow citations for the full lesson thread—this panel stays snippet-only.')
  lines.push(
    'If this does not match your situation, say what task you are doing—help routes from indexed atoms, not open-ended guessing.',
  )
  return lines
}

function detectIntent(q: string): 'hint' | 'next' | 'difference' | 'nav' | 'explain' | 'revision' | 'generic' {
  const s = q.toLowerCase()
  if (/\bhint\b/.test(s) || /lab\b/.test(s)) return 'hint'
  if (/next lesson|what should i read|where do i go/.test(s)) return 'next'
  if (/revision|recall|retriev|spaced repetition|study plan|practice questions|weak area|remediat/.test(s)) return 'revision'
  if (/\bdifference\b|\bvs\b|\bversus\b|\bcompare\b/.test(s)) return 'difference'
  if (/which lesson|what lesson|where is|link to/.test(s)) return 'nav'
  if (/explain\b|what is\b|why\b|how\b/.test(s)) return 'explain'
  return 'generic'
}

function hintTier(query: string): 'gentle' | 'strong' | 'explain' {
  const s = query.toLowerCase()
  if (/\bgentle\b|\blight\b|\bsoft\b/.test(s)) return 'gentle'
  if (/\bstrong\b|\bhard\b|\bmore\b.*hint/.test(s)) return 'strong'
  if (/\bexplain\b|\bwhy\b|\bbreak down\b/.test(s)) return 'explain'
  return 'strong'
}

function contextPreamble(params: LearnerHelpQueryParams): string[] {
  const lines: string[] = []
  if (params.currentCourseSlug && params.currentSessionId) {
    const place = kbPlacementSentenceForFlagshipSession(params.currentCourseSlug, params.currentSessionId)
    if (place) {
      lines.push(`Placement: ${place}.`)
      lines.push('Full chapter bodies stay in the course player—answers here are short placement + indexed snippets only.')
    }
    if (params.flagshipCourseAccess === 'locked') {
      lines.push('This course is not in your current access scope—open Pricing or your purchase email to upgrade; links below stay honest about that gate.')
    }
  }
  if (params.currentLessonSlug) {
    const place = kbPlacementSentenceForLessonSlug(params.currentLessonSlug)
    if (place) lines.push(`Lesson placement in Jifunze catalogs: ${place}.`)
    const linked = conceptsForLessonSlug(params.currentLessonSlug)
    if (linked.length) {
      lines.push(`Indexed KB concepts touching this lesson: ${linked.map((c) => c.title).join(' · ')}.`)
    }
  }
  if (params.labId) {
    const lab = teachingLabById(params.labId)
    if (lab) {
      lines.push(`Lab focus: ${lab.title} · ${lab.summary}`)
      const lc = conceptsLinkedToLab(params.labId)
      if (lc.length) lines.push(`Related KB concepts: ${lc.map((c) => c.title).join(' · ')}.`)
    }
  }
  return lines
}

function labHintAnswer(params: LearnerHelpQueryParams, labIdFromQuery: string | undefined): LearnerHelpAnswer | null {
  const labId = params.labId ?? labIdFromQuery
  if (!labId) return null
  const lab = teachingLabById(labId)
  if (!lab) return null

  recordTeachingSignal({ kind: 'lab_hint_request', payload: { labId: lab.id } })

  const tier = hintTier(params.query)
  const intro = contextPreamble(params)

  const gentle =
    tier === 'gentle'
      ? [
          ...intro,
          `Objective: ${lab.learningObjective ?? lab.summary}`,
          `Start here (instruction step 1): ${lab.instructions[0] ?? lab.task}`,
          `Nudge (not the full lab answer): ${lab.hint.split(/[.!?]/)[0]?.trim() ?? lab.hint}`,
          'Stronger hints are available—ask using words like “stronger hint” after an honest attempt.',
        ]
      : null

  const strong =
    tier === 'strong'
      ? [
          ...intro,
          `Hint (after an honest attempt): ${lab.hint}`,
          lab.remediation[0] ? `Remediation if stuck: ${lab.remediation[0]}` : 'Use remediation steps on the lab sheet.',
          'Avoid pasting final outputs—use the structured capture fields to practice judgment.',
        ]
      : null

  const explain =
    tier === 'explain'
      ? [
          ...intro,
          `Scenario/context: ${lab.scenario}`,
          `Hint: ${lab.hint}`,
          lab.commonMistakes[0] ? `Common mistake pattern: ${lab.commonMistakes[0]}` : '',
          `What good looks like: ${lab.whatGoodLooksLike[0] ?? 'See rubric on the lab sheet.'}`,
          'Explanation mode still avoids dumping perfect final answers—your job is to practice the judgment the lab trains.',
        ].filter(Boolean)
      : null

  const body = gentle ?? strong ?? explain ?? [...intro, `Hint: ${lab.hint}`]

  return {
    title: `Lab help · ${lab.title}`,
    body,
    citations: [
      { label: 'Browse courses (labs live inside modules)', href: '/learn' },
      ...(lab.labAccess === 'public' ? [{ label: 'Public AI labs listing', href: PUBLIC_AI_LABS_BASE_PATH }] : []),
      ...lab.lessonSlugs
        .map((s) => {
          const href = lessonPublicHref(s)
          if (!href) return null
          const lesson =
            getAiCurriculumLesson(s) ??
            getMlCurriculumLesson(s) ??
            getChatbotCurriculumLesson(s) ??
            getExtendedCatalogLesson(s)
          return { label: lesson?.title ?? s, href }
        })
        .filter((c): c is LearnerHelpCitation => Boolean(c))
        .slice(0, 3),
    ],
    confidence: 'high',
  }
}

export function answerLearnerHelpQuestion(params: LearnerHelpQueryParams): LearnerHelpAnswer {
  const query = params.query.trim()
  recordTeachingSignal({
    kind: 'help_query',
    payload: {
      query,
      currentLessonSlug: params.currentLessonSlug ?? '',
      labId: params.labId ?? '',
      currentCourseSlug: params.currentCourseSlug ?? '',
      currentSessionId: params.currentSessionId ?? '',
    },
  })

  if (!query) {
    const here =
      params.currentCourseSlug && params.currentSessionId
        ? [
            {
              label: 'Continue this chapter in the course player',
              href: `/learn/courses/${params.currentCourseSlug}/session/${params.currentSessionId}`,
            },
          ]
        : []
    return {
      title: 'Ask a learning question',
      body: [
        ...contextPreamble(params),
        'Try: “Explain precision vs recall”, “Where is DNS covered?”, “Hint for lab-ai-f1-rewrite-vague-to-useful”, or paste your current lesson title.',
        'Jifunze answers from indexed KB atoms + curriculum links—not generic web guessing.',
      ],
      citations: [
        ...(params.flagshipCourseAccess === 'locked' ? [{ label: 'Plans & pricing', href: LEGAL_ROUTES.pricing }] : []),
        ...here,
        { label: 'AI library', href: PUBLIC_AI_FOUNDATIONS_BASE_PATH },
        { label: 'ML library', href: PUBLIC_ML_LIBRARY_BASE_PATH },
        { label: 'Course catalog', href: '/learn' },
        { label: 'Public AI labs', href: PUBLIC_AI_LABS_BASE_PATH },
      ],
      confidence: 'high',
    }
  }

  const flagshipHit = resolveTopicToCourses(query)
  if (flagshipHit && flagshipHit.confidence >= 0.72) {
    const snippet = getFlagshipCurriculum(flagshipHit.courseSlug)
      ? curriculumOutlineSnippet(flagshipHit.courseSlug, 280)
      : `Catalog: ${flagshipHit.courseTitle}. Open the linked reader for full modules, checkpoints, and practice.`
    const altCitations =
      flagshipHit.alternateSlugs?.map((a) => ({
        label: `Also matches: ${a.title}`,
        href: `/learn/courses/${a.slug}`,
      })) ?? []
    return {
      title: `Course match · ${flagshipHit.courseTitle}`,
      body: [
        `Mapped your question to the flagship course “${flagshipHit.courseTitle}” (${flagshipHit.kind} route · ~${Math.round(flagshipHit.confidence * 100)}% confidence).`,
        ...(snippet
          ? [
              `Snippet from the syllabus (not a substitute for lessons): ${snippet}`,
              'Open the course player for full lessons, embedded labs, checkpoints, and resources—those stay inside the canonical path.',
            ]
          : ['Use the course link below to enter the structured module order.']),
        'If a destination is outside your subscription or assignment, the player will route you through checkout or upgrade—not unrestricted lesson bodies here.',
      ],
      citations: [
        { label: `Open ${flagshipHit.courseTitle}`, href: flagshipHit.primaryHref },
        ...(params.flagshipCourseAccess === 'locked' ? [{ label: 'Plans & pricing', href: LEGAL_ROUTES.pricing }] : []),
        ...altCitations,
      ],
      confidence: flagshipHit.confidence >= 0.85 ? 'high' : 'medium',
    }
  }

  const intent = detectIntent(query)
  const idMatch = query.match(/lab[-a-z0-9]+/i)
  const labIdFromQuery = idMatch?.[0]?.toLowerCase()

  if (intent === 'hint' || params.labId || labIdFromQuery) {
    const labAns = labHintAnswer(params, labIdFromQuery)
    if (labAns) return labAns
    return {
      title: 'Lab hints',
      body: [
        ...contextPreamble(params),
        'Paste a lab id from your course materials (example: lab-ai-f3-spot-factual-weakness).',
        'Hints escalate from gentle → strong → explanation-style guidance—without dumping perfect final artifacts.',
      ],
      citations: [{ label: 'Course catalog', href: '/learn' }],
      confidence: 'medium',
    }
  }

  if (intent === 'next') {
    const next = nextLessonCitation(params.currentLessonSlug)
    const weakEcho = weakAreaEchoLine(query)
    return {
      title: 'Suggested continuation',
      body: [
        ...contextPreamble(params),
        ...(next
          ? [
              'Sequential next lesson (catalog order—not a mastery guarantee):',
              weakEcho ?? 'If sequence feels wrong for your goal, pair reading with a lab tied to the same KB concept.',
            ]
          : [
              'Tell me which lesson you are on (paste title or slug), or browse the library index for your category/module.',
              weakEcho ?? 'When you know the module, open the course path and continue from your last session.',
            ]),
      ].filter(Boolean) as string[],
      citations: [
        ...(next ? [next] : []),
        { label: 'Course catalog', href: '/learn' },
        { label: 'Library overview', href: '/library' },
      ],
      confidence: next ? 'medium' : 'low',
    }
  }

  if (intent === 'revision') {
    const ranked = rankConcepts(query)
    const top = ranked[0]
    const nextCit = params.currentLessonSlug ? nextLessonCitation(params.currentLessonSlug) : null
    if (top) {
      recordTeachingSignal({ kind: 'revision_revisit', payload: { conceptId: top.id } })
      return {
        title: `Revision · ${top.title}`,
        body: [
          ...contextPreamble(params),
          clipSnippet(top.explanation, 360),
          `Revision drill (avoid passive rereading): ${top.revisionAnchor}`,
          top.misconceptions[0] ? `Trap to check: ${top.misconceptions[0]}` : '',
          top.goodUnderstandingMarkers?.length
            ? `What “good understanding” looks like: ${top.goodUnderstandingMarkers.join(' · ')}`
            : '',
          top.weakUnderstandingMarkers?.length
            ? `Weak understanding often looks like: ${top.weakUnderstandingMarkers.join(' · ')}`
            : '',
          weakAreaEchoLine(query) ?? 'After recall, reopen the linked lesson sections you missed—not the whole lesson on autopilot.',
          'Capability path: if this concept lists a teaching lab in citations, do the capture fields—passive rereading is not evidence of judgment.',
        ].filter(Boolean) as string[],
        citations: [...citationsFromConcept(top), ...(nextCit ? [nextCit] : [])],
        confidence: 'high',
      }
    }
    return {
      title: 'Revision routing',
      body: [
        ...contextPreamble(params),
        'Paste a lesson slug, concept phrase, or lab id—revision answers here come from indexed KB atoms and anchors, not generic coaching scripts.',
      ],
      citations: [
        { label: 'Course catalog', href: '/learn' },
        { label: 'Library overview', href: '/library' },
      ],
      confidence: 'low',
    }
  }

  if (intent === 'difference') {
    const ranked = rankConcepts(query).filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i)
    if (ranked.length >= 2) {
      const a = ranked[0]!
      const b = ranked[1]!
      recordTeachingSignal({ kind: 'help_concept_answer', payload: { conceptId: `${a.id}+${b.id}`, confidence: 'medium' } })
      return {
        title: `Compare: ${a.title} vs ${b.title}`,
        body: [
          ...contextPreamble(params),
          `${a.title}: ${clipSnippet(a.explanation, 280)}`,
          `${b.title}: ${clipSnippet(b.explanation, 280)}`,
          `Common mix-up: ${a.misconceptions[0] ?? 'See misconception lists in linked lessons.'}`,
        ],
        citations: [...citationsFromConcept(a).slice(0, 2), ...citationsFromConcept(b).slice(0, 2)],
        confidence: 'medium',
      }
    }
  }

  const ranked = rankConcepts(query)
  if (ranked.length > 0 && (intent === 'explain' || intent === 'generic' || intent === 'nav')) {
    const top = ranked[0]!
    const score = scoreConcept(tokenize(query), top)
    const confidence: LearnerHelpAnswer['confidence'] = score >= 6 ? 'high' : 'medium'
    if (confidence === 'medium') {
      recordTeachingSignal({ kind: 'help_low_confidence_match', payload: { conceptId: top.id, score } })
    } else {
      recordTeachingSignal({ kind: 'help_concept_answer', payload: { conceptId: top.id, confidence } })
    }
    recordTeachingSignal({ kind: 'concept_view', payload: { conceptId: top.id } })

    const nextCit = params.currentLessonSlug ? nextLessonCitation(params.currentLessonSlug) : null
    return {
      title: top.title,
      body: [...contextPreamble(params), ...conceptAnswerBody(top)],
      citations: [...citationsFromConcept(top), ...(nextCit ? [nextCit] : [])],
      confidence,
    }
  }

  const all = [...flattenAiCurriculumLessons(), ...flattenMlCurriculumLessons(), ...flattenChatbotCurriculumLessons()]
  const tokens = tokenize(query)
  const lessonHits = all
    .map((l) => ({
      l,
      s: tokens.reduce((acc, t) => acc + (l.title.toLowerCase().includes(t) ? 2 : 0), 0),
    }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)[0]

  if (lessonHits) {
    const href = lessonPublicHref(lessonHits.l.slug)
    if (href) {
      const place = kbPlacementSentenceForLessonSlug(lessonHits.l.slug)
      return {
        title: 'Closest lesson match',
        body: [
          ...contextPreamble(params),
          place ? `Placement: ${place}` : '',
          'Matched by lesson title keywords against Jifunze curriculum readers—verify it matches your intent.',
        ].filter(Boolean),
        citations: [{ label: lessonHits.l.title, href }],
        confidence: 'medium',
      }
    }
  }

  recordTeachingSignal({
    kind: 'weak_area_signal',
    payload: {
      reason: 'no_kb_overlap',
      queryPreview: query.slice(0, 160),
      lessonSlug: params.currentLessonSlug ?? '',
      labId: params.labId ?? '',
    },
  })

  return {
    title: 'Not enough grounded overlap yet',
    body: [
      ...contextPreamble(params),
      'I could not confidently map that to an indexed Jifunze concept or lesson title—this avoids inventing curriculum facts.',
      weakAreaEchoLine(query) ??
        'Try a tighter anchor: paste a lesson title from a library page, a lab id, or a phrase from the lesson outcomes list.',
      'Materials access and readers can expand with account/eligible plans—still not a mastery or qualification outcome.',
    ].filter(Boolean),
    citations: [
      { label: 'AI library', href: PUBLIC_AI_FOUNDATIONS_BASE_PATH },
      { label: 'ML library', href: PUBLIC_ML_LIBRARY_BASE_PATH },
      { label: 'Chatbots library', href: PUBLIC_CHATBOT_LIBRARY_BASE_PATH },
      { label: 'Course catalog', href: '/learn' },
      { label: 'Public AI labs', href: PUBLIC_AI_LABS_BASE_PATH },
    ],
    confidence: 'low',
  }
}

export function explainConceptById(conceptId: string): LearnerHelpAnswer | null {
  const concept = teachingConceptById(conceptId)
  if (!concept) return null
  recordTeachingSignal({ kind: 'concept_view', payload: { conceptId } })
  return {
    title: concept.title,
    body: conceptAnswerBody(concept),
    citations: citationsFromConcept(concept),
    confidence: 'high',
  }
}
