/**
 * Deep curriculum blueprints for flagship courses — modules, stages, practice, outputs, capstones.
 * Authoritative structure for course detail UX; scalable to remaining flagships via the same shapes.
 */

import { FLAGSHIP_CURRICULA_EXTENDED } from './flagshipCourseCurriculaExtended'
import { FLAGSHIP_CURRICULA_EXTENDED_2 } from './flagshipCourseCurriculaExtended2'
import type { FlagshipCourseCurriculum, FlagshipDepthStage } from './flagshipCurriculumTypes'

export type {
  FlagshipCourseCapstone,
  FlagshipCourseCurriculum,
  FlagshipCurriculumModule,
  FlagshipDepthStage,
} from './flagshipCurriculumTypes'

const STAGE_ORDER: FlagshipDepthStage[] = [
  'foundations',
  'applied_practice',
  'professional_execution',
  'mastery_outputs',
]

const STAGE_TITLE: Record<FlagshipDepthStage, string> = {
  foundations: 'Foundations',
  applied_practice: 'Applied practice',
  professional_execution: 'Professional execution',
  mastery_outputs: 'Mastery and outputs',
}

export function flagshipStageLabel(stage: FlagshipDepthStage): string {
  return STAGE_TITLE[stage]
}

export function flagshipStageSortOrder(stage: FlagshipDepthStage): number {
  return STAGE_ORDER.indexOf(stage)
}

export function countModulesByStage(curriculum: FlagshipCourseCurriculum): Record<FlagshipDepthStage, number> {
  const counts: Record<FlagshipDepthStage, number> = {
    foundations: 0,
    applied_practice: 0,
    professional_execution: 0,
    mastery_outputs: 0,
  }
  for (const m of curriculum.modules) {
    counts[m.stage] += 1
  }
  return counts
}

export function curriculumPracticeAndRevisionTotals(curriculum: FlagshipCourseCurriculum): {
  practiceAnchors: number
  revisionPoints: number
} {
  let practiceAnchors = 0
  let revisionPoints = 0
  for (const m of curriculum.modules) {
    if (m.practiceActivities.length > 0) practiceAnchors += 1
    if (m.revisionCheckpoint || m.recap) revisionPoints += 1
  }
  return { practiceAnchors, revisionPoints }
}

/** All 15 flagship courses ship with full deep blueprints */
export const FLAGSHIP_CURRICULUM_SLUGS = [
  'ai-essentials',
  'smart-workflows-with-ai',
  'data-and-decisions',
  'web-and-software-foundations',
  'digital-safety',
  'marketing-and-growth',
  'business-builder',
  'money-and-finance',
  'product-thinking',
  'project-execution',
  'career-launch',
  'clear-communication',
  'research-and-critical-thinking',
  'leadership-and-teams',
  'teaching-and-facilitation',
] as const

export type FlagshipCurriculumSlug = (typeof FLAGSHIP_CURRICULUM_SLUGS)[number]

