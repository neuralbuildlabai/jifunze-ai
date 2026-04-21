/**
 * Flagship deep-learning paths — product catalog (metadata for marketing / course detail pages).
 * Copy is calibrated for serious depth: mastery tracks, not thin overviews.
 */

export type FlagshipSchoolId = 'ai_digital' | 'business_growth' | 'career_intellect' | 'leadership_learning'

export type FlagshipSchool = {
  id: FlagshipSchoolId
  label: string
  shortLabel: string
  description: string
  /** Subtle differentiation for cards (Tailwind accent text / border tint) */
  accent: 'slate' | 'stone' | 'neutral' | 'zinc'
}

export const FLAGSHIP_SCHOOLS: Record<FlagshipSchoolId, FlagshipSchool> = {
  ai_digital: {
    id: 'ai_digital',
    label: 'AI and digital fluency',
    shortLabel: 'AI & digital',
    description: 'Judgment-first literacy for AI, workflows, data, systems, and safe practice.',
    accent: 'slate',
  },
  business_growth: {
    id: 'business_growth',
    label: 'Business and growth',
    shortLabel: 'Business',
    description: 'From market sense to execution: growth, finance, products, and delivery.',
    accent: 'stone',
  },
  career_intellect: {
    id: 'career_intellect',
    label: 'Career and intellectual development',
    shortLabel: 'Career & mind',
    description: 'Positioning, communication, and disciplined thinking for real decisions.',
    accent: 'neutral',
  },
  leadership_learning: {
    id: 'leadership_learning',
    label: 'Leadership and learning systems',
    shortLabel: 'Leadership',
    description: 'How teams learn, coordinate, and teach — without noisy management clichés.',
    accent: 'zinc',
  },
}

export type FlagshipCourse = {
  slug: string
  schoolId: FlagshipSchoolId
  title: string
  subtitle: string
  levelRange: string
  /** Exactly three short output hints for cards */
  exampleOutputs: [string, string, string]
  featured: boolean
  intro: string
  promise: string
  depthStages: {
    foundations: string
    appliedPractice: string
    professionalExecution: string
    masteryOutputs: string
  }
  learningOutcomes: string[]
  whatYouCreate: string[]
  /** Thematic modules — implies breadth without listing every lesson */
  modulePathway: string[]
}

