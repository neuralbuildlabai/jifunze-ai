import type { TeachingConcept, TeachingLibraryId } from './teachingTypes'
import { TEACHING_CONCEPTS_EXPANDED } from './teachingKnowledgeBaseExpanded'
import { TEACHING_CONCEPTS_CURRICULUM_FILL } from './teachingKnowledgeBaseCurriculumFill'
import { TEACHING_CONCEPTS_INTEGRATION_BRIDGES } from './teachingKnowledgeBaseIntegrationBridges'
import { TEACHING_CONCEPTS_EXTRA_LENSES } from './teachingKnowledgeBaseExtraLenses'
import { TEACHING_CONCEPTS_LAYERED_WEAK_LIBS } from './teachingKnowledgeBaseLayeredWeakLibs'
import { TEACHING_CONCEPTS_DISTRIBUTION_BALANCE } from './teachingKnowledgeBaseDistributionBalance'
import { TEACHING_CONCEPTS_STANDALONE_COURSES } from './teachingKnowledgeBaseStandaloneCourses'

/**
 * Ground-truth teaching atoms used by lessons, labs, help, and future signal loops.
 * Content is concise but specific—expand over time without inventing fake curriculum depth.
 */

export const TEACHING_CONCEPTS: TeachingConcept[] = [
  {
    id: 'ai-definition-and-limits',
    libraryId: 'ai_foundations',
    title: 'What modern AI tools can and cannot do',
    explanation:
      'Most workplace “AI” is pattern completion on data: useful drafts and suggestions, but not a verified source of truth. Strength comes from pairing outputs with checks appropriate to your risk.',
    keywords: ['ai', 'definition', 'limits', 'pattern', 'prediction', 'hallucination', 'confidence'],
    lessonSlugs: ['ai-foundations-what-ai-is-and-what-it-is-not', 'ai-foundations-the-limits-of-ai-knowledge'],
    misconceptions: [
      '“If it sounds fluent, it must be factually correct.”',
      '“AI understands my company the way a colleague does.”',
      '“More tokens always means better answers.”',
    ],
    workedExample:
      'Ask for a summary of a policy you cannot quote yet: treat it as a draft outline, then verify names, dates, and obligations against the source document.',
    revisionAnchor: 'Before trusting any claim, ask: what source would falsify this quickly?',
    commonQuestions: ['Is AI “thinking”?', 'Why does AI sound so sure?', 'When is AI the wrong tool?'],
    relatedLabIds: ['lab-ai-f3-spot-factual-weakness'],
    capabilityOutcomes: ['State realistic strengths/limits for a chosen task', 'Choose verification steps by risk'],
    relatedConceptIds: ['validation-basics'],
    goodUnderstandingMarkers: [
      'You separate fluency from verification before acting.',
      'You choose checks based on consequences of being wrong—not vibes.',
    ],
    weakUnderstandingMarkers: [
      'You ship outputs because they sound authoritative.',
      'You treat the model like a colleague who knows your private context.',
    ],
    kbAnchors: { categoryId: 'ai-foundations', primaryLessonSlug: 'ai-foundations-what-ai-is-and-what-it-is-not' },
    productToolNotes: [
      'Vendor demos often optimize for impressive language—treat them as orientation, not proof for your environment.',
    ],
  },
  {
    id: 'automation-vs-ai',
    libraryId: 'ai_foundations',
    title: 'Automation vs AI vs search',
    explanation:
      'Automation follows fixed rules; search retrieves existing material; many AI systems generate novel-looking text from patterns. Different failure modes: automation breaks on edge cases; search misses if not indexed; AI can be fluent-but-wrong.',
    keywords: ['automation', 'search', 'rules', 'difference', 'compare', 'rag'],
    lessonSlugs: ['ai-foundations-the-difference-between-ai-automation-and-search'],
    misconceptions: ['“Chatbots are just search.”', '“If we automate it, we do not need review.”'],
    workedExample:
      'Routing customer intents can be rules-first for known intents, with AI for messy language—still log failures and keep human fallback.',
    revisionAnchor: 'Name one task where rules win, one where retrieval wins, one where generation is risky.',
    commonQuestions: ['What is the difference between automation and AI?', 'When is search enough?'],
    relatedLabIds: ['lab-ai-f2-summarize-long-note'],
    capabilityOutcomes: ['Pick an appropriate tool class for a workflow step'],
    relatedConceptIds: ['ai-definition-and-limits'],
    goodUnderstandingMarkers: [
      'You can name different failure modes for rules vs retrieval vs generation.',
      'You pick the cheapest reliable tool for the step—not the newest one.',
    ],
    weakUnderstandingMarkers: [
      'You label anything with a bot “AI.”',
      'You assume automation removes review requirements.',
    ],
    kbAnchors: { categoryId: 'ai-foundations', primaryLessonSlug: 'ai-foundations-the-difference-between-ai-automation-and-search' },
  },
  {
    id: 'prompt-anatomy',
    libraryId: 'ai_foundations',
    title: 'Useful prompts: goal, context, constraints, format',
    explanation:
      'Strong prompts reduce ambiguity: say the audience, the deliverable shape, what to exclude, and what “done” looks like. Weak prompts often omit constraints and then blame the model.',
    keywords: ['prompt', 'context', 'constraints', 'format', 'instruction', 'debug'],
    lessonSlugs: [
      'practical-prompting-the-anatomy-of-a-useful-prompt',
      'practical-prompting-the-role-of-context-constraints-and-format',
      'practical-prompting-how-to-debug-a-weak-prompt',
    ],
    misconceptions: ['“Longer prompts are always better.”', '“The model should infer my unstated constraints.”'],
    workedExample:
      'Instead of “write an email”, say: recipient role, desired tone, 120–180 words, include 3 bullets of risks, no legal claims.',
    revisionAnchor: 'Rewrite a vague prompt by adding audience + format + exclusions.',
    commonQuestions: ['What makes a prompt weak?', 'How do I debug a bad output?'],
    relatedLabIds: ['lab-ai-f1-one-line-to-structured'],
    capabilityOutcomes: ['Draft a constrained prompt for a real task', 'Iterate with explicit failure feedback'],
    relatedConceptIds: ['validation-basics'],
    goodUnderstandingMarkers: [
      'Your prompts specify audience, deliverable shape, exclusions, and done-ness.',
      'You debug outputs by fixing the spec before blaming the model.',
    ],
    weakUnderstandingMarkers: [
      'You add clever wording without adding constraints.',
      'You expect implicit organizational context to be inferred reliably.',
    ],
    kbAnchors: { categoryId: 'practical-prompting', primaryLessonSlug: 'practical-prompting-the-anatomy-of-a-useful-prompt' },
  },
  {
    id: 'validation-basics',
    libraryId: 'ai_foundations',
    title: 'Why AI output must be reviewed',
    explanation:
      'Fluency is not accuracy. Review for factual correctness, relevance, completeness, and risk (tone, bias, safety) depending on how the output will be used.',
    keywords: ['review', 'validate', 'accuracy', 'bias', 'risk', 'fluency', 'wrong'],
    lessonSlugs: [
      'reviewing-and-validating-ai-output-why-ai-output-must-be-reviewed',
      'reviewing-and-validating-ai-output-fluency-versus-accuracy',
      'reviewing-and-validating-ai-output-checking-for-bias-tone-and-risk',
    ],
    misconceptions: ['“If I’m only brainstorming, review doesn’t matter.”', '“AI bias checks are optional for internal notes.”'],
    workedExample:
      'For a patient-facing FAQ draft: verify clinical statements against an approved source and run a second pass for inclusive language.',
    revisionAnchor: 'Pick one output type you use weekly and list three review checks you will not skip.',
    commonQuestions: ['Why is my output wrong but convincing?', 'What should I check first?'],
    relatedLabIds: ['lab-ai-f3-spot-factual-weakness'],
    capabilityOutcomes: ['Apply a lightweight review checklist by task risk'],
    relatedConceptIds: ['ai-definition-and-limits'],
    goodUnderstandingMarkers: [
      'You tier checks by audience and consequence.',
      'You record what is verified vs assumed.',
    ],
    weakUnderstandingMarkers: [
      'You edit grammar while ignoring factual risk.',
      'You treat internal drafts as permanently low-risk.',
    ],
    kbAnchors: {
      categoryId: 'reviewing-and-validating-ai-output',
      primaryLessonSlug: 'reviewing-and-validating-ai-output-why-ai-output-must-be-reviewed',
    },
  },
  {
    id: 'learning-without-dependence',
    libraryId: 'ai_foundations',
    title: 'Learning with AI without shortcut dependence',
    explanation:
      'AI can explain and quiz you, but understanding shows up when you can solve variants without prompts—use AI for loops, not replacement for thinking.',
    keywords: ['study', 'revision', 'learning', 'dependence', 'practice', 'recall'],
    lessonSlugs: [
      'ai-for-learning-and-revision-avoiding-passive-dependence',
      'ai-for-learning-and-revision-building-real-understanding-over-time',
    ],
    misconceptions: ['“If I read the AI explanation, I learned it.”', '“More generated questions equals mastery.”'],
    workedExample:
      'After an AI-generated explanation, close the chat and write your own summary from memory, then compare gaps.',
    revisionAnchor: 'Track one topic where you intentionally practice without AI for 10 minutes.',
    commonQuestions: ['How do I revise without cheating myself?', 'When does AI harm learning?'],
    relatedLabIds: ['lab-ai-f6-active-recall-questions'],
    capabilityOutcomes: ['Design a recall loop that forces retrieval'],
    relatedConceptIds: ['prompt-anatomy'],
    goodUnderstandingMarkers: [
      'You use AI to generate retrieval practice, not passive rereading.',
      'You can explain an idea without reopening the chat.',
    ],
    weakUnderstandingMarkers: [
      'You confuse reading an explanation with being able to apply it.',
      'You let AI judge mastery based on volume of generated questions.',
    ],
    kbAnchors: {
      categoryId: 'ai-for-learning-and-revision',
      primaryLessonSlug: 'ai-for-learning-and-revision-avoiding-passive-dependence',
    },
  },
  {
    id: 'ml-supervised-basics',
    libraryId: 'machine_learning',
    title: 'Supervised learning: labels, generalization, overfitting',
    explanation:
      'Supervised learning maps inputs to labels using examples. Models can memorize noise (overfit) or miss structure (underfit)—evaluation must match the deployment distribution.',
    keywords: ['supervised', 'labels', 'training', 'overfitting', 'generalization', 'features'],
    lessonSlugs: [
      'machine-learning-foundations-features-labels-and-training-data',
      'machine-learning-foundations-patterns-generalization-and-overfitting',
      'core-ml-concepts-classification',
      'model-quality-and-evaluation-bias-and-variance',
    ],
    misconceptions: ['“High training accuracy means it will work in production.”', '“More features always improve the model.”'],
    workedExample:
      'If weekend conversions spike in training data due to a marketing bug, the model may learn the bug—fix data before tuning algorithms.',
    revisionAnchor: 'Explain overfit vs underfit using a concrete failure symptom.',
    commonQuestions: ['What is overfitting in plain language?', 'Why do we split train/val/test?'],
    relatedLabIds: ['lab-ml-diagnose-leakage-risk'],
    capabilityOutcomes: ['Describe train/val/test purpose', 'Spot a suspiciously perfect metric'],
    relatedConceptIds: ['ml-metrics-tradeoffs'],
    goodUnderstandingMarkers: [
      'You connect splits and metrics to deployment reality.',
      'You suspect leakage or shortcuts when metrics look “too perfect.”',
    ],
    weakUnderstandingMarkers: [
      'You tune algorithms before questioning data generation.',
      'You treat training accuracy as a promise about production.',
    ],
    kbAnchors: { primaryLessonSlug: 'machine-learning-foundations-features-labels-and-training-data' },
    productToolNotes: ['Notebook environments can hide data issues—verify provenance and splits in the real pipeline.'],
  },
  {
    id: 'ml-metrics-tradeoffs',
    libraryId: 'machine_learning',
    title: 'Precision, recall, and when accuracy misleads',
    explanation:
      'Accuracy can hide rare-but-critical failures. Precision/recall trade off false positives vs false negatives—choose metrics based on costs, not leaderboard vibes.',
    keywords: ['precision', 'recall', 'f1', 'accuracy', 'confusion matrix', 'metric'],
    lessonSlugs: [
      'model-quality-and-evaluation-accuracy-precision-recall-and-f1',
      'model-quality-and-evaluation-when-accuracy-misleads',
      'model-quality-and-evaluation-confusion-matrices',
    ],
    misconceptions: ['“95% accuracy is always good.”', '“We can optimize everything with one number.”'],
    workedExample:
      'Fraud detection: catching fraud matters more than avoiding every false alarm—recall may dominate, with human review for borderline cases.',
    revisionAnchor: 'For your domain, which error type is more expensive: false positive or false negative?',
    commonQuestions: ['What’s the difference between precision and recall?', 'When does accuracy lie?'],
    relatedLabIds: ['lab-ml-metrics-by-scenario'],
    capabilityOutcomes: ['Pick a metric aligned to costs', 'Read a confusion matrix at a basic level'],
    relatedConceptIds: ['ml-supervised-basics'],
    goodUnderstandingMarkers: [
      'You choose metrics using costs of wrong decisions.',
      'You inspect slices and confusion—not a single headline number.',
    ],
    weakUnderstandingMarkers: [
      'You optimize accuracy by default for rare-but-critical events.',
      'You ignore imbalance and operational costs.',
    ],
    kbAnchors: { primaryLessonSlug: 'model-quality-and-evaluation-accuracy-precision-recall-and-f1' },
  },
  {
    id: 'chatbot-rules-vs-llm',
    libraryId: 'chatbots',
    title: 'Rules-based bots vs LLM-powered bots',
    explanation:
      'Rules bots are predictable and auditable; LLM bots handle messy language but need stronger guardrails and review. Hybrid systems are common in production.',
    keywords: ['rules', 'llm', 'chatbot', 'routing', 'guardrails', 'workflow'],
    lessonSlugs: [
      'chatbots-in-everyday-life-what-a-chatbot-is-and-what-it-is-not',
      'types-of-chatbots-ai-chatbots-versus-rules-based-bots',
      'types-of-chatbots-how-llm-powered-chatbots-differ',
      'types-of-chatbots-when-ai-improves-the-user-experience',
    ],
    misconceptions: ['“LLM chatbots are always smarter.”', '“Rules bots cannot scale.”'],
    workedExample:
      'Tier-1 FAQ: deterministic answers for top 20 questions; LLM only when intent confidence is low and human escalation exists.',
    revisionAnchor: 'List one scenario where a rules-first bot is safer.',
    commonQuestions: ['When should I avoid LLMs in a bot?', 'What does hybrid mean here?'],
    relatedLabIds: ['lab-chatbot-scope-and-escalation'],
    capabilityOutcomes: ['Choose bot architecture class for a scenario', 'State escalation policy in plain language'],
    relatedConceptIds: [],
    goodUnderstandingMarkers: [
      'You can justify rules-first vs LLM-first for a concrete intent.',
      'You design escalation instead of infinite LLM scope.',
    ],
    weakUnderstandingMarkers: [
      'You assume LLM equals better UX in every situation.',
      'You omit logging and failure capture because “it usually works.”',
    ],
    kbAnchors: { primaryLessonSlug: 'types-of-chatbots-ai-chatbots-versus-rules-based-bots' },
  },
  {
    id: 'networking-connectivity-thinking',
    libraryId: 'networking',
    title: 'Layered connectivity thinking (DNS, routing, behavior)',
    explanation:
      'Most “the network is down” reports mix symptoms across layers. Useful troubleshooting separates name resolution, path reachability, and application behavior—before jumping to fixes.',
    keywords: ['dns', 'routing', 'tcp', 'latency', 'connectivity', 'tls', 'network'],
    lessonSlugs: ['network-foundations-what-networks-are-and-why-they-matter', 'network-foundations-dns-routing-and-switching'],
    misconceptions: [
      '“If ping fails, DNS must be broken.”',
      '“One successful trace means the service is healthy end-to-end.”',
    ],
    workedExample:
      'Intermittent site failures: confirm whether the symptom is DNS flakiness vs routing vs TLS vs app errors using smallest-first checks.',
    revisionAnchor: 'Write a three-layer hypothesis ladder: DNS → route/path → TLS/app.',
    commonQuestions: ['Where do I start when users say “the network”?', 'How do I avoid magical thinking in triage?'],
    relatedLabIds: ['lab-net-dns-connectivity-drill'],
    capabilityOutcomes: ['Draft a cheapest-first triage ladder', 'State falsifiers for common connectivity guesses'],
    relatedConceptIds: [],
    goodUnderstandingMarkers: [
      'You order checks from cheap global signals to expensive deep dives.',
      'You separate symptoms across layers instead of blending them.',
    ],
    weakUnderstandingMarkers: [
      'You jump to vendor blame without falsifying simpler layers.',
      'You confuse latency spikes with packet loss stories.',
    ],
    kbAnchors: { primaryLessonSlug: 'network-foundations-what-networks-are-and-why-they-matter' },
  },
  {
    id: 'cybersecurity-risk-framing',
    libraryId: 'cybersecurity',
    title: 'Risk framing: threats, controls, and human factors',
    explanation:
      'Cybersecurity practice balances threats and controls with operational reality. Useful guidance focuses on observable cues, safer defaults, and escalation paths—not theater.',
    keywords: ['phishing', 'risk', 'identity', 'security', 'controls', 'malware'],
    lessonSlugs: ['cybersecurity-foundations-what-cybersecurity-is', 'practical-security-habits-phishing-and-social-engineering'],
    misconceptions: ['“Security is only an IT problem.”', '“Training fixes phishing completely.”'],
    workedExample:
      'Users forward a suspicious invoice email: prioritize containment (don’t click), capture headers safely, escalate via the documented channel.',
    revisionAnchor: 'Pick one scenario and name the safest default action before heroics.',
    commonQuestions: ['What’s phishing vs spam?', 'When should I escalate vs delete?'],
    relatedLabIds: ['lab-sec-phishing-triage-matrix'],
    capabilityOutcomes: ['Classify suspicious messages into safer default actions', 'Explain cues vs vibes'],
    relatedConceptIds: [],
    goodUnderstandingMarkers: [
      'You bias toward cautious defaults when stakes are unclear.',
      'You cite observable cues—not emotional “felt off.”',
    ],
    weakUnderstandingMarkers: [
      'You shame peers instead of improving reporting paths.',
      'You click to “verify” under time pressure.',
    ],
    kbAnchors: { primaryLessonSlug: 'cybersecurity-foundations-what-cybersecurity-is' },
  },
  {
    id: 'cloud-platform-basics',
    libraryId: 'cloud_devops',
    title: 'Cloud primitives: services, boundaries, and deploy reality',
    explanation:
      'Cloud work is about constraints: what changes together, what is immutable, what credentials mean, and what signals indicate health. Debugging deploy failures requires artifact + sequencing thinking.',
    keywords: ['cloud', 'deploy', 'ci', 'cd', 'containers', 'rollback', 'iam'],
    lessonSlugs: ['cloud-foundations-iaas-paas-and-saas', 'applied-platform-work-debugging-build-and-deploy-failures'],
    misconceptions: ['“Cloud removes operational failure modes.”', '“Rollback is always instant and safe.”'],
    workedExample:
      'A partial rollout leaves mixed versions: identify earliest stop point, isolate artifact mismatch vs config drift, add a guardrail test before retrying.',
    revisionAnchor: 'Name two guardrails that are testable—not slogans.',
    commonQuestions: ['Why do deploys fail halfway?', 'What should I capture in an incident-lite postmortem?'],
    relatedLabIds: ['lab-cloud-deploy-failure-postmortem-lite'],
    capabilityOutcomes: ['Extract constraints from a deploy failure story', 'Propose measurable guardrails'],
    relatedConceptIds: [],
    goodUnderstandingMarkers: [
      'You tie fixes to artifacts, sequencing, and permissions—not vibes.',
      'You propose guardrails that change process measurably.',
    ],
    weakUnderstandingMarkers: [
      'You blame “the cloud” without naming the failing constraint.',
      'You recommend “more communication” without mechanisms.',
    ],
    kbAnchors: { primaryLessonSlug: 'cloud-foundations-iaas-paas-and-saas' },
    productToolNotes: ['Cloud vendor consoles differ—use Jifunze lessons for patterns, then map to your org’s tooling.'],
  },
  {
    id: 'observability-signals',
    libraryId: 'monitoring',
    title: 'Signals: logs, metrics, traces, and what users experience',
    explanation:
      'Observability ties user-visible symptoms to signals you can query. Useful response writing separates facts vs hypotheses vs mitigations under uncertainty—without pretending root cause early.',
    keywords: ['logs', 'metrics', 'traces', 'incident', 'slo', 'alert', 'observability'],
    lessonSlugs: ['observability-foundations-logs-metrics-and-traces', 'incident-response-communication-during-incidents'],
    misconceptions: ['“Dashboards replace thinking.”', '“More alerts equals better reliability.”'],
    workedExample:
      'During an incident: publish impact boundaries, known facts, active mitigations, next update time—avoid speculative root cause in executive channels.',
    revisionAnchor: 'Write one incident update that separates facts vs hypotheses explicitly.',
    commonQuestions: ['What is observability vs monitoring?', 'How do I communicate under uncertainty?'],
    relatedLabIds: ['lab-observe-incident-comms-draft'],
    capabilityOutcomes: ['Draft stakeholder-safe incident updates', 'Name which signal class answers which question'],
    relatedConceptIds: [],
    goodUnderstandingMarkers: [
      'You label hypotheses as hypotheses.',
      'You publish cadence and owners—not vague reassurance.',
    ],
    weakUnderstandingMarkers: [
      'You announce premature root causes under pressure.',
      'You optimize dashboards instead of clarifying decision signals.',
    ],
    kbAnchors: { primaryLessonSlug: 'observability-foundations-logs-metrics-and-traces' },
  },
  {
    id: 'content-intent-and-usefulness',
    libraryId: 'content_publishing',
    title: 'Useful content: intent, audience need, and bounded claims',
    explanation:
      'Strong educational content matches audience intent (learn / decide / do), uses checks instead of hype, and bounds claims—especially when tools assist drafting.',
    keywords: ['content', 'audience', 'outline', 'brief', 'teaching', 'publish'],
    lessonSlugs: ['content-foundations-what-useful-content-actually-does', 'drafting-and-idea-development-building-better-outlines'],
    misconceptions: ['“More engagement language equals better teaching.”', '“AI drafts are ready to publish.”'],
    workedExample:
      'Turn a messy idea into an outline with prerequisites, pitfalls, and “what not to conclude”—then draft under tight length with explicit uncertainty.',
    revisionAnchor: 'State one claim you refuse to make without a verifiable source.',
    commonQuestions: ['How do I avoid generic AI tone?', 'What makes content educational vs promotional?'],
    relatedLabIds: ['lab-publish-outline-to-teaching-brief'],
    capabilityOutcomes: ['Align structure to audience intent', 'Add anti-patterns that reduce misuse'],
    relatedConceptIds: [],
    goodUnderstandingMarkers: [
      'You match structure to intent (learn/decide/do).',
      'You include pitfalls and bounded claims.',
    ],
    weakUnderstandingMarkers: [
      'You polish tone while keeping empty claims.',
      'You publish drafts without a verification plan.',
    ],
    kbAnchors: { primaryLessonSlug: 'content-foundations-what-useful-content-actually-does' },
  },
  {
    id: 'ml-data-leakage-production',
    libraryId: 'machine_learning',
    title: 'Data leakage: when your “offline” metric is secretly cheating',
    explanation:
      'Leakage lets future information sneak into training features or splits—models look dazzling until deployment, when the cheat path disappears.',
    keywords: ['leakage', 'validation', 'split', 'shortcut', 'cheating', 'features', 'pipeline'],
    lessonSlugs: ['model-quality-and-evaluation-data-leakage'],
    misconceptions: ['“Cleaning duplicates is enough.”', '“Timestamp columns are never informative.”'],
    workedExample:
      'If “days_since_last_contact” aggregates information from after the prediction point, remove/rebuild it—or your validation is fantasizing outcomes.',
    revisionAnchor: 'Name one feature column that must be forbidden because it peers into the future for your prediction time.',
    commonQuestions: ['What counts as leakage in spreadsheets?', 'Why does CV still look perfect sometimes?'],
    relatedLabIds: ['lab-ml-diagnose-leakage-risk'],
    capabilityOutcomes: ['Spot plausible leakage paths', 'Rebuild a safer label horizon'],
    relatedConceptIds: ['ml-supervised-basics', 'ml-metrics-tradeoffs'],
    kbAnchors: { primaryLessonSlug: 'model-quality-and-evaluation-data-leakage' },
  },
  {
    id: 'ml-drift-and-monitoring-lite',
    libraryId: 'machine_learning',
    title: 'Drift basics: inputs and assumptions change faster than nostalgia',
    explanation:
      'Models assume the future resembles training. Drift breaks that link—often gradually—until reviews, slices, and monitoring catch it.',
    keywords: ['drift', 'monitoring', 'distribution', 'slice', 'production', 'retrain'],
    lessonSlugs: ['practical-ml-workflow-monitoring-and-drift-basics'],
    misconceptions: ['“One dashboard fixes reliability.”', '“Retrain monthly” without checking what broke.'],
    workedExample:
      'Conversion model after a UX redesign: validate on post-change traffic slices before trusting global accuracy.',
    revisionAnchor: 'Pick two cheap signals you would plot weekly—not vanity charts, decision signals.',
    commonQuestions: ['What is drift in plain English?', 'What should I alert on first?'],
    relatedLabIds: [],
    capabilityOutcomes: ['Define drift triggers tied to decisions', 'Pick an honest slice metric'],
    relatedConceptIds: ['ml-metrics-tradeoffs'],
    kbAnchors: { primaryLessonSlug: 'practical-ml-workflow-monitoring-and-drift-basics' },
  },
  {
    id: 'ml-clustering-foundations',
    libraryId: 'machine_learning',
    title: 'Clustering: grouping without pretending labels exist',
    explanation:
      'Clustering proposes structure from similarity; interpretation still requires domain judgment and sanity checks—not automatic “segments”.',
    keywords: ['clustering', 'segments', 'k-means', 'similarity', 'unsupervised'],
    lessonSlugs: ['core-ml-concepts-clustering'],
    misconceptions: ['“Clusters are objectively true.”', '“More clusters equals better insight.”'],
    workedExample:
      'Customer cohorts with overlapping behavior: validate clusters by outcomes you care about before renaming them for exec decks.',
    revisionAnchor: 'Describe how you would falsify a clustering result with one external variable.',
    commonQuestions: ['When is clustering the wrong tool?', 'How do I interpret clusters responsibly?'],
    relatedLabIds: [],
    capabilityOutcomes: ['State clustering limits', 'Translate clusters into testable hypotheses'],
    relatedConceptIds: ['ml-supervised-basics'],
    kbAnchors: { primaryLessonSlug: 'core-ml-concepts-clustering' },
  },
  {
    id: 'ml-baseline-and-iteration-discipline',
    libraryId: 'machine_learning',
    title: 'Baselines before cleverness: iterate with falsifiable steps',
    explanation:
      'A baseline anchors difficulty: rules, linear models, or trivial heuristics. Complex models must earn their complexity with measurable lift.',
    keywords: ['baseline', 'iterate', 'experiment', 'complexity', 'workflow'],
    lessonSlugs: ['practical-ml-workflow-choosing-a-baseline', 'practical-ml-workflow-iterating-on-a-model'],
    misconceptions: ['“Start with the biggest model.”', '“Iteration means more epochs.”'],
    workedExample:
      'Forecasting baseline: seasonal naive + obvious holidays before gradient boosting—compare error by horizon slice.',
    revisionAnchor: 'Write down your baseline prediction rule in one sentence—your model must beat it where it matters.',
    commonQuestions: ['What counts as a baseline?', 'How do I avoid endless tuning?'],
    relatedLabIds: [],
    capabilityOutcomes: ['Define a falsifiable baseline', 'Compare improvements by slice'],
    relatedConceptIds: ['ml-supervised-basics'],
    kbAnchors: { primaryLessonSlug: 'practical-ml-workflow-choosing-a-baseline' },
  },
  {
    id: 'chatbot-trust-boundaries-detailed',
    libraryId: 'chatbots',
    title: 'Transparent boundaries tell users where failure will show up',
    explanation:
      'Trustworthy bots declare limits early: what they optimize, what they cannot verify, and how to escalate—reducing harmful confidence.',
    keywords: ['trust', 'boundaries', 'escalation', 'transparency', 'confidence'],
    lessonSlugs: [
      'safety-trust-and-responsibility-chatbots-telling-users-what-the-bot-can-and-cannot-do',
      'safety-trust-and-responsibility-chatbots-avoiding-misleading-confidence',
    ],
    misconceptions: ['“Small print fixes everything.”', '“Users read disclaimers.”'],
    workedExample:
      'Medical-adjacent triage bot: upfront scope (informational only), mandatory escalation triggers, and plain-language uncertainty cues.',
    revisionAnchor: 'List three operations your bot must refuse—or route to humans—before launch review.',
    commonQuestions: ['How do I write boundaries without sounding hostile?', 'When is escalation mandatory?'],
    relatedLabIds: ['lab-chatbot-scope-and-escalation'],
    capabilityOutcomes: ['Draft boundary language tied to failure modes', 'Pair limits with escalation paths'],
    relatedConceptIds: ['chatbot-rules-vs-llm'],
    kbAnchors: { primaryLessonSlug: 'safety-trust-and-responsibility-chatbots-telling-users-what-the-bot-can-and-cannot-do' },
  },
  {
    id: 'chatbot-hallucination-confidence-loop',
    libraryId: 'chatbots',
    title: 'Hallucinations and false confidence in chat UX',
    explanation:
      'Fluent errors feel authoritative. Review loops must catch confident wrong answers—especially when memory and tools amplify mistakes.',
    keywords: ['hallucination', 'confidence', 'review', 'failure', 'loop'],
    lessonSlugs: ['reviewing-and-improving-chatbot-performance-hallucinations-and-false-confidence'],
    misconceptions: ['“Add more examples” without fixing retrieval.', '“Lower temperature eliminates hallucinations.”'],
    workedExample:
      'Support bot cites policy numbers: require retrieval hits or explicit “not found” behavior before displaying citations.',
    revisionAnchor: 'Pick one user-visible failure mode and design a logging field that makes it measurable.',
    commonQuestions: ['Why do bots sound sure when wrong?', 'What should QA focus on first?'],
    relatedLabIds: [],
    capabilityOutcomes: ['Design gating for factual claims', 'Separate fluency from verification in QA rubrics'],
    relatedConceptIds: ['chatbot-rules-vs-llm'],
    kbAnchors: { primaryLessonSlug: 'reviewing-and-improving-chatbot-performance-hallucinations-and-false-confidence' },
  },
  {
    id: 'networking-tls-trust-chain',
    libraryId: 'networking',
    title: 'TLS and certificates: names, time, and trust stores',
    explanation:
      'TLS failures often look like “network down” but are name mismatches, expired certificates, clock skew, or incomplete chain presentation—layered checks beat vibes.',
    keywords: ['tls', 'certificate', 'https', 'trust', 'chain', 'expiry', 'sni'],
    lessonSlugs: ['network-troubleshooting-reliability-diagnosing-tls-and-certificate-issues'],
    misconceptions: ['“TLS error always means vendor outage.”', '“Renewing cert fixes every warning.”'],
    workedExample:
      'Internal tool shows intermittent TLS errors after DNS cutover: verify SANs match new hostname and chain served matches client trust store.',
    revisionAnchor: 'Write the three checks you run before escalating a TLS ticket to infrastructure.',
    commonQuestions: ['What is a chain vs a leaf cert?', 'Why do browsers show different errors than curl?'],
    relatedLabIds: ['lab-net-dns-connectivity-drill'],
    capabilityOutcomes: ['Separate TLS symptoms from routing symptoms', 'Collect minimal evidence for certificate issues'],
    relatedConceptIds: ['networking-connectivity-thinking'],
    kbAnchors: { primaryLessonSlug: 'network-troubleshooting-reliability-diagnosing-tls-and-certificate-issues' },
  },
  {
    id: 'cybersecurity-identity-access-basics',
    libraryId: 'cybersecurity',
    title: 'Identity and access: least privilege without tribal knowledge',
    explanation:
      'Most preventable incidents involve credential reuse, shared accounts, or standing access. Useful practice ties permissions to roles, time, and evidence—not memory.',
    keywords: ['identity', 'access', 'mfa', 'least privilege', 'credentials', 'roles'],
    lessonSlugs: ['cybersecurity-foundations-identity-access-and-trust'],
    misconceptions: ['“MFA solves everything.”', '“Admin access speeds work without cost.”'],
    workedExample:
      'Contractor needs prod read: grant scoped read + short TTL + audit trail instead of sharing a break-glass password.',
    revisionAnchor: 'List one permission you would remove from your own account if audited tomorrow.',
    commonQuestions: ['What is least privilege in practice?', 'When is shared login ever acceptable?'],
    relatedLabIds: ['lab-sec-phishing-triage-matrix'],
    capabilityOutcomes: ['Describe role-based access in plain language', 'Spot credential anti-patterns'],
    relatedConceptIds: ['cybersecurity-risk-framing'],
    kbAnchors: { primaryLessonSlug: 'cybersecurity-foundations-identity-access-and-trust' },
  },
  {
    id: 'cloud-devops-cicd-thinking',
    libraryId: 'cloud_devops',
    title: 'CI/CD thinking: environments, sequencing, and rollback realism',
    explanation:
      'Delivery pipelines are sequencing + constraints: artifact identity, environment parity, approvals, and rollback paths. “Green build” alone does not imply safe rollout.',
    keywords: ['ci', 'cd', 'pipeline', 'deploy', 'rollback', 'release', 'staging'],
    lessonSlugs: [
      'devops-workflow-foundations-ci-cd-and-delivery-thinking',
      'devops-workflow-foundations-environments-and-release-flow',
      'platform-operations-release-safety',
    ],
    misconceptions: ['“Automated deploy means instant safety.”', '“Rollback always brings you back cleanly.”'],
    workedExample:
      'A migration passes CI but breaks runtime config in staging: halt promotion, isolate config diff, add a smoke check that asserts the migrated invariant—not only “tests green.”',
    revisionAnchor: 'Write the minimum rollback criterion you would insist on before touching production.',
    commonQuestions: ['What is CI vs CD in plain English?', 'When should I refuse to ship?'],
    relatedLabIds: ['lab-cloud-deploy-failure-postmortem-lite'],
    capabilityOutcomes: ['Separate build health from rollout risk', 'Name rollback constraints honestly'],
    relatedConceptIds: ['cloud-platform-basics'],
    kbAnchors: { primaryLessonSlug: 'devops-workflow-foundations-ci-cd-and-delivery-thinking' },
  },
  {
    id: 'cloud-containers-modern-deploy',
    libraryId: 'cloud_devops',
    title: 'Containers and modern deployment: images, portability, ops reality',
    explanation:
      'Containers package dependencies and runnable artifacts; platforms add scheduling, networking, secrets, and observability. Useful learning focuses on boundaries and interfaces—not logos.',
    keywords: ['containers', 'image', 'deployment', 'kubernetes', 'rollback', 'secrets'],
    lessonSlugs: ['platform-operations-containers-and-modern-deployment', 'platform-operations-reliability-and-scaling'],
    misconceptions: ['“Docker fixes environment drift completely.”', '“Kubernetes removes ops work.”'],
    workedExample:
      'A service runs locally but fails in staging: compare image tag, injected env vars, database connectivity class, and platform networking rules—assume parity gaps before blaming code.',
    revisionAnchor: 'List three platform facts you would verify before escalating an image issue.',
    commonQuestions: ['What problems do containers solve vs not?', 'Where do configs still bite you?'],
    relatedLabIds: ['lab-cloud-deploy-failure-postmortem-lite'],
    capabilityOutcomes: ['Explain container boundaries to a teammate', 'Debug parity gaps systematically'],
    relatedConceptIds: ['cloud-platform-basics'],
    kbAnchors: { primaryLessonSlug: 'platform-operations-containers-and-modern-deployment' },
  },
  {
    id: 'observability-monitoring-vs-observability',
    libraryId: 'monitoring',
    title: 'Monitoring vs observability: dashboards vs answerable questions',
    explanation:
      'Monitoring collects signals; observability supports forming and testing hypotheses about behavior under uncertainty—especially during incidents.',
    keywords: ['monitoring', 'observability', 'dashboard', 'signals', 'hypothesis'],
    lessonSlugs: ['observability-foundations-monitoring-vs-observability', 'observability-foundations-signals-symptoms-and-systems'],
    misconceptions: ['“Dashboards replace thinking.”', '“Tracing solves every incident.”'],
    workedExample:
      'Latency spikes only on one shard: formulate hypotheses (GC vs dependency vs saturation), pick two signals per hypothesis, rule out fast before deep dives consume the team.',
    revisionAnchor: 'Pick one symptom and write the question it must answer—not the chart first.',
    commonQuestions: ['What does observability change in practice?', 'How do I avoid alert noise?'],
    relatedLabIds: ['lab-observe-incident-comms-draft'],
    capabilityOutcomes: ['Turn telemetry into falsifiable hypotheses', 'Avoid premature root-cause storytelling'],
    relatedConceptIds: ['observability-signals'],
    kbAnchors: { primaryLessonSlug: 'observability-foundations-monitoring-vs-observability' },
  },
  {
    id: 'incident-triage-severity',
    libraryId: 'monitoring',
    title: 'Incident triage: severity, ownership, and communication under uncertainty',
    explanation:
      'Early incident work stabilizes impact and coordinates owners—without pretending certainty. Severity should map to user-visible harm and operational constraints.',
    keywords: ['incident', 'triage', 'severity', 'on-call', 'escalation', 'communication'],
    lessonSlugs: ['incident-response-triage-and-severity-thinking', 'incident-response-communication-during-incidents'],
    misconceptions: ['“We must name root cause immediately.”', '“Silence reduces panic.”'],
    workedExample:
      'Partial outage with unclear blast radius: publish impact boundary, known mitigations, next update time, and owner—defer narrative root cause until evidence firms.',
    revisionAnchor: 'Draft a 4-sentence update that separates facts vs hypotheses explicitly.',
    commonQuestions: ['How do I choose severity fast?', 'What should executives hear first?'],
    relatedLabIds: ['lab-observe-incident-comms-draft'],
    capabilityOutcomes: ['Communicate under uncertainty safely', 'Assign ownership without blame theater'],
    relatedConceptIds: ['observability-signals'],
    kbAnchors: { primaryLessonSlug: 'incident-response-triage-and-severity-thinking' },
  },
  {
    id: 'content-editing-accuracy-and-voice',
    libraryId: 'content_publishing',
    title: 'Editing for accuracy, coherence, and human voice (especially with AI drafts)',
    explanation:
      'Editing is verification work: tighten claims, align structure to intent, preserve voice, and expose limits—especially when drafting tools accelerate output volume.',
    keywords: ['edit', 'accuracy', 'voice', 'review', 'publish', 'claims'],
    lessonSlugs: ['review-and-quality-editing-for-accuracy-and-coherence', 'review-and-quality-avoiding-generic-or-shallow-content'],
    misconceptions: ['“Grammar fixes equal correctness.”', '“AI edits are publication-ready.”'],
    workedExample:
      'A draft asserts performance improvements without sources: convert claims to ranges + methodology notes, or remove them; add “what we did not measure.”',
    revisionAnchor: 'Highlight every sentence that implies certainty without evidence—fix or qualify.',
    commonQuestions: ['How do I keep voice while tightening claims?', 'What belongs in a final review pass?'],
    relatedLabIds: ['lab-publish-outline-to-teaching-brief'],
    capabilityOutcomes: ['Edit for epistemic hygiene', 'Separate polish from verification'],
    relatedConceptIds: ['content-intent-and-usefulness'],
    kbAnchors: { primaryLessonSlug: 'review-and-quality-editing-for-accuracy-and-coherence' },
  },
  {
    id: 'ml-applied-recommendations-and-personalization',
    libraryId: 'machine_learning',
    title: 'Recommendations and personalization: constraints, fairness, and measurement',
    explanation:
      'Recommendation systems optimize objectives under constraints—inventory, latency, exploration/exploitation, and sometimes fairness. Product judgment decides what “good” means beyond clicks.',
    keywords: ['recommendations', 'personalization', 'ranking', 'explore', 'exploit', 'fairness'],
    lessonSlugs: ['applied-ml-paths-recommendations', 'applied-ml-paths-personalization', 'applied-ml-paths-forecasting'],
    misconceptions: ['“More data always fixes recommendations.”', '“Engagement equals user wellbeing.”'],
    workedExample:
      'Retail recommendations push irrelevant upsells: audit segment slices, cold-start handling, and whether metrics reward short-term clicks over repeat satisfaction.',
    revisionAnchor: 'Pick one metric you refuse to optimize without a paired guardrail metric.',
    commonQuestions: ['What goes wrong with naive personalization?', 'How do teams evaluate recsys changes safely?'],
    relatedLabIds: [],
    capabilityOutcomes: ['Name common recsys failure modes', 'Pair metrics with guardrails'],
    relatedConceptIds: ['ml-metrics-tradeoffs'],
    kbAnchors: { primaryLessonSlug: 'applied-ml-paths-recommendations' },
  },
  {
    id: 'networking-firewalls-nat-access-paths',
    libraryId: 'networking',
    title: 'Firewalls, NAT, and access paths: where connectivity actually breaks',
    explanation:
      'Many “can’t connect” issues are policy paths: ports, proxies, split tunneling, NAT translations, and identity-aware access—layered checks beat guessing “the server is down.”',
    keywords: ['firewall', 'nat', 'proxy', 'vpn', 'ports', 'access'],
    lessonSlugs: ['everyday-network-reasoning-firewalls-nat-and-access-paths'],
    misconceptions: ['“If DNS resolves, the service must be up.”', '“Opening ports fixes security problems.”'],
    workedExample:
      'Remote users can reach SaaS but not internal API: verify VPN route tables, split tunnel rules, and whether the API requires private DNS or allowlisted egress.',
    revisionAnchor: 'Sketch client→egress→ingress→service path with one falsifier per hop.',
    commonQuestions: ['What is NAT in practical terms?', 'How do proxies change debugging?'],
    relatedLabIds: ['lab-net-dns-connectivity-drill'],
    capabilityOutcomes: ['Debug policy-shaped connectivity issues', 'Ask for the right evidence from IT/platform'],
    relatedConceptIds: ['networking-connectivity-thinking'],
    kbAnchors: { primaryLessonSlug: 'everyday-network-reasoning-firewalls-nat-and-access-paths' },
  },
  ...TEACHING_CONCEPTS_EXPANDED,
  ...TEACHING_CONCEPTS_CURRICULUM_FILL,
  ...TEACHING_CONCEPTS_INTEGRATION_BRIDGES,
  ...TEACHING_CONCEPTS_EXTRA_LENSES,
  ...TEACHING_CONCEPTS_LAYERED_WEAK_LIBS,
  ...TEACHING_CONCEPTS_DISTRIBUTION_BALANCE,
  ...TEACHING_CONCEPTS_STANDALONE_COURSES,
]

export function teachingConceptById(id: string): TeachingConcept | undefined {
  return TEACHING_CONCEPTS.find((c) => c.id === id)
}

export function teachingConceptsForLibrary(libraryId: TeachingLibraryId): TeachingConcept[] {
  return TEACHING_CONCEPTS.filter((c) => c.libraryId === libraryId)
}

export function indexTeachingConceptKeywords(): Map<string, TeachingConcept[]> {
  const map = new Map<string, TeachingConcept[]>()
  for (const concept of TEACHING_CONCEPTS) {
    const keys = [...concept.keywords, ...concept.title.toLowerCase().split(/\s+/g)]
    for (const raw of keys) {
      const k = raw.toLowerCase().replace(/[^a-z0-9]+/g, '')
      if (!k || k.length < 3) continue
      const cur = map.get(k) ?? []
      if (!cur.some((c) => c.id === concept.id)) cur.push(concept)
      map.set(k, cur)
    }
  }
  return map
}
