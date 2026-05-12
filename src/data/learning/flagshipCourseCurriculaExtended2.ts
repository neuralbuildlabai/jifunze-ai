/**
 * Remaining flagship curricula (money → teaching) — pairs with flagshipCourseCurriculaExtended.ts
 */

import type { FlagshipCourseCurriculum } from './flagshipCurriculumTypes'

export const FLAGSHIP_CURRICULA_EXTENDED_2: Record<string, FlagshipCourseCurriculum> = {
  'money-and-finance': {
    slug: 'money-and-finance',
    estimatedDurationLabel: 'Roughly 40–58 hours of study and practice',
    depthLabel:
      'Money judgment for real life and small enterprise: cash timing, honest categories, pricing as choice, scenarios over false precision.',
    reinforcementSignals: [
      'Cash vs. accrual fluency using your own numbers—not textbook abstractions',
      'Budgets as living documents with variance triggers, not annual wish lists',
      'Pricing and margin exercises tied to one real offer you can name',
      'Scenario planning with named drivers, not single-line optimism',
      'Snapshot + action plan you can re-run monthly with the same structure',
    ],
    capstone: {
      title: 'Personal or venture finance action pack (reviewer-ready)',
      description:
        'Build a single pack for a context you actually own: rolling cash + P&L snapshot, category budget with variance rules, pricing & margin sheet for a live offer, best/base/stress scenario narrative, upcoming money conversation plan, and a 30/60/90 action list. Calm about trade-offs, explicit about what you do not know, ready to show a partner, board, or family member.',
      deliverables: [
        'Monthly snapshot template with one completed month annotated',
        'Category budget with variance triggers and who owns each line',
        'Pricing & margin worksheet for one offer (sensitivity + ethical floor notes)',
        'Three-scenario financial story (best / base / stress) with driver list',
        'Money conversation prep sheet (objectives, walk-away, package trade space)',
      ],
    },
    modules: [
      {
        id: 'mf-m01',
        order: 1,
        title: 'Cash vs. profit vs. runway—language tied to decisions',
        stage: 'foundations',
        summary:
          'Eliminate swapped terms that destroy plans: revenue is not schedule, profit is not cash timing, runway is calendar math with obligations.',
        learningGoals: [
          'Translate cash in/out vs. accrual snapshots for one context.',
          'Identify timing traps (payroll, deposits, inventory, net terms).',
          'Ask finance questions anchored to upcoming decisions—not vague worry.',
        ],
        practiceActivities: [
          'Sanity-pass a simple P&L against a rolling cash planner for same month.',
          'Diagram timing for three recurring obligations with due dates.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Cash vs accrual reconciliation sheet'],
      },
      {
        id: 'mf-m02',
        order: 2,
        title: 'Budget as operating instrument: envelopes, variance, owners',
        stage: 'foundations',
        summary:
          'Design categories people behave against—trigger rules when reality diverges, owners per line.',
        learningGoals: [
          'Pick categories that change behavior—not too aggregate, not too granular.',
          'Define variance thresholds that force conversation, not panic.',
          'Separate fixed commitments from discretionary bets clearly.',
        ],
        practiceActivities: [
          'Budget draft with variance triggers + escalation owner per category.',
          'Rewrite one mushy category into measurable definition.',
        ],
        expectedOutputs: ['Category budget draft + variance triggers'],
      },
      {
        id: 'mf-m03',
        order: 3,
        title: 'Contribution and payback thinking without spreadsheet idolatry',
        stage: 'foundations',
        summary:
          'Estimate unit contribution at legible fidelity—stress-test assumptions manually before trusting models.',
        learningGoals: [
          'Sketch contribution for one priced offer.',
          'List three assumptions that would wreck the sketch fastest.',
          'Reject vanity denominators (“per user” without definition).',
        ],
        practiceActivities: [
          'Manual contribution sketch + sensitivity grid.',
          'Write kill criteria for when to revisit pricing or cost structure.',
        ],
        recap: true,
        expectedOutputs: ['Contribution sketch + sensitivity grid'],
      },
      {
        id: 'mf-m04',
        order: 4,
        title: 'Forecasting as scenario chore, not prophecy',
        stage: 'applied_practice',
        summary:
          'Best/base/stress stories with named drivers—schedule revisions when facts change.',
        learningGoals: [
          'Build narratives with explicit driver list.',
          'Document what would flip you between scenarios.',
          'Schedule forecast reviews like maintenance.',
        ],
        practiceActivities: [
          'Three-scenario worksheet with driver sensitivity notes.',
          'Pre-mortem on optimistic scenario—what breaks first?',
        ],
        expectedOutputs: ['Scenario memo v1'],
      },
      {
        id: 'mf-m05',
        order: 5,
        title: 'Pricing as choice under constraints: value, competition, ethics',
        stage: 'applied_practice',
        summary:
          'Price from value delivered and cost to serve—document packages, discounts, and ethical floors before emotions spike.',
        learningGoals: [
          'Contrast cost-plus convenience vs. value storytelling honestly.',
          'Design discount rules that do not train customers to wait.',
          'Discuss money with calm clarity.',
        ],
        practiceActivities: [
          'Pricing narrative + package grid for one offer.',
          'Ethical boundary statement for aggressive pricing requests.',
        ],
        expectedOutputs: ['Pricing one-pager'],
      },
      {
        id: 'mf-m06',
        order: 6,
        title: 'Debt, leverage, risk appetite—without catastrophizing',
        stage: 'applied_practice',
        summary:
          'Understand obligations as structured choices—know when DIY ends and professionals enter.',
        learningGoals: [
          'Compare instruments by payment shape, covenant risk, optionality.',
          'State risk appetite as numbers + emotional facts.',
          'Escalate to qualified help with crisp questions.',
        ],
        practiceActivities: [
          'Leverage scenario sketch with stress payments.',
          'Risk appetite paragraph tied to sleep-at-night metrics.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Leverage scenario + risk appetite statement'],
      },
      {
        id: 'mf-m07',
        order: 7,
        title: 'Negotiating money: packages, trade space, calm process',
        stage: 'professional_execution',
        summary:
          'Prepare money conversations—salary, vendors, partners—with objectives, alternatives, and respectful firmness.',
        learningGoals: [
          'State BATNA and trade packages simply.',
          'Separate relationship care from clarity on numbers.',
          'Use silence and agenda control ethically.',
        ],
        practiceActivities: [
          'Prep sheet for next real money conversation.',
          'Short role-play debrief on tone + clarity.',
        ],
        expectedOutputs: ['Money negotiation prep sheet'],
      },
      {
        id: 'mf-m08',
        order: 8,
        title: 'Numbers that earn trust: reporting rhythm and definitions',
        stage: 'professional_execution',
        summary:
          'Deliver finance updates people read—definitions attached, bad news early, cadence predictable.',
        learningGoals: [
          'Design lightweight reporting rhythm for your audience.',
          'Attach metric definitions to kill misinterpretation.',
          'Translate anxious spreadsheets into steady narrative.',
        ],
        practiceActivities: [
          'Critique a noisy report; propose cleaner structure.',
          'Rewrite anxious metrics paragraph into calm story + actions.',
        ],
        expectedOutputs: ['Finance narrative + definitions appendix'],
      },
      {
        id: 'mf-m09',
        order: 9,
        title: 'Systems for recurring money decisions',
        stage: 'mastery_outputs',
        summary:
          'Automate safe parts; escalate judgment calls—calendar triggers, minimal instrumentation, anti-gaming habits.',
        learningGoals: [
          'Define triggers that force reviews without alarm fatigue.',
          'Instrument only what decisions require.',
          'Prevent gaming metrics at home or in small teams.',
        ],
        practiceActivities: [
          'Finance calendar with triggers + owners.',
          'Quarterly review ritual outline with agenda.',
        ],
        expectedOutputs: ['Finance operating calendar'],
      },
      {
        id: 'mf-m10',
        order: 10,
        title: 'Capstone rehearsal: integrate the pack',
        stage: 'mastery_outputs',
        summary:
          'Merge artifacts into one reusable pack—plain language, dated snapshots, critique, refresh plan.',
        learningGoals: [
          'Assemble outputs into coherent narrative.',
          'Invite trusted reviewer; log revisions.',
          'Commit to monthly refresh ritual.',
        ],
        practiceActivities: [
          'Walkthrough with reviewer using rubric.',
          'Second pass tightening numbers + narrative.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Finance action pack v1'],
      },
    ],
  },

  'product-thinking': {
    slug: 'product-thinking',
    estimatedDurationLabel: 'Roughly 52–78 hours of study and practice',
    depthLabel:
      'Evidence-led product craft: discovery, prioritization with outcome KPIs and guardrails, instrumentation discipline, stakeholder-safe metrics narratives—shipping loops that learn.',
    reinforcementSignals: [
      'Problems framed until falsifiable—no solution smuggling',
      'Outcome KPIs vs output throughput: activation, retention, task success, economic proxies—each tied to decisions',
      'Interview artifacts that preserve contradiction and small-N humility',
      'Roadmaps expressed as bets with hypotheses, measurable signals, buffers, explicit nos',
      'Feature and experiment reviews that judge evidence, not roadmap theater',
      'Concept package tying opportunity, discovery, bets, metrics, ethics',
    ],
    capstone: {
      title: 'Product concept package: opportunity, discovery, bets, measures',
      description:
        'Produce an integrated package for one real product surface or initiative: crisp opportunity framing, discovery plan with participant criteria and ethics, prioritized bet backlog with explicit trade-offs, roadmap narrative as hypotheses (not promises), metrics & instrumentation stance, stakeholder update cadence. Written to survive skeptical design, engineering, and leadership review.',
      deliverables: [
        'Opportunity brief (problem, segments, substitutes, why now, risks)',
        'Discovery plan: questions, recruitment filters, synthesis protocol, anti-bias checks',
        'Prioritized bet backlog with assumptions, kill metrics, sequencing',
        'Product KPI framework: north-star outcome, drivers, diagnostics, definitions, review cadence',
        'Roadmap narrative by horizon with uncertainty buffers',
        'Metrics & ethics note: instrumentation map, consent posture, dark-pattern scan',
      ],
    },
    modules: [
      {
        id: 'prd-m01',
        order: 1,
        title: 'Outcomes before outputs: behaviors, pains, proof gaps',
        stage: 'foundations',
        summary:
          'Anchor product thinking in observable change—reject feature lists masquerading as strategy.',
        learningGoals: [
          'Rewrite feature ideas into measurable user or business outcomes.',
          'Separate problem diagnosis from favored solution.',
          'Catch solution attachment early.',
        ],
        practiceActivities: [
          'Rewrite five “features” into outcome statements with measures.',
          'Journal last purchase: job, anxiety, alternate solutions.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Outcome rewrite sheet + jobs-to-be-done journal'],
      },
      {
        id: 'prd-m02',
        order: 2,
        title: 'Discovery conversations that stay honest',
        stage: 'foundations',
        summary:
          'Prompts that reveal reality; synthesis that preserves contradiction and uncertainty.',
        learningGoals: [
          'Draft non-leading discovery prompts.',
          'Synthesize interviews without cherry-picking quotes.',
          'Hold small-N humility without paralysis.',
        ],
        practiceActivities: [
          'Interview guide + bias checklist.',
          'Mock interview + critique on neutrality.',
        ],
        expectedOutputs: ['Discovery interview guide + synthesis notes'],
      },
      {
        id: 'prd-m03',
        order: 3,
        title: 'Problem statements investors and builders can argue with',
        stage: 'foundations',
        summary:
          'Frame problems tightly enough to prioritize—who hurts, how you know, what proof would falsify.',
        learningGoals: [
          'Produce falsifiable problem formulations.',
          'Expose who suffers with evidence types.',
          'Banish sneaky solution language.',
        ],
        practiceActivities: [
          'Problem matrix across segments + severity signals.',
          'Structured peer tear-down.',
        ],
        recap: true,
        expectedOutputs: ['Problem matrix + falsifiable problem brief'],
      },
      {
        id: 'prd-m04',
        order: 4,
        title: 'Prioritization with accountable trade-offs',
        stage: 'applied_practice',
        summary:
          'Pick frameworks deliberately—every priority implies deprioritized work surfaced explicitly—and tie bets to measurable signals (leading indicators, guardrails) you will review after ship.',
        learningGoals: [
          'Document scoring assumptions others can inspect.',
          'Attach a proposed outcome KPI or proxy to each prioritized bet.',
          'State opportunity costs in writing.',
          'Deliver respectful “no” with reasoning.',
        ],
        practiceActivities: [
          'Rank five initiatives with explicit cuts + rationale + signal you would watch per item.',
          'Deprioritization note stakeholders can forward.',
        ],
        expectedOutputs: ['Prioritized backlog + prioritization signals memo'],
      },
      {
        id: 'prd-m05',
        order: 5,
        title: 'Roadmaps as bets with buffers, not Gantt fantasy',
        stage: 'applied_practice',
        summary:
          'Theme-based horizons with uncertainty acknowledged—each horizon lists bets, learning milestones, and the outcome metrics that would validate or kill the theme.',
        learningGoals: [
          'Express roadmap as hypotheses + learning milestones + signal review dates.',
          'Align narrative across exec, design, engineering without promising false precision.',
          'Insert buffers without hiding cowardice behind vagueness.',
        ],
        practiceActivities: [
          'Quarter roadmap narrative + risk footnotes + KPI review hooks per theme.',
          'Stakeholder FAQ anticipating thrash + “how we will know” metric cues.',
        ],
        expectedOutputs: ['Bet narrative one-pager + metric review hooks'],
      },
      {
        id: 'prd-m06',
        order: 6,
        title: 'Partnering with design & engineering without ping-pong',
        stage: 'applied_practice',
        summary:
          'Ship specs with crisp acceptance criteria and feasibility empathy—joint sketches, explicit tradeoffs, and decision logs so design and engineering stop ping-ponging rework.',
        learningGoals: [
          'Author acceptance criteria testable without interpretation fights.',
          'Navigate feasibility trade-offs collaboratively.',
          'Reduce churn through upfront clarity.',
        ],
        practiceActivities: [
          'Spec critique with designers/engineers role-play.',
          'Joint sketch review with decision log.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Spec excerpt + acceptance criteria block'],
      },
      {
        id: 'prd-m07',
        order: 7,
        title: 'Shipping to learn: launches, instrumentation discipline',
        stage: 'professional_execution',
        summary:
          'Minimal viable instrumentation—define product KPIs (activation, task success, funnel steps) tied to decisions; retros must interpret metric movement, not vanity releases.',
        learningGoals: [
          'Define launch readiness without gold-plating.',
          'Pick smallest metric set that informs next cut—primary outcome + guardrails.',
          'Specify event definitions so analytics matches the question (not the tool defaults).',
          'Retro formats producing owners + dates when KPIs breach thresholds.',
        ],
        practiceActivities: [
          'Launch checklist + kill switch + primary KPI & guardrail definitions.',
          'Learning plan template for post-launch window with weekly metric read agenda.',
          'Draft a “metric dictionary” snippet engineers/analytics can align to.',
        ],
        expectedOutputs: ['Launch readiness + KPI dictionary slice + learning plan'],
      },
      {
        id: 'prd-m08',
        order: 8,
        title: 'Stakeholder alignment without status theater',
        stage: 'professional_execution',
        summary:
          'Replace noisy status with metric-grounded narratives—exec updates tie roadmap bets to KPI movement, risks, and decisions needed; async-first with explicit escalation rails.',
        learningGoals: [
          'Compress sprawling updates into exec narrative: bets, KPI variance vs. hypothesis, asks.',
          'Escalate with decisions, data slice, recommendation—not opinion.',
          'Separate relationship maintenance from accountability.',
        ],
        practiceActivities: [
          'Rewrite sprawling status doc into crisp update with KPI lines + decision ask.',
          'Conflict rehearsal with facilitator notes.',
        ],
        expectedOutputs: ['Executive-ready status update + KPI variance snippet'],
      },
      {
        id: 'prd-m09',
        order: 9,
        title: 'Ethics, consent, proportionality in research and UX',
        stage: 'mastery_outputs',
        summary:
          'Research and ship respectfully—consent boundaries, dark-pattern vigilance, proportionate data.',
        learningGoals: [
          'Outline consent posture for discovery.',
          'Identify manipulative UX patterns.',
          'Collect only data decisions require.',
        ],
        practiceActivities: [
          'Ethics worksheet applied to live flow.',
          'Rewrite manipulative microcopy responsibly.',
        ],
        expectedOutputs: ['Ethics & consent review sheet'],
      },
      {
        id: 'prd-m10',
        order: 10,
        title: 'Concept package rehearsal: critique + versioning',
        stage: 'mastery_outputs',
        summary:
          'Merge discovery, bets, roadmap, metrics, and ethics notes into one concept package—pressure-test with a skeptical panel, then version changes so capstone reviewers can trace every shift.',
        learningGoals: [
          'Unify artifacts into single storyline.',
          'Invite sharp critique; triage feedback.',
          'Maintain version history for accountable change.',
        ],
        practiceActivities: [
          'Dry-run review with rubric.',
          'Revision pass from consolidated feedback log.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Product concept package v1'],
      },
    ],
  },

  'project-execution': {
    slug: 'project-execution',
    estimatedDurationLabel: 'Roughly 50–72 hours of study and practice',
    depthLabel:
      'Delivery craft under uncertainty: explicit commitments, dependency realism, status and risk KPIs you review on cadence, ethical urgency, communication that reduces thrash.',
    reinforcementSignals: [
      'Charters with measurable success signals and explicit non-goals',
      'Dependency maps as living artifacts—interfaces, owners, handshake risks',
      'Risk registers tied to triggers, early-warning signals, not decoration',
      'Execution reporting: milestone velocity, blocked work, defect/quality proxies, escalation when thresholds breach',
      'Cadences and checkpoints tuned to culture—noise reduction focus',
      'Playbook packaging decisions, templates, retros so the next initiative starts smarter',
    ],
    capstone: {
      title: 'Delivery playbook for a live initiative',
      description:
        'Document an initiative you own or simulate tightly: charter with success signals + non-goals, stakeholder map with decision rights, milestone & dependency map with interface agreements, execution cadence plan with embedded status KPIs (schedule confidence, throughput, blocked work), risk register with mitigations + escalation triggers, delivery reporting & intervention protocol, change + comms outline, quality/DoD gates, delivery trade-off playbook, closeout retro with captured learning. Designed so another lead could run the next phase from your packet.',
      deliverables: [
        'Project charter + decision rights appendix',
        'Milestone & dependency map with interface contracts',
        'Risk register with owners, triggers, mitigations',
        'Delivery status pack: milestone/dependency health, blocked-work indicators, schedule-risk signals, escalation triggers',
        'Cadence & checkpoint plan (sync/async norms, what gets reported when)',
        'Change & stakeholder communication outline',
        'Quality / definition-of-done + defect or rework signals + review gate checklist',
        'Escalation & scope trade-off playbook',
        'Closeout retro pack with actions + knowledge handoff',
      ],
    },
    modules: [
      {
        id: 'pex-m01',
        order: 1,
        title: 'Intent, scope, success signals, and explicit non-goals',
        stage: 'foundations',
        summary:
          'Start where accountability lives: measurable “done,” boundaries, assumptions named before optimism sets dates.',
        learningGoals: [
          'Draft measurable success signals stakeholders can inspect.',
          'List scope boundaries and explicit non-goals.',
          'Expose hidden commitments masquerading as tasks.',
        ],
        practiceActivities: [
          'Charter skeleton for live initiative with assumption table.',
          'Non-goals list with rationale each line.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Charter skeleton + assumption / non-goals table'],
      },
      {
        id: 'pex-m02',
        order: 2,
        title: 'Stakeholders, decisions, and authority clarity',
        stage: 'foundations',
        summary:
          'Map who decides what—trim approval theater, surface silent stakeholders early.',
        learningGoals: [
          'Assign decision rights with escalation paths.',
          'Reduce approval chains where reversible.',
          'Identify invisible stakeholders who appear late.',
        ],
        practiceActivities: [
          'Decision-rights map + RACI where it earns its keep.',
          'Two-week decision log trial.',
        ],
        expectedOutputs: ['Stakeholder + decision-rights map'],
      },
      {
        id: 'pex-m03',
        order: 3,
        title: 'Plans as hypotheses: milestones, buffers, assumptions',
        stage: 'foundations',
        summary:
          'Milestones admit unknowns—buffers justified, assumptions visible, pivot triggers explicit.',
        learningGoals: [
          'Choose fidelity fit to horizon.',
          'Sketch critical path thinking without fake precision.',
          'Document assumptions that would invalidate plan.',
        ],
        practiceActivities: [
          'Milestone map v1 with buffer rationale.',
          'Assumption table with owners + review dates.',
        ],
        recap: true,
        expectedOutputs: ['Milestone map + assumption register'],
      },
      {
        id: 'pex-m04',
        order: 4,
        title: 'Dependencies, interfaces, integration risk',
        stage: 'applied_practice',
        summary:
          'Model the dependency graph across teams, systems, and approvals—then lock handshake agreements with acceptance checks so integration risk surfaces before dates turn into blame.',
        learningGoals: [
          'Model dependencies without fantasy sequentialism.',
          'Negotiate interfaces with acceptance tests.',
          'Flag integration risks early.',
        ],
        practiceActivities: [
          'Dependency graph with critical handshakes highlighted.',
          'Interface agreement draft for one messy edge.',
        ],
        expectedOutputs: ['Dependency graph + interface agreement'],
      },
      {
        id: 'pex-m05',
        order: 5,
        title: 'Risk practice: registers tied to triggers',
        stage: 'applied_practice',
        summary:
          'Risks as dated events with owners—pair each major risk with early-warning indicators you can scan in status reviews, not just prose.',
        learningGoals: [
          'Write risks as concrete events.',
          'Define 1–2 observable signals per major risk (schedule slip pattern, dependency ping latency, defect spike).',
          'Pair mitigations with dates + owners.',
          'Route to escalation paths deliberately when signals breach.',
        ],
        practiceActivities: [
          'Risk register v1 + review ritual + indicator column per top risk.',
          'Pre-mortem notes turned into actions.',
        ],
        expectedOutputs: ['Risk register v1 + early-warning indicators'],
      },
      {
        id: 'pex-m06',
        order: 6,
        title: 'Execution cadence: ceremonies, async, checkpoints',
        stage: 'applied_practice',
        summary:
          'Tune ceremonies and async norms—embed a concise project status model: milestones, blocked work, dependency readiness, burn vs. buffer—so checkpoints produce decisions from signals, not storytelling.',
        learningGoals: [
          'Pick a minimal status KPI set appropriate to initiative size (e.g., milestone variance, WIP limits, blocker count).',
          'Design lightweight ceremonies with agendas that reference those signals.',
          'Codify async norms + expectations.',
          'Make checkpoints produce decisions when signals breach thresholds.',
        ],
        practiceActivities: [
          'Critique existing cadence; redesign with rationale + status strip.',
          'Checkpoint agenda template with decision slots + “red signal” triggers.',
          'Draft a weekly project status outline: scope/timeline/risks/asks in one page.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Cadence redesign memo + checkpoint template + weekly status outline'],
      },
      {
        id: 'pex-m07',
        order: 7,
        title: 'Change leadership without buzzword soup',
        stage: 'professional_execution',
        summary:
          'Bring people through impact with a plain narrative, responsible training cutovers, and empathy for loss—resistance mapped without contempt, sponsors aligned on what “done” means.',
        learningGoals: [
          'Craft change story with listener empathy.',
          'Define training cutovers responsibly.',
          'Map resistance without contempt.',
        ],
        practiceActivities: [
          'Change communications outline + FAQ.',
          'Office-hours / listening plan.',
        ],
        expectedOutputs: ['Change comms outline + FAQ'],
      },
      {
        id: 'pex-m08',
        order: 8,
        title: 'Quality, definition of done, review gates',
        stage: 'professional_execution',
        summary:
          'Stop infinite polish—DoD contracts, review ethics, balance product vs. technical quality—and define quality signals (defect/rework rates, escaped issues) you will watch in delivery reviews.',
        learningGoals: [
          'Author DoD templates stakeholders sign.',
          'Make review gates decisions, not opinions.',
          'Navigate product vs. engineering quality trade-offs.',
          'Choose lightweight quality metrics appropriate to risk class.',
        ],
        practiceActivities: [
          'DoD + gate checklist for initiative.',
          'Simulate gate review with notes + quality signal line items.',
        ],
        expectedOutputs: ['DoD + gate checklist + quality signal definitions'],
      },
      {
        id: 'pex-m09',
        order: 9,
        title: 'Pressure delivery: scope trades, escalation, protection',
        stage: 'mastery_outputs',
        summary:
          'Negotiate cuts transparently; escalate early with evidence-backed status (schedule impact, risk indicators); shield teams from thrash.',
        learningGoals: [
          'Run structured scope trade conversations tied to milestone and quality signals.',
          'Escalate with crisp exec narrative plus the smallest metric snapshot that proves urgency.',
          'Protect teams from conflicting urgencies.',
        ],
        practiceActivities: [
          'Escalation memo with options + recommendation + embedded status facts.',
          'Scope trade scenario walkthrough with KPI impact notes.',
        ],
        expectedOutputs: ['Escalation memo + scope trade playbook'],
      },
      {
        id: 'pex-m10',
        order: 10,
        title: 'Closeout, retro, knowledge handoff',
        stage: 'mastery_outputs',
        summary:
          'Finish with artifacts someone else could run from—learning captured, celebration grounded.',
        learningGoals: [
          'Facilitate retro producing dated actions.',
          'Capture knowledge for future initiatives.',
          'Acknowledge wins without vanity metrics.',
        ],
        practiceActivities: [
          'Retro facilitation plan + follow-through tracker.',
          'Learning log consolidated into playbook updates.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Delivery playbook v1'],
      },
    ],
  },

  'research-and-critical-thinking': {
    slug: 'research-and-critical-thinking',
    estimatedDurationLabel: 'Roughly 55–80 hours of study and practice',
    depthLabel:
      'Epistemic discipline for real decisions: falsifiable questions, triangulated sources, synthesis that admits limits—anti-hot-takes training.',
    reinforcementSignals: [
      'Evidence tables as default—claims never float untethered',
      'Triangulation drills across incentive landscapes',
      'Stopping rules so research finishes without infinite drift',
      'Writing templates that foreground uncertainty ethically',
      'Defense-ready brief—not a polished blog post',
    ],
    capstone: {
      title: 'Evidence-backed brief on a contested decision',
      description:
        'Answer one genuinely contested question in your life or field with intellectual honesty: falsifiable framing, explicit scope/exclusions, curated evidence basket with incentives noted, synthesis that maps agreements/disagreements, limitations without cop-outs, and recommendations proportional to evidence—plus a short mock-defense appendix (anticipated attacks + responses).',
      deliverables: [
        'Scope memo: question, stakes, exclusions, stopping rules',
        'Evidence table with strength scores + contradiction map',
        'Synthesis memo with recommendations + kill criteria for belief updates',
        'Integrity addendum: biases checked, unknowns logged, revisit triggers',
      ],
    },
    modules: [
      {
        id: 'rtc-m01',
        order: 1,
        title: 'Questions, falsifiability, and scope discipline',
        stage: 'foundations',
        summary:
          'Frame questions so evidence could change your mind—explicit scope, falsifiers named, loaded language stripped before you collect sources.',
        learningGoals: [
          'Rewrite mushy questions into falsifiable claims with observable implications.',
          'Draw scope boundaries: inclusions, exclusions, and “not answering yet.”',
          'Detect loaded framing that smuggles conclusions into the question.',
        ],
        practiceActivities: [
          'Take three headlines or debate prompts; rewrite each into a precise research question + falsifier.',
          'Write a half-page scope memo: stakes, audience, stopping rule, non-goals.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Scope one-pager v1'],
      },
      {
        id: 'rtc-m02',
        order: 2,
        title: 'Sources: types, incentives, and triangulation',
        stage: 'foundations',
        summary:
          'Build a basket of evidence—primary where possible—and read every source for incentives, not just tone.',
        learningGoals: [
          'Classify sources (data, testimony, analysis, advocacy) and weight them appropriately.',
          'Sketch incentive maps: who pays, who gains reputation, what is unsaid.',
          'Triangulate with at least two independent lines before treating a claim as established.',
        ],
        practiceActivities: [
          'Assemble a five-source portfolio on one topic with one-line incentive notes per source.',
          'Mark which claims in a popular article are supported vs. asserted; list what evidence is missing.',
        ],
        expectedOutputs: ['Source portfolio + incentive sketch'],
      },
      {
        id: 'rtc-m03',
        order: 3,
        title: 'Notes that enable synthesis, not hoarding',
        stage: 'foundations',
        summary:
          'Capture quotations with provenance, paraphrase with discipline, cluster by claim—not by author—so writing becomes possible.',
        learningGoals: [
          'Separate verbatim quotes from paraphrase with page/section anchors.',
          'Cluster notes under claim headings that support later synthesis.',
          'Prune hoarded clips that duplicate the same claim without adding strength.',
        ],
        practiceActivities: [
          'Migrate messy notes into a template: claim → evidence → conflict → open question.',
          'Cluster notes into a working outline with explicit gaps highlighted.',
        ],
        recap: true,
        expectedOutputs: ['Structured note packet'],
      },
      {
        id: 'rtc-m04',
        order: 4,
        title: 'Logic, rhetoric, and common fallacies',
        stage: 'applied_practice',
        summary:
          'Name rhetorical moves and informal fallacies in live arguments—then steel-man the strongest opposing case.',
        learningGoals: [
          'Tag fallacy-shaped moves without dismissing arguments by label alone.',
          'Separate emotional tone from inferential structure.',
          'Produce a steel-man paragraph an opponent would recognize as fair.',
        ],
        practiceActivities: [
          'Annotate one editorial or thread: each paragraph gets rhetoric tag + evidence strength.',
          'Write steel-man + steel-woman summary of a view you reject; list where it still bites.',
        ],
        expectedOutputs: ['Rhetoric annotation sheet + steel-man paragraph'],
      },
      {
        id: 'rtc-m05',
        order: 5,
        title: 'Quant literacy for consumers of research',
        stage: 'applied_practice',
        summary:
          'Read studies and headlines for sampling, significance theater, and effect size intuition—enough to avoid bozo conclusions.',
        learningGoals: [
          'Ask sampling and selection questions before trusting a percentage.',
          'Recognize p-hacking shapes and headline overclaim patterns.',
          'Translate statistical caveats into plain-language uncertainty for decisions.',
        ],
        practiceActivities: [
          'Complete a study critique worksheet on one paper or summary (methods, N, outcomes, conflicts).',
          'Rewrite an overclaim headline into an honest one; note what evidence would justify stronger wording.',
        ],
        expectedOutputs: ['Quant skepticism checklist'],
      },
      {
        id: 'rtc-m06',
        order: 6,
        title: 'Synthesis under disagreement',
        stage: 'applied_practice',
        summary:
          'Map where experts agree, where they clash, and what evidence would adjudicate—without both-sides mush.',
        learningGoals: [
          'Produce agreement/disagreement maps with cited anchors.',
          'Weight evidence strength across conflicting studies or experts.',
          'State what empirical result or expert consensus would flip your leaning.',
        ],
        practiceActivities: [
          'Draft adversarial synthesis outline with contradiction table.',
          'Write an interview plan for a domain expert that targets unresolved disputes—not vague background.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Disagreement map + outline'],
      },
      {
        id: 'rtc-m07',
        order: 7,
        title: 'Writing judgments: thesis, limitations, recommendations',
        stage: 'professional_execution',
        summary:
          'Ship recommendations whose strength matches the ladder of evidence—limitations visible, executives not misled.',
        learningGoals: [
          'Pair every recommendation with evidence grade and residual uncertainty.',
          'Write limitations that inform action, not disclaimers that excuse vagueness.',
          'Keep executive summaries honest about what would change the call.',
        ],
        practiceActivities: [
          'Outline a decision memo with limitation blocks tied to evidence gaps.',
          'Peer swap: hunt for inference leakage and recommendation-overreach.',
        ],
        expectedOutputs: ['Judgment memo outline'],
      },
      {
        id: 'rtc-m08',
        order: 8,
        title: 'Time-boxed research and stopping rules',
        stage: 'professional_execution',
        summary:
          'Finish under real clocks—explicit stopping rules, captured unknowns, scheduled revisits instead of infinite drift.',
        learningGoals: [
          'Define maximum time and minimum acceptable depth before you start.',
          'Log unknowns as first-class outputs, not embarrassment.',
          'Schedule revisit triggers when new data should arrive.',
        ],
        practiceActivities: [
          'Run a 90-minute bounded sprint: deliver outline + unknowns log + next evidence fetch.',
          'Write stopping-rule statement for a recurring decision at work or home.',
        ],
        expectedOutputs: ['Stopping rules + revisit sheet'],
      },
      {
        id: 'rtc-m09',
        order: 9,
        title: 'Bias, identity, and intellectual honesty',
        stage: 'mastery_outputs',
        summary:
          'Surface motivated reasoning, identity protection, and incentive gradients—then invite critique before you cement belief.',
        learningGoals: [
          'List identity and reputation pressures that skew your reading.',
          'Use lightweight “pre-registration” habits for personal decisions.',
          'Draft critique invitations that reward adversarial help.',
        ],
        practiceActivities: [
          'Bias journal: three recent reads—where did you cheer vs. scrutinize?',
          'Write critique invitation to a trusted antagonist with concrete questions.',
        ],
        expectedOutputs: ['Integrity self-review'],
      },
      {
        id: 'rtc-m10',
        order: 10,
        title: 'Capstone rehearsal: defense-ready brief integration',
        stage: 'mastery_outputs',
        summary:
          'Merge evidence table, synthesis, limitations, and mock-defense appendix into one arc a skeptical reader can stress-test.',
        learningGoals: [
          'Integrate artifacts into single narrative without duplicate claims.',
          'Tighten limitations until they earn trust instead of sounding defensive.',
          'Prepare Q&A cards for hostile but fair challenges.',
        ],
        practiceActivities: [
          'Record or write mock defense; log stumbles → revision tasks.',
          'Revision pass using capstone rubric + colleague read if available.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Research brief v1'],
      },
    ],
  },

  'leadership-and-teams': {
    slug: 'leadership-and-teams',
    estimatedDurationLabel: 'Roughly 58–85 hours of study and practice',
    depthLabel:
      'Leadership as leverage through clarity: explicit expectations, accountable feedback, decision rights, learning loops—and lightweight team performance signals you review on cadence without vanity scorecards.',
    reinforcementSignals: [
      'Artifacts that reduce ambiguity before drama appears',
      'Team health & delivery signals: throughput, reliability, morale proxies—interpreted humanely',
      'Safety paired with standards—kindness without avoidance',
      'Decision maps that kill approval theater responsibly',
      'Management reviews that tie narratives to observable signals + commitments',
      'Conflict repair drills with follow-through discipline',
      'Operating system someone else could steward',
    ],
    capstone: {
      title: 'Leadership playbook + team operating system',
      description:
        'Ship an adoptable bundle for a team you actually lead or heavily influence: charter with outcomes and norms, decision-rights map with escalation, communication cadence + meeting hygiene, feedback/coaching approach with scripts, rituals for learning (retro/postmortem lite), conflict repair guide, and lightweight health signals you will review weekly.',
      deliverables: [
        'Team charter / operating agreement with measurable outcomes',
        'Decision rights + RACI-style map + escalation ladder',
        'Feedback + 1:1 cadence pack with agendas + documentation habits',
        'Hard-conversation + conflict repair guide tied to real scenarios',
        'Weekly health signals sheet: what you scan, thresholds, escalation when signals slip',
        'Management review outline: monthly/quarterly rhythm, signals + narrative + decisions it must produce',
      ],
    },
    modules: [
      {
        id: 'lat-m01',
        order: 1,
        title: 'Leadership outcomes vs leadership theater',
        stage: 'foundations',
        summary:
          'Translate “leadership” into observable outcomes—clarity of intent, speed of learning, reliability of delivery—not visibility hacks.',
        learningGoals: [
          'Rewrite vague leadership goals into measurable signals over 30–60 days.',
          'Pick one leadership experiment with hypothesis and review date.',
          'Identify theater habits (performative urgency, vanity metrics) to drop or constrain.',
        ],
        practiceActivities: [
          'Score your last month: three outcomes vs. three theater patterns with evidence.',
          'Draft a leadership experiment card: intervention, signal, kill date.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Observable leadership goals sheet'],
      },
      {
        id: 'lat-m02',
        order: 2,
        title: 'Expectations, accountability, and psychological safety',
        stage: 'foundations',
        summary:
          'Pair psychological safety with standards—clarity on what “good” means before empathy can land.',
        learningGoals: [
          'Write expectations as behaviors others can witness.',
          'Hold accountability conversations that separate intent from impact.',
          'Spot safety theater (nice words, unclear standards).',
        ],
        practiceActivities: [
          'Expectations doc for one role: outcomes, cadence, escalation if missed.',
          'Outline an accountability conversation using facts → impact → next step.',
        ],
        expectedOutputs: ['Expectations + accountability outline'],
      },
      {
        id: 'lat-m03',
        order: 3,
        title: 'Decision rights and delegation that scales',
        stage: 'foundations',
        summary:
          'Map who decides what, with escalation rails—delegation as outcomes + guardrails, not task dumping.',
        learningGoals: [
          'Assign decision owners for recurring classes of choices.',
          'Delegate outcomes with constraints, checkpoints, and rollback.',
          'Make escalation predictable—who pulls which lever when stuck.',
        ],
        practiceActivities: [
          'First-pass decision-rights map with escalation ladder.',
          'Delegation experiment: one outcome delegated with review gate written down.',
        ],
        recap: true,
        expectedOutputs: ['Decision rights draft v1'],
      },
      {
        id: 'lat-m04',
        order: 4,
        title: '1:1s that produce movement',
        stage: 'applied_practice',
        summary:
          'Structure conversations for truth and follow-through—agendas, notes, commitments with dates.',
        learningGoals: [
          'Design agendas that surface reality without ambushing.',
          'Track commitments with owners and deadlines.',
          'Coach growth using behaviors and examples, not slogans.',
        ],
        practiceActivities: [
          'Build a 1:1 template + run one trial; capture commitments log.',
          'Review past notes: where did follow-through drop—fix the system.',
        ],
        expectedOutputs: ['1:1 system draft'],
      },
      {
        id: 'lat-m05',
        order: 5,
        title: 'Feedback and coaching fundamentals',
        stage: 'applied_practice',
        summary:
          'Deliver fast, behavior-level feedback; invite two-way signal; separate pattern from personality.',
        learningGoals: [
          'Use situation–behavior–impact framing with concrete examples.',
          'Invite reciprocal feedback without cornering.',
          'Coach toward next reps, not vague “do better.”',
        ],
        practiceActivities: [
          'Write feedback script for a live scenario; trim moralizing.',
          'Peer practice round with timer + revision notes.',
        ],
        expectedOutputs: ['Feedback cheat sheet'],
      },
      {
        id: 'lat-m06',
        order: 6,
        title: 'Conflict repair and hard conversations',
        stage: 'applied_practice',
        summary:
          'Move from drama to repair—plans, scripts, follow-up dates; know when HR/legal enters the frame.',
        learningGoals: [
          'De-escalate without abandoning standards.',
          'Run repair loops with explicit asks and check-backs.',
          'Recognize when to formalize (HR, mediation) vs. handle locally.',
        ],
        practiceActivities: [
          'Hard conversation plan: facts, impact, request, follow-up.',
          'Tabletop conflict: stakeholder reactions + your next move.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Hard-conversation plan'],
      },
      {
        id: 'lat-m07',
        order: 7,
        title: 'Team learning: retros, postmortems, blameless analysis',
        stage: 'professional_execution',
        summary:
          'Learn faster than competitors—blameless analysis that links incidents to systemic causes and measurable signals (throughput drops, defect clusters, coordination latency) before jumping to fixes.',
        learningGoals: [
          'Facilitate retros that surface systemic causes, not villains.',
          'Use postmortems with timelines, contributing factors, action owners.',
          'Pick 2–4 learning signals you will revisit next sprint/month to verify fix effectiveness.',
          'Spread learning without meeting bloat—artifacts people reopen.',
        ],
        practiceActivities: [
          'Draft retro facilitation guide with prompt list + anti-patterns.',
          'Complete postmortem template on a past team failure (real or realistic).',
          'Add a “signals to watch” section tying actions to observable metrics or proxies.',
        ],
        expectedOutputs: ['Retro + postmortem templates + signal follow-through notes'],
      },
      {
        id: 'lat-m08',
        order: 8,
        title: 'Cross-team coordination without matrix swamp',
        stage: 'professional_execution',
        summary:
          'Define interfaces between teams—handshake tests, lightweight SLA-style expectations (response windows, throughput), and escalation when interface KPIs slip.',
        learningGoals: [
          'Document interfaces with acceptance checks, not vibes.',
          'Define 2–3 interface health signals you can discuss without heavyweight BI.',
          'Cut redundant coordination meetings via clearer async norms.',
          'Align narratives across teams without OKR cargo cult.',
        ],
        practiceActivities: [
          'Interface agreement for one messy cross-team dependency.',
          'Coordination cost audit: kill / merge / clarify meetings.',
        ],
        expectedOutputs: ['Interface agreement draft + interface health signals'],
      },
      {
        id: 'lat-m09',
        order: 9,
        title: 'Performance management with dignity',
        stage: 'mastery_outputs',
        summary:
          'Early signals, fair process, documented path—pair qualitative judgment with lightweight performance indicators (delivery, collaboration, quality of participation) appropriate to role.',
        learningGoals: [
          'Catch drift early with evidence trails—not single-number stack ranks.',
          'Separate capability vs. conduct vs. context mismatch.',
          'Discuss performance using behaviors + outcomes + examples; avoid vague labels.',
          'Document with clarity HR could follow.',
        ],
        practiceActivities: [
          'Performance narrative tied to outcomes + behaviors + examples.',
          'Improvement plan outline with milestones, support offered, and review dates.',
          'Draft a humane metric/proxy policy: what you will never use as a blunt KPI.',
        ],
        expectedOutputs: ['Performance narrative + plan skeleton + review cadence note'],
      },
      {
        id: 'lat-m10',
        order: 10,
        title: 'Capstone rehearsal: operating system integration',
        stage: 'mastery_outputs',
        summary:
          'Fold charter, decision rights, cadence, feedback, conflict repair into one pilotable operating system.',
        learningGoals: [
          'Merge artifacts into non-contradictory bundle.',
          'Run pilot plan with friction log.',
          'Iterate from feedback without scope explosion.',
        ],
        practiceActivities: [
          'Pilot plan with 30-day adoption experiment + success signals.',
          'Synthesize feedback into v1.1 edits with rationale log.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Team health pack v1'],
      },
    ],
  },

  'teaching-and-facilitation': {
    slug: 'teaching-and-facilitation',
    estimatedDurationLabel: 'Roughly 48–70 hours of study and practice',
    depthLabel:
      'Learning design under real constraints: outcomes you can observe, practice that earns skill, facilitation that keeps rooms honest and inclusive.',
    reinforcementSignals: [
      'Objectives observable by a stranger—not vibe objectives',
      'Checks for understanding before content acceleration',
      'Practice progressions with constraints that teach',
      'Inclusive facilitation moves grounded in norms + repair',
      'Assessment that informs teaching, not ranking hunger',
    ],
    capstone: {
      title: 'Training experience design kit (live + async)',
      description:
        'Design for a real audience/topic you could deliver soon: outcomes map with evidence of mastery, sequenced session plan with cognitive-load notes, facilitation guide (moves, timings, contingency branches), participant-facing materials, formative + proportionate summative assessments, accessibility/inclusion notes, async supplements, and a revision sheet from a pilot dry-run.',
      deliverables: [
        'Learning objectives map + assessment alignment matrix',
        'Session plan with timings + materials list + facilitator notes',
        'Participant workbook / handouts + facilitator troubleshooting appendix',
        'Assessment instruments + rubric + feedback loop into instruction',
      ],
    },
    modules: [
      {
        id: 'taf-m01',
        order: 1,
        title: 'Objectives, outcomes, and measurable understanding',
        stage: 'foundations',
        summary:
          'Write outcomes an observer could see—then align checks for understanding before you accelerate content.',
        learningGoals: [
          'Draft objectives using action verbs tied to observable behaviors.',
          'Pick formative checks matched to cognitive demands—not trivia.',
          'Trim coverage plans that exceed attention budgets.',
        ],
        practiceActivities: [
          'Rewrite five vague objectives into measurable outcomes + evidence of mastery.',
          'Design two formative checks (one fast signal, one deeper) for the same lesson.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Outcomes + checks draft'],
      },
      {
        id: 'taf-m02',
        order: 2,
        title: 'Cognitive load, sequencing, and misconceptions',
        stage: 'foundations',
        summary:
          'Chunk concepts so working memory survives; predict naive models and attack them early.',
        learningGoals: [
          'Sequence prerequisites without hidden leaps.',
          'List likely misconceptions for your topic and plan confrontations.',
          'Pace segments with attention hooks and consolidation beats.',
        ],
        practiceActivities: [
          'Critique a dense outline; reorder for load + add misconception checkpoints.',
          'Write “predict wrong answers” list for one tricky concept.',
        ],
        expectedOutputs: ['Sequence + misconception map'],
      },
      {
        id: 'taf-m03',
        order: 3,
        title: 'Explanations that land: analogies, examples, precision',
        stage: 'foundations',
        summary:
          'Layer concrete → abstract; choose analogies that fail gracefully when stretched.',
        learningGoals: [
          'Test analogies for leakage and false mappings.',
          'Provide examples at two difficulty levels plus non-example.',
          'Define terms operationally—what learners do with them.',
        ],
        practiceActivities: [
          'Explain-it-three-ways drill with explicit limits of each metaphor.',
          'Precision edit pass on a jargon-heavy paragraph.',
        ],
        recap: true,
        expectedOutputs: ['Explanation ladder draft'],
      },
      {
        id: 'taf-m04',
        order: 4,
        title: 'Practice design: reps, constraints, feedback',
        stage: 'applied_practice',
        summary:
          'Design deliberate practice—progressive constraints, timely feedback, retrieval—not worksheets for volume.',
        learningGoals: [
          'Sequence reps from guided → constrained → independent.',
          'Embed constraints that force the skill you care about.',
          'Time feedback so it lands without flooding.',
        ],
        practiceActivities: [
          'Design one practice arc with success criteria per rep.',
          'Peer teach-back with observer rubric focused on skill, not polish.',
        ],
        expectedOutputs: ['Practice arc plan'],
      },
      {
        id: 'taf-m05',
        order: 5,
        title: 'Facilitation moves for live sessions',
        stage: 'applied_practice',
        summary:
          'Balance participation and pace—openers/closers, dominant voices, productive silence.',
        learningGoals: [
          'Script openings that prime attention and safety.',
          'Use moves to redistribute airtime without shame.',
          'Close sessions with synthesis + commitments.',
        ],
        practiceActivities: [
          'Draft facilitation script with timings + contingency branches.',
          'Role-play facilitation; debrief dominant-voice interruption moves.',
        ],
        expectedOutputs: ['Facilitation moves one-pager'],
      },
      {
        id: 'taf-m06',
        order: 6,
        title: 'Inclusive rooms: access, norms, and repair',
        stage: 'applied_practice',
        summary:
          'Design norms and materials for disability, language access, power dynamics—with repair scripts.',
        learningGoals: [
          'Co-create norms learners can cite when friction appears.',
          'Run accessibility passes on slides and handouts.',
          'Plan repair after facilitator mistakes authentically.',
        ],
        practiceActivities: [
          'Norm design workshop notes + peer reactions.',
          'Accessibility pass on a real handout with annotated fixes.',
        ],
        revisionCheckpoint: true,
        expectedOutputs: ['Norms + accessibility notes'],
      },
      {
        id: 'taf-m07',
        order: 7,
        title: 'Assessment that informs teaching, not ranking obsession',
        stage: 'professional_execution',
        summary:
          'Align formative and summative tools to objectives; define a small learning-outcome dashboard (checks passed, misconception rates, artifact quality) so you revise instruction—not just morale—from evidence.',
        learningGoals: [
          'Map each assessment item to an objective + cognitive level.',
          'Pick a minimal set of instructional KPIs you will actually review (e.g., misconception flags, redo rate).',
          'Choose summative stakes proportionate to purpose.',
          'Close feedback loops into lesson revisions with dated changes.',
        ],
        practiceActivities: [
          'Assessment blueprint with item-objective matrix.',
          'Draft rubric with student-facing language + exemplars.',
          'One-page instructional review sheet: signals to watch weekly + intervention triggers.',
        ],
        expectedOutputs: ['Assessment blueprint + rubric + instructional review strip'],
      },
      {
        id: 'taf-m08',
        order: 8,
        title: 'Async teaching: docs, recordings, office hours',
        stage: 'professional_execution',
        summary:
          'Structure async paths learners can navigate—office hours that solve bottlenecks, norms that reduce ghosting.',
        learningGoals: [
          'Chunk async modules with checkpoints and estimated effort.',
          'Seed FAQs from real confusion; update weekly early on.',
          'Design office hours for highest leverage questions.',
        ],
        practiceActivities: [
          'Async module outline with checkpoints + links.',
          'FAQ seed list from anticipated misconceptions.',
        ],
        expectedOutputs: ['Async path outline'],
      },
      {
        id: 'taf-m09',
        order: 9,
        title: 'Handling difficult participants and edge cases',
        stage: 'mastery_outputs',
        summary:
          'De-escalate disruption while protecting learning—scripts, breaks, escalation paths.',
        learningGoals: [
          'Prepare scripts for typical disruptions without humiliation.',
          'Know when breaks or agenda shifts beat confrontation.',
          'Define when removal or HR escalation is warranted.',
        ],
        practiceActivities: [
          'Edge-case playbook with triggers + responses.',
          'Scenario triage table: behavior → first move → escalation.',
        ],
        expectedOutputs: ['Edge-case playbook'],
      },
      {
        id: 'taf-m10',
        order: 10,
        title: 'Capstone rehearsal: kit integration',
        stage: 'mastery_outputs',
        summary:
          'Integrate objectives map, session plan, facilitation guide, materials, assessments into one pilot-ready kit.',
        learningGoals: [
          'Cross-check objectives ↔ activities ↔ assessments for gaps.',
          'Dry-run micro-session; capture friction log.',
          'Revise materials from feedback without scope creep.',
        ],
        practiceActivities: [
          'Pilot micro-session with observer notes.',
          'Revision log tying changes back to learner confusion signals.',
        ],
        recap: true,
        revisionCheckpoint: true,
        expectedOutputs: ['Teaching kit v1'],
      },
    ],
  },
}
