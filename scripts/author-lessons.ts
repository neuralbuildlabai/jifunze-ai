#!/usr/bin/env tsx
/**
 * Author-lessons — Wave 2 publishing pipeline.
 *
 * Reads `content/courses/<slug>/course.yaml`, iterates over every declared lesson, calls the
 * configured LLM to draft each lesson's MDX, and writes the result to
 * `content/courses/<slug>/lessons/`.
 *
 * Usage:
 *   npx tsx scripts/author-lessons.ts --slug <course-slug>
 *   npx tsx scripts/author-lessons.ts --slug <course-slug> --only 01-what-claude-is.mdx
 *   npx tsx scripts/author-lessons.ts --slug <course-slug> --force
 *
 * Flags:
 *   --only FILENAME   Only draft a single lesson (e.g. for re-running after review feedback).
 *   --force           Overwrite existing lesson files; default is to skip lessons that already exist.
 *   --temperature N   Override sampling temperature (default 0.4).
 *
 * Output:
 *   content/courses/<slug>/lessons/*.mdx (one per declared lesson)
 *
 * The human review gate happens AFTER this CLI runs, per lesson, BEFORE compile is invoked.
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import yaml from 'js-yaml'
import { loadAuthoringContext, resolveProvider } from './lib/llmProvider'

const REPO_ROOT = path.resolve(__dirname, '..')

function fail(msg: string): never {
  console.error(`\n[author-lessons] FAIL: ${msg}\n`)
  process.exit(1)
}

function parseArgs(
  argv: string[],
): { slug: string; only: string | null; force: boolean; temperature: number } {
  const slugIdx = argv.indexOf('--slug')
  if (slugIdx < 0 || slugIdx + 1 >= argv.length) {
    fail('Usage: tsx scripts/author-lessons.ts --slug <course-slug> [--only filename] [--force]')
  }
  const slug = argv[slugIdx + 1]!
  const onlyIdx = argv.indexOf('--only')
  const only = onlyIdx >= 0 ? argv[onlyIdx + 1] ?? null : null
  const force = argv.includes('--force')
  const tempIdx = argv.indexOf('--temperature')
  const temperature = tempIdx >= 0 ? Number(argv[tempIdx + 1]) : 0.4
  return { slug, only, force, temperature }
}

type CourseYaml = {
  slug: string
  title: string
  intro: string
  promise: string
  modules: Array<{
    id: string
    order: number
    title: string
    stage: string
    summary: string
    learningGoals: string[]
    practiceActivities: string[]
    revisionCheckpoint?: boolean
    lessons: string[]
  }>
}

function readCourseYaml(slug: string): CourseYaml {
  const yamlPath = path.join(REPO_ROOT, 'content', 'courses', slug, 'course.yaml')
  if (!fs.existsSync(yamlPath)) fail(`course.yaml not found: ${yamlPath}`)
  const raw = fs.readFileSync(yamlPath, 'utf8')
  return yaml.load(raw) as CourseYaml
}

function buildSystemPrompt(style: string, schema: string): string {
  return [
    '# Role',
    '',
    'You are the Jifunze.ai lesson author. You draft a single lesson MDX file at a time, following the course outline and the platform style guide. Your output is reviewed by a human before publication.',
    '',
    '# Voice and pedagogy',
    '',
    'The following style guide is authoritative. Every paragraph you write will be measured against it. Re-read the "Anti-patterns" section before drafting.',
    '',
    '---',
    '',
    style,
    '',
    '---',
    '',
    '# Output format',
    '',
    'The lesson is a single MDX file with YAML front-matter followed by an MDX body. The schema below defines the front-matter fields.',
    '',
    '---',
    '',
    schema,
    '',
    '---',
    '',
    'Respond with the complete lesson MDX file. Begin with `---` for front-matter, then the body. No preamble, no commentary, no markdown fences around the whole response.',
    '',
    'Length target: approximately 800–1500 words of body prose for a 12-minute lesson. Scale proportionally for longer or shorter duration.',
    '',
    'Structure target: open with a concrete moment, develop the concept with examples, include at least one named practice activity, end with something the learner can hold onto (a question, a decision rule, a single sentence).',
  ].join('\n')
}

function buildUserPromptForLesson(
  course: CourseYaml,
  mod: CourseYaml['modules'][number],
  lessonFilename: string,
  positionInModule: number,
  totalLessonsInModule: number,
): string {
  const lessonId = lessonFilename.replace(/\.mdx$/, '').replace(/^\d+-/, '')
  const surroundingLessons = mod.lessons
    .map((l, i) => `${i + 1}. ${l}${l === lessonFilename ? '  ← this lesson' : ''}`)
    .join('\n')

  return [
    `# Course: ${course.title}`,
    '',
    `## Intro`,
    course.intro,
    '',
    `## Promise`,
    course.promise,
    '',
    `# Current module: ${mod.title} (id: ${mod.id}, stage: ${mod.stage})`,
    '',
    `## Module summary`,
    mod.summary,
    '',
    `## Module learning goals`,
    ...mod.learningGoals.map((g) => `- ${g}`),
    '',
    `## Module practice activities`,
    ...mod.practiceActivities.map((p) => `- ${p}`),
    '',
    `## Lessons in this module (in order)`,
    surroundingLessons,
    '',
    `# Your task`,
    '',
    `Draft lesson ${positionInModule} of ${totalLessonsInModule}: \`${lessonFilename}\`.`,
    '',
    `The lesson id is \`${mod.id}-l${String(positionInModule).padStart(2, '0')}\`.`,
    `The lesson moduleId is \`${mod.id}\`.`,
    `The lesson order within the module is ${positionInModule}.`,
    `Target durationMinutes: 12 (adjust if the lesson scope warrants 8 or 20).`,
    '',
    'Produce the complete lesson MDX file now. Front-matter first (with `id`, `title`, `moduleId`, `order`, `durationMinutes`, `outcomes`, `sessionBlocks`), then the body.',
    '',
    `If the lesson title is not obvious from the filename (\`${lessonId}\`), invent a clear, descriptive title that fits the module's arc.`,
  ].join('\n')
}

async function main(): Promise<void> {
  const { slug, only, force, temperature } = parseArgs(process.argv.slice(2))
  const course = readCourseYaml(slug)
  const lessonsDir = path.join(REPO_ROOT, 'content', 'courses', slug, 'lessons')
  fs.mkdirSync(lessonsDir, { recursive: true })

  const { style, schema } = loadAuthoringContext()
  const provider = resolveProvider()

  console.log(`[author-lessons] slug: ${slug}`)
  console.log(`[author-lessons] provider: ${provider.name} (model: ${provider.model})`)

  const targets: Array<{
    mod: CourseYaml['modules'][number]
    filename: string
    positionInModule: number
  }> = []
  for (const mod of course.modules) {
    for (let i = 0; i < mod.lessons.length; i++) {
      const filename = mod.lessons[i]!
      if (only && filename !== only) continue
      targets.push({ mod, filename, positionInModule: i + 1 })
    }
  }
  if (targets.length === 0) {
    if (only) fail(`No matching lesson found for --only ${only}`)
    fail('No lessons declared in any module.')
  }

  let drafted = 0
  let skipped = 0
  let totalInTokens = 0
  let totalOutTokens = 0

  for (const { mod, filename, positionInModule } of targets) {
    const filePath = path.join(lessonsDir, filename)
    if (fs.existsSync(filePath) && !force) {
      console.log(`[author-lessons] skip ${filename} (already exists; pass --force to overwrite)`)
      skipped += 1
      continue
    }

    console.log(`[author-lessons] drafting ${mod.id}/${filename}…`)
    const t0 = Date.now()
    const response = await provider.complete({
      system: buildSystemPrompt(style, schema),
      user: buildUserPromptForLesson(course, mod, filename, positionInModule, mod.lessons.length),
      temperature,
      maxOutputTokens: 4000,
    })
    const dt = Date.now() - t0

    let mdx = response.text.trim()
    // Strip accidental markdown fence wrapping
    if (mdx.startsWith('```')) {
      mdx = mdx.replace(/^```(?:mdx|md|markdown)?\r?\n/, '').replace(/\r?\n```\s*$/, '')
    }
    if (!mdx.startsWith('---')) {
      console.warn(`[author-lessons]   warning: ${filename} does not start with front-matter; writing anyway`)
    }

    fs.writeFileSync(filePath, mdx + '\n', 'utf8')
    totalInTokens += response.inputTokens ?? 0
    totalOutTokens += response.outputTokens ?? 0
    drafted += 1
    console.log(
      `[author-lessons]   ✓ wrote ${filename} (in ${dt}ms, in=${response.inputTokens ?? '?'} out=${response.outputTokens ?? '?'})`,
    )
  }

  console.log(`\n[author-lessons] Done.`)
  console.log(`[author-lessons]   drafted: ${drafted}`)
  console.log(`[author-lessons]   skipped: ${skipped}`)
  console.log(`[author-lessons]   total tokens: in=${totalInTokens}, out=${totalOutTokens}`)
  console.log('\nNext steps:')
  console.log(`  1. REVIEW each lesson in content/courses/${slug}/lessons/`)
  console.log(`  2. Re-run with --only <filename> --force to redraft any rejected lesson`)
  console.log(`  3. When all lessons pass review, compile: npx tsx scripts/compile-course.ts --slug ${slug}`)
}

main().catch((err) => {
  fail(err instanceof Error ? err.message : String(err))
})
