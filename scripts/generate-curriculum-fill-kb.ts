/**
 * One-time / maintainable generator: creates `teachingKnowledgeBaseCurriculumFill.ts` with
 * one teaching atom per catalog lesson slug that is not already referenced by the current KB.
 *
 * Run: npx tsx scripts/generate-curriculum-fill-kb.ts
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { TEACHING_CONCEPTS } from '../src/data/teaching/teachingKnowledgeBase'
import { TEACHING_LABS } from '../src/data/teaching/teachingLabsCatalog'
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
import type { TeachingConcept, TeachingLibraryId } from '../src/data/teaching/teachingTypes'

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[“”]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

type Lib = TeachingLibraryId

type Row = { lib: Lib; slug: string; lessonTitle: string }

function allRows(): Row[] {
  const rows: Row[] = []
  for (const spec of AI_CURRICULUM_SPEC) {
    for (const mod of spec.modules) {
      for (const lessonTitle of mod.lessons) {
        rows.push({ lib: 'ai_foundations', slug: slugify(`${spec.id}-${lessonTitle}`), lessonTitle })
      }
    }
  }
  for (const spec of ML_CURRICULUM_SPEC) {
    for (const mod of spec.modules) {
      for (const lessonTitle of mod.lessons) {
        rows.push({ lib: 'machine_learning', slug: slugify(`${spec.id}-${lessonTitle}`), lessonTitle })
      }
    }
  }
  for (const spec of CHATBOT_CURRICULUM_SPEC) {
    for (const mod of spec.modules) {
      for (const lessonTitle of mod.lessons) {
        rows.push({ lib: 'chatbots', slug: slugify(`${spec.id}-${lessonTitle}`), lessonTitle })
      }
    }
  }
  for (const cat of NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC.categories) {
    for (const lessonTitle of cat.lessons) rows.push({ lib: 'networking', slug: slugify(`${cat.id}-${lessonTitle}`), lessonTitle })
  }
  for (const cat of CYBERSECURITY_DEFENSE_LIBRARY_SPEC.categories) {
    for (const lessonTitle of cat.lessons) rows.push({ lib: 'cybersecurity', slug: slugify(`${cat.id}-${lessonTitle}`), lessonTitle })
  }
  for (const cat of CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC.categories) {
    for (const lessonTitle of cat.lessons) rows.push({ lib: 'cloud_devops', slug: slugify(`${cat.id}-${lessonTitle}`), lessonTitle })
  }
  for (const cat of MONITORING_OBSERVABILITY_LIBRARY_SPEC.categories) {
    for (const lessonTitle of cat.lessons) rows.push({ lib: 'monitoring', slug: slugify(`${cat.id}-${lessonTitle}`), lessonTitle })
  }
  for (const cat of CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC.categories) {
    for (const lessonTitle of cat.lessons) rows.push({ lib: 'content_publishing', slug: slugify(`${cat.id}-${lessonTitle}`), lessonTitle })
  }
  return rows
}

function labsForSlug(slug: string): string[] {
  const ids = new Set<string>()
  for (const lab of TEACHING_LABS) {
    if (lab.lessonSlugs.includes(slug)) ids.add(lab.id)
  }
  return [...ids]
}

function fnv1a32(input: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

function pick<T>(slug: string, arr: readonly T[]): T {
  return arr[fnv1a32(slug) % arr.length]!
}

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function explanationFor(lib: Lib, lessonTitle: string, slug: string): string {
  const t = lessonTitle
  const banks: Record<Lib, string[]> = {
    ai_foundations: [
      `Use “${t}” as an operational anchor: what decision changes after you understand it, and what evidence would falsify your takeaway?`,
      `This lesson (“${t}”) matters because workplace AI failures are usually framing + verification failures—not missing buzzwords.`,
      `Treat “${t}” as a checkpoint in judgment: translate the idea into a repeatable review step you can apply to drafts, summaries, or decisions.`,
      `When studying “${t}”, prioritize scenarios: pick one real workflow and say where over-trust would hurt—then define a lightweight check.`,
      `“${t}” is easiest to misuse when outputs sound fluent; keep returning to sources, constraints, and falsifiable checks.`,
      `Learning “${t}” well means you can explain it to a teammate without hype: plain language, limits included.`,
    ],
    machine_learning: [
      `Ground “${t}” in decisions: what label, what horizon, and what metric actually matches the cost of mistakes?`,
      `For “${t}”, separate textbook definitions from deployment realities—data drift, leakage, and measurement shortcuts dominate failures.`,
      `Study “${t}” by asking what baseline beats your model when the world shifts—complexity must earn its keep.`,
      `“${t}” should change how you read metrics: always ask what population the number describes and what it hides.`,
      `Make “${t}” concrete with a toy example: two classes, asymmetric costs, and a threshold choice you can defend.`,
      `Use “${t}” to improve triage: what plot/table would convince you something is wrong before leadership asks?`,
    ],
    chatbots: [
      `Frame “${t}” around user outcomes: what should improve, what must never happen, and how you’ll detect failure early?`,
      `“${t}” is a product design problem first: clarity beats personality; scope beats clever routing.`,
      `When learning “${t}”, specify boundaries—what the bot refuses, what it escalates, and what evidence it needs before acting.`,
      `Treat “${t}” as risk management: transcripts become incidents; write policies as if you’ll review them after a bad week.`,
      `For “${t}”, connect UX language to measurable confusion: where do users loop, stall, or misunderstand intent?`,
      `Study “${t}” with examples from real phrasing—short prompts, vague asks, and emotional users break naive implementations.`,
    ],
    networking: [
      `Learn “${t}” as layered reasoning: name the layer you’re debugging before you jump to “the app is broken.”`,
      `“${t}” should change what evidence you request: logs alone rarely substitute for path checks (DNS/TLS/route/NAT).`,
      `Operationalize “${t}”: write a hypothesis ladder with falsifiers—cheap checks first.`,
      `Use “${t}” to reduce magical thinking about cloud networking: diagrams beat vibes.`,
      `When reviewing “${t}”, separate symptom from cause—throughput vs loss vs DNS vs auth failures sound similar to users.`,
      `Study “${t}” by identifying what changes across VPN/split tunnel/corporate DNS vs home networks.`,
    ],
    cybersecurity: [
      `Treat “${t}” as habits + choke points: small repeatable actions beat one-time “awareness theater.”`,
      `For “${t}”, assume humans are in the loop—policy, friction, and recovery matter as much as tools.`,
      `Ground “${t}” in realistic paths: phishing → creds → SaaS/OAuth reuse; defense is sequential, not magical.`,
      `Learning “${t}” means you can prioritize: what reduces blast radius fastest for your role?`,
      `Make “${t}” actionable: define what you would do in the first 10 minutes after suspicion.`,
      `Study “${t}” through tradeoffs—security UX vs enforcement; backups vs detection; segmentation vs convenience.`,
    ],
    cloud_devops: [
      `Understand “${t}” through ownership boundaries: what the platform guarantees vs what your team still configures.`,
      `For “${t}”, translate concepts into release risk: change windows, rollback owners, and drift.`,
      `Learning “${t}” means better incident trades—speed vs stability vs verification.`,
      `Operationalize “${t}”: pick one service you deploy and map environments + promotion path.`,
      `Study “${t}” by asking what breaks first during deploys—config, migrations, networking, auth.`,
      `Use “${t}” to align teams: shared language for builds, artifacts, environments, and rollbacks.`,
    ],
    monitoring: [
      `Use “${t}” to steer attention: metrics without decisions become noise; start with the decision, then pick signals.`,
      `For “${t}”, practice hypothesis formation—what would you check to discriminate between two plausible causes?`,
      `Learning “${t}” should improve incident comms: separate facts from guesses; timebox updates.`,
      `Treat “${t}” as a reliability habit: alerts, reviews, and follow-through—not dashboard shopping.`,
      `Study “${t}” by choosing one user-visible symptom and linking it to a measurable proxy.`,
      `Operationalize “${t}”: define what “better” means for on-call noise and customer pain.`,
    ],
    content_publishing: [
      `Study “${t}” through audience intent: what should the reader be able to do after consuming the piece?`,
      `For “${t}”, tighten claim hygiene: separate illustration from evidence; prefer specifics over vibes.`,
      `Learning “${t}” means better revision loops—structure first, polish last.`,
      `Treat “${t}” as a workflow problem: repeatable outlines without turning generic.`,
      `Use “${t}” to reduce AI sludge voice: constraints, examples, and lived specifics.`,
      `Operationalize “${t}”: define a publish-blocking checklist aligned to risk (facts, tone, accessibility).`,
    ],
  }
  const base = pick(slug, banks[lib])
  let second = pick(slug + ':2', banks[lib])
  let guard = 0
  while (second === base && guard++ < 8) {
    second = pick(`${slug + ':2'}:${guard}`, banks[lib])
  }
  return second === base ? base : `${base} ${second}`
}

function misconceptionsFor(lib: Lib, slug: string): string[] {
  const m: Record<Lib, string[][]> = {
    ai_foundations: [
      ['“Fluency means factual reliability.”', '“A longer answer is automatically more careful.”'],
      ['“If it cites something, it read it.”', '“You can skip verification for internal drafts.”'],
      ['“Prompt tricks replace source work.”', '“The model understands our private context.”'],
      ['“AI is neutral by default.”', '“Automation removes review responsibility.”'],
    ],
    machine_learning: [
      ['“High accuracy means production-ready.”', '“More features always improves generalization.”'],
      ['“A leaderboard score is the real objective.”', '“Leakage is rare if you shuffle.”'],
      ['“Explainability is optional polish.”', '“Retrain monthly” without diagnosing drift drivers.'],
      ['“Complex models are always better.”', '“Data quantity fixes bad labels.”'],
    ],
    chatbots: [
      ['“Users will read long bot intros.”', '“LLMs make scope unnecessary.”'],
      ['“More FAQs eliminates gaps.”', '“Confidence tone equals correctness.”'],
      ['“Logs are harmless internal text.”', '“Personalization means collecting everything.”'],
      ['“Open-ended bots reduce support load automatically.”', '“Bad CSAT always means bad model.”'],
    ],
    networking: [
      ['“If it loads sometimes, DNS must be fine.”', '“Ping proves the application works.”'],
      ['“One successful path means global health.”', '“Cloud region equals simple networking.”'],
      ['“Hard refresh fixes all caching issues.”', '“TLS errors are always cert expiry.”'],
    ],
    cybersecurity: [
      ['“We are too small to be targeted.”', '“Antivirus equals security program.”'],
      ['“Strong password policy fixes phishing.”', '“IT can tell what happened without logs.”'],
      ['“Encryption means safe sharing.”', '“Internal SaaS cannot leak.”'],
    ],
    cloud_devops: [
      ['“CI/CD guarantees safety.”', '“Infrastructure as code eliminates drift.”'],
      ['“Containers fix reliability.”', '“Dashboards equal operational control.”'],
      ['“Rollback is theoretical.”', '“Everyone owns reliability” with no owners.'],
    ],
    monitoring: [
      ['“Green dashboards mean healthy.”', '“More alerts improves safety.”'],
      ['“Mean latency tells the whole story.”', '“Logs replace tracing.”'],
      ['“Postmortems are paperwork.”', '“Root cause equals one mistake.”'],
    ],
    content_publishing: [
      ['“More words equals authority.”', '“Editing is grammar only.”'],
      ['“Templates kill creativity.”', '“Repurpose means copy-paste everywhere.”'],
      ['“Engagement equals learning outcomes.”', '“Brand voice is just adjectives.”'],
    ],
  }
  const pair = pick(slug, m[lib])
  return pair
}

function workedExampleFor(lib: Lib, lessonTitle: string, slug: string): string {
  const t = lessonTitle
  const banks: Record<Lib, string[]> = {
    ai_foundations: [
      `Pick one deliverable you owe this week and rewrite your checks: what would you verify before sending, specifically because of risks raised by “${t}”?`,
      `Draft a two-step workflow: AI produces a rough pass, humans verify two fragile facts—tie both steps to ideas from “${t}”.`,
      `Imagine a stakeholder believes fluency implies accuracy; use “${t}” to propose a falsification test on their claim.`,
    ],
    machine_learning: [
      `Take a skewed scenario related to “${t}”: write which errors cost more (false positives vs false negatives) and what metric reflects that.`,
      `Sketch a leakage story for “${t}”: what shortcut could inflate metrics, and what split/policy prevents it?`,
      `Describe one chart you’d inspect after training when “${t}” is supposed to improve decisions.`,
    ],
    chatbots: [
      `Write three user utterances that should route differently after learning “${t}”—include one adversarial vague ask.`,
      `Define an escalation trigger tied to “${t}”: what observable cue moves the user to a human?`,
      `Outline a weekly transcript review tag taxonomy aligned to failure modes discussed in “${t}”.`,
    ],
    networking: [
      `Describe an incident narrative where “${t}” helps you reject a wrong root cause early.`,
      `List two minimal checks (read-only) you’d request from ops to validate a hypothesis about “${t}”.`,
      `Explain how “${t}” changes your questions when users say “Wi‑Fi is fine” but only some apps fail.`,
    ],
    cybersecurity: [
      `Turn “${t}” into a 5-bullet response playbook for a suspicious message—no tools fantasies, just decisions.`,
      `Pick one scenario where violating “${t}” creates account takeover risk; name the fastest containment step.`,
      `Explain how you’d coach a teammate after they almost fell for a lure—using language from “${t}”.`,
    ],
    cloud_devops: [
      `Map “${t}” onto one deploy you’ve seen: what guardrail would have reduced blast radius?`,
      `Write a rollback trigger for a change justified by “${t}”—measurable, not vibes.`,
      `Describe how “${t}” affects ownership: who must be reachable during rollout?`,
    ],
    monitoring: [
      `Pick one metric screen and state the decision it supports—tie to “${t}”.`,
      `Draft a short incident update template using distinctions encouraged by “${t}”.`,
      `Explain how you’d prove/disprove a hypothesis about “${t}” with two signals, not twenty.`,
    ],
    content_publishing: [
      `Rewrite one paragraph from a draft to match constraints implied by “${t}”—shorter claims, clearer limits.`,
      `Define a publish gate for your team based on “${t}”: what must be true before ship?`,
      `Give a before/after outline change driven by “${t}” for a specific audience.`,
    ],
  }
  return pick(slug, banks[lib])
}

function revisionFor(lib: Lib, lessonTitle: string, slug: string): string {
  const t = lessonTitle
  return pick(slug, [
    `Without notes, explain “${t}” in two sentences that include a limit or failure mode.`,
    `What is one question you should now ask earlier in projects because you studied “${t}”?`,
    `What would convince you that someone only memorized jargon about “${t}” vs actually understands it?`,
    `Which mistake from this topic would cost your team the most next quarter—and how would you prevent it?`,
  ])
}

function outcomesFor(lib: Lib, lessonTitle: string, slug: string): string[] {
  const t = lessonTitle
  return pick(slug, [
    [`Describe “${t}” in plain language`, `Apply one practice from this lesson to a real task this week`],
    [`Connect “${t}” to a verification step`, `Spot a common trap mentioned in this lesson in a realistic example`],
    [`Explain tradeoffs implied by “${t}”`, `Ask better questions when reviewing outputs influenced by this idea`],
  ])
}

function keywordsFor(lessonTitle: string): string[] {
  const stop = new Set(['the', 'and', 'for', 'with', 'from', 'into', 'your', 'how', 'what', 'when', 'why', 'are', 'not'])
  const words = lessonTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/g)
    .filter((w) => w.length >= 4 && !stop.has(w))
    .slice(0, 6)
  const extra = ['revision', 'learning', 'basics']
  const out = [...words, ...extra]
  const uniq = [...new Set(out)]
  return uniq.slice(0, 10)
}

function buildConcept(row: Row, prevIdInLib: string | null): TeachingConcept {
  const id = `kb-fill-${row.slug}`
  const labs = labsForSlug(row.slug)
  const related = prevIdInLib ? [prevIdInLib] : []
  return {
    id,
    libraryId: row.lib,
    title: row.lessonTitle,
    explanation: explanationFor(row.lib, row.lessonTitle, row.slug),
    keywords: keywordsFor(row.lessonTitle),
    lessonSlugs: [row.slug],
    misconceptions: misconceptionsFor(row.lib, row.slug),
    workedExample: workedExampleFor(row.lib, row.lessonTitle, row.slug),
    revisionAnchor: revisionFor(row.lib, row.lessonTitle, row.slug),
    commonQuestions: [
      `Why does “${row.lessonTitle}” matter in real workflows—not just definitions?`,
      pick(row.slug + 'cq', [
        `What is a common mistake people make right after learning this topic?`,
        `What should you check first if something still “feels off” after applying this lesson?`,
        `How would you explain this topic to a skeptical teammate in one minute?`,
      ]),
    ],
    relatedLabIds: labs,
    capabilityOutcomes: outcomesFor(row.lib, row.lessonTitle, row.slug),
    relatedConceptIds: related,
    kbAnchors: { primaryLessonSlug: row.slug },
  }
}

function emitTs(concepts: TeachingConcept[]): string {
  const header = `import type { TeachingConcept } from './teachingTypes'

/**
 * Curriculum-fill atoms: one grounded concept per previously-uncovered canonical lesson slug.
 * Generated by \`scripts/generate-curriculum-fill-kb.ts\` — do not hand-edit for bulk updates; regenerate.
 */
