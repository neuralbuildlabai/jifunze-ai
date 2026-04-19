import { TEACHING_CONCEPTS } from '../src/data/teaching/teachingKnowledgeBase'
import { AI_CURRICULUM_SPEC } from '../src/data/learning/aiCurriculumSpec'
import { ML_CURRICULUM_SPEC } from '../src/data/learning/mlCurriculumSpec'
import { CHATBOT_CURRICULUM_SPEC } from '../src/data/learning/chatbotLibrarySpec'
import {
  NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC,
  CYBERSECURITY_DEFENSE_LIBRARY_SPEC,
  CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC,
  MONITORING_OBSERVABILITY_LIBRARY_SPEC,
  CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC,
} from '../src/data/learning/extendedLibrariesSpecs'

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[“”]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

type Row = { lib: string; slug: string; lessonTitle: string }

const rows: Row[] = []
for (const spec of AI_CURRICULUM_SPEC) {
  for (const mod of spec.modules) {
    for (const lessonTitle of mod.lessons) rows.push({ lib: 'ai_foundations', slug: slugify(`${spec.id}-${lessonTitle}`), lessonTitle })
  }
}
for (const spec of ML_CURRICULUM_SPEC) {
  for (const mod of spec.modules) {
    for (const lessonTitle of mod.lessons) rows.push({ lib: 'machine_learning', slug: slugify(`${spec.id}-${lessonTitle}`), lessonTitle })
  }
}
for (const spec of CHATBOT_CURRICULUM_SPEC) {
  for (const mod of spec.modules) {
    for (const lessonTitle of mod.lessons) rows.push({ lib: 'chatbots', slug: slugify(`${spec.id}-${lessonTitle}`), lessonTitle })
  }
}
for (const [libId, libSpec] of [
  ['networking', NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC],
  ['cybersecurity', CYBERSECURITY_DEFENSE_LIBRARY_SPEC],
  ['cloud_devops', CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC],
  ['monitoring', MONITORING_OBSERVABILITY_LIBRARY_SPEC],
  ['content_publishing', CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC],
] as const) {
  for (const cat of libSpec.categories) {
    for (const lessonTitle of cat.lessons) rows.push({ lib: libId, slug: slugify(`${cat.id}-${lessonTitle}`), lessonTitle })
  }
}

const linked = new Set<string>()
for (const c of TEACHING_CONCEPTS) for (const s of c.lessonSlugs) linked.add(s)

const uncovered = rows.filter((r) => !linked.has(r.slug))
console.log('uncovered', uncovered.length)
for (const lib of [...new Set(rows.map((r) => r.lib))]) {
  console.log(lib, uncovered.filter((u) => u.lib === lib).length)
}
