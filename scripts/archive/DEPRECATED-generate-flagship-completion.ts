/**
 * @deprecated NON-PRODUCTION — historical bulk-population tool only.
 * Final learner-facing flagship instructional prose must be edited by human authors in
 * `src/data/learning/flagshipSessionContentOverridesCompletion.ts` and related override files.
 * Do not re-run and treat output as editorially final: it programmatically composed text.
 */

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { FlagshipCourseCurriculum } from '../src/data/learning/flagshipCourseCurricula'
import { FLAGSHIP_CURRICULUM_SLUGS, getFlagshipCurriculum } from '../src/data/learning/flagshipCourseCurricula'
import type { FlagshipCurriculumModule } from '../src/data/learning/flagshipCurriculumTypes'
import type { FlagshipAssessmentItem } from '../src/lib/flagshipAssessmentTypes'
import { assessmentItemId } from '../src/lib/flagshipAssessmentTypes'
import { FLAGSHIP_SESSION_CONTENT_OVERRIDES_WITHOUT_COMPLETION } from '../src/data/learning/flagshipSessionContentOverrides'
import type { FlagshipSession } from '../src/data/learning/flagshipCourseSessions'
import { buildSessionsForCurriculum } from '../src/data/learning/flagshipCourseSessions'
import { FLAGSHIP_BESPOKE_ASSESSMENT_MODULE_IDS, FLAGSHIP_MID_BESPOKE_ASSESSMENT_MODULE_IDS } from '../src/lib/flagshipAssessmentBespokeModules'

function esc(s: string): string {
  return JSON.stringify(s)
}

function cluster(slug: string): 'ai' | 'biz' | 'career' | 'lead' {
  if (
    slug === 'ai-essentials' ||
    slug === 'smart-workflows-with-ai' ||
    slug === 'web-and-software-foundations' ||
    slug === 'digital-safety'
  )
    return 'ai'
  if (
    slug === 'data-and-decisions' ||
    slug === 'marketing-and-growth' ||
    slug === 'business-builder' ||
    slug === 'money-and-finance' ||
    slug === 'product-thinking' ||
    slug === 'project-execution'
  )
    return 'biz'
  if (slug === 'career-launch' || slug === 'clear-communication' || slug === 'research-and-critical-thinking')
    return 'career'
  return 'lead'
}

function lessonEyebrow(stage: FlagshipCurriculumModule['stage']): string {
  switch (stage) {
    case 'foundations':
      return 'Grounding'
    case 'applied_practice':
      return 'Applied reasoning'
    case 'professional_execution':
      return 'Professional judgment'
    case 'mastery_outputs':
      return 'Integration'
    default:
      return 'Lesson focus'
  }
}

