/**
 * AI Essentials (Course 1) — sixteen-module flagship spine aligned to the bundled assessment bank
 * (ae-m01…ae-m16) and platform lesson-block map. Imported by flagshipCourseCurricula only.
 */

import type { FlagshipCurriculumModule } from './flagshipCurriculumTypes'

export const AI_ESSENTIALS_FLAGSHIP_MODULES: FlagshipCurriculumModule[] = [
  {
    id: 'ae-m01',
    order: 1,
    title: 'AI Foundations and Human Judgment',
    stage: 'foundations',
    summary:
      'Ground how modern language models behave (fluent but fallible), where human judgment stays non‑negotiable, and how you will classify stakes before you ever optimize prompts. You learn to read outputs as hypotheses, not verdicts—and to keep a personal “failure‑mode first” lens when any tool sounds confident.',
    learningGoals: [
      'Contrast fluent tone with factual reliability; name at least three recurring failure families (fabrication, omission, overconfidence, missing caveats).',
      'Explain prompts as operational instructions plus context and constraints—not magic phrases—and why thin prompts invite thin reasoning.',
      'Sort work into verification‑mandatory vs. lightweight review using reversibility, blast radius, and professional duty.',
      'Draft a stakeholder‑safe explanation of limits without buzzwords or model bragging.',
    ],
    practiceActivities: [
      'Cold‑read three real or realistic model outputs; label fabrication, omission, tone risk, or missing caveats; note which missing prompt constraints could have contributed.',
      'Write five sentences you would never treat as true without an independent check—and say what evidence would change your mind.',
      'Role pathways: pick two of (student, professional, entrepreneur, creator, manager, educator) and note how judgment stakes differ for the same task.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: ['Failure‑mode note sheet', 'Stake classification table for five recurring tasks'],
  },
  {
    id: 'ae-m02',
    order: 2,
    title: 'Understanding How AI Responds',
    stage: 'foundations',
    summary:
      'Demystify hype and harmful shortcuts: memorization vs. reasoning metaphors (and where metaphors fail), vendor claims vs. reproducible checks, and prompt myths that waste time. You build a myth‑correction habit you can defend in conversation—evidence over vibes.',
    learningGoals: [
      'List five prompt failure modes (ambiguity, missing audience, missing evidence rules, missing output shape, missing refusal behavior) and how each shows up in outputs.',
      'Stress‑test one viral AI claim using primary documentation or a small reproducible experiment.',
      'State where accountability stays human even when tools are “accurate enough” for drafts.',
    ],
    practiceActivities: [
      'Fact‑check one popular AI claim; capture sources, confidence, and what would falsify you.',
      'Prompt myth busting: take three social “tips”; run a before/after prompt pair and record whether quality actually moved—and why.',
      'Role pathways: translate one myth into language a skeptical manager vs. a curious student would accept.',
    ],
    recap: true,
    expectedOutputs: ['Expectation reset memo', 'Myth critique sheet with evidence'],
  },
  {
    id: 'ae-m03',
    order: 3,
    title: 'Prompting Fundamentals',
    stage: 'foundations',
    summary:
      'Treat prompts as the primary control surface: intent, audience, constraints, evidence policy, and output shape. Map assistants, retrieval, copilots, and agents to what each interface implies for prompt structure and data handling—before debating “which model.”',
    learningGoals: [
      'Map recurring work to tool classes and name the minimum prompt contract (inputs, forbidden moves, output shape) for two workflows.',
      'Explain why SSO, retention, and data boundaries matter as much as benchmark scores.',
      'Draft evaluation criteria before pilots spend calendar time—including prompt+criteria pairs for acceptance tests.',
    ],
    practiceActivities: [
      'Score five workflows against tool categories + integration requirements; sketch prompt contracts for two.',
      'Document red/yellow/green data handling rules for one workflow—and how prompts must change when the tier changes.',
      'Write one acceptance‑test prompt that checks whether a tool response meets explicit constraints.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: ['Tool‑fit matrix', 'Mini prompt contract + acceptance test for one workflow'],
  },
  {
    id: 'ae-m04',
    order: 4,
    title: 'Prompt Engineering for Structured, Reviewable Outputs',
    stage: 'applied_practice',
    summary:
      'Author prompts like specs: role, goal, constraints, evidence policy, output format, refusal behavior. Iterate with version notes and side‑by‑side comparisons so improvements are inspectable—like code review, not vibes.',
    learningGoals: [
      'Build prompts where ambiguity surfaces early; embed cite vs. infer vs. refuse policies for contested facts.',
      'Diagnose under‑spec, wrong audience, missing negatives, and missing format as first‑class failure modes.',
      'Compare outputs against a simple rubric (clarity, evidence, failure handling, escalation)—not likability.',
    ],
    practiceActivities: [
      'Produce a prompt critique sheet for a weak prompt; rewrite with labeled sections.',
      'Run draft → critique → revise on one gnarly task with versions v0→v2 and a short changelog.',
      'Apply a rubric to two outputs and log which rubric row drove a real edit.',
    ],
    expectedOutputs: ['Prompt critique + improved rewrite', 'Versioned prompt spec v0.2 with changelog'],
  },
  {
    id: 'ae-m05',
    order: 5,
    title: 'Prompt iteration, testing, and reviewable versioning',
    stage: 'applied_practice',
    summary:
      'Professional iteration: hypothesis for each revision, pairwise comparisons, regression checks when “helpful” changes hide new errors. You learn to keep prompt diffs and output diffs aligned so teams can review what changed and why.',
    learningGoals: [
      'Run disciplined A/B prompt tests with fixed evaluation criteria—not random retries.',
      'Detect regression: when a “better” prompt breaks format, safety, or faithfulness—and how to roll back.',
      'Document a mini prompt QA checklist your future self will actually use under time pressure.',
    ],
    practiceActivities: [
      'Take one task through three prompt variants; keep a table of intent, constraints, and observed failure signatures.',
      'Red‑team a “winning” output: find one subtle harm (omission, hedging, false certainty) and tie it to prompt wording.',
      'Role pathways: note how iteration depth differs for coursework vs. customer‑facing copy vs. internal ops notes.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: ['Comparison table + revision log', 'Prompt QA checklist (8–12 lines, operational)'],
  },
  {
    id: 'ae-m06',
    order: 6,
    title: 'Verification, evidence, and trust',
    stage: 'applied_practice',
    summary:
      'Source‑aware use: provenance, hallucination pressure, and proportionate verification. You practice extraction and synthesis moves that keep claims tied to evidence—and executive summaries that preserve uncertainty instead of laundering it.',
    learningGoals: [
      'Design verification lanes by stake level; choose tools and human gates accordingly.',
      'Separate claims from sources; score evidence strength without false precision.',
      'Produce executive synthesis that keeps conflicts visible and recommends next information buys.',
    ],
    practiceActivities: [
      'Build an evidence table for a contested topic with strength scores and explicit gaps.',
      'Executive brief with unknowns logged; no invented citations.',
      'Compare a “summarize fast” prompt vs. an evidence‑disciplined prompt on the same document; capture quality deltas.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: ['Evidence table + brief', 'Verification lane matrix for your contexts'],
  },
  {
    id: 'ae-m07',
    order: 7,
    title: 'AI for writing and communication',
    stage: 'professional_execution',
    summary:
      'Lane‑aware drafting: structure, facts, tone, and release authorization as separate moves. Prompt for extraction and transformation with rules that forbid invention; edit AI prose with inline verification questions—not cosmetic polish only.',
    learningGoals: [
      'Write summarize/extract prompts that forbid invention and require paragraph‑tied claims.',
      'Maintain citation pathways for contested facts; red‑team summaries for omission and spin.',
      'Tailor tone and audience without smuggling new factual claims.',
    ],
    practiceActivities: [
      'Summarize a dense article tagging each claim to a paragraph or “uncited.”',
      'Author two prompt variants (extract facts vs. executive brief) and compare failure modes.',
      'Edit an AI draft with margin notes: verify, cut, or escalate per line.',
    ],
    expectedOutputs: ['Edited draft with marginal verification notes', 'Prompt pair notes for summarization'],
  },
  {
    id: 'ae-m08',
    order: 8,
    title: 'AI for learning, study, and understanding',
    stage: 'professional_execution',
    summary:
      'Use AI as deliberate practice partner—retrieval, explanation, checks—not substitution. Design integrity‑forward study loops with forbidden prompt patterns for graded or certified contexts.',
    learningGoals: [
      'Design study loops where AI supports scaffolding while you retain ownership of judgments and submissions.',
      'Spot when explanatory chat undermines durable understanding.',
      'Codify integrity boundaries for coursework and professional certifications.',
    ],
    practiceActivities: [
      'Author a five‑step study protocol listing AI‑allowed vs. forbidden moves with example prompts for allowed steps only.',
      'Generate quiz items then independently verify keys and rationales without model substitution.',
      'Compare “do my homework” prompts vs. Socratic tutoring prompts; document failure modes of each.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: ['Integrity‑forward study protocol + example prompt patterns'],
  },
  {
    id: 'ae-m09',
    order: 9,
    title: 'Responsible AI use and practical guardrails',
    stage: 'professional_execution',
    summary:
      'Human accountability, disclosure, escalation, and proportionate risk review. Translate responsible‑use principles into operational habits: when to refuse automation, how to label AI assistance, and how to keep review owners visible.',
    learningGoals: [
      'Draft lightweight norms for disclosure, labeling, and review—including forbidden automation zones.',
      'Communicate assistance without undermining trust; pair with stakeholder‑appropriate caveats.',
      'Plug AI steps into ticket/PR/review workflows you already run.',
    ],
    practiceActivities: [
      'RACI map for AI‑supported deliverables with explicit review owners.',
      'Email templates declaring assistance, uncertainty, and verification status.',
      'Responsible‑use checklist mapped to your sector (education, health, finance, public sector, etc.).',
    ],
    expectedOutputs: ['Team / personal AI workflow norms draft', 'Disclosure + escalation templates'],
  },
  {
    id: 'ae-m10',
    order: 10,
    title: 'AI for research, analysis, and synthesis',
    stage: 'professional_execution',
    summary:
      'Collect sources, extract claims, contrast views, and ship synthesis without false certainty. Operational prompt libraries for extract/compare/brief—with evaluation notes on where each pattern breaks.',
    learningGoals: [
      'Design extraction prompts that preserve provenance and disagreement.',
      'Contrast viewpoints without collapsing conflict into a false middle.',
      'Choose proportionate depth of research given deadlines and stakes.',
    ],
    practiceActivities: [
      'Evidence table for a contested topic with explicit conflict rows.',
      'Mini prompt library (3 prompts) for extract / compare / brief with failure notes.',
      'Time‑boxed research sprint: deliverable + “what I still do not know” section.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: ['Evidence table + executive brief', 'Mini research prompt pack + evaluation notes'],
  },
  {
    id: 'ae-m11',
    order: 11,
    title: 'AI for workflows, planning, and task design',
    stage: 'mastery_outputs',
    summary:
      'Redesign work into triggers, SOPs, queues, and human gates. Attach prompt packs to workflow steps so behavior is discussable, versionable, and auditable when stakes rise or tools change.',
    learningGoals: [
      'Encode triggers using stakes × reversibility × blast radius; map prompt variants to triggers.',
      'Plan fallbacks for model or vendor outages humans can still execute.',
      'Stress‑test plans under low‑sleep / high‑interruption realities.',
    ],
    practiceActivities: [
      'Diagram three task families with decision diamonds and named owners.',
      'Friday‑afternoon tabletop: what breaks first? Patch the workflow and update prompt hooks.',
      'Role pathways: how planning artifacts differ for solo creators vs. team leads.',
    ],
    expectedOutputs: ['Workflow diagram + fallback table', 'Mini prompt pack indexed by trigger'],
  },
  {
    id: 'ae-m12',
    order: 12,
    title: 'AI for decision support and critical thinking',
    stage: 'mastery_outputs',
    summary:
      'Decision memos with explicit assumptions, tradeoffs, and falsifiers. Use AI to widen option spaces and stress‑test arguments—while keeping authorship, evidence standards, and accountability with the human decision owner.',
    learningGoals: [
      'Separate options analysis from the decision record; label model‑generated scenarios as hypotheses.',
      'Surface incentives and missing data that would flip a recommendation.',
      'Write decision artifacts a busy executive can challenge on substance.',
    ],
    practiceActivities: [
      'Draft a two‑page decision memo with assumptions, risks, and next information buys.',
      'Run a pre‑mortem on a preferred option using AI as adversary—then reconcile findings honestly.',
      'Role pathways: decision memo for academic vs. commercial vs. civic contexts.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: ['Decision memo + pre‑mortem appendix'],
  },
  {
    id: 'ae-m13',
    order: 13,
    title: 'AI collaboration, norms, and review loops',
    stage: 'mastery_outputs',
    summary:
      'Shared standards, review loops, catalog hygiene, and clear ownership for AI‑assisted work. Design lightweight governance that speeds good work without hiding risk in informal chats.',
    learningGoals: [
      'Define review gates, labeling, and escalation for hybrid human+AI pipelines.',
      'Align prompts and outputs to QA lanes traceable to owners.',
      'Anticipate team failure modes: silent drift, unowned prompts, shadow tools.',
    ],
    practiceActivities: [
      'Author a starter team prompt template with slots for stakeholder, stakes, constraints, review owner.',
      'Design a weekly review ritual for AI‑assisted outputs (metrics + qualitative spot checks).',
      'Facilitator‑light note: how an educator would run peer review with these norms.',
    ],
    expectedOutputs: ['Team AI workflow norms one‑pager', 'Review ritual checklist'],
  },
  {
    id: 'ae-m14',
    order: 14,
    title: 'Reusable prompt systems and operating playbooks',
    stage: 'mastery_outputs',
    summary:
      'Package prompts, critique rubrics, and workflow attachments as versioned assets—not loose chats. Build naming, owners, deprecation, and “when not to use” notes so peers can run your system without you in the room.',
    learningGoals: [
      'Create a small catalog of reusable prompt/spec blocks with dependencies and test notes.',
      'Link prompt packs to workflow triggers and human gates from prior modules.',
      'Schedule refresh triggers when tools, policies, or risks shift.',
    ],
    practiceActivities: [
      'Assemble a prompt pack appendix: 5 reusable prompts with owners, version, and when‑not‑to‑use notes.',
      'Peer walkthrough: can a colleague execute one workflow from your pack cold?',
      'Cut 40% of a bloated draft while keeping safeguards explicit.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: ['Versioned prompt pack + changelog', 'Playbook slice ready for peer review'],
  },
  {
    id: 'ae-m15',
    order: 15,
    title: 'Privacy, risk boundaries, and personal operating safety',
    stage: 'mastery_outputs',
    summary:
      'Protect people and IP with pragmatic classification—what never leaves trusted environments, what belongs in prompts vs. retrieval, and how to respond to suspected leaks or harmful advice. Operational safety beats heroic exceptions.',
    learningGoals: [
      'Label sensitive data tiers tied to realistic tooling constraints; rewrite one risky prompt into a safe variant.',
      'Define escalation paths for suspected leaks, misrepresentation, or unsafe outputs.',
      'Attribute ideas and AI contributions honestly in high‑trust contexts.',
    ],
    practiceActivities: [
      'Classify three real document types with paste/stay‑local rules.',
      'Draft incident outline for suspected data exfiltration or harmful advice.',
      'Pair with ae‑m09: reconcile your norms draft with concrete data‑tier rules.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: ['Sensitivity + escalation sheet', 'Safe prompting rules by data tier'],
  },
  {
    id: 'ae-m16',
    order: 16,
    title: 'Capstone: Responsible AI fluency portfolio',
    stage: 'mastery_outputs',
    summary:
      'Integrate the course into one reviewer‑ready portfolio: prompt improvement evidence, verification artifacts, responsible‑use checklist, AI‑assisted writing or research sample, workflow/productivity artifact, decision‑support memo, personal AI operating system plan, and a final reflection on human judgment. This module is the assembly line—capstone prep session afterward aligns deliverables to the formal brief and rubric.',
    learningGoals: [
      'Map each portfolio element to prior module artifacts vs. gaps to close.',
      'Self‑score against the rubric categories: judgment, prompt quality, evidence discipline, responsibility, workflow usefulness, communication clarity, human review, practical transfer.',
      'Produce an honest gaps list and a sequenced plan to close them before marking prep complete.',
    ],
    practiceActivities: [
      'Portfolio assembly table: artifact → evidence → reviewer question it must survive.',
      'Dry‑run presentation: 10‑minute walkthrough with adversarial Q&A notes.',
      'Role pathways: annotate how each artifact would differ for student vs. manager vs. entrepreneur tracks (same course, different stakes).',
    ],
    recap: true,
    revisionCheckpoint: true,
    expectedOutputs: [
      'Responsible AI fluency portfolio v1 (multi‑part, review‑ready)',
      'Rubric self‑score + gaps list',
      'Reflection: human judgment and responsible use (1–2 pages)',
    ],
  },
]
