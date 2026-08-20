#!/usr/bin/env tsx
/**
 * Author-outline — Wave 2 publishing pipeline.
 *
 * Reads a course brief from `content/briefs/<slug>.md`, calls the configured LLM with the brief
 * + STYLE.md + SCHEMA.md as system prompt, and writes a draft `content/courses/<slug>/course.yaml`.
 *
 * Usage:
 *   npx tsx scripts/author-outline.ts --brief content/briefs/<slug>.md
 *   npx tsx scripts/author-outline.ts --brief content/briefs/<slug>.md --force
 *
 * Flags:
 *   --force          Overwrite an existing course.yaml; default is to refuse if one exists.
 *   --temperature N  Override sampling temperature (default 0.3).
 *
 * Output:
 *   content/courses/<slug>/course.yaml (draft, intended for human review)
 *
 * The human review gate happens AFTER this CLI runs and BEFORE author-lessons is invoked.
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { loadAuthoringContext, resolveProvider } from './lib/llmProvider'

const REPO_ROOT = path.resolve(__dirname, '..')

function fail(msg: string): never {
  console.error(`\n[author-outline] FAIL: ${msg}\n`)
  process.exit(1)
}

function parseArgs(argv: string[]): { briefPath: string; force: boolean; temperature: number } {
  const briefIdx = argv.indexOf('--brief')
  if (briefIdx < 0 || briefIdx + 1 >= argv.length) {
    fail('Usage: tsx scripts/author-outline.ts --brief content/briefs/<slug>.md')
  }
  const briefPath = argv[briefIdx + 1]!
  const force = argv.includes('--force')
  const tempIdx = argv.indexOf('--temperature')
  const temperature = tempIdx >= 0 ? Number(argv[tempIdx + 1]) : 0.3
  return { briefPath, force, temperature }
}

function slugFromBriefPath(briefPath: string): string {
  return path.basename(briefPath, '.md')
}

function buildSystemPrompt(style: string, schema: string): string {
  return [
    '# Role',
    '',
    'You are the Jifunze.ai course-outline author. Your job is to take a course brief and produce a complete, schema-valid `course.yaml` that a downstream lesson-authoring pass will use to write the full course.',
    '',
    '# Voice and pedagogy',
    '',
    'The following style guide is authoritative for every word you write. Read it now; you will be judged against it.',
    '',
    '---',
    '',
    style,
    '',
    '---',
    '',
    '# Schema',
    '',
    'The course.yaml format is defined below. Your output must validate against this schema. The compiler will reject any output that misses required fields, has duplicate IDs, or violates structural rules.',
    '',
    '---',
    '',
    schema,
    '',
    '---',
    '',
    '# Output format',
    '',
    'Respond with valid YAML only — no preamble, no markdown fences, no commentary. Your entire response must be parseable as YAML and match the course.yaml schema above.',
    '',
    'Do NOT include `lessons:` filenames yet — leave the `lessons:` array for each module as a placeholder list of `XX-placeholder-<n>.mdx` entries. The author-lessons pass will replace these with real lesson filenames after a human reviews the outline.',
    '',
    'Aim for 4 modules with 3–5 lesson placeholders each, unless the brief specifies otherwise. Total course length should match the brief\'s duration label.',
  ].join('\n')
}

function buildUserPrompt(briefContent: string): string {
  return [
    '# Course brief',
    '',
    briefContent,
    '',
    '---',
    '',
    'Produce the complete `course.yaml` for this course now. Respond with YAML only.',
  ].join('\n')
}

async function main(): Promise<void> {
  const { briefPath, force, temperature } = parseArgs(process.argv.slice(2))
  const absBriefPath = path.isAbsolute(briefPath) ? briefPath : path.join(REPO_ROOT, briefPath)
  if (!fs.existsSync(absBriefPath)) fail(`Brief not found: ${briefPath}`)

  const slug = slugFromBriefPath(absBriefPath)
  const courseDir = path.join(REPO_ROOT, 'content', 'courses', slug)
  const yamlPath = path.join(courseDir, 'course.yaml')

  if (fs.existsSync(yamlPath) && !force) {
    fail(`course.yaml already exists for "${slug}". Pass --force to overwrite, or edit by hand.`)
  }

  const briefContent = fs.readFileSync(absBriefPath, 'utf8')
  const { style, schema } = loadAuthoringContext()
  const provider = resolveProvider()

  console.log(`[author-outline] slug: ${slug}`)
  console.log(`[author-outline] provider: ${provider.name} (model: ${provider.model})`)
  console.log(`[author-outline] brief: ${path.relative(REPO_ROOT, absBriefPath)}`)
  console.log(`[author-outline] calling LLM…\n`)

  const t0 = Date.now()
  const response = await provider.complete({
    system: buildSystemPrompt(style, schema),
    user: buildUserPrompt(briefContent),
    temperature,
    maxOutputTokens: 8000,
  })
  const dt = Date.now() - t0

  // Strip any accidental markdown fences
  let yamlText = response.text.trim()
  if (yamlText.startsWith('```')) {
    yamlText = yamlText.replace(/^```(?:yaml|yml)?\r?\n/, '').replace(/\r?\n```\s*$/, '')
  }

  fs.mkdirSync(courseDir, { recursive: true })
  fs.writeFileSync(yamlPath, yamlText + '\n', 'utf8')

  // Also create the lessons/ directory so author-lessons has a target
  fs.mkdirSync(path.join(courseDir, 'lessons'), { recursive: true })

  console.log(`[author-outline] ✓ Wrote ${path.relative(REPO_ROOT, yamlPath)}`)
  console.log(`[author-outline]   tokens: in=${response.inputTokens ?? '?'}, out=${response.outputTokens ?? '?'}`)
  console.log(`[author-outline]   in ${dt}ms`)
  console.log('\nNext steps:')
  console.log(`  1. REVIEW ${path.relative(REPO_ROOT, yamlPath)} by hand. Edit modules, learning goals, capstone.`)
  console.log(`  2. Replace the placeholder lesson filenames with real ones (e.g. 01-what-claude-is.mdx).`)
  console.log(`  3. When the outline is right, run: npx tsx scripts/author-lessons.ts --slug ${slug}`)
}

main().catch((err) => {
  fail(err instanceof Error ? err.message : String(err))
})
