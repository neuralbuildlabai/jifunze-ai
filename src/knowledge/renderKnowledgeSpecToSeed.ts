import type { SeedLesson, SeedModule, SeedModuleQuiz, SeedQuizQuestion } from '../training/seedStructure'
import { buildLessonPracticeBundle } from './lessonPracticeFromSpec'
import type { LessonKnowledgeBlueprint, ModuleKnowledgeBlueprint, TrainingKnowledgeSpec } from './types'

function joinParas(...parts: string[]): string {
  return parts.filter(Boolean).join('\n\n')
}

function conceptLabels(spec: TrainingKnowledgeSpec, ids: string[]): string[] {
  const map = new Map(spec.concepts.map((c) => [c.id, c]))
  return ids.map((id) => map.get(id)?.label ?? id)
}

function misTexts(spec: TrainingKnowledgeSpec, ids: string[]): string[] {
  const map = new Map(spec.misconceptions.map((m) => [m.id, m]))
  return ids.map((id) => map.get(id)?.myth ?? '')
}

function misconceptionBlocks(spec: TrainingKnowledgeSpec, ids: string[]): string[] {
  const map = new Map(spec.misconceptions.map((m) => [m.id, m]))
  const out: string[] = []
  for (const id of ids) {
    const m = map.get(id)
    if (!m) continue
    out.push(
      joinParas(
        `**${m.myth}**`,
        `**Correction:** ${m.correction}`,
        `**Why this trips people up:** without observable signals tied to your objective, you can rehearse often and still avoid real improvement.`,
      ),
    )
  }
  return out
}

function misconceptionSummaryLines(spec: TrainingKnowledgeSpec, ids: string[]): string[] {
  const map = new Map(spec.misconceptions.map((m) => [m.id, m]))
  const out: string[] = []
  for (const id of ids) {
    const m = map.get(id)
    if (!m) continue
    out.push(`- **Avoid believing:** ${m.myth} **Instead:** ${m.correction}`)
  }
  return out
}

function conceptsForLesson(spec: TrainingKnowledgeSpec, ids: string[]) {
  const map = new Map(spec.concepts.map((c) => [c.id, c]))
  const out: typeof spec.concepts = []
  for (const id of ids) {
    const c = map.get(id)
    if (c) out.push(c)
  }
  return out
}

function scenarioBlocks(spec: TrainingKnowledgeSpec, ids: string[]): string[] {
  const map = new Map(spec.scenarios.map((s) => [s.id, s]))
  return ids.map((id) => {
    const s = map.get(id)
    return s ? `**Context:** ${s.context}\n\n**Success criteria:** ${s.success_criteria}` : ''
  })
}

function levelAddendum(level: TrainingKnowledgeSpec['domain']['learner_level']): string {
  if (level === 'beginner') {
    return `At **beginner** depth: prioritize clear definitions, small safe attempts, and frequent checkpoints.`
  }
  if (level === 'intermediate') {
    return `At **intermediate** depth: prioritize tradeoffs, evidence quality, and integration across lessons.`
  }
  return `At **advanced** depth: prioritize synthesis, risk management, and teaching/transfer to others.`
}

