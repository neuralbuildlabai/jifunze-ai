/**
 * Authored overrides — Schools 1 (AI/digital), 3 (career/intellect), 4 (leadership/learning).
 * Pattern: first lesson, pivotal practice, revision gate, capstone prep per flagship.
 */

import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'
import { flagshipDepthPaddingBlock } from './flagshipSessionDepthPadding'

export const FLAGSHIP_SESSION_CONTENT_OVERRIDES_SCHOOLS134: Partial<
  Record<string, FlagshipSessionContentBlock[]>
> = {
  // --- AI Essentials ---
  'ai-essentials::ae-m01-lesson': [
    {
      id: 'ae-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Judgment-first AI literacy—and explicit prompt engineering',
      body:
        'You will learn prompt engineering as a foundational skill: prompts are instructions that steer stochastic systems; their clarity, constraints, and context strongly shape usefulness and failure modes. You are also building verification habits, matching review to stakes, and refusing cargo-cult prompting. This track rewards clarity under uncertainty—not fluent hype.',
    },
    {
      id: 'ae-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'Probabilistic tools, deterministic accountability → prompts as control surface',
      body:
        'Models approximate patterns; users remain accountable for decisions, citations, privacy, and harm. Treat outputs as drafts requiring lanes: low-stakes edits vs. evidence-backed claims vs. regulated domains. Connect this to prompting: underspecified prompts invite confident mistakes; better prompts narrow the task, declare evidence rules, and make failure visible early.',
    },
    {
      id: 'ae-m01-lesson-ov-pe',
      type: 'concept_explanation',
      eyebrow: 'Prompt engineering (foundations)',
      title: 'What you will practice this module',
      body:
        'Compare weak vs improved prompts for the same intent; label ambiguity, missing audience, missing constraints, and missing refusal behavior. Keep a short prompt comparison table you can reuse—this is assessable skill work, not stylistic opinion.',
    },
    {
      id: 'ae-m01-lesson-ov-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'Classify three outputs',
      body:
        'Take three short AI responses. Tag each as likely OK with light review, needs evidence audit, or escalate/refuse. Write one sentence each on what could go wrong if you skipped that lane—and note one prompt weakness that could have caused the failure mode.',
      example: 'Keep tags blunt—your future self should recognize the pattern in under 30 seconds.',
    },
    {
      id: 'ae-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Continue with myths and harmful shortcuts—including common prompt myths—bring one viral claim you want to stress-test honestly.',
    },
  ],

  'ai-essentials::ae-m04-practice': [
    {
      id: 'ae-m04-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Prompt engineering: specs, critique, versioned rewrites',
      body:
        'This module’s core artifact is prompt engineering you can show a reviewer: prompts as lightweight specs (intent, audience, constraints, evidence policy, format, refusal behavior). Iterate with diffs—what changed between versions and why behaviors should shift. Keep critique notes alongside outputs.',
    },
    {
      id: 'ae-m04-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: [
        'Prompt critique sheet on one weak prompt + structured rewrite v1 → v2 with changelog.',
        'Draft → critique → revise on one complex prompt (keep versions).',
        'Peer-style rubric pass: ambiguity, evidence policy, refusal behavior.',
      ],
      prompt: 'End with a “thin evidence” case—what should the model refuse or qualify?',
    },
    {
      id: 'ae-m04-practice-ov-next',
      type: 'next_step',
      body: 'Carry the rubric forward—learning with AI should protect cognition, not outsource it.',
    },
  ],

  'ai-essentials::ae-m03-revision': [
    {
      id: 'ae-m03-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Before deeper tool choices',
      body:
        'Foundations should now include a grounded map of tool categories and data boundaries. Compress what matters for purchasing, integration, and permissions decisions ahead.',
    },
    {
      id: 'ae-m03-revision-ov-recap',
      type: 'recap',
      title: 'Compress',
      bullets: [
        'Two tasks you will never paste into cloud tools—and why.',
        'One evaluation criterion you will apply before adopting a vendor workflow.',
      ],
    },
    {
      id: 'ae-m03-revision-ov-task',
      type: 'practice_task',
      title: 'Structured check',
      prompt:
        'In writing: (1) three sentences on limits you now believe, (2) one workflow where integration beats model choice, (3) one open question you still owe yourself data on.',
    },
    {
      id: 'ae-m03-revision-ov-next',
      type: 'next_step',
      body: 'Proceed to prompting specs once your evidence and refusal boundaries feel lived-in, not aspirational.',
    },
    flagshipDepthPaddingBlock('ae-m03-revision'),
  ],

  'ai-essentials::ai-essentials-capstone-prep': [
    {
      id: 'ae-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Integration, not accumulation',
      body:
        'Prep aligns stance, verification matrix, workflows, incident sketches, and reusable prompt/spec packs into one reviewer-readable pack. Remove duplicate templates; ensure each deliverable cites evidence already in your artifacts or flags a gap.',
    },
    {
      id: 'ae-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Readiness pass',
      bullets: [
        'Map each deliverable to files/notes you already produced vs. gaps to close this week.',
        'Confirm prompt pack appendix: named templates, owners, when-not-to-use notes.',
        'Dry-run: could a peer run your workflows from diagrams alone?',
      ],
      prompt: 'If anything is still “slides-only,” convert to checklists or diagrams now.',
    },
    {
      id: 'ae-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish prep when an honest reviewer could navigate the pack without you narrating aloud.',
    },
  ],

  // --- Smart Workflows with AI ---
  'ai-powered-workflows-and-productivity::sw-m01-lesson': [
    {
      id: 'sw-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Systems, not vibes',
      body:
        'This track treats AI workflows like engineering: interfaces, owners, versioning, QA lanes, audits. Your capstone is a library someone else could adopt—repeatable artifacts, not chat nostalgia.',
    },
    {
      id: 'sw-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'Interfaces beat hero prompts',
      body:
        'Define inputs, outputs, decision rights, and failure modes per lane. Automation promises fail when handoffs and rollback paths are implicit. Name prompt slots per lane (intake / classify / draft / escalate) so prompt engineering is operational—not a single magical thread.',
    },
    {
      id: 'sw-m01-lesson-ov-keys',
      type: 'key_points',
      title: 'Carry into every module',
      bullets: [
        'Name owners for each step—not “the team.”',
        'Document assumptions like code comments—future you depends on them.',
        'Version prompt blocks with changelogs like any production artifact.',
        'Kill switches before scaling automation.',
      ],
    },
    {
      id: 'sw-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Continue to professional prompt engineering (anatomy)—bring one recurring task you want to turn into a versioned spec.',
    },
  ],

  'ai-powered-workflows-and-productivity::sw-m02-lesson': [
    {
      id: 'sw-m02-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Foundations',
      title: 'Prompt engineering you can ship: anatomy, critique, iteration',
      body:
        'This lesson names the professional layer explicitly: prompt engineering is designing instructions (role, context, constraints, evidence policy, output format, refusal behavior) so outputs become reviewable and comparable. You will critique weak prompts, rewrite with structure, and diff versions against a rubric—not chase “magic wording.”',
    },
    {
      id: 'sw-m02-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Core moves',
      title: 'Structure beats vibes',
      body:
        'Separate audience, job-to-be-done, constraints, and deliverable shape. Specify what “good” means for this workflow (schema, checklist, tone). Plan iterative refinement: each revision states a hypothesis (“reduce ambiguity on X”, “tighten refusal on thin evidence”).',
    },
    {
      id: 'sw-m02-lesson-ov-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'Compare two prompts for the same task',
      body:
        'Run the same underlying task with a vague prompt vs. a structured prompt. Capture differences in omissions, hedging, format adherence, and fabrication risk. Write three bullets: what improved in the structured prompt, what still failed, what you would change in v2.',
      example: 'Keep outputs short enough to paste into a prompt critique sheet you could attach in a PR-style review.',
    },
    {
      id: 'sw-m02-lesson-ov-next',
      type: 'next_step',
      body: 'Bring one messy real task into the next modules—schemas and chains will harden what you started here.',
    },
  ],

  'ai-powered-workflows-and-productivity::sw-m05-practice': [
    {
      id: 'sw-m05-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Research synthesis under clocks',
      body:
        'Evidence tables keep claims honest. Prompt engineering matters here: separate extraction prompts (faithful to sources) from synthesis prompts (explicit about conflicts/unknowns). Your brief must wear uncertainty visibly—especially when executives want tidy answers.',
    },
    {
      id: 'sw-m05-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: [
        'Mini research prompt pack: extraction prompt, contrast prompt, exec brief prompt—with evaluation notes.',
        'Evidence table with columns for claim, source, strength, conflicts.',
        'Executive brief listing unknowns before recommendations.',
      ],
      prompt: 'Highlight one place where slowing down saves downstream rework.',
    },
    {
      id: 'sw-m05-practice-ov-next',
      type: 'next_step',
      body: 'Bring the table forward—editorial and ops modules assume traceable facts.',
    },
  ],

  'ai-powered-workflows-and-productivity::sw-m04-revision': [
    {
      id: 'sw-m04-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Chains must fail safely—including prompt rollback',
      body:
        'Before heavier editorial and ops workflows, verify your checkpoints truly stop bad outputs—not rubber stamps. When drift appears, identify which step’s prompt contract failed and revise that block with a logged diff—don’t only rerun the chain.',
    },
    {
      id: 'sw-m04-revision-ov-recap',
      type: 'recap',
      title: 'Compress',
      bullets: ['Rollback trigger you will honor.', 'Human gate you refuse to automate yet.'],
    },
    {
      id: 'sw-m04-revision-ov-task',
      type: 'practice_task',
      title: 'Structured check',
      prompt:
        'Simulate drift in your chain: what signal fires first, who owns rollback, what artifact proves recovery?',
    },
    {
      id: 'sw-m04-revision-ov-next',
      type: 'next_step',
      body: 'Advance when your chain narrative survives a skeptical ops reviewer.',
    },
  ],

  'ai-powered-workflows-and-productivity::smart-workflows-with-ai-capstone-prep': [
    {
      id: 'sw-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Library completeness',
      body:
        'Prep ensures three named workflows share rubric DNA, catalog metadata is honest, versioned prompt/spec blocks are owned and discoverable, and rollout memo lists metrics and kill criteria—not aspirations.',
    },
    {
      id: 'sw-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Integration checklist',
      bullets: [
        'Cross-link dependencies between workflows.',
        'Verify QA lanes reference the same risk vocabulary.',
        'Attach prompt appendix evidence: version IDs, last test notes, known failure modes per workflow.',
      ],
      prompt: 'Cut duplicate boilerplate; merge ruthlessly.',
    },
    {
      id: 'sw-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish when another operator could pilot using only your packets.',
    },
  ],

  // --- Data and Decisions ---
  'data-and-decisions::dd-m01-lesson': [
    {
      id: 'dd-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Honest numbers, humble conclusions',
      body:
        'You will practice skeptical reading without cynicism—asking what is measured, excluded, or misleadingly smoothed before recommending action.',
    },
    {
      id: 'dd-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'Charts argue',
      body:
        'Visuals encode assumptions about binning, axes, comparisons, and uncertainty. Treat every chart as a thesis with footnotes you must surface.',
    },
    {
      id: 'dd-m01-lesson-ov-worked-kpi',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'From dashboard tile to disciplined question',
      body:
        'You open a KPI tile: “Conversion rate 4.2% (↑ vs last week).” Before reacting, write: (1) exact definition (numerator/denominator), (2) cohort or filter applied, (3) the decision this tile is allowed to inform, (4) one way a busy reader could misread it anyway. Only then propose an action.',
      example:
        'Bad leap: “Up week on week—increase spend.” Better: “Mix may have shifted; verify new-user share before touching budget.”',
    },
    {
      id: 'dd-m01-lesson-ov-reflect',
      type: 'reflection_prompt',
      title: 'Calibration',
      prompt: 'Where have you previously mistaken a metric for the decision itself? What question should have come first?',
    },
    {
      id: 'dd-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Bring three charts from your world—messy real data welcome.',
    },
  ],

  'data-and-decisions::dd-m05-practice': [
    {
      id: 'dd-m05-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Causation humility',
      body:
        'Separate association from plausible mechanisms; design cheap falsification tests before expensive bets.',
    },
    {
      id: 'dd-m05-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: ['Counterfactual sketch for one policy change.', 'Pre-mortem on your headline conclusion.'],
      prompt: 'Name one confounder you cannot yet rule out—what evidence would shrink it?',
    },
    {
      id: 'dd-m05-practice-ov-next',
      type: 'next_step',
      body: 'Carry the falsifiers into trend modules—regime shifts punish lazy narratives.',
    },
  ],

  'data-and-decisions::dd-m05-revision': [
    {
      id: 'dd-m05-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Claims vs. proofs',
      body:
        'Pause before stakeholder storytelling—ensure your causal language matches the evidence ladder you actually climbed.',
    },
    {
      id: 'dd-m05-revision-ov-recap',
      type: 'recap',
      title: 'Compress',
      bullets: ['Strongest claim you will defend aloud.', 'Claim you will stop making until better data arrives.'],
    },
    {
      id: 'dd-m05-revision-ov-task',
      type: 'practice_task',
      title: 'Structured check',
      prompt: 'Write three sentences a skeptic could accept without hand-waving.',
    },
    {
      id: 'dd-m05-revision-ov-next',
      type: 'next_step',
      body: 'Proceed when your uncertainty is explicit, not smuggled in tone.',
    },
  ],

  'data-and-decisions::data-and-decisions-capstone-prep': [
    {
      id: 'dd-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Decision brief readiness',
      body:
        'Align KPI hierarchy definitions, dashboard or visualization appendix, monitoring cadence by audience, falsifiers, and narrative discipline with the recurring decision you selected. Prep is reviewer-grade BI work—definitions first, conclusions second.',
    },
    {
      id: 'dd-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Gap hunt',
      bullets: [
        'Evidence table: mark cells that still rely on anecdotes.',
        'Monitoring section: guardrails named for downside scenarios.',
      ],
      prompt: 'If you dread an exec question, answer it on paper now.',
    },
    {
      id: 'dd-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish prep when another analyst could extend your brief without reversing your definitions.',
    },
  ],

  // --- Web & Software Foundations ---
  'web-and-software-foundations::wf-m01-lesson': [
    {
      id: 'wf-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Collaborate credibly',
      body:
        'Goal: trace real flows in plain language, ask engineers better questions, spot risk early. Depth over buzzwords—you are building a shared map with builders, not auditioning jargon.',
    },
    {
      id: 'wf-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'Requests tell stories',
      body:
        'Follow a click to persistence: client constraints, network realities, server responsibilities, data contracts. Narrative beats memorizing acronyms.',
    },
    {
      id: 'wf-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Bring one login or checkout flow you can observe with developer tools.',
    },
  ],

  'web-and-software-foundations::wf-m04-practice': [
    {
      id: 'wf-m04-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Consume APIs responsibly',
      body:
        'Scopes, rotation, audit trails—least privilege is not bureaucracy; it is blast-radius management.',
    },
    {
      id: 'wf-m04-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: ['Walk OpenAPI documentation for a public API.', 'Threat sketch for leaked token scenario.'],
      prompt: 'List three questions you would ask engineering before approving integration.',
    },
    {
      id: 'wf-m04-practice-ov-next',
      type: 'next_step',
      body: 'Keep the checklist—it becomes part of your capstone risk register.',
    },
  ],

  'web-and-software-foundations::wf-m06-revision': [
    {
      id: 'wf-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Performance literacy checkpoint',
      body:
        'Ensure you separate symptoms (slow UI) from hypothesized causes—measurement before cargo-cult fixes.',
    },
    {
      id: 'wf-m06-revision-ov-recap',
      type: 'recap',
      title: 'Compress',
      bullets: ['One bottleneck hypothesis tied to user-visible pain.', 'Metric you will watch before declaring victory.'],
    },
    {
      id: 'wf-m06-revision-ov-task',
      type: 'practice_task',
      title: 'Structured check',
      prompt: 'What evidence would falsify your bottleneck story?',
    },
    {
      id: 'wf-m06-revision-ov-next',
      type: 'next_step',
      body: 'Continue to security literacy—bring vendors or features you suspect are fragile.',
    },
  ],

  'web-and-software-foundations::web-and-software-foundations-capstone-prep': [
    {
      id: 'wf-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Brief as contract',
      body:
        'Prep merges narrative, diagrams, integration assumptions, and risk notes into one walkable artifact for builders and stakeholders.',
    },
    {
      id: 'wf-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Integration pass',
      bullets: ['Diagram references risks listed.', 'API section matches architecture story.'],
      prompt: 'Invite one clarifying question you fear—answer it inline.',
    },
    {
      id: 'wf-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish when a builder could schedule work from your packet without guesswork.',
    },
  ],

  // --- Digital Safety ---
  'digital-safety::ds-m01-lesson': [
    {
      id: 'ds-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Proportionate defense',
      body:
        'Security depth here is judgment under constraints—small teams, real budgets, humans who forget. You will prioritize harms by impact, not headlines.',
    },
    {
      id: 'ds-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'Assets and adversaries',
      body:
        'Inventory what matters, who might target it, and which failures are tolerable vs. existential. Calm specificity beats universal paranoia.',
    },
    {
      id: 'ds-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Bring a rough asset list—even informal—to the next identity hygiene module.',
    },
  ],

  'digital-safety::ds-m06-practice': [
    {
      id: 'ds-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Least privilege socially',
      body:
        'Classification tiers mean nothing if sharing links and SaaS sprawl undermine them. Practice reviews people will actually run quarterly.',
    },
    {
      id: 'ds-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: ['Access review worksheet with owners.', 'Third-party sharing rules draft.'],
      prompt: 'Name one convenience habit you will retire this month.',
    },
    {
      id: 'ds-m06-practice-ov-next',
      type: 'next_step',
      body: 'Carry owners forward—vendor governance punishes vague roles.',
    },
  ],

  'digital-safety::ds-m06-revision': [
    {
      id: 'ds-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Data handling checkpoint',
      body:
        'Before vendor and incident modules, verify your classification language matches how people actually share files.',
    },
    {
      id: 'ds-m06-revision-ov-task',
      type: 'practice_task',
      title: 'Structured check',
      prompt: 'Which tier scares you most if leaked—have you named mitigations proportionate to that fear?',
    },
    {
      id: 'ds-m06-revision-ov-next',
      type: 'next_step',
      body: 'Advance when escalation paths are explicit, not “tell IT.”',
    },
  ],

  'digital-safety::digital-safety-capstone-prep': [
    {
      id: 'ds-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Pack for adoption',
      body:
        'Merge framing, hygiene, vendor review, and triage scripts into a short bundle someone else could onboard from—calm tone, no fear marketing.',
    },
    {
      id: 'ds-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Pilot readiness',
      bullets: ['20-minute walkthrough script.', 'Top three objections + responses.'],
      prompt: 'Cut anything that sounds performative—keep operational clarity.',
    },
    {
      id: 'ds-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish when a non-expert manager could execute triage steps cold.',
    },
  ],

  // --- Career Launch ---
  'career-launch::cl-m01-lesson': [
    {
      id: 'cl-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Direction without magical thinking',
      body:
        'Career depth means constraints named, hypotheses tested, proof gathered—replace fate narratives with experiments you can review monthly.',
    },
    {
      id: 'cl-m01-lesson-ov-keys',
      type: 'key_points',
      title: 'Anchor moves',
      bullets: [
        'Treat targets as hypotheses—what evidence would change the shortlist?',
        'Energy and obligations belong in the same spreadsheet.',
      ],
    },
    {
      id: 'cl-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Bring honest constraints—visa, geography, caregiving, compensation floors—to the skills mapping module.',
    },
  ],

  'career-launch::cl-m06-practice': [
    {
      id: 'cl-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Networking with dignity',
      body:
        'Curiosity-driven outreach beats extraction scripts. Design conversations that earn replies and learning—even when no job opens instantly.',
    },
    {
      id: 'cl-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: ['Conversation prep templates tied to genuine questions.', 'Follow-up ladder with respectful cadence.'],
      prompt: 'Flag one ask that would make you cringe if reversed—rewrite it.',
    },
    {
      id: 'cl-m06-practice-ov-next',
      type: 'next_step',
      body: 'Bring STAR drafts next—evidence must connect to these conversations.',
    },
  ],

  'career-launch::cl-m06-revision': [
    {
      id: 'cl-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Pipeline honesty',
      body:
        'Check whether your outreach experiments produce learning metrics—not just volume. Adjust targets before burning reputation.',
    },
    {
      id: 'cl-m06-revision-ov-task',
      type: 'practice_task',
      title: 'Structured check',
      prompt: 'Which hypothesis about your targets failed this week—what will you change next week?',
    },
    {
      id: 'cl-m06-revision-ov-next',
      type: 'next_step',
      body: 'Proceed to interviews when follow-ups reflect curiosity, not guilt.',
    },
  ],

  'career-launch::career-launch-capstone-prep': [
    {
      id: 'cl-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Readiness pack integration',
      body:
        'Align résumé variants, evidence bank, outreach system, interview drills, and negotiation notes into one iterative folder—not scattered files.',
    },
    {
      id: 'cl-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Integrity audit',
      bullets: ['Proof gaps list with scheduled closes.', 'Any inflated bullets—fix or cut.'],
      prompt: 'Would you stand behind every metric in an interview cross-exam?',
    },
    {
      id: 'cl-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish prep when your 90-day plan has measurable receipts, not vibes.',
    },
  ],

  // --- Clear Communication ---
  'clear-communication::cc-m01-lesson': [
    {
      id: 'cc-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Intent before paragraphs',
      body:
        'Clear communication is not “writing well” in the abstract—it is making a decision about audience, what decision you need from them, what success looks like, and what constraints apply. Until those are explicit, paragraphs are just noise with good grammar. This chapter installs a repeatable sequence: reverse-outline → expose assumptions → align evidence → revise for action.',
    },
    {
      id: 'cc-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'Audience is a contract',
      body:
        'Every reader arrives with a hidden contract: “Why should I care? What do you want from me? What happens if I disagree?” Mismatch kills trust faster than typos. Name who decides, what they fear (reputation, budget, schedule, fairness), and what evidence would move them—not what would make you feel persuasive.',
    },
    {
      id: 'cc-m01-lesson-ov-keys',
      type: 'key_points',
      title: 'What “clear” means here',
      bullets: [
        'One primary ask per message; secondary asks explicitly ranked.',
        'Facts vs interpretations labeled; sources named where stakes are high.',
        'Failure modes named early (misread audience, missing constraint, ambiguous ask).',
      ],
    },
    {
      id: 'cc-m01-lesson-ov-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'From vague update to a decision-ready note',
      body:
        'Situation: a cross-functional thread has 14 messages and no owner. Weak move: add another paragraph summarizing activity. Strong move: open with “Decision needed by Friday 4pm: A or B” → three bullets of fact → one paragraph of recommendation with tradeoffs → explicit “If we choose A, X; if B, Y.” Then invite objections on evidence gaps, not tone.',
      example:
        'Rewrite prompt: take a real thread you have (slack/email). Identify the single decision, delete 30% of background that does not change the choice, and add one sentence that states what would falsify your recommendation.',
    },
    {
      id: 'cc-m01-lesson-ov-scenario',
      type: 'concept_explanation',
      eyebrow: 'Scenario',
      title: 'When clarity is politically costly',
      body:
        'Sometimes clarity surfaces disagreement. That is a feature. Your job is to separate “we disagree on values” from “we disagree because the memo hid assumptions.” Name the fork in the road early so leaders can sponsor the right debate—not fight ghosts in paragraph four.',
    },
    {
      id: 'cc-m01-lesson-ov-reflect',
      type: 'reflection_prompt',
      eyebrow: 'Slow down',
      title: 'Calibration',
      prompt:
        'Where do you most often bury the ask—and what fear (looking pushy, looking dumb, looking slow) drives that habit?',
    },
    {
      id: 'cc-m01-lesson-ov-next',
      type: 'next_step',
      title: 'Next chapter',
      body:
        'Bring a messy memo or thread to the practice block: you will reverse-outline it and stress-test the ask line by line.',
    },
  ],

  'clear-communication::cc-m06-practice': [
    {
      id: 'cc-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Memos as liability-aware genres',
      body:
        'Separate facts, interpretations, recommendations—appendix discipline keeps exec summaries honest.',
    },
    {
      id: 'cc-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: ['Memo skeleton with evidence appendix plan.', 'Cross-review hunting inference leakage.'],
      prompt: 'Where could a motivated reader accuse you of omission?',
    },
    {
      id: 'cc-m06-practice-ov-next',
      type: 'next_step',
      body: 'Carry appendix habits into persuasion modules—ethics and clarity overlap.',
    },
  ],

  'clear-communication::cc-m06-revision': [
    {
      id: 'cc-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Evidence lanes tight?',
      body:
        'Pause before persuasion modules—ensure readers can trace recommendations to cited facts.',
    },
    {
      id: 'cc-m06-revision-ov-recap',
      type: 'recap',
      title: 'Compress',
      bullets: ['Recommendation you can defend with appendix pointers.', 'Hole you still owe evidence for.'],
    },
    {
      id: 'cc-m06-revision-ov-task',
      type: 'practice_task',
      title: 'Structured check',
      prompt: 'Rewrite your executive summary if half the appendix disappeared—still honest?',
    },
    {
      id: 'cc-m06-revision-ov-next',
      type: 'next_step',
      body: 'Advance when inference leakage is hunted, not hoped away.',
    },
  ],

  'clear-communication::clear-communication-capstone-prep': [
    {
      id: 'cc-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Portfolio + doctrine',
      body:
        'Curate stakes-ladder artifacts and editorial standards that survive fatigue. Prep removes duplicates and aligns voice boundaries across pieces.',
    },
    {
      id: 'cc-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Final critique',
      bullets: ['Read aloud the opening paragraph of each artifact—where does energy dip?', 'Doctrine: add one never-rule you violated in drafts.'],
      prompt: 'Cut filler praise—editors notice insecurity masquerading as polish.',
    },
    {
      id: 'cc-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish when a tired peer could pick up your checklist and improve a draft.',
    },
  ],

  // --- Research & Critical Thinking ---
  'research-and-critical-thinking::rtc-m01-lesson': [
    {
      id: 'rtc-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Inquiry you can finish',
      body:
        'Good questions are falsifiable, scoped, and honest about exclusions. You are training to stop infinite literature drift later.',
    },
    {
      id: 'rtc-m01-lesson-ov-keys',
      type: 'key_points',
      title: 'Scope discipline',
      bullets: [
        'Say what you are not answering—on purpose.',
        'Name stakes so you know when “good enough” evidence suffices.',
      ],
    },
    {
      id: 'rtc-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Bring a live contested question—personal, civic, or professional.',
    },
  ],

  'research-and-critical-thinking::rtc-m06-practice': [
    {
      id: 'rtc-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Synthesis under disagreement',
      body:
        'Map agreements vs. conflicts; weight evidence strength; say what experiment would resolve the split.',
    },
    {
      id: 'rtc-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: ['Adversarial synthesis outline.', 'Expert interview plan if primary data is thin.'],
      prompt: 'Where are you tempted to both-sides the evidence?',
    },
    {
      id: 'rtc-m06-practice-ov-next',
      type: 'next_step',
      body: 'Bring conflict maps into writing judgments—recommendations must match proof height.',
    },
  ],

  'research-and-critical-thinking::rtc-m06-revision': [
    {
      id: 'rtc-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Hold tension honestly',
      body:
        'Check whether your synthesis respects real disagreement without mush—readers should see the seams.',
    },
    {
      id: 'rtc-m06-revision-ov-task',
      type: 'practice_task',
      title: 'Structured check',
      prompt: 'If your least favorite source were right, what would break in your story?',
    },
    {
      id: 'rtc-m06-revision-ov-next',
      type: 'next_step',
      body: 'Proceed when steel-manning opposing views feels uncomfortable but doable.',
    },
  ],

  'research-and-critical-thinking::research-and-critical-thinking-capstone-prep': [
    {
      id: 'rtc-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Defense-ready brief',
      body:
        'Align evidence tables, limitations, and recommendations—mock defense should surface questions you already answered on paper.',
    },
    {
      id: 'rtc-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Anticipate attacks',
      bullets: ['List three hostile questions.', 'Draft answers grounded in your table only.'],
      prompt: 'If an answer needs new research, flag it—honesty beats bluffing.',
    },
    {
      id: 'rtc-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish when limitations section is something you are proud of, not embarrassed by.',
    },
  ],

  // --- Leadership & Teams ---
  'leadership-and-teams::lat-m01-lesson': [
    {
      id: 'lat-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Outcomes over theater',
      body:
        'Leadership depth here is observable: clarity, learning velocity, delivery. Drop optics that consume cycles without changing behavior.',
    },
    {
      id: 'lat-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'Measure leading signals',
      body:
        'Define a few team health signals you will watch weekly—psychological safety paired with accountability, not slogans.',
    },
    {
      id: 'lat-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Bring a live team context—even aspirational leadership counts if honest.',
    },
  ],

  'leadership-and-teams::lat-m06-practice': [
    {
      id: 'lat-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Conflict toward repair',
      body:
        'Hard conversations need plans: facts, impact, request, follow-up. Drama is what happens when structure is skipped.',
    },
    {
      id: 'lat-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: ['Hard conversation plan with calendar milestones.', 'Tabletop conflict scenario debrief.'],
      prompt: 'Where might you be avoiding accountability to preserve comfort?',
    },
    {
      id: 'lat-m06-practice-ov-next',
      type: 'next_step',
      body: 'Carry scripts into learning-loop modules—retros should reference repair habits.',
    },
  ],

  'leadership-and-teams::lat-m06-revision': [
    {
      id: 'lat-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Repair loops real?',
      body:
        'Verify follow-ups exist—plans without dates are vibes. Escalation paths should be named.',
    },
    {
      id: 'lat-m06-revision-ov-task',
      type: 'practice_task',
      title: 'Structured check',
      prompt: 'Which recurring conflict are you treating as personality instead of structure?',
    },
    {
      id: 'lat-m06-revision-ov-next',
      type: 'next_step',
      body: 'Advance when repair steps are scheduled, not hoped for.',
    },
  ],

  'leadership-and-teams::leadership-and-teams-capstone-prep': [
    {
      id: 'lat-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Operating system integration',
      body:
        'Charter, decision rights, cadence, feedback, conflict guide—must reference each other without contradiction.',
    },
    {
      id: 'lat-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Pilot plan',
      bullets: ['30-day adoption experiment.', 'Friction log you will review weekly.'],
      prompt: 'Who co-owns rituals besides you?',
    },
    {
      id: 'lat-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish when another leader could steward your pack.',
    },
  ],

  // --- Teaching & Facilitation ---
  'teaching-and-facilitation::taf-m01-lesson': [
    {
      id: 'taf-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Teach what can be observed',
      body:
        'Outcomes must be verifiable—learners should show understanding, not nod. This track prizes checks for understanding over coverage speed.',
    },
    {
      id: 'taf-m01-lesson-ov-keys',
      type: 'key_points',
      title: 'Design lens',
      bullets: [
        'If you cannot observe success, rewrite the objective.',
        'Sequence for cognitive load—misconceptions hunted early.',
      ],
    },
    {
      id: 'taf-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Pick a topic you might teach soon—even small audience counts.',
    },
  ],

  'teaching-and-facilitation::taf-m06-practice': [
    {
      id: 'taf-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Inclusive rooms',
      body:
        'Norms reduce harm; repair after mistakes builds trust. Accessibility is part of rigor, not an add-on.',
    },
    {
      id: 'taf-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: ['Norm design workshop notes.', 'Accessibility pass on a real handout.'],
      prompt: 'Where might power dynamics silence the learners you most need to hear?',
    },
    {
      id: 'taf-m06-practice-ov-next',
      type: 'next_step',
      body: 'Bring norms into assessment modules—stress should serve learning, not ranking theater.',
    },
  ],

  'teaching-and-facilitation::taf-m06-revision': [
    {
      id: 'taf-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Norms lived?',
      body:
        'Check whether your norms are actionable—people should know what to do when friction appears.',
    },
    {
      id: 'taf-m06-revision-ov-task',
      type: 'practice_task',
      title: 'Structured check',
      prompt: 'Draft a repair script for when you mishandle a classroom moment—specific words welcome.',
    },
    {
      id: 'taf-m06-revision-ov-next',
      type: 'next_step',
      body: 'Proceed when inclusion moves from values slide to behaviors.',
    },
  ],

  'teaching-and-facilitation::teaching-and-facilitation-capstone-prep': [
    {
      id: 'taf-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Kit rehearsal',
      body:
        'Session plans, facilitator guides, assessments, and async paths should tell one story—objectives ↔ evidence ↔ practice reps.',
    },
    {
      id: 'taf-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Dry-run checklist',
      bullets: ['Micro-pilot agenda.', 'Revision notes captured live.'],
      prompt: 'Where does cognitive load spike—can you redistribute minutes?',
    },
    {
      id: 'taf-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish when a substitute facilitator could run the core session cold.',
    },
  ],
}
