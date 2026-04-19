/**
 * Structured curriculum seed: multi-module mini-courses with deep lesson sections
 * and checkpoint quizzes (deterministic, workspace-safe; no network calls).
 */

import type { LessonPracticeBundle } from './practiceTypes'

export type SeedQuizQuestion = {
  prompt: string
  question_type: 'mcq'
  options_json: string[]
  correct_answer: string
  sort_order: number
  /** Shown after submit in UI when present */
  explanation?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  /** 0-based index of lesson in this module the question reinforces */
  source_lesson_index?: number
}

export type SeedModuleQuiz = {
  title: string
  description: string
  sort_order: number
  questions: SeedQuizQuestion[]
}

export type SeedLesson = {
  title: string
  /** Main instructional body (several paragraphs; markdown-friendly) */
  content: string
  objectives: string
  lesson_summary: string
  practical_example: string
  action_exercise: string
  reflection_prompt: string
  mistakes_to_avoid: string
  takeaway: string
  sort_order: number
  estimated_minutes?: number
  /** Optional structured practice loop (teach → practice → feedback → retry). */
  practice_bundle?: LessonPracticeBundle
}

export type SeedModule = {
  title: string
  description: string
  module_goal: string
  why_it_matters: string
  sort_order: number
  lessons: SeedLesson[]
  quiz: SeedModuleQuiz
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n))
}

function joinParas(...parts: string[]): string {
  return parts.filter(Boolean).join('\n\n')
}

/** Topic-aware labels for variety without AI */
function levelPhrase(skillLevel: string): string {
  const s = skillLevel.toLowerCase()
  if (s.includes('adv')) return 'advanced practitioners'
  if (s.includes('inter')) return 'intermediate learners'
  return 'foundational learners'
}

/**
 * Builds 4 modules × 4 lessons (within 3–5 requirement) with cumulative arc.
 */
export function buildSeedModules(input: {
  planTitle: string
  topic: string | null
  objective: string | null
  skillLevel: string | null
  durationLabel: string | null
}): SeedModule[] {
  const topic = (input.topic ?? input.planTitle).trim() || 'your topic'
  const objective = (input.objective ?? 'apply the ideas in real work').trim()
  const level = (input.skillLevel ?? 'beginner').trim()
  const duration = (input.durationLabel ?? 'self-paced').trim()
  const audience = levelPhrase(level)

  const m0 = moduleFoundations(topic, objective, level, duration, audience)
  const m1 = moduleModels(topic, objective, level, duration, audience)
  const m2 = moduleApplication(topic, objective, level, duration)
  const m3 = moduleSustain(topic, objective, level, duration, audience)

  return [m0, m1, m2, m3]
}

