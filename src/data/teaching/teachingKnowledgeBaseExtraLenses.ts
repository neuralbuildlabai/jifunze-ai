import type { TeachingConcept } from './teachingTypes'

/**
 * Extra “lens” atoms: deliberate second angles on high-traffic clusters (not wording-only duplicates).
 * Useful for retrieval diversity in help + richer revision prompts.
 */
export const TEACHING_CONCEPTS_EXTRA_LENSES: TeachingConcept[] = [
  {
    id: 'lens-ai-review-for-busy-managers',
    libraryId: 'ai_foundations',
    title: 'Reviewing AI drafts when you are time-boxed (manager lens)',
    explanation:
      'Short reviews should still separate fatal-risk claims from stylistic polish: pick two verification targets (numbers + commitments), ignore voice tweaks until facts are anchored.',
    keywords: ['review', 'manager', 'time', 'risk'],
    lessonSlugs: ['reviewing-and-validating-ai-output-checking-for-accuracy', 'reviewing-and-validating-ai-output-checking-for-completeness'],
    misconceptions: ['“Busy reviewers should trust tone.”', '“Grammar passes equal safe to send.”'],
    workedExample:
      'Two-minute review: verify dates/owners against the source doc; only then edit tone for stakeholders.',
    revisionAnchor: 'Which two claim types get a hard stop before you approve?',
    commonQuestions: ['How do I review fast without skipping risk?', 'What should managers delegate vs verify personally?'],
    relatedLabIds: ['lab-ai-f3-spot-factual-weakness'],
    capabilityOutcomes: ['Run a minimum viable verification pass', 'Escalate when facts are outside your authority'],
    relatedConceptIds: ['review-framework-accuracy-relevance-completeness'],
    kbAnchors: { primaryLessonSlug: 'reviewing-and-validating-ai-output-checking-for-accuracy' },
  },
  {
    id: 'lens-ai-output-for-non-native-english-teams',
    libraryId: 'ai_foundations',
    title: 'Clarity across English fluency levels (collaboration lens)',
    explanation:
      'Fluent English can hide ambiguity: shorter sentences, explicit actors, and labeled lists reduce misalignment across proficiency and cultural inference gaps.',
    keywords: ['clarity', 'fluency', 'communication', 'teams'],
    lessonSlugs: ['ai-for-everyday-knowledge-work-rewriting-for-tone-and-clarity', 'practical-prompting-the-role-of-context-constraints-and-format'],
    misconceptions: ['“Formal tone equals precise meaning.”', '“Everyone shares the same implicit context.”'],
    workedExample:
      'Rewrite a dense paragraph into roles + bullets: who acts, by when, with what dependency—then ask for a quick playback from a teammate.',
    revisionAnchor: 'What ambiguity in your draft would confuse a careful reader skimming on mobile?',
    commonQuestions: ['How do I reduce misreads without sounding cold?', 'What formatting helps globally distributed teams?'],
    relatedLabIds: ['lab-ai-f2-summarize-long-note'],
    capabilityOutcomes: ['Prefer explicit structure over rhetorical polish', 'Design prompts that reduce ambiguity'],
    relatedConceptIds: ['prompt-anatomy'],
    kbAnchors: { primaryLessonSlug: 'ai-for-everyday-knowledge-work-rewriting-for-tone-and-clarity' },
  },
  {
    id: 'lens-ml-metrics-for-stakeholder-meetings',
    libraryId: 'machine_learning',
    title: 'Explaining ML metrics to stakeholders without mystique',
    explanation:
      'Stakeholders need decisions, not jargon: translate metrics into costs (missed fraud vs annoyed customers), show baselines, and expose what the metric cannot see.',
    keywords: ['stakeholders', 'metrics', 'communication', 'costs'],
    lessonSlugs: ['model-quality-and-evaluation-accuracy-precision-recall-and-f1', 'model-quality-and-evaluation-when-accuracy-misleads'],
    misconceptions: ['“Stakeholders want math details first.”', '“One slide with accuracy is enough.”'],
    workedExample:
      'Prepare a one-slide decision frame: baseline, chosen metric, why it maps to costs, and what would change your mind next week.',
    revisionAnchor: 'What single confusion about metrics causes the worst decisions in your org?',
    commonQuestions: ['How do I explain recall without sounding academic?', 'What baseline stops hype?'],
    relatedLabIds: ['lab-ml-metrics-by-scenario'],
    capabilityOutcomes: ['Translate metrics into business tradeoffs', 'Expose blind spots honestly'],
    relatedConceptIds: ['ml-model-quality-accuracy-and-confusion'],
    kbAnchors: { primaryLessonSlug: 'model-quality-and-evaluation-when-accuracy-misleads' },
  },
  {
    id: 'lens-ml-labeling-discipline-foundations',
    libraryId: 'machine_learning',
    title: 'Labels are contracts: why messy labels poison everything downstream',
    explanation:
      'Models learn shortcuts present in labels—ambiguous definitions, inconsistent reviewers, and shifting rules show up as “smart” behavior that breaks in production.',
    keywords: ['labels', 'annotation', 'quality', 'definitions'],
    lessonSlugs: ['machine-learning-foundations-features-labels-and-training-data', 'machine-learning-foundations-why-data-quality-matters'],
    misconceptions: ['“More labelers fixes inconsistency automatically.”', '“We can fix labels later without retraining.”'],
    workedExample:
      'Define a label book with edge cases + two adjudicated examples; measure reviewer disagreement before modeling.',
    revisionAnchor: 'What label definition changed most often on your team last quarter?',
    commonQuestions: ['How do I detect label drift?', 'What belongs in a labeling guide?'],
    relatedLabIds: [],
    capabilityOutcomes: ['Treat labeling as a governance problem', 'Measure disagreement early'],
    relatedConceptIds: ['ml-problem-framing-and-baselines'],
    kbAnchors: { primaryLessonSlug: 'machine-learning-foundations-features-labels-and-training-data' },
  },
  {
    id: 'lens-chatbot-oncall-playbook',
    libraryId: 'chatbots',
    title: 'When the bot becomes an incident: a practical on-call mindset',
    explanation:
      'Bot failures can spike fast: define who owns rollback, how to freeze bad prompts/retrieval corpora, and how to communicate limitations to users while you fix root cause.',
    keywords: ['oncall', 'incident', 'rollback', 'communication'],
    lessonSlugs: ['reviewing-and-improving-chatbot-performance-reviewing-real-user-interactions', 'safety-trust-and-responsibility-chatbots-human-escalation-when-needed'],
    misconceptions: ['“Pause the bot” is always easy.”', '“It is just prompt tuning.”'],
    workedExample:
      'Spike in unsafe answers: switch to conservative responses, disable risky intents, publish a short status note, then review transcripts by tag.',
    revisionAnchor: 'What is the fastest safe degradation mode for your bot?',
    commonQuestions: ['What triggers a bot incident vs normal bugs?', 'What do users need to hear first?'],
    relatedLabIds: [],
    capabilityOutcomes: ['Design a degrade path', 'Coordinate humans under pressure'],
    relatedConceptIds: ['chatbot-reviewing-failure-loops'],
    kbAnchors: { primaryLessonSlug: 'reviewing-and-improving-chatbot-performance-reviewing-real-user-interactions' },
  },
  {
    id: 'lens-chatbot-measurement-beyond-csat',
    libraryId: 'chatbots',
    title: 'Quality metrics that are not CSAT theater',
    explanation:
      'CSAT can reward short happy paths while missing wrong answers. Pair it with task success, escalation quality, confusion rates, and segment slices for high-risk intents.',
    keywords: ['metrics', 'csat', 'quality', 'segments'],
    lessonSlugs: ['reviewing-and-improving-chatbot-performance-helpfulness', 'reviewing-and-improving-chatbot-performance-wrong-or-vague-answers'],
    misconceptions: ['“High ratings mean correct answers.”', '“One KPI is enough for bots.”'],
    workedExample:
      'Add a weekly sample review of “high CSAT but wrong outcome” transcripts—often the fastest quality win.',
    revisionAnchor: 'Which metric would you demote because it rewards the wrong behavior?',
    commonQuestions: ['What is a confusion rate in practice?', 'How do you sample fairly?'],
    relatedLabIds: [],
    capabilityOutcomes: ['Build a balanced bot scorecard', 'Escape vanity metrics'],
    relatedConceptIds: ['chatbot-conversation-design-tone-and-clarity'],
    kbAnchors: { primaryLessonSlug: 'reviewing-and-improving-chatbot-performance-helpfulness' },
  },
  {
    id: 'lens-net-mobile-vpn-split-tunnel',
    libraryId: 'networking',
    title: 'Mobile + VPN + split tunnel: why “same app, different network” happens',
    explanation:
      'Many “works on Wi‑Fi but not LTE” reports are policy and path issues: DNS split, captive portals, and VPN routing differences—not “random app bugs.”',
    keywords: ['vpn', 'split tunnel', 'mobile', 'dns'],
    lessonSlugs: ['everyday-network-reasoning-understanding-latency-and-connectivity', 'modern-infrastructure-networking-hybrid-and-cloud-connectivity'],
    misconceptions: ['“It works on my phone” generalizes globally.”', '“VPN guarantees access.”'],
    workedExample:
      'Reproduce with a controlled test matrix: same account, Wi‑Fi vs LTE, VPN on/off, noting which resolver is used.',
    revisionAnchor: 'What path difference most explains your team’s intermittent issue?',
    commonQuestions: ['How do split tunnels affect corporate DNS?', 'What evidence should users collect?'],
    relatedLabIds: ['lab-net-dns-connectivity-drill'],
    capabilityOutcomes: ['Diagnose mobile networking classes', 'Ask users for comparable evidence'],
    relatedConceptIds: ['networking-hybrid-cloud-connectivity'],
    kbAnchors: { primaryLessonSlug: 'everyday-network-reasoning-understanding-latency-and-connectivity' },
  },
  {
    id: 'lens-sec-vendor-access-reviews',
    libraryId: 'cybersecurity',
    title: 'Third-party access: periodic reviews that actually reduce risk',
    explanation:
      'Vendor risk compounds quietly: stale accounts, excessive scopes, and OAuth grants linger. Reviews should terminate unused access and re-validate business need—not checkbox annualism.',
    keywords: ['vendor', 'access review', 'oauth', 'least privilege'],
    lessonSlugs: ['applied-modern-security-security-in-saas-and-cloud', 'practical-defense-continuation-escalation-and-reporting'],
    misconceptions: ['“Vendors are trusted by default.”', '“Annual audit equals continuous safety.”'],
    workedExample:
      'Quarterly: export admin users + OAuth apps, remove departed employees, downgrade broad roles, and ticket exceptions with expiry.',
    revisionAnchor: 'Which third party would cause the worst breach if compromised today?',
    commonQuestions: ['How do you review SaaS roles cheaply?', 'What is a reasonable exception policy?'],
    relatedLabIds: [],
    capabilityOutcomes: ['Run lightweight access reviews', 'Close common third-party gaps'],
    relatedConceptIds: ['cyber-identity-mfa-basics'],
    kbAnchors: { primaryLessonSlug: 'applied-modern-security-security-in-saas-and-cloud' },
  },
  {
    id: 'lens-observe-runbooks-that-get-used',
    libraryId: 'monitoring',
    title: 'Runbooks people actually follow: minimal steps + decision points',
    explanation:
      'Runbooks fail when they are novels. Good runbooks define triggers, first safe actions, escalation criteria, and “stop if” guards—especially for sleep-deprived responders.',
    keywords: ['runbook', 'incident', 'operations', 'oncall'],
    lessonSlugs: ['incident-response-escalation-and-coordination', 'reliability-and-improvement-building-better-operational-habits'],
    misconceptions: ['“Longer runbooks reduce risk.”', '“Everyone knows step 7.”'],
    workedExample:
      'Rewrite a runbook into 8 steps with explicit decision branches: if X metric, do A; else B; escalate if no change in 10 minutes.',
    revisionAnchor: 'Which step in your current runbook is where teams improvise unsafely?',
    commonQuestions: ['How short can a runbook be?', 'What belongs in escalation criteria?'],
    relatedLabIds: [],
    capabilityOutcomes: ['Build operational runbooks with decision points', 'Reduce cognitive load during incidents'],
    relatedConceptIds: ['observability-reliability-improvement-loop'],
    kbAnchors: { primaryLessonSlug: 'incident-response-escalation-and-coordination' },
  },
  {
    id: 'lens-content-teaching-objects',
    libraryId: 'content_publishing',
    title: 'Teaching objects: outcomes, checks, and practice hooks in public writing',
    explanation:
      'Educational writing works when readers can act: define the outcome, provide a quick self-check, and suggest a minimal practice step—especially when AI speeds drafting throughput.',
    keywords: ['teaching', 'learning', 'checks', 'practice'],
    lessonSlugs: ['drafting-and-idea-development-turning-notes-into-content', 'review-and-quality-keeping-a-human-voice'],
    misconceptions: ['“Information density equals learning.”', '“Voice substitutes for exercises.”'],
    workedExample:
      'End each section with: “Try this for 10 minutes…” plus a rubric learners can self-score.',
    revisionAnchor: 'What would a reader practice if they only had 15 minutes?',
    commonQuestions: ['How do I add learning value without ballooning length?', 'What makes a check meaningful vs busywork?'],
    relatedLabIds: ['lab-publish-outline-to-teaching-brief'],
    capabilityOutcomes: ['Embed lightweight practice in drafts', 'Preserve human voice without fluff'],
    relatedConceptIds: ['content-review-before-publish-checklist'],
    kbAnchors: { primaryLessonSlug: 'drafting-and-idea-development-turning-notes-into-content' },
  },
]