function lessonBlocks(session: FlagshipSession, module: FlagshipCurriculumModule, slug: string): Record<string, unknown>[] {
  const cg = cluster(slug)
  const g0 = module.learningGoals[0] ?? 'Translate this module into a reviewer-readable judgment.'
  const hook =
    cg === 'ai'
      ? 'Treat outputs and tools as accountable artifacts—verification lanes before speed.'
      : cg === 'biz'
        ? 'Treat this as finance- and stakeholder-ready reasoning—numbers, tradeoffs, and downside named.'
        : cg === 'career'
          ? 'Treat this as reputational craft—specific evidence beats generic positioning.'
          : 'Treat this as role modeling—behavior others can cite and audit.'

  const introBody = [
    hook,
    `Anchor “${module.title}” to a concrete situation you can revisit in 48 hours—not abstract interest.`,
    module.summary.slice(0, 280) + (module.summary.length > 280 ? '…' : ''),
  ].join('\n\n')

  const conceptTitle =
    cg === 'ai'
      ? 'Operational truth conditions for this module'
      : cg === 'biz'
        ? 'Decisions and tradeoffs this module must clarify'
        : cg === 'career'
          ? 'Evidence and positioning this module must sharpen'
          : 'Observable behaviors this module targets'

  const conceptBody = [
    `Primary outcome lens: ${g0}`,
    module.practiceActivities[0]
      ? `Practice spine you will revisit: ${module.practiceActivities[0]}`
      : 'Keep claims tied to scenarios you can name and evidence you could show.',
  ].join('\n\n')

  const workedTitles = [
    'Trace one accountable thread',
    'Make one falsifiable pass',
    'Compress to a reviewer note',
    'Draft a decision memo spine',
    'Evidence ladder (short)',
    'Concrete walkthrough',
  ]
  const wt = workedTitles[module.order % workedTitles.length]

  const workedBody = [
    `Pick one realistic thread implied by “${module.title}”.`,
    `State: (1) stakeholder or context, (2) claim or plan, (3) evidence type you would accept, (4) falsifier.`,
    `Tie explicitly to: ${g0}`,
  ].join('\n')

  const intro = {
    id: `${session.id}-lt-intro`,
    type: 'intro',
    eyebrow: lessonEyebrow(module.stage),
    title: module.title,
    body: introBody,
  }
  const concept = {
    id: `${session.id}-lt-concept`,
    type: 'concept_explanation',
    eyebrow: 'Instructional standard',
    title: conceptTitle,
    body: conceptBody,
  }
  const worked = {
    id: `${session.id}-lt-worked`,
    type: 'worked_example',
    eyebrow: 'Worked thread',
    title: wt,
    body: workedBody,
    example: 'Keep under ~200 words unless your reviewer explicitly asked for depth.',
  }
  const reflect = {
    id: `${session.id}-lt-reflect`,
    type: 'reflection_prompt',
    title: 'Integrity check',
    prompt:
      cg === 'biz'
        ? 'Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.'
        : cg === 'ai'
          ? 'Where might speed tempt you to skip verification? Name one stop rule.'
          : cg === 'career'
            ? 'Where might generic language hide weak evidence in your portfolio or story? Name one fix.'
            : 'Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.',
  }
  const next = {
    id: `${session.id}-lt-next`,
    type: 'next_step',
    body: 'Ship a short artifact now—half a page beats a polished blank page.',
  }
  return [intro, concept, worked, reflect, next]
}

function practiceBlocks(session: FlagshipSession, module: FlagshipCurriculumModule): Record<string, unknown>[] {
  const acts =
    module.practiceActivities.length > 0
      ? module.practiceActivities
      : ['Apply the module objective to one real artifact you can share with a reviewer.']
  const bullets = acts.slice(0, 4).map((a, i) => `${i + 1}. ${a}`)
  const outExp = module.expectedOutputs?.[0] ?? 'Short artifact with assumptions and evidence lanes visible.'
  return [
    {
      id: `${session.id}-lt-intro`,
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'Repetitions with receipts',
      body:
        'This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.',
    },
    {
      id: `${session.id}-lt-task`,
      type: 'practice_task',
      title: `Practice · ${module.title}`,
      bullets,
      prompt: 'Stop when a skeptical colleague could argue with your specifics—not just your tone.',
    },
    {
      id: `${session.id}-lt-output`,
      type: 'output_prompt',
      title: 'Artifact to produce',
      outputExpectation: outExp,
      prompt:
        'If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.',
    },
    {
      id: `${session.id}-lt-next`,
      type: 'next_step',
      body: 'Before completing, verify one explicit assumption and one falsifier.',
    },
  ]
}

function revisionBlocks(session: FlagshipSession, module: FlagshipCurriculumModule): Record<string, unknown>[] {
  return [
    {
      id: `${session.id}-lt-intro`,
      type: 'intro',
      eyebrow: 'Revision gate',
      title: `Tighten · ${module.title}`,
      body:
        'Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.',
    },
    {
      id: `${session.id}-lt-recap`,
      type: 'recap',
      title: 'Compress to checks',
      bullets: [
        module.learningGoals[0] ?? 'Core claim of the module',
        module.learningGoals[1] ?? 'Evidence standard you will use',
        module.learningGoals[2] ?? 'Known limit or caveat',
      ].filter(Boolean),
    },
    {
      id: `${session.id}-lt-task`,
      type: 'practice_task',
      title: 'Structured gate',
      prompt:
        'In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.',
    },
    {
      id: `${session.id}-lt-next`,
      type: 'next_step',
      body: 'Proceed only if you would defend these claims aloud to a skeptical peer.',
    },
  ]
}

