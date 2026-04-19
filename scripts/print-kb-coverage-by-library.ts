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

type Lib =
  | 'ai_foundations'
  | 'machine_learning'
  | 'chatbots'
  | 'networking'
  | 'cybersecurity'
  | 'cloud_devops'
  | 'monitoring'
  | 'content_publishing'

function catalogByLib(): Map<Lib, Set<string>> {
  const m = new Map<Lib, Set<string>>()
  const add = (lib: Lib, slug: string) => {
    if (!m.has(lib)) m.set(lib, new Set())
    m.get(lib)!.add(slug)
  }
  for (const spec of AI_CURRICULUM_SPEC) {
    for (const mod of spec.modules) for (const lessonTitle of mod.lessons) add('ai_foundations', slugify(`${spec.id}-${lessonTitle}`))
  }
  for (const spec of ML_CURRICULUM_SPEC) {
    for (const mod of spec.modules) for (const lessonTitle of mod.lessons) add('machine_learning', slugify(`${spec.id}-${lessonTitle}`))
  }
  for (const spec of CHATBOT_CURRICULUM_SPEC) {
    for (const mod of spec.modules) for (const lessonTitle of mod.lessons) add('chatbots', slugify(`${spec.id}-${lessonTitle}`))
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
  return m
}

const used = new Set<string>()
for (const c of TEACHING_CONCEPTS) for (const s of c.lessonSlugs) used.add(s)

const byLib = catalogByLib()
let totalCat = 0
for (const set of byLib.values()) totalCat += set.size
console.log('total catalog slugs', totalCat, 'distinct linked', used.size)
for (const [lib, cat] of byLib) {
  const linked = [...cat].filter((x) => used.has(x)).length
  console.log(lib, 'catalog', cat.size, 'linked', linked, `${((linked / cat.size) * 100).toFixed(1)}%`)
}