function moduleFoundations(
  topic: string,
  objective: string,
  _level: string,
  duration: string,
  audience: string,
): SeedModule {
  const module_goal =
    `Establish clarity, constraints, and a measurement approach so every later lesson stays anchored to “${topic}” and your objective: ${objective}.`
  const why = `Without a crisp problem statement and outcome, practice drifts. This module prevents “busy work” training.`

  const lessons: SeedLesson[] = [
    lesson(
      0,
      `Define the real problem “${topic}” solves for you`,
      `This lesson orients ${audience} to a concrete situation—not a generic interest in “${topic}”.`,
      joinParas(
        `You are learning “${topic}” for a reason. The most common failure mode is training without a decision: you read, you highlight, and nothing changes in your workflow.`,
        `Start by naming the **situation** (where this shows up), the **stakeholder** (who is affected), and the **constraint** (time, quality, risk, or format). Write 4–6 sentences. Be embarrassingly specific: a real meeting, channel, deliverable, or customer moment.`,
        `Then translate your objective—“${objective}”—into one **observable signal** you can check in a week. Examples: “I publish twice,” “I reduce rework from 3 rounds to 2,” “I can explain my approach in 60 seconds.” If you cannot observe it, rewrite until you can.`,
        `Finally, list **non-goals**: what you will not optimize this month. Non-goals protect focus and prevent scope creep while you build skill.`,
      ),
      `By the end of this lesson you can state a situation-specific problem, an observable weekly signal, and explicit non-goals tied to “${topic}”.`,
      `Example (fill with your details): Situation: launching a product update on Instagram + email. Signal: ship 2 posts + 1 email with consistent messaging. Non-goals: no TikTok experiments this week.`,
      `Draft your problem brief now: situation, stakeholder, constraint, observable signal, and two non-goals.`,
      `What would convince you—honestly—that this plan was worth the time? What would make you quit early?`,
      `Vague objectives (“get better at ${topic}”), copying someone else’s goal, optimizing metrics that don’t map to your real constraint.`,
      `A one-paragraph brief you can reread before each practice session.`,
      22,
    ),
    lesson(
      1,
      `Choose a practice loop you can repeat (${duration})`,
      `Skill comes from repetition with feedback—not marathon sessions.`,
      joinParas(
        `Use a simple loop: **learn → try → review**. “Learn” is a small dose: one idea, one technique, one checklist item. “Try” is application in your real context (even if imperfect). “Review” captures what to keep, what to fix, and the next adjustment.`,
        `Design the loop to fit your calendar. If you only have 20 minutes, make “try” tiny but real: one paragraph, one outline, one conversation opener, one spreadsheet row—something that exists outside your head.`,
        `Add a **quality bar** that prevents fake practice: your output must be usable by another person (even if rough). If it’s only “notes to self,” tighten until someone else could act on it.`,
      ),
      `You can describe your loop in 3 steps with a timebox and a quality bar.`,
      `Loop: 12m learn (one technique) → 25m try (draft outline) → 8m review (3 bullets: keep/fix/next). Quality bar: a teammate could continue the draft.`,
      `Write your 3-step loop with timeboxes for a single weekday session. Include your quality bar in one sentence.`,
      `Where will this loop break first—energy, focus, or context switching? What guardrail prevents that failure next time?`,
      `Skipping review, making “try” too large, or setting a quality bar you won’t honor.`,
      `A pasted-in checklist you can reuse for the next 10 sessions.`,
      20,
    ),
    lesson(
      2,
      `Baseline snapshot: where you are today`,
      `Measure where you are now so later improvements are evidence-based, not vibes.`,
      joinParas(
        `You need a baseline so progress is visible. Pick **two metrics**: one subjective (clarity/confidence 1–5) and one behavioral (counts or frequency).`,
        `Capture a **work sample** if relevant: a past post, email, doc, or ticket that represents your current approach to “${topic}”. Don’t judge it—label what it’s trying to accomplish and where it struggles.`,
        `This baseline is not your identity; it’s a starting coordinate. The plan’s job is to move the coordinate, not to shame it.`,
      ),
      `You have a dated baseline note plus a work sample reference (or an honest “none yet” plan).`,
      `Subjective: clarity 2/5. Behavioral: publish 1x/week. Sample: last launch email (too long; CTA weak).`,
      `Spend 15 minutes creating your baseline note and linking or describing one sample.`,
      `What surprised you when you looked at your sample neutrally—what is one fix that would help most?`,
      `Faking a baseline, choosing vanity metrics, or skipping the sample when it’s uncomfortable.`,
      `A short baseline memo you can compare against in the final module.`,
      18,
    ),
    lesson(
      3,
      `Plan guardrails: ethics, risk, and “good enough”`,
      `Ship responsibly: define risks, a realistic quality bar, and when to escalate.`,
      joinParas(
        `Every topic touches tradeoffs: speed vs quality, personalization vs scale, transparency vs polish. Name the **risks** relevant to “${topic}” in your role (misleading claims, privacy, tone-deaf messaging, overpromising).`,
        `Define **good enough** for this month: a standard that is responsible and shippable, not perfect. Perfectionism is a common sabotage pattern in training—it turns practice into endless prep.`,
        `Finally, write a **stop rule**: when you will pause and ask for help or review (e.g., legal, brand, security).`,
      ),
      `You can name 2 concrete risks, a “good enough” bar, and a stop rule.`,
      `Risk: overclaiming results. Good enough: honest claims + clear scope. Stop rule: anything touching customer promises goes to review.`,
      `List two risks, your “good enough” definition, and a stop rule in bullet form.`,
      `Which risk are you most likely to ignore under deadline pressure—and what will you do about it?`,
      `Treating guardrails as bureaucracy instead of protective design; hiding mistakes instead of learning.`,
      `A guardrail card you keep visible during practice sessions.`,
      16,
    ),
  ]

  const quiz: SeedModuleQuiz = {
    title: `Checkpoint: Foundations — ${topic}`,
    description:
      'Verify you can anchor practice to outcomes, loops, baselines, and guardrails before moving into deeper work.',
    sort_order: 0,
    questions: [
      q(
        0,
        `Which choice best describes a strong practice objective for “${topic}” in this plan?`,
        [
          `An observable signal tied to "${objective}" and your real workflow`,
          `A vague intention to “learn more” with no measurable signal`,
          `Copying someone else’s metric even if it doesn’t fit your constraint`,
          `Optimizing vanity metrics unrelated to your stated objective`,
        ],
        `Observable signals make review honest and prevent fake progress.`,
        0,
        'medium',
      ),
      q(
        1,
        `What is the primary purpose of the learn → try → review loop?`,
        [
          `Small repeated cycles with feedback so skill compounds`,
          `One long cram session with no review`,
          `Consuming content without producing an artifact`,
          `Avoiding feedback to prevent discomfort`,
        ],
        `Compounding requires tight loops; marathons without review rarely transfer.`,
        1,
        'easy',
      ),
      q(
        2,
        `Why capture a baseline sample before deeper modules?`,
        [
          `To measure movement from a real starting point, not a self-story`,
          `To prove you are already an expert`,
          `To avoid practicing entirely`,
          `To replace the need for a practice loop`,
        ],
        `Baselines anchor improvement; without them, you confuse motion with progress.`,
        0,
        'medium',
      ),
      q(
        3,
        `A “good enough” standard primarily protects you from:`,
        [
          `Perfectionism that blocks shipping and learning`,
          `All feedback`,
          `Ethical considerations`,
          `Using a practice loop`,
        ],
        `Good enough is responsible and shippable—still high integrity, not endless polishing.`,
        0,
        'easy',
      ),
    ],
  }

  return {
    title: 'Foundations: outcomes, loops, baselines',
    description: `Clarify what “${topic}” means in your work, install a repeatable loop (${duration}), and set baselines and guardrails.`,
    module_goal,
    why_it_matters: why,
    sort_order: 0,
    lessons,
    quiz,
  }
}

