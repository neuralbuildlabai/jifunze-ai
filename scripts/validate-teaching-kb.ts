/**
 * CI validation: every `lessonSlugs[]` entry in `TEACHING_CONCEPTS` must exist in compiled curriculum slug sets.
 * Uses source specs only (avoids modules that reference `import.meta.env` at runtime in Node).
 */
import { TEACHING_CONCEPTS } from '../src/data/teaching/teachingKnowledgeBase'
import { AI_CURRICULUM_SPEC } from '../src/data/learning/aiCurriculumSpec'
import { ML_CURRICULUM_SPEC } from '../src/data/learning/mlCurriculumSpec'
import { CHATBOT_CURRICULUM_SPEC } from '../src/data/learning/chatbotLibrarySpec'
import {
  CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC,
  CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC,
  CYBERSECURITY_DEFENSE_LIBRARY_SPEC,
  MONITORING_OBSERVABILITY_LIBRARY_SPEC,
  NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC,
} from '../src/data/learning/extendedLibrariesSpecs'
import { flattenLessonsForCurriculum } from '../src/data/learning/extendedLibrariesCurricula'
import { STANDALONE_COURSE_CURRICULA } from '../src/data/learning/standaloneCoursesCatalog'
import type { TeachingLibraryId } from '../src/data/teaching/teachingTypes'

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[“”]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function aiSlugs(): Set<string> {
  const out = new Set<string>()
  for (const spec of AI_CURRICULUM_SPEC) {
    for (const mod of spec.modules) {
      for (const lessonTitle of mod.lessons) {
        out.add(slugify(`${spec.id}-${lessonTitle}`))
      }
    }
  }
  return out
}

function mlSlugs(): Set<string> {
  const out = new Set<string>()
  for (const spec of ML_CURRICULUM_SPEC) {
    for (const mod of spec.modules) {
      for (const lessonTitle of mod.lessons) {
        out.add(slugify(`${spec.id}-${lessonTitle}`))
      }
    }
  }
  return out
}

function chatbotSlugs(): Set<string> {
  const out = new Set<string>()
  for (const spec of CHATBOT_CURRICULUM_SPEC) {
    for (const mod of spec.modules) {
      for (const lessonTitle of mod.lessons) {
        out.add(slugify(`${spec.id}-${lessonTitle}`))
      }
    }
  }
  return out
}

function standaloneCourseSlugs(): Set<string> {
  const out = new Set<string>()
  for (const tree of STANDALONE_COURSE_CURRICULA) {
    for (const l of flattenLessonsForCurriculum(tree)) {
      out.add(l.slug)
    }
  }
  return out
}

function extendedSlugs(): Set<string> {
  const libs = [
    NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC,
    CYBERSECURITY_DEFENSE_LIBRARY_SPEC,
    CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC,
    MONITORING_OBSERVABILITY_LIBRARY_SPEC,
    CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC,
  ]
  const out = new Set<string>()
  for (const lib of libs) {
    for (const cat of lib.categories) {
      for (const lessonTitle of cat.lessons) {
        out.add(slugify(`${cat.id}-${lessonTitle}`))
      }
    }
  }
  return out
}

function slugLibraryMap(): Map<string, TeachingLibraryId> {
  const m = new Map<string, TeachingLibraryId>()
  const add = (lib: TeachingLibraryId, slug: string) => {
    m.set(slug, lib)
  }
  for (const spec of AI_CURRICULUM_SPEC) {
    for (const mod of spec.modules) {
      for (const lessonTitle of mod.lessons) add('ai_foundations', slugify(`${spec.id}-${lessonTitle}`))
    }
  }
  for (const spec of ML_CURRICULUM_SPEC) {
    for (const mod of spec.modules) {
      for (const lessonTitle of mod.lessons) add('machine_learning', slugify(`${spec.id}-${lessonTitle}`))
    }
  }
  for (const spec of CHATBOT_CURRICULUM_SPEC) {
    for (const mod of spec.modules) {
      for (const lessonTitle of mod.lessons) add('chatbots', slugify(`${spec.id}-${lessonTitle}`))
    }
  }
  for (const cat of NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC.categories) {
    for (const lessonTitle of cat.lessons) add('networking', slugify(`${cat.id}-${lessonTitle}`))
  }
  for (const cat of CYBERSECURITY_DEFENSE_LIBRARY_SPEC.categories) {
    for (const lessonTitle of cat.lessons) add('cybersecurity', slugify(`${cat.id}-${lessonTitle}`))
  }
  for (const cat of CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC.categories) {
    for (const lessonTitle of cat.lessons) add('cloud_devops', slugify(`${cat.id}-${lessonTitle}`))
  }
  for (const cat of MONITORING_OBSERVABILITY_LIBRARY_SPEC.categories) {
    for (const lessonTitle of cat.lessons) add('monitoring', slugify(`${cat.id}-${lessonTitle}`))
  }
  for (const cat of CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC.categories) {
    for (const lessonTitle of cat.lessons) add('content_publishing', slugify(`${cat.id}-${lessonTitle}`))
  }
  for (const tree of STANDALONE_COURSE_CURRICULA) {
    for (const cat of tree) {
      const lib: TeachingLibraryId = cat.id.startsWith('lcew-')
        ? 'course_chatgpt_everyday'
        : cat.id.startsWith('pem-')
          ? 'course_prompt_engineering_models'
          : cat.id.startsWith('gpw-')
            ? 'course_gemini_workspace'
            : cat.id.startsWith('clw-')
              ? 'course_claude_writing'
              : cat.id.startsWith('aar-')
                ? 'course_agentic_ai_real_work'
                : (() => {
                    throw new Error(`validate-teaching-kb: unknown standalone category id prefix: ${cat.id}`)
                  })()
      for (const mod of cat.modules) {
        for (const lesson of mod.lessons) add(lib, lesson.slug)
      }
    }
  }
  return m
}