function recapBlocks(session: FlagshipSession, module: FlagshipCurriculumModule): Record<string, unknown>[] {
  return [
    {
      id: `${session.id}-lt-intro`,
      type: 'intro',
      eyebrow: 'Consolidation',
      title: `Consolidate · ${module.title}`,
      body:
        'Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.',
    },
    {
      id: `${session.id}-lt-keys`,
      type: 'key_points',
      title: 'Carry-forward pack',
      bullets: [
        `Keyword claim: ${module.learningGoals[0] ?? module.title}`,
        `Failure mode to watch: ${module.summary.slice(0, 120)}…`,
        'Reuse rule: when to apply vs rethink this module',
      ],
    },
    {
      id: `${session.id}-lt-reflect`,
      type: 'reflection_prompt',
      title: 'Calibration',
      prompt:
        'What would convince you this module did not stick—what signal would you look for in your next deliverable?',
    },
    {
      id: `${session.id}-lt-next`,
      type: 'next_step',
      body: 'Archive the recap where your future self will actually find it.',
    },
  ]
}

function reflectionBlocks(session: FlagshipSession, module: FlagshipCurriculumModule): Record<string, unknown>[] {
  return [
    {
      id: `${session.id}-lt-intro`,
      type: 'intro',
      eyebrow: 'Reflection',
      title: `Reflect · ${module.title}`,
      body:
        'Slow down enough to convert experience into usable judgment—evidence-based, not mood-based.',
    },
    {
      id: `${session.id}-lt-prompt`,
      type: 'reflection_prompt',
      title: 'Structured reflection',
      prompt: `What changed for you after “${module.title}”? Name one behavior shift and one signal you will watch.`,
    },
    {
      id: `${session.id}-lt-next`,
      type: 'next_step',
      body: 'Carry one sentence forward into your next artifact header or checklist.',
    },
  ]
}

function capstonePrepBlocks(session: FlagshipSession, c: FlagshipCourseCurriculum): Record<string, unknown>[] {
  return [
    {
      id: `${session.id}-lt-intro`,
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: c.capstone.title,
      body: `Synthesis work: ${c.capstone.description.slice(0, 320)}${c.capstone.description.length > 320 ? '…' : ''}`,
    },
    {
      id: `${session.id}-lt-task`,
      type: 'practice_task',
      title: 'Deliverable alignment',
      bullets: c.capstone.deliverables.map((d, i) => `${i + 1}. ${d}`),
      prompt:
        'Map artifacts you already produced to each deliverable; flag gaps as dated tasks—not wishful thinking.',
    },
    {
      id: `${session.id}-lt-output`,
      type: 'output_prompt',
      title: 'Acceptance mindset',
      outputExpectation: 'Prep packet a reviewer could navigate without you narrating aloud.',
      prompt:
        'If any deliverable is slide-only or slogan-only, convert it to checklist, memo, diagram, or table with definitions.',
    },
    {
      id: `${session.id}-lt-next`,
      type: 'next_step',
      body: 'Finish prep when readiness is evidenced—mock review optional but encouraged.',
    },
  ]
}

