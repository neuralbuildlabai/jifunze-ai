/**
 * AI Essentials (Course 1) — sixteen-module flagship spine (ae-m01…ae-m16).
 * Module titles and learning spine match the finalized improved manuscript
 * in `How to use Claude/` (continuity, artifacts, checkpoints per module docs).
 */

import type { FlagshipCurriculumModule } from './flagshipCurriculumTypes'

export const AI_ESSENTIALS_FLAGSHIP_MODULES: FlagshipCurriculumModule[] = [
  {
    id: 'ae-m01',
    order: 1,
    title: 'What AI Is and What It Is Not',
    stage: 'foundations',
    summary:
      'Build an accurate plain-language mental model of modern AI: prediction, generation, retrieval, transformation, and reasoning support—where fluency is not truth, and human judgment stays at the keyboard. You classify stakes, name failure modes, and produce a reviewable AI-use boundary you will revisit in Module 9 and the capstone.',
    learningGoals: [
      'Explain what AI is and is not without “magic,” “thinks,” or “knows everything.”',
      'Distinguish five task types with concrete examples from your own contexts.',
      'Name three strengths and three limits of AI tools you actually use.',
      'Apply a minimum-stakes vs verification-heavy lens before treating any output as actionable.',
    ],
    practiceActivities: [
      'Sentence sort: classify supplied lines as accurate vs misconception vs overclaim (materials in module).',
      'Capability and limitation table: four rows each with real tasks you do.',
      'Scenario judgment: three short workplace/school cases—where would you use AI, pause, or not use it?',
      'Draft *My AI Use Boundary* (one page): definition, two-column will/will-not table, rationale paragraph.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: [
      'Module01_AI_Use_Boundary_[YourName].pdf or .docx',
      'Failure-mode notes from worked examples',
    ],
  },
  {
    id: 'ae-m02',
    order: 2,
    title: 'Myths, Reality, Bias, and Responsible Judgment',
    stage: 'foundations',
    summary:
      'Stress-test viral claims and prompt myths with evidence; name bias patterns in outputs; use a T–R–E–J (Task, Risk, Evidence, Judgment) review habit before you ship AI-assisted work. You leave with a myth-correction sheet and a portfolio-ready judgment artifact.',
    learningGoals: [
      'List eight common myths and the reality correction for each.',
      'Describe three bias types you can check for in model outputs.',
      'Run one documented myth-bust: sources, confidence, falsifier.',
      'State where human accountability remains even when the model sounds polished.',
    ],
    practiceActivities: [
      'Belief poll revisit: reclassify opening statements after the lesson.',
      'Risk ladder: three tasks mapped to review depth.',
      'Bias spot-check on three supplied short outputs (materials in module).',
      'Evidence-bound myth critique on one claim you choose (document sources).',
    ],
    recap: true,
    expectedOutputs: [
      'Module02_Responsible_Judgment_Checklist_[YourName].pdf or .docx',
      'Expectation reset memo tied to evidence',
    ],
  },
  {
    id: 'ae-m03',
    order: 3,
    title: 'Prompts as Control',
    stage: 'foundations',
    summary:
      'Treat the prompt as the primary control surface using T–C–C–F–A (Task, Context, Constraints, Format, Audience). You diagnose weak prompts, run weak-vs-strong pairs on supplied scenarios, and save a before/after rewrite plus a reusable prompt contract.',
    learningGoals: [
      'Explain why vague prompts produce vague outputs and why revision is normal.',
      'Apply T–C–C–F–A to a real task you perform regularly.',
      'Diagnose which element is missing in a weak prompt and predict the effect of three targeted fixes.',
      'Produce a before/after prompt rewrite and a reusable prompt contract.',
    ],
    practiceActivities: [
      'Improve four supplied weak prompts (materials in module).',
      'Compare two supplied prompt–output pairs and log what changed with each element.',
      'Context exercise: one task with thin vs rich context.',
      'Constraint drill: three tasks with tightened constraints and predicted output shifts.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: [
      'Module03_Prompt_Rewrite_[YourName].pdf or .docx',
      'Reusable prompt contract for one workflow',
    ],
  },
  {
    id: 'ae-m04',
    order: 4,
    title: 'Prompt Engineering — Structure, Constraints, and Output Design',
    stage: 'applied_practice',
    summary:
      'Author prompts like specs: role, goal, constraints, evidence policy, output shape, refusal behavior. Critique under-spec prompts, rewrite with labeled sections, and compare outputs against a simple rubric—not likability.',
    learningGoals: [
      'Embed cite vs infer vs refuse policies for contested facts.',
      'Diagnose under-spec, wrong audience, missing negatives, and missing format as first-class failure modes.',
      'Compare two outputs with a rubric row that drove a real edit.',
    ],
    practiceActivities: [
      'Prompt critique sheet on a weak supplied prompt; structured rewrite.',
      'Draft → critique → revise on one gnarly task with versions v0→v2 and changelog.',
      'Rubric pass on two outputs with logged rationale.',
    ],
    expectedOutputs: [
      'Module04_Structured_Prompt_Template_[YourName].pdf or .docx',
      'Versioned prompt spec v0.2 with changelog',
    ],
  },
  {
    id: 'ae-m05',
    order: 5,
    title: 'Prompt Engineering — Iteration, Comparison, and Reviewable Workflows',
    stage: 'applied_practice',
    summary:
      'Run hypothesis-driven prompt iterations with pairwise comparisons, regression awareness, and inspectable version notes—so improvements read like code review, not vibes.',
    learningGoals: [
      'Run disciplined A/B prompt tests with fixed evaluation criteria.',
      'Detect regression when a “better” prompt breaks format, safety, or faithfulness.',
      'Document an 8–12 line prompt QA checklist you will use under time pressure.',
    ],
    practiceActivities: [
      'Three prompt variants on one task: intent, constraints, failure signatures table.',
      'Red-team a “winning” output for subtle harm tied to prompt wording.',
      'Role pathways: iteration depth for coursework vs client copy vs internal ops.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: [
      'Module05_Prompt_Version_Log_[YourName].pdf or .docx',
      'Prompt QA checklist (operational)',
    ],
  },
  {
    id: 'ae-m06',
    order: 6,
    title: 'Evidence, Verification, and Source-Aware AI Use',
    stage: 'applied_practice',
    summary:
      'Design verification lanes by stakes; separate claims from sources; keep conflicts visible in synthesis; avoid false certainty. You build an evidence table and a verification lane matrix you reuse in research and capstone work.',
    learningGoals: [
      'Choose proportionate verification given reversibility and blast radius.',
      'Score evidence strength without false precision.',
      'Produce executive synthesis that logs unknowns and next information buys.',
    ],
    practiceActivities: [
      'Evidence table on a contested topic with strength scores and gaps.',
      'Executive brief with unknowns—no invented citations.',
      'Compare “summarize fast” vs evidence-disciplined prompts on the same document.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: [
      'Module06_Claim_Verification_Table_[YourName].pdf or .docx',
      'Verification lane matrix for your contexts',
    ],
  },
  {
    id: 'ae-m07',
    order: 7,
    title: 'AI for Writing, Communication, and Audience Fit',
    stage: 'professional_execution',
    summary:
      'Separate structure, facts, tone, and authorization. Prompt for extraction/transformation with anti-invention rules; edit AI drafts with marginal verification notes—not cosmetic polish alone.',
    learningGoals: [
      'Write extract/summarize prompts that forbid invention and tie claims to paragraphs.',
      'Maintain citation pathways for contested facts; red-team summaries for omission and spin.',
      'Tailor tone and audience without smuggling new factual claims.',
    ],
    practiceActivities: [
      'Dense article: tag each claim to a paragraph or “uncited.”',
      'Two prompt variants (facts vs exec brief) with failure-mode notes.',
      'Edit an AI draft with margin notes: verify, cut, escalate.',
    ],
    expectedOutputs: [
      'Module07_Audience_Fit_Communication_[YourName].pdf or .docx',
      'Marginal verification notes on one draft',
    ],
  },
  {
    id: 'ae-m08',
    order: 8,
    title: 'AI for Learning, Study, and Understanding',
    stage: 'professional_execution',
    summary:
      'Use AI as a deliberate practice partner—retrieval, explanation, checks—not substitution. Design integrity-forward study loops with explicit forbidden moves for graded or certified contexts.',
    learningGoals: [
      'Design study loops where AI scaffolds but you keep ownership of judgments and submissions.',
      'Spot when explanatory chat undermines durable understanding.',
      'Codify integrity boundaries for coursework and professional certifications.',
    ],
    practiceActivities: [
      'Five-step study protocol: allowed vs forbidden moves with example prompts.',
      'Generate items then verify keys and rationales without model substitution.',
      'Compare “do my homework” vs Socratic tutoring prompts; log failure modes.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: [
      'Module08_AI_Learning_Repair_Plan_[YourName].pdf or .docx',
      'Example allowed-step prompts only',
    ],
  },
  {
    id: 'ae-m09',
    order: 9,
    title: 'Responsible AI Use, Human Accountability, and Practical Guardrails',
    stage: 'professional_execution',
    summary:
      'Human accountability, disclosure, escalation, and proportionate risk review. Translate principles into operational habits: forbidden automation zones, labeling AI assistance, and visible review owners.',
    learningGoals: [
      'Draft lightweight norms for disclosure, labeling, and review.',
      'Communicate assistance without undermining trust.',
      'Plug AI steps into ticket/PR/review workflows you already run.',
    ],
    practiceActivities: [
      'RACI map for AI-supported deliverables with explicit review owners.',
      'Email templates declaring assistance, uncertainty, and verification status.',
      'Responsible-use checklist mapped to your sector or role.',
    ],
    expectedOutputs: [
      'Module09_Responsible_AI_Guardrails_[YourName].pdf or .docx',
      'Disclosure + escalation templates',
    ],
  },
  {
    id: 'ae-m10',
    order: 10,
    title: 'Privacy, Risk, Boundaries, and Safe Operational Use',
    stage: 'professional_execution',
    summary:
      'Apply minimum-necessary information before every paste; classify inputs into four tiers; choose redaction vs abstraction; pause or escalate when policy, law, or stakes say stop. Build a Safe-Use Decision Card and a redacted real prompt you would otherwise have sent raw.',
    learningGoals: [
      'Apply the minimum-necessary test before pasting into any AI tool.',
      'Classify content into safe, caution, restricted, or never-enter with reasoning.',
      'Redact or abstract sensitive content so assistance remains useful without raw identifiers.',
      'Recognise when to pause, escalate, or keep work out of general-purpose tools.',
    ],
    practiceActivities: [
      'Sensitivity sort: 20 supplied items into tiers (module materials).',
      'Minimum-necessary rewrite on four risky prompts.',
      'Boundary-check worksheet across five use cases.',
      'Safe-alternative workflow for one operational task you actually run.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: [
      'Module10_Privacy_Safety_Checklist_[YourName].pdf or .docx',
      'Safe-Use Decision Card + redacted prompt example (inside artifact)',
    ],
  },
  {
    id: 'ae-m11',
    order: 11,
    title: 'AI for Research, Analysis, and Synthesis',
    stage: 'mastery_outputs',
    summary:
      'Frame questions, preserve provenance, keep disagreement visible, and ship briefs proportional to evidence. Build extract/compare/brief prompt patterns with explicit “where this breaks” notes.',
    learningGoals: [
      'Design extraction prompts that preserve provenance and conflict.',
      'Contrast viewpoints without false middle ground.',
      'Time-box depth to deadlines with an explicit unknowns section.',
    ],
    practiceActivities: [
      'Evidence table with explicit conflict rows.',
      'Mini prompt library (extract/compare/brief) plus failure notes.',
      'Time-boxed research sprint with “what I still do not know.”',
    ],
    expectedOutputs: [
      'Module11_Research_Synthesis_Brief_[YourName].pdf or .docx',
      'Mini research prompt pack + evaluation notes',
    ],
  },
  {
    id: 'ae-m12',
    order: 12,
    title: 'AI for Workflows, Automation, and Agents',
    stage: 'mastery_outputs',
    summary:
      'Redesign repeated work into stages, owners, human gates, and triggers. Map where AI assists vs must not; produce an SOP slice and an agent-readiness view for one real workflow.',
    learningGoals: [
      'Encode triggers using stakes × reversibility × blast radius.',
      'Plan fallbacks for model or vendor outages humans can still execute.',
      'Name conditions before any step is handed to an agent.',
    ],
    practiceActivities: [
      'Workflow diagram with decision diamonds and named owners.',
      'Tabletop: what breaks first under fatigue—patch workflow and prompts.',
      'Role pathways: solo creator vs team lead artifacts.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: [
      'Module12_Workflow_Agent_Readiness_[YourName].pdf or .docx',
      'Workflow diagram + fallback table',
    ],
  },
  {
    id: 'ae-m13',
    order: 13,
    title: 'AI for Decision Support and Critical Thinking',
    stage: 'mastery_outputs',
    summary:
      'Decision memos with assumptions, tradeoffs, and falsifiers. Use AI to widen options and stress-test arguments while authorship, evidence standards, and accountability stay with the human owner.',
    learningGoals: [
      'Separate options analysis from the decision record; label model scenarios as hypotheses.',
      'Surface incentives and missing data that would flip a recommendation.',
      'Write artifacts a busy reviewer can challenge on substance.',
    ],
    practiceActivities: [
      'Two-page decision memo: assumptions, risks, next information buys.',
      'Pre-mortem with AI as adversary—reconcile honestly.',
      'Role pathways: academic vs commercial vs civic framing.',
    ],
    expectedOutputs: [
      'Module13_Decision_Memo_[YourName].pdf or .docx',
      'Decision memo + pre-mortem appendix',
    ],
  },
  {
    id: 'ae-m14',
    order: 14,
    title: 'AI in Teams and Organizations',
    stage: 'mastery_outputs',
    summary:
      'Shared AI use is a coordination problem: disclosure, review ownership, data boundaries, prompt-library rules, escalation, and approval at a governance-lite level a small team can maintain. Produce a one-page team AI use agreement plus a responsibility map.',
    learningGoals: [
      'Name six coordination risks that turn skilled individuals into uneven team output.',
      'Design disclosure, review ownership, boundaries, and escalation that peers can follow.',
      'Draft shared prompts/templates another person could run responsibly.',
    ],
    practiceActivities: [
      'Team AI use agreement one-pager for a real or hypothetical team.',
      'Responsibility map for AI-assisted steps across a workflow.',
      'Shared prompt artifact with review-owner slots.',
    ],
    expectedOutputs: [
      'Module14_Team_AI_Use_Agreement_[YourName].pdf or .docx',
      'Responsibility map + shared prompt artifact',
    ],
  },
  {
    id: 'ae-m15',
    order: 15,
    title: 'Building Reusable AI Systems — Prompt Packs and Playbooks',
    stage: 'mastery_outputs',
    summary:
      'Package prompts, review criteria, boundaries, ownership, and version notes into reusable prompt packs and playbooks—so the third Tuesday is safer and faster than the first because you wrote down what works.',
    learningGoals: [
      'Build a prompt-pack entry with purpose, audience, inputs, boundaries, review criteria, ownership, version notes.',
      'Link a playbook (when to use, steps, prompts, checkpoints, safety, outputs, failure signs) to Module 12 SOP discipline.',
      'Run quality tests on the pack against a fresh scenario.',
    ],
    practiceActivities: [
      'Assemble a mini pack (required elements) from your best prior prompts.',
      'Playbook slice with human gates and escalation.',
      'Test log: pack on a fresh scenario; capture gaps.',
    ],
    revisionCheckpoint: true,
    expectedOutputs: [
      'Module15_Prompt_Pack_Playbook_[YourName].pdf or .docx',
      'Test log against a fresh scenario',
    ],
  },
  {
    id: 'ae-m16',
    order: 16,
    title: 'Capstone — End-to-End AI-Supported Workflow',
    stage: 'mastery_outputs',
    summary:
      'Integration capstone: plan, prompt, verify, revise, protect information, and reflect on judgment—using your Module 15 toolkit and prior artifacts. Produce a reviewer-ready bundle with filenames, disclosure, self-critique, and rubric self-score; then align deliverables in capstone prep.',
    learningGoals: [
      'Choose a bounded, reviewable real task connected to your pathway.',
      'Run the workflow end-to-end with visible prompts, verification, revisions, and privacy discipline.',
      'Self-score on the seven-criterion rubric (Not ready → Strong) and close or name gaps honestly.',
    ],
    practiceActivities: [
      'Planning canvas and scope checklist for the capstone task.',
      'Execute prompts with logged outputs, reviews, and revision trail.',
      'Self-critique fallback (pause, named-reader, claim-trace, privacy, usefulness, prompts, revision log, confidence note).',
    ],
    recap: true,
    revisionCheckpoint: true,
    expectedOutputs: [
      'Module16_AI_Workflow_Capstone_[YourName].pdf or .docx',
      'Rubric self-score + gaps list',
      'One-page reflection on judgment and responsible use',
    ],
  },
]