export const FLAGSHIP_CURRICULA_BASE = {
  'ai-essentials': {
    slug: 'ai-essentials',
    estimatedDurationLabel: 'Roughly 45–65 hours of study and practice',
    depthLabel:
      'Judgment-first AI literacy with explicit prompt engineering: what prompts are, why instructions shape outputs, how ambiguity and thin context cause failure, safe revision habits—and assessable drills (critique sheets, rewrites, comparison)—not cargo-cult guessing.',
    reinforcementSignals: [
      'Foundational prompt engineering appears in foundations modules (mistakes, ambiguity, responsible habits) before applied specs',
      'Practice blocks produce reviewer-visible prompt artifacts—critiques, improved rewrites, comparison notes',
      'Failure-mode drills on real outputs—not abstract “best practices” lists',
      'Stake-weighted verification habits embedded before stakes rise',
      'Responsible-use boundaries tied to data, IP, people you serve',
      'Capstone playbook includes reusable prompt packs and escalation cues tied to workflows',
    ],
    capstone: {
      title: 'Responsible AI operating playbook (review-ready)',
      description:
        'Ship one integrated pack you could hand to a manager or mentor: accountable use stance for your context(s), stakes-classified verification doctrine, minimalist workflow architectures with triggers/humans/fallbacks, escalation rules for uncertain outputs, an explicit refusal map (what you will not outsource to models), and reusable prompt/spec templates grounded in how you actually work—including where prompt packs attach to workflows. Quarterly refresh notes included.',
      deliverables: [
        'Responsible-use stance (roles, stakes, refusal boundaries, escalation)',
        'Verification checklist matrix by stake level with concrete review moves',
        'Prompt engineering pack for 2–3 recurring task categories: starter prompts, critique checklist, versioning notes—aligned to your workflows',
        'Workflow diagrams for 2–3 task families: trigger → tool/human → fallback → archive',
        'Incident response sketch: suspected bad output / leak / misrepresentation',
      ],
    },
    modules: [
      {
        id: 'ae-m01',
        order: 1,
        title: 'How modern AI behaves—and how prompt engineering connects to outputs',
        stage: 'foundations',
        summary:
          'Connect stochastic behavior to something you control: prompts are instructions to a system—quality and completeness of prompts strongly shape usefulness, hallucination pressure, and tone. Build intuition for fluent-but-wrong outputs AND for how thin or ambiguous prompts make failure more likely.',
        learningGoals: [
          'Define what a prompt is (instructions + context + constraints) and why prompt quality is inseparable from output quality.',
          'Explain memorization mimicry vs. reasoning metaphors—and where metaphors fail.',
          'Identify how ambiguous or under-specified prompts produce confident garbage; name what minimum context belongs in a starter prompt.',
          'Sort tasks into verification-mandatory vs. lightweight review buckets—and note how prompting cannot replace verification on high stakes.',
          'Describe model limits to stakeholders without buzzwords.',
        ],
        practiceActivities: [
          'Cold-read three model outputs labeling fabrication, omission, overconfident tone, or missing caveats—and note which missing prompt constraints might have contributed.',
          'Rewrite one vague prompt twice: diagnose ambiguity and missing constraints; compare outputs in a short prompt comparison table (weak vs improved).',
          'Translate “Is this safe?” from a stakeholder into operational sub-questions.',
          'Draft five “safe prompting habits” you will keep (privacy, citations, refusal to invent sources).',
        ],
        revisionCheckpoint: true,
        expectedOutputs: [
          'Failure-mode note sheet (half page)',
          'Prompt comparison table + improved rewrite (one task)',
          'Starter list of responsible prompting habits',
        ],
      },
      {
        id: 'ae-m02',
        order: 2,
        title: 'What AI is not: myths, shortcuts, harmful expectations—and prompt myths',
        stage: 'foundations',
        summary:
          'Demystify hype so effort goes to judgment, procedures, and evidence—not prompt superstition. Explicitly debunk common prompt myths (length equals quality, magic phrases, “just ask nicer,” model knows what you meant).',
        learningGoals: [
          'Replace “magic assistant” fantasies with inspectable step lists—and replace prompt myths with testable prompt habits.',
          'List five frequent prompt failure modes: ambiguity, missing audience, missing evidence rules, missing output shape, missing refusal behavior.',
          'Stress-test vendor or media claims against known tool behavior.',
          'State where human accountability stays non-negotiable.',
        ],
        practiceActivities: [
          'Fact-check one viral AI claim using primary documentation or reproducible tests.',
          'Prompt myth busting: take three “tips” from social media; evaluate each with a before/after prompt pair and note whether output quality actually changed.',
          'Draft a “never outsource” list with ethical and quality rationale per line.',
        ],
        recap: true,
        expectedOutputs: ['Expectation reset memo', 'Prompt myth critique sheet (3 myths + evidence)'],
      },
      {
        id: 'ae-m03',
        order: 3,
        title: 'Tool landscape: assistants, retrieval, models, agents—and prompts as the control surface',
        stage: 'foundations',
        summary:
          'Choose tool classes for tasks—integrations, permissions, eval harnesses—not model bragging rights. Treat prompts as the primary control surface for assistants: same intent with different constraints should produce auditable differences in outputs.',
        learningGoals: [
          'Map recurring work to assistants, retrieval, copilots, agents, or local tooling—and state what each interface implies for prompt structure.',
          'Explain why “which model?” is incomplete without “what prompt spec, what evidence policy, what format?”',
          'Articulate why data boundaries and SSO matter as much as benchmarks.',
          'Draft evaluation criteria before pilots spend calendar time—including prompt+criteria pairs for acceptance tests.',
        ],
        practiceActivities: [
          'Score five workflows against tool categories + integration requirements; for two, sketch the minimum viable prompt contract (inputs, forbidden moves, output shape).',
          'Document red/yellow/green data handling rules for one workflow—and how prompts must change when data tier changes.',
          'Write one small “acceptance test prompt” that checks whether a tool response meets explicit constraints.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Tool-fit matrix', 'Mini prompt contract + acceptance test prompt for one workflow'],
      },
      {
        id: 'ae-m04',
        order: 4,
        title: 'Prompt engineering I: structured prompts as specs—not spellcasting',
        stage: 'applied_practice',
        summary:
          'Foundational prompt engineering you can defend in review: author prompts like specs—intent, audience, constraints, evidence policy, output format, refusal behavior—then iterate with version notes and side-by-side comparisons like code review.',
        learningGoals: [
          'Build prompts where role, goal, constraints, and output shape are explicit—so ambiguity surfaces early.',
          'Embed cite vs. infer vs. refuse policies for contested facts.',
          'Explain how and why prompts fail (under-spec, wrong audience, missing negatives, missing format).',
          'Iterate with documented diffs; compare outputs against a simple quality rubric—not vibes.',
        ],
        practiceActivities: [
          'Produce a prompt critique sheet: diagnose a weak prompt (ambiguity, missing context, weak constraints) and rewrite it with labeled sections.',
          'Run draft → critique → revise on one gnarly task with saved versions v0 → v2 and a short changelog.',
          'Apply a rubric to two outputs: clarity, evidence rules, failure handling, escalation.',
        ],
        expectedOutputs: [
          'Prompt critique sheet + improved rewrite',
          'Versioned prompt spec template for a recurring task (v0.2 with changelog)',
        ],
      },
      {
        id: 'ae-m05',
        order: 5,
        title: 'Learning with AI without outsourcing cognition',
        stage: 'applied_practice',
        summary:
          'Deploy AI as deliberate practice partner—without letting it sit exams for you. Prompt engineering here means tutoring-style prompts that force you to retrieve, explain, and check—not prompts that generate finished submissions.',
        learningGoals: [
          'Design study loops where AI supports retrieval, not substitution—and specify prompt patterns for each loop step.',
          'Spot when explanatory chat undermines durable understanding.',
          'Codify integrity boundaries for coursework and certifications—including forbidden prompt patterns.',
        ],
        practiceActivities: [
          'Author five-step study protocol listing AI-allowed vs. forbidden moves—and include example prompts for allowed steps only.',
          'Generate quiz items then independently verify keys and rationales.',
          'Prompt comparison: “do my homework” style vs. Socratic tutoring prompts; note failure modes of each.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Integrity-forward study protocol + example prompt patterns'],
      },
      {
        id: 'ae-m06',
        order: 6,
        title: 'Drafting, summarizing, and transforming text—prompt + review discipline',
        stage: 'applied_practice',
        summary:
          'Produce knowledge work with tone control, factual traceability, and ruthless diff review. Prompt engineering means explicit extraction/summary prompts with evidence rules—then editing against those rules.',
        learningGoals: [
          'Write summarize/extract prompts that forbid invention and require paragraph-tied claims.',
          'Summarize long sources without smuggling new claims.',
          'Maintain citation pathways for contested facts.',
          'Edit AI prose with inline questions, not cosmetic fixes only.',
        ],
        practiceActivities: [
          'Summarize a dense article tagging each claim to a paragraph or “uncited.”',
          'Red-team an AI summary for omission, hedging, and persuasive spin.',
          'Author two prompt variants for the same document (extract facts vs. executive brief) and compare failure modes.',
        ],
        expectedOutputs: ['Edited draft with marginal verification notes', 'Prompt pair comparison notes for summarization'],
      },
      {
        id: 'ae-m07',
        order: 7,
        title: 'AI at work: handoffs, approvals, stakeholders, norms—and shared prompt defaults',
        stage: 'professional_execution',
        summary:
          'Make hybrid human+AI collaboration legible—ownership, disclosure, review gates, escalation paths. Include lightweight standards for reusable team prompts (what must be in a handoff prompt, how to label AI-generated sections, where prompt templates live).',
        learningGoals: [
          'Draft lightweight team norms for disclosure, labeling, review—including shared prompt prefixes and forbidden prompt patterns.',
          'Communicate AI assistance without undermining trust.',
          'Plug into ticket/PR/review workflows you already run.',
        ],
        practiceActivities: [
          'RACI map for AI-supported deliverables with explicit review owners.',
          'Write email templates declaring assistance, uncertainty, and verification status.',
          'Produce one “team starter prompt template” with slots for stakeholder, stakes, constraints, and review owner.',
        ],
        expectedOutputs: ['Team AI workflow norms draft', 'Starter prompt template for team use'],
      },
      {
        id: 'ae-m08',
        order: 8,
        title: 'Risk, privacy, confidentiality, intellectual honesty—and safe prompting',
        stage: 'professional_execution',
        summary:
          'Protect people and IP with pragmatic classification—know what never leaves trusted environments. Tie safe prompting habits to data tiers (what you must never paste; what belongs in prompts vs. retrieval systems).',
        learningGoals: [
          'Label sensitive data tiers tied to realistic tooling constraints—and rewrite one risky prompt into a safe variant.',
          'Define escalation paths for suspected leaks or unsafe outputs.',
          'Attribute ideas and AI contributions honestly.',
        ],
        practiceActivities: [
          'Classify three real document types with paste/stay-local rules—and write “always/never include in prompts” bullets per tier.',
          'Draft incident outline for suspected data exfiltration or harmful advice.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Sensitivity + escalation sheet', 'Safe prompting rules by data tier'],
      },
      {
        id: 'ae-m09',
        order: 9,
        title: 'Personal workflow architecture: triggers, stacks, fallbacks, prompt hooks',
        stage: 'mastery_outputs',
        summary:
          'Compose resilient workflows—when to automate, throttle, escalate, or refuse based on stakes and fatigue. Attach prompt specs to workflow steps (“when this trigger fires, use this prompt pack; when stakes rise, escalate to human review prompts”).',
        learningGoals: [
          'Encode triggers using stakes × reversibility × blast radius—and map prompt variants to triggers.',
          'Plan API/model outage fallbacks humans can execute—including offline prompt patterns.',
          'Stress-test workflows under low-sleep / high-interruption realities.',
        ],
        practiceActivities: [
          'Diagram three task families with decision diamonds and owners.',
          'Friday-afternoon tabletop: what breaks first? patch the workflow—and update prompt packs accordingly.',
        ],
        expectedOutputs: ['Workflow diagram + fallback table', 'Mini prompt pack indexed by trigger'],
      },
      {
        id: 'ae-m10',
        order: 10,
        title: 'Synthesis and operating playbook assembly',
        stage: 'mastery_outputs',
        summary:
          'Integrate stance, verification, workflows, incidents, and reusable prompt/spec templates into one lean, revisable playbook—prompt engineering included as operational assets, not an appendix.',
        learningGoals: [
          'Decide what belongs in a pocket playbook vs. long training decks—including which prompt templates are canonical.',
          'Author for future-you: triggers, checklists, escalation cues, and prompt pack ownership.',
          'Schedule quarterly refresh triggers.',
        ],
        practiceActivities: [
          'Cut 40% of a bloated draft while keeping safeguards explicit.',
          'Peer dry-run capstone review with rubric + capture gaps.',
          'Assemble a “prompt pack appendix”: 3–5 reusable prompts with owners, version, and when-not-to-use notes.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Draft capstone playbook v1', 'Prompt pack appendix (reusable, versioned)'],
      },
    ],
  },

  'smart-workflows-with-ai': {
    slug: 'smart-workflows-with-ai',
    estimatedDurationLabel: 'Roughly 55–80 hours of study and practice',
    depthLabel:
      'Professional prompt engineering embedded in workflow systems: anatomy and templates, iterative refinement and critique, multi-step chains, evaluation rubrics, libraries and versioning—under QA lanes and operational accountability (someone else could run it).',
    reinforcementSignals: [
      'Explicit prompt engineering progression: anatomy → schemas/chains → critique/compare → workflow prompt sequences → libraries',
      'Artifacts include prompt critique sheets, comparison tables, structured templates, reusable packs, workflow-sized sequences',
      'Prompt/spec versioning discipline like code review',
      'Human gates before anything is called “automated”',
      'Libraries with owners, deprecation, kill switches',
      'Capstone ships reviewer-ready workflow packages with prompt blocks tied to QA—not chat screenshots',
    ],
    capstone: {
      title: 'Named workflow library + rollout & measurement pack',
      description:
        'Deliver three named, packaged workflows with inputs/outputs, versioned prompt-engineering blocks (role/context/constraints/format/refusal), QA lanes that score prompt+output pairs, rubrics, fallback + kill-switch paths, audit notes where needed, and a rollout memo covering risks, stakeholder comms, metrics definitions, and kill criteria. Proof of repeatable systems—not chat screenshots.',
      deliverables: [
        'Three workflow packages (cover sheet, inputs, versioned prompt/spec blocks + changelog, QA checklist, owners)',
        'Shared quality rubric for outputs and for prompt adequacy + variant notes',
        'Prompt library sheet: naming, dependencies, deprecation policy, owners',
        'Mini catalog sheet: naming, dependencies, deprecation policy',
        'Rollout memo: pilot scope, metrics, risks, rollback, kill criteria',
      ],
    },
    modules: [
      {
        id: 'sw-m01',
        order: 1,
        title: 'Workflow thinking: decomposition, interfaces, ownership—and operational prompts',
        stage: 'foundations',
        summary:
          'Turn fuzzy “just use AI” requests into explicit interfaces—inputs, owners, handoffs—before tooling debates begin. Introduce workflow prompting: each AI touchpoint gets a named prompt slot (intake prompt, triage prompt, escalation prompt) so behavior is discussable and versionable.',
        learningGoals: [
          'Decompose messy work into substeps another person could execute from notes.',
          'Define owners, SLAs, and escalation for each interface—and map prompt slots to steps.',
          'Flag steps that must stay human vs. candidates for augmentation.',
        ],
        practiceActivities: [
          'Swimlane sketch for one recurring mess: inbox triage, support, hiring, or reporting.',
          'Per lane: list top three failure modes + earliest signal each gives.',
          'Draft a three-step workflow prompt sequence (intake → classify → next action) with explicit constraints per hop.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Swimlane + failure-mode sheet', 'Workflow prompt sequence v0.1'],
      },
      {
        id: 'sw-m02',
        order: 2,
        title: 'Prompt engineering II: anatomy—role, context, constraints, evidence policy, formats',
        stage: 'foundations',
        summary:
          'Professional prompt engineering: build reusable prompt components (role, audience, context packs, hard constraints, evidence rules, output schema, refusal behavior) that survive stress and iteration—then evaluate outputs against a rubric, not intuition.',
        learningGoals: [
          'Separate role, audience, constraints, and output schema—and explain why each belongs.',
          'Specify refusal behavior for thin evidence and conflicts.',
          'Run iterative refinement cycles with hypothesis notes (“what this revision tried to fix”).',
          'Version prompts like code; compare weak vs strong variants with side-by-side outputs.',
        ],
        practiceActivities: [
          'Refactor a vague prompt into a structured spec with labeled sections.',
          'Diff two versions and explain behavioral changes in outputs.',
          'Prompt critique exercise: score two prompts on clarity, constraints, evidence policy, format—then rewrite the weaker one.',
        ],
        expectedOutputs: [
          'Versioned prompt spec v0.2 + changelog',
          'Prompt critique sheet with rubric scores',
        ],
      },
      {
        id: 'sw-m03',
        order: 3,
        title: 'Structured outputs: schemas, tables, JSON-shaped thinking—and prompts that enforce shape',
        stage: 'applied_practice',
        summary:
          'Design schemas downstream systems can consume—contracts that fail loudly instead of silently. Prompt engineering here means binding the model to explicit structures (fields, null semantics, examples) so “shape drift” is visible in QA.',
        learningGoals: [
          'Pick schema shapes matched to consumers (human review vs. automation).',
          'Catch silent omissions with required fields + validation hooks.',
          'Prototype validation snippets or checklists before “going live.”',
          'Write “schema-faithful” prompts with few-shot examples that demonstrate valid vs invalid rows.',
        ],
        practiceActivities: [
          'Design schema for intake → triage → recommendation with explicit null semantics.',
          'Adversarial test: ambiguous user text, typos, missing IDs—what breaks?',
          'Pair each schema with a prompt variant that forces field-by-field extraction—compare failure rates.',
        ],
        expectedOutputs: ['Schema + validation story', 'Schema-bound prompt + adversarial notes'],
      },
      {
        id: 'sw-m04',
        order: 4,
        title: 'Multi-step prompt engineering: chains, checkpoints, rollback',
        stage: 'applied_practice',
        summary:
          'Chain reasoning without mystery—explicit checkpoints where humans intervene. Treat each step as prompt engineering with inputs/outputs you can inspect: intermediate artifacts, comparison notes, and rollback triggers when prompt drift appears.',
        learningGoals: [
          'Design chains that fail safely—with per-step prompt contracts.',
          'Instrument steps with measurable intermediate artifacts.',
          'Rollback when drift appears—and revise the prompt block responsible (not just “try again”).',
        ],
        practiceActivities: [
          'Build a 4-step chain with explicit verification gates and saved prompt text per step.',
          'Simulate drift and rollback; document which prompt slot failed and why.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Chain spec + checkpoint & rollback log', 'Per-step prompt blocks v1'],
      },
      {
        id: 'sw-m05',
        order: 5,
        title: 'Research and synthesis workflows—prompted extraction and honest synthesis',
        stage: 'applied_practice',
        summary:
          'Collect sources, extract claims, contrast views, and ship synthesis without laundering uncertainty. Prompt engineering is operational: extraction prompts that preserve provenance, contrast prompts that keep disagreement visible, executive prompts that forbid false certainty.',
        learningGoals: [
          'Separate claims from sources.',
          'Score evidence strength honestly.',
          'Produce executive synthesis with caveats.',
          'Design a small prompt library for research tasks (extract / compare / brief) with evaluation notes on failure modes.',
        ],
        practiceActivities: [
          'Evidence table for a contested topic.',
          'Executive brief with explicit unknowns.',
          'Prompt comparison: one “summarize fast” prompt vs. an evidence-disciplined prompt—document quality differences with examples.',
        ],
        expectedOutputs: ['Evidence table + brief', 'Mini research prompt pack + evaluation notes'],
      },
      {
        id: 'sw-m06',
        order: 6,
        title: 'Writing and editorial pipelines—lane-specific prompt engineering + QA hooks',
        stage: 'professional_execution',
        summary:
          'Separate structure, factual review, tone, and release authorization—AI assists lane by lane. Prompt engineering means different prompt contracts per lane (outline vs. fact-check vs. tone) so QA can trace mistakes to the right step.',
        learningGoals: [
          'Tailor QA depth to stakes (blog vs. financial vs. regulated).',
          'Stop style polishing from burying factual risk.',
          'Coordinate async reviewers with explicit check ownership.',
          'Maintain lane-specific prompt templates and version notes.',
        ],
        practiceActivities: [
          'Author tiered editorial checklists (fast vs. high-stakes).',
          'Run a real draft through checklist; annotate fixes by lane.',
          'Create three lane prompts (structure, factual pass, tone pass) and log which lane caught each issue.',
        ],
        expectedOutputs: ['QA checklist pair + annotated draft', 'Editorial prompt trio + lane log'],
      },
      {
        id: 'sw-m07',
        order: 7,
        title: 'Operational workflows: routing, SLAs, exceptions—and production prompt ops',
        stage: 'professional_execution',
        summary:
          'Embed AI inside queues and incident reality—priorities, exception paths, audit evidence, human attention limits. Operational prompt engineering includes routing prompts, escalation prompts, and incident prompts with explicit severity/stakes language.',
        learningGoals: [
          'Write SLAs humans can meet; surface overload before it becomes silent failure.',
          'Design exception queues that escalate instead of hiding.',
          'Maintain auditable trails for regulated or customer-impacting flows.',
          'Define prompt ownership for ops changes (who may ship prompt edits in production).',
        ],
        practiceActivities: [
          'Draw ops diagram with AI touchpoints + required human checkpoints.',
          'Author exception playbook for volume spike, bad model day, vendor outage.',
          'Write “bad day” prompt variants (conservative retrieval, refusal-first) for outage scenarios.',
        ],
        expectedOutputs: ['Ops diagram + exception playbook', 'Incident/outage prompt variants'],
      },
      {
        id: 'sw-m08',
        order: 8,
        title: 'Prompt libraries & reusable workflow assets: naming, versioning, deprecation',
        stage: 'professional_execution',
        summary:
          'Treat prompts and subflows as catalogued assets—discoverable and maintainable. This is prompt engineering at organizational scale: libraries, not loose chats—each entry has purpose, inputs, failure modes, and an owner.',
        learningGoals: [
          'Create naming conventions that teams adopt.',
          'Document assumptions and dependencies for each prompt asset.',
          'Sunset cruft safely.',
          'Design a prompt library sheet reviewers can audit (what it does, when not to use, last test date).',
        ],
        practiceActivities: [
          'Mini catalog of 5 assets with owners—minimum three are prompt/spec blocks.',
          'Deprecation note for one legacy asset with migration prompt mapping.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Workflow + prompt asset catalog sheet + deprecation note'],
      },
      {
        id: 'sw-m09',
        order: 9,
        title: 'Automation design: triggers, tools, limits, kill switches—and governed prompts',
        stage: 'mastery_outputs',
        summary:
          'Automate only where upside clears operational risk—human judgment on triggers. Prompt engineering must be governed: frozen prompts in prod, change control, canaries, and rollback when prompt edits regress quality.',
        learningGoals: [
          'Specify triggers with false-positive tolerance.',
          'Choose integration patterns that survive outages.',
          'Define kill switches and ownership.',
          'Define prompt change control (who reviews prompt diffs before deploy).',
        ],
        practiceActivities: [
          'FMEA-lite for one automated branch.',
          'Kill-switch drill narrative.',
          'Write a prompt change checklist: diff, expected behavior shift, test cases, rollback plan.',
        ],
        expectedOutputs: ['Automation one-pager with risks', 'Prompt change-control checklist'],
      },
      {
        id: 'sw-m10',
        order: 10,
        title: 'Measuring workflow quality—outputs and prompt adequacy—without vanity metrics',
        stage: 'mastery_outputs',
        summary:
          'Choose a small signal set tied to rework, latency, errors, and risk—then defend it against gaming. Include lightweight signals that prompt regressions show up (unexpected refusals, format breaks, rising human edits).',
        learningGoals: [
          'Define operational definitions reviewers can audit.',
          'Schedule metric hygiene—retire charts nobody acts on.',
          'Link metric moves to concrete owner interventions.',
          'Separate output-quality metrics from prompt-adequacy proxies where useful.',
        ],
        practiceActivities: [
          'Pick three workflow metrics; write definitions + failure interpretations.',
          'Red-team how each metric could be gamed; add guardrails.',
          'Define two tests that detect silent prompt drift (schema miss rate, escalation misroutes).',
        ],
        expectedOutputs: ['Workflow metrics spec + gaming guardrails', 'Prompt drift watchlist'],
      },
      {
        id: 'sw-m11',
        order: 11,
        title: 'Capstone assembly: workflow library packaging—with prompt engineering proof',
        stage: 'mastery_outputs',
        summary:
          'Merge named workflow packages, rubrics, catalog sheet, prompt/spec libraries, and rollout memo into one library a peer could pilot—cut tacit steps until failure modes, owners, kill switches, and prompt versions read without you in the room.',
        learningGoals: [
          'Externalize tacit knowledge without drowning readers.',
          'Peer walkthrough dry run.',
          'Finalize rollout narrative.',
          'Prove operational prompt engineering: versioned prompt blocks + critique rubric results or comparison tables.',
        ],
        practiceActivities: [
          'Walkthrough with colleague or recorded self-review.',
          'Cut ambiguity until failure modes are enumerated.',
          'Capstone prompt appendix review: ensure each workflow has owned prompt assets and change history.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Workflow library pack v1', 'Prompt appendix (versioned blocks + evaluation evidence)'],
      },
    ],
  },

  'marketing-and-growth': {
    slug: 'marketing-and-growth',
    estimatedDurationLabel: 'Roughly 50–75 hours of study and practice',
    depthLabel:
      'Evidence-led demand creation: who you serve, what you promise, how you earn attention, and how you read channel, funnel, and campaign KPIs to decide the next bet—without vanity dashboards.',
    reinforcementSignals: [
      'Audience evidence before creative spend—segments grounded in behavior, substitution, and objections',
      'Campaign & channel KPI trees: cost, conversion, velocity, and quality signals per bet—not a single south-line metric',
      'Funnel and dashboard reviews: stage definitions, cohort windows, and “so what?” actions tied to experiments',
      'Messaging spine → creative brief → channel experiment—each layer testable',
      'Incremental humility in attribution; kill rules when KPIs violate guardrails',
      'Dossier stitches positioning, bets, asset system, KPI views, risks, and review rituals into one artifact',
    ],
    capstone: {
      title: 'Growth dossier: campaign bets, asset system, and measurement discipline',
      description:
        'Ship a reviewer-ready dossier for one product or initiative: prioritized audience insight, differentiated positioning spine, hypothesized channels with creative/cost realism, staged experiments, budget story, explicit growth KPI tree and campaign/channel definitions, dashboard views you will actually review weekly, measurement & learning plan (primary, guardrails, attribution humility, incrementality stance), risks, and ethical boundaries. Written as if pitching a skeptical CFO and a discerning customer.',
      deliverables: [
        'Audience & substitution brief (segments, objections, proofs on hand)',
        'Positioning spine + message architecture + proof gap table',
        'Integrated channel & experiment backlog (hypothesis, cost envelope, kill rule per bet)',
        'Creative brief suite linking spine to channels (angles, proofs, constraints, variant matrix)',
        'Growth KPI pack: campaign & channel KPI definitions, funnel-stage metrics, guardrails, dashboard views you will actually review',
        'Measurement & learning plan (weekly dashboard review script, attribution stance, incrementality humility, actions when KPIs breach thresholds)',
      ],
    },
    modules: [
      {
        id: 'mg-m01',
        order: 1,
        title: 'Growth as disciplined demand learning—not vanity activity',
        stage: 'foundations',
        summary:
          'Treat growth as hypotheses about who buys and why loops close—never as posting volume. Separate brand exploration from accountable acquisition work.',
        learningGoals: [
          'Write three falsifiable hypotheses with measurable outcomes and falsifiers.',
          'Differentiate lagging KPIs from leading indicators you actually control.',
          'Expose vanity framing (“awareness”) and replace it with observable signals.',
        ],
        practiceActivities: [
          'Rewrite five vague KPIs into hypotheses + metric + timeframe + falsifier.',
          'Pick one lagging KPI; derive three leading indicators with data you could plausibly collect.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Demand-learning hypothesis sheet'],
      },
      {
        id: 'mg-m02',
        order: 2,
        title: 'Audience evidence: substitutions, objections, proofs you already hold',
        stage: 'foundations',
        summary:
          'Segments from behavior—what people do, buy instead, stall on—not idealized personas. Compile proof assets honestly before spending creative.',
        learningGoals: [
          'Segment by buying situation and objection pattern—not demographics alone.',
          'Document substitutes and inertia you must overcome.',
          'Harvest proof assets already in CRM, reviews, calls, surveys.',
        ],
        practiceActivities: [
          'Five-row evidence table: datapoint, implication, credibility risk, next question.',
          'Objection library with counter-message + proof requirement per objection.',
        ],
        expectedOutputs: ['Audience evidence appendix'],
      },
      {
        id: 'mg-m03',
        order: 3,
        title: 'Positioning spine: promise, wedge, refusal to pretend',
        stage: 'foundations',
        summary:
          'Articulate category context, differentiated promise, and proof doctrine—explicitly naming what you will not claim.',
        learningGoals: [
          'Stress-test positioning against named competitors—not generic uniqueness.',
          'Expose trade-offs customers actually feel.',
          'Align outward promise with delivery and pricing reality.',
        ],
        practiceActivities: [
          'Written critique: competitor comparison table → positioning adjustment.',
          'Rewrite hero/header copy into spine + proof hook + disqualifier line.',
        ],
        recap: true,
        expectedOutputs: ['Positioning spine + proof wedge draft'],
      },
      {
        id: 'mg-m04',
        order: 4,
        title: 'Messaging architecture: claim ladder, proofs, tone guardrails',
        stage: 'applied_practice',
        summary:
          'Translate positioning into layers—through-line, pillars, proofs—so creative diverges safely and compliance stays sane.',
        learningGoals: [
          'Sequence claims so variants stay on-brand and falsifiable.',
          'Define tone boundaries (risky vs. bland) tied to segments.',
          'Identify regulated or sensitive claims needing legal review hygiene.',
        ],
        practiceActivities: [
          'Message matrix: segment × pillar × proof hook × risk flag.',
          'Proof gap sheet: claim → proof needed → owner → deadline.',
        ],
        expectedOutputs: ['Messaging architecture one-pager'],
      },
      {
        id: 'mg-m05',
        order: 5,
        title: 'Content operating model: themes, calendar, repurposing with intent',
        stage: 'applied_practice',
        summary:
          'Run content like production—pillar cadence, reuse rules, QC gates—so distribution scales without turning into noise.',
        learningGoals: [
          'Tie calendar rows to funnel stage and proof asset.',
          'Repurpose with purpose (format fit), not volume.',
          'Define minimum quality bar per surface (blog vs. social vs. email).',
        ],
        practiceActivities: [
          'Eight-week editorial skeleton with pillar tags + distribution slots.',
          'Repurpose map from one flagship asset across three channels with rationale.',
        ],
        expectedOutputs: ['Editorial calendar v1'],
      },
      {
        id: 'mg-m06',
        order: 6,
        title: 'Channel economics: fit, workload, sequencing experiments',
        stage: 'applied_practice',
        summary:
          'Pick channels as capital-limited bets—creative load, cash timing, and the KPI set (efficiency, volume, quality) you will watch per channel, with kill criteria explicit.',
        learningGoals: [
          'Score channel fit vs. audience behavior and proof needs.',
          'Define 3–5 channel KPIs per bet (e.g., CAC band, CTR→CVR funnel, retention proxy) without false precision.',
          'Sequence experiments so learning compounds; tie each to a dashboard row you can review weekly.',
        ],
        practiceActivities: [
          'Channel scorecard: fit, core KPIs, cost envelope, creative burden, kill rule when KPIs breach.',
          'Workload estimate per channel with honest creator hours.',
          'Draft a one-row “weekly channel review” template: KPIs, variance vs. hypothesis, next action.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Channel economics scorecard + weekly KPI review strip'],
      },
      {
        id: 'mg-m07',
        order: 7,
        title: 'Integrated campaign design: offer logic, narrative arc, landing story',
        stage: 'professional_execution',
        summary:
          'Design offers and motion so message, mechanic, and follow-up align—tie each stage to campaign KPIs (intent, activation, conversion, velocity) before blaming “traffic.”',
        learningGoals: [
          'Define campaign KPI ladder from spend → attention → intent → conversion with stage owners.',
          'Storyboard buyer motion including drop-off hypotheses you could confirm in analytics.',
          'Isolate leakage hypotheses before changing spend; specify which KPI movement would prove/disprove each.',
        ],
        practiceActivities: [
          'Campaign brief: KPI targets + unknowns listed + smallest test next + owners named.',
          'Landing outline mapped to objections with proof placement + funnel-stage success metric per step.',
        ],
        expectedOutputs: ['Campaign brief v1 + campaign KPI ladder'],
      },
      {
        id: 'mg-m08',
        order: 8,
        title: 'Conversion systems: friction, trust, ethics, follow-through',
        stage: 'professional_execution',
        summary:
          'Raise conversion through clarity and trust—map funnel-stage KPIs (visit → intent → signup → activation) so fixes target measurable leaks, not opinions.',
        learningGoals: [
          'Qualitative funnel diagnosis anchored to conversion metrics and segment slices.',
          'Ethical urgency patterns vs. dark patterns checklist.',
          'Follow-up sequences tied to objections, consent, and measurable lift hypotheses.',
        ],
        practiceActivities: [
          'Heuristic walkthrough of live funnel: annotate friction points + hypothesized KPI impact.',
          'Rewrite three microcopy moments with ethics + rationale notes + expected metric direction.',
        ],
        expectedOutputs: ['Conversion friction audit + funnel KPI notes + ethical microcopy sheet'],
      },
      {
        id: 'mg-m09',
        order: 9,
        title: 'Growth KPIs, dashboards, and analytics under uncertainty',
        stage: 'professional_execution',
        summary:
          'Own the growth performance story: pick campaign and channel KPIs deliberately, read dashboard and export views skeptically (filters, cohorts, windows), translate weekly metrics into decisions—not vanity recap—with incrementality humility.',
        learningGoals: [
          'Build a compact growth KPI tree (north-star growth outcome → channel/campaign drivers → diagnostics).',
          'Explain attribution ceilings, platform bias, and confounders to executives plainly.',
          'Design experiments sized to decisions—kill rules when KPIs or guardrails breach.',
          'Run a structured weekly dashboard review: variance vs. plan, surprises, experiment reads, next actions.',
        ],
        practiceActivities: [
          'Experiment brief: hypothesis, unit of randomization, ethics, minimum detectable effect, primary KPI + guardrails.',
          'Annotate a growth dashboard or export pack: write the decision each chart supports and three misread risks.',
          'Weekly growth metrics memo: learning, surprises, kill/pivot triggers, next action—not activity recap.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Growth KPI tree + experiment brief + weekly dashboard review memo template'],
      },
      {
        id: 'mg-m10',
        order: 10,
        title: 'AI in the growth stack: amplification with verification',
        stage: 'mastery_outputs',
        summary:
          'Use AI for drafts, variants, and research support only under explicit QA—rubric-first review, proof-doctrine checks, and incident-style logging when claims or tone drift, so amplification never outruns evidence you can show in the dossier.',
        learningGoals: [
          'Insert rubric-based QA before anything ships.',
          'Maintain guardrails on claims and tone.',
          'Red-team outputs for hallucinated proof.',
        ],
        practiceActivities: [
          'Score a variant batch against rubric + revise weakest.',
          'Red-team AI-generated claims against proof doctrine.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['AI-assisted QA checklist'],
      },
      {
        id: 'mg-m11',
        order: 11,
        title: 'Campaign dossier rehearsal: critique, tighten, ship v1',
        stage: 'mastery_outputs',
        summary:
          'Merge spine, experiments, assets, measurement, and risk sections into one CFO- and customer-credible dossier—trace each deliverable to prior module outputs, then cut scope until every claim maps to proof or an honest gap.',
        learningGoals: [
          'Integrate artifacts into single narrative arc.',
          'Accept critique without expanding scope blindly.',
          'Ship v1 strong enough to learn from.',
        ],
        practiceActivities: [
          'Structured peer critique using dossier rubric.',
          'Revision log: cuts, additions, deferred ideas.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Growth dossier v1'],
      },
    ],
  },

  'business-builder': {
    slug: 'business-builder',
    estimatedDurationLabel: 'Roughly 60–90 hours of study and practice',
    depthLabel:
      'Venture mechanics under constraint: validated demand, priced offers, cash-aware delivery, operating KPIs you review on a rhythm, and lightweight management reporting—built for scrutiny, not inspiration.',
    reinforcementSignals: [
      'Kill-criteria validation before spend—evidence thresholds you write in advance',
      'Unit economics & margin literacy tied to pricing, throughput, and a small set of operating KPIs',
      'Weekly/monthly business review discipline: bottleneck, burn/runway proxies, funnel or delivery metrics you actually own',
      'Operating maps that name owners, cadence, tools, failure signals, and metric thresholds',
      'Growth sequenced after delivery can keep promises',
      'Blueprint reads like a diligence packet: KPIs, risks, mitigations, next proof to collect',
    ],
    capstone: {
      title: 'Operating & growth blueprint: diligence-ready pack',
      description:
        'Assemble one integrated pack for a venture you are actually building or advising: demand story with evidence, offer and pricing doctrine, unit economics + cash scenarios, delivery system map, operating cadence, staged growth bets, team/contractor outline, risk register with mitigations and kill criteria. Written so a skeptical partner could stress-test it in a single sitting.',
      deliverables: [
        'Problem–offer narrative with validation appendix (signals, thresholds, failed tests)',
        'Unit economics worksheet + rolling cash scenario narrative (best / base / stress)',
        'Operating KPI & health snapshot: margin/pricing/cash proxies, throughput signals, weekly or monthly review ritual',
        'Operating system diagram: workflows, owners, tools, weekly cadence',
        'Delivery & capacity plan linked to promise (bottleneck + quality bar)',
        'Staged growth hypothesis backlog with sequencing, KPI gates, and kill rules',
        'Risk register with mitigations, triggers, escalation owners',
      ],
    },
    modules: [
      {
        id: 'bb-m01',
        order: 1,
        title: 'Venture framing: painful problems, substitutes, survivable scope',
        stage: 'foundations',
        summary:
          'Differentiate hobby energy from ventures worth years—name substitutes, stamina limits, and falsifiable pain.',
        learningGoals: [
          'Draft falsifiable problem statements with observable pain signals.',
          'Map substitutes and inertia without caricature.',
          'Choose initial scope bounded by cash and calendar reality.',
        ],
        practiceActivities: [
          'Rank five hypotheses by evidence strength + cost to learn next.',
          'Substitution map: why buyers stay with status quo today.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Problem framing + substitution map'],
      },
      {
        id: 'bb-m02',
        order: 2,
        title: 'Validation without self-deception: interviews, probes, kill criteria',
        stage: 'foundations',
        summary:
          'Spend learning dollars before building dollars—structured interviews, cheap experiments, pre-written kill rules.',
        learningGoals: [
          'Ask questions that expose willingness to pay / change behavior.',
          'Define evidence thresholds before results arrive.',
          'Stop or pivot without shame when thresholds miss.',
        ],
        practiceActivities: [
          'Interview guide + synthesis memo with contradictory evidence preserved.',
          'Experiment card: hypothesis, spend cap, metric, kill date.',
        ],
        expectedOutputs: ['Discovery interview kit + experiment cards'],
      },
      {
        id: 'bb-m03',
        order: 3,
        title: 'Offer design: outcome, mechanism, proof, capacity check',
        stage: 'foundations',
        summary:
          'Turn insight into something purchasable—explicit mechanism, proof assets, delivery limits stated upfront.',
        learningGoals: [
          'Articulate outcome, mechanism, proof, pricing posture together.',
          'Expose delivery capacity constraints early.',
          'Stress-test promise vs. ops reality.',
        ],
        practiceActivities: [
          'Offer one-pager with proof hooks + explicit non-goals.',
          'Peer critique for overclaim + capacity mismatch.',
        ],
        recap: true,
        expectedOutputs: ['Offer one-pager v1'],
      },
      {
        id: 'bb-m04',
        order: 4,
        title: 'Business model stress test: dependencies, cash engines, fragility',
        stage: 'applied_practice',
        summary:
          'Use canvas-style thinking to expose coupled assumptions—who must say yes, what breaks cash, where partners hide risk.',
        learningGoals: [
          'Surface hidden dependencies across channels and partners.',
          'Link activities to cash-out and cash-in timing.',
          'Name single points of failure + mitigation experiments.',
        ],
        practiceActivities: [
          'Annotated canvas with risk callouts per cell.',
          'Kill-test two brittle dependencies with smallest possible probes.',
        ],
        expectedOutputs: ['Annotated canvas + dependency memo'],
      },
      {
        id: 'bb-m05',
        order: 5,
        title: 'Pricing discipline: value math, sensitivity, ethical floors',
        stage: 'applied_practice',
        summary:
          'Price from delivered value and cost to serve—document assumptions, tiers, discount rules before negotiations.',
        learningGoals: [
          'Construct tier logic tied to outcomes delivered.',
          'Model margin sensitivity honestly.',
          'Discuss price with clarity and ethical floors.',
        ],
        practiceActivities: [
          'Pricing worksheet: tiers, anchors, sensitivity table.',
          'Objection rehearsal with scripts that avoid race-to-bottom.',
        ],
        expectedOutputs: ['Pricing worksheet v1'],
      },
      {
        id: 'bb-m06',
        order: 6,
        title: 'Throughput before hype: bottlenecks, quality bar, proportional tooling',
        stage: 'applied_practice',
        summary:
          'Stabilize delivery before pouring demand on it—find the constraint, define done, pick tools that match stage, and pick a tiny operating KPI set (throughput, defect/leak rate, cycle time) you can review weekly.',
        learningGoals: [
          'Locate bottleneck resource or policy constraint.',
          'Specify quality definitions customers feel.',
          'Choose 3–5 operating metrics that signal health without drowning the team.',
          'Reject tooling theatre—choose minimal viable stack.',
        ],
        practiceActivities: [
          'Process sketch with bottleneck marked + mitigation experiment.',
          'Hypothetical quality incident retro → preventive control.',
          'Draft an operating KPI strip: metric, definition, owner, weekly review question.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Throughput map + quality bar + operating KPI strip'],
      },
      {
        id: 'bb-m07',
        order: 7,
        title: 'Operating rhythm: cadences owners actually attend',
        stage: 'professional_execution',
        summary:
          'Replace tool sprawl with rituals—weekly anchors, documented decisions, visible owners—and embed a lean management review: burn/runway glance, bottleneck KPIs, revenue/cash proxies as appropriate.',
        learningGoals: [
          'Design weekly/monthly cadence tied to bottleneck with a standing metrics agenda block.',
          'Separate vanity updates from KPI moves that trigger decisions.',
          'Draft playbook sections people will open under stress.',
          'Cut coordination meetings through clearer async norms.',
        ],
        practiceActivities: [
          'Cadence calendar with agenda templates including a 10-minute KPI snapshot section.',
          'Playbook skeleton for critical path workflow.',
          'Write a one-page business review outline: what numbers, what definitions, what decisions.',
        ],
        expectedOutputs: ['Operating cadence calendar + management review outline + playbook skeleton'],
      },
      {
        id: 'bb-m08',
        order: 8,
        title: 'Judgment under overload: cuts, logs, burnout avoidance',
        stage: 'professional_execution',
        summary:
          'Prioritize ruthlessly—decision logs, transparent cuts, protective capacity for founders.',
        learningGoals: [
          'Keep decision logs stakeholders can replay.',
          'Deliver “no” memos that preserve relationships.',
          'Identify burnout traps (heroics, vague yeses).',
        ],
        practiceActivities: [
          'Prioritization matrix with explicit deferred list.',
          'Decision memo on one uncomfortable trade-off.',
        ],
        expectedOutputs: ['Prioritization matrix + trade-off memo'],
      },
      {
        id: 'bb-m09',
        order: 9,
        title: 'Early people reality: hires, contractors, norms that scale',
        stage: 'professional_execution',
        summary:
          'Staff against the constraint—contracts, incentives, communication basics that survive growth.',
        learningGoals: [
          'Write hire profile tied directly to bottleneck.',
          'Contrast contractor vs. employee trade-offs for your stage.',
          'Codify culture as observable behaviors.',
        ],
        practiceActivities: [
          'Role spec + scorecard + sourcing plan.',
          'Contractor onboarding checklist + success signals.',
        ],
        expectedOutputs: ['Hire profile pack + onboarding checklist'],
      },
      {
        id: 'bb-m10',
        order: 10,
        title: 'Measured expansion: loops, cohort honesty, retention economics',
        stage: 'mastery_outputs',
        summary:
          'Sequence growth after delivery holds—pick loops that match stage; define activation/retention KPIs and cohort windows you will not cherry-pick.',
        learningGoals: [
          'Select growth loops consistent with promise and capacity.',
          'Define activation and retention KPIs with honest denominators.',
          'Interpret cohort behavior without vanity; tie interventions to KPI movement hypotheses.',
        ],
        practiceActivities: [
          'Growth hypothesis backlog sequenced by learning/cost with KPI gate per stage.',
          'Retention sketch: churn drivers + intervention hypotheses + metric you will watch weekly.',
        ],
        expectedOutputs: ['Growth sequencing memo + cohort KPI sketch'],
      },
      {
        id: 'bb-m11',
        order: 11,
        title: 'Blueprint integration: advisor-ready rehearsal',
        stage: 'mastery_outputs',
        summary:
          'Compile narrative, economics, systems, growth, risks—cut duplication, invite sharp questions.',
        learningGoals: [
          'Merge modules into single coherent diligence story.',
          'Stress-test with outsider prompts.',
          'Commit to quarterly blueprint refresh.',
        ],
        practiceActivities: [
          'Mock advisor review with question log.',
          'Second pass: tighten claims, drop filler.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Operating & growth blueprint v1'],
      },
    ],
  },

  'clear-communication': {
    slug: 'clear-communication',
    estimatedDurationLabel: 'Roughly 45–70 hours of study and practice',
    depthLabel:
      'Executive-grade writing craft: audience-intent discipline, structural clarity, persuasion with integrity, revision systems—not “good grammar” cosplay.',
    reinforcementSignals: [
      'Genre labs where structure is falsifiable (outline survives stranger test)',
      'Compression drills that preserve uncertainty honestly',
      'Critique loops that attack inference leakage, not just tone',
      'Portfolio curation with explicit stakes ladder',
      'Editorial doctrine you can reuse under fatigue',
    ],
    capstone: {
      title: 'Communication portfolio + editorial doctrine',
      description:
        'Curate three polished artifacts at meaningfully different stakes (e.g., executive decision ask, stakeholder brief with recommendations, narrative explanation for skeptical readers) plus a personal editorial standard sheet (voice boundaries, ethics lines, revision rubric). Everything should read like it survived a tired reviewer at month-end.',
      deliverables: [
        'Executive summary + explicit decision ask + downside framing',
        'Stakeholder brief separating facts / interpretations / recommendations',
        'Third artifact at contrasting stakes (memo, narrative, or async update suite)',
        'Editorial checklist + voice/style boundaries + “never do this” rules',
      ],
    },
    modules: [
      {
        id: 'cc-m01',
        order: 1,
        title: 'Thinking in audiences, intents, and constraints',
        stage: 'foundations',
        summary:
          'Anchor every piece: who decides, what “done” means, what risks they fear—before sentences.',
        learningGoals: [
          'Name reader, decision, success signal, and time budget.',
          'Calibrate depth to stakes—no accidental essays in inboxes.',
          'Surface constraints (legal, political, operational) up front.',
        ],
        practiceActivities: [
          'Reverse-outline an external memo; mark buried ledes + missing asks.',
          'Ten intent one-liners on real situations you face this month.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Audience–intent worksheet'],
      },
      {
        id: 'cc-m02',
        order: 2,
        title: 'Structure before polish: outlines that survive contact',
        stage: 'foundations',
        summary:
          'Build skeletons reviewers can navigate—sequence, claims, evidence slots—before polishing prose.',
        learningGoals: [
          'Prototype outlines strangers can stress-test.',
          'Match structures to genre (memo vs. narrative vs. update).',
          'Keep the ethical lead visible—no burying downside in footnotes.',
        ],
        practiceActivities: [
          'Outline swap + confusion hunt with a peer.',
          'Rewrite the same opening in three structural frames; pick winner with rationale.',
        ],
        expectedOutputs: ['Tested outline'],
      },
      {
        id: 'cc-m03',
        order: 3,
        title: 'Plain language without dumbing down',
        stage: 'foundations',
        summary:
          'Cut nominalizations and zombie nouns—keep precision for terms that earn their syllables.',
        learningGoals: [
          'Rewrite abstract nouns into actors + verbs where possible.',
          'Define specialist terms once, then reuse consistently.',
          'Preserve nuance with shorter sentences instead of jargon stacks.',
        ],
        practiceActivities: [
          'Jargon audit on your own writing sample; score each term: keep vs. kill.',
          'Constraint game: rewrite dense paragraph losing no legal/technical meaning.',
        ],
        recap: true,
        expectedOutputs: ['Plain-language pass + term bank'],
      },
      {
        id: 'cc-m04',
        order: 4,
        title: 'Professional writing: emails, updates, and async hygiene',
        stage: 'applied_practice',
        summary:
          'Make async artifacts decision-ready—subject lines, scoped asks, timelines, escalation cues.',
        learningGoals: [
          'Write updates that force a decision or explicit deferral.',
          'Subject-line conventions your team could adopt.',
          'Keep threads actionable—summaries, owners, links.',
        ],
        practiceActivities: [
          'Rewrite three messy threads into crisp async packets.',
          'Draft update template pack (daily/weekly/blocker).',
        ],
        expectedOutputs: ['Async update template suite'],
      },
      {
        id: 'cc-m05',
        order: 5,
        title: 'Summaries and briefs: fidelity vs. compression',
        stage: 'applied_practice',
        summary:
          'Compress without laundering uncertainty—every contested claim gets a breadcrumb—including KPI or performance summaries where variance and definitions matter.',
        learningGoals: [
          'Produce TL;DR → medium → detail layers with traceable facts.',
          'Summarize metric movements without inventing causal stories the data cannot support.',
          'Flag confidence levels honestly.',
          'Choose depth per audience without hiding material risk.',
        ],
        practiceActivities: [
          'Three-tier summary ladder on a contested document.',
          'Short drill: summarize a KPI strip + chart in three sentences—movement, limits of interpretation, decision ask.',
          'Adversarial partner tries to prove you omitted downside—revise.',
        ],
        expectedOutputs: ['Layered summary set + KPI summary micro-drill notes'],
      },
      {
        id: 'cc-m06',
        order: 6,
        title: 'Reports and memos: recommendations with evidence lanes',
        stage: 'applied_practice',
        summary:
          'Separate facts, interpretations, and bets—appendices carry receipts executives can inspect.',
        learningGoals: [
          'Lane facts vs. interpretations vs. recommendations visually.',
          'Design appendices readers actually open—tables, chronologies, citations.',
          'Keep exec summaries accountable to evidence lanes.',
        ],
        practiceActivities: [
          'Memo skeleton with appendix plan + owner per exhibit.',
          'Cross-review dyad hunting inference leakage.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Memo skeleton + appendix map'],
      },
      {
        id: 'cc-m07',
        order: 7,
        title: 'Persuasion with integrity: stakes, ethics, and proof',
        stage: 'professional_execution',
        summary:
          'Map objections fairly—earn persuasion through proof and transparency, not pressure.',
        learningGoals: [
          'Assign burden of proof explicitly per claim.',
          'Choose ethical persuasion moves you could defend publicly.',
          'Surface tradeoffs competitors would exploit if hidden.',
        ],
        practiceActivities: [
          'Argument map including strongest counter-case.',
          'Rewrite pushy passage with ethical markers + proof hooks.',
        ],
        expectedOutputs: ['Ethical argument map'],
      },
      {
        id: 'cc-m08',
        order: 8,
        title: 'Speaking and presentation thinking (writing-first)',
        stage: 'professional_execution',
        summary:
          'Story beats slides—design narratives that survive without projector mercy.',
        learningGoals: [
          'Draft talk track before any slide pixels.',
          'Speaker notes that teach, not cue cards.',
          'Anticipate hostile Q&A without defensiveness.',
        ],
        practiceActivities: [
          'Ten-point storyline with decision ask—no slides yet.',
          'Q&A matrix: question → fact → stance → defer/research.',
        ],
        expectedOutputs: ['Talk track + Q&A matrix'],
      },
      {
        id: 'cc-m09',
        order: 9,
        title: 'Editing and refinement: systems for revision',
        stage: 'professional_execution',
        summary:
          'Cool-off passes, rubrics, structural feedback—revision as engineering, not mood.',
        learningGoals: [
          'Self-edit using hierarchy: logic → clarity → polish.',
          'Deliver feedback that reframes structure, not fonts.',
          'Recognize when outlines must reset.',
        ],
        practiceActivities: [
          'Two-pass edit with rubric + timed cool-off between passes.',
          'Structured feedback exchange with revision log.',
        ],
        expectedOutputs: ['Revision rubric + annotated draft'],
      },
      {
        id: 'cc-m10',
        order: 10,
        title: 'Portfolio assembly and capstone polish',
        stage: 'mastery_outputs',
        summary:
          'Curate artifacts across stakes ladder—portfolio tells a coherent professional story.',
        learningGoals: [
          'Pick pieces that prove range + judgment, not volume.',
          'Harmonize voice without sanding off personality.',
          'Publish editorial doctrine others could apply.',
        ],
        practiceActivities: [
          '150-word portfolio narrative tying pieces together.',
          'Polish sprint with critique partner + changelog.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Portfolio v1'],
      },
    ],
  },

  'career-launch': {
    slug: 'career-launch',
    estimatedDurationLabel: 'Roughly 45–65 hours of study and practice',
    depthLabel:
      'Evidence-backed placement: receipts before adjectives, experiments before burnout, negotiation clarity without hustle cosplay.',
    reinforcementSignals: [
      'STAR-style proof tied to outcomes—not keyword stuffing',
      'Structured interview rehearsal with revision notes',
      'Networking exercises that reward curiosity over extraction',
      'Pipeline metrics that expose weak bets early',
      'Pack designed to iterate monthly as proof improves',
    ],
    capstone: {
      title: 'Professional readiness pack (positioning, proof, pipeline)',
      description:
        'Integrate everything into one reviewer-ready folder for your near-term targets: positioning thesis tied to receipts, curated evidence library with integrity checks, tailored résumé/profile variants with honesty audit, prioritized target map with hypotheses per segment, repeatable outreach system, interview story system + objection matrix, negotiation framing notes, and a 90-day capability plan with measurable milestones.',
      deliverables: [
        'Positioning statement + proof gaps list + next-experiment plan',
        'Evidence library (project sheets with metrics/artifacts) + tailored résumé/profile',
        'Target map with outreach experiments + weekly pipeline review ritual',
        'Interview system (story bank, drills, question strategy) + negotiation one-pager',
      ],
    },
    modules: [
      {
        id: 'cl-m01',
        order: 1,
        title: 'Career direction without magical thinking',
        stage: 'foundations',
        summary:
          'Translate aspirations into quarter-scale hypotheses—constraints, runway, and energy on the same page—so exploration stays honest and pivots earn data, not drama.',
        learningGoals: [
          'Separate identity romance from near-term role hypotheses.',
          'Document immovable constraints (visa, geography, caregiving, compensation floor).',
          'Pick exploration vs. exploitation ratio for this quarter.',
        ],
        practiceActivities: [
          'Constraint inventory with mitigation or acceptance notes.',
          'Hypothesis list: role families + signals that would validate/pivot each.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Direction hypothesis sheet'],
      },
      {
        id: 'cl-m02',
        order: 2,
        title: 'Skills and value mapping with evidence',
        stage: 'foundations',
        summary:
          'Replace adjectives with receipts—map projects, metrics, and artifacts to specific claims so résumés, profiles, and interviews stay falsifiable under skeptical reads.',
        learningGoals: [
          'Translate activity lists into outcome bullets.',
          'Spot proof gaps before you market them.',
          'Prioritize skill investments tied to target roles.',
        ],
        practiceActivities: [
          'Evidence spreadsheet: project, outcome, metric/artifact, gap.',
          'Gap-closure plan for top two missing proofs with deadline.',
        ],
        expectedOutputs: ['Evidence bank v1'],
      },
      {
        id: 'cl-m03',
        order: 3,
        title: 'Résumé and CV as argument, not autobiography',
        stage: 'foundations',
        summary:
          'Line-level argument for ATS and humans—tie each bullet to outcomes, scope, and proof so credibility holds without inflation or keyword stuffing.',
        learningGoals: [
          'Align bullets to posted criteria + transferable framing.',
          'Quantify with integrity—ranges, denominators, caveats.',
          'Tune keyword coverage without robotic stuffing.',
        ],
        practiceActivities: [
          'Rewrite eight bullets into outcome + metric + scope pattern.',
          'Honesty audit: flag stretch phrases; revise or delete.',
        ],
        recap: true,
        expectedOutputs: ['Résumé/CV rewrite draft'],
      },
      {
        id: 'cl-m04',
        order: 4,
        title: 'Profiles and portfolios: coherent public narrative',
        stage: 'applied_practice',
        summary:
          'Unify headline, proof, and story so the same accountable person shows up across LinkedIn, site, GitHub, or portfolio—bounded disclosure for confidential work included.',
        learningGoals: [
          'Craft headline + about that mirror evidence bank.',
          'Curate featured work that proves promised strengths.',
          'Choose visibility boundaries for confidential work.',
        ],
        practiceActivities: [
          'Three headline/subtitle variants tested against target roles.',
          'Featured-work rationale doc: why these pieces, what each proves.',
        ],
        expectedOutputs: ['Public narrative draft'],
      },
      {
        id: 'cl-m05',
        order: 5,
        title: 'Job search strategy: targets, pipelines, experiments',
        stage: 'applied_practice',
        summary:
          'Run a portfolio of bets—weekly experiments with metrics and retros—so outreach, applications, and intros compound instead of feeding endless browsing guilt.',
        learningGoals: [
          'Segment targets by thesis (problem, culture, proof fit).',
          'Define pipeline metrics you will review weekly.',
          'Kill or pivot channels that fail learning-per-hour.',
        ],
        practiceActivities: [
          'Shortlist with company thesis + risk notes.',
          'Design two outreach experiments with success metrics + stop rules.',
          'Draft a one-row weekly pipeline review: applications, conversations, interviews, offers-in-flight + next week’s bet.',
        ],
        expectedOutputs: ['Target map + experiment cards + pipeline review strip'],
      },
      {
        id: 'cl-m06',
        order: 6,
        title: 'Networking that isn’t transactional theater',
        stage: 'applied_practice',
        summary:
          'Treat networking as disciplined relationship experiments: prepare conversations that reference real work, follow up with incremental value, and capture learning loops even when no role is open—without vague flattery or guilt-laden pings.',
        learningGoals: [
          'Prepare questions referencing recipient’s work—no generic flattery.',
          'Follow up with incremental value or clarity, not guilt.',
          'Capture learning loops even when no job opens.',
        ],
        practiceActivities: [
          'Conversation prep template: context, question, offer, close.',
          'Follow-up ladder (day 3 / 10 / 21) with sample copy.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Networking system draft'],
      },
      {
        id: 'cl-m07',
        order: 7,
        title: 'Interviews: behavioral depth and technical storytelling',
        stage: 'professional_execution',
        summary:
          'Build STAR-style stories with integrity—metrics, scope, and tradeoffs explicit—plus rehearsal for curveballs so answers stay structured under pressure, not improvised polish.',
        learningGoals: [
          'Maintain STAR bank mapped to competency themes.',
          'Answer curveballs with structure + honest caveats.',
          'Probe interviewers with mutual respect—signal discernment.',
        ],
        practiceActivities: [
          'Record mock interview; score against rubric (clarity, evidence, reflection).',
          'Employer question bank customized to two target companies.',
        ],
        expectedOutputs: ['STAR bank + mock critique'],
      },
      {
        id: 'cl-m08',
        order: 8,
        title: 'Case-style and scenario thinking',
        stage: 'professional_execution',
        summary:
          'Practice structured decomposition—hypotheses first, explicit tradeoffs, and quick sanity math where apt—so interview scenarios read as judgment, not brainstorming.',
        learningGoals: [
          'Frame problem before pitching solutions.',
          'State assumptions + how you’d validate.',
          'Communicate tradeoffs under time pressure.',
        ],
        practiceActivities: [
          'Timed scenario outlines with explicit assumptions column.',
          'Peer critique focused on logic gaps, not polish.',
        ],
        expectedOutputs: ['Scenario response templates'],
      },
      {
        id: 'cl-m09',
        order: 9,
        title: 'Workplace readiness: norms, async, conflict hygiene',
        stage: 'professional_execution',
        summary:
          'Operate reliably in modern async teams—signal reliability without performative hustle, receive feedback without spiraling, and escalate conflicts with clarity and warmth.',
        learningGoals: [
          'Calibrate reliability signals (commit/ship/reply).',
          'Receive feedback without spiraling; escalate thoughtfully.',
          'Set boundaries with clarity + warmth.',
        ],
        practiceActivities: [
          'First 90 days plan with stakeholder map.',
          'Conflict rehearsal scripts for credit, priority, and feedback clashes.',
        ],
        expectedOutputs: ['Onboarding operating doc'],
      },
      {
        id: 'cl-m10',
        order: 10,
        title: 'Offers, negotiation framing, and decision quality',
        stage: 'mastery_outputs',
        summary:
          'Negotiate from preparation—BATNA, creative trade space, and regret minimization—so comp, role, and risk tradeoffs stay explicit before you accept, delay, or walk.',
        learningGoals: [
          'Decode offer components beyond base salary.',
          'Ask discovery questions that reveal real constraints.',
          'Delay/accept/reject with explicit criteria.',
        ],
        practiceActivities: [
          'Negotiation worksheet with walk-away + package trades.',
          'Decision matrix for competing offers including non-monetary factors.',
        ],
        expectedOutputs: ['Negotiation + decision packet'],
      },
      {
        id: 'cl-m11',
        order: 11,
        title: 'Long-term growth and capstone readiness pack',
        stage: 'mastery_outputs',
        summary:
          'Integrate proof, targeting, outreach, interviews, and negotiation artifacts into one reviewer-ready folder—with traceability from capstone deliverables back to module outputs and a quarterly refresh plan.',
        learningGoals: [
          'Integrate artifacts into coherent narrative + evidence trail.',
          'Schedule quarterly refresh + proof backlog.',
          'Define next experiments after capstone.',
        ],
        practiceActivities: [
          'Capstone assembly checklist walkthrough.',
          'Peer review swap with rubric + revision log.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Career readiness pack v1'],
      },
    ],
  },
}

export const FLAGSHIP_CURRICULA = {
  ...FLAGSHIP_CURRICULA_BASE,
  ...FLAGSHIP_CURRICULA_EXTENDED,
  ...FLAGSHIP_CURRICULA_EXTENDED_2,
} as Record<FlagshipCurriculumSlug, FlagshipCourseCurriculum>

export function getFlagshipCurriculum(slug: string): FlagshipCourseCurriculum | undefined {
  if (slug in FLAGSHIP_CURRICULA) {
    return FLAGSHIP_CURRICULA[slug as FlagshipCurriculumSlug]
  }
  return undefined
}

export function hasFullFlagshipCurriculum(slug: string): slug is FlagshipCurriculumSlug {
  return slug in FLAGSHIP_CURRICULA
}
