import type { PublicStarterLessonSection } from '../publicStarterLibraries/aiFoundations'

export type InstructionalPlacement = {
  libraryTitle: string
  categoryTitle: string
  moduleTitle: string
  lessonTitle: string
  lessonSummary: string
  outcomes: string[]
  /** Stable category id from compiled curricula — enables discipline-specific deepening without hand-writing every lesson. */
  categoryId?: string
  /** When set, adds flagship-path teaching moves beyond generic scaffolding (still not a substitute for hand-enriched readers). */
  libraryFamily?: 'ai_foundations' | 'machine_learning' | 'chatbots' | 'cybersecurity' | 'cloud_devops'
}

function disciplineMisconceptionExtras(categoryId?: string): string[] {
  if (!categoryId) return []
  const id = categoryId.toLowerCase()
  if (id.startsWith('network') || id.includes('infrastructure')) {
    return [
      `Domain trap (networking): blaming “Wi‑Fi” or “the internet” before separating **DNS vs route vs TLS vs application** symptoms—each layer has different falsifiers.`,
    ]
  }
  if (id.startsWith('cybersecurity') || id.startsWith('practical-security') || id.startsWith('defensive-thinking')) {
    return [
      `Domain trap (security): confusing **awareness with control**—knowing a threat exists doesn’t mean your defaults, permissions, and reporting paths are actually safe.`,
    ]
  }
  if (id.startsWith('cloud') || id.startsWith('devops') || id.startsWith('platform') || id.startsWith('applied-platform')) {
    return [
      `Domain trap (platform work): treating deploy failures as “random cloud issues” instead of **artifact + sequencing + permissions** constraints you can verify.`,
    ]
  }
  if (id.startsWith('observability') || id.startsWith('reading-and-using-signals') || id.startsWith('incident') || id.startsWith('reliability')) {
    return [
      `Domain trap (operations): dashboard gazing—pretty charts without a written hypothesis and an owner for the next action.`,
    ]
  }
  if (id.startsWith('content') || id.startsWith('drafting') || id.startsWith('formats') || id.startsWith('review-and-quality')) {
    return [
      `Domain trap (publishing): polishing tone while leaving **claims, sources, and limits** unspecified—trust collapses even when sentences sound fluent.`,
    ]
  }
  if (id.startsWith('machine-learning') || id.startsWith('core-ml') || id.startsWith('model-quality') || id.startsWith('practical-ml')) {
    return [
      `Domain trap (ML): trusting a headline metric without slicing by cohort/time—especially when outcomes are rare or asymmetric.`,
    ]
  }
  if (id.startsWith('chatbots') || id.startsWith('types-of-chatbots') || id.startsWith('designing-useful-chatbot')) {
    return [
      `Domain trap (chatbots): expanding conversational scope instead of tightening **intent boundaries, escalation, and logging**.`,
    ]
  }
  return []
}

function disciplineCheckpointExtras(categoryId?: string, topic?: string): string[] {
  const t = topic?.trim() ?? ''
  if (!categoryId) return []
  const id = categoryId.toLowerCase()
  if (id.startsWith('network')) {
    return [
      `Layered checkpoint: write a **3-step ladder** (DNS → reachability/path → TLS/app) for one real symptom you’ve seen—what would disprove each step?`,
    ]
  }
  if (id.startsWith('cybersecurity') || id.startsWith('practical-security')) {
    return [
      `Security checkpoint: pick one message type (invoice reset / MFA prompt / link) and list **three observable cues** you’d require before acting.`,
    ]
  }
  if (id.startsWith('cloud') || id.startsWith('devops') || id.startsWith('platform')) {
    return [
      `Platform checkpoint: describe a deploy failure story as **constraints** (permissions, artifact ids, rollout stage)—not vibes.`,
    ]
  }
  if (id.startsWith('observability') || id.startsWith('incident')) {
    return [
      `Ops checkpoint: draft a 4-line incident update that separates **facts vs hypotheses vs mitigations** for “${t || 'the service'}”.`,
    ]
  }
  if (id.startsWith('content') || id.startsWith('review-and-quality')) {
    return [
      `Publishing checkpoint: list **one claim** you will not make without a verifiable source, and what you’d say instead.`,
    ]
  }
  return []
}

