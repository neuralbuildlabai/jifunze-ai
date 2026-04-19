import { defaultReadinessArchitecture } from './readinessArchitecture'
import { KNOWLEDGE_SPEC_VERSION, type LearnerLevel, type TrainingKnowledgeSpec } from './types'

function normLevel(skillLevel: string | null | undefined): LearnerLevel {
  const s = (skillLevel ?? 'beginner').toLowerCase()
  if (s.includes('adv')) return 'advanced'
  if (s.includes('inter')) return 'intermediate'
  return 'beginner'
}

function joinLines(...parts: string[]): string {
  return parts.filter(Boolean).join('\n\n')
}

/**
 * Deterministic **knowledge graph** from the learner brief. This is the boundary between
 * “generic templates” and “domain-shaped” content: all downstream lessons/quizzes are rendered
 * from this structure (see {@link renderKnowledgeSpecToSeedModules}).
 */
export function buildHeuristicKnowledgeSpec(input: {
  planTitle: string
  topic: string | null
  objective: string | null
  skillLevel: string | null
  durationLabel: string | null
}): TrainingKnowledgeSpec {
  const topic = (input.topic ?? input.planTitle).trim() || 'your topic'
  const objective = (input.objective ?? 'apply the ideas in real work').trim()
  const level = normLevel(input.skillLevel)
  const duration = (input.durationLabel ?? 'self-paced').trim()

  const concepts = [
    {
      id: 'c1',
      label: `What “${topic}” means in your work context`,
      depends_on: [] as string[],
      exam_relevance: `Be ready to define ${topic} as an outcome a stakeholder could recognize—not a vibe.`,
    },
    {
      id: 'c2',
      label: `Constraints and success signals for ${topic}`,
      depends_on: ['c1'],
      exam_relevance: `Be ready to list constraints + success signals aligned to: ${objective}.`,
    },
    {
      id: 'c3',
      label: `Measurement and baseline for ${topic}`,
      depends_on: ['c2'],
      exam_relevance: `Be ready to show a baseline artifact/metric and what “better” would mean next week.`,
    },
    {
      id: 'c4',
      label: `Mental model of how ${topic} fits your workflow`,
      depends_on: ['c1'],
      exam_relevance: `Be ready to diagram inputs → process → outputs → feedback with one leverage point.`,
    },
    {
      id: 'c5',
      label: `Quality criteria and tradeoffs for ${topic}`,
      depends_on: ['c4'],
      exam_relevance: `Be ready to defend tradeoffs with criteria tied to ${objective} (not generic taste).`,
    },
    {
      id: 'c6',
      label: `Failure modes and mitigations for ${topic}`,
      depends_on: ['c5'],
      exam_relevance: `Be ready to name two credible failure modes and a mitigation you’d actually run.`,
    },
    {
      id: 'c7',
      label: `Specification and acceptance tests for ${topic} outputs`,
      depends_on: ['c2', 'c5'],
      exam_relevance: `Be ready to write “done” checks an independent reviewer can execute.`,
    },
    {
      id: 'c8',
      label: `Drafting and iteration under real constraints`,
      depends_on: ['c7'],
      exam_relevance: `Be ready to ship an accountable draft and iterate from evidence—not mood.`,
    },
    {
      id: 'c9',
      label: `Evidence, feedback, and red-teaming for ${topic}`,
      depends_on: ['c8'],
      exam_relevance: `Be ready to attack your weakest claim and revise the highest-impact gap first.`,
    },
    {
      id: 'c10',
      label: `Micro-tests and learning signals`,
      depends_on: ['c9'],
      exam_relevance: `Be ready to propose the smallest test that falsifies a key assumption cheaply.`,
    },
    {
      id: 'c11',
      label: `Scorecards, habits, and sustainment`,
      depends_on: ['c3', 'c10'],
      exam_relevance: `Be ready to describe cues, minimum sessions, and what your scorecard tracks weekly.`,
    },
    {
      id: 'c12',
      label: `Stretch goals, risk, and integrity`,
      depends_on: ['c6', 'c11'],
      exam_relevance: `Be ready to pair ambition with harms analysis—trust and sustainability included.`,
    },
  ]

  const misconceptions = [
    {
      id: 'm1',
      myth: `“${topic}” is only about inspiration, not measurable outcomes.`,
      correction: `Treat ${topic} as a skill with observable signals tied to: ${objective}.`,
      related_concept_ids: ['c1', 'c2'],
    },
    {
      id: 'm2',
      myth: `More reading always equals better ${topic} performance.`,
      correction: `Learning transfers through repeated practice loops with feedback, not consumption alone.`,
      related_concept_ids: ['c4', 'c8'],
    },
    {
      id: 'm3',
      myth: `If the output feels clever, it must be good enough.`,
      correction: `Use explicit criteria and skeptical review—especially for claims and evidence.`,
      related_concept_ids: ['c5', 'c9'],
    },
    {
      id: 'm4',
      myth: `Once you finish a course, you don’t need habits.`,
      correction: `Sustainment requires cues, minimum sessions, and periodic review.`,
      related_concept_ids: ['c11', 'c12'],
    },
  ]

  const scenarios = [
    {
      id: 's1',
      context: `A real work moment where ${topic} affects a stakeholder decision.`,
      success_criteria: `You can state the outcome and constraints in one paragraph.`,
      related_concept_ids: ['c1', 'c2'],
    },
    {
      id: 's2',
      context: `A draft or artifact you must ship this week that depends on ${topic}.`,
      success_criteria: `Someone else can continue your work or act on your output.`,
      related_concept_ids: ['c7', 'c8'],
    },
    {
      id: 's3',
      context: `A skeptical review of your work (peer, manager, or customer question).`,
      success_criteria: `You can answer objections with evidence and revise the highest-impact 20%.`,
      related_concept_ids: ['c9', 'c10'],
    },
    {
      id: 's4',
      context: `A busy week where time is scarce but practice still matters.`,
      success_criteria: `You still run a minimum viable session tied to your cue.`,
      related_concept_ids: ['c11', 'c12'],
    },
  ]

  const levelDepth = {
    beginner: { label: 'foundational' as const, exam: 'Focus on definitions, baselines, and safe practice loops.' },
    intermediate: { label: 'integrative' as const, exam: 'Focus on tradeoffs, criteria, and evidence quality.' },
    advanced: { label: 'synthesis' as const, exam: 'Focus on synthesis, risk, and teaching others.' },
  }[level]

  const modules = [
    mkModule(0, 'Foundations: context, constraints, baselines', {
      goal: `Anchor ${topic} to your objective (${objective}) with measurable signals.`,
      why: `Without a crisp problem statement, practice becomes busywork.`,
      lessons: [
        {
          title: `Define the problem “${topic}” solves for you`,
          intent: `Connect ${topic} to a real stakeholder situation and non-goals.`,
          concepts: ['c1', 'c2'],
          mis: ['m1'],
          scenarios: ['s1'],
          load: 'foundational' as const,
        },
        {
          title: `Choose a practice loop you can repeat (${duration})`,
          intent: `Install learn→try→review with a quality bar.`,
          concepts: ['c2'],
          mis: ['m2'],
          scenarios: ['s1'],
          load: 'foundational' as const,
        },
        {
          title: `Baseline snapshot: where you are today`,
          intent: `Capture metrics and a sample work artifact.`,
          concepts: ['c3'],
          mis: [],
          scenarios: ['s1'],
          load: 'foundational' as const,
        },
        {
          title: `Guardrails: ethics, risk, and “good enough”`,
          intent: `Name risks, stop rules, and a responsible quality bar.`,
          concepts: ['c2', 'c5'],
          mis: [],
          scenarios: ['s1'],
          load: 'integrative' as const,
        },
      ],
      quiz: [
        {
          probes: `Scenario: your manager asks, “How will we know ${topic} work is improving?” Which answer is strongest?`,
          concepts: ['c1', 'c2'],
          diff: 'medium' as const,
          opts: [
            `Name one observable signal tied to ${objective} that you can track weekly in your real workflow`,
            `Promise intensity: “I’ll study harder” without defining what changes in outputs`,
            `Borrow a KPI from another team because it sounds rigorous`,
            `Track likes or optics because they’re easy to screenshot`,
          ],
          explain: `Signals must map to your objective and be observable in your workflow—otherwise “progress” becomes storytelling. Wrong answers sound plausible because they optimize comfort, prestige, or generic best practices.`,
          lessonIdx: 0,
        },
        {
          probes: `You have 30 minutes this week for ${topic}. Which plan best matches learn→try→review?`,
          concepts: ['c2'],
          diff: 'medium' as const,
          opts: [
            `Ship a tiny artifact, reflect on what failed, adjust one variable, repeat next session`,
            `Finish a long module in one sitting so you can “check the box”`,
            `Bookmark resources and postpone output until you feel inspired`,
            `Avoid feedback because iteration might contradict your first draft`,
          ],
          explain: `Transfer comes from producing, getting signal, and changing behavior—not from marathon consumption. The distractors mimic common workplace scheduling pressures but skip the feedback loop.`,
          lessonIdx: 1,
        },
        {
          probes: `Before investing weeks in deeper modules, why capture a baseline snapshot for ${topic}?`,
          concepts: ['c3'],
          diff: 'medium' as const,
          opts: [
            `So improvements can be compared against a real starting point—not feelings or anecdotes`,
            `So you can claim proficiency without evidence`,
            `So you never need to practice again`,
            `So you can skip defining criteria—baseline replaces rubrics`,
          ],
          explain: `Baselines anchor measurement; feelings drift under stress. Wrong answers confuse baselines with vanity credentials or pretend measurement removes the need for criteria.`,
          lessonIdx: 2,
        },
        {
          probes: `Scenario: you’re blocked because the work “isn’t perfect yet.” What does a responsible “good enough” standard do?`,
          concepts: ['c5'],
          diff: 'medium' as const,
          opts: [
            `Creates a shippable bar that still protects ethics—without endless polishing`,
            `Eliminates all standards so anything can ship`,
            `Eliminates stakeholder review to avoid discomfort`,
            `Defers learning signals until the artifact feels flawless`,
          ],
          explain: `Good enough is not “low quality”; it’s an explicit tradeoff between integrity and throughput. Wrong answers confuse polish with correctness or confuse standards with censorship.`,
          lessonIdx: 3,
        },
      ],
    }),
    mkModule(1, 'Models: structure, criteria, exemplars', {
      goal: `Turn ${topic} into inspectable parts and explicit criteria.`,
      why: `Models reduce guesswork and make review teachable.`,
      lessons: [
        {
          title: `Map the moving parts of “${topic}”`,
          intent: `Inputs → process → outputs → feedback with leverage points.`,
          concepts: ['c4'],
          mis: [],
          scenarios: ['s2'],
          load: 'integrative' as const,
        },
        {
          title: `Quality rubric: what “good” looks like for you`,
          intent: `Weighted criteria + anti-criteria aligned to ${objective}.`,
          concepts: ['c5'],
          mis: ['m3'],
          scenarios: ['s2'],
          load: 'integrative' as const,
        },
        {
          title: `Compare exemplars without copying`,
          intent: `Extract patterns, refuse unethical mimicry.`,
          concepts: ['c5', 'c6'],
          mis: [],
          scenarios: ['s2'],
          load: 'integrative' as const,
        },
        {
          title: `Anticipate failure modes`,
          intent: `Pre-mortems + mitigations tied to practice.`,
          concepts: ['c6'],
          mis: [],
          scenarios: ['s2'],
          load: 'synthesis' as const,
        },
      ],
      quiz: [
        {
          probes: `You’re debugging why ${topic} outputs feel random. What does a system map most help you see?`,
          concepts: ['c4'],
          diff: 'medium' as const,
          opts: [
            `Where inputs become outputs—and where feedback should close the loop`,
            `How to avoid practice by replacing it with diagrams`,
            `Which vanity metric will impress stakeholders fastest`,
            `Why ethics no longer matter once you’re skilled`,
          ],
          explain: `Maps expose leverage points and missing feedback—not success theater. Plausible distractors mimic “analysis substitution” or confuse visibility with rigor.`,
          lessonIdx: 0,
        },
        {
          probes: `Scenario: two drafts score similarly on vibes. What makes a rubric decision-grade for ${topic}?`,
          concepts: ['c5'],
          diff: 'medium' as const,
          opts: [
            `Criteria weighted toward ${objective}, with explicit anti-criteria that signal “good but wrong goal”`,
            `Maximum criteria count so it feels thorough`,
            `Eliminate judgment by making every criterion binary and mechanical`,
            `Optimize for grammar and formatting only—clear thinking is subjective`,
          ],
          explain: `Rubrics fail when they’re exhaustive but misaligned; they succeed when tradeoffs map to your objective. Wrong answers sound like rigor but remove judgment when judgment is the job.`,
          lessonIdx: 1,
        },
        {
          probes: `When studying exemplars you dislike, what is the legitimate learning move?`,
          concepts: ['c5'],
          diff: 'medium' as const,
          opts: [
            `Extract reusable structure and decisions you refuse—so your standard is intentional, not accidental`,
            `Copy phrasing so you inherit “authority by voice”`,
            `Dismiss the field entirely to protect your ego`,
            `Assume popularity equals correctness`,
          ],
          explain: `Contrast clarifies strategy; ethical learning borrows scaffolding, not identity. Wrong answers confuse mimicry with competence or confuse critique with nihilism.`,
          lessonIdx: 2,
        },
        {
          probes: `Before a risky deliverable, you run a pre-mortem. What is the core output you want?`,
          concepts: ['c6'],
          diff: 'medium' as const,
          opts: [
            `A short list of likely failure modes—with owners, triggers, and mitigations`,
            `A ritual that assigns blame if the project fails`,
            `Permission to avoid all uncomfortable tasks`,
            `Confidence that risks can be ignored once named`,
          ],
          explain: `Pre-mortems are forward-looking risk design, not morale events. Wrong answers confuse naming risk with eliminating it—or with social punishment.`,
          lessonIdx: 3,
        },
      ],
    }),
    mkModule(2, 'Application: specs, drafts, tests', {
      goal: `Ship artifacts that prove progress toward ${objective}.`,
      why: `Application is where learning becomes performance.`,
      lessons: [
        {
          title: `Design a deliverable spec + acceptance tests`,
          intent: `Define “done” with checks someone else can verify.`,
          concepts: ['c7'],
          mis: [],
          scenarios: ['s2'],
          load: 'integrative' as const,
        },
        {
          title: `First full attempt under real constraints`,
          intent: `Draft to spec with decision comments.`,
          concepts: ['c8'],
          mis: ['m2'],
          scenarios: ['s2'],
          load: 'integrative' as const,
        },
        {
          title: `Self-review + red-team pass`,
          intent: `Attack weak claims; fix highest-impact 20%.`,
          concepts: ['c9'],
          mis: ['m3'],
          scenarios: ['s3'],
          load: 'synthesis' as const,
        },
        {
          title: `Micro-test: get signal fast`,
          intent: `Smallest test that yields learning signals.`,
          concepts: ['c10'],
          mis: [],
          scenarios: ['s3'],
          load: 'synthesis' as const,
        },
      ],
      quiz: [
        {
          probes: `Scenario: a teammate can’t tell if your ${topic} deliverable is finished. What does adding acceptance tests to the spec accomplish?`,
          concepts: ['c7'],
          diff: 'medium' as const,
          opts: [
            `Makes “done” checkable by an independent reviewer—reducing endless subjective edits`,
            `Removes the need for any draft—tests are the product`,
            `Guarantees stakeholder delight regardless of fit`,
            `Eliminates constraints so creativity is unconstrained`,
          ],
          explain: `Acceptance tests operationalize completion; they don’t replace thinking. Wrong answers confuse verification with invention or confuse constraints with obstruction.`,
          lessonIdx: 0,
        },
        {
          probes: `You’re red-teaming your own ${topic} draft under time pressure. What is the best target?`,
          concepts: ['c9'],
          diff: 'hard' as const,
          opts: [
            `The weakest claims and highest-leverage fixes—especially where evidence is thin`,
            `Stylistic flourishes that make the draft feel clever`,
            `Padding length so reviewers perceive seriousness`,
            `Deferring critique until after ship—feedback is safer late`,
          ],
          explain: `Red-teaming is Bayesian triage: attack where credibility breaks first. Wrong answers confuse polish with proof or confuse timing with safety.`,
          lessonIdx: 2,
        },
        {
          probes: `Why favor a micro-test early instead of a big rollout for ${topic}?`,
          concepts: ['c10'],
          diff: 'medium' as const,
          opts: [
            `It yields learning signals quickly so you iterate while stakes are lower`,
            `It removes rubrics—speed replaces criteria`,
            `It replaces iterative loops with one heroic attempt`,
            `It eliminates criticism by keeping work private longer`,
          ],
          explain: `Micro-tests buy information cheaply; they don’t replace standards. Wrong answers confuse velocity with rigor or confuse privacy with quality.`,
          lessonIdx: 3,
        },
        {
          probes: `Scenario: deadline tonight. Which drafting stance matches disciplined iteration for ${topic}?`,
          concepts: ['c8'],
          diff: 'medium' as const,
          opts: [
            `Ship to spec now; improve next using evidence—not mood`,
            `Wait for the “right headspace” so quality emerges organically`,
            `Expand scope whenever you notice a new idea—deadlines flex for brilliance`,
            `Avoid comments/decision logs so the draft stays “clean”`,
          ],
          explain: `Good enough means accountable completeness plus learning—not perfection waiting. Wrong answers disguise avoidance as craftsmanship.`,
          lessonIdx: 1,
        },
      ],
    }),
    mkModule(3, 'Sustain: review, habits, stretch', {
      goal: `Consolidate gains and keep ${topic} practice after the plan.`,
      why: `Without habits, you relapse under load.`,
      lessons: [
        {
          title: `Compare outcomes to baseline`,
          intent: `Evidence-based before/after scorecard.`,
          concepts: ['c3', 'c11'],
          mis: [],
          scenarios: ['s4'],
          load: 'integrative' as const,
        },
        {
          title: `Personal playbook (one page)`,
          intent: `Compress your operating system for ${topic}.`,
          concepts: ['c11'],
          mis: [],
          scenarios: ['s4'],
          load: 'integrative' as const,
        },
        {
          title: `Habit design: cues, minimums, rewards`,
          intent: `Make practice inevitable on busy weeks.`,
          concepts: ['c11'],
          mis: ['m4'],
          scenarios: ['s4'],
          load: 'synthesis' as const,
        },
        {
          title: `Next horizon: stretch without losing integrity`,
          intent: `Ambitious milestone with harm analysis.`,
          concepts: ['c12'],
          mis: ['m4'],
          scenarios: ['s4'],
          load: 'synthesis' as const,
        },
      ],
      quiz: [
        {
          probes: `Scenario: you feel “much better” at ${topic}, but outputs look flat. Why lean on baseline comparison—not only mood?`,
          concepts: ['c3'],
          diff: 'medium' as const,
          opts: [
            `Feelings track stress and motivation; baselines track whether outputs moved`,
            `Feelings are noise—ignore them entirely in all contexts`,
            `Baselines eliminate mistakes once captured`,
            `Baselines replace habits—measurement is the practice`,
          ],
          explain: `Mood is real data about energy, but it’s a poor proxy for competence. Wrong answers confuse measurement with motivation or pretend baselines equal mastery.`,
          lessonIdx: 0,
        },
        {
          probes: `You’re building a one-page playbook for ${topic}. What makes it operational—not inspirational wallpaper?`,
          concepts: ['c11'],
          diff: 'medium' as const,
          opts: [
            `Short triggers, minimum sessions, and checks mapped to how you actually work`,
            `A collage of generic quotes that sound wise`,
            `A substitute for practice—as long as it’s printed`,
            `Maximum length so it feels comprehensive`,
          ],
          explain: `Playbooks work when they cue behavior under load. Wrong answers confuse documentation with discipline.`,
          lessonIdx: 1,
        },
        {
          probes: `Busy week: you can’t run your ideal ${topic} session. What is the constructive role of a minimum viable session?`,
          concepts: ['c11'],
          diff: 'medium' as const,
          opts: [
            `Preserves streak and identity as “someone who practices”—without collapsing to zero`,
            `Ensures you never do deep work again`,
            `Replaces quality bars with arbitrary completion`,
            `Removes review because partial sessions “don’t count”`,
          ],
          explain: `Minimums prevent all-or-nothing psychology; they’re floors, not ceilings. Wrong answers confuse minimums with cynicism.`,
          lessonIdx: 2,
        },
        {
          probes: `Scenario: you set an ambitious stretch milestone for ${topic}. Why explicitly analyze harms—not only upside?`,
          concepts: ['c12'],
          diff: 'hard' as const,
          opts: [
            `Because ambitious outputs can silently trade away trust, health, or constraints you can’t afford`,
            `Because ambition is inherently unethical`,
            `Because metrics always mislead—ignore them`,
            `Because harm analysis guarantees success`,
          ],
          explain: `Stretch without harm analysis optimizes local wins and global regret. Wrong answers confuse ethics with timidity or confuse analysis with certainty.`,
          lessonIdx: 3,
        },
      ],
    }),
  ]

  const revision_summary = joinLines(
    `## Revision focus for ${topic}`,
    `- **${levelDepth.exam}**`,
    `- Revisit concepts: ${concepts.slice(0, 4).map((c) => c.label).join(', ')}.`,
    `- Re-check misconceptions: ${misconceptions.map((m) => m.myth).slice(0, 2).join(' | ')}.`,
    `- Practice loop: learn → try → review, with at least one artifact per module.`,
  )

  return {
    version: KNOWLEDGE_SPEC_VERSION,
    domain: {
      topic,
      objective,
      learner_level: level,
      duration_label: input.durationLabel?.trim() ?? null,
      plan_title: input.planTitle.trim(),
      prerequisites: [
        `Basic literacy in your domain context for ${topic}`,
        `Willingness to produce real artifacts and measure outcomes`,
      ],
    },
    concepts,
    misconceptions,
    scenarios,
    revision_summary,
    modules,
    readiness_architecture: defaultReadinessArchitecture({ topic, objective }),
    metadata_json: {
      engine: 'heuristic_v1',
      cognitive_profile: levelDepth.label,
    },
  }
}