function main() {
  const catalog = new Set<string>([
    ...aiSlugs(),
    ...mlSlugs(),
    ...chatbotSlugs(),
    ...extendedSlugs(),
    ...standaloneCourseSlugs(),
  ])
  const missing: string[] = []
  for (const concept of TEACHING_CONCEPTS) {
    for (const slug of concept.lessonSlugs) {
      if (!catalog.has(slug)) missing.push(`${concept.id} → ${slug}`)
    }
  }

  if (missing.length) {
    console.error('[validate:teaching-kb] BLOCKING — unknown lesson slugs referenced by KB atoms:')
    for (const m of missing) console.error(` - ${m}`)
    process.exit(1)
  }

  const slugLinked = new Set<string>()
  let withMisconception = 0
  let withLab = 0
  let withOutcome = 0
  let withExample = 0
  const byLibrary = new Map<string, number>()
  const roleCounts = new Map<string, number>()
  const slugLib = slugLibraryMap()
  const slugHitsByLibrary = new Map<TeachingLibraryId, Set<string>>()
  for (const lib of [
    'ai_foundations',
    'machine_learning',
    'chatbots',
    'networking',
    'cybersecurity',
    'cloud_devops',
    'monitoring',
    'content_publishing',
    'course_chatgpt_everyday',
    'course_prompt_engineering_models',
    'course_gemini_workspace',
    'course_claude_writing',
    'course_agentic_ai_real_work',
  ] as TeachingLibraryId[]) {
    slugHitsByLibrary.set(lib, new Set<string>())
  }

  for (const c of TEACHING_CONCEPTS) {
    byLibrary.set(c.libraryId, (byLibrary.get(c.libraryId) ?? 0) + 1)
    if (c.misconceptions?.length) withMisconception++
    if (c.relatedLabIds?.length) withLab++
    if (c.capabilityOutcomes?.length) withOutcome++
    if (c.workedExample?.trim()) withExample++
    for (const s of c.lessonSlugs) slugLinked.add(s)
    const role = c.kbAtomRole
    if (role) roleCounts.set(role, (roleCounts.get(role) ?? 0) + 1)

    for (const s of c.lessonSlugs) {
      const home = slugLib.get(s)
      if (!home) continue
      slugHitsByLibrary.get(home)!.add(s)
    }
  }

  const flagship = [
    ['ai_foundations', 'AI'],
    ['machine_learning', 'ML'],
    ['chatbots', 'Chatbots'],
    ['networking', 'Networking'],
    ['cybersecurity', 'Cybersecurity'],
    ['cloud_devops', 'Cloud/DevOps'],
    ['monitoring', 'Observability'],
    ['content_publishing', 'Content'],
    ['course_chatgpt_everyday', 'Course · ChatGPT everyday'],
    ['course_prompt_engineering_models', 'Course · Prompt engineering'],
    ['course_gemini_workspace', 'Course · Gemini Workspace'],
    ['course_claude_writing', 'Course · Claude writing & research'],
    ['course_agentic_ai_real_work', 'Course · Agentic AI for real work'],
  ] as const

  console.log(`[validate:teaching-kb] OK — concepts: ${TEACHING_CONCEPTS.length} · catalog slugs: ${catalog.size}`)
  console.log(
    `[validate:teaching-kb] linkage — distinct lesson slugs touched: ${slugLinked.size} / ${catalog.size} (${((slugLinked.size / catalog.size) * 100).toFixed(1)}%)`,
  )
  console.log(
    `[validate:teaching-kb] density — misconceptions: ${withMisconception}/${TEACHING_CONCEPTS.length} · labs: ${withLab}/${TEACHING_CONCEPTS.length} · outcomes: ${withOutcome}/${TEACHING_CONCEPTS.length} · worked examples: ${withExample}/${TEACHING_CONCEPTS.length}`,
  )
  const aiAtoms = byLibrary.get('ai_foundations') ?? 0
  const chatAtoms = byLibrary.get('chatbots') ?? 0
  const flagshipHeavy = aiAtoms + chatAtoms
  const weakSix =
    (byLibrary.get('machine_learning') ?? 0) +
    (byLibrary.get('networking') ?? 0) +
    (byLibrary.get('cybersecurity') ?? 0) +
    (byLibrary.get('cloud_devops') ?? 0) +
    (byLibrary.get('monitoring') ?? 0) +
    (byLibrary.get('content_publishing') ?? 0)
  const courseAtoms =
    (byLibrary.get('course_chatgpt_everyday') ?? 0) +
    (byLibrary.get('course_prompt_engineering_models') ?? 0) +
    (byLibrary.get('course_gemini_workspace') ?? 0) +
    (byLibrary.get('course_claude_writing') ?? 0) +
    (byLibrary.get('course_agentic_ai_real_work') ?? 0)
  console.log(
    `[validate:teaching-kb] balance hint — AI+Chatbots atoms: ${flagshipHeavy} · six non-AI/chat libraries: ${weakSix} · standalone course atoms: ${courseAtoms} · ratio six:(AI+Chat): ${(weakSix / Math.max(1, flagshipHeavy)).toFixed(2)}:1`,
  )
  if (flagshipHeavy + weakSix + courseAtoms !== TEACHING_CONCEPTS.length) {
    console.warn(
      `[validate:teaching-kb] WARN — atom counts by libraryId do not sum to total (${flagshipHeavy + weakSix + courseAtoms} vs ${TEACHING_CONCEPTS.length})`,
    )
  }

  console.log('[validate:teaching-kb] atoms by library:')
  for (const [id, label] of flagship) {
    const atoms = byLibrary.get(id) ?? 0
    const linkedInLib = slugHitsByLibrary.get(id as TeachingLibraryId)?.size ?? 0
    const catSlugs =
      id === 'ai_foundations'
        ? aiSlugs().size
        : id === 'machine_learning'
          ? mlSlugs().size
          : id === 'chatbots'
            ? chatbotSlugs().size
            : id === 'networking'
              ? NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC.categories.reduce((acc, cat) => acc + cat.lessons.length, 0)
              : id === 'cybersecurity'
                ? CYBERSECURITY_DEFENSE_LIBRARY_SPEC.categories.reduce((acc, cat) => acc + cat.lessons.length, 0)
                : id === 'cloud_devops'
                  ? CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC.categories.reduce((acc, cat) => acc + cat.lessons.length, 0)
                  : id === 'monitoring'
                    ? MONITORING_OBSERVABILITY_LIBRARY_SPEC.categories.reduce((acc, cat) => acc + cat.lessons.length, 0)
                    : id === 'content_publishing'
                      ? CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC.categories.reduce((acc, cat) => acc + cat.lessons.length, 0)
                      : id === 'course_chatgpt_everyday'
                        ? [...slugLib.entries()].filter(([, l]) => l === 'course_chatgpt_everyday').length
                        : id === 'course_prompt_engineering_models'
                          ? [...slugLib.entries()].filter(([, l]) => l === 'course_prompt_engineering_models').length
                          : id === 'course_gemini_workspace'
                            ? [...slugLib.entries()].filter(([, l]) => l === 'course_gemini_workspace').length
                            : id === 'course_claude_writing'
                              ? [...slugLib.entries()].filter(([, l]) => l === 'course_claude_writing').length
                              : id === 'course_agentic_ai_real_work'
                                ? [...slugLib.entries()].filter(([, l]) => l === 'course_agentic_ai_real_work').length
                                : 0

    console.log(` - ${label}: atoms ${atoms} · lesson slugs linked in-library ${linkedInLib}/${catSlugs}`)
  }

  const thin = [...byLibrary.entries()].filter(([, n]) => n < 6).map(([id]) => id)
  if (thin.length) {
    console.log(`[validate:teaching-kb] thinner libraries (<6 atoms): ${thin.join(', ')}`)
  }

  if (roleCounts.size) {
    console.log('[validate:teaching-kb] kbAtomRole tags (subset of atoms):')
    for (const [role, n] of [...roleCounts.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(` - ${role}: ${n}`)
    }
    console.log(`[validate:teaching-kb] atoms without kbAtomRole: ${TEACHING_CONCEPTS.length - [...roleCounts.values()].reduce((a, x) => a + x, 0)}`)
  }
}

main()