function disciplineLabReadinessExtras(categoryId?: string): string[] {
  if (!categoryId) return []
  const id = categoryId.toLowerCase()
  if (id.startsWith('network')) {
    return [
      `Lab-ready (networking): prepare **three commands or checks** you’d run with least privilege (read-only) before asking for elevated access.`,
    ]
  }
  if (id.startsWith('cybersecurity')) {
    return [
      `Lab-ready (security): define a **safe reporting path** (who/when/what to capture) before simulating suspicious-content triage.`,
    ]
  }
  if (id.startsWith('cloud') || id.startsWith('devops') || id.startsWith('platform')) {
    return [
      `Lab-ready (platform): capture **build logs + artifact identifiers + environment name** as your minimum reproducible bundle.`,
    ]
  }
  if (id.startsWith('observability') || id.startsWith('incident')) {
    return [
      `Lab-ready (incident practice): pick an alert and write the **first question** it should answer—not the first dashboard you’d open.`,
    ]
  }
  return []
}

function flagshipFamilyExtras(p: InstructionalPlacement): {
  conceptLead: string[]
  assessmentSection: PublicStarterLessonSection | null
} {
  const topic = p.lessonTitle.trim()
  const fam = p.libraryFamily
  if (fam === 'ai_foundations') {
    return {
      conceptLead: [
        `AI literacy move: separate **fluent drafting** from **verified claims**—verification effort scales with stakes, not with how polished paragraphs feel.`,
        `AI literacy move: specify **constraints first** (audience, exclusions, sources, forbidden claims)—constraints reduce brittle retries more than adding adjectives.`,
      ],
      assessmentSection: {
        heading: 'Approve / revise / reject (risk-aware)',
        paragraphs: [
          `Drafting task: produce two versions of the same ask about “${topic}”—one risky (overclaims, no sources) and one responsible (bounded, reviewable). Explain which lines you would refuse to ship.`,
          `Contrastive critique: imagine two AI outputs for the same prompt—identify which failure is worse in your workplace (silent wrong fact vs misleading tone vs leaking sensitive context).`,
          `Operational translation: list three “stop points” where a human must verify before the output reaches a customer, student, finance system, or legal channel.`,
        ],
      },
    }
  }
  if (fam === 'machine_learning') {
    return {
      conceptLead: [
        `ML depth move: separate **offline score stories** from **deployment consequences**—who pays for false positives vs false negatives, and what slice of users is hidden by averages?`,
        `ML depth move: before debating algorithms, write the **label definition** and the **unit of prediction** (user? session? claim?)—ambiguous units create “accurate” models that fail operationally.`,
      ],
      assessmentSection: {
        heading: 'Reasoning & evaluation (beyond vocabulary)',
        paragraphs: [
          `Explain-a-tradeoff: paraphrase “${topic}” as a decision rule a product manager could challenge—then state what evidence would change your metric choice.`,
          `Leakage smell test: describe one feature or split mistake that would inflate offline metrics but collapse in production for this topic.`,
          `Stakeholder translation: give a 4-sentence briefing that mentions uncertainty, monitoring, and human oversight—without hype adjectives.`,
        ],
      },
    }
  }
  if (fam === 'chatbots') {
    return {
      conceptLead: [
        `Chatbot depth move: define **intent boundaries** and **safe refusal classes** before debating model size—scope discipline prevents the most expensive incidents.`,
        `Chatbot depth move: pair every fluent answer path with **logging + escalation + replay**—otherwise you cannot improve or defend the system after failure.`,
      ],
      assessmentSection: {
        heading: 'Scope, escalation, and conversational safety',
        paragraphs: [
          `Scenario: a user pushes the bot beyond its knowledge domain about “${topic}”. Draft the bot’s response: acknowledge limits, avoid fabricated specifics, offer human/helpdesk path with context carry-forward.`,
          `Approve/revise/reject: “LLM answers everything users ask.” Judge the policy in one paragraph—what should be blocked, retrieved, or escalated instead?`,
          `Measurement: list three operational signals you would monitor weekly (containment is insufficient alone)—include harm proxies like corrections, escalations, and policy overrides.`,
        ],
      },
    }
  }
  if (fam === 'cybersecurity') {
    return {
      conceptLead: [
        `Security depth move: translate “${topic}” into **controls + ownership + evidence**—what would an auditor or incident responder ask for after something breaks?`,
        `Security depth move: assume **humans are in the loop**—fatigue, urgency, and trust cues defeat perfect policies unless defaults and escalation paths are boringly clear.`,
      ],
      assessmentSection: {
        heading: 'Judgment under uncertainty (security)',
        paragraphs: [
          `Triage scenario: an urgent message pushes you to act fast on “${topic}”—list three observables you require before clicking, paying, or approving access.`,
          `Approve/revise/reject: “We’ll solve this by buying another tool.” Critique the statement: what gap remains when tooling changes but habits and ownership do not?`,
          `Escalation draft: write what you would report to IT/security in 6 lines—facts, scope, what you did not do, and what you need from them next.`,
        ],
      },
    }
  }
  if (fam === 'cloud_devops') {
    return {
      conceptLead: [
        `Platform depth move: express “${topic}” as **constraints and interfaces**—permissions, environments, artifacts, rollout stages—so failures become diagnosable instead of “the cloud is weird.”`,
        `Platform depth move: separate **speed of shipping** from **blast radius**—safe systems narrow what a single change can break.`,
      ],
      assessmentSection: {
        heading: 'Operational reasoning (cloud / delivery)',
        paragraphs: [
          `Failure scenario: a deploy worked in staging but failed in production—list four distinct hypotheses tied to real artifacts (build id, config, permissions, data).`,
          `Workflow decision: choose rollback vs hotfix vs forward-fix for a customer-impacting bug—what evidence forces each choice?`,
          `Communication task: explain “${topic}” to a non-platform stakeholder without jargon—focus on risk, downtime, and what you will verify next.`,
        ],
      },
    }
  }
  return { conceptLead: [], assessmentSection: null }
}

