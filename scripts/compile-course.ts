#!/usr/bin/env tsx
/**
 * Course compiler — Wave 2 publishing pipeline.
 *
 * Reads `content/courses/<slug>/course.yaml` + `lessons/*.mdx`, validates against the schema
 * in `content/SCHEMA.md`, and emits typed TypeScript modules into
 * `src/data/learning/courses/<slug>/`.
 *
 * Usage:
 *   npx tsx scripts/compile-course.ts --slug <course-slug>
 *   npx tsx scripts/compile-course.ts --slug <course-slug> --dry-run
 *
 * Exit codes:
 *   0 — emitted (or dry-run reported clean)
 *   1 — validation failure (specific error printed)
 *   2 — IO error
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import * as crypto from 'node:crypto'
import yaml from 'js-yaml'

const REPO_ROOT = path.resolve(__dirname, '..')
const CONTENT_DIR = path.join(REPO_ROOT, 'content')
const OUTPUT_BASE = path.join(REPO_ROOT, 'src', 'data', 'learning', 'courses')

// ---------------------------------------------------------------------------
// Types — mirror the schema in content/SCHEMA.md
// ---------------------------------------------------------------------------

type SchoolId =
  | 'ai_digital'
  | 'business_growth'
  | 'career_intellect'
  | 'leadership_learning'
  | 'mathematics'
  | 'sciences'
  | 'specialization'

type CourseTier = 'free_starter' | 'flagship' | 'standalone' | 'library'
type CourseStatus = 'pilot' | 'active' | 'archived'
type DepthStage = 'foundations' | 'applied_practice' | 'professional_execution' | 'mastery_outputs'

type CourseYaml = {
  slug: string
  title: string
  school: SchoolId
  tier: CourseTier
  status: CourseStatus
  levelRange: string
  durationLabel: string
  priceLabel: string
  subtitle: string
  intro: string
  promise: string
  depthStages?: {
    foundations: string
    appliedPractice: string
    professionalExecution: string
    masteryOutputs: string
  }
  learningOutcomes: string[]
  whatYouCreate: string[]
  modulePathway?: string[]
  capstone?: {
    prompt: string
    evidence: string
    rubricRef?: string
    rubric?: unknown
  }
  surfaces: {
    flagship: boolean
    library: boolean
    free_starter_interactive: boolean
  }
  modules: ModuleYaml[]
}

type ModuleYaml = {
  id: string
  order: number
  title: string
  stage: DepthStage
  summary: string
  learningGoals: string[]
  practiceActivities: string[]
  revisionCheckpoint?: boolean
  recap?: boolean
  expectedOutputs?: string[]
  lessons: string[]
}

type LessonFrontMatter = {
  id: string
  title: string
  moduleId: string
  order: number
  shortTitle?: string
  durationMinutes: number
  outcomes: string[]
  prerequisites?: string[]
  sessionBlocks?: SessionBlockYaml[]
}

type SessionBlockYaml = {
  type:
    | 'intro'
    | 'concept_explanation'
    | 'worked_example'
    | 'practice_task'
    | 'reflection'
    | 'assessment'
  eyebrow?: string
  title: string
  body?: string
  bullets?: string[]
  prompt?: string
  example?: string
  outputExpectation?: string
}

type Lesson = {
  frontMatter: LessonFrontMatter
  bodySections: { heading: string; paragraphs: string[] }[]
  rawBody: string
  filename: string
}

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]): { slug: string; dryRun: boolean } {
  const slugIdx = argv.indexOf('--slug')
  if (slugIdx < 0 || slugIdx + 1 >= argv.length) {
    fail('Usage: tsx scripts/compile-course.ts --slug <course-slug> [--dry-run]', 1)
  }
  const slug = argv[slugIdx + 1]!
  const dryRun = argv.includes('--dry-run')
  return { slug, dryRun }
}

// ---------------------------------------------------------------------------
// Error helpers
// ---------------------------------------------------------------------------

function fail(msg: string, code: number = 1): never {
  console.error(`\n[compile-course] FAIL: ${msg}\n`)
  process.exit(code)
}

function assertField(obj: unknown, field: string, where: string): void {
  if (!obj || typeof obj !== 'object' || !(field in (obj as Record<string, unknown>))) {
    fail(`Missing required field "${field}" in ${where}.`)
  }
}

// ---------------------------------------------------------------------------
// Filesystem
// ---------------------------------------------------------------------------

function readCourseYaml(slug: string): CourseYaml {
  const yamlPath = path.join(CONTENT_DIR, 'courses', slug, 'course.yaml')
  if (!fs.existsSync(yamlPath)) {
    fail(`course.yaml not found at ${yamlPath}`, 2)
  }
  const raw = fs.readFileSync(yamlPath, 'utf8')
  const parsed = yaml.load(raw) as unknown
  validateCourseYaml(parsed, slug)
  return parsed as CourseYaml
}

function readLessons(slug: string, course: CourseYaml): Lesson[] {
  const lessonsDir = path.join(CONTENT_DIR, 'courses', slug, 'lessons')
  if (!fs.existsSync(lessonsDir)) {
    fail(`lessons/ directory not found at ${lessonsDir}`, 2)
  }
  const declared = new Set<string>()
  for (const mod of course.modules) {
    for (const filename of mod.lessons) declared.add(filename)
  }
  const lessons: Lesson[] = []
  for (const filename of declared) {
    const fullPath = path.join(lessonsDir, filename)
    if (!fs.existsSync(fullPath)) {
      fail(`Lesson file declared in course.yaml but not found on disk: ${filename}`)
    }
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { frontMatter, body } = parseMdx(raw, filename)
    const bodySections = splitBodyByH2(body)
    lessons.push({ frontMatter, bodySections, rawBody: body, filename })
  }
  return lessons
}

function parseMdx(raw: string, filename: string): { frontMatter: LessonFrontMatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    fail(`Lesson ${filename}: missing YAML front-matter (expected --- delimited block at top)`)
  }
  const fmRaw = match[1]
  const body = match[2]
  const fm = yaml.load(fmRaw) as unknown
  validateLessonFrontMatter(fm, filename)
  return { frontMatter: fm as LessonFrontMatter, body }
}

function splitBodyByH2(body: string): { heading: string; paragraphs: string[] }[] {
  const lines = body.split(/\r?\n/)
  const sections: { heading: string; paragraphs: string[] }[] = []
  let current: { heading: string; paragraphs: string[] } | null = null
  let buffer: string[] = []
  const flushBuffer = () => {
    if (buffer.length === 0) return
    const para = buffer.join(' ').trim()
    if (para.length > 0 && current) current.paragraphs.push(para)
    buffer = []
  }
  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushBuffer()
      if (current) sections.push(current)
      current = { heading: line.slice(3).trim(), paragraphs: [] }
      continue
    }
    if (line.trim() === '') {
      flushBuffer()
      continue
    }
    if (line.startsWith('#')) {
      // skip H1/H3+ for now — H1 is rare in lessons, H3 is sub-detail
      continue
    }
    if (line.startsWith('<') && line.endsWith('>')) {
      // skip standalone MDX component lines for the reader output
      continue
    }
    buffer.push(line.trim())
  }
  flushBuffer()
  if (current) sections.push(current)
  return sections
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateCourseYaml(obj: unknown, slug: string): void {
  if (!obj || typeof obj !== 'object') fail('course.yaml is not a YAML object')
  const c = obj as Record<string, unknown>
  for (const f of [
    'slug',
    'title',
    'school',
    'tier',
    'status',
    'levelRange',
    'durationLabel',
    'priceLabel',
    'subtitle',
    'intro',
    'promise',
    'learningOutcomes',
    'whatYouCreate',
    'surfaces',
    'modules',
  ]) {
    assertField(c, f, 'course.yaml')
  }
  if (c.slug !== slug) {
    fail(`course.yaml slug "${c.slug as string}" does not match directory name "${slug}"`)
  }
  const surfaces = c.surfaces as Record<string, unknown>
  if (
    !surfaces.flagship &&
    !surfaces.library &&
    !surfaces.free_starter_interactive
  ) {
    fail('course.yaml surfaces: at least one of flagship/library/free_starter_interactive must be true')
  }
  if (surfaces.flagship) {
    assertField(c, 'depthStages', 'course.yaml')
    assertField(c, 'modulePathway', 'course.yaml')
    assertField(c, 'capstone', 'course.yaml')
    const cap = c.capstone as Record<string, unknown>
    if (!cap.evidence) fail('capstone.evidence (filename pattern) is required')
    if (Boolean(cap.rubricRef) === Boolean(cap.rubric)) {
      fail('capstone: exactly one of rubricRef or rubric must be present')
    }
  }
  const modules = c.modules as ModuleYaml[]
  const seenModuleIds = new Set<string>()
  for (const m of modules) {
    for (const f of [
      'id',
      'order',
      'title',
      'stage',
      'summary',
      'learningGoals',
      'practiceActivities',
      'lessons',
    ]) {
      assertField(m as unknown as Record<string, unknown>, f, `module ${m.id ?? '<unnamed>'}`)
    }
    if (seenModuleIds.has(m.id)) fail(`Duplicate module id "${m.id}"`)
    seenModuleIds.add(m.id)
  }
}

function validateLessonFrontMatter(obj: unknown, filename: string): void {
  if (!obj || typeof obj !== 'object') {
    fail(`Lesson ${filename}: front-matter is not a YAML object`)
  }
  const c = obj as Record<string, unknown>
  for (const f of ['id', 'title', 'moduleId', 'order', 'durationMinutes', 'outcomes']) {
    assertField(c, f, `lesson ${filename}`)
  }
}

function crossValidate(course: CourseYaml, lessons: Lesson[]): void {
  const lessonByFile = new Map<string, Lesson>()
  for (const l of lessons) lessonByFile.set(l.filename, l)

  const seenLessonIds = new Set<string>()
  for (const mod of course.modules) {
    for (let i = 0; i < mod.lessons.length; i++) {
      const filename = mod.lessons[i]!
      const lesson = lessonByFile.get(filename)
      if (!lesson) fail(`module ${mod.id}: lesson file ${filename} missing`)
      if (lesson.frontMatter.moduleId !== mod.id) {
        fail(
          `lesson ${filename}: moduleId "${lesson.frontMatter.moduleId}" does not match module "${mod.id}"`,
        )
      }
      const declaredOrder = i + 1
      if (lesson.frontMatter.order !== declaredOrder) {
        fail(
          `lesson ${filename}: order ${lesson.frontMatter.order} does not match position ${declaredOrder} in module ${mod.id}`,
        )
      }
      // Filename NN prefix check
      const numMatch = filename.match(/^(\d+)-/)
      if (numMatch) {
        const fileOrder = Number(numMatch[1])
        if (fileOrder !== declaredOrder) {
          fail(
            `lesson ${filename}: filename order prefix ${fileOrder} does not match position ${declaredOrder}`,
          )
        }
      }
      if (seenLessonIds.has(lesson.frontMatter.id)) {
        fail(`Duplicate lesson id "${lesson.frontMatter.id}" across course`)
      }
      seenLessonIds.add(lesson.frontMatter.id)
    }
  }
}

// ---------------------------------------------------------------------------
// Emission
// ---------------------------------------------------------------------------

function header(slug: string, sourceChecksum: string): string {
  return [
    `// AUTO-GENERATED by scripts/compile-course.ts from content/courses/${slug}/.`,
    `// Do not edit by hand. Re-run \`npm run compile:course -- --slug ${slug}\` after editing source files.`,
    `// Source checksum: ${sourceChecksum}`,
    '',
  ].join('\n')
}

function ts(value: unknown, indent = 0): string {
  const pad = '  '.repeat(indent)
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    const inner = value.map((v) => `${pad}  ${ts(v, indent + 1)}`).join(',\n')
    return `[\n${inner},\n${pad}]`
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    const inner = entries
      .map(([k, v]) => {
        const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k)
        return `${pad}  ${key}: ${ts(v, indent + 1)}`
      })
      .join(',\n')
    return `{\n${inner},\n${pad}}`
  }
  return JSON.stringify(value)
}

function buildCurriculum(course: CourseYaml): unknown {
  return {
    slug: course.slug,
    estimatedDurationLabel: course.durationLabel,
    depthLabel: course.levelRange,
    capstone: {
      title: 'Capstone',
      description: course.capstone?.prompt ?? '',
      deliverables: [course.capstone?.evidence ?? ''],
    },
    modules: course.modules.map((m) => ({
      id: m.id,
      order: m.order,
      title: m.title,
      stage: m.stage,
      summary: m.summary,
      learningGoals: m.learningGoals,
      practiceActivities: m.practiceActivities,
      revisionCheckpoint: m.revisionCheckpoint ?? false,
      recap: m.recap ?? false,
      expectedOutputs: m.expectedOutputs ?? [],
    })),
    reinforcementSignals: [],
  }
}

function buildSessions(course: CourseYaml, lessons: Lesson[]): unknown {
  const byModule = new Map<string, Lesson[]>()
  for (const l of lessons) {
    const arr = byModule.get(l.frontMatter.moduleId) ?? []
    arr.push(l)
    byModule.set(l.frontMatter.moduleId, arr)
  }
  for (const arr of byModule.values()) {
    arr.sort((a, b) => a.frontMatter.order - b.frontMatter.order)
  }
  let orderInCourse = 0
  const sessions: unknown[] = []
  for (const mod of course.modules) {
    const ls = byModule.get(mod.id) ?? []
    for (let i = 0; i < ls.length; i++) {
      const lesson = ls[i]!
      orderInCourse += 1
      sessions.push({
        id: lesson.frontMatter.id,
        courseSlug: course.slug,
        moduleId: mod.id,
        orderInModule: i + 1,
        orderInCourse,
        title: lesson.frontMatter.title,
        type: 'lesson',
        durationMinutes: lesson.frontMatter.durationMinutes,
        effortLabel: `${lesson.frontMatter.durationMinutes} min`,
        summary: firstParagraph(lesson),
        objectives: lesson.frontMatter.outcomes,
        prerequisites: lesson.frontMatter.prerequisites ?? [],
      })
    }
  }
  return sessions
}

function buildReader(course: CourseYaml, lessons: Lesson[]): unknown {
  const byModule = new Map<string, Lesson[]>()
  for (const l of lessons) {
    const arr = byModule.get(l.frontMatter.moduleId) ?? []
    arr.push(l)
    byModule.set(l.frontMatter.moduleId, arr)
  }
  for (const arr of byModule.values()) {
    arr.sort((a, b) => a.frontMatter.order - b.frontMatter.order)
  }
  const modules = course.modules.map((m) => {
    const ls = byModule.get(m.id) ?? []
    return {
      slug: m.id.replace(/_/g, '-'),
      order: m.order,
      title: m.title,
      summary: m.summary,
      lessons: ls.map((l, i) => ({
        slug: l.filename.replace(/\.mdx$/, '').replace(/^\d+-/, ''),
        order: i + 1,
        shortTitle: l.frontMatter.shortTitle ?? l.frontMatter.title,
        title: l.frontMatter.title,
        summary: firstParagraph(l),
        outcomes: l.frontMatter.outcomes,
        sections: l.bodySections,
      })),
    }
  })
  return modules
}

function buildCatalogEntry(course: CourseYaml): unknown {
  return {
    slug: course.slug,
    schoolId: course.school,
    title: course.title,
    subtitle: course.subtitle,
    levelRange: course.levelRange,
    exampleOutputs: pickThree(course.whatYouCreate),
    featured: course.status === 'pilot' || course.status === 'active',
    intro: course.intro,
    promise: course.promise,
    depthStages: course.depthStages,
    learningOutcomes: course.learningOutcomes,
    whatYouCreate: course.whatYouCreate,
    modulePathway: course.modulePathway,
  }
}

function pickThree(arr: string[]): [string, string, string] {
  if (arr.length === 0) return ['', '', '']
  const a = arr[0] ?? ''
  const b = arr[1] ?? a
  const c = arr[2] ?? b
  return [a, b, c]
}

function firstParagraph(lesson: Lesson): string {
  for (const s of lesson.bodySections) {
    for (const p of s.paragraphs) {
      if (p.trim().length > 0) return truncate(p, 240)
    }
  }
  return ''
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s
  return s.slice(0, max - 1).trimEnd() + '…'
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const { slug, dryRun } = parseArgs(process.argv.slice(2))
  const t0 = Date.now()

  console.log(`[compile-course] Compiling course "${slug}" (dry-run: ${dryRun})`)

  const course = readCourseYaml(slug)
  const lessons = readLessons(slug, course)
  crossValidate(course, lessons)

  const outDir = path.join(OUTPUT_BASE, slug)
  const checksum = crypto.createHash('sha256')
  checksum.update(yaml.dump(course))
  for (const l of lessons.sort((a, b) => a.filename.localeCompare(b.filename))) {
    checksum.update(`\n${l.filename}\n${l.rawBody}`)
  }
  const hex = checksum.digest('hex').slice(0, 16)

  const manifest: Record<string, unknown> = {
    slug,
    compiledAt: new Date().toISOString(),
    sourceChecksum: hex,
    surfaces: course.surfaces,
    moduleCount: course.modules.length,
    lessonCount: lessons.length,
    emittedFiles: [] as string[],
    catalogTouchPoints: [] as string[],
    routeHints: [] as string[],
  }

  const files: Array<{ name: string; content: string }> = []

  if (course.surfaces.flagship) {
    const curriculum = buildCurriculum(course)
    files.push({
      name: 'curriculum.generated.ts',
      content:
        header(slug, hex) +
        `import type { FlagshipCourseCurriculum } from '../../flagshipCurriculumTypes'\n\n` +
        `export const CURRICULUM: FlagshipCourseCurriculum = ${ts(curriculum)}\n`,
    })

    const sessions = buildSessions(course, lessons)
    files.push({
      name: 'sessions.generated.ts',
      content:
        header(slug, hex) +
        `import type { FlagshipSession } from '../../flagshipCourseSessions'\n\n` +
        `export const SESSIONS: FlagshipSession[] = ${ts(sessions)}\n`,
    })

    const catalogEntry = buildCatalogEntry(course)
    files.push({
      name: 'catalog.generated.ts',
      content:
        header(slug, hex) +
        `import type { FlagshipCourse } from '../../flagshipCoursesCatalog'\n\n` +
        `export const CATALOG_ENTRY: FlagshipCourse = ${ts(catalogEntry)}\n`,
    })

    manifest.catalogTouchPoints = [
      'src/data/learning/flagshipCoursesCatalog.ts (append CATALOG_ENTRY to FLAGSHIP_COURSES)',
      'src/data/learning/flagshipCourseCurricula.ts (register CURRICULUM)',
      'src/data/learning/flagshipCourseSessions.ts (register SESSIONS)',
    ]
    manifest.routeHints = [
      `/learn/courses/${slug}`,
      `/learn/courses/${slug}/session/:sessionId`,
      `/learn/courses/${slug}/capstone`,
    ]
  }

  if (course.surfaces.library) {
    const reader = buildReader(course, lessons)
    files.push({
      name: 'reader.generated.ts',
      content:
        header(slug, hex) +
        `import type { PublicStarterModule } from '../../../publicStarterLibraries/aiFoundations'\n\n` +
        `export const READER_MODULES: PublicStarterModule[] = ${ts(reader)}\n`,
    })
    manifest.routeHints = [
      ...(manifest.routeHints as string[]),
      `/library/${slug}`,
      `/library/${slug}/:lessonSlug`,
    ]
  }

  const indexLines: string[] = [header(slug, hex)]
  if (course.surfaces.flagship) {
    indexLines.push(`export { CURRICULUM } from './curriculum.generated'`)
    indexLines.push(`export { SESSIONS } from './sessions.generated'`)
    indexLines.push(`export { CATALOG_ENTRY } from './catalog.generated'`)
  }
  if (course.surfaces.library) {
    indexLines.push(`export { READER_MODULES } from './reader.generated'`)
  }
  files.push({ name: 'index.generated.ts', content: indexLines.join('\n') + '\n' })
  manifest.emittedFiles = files.map((f) => f.name)

  if (dryRun) {
    console.log('\n[compile-course] DRY RUN — no files written.')
    console.log('Would emit:')
    for (const f of files) console.log(`  ${path.relative(REPO_ROOT, path.join(outDir, f.name))}`)
    console.log('Manifest preview:')
    console.log(JSON.stringify(manifest, null, 2))
    return
  }

  fs.mkdirSync(outDir, { recursive: true })
  for (const f of files) {
    fs.writeFileSync(path.join(outDir, f.name), f.content, 'utf8')
  }
  fs.writeFileSync(
    path.join(outDir, '.manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8',
  )

  const dt = Date.now() - t0
  console.log(`\n[compile-course] ✓ Emitted ${files.length} files to ${path.relative(REPO_ROOT, outDir)}`)
  console.log(`[compile-course]   modules: ${manifest.moduleCount}, lessons: ${manifest.lessonCount}`)
  console.log(`[compile-course]   surfaces: ${Object.entries(course.surfaces).filter((entry) => entry[1]).map(([k]) => k).join(', ')}`)
  console.log(`[compile-course]   checksum: ${hex}`)
  console.log(`[compile-course]   in ${dt}ms`)
  console.log('\nNext steps (manual, one-time per course):')
  for (const tp of manifest.catalogTouchPoints as string[]) console.log(`  - ${tp}`)
}

main()