function moduleModels(
  topic: string,
  objective: string,
  level: string,
  _duration: string,
  audience: string,
): SeedModule {
  const module_goal = `Build mental models and criteria so you can judge quality and tradeoffs for “${topic}” instead of relying on taste alone.`
  const why = `Models turn tacit intuition into teachable checks—critical for ${audience}.`

  const lessons: SeedLesson[] = [
    lesson(
      0,
      `Map the moving parts of “${topic}”`,
      `Complex topics feel vague until you name components, inputs, outputs, and feedback loops.`,
      joinParas(
        `Create a simple **system map** for “${topic}” in your context: inputs (data, audience, constraints), process (steps you take), outputs (artifacts, decisions), and feedback (what tells you it worked).`,
        `Keep it one page. Use plain language. The goal is shared understanding with your future self—not a corporate diagram.`,
        `Identify **two leverage points**: places where a small change creates outsized improvement (often upstream: framing, targeting, or structure).`,
      ),
      `You can explain “${topic}” as a system with inputs/outputs and name two leverage points.`,
      `Inputs: audience pain points; Process: outline → draft → edit; Output: post; Feedback: saves/replies. Leverage: stronger hook; clearer CTA.`,
      `Draw your map in bullets (10 minutes). Circle two leverage points and write why they matter.`,
      `Which part of your map is most embarrassing to admit—and what does that reveal about your real bottleneck?`,
      `Treating the topic as “one big thing” with no separable parts.`,
      `A system map you’ll revisit before drafting in the next module.`,
      24,
    ),
    lesson(
      1,
      `Quality rubric: what “good” looks like (for you)`,
      `Replace “I know it when I see it” with explicit criteria you can score.`,
      joinParas(
        `Write a rubric with 5–7 criteria scored 1–5. Include both **substance** (accuracy, relevance, clarity) and **execution** (structure, specificity, call-to-action).`,
        `Weight the top 2 criteria for your objective (“${objective}”). Explain why those weights match your role.`,
        `Add one **anti-criterion**: a thing that looks impressive but misleads (e.g., jargon that sounds smart but confuses customers).`,
      ),
      `You have a weighted rubric aligned to your objective and role.`,
      `Weighted: clarity (30%), relevance (25%), evidence (15%), CTA (15%), tone (15%). Anti-criterion: buzzwords without proof.`,
      `Write your rubric table and weights. Add one anti-criterion with an example.`,
      `Where will you be tempted to score yourself “high” without evidence—how will you counter that?`,
      `Rubrics that only measure surface polish, not outcomes.`,
      `A rubric you can use to review your own drafts in 5 minutes.`,
      22,
    ),
    lesson(
      2,
      `Compare exemplars without copying`,
      `Reverse-engineer structure and persuasion mechanics—without stealing voice or ethics.`,
      joinParas(
        `Pick **two exemplars** relevant to “${topic}” (one you admire, one you dislike but popular). For each, extract: audience assumption, promise, structure, proof style, and CTA pattern.`,
        `Your goal is to **reverse-engineer patterns**, not mimic voice. Note what you refuse to copy and why (brand, ethics, audience).`,
        `Synthesize **three transferable patterns** you will intentionally use this month.`,
      ),
      `You can name patterns separately from voice and refuse unethical mimicry.`,
      `Admired: clear promise + proof + single CTA. Popular-but-weak: clickbait hook + vague body.`,
      `Complete the two-exemplar worksheet and list three patterns you’ll adopt.`,
      `Which pattern is most likely to backfire in your context if applied blindly?`,
      `Plagiarizing voice or making derogatory comparisons instead of structural learning.`,
      `Three adopted patterns + one explicit refusal (what you won’t do).`,
      20,
    ),
    lesson(
      3,
      `Anticipate failure modes for ${level} work`,
      `Prepare for predictable failures so practice doesn’t derail under stress.`,
      joinParas(
        `List the top **six failure modes** for “${topic}” at ${level}: misunderstanding the audience, weak evidence, scope creep, tone mismatch, unclear CTA, and dependency on perfect conditions.`,
        `For each, write a **pre-mortem**: if this fails next week, what was the earliest warning sign?`,
        `Pick **two mitigations** you will build into your practice loop (checklists, peer review triggers, templates).`,
      ),
      `You have a pre-mortem list with mitigations tied to practice.`,
      `Failure: vague audience → mitigation: 3-bullet persona before drafting.`,
      `Write six failure modes with early warnings + two mitigations you’ll actually use.`,
      `Which failure mode is your “default failure” under stress?`,
      `Only listing external blockers, not your own predictable mistakes.`,
      `A pre-mortem sheet stored next to your rubric.`,
      20,
    ),
  ]

  const quiz: SeedModuleQuiz = {
    title: `Checkpoint: Models & criteria — ${topic}`,
    description: 'Confirm you can use structure, rubrics, and exemplars to judge quality and avoid common failure modes.',
    sort_order: 0,
    questions: [
      q(
        0,
        `What is the main benefit of a system map for “${topic}”?`,
        [
          `It separates inputs, process, outputs, and feedback so you can target leverage`,
          `It replaces the need for practice`,
          `It guarantees viral results`,
          `It removes the need for ethics`,
        ],
        `Maps reveal where small changes matter; they don’t replace doing the work.`,
        0,
        'medium',
      ),
      q(
        1,
        `A rubric is most useful when:`,
        [
          `It reflects your objective and role, not generic “quality vibes”`,
          `It has 30 criteria`,
          `It avoids any subjective judgment`,
          `It focuses only on grammar`,
        ],
        `Rubrics align evaluation to what you’re actually trying to improve.`,
        0,
        'easy',
      ),
      q(
        2,
        `Why study exemplars you dislike?`,
        [
          `To identify popular patterns you choose not to replicate`,
          `To plagiarize voice`,
          `To prove you are smarter`,
          `To avoid ever reading competitors`,
        ],
        `Contrast clarifies choices; ethical practice copies structure, not identity.`,
        0,
        'medium',
      ),
      q(
        3,
        `A pre-mortem is primarily:`,
        [
          `Identifying early warning signs of likely failures before they happen`,
          `Blaming teammates`,
          `Avoiding risk entirely`,
          `Skipping review`,
        ],
        `Pre-mortems make mitigations concrete and timely.`,
        0,
        'easy',
      ),
    ],
  }

  return {
    title: 'Mental models, rubrics, and exemplars',
    description: `Turn “${topic}” into inspectable parts, explicit quality criteria, and transferable patterns.`,
    module_goal,
    why_it_matters: why,
    sort_order: 1,
    lessons,
    quiz,
  }
}