function serializeAssessmentItems(items: FlagshipAssessmentItem[]): string {
  const lines = items.map((it) => {
    if (it.kind === 'reflection_confirm') {
      return `    {\n      kind: 'reflection_confirm',\n      id: ${esc(it.id)},\n      prompt: ${esc(it.prompt)},\n      attestation: ${esc(it.attestation)},\n    }`
    }
    const rationaleStr = it.rationale ? `,\n      rationale: ${esc(it.rationale)}` : ''
    if (it.kind === 'mcq') {
      return `    {\n      kind: 'mcq',\n      id: ${esc(it.id)},\n      prompt: ${esc(it.prompt)},\n      choices: [${it.choices.map(esc).join(', ')}],\n      correctIndex: ${it.correctIndex}${rationaleStr},\n    }`
    }
    return `    {\n      kind: 'scenario_judgment',\n      id: ${esc(it.id)},\n      prompt: ${esc(it.prompt)},\n      scenario: ${esc(it.scenario)},\n      choices: [${it.choices.map(esc).join(', ')}],\n      correctIndex: ${it.correctIndex}${rationaleStr},\n    }`
  })
  return `[\n${lines.join(',\n')},\n  ]`
}

function serializeBlock(b: Record<string, unknown>): string {
  const lines: string[] = ['    {']
  for (const k of ['id', 'type', 'eyebrow', 'title', 'body', 'bullets', 'prompt', 'example', 'outputExpectation']) {
    const v = b[k]
    if (v === undefined) continue
    if (k === 'bullets' && Array.isArray(v)) {
      lines.push(`      ${k}: [`)
      for (const item of v) lines.push(`        ${esc(item as string)},`)
      lines.push(`      ],`)
    } else if (typeof v === 'string') {
      lines.push(`      ${k}: ${esc(v)},`)
    }
  }
  lines.push(`    }`)
  return lines.join('\n')
}

function serializeBlocks(blocks: Record<string, unknown>[]): string {
  return `[\n${blocks.map((b) => serializeBlock(b)).join(',\n')}\n  ]`
}

function completionAssessmentItems(module: FlagshipCurriculumModule, slug: string): FlagshipAssessmentItem[] {
  const cg = cluster(slug)
  const title = module.title
  const g = module.learningGoals[0] ?? module.summary.slice(0, 140)
  const mcqBest = `I can tie “${title}” to a concrete decision, evidence lane, and what would change my mind.`
  const mcqWedge =
    cg === 'biz'
      ? `I memorized jargon from “${title}” without translating it into tradeoffs or definitions.`
      : cg === 'ai'
        ? `I judged “${title}” by fluent outputs rather than verification and failure modes.`
        : `I summarized “${title}” without anchoring it to observable behavior or artifacts.`

  const scenPrompt = `Stake judgment · ${title}`
  const scenario = `Pressure moment: deadlines, incomplete data, stakeholders want confidence now—context of “${title.slice(0, 80)}”.`
  const scenBest =
    cg === 'lead'
      ? `Name stakes, downside, audience; choose a reversible step; schedule evidence you owe; document assumptions.`
      : `Slow for one minute—clarify decision + evidence standard; propose the smallest accountable next step; note falsifiers.`
  const scenWedge = `Answer fast with confident generality—deal with fallout later when someone audits the file.`

  const reflPrompt = `Applied evidence · ${module.id}`
  const reflBody = `I linked “${title}” to one artifact or scenario I can show, and stated one falsifier tied to ${g.slice(0, 80)}${g.length > 80 ? '…' : ''}`

  const trio: Omit<FlagshipAssessmentItem, 'id'>[] = [
    {
      kind: 'mcq',
      prompt: `Which statement reflects disciplined mastery of “${title}”?`,
      choices: [mcqBest, mcqWedge, 'Treat finishing quickly as proof of mastery.'],
      correctIndex: 0,
      rationale:
        cg === 'biz'
          ? 'Operating literacy requires definitions, downside, and traceability—not buzzwords.'
          : 'Mastery is accountable judgment with falsifiers—not pace.',
    },
    {
      kind: 'scenario_judgment',
      prompt: scenPrompt,
      scenario,
      choices: [
        scenBest,
        scenWedge,
        'Wait indefinitely—no decision is permissible until certainty is absolute.',
      ],
      correctIndex: 0,
      rationale: 'Professionals separate decisions, evidence standards, and reversible steps before acting.',
    },
    {
      kind: 'reflection_confirm',
      prompt: reflPrompt,
      attestation: reflBody.slice(0, 480),
    },
  ]

  return trio.map((item, i) => ({
    ...item,
    id: assessmentItemId(module.id, i),
  })) as FlagshipAssessmentItem[]
}

