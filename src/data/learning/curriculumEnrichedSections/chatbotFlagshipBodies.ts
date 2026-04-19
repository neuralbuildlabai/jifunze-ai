/**
 * Hand-authored reader depth for flagship Everyday Chatbots paths (orientation + bot types).
 */
import type { PublicStarterLessonSection } from '../../publicStarterLibraries/aiFoundations'

export const ENRICHED_CHATBOT_FLAGSHIP_SECTIONS_BY_SLUG: Record<string, PublicStarterLessonSection[]> = {
  'chatbots-in-everyday-life-what-a-chatbot-is-and-what-it-is-not': [
    {
      heading: 'Definition that matches real systems',
      paragraphs: [
        'A chatbot is an interactive system that maintains a conversational interface (text/voice) to help users accomplish tasks or find information. It may be mostly rules, mostly retrieval, ML-assisted generation, or a deliberate hybrid—the technology mix matters less than boundaries, monitoring, and failure handling.',
        'What it is not: a proof of understanding, a guarantee of correctness, or a substitute for policy, privacy review, or human accountability—especially when outputs shape money, health, safety, or legal outcomes.',
      ],
    },
    {
      heading: 'Worked contrast: three bots you have actually met',
      paragraphs: [
        'Rules-first FAQ bot: predictable, auditable, brittle language. LLM-assisted triage bot: flexible language, needs guardrails and escalation. Human-handoff bot: mostly routing—success is measured by time-to-human and quality of context passed forward.',
        'For each archetype, write one sentence on what “good” looks like to the user (clarity, safe denial, fast escalation).',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“If it talks smoothly, it knows things.” Fluency correlates weakly with correctness; confidence language can be manufactured.',
        '“Chatbot = customer service only.” Bots appear in internal IT, HR policy navigation, developer docs, education, and creative tooling—risk profiles differ.',
      ],
    },
    {
      heading: 'Judgment checkpoint',
      paragraphs: [
        'Pick a bot you used this month. Name its likely failure mode (wrong answer, wrong tone, stuck loop, unsafe advice) and what safeguard you would add before scaling it.',
      ],
    },
  ],

  'chatbots-in-everyday-life-why-chatbots-are-now-part-of-everyday-digital-life': [
    {
      heading: 'Why prevalence jumped: economics + language interfaces',
      paragraphs: [
        'Language is the lowest-friction UI for many tasks; messaging channels are where users already are; LLMs reduced the cost of handling messy phrasing—provided teams invest in safety and evaluation.',
        'Prevalence also means compounding harm if trust UX is sloppy: users assume competence across domains unless you constrain scope loudly.',
      ],
    },
    {
      heading: 'Worked example: support load shifting',
      paragraphs: [
        'A reasonable goal is deflection with safety: resolve simple intents cheaply while escalating ambiguous or high-impact intents early. Measure containment *and* escalation quality—never containment alone.',
        'Draft three intents that should never be “contained” by automation in your industry without human review.',
      ],
    },
    {
      heading: 'Thin narratives',
      paragraphs: [
        '“Bots reduce headcount automatically.” Ops reality: you shift work to supervision, content maintenance, analytics, and incident response.',
        '“Users prefer bots.” Users prefer fast correct resolution; channel matters less than outcomes.',
      ],
    },
    {
      heading: 'Application',
      paragraphs: [
        'List two tasks where chat is a worse UI than a structured form—and explain why.',
      ],
    },
  ],

  'chatbots-in-everyday-life-where-people-already-meet-chatbots-every-day': [
    {
      heading: 'Ubiquitous surfaces',
      paragraphs: [
        'Common places: banking and telco support, ecommerce order tracking, airline changes, workplace IT portals, healthcare scheduling (with jurisdiction-specific constraints), education platforms, and developer documentation assistants.',
        'Each domain brings different compliance expectations and different costs for wrong answers—copy/paste patterns across domains is a design smell.',
      ],
    },
    {
      heading: 'Worked mapping exercise',
      paragraphs: [
        'Choose two domains (e.g., retail vs healthcare-adjacent). For each, list one user harm from a wrong answer and one mitigation (disclosure, refusal, escalation).',
      ],
    },
    {
      heading: 'Confusions',
      paragraphs: [
        '“Voice assistant equals chatbot.” Voice adds ASR errors, ambient noise, and safety-critical mishears—design must differ.',
        '“Embedded chat is optional UX.” For many products, chat is part of trust and accessibility—treat it as product-critical.',
      ],
    },
    {
      heading: 'Mini audit',
      paragraphs: [
        'Find a public bot interaction (sanitized). Identify where it constrained scope well vs where it implied expertise it could not verify.',
      ],
    },
  ],

  'chatbots-in-everyday-life-why-businesses-learners-and-creators-cannot-ignore-them': [
    {
      heading: 'Stakeholders see different risks',
      paragraphs: [
        'Businesses: cost-to-serve, conversion, brand risk. Learners: clarity, motivation, and avoiding false authority. Creators: audience trust and platform policy compliance.',
        'Ignoring chatbots does not remove exposure—users already bring chat expectations from other products.',
      ],
    },
    {
      heading: 'Worked scenario triangle',
      paragraphs: [
        'Pick a simple creator use case (FAQ on a course page). Define business metric (time saved), learner metric (understanding), creator metric (trust). Note conflicts (fast answers vs careful explanations).',
      ],
    },
    {
      heading: 'Weak excuses',
      paragraphs: [
        '“We will add a bot later.” Later usually inherits rushed prompts and missing evaluation hooks.',
        '“Our audience is smart.” Expert users spot subtle wrong answers faster—and punish brands harder.',
      ],
    },
    {
      heading: 'Decision memo prompt',
      paragraphs: [
        'Write five bullets for leadership: objective, non-goals, escalation policy, measurement plan, monthly review triggers.',
      ],
    },
  ],

  'chatbots-in-everyday-life-chatbots-for-customer-support': [
    {
      heading: 'Support bots win on routing and retrieval, not persuasion',
      paragraphs: [
        'Effective patterns: confirm intent, gather minimal structured fields, retrieve authoritative snippets, provide ticket IDs, and escalate with transcript context.',
        'Risky patterns: negotiating refunds beyond policy, guessing account details, fabricating policies—often LLM failure modes.',
      ],
    },
    {
      heading: 'Worked flow sketch',
      paragraphs: [
        'Draft a rules-first skeleton for “where is my order?” with slots (order id, email last4), safe refusal lines, and a human escalation trigger if sentiment spikes or VIP tier.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Longer conversations mean better UX.” Length often signals confusion—optimize for resolution steps and clarity.',
        '“Automation rate equals success.” High containment with rising complaints is a failure.',
      ],
    },
    {
      heading: 'Quality rubric',
      paragraphs: [
        'Define “good handoff”: what metadata must arrive with the user to prevent repeating questions?',
      ],
    },
  ],

  'chatbots-in-everyday-life-chatbots-for-learning-and-revision': [
    {
      heading: 'Pedagogy constraints for conversational tutors',
      paragraphs: [
        'Learning bots should scaffold: prerequisites, checks for understanding, misconceptions, practice prompts, and citations to curriculum—not open-ended tutoring claims without boundaries.',
        'Hallucinated citations are especially harmful here; tie answers to lesson IDs, quoted passages, or structured objectives.',
      ],
    },
    {
      heading: 'Worked instructional pattern',
      paragraphs: [
        'Micro-loop: diagnose misconception → short explanation → one practice item → reveal solution → spaced revisit suggestion.',
        'Write one practice question for a lesson you teach that cannot be answered by generic platitudes.',
      ],
    },
    {
      heading: 'Avoid',
      paragraphs: [
        '“Grade-like certainty” without rubric. Provide uncertainty and invite instructor verification when stakes matter.',
      ],
    },
    {
      heading: 'Assessment angle',
      paragraphs: [
        'Explain why “Socratic tutoring” bots still need retrieval grounding in your platform content—two sentences.',
      ],
    },
  ],

  'chatbots-in-everyday-life-chatbots-for-scheduling-guidance-and-help': [
    {
      heading: 'Scheduling is part tool integration, part policy',
      paragraphs: [
        'Good bots clarify time zones, confirm constraints, avoid double-booking, and integrate calendars with explicit consent. Failure modes include inventing openings and mishandling recurring rules.',
      ],
    },
    {
      heading: 'Worked safeguards',
      paragraphs: [
        'Require confirmation before writes, show calendar snippets from APIs (not generated text), and keep an audit trail for changes.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Natural language makes scheduling easier for everyone.” Some users prefer forms; offer both.',
      ],
    },
    {
      heading: 'Scenario',
      paragraphs: [
        'User asks to “move all meetings Tuesday.” List ambiguities you must clarify before executing.',
      ],
    },
  ],

  'chatbots-in-everyday-life-chatbots-for-content-and-productivity-support': [
    {
      heading: 'Productivity bots inherit IP and confidentiality risk',
      paragraphs: [
        'Drafting assistants can leak sensitive material into prompts; retrieval assistants can expose docs without ACL checks. Depth means engineering: permissions, redaction, DLP triggers, and user education.',
      ],
    },
    {
      heading: 'Worked policy contrast',
      paragraphs: [
        'Internal wiki bot vs public marketing bot: different grounding corpora, different tone rules, different escalation paths.',
      ],
    },
    {
      heading: 'Thin reasoning',
      paragraphs: [
        '“Just connect the LLM to Google Drive.” ACL-aware retrieval is non-trivial; naive implementations overexpose files.',
      ],
    },
    {
      heading: 'Operational checklist',
      paragraphs: [
        'List three pieces of metadata you want logged for each assistant answer in a workplace setting—justify privacy vs debuggability.',
      ],
    },
  ],

  'types-of-chatbots-what-a-rules-based-chatbot-looks-like': [
    {
      heading: 'Rules bots are explicit graphs of intent → action',
      paragraphs: [
        'You typically see intents, entities (slots), branching, canned responses, and deterministic APIs. Strength: predictability and auditability. Weakness: brittleness when users vary language unless you invest in NLU coverage.',
      ],
    },
    {
      heading: 'Worked skeleton',
      paragraphs: [
        'Sketch nodes: greet → collect order id → validate format → branch success/failure → escalate. Write the failure branch messages users actually see.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Rules bots cannot understand language.” NLU slots exist—rules describe decisions once intents are recognized.',
      ],
    },
    {
      heading: 'Exercise',
      paragraphs: [
        'Identify one intent where buttons outperform free text—forcing user clarity reduces error.',
      ],
    },
  ],

  'types-of-chatbots-decision-trees-and-structured-responses': [
    {
      heading: 'Decision trees encode policy explicitly',
      paragraphs: [
        'Trees shine when regulation requires consistency: refunds, eligibility, standardized disclosures. They fail when policies need nuanced interpretation across edge cases—then hybrid design matters.',
      ],
    },
    {
      heading: 'Worked critique',
      paragraphs: [
        'Pick a deep tree you have suffered through as a user. Diagnose whether failure was policy (bad rules) or UX (hidden backtracking, dead ends). Propose two UX fixes.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Trees without escape hatches trap users—always provide restart, human help, and state what the bot cannot do.',
      ],
    },
    {
      heading: 'Checkpoint',
      paragraphs: [
        'Write an “escape hatch” message that admits limits without sounding dismissive.',
      ],
    },
  ],

  'types-of-chatbots-when-simple-bots-are-enough': [
    {
      heading: 'Simple wins when stakes and variability are bounded',
      paragraphs: [
        'Great fits: FAQs with stable answers, narrow transactional flows, internal tools with strict policies. If language variability is low and errors are cheap, expensive AI layers add risk without benefit.',
      ],
    },
    {
      heading: 'Worked decision grid',
      paragraphs: [
        'Rate a task on: outcome severity, language variability, need for empathy wording, audit needs. High severity + high audit → prefer rules + careful ML assistance, not open-ended generation.',
      ],
    },
    {
      heading: 'Misconception',
      paragraphs: [
        '“Users want smarter bots.” Users want correct, fast resolution—smartness without control is worse.',
      ],
    },
    {
      heading: 'Scenario choice',
      paragraphs: [
        'Approve/reject: “Use LLM for password resets.” Justify with threat model points.',
      ],
    },
  ],

  'types-of-chatbots-limits-of-basic-chatbots': [
    {
      heading: 'Limits are features if you design around them',
      paragraphs: [
        'Basic bots struggle with multi-intent utterances, evolving catalogs without maintenance, empathy without scripting, and multi-turn memory without careful state management.',
      ],
    },
    {
      heading: 'Worked failure catalog',
      paragraphs: [
        'List five user phrases that break naive keyword bots for the same intent—then decide whether NLU, retrieval, or LLM assist is the cheapest fix.',
      ],
    },
    {
      heading: 'Trap',
      paragraphs: [
        'Papering limits with vague apologies trains users to fight the bot—better to escalate early.',
      ],
    },
    {
      heading: 'Remediation',
      paragraphs: [
        'Draft a maintenance plan: weekly intent review, confusion clustering from logs, content owners.',
      ],
    },
  ],

  'types-of-chatbots-ai-chatbots-versus-rules-based-bots': [
    {
      heading: 'Comparison should be about control surfaces, not hype',
      paragraphs: [
        'Rules systems optimize predictability; AI layers help with messy language and synthesis—often best together with a routing layer that chooses safe modes per intent.',
      ],
    },
    {
      heading: 'Worked hybrid diagram (words only)',
      paragraphs: [
        'Inbound message → classify intent → if regulated/policy path: rules + retrieval → if creative/brainstorm path: constrained generation with citations/refusals.',
      ],
    },
    {
      heading: 'Misconceptions',
      paragraphs: [
        '“Hybrid is twice the work.” Operating one unmanaged LLM can be more expensive than explicit routing after incidents count.',
      ],
    },
    {
      heading: 'Design test',
      paragraphs: [
        'Name three intents that must remain rules-primary in your organization—why?',
      ],
    },
  ],

  'types-of-chatbots-how-llm-powered-chatbots-differ': [
    {
      heading: 'LLM bots change failure modes, not responsibilities',
      paragraphs: [
        'They generalize across phrasing and can draft nuanced replies—but they may invent facts unless grounded, and they need evaluation harnesses (golden sets, adversarial prompts, jailbreak checks).',
      ],
    },
    {
      heading: 'Worked safeguards list',
      paragraphs: [
        'Grounding corpora with citations, tool calls with schema validation, automatic refusal classes, human review queues for known sensitive intents.',
      ],
    },
    {
      heading: 'Thin claims',
      paragraphs: [
        '“Prompt engineering fixes safety.” Reduces risk; does not replace monitoring and access control.',
      ],
    },
    {
      heading: 'Assessment',
      paragraphs: [
        'Write a test case where paraphrasing must not change policy outcome—why does that matter?',
      ],
    },
  ],

  'types-of-chatbots-when-ai-improves-the-user-experience': [
    {
      heading: 'AI helps when ambiguity is real and stakes allow iteration',
      paragraphs: [
        'Strong cases: brainstorming with constraints, rewriting for clarity, extracting structure from messy notes—when users can verify outputs quickly.',
        'Weak cases: irreversible actions, regulated advice, or anything requiring authoritative citations without retrieval.',
      ],
    },
    {
      heading: 'Worked UX metric pairing',
      paragraphs: [
        'Pair UX wins with safety metrics: helpfulness ratings + escalation rate + correction rate + policy violations detected.',
      ],
    },
    {
      heading: 'Misconception',
      paragraphs: [
        '“Lower handle time always means better bot.” Could indicate users gave up.',
      ],
    },
    {
      heading: 'Scenario',
      paragraphs: [
        'User asks emotionally charged question. Outline safe response pattern: boundary, empathy without counseling scope creep, offer human resources.',
      ],
    },
  ],

  'types-of-chatbots-risks-of-making-a-bot-too-smart': [
    {
      heading: 'Over-capability without guardrails increases liability',
      paragraphs: [
        'Users infer authority from fluent answers. Scope creep encourages dependency on outputs that were never verified. Teams ship faster than they evaluate—creating silent incident debt.',
      ],
    },
    {
      heading: 'Worked risk register',
      paragraphs: [
        'Entries: jailbreaks, prompt injection via retrieved docs, data exfiltration via tools, toxic outputs, incorrect medical/legal guidance. For each, name one detection and one mitigation.',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        'Marketing promises exceed engineering evaluation—sets users up to trust dangerous answers.',
      ],
    },
    {
      heading: 'Governance prompt',
      paragraphs: [
        'Draft a “minimum viable evaluation” checklist before widening bot scope to new domains.',
      ],
    },
  ],

  'types-of-chatbots-where-machine-learning-fits-in-chatbots': [
    {
      heading: 'ML slots: intent, ranking, personalization, safety scoring',
      paragraphs: [
        'Intent classifiers map text to structured routes; rankers choose help articles; personalization adjusts ordering with fairness considerations; safety models flag policy violations.',
      ],
    },
    {
      heading: 'Worked separation',
      paragraphs: [
        'Explain why training data for intent models must reflect real user language—including messy, multilingual, and adversarial samples.',
      ],
    },
    {
      heading: 'Misconception',
      paragraphs: [
        '“Train once.” Production language shifts; models need monitoring, refresh triggers, and rollback.',
      ],
    },
    {
      heading: 'Exercise',
      paragraphs: [
        'Pick one ML component and specify its label definition—what exactly counts as positive class?',
      ],
    },
  ],

  'types-of-chatbots-intent-recognition-and-pattern-learning': [
    {
      heading: 'Intent recognition is an operational contract',
      paragraphs: [
        'Labels must match routing needs; ambiguous intents need separate “clarification” paths; confusion matrices should drive taxonomy iteration—not only model tweaks.',
      ],
    },
    {
      heading: 'Worked confusion review',
      paragraphs: [
        'Imagine frequent confusion between “billing” and “account access.” Propose taxonomy + utterance changes before retraining.',
      ],
    },
    {
      heading: 'Trap',
      paragraphs: [
        'Chasing accuracy on a stale intent list—sometimes product fixes beat modeling.',
      ],
    },
    {
      heading: 'Checkpoint',
      paragraphs: [
        'Write three clarifying questions the bot should ask when confidence is mid-range.',
      ],
    },
  ],

  'types-of-chatbots-recommendation-and-prediction-in-chatbot-systems': [
    {
      heading: 'Recommendations shape paths—measure side effects',
      paragraphs: [
        'Next-step suggestions can steer users away from necessary escalations or amplify biased patterns (e.g., suggesting premium upsells disproportionately).',
      ],
    },
    {
      heading: 'Worked ethic check',
      paragraphs: [
        'Define a “do not recommend” class for vulnerable scenarios; add logging when recommendations are overridden.',
      ],
    },
    {
      heading: 'Misconception',
      paragraphs: [
        '“Personalization equals better UX.” Can reduce perceived fairness; monitor cohort outcomes.',
      ],
    },
    {
      heading: 'Mini design review',
      paragraphs: [
        'List two metrics that detect harmful personalization beyond click-through.',
      ],
    },
  ],

  'types-of-chatbots-why-not-every-chatbot-needs-full-ml': [
    {
      heading: 'Engineering tradeoffs are economic and ethical',
      paragraphs: [
        'ML adds data pipelines, evaluation debt, explainability challenges, and ongoing drift work. If variability is low or audits require determinism, ML may be the wrong tool.',
      ],
    },
    {
      heading: 'Worked decision',
      paragraphs: [
        'Choose a narrow internal FAQ bot: justify rules + retrieval vs end-to-end generation with total cost of ownership (build, monitor, incidents).',
      ],
    },
    {
      heading: 'Anti-pattern',
      paragraphs: [
        '“ML-first roadmap.” Start from user harms and policy constraints; pick tools accordingly.',
      ],
    },
    {
      heading: 'Final synthesis',
      paragraphs: [
        'Write a one-paragraph architecture stance for your team: when you adopt ML, when you refuse, and how you review that stance quarterly.',
      ],
    },
  ],
}
