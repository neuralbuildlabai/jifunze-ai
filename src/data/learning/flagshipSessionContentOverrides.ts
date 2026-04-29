/**
 * Optional authored session block overrides — key: `${courseSlug}::${sessionId}`.
 * Business & Growth in-file; Schools 1 / 3 / 4 merged from `flagshipSessionContentOverridesSchools134.ts`.
 */

import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'
import { FLAGSHIP_SESSION_CONTENT_OVERRIDES_AI_ESSENTIALS_GAPS } from './flagshipSessionContentOverridesAiEssentialsGaps'
import { FLAGSHIP_SESSION_CONTENT_OVERRIDES_AI_ESSENTIALS_LESSONS } from './flagshipSessionContentOverridesAiEssentialsLessons'
import { FLAGSHIP_SESSION_CONTENT_OVERRIDES_COMPLETION } from './flagshipSessionContentOverridesCompletion'
import { FLAGSHIP_SESSION_CONTENT_OVERRIDES_MIDCOURSE } from './flagshipSessionContentOverridesMidCourse'
import { FLAGSHIP_SESSION_CONTENT_OVERRIDES_SCHOOLS134 } from './flagshipSessionContentOverridesSchools134'

/** Anchor + Business + Schools 1/3/4 + mid-band — excludes completion layer (see generator). */
export const FLAGSHIP_SESSION_CONTENT_OVERRIDES_WITHOUT_COMPLETION: Partial<
  Record<string, FlagshipSessionContentBlock[]>