function moduleApplication(topic: string, objective: string, _level: string, duration: string): SeedModule {
  const module_goal = `Produce real artifacts about “${topic}” that demonstrate progress toward: ${objective}.`
  const why = `Application is where learning becomes performance. This module forces outputs, not intentions.`

  const lessons: SeedLesson[] = [
    lesson(
      0,
      `Design a real deliverable spec (scope + acceptance tests)`,
      `Turn intent into a shippable unit of work: a spec with acceptance tests so “done” is observable.`,
      joinParas(
        `Choose one deliverable you will ship this week that relates to “${topic}”. Write a **spec**: purpose, audience, format, length, success criteria, and deadline.`,
        `Add **acceptance tests**: 3 checks someone else could use to say “meets spec” (e.g., “contains one proof point,” “CTA is singular,” “reads at grade 8–10”).`,
        `Explicitly tie the deliverable to your objective: ${objective}. If it doesn’t fit, revise the spec until it does.`,
      ),
      `You have a one-page spec with acceptance tests aligned to your objective.`,
      `Spec: 300-word launch post + 3 bullets product value + 1 CTA; tests: promise in first 2 lines; evidence; single CTA.`,
      `Write your spec + acceptance tests. Timebox: 20 minutes.`,
      `What part of the spec are you avoiding because it’s hard to measure?`,
      `Acceptance tests that are feelings (“sounds good”) instead of checks.`,
      `A spec you can pin at the top of your draft document.`,
      22,
    ),
    lesson(
      1,
      `First full attempt: draft under real constraints`,
      `Ship a complete draft to spec—imperfect but real—so you can review substance, not intentions.`,
      joinParas(
        `Produce the full draft to spec. Use your rubric from Module 2. If you get stuck, constrain further: smaller scope, tighter audience, shorter length.`,
        `While drafting, mark **decisions** in comments: why this headline, why this structure, what you rejected.`,
        `Stop at “good enough,” not perfect—per your guardrails from Module 1.`,
      ),
      `A complete draft that matches your spec (even if imperfect).`,
      `Draft with comments noting rejected alternatives—shows thinking, not just text.`,
      `Complete the draft in one session. If blocked, reduce scope once, then ship the smaller version.`,
      `What decision are you most uncertain about—and what evidence would resolve it?`,
      `Endless outlining, hiding the draft, or expanding scope mid-session.`,
      `Draft v1 with decision comments in-line.`,
      26,
    ),
    lesson(
      2,
      `Self-review with rubric + red-team pass`,
      `Strengthen credibility by attacking your own claims before anyone else does.`,
      joinParas(
        `Score your draft against the rubric. Then do a **red-team** pass: attack your own claims. Where would a skeptical reader object? Where is proof thin? Where is the CTA confusing?`,
        `Rewrite only the highest-impact 20%—usually the opening, the proof, and the CTA.`,
        `If possible, add **one piece of evidence** you didn’t include initially (metric, quote, screenshot description, example).`,
      ),
      `You have scores, red-team notes, and a targeted rewrite plan.`,
      `Red-team: “Proof is anecdotal” → add numeric before/after + tighten claim language.`,
      `Run rubric scoring + red-team. List three edits you will make now.`,
      `What claim are you emotionally attached to that the red-team weakened?`,
      `Self-review that only fixes typos while ignoring structure.`,
      `Red-team notes appended to the draft header.`,
      20,
    ),
    lesson(
      3,
      `Optional micro-test: get signal fast`,
      `Replace guessing with lightweight feedback from reality—small exposure, fast learning.`,
      joinParas(
        `Run the smallest test that yields learning: share with a trusted peer, post to a limited audience, run a dry-run meeting, or simulate a customer conversation.`,
        `Capture **signals**: what landed, what confused, what questions appeared. Translate signals into the next edit—not a full rewrite unless warranted.`,
        `Close with a **next iteration** note: what you will change in the next cycle (${duration}).`,
      ),
      `You have feedback signals and a single next iteration, not vague “more polish.”`,
      `Signals: questions on pricing confusion → clarify offer framing; keep CTA.`,
      `Run a micro-test and log signals + one next iteration.`,
      `What feedback stung—and was it still useful?`,
      `Ignoring confusing questions because they contradict your assumptions.`,
      `A feedback log entry with timestamp.`,
      22,
    ),
  ]

  const quiz: SeedModuleQuiz = {
    title: `Checkpoint: Application — ${topic}`,
    description: 'Check understanding of specs, drafting discipline, self-review, and micro-tests.',
    sort_order: 0,
    questions: [
      q(
        0,
        `Why are acceptance tests part of the deliverable spec?`,
        [
          `They define “done” in a way others can verify`,
          `They replace the need for a draft`,
          `They guarantee popularity`,
          `They remove constraints`,
        ],
        `Acceptance tests reduce ambiguity and prevent endless subjective tweaking.`,
        0,
        'medium',
      ),
      q(
        1,
        `What is the main goal of a red-team self-review?`,
        [
          `Find the weakest claims and fix highest-impact gaps`,
          `Make the draft longer`,
          `Remove all personality`,
          `Avoid shipping`,
        ],
        `Red-teaming targets credibility and clarity under skepticism.`,
        0,
        'medium',
      ),
      q(
        2,
        `A “micro-test” is valuable because:`,
        [
          `It produces real-world signals quickly`,
          `It removes the need for a rubric`,
          `It replaces practice loops`,
          `It ensures no criticism`,
        ],
        `Small tests reduce guesswork and guide the next iteration.`,
        0,
        'easy',
      ),
      q(
        3,
        `Which behavior best matches “good enough” during drafting?`,
        [
          `Ship a complete draft to spec, then improve with evidence`,
          `Wait until inspiration strikes`,
          `Expand scope whenever new ideas appear`,
          `Avoid comments or decisions in the draft`,
        ],
        `Good enough ships and learns; inspiration-only workflows stall.`,
        0,
        'medium',
      ),
    ],
  }

  return {
    title: 'Applied practice: specs, drafts, tests',
    description: `Ship artifacts about “${topic}” with specs, disciplined drafting, and fast feedback loops (${duration}).`,
    module_goal,
    why_it_matters: why,
    sort_order: 2,
    lessons,
    quiz,
  }
}