function mkModule(
  sort_order: number,
  title: string,
  body: {
    goal: string
    why: string
    lessons: Array<{
      title: string
      intent: string
      concepts: string[]
      mis: string[]
      scenarios: string[]
      load: 'foundational' | 'integrative' | 'synthesis'
    }>
    quiz: Array<{
      probes: string
      concepts: string[]
      diff: 'easy' | 'medium' | 'hard'
      opts: [string, string, string, string]
      explain: string
      lessonIdx: number
    }>
  },
) {
  return {
    sort_order,
    title,
    description: body.goal,
    module_goal: body.goal,
    why_it_matters: body.why,
    lessons: body.lessons.map((l, i) => ({
      sort_order: i,
      title: l.title,
      learning_intent: l.intent,
      concept_ids: l.concepts,
      misconception_ids: l.mis,
      scenario_ids: l.scenarios,
      cognitive_load: l.load,
    })),
    quiz: {
      title: `Checkpoint: ${title}`,
      description:
        'Reasoning + application checks: choose the best move in realistic constraints, not recall of slogans.',
      questions: body.quiz.map((q, i) => ({
        sort_order: i,
        probes: q.probes,
        concept_ids: q.concepts,
        difficulty: q.diff,
        options: q.opts,
        explanation: q.explain,
        source_lesson_index: q.lessonIdx,
      })),
    },
  }
}
