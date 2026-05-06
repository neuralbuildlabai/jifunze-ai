/**
 * Mid-course bespoke instructional overrides — lessons m05/m07 + one applied practice per flagship.
 * Mid-band overrides (authored source in `scripts/build-flagship-mid-session-overrides.mjs`).
 * Treat learner-facing strings as editorial content; change the generator source only as a drafting aid,
 * then keep this file as the canonical copy.
 */

import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'
import { flagshipDepthPaddingBlock } from './flagshipSessionDepthPadding'

export const FLAGSHIP_SESSION_CONTENT_OVERRIDES_MIDCOURSE: Partial<
  Record<string, FlagshipSessionContentBlock[]>
> = {
  "ai-essentials::ae-m05-lesson": [
    {
      id: "ae-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Learning with AI without outsourcing cognition",
      body: "This module sits where integrity shows up: study loops that build durable skill versus shortcuts that mimic competence. Pick a certification, degree path, or upskill goal that matters—then treat AI as practice scaffolding, not a substitute examinee.",
    },
    {
      id: "ae-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Separation of practice from substitution",
      body: "Use AI for retrieval cues, mistaken explanations you must repair, or messy drafts you must verify—but keep the cognitive work that exams and ethics measure on your side of the boundary. Name three tasks where outsourcing cognition would falsify your learning claim.",
    },
    {
      id: "ae-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Five-step integrity protocol",
      body: "Draft a protocol with columns: AI-allowed moves, forbidden moves, verification step, escalation if tempted to cheat the boundary, what “done” means for real mastery. Keep it brutally specific to one course or credential context.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "ae-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Where are you most tempted to let the model “think for you”? Name one boundary you will treat as non-negotiable for the next month.",
    },
    {
      id: "ae-m05-lesson-ov-next",
      type: "next_step",
      body: "Bring the protocol to practice—your next artifact should cite where human cognition stayed in the loop.",
    }
  ],

  "ai-essentials::ae-m06-practice": [
    {
      id: "ae-m06-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Verification lanes that ship receipts",
      body: "You will turn one fluent AI output into a reviewable evidence trail: claims tagged to passages, conflicts kept visible, unknowns labeled, and the next information buy named. The goal is not a prettier paragraph—it is a brief a skeptical executive could attack on substance.",
    },
    {
      id: "ae-m06-practice-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "From fluent paragraph to evidence table",
      body: [
        "Start with a 200–400 word AI output on a contested topic in your context (vendor decision, policy debate, market claim). Walk it in three passes:",
        "",
        "Pass 1 — Underline load-bearing claims (anything that would change a decision if wrong). Pass 2 — Tag each claim as Verified (you have a passage in hand), Inferred (logical but not directly observed), or Uncited (needs work). Pass 3 — Hunt for false precision: decimal places, causal verbs, universal quantifiers (\"always,\" \"the data proves\").",
        "",
        "Then build an evidence table: Claim | Source / passage ref | Strength (Strong / Moderate / Weak / Uncited) | Conflict noted? | Verification step. Conclude with a 4-sentence brief that names what you know, what you do not know, and the cheapest next observation that would adjudicate.",
      ].join("\n\n"),
      example:
        "Single-sentence audit pattern: \"AI assistants are now indispensable for productivity teams.\" Strength: Weak. Source: none. Conflict: at least two market reports disagree on \"indispensable.\" Verification: cite a dated passage, or downgrade to \"some teams report indispensable for narrow tasks.\"",
    },
    {
      id: "ae-m06-practice-ov-task",
      type: "practice_task",
      title: "Learner task · Three reps with receipts",
      bullets: [
        "1. Take one real AI output you nearly trusted; produce the evidence table for at least five load-bearing claims.",
        "2. Red-team the same output for omission and persuasive spin—log three specific risks (not generic \"bias\" labels).",
        "3. Rewrite one paragraph with marginal verification notes (verify, cut, escalate) so a reviewer sees what you checked, what you refused to claim, and what you handed forward.",
      ],
      prompt: "Stop when a peer could pick up your evidence table and continue verification without DMing you for context.",
    },
    {
      id: "ae-m06-practice-ov-checklist",
      type: "key_points",
      eyebrow: "Self-review checklist",
      title: "Five gates before this brief leaves your hands",
      bullets: [
        "Every load-bearing claim has a strength label (Strong / Moderate / Weak / Uncited)—no claim hides in friendly prose.",
        "At least one unresolved conflict is named in the brief itself, not buried in a footnote.",
        "False-precision sweep is done: any decimal, percentage, or causal verb traces to a passage or is downgraded.",
        "Reversible vs irreversible decisions get proportional verification—no uniform heavy pass that hides where you actually need depth.",
        "The brief ends with the cheapest next information buy and what would flip the recommendation.",
      ],
    },
    {
      id: "ae-m06-practice-ov-bad-good",
      type: "concept_explanation",
      eyebrow: "Bad vs good",
      title: "What weak verification looks like, and what stronger looks like",
      body: [
        "Weak (avoid): \"Recent industry reports show clear consensus that the new tool reduces errors by 30%—we should adopt it next quarter.\" Single sentence, fluent tone, three load-bearing claims (consensus, 30%, next quarter), zero passage references, no conflict, no falsifier.",
        "",
        "Stronger (model this): \"Two vendor-published case studies report 25–35% error reduction in narrow conditions; one independent audit reports 8–12% in our deployment shape; reviewers disagree on baseline definitions. Recommendation: pilot for two cycles with the audit team's baseline, kill criterion is no detectable improvement after cycle 2, next information buy is one customer reference call before procurement.\"",
        "",
        "The stronger version is longer because honesty has a length—but a busy reviewer can attack any claim by name and the recommendation survives or doesn't on substance, not on tone.",
      ].join("\n\n"),
    },
    {
      id: "ae-m06-practice-ov-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "Save Module06_Claim_Verification_Table_[YourName].pdf or .docx with the evidence table, the 4-sentence brief, the marginal-notes paragraph, and the verification lane matrix you will reuse on irreversible work.",
      outputExpectation: "Claim verification table + verification lane matrix",
    },
    {
      id: "ae-m06-practice-ov-next",
      type: "next_step",
      body: "If any claim still hides without a passage reference, stop and fix before continuing. ae-m07 turns this discipline into audience-fit communication that does not smuggle new factual claims through tone changes.",
    },
    flagshipDepthPaddingBlock('ae-m06-practice'),
  ],

  "ai-essentials::ae-m07-lesson": [
    {
      id: "ae-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "AI at work: handoffs, approvals, stakeholders, and norms",
      body: "Hybrid work is not “AI plus people”—it is routing, disclosure, ownership, and review gates. This lesson makes collaboration legible so trust scales beyond early adopters.",
    },
    {
      id: "ae-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "RACI meets disclosure discipline",
      body: "Every AI-assisted artifact needs an owner who can defend it: who reviewed facts, what was generated, where uncertainty remains, and what humans decided under ambiguity. Avoid vague team norms—write behaviors people can cite in tickets.",
    },
    {
      id: "ae-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Disclosure template under pressure",
      body: "Sketch two emails: one safe minimal disclosure (“AI-assisted draft—facts unchecked”), one fuller disclosure for regulated contexts. Pair each with the review gate that must happen before send.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "ae-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which stakeholder fears AI most—and what concrete behavior from you would reduce that fear without slowing truth?",
    },
    {
      id: "ae-m07-lesson-ov-next",
      type: "next_step",
      body: "Merge norms into your upcoming practice deliverables as explicit checklist items.",
    }
  ],

  "business-builder::bb-m05-lesson": [
    {
      id: "bb-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Pricing discipline: value math, sensitivity, ethical floors",
      body: "Pricing encodes strategy—margin math without ethics becomes extraction. Build sensitivity tables that expose tradeoffs plainly.",
    },
    {
      id: "bb-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Value math under constraints",
      body: "Separate unit economics from willingness-to-pay signals; explore cannibalization and competitive reactions; state ethical floors where you will not chase revenue.",
    },
    {
      id: "bb-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Sensitivity slice",
      body: "Pick one SKU or service tier—model base, downside, upside with triggers that change price or packaging.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "bb-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which customer segment subsidizes another today—and is that intentional?",
    },
    {
      id: "bb-m05-lesson-ov-next",
      type: "next_step",
      body: "Bring numbers to practice—no slogan price moves.",
    }
  ],

  "business-builder::bb-m05-practice": [
    {
      id: "bb-m05-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Pricing practice needs numbers on the page—spreadsheets beat slides.",
    },
    {
      id: "bb-m05-practice-ov-task",
      type: "practice_task",
      title: "Sensitivity grid",
      bullets: [
        "Build base/downside/upside cases.",
        "Name elasticities you actually believe vs. guess.",
        "State ethical floor explicitly.",
      ],
      prompt: "If assumptions are silent, stakeholders will fill them with fear.",
    },
    {
      id: "bb-m05-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Sensitivity grid + explicit tradeoffs.",
    },
    {
      id: "bb-m05-practice-ov-next",
      type: "next_step",
      body: "Pair grid with a one-page narrative for non-finance partners.",
    }
  ],

  "business-builder::bb-m07-lesson": [
    {
      id: "bb-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Operating rhythm: cadences owners actually attend",
      body: "Cadences rot when rituals multiply—fewer meetings with sharper decisions beat theater.",
    },
    {
      id: "bb-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Cadence design for throughput",
      body: "Define inputs each ritual requires, decisions it may produce, and explicit “no agenda” bans. Owners publish pre-reads or the meeting slips.",
    },
    {
      id: "bb-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "One ritual repaired",
      body: "Choose a recurring meeting—rewrite purpose, decision rights, pre-read, and kill criteria if it stops paying rent.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "bb-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which cadence exists because of anxiety, not outcomes?",
    },
    {
      id: "bb-m07-lesson-ov-next",
      type: "next_step",
      body: "Pilot the repaired ritual for two cycles—measure decisions shipped.",
    }
  ],

  "career-launch::cl-m05-lesson": [
    {
      id: "cl-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Job search strategy: targets, pipelines, experiments",
      body: "Search is portfolio management—targets, experiments, kill rules beat spray-and-pray applications.",
    },
    {
      id: "cl-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Hypothesis-driven search",
      body: "Define ICP employers, proof you need to collect, weekly learning metrics, and experiments with ethical boundaries.",
    },
    {
      id: "cl-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Pipeline experiment card",
      body: "Write one experiment (outreach angle, project proof, referral path) with success signal and stop rule.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "cl-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which rejection fear causes you to broaden targets until you learn nothing?",
    },
    {
      id: "cl-m05-lesson-ov-next",
      type: "next_step",
      body: "Run the smallest experiment that teaches—this week.",
    }
  ],

  "career-launch::cl-m05-practice": [
    {
      id: "cl-m05-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Experiments need integrity—never fabricate metrics; learn honestly.",
    },
    {
      id: "cl-m05-practice-ov-task",
      type: "practice_task",
      title: "Search experiment",
      bullets: [
        "Pick one channel to test deeply.",
        "Define signal vs. noise for the week.",
        "Write kill criteria if signal misses.",
      ],
      prompt: "Breadth without learning is motion.",
    },
    {
      id: "cl-m05-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Experiment card with metrics + stop rule.",
    },
    {
      id: "cl-m05-practice-ov-next",
      type: "next_step",
      body: "Ship one uncomfortable proof artifact.",
    }
  ],

  "career-launch::cl-m07-lesson": [
    {
      id: "cl-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Interviews: behavioral depth and technical storytelling",
      body: "Interviews reward evidence-rich stories—adjectives are cheap; decisions and tradeoffs are not.",
    },
    {
      id: "cl-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "STAR with receipts",
      body: "Behavioral depth means naming situation, task, actions, results with metrics and conflict details—without blaming.",
    },
    {
      id: "cl-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Two-minute evidence story",
      body: "Draft one story with a hard tradeoff, a metric, and a mistake you caught—then trim to two minutes spoken.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "cl-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which story still sounds generic—what specific detail would make it believable?",
    },
    {
      id: "cl-m07-lesson-ov-next",
      type: "next_step",
      body: "Record yourself once—listen for filler.",
    }
  ],

  "clear-communication::cc-m05-lesson": [
    {
      id: "cc-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Summaries and briefs: fidelity vs. compression",
      body: "Compression without fidelity is betrayal—briefs steer costly decisions.",
    },
    {
      id: "cc-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Fidelity checkpoints",
      body: "Separate facts, interpretations, and recommendations; flag contested facts; preserve dissent that matters.",
    },
    {
      id: "cc-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Brief spine with dissent lane",
      body: "Summarize a contested decision in one page: facts agreed, facts disputed, implications either way, recommendation with caveats.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "cc-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Where do you soften uncertainty because clarity feels rude?",
    },
    {
      id: "cc-m05-lesson-ov-next",
      type: "next_step",
      body: "Practice preserves dispute—do not launder it.",
    }
  ],

  "clear-communication::cc-m05-practice": [
    {
      id: "cc-m05-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Brief practice is forensic—every line earns its place.",
    },
    {
      id: "cc-m05-practice-ov-task",
      type: "practice_task",
      title: "Fidelity pass",
      bullets: [
        "Highlight inferred vs. sourced claims.",
        "Add one dissent note that matters.",
        "Tighten without losing truth.",
      ],
      prompt: "If you cannot defend a line, cut or qualify it.",
    },
    {
      id: "cc-m05-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Brief + fidelity checklist.",
    },
    {
      id: "cc-m05-practice-ov-next",
      type: "next_step",
      body: "Swap with a peer for adversarial read.",
    }
  ],

  "clear-communication::cc-m07-lesson": [
    {
      id: "cc-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Persuasion with integrity: stakes, ethics, and proof",
      body: "Persuasion is enabling good decisions—not winning rhetorically.",
    },
    {
      id: "cc-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Proof lanes and ethical bounds",
      body: "Match evidence type to claim type; disclose conflicts; invite falsification from peers.",
    },
    {
      id: "cc-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Integrity persuasion outline",
      body: "Draft a recommendation with proof ladder: strongest evidence first, weakest labeled, explicit unknowns.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "cc-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which audience fear would tempt you to oversell?",
    },
    {
      id: "cc-m07-lesson-ov-next",
      type: "next_step",
      body: "Add one sentence that invites the strongest critique.",
    }
  ],

  "data-and-decisions::dd-m05-lesson": [
    {
      id: "dd-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Correlation, causation, and intervention humility",
      body: "Budgets move on stories about causation—this module trains intervention humility before you spend money or blame teams.",
    },
    {
      id: "dd-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Confounders, mechanisms, counterfactual discipline",
      body: "Correlation screens for association; causal claims require design—controls, timing, or experiments. Write “we believe X because…” as a mechanism chain, not a slogan.",
    },
    {
      id: "dd-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Three-lane causal story",
      body: "For one KPI movement, list: (A) benign explanations, (B) rival explanations, (C) what evidence would discriminate. End with an intervention you would pilot—and a falsifier.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "dd-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which vanity interpretation flatters your team—and what would kill that story honestly?",
    },
    {
      id: "dd-m05-lesson-ov-next",
      type: "next_step",
      body: "Take the falsifier into your practice lab as a measurement sketch.",
    }
  ],

  "data-and-decisions::dd-m06-practice": [
    {
      id: "dd-m06-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Trend lines seduce—regimes shift. Treat volatility as a hypothesis test, not wallpaper.",
    },
    {
      id: "dd-m06-practice-ov-task",
      type: "practice_task",
      title: "Noise vs. regime change",
      bullets: [
        "Plot or sketch a volatile series with annotations for external shocks.",
        "Write two rival narratives for the same dip.",
        "Choose what you would monitor next week to discriminate.",
      ],
      prompt: "If both narratives fit, say so—then design a discriminating observation.",
    },
    {
      id: "dd-m06-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Strip plot notes + regime hypothesis.",
    },
    {
      id: "dd-m06-practice-ov-next",
      type: "next_step",
      body: "Avoid heroic forecasts; prefer disciplined monitoring.",
    }
  ],

  "data-and-decisions::dd-m07-lesson": [
    {
      id: "dd-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Reporting cadence, dashboards-in-context, and decision logs",
      body: "Dashboards become harmful when they answer “what looks busy” instead of “what decision is due.” Reporting cadence must match decision tempo.",
    },
    {
      id: "dd-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Dashboard → decision log discipline",
      body: "Each tile should map to a decision owner and timing; include definitions and refresh limits. Separate operational monitoring from strategic learning reviews.",
    },
    {
      id: "dd-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "One honest dashboard tile",
      body: "Pick a tile leaders stare at weekly. Rewrite its definition, lag/lead nature, known distortions, and the decision it should trigger. Add a red-flag threshold.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "dd-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Where does your org mistake activity metrics for outcomes—and what definition repair would fix it?",
    },
    {
      id: "dd-m07-lesson-ov-next",
      type: "next_step",
      body: "Pair the tile with a one-paragraph decision log entry template.",
    }
  ],

  "digital-safety::ds-m05-lesson": [
    {
      id: "ds-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Devices, updates, and backups that survive reality",
      body: "Backups fail quietly until ransomware teaches you. Treat recovery drills as part of hygiene—not optimism.",
    },
    {
      id: "ds-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Recoverability beats intent",
      body: "Define RPO/RTO in plain language for your personal stack and team stack; verify restores, not backup jobs. Patch cadence is risk acceptance written down.",
    },
    {
      id: "ds-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Restore drill outline",
      body: "Write steps to restore one critical folder or DB from backup—who does what, where credentials live, how you validate integrity.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "ds-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What single lazy habit would hurt you most in a laptop-loss scenario?",
    },
    {
      id: "ds-m05-lesson-ov-next",
      type: "next_step",
      body: "Schedule the smallest meaningful restore test this month.",
    }
  ],

  "digital-safety::ds-m07-lesson": [
    {
      id: "ds-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Vendor and SaaS governance without bureaucracy",
      body: "Every SaaS is an extension of your perimeter—permissions and data residency matter more than buzzword compliance.",
    },
    {
      id: "ds-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Least privilege that scales",
      body: "Inventory integrations with scopes; remove dormant OAuth grants; segment admin roles; document offboarding triggers.",
    },
    {
      id: "ds-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Vendor risk card",
      body: "Pick one vendor: data classes touched, SSO posture, audit logs available, breach notification path, kill switch.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "ds-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which integration would you regret most if credentials leaked tonight?",
    },
    {
      id: "ds-m07-lesson-ov-next",
      type: "next_step",
      body: "Turn the card into an owner + review date.",
    }
  ],

  "digital-safety::ds-m07-practice": [
    {
      id: "ds-m07-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Governance fails when access mirrors convenience—prove least privilege with evidence.",
    },
    {
      id: "ds-m07-practice-ov-task",
      type: "practice_task",
      title: "Access matrix slice",
      bullets: [
        "List roles vs. sensitive actions for one SaaS.",
        "Identify three overprivileged accounts.",
        "Define remediation without blocking legitimate work.",
      ],
      prompt: "Prefer reversible steps—big bang lockouts create shadow IT.",
    },
    {
      id: "ds-m07-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Access matrix draft + escalation path.",
    },
    {
      id: "ds-m07-practice-ov-next",
      type: "next_step",
      body: "Pair matrix with sponsor communication language.",
    }
  ],

  "leadership-and-teams::lat-m05-lesson": [
    {
      id: "lat-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Feedback and coaching fundamentals",
      body: "Feedback lands when it is behavioral, situational, and oriented to growth—not identity judgment.",
    },
    {
      id: "lat-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Intent–behavior–impact without theater",
      body: "Separate observation from story; invite perspective; co-create next experiment; avoid pseudo-coaching lectures.",
    },
    {
      id: "lat-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Sixty-second coaching script",
      body: "Draft feedback on a real scenario using behavior specifics, impact, question, request—no personality labels.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "lat-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which power dynamic makes you soften or sharpen too much?",
    },
    {
      id: "lat-m05-lesson-ov-next",
      type: "next_step",
      body: "Rehearse tone—warmth without vagueness.",
    }
  ],

  "leadership-and-teams::lat-m05-practice": [
    {
      id: "lat-m05-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Feedback practice is interpersonal risk—prepare language that preserves dignity.",
    },
    {
      id: "lat-m05-practice-ov-task",
      type: "practice_task",
      title: "Feedback script",
      bullets: [
        "Name observable behavior.",
        "Describe impact on work outcomes.",
        "Invite their view—co-design next step.",
      ],
      prompt: "No diagnosis of character—behavior only.",
    },
    {
      id: "lat-m05-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Script + intent/behavior/impact structure.",
    },
    {
      id: "lat-m05-practice-ov-next",
      type: "next_step",
      body: "Deliver to a trusted peer for punchy critique.",
    }
  ],

  "leadership-and-teams::lat-m07-lesson": [
    {
      id: "lat-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Team learning: retros, postmortems, blameless analysis",
      body: "Learning organizations run blameless retros—systems thinking beats heroes and villains.",
    },
    {
      id: "lat-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Incident → learning artifact",
      body: "Timeline facts first; contributing factors across layers; experiments that reduce recurrence—assign owners.",
    },
    {
      id: "lat-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Postmortem spine",
      body: "Sketch a blameless outline: impact, timeline, detection gap, mitigations now, systemic fixes, metrics to watch.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "lat-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Where does your culture punish messengers—and how would you repair that?",
    },
    {
      id: "lat-m07-lesson-ov-next",
      type: "next_step",
      body: "Pilot outline on a small incident first.",
    }
  ],

  "marketing-and-growth::mg-m05-lesson": [
    {
      id: "mg-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Content operating model: themes, calendar, repurposing with intent",
      body: "Calendars become noise factories when rows are not tied to buyer stage proof—run content like production with QC and reuse rules.",
    },
    {
      id: "mg-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Calendar ↔ funnel coherence",
      body: "Each publish event should trace to an audience insight and a measurable next step—not “Tuesday needs a post.” Define minimum quality bar per surface.",
    },
    {
      id: "mg-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Eight-week skeleton with proof hooks",
      body: "Draft eight rows: pillar tag, stage, proof asset referenced, distribution slot, QC owner, kill metric if engagement lies.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "mg-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which vanity metric tempts you to celebrate busywork?",
    },
    {
      id: "mg-m05-lesson-ov-next",
      type: "next_step",
      body: "Bring the skeleton into practice as a calendar v1.",
    }
  ],

  "marketing-and-growth::mg-m05-practice": [
    {
      id: "mg-m05-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Repurposing without intent creates channel spam—each surface needs a shaped job.",
    },
    {
      id: "mg-m05-practice-ov-task",
      type: "practice_task",
      title: "Repurpose map",
      bullets: [
        "Start from one flagship asset.",
        "Map three channels with format-fit rationale.",
        "Define QC differences per surface.",
      ],
      prompt: "If repurposing is copy-paste, stop—reshape the hook.",
    },
    {
      id: "mg-m05-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Editorial calendar v1 with QC gates.",
    },
    {
      id: "mg-m05-practice-ov-next",
      type: "next_step",
      body: "Ship calendar rows that name proof, not platitudes.",
    }
  ],

  "marketing-and-growth::mg-m07-lesson": [
    {
      id: "mg-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Integrated campaign design: offer logic, narrative arc, landing story",
      body: "Integrated campaigns fail when offer logic, narrative, and landing contradict—alignment is economics, not aesthetics.",
    },
    {
      id: "mg-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Offer logic before creative polish",
      body: "Sequence insight → promise → proof → CTA with one accountable hypothesis. Narrative arc should survive legal and finance review.",
    },
    {
      id: "mg-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Campaign spine on one page",
      body: "Write offer, ICP tension, promise, proof artifacts, primary KPI, kill rule before spend. Include what you refuse to claim.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "mg-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Where does marketing rhetoric outrun product truth—and how would you tighten?",
    },
    {
      id: "mg-m07-lesson-ov-next",
      type: "next_step",
      body: "Pressure-test spine with one skeptical sales peer.",
    }
  ],

  "money-and-finance::mf-m05-lesson": [
    {
      id: "mf-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Pricing as choice under constraints: value, competition, ethics",
      body: "Finance judgment is choosing under uncertainty—label constraints before debating tactics.",
    },
    {
      id: "mf-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Trade space clarity",
      body: "Package price, term, risk allocation, and timing as one trade space—avoid arguing single numbers without structure.",
    },
    {
      id: "mf-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "BATNA + walk-away band",
      body: "Write your BATNA in sentences, not vibes; define walk-away band tied to cash timing and risk appetite.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "mf-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Where does optimism bias inflate your BATNA?",
    },
    {
      id: "mf-m05-lesson-ov-next",
      type: "next_step",
      body: "Pressure-test with one adversarial peer question.",
    }
  ],

  "money-and-finance::mf-m05-practice": [
    {
      id: "mf-m05-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Packages beat haggling—design trade space before you enter the room.",
    },
    {
      id: "mf-m05-practice-ov-task",
      type: "practice_task",
      title: "Trade-space sheet",
      bullets: [
        "List variables beyond price.",
        "Rank concessions by cost to you.",
        "Define objective standards for disagreement.",
      ],
      prompt: "Never negotiate against yourself in silence—write it down.",
    },
    {
      id: "mf-m05-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "BATNA notes + trade-space doc.",
    },
    {
      id: "mf-m05-practice-ov-next",
      type: "next_step",
      body: "Rehearse aloud once—awkward beats surprised.",
    }
  ],

  "money-and-finance::mf-m07-lesson": [
    {
      id: "mf-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Negotiating money: packages, trade space, calm process",
      body: "Money conversations go sideways when process is vague—calm procedure protects relationships and outcomes.",
    },
    {
      id: "mf-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Process as fairness technology",
      body: "Sequence discovery → alignment → written terms → escalation paths; separate people respect from terms debate.",
    },
    {
      id: "mf-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Negotiation map",
      body: "For one live scenario, list interests (not positions), tradeables, non-negotiables, and objective standards you will cite.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "mf-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What emotional trigger most derails you in money talks?",
    },
    {
      id: "mf-m07-lesson-ov-next",
      type: "next_step",
      body: "Script one repair phrase for that trigger.",
    }
  ],

  "product-thinking::prd-m05-lesson": [
    {
      id: "prd-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Roadmaps as bets with buffers, not Gantt fantasy",
      body: "Roadmaps fail when they pretend certainty—buffers encode uncertainty honestly and protect trust.",
    },
    {
      id: "prd-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Bet framing vs. date theater",
      body: "Each item is a bet with hypothesis, leading signals, and kill criteria; dates are commitments only where reversibility is low.",
    },
    {
      id: "prd-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Bet card",
      body: "Pick one roadmap row—write hypothesis, leading metric, lagging metric, buffer rationale, decision date.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "prd-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which stakeholder pressure converts buffers back into fantasy dates?",
    },
    {
      id: "prd-m05-lesson-ov-next",
      type: "next_step",
      body: "Publish bet language where engineering can critique it.",
    }
  ],

  "product-thinking::prd-m05-practice": [
    {
      id: "prd-m05-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Roadmap practice means visible uncertainty—buffers are features of honesty.",
    },
    {
      id: "prd-m05-practice-ov-task",
      type: "practice_task",
      title: "Buffered slice",
      bullets: [
        "Rewrite a timeline row as a bet.",
        "Expose dependencies explicitly.",
        "Name what you will cut if signals miss.",
      ],
      prompt: "If everything is must-have, you have no strategy.",
    },
    {
      id: "prd-m05-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Roadmap excerpt with buffers visible.",
    },
    {
      id: "prd-m05-practice-ov-next",
      type: "next_step",
      body: "Socialize with engineering—invite puncture.",
    }
  ],

  "product-thinking::prd-m07-lesson": [
    {
      id: "prd-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Shipping to learn: launches, instrumentation discipline",
      body: "Shipping without instrumentation is wishing—define learning signals before launch noise arrives.",
    },
    {
      id: "prd-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Instrumentation as product ethics",
      body: "Pair releases with events you trust; guard privacy; prefer decision-ready slices over vanity counts.",
    },
    {
      id: "prd-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Launch learning plan",
      body: "Define three events, two funnels, one guardrail metric, and the decision each enables within two weeks.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "prd-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which metric would excite leadership but mislead product judgment?",
    },
    {
      id: "prd-m07-lesson-ov-next",
      type: "next_step",
      body: "Delete or demote that metric from your primary review.",
    }
  ],

  "project-execution::pex-m05-lesson": [
    {
      id: "pex-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Risk practice: registers tied to triggers",
      body: "Risk registers become theater without triggers—connect lines to decisions and dates.",
    },
    {
      id: "pex-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Risk → trigger → owner",
      body: "Each risk needs early warning signals, mitigation owner, and escalation appetite—otherwise it is commentary.",
    },
    {
      id: "pex-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Risk line hardening",
      body: "Take one vague risk (“integration might slip”) and rewrite with trigger metric, date, owner, mitigation, residual acceptance.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "pex-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which risks stay verbal because accountability is uncomfortable?",
    },
    {
      id: "pex-m05-lesson-ov-next",
      type: "next_step",
      body: "Put the hardened line into the practice artifact.",
    }
  ],

  "project-execution::pex-m05-practice": [
    {
      id: "pex-m05-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Risk practice belongs in the register—not in hallway anxiety.",
    },
    {
      id: "pex-m05-practice-ov-task",
      type: "practice_task",
      title: "Register rows that bite",
      bullets: [
        "Convert three worries into triggered lines.",
        "Pair mitigations with dates.",
        "Name residual risks you accept explicitly.",
      ],
      prompt: "If triggers are missing, you do not have a plan—only vibes.",
    },
    {
      id: "pex-m05-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Risk lines tied to mitigations/dates.",
    },
    {
      id: "pex-m05-practice-ov-next",
      type: "next_step",
      body: "Review with sponsor—demand falsifiers.",
    }
  ],

  "project-execution::pex-m07-lesson": [
    {
      id: "pex-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Change leadership without buzzword soup",
      body: "Change fails when communication is abstract—translate adoption into behaviors and feedback loops.",
    },
    {
      id: "pex-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Behavioral adoption plan",
      body: "Define sponsor coalition, pilot cohort, training artifacts, and feedback channels; measure adoption by behavior, not slogans.",
    },
    {
      id: "pex-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Pilot slice",
      body: "Draft a two-week pilot: who must change what, how we know it stuck, rollback if resistance spikes.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "pex-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Where do you sell vision instead of clarifying first steps?",
    },
    {
      id: "pex-m07-lesson-ov-next",
      type: "next_step",
      body: "Cut vision slides until behaviors are obvious.",
    }
  ],

  "research-and-critical-thinking::rtc-m05-lesson": [
    {
      id: "rtc-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Quant literacy for consumers of research",
      body: "Numbers persuade because they look objective—your job is to read methods before impressions.",
    },
    {
      id: "rtc-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Method before headline",
      body: "Ask population, design, confounding, effect size, uncertainty, and incentives before updating beliefs.",
    },
    {
      id: "rtc-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Decode one figure",
      body: "Pick a chart or table from a paper—rewrite what it can and cannot say; list two misreadings a hurried exec would make.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "rtc-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which statistical buzzword do you nod along with though you cannot define it?",
    },
    {
      id: "rtc-m05-lesson-ov-next",
      type: "next_step",
      body: "Define it in one sentence without jargon.",
    }
  ],

  "research-and-critical-thinking::rtc-m05-practice": [
    {
      id: "rtc-m05-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Quant practice means tracing the chain—no borrowed prestige.",
    },
    {
      id: "rtc-m05-practice-ov-task",
      type: "practice_task",
      title: "Claim trace",
      bullets: [
        "Quote the claim.",
        "Trace method and sample.",
        "State what remains unknown.",
      ],
      prompt: "If the chain breaks, downgrade confidence loudly.",
    },
    {
      id: "rtc-m05-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Claim → method → limits note.",
    },
    {
      id: "rtc-m05-practice-ov-next",
      type: "next_step",
      body: "Prefer qualified truth over crisp wrong.",
    }
  ],

  "research-and-critical-thinking::rtc-m07-lesson": [
    {
      id: "rtc-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Writing judgments: thesis, limitations, recommendations",
      body: "Judgment writing is humility with backbone—limitations strengthen credibility.",
    },
    {
      id: "rtc-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Recommendations under uncertainty",
      body: "Pair claims with limits; separate evidence strength; offer conditional actions.",
    },
    {
      id: "rtc-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "limitations-first abstract",
      body: "Write six sentences: question, strongest evidence, key weakness, what you’d need next, provisional recommendation, falsifier.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "rtc-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Where do you hide uncertainty to sound authoritative?",
    },
    {
      id: "rtc-m07-lesson-ov-next",
      type: "next_step",
      body: "Expose one limitation explicitly in your next memo.",
    }
  ],

  "smart-workflows-with-ai::sw-m05-lesson": [
    {
      id: "sw-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Research and synthesis workflows under time pressure",
      body: "Speed without receipts is theatre. Under pressure, synthesis fails when sources blur—build a lane that preserves provenance while you compress.",
    },
    {
      id: "sw-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Evidence-preserving compression",
      body: "Separate claims from sources before summarizing; never mix “what the doc says” with “what I wish it said.” Keep a tiny citation handle per bullet so disputes do not explode scope.",
    },
    {
      id: "sw-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Source-threaded memo spine",
      body: "Take three bullets of synthesis; after each bullet add a bracketed handle to paragraph or table (p.3 Table 2). If you cannot cite, label it hypothesis.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "sw-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "When deadlines tighten, what step do you usually skip first—and how would an auditor spot that skip?",
    },
    {
      id: "sw-m05-lesson-ov-next",
      type: "next_step",
      body: "Ship the memo spine before polishing tone.",
    }
  ],

  "smart-workflows-with-ai::sw-m06-practice": [
    {
      id: "sw-m06-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Editorial QA is where brand risk becomes operational—guardrails belong in the workflow, not in optimism.",
    },
    {
      id: "sw-m06-practice-ov-task",
      type: "practice_task",
      title: "QA hooks in the pipeline",
      bullets: [
        "Map draft → reviewer → publish with explicit refusal conditions.",
        "Add a lint pass for facts vs. tone only.",
        "Define rollback if a factual error ships.",
      ],
      prompt: "Name who stops the line—approval must be a person, not a vibe.",
    },
    {
      id: "sw-m06-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Pipeline note with explicit QA owner.",
    },
    {
      id: "sw-m06-practice-ov-next",
      type: "next_step",
      body: "If QA is “everyone,” rewrite until someone is accountable.",
    }
  ],

  "smart-workflows-with-ai::sw-m07-lesson": [
    {
      id: "sw-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Operational workflows: routing, SLAs, and exception handling",
      body: "Operational workflows fail at handoffs—queues stall when ownership is fuzzy and exceptions hide in inboxes.",
    },
    {
      id: "sw-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Queues, SLAs, exception budgets",
      body: "Name time-to-first-response vs. time-to-resolution; define exception classes that trigger human routes; refuse fake SLAs nobody monitors.",
    },
    {
      id: "sw-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Exception routing sketch",
      body: "Pick one recurring failure mode (misroutes, stale tickets). Draw five nodes: detect → classify → route → resolve → learn. Assign owners at each hop.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "sw-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which metric would gamify the wrong behavior if leadership tracked it naively?",
    },
    {
      id: "sw-m07-lesson-ov-next",
      type: "next_step",
      body: "Pair your routing sketch with one kill switch if volume breaches a threshold.",
    }
  ],

  "teaching-and-facilitation::taf-m05-lesson": [
    {
      id: "taf-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Facilitation moves for live sessions",
      body: "Facilitation is designing attention—moves exist to serve outcomes, not performance.",
    },
    {
      id: "taf-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Moves tied to checks for understanding",
      body: "Pair each segment with a check: poll, brief application, peer explain, exit ticket—evidence beats “any questions?”",
    },
    {
      id: "taf-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Agenda with cognitive breaks",
      body: "Outline 45 minutes: objective, activation, modeling, guided practice, check, consolidation—name facilitation move each segment.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "taf-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which move is your crutch when energy drops—and what would better evidence learning?",
    },
    {
      id: "taf-m05-lesson-ov-next",
      type: "next_step",
      body: "Replace one lecture minute with a check.",
    }
  ],

  "teaching-and-facilitation::taf-m05-practice": [
    {
      id: "taf-m05-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Facilitation practice is choreography plus inclusion—plan airtime.",
    },
    {
      id: "taf-m05-practice-ov-task",
      type: "practice_task",
      title: "Live session blueprint",
      bullets: [
        "Define participation norms you can cite.",
        "Plan two inclusion checks.",
        "Add repair script if harm occurs.",
      ],
      prompt: "Design for the quiet expert and the dominant voice alike.",
    },
    {
      id: "taf-m05-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Agenda + moves + inclusion checks.",
    },
    {
      id: "taf-m05-practice-ov-next",
      type: "next_step",
      body: "Dry-run with a colleague—time the checks.",
    }
  ],

  "teaching-and-facilitation::taf-m07-lesson": [
    {
      id: "taf-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Assessment that informs teaching, not ranking obsession",
      body: "Assessment serves instruction—when scores become reputation games, learning dies.",
    },
    {
      id: "taf-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Assessment → instructional response",
      body: "Map items to objectives; schedule reteach; avoid curves that hide instructional failure.",
    },
    {
      id: "taf-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Item-to-reteach link",
      body: "Pick three missed items from a hypothetical quiz—write misconception hypothesis and 10-minute reteach plan for each.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "taf-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Where does your system reward ranking over growth?",
    },
    {
      id: "taf-m07-lesson-ov-next",
      type: "next_step",
      body: "Change one policy locally you control.",
    }
  ],

  "web-and-software-foundations::wf-m05-lesson": [
    {
      id: "wf-m05-lesson-ov-intro",
      type: "intro",
      eyebrow: "Applied stretch",
      title: "Databases and consistency intuition",
      body: "Most “bugs” are consistency expectations mismatch—understand transactions and failure modes before optimizing queries.",
    },
    {
      id: "wf-m05-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Consistency models non-naively",
      body: "Know what your users assume when they click save: read-your-writes, monotonic reads, or eventual settle. Map failure: duplicate clicks, retries, double charges.",
    },
    {
      id: "wf-m05-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Failure sketch for one write path",
      body: "Pick a write path (checkout, profile update). Enumerate retry/idempotency behaviors and what the user should never see twice.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "wf-m05-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Where would caching or replicas create user-visible lies in your product?",
    },
    {
      id: "wf-m05-lesson-ov-next",
      type: "next_step",
      body: "Bring the sketch to practice as a measurable hypothesis.",
    }
  ],

  "web-and-software-foundations::wf-m06-practice": [
    {
      id: "wf-m06-practice-ov-intro",
      type: "intro",
      eyebrow: "Applied lab",
      title: "Practice that ships receipts",
      body: "Performance work starts with measurement—not vibes about “slowness.”",
    },
    {
      id: "wf-m06-practice-ov-task",
      type: "practice_task",
      title: "Perceived speed diagnosis",
      bullets: [
        "Separate server latency vs. render vs. network.",
        "Pick one hypothesis and the metric that would prove it.",
        "Define a safe experiment (flag, cache, payload trim).",
      ],
      prompt: "No fixes without a trace or timer story.",
    },
    {
      id: "wf-m06-practice-ov-output",
      type: "output_prompt",
      title: "Expected artifact",
      prompt: "Prefer tables, short memos, or checklists over slide-only outputs.",
      outputExpectation: "Latency hypothesis list + measurement plan.",
    },
    {
      id: "wf-m06-practice-ov-next",
      type: "next_step",
      body: "If you cannot measure it, you are guessing.",
    }
  ],

  "web-and-software-foundations::wf-m07-lesson": [
    {
      id: "wf-m07-lesson-ov-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Security literacy for collaborators",
      body: "Security is cross-functional—designers and PMs must understand threats enough to refuse reckless shortcuts.",
    },
    {
      id: "wf-m07-lesson-ov-concept",
      type: "concept_explanation",
      eyebrow: "Discipline lens",
      title: "Collaborative threat literacy",
      body: "Translate OWASP-style themes into product decisions: auth boundaries, token lifetimes, sensitive fields, vendor APIs. Fear is not the goal—clarity is.",
    },
    {
      id: "wf-m07-lesson-ov-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Feature vs. abuse scenario",
      body: "Pick one feature and write two abuse scenarios with mitigations (rate limits, audit logs, admin alerts). Keep mitigations proportional.",
      example: "Keep artifacts under one page unless your reviewer explicitly wants depth.",
    },
    {
      id: "wf-m07-lesson-ov-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which convenience feature in your world most increases blast radius?",
    },
    {
      id: "wf-m07-lesson-ov-next",
      type: "next_step",
      body: "Ship mitigations as explicit acceptance criteria next sprint.",
    }
  ],

}