async function main(): Promise<void> {
  const existing = new Set(Object.keys(FLAGSHIP_SESSION_CONTENT_OVERRIDES_WITHOUT_COMPLETION))
  const bespokeHad = new Set([
    ...FLAGSHIP_BESPOKE_ASSESSMENT_MODULE_IDS,
    ...FLAGSHIP_MID_BESPOKE_ASSESSMENT_MODULE_IDS,
  ])

  const sessionRecords: Record<string, Record<string, unknown>[]> = {}
  let sessionCount = 0

  const assessmentRows: string[] = []
  let assessCount = 0

  for (const slug of FLAGSHIP_CURRICULUM_SLUGS) {
    const c = getFlagshipCurriculum(slug)
    if (!c) continue
    const curriculum: FlagshipCourseCurriculum = c
    const sessions = buildSessionsForCurriculum(curriculum)

    const moduleById = Object.fromEntries(curriculum.modules.map((m) => [m.id, m]))

    for (const session of sessions) {
      const key = `${slug}::${session.id}`
      if (!existing.has(key)) {
        let blocks: Record<string, unknown>[] = []
        if (session.type === 'capstone_prep') {
          blocks = capstonePrepBlocks(session, curriculum)
        } else {
          const module = moduleById[session.moduleId]
          if (!module) continue
          switch (session.type) {
            case 'lesson':
              blocks = lessonBlocks(session, module, slug)
              break
            case 'practice':
              blocks = practiceBlocks(session, module)
              break
            case 'revision':
              blocks = revisionBlocks(session, module)
              break
            case 'recap':
              blocks = recapBlocks(session, module)
              break
            case 'reflection':
              blocks = reflectionBlocks(session, module)
              break
            default:
              blocks = lessonBlocks(session, module, slug)
              break
          }
        }
        sessionRecords[key] = blocks
        sessionCount++
      }
    }

    for (const mod of curriculum.modules) {
      if (bespokeHad.has(mod.id)) continue
      const items = completionAssessmentItems(mod, slug)
      assessmentRows.push(`  ${esc(mod.id)}: ${serializeAssessmentItems(items)},`)
      assessCount++
      bespokeHad.add(mod.id)
    }
  }

  let sessionOut =
    `/**\n * Completion layer: bespoke overrides for every remaining flagship session.\n * Generated by scripts/generate-flagship-completion.ts — re-run after curriculum edits.\n */\n\nimport type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'\n\nexport const FLAGSHIP_SESSION_CONTENT_OVERRIDES_COMPLETION: Partial<\n  Record<string, FlagshipSessionContentBlock[]>\n> = {\n`

  for (const k of Object.keys(sessionRecords).sort()) {
    sessionOut += `  ${esc(k)}: ${serializeBlocks(sessionRecords[k])},\n\n`
  }
  sessionOut += '}\n'

  const root = join(dirname(fileURLToPath(import.meta.url)), '..')

  if (sessionCount === 0) {
    console.warn('No session gaps vs WITHOUT_COMPLETION — skipping session TS write to avoid wiping completion.')
  } else {
    writeFileSync(join(root, 'src/data/learning/flagshipSessionContentOverridesCompletion.ts'), sessionOut)
  }

  const assessOut =
    `/**\n * Completion bespoke checkpoints for all modules not covered by anchor/mid packs.\n * Generated by scripts/generate-flagship-completion.ts\n */\n\nimport type { FlagshipAssessmentItem } from './flagshipAssessmentTypes'\n\nexport const FLAGSHIP_ASSESSMENT_COMPLETION_PRESTAMPED: Partial<Record<string, FlagshipAssessmentItem[]>> = {\n${assessmentRows.join('\n')}\n}\n`

  writeFileSync(join(root, 'src/lib/flagshipAssessmentCompletion.ts'), assessOut)

  console.log(`Wrote ${sessionCount} session overrides, ${assessCount} assessment module entries`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