function moduleSustain(
  topic: string,
  objective: string,
  _level: string,
  _duration: string,
  audience: string,
): SeedModule {
  const module_goal = `Consolidate gains, compare against your baseline, and install habits so “${topic}” sticks after the plan.`
  const why = `Without sustain habits, you relapse to old patterns when workload spikes.`

  const lessons: SeedLesson[] = [
    lesson(
      0,
      `Compare outcomes to baseline (honest scorecard)`,
      `Measure real movement using the baseline you captured earlier—evidence over story.`,
      joinParas(
        `Revisit your Module 1 baseline. Rate the same subjective metric again. Compare behavioral frequency counts. Reference your best artifact from Module 3.`,
        `Write a **scorecard**: what improved, what didn’t, and why you believe the change is real (evidence).`,
        `If improvement is small, that’s data—adjust the loop rather than judge yourself.`,
      ),
      `You have a before/after scorecard with evidence references.`,
      `Clarity 2→4; publish frequency 1→2x/week; artifact: stronger CTA + proof.`,
      `Complete the scorecard with evidence links or descriptions.`,
      `If you didn’t improve much, what single constraint blocked you most?`,
      `Claiming improvement without evidence or moving goalposts.`,
      `A dated scorecard saved next to your baseline.`,
      18,
    ),
    lesson(
      1,
      `Turn learnings into a personal playbook (1 page)`,
      `Compress what worked into a reusable operating system—not a long essay.`,
      joinParas(
        `Summarize **your** playbook for “${topic}”: default structure, checklist, common mistakes you make, and your top 3 patterns from Module 2.`,
        `Add **when to escalate**: brand/legal/reviewer triggers.`,
        `This playbook is your portable training—not generic internet advice.`,
      ),
      `A one-page playbook you can reuse weekly.`,
      `Playbook sections: preflight checklist → draft steps → review triggers → escalation rules.`,
      `Write the one-pager in 25 minutes. Keep it short.`,
      `What will you forget under stress unless it’s in the playbook?`,
      `Playbooks that are too long to use during real work.`,
      `A playbook stored where you actually see it (calendar note, doc pin, etc.).`,
      20,
    ),
    lesson(
      2,
      `Habit design: cues, routines, rewards`,
      `Make practice inevitable on busy weeks—cues, minimums, and honest rewards.`,
      joinParas(
        `Pick a **cue** tied to an existing habit (Monday planning, Friday retro, start-of-day standup). Attach your practice loop to that cue.`,
        `Define a **minimum viable session** (10–15 minutes) for busy weeks so the habit doesn’t break.`,
        `Choose a **reward** that isn’t fake (completion log, streak count, peer share)—something that reinforces identity: “I’m someone who ships.”`,
      ),
      `You have cue + minimum session + reward defined.`,
      `Cue: after weekly planning; minimum: 12m review + 15m try; reward: log + share with peer.`,
      `Fill in cue/minimum/reward. Schedule two weeks of calendar blocks.`,
      `What usually breaks your habits—travel, meetings, or avoidance?`,
      `Relying on motivation instead of cues and minimums.`,
      `A two-week calendar plan with minimums.`,
      16,
    ),
    lesson(
      3,
      `Next horizon: stretch goal without losing integrity`,
      `Choose ambition that compounds skill without breaking trust or sustainability.`,
      joinParas(
        `Choose a **next stretch** aligned with ${objective}: harder audience, tighter constraint, bigger artifact, or teaching someone else (teaching reveals gaps).`,
        `Define what would constitute **harm** if you pursued the stretch carelessly (burnout, misleading claims, brand risk). Write mitigations.`,
        `Close the plan with a **90-day milestone** that is ambitious but measurable.`,
      ),
      `You have a stretch goal, harm analysis, and a 90-day milestone.`,
      `Stretch: teach a teammate the playbook; harm: oversimplifying → mitigation: disclaimers + examples.`,
      `Write stretch + harms + 90-day milestone.`,
      `What would make you proud of this plan in three months—evidence-based, not vibes?`,
      `Stretch goals that ignore guardrails or workload reality.`,
      `A 90-day milestone statement you can revisit monthly.`,
      20,
    ),
  ]

  const quiz: SeedModuleQuiz = {
    title: `Checkpoint: Sustain & stretch — ${topic}`,
    description: 'Validate habits, scorecards, playbooks, and safe stretch goals.',
    sort_order: 0,
    questions: [
      q(
        0,
        `Why compare results to a baseline instead of only relying on how you feel?`,
        [
          `Feelings drift; baselines anchor evidence of change`,
          `Feelings are always accurate`,
          `Baselines prevent all mistakes`,
          `Baselines remove the need for habits`,
        ],
        `Evidence reduces self-deception and guides adjustments.`,
        0,
        'easy',
      ),
      q(
        1,
        `A personal playbook is most useful when it:`,
        [
          `Is short, actionable, and tied to your real workflow`,
          `Repeats generic advice from the internet`,
          `Replaces practice entirely`,
          `Is 20 pages long`,
        ],
        `Playbooks work when they’re used—brevity and specificity matter.`,
        0,
        'medium',
      ),
      q(
        2,
        `What is the role of a “minimum viable session”?`,
        [
          `Keeps the habit alive during busy weeks`,
          `Ensures you never do deep work`,
          `Replaces quality`,
          `Removes review`,
        ],
        `Minimums prevent all-or-nothing collapse.`,
        0,
        'easy',
      ),
      q(
        3,
        `When setting a stretch goal, why analyze potential harms?`,
        [
          `To prevent reckless tradeoffs that break trust or sustainability`,
          `To avoid any ambition`,
          `To eliminate metrics`,
          `To guarantee success`,
        ],
        `Integrity and sustainability are part of performance, not extras.`,
        0,
        'medium',
      ),
    ],
  }

  return {
    title: 'Review, habits, and next horizon',
    description: `Score progress, write your playbook, install cues/minimums, and choose a safe stretch aligned to ${audience} work on “${topic}”.`,
    module_goal,
    why_it_matters: why,
    sort_order: 3,
    lessons,
    quiz,
  }
}

function lesson(
  sort_order: number,
  title: string,
  lesson_summary: string,
  content: string,
  objectives: string,
  practical_example: string,
  action_exercise: string,
  reflection_prompt: string,
  mistakes_to_avoid: string,
  takeaway: string,
  estimated_minutes: number,
): SeedLesson {
  return {
    title,
    content,
    objectives,
    lesson_summary,
    practical_example,
    action_exercise,
    reflection_prompt,
    mistakes_to_avoid,
    takeaway,
    sort_order,
    estimated_minutes: clamp(estimated_minutes, 12, 35),
  }
}

function q(
  sort_order: number,
  prompt: string,
  options: [string, string, string, string],
  explanation: string,
  source_lesson_index: number,
  difficulty: 'easy' | 'medium' | 'hard',
): SeedQuizQuestion {
  return {
    prompt,
    question_type: 'mcq',
    options_json: [...options],
    correct_answer: '0',
    sort_order,
    explanation,
    difficulty,
    source_lesson_index,
  }
}