> = {
  // --- Marketing and Growth ---
  'marketing-and-growth::mg-m01-lesson': [
    {
      id: 'mg-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Demand learning, not busywork',
      body:
        'This flagship treats growth as accountable experimentation: falsifiable hypotheses, audience evidence before spend, messaging architecture, channel bets with kill rules, and measurement that admits uncertainty. Every module asks what you would stop doing if the evidence turned.',
    },
    {
      id: 'mg-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'Why “growth” fails most often',
      body:
        'Growth fails when teams confuse activity with learning—more content, more channels, more dashboards—without linking work to hypotheses, proofs, and decisions. Your job here is to install loops: propose → expose to reality → measure honestly → revise offer, message, or channel.',
    },
    {
      id: 'mg-m01-lesson-ov-keys',
      type: 'key_points',
      title: 'Non-negotiables this module',
      bullets: [
        'Every metric should answer a decision—if it does not, demote it.',
        'Leading indicators must be things you can influence this week.',
        'Name what would falsify your hypothesis before you gather friendly data.',
      ],
    },
    {
      id: 'mg-m01-lesson-ov-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'From vague KPI to testable hypothesis',
      body:
        'Start with a lagging KPI you care about (e.g., qualified pipeline). Ask what buyer behaviors would have to move first. Draft one hypothesis: “If we change X for segment Y, then leading signal Z moves within N weeks because…” List what evidence would disprove you.',
      example: 'Constraint: keep the hypothesis under 120 words; include segment, lever, metric, timeframe, falsifier.',
    },
    {
      id: 'mg-m01-lesson-ov-reflect',
      type: 'reflection_prompt',
      title: 'Calibration',
      prompt:
        'Where are you most tempted to substitute activity for proof in your current growth work—and what single experiment would embarrass that reflex?',
    },
    {
      id: 'mg-m01-lesson-ov-next',
      type: 'next_step',
      title: 'Next',
      body: 'Continue to audience evidence—bring five datapoints you already have (support tickets, sales notes, reviews) even if messy.',
    },
  ],

  'marketing-and-growth::mg-m06-practice': [
    {
      id: 'mg-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Applied practice',
      title: 'Channel bets with kill criteria',
      body:
        'You are sizing channels as capital and labor bets—not checkbox coverage. Score fit, creative load, cash timing, and learning value. Every channel row needs a kill rule tied to evidence, not ego.',
    },
    {
      id: 'mg-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Deliverables',
      bullets: [
        'Channel scorecard: fit, proof needs, creative hours, cash sensitivity, kill rule.',
        'Workload estimate with honest creator hours—include review and iteration.',
      ],
      prompt: 'Use a real or realistic offer; name substitutes that steal attention from your channel plan.',
    },
    {
      id: 'mg-m06-practice-ov-output',
      type: 'output_prompt',
      eyebrow: 'Output',
      title: 'Reviewer bar',
      body:
        'A skeptical CMO should see why each channel is here, what has to be true, and what would remove it. If two channels overlap in job-to-be-done, justify both or cut.',
    },
    {
      id: 'mg-m06-practice-ov-next',
      type: 'next_step',
      title: 'Checkpoint reminder',
      body: 'Complete mastery checkpoints after your artifacts exist—evidence follows work, not the reverse.',
    },
  ],

  'marketing-and-growth::mg-m06-revision': [
    {
      id: 'mg-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Before integrated campaigns',
      body:
        'You are exiting applied practice into professional execution. Tighten how channels connect to proof and capacity—no loose ends before you storyboard complex campaigns.',
    },
    {
      id: 'mg-m06-revision-ov-recap',
      type: 'recap',
      title: 'Compress',
      bullets: [
        'Your highest-confidence channel bet and the proof it still needs.',
        'The channel you should kill or park—and why.',
        'Creative constraint you will carry into campaign design.',
      ],
    },
    {
      id: 'mg-m06-revision-ov-practice',
      type: 'practice_task',
      title: 'Structured check',
      prompt:
        'In writing: (1) three sentences on what changed in your channel thinking, (2) one risk you were avoiding naming, (3) one check you will run before increasing spend.',
    },
    {
      id: 'mg-m06-revision-ov-next',
      type: 'next_step',
      body: 'Move to integrated campaign design when you can defend each active channel aloud.',
    },
  ],

  'marketing-and-growth::marketing-and-growth-capstone-prep': [
    {
      id: 'mg-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Assemble the dossier, not a slide outline',
      body:
        'Capstone prep is ready only when checkpoints and sessions reflect real judgment—now align artifacts to the dossier brief: audience insight, spine, experiments, creative suite, measurement with humility, risks, ethics.',
    },
    {
      id: 'mg-cap-prep-ov-keys',
      type: 'key_points',
      title: 'Alignment checklist',
      bullets: [
        'Growth KPI pack ties definitions, funnel stages, and dashboard views you will actually review—not decorative metrics.',
        'Each deliverable traces to earlier module artifacts (positioning, experiments, channel scorecard).',
        'Measurement story names attribution humility, guardrails, and weekly learning actions.',
        'Risks include creative fatigue, channel overload, and proof gaps.',
      ],
    },
    {
      id: 'mg-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Preparation moves',
      prompt: 'Map evidence you already hold vs. gaps to close before calling the dossier done.',
      bullets: [
        'Peer or mentor review scheduled with rubric shared in advance.',
        'Version naming so reviewers see iteration discipline.',
      ],
    },
    {
      id: 'mg-cap-prep-ov-next',
      type: 'next_step',
      title: 'After prep',
      body: 'Mark prep complete only when deliverables meet your acceptance criteria—not when slides exist.',
    },
  ],

  // --- Business Builder ---
  'business-builder::bb-m01-lesson': [
    {
      id: 'bb-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Ventures vs. hobbies',
      body:
        'Business Builder is about mechanics under uncertainty: validated demand, priced offers, cash-aware delivery, operating cadence, staged growth, explicit risks. Inspiration is optional; evidence and trade-offs are not.',
    },
    {
      id: 'bb-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'What “opportunity” must include',
      body:
        'An opportunity is a painful problem people will pay to solve now—substitutes included—with a scope you can survive building. If you cannot name substitutes and inertia, you are storytelling.',
    },
    {
      id: 'bb-m01-lesson-ov-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'Rank hypotheses by evidence',
      body:
        'List five problem hypotheses. For each, capture existing evidence, cost of the next test, and what would kill it. Sort by evidence-per-dollar before building more product.',
      example: 'Keep each row under 60 words; include a falsifying signal.',
    },
    {
      id: 'bb-m01-lesson-ov-reflect',
      type: 'reflection_prompt',
      title: 'Honesty check',
      prompt:
        'Which hypothesis are you protecting because it flatters your identity—and what cheaper test could challenge it?',
    },
    {
      id: 'bb-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Bring validation discipline next—scripts, thresholds, willingness to kill ideas that fail cheap tests.',
    },
  ],

  'business-builder::bb-m06-practice': [
    {
      id: 'bb-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Practice',
      title: 'Throughput before hype',
      body:
        'Scaling acquisition before delivery stabilizes is how promises break. Map bottleneck, define quality bar, choose proportional tools—then sequence growth hypotheses.',
    },
    {
      id: 'bb-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Practice tasks',
      bullets: [
        'Process sketch with bottleneck labeled + mitigation experiment dated.',
        'Hypothetical quality incident → preventive control + owner.',
      ],
      prompt: 'Use a real venture or tightly specified hypothetical—no anonymous “startup.”',
    },
    {
      id: 'bb-m06-practice-ov-output',
      type: 'output_prompt',
      title: 'Output standard',
      body:
        'Someone unfamiliar should see where work piles up, how defects surface, and what you refuse to automate yet.',
    },
    {
      id: 'bb-m06-practice-ov-next',
      type: 'next_step',
      body: 'Complete checkpoints—evidence includes naming the bottleneck aloud.',
    },
  ],

  'business-builder::bb-m06-revision': [
    {
      id: 'bb-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Delivery reality check',
      body:
        'Before systems and cadences layer on, confirm delivery can absorb demand. Revise throughput thinking until mitigations exist—not wishes.',
    },
    {
      id: 'bb-m06-revision-ov-recap',
      type: 'recap',
      title: 'Restate',
      bullets: [
        'Bottleneck resource or policy constraint in one sentence.',
        'Quality incident that would embarrass you publicly—preventive move.',
        'Tool you will not buy yet because stage does not justify it.',
      ],
    },
    {
      id: 'bb-m06-revision-ov-next',
      type: 'next_step',
      body: 'Proceed to operating rhythm design when throughput story holds under questioning.',
    },
  ],

  'business-builder::business-builder-capstone-prep': [
    {
      id: 'bb-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Diligence mindset',
      body:
        'Blueprint readers look for contradictions between promise, economics, delivery, growth, and risk. Prep is where you align artifacts and delete hedging slides.',
    },
    {
      id: 'bb-cap-prep-ov-keys',
      type: 'key_points',
      title: 'Must align',
      bullets: [
        'Offer promise ↔ capacity plan ↔ pricing assumptions.',
        'Growth hypotheses sequenced after throughput evidence.',
        'Risk register references real experiments already run.',
      ],
    },
    {
      id: 'bb-cap-prep-ov-output',
      type: 'output_prompt',
      title: 'Acceptance test',
      body:
        'Could a skeptical partner find decisions, owners, dates, and kill criteria without meeting you? If not, keep prepping.',
    },
    {
      id: 'bb-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish prep when your pack survives a mock advisor session—not when documents exist.',
    },
  ],

  // --- Money and Finance ---
  'money-and-finance::mf-m01-lesson': [
    {
      id: 'mf-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Money clarity for decisions you already face',
      body:
        'This course builds a finance pack you can reuse monthly: cash truth, honest categories, contribution thinking, scenarios, pricing conversations, trusted reporting. Precision where it matters; humility everywhere else.',
    },
    {
      id: 'mf-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'Why vocabulary matters',
      body:
        'Cash timing errors destroy ventures and households quietly. Profit without cash is a story; runway without obligations detail is fantasy. You are learning to ask “when does money move, and who is owed what?” before debating strategy.',
    },
    {
      id: 'mf-m01-lesson-ov-keys',
      type: 'key_points',
      title: 'Carry these distinctions',
      bullets: [
        'Revenue recognition ≠ cash in bank this week.',
        'Profit is not moral goodness—it is accounting under rules you must know.',
        'Runway is calendar math with dated obligations.',
      ],
    },
    {
      id: 'mf-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Bring one real month of numbers—even partial—to the next practice session.',
    },
  ],

  'money-and-finance::mf-m06-practice': [
    {
      id: 'mf-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Practice',
      title: 'Leverage as explicit choice',
      body:
        'Debt and leverage are neither evil nor free upside—they are payment shapes with covenants and stress paths. Sketch scenarios where payments bite and note when professionals must enter.',
    },
    {
      id: 'mf-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Tasks',
      bullets: [
        'Leverage scenario sketch with stressed payment month.',
        'Risk appetite paragraph tied to sleep-at-night metrics.',
      ],
      prompt: 'Use realistic numbers—even rounded—to force the exercise to bite.',
    },
    {
      id: 'mf-m06-practice-ov-reflect',
      type: 'reflection_prompt',
      title: 'Guardrail',
      prompt:
        'Where are you tempted to optimize spreadsheets instead of changing a behavior that drains cash?',
    },
    {
      id: 'mf-m06-practice-ov-next',
      type: 'next_step',
      body: 'Complete checkpoints—applied confirmation should reference a concrete obligation you named.',
    },
  ],

  'money-and-finance::mf-m03-recap': [
    {
      id: 'mf-m03-recap-ov-intro',
      type: 'intro',
      eyebrow: 'Recap',
      title: 'Foundations consolidation',
      body:
        'You are leaving pure foundations—cash language, budgets, contribution sketches. Capture artifacts you will reopen when negotiating, forecasting, or pricing.',
    },
    {
      id: 'mf-m03-recap-ov-recap',
      type: 'recap',
      title: 'Recap card',
      prompt: 'Keywords, traps, when to reopen this module.',
      bullets: ['Cash vs. profit traps you personally fall into', 'Category you must rename', 'Next forecast review date'],
    },
    {
      id: 'mf-m03-recap-ov-next',
      type: 'next_step',
      body: 'Enter scenario forecasting with your assumption table dated.',
    },
  ],

  'money-and-finance::money-and-finance-capstone-prep': [
    {
      id: 'mf-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Pack readiness',
      body:
        'Your pack should let someone else understand your financial story in one sitting: snapshots, budgets with owners, pricing logic, scenarios, conversation prep. Prep removes duplication and hedging.',
    },
    {
      id: 'mf-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Integration checklist',
      bullets: [
        'Same month represented consistently across snapshot and budget variance.',
        'Pricing worksheet references offer you can describe in two sentences.',
        'Scenario memo lists drivers that would flip outcomes.',
      ],
      prompt: 'Flag gaps honestly—reviewers forgive gaps, not concealment.',
    },
    {
      id: 'mf-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish prep when a trusted reviewer can replay your decisions without you talking.',
    },
  ],

  // --- Product Thinking ---
  'product-thinking::prd-m01-lesson': [
    {
      id: 'prd-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Problems before pixels',
      body:
        'Product Thinking is evidence craft: observable outcomes, honest discovery, falsifiable problems, prioritized bets, roadmap humility, ethical research. Features are late; judgment is early.',
    },
    {
      id: 'prd-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'What product work actually is',
      body:
        'Product work is deciding what should exist and why—under uncertainty, with ethical constraints, alongside design and engineering partners. If you cannot state outcomes and pains, you are decorating roadmaps.',
    },
    {
      id: 'prd-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Bring messy reality into discovery next—guides, synthesis discipline, contradictions intact.',
    },
  ],

  'product-thinking::prd-m06-practice': [
    {
      id: 'prd-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Practice',
      title: 'Cross-functional clarity',
      body:
        'Specs fail when acceptance criteria are vibes. Practice turning ambiguity into testable statements designers and engineers can negotiate without ping-pong.',
    },
    {
      id: 'prd-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Tasks',
      bullets: [
        'Spec critique with acceptance criteria highlighted.',
        'Joint sketch review notes + decisions logged.',
      ],
      prompt: 'Pick a thin slice feature—not a platform rewrite.',
    },
    {
      id: 'prd-m06-practice-ov-output',
      type: 'output_prompt',
      title: 'Done means',
      body:
        'Reviewers should see decisions, open questions, and explicit trade-offs—not narrative filler.',
    },
    {
      id: 'prd-m06-practice-ov-next',
      type: 'next_step',
      body: 'Checkpoints confirm you can describe application paths concretely.',
    },
  ],

  'product-thinking::prd-m06-revision': [
    {
      id: 'prd-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Before shipping discipline',
      body:
        'You are crossing from applied practice into professional execution. Tighten how you collaborate—spec clarity is safety for teams.',
    },
    {
      id: 'prd-m06-revision-ov-practice',
      type: 'practice_task',
      title: 'Structured check',
      prompt:
        'What rework did your last spec avoid—or cause? Name one clause you will always include going forward.',
    },
    {
      id: 'prd-m06-revision-ov-next',
      type: 'next_step',
      body: 'Advance when collaboration notes show fewer open interpretation gaps.',
    },
  ],

  'product-thinking::product-thinking-capstone-prep': [
    {
      id: 'prd-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Concept package alignment',
      body:
        'Capstone prep merges opportunity brief, discovery kit, bet backlog, roadmap narrative, metrics stance. Readers should see one storyline—not appendices fighting each other.',
    },
    {
      id: 'prd-cap-prep-ov-keys',
      type: 'key_points',
      title: 'Integration checks',
      bullets: [
        'Discovery insights appear in prioritization rationale.',
        'Roadmap horizons show assumptions and buffers.',
        'Ethics note covers research and UX manipulations you refuse.',
      ],
    },
    {
      id: 'prd-cap-prep-ov-next',
      type: 'next_step',
      body: 'Complete prep when skeptical peers fail to find contradictions between briefs.',
    },
  ],

  // --- Project Execution ---
  'project-execution::pex-m01-lesson': [
    {
      id: 'pex-m01-lesson-ov-intro',
      type: 'intro',
      eyebrow: 'Course opening',
      title: 'Execution is commitment hygiene',
      body:
        'Project Execution builds a playbook: explicit scope, decision rights, dependency realism, risk triggers, cadence that reduces noise, quality gates, ethical urgency, retros that transfer learning.',
    },
    {
      id: 'pex-m01-lesson-ov-concept',
      type: 'concept_explanation',
      eyebrow: 'Foundations',
      title: 'Start with decisions, not tickets',
      body:
        'Tickets without charter clarity recycle thrash. Success signals and non-goals keep executives and teams aligned when pressure arrives.',
    },
    {
      id: 'pex-m01-lesson-ov-next',
      type: 'next_step',
      body: 'Bring a live initiative—or tightly bounded simulation—to every practice.',
    },
  ],

  'project-execution::pex-m06-practice': [
    {
      id: 'pex-m06-practice-ov-intro',
      type: 'intro',
      eyebrow: 'Practice',
      title: 'Cadence that earns attention',
      body:
        'Ceremonies exist to reduce coordination tax. Design agendas that produce decisions—async norms that protect focus.',
    },
    {
      id: 'pex-m06-practice-ov-task',
      type: 'practice_task',
      title: 'Tasks',
      bullets: [
        'Critique current cadence; redesign with rationale + noise cuts.',
        'Checkpoint agenda template with explicit decision slots.',
      ],
      prompt: 'Name the culture constraints you cannot ignore.',
    },
    {
      id: 'pex-m06-practice-ov-next',
      type: 'next_step',
      body: 'Evidence checkpoints should mention a decision your new cadence unlocks.',
    },
  ],

  'project-execution::pex-m06-revision': [
    {
      id: 'pex-m06-revision-ov-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Rhythm reality',
      body:
        'Before change leadership and quality gates, confirm your cadence produces decisions—not theater. Revise until meetings have owners and outputs.',
    },
    {
      id: 'pex-m06-revision-ov-recap',
      type: 'recap',
      title: 'Compress',
      bullets: [
        'Meeting you would delete—and what replaces it.',
        'Async norm that reduced thrash.',
        'Decision that finally became explicit because of cadence fix.',
      ],
    },
    {
      id: 'pex-m06-revision-ov-next',
      type: 'next_step',
      body: 'Proceed when cadence critique shows measurable noise reduction.',
    },
  ],

  'project-execution::project-execution-capstone-prep': [
    {
      id: 'pex-cap-prep-ov-intro',
      type: 'intro',
      eyebrow: 'Capstone preparation',
      title: 'Playbook completeness',
      body:
        'Your playbook should let another lead run the next initiative: charter, maps, risks, cadence, comms, quality, escalation, retro. Prep removes contradictions between sections.',
    },
    {
      id: 'pex-cap-prep-ov-task',
      type: 'practice_task',
      title: 'Integration pass',
      bullets: [
        'Dependency map matches risk register triggers.',
        'Escalation paths reference decision rights from charter.',
        'Retro actions linked to knowledge artifacts.',
      ],
      prompt: 'Flag duplicate templates—merge ruthlessly.',
    },
    {
      id: 'pex-cap-prep-ov-next',
      type: 'next_step',
      body: 'Finish prep when a peer navigates the packet without you clarifying aloud.',
    },
  ],

  ...FLAGSHIP_SESSION_CONTENT_OVERRIDES_SCHOOLS134,
  ...FLAGSHIP_SESSION_CONTENT_OVERRIDES_MIDCOURSE,
}