/**
 * Deterministic “deep instructional” sections for every lesson.
 * This is not empty scaffolding: each section includes teaching moves (explain → apply → diagnose mistakes → revise → check judgment → plan next practice).
 *
 * Precedence elsewhere: legacy migrated readers & hand-enriched maps still win when present.
 */
export function composeInstructionalDepth(p: InstructionalPlacement): PublicStarterLessonSection[] {
  const topic = p.lessonTitle.trim()
  const cat = p.categoryTitle.trim()
  const mod = p.moduleTitle.trim()
  const lib = p.libraryTitle.trim()
  const { conceptLead, assessmentSection } = flagshipFamilyExtras(p)

  const misconceptionParagraphs = [
    `Common trap A: confusing **fluency with correctness**—smooth explanations can still be wrong for your context.`,
    `Common trap B: overfitting your story to one tool (“the product will save us”) without naming failure modes and ownership.`,
    `Common trap C: skipping review because the task feels small—risk compounds when outputs reach customers, grades, compliance, or safety.`,
    `Your defense is not “more confidence,” but **better checks matched to stakes**: what evidence would falsify your conclusion quickly?`,
    ...disciplineMisconceptionExtras(p.categoryId),
  ]

  const checkpointParagraphs = [
    `Judgment check: give an example where following the naive approach would look successful short-term but fail later.`,
    `Tradeoff check: name two competing priorities (speed vs safety, coverage vs precision) and how you’d decide which wins.`,
    `Application check: translate “${topic}” into a checklist with 5 items you can run on real inputs next week.`,
    ...(p.libraryFamily === 'machine_learning'
      ? [
          `Explain-your-reasoning: defend a metric choice for “${topic}” under class imbalance—what breaks if you optimize accuracy alone?`,
          `Comparison task: contrast two plausible modeling approaches for the same goal—what operational feature makes one safer than the other?`,
        ]
      : []),
    ...(p.libraryFamily === 'chatbots'
      ? [
          `Workflow decision: sketch a 4-step routing path for “${topic}” where rules handle compliance-sensitive steps and AI assists only where language variability truly helps.`,
          `Failure drill: list three user utterances that should trigger escalation—not because the model is weak, because the outcome requires human authority.`,
        ]
      : []),
    ...(p.libraryFamily === 'ai_foundations'
      ? [
          `Verification ladder: for “${topic}”, rank three claim types by how severely wrong answers would hurt—then assign review time proportional to rank.`,
          `Misuse scenario: describe a plausible way a teammate could rely on AI for “${topic}” too casually—then add a lightweight team norm that prevents it without killing productivity.`,
        ]
      : []),
    ...(p.libraryFamily === 'cybersecurity'
      ? [
          `Insider realism: where could an honest employee still cause a breach while discussing “${topic}”—name the policy/process gap, not the person.`,
          `Tabletop: your team must decide on a change touching “${topic}” today—what is the smallest reversible step you could take first?`,
        ]
      : []),
    ...(p.libraryFamily === 'cloud_devops'
      ? [
          `Blast-radius check: what could still break for customers if your fix for “${topic}” is wrong—what guardrail proves you narrowed scope?`,
          `Change discipline: write the validation gates you would require before promoting a change touching “${topic}” (tests, canaries, approvals).`,
        ]
      : []),
    ...disciplineCheckpointExtras(p.categoryId, topic),
  ]

  const labParagraphs = [
    `Lab-ready framing: identify a task you can practice safely with minimal permissions (local notes, sandbox tools, or read-only observation).`,
    `If you’re preparing for hands-on labs later: write the exact inputs you would need, the expected outputs, and the failure modes you’d watch for—future environments reward preparation, not improvisation.`,
    ...disciplineLabReadinessExtras(p.categoryId),
  ]

  const coreSections: PublicStarterLessonSection[] = [
    {
      heading: 'Concept teaching (what to understand)',
      paragraphs: [
        `This lesson sits inside ${cat} → ${mod} within ${lib}. The core idea is “${topic}”—not as a buzzword, but as a practical skill you can recognize in real workflows.`,
        `Start from a concrete situation: where this topic shows up in everyday work (tools, hand-offs, failures, reviews). Your goal is to build **transportable judgment**: you can describe what “good” looks like, what breaks first, and what evidence would change your mind.`,
        `Keep your claims bounded: instructional material here is assistive—**not** a guarantee of exam results, certification, hiring outcomes, or vendor-specific absolutes.`,
        ...conceptLead,
      ],
    },
    {
      heading: 'Worked example (apply the idea)',
      paragraphs: [
        `Pick one realistic scenario where “${topic}” matters this week (work, study, or a personal project). Write down: inputs you have, the decision you must make, and the stakeholders affected.`,
        `Walk the scenario twice: once using a fast heuristic (what most people do first), once using the lesson’s emphasis (what careful practitioners do differently). Note what changes in risk, clarity, and follow-up work.`,
        `End with a short “stop rule”: when you would pause and verify, escalate to a human, or refuse to proceed without better sources.`,
      ],
    },
  ]

  const midSections: PublicStarterLessonSection[] = assessmentSection ? [assessmentSection] : []

  const tailSections: PublicStarterLessonSection[] = [
    {
      heading: 'Misconceptions & weak-reasoning traps',
      paragraphs: misconceptionParagraphs,
    },
    {
      heading: 'Revision & remediation (make it stick)',
      paragraphs: [
        `Explain “${topic}” in 5 sentences as if teaching a teammate—no quotes from this page, no paste from a tool.`,
        `Create 3 flashcards: definition, failure mode, and a question you should ask before trusting an output.`,
        `Schedule a 10-minute revisit tomorrow: same scenario, shorter notes—retrieval beats re-reading.`,
      ],
    },
    {
      heading: 'Checkpoints (beyond recall)',
      paragraphs: checkpointParagraphs,
    },
    {
      heading: 'Capability outcomes & continuity',
      paragraphs: [
        `After this lesson, you should be able to: ${p.outcomes.slice(0, 3).join(' · ')}`,
        `Continuity hook: pick one “weak signal” to watch for two weeks (repeat mistakes, recurring questions, recurring rework). That signal becomes your personal revision queue—aligned with Jifunze’s direction toward signal-driven improvement over time.`,
      ],
    },
    {
      heading: 'Content-creation outputs (optional, knowledge-backed)',
      paragraphs: [
        `Turn your notes into a reusable artifact: a one-page brief, a micro-outline, or a short post that teaches someone else the idea behind “${topic}”.`,
        `Keep sources and limits explicit: mark what you verified vs what remains assumption—this is how knowledge publishing stays trustworthy.`,
      ],
    },
    {
      heading: 'Practical / lab readiness (what you can run next)',
      paragraphs: labParagraphs,
    },
  ]

  return [...coreSections, ...midSections, ...tailSections]
}