export const TEACHING_CONCEPTS_CURRICULUM_FILL: TeachingConcept[] = [\n`

  const body = concepts
    .map((c) => {
      const obj = `  {
    id: '${esc(c.id)}',
    libraryId: '${c.libraryId}',
    title: '${esc(c.title)}',
    explanation:
      '${esc(c.explanation)}',
    keywords: [${c.keywords.map((k) => `'${esc(k)}'`).join(', ')}],
    lessonSlugs: [${c.lessonSlugs.map((s) => `'${esc(s)}'`).join(', ')}],
    misconceptions: [${c.misconceptions.map((m) => `'${esc(m)}'`).join(', ')}],
    workedExample:
      '${esc(c.workedExample)}',
    revisionAnchor: '${esc(c.revisionAnchor)}',
    commonQuestions: [${c.commonQuestions.map((q) => `'${esc(q)}'`).join(', ')}],
    relatedLabIds: [${c.relatedLabIds.map((l) => `'${esc(l)}'`).join(', ')}],
    capabilityOutcomes: [${c.capabilityOutcomes.map((o) => `'${esc(o)}'`).join(', ')}],
    relatedConceptIds: [${c.relatedConceptIds.map((r) => `'${esc(r)}'`).join(', ')}],
    kbAnchors: { primaryLessonSlug: '${esc(c.kbAnchors?.primaryLessonSlug ?? c.lessonSlugs[0]!)}' },
  }`
      return obj
    })
    .join(',\n')

  return `${header}${body}\n]\n`
}

function main() {
  const linkedManual = new Set<string>()
  for (const c of TEACHING_CONCEPTS) {
    if (c.id.startsWith('kb-fill-')) continue
    for (const s of c.lessonSlugs) linkedManual.add(s)
  }

  const rows = allRows().filter((r) => !linkedManual.has(r.slug))
  rows.sort((a, b) => (a.lib === b.lib ? a.slug.localeCompare(b.slug) : a.lib.localeCompare(b.lib)))

  const prevByLib = new Map<Lib, string | null>([
    ['ai_foundations', null],
    ['machine_learning', null],
    ['chatbots', null],
    ['networking', null],
    ['cybersecurity', null],
    ['cloud_devops', null],
    ['monitoring', null],
    ['content_publishing', null],
  ])

  const concepts: TeachingConcept[] = []
  for (const row of rows) {
    const prev = prevByLib.get(row.lib) ?? null
    const c = buildConcept(row, prev)
    concepts.push(c)
    prevByLib.set(row.lib, c.id)
  }

  const outPath = resolve(process.cwd(), 'src/data/teaching/teachingKnowledgeBaseCurriculumFill.ts')
  writeFileSync(outPath, emitTs(concepts), 'utf8')
  console.log(`[generate-curriculum-fill-kb] wrote ${concepts.length} concepts → ${outPath}`)
}

main()