export const FLAGSHIP_SESSION_CONTENT_OVERRIDES: Partial<Record<string, FlagshipSessionContentBlock[]>> = {
  ...FLAGSHIP_SESSION_CONTENT_OVERRIDES_WITHOUT_COMPLETION,
  ...FLAGSHIP_SESSION_CONTENT_OVERRIDES_COMPLETION,

  // Human-authored depth — overrides completion-layer templates for Clear Communication (sequential chapters).
  'clear-communication::cc-m02-lesson': [
    {
      id: 'cc-m02-lesson-authored-intro',
      type: 'intro',
      eyebrow: 'Chapter focus',
      title: 'Structure before polish: outlines that survive contact',
      body:
        'Polished sentences cannot rescue a broken sequence. This chapter installs an outline discipline you can defend in a meeting: a visible spine of decisions, claims, and evidence slots—so reviewers argue with your structure first, not your adjectives. You will practice translating messy threads into a memo skeleton a busy executive can scan in ninety seconds.',
    },
    {
      id: 'cc-m02-lesson-authored-concept',
      type: 'concept_explanation',
      eyebrow: 'Core idea',
      title: 'The three layers every outline must separate',
      body:
        'Separate (1) Situation & stakes—who is affected, by when, and what decision is pending. (2) Claims & requests—what you believe should happen, phrased as testable statements, not vibes. (3) Evidence & unknowns—what you have verified, what you are assuming, and what would change your mind. Most weak documents smear these layers; strong ones label them so a reader can challenge one layer without rejecting the whole memo.',
    },
    {
      id: 'cc-m02-lesson-authored-keys',
      type: 'key_points',
      title: 'Non-negotiables',
      bullets: [
        'One primary ask per outline—if you have three asks, you have three documents or a numbered appendix.',
        'Every claim names its owner and its risk if wrong (even in one clause).',
        'Explicit “open questions” beat fake certainty—sponsors trust labeled unknowns.',
      ],
    },
    {
      id: 'cc-m02-lesson-authored-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'From chat log to reviewable outline',
      body:
        'Imagine a Slack debate about delaying a launch. Raw chat mixes fear, politics, and data. Your job is not to transcribe chat—it is to extract: Situation (customer segment + deadline), Claims (“delay reduces rework risk” vs “delay burns channel commitments”), Evidence (bug counts, SLA breach examples, sales pipeline notes), Decision (“who decides by when”). Draft a one-page outline with those headings only—no rhetorical flourish.',
      example:
        'Constraint: six bullets under Evidence maximum; if you need more, move detail to an appendix titled “Backup scans.”',
    },
    {
      id: 'cc-m02-lesson-authored-scenario',
      type: 'concept_explanation',
      eyebrow: 'Scenario',
      title: 'When stakeholders attack your outline',
      body:
        'Expect two failure modes: (a) aesthetic critique—“tone feels off”—redirect to sequence: which claim is out of order? (b) evidence ambush—someone dumps a contradictory chart. Model the response: acknowledge the new evidence, restate which claim it touches, and propose a revised decision path. Outlines earn trust when you show how new inputs slot into layers instead of restarting the drama.',
    },
    {
      id: 'cc-m02-lesson-authored-reflect',
      type: 'reflection_prompt',
      title: 'Calibration',
      prompt:
        'Paste a real doc you are shy about (or describe it). Which layer—situation, claims, or evidence—is underdeveloped, and what single heading would you add first?',
    },
    {
      id: 'cc-m02-lesson-authored-next',
      type: 'next_step',
      title: 'Next',
      body: 'Proceed to the practice lab: swap outlines with a peer and hunt for confusion in structure—not wording.',
    },
  ],

  'clear-communication::cc-m03-lesson': [
    {
      id: 'cc-m03-lesson-authored-intro',
      type: 'intro',
      eyebrow: 'Chapter focus',
      title: 'Plain language without dumbing down',
      body:
        'Plain language is precision under constraint: fewer zombie nouns, fewer stacked qualifiers, more actors and verbs—while keeping technical terms that earn their place. This chapter trains you to compress without infantilizing: experts should sound clear, not simplistic. You will audit your own writing for nominalization, hedging stacks, and “policy voice” that hides weak reasoning.',
    },
    {
      id: 'cc-m03-lesson-authored-concept',
      type: 'concept_explanation',
      eyebrow: 'Core idea',
      title: 'Translation, not deletion',
      body:
        'Plain language is not “shorter at any cost.” It is translation from abstract process language into observable behavior. Replace “optimization initiative” with who does what by when. Replace “leverage synergies” with a named handoff and a metric. When a term is legally or technically required, define it once, then use it consistently—don’t sprinkle synonyms that imply different obligations.',
    },
    {
      id: 'cc-m03-lesson-authored-keys',
      type: 'key_points',
      title: 'Line-level moves',
      bullets: [
        'Open sentences with actors: humans, systems, or datasets—not “It is recommended that…”.',
        'Limit chained qualifiers to two; if you need more, split into two sentences or a table.',
        'Jargon audit: tag each acronym as “defined,” “unnecessary,” or “audience-safe.”',
      ],
    },
    {
      id: 'cc-m03-lesson-authored-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'Rewrite a “policy” paragraph for operators',
      body:
        'Start from a dense paragraph about “rolling out enhanced monitoring capabilities across stakeholder touchpoints.” Identify the real actions: deploy sensors, route alerts, assign on-call, measure false positives. Rewrite into three short sentences with subjects and verbs, then add a bullet list of unknowns. The target reader is an engineer at 23:00—not a brand committee.',
      example: 'Keep the rewrite under 120 words; if you miss the limit, you are still hiding verbs.',
    },
    {
      id: 'cc-m03-lesson-authored-scenario',
      type: 'concept_explanation',
      eyebrow: 'Scenario',
      title: 'When precision annoys a stakeholder',
      body:
        'Some audiences equate plain language with loss of status. Counter by pairing clarity with rigor: “Here is the simpler sentence, and here is the evidence clause that makes it responsible.” You are not abandoning nuance—you are stacking nuance where it belongs: after the clear claim, not inside a fog of nouns.',
    },
    {
      id: 'cc-m03-lesson-authored-reflect',
      type: 'reflection_prompt',
      title: 'Calibration',
      prompt:
        'Find one sentence in your recent writing with three+ abstract nouns in a row. Rewrite it for meaning; note the term you refused to cut and why.',
    },
    {
      id: 'cc-m03-lesson-authored-next',
      type: 'next_step',
      title: 'Next',
      body: 'Bring a jargon audit to the practice session: one page of your own copy, marked keep/kill/define.',
    },
  ],

  'clear-communication::cc-m04-lesson': [
    {
      id: 'cc-m04-lesson-authored-intro',
      type: 'intro',
      eyebrow: 'Chapter focus',
      title: 'Audience modeling that changes what you say',
      body:
        'Communication fails when you rehearse a single “general” talk in your head. This chapter builds an audience model you can annotate on every deliverable: role pressures, decision rights, literacy boundaries, and failure modes (skepticism, time poverty, incentives). You will practice adjusting depth, proof style, and call-to-action without inventing a different factsheet for every person—using tiers of optional detail instead.',
    },
    {
      id: 'cc-m04-lesson-authored-concept',
      type: 'concept_explanation',
      eyebrow: 'Core idea',
      title: 'The audience matrix (minimum viable)',
      body:
        'For each key reader, capture: What decision can they make or block? What would make them look bad if wrong? What do they already believe about your topic? What format do they trust—numbers, narratives, demos? Your memo should front-load what matters to the decider, push operator detail to labeled sections, and never bury veto risks where a sponsor will skim past them.',
    },
    {
      id: 'cc-m04-lesson-authored-keys',
      type: 'key_points',
      title: 'Design rules',
      bullets: [
        'Primary reader gets the executive summary they asked for—not the one you wish they wanted.',
        'Secondary readers get appendix hooks (“If you own analytics, jump to §4”).',
        'Name hostile readers explicitly in a risk paragraph—silence invites surprise attacks later.',
      ],
    },
    {
      id: 'cc-m04-lesson-authored-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'Same facts, two doors',
      body:
        'Take one recommendation (e.g., delay launch). Draft two openings: for a CFO worried about cash timing, lead with runway and scenario costs; for a CX lead worried about churn, lead with customer promises and service load. Same evidence appendix attached—only the doorway changes. Notice how “honesty” is constant while emphasis shifts.',
      example: 'Each opening ≤90 words; if you cannot fit the stakes, your claim is still mushy.',
    },
    {
      id: 'cc-m04-lesson-authored-scenario',
      type: 'concept_explanation',
      eyebrow: 'Scenario',
      title: 'Mixed audiences in one room',
      body:
        'Meetings bundle executives, implementers, and blockers. Your spoken outline should sequence: align on decision first, surface objections with names (“Finance, does this assumption break your model?”), then park deep dives. Written artifacts can mirror that sequence with a one-page decision memo plus layered appendices—so the room shares one spine even when expertise differs.',
    },
    {
      id: 'cc-m04-lesson-authored-reflect',
      type: 'reflection_prompt',
      title: 'Calibration',
      prompt:
        'Who is the single person who could say “no” to your next proposal—and what proof style would they trust that differs from your default?',
    },
    {
      id: 'cc-m04-lesson-authored-next',
      type: 'next_step',
      title: 'Next',
      body: 'Practice: map three audiences for a live initiative and adjust one outline section per audience tier.',
    },
  ],

  // AI Essentials (Course 1) — deep lesson teaching blocks; wins over Schools134, MidCourse, and completion for these keys.
  ...FLAGSHIP_SESSION_CONTENT_OVERRIDES_AI_ESSENTIALS_LESSONS,
  ...FLAGSHIP_SESSION_CONTENT_OVERRIDES_AI_ESSENTIALS_GAPS,
}

export function flagshipSessionContentOverrideKey(courseSlug: string, sessionId: string): string {
  return `${courseSlug}::${sessionId}`
}
