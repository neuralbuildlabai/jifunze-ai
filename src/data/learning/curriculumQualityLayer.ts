import type { TeachingLibraryId } from '../teaching/teachingTypes'
import type { LibraryCurriculumQuality } from './curriculumQualityTypes'
import { STANDALONE_COURSE_QUALITY_LAYERS } from './curriculumQualityStandaloneCourses'

/**
 * Canonical “depth layer” metadata for each library family.
 * Used for workspace transparency, continuity planning, and freshness loops—never as accreditation language.
 */

const SHARED_SCENARIO_BRIDGES = [
  'Teaching labs under /learning/labs (guided → practice → test-framed drills)',
  'Approve / revise / reject judgement patterns embedded in AI applied labs',
  'Structured checkpoints and misconception calls inside lesson readers',
]

function stages(lib: TeachingLibraryId, base: Omit<LibraryCurriculumQuality, 'libraryId'>): LibraryCurriculumQuality {
  return { libraryId: lib, ...base }
}

export const CURRICULUM_QUALITY_LAYER: Record<TeachingLibraryId, LibraryCurriculumQuality> = {
  ai_foundations: stages('ai_foundations', {
    headline: 'AI Foundations for Everyday Work — judgment-first literacy with applied drills',
    targetCapability:
      ' reliably scope AI use, constrain prompts, review outputs by risk, and operationalize workflows without outsourcing accountability.',
    freeToPaidSkillShape: {
      publicStarter:
        'Authentic orientation + usable starter readers and public labs—enough to build accurate mental models and early habits.',
      signedInContinuity:
        'Full category map + broader guided/practice labs + continuity paths—still assistive materials, not certification.',
      deeperMaterials:
        'Premium readers and advanced labs add adversarial critique, supervised workflow depth, deeper revision/content systems—more practice leverage, not mastery guarantees.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Orientation',
        summary: 'Understand what AI tools are (and aren’t) in realistic workplace framing.',
        prerequisites: ['Comfort reading structured lessons end-to-end'],
        youShouldNowBeAbleTo: ['Name strengths/limits without hype', 'Identify when verification is mandatory'],
        goodUnderstandingLooksLike: ['You classify tasks by consequence of error before choosing tools'],
        commonFailureModes: ['Trusting tone over sources', 'Treating chat like a coworker who knows private facts'],
      },
      {
        id: 'beginner',
        label: 'Constraint literacy',
        summary: 'Draft prompts with audience, shape, exclusions, and explicit done-ness.',
        prerequisites: ['Orientation complete', 'Access to prompting modules'],
        youShouldNowBeAbleTo: ['Rewrite vague prompts into executable specs', 'Debug weak outputs by fixing constraints'],
        goodUnderstandingLooksLike: ['Your prompts reduce variance across retries'],
        commonFailureModes: ['Long prompts with no constraints', 'Blaming the model before fixing the spec'],
      },
      {
        id: 'intermediate',
        label: 'Review & operational risk',
        summary: 'Review outputs with tiered checks; integrate bias/safety awareness by audience.',
        prerequisites: ['Baseline prompting habits'],
        youShouldNowBeAbleTo: ['Tier review effort by stakes', 'Document verified vs assumed'],
        goodUnderstandingLooksLike: ['You reject “looks fluent” as a verification strategy'],
        commonFailureModes: ['Grammar-only edits on high-stakes claims', 'Skipping review because it’s internal'],
      },
      {
        id: 'advanced',
        label: 'Workflow systems & supervised iteration',
        summary: 'Design multi-step workflows with checkpoints, rollback, ownership, and logging patterns.',
        prerequisites: ['Intermediate review discipline'],
        youShouldNowBeAbleTo: ['Separate generation steps from verification gates', 'Specify escalation paths'],
        goodUnderstandingLooksLike: ['Humans remain accountable at explicit decision points'],
        commonFailureModes: ['Endless prompt tweaks without workflow design', 'Automation without audit trails'],
      },
      {
        id: 'capstone',
        label: 'Applied artifact',
        summary: 'Ship an end-to-end applied package (workflow, revision system, or review protocol).',
        prerequisites: ['Stages through advanced—or equivalent demonstrated practice'],
        youShouldNowBeAbleTo: ['Produce artifacts others can execute without guessing intent'],
        goodUnderstandingLooksLike: ['Your artifacts include gates, risks, and fallbacks'],
        commonFailureModes: ['Templates without verification hooks', 'Overclaiming automation coverage'],
      },
    ],
    scenarioAssessment: {
      summary:
        'Risk-tiered drafts, ambiguity traps, stakeholder constraints, approve/revise/reject judgments, comparative output evaluation.',
      formats: [
        'Decision memo scenarios',
        'Contrastive critique (two outputs)',
        'Workflow breakpoints (“stop and verify here”)',
        'Incident-style misinformation / overclaim drills',
      ],
      anchors: [
        'Prompt rewrite + task→prompt conversions',
        'Review pass scenarios tied to fluency-vs-truth traps',
        'Publishing risk scenarios for social/professional drafts',
      ],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Public AI labs for starter judgment drills (/library/ai-labs)'],
    },
    capstone: {
      title: 'Personal AI Workflow + Review Protocol Pack',
      description:
        'Learners assemble a repeatable workflow map (inputs → drafts → verification → publish gates) aligned to their real responsibilities.',
      portfolioArtifacts: ['Workflow diagram + checklist', 'Risk-tier rubric sheet', 'Two completed review memos on sanitized samples'],
      accessShaping:
        'Starters can produce a credible skeleton in public readers; signed-in continuity tightens modules; deeper materials expand scenarios and critique depth—still not outcomes guarantees.',
    },
    humanSkillsThreads: [
      'Judgment under uncertainty (review-before-reliance)',
      'Clear communication of constraints and responsibilities',
      'Professional skepticism toward fluent-but-unverified outputs',
      'Collaborative review habits (peer-readable artifacts)',
      'Resilience when outputs fail (debug spec first)',
    ],
    ethicsDataLiteracyThreads: [
      'Privacy and least-privilege thinking for prompts and pasted context',
      'Bias and harm awareness by audience and deployment context',
      'Hallucination risk literacy and source discipline',
      'Responsible publishing and disclosure habits',
      'Data quality awareness when AI touches structured or tabular inputs',
    ],
    freshness: {
      risingTopics: ['Agentic workflows with supervision hooks', 'Evaluation harnesses and rubric-first prompting', 'Enterprise governance patterns', 'Multimodal tool realities'],
      toolAndPlatformClusters: ['Major chat assistants', 'IDE copilots', 'RAG stacks', 'Enterprise safety tooling'],
      updatePrinciples:
        'Refresh examples when product behaviors shift; keep vendor-neutral patterns; prefer verification workflows over brand hype.',
    },
  }),

  machine_learning: stages('machine_learning', {
    headline: 'Machine Learning Foundations — metrics-literate reasoning without leaderboard theater',
    targetCapability:
      ' describe learning setups, choose metrics aligned to costs, spot suspicious evaluation, and communicate tradeoffs responsibly.',
    freeToPaidSkillShape: {
      publicStarter: 'Public module one readers establish honest foundations without signup friction.',
      signedInContinuity: 'Full map across categories for steady literacy—still conceptual readers, not hire guarantees.',
      deeperMaterials: 'Applied paths and deeper modules unlock with eligible plans—more scenarios, not certificates.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Problem framing',
        summary: 'Separate patterns (supervised/unsupervised), labels, and what “generalization” means.',
        prerequisites: ['Comfort with basic graphs/tables'],
        youShouldNowBeAbleTo: ['Explain over/underfit in plain language', 'State why splits exist'],
        goodUnderstandingLooksLike: ['You connect dataset generation to failure modes'],
        commonFailureModes: ['Treating accuracy as universal truth', 'Ignoring deployment mismatch'],
      },
      {
        id: 'beginner',
        label: 'Evaluation literacy',
        summary: 'Precision/recall tradeoffs, confusion matrices, class imbalance basics.',
        prerequisites: ['Problem framing'],
        youShouldNowBeAbleTo: ['Pick better metrics under asymmetric costs', 'Read a confusion matrix at a basic level'],
        goodUnderstandingLooksLike: ['You ask “false positives vs false negatives—who pays?”'],
        commonFailureModes: ['Optimizing one number blindly', 'Ignoring slice failures'],
      },
      {
        id: 'intermediate',
        label: 'Data quality & leakage instincts',
        summary: 'Leakage pathways, suspiciously perfect metrics, process fixes before algorithms.',
        prerequisites: ['Evaluation literacy'],
        youShouldNowBeAbleTo: ['Name plausible leakage stories', 'Propose process mitigations'],
        goodUnderstandingLooksLike: ['You challenge datasets before tuning hyperparameters'],
        commonFailureModes: ['Feature hoarding without provenance', 'Confusing correlation with deployable causality'],
      },
      {
        id: 'advanced',
        label: 'Operational ML judgment',
        summary: 'Monitoring mindset, drift awareness, responsible deployment framing.',
        prerequisites: ['Intermediate'],
        youShouldNowBeAbleTo: ['Draft a sensible rollout concern list', 'Pair metrics with operational costs'],
        goodUnderstandingLooksLike: ['You separate offline score from live behavior'],
        commonFailureModes: ['Hand-wavy “retrain monthly” without triggers', 'Ignoring monitoring ethics'],
      },
      {
        id: 'capstone',
        label: 'Applied reasoning artifact',
        summary: 'Produce a written evaluation brief on a realistic scenario.',
        prerequisites: ['Advanced literacy'],
        youShouldNowBeAbleTo: ['Defend metric choices with stakeholder language'],
        goodUnderstandingLooksLike: ['Tradeoffs are explicit and falsifiable'],
        commonFailureModes: ['Marketing metrics without operational meaning'],
      },
    ],
    scenarioAssessment: {
      summary: 'Metric selection under stakeholder pressure; leakage suspicion; slice failures; ethical deployment dilemmas.',
      formats: ['Scenario memos', 'Metric defense write-ups', 'Dataset critique drills'],
      anchors: ['Evaluation categories', 'Bias/variance modules', 'Applied paths'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'ML teaching labs (leakage + metrics scenarios)'],
    },
    capstone: {
      title: 'Model Review Brief + Evaluation Reasoning Write-up',
      description:
        'A concise brief that explains goal, metrics, risks, monitoring needs, and human oversight—aligned to real workplace communication norms.',
      portfolioArtifacts: ['Metric rationale memo', 'Leakage suspicion checklist', 'Rollout concern list'],
      accessShaping:
        'Public starter teaches honest basics; deeper modules unlock richer scenarios—skill-shaped difficulty, not arbitrary locks.',
    },
    humanSkillsThreads: [
      'Analytical reasoning about tradeoffs',
      'Communicating uncertainty to stakeholders',
      'Professional skepticism toward metrics theater',
      'Collaborative clarity when data ownership is messy',
    ],
    ethicsDataLiteracyThreads: [
      'Fairness and harm awareness by subgroup/slice',
      'Privacy in features and labels',
      'Interpretation caution with observational data',
      'Responsible monitoring and feedback loops',
    ],
    freshness: {
      risingTopics: ['Evaluation harnesses', 'Open-model vs API shifts', 'Regulatory attention areas', 'Edge deployment realities'],
      toolAndPlatformClusters: ['Notebook stacks', 'Feature stores', 'Cloud ML services', 'Experiment tracking'],
      updatePrinciples: 'Keep scenarios tied to durable concepts; refresh product names when behaviors materially change.',
    },
  }),

  chatbots: stages('chatbots', {
    headline: 'Everyday Chatbots — scope, safety, and hybrid design literacy',
    targetCapability:
      ' specify bot boundaries, escalation, logging, and user-trust behaviors for realistic bot systems.',
    freeToPaidSkillShape: {
      publicStarter: 'Category 1 readers available publicly for credible onboarding.',
      signedInContinuity: 'Full design/build path mapping with continuity across modules.',
      deeperMaterials: 'Premium expansions add deeper systems readers—still not deployment guarantees.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Definitions & everyday context',
        summary: 'What chatbots are in real products vs marketing.',
        prerequisites: [],
        youShouldNowBeAbleTo: ['Differentiate rules vs LLM patterns at a high level'],
        goodUnderstandingLooksLike: ['You ask about failure handling before architecture debates'],
        commonFailureModes: ['Assuming LLM always improves UX'],
      },
      {
        id: 'beginner',
        label: 'Conversation design basics',
        summary: 'Intents, confirmations, graceful failure, clarity.',
        prerequisites: ['Entry'],
        youShouldNowBeAbleTo: ['Draft bounded prompts and fallback messages'],
        goodUnderstandingLooksLike: ['Users always have a safe next step'],
        commonFailureModes: ['Open-ended promises the bot cannot verify'],
      },
      {
        id: 'intermediate',
        label: 'Logic, routing, hybrid systems',
        summary: 'When to use rules-first vs LLM assist; telemetry thinking.',
        prerequisites: ['Beginner'],
        youShouldNowBeAbleTo: ['Sketch hybrid routing with escalation triggers'],
        goodUnderstandingLooksLike: ['Escalation is explicit and testable'],
        commonFailureModes: ['Infinite scope creep'],
      },
      {
        id: 'advanced',
        label: 'Safety, trust, operational supervision',
        summary: 'Guardrails, abuse scenarios, monitoring hooks.',
        prerequisites: ['Intermediate'],
        youShouldNowBeAbleTo: ['Design refusal + escalation policies'],
        goodUnderstandingLooksLike: ['Safety is boring, explicit, and logged'],
        commonFailureModes: ['Safety as an afterthought prompt'],
      },
      {
        id: 'capstone',
        label: 'Design packet',
        summary: 'Deliver a one-page bot policy + conversation map.',
        prerequisites: ['Advanced'],
        youShouldNowBeAbleTo: ['Ship something operators can follow tomorrow'],
        goodUnderstandingLooksLike: ['Human handoff is always defined'],
        commonFailureModes: ['Beautiful UX writing with undefined ownership'],
      },
    ],
    scenarioAssessment: {
      summary: 'Escalation drills, toxic prompt handling, scope conflicts, stakeholder communication.',
      formats: ['Policy essays', 'Conversation maps', 'Incident-style bot failure triage'],
      anchors: ['Scope modules', 'Safety modules', 'Advanced systems'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Chatbot scope/escalation lab'],
    },
    capstone: {
      title: 'Chatbot Scope + Escalation Design Packet',
      description:
        'A publishable internal packet: allowed intents, refusal templates, escalation triggers, logging expectations.',
      portfolioArtifacts: ['Scope matrix', 'Escalation ladder', 'Example transcripts with decisions'],
      accessShaping:
        'Public starter proves usefulness; deeper readers add complexity and systems depth—aligned to applied judgment, not hype.',
    },
    humanSkillsThreads: [
      'Clarity under ambiguity',
      'Trust-centered communication',
      'Collaboration between policy and engineering',
      'Resilience when users stress-test the bot',
    ],
    ethicsDataLiteracyThreads: [
      'User safety and consent boundaries',
      'Logging minimization vs debuggability',
      'Bias and exclusion risks in routing',
      'Responsible escalation (no shame-the-user defaults)',
    ],
    freshness: {
      risingTopics: ['Tooling for eval harnesses', 'Voice/multimodal realities', 'Enterprise copilot patterns'],
      toolAndPlatformClusters: ['Bot frameworks', 'LLM hosts', 'Telephony/voice stacks'],
      updatePrinciples: 'Refresh product examples when interaction patterns materially change; keep policy-first patterns stable.',
    },
  }),

  networking: stages('networking', {
    headline: 'Networking & Infrastructure — layered reasoning for real systems',
    targetCapability:
      ' reason in layers (DNS → routing → TLS → app), produce falsifiable checks, and document triage without magical thinking.',
    freeToPaidSkillShape: {
      publicStarter: 'Category 1 public readers for trustworthy browsing and orientation.',
      signedInContinuity: 'Middle categories expand workplace literacy across common stacks.',
      deeperMaterials: 'Later categories unlock advanced platform patterns—still not certification.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Foundations & mental models',
        summary: 'What networks do and how traffic moves at a practical level.',
        prerequisites: [],
        youShouldNowBeAbleTo: ['Name layers you will test in order'],
        goodUnderstandingLooksLike: ['You separate symptom stories by layer'],
        commonFailureModes: ['Blaming Wi-Fi without evidence'],
      },
      {
        id: 'beginner',
        label: 'DNS & addressing literacy',
        summary: 'Resolution paths, common failure signatures.',
        prerequisites: ['Entry'],
        youShouldNowBeAbleTo: ['Draft DNS-first checks', 'State falsifiers'],
        goodUnderstandingLooksLike: ['Cheap tests come before expensive theories'],
        commonFailureModes: ['Confusing intermittent vs permanent failures'],
      },
      {
        id: 'intermediate',
        label: 'Routing, paths, performance basics',
        summary: 'Latency vs loss, asymmetric paths, practical diagnostics framing.',
        prerequisites: ['Beginner'],
        youShouldNowBeAbleTo: ['Explain what evidence would disprove a hypothesis'],
        goodUnderstandingLooksLike: ['You log observations neutrally'],
        commonFailureModes: ['Storytelling without captures'],
      },
      {
        id: 'advanced',
        label: 'Platform & architecture orientation',
        summary: 'Containers/cloud networking patterns at literacy level.',
        prerequisites: ['Intermediate'],
        youShouldNowBeAbleTo: ['Ask the right ownership questions across teams'],
        goodUnderstandingLooksLike: ['You know what you cannot see without access'],
        commonFailureModes: ['Architecture buzzwords without constraints'],
      },
      {
        id: 'capstone',
        label: 'Troubleshooting guide artifact',
        summary: 'Produce an operator-usable ladder for a recurring class of issues.',
        prerequisites: ['Advanced'],
        youShouldNowBeAbleTo: ['Ship a guide teammates can execute'],
        goodUnderstandingLooksLike: ['Every step has a falsifier'],
        commonFailureModes: ['Runbooks that are actually vibes'],
      },
    ],
    scenarioAssessment: {
      summary: 'DNS-first incident narratives, TLS mismatch stories, path asymmetry cases.',
      formats: ['Incident writeups', 'Hypothesis ladders', 'Operator runbooks'],
      anchors: ['Troubleshooting categories', 'Security-aware networking topics'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Networking lab drill (DNS/connectivity ladder)'],
    },
    capstone: {
      title: 'Network Troubleshooting Guide + Case Library',
      description:
        'A compact guide for a real environment class with checks, caveats, and escalation criteria.',
      portfolioArtifacts: ['Hypothesis ladder template', 'Two filled cases with evidence', 'Escalation criteria'],
      accessShaping:
        'Public readers earn trust with honest foundations; deeper tiers add platform realities and complexity—skill-shaped progression.',
    },
    humanSkillsThreads: [
      'Calm triage under pressure',
      'Clear written communication to operators',
      'Collaboration across network/app boundaries',
      'Patience with partial information',
    ],
    ethicsDataLiteracyThreads: [
      'Least privilege in diagnostics',
      'Safety when suggesting commands',
      'Privacy in logs and captures',
    ],
    freshness: {
      risingTopics: ['IPv6 realities', 'Zero trust networking narratives', 'Service mesh patterns', 'Edge platforms'],
      toolAndPlatformClusters: ['DNS providers', 'Cloud LB products', 'CDN ecosystems'],
      updatePrinciples: 'Update examples when common enterprise stacks shift; keep falsifiable checks as the stable core.',
    },
  }),

  cybersecurity: stages('cybersecurity', {
    headline: 'Cybersecurity Foundations — defense habits with escalation discipline',
    targetCapability:
      ' classify threats proportionally, choose safer defaults, and escalate responsibly—without fear-mongering or heroics.',
    freeToPaidSkillShape: {
      publicStarter: 'Foundations readable publicly to establish serious posture.',
      signedInContinuity: 'Expanded maps for sustained literacy across modern threats.',
      deeperMaterials: 'Advanced modules for deeper defense patterns—still not legal advice or guarantees.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Threat framing',
        summary: 'Risks, assets, and proportionality.',
        prerequisites: [],
        youShouldNowBeAbleTo: ['Describe threats without sensationalism'],
        goodUnderstandingLooksLike: ['You bias to safer defaults'],
        commonFailureModes: ['Shame-based “security culture”'],
      },
      {
        id: 'beginner',
        label: 'Identity & access literacy',
        summary: 'Accounts, MFA mindset, phishing awareness.',
        prerequisites: ['Entry'],
        youShouldNowBeAbleTo: ['Explain MFA tradeoffs at a practical level'],
        goodUnderstandingLooksLike: ['You adopt cautious defaults'],
        commonFailureModes: ['Credential reuse rationalization'],
      },
      {
        id: 'intermediate',
        label: 'Operational defense habits',
        summary: 'Logging, patching mindset, vendor reality, incident hooks.',
        prerequisites: ['Beginner'],
        youShouldNowBeAbleTo: ['Draft sensible escalation paths'],
        goodUnderstandingLooksLike: ['You reduce blast radius thinking'],
        commonFailureModes: ['Buying tools without process'],
      },
      {
        id: 'advanced',
        label: 'Modern threats & resilience',
        summary: 'Supply chain awareness, ransomware framing, continuity thinking.',
        prerequisites: ['Intermediate'],
        youShouldNowBeAbleTo: ['Prioritize controls under constraints'],
        goodUnderstandingLooksLike: ['Tradeoffs are explicit'],
        commonFailureModes: ['Checklist theater'],
      },
      {
        id: 'capstone',
        label: 'Defense packet',
        summary: 'Produce an actionable checklist + escalation map for your context.',
        prerequisites: ['Advanced'],
        youShouldNowBeAbleTo: ['Ship something your org could rehearse'],
        goodUnderstandingLooksLike: ['Humans know what to do first'],
        commonFailureModes: ['Paper policies without rehearsal hooks'],
      },
    ],
    scenarioAssessment: {
      summary: 'Phishing triage matrices, identity scenarios, proportionality drills, incident communication discipline.',
      formats: ['Classification tables', 'Stakeholder updates', 'Decision logs'],
      anchors: ['Human factors categories', 'Applied defense scenarios'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Phishing triage matrix lab'],
    },
    capstone: {
      title: 'Defense Checklist + Incident Escalation Map',
      description:
        'A practical packet for a defined scope: assets, triggers, contacts, safer defaults, rehearsal notes.',
      portfolioArtifacts: ['Risk-tier checklist', 'Escalation diagram', 'After-action template'],
      accessShaping:
        'Public foundations build trust; deeper modules expand scenarios—never replacing professional/legal counsel where required.',
    },
    humanSkillsThreads: [
      'Judgment under uncertainty',
      'Responsible escalation',
      'Non-judgmental reporting culture',
      'Resilience against shame-driven shortcuts',
    ],
    ethicsDataLiteracyThreads: [
      'Privacy minimization',
      'Consent and proportionality',
      'Avoiding vigilantism',
      'Clear boundaries on monitoring',
    ],
    freshness: {
      risingTopics: ['AI-assisted phishing', 'Identity vendor shifts', 'Zero trust adoption realities'],
      toolAndPlatformClusters: ['IdP ecosystems', 'EDR/XDR categories', 'Email security stacks'],
      updatePrinciples: 'Threat examples rotate; principles (defaults, escalation, evidence) stay stable.',
    },
  }),

  cloud_devops: stages('cloud_devops', {
    headline: 'Cloud & Platform Operations — delivery thinking with reliability discipline',
    targetCapability:
      ' reason about environments, deployments, failures, and guardrails without treating cloud as magic.',
    freeToPaidSkillShape: {
      publicStarter: 'Public starters for credible onboarding into cloud primitives.',
      signedInContinuity: 'Expanded modules for sustained delivery literacy.',
      deeperMaterials: 'Advanced practice readers—still not hiring guarantees.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Service models & boundaries',
        summary: 'IaaS/PaaS/SaaS mental models and responsibility splits.',
        prerequisites: [],
        youShouldNowBeAbleTo: ['Name what you still own vs vendor-owned'],
        goodUnderstandingLooksLike: ['You ask who can observe what'],
        commonFailureModes: ['Assuming SLA equals correctness'],
      },
      {
        id: 'beginner',
        label: 'Build/deploy literacy',
        summary: 'Artifacts, configs, reproducibility instincts.',
        prerequisites: ['Entry'],
        youShouldNowBeAbleTo: ['Trace a deploy story at a basic level'],
        goodUnderstandingLooksLike: ['You talk in artifacts, not vibes'],
        commonFailureModes: ['Manual hero deploys'],
      },
      {
        id: 'intermediate',
        label: 'Debugging & rollback posture',
        summary: 'Half-deployed states, sequencing, credential failures.',
        prerequisites: ['Beginner'],
        youShouldNowBeAbleTo: ['Identify earliest stop signals', 'Propose guardrails'],
        goodUnderstandingLooksLike: ['Rollbacks are planned before incidents'],
        commonFailureModes: ['Root cause = human error narratives'],
      },
      {
        id: 'advanced',
        label: 'Platform engineering orientation',
        summary: 'Contracts between teams; environments; governance hooks.',
        prerequisites: ['Intermediate'],
        youShouldNowBeAbleTo: ['Draft sane promotion policies at a literacy level'],
        goodUnderstandingLooksLike: ['Constraints are explicit'],
        commonFailureModes: ['Platform as buzzword salad'],
      },
      {
        id: 'capstone',
        label: 'Ops review artifact',
        summary: 'Deliver a deploy/postmortem-lite packet with measurable guardrails.',
        prerequisites: ['Advanced'],
        youShouldNowBeAbleTo: ['Turn failures into durable fixes'],
        goodUnderstandingLooksLike: ['Guardrails are testable'],
        commonFailureModes: ['Postmortems without artifacts'],
      },
    ],
    scenarioAssessment: {
      summary: 'Deploy failure narratives, credential misconfig stories, rollback drills, environment mismatch cases.',
      formats: ['Postmortem-lite docs', 'Guardrail proposals', 'Runbook critiques'],
      anchors: ['Applied platform work categories'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Deploy failure postmortem-lite lab'],
    },
    capstone: {
      title: 'Release Workflow Outline + Guardrail Plan',
      description:
        'A practical outline for how changes move through environments with verification gates.',
      portfolioArtifacts: ['Promotion diagram', 'Two guardrails with tests', 'Rollback checklist'],
      accessShaping:
        'Public starter teaches durable primitives; deeper layers add complexity—aligned to applied reliability thinking.',
    },
    humanSkillsThreads: [
      'Collaboration across teams',
      'Incident communication discipline',
      'Calm debugging under time pressure',
      'Ownership clarity',
    ],
    ethicsDataLiteracyThreads: [
      'Secrets handling hygiene',
      'Least privilege for automation',
      'Auditability and traceability',
    ],
    freshness: {
      risingTopics: ['GitOps maturity', 'AI-in-CI realities', 'Platform engineering trends', 'FinOps literacy'],
      toolAndPlatformClusters: ['Cloud control planes', 'CI/CD suites', 'Artifact registries'],
      updatePrinciples: 'Refresh representative tools; keep responsibility splits and guardrail thinking constant.',
    },
  }),

  monitoring: stages('monitoring', {
    headline: 'Monitoring & Observability — signal literacy and incident judgment',
    targetCapability:
      ' choose signals intentionally, communicate under uncertainty, and improve systems without dashboard theater.',
    freeToPaidSkillShape: {
      publicStarter: 'Foundations publicly readable for orientation.',
      signedInContinuity: 'Expanded readers across reliability topics.',
      deeperMaterials: 'Advanced incident and improvement topics—still not on-call outcome guarantees.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Signals basics',
        summary: 'Logs/metrics/traces purposes and limits.',
        prerequisites: [],
        youShouldNowBeAbleTo: ['Match signal types to questions'],
        goodUnderstandingLooksLike: ['You avoid metric hoarding'],
        commonFailureModes: ['Dashboards as substitute for thinking'],
      },
      {
        id: 'beginner',
        label: 'Alerting judgment',
        summary: 'Symptom vs cause, noise, actionable alerts.',
        prerequisites: ['Entry'],
        youShouldNowBeAbleTo: ['Define what makes an alert worthwhile'],
        goodUnderstandingLooksLike: ['Alerts tie to next actions'],
        commonFailureModes: ['Paging on vanity metrics'],
      },
      {
        id: 'intermediate',
        label: 'Incident response habits',
        summary: 'Communication, uncertainty, stabilization vs root cause.',
        prerequisites: ['Beginner'],
        youShouldNowBeAbleTo: ['Write facts-first updates'],
        goodUnderstandingLooksLike: ['Hypotheses labeled as hypotheses'],
        commonFailureModes: ['Premature root cause in exec channels'],
      },
      {
        id: 'advanced',
        label: 'Reliability engineering orientation',
        summary: 'SLO thinking at literacy level; improvement loops.',
        prerequisites: ['Intermediate'],
        youShouldNowBeAbleTo: ['Propose measurable reliability investments'],
        goodUnderstandingLooksLike: ['You connect user pain to signals'],
        commonFailureModes: ['SLO as bureaucratic theater'],
      },
      {
        id: 'capstone',
        label: 'Incident interpretation packet',
        summary: 'Deliver a concise interpretation + next steps for a realistic incident narrative.',
        prerequisites: ['Advanced'],
        youShouldNowBeAbleTo: ['Make decisions under partial information responsibly'],
        goodUnderstandingLooksLike: ['Cadence and owners are explicit'],
        commonFailureModes: ['Vanishing updates'],
      },
    ],
    scenarioAssessment: {
      summary: 'Ambiguous incidents, noisy alerts, stakeholder pressure, verification steps.',
      formats: ['Incident comms drafts', 'Alert cleanup proposals', 'Signal selection rationale'],
      anchors: ['Incident response categories', 'Observability foundations'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Incident comms draft lab'],
    },
    capstone: {
      title: 'Dashboard Reasoning Summary + Alert Budget Proposal',
      description:
        'A short packet that explains what you would measure, why, and what you would stop measuring.',
      portfolioArtifacts: ['Signal→question map', 'Two alert redesigns', 'Incident update pair (internal/exec)'],
      accessShaping:
        'Public foundations earn trust; deeper readers expand scenario complexity—skill-shaped, not vanity-gated.',
    },
    humanSkillsThreads: [
      'Communication under stress',
      'Collaborative incident coordination',
      'Professional skepticism toward metrics',
      'Resilience during outages',
    ],
    ethicsDataLiteracyThreads: [
      'Privacy in logs',
      'Responsible transparency to users',
      'Avoiding blameful incident culture',
    ],
    freshness: {
      risingTopics: ['OpenTelemetry adoption', 'eBPF realities', 'AI-assisted triage tooling'],
      toolAndPlatformClusters: ['APM suites', 'Log platforms', 'Incident tooling'],
      updatePrinciples: 'Update tool examples as markets shift; keep incident communication discipline stable.',
    },
  }),

  content_publishing: stages('content_publishing', {
    headline: 'Content Creation & Publishing — clarity, systems, and review discipline',
    targetCapability:
      ' design usable content systems, produce publishable drafts with bounded claims, and iterate with audience awareness.',
    freeToPaidSkillShape: {
      publicStarter: 'Public foundations for credible browsing and early habits.',
      signedInContinuity: 'Expanded readers across drafting and publishing workflows.',
      deeperMaterials: 'Advanced systems topics—still not growth guarantees.',
    },
    competencyStages: [
      {
        id: 'entry',
        label: 'Useful content definition',
        summary: 'Educational vs promotional vs informational intents.',
        prerequisites: [],
        youShouldNowBeAbleTo: ['Match structure to audience intent'],
        goodUnderstandingLooksLike: ['You design checks, not vibes'],
        commonFailureModes: ['Engagement language without substance'],
      },
      {
        id: 'beginner',
        label: 'Outlines & teaching structure',
        summary: 'Prerequisites, pitfalls, bounded claims.',
        prerequisites: ['Entry'],
        youShouldNowBeAbleTo: ['Convert messy ideas into teachable outlines'],
        goodUnderstandingLooksLike: ['Readers know what not to conclude'],
        commonFailureModes: ['Teaching brief reads like marketing'],
      },
      {
        id: 'intermediate',
        label: 'Drafting & iteration',
        summary: 'Revision discipline, voice control, verification hooks.',
        prerequisites: ['Beginner'],
        youShouldNowBeAbleTo: ['Iterate with explicit failure feedback'],
        goodUnderstandingLooksLike: ['Edits improve truth, not just tone'],
        commonFailureModes: ['AI polish masking empty claims'],
      },
      {
        id: 'advanced',
        label: 'Publishing systems',
        summary: 'Editorial workflow, rights awareness, sustainable cadence.',
        prerequisites: ['Intermediate'],
        youShouldNowBeAbleTo: ['Define a lightweight system you can maintain'],
        goodUnderstandingLooksLike: ['Quality gates exist'],
        commonFailureModes: ['Content calendars without review'],
      },
      {
        id: 'capstone',
        label: 'Publishable packet',
        summary: 'Ship a small portfolio set with review memos.',
        prerequisites: ['Advanced'],
        youShouldNowBeAbleTo: ['Publish responsibly with explicit uncertainty'],
        goodUnderstandingLooksLike: ['Claims are bounded and checkable'],
        commonFailureModes: ['Publishing drafts without verification'],
      },
    ],
    scenarioAssessment: {
      summary: 'Audience-risk scenarios, brand-fit dilemmas, claims verification, editorial rejections.',
      formats: ['Rewrite drills', 'Outline critiques', 'Publish gate checklists'],
      anchors: ['Drafting categories', 'Publishing ops categories'],
      bridges: [...SHARED_SCENARIO_BRIDGES, 'Outline→teaching brief lab', 'AI content creation labs'],
    },
    capstone: {
      title: 'Mini Content System + Publishable Draft Set',
      description:
        'A small editorial workflow plus 2–3 artifacts with explicit review memos and uncertainty boundaries.',
      portfolioArtifacts: ['Editorial checklist', 'Two publishable drafts', 'Rights/verification notes'],
      accessShaping:
        'Public starter proves clarity habits; deeper modules unlock richer systems thinking—still not audience growth promises.',
    },
    humanSkillsThreads: [
      'Audience empathy',
      'Creative synthesis with constraints',
      'Communication clarity',
      'Review discipline and humility',
    ],
    ethicsDataLiteracyThreads: [
      'Accuracy and boundaries on claims',
      'Rights and attribution caution',
      'Avoiding manipulative patterns',
      'Transparency when AI assists drafting',
    ],
    freshness: {
      risingTopics: ['Channel shifts', 'AI drafting norms', 'Trust & disclosure expectations'],
      toolAndPlatformClusters: ['CMS ecosystems', 'Design tools', 'Analytics surfaces'],
      updatePrinciples: 'Refresh channel examples; keep intent/verification ethics stable.',
    },
  }),
  ...STANDALONE_COURSE_QUALITY_LAYERS,
}

export function curriculumQualityForLibrary(id: TeachingLibraryId): LibraryCurriculumQuality {
  return CURRICULUM_QUALITY_LAYER[id]
}
