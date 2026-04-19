import type { TeachingLab } from './teachingTypes'

/** Non-AI curriculum labs — default to signed-in workspace continuity (distinct from AI public starters). */
export const NON_AI_TEACHING_LABS: TeachingLab[] = [
  {
    id: 'lab-ml-diagnose-leakage-risk',
    libraryId: 'machine_learning',
    kind: 'practice',
    labAccess: 'signed_in',
    learningObjective:
      'Prove you can narrate train/serve leakage pathways with causal specificity and specify process-level mitigations—not metric tweaks.',
    title: 'Spot leakage risk in a toy dataset story',
    summary:
      'Practice identifying suspicious signals that suggest train/test contamination or unrealistic shortcuts—and forcing mitigations that change pipelines, not hyperparameters.',
    scenario:
      'Synthetic dataset story (fiction): `user_region`, `signup_source`, `account_age_days`, `email_domain_hash`, `support_ticket_count`, `days_since_last_login`, `label_churn_next_30d`. Holdout AUC is 0.94; train AUC is 0.93. Leadership wants to ship tomorrow. Your job is to articulate leakage pathways that inflate offline metrics—and what engineering control fixes them—not to tune hyperparameters.',
    lessonSlugs: ['model-quality-and-evaluation-data-leakage', 'machine-learning-foundations-training-validation-and-testing'],
    conceptIds: ['ml-supervised-basics'],
    prerequisites: [],
    instructions: [
      'Restate what “too good” means here (what metric, what split story, what deployment reality).',
      'For each suspicious feature/column group: explain the causal pathway from label → shortcut (not vibes).',
      'Separate “could exist at prediction time” vs “would never exist cleanly in production ingestion.”',
      'Write mitigations as pipeline/governance steps (embargo windows, split redesign, drop rules), not “more CV folds.”',
    ],
    task: 'Deliver 6 bullets minimum: 3 leakage risks tied to named fields/groups + 3 mitigations each mapped to an operational change.',
    learnerInputs: [
      {
        id: 'story',
        label: 'Scenario restatement (your words)',
        guidance:
          'Include decision stakes (what happens if we ship), what metric is reported, and why the split story matters.',
      },
      {
        id: 'risks',
        label: 'Three leakage risks',
        guidance:
          'Each risk names concrete fields/groups + how it leaks label information or creates impossible production parity.',
      },
      {
        id: 'mitigations',
        label: 'Three mitigations',
        guidance:
          'Operational mitigations: splits, embargo features, labeling rules, dedupe logic, pipeline joins—avoid “collect more data.”',
      },
      {
        id: 'falsifiers',
        label: 'Two falsifiers / checks you would run next week',
        guidance:
          'These should be cheap evidence requests (plots, join audit, timestamp checks)—not model complexity.',
      },
    ],
    whatGoodLooksLike: [
      'Leakage tied to concrete columns or joins—and why those signals would not appear the same way in prod.',
      'Mitigations change process/governance, not only hyperparameters.',
      'You explicitly discuss prediction-time availability of each risky feature group.',
    ],
    commonMistakes: [
      'Claiming leakage without a causal story.',
      'Assuming shuffling fixes time leakage.',
      'Confusing correlation with leakage without a production-time story.',
    ],
    reviewCriteria: [
      'Would an engineer accept your leakage narrative without asking “so what?”',
      'Are mitigations feasible next sprint (not fantasy tooling)?',
    ],
    rubric: ['Causal specificity (35%)', 'Prediction-time realism (25%)', 'Mitigation operability (25%)', 'Honesty about unknowns (15%)'],
    reflectionPrompts: ['Which shortcut would tempt a rushed team most—and what meeting would you force before shipping?'],
    remediation: [
      'If mitigations are “more data,” rewrite into a concrete pipeline change with owners.',
      'If leakage is hypothetical, downgrade claims until evidence exists—and list the evidence you would collect.',
      'If you cannot name what changes at scoring time vs training time, rewrite one section focusing only on time-travel.',
    ],
    nextSteps: [
      'Revisit `model-quality-and-evaluation-data-leakage` and rewrite your risk bullets into a one-page review checklist for future datasets.',
      'Pair with `model-quality-and-evaluation-error-analysis-in-practice` when you have a real model project.',
    ],
    hint: 'Ask: “Could this feature exist at prediction time in production, with the same semantics and latency?” If unsure, flag it.',
    hintStrong:
      'Pick ONE column group and force yourself to narrate label information flow step-by-step (who writes it, when, using what rule). If you cannot draw the pipeline diagram in words, you do not yet have leakage—only suspicion.',
  },
  {
    id: 'lab-ml-metrics-by-scenario',
    libraryId: 'machine_learning',
    kind: 'guided',
    labAccess: 'signed_in',
    learningObjective:
      'Pick metrics and early diagnostics from stakeholder costs—not table stakes—before threshold tuning debates begin.',
    title: 'Pick metrics for three deployment scenarios',
    summary:
      'Translate costs of false positives vs false negatives into metric priorities, thresholds philosophy, and what you plot first.',
    scenario:
      'Stakeholders ask for “high accuracy.” You must translate asymmetric costs into metric priorities—before anyone tunes thresholds or buys tooling. Each scenario below has a different mistake asymmetry and base rate.',
    lessonSlugs: [
      'model-quality-and-evaluation-accuracy-precision-recall-and-f1',
      'model-quality-and-evaluation-when-accuracy-misleads',
    ],
    conceptIds: ['ml-metrics-tradeoffs'],
    prerequisites: [],
    instructions: [
      'Scenario A (content moderation): missing harmful content is catastrophic; false positives frustrate creators—define costs in operational terms.',
      'Scenario B (spam filtering): false positives bury important mail; false negatives increase risk—choose metrics aligned to inbox productivity.',
      'Scenario C (rare disease screening): prevalence is tiny—accuracy is a trap; specify what “good” means clinically and operationally.',
      'For each scenario: primary metric(s), secondary diagnostics, and what decision the metric supports (approve model? change gate?).',
    ],
    task: 'For each scenario: primary metric(s), why (tie to FP/FN costs), one plot/table/confusion slice you inspect in week one, and what action it triggers.',
    learnerInputs: [
      {
        id: 'scenario_a',
        label: 'Scenario A — metrics + diagnostics + decision trigger',
        guidance:
          'Include at least one operational cost (reviewer load, creator harm) and connect it to precision/recall thinking.',
      },
      {
        id: 'scenario_b',
        label: 'Scenario B — metrics + diagnostics + decision trigger',
        guidance: 'Explicitly discuss false positive pain vs false negative pain for email workflows.',
      },
      {
        id: 'scenario_c',
        label: 'Scenario C — metrics + diagnostics + decision trigger',
        guidance:
          'Discuss prevalence and why accuracy misleads—name a prevalence-aware framing (not vibes) and what you monitor.',
      },
    ],
    whatGoodLooksLike: [
      'Metric choice references stakeholder costs and mistake asymmetry.',
      'You acknowledge class imbalance/base rate where relevant.',
      'Diagnostics connect to decisions (what would you change based on the slice?).',
    ],
    commonMistakes: [
      'Choosing accuracy by default.',
      'Ignoring operational costs of false alarms.',
      'Listing metrics without tying them to decisions.',
    ],
    reviewCriteria: ['Coherent tradeoff story', 'Confusion-matrix realism', 'Decision linkage'],
    rubric: ['Cost grounding (35%)', 'Metric↔mistake mapping (30%)', 'Diagnostic operability (25%)', 'Honesty about unknowns (10%)'],
    reflectionPrompts: ['Where would you push back on a stakeholder demanding accuracy? What sentence would you use?'],
    remediation: [
      'If any scenario lacks explicit FP/FN costs, rewrite costs before metrics.',
      'If diagnostics are vague (“watch metrics”), pick one concrete slice (queue, cohort, confidence bin).',
    ],
    nextSteps: [
      'Sketch a confusion matrix interpretation for Scenario C with realistic prevalence assumptions.',
      'Return to `model-quality-and-evaluation-when-accuracy-misleads` and upgrade your notes with three “accuracy trap” phrases you will challenge in meetings.',
    ],
    hint: 'If costs are asymmetric, a single accuracy number is almost always misleading.',
    hintStrong:
      'For each scenario, write one sentence: “A false positive costs X because…” and “A false negative costs Y because…”. If you cannot, you are not ready to pick a metric—only a score.',
  },
  {
    id: 'lab-chatbot-scope-and-escalation',
    libraryId: 'chatbots',
    kind: 'practice',
    labAccess: 'signed_in',
    learningObjective:
      'Ship a defensible scope/escalation policy that operators can follow under stress—before flows, models, or vendor bake-offs.',
    title: 'Write scope + escalation rules on one page',
    summary:
      'Make bot boundaries explicit: what it handles, what it refuses, and how humans enter—so “helpful” does not become “dangerous.”',
    scenario:
      'Leadership wants a bot “that answers everything.” You know undefined scope creates incidents, compliance risk, and toxic user experiences. Produce a tight policy before architecture debates. Your audience is frontline staff and the security lead—not an LLM demo.',
    lessonSlugs: [
      'building-the-bot-logic-defining-scope-and-boundaries',
      'safety-trust-and-responsibility-chatbots-human-escalation-when-needed',
    ],
    conceptIds: ['chatbot-rules-vs-llm'],
    prerequisites: ['Pick one support scenario (billing question, IT triage, FAQ) and stay in it—no omnibot.'],
    instructions: [
      'Define allowed intents + required confirmations (what must be true before the bot answers).',
      'Write refusal templates for unsafe or out-of-scope asks (short, boring, repeatable).',
      'Define escalation triggers using observable cues (keywords, repeated failures, sensitive topics list, explicit human request).',
      'Specify logging expectations: what is captured for audit/debug without storing secrets.',
      'Include a “failure budget”: what happens when confidence is medium (clarifying questions vs escalate).',
    ],
    task: 'Deliver a one-page policy: scope, confirmations, refusals, escalation, logging, and medium-confidence behavior.',
    learnerInputs: [
      {
        id: 'allowed',
        label: 'Allowed intents + confirmations',
        guidance:
          'Each intent includes user goal, bot responsibility boundary, and what evidence the bot may request before proceeding.',
      },
      {
        id: 'refusals',
        label: 'Refusal templates',
        guidance:
          'Provide 3 templates: medical/legal/financial-style refusal, sensitive data refusal, “cannot verify” refusal.',
      },
      {
        id: 'escalation',
        label: 'Escalation triggers + routing + SLAs',
        guidance:
          'Triggers must be observable (not “when AI is unsure”). Include destination role/channel and what the human receives.',
      },
      {
        id: 'logging',
        label: 'Logging / retention boundaries',
        guidance: 'What you log, what you refuse to retain, and how operators detect incidents.',
      },
    ],
    whatGoodLooksLike: [
      'Humans have a clear on-ramp with routing that works when chat volume spikes.',
      'Refusals are boring, explicit, and safe—no debating the user.',
      'Medium-confidence behavior is defined (not hidden behind model vibes).',
    ],
    commonMistakes: [
      'Promising outcomes the bot cannot verify.',
      'Escalation paths that dead-end.',
      'Scope creep disguised as “helpfulness.”',
    ],
    reviewCriteria: ['Could support staff follow it tomorrow?', 'Are risky topics explicitly routed?', 'Does logging respect sensitive data boundaries?'],
    rubric: ['Operational clarity (30%)', 'Safety routing (30%)', 'Observable triggers (25%)', 'Auditability (15%)'],
    reflectionPrompts: ['What question would blow up scope fastest—and what policy line stops it cold?'],
    remediation: [
      'If refusal templates sound argumentative, shorten and remove blame language.',
      'If escalation triggers are vague (“when unsure”), replace with observable cues + measured signals.',
      'If logging includes secrets/PII, rewrite capture fields to redact-first.',
    ],
    nextSteps: [
      'Map the same policy onto rules-first vs LLM-first implementation choices (same boundaries, different mechanics).',
      'Pair with designing conversation flows lesson work: translate triggers into explicit dialog states.',
    ],
    hint: 'If you cannot write the refusal language plainly, the bot should not attempt that domain.',
    hintStrong:
      'Rewrite escalation so a tired agent at 2am can follow it: single trigger → single destination → what to paste into the ticket. If you need multiple paragraphs to explain a trigger, it is not operational.',
  },
  {
    id: 'lab-net-dns-connectivity-drill',
    libraryId: 'networking',
    kind: 'practice',
    labAccess: 'signed_in',
    title: 'DNS-first connectivity drill (hypothesis ladder)',
    summary:
      'Practice turning “the site is down” into testable layers—DNS, routing, TLS—without jumping to conclusions.',
    scenario:
      'Users report intermittent failures reaching a service. You cannot touch prod directly yet—you must draft a hypothesis ladder and safe checks operators could run.',
    lessonSlugs: ['network-foundations-dns-routing-and-switching', 'everyday-network-reasoning-troubleshooting-common-connectivity-issues'],
    conceptIds: [],
    prerequisites: [],
    instructions: [
      'Separate user symptom vs service symptom vs network symptom.',
      'Write DNS-layer checks before application-layer theories.',
      'Identify what evidence falsifies each hypothesis.',
    ],
    task: 'Produce a ladder: symptom → hypothesis → minimal check → falsifier → next hop.',
    learnerInputs: [
      {
        id: 'symptom',
        label: 'Symptom framing (neutral)',
        guidance: 'Avoid blaming “the wifi” without evidence.',
      },
      {
        id: 'ladder',
        label: 'Hypothesis ladder',
      },
      {
        id: 'safety',
        label: 'Safety / permission boundary',
        guidance: 'Note what you would not run without authorization.',
      },
    ],
    whatGoodLooksLike: ['Checks are ordered cheapest-first.', 'Falsifiers exist—no vibes debugging.'],
    commonMistakes: ['Skipping DNS because “it worked yesterday.”', 'Mixing latency with packet loss stories.'],
    reviewCriteria: ['Would an SRE recognize this as sane triage?', 'Are checks minimal?'],
    reflectionPrompts: ['Which hypothesis would you most want to disprove first?'],
    remediation: [
      'If checks require privileged access you lack, rewrite for read-only signals first.',
      'If hypotheses multiply, constrain to one path until falsified.',
    ],
    nextSteps: ['Pair with TLS lesson checks when intermittent errors persist.'],
    hint: 'Write the falsifier next to each hypothesis—otherwise you are storytelling.',
    hintStrong:
      'Pick the cheapest check you can run without privilege and move it earlier in the ladder—if your “minimal check” still needs prod access, you haven’t minimized yet.',
  },
  {
    id: 'lab-sec-phishing-triage-matrix',
    libraryId: 'cybersecurity',
    kind: 'test',
    labAccess: 'signed_in',
    learningObjective:
      'Make approve/forward/escalate/delete decisions from observable cues—bias to safer defaults without shame-by-default culture.',
    title: 'Phishing triage matrix (approve forward / escalate / delete)',
    summary:
      'Decision drill: classify suspicious messages into actions that reduce organizational risk—without outsourcing judgment to vibes or tools you do not have.',
    scenario:
      'Three sanitized suspicious messages arrive in one afternoon: (1) invoice-themed delivery with mismatched domains + urgency; (2) internal “IT helpdesk” prompt asking for MFA approvals; (3) vendor newsletter that suddenly asks you to install an update utility. You cannot train org-wide tooling today—you must decide actions that reduce exposure for normal humans.',
    instructionalSamples: [
      {
        label: 'Message A (excerpt)',
        body: 'Subject: URGENT invoice attached — please approve payment today. Sender display name matches finance; reply-to domain differs subtly from your vendor portal.',
      },
      {
        label: 'Message B (excerpt)',
        body: 'Hi — IT needs you to approve the Duo prompt we just sent so we can restore your mailbox access.',
      },
      {
        label: 'Message C (excerpt)',
        body: 'Monthly vendor newsletter… new “performance utility” speeds up approvals — download here.',
      },
    ],
    lessonSlugs: ['practical-security-habits-phishing-and-social-engineering'],
    conceptIds: [],
    prerequisites: [],
    instructions: [
      'For each message pick ONE primary action: escalate to security / warn via trusted channel / delete + report / benign handling with monitoring.',
      'List two observable cues that drove the decision (headers, domain mismatch, tone, unexpected channel).',
      'Note any missing info you would still escalate anyway—and what you refuse to do while uncertain (click, install, approve MFA).',
      'Add a “safe default” line: what a non-expert should do when unsure.',
    ],
    task: 'Provide a classification table with rationale grounded in cues—not fear—and include your safer-default rule for uncertainty.',
    learnerInputs: [
      {
        id: 'matrix',
        label: 'Message × decision × cues',
        guidance:
          'Each row includes action + two cues + what you refuse to do + what evidence you would collect before clicking.',
      },
      {
        id: 'escalation_path',
        label: 'Escalation path you would actually use',
        guidance:
          'Use your org’s expectation language if known; otherwise describe responsible generic path (security inbox, IT ticket, manager loop).',
      },
      {
        id: 'failure',
        label: 'Most likely mistake analysts make here',
        guidance:
          'Name a failure pattern you will guard against (shaming users, hero clicking, “trusted vendor” drift).',
      },
    ],
    whatGoodLooksLike: [
      'Actions reduce exposure; no hero clicking or credential surrender.',
      'Cues are observable words/behaviors—usable in training others.',
      'Uncertainty behavior is explicit (pause, verify via trusted channel).',
    ],
    commonMistakes: [
      'Training users to shame peers.',
      'Ignoring benign-but-suspicious vendor drift.',
      'Escalating everything (noise) or nothing (complacency).',
    ],
    reviewCriteria: ['Would security teams recognize decisions?', 'Are cautious defaults explicit?', 'Is uncertainty handled responsibly?'],
    rubric: ['Cue grounding (35%)', 'Safe default bias (25%)', 'Escalation clarity (25%)', 'Failure-mode honesty (15%)'],
    reflectionPrompts: ['When did fear bias your escalation threshold—and what rule would prevent both panic and denial?'],
    remediation: [
      'If decisions contradict each other across similar cues, rewrite cue definitions until two analysts would agree.',
      'If you lack escalation path, stop at “collect evidence + escalate”—do not invent authority.',
      'If your policy shames users, rewrite into neutral language + clear alternative actions.',
    ],
    nextSteps: [
      'Revisit `practical-security-habits-phishing-and-social-engineering` and convert your safer-default rule into a 5-line team micro-drill.',
      'Pair with broader incident response lessons when you need cross-team coordination patterns.',
    ],
    hint: 'If cues are emotional (“felt off”), translate into observable signals.',
    hintStrong:
      'For each message, answer: “What is the smallest irreversible action?” (click, approve MFA, run installer). If your plan still includes that action under uncertainty, rewrite the plan—do not rewrite the justification.',
  },
  {
    id: 'lab-cloud-deploy-failure-postmortem-lite',
    libraryId: 'cloud_devops',
    kind: 'guided',
    labAccess: 'signed_in',
    learningObjective:
      'Turn a messy partial rollout into a blameless, artifact-backed narrative with early stop signals and testable guardrails.',
    title: 'Deploy failure postmortem-lite (no blame, lots of constraints)',
    summary:
      'Practice extracting durable fixes from a failed deploy story—environment parity, artifact provenance, credentials/roles, rollout sequencing—without moralizing.',
    scenario:
      'A deploy failed halfway: API v2 rolled to 40% of nodes while workers remained on v1 schema assumptions. Symptoms: intermittent 500s, partial writes, customers see flaky behavior. Leadership wants answers today. You cannot access everything—still draft a blameless postmortem skeleton focused on constraints, artifacts, and signals that should have stopped the rollout earlier.',
    lessonSlugs: ['applied-platform-work-debugging-build-and-deploy-failures'],
    conceptIds: [],
    prerequisites: [],
    instructions: [
      'Impact: user-visible symptoms + blast radius + duration (best-effort, honest unknowns).',
      'Timeline with artifacts (commits, images, configs, rollout controller events)—placeholders ok if access missing.',
      'Identify the earliest moment you should have stopped the rollout—name the signal you would watch next time.',
      'Proximate cause vs contributing factors: separate “what broke” from “why safeguards didn’t fire.”',
      'Two guardrails: each must be testable in CI/CD or release policy (not “be more careful”).',
    ],
    task: 'Deliver postmortem-lite sections: impact, timeline, earliest stop point, proximate cause, contributing factors, two guardrails with acceptance tests.',
    learnerInputs: [
      {
        id: 'impact',
        label: 'User-visible impact',
        guidance: 'Include who was affected, what they saw, and what data integrity risks exist (if unknown, say so).',
      },
      {
        id: 'timeline',
        label: 'Timeline + earliest stop point',
        guidance: 'Anchor events to artifacts (build id, image digest, rollout step). Mark unknowns explicitly.',
      },
      {
        id: 'cause',
        label: 'Proximate cause + contributing factors',
        guidance:
          'Avoid moral blame; include environment drift, missing contract tests, missing canary signal, permission mistakes—only if supported by narrative.',
      },
      {
        id: 'guardrails',
        label: 'Two guardrails (testable)',
        guidance:
          'Example patterns: schema migration gate, compatibility contract test, automated rollback trigger, progressive delivery criteria.',
      },
    ],
    whatGoodLooksLike: [
      'Stop point is early and concrete—tied to an observable signal.',
      'Guardrails change process with checks—not slogans.',
      'Unknowns are visible (no false precision).',
    ],
    commonMistakes: [
      'Root cause = “human error.”',
      'Fix is “more communication” without mechanisms.',
      'Mixing proximate cause with blame.',
    ],
    reviewCriteria: ['Would platform folks accept this?', 'Are guardrails measurable?', 'Are artifacts credible?'],
    rubric: ['Artifact discipline (30%)', 'Earliest-stop realism (25%)', 'Guardrail testability (30%)', 'Honesty about unknowns (15%)'],
    reflectionPrompts: ['Which signal arrived too late—how would you surface it earlier next sprint?'],
    remediation: [
      'If timeline lacks artifacts, insert placeholders you would fetch with access + owners.',
      'If guardrails need budget, split into now vs next sprint with explicit tradeoff.',
      'If proximate cause is vague, rewrite as a chain: event → mechanism → failure mode.',
    ],
    nextSteps: [
      'Connect to CI/CD / progressive delivery lessons for pipeline-stage gates that match your guardrails.',
      'Re-read `applied-platform-work-debugging-build-and-deploy-failures` and update your notes with one rollback metric you will monitor on every deploy.',
    ],
    hint: 'If you cannot name an artifact, you do not have a timeline—you have a story.',
    hintStrong:
      'Force one guardrail to be automated (a test, a gate, a canary threshold). If both guardrails are process-only, rewrite the weakest into a mechanical check—otherwise you’ll repeat the story with fresher jargon.',
  },
  {
    id: 'lab-observe-incident-comms-draft',
    libraryId: 'monitoring',
    kind: 'practice',
    labAccess: 'signed_in',
    title: 'Incident comms draft (severity-aware, facts-first)',
    summary:
      'Practice writing stakeholder updates under uncertainty—without pretending certainty.',
    scenario:
      'An incident is active; facts are partial. You must draft internal comms that enable coordination without leaking blame or speculative root causes.',
    lessonSlugs: ['incident-response-communication-during-incidents'],
    conceptIds: [],
    prerequisites: [],
    instructions: [
      'Start with impact + scope boundaries.',
      'Separate facts vs hypotheses vs mitigations in progress.',
      'Close with next update cadence.',
    ],
    task: 'Draft two messages: internal team channel + executive summary (both short).',
    learnerInputs: [
      {
        id: 'internal',
        label: 'Internal coordination message',
      },
      {
        id: 'exec',
        label: 'Executive summary',
      },
      {
        id: 'unknowns',
        label: 'Explicit unknowns / next probes',
      },
    ],
    whatGoodLooksLike: ['Hypotheses labeled as hypotheses.', 'Mitigations observable.'],
    commonMistakes: ['Premature root cause.', 'Vanishing updates under stress.'],
    reviewCriteria: ['Would on-call trust this?', 'Does exec summary avoid jargon soup?'],
    reflectionPrompts: ['Where might your wording amplify panic?'],
    remediation: [
      'If exec summary includes root cause language, rewrite facts-only.',
      'If internal note lacks owners, add explicit DRI/next step.',
    ],
    nextSteps: ['Pair with stabilization lesson for coordination habits after comms.'],
    hint: 'Cadence beats perfection—say when you will update next.',
    hintStrong:
      'Separate facts/hypotheses/mitigations into three labeled paragraphs—if they blend, rewrite until each sentence has exactly one category.',
  },
  {
    id: 'lab-publish-outline-to-teaching-brief',
    libraryId: 'content_publishing',
    kind: 'guided',
    labAccess: 'signed_in',
    title: 'Outline → teaching brief (audience-intent locked)',
    summary:
      'Turn scattered ideas into a brief that teaches—not just informs—without hype.',
    scenario:
      'You need a brief teammates can learn from quickly. Promotion-flavored language will waste their time; clarity and checks win.',
    lessonSlugs: ['drafting-and-idea-development-building-better-outlines', 'content-foundations-matching-content-to-audience-need'],
    conceptIds: [],
    prerequisites: [],
    instructions: [
      'Define audience intent in one sentence (learn / decide / do).',
      'Build outline with checks: prerequisite knowledge, pitfalls, examples.',
      'Write a brief draft under tight length with explicit “what not to conclude.”',
    ],
    task: 'Deliver outline + brief + anti-patterns section.',
    learnerInputs: [
      {
        id: 'intent',
        label: 'Audience intent',
      },
      {
        id: 'outline',
        label: 'Outline with prerequisites & pitfalls',
      },
      {
        id: 'brief',
        label: 'Brief draft',
      },
    ],
    whatGoodLooksLike: ['Intent matches structure.', 'Anti-patterns reduce misuse.'],
    commonMistakes: ['Teaching brief reads like marketing.', 'No bounded claims.'],
    reviewCriteria: ['Would a busy teammate finish it?', 'Are pitfalls honest?'],
    reflectionPrompts: ['What would a careless reader wrongly conclude?'],
    remediation: [
      'If brief exceeds length, cut examples—not checks.',
      'If tone drifts promotional, rewrite sentences into tests readers can apply.',
    ],
    nextSteps: ['Reuse the brief across short-form/long-form lesson formats.'],
    hint: 'If you cannot state “what not to conclude,” you do not yet understand your risk.',
    hintStrong:
      'Cut one section entirely if it doesn’t change the reader’s decision—briefs fail from hiding decisions behind context, not missing adjectives.',
  },
]