export const FLAGSHIP_COURSES: FlagshipCourse[] = [
  {
    slug: 'ai-essentials',
    schoolId: 'ai_digital',
    title: 'AI Essentials',
    subtitle:
      'Build a mental model of what AI can and cannot do—then wire habits, verification, and boundaries you can explain.',
    levelRange: 'Beginner to Intermediate',
    exampleOutputs: ['Stakeholder-safe use stance', 'Stake-weighted verification matrix', 'Workflow + incident sketch pack'],
    featured: true,
    intro:
      'Build a grounded mental model of what modern AI can and cannot do—and learn prompt engineering as an explicit skill: how instructions shape outputs, why prompts fail, and how to improve them responsibly.',
    promise:
      'Foundational prompt engineering plus defensible judgment: failure-mode literacy, stake-weighted review, responsible-use guardrails, assessable prompt practice, and a revision-friendly operating playbook.',
    depthStages: {
      foundations:
        'Language, limits, failure modes, and prompt engineering basics—what prompts are, how quality drives output quality, and safe iteration habits.',
      appliedPractice:
        'Prompt specs, drills, drafting and summarizing with critique sheets—prompt improvement you can show a reviewer.',
      professionalExecution: 'Workflow fit: handoffs, approvals, disclosure, privacy—and prompts as team-visible specs.',
      masteryOutputs: 'A personal playbook with templates, escalation cues, and reusable prompt packs.',
    },
    learningOutcomes: [
      'Explain AI capabilities and limits—and how prompt design and iteration shape output quality—in plain language stakeholders understand.',
      'Draft, critique, and revise prompts using explicit constraints; spot ambiguity, missing context, and unsafe prompting habits.',
      'Review AI-assisted work with verification habits tied to stakes—not vibes or length-as-quality.',
    ],
    whatYouCreate: [
      'Role-specific AI use policy (lightweight)',
      'Verification checklist for high-stakes outputs',
      'Annotated workflow diagram for your team or studies',
    ],
    modulePathway: [
      'Mental models and prompt literacy',
      'Prompt engineering foundations (specs, iteration, critique)',
      'Learning and drafting with disciplined prompts',
      'Stakeholders, norms, safety',
      'Risk, workflows, playbook assembly',
      'Capstone: responsible AI operating playbook',
    ],
  },
  {
    slug: 'smart-workflows-with-ai',
    schoolId: 'ai_digital',
    title: 'Smart Workflows with AI',
    subtitle:
      'Move from chats to owned systems: specs, QA lanes, libraries, and rollout discipline someone else could run.',
    levelRange: 'Beginner to Advanced',
    exampleOutputs: ['Versioned workflow packages', 'Shared quality rubric + catalog sheet', 'Rollout memo with metrics + kill criteria'],
    featured: true,
    intro:
      'Move from one-off chats to dependable systems—and treat prompt engineering as operational craft: structured prompts, libraries, critique, and workflow-sized prompt sequences under QA.',
    promise:
      'Professional prompt engineering embedded in workflows: explicit prompt anatomy, iteration and comparison, reusable templates and libraries, multi-step prompting, evaluation rubrics—not isolated theory.',
    depthStages: {
      foundations: 'Workflow decomposition plus prompt anatomy—roles, constraints, evidence policy, formats—and where automation helps vs. hurts.',
      appliedPractice:
        'Schemas, chains, synthesis and editorial pipelines—iterate, compare prompts, score outputs against rubrics.',
      professionalExecution: 'Operational prompts, ownership, versioning, libraries—others can run the workflow.',
      masteryOutputs: 'A documented workflow library with prompt packs, rubrics, revision hooks, and rollout discipline.',
    },
    learningOutcomes: [
      'Design repeatable workflows whose AI steps use explicit prompt specs, checkpoints, and human gates.',
      'Build prompt critique rubrics and reusable templates; compare weak vs strong prompts with evidence.',
      'Operationalize tools and semi-automation with prompt libraries, owners, and accountability—not vibe automation.',
    ],
    whatYouCreate: [
      'Workflow library (3–5 reusable patterns)',
      'Quality rubric tied to stakeholder expectations',
      'Rollout notes for teammates or clients',
    ],
    modulePathway: [
      'Workflow interfaces + operational prompting',
      'Prompt engineering: anatomy, versioning, critique',
      'Structured outputs and multi-step prompt chains',
      'Research, writing, ops pipelines as prompt systems',
      'Libraries, automation limits, measurement',
      'Capstone: named workflow library + rollout pack',
    ],
  },
  {
    slug: 'data-and-decisions',
    schoolId: 'ai_digital',
    title: 'Data and Decisions',
    subtitle:
      'Design KPI trees, read dashboards skeptically, run reporting cadences that produce decisions—not vanity charts—and ship briefs you can defend under audit.',
    levelRange: 'Beginner to Intermediate',
    exampleOutputs: ['KPI hierarchy + definitions sheet', 'Dashboard critique + stakeholder narrative', 'Monitoring & reporting plan'],
    featured: true,
    intro:
      'Turn noise into narrative: frameworks for asking better questions, reading charts honestly, and deciding under uncertainty.',
    promise:
      'Move from chart literacy to BI-ready judgment: KPI definitions and hierarchies, dashboard critique, audience-aware reporting, scenario reads of performance summaries, tradeoffs named, monitoring that admits when you were wrong.',
    depthStages: {
      foundations: 'Measurement skepticism, KPI trees, dashboard literacy, honest visualization.',
      appliedPractice: 'Comparisons, causal humility, trends, thresholds, scenario drills.',
      professionalExecution: 'Reporting cadence, stakeholder KPI narratives, decision logs under pressure.',
      masteryOutputs: 'Reusable frameworks + KPI review rituals for recurring decisions.',
    },
    learningOutcomes: [
      'Define and defend KPIs with guardrails against gaming and vanity metrics.',
      'Interpret dashboards and performance summaries without common misreads.',
      'Turn reported signals into decision briefs with explicit assumptions and falsifiers.',
    ],
    whatYouCreate: [
      'KPI hierarchy sheet with definitions',
      'Dashboard critique + reporting cadence brief',
      'Executive-ready decision memo from performance data',
    ],
    modulePathway: [
      'Metrics, KPI trees, vanity traps',
      'Dashboards & honest visualization',
      'Trends, comparisons, causal humility',
      'Reporting cadence & stakeholder narratives',
      'Thin data, frameworks, capstone brief',
    ],
  },
  {
    slug: 'web-and-software-foundations',
    schoolId: 'ai_digital',
    title: 'Web and Software Foundations',
    subtitle:
      'Understand how requests, APIs, apps, and data stores fit together—so you can collaborate with builders without pretending.',
    levelRange: 'Beginner to Intermediate',
    exampleOutputs: ['End-to-end flow narrative', 'Architecture + integration sketch', 'Risk/vendor review for stakeholders'],
    featured: false,
    intro:
      'Earn a calm mental map of the modern stack—enough to collaborate credibly with builders and vendors.',
    promise:
      'Conceptual depth first—flows you can trace, contracts you can read, risks you can raise in review. Buzzwords optional; clarity mandatory.',
    depthStages: {
      foundations: 'Clients, servers, networks, DNS, HTTPS, and how requests move.',
      appliedPractice: 'Follow real paths: forms, auth basics, APIs, and data lifecycles.',
      professionalExecution: 'Tradeoffs: performance, security, maintainability, and vendor lock-in.',
      masteryOutputs: 'Artifacts you can hand to a team: diagrams, requirements, and risk notes.',
    },
    learningOutcomes: [
      'Explain how a user action becomes data and a response—in your own words.',
      'Read API docs and scopes with fewer blind spots.',
      'Spot common security and reliability footguns in conversation.',
    ],
    whatYouCreate: [
      'End-to-end request narrative for one product you use',
      'Simple architecture diagram',
      'Risk-and-assumption notes for a technical initiative',
    ],
    modulePathway: [
      'Web fundamentals',
      'Applications and hosting models',
      'APIs and integrations',
      'Data stores and consistency basics',
      'Security and reliability literacy',
      'Capstone: collaboration brief builders can execute from',
    ],
  },
  {
    slug: 'digital-safety',
    schoolId: 'ai_digital',
    title: 'Digital Safety',
    subtitle: 'Protect yourself, your work, and your team with stronger digital security habits.',
    levelRange: 'Beginner to Intermediate',
    exampleOutputs: ['Threat framing + prioritized controls', 'Hygiene & onboarding pack', 'Incident triage + comms ladder'],
    featured: false,
    intro:
      'Serious protection without fear-mongering: habits, verification, and calm escalation when something looks wrong.',
    promise:
      'Calm, proportionate security judgment—habits teams sustain, incidents you can navigate, vendor questions that fit real budgets.',
    depthStages: {
      foundations: 'Assets, adversaries, common failures, and proportionate controls.',
      appliedPractice: 'Phishing judgment, passwords/MFA, backups, and safe collaboration.',
      professionalExecution: 'Policies humans actually follow; vendor and access hygiene.',
      masteryOutputs: 'Team-ready materials you can revisit and revise.',
    },
    learningOutcomes: [
      'Prioritize risks without drowning in jargon.',
      'Apply MFA, backups, and least-privilege thinking.',
      'Respond calmly to suspicious events.',
    ],
    whatYouCreate: [
      'Personal or small-team security checklist',
      'Incident triage outline',
      'Vendor/access review worksheet',
    ],
    modulePathway: [
      'Threat framing without hype',
      'Identity and access hygiene',
      'Data handling and sharing',
      'Device and backup discipline',
      'Incident basics and escalation',
      'Capstone: adoptable safety improvement plan',
    ],
  },
  {
    slug: 'marketing-and-growth',
    schoolId: 'business_growth',
    title: 'Marketing and Growth',
    subtitle:
      'Build credible demand with audience evidence, disciplined messaging, channel bets you can defend, and measurement that admits uncertainty.',
    levelRange: 'Beginner to Advanced',
    exampleOutputs: ['Audience & substitution brief', 'Growth KPI tree + weekly review script', 'Channel & funnel metrics pack'],
    featured: true,
    intro:
      'Growth here means accountable demand creation: who you serve, what you promise with proof, how you earn attention responsibly, and how you learn faster than you spend.',
    promise:
      'You will graduate from scattered tactics to a dossier-style growth practice—hypotheses, creative systems, staged experiments, and narratives executives and customers can trust.',
    depthStages: {
      foundations: 'Evidence-backed segments, positioning spine, proof doctrine before creative spend.',
      appliedPractice: 'Message architecture, content operating model, channel economics with KPIs & kill rules.',
      professionalExecution: 'Campaign KPI ladders, funnel metrics, ethical conversion, growth dashboards & analytics under uncertainty.',
      masteryOutputs: 'AI-assisted QA without surrendering judgment; dossier with KPI pack + weekly review discipline.',
    },
    learningOutcomes: [
      'Frame growth as falsifiable hypotheses tied to audiences and proofs.',
      'Design channel and creative experiments with budgets, kill criteria, and learning narratives.',
      'Communicate performance with attribution humility and decision-ready metrics.',
    ],
    whatYouCreate: ['Positioning & proof gap table', 'Editorial + experiment calendar', 'Growth dossier draft'],
    modulePathway: [
      'Demand learning vs. vanity activity',
      'Audience evidence & objections',
      'Positioning spine & messaging layers',
      'Content system & channel economics',
      'Campaign integration & ethical conversion',
      'Analytics narratives & AI guardrails',
      'Capstone: growth dossier',
    ],
  },
  {
    slug: 'business-builder',
    schoolId: 'business_growth',
    title: 'Business Builder',
    subtitle:
      'Shape ventures with validation discipline, priced offers, operating KPIs, cash-aware delivery, and management rhythms that survive diligence.',
    levelRange: 'Beginner to Advanced',
    exampleOutputs: ['Validation memo', 'Annotated model canvas', 'Operating blueprint'],
    featured: true,
    intro:
      'Build the mechanics of a serious venture: honest demand signals, offers someone can buy, economics that breathe, delivery that keeps promises, growth sequenced after throughput.',
    promise:
      'You will assemble a diligence-minded operating pack—evidence, economics, operating KPIs & review rituals, systems, staged growth bets, and explicit risks—not slide-deck optimism.',
    depthStages: {
      foundations: 'Problem/offer clarity, substitutes, validation discipline with kill criteria.',
      appliedPractice: 'Model stress tests, pricing math, throughput & operating metrics before hype.',
      professionalExecution: 'Operating cadence with KPI snapshots, management reviews, early people reality.',
      masteryOutputs: 'Cohort-aware measured expansion + integrated blueprint rehearsal.',
    },
    learningOutcomes: [
      'Validate willingness to pay with pre-written evidence thresholds.',
      'Link pricing, delivery capacity, cash scenarios, and operating signals transparently.',
      'Design lightweight systems and reviews teams will actually follow.',
    ],
    whatYouCreate: ['Offer + proof one-pager', 'Operating KPI strip + management review outline', 'Operating & growth blueprint'],
    modulePathway: [
      'Venture framing & substitutes',
      'Validation interviews & experiments',
      'Offer design & model stress test',
      'Pricing & operations throughput',
      'Systems, decisions, people basics',
      'Measured expansion',
      'Capstone: diligence-ready blueprint',
    ],
  },
  {
    slug: 'money-and-finance',
    schoolId: 'business_growth',
    title: 'Money and Finance',
    subtitle:
      'Make clearer money decisions: cash timing, honest budgets, contribution thinking, pricing choices, and calm negotiation.',
    levelRange: 'Beginner to Intermediate',
    exampleOutputs: ['Rolling snapshot', 'Pricing & margin sheet', 'Scenario narrative'],
    featured: false,
    intro:
      'Finance as judgment support—know what your numbers mean for next week’s decisions, not spreadsheet theatre.',
    promise:
      'You will produce a reviewer-ready finance action pack for a real household or venture context: snapshots, budgets with owners, pricing logic, scenarios, and conversation prep.',
    depthStages: {
      foundations: 'Cash vs. accrual fluency, budgets with variance triggers, contribution sketches.',
      appliedPractice: 'Scenario forecasting, pricing under constraints, leverage literacy.',
      professionalExecution: 'Trusted reporting, negotiation framing, steady narratives.',
      masteryOutputs: 'Reusable pack + refresh ritual.',
    },
    learningOutcomes: [
      'Separate cash timing from profit stories on your own statements.',
      'Maintain budgets tied to behaviors and escalation rules.',
      'Price and negotiate with explicit assumptions and ethical floors.',
    ],
    whatYouCreate: ['Monthly snapshot + annotations', 'Pricing & margin worksheet', 'Scenario + action memo'],
    modulePathway: [
      'Cash, profit, timing literacy',
      'Budgets as living instruments',
      'Contribution & scenarios',
      'Pricing & leverage judgment',
      'Negotiation & reporting trust',
      'Capstone: finance action pack',
    ],
  },
  {
    slug: 'product-thinking',
    schoolId: 'business_growth',
    title: 'Product Thinking',
    subtitle:
      'Decide products with evidence: sharp problems, honest discovery, outcome KPIs & prioritization signals, and shipping loops that learn.',
    levelRange: 'Beginner to Advanced',
    exampleOutputs: ['Problem matrix', 'Discovery kit', 'Concept package'],
    featured: false,
    intro:
      'Product judgment is learned: asking better questions, synthesizing messy reality, saying no with math and empathy, partnering across disciplines without thrash.',
    promise:
      'You will ship a concept package—opportunity, discovery plan, prioritized bets with signals, roadmap narrative, product KPI framework, metrics stance—that survives design, engineering, and leadership scrutiny.',
    depthStages: {
      foundations: 'Outcome thinking, discovery ethics, problem statements worth funding.',
      appliedPractice: 'Prioritization with evidence signals, roadmap bets with review hooks, cross-functional specs.',
      professionalExecution: 'Instrumentation & KPI discipline, metric-grounded stakeholder updates, shipping to learn.',
      masteryOutputs: 'Integrated concept package + KPI dictionary slice + ethics review.',
    },
    learningOutcomes: [
      'Diagnose problems without solution smuggling.',
      'Prioritize with explicit opportunity costs, KPI hooks, and respectful nos.',
      'Ship learning loops with outcome metrics and minimal viable instrumentation.',
    ],
    whatYouCreate: ['Opportunity + proof gap memo', 'Product KPI framework draft', 'Concept package draft'],
    modulePathway: [
      'Outcomes vs. outputs',
      'Discovery craft',
      'Fundable problem framing',
      'Prioritization & roadmap bets',
      'Design/engineering partnership',
      'Launch, metrics, ethics',
      'Capstone: concept package',
    ],
  },
  {
    slug: 'project-execution',
    schoolId: 'business_growth',
    title: 'Project Execution',
    subtitle:
      'Deliver initiatives with explicit commitments, status & risk signals, honest dependencies, ethical urgency, and retros that change the next project.',
    levelRange: 'Beginner to Advanced',
    exampleOutputs: ['Charter + decision rights', 'Dependency map', 'Delivery playbook'],
    featured: false,
    intro:
      'Execution craft for real organizations: charter discipline, dependency realism, cadences that reduce noise, risk registers that trigger action, closures that capture learning.',
    promise:
      'You will produce a delivery playbook another lead could run from—charter, dependency & status pack, cadence with reporting hooks, risks with early warnings, change comms, quality signals, escalation paths, retro pack.',
    depthStages: {
      foundations: 'Intent, scope, success signals, stakeholder authority, planning as hypotheses.',
      appliedPractice: 'Dependencies, risk indicators, cadence + weekly status discipline.',
      professionalExecution: 'Change leadership, quality gates & defect signals, evidence-backed escalation.',
      masteryOutputs: 'Playbook packaging + knowledge handoff.',
    },
    learningOutcomes: [
      'Start work with measurable success signals and explicit non-goals.',
      'Run checkpoints that force decisions from status and risk signals, not theater.',
      'Close initiatives with accountable learning transfer.',
    ],
    whatYouCreate: ['Charter & assumption table', 'Delivery status + dependency map', 'Delivery playbook'],
    modulePathway: [
      'Scope & success discipline',
      'Stakeholders & decisions',
      'Plans as hypotheses',
      'Dependencies & risks',
      'Cadence & checkpoints',
      'Change, quality, pressure delivery',
      'Capstone: delivery playbook',
    ],
  },
  {
    slug: 'career-launch',
    schoolId: 'career_intellect',
    title: 'Career Launch',
    subtitle:
      'Evidence-backed positioning, credible materials, pipeline discipline, and interview depth—without hustle theater.',
    levelRange: 'Beginner to Intermediate',
    exampleOutputs: ['Positioning thesis + proof gaps', 'Tailored résumé/profile variants', 'Interview system + 90-day plan'],
    featured: true,
    intro:
      'Career depth is clarity: what you deliver, how you prove it, and how you communicate under pressure.',
    promise:
      'Structured progression from receipts to outward credibility—targets as hypotheses, outreach as experiments, interviews as rehearsal, negotiation as clarity.',
    depthStages: {
      foundations: 'Strengths as evidence, constraints, and realistic targets.',
      appliedPractice: 'Materials, stories, and scenario responses with feedback loops.',
      professionalExecution: 'Networking without cringe; follow-ups; negotiation framing.',
      masteryOutputs: 'A cohesive narrative and toolkit you revise over time.',
    },
    learningOutcomes: [
      'Articulate value with specificity.',
      'Prepare evidence that matches what employers or clients verify.',
      'Navigate interviews and negotiations calmly.',
    ],
    whatYouCreate: [
      'Sharp positioning statement',
      'Evidence-backed accomplishment stories',
      'Professional portfolio outline',
    ],
    modulePathway: [
      'Direction hypotheses & constraints',
      'Evidence bank & credible materials',
      'Targets, pipelines, networking discipline',
      'Interviews, scenarios, workplace norms',
      'Negotiation & integrated readiness pack',
    ],
  },
  {
    slug: 'clear-communication',
    schoolId: 'career_intellect',
    title: 'Clear Communication',
    subtitle:
      'Structure, compression, and persuasion with integrity—writing that survives tired reviewers.',
    levelRange: 'Beginner to Advanced',
    exampleOutputs: ['Executive decision ask', 'Evidence-laned stakeholder brief', 'Editorial doctrine + portfolio spine'],
    featured: true,
    intro:
      'Communication as craft: structure, clarity, and revision loops that hold up at work.',
    promise:
      'Deep practice from intent to documents—structures you can test, revisions that hunt inference leaks, portfolio pieces at multiple stakes.',
    depthStages: {
      foundations: 'Audience, purpose, and structure before polish.',
      appliedPractice: 'Drafting drills, tightening, and feedback interpretation.',
      professionalExecution: 'Meetings, async updates, and friction-free collaboration.',
      masteryOutputs: 'Templates and style guides you own.',
    },
    learningOutcomes: [
      'Write so busy readers get the decision fast.',
      'Give and receive feedback without spiraling.',
      'Build reusable formats for recurring communication.',
    ],
    whatYouCreate: [
      'Brief template suite',
      'Editing checklist',
      'Async update playbook',
    ],
    modulePathway: [
      'Thinking in structure',
      'Plain language discipline',
      'Briefs and summaries',
      'Persuasion without fluff',
      'Collaboration rhythms',
      'Capstone: portfolio + editorial doctrine',
    ],
  },
  {
    slug: 'research-and-critical-thinking',
    schoolId: 'career_intellect',
    title: 'Research and Critical Thinking',
    subtitle:
      'Falsifiable questions, triangulated evidence, synthesis under disagreement—thinking you can defend.',
    levelRange: 'Beginner to Advanced',
    exampleOutputs: ['Scope + stopping-rules memo', 'Evidence table + contradiction map', 'Defense-ready synthesis brief'],
    featured: false,
    intro:
      'Intellectual seriousness: sourcing, synthesis, and argument quality for real decisions.',
    promise:
      'Layered inquiry craft—questions that bite, sources read with incentives, stopping rules that finish work, conclusions proportionate to proof.',
    depthStages: {
      foundations: 'Questions, claims, evidence, and bias awareness.',
      appliedPractice: 'Source triangulation, structured notes, and misconception checks.',
      professionalExecution: 'Synthesis under time pressure; communicating uncertainty.',
      masteryOutputs: 'Research packs you can defend.',
    },
    learningOutcomes: [
      'Evaluate sources with explicit criteria.',
      'Synthesize conflicting information without drowning.',
      'Write reasoned conclusions with caveats.',
    ],
    whatYouCreate: [
      'Evidence table for a contested question',
      'One-page synthesis memo',
      'Revision flashcards / key definitions pack',
    ],
    modulePathway: [
      'Questions and falsifiability',
      'Sources and triangulation',
      'Note-taking for synthesis',
      'Logic gaps and rhetoric',
      'Writing judgment',
      'Capstone: evidence-backed contested brief',
    ],
  },
  {
    slug: 'leadership-and-teams',
    schoolId: 'leadership_learning',
    title: 'Leadership and Teams',
    subtitle:
      'Clarity, accountable feedback, team health signals, management reviews, and coordination—leadership as leverage, not performance.',
    levelRange: 'Intermediate to Advanced',
    exampleOutputs: [
      'Operating agreement',
      'Decision-rights + escalation map',
      'Weekly health signals + feedback rituals',
    ],
    featured: true,
    intro:
      'Leadership as clarity and learning: expectations, psychological safety with accountability, and coordination.',
    promise:
      'Artifacts for people who ship: expectations, feedback, decisions, conflict repair, observable team signals, and management reviews—systems teams can run.',
    depthStages: {
      foundations: 'Roles, expectations, trust mechanics, anti-theater signals, conflict basics.',
      appliedPractice: '1:1s, feedback, coaching cues, delegation drills.',
      professionalExecution: 'Learning loops with signal follow-through, cross-team interfaces, humane performance practice.',
      masteryOutputs: 'Operating system + weekly health sheet + management review outline.',
    },
    learningOutcomes: [
      'Set direction with measurable clarity.',
      'Coach for growth without avoidance.',
      'Run lightweight reviews using humanely interpreted performance and health signals.',
    ],
    whatYouCreate: [
      'Team operating agreement',
      'Decision-rights map + escalation ladder',
      'Weekly health signals sheet + management review outline',
    ],
    modulePathway: [
      'Leadership outcomes vs. theater',
      'Expectations, safety with standards, decision rights',
      '1:1s, feedback, conflict repair',
      'Learning loops & cross-team coordination',
      'Performance dignity & OS integration',
      'Capstone: playbook + operating system',
    ],
  },
  {
    slug: 'teaching-and-facilitation',
    schoolId: 'leadership_learning',
    title: 'Teaching and Facilitation',
    subtitle:
      'Design learning that sticks: observable outcomes, disciplined practice, facilitation under pressure.',
    levelRange: 'Beginner to Advanced',
    exampleOutputs: ['Outcomes + assessment map', 'Session plan + facilitator script', 'Participant materials + revision loop'],
    featured: false,
    intro:
      'Teach so others retain: sequencing, checks for understanding, and facilitation under real constraints.',
    promise:
      'Serious pedagogy track—objectives you can observe, practice arcs that teach, inclusive facilitation, assessments that improve instruction.',
    depthStages: {
      foundations: 'Objectives, cognitive load, and misconception hunting.',
      appliedPractice: 'Exercises, scenarios, and formative checks.',
      professionalExecution: 'Facilitation moves, inclusivity, and room management.',
      masteryOutputs: 'Guides and rubrics others can reuse.',
    },
    learningOutcomes: [
      'Define outcomes and align activities to them.',
      'Facilitate discussions that produce learning, not noise.',
      'Design lightweight assessments that inform revision.',
    ],
    whatYouCreate: [
      'Session plan with timings',
      'Facilitation guide',
      'Participant handout / revision sheet',
    ],
    modulePathway: [
      'Learning objectives and sequencing',
      'Explanation quality',
      'Practice design',
      'Facilitation toolkit',
      'Assessment and revision',
      'Capstone: training experience design kit',
    ],
  },
]

const bySlug = new Map(FLAGSHIP_COURSES.map((c) => [c.slug, c]))

export function getFlagshipCourseBySlug(slug: string): FlagshipCourse | undefined {
  return bySlug.get(slug)
}

export const FLAGSHIP_FEATURED_SLUGS = FLAGSHIP_COURSES.filter((c) => c.featured).map((c) => c.slug)

export function flagshipCoursesForSchool(id: FlagshipSchoolId): FlagshipCourse[] {
  return FLAGSHIP_COURSES.filter((c) => c.schoolId === id)
}