function renderLesson(
  spec: TrainingKnowledgeSpec,
  mod: ModuleKnowledgeBlueprint,
  les: LessonKnowledgeBlueprint,
): SeedLesson {
  const labels = conceptLabels(spec, les.concept_ids)
  const conceptsDetail = conceptsForLesson(spec, les.concept_ids)
  const myths = misTexts(spec, les.misconception_ids).filter(Boolean)
  const mythBlocks = misconceptionBlocks(spec, les.misconception_ids)
  const scen = scenarioBlocks(spec, les.scenario_ids).filter(Boolean)

  const conceptLines = conceptsDetail.map((c) => {
    const exam = c.exam_relevance?.trim()
    return exam
      ? `- **${c.label}** — Exam/certificate angle: ${exam}`
      : `- **${c.label}** — Ask: what would *evidence* look like if you understood this in your workflow?`
  })

  const outcomesChecklist = joinParas(
    `- State how this lesson advances **${spec.domain.objective}** for **${spec.domain.topic}** in one sentence.`,
    `- Apply at least one core idea to a **named stakeholder moment** (channel, meeting, artifact, or deadline—not “in general”).`,
    `- Produce **one artifact fragment** (bullets, checklist, or paragraph) a teammate could continue without guessing your intent.`,
  )

  const lesson_summary = joinParas(
    les.learning_intent,
    levelAddendum(spec.domain.learner_level),
    labels.length ? `**Core ideas**\n${labels.map((l) => `- ${l}`).join('\n')}` : '',
    `**Outcome focus:** connect **${spec.domain.topic}** to **${spec.domain.objective}** with one verifiable artifact and one signal you’d trust—not vibes.`,
  )

  const guidedSteps = joinParas(
    `1. **Orient:** restate the decision you’re trying to improve in your own words (avoid buzzwords).`,
    `2. **Model:** connect each core idea below to one concrete input, one constraint, and one output you control this week.`,
    scen.length ? `3. **Apply:** use the scenario to force specificity—rewrite vague plans into checks someone else could verify.` : `3. **Apply:** translate the ideas into a tiny artifact with acceptance checks (even if rough).`,
    `4. **Self-check:** list two ways your plan could fail, and what signal would tell you early.`,
  )

  const workedMini = joinParas(
    `**Worked reasoning pattern (repeatable):**`,
    `- Situation → Constraint → Decision → Verification signal.`,
    `- Keep each box to **one sentence** so you can’t hide vagueness behind length.`,
    scen[0]
      ? `**Try it on your scenario:** paste your situation line under *Situation*, then fill the rest without adding new scope.`
      : `**Try it cold:** pick the smallest real deliverable tied to ${spec.domain.topic} and run the four-box chain.`,
  )

  const content = joinParas(
    `### What you’re building toward`,
    `This lesson supports your objective: **${spec.domain.objective}** within **${spec.domain.topic}**.`,
    mod.module_goal
      ? `**Module thread:** ${mod.module_goal} (${mod.why_it_matters || 'why this module exists'})`
      : '',
    `### What you should be able to do after this`,
    outcomesChecklist,
    labels.length ? `### Concepts to internalize\n${conceptLines.join('\n')}` : '',
    `### Guided instruction`,
    guidedSteps,
    workedMini,
    scen.length ? `### Applied scenario\n${scen.join('\n\n')}` : '',
    mythBlocks.length
      ? `### Misconceptions to confront\n${mythBlocks.join('\n\n')}`
      : '',
    `### Self-check before you move on`,
    `- If you deleted every adjective from your notes, would the plan still stand up?`,
    `- Could a skeptical reviewer reject your “success” definition—and if so, how would you tighten it?`,
    `### Exam-style / high-stakes framing (informational)`,
    mod.module_goal
      ? `Connect this lesson back to the module goal: ${mod.module_goal}. This reflects coverage inside your plan—not a guarantee you meet an external exam body’s objectives.`
      : `External exams use their own blueprints; use official syllabi alongside these checkpoints when credentials matter.`,
  )

  const practical_example = scen[0] ?? `Example: translate one concept into a 5-bullet outline you could share with a peer.`

  const action_exercise = joinParas(
    `**Do this now (15–25 minutes):**`,
    `- Write a short artifact tied to ${spec.domain.topic} (outline, checklist, draft paragraph, or decision memo).`,
    `- Mark **3 decision points** in comments: what you rejected, what you prioritized instead, and what evidence would change your mind.`,
    `- End with **one verification step** you will run in the next 48 hours (even if tiny).`,
  )

  const reflection_prompt = joinParas(
    `What is still fuzzy after this lesson—**one specific question** you need answered next?`,
    myths.length
      ? `Which misconception felt most “true” before this lesson, and what would falsify it in your next work session? (${myths[0]})`
      : `What would a skeptical reviewer challenge first in your draft?`,
  )

  const mistakeSummaries = misconceptionSummaryLines(spec, les.misconception_ids)
  const mistakes_to_avoid = joinParas(
    ...(mistakeSummaries.length
      ? mistakeSummaries
      : [
          `Avoid vague practice with no artifact; avoid skipping review after each try; avoid success criteria that only feel true.`,
        ]),
  )

  const objectives = joinParas(
    `Explain how ${labels[0] ?? spec.domain.topic} connects to ${spec.domain.objective} with at least one concrete stakeholder or artifact.`,
    `Produce one tangible micro-artifact that another person could act on without your context.`,
  )

  const takeaway = joinParas(
    `You should leave with: (1) **tighter language** for ${labels.slice(0, 2).join(' + ') || spec.domain.topic}, and (2) **one scheduled repetition** with a verification signal—not just “more practice.”`,
  )

  const estimated =
    les.cognitive_load === 'foundational' ? 20 : les.cognitive_load === 'integrative' ? 24 : 28

  const practice_bundle = buildLessonPracticeBundle(spec, mod, les)

  return {
    title: les.title,
    content,
    objectives,
    lesson_summary,
    practical_example,
    action_exercise,
    reflection_prompt,
    mistakes_to_avoid,
    takeaway,
    sort_order: les.sort_order,
    estimated_minutes: estimated,
    practice_bundle,
  }
}

function renderQuiz(mod: ModuleKnowledgeBlueprint): SeedModuleQuiz {
  const questions: SeedQuizQuestion[] = mod.quiz.questions.map((q) => ({
    prompt: q.probes,
    question_type: 'mcq',
    options_json: [...q.options],
    correct_answer: '0',
    sort_order: q.sort_order,
    explanation: q.explanation,
    difficulty: q.difficulty,
    source_lesson_index: q.source_lesson_index,
  }))
  return {
    title: mod.quiz.title,
    description: mod.quiz.description,
    sort_order: 0,
    questions,
  }
}

/** Converts a validated knowledge spec into the transactional seed shape consumed by `create_training_plan_from_seed`. */
export function renderKnowledgeSpecToSeedModules(spec: TrainingKnowledgeSpec): SeedModule[] {
  return spec.modules.map((m) => ({
    title: m.title,
    description: m.description,
    module_goal: m.module_goal,
    why_it_matters: m.why_it_matters,
    sort_order: m.sort_order,
    lessons: m.lessons.map((l) => renderLesson(spec, m, l)),
    quiz: renderQuiz(m),
  }))
}
