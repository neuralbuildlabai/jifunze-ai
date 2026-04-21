/**
 * One-shot generator for mid-course session overrides (authoring aid).
 * Run: node scripts/build-flagship-mid-session-overrides.mjs
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))
const outPath = join(root, '../src/data/learning/flagshipSessionContentOverridesMidCourse.ts')

const courses = [
  ['ai-essentials', 'ae'],
  ['smart-workflows-with-ai', 'sw'],
  ['data-and-decisions', 'dd'],
  ['web-and-software-foundations', 'wf'],
  ['digital-safety', 'ds'],
  ['marketing-and-growth', 'mg'],
  ['business-builder', 'bb'],
  ['money-and-finance', 'mf'],
  ['product-thinking', 'prd'],
  ['project-execution', 'pex'],
  ['career-launch', 'cl'],
  ['clear-communication', 'cc'],
  ['research-and-critical-thinking', 'rtc'],
  ['leadership-and-teams', 'lat'],
  ['teaching-and-facilitation', 'taf'],
]

/** Middle lesson + lab session — discipline-specific prose */
const VOICES = {
  ae: {
    titles: {
      m5: 'Learning with AI without outsourcing cognition',
      m7: 'AI at work: handoffs, approvals, stakeholders, and norms',
    },
    m5: {
      intro:
        'This module sits where integrity shows up: study loops that build durable skill versus shortcuts that mimic competence. Pick a certification, degree path, or upskill goal that matters—then treat AI as practice scaffolding, not a substitute examinee.',
      conceptTitle: 'Separation of practice from substitution',
      concept:
        'Use AI for retrieval cues, mistaken explanations you must repair, or messy drafts you must verify—but keep the cognitive work that exams and ethics measure on your side of the boundary. Name three tasks where outsourcing cognition would falsify your learning claim.',
      workedTitle: 'Five-step integrity protocol',
      worked:
        'Draft a protocol with columns: AI-allowed moves, forbidden moves, verification step, escalation if tempted to cheat the boundary, what “done” means for real mastery. Keep it brutally specific to one course or credential context.',
      reflect:
        'Where are you most tempted to let the model “think for you”? Name one boundary you will treat as non-negotiable for the next month.',
      next: 'Bring the protocol to practice—your next artifact should cite where human cognition stayed in the loop.',
    },
    m7: {
      intro:
        'Hybrid work is not “AI plus people”—it is routing, disclosure, ownership, and review gates. This lesson makes collaboration legible so trust scales beyond early adopters.',
      conceptTitle: 'RACI meets disclosure discipline',
      concept:
        'Every AI-assisted artifact needs an owner who can defend it: who reviewed facts, what was generated, where uncertainty remains, and what humans decided under ambiguity. Avoid vague team norms—write behaviors people can cite in tickets.',
      workedTitle: 'Disclosure template under pressure',
      worked:
        'Sketch two emails: one safe minimal disclosure (“AI-assisted draft—facts unchecked”), one fuller disclosure for regulated contexts. Pair each with the review gate that must happen before send.',
      reflect:
        'Which stakeholder fears AI most—and what concrete behavior from you would reduce that fear without slowing truth?',
      next: 'Merge norms into your upcoming practice deliverables as explicit checklist items.',
    },
    practice: {
      mid: 'm06',
      intro:
        'Editing AI prose is quality engineering: trace claims, kill orphan facts, and surface omissions like security review.',
      taskTitle: 'Review discipline reps',
      bullets: [
        'Summarize a dense source—tag each sentence as cited, inferred, or uncited.',
        'Red-team your summary for omission and persuasive spin—note three risks.',
        'Rewrite one paragraph with marginal notes showing verification intent.',
      ],
      output: 'Edited draft + marginal verification notes.',
      prompt: 'Prefer messy marginalia over polished wrongness.',
      next: 'If you cannot point to the paragraph each claim came from, stop and fix before continuing.',
    },
  },
  sw: {
    titles: {
      m5: 'Research and synthesis workflows under time pressure',
      m7: 'Operational workflows: routing, SLAs, and exception handling',
    },
    m5: {
      intro:
        'Speed without receipts is theatre. Under pressure, synthesis fails when sources blur—build a lane that preserves provenance while you compress.',
      conceptTitle: 'Evidence-preserving compression',
      concept:
        'Separate claims from sources before summarizing; never mix “what the doc says” with “what I wish it said.” Keep a tiny citation handle per bullet so disputes do not explode scope.',
      workedTitle: 'Source-threaded memo spine',
      worked:
        'Take three bullets of synthesis; after each bullet add a bracketed handle to paragraph or table (p.3 Table 2). If you cannot cite, label it hypothesis.',
      reflect:
        'When deadlines tighten, what step do you usually skip first—and how would an auditor spot that skip?',
      next: 'Ship the memo spine before polishing tone.',
    },
    m7: {
      intro:
        'Operational workflows fail at handoffs—queues stall when ownership is fuzzy and exceptions hide in inboxes.',
      conceptTitle: 'Queues, SLAs, exception budgets',
      concept:
        'Name time-to-first-response vs. time-to-resolution; define exception classes that trigger human routes; refuse fake SLAs nobody monitors.',
      workedTitle: 'Exception routing sketch',
      worked:
        'Pick one recurring failure mode (misroutes, stale tickets). Draw five nodes: detect → classify → route → resolve → learn. Assign owners at each hop.',
      reflect:
        'Which metric would gamify the wrong behavior if leadership tracked it naively?',
      next: 'Pair your routing sketch with one kill switch if volume breaches a threshold.',
    },
    practice: {
      mid: 'm06',
      intro:
        'Editorial QA is where brand risk becomes operational—guardrails belong in the workflow, not in optimism.',
      taskTitle: 'QA hooks in the pipeline',
      bullets: [
        'Map draft → reviewer → publish with explicit refusal conditions.',
        'Add a lint pass for facts vs. tone only.',
        'Define rollback if a factual error ships.',
      ],
      output: 'Pipeline note with explicit QA owner.',
      prompt: 'Name who stops the line—approval must be a person, not a vibe.',
      next: 'If QA is “everyone,” rewrite until someone is accountable.',
    },
  },
  dd: {
    titles: {
      m5: 'Correlation, causation, and intervention humility',
      m7: 'Reporting cadence, dashboards-in-context, and decision logs',
    },
    m5: {
      intro:
        'Budgets move on stories about causation—this module trains intervention humility before you spend money or blame teams.',
      conceptTitle: 'Confounders, mechanisms, counterfactual discipline',
      concept:
        'Correlation screens for association; causal claims require design—controls, timing, or experiments. Write “we believe X because…” as a mechanism chain, not a slogan.',
      workedTitle: 'Three-lane causal story',
      worked:
        'For one KPI movement, list: (A) benign explanations, (B) rival explanations, (C) what evidence would discriminate. End with an intervention you would pilot—and a falsifier.',
      reflect:
        'Which vanity interpretation flatters your team—and what would kill that story honestly?',
      next: 'Take the falsifier into your practice lab as a measurement sketch.',
    },
    m7: {
      intro:
        'Dashboards become harmful when they answer “what looks busy” instead of “what decision is due.” Reporting cadence must match decision tempo.',
      conceptTitle: 'Dashboard → decision log discipline',
      concept:
        'Each tile should map to a decision owner and timing; include definitions and refresh limits. Separate operational monitoring from strategic learning reviews.',
      workedTitle: 'One honest dashboard tile',
      worked:
        'Pick a tile leaders stare at weekly. Rewrite its definition, lag/lead nature, known distortions, and the decision it should trigger. Add a red-flag threshold.',
      reflect:
        'Where does your org mistake activity metrics for outcomes—and what definition repair would fix it?',
      next: 'Pair the tile with a one-paragraph decision log entry template.',
    },
    practice: {
      mid: 'm06',
      intro:
        'Trend lines seduce—regimes shift. Treat volatility as a hypothesis test, not wallpaper.',
      taskTitle: 'Noise vs. regime change',
      bullets: [
        'Plot or sketch a volatile series with annotations for external shocks.',
        'Write two rival narratives for the same dip.',
        'Choose what you would monitor next week to discriminate.',
      ],
      output: 'Strip plot notes + regime hypothesis.',
      prompt: 'If both narratives fit, say so—then design a discriminating observation.',
      next: 'Avoid heroic forecasts; prefer disciplined monitoring.',
    },
  },
  wf: {
    titles: {
      m5: 'Databases and consistency intuition',
      m7: 'Security literacy for collaborators',
    },
    m5: {
      intro:
        'Most “bugs” are consistency expectations mismatch—understand transactions and failure modes before optimizing queries.',
      conceptTitle: 'Consistency models non-naively',
      concept:
        'Know what your users assume when they click save: read-your-writes, monotonic reads, or eventual settle. Map failure: duplicate clicks, retries, double charges.',
      workedTitle: 'Failure sketch for one write path',
      worked:
        'Pick a write path (checkout, profile update). Enumerate retry/idempotency behaviors and what the user should never see twice.',
      reflect:
        'Where would caching or replicas create user-visible lies in your product?',
      next: 'Bring the sketch to practice as a measurable hypothesis.',
    },
    m7: {
      intro:
        'Security is cross-functional—designers and PMs must understand threats enough to refuse reckless shortcuts.',
      conceptTitle: 'Collaborative threat literacy',
      concept:
        'Translate OWASP-style themes into product decisions: auth boundaries, token lifetimes, sensitive fields, vendor APIs. Fear is not the goal—clarity is.',
      workedTitle: 'Feature vs. abuse scenario',
      worked:
        'Pick one feature and write two abuse scenarios with mitigations (rate limits, audit logs, admin alerts). Keep mitigations proportional.',
      reflect:
        'Which convenience feature in your world most increases blast radius?',
      next: 'Ship mitigations as explicit acceptance criteria next sprint.',
    },
    practice: {
      mid: 'm06',
      intro:
        'Performance work starts with measurement—not vibes about “slowness.”',
      taskTitle: 'Perceived speed diagnosis',
      bullets: [
        'Separate server latency vs. render vs. network.',
        'Pick one hypothesis and the metric that would prove it.',
        'Define a safe experiment (flag, cache, payload trim).',
      ],
      output: 'Latency hypothesis list + measurement plan.',
      prompt: 'No fixes without a trace or timer story.',
      next: 'If you cannot measure it, you are guessing.',
    },
  },
  ds: {
    titles: {
      m5: 'Devices, updates, and backups that survive reality',
      m7: 'Vendor and SaaS governance without bureaucracy',
    },
    m5: {
      intro:
        'Backups fail quietly until ransomware teaches you. Treat recovery drills as part of hygiene—not optimism.',
      conceptTitle: 'Recoverability beats intent',
      concept:
        'Define RPO/RTO in plain language for your personal stack and team stack; verify restores, not backup jobs. Patch cadence is risk acceptance written down.',
      workedTitle: 'Restore drill outline',
      worked:
        'Write steps to restore one critical folder or DB from backup—who does what, where credentials live, how you validate integrity.',
      reflect:
        'What single lazy habit would hurt you most in a laptop-loss scenario?',
      next: 'Schedule the smallest meaningful restore test this month.',
    },
    m7: {
      intro:
        'Every SaaS is an extension of your perimeter—permissions and data residency matter more than buzzword compliance.',
      conceptTitle: 'Least privilege that scales',
      concept:
        'Inventory integrations with scopes; remove dormant OAuth grants; segment admin roles; document offboarding triggers.',
      workedTitle: 'Vendor risk card',
      worked:
        'Pick one vendor: data classes touched, SSO posture, audit logs available, breach notification path, kill switch.',
      reflect:
        'Which integration would you regret most if credentials leaked tonight?',
      next: 'Turn the card into an owner + review date.',
    },
    practice: {
      mid: 'm07',
      intro:
        'Governance fails when access mirrors convenience—prove least privilege with evidence.',
      taskTitle: 'Access matrix slice',
      bullets: [
        'List roles vs. sensitive actions for one SaaS.',
        'Identify three overprivileged accounts.',
        'Define remediation without blocking legitimate work.',
      ],
      output: 'Access matrix draft + escalation path.',
      prompt: 'Prefer reversible steps—big bang lockouts create shadow IT.',
      next: 'Pair matrix with sponsor communication language.',
    },
  },
  mg: {
    titles: {
      m5: 'Content operating model: themes, calendar, repurposing with intent',
      m7: 'Integrated campaign design: offer logic, narrative arc, landing story',
    },
    m5: {
      intro:
        'Calendars become noise factories when rows are not tied to buyer stage proof—run content like production with QC and reuse rules.',
      conceptTitle: 'Calendar ↔ funnel coherence',
      concept:
        'Each publish event should trace to an audience insight and a measurable next step—not “Tuesday needs a post.” Define minimum quality bar per surface.',
      workedTitle: 'Eight-week skeleton with proof hooks',
      worked:
        'Draft eight rows: pillar tag, stage, proof asset referenced, distribution slot, QC owner, kill metric if engagement lies.',
      reflect:
        'Which vanity metric tempts you to celebrate busywork?',
      next: 'Bring the skeleton into practice as a calendar v1.',
    },
    m7: {
      intro:
        'Integrated campaigns fail when offer logic, narrative, and landing contradict—alignment is economics, not aesthetics.',
      conceptTitle: 'Offer logic before creative polish',
      concept:
        'Sequence insight → promise → proof → CTA with one accountable hypothesis. Narrative arc should survive legal and finance review.',
      workedTitle: 'Campaign spine on one page',
      worked:
        'Write offer, ICP tension, promise, proof artifacts, primary KPI, kill rule before spend. Include what you refuse to claim.',
      reflect:
        'Where does marketing rhetoric outrun product truth—and how would you tighten?',
      next: 'Pressure-test spine with one skeptical sales peer.',
    },
    practice: {
      mid: 'm05',
      intro:
        'Repurposing without intent creates channel spam—each surface needs a shaped job.',
      taskTitle: 'Repurpose map',
      bullets: [
        'Start from one flagship asset.',
        'Map three channels with format-fit rationale.',
        'Define QC differences per surface.',
      ],
      output: 'Editorial calendar v1 with QC gates.',
      prompt: 'If repurposing is copy-paste, stop—reshape the hook.',
      next: 'Ship calendar rows that name proof, not platitudes.',
    },
  },
  bb: {
    titles: {
      m5: 'Pricing discipline: value math, sensitivity, ethical floors',
      m7: 'Operating rhythm: cadences owners actually attend',
    },
    m5: {
      intro:
        'Pricing encodes strategy—margin math without ethics becomes extraction. Build sensitivity tables that expose tradeoffs plainly.',
      conceptTitle: 'Value math under constraints',
      concept:
        'Separate unit economics from willingness-to-pay signals; explore cannibalization and competitive reactions; state ethical floors where you will not chase revenue.',
      workedTitle: 'Sensitivity slice',
      worked:
        'Pick one SKU or service tier—model base, downside, upside with triggers that change price or packaging.',
      reflect:
        'Which customer segment subsidizes another today—and is that intentional?',
      next: 'Bring numbers to practice—no slogan price moves.',
    },
    m7: {
      intro:
        'Cadences rot when rituals multiply—fewer meetings with sharper decisions beat theater.',
      conceptTitle: 'Cadence design for throughput',
      concept:
        'Define inputs each ritual requires, decisions it may produce, and explicit “no agenda” bans. Owners publish pre-reads or the meeting slips.',
      workedTitle: 'One ritual repaired',
      worked:
        'Choose a recurring meeting—rewrite purpose, decision rights, pre-read, and kill criteria if it stops paying rent.',
      reflect:
        'Which cadence exists because of anxiety, not outcomes?',
      next: 'Pilot the repaired ritual for two cycles—measure decisions shipped.',
    },
    practice: {
      mid: 'm05',
      intro:
        'Pricing practice needs numbers on the page—spreadsheets beat slides.',
      taskTitle: 'Sensitivity grid',
      bullets: [
        'Build base/downside/upside cases.',
        'Name elasticities you actually believe vs. guess.',
        'State ethical floor explicitly.',
      ],
      output: 'Sensitivity grid + explicit tradeoffs.',
      prompt: 'If assumptions are silent, stakeholders will fill them with fear.',
      next: 'Pair grid with a one-page narrative for non-finance partners.',
    },
  },
  mf: {
    titles: {
      m5: 'Pricing as choice under constraints: value, competition, ethics',
      m7: 'Negotiating money: packages, trade space, calm process',
    },
    m5: {
      intro:
        'Finance judgment is choosing under uncertainty—label constraints before debating tactics.',
      conceptTitle: 'Trade space clarity',
      concept:
        'Package price, term, risk allocation, and timing as one trade space—avoid arguing single numbers without structure.',
      workedTitle: 'BATNA + walk-away band',
      worked:
        'Write your BATNA in sentences, not vibes; define walk-away band tied to cash timing and risk appetite.',
      reflect:
        'Where does optimism bias inflate your BATNA?',
      next: 'Pressure-test with one adversarial peer question.',
    },
    m7: {
      intro:
        'Money conversations go sideways when process is vague—calm procedure protects relationships and outcomes.',
      conceptTitle: 'Process as fairness technology',
      concept:
        'Sequence discovery → alignment → written terms → escalation paths; separate people respect from terms debate.',
      workedTitle: 'Negotiation map',
      worked:
        'For one live scenario, list interests (not positions), tradeables, non-negotiables, and objective standards you will cite.',
      reflect:
        'What emotional trigger most derails you in money talks?',
      next: 'Script one repair phrase for that trigger.',
    },
    practice: {
      mid: 'm05',
      intro:
        'Packages beat haggling—design trade space before you enter the room.',
      taskTitle: 'Trade-space sheet',
      bullets: [
        'List variables beyond price.',
        'Rank concessions by cost to you.',
        'Define objective standards for disagreement.',
      ],
      output: 'BATNA notes + trade-space doc.',
      prompt: 'Never negotiate against yourself in silence—write it down.',
      next: 'Rehearse aloud once—awkward beats surprised.',
    },
  },
  prd: {
    titles: {
      m5: 'Roadmaps as bets with buffers, not Gantt fantasy',
      m7: 'Shipping to learn: launches, instrumentation discipline',
    },
    m5: {
      intro:
        'Roadmaps fail when they pretend certainty—buffers encode uncertainty honestly and protect trust.',
      conceptTitle: 'Bet framing vs. date theater',
      concept:
        'Each item is a bet with hypothesis, leading signals, and kill criteria; dates are commitments only where reversibility is low.',
      workedTitle: 'Bet card',
      worked:
        'Pick one roadmap row—write hypothesis, leading metric, lagging metric, buffer rationale, decision date.',
      reflect:
        'Which stakeholder pressure converts buffers back into fantasy dates?',
      next: 'Publish bet language where engineering can critique it.',
    },
    m7: {
      intro:
        'Shipping without instrumentation is wishing—define learning signals before launch noise arrives.',
      conceptTitle: 'Instrumentation as product ethics',
      concept:
        'Pair releases with events you trust; guard privacy; prefer decision-ready slices over vanity counts.',
      workedTitle: 'Launch learning plan',
      worked:
        'Define three events, two funnels, one guardrail metric, and the decision each enables within two weeks.',
      reflect:
        'Which metric would excite leadership but mislead product judgment?',
      next: 'Delete or demote that metric from your primary review.',
    },
    practice: {
      mid: 'm05',
      intro:
        'Roadmap practice means visible uncertainty—buffers are features of honesty.',
      taskTitle: 'Buffered slice',
      bullets: [
        'Rewrite a timeline row as a bet.',
        'Expose dependencies explicitly.',
        'Name what you will cut if signals miss.',
      ],
      output: 'Roadmap excerpt with buffers visible.',
      prompt: 'If everything is must-have, you have no strategy.',
      next: 'Socialize with engineering—invite puncture.',
    },
  },
  pex: {
    titles: {
      m5: 'Risk practice: registers tied to triggers',
      m7: 'Change leadership without buzzword soup',
    },
    m5: {
      intro:
        'Risk registers become theater without triggers—connect lines to decisions and dates.',
      conceptTitle: 'Risk → trigger → owner',
      concept:
        'Each risk needs early warning signals, mitigation owner, and escalation appetite—otherwise it is commentary.',
      workedTitle: 'Risk line hardening',
      worked:
        'Take one vague risk (“integration might slip”) and rewrite with trigger metric, date, owner, mitigation, residual acceptance.',
      reflect:
        'Which risks stay verbal because accountability is uncomfortable?',
      next: 'Put the hardened line into the practice artifact.',
    },
    m7: {
      intro:
        'Change fails when communication is abstract—translate adoption into behaviors and feedback loops.',
      conceptTitle: 'Behavioral adoption plan',
      concept:
        'Define sponsor coalition, pilot cohort, training artifacts, and feedback channels; measure adoption by behavior, not slogans.',
      workedTitle: 'Pilot slice',
      worked:
        'Draft a two-week pilot: who must change what, how we know it stuck, rollback if resistance spikes.',
      reflect:
        'Where do you sell vision instead of clarifying first steps?',
      next: 'Cut vision slides until behaviors are obvious.',
    },
    practice: {
      mid: 'm05',
      intro:
        'Risk practice belongs in the register—not in hallway anxiety.',
      taskTitle: 'Register rows that bite',
      bullets: [
        'Convert three worries into triggered lines.',
        'Pair mitigations with dates.',
        'Name residual risks you accept explicitly.',
      ],
      output: 'Risk lines tied to mitigations/dates.',
      prompt: 'If triggers are missing, you do not have a plan—only vibes.',
      next: 'Review with sponsor—demand falsifiers.',
    },
  },
  cl: {
    titles: {
      m5: 'Job search strategy: targets, pipelines, experiments',
      m7: 'Interviews: behavioral depth and technical storytelling',
    },
    m5: {
      intro:
        'Search is portfolio management—targets, experiments, kill rules beat spray-and-pray applications.',
      conceptTitle: 'Hypothesis-driven search',
      concept:
        'Define ICP employers, proof you need to collect, weekly learning metrics, and experiments with ethical boundaries.',
      workedTitle: 'Pipeline experiment card',
      worked:
        'Write one experiment (outreach angle, project proof, referral path) with success signal and stop rule.',
      reflect:
        'Which rejection fear causes you to broaden targets until you learn nothing?',
      next: 'Run the smallest experiment that teaches—this week.',
    },
    m7: {
      intro:
        'Interviews reward evidence-rich stories—adjectives are cheap; decisions and tradeoffs are not.',
      conceptTitle: 'STAR with receipts',
      concept:
        'Behavioral depth means naming situation, task, actions, results with metrics and conflict details—without blaming.',
      workedTitle: 'Two-minute evidence story',
      worked:
        'Draft one story with a hard tradeoff, a metric, and a mistake you caught—then trim to two minutes spoken.',
      reflect:
        'Which story still sounds generic—what specific detail would make it believable?',
      next: 'Record yourself once—listen for filler.',
    },
    practice: {
      mid: 'm05',
      intro:
        'Experiments need integrity—never fabricate metrics; learn honestly.',
      taskTitle: 'Search experiment',
      bullets: [
        'Pick one channel to test deeply.',
        'Define signal vs. noise for the week.',
        'Write kill criteria if signal misses.',
      ],
      output: 'Experiment card with metrics + stop rule.',
      prompt: 'Breadth without learning is motion.',
      next: 'Ship one uncomfortable proof artifact.',
    },
  },
  cc: {
    titles: {
      m5: 'Summaries and briefs: fidelity vs. compression',
      m7: 'Persuasion with integrity: stakes, ethics, and proof',
    },
    m5: {
      intro:
        'Compression without fidelity is betrayal—briefs steer costly decisions.',
      conceptTitle: 'Fidelity checkpoints',
      concept:
        'Separate facts, interpretations, and recommendations; flag contested facts; preserve dissent that matters.',
      workedTitle: 'Brief spine with dissent lane',
      worked:
        'Summarize a contested decision in one page: facts agreed, facts disputed, implications either way, recommendation with caveats.',
      reflect:
        'Where do you soften uncertainty because clarity feels rude?',
      next: 'Practice preserves dispute—do not launder it.',
    },
    m7: {
      intro:
        'Persuasion is enabling good decisions—not winning rhetorically.',
      conceptTitle: 'Proof lanes and ethical bounds',
      concept:
        'Match evidence type to claim type; disclose conflicts; invite falsification from peers.',
      workedTitle: 'Integrity persuasion outline',
      worked:
        'Draft a recommendation with proof ladder: strongest evidence first, weakest labeled, explicit unknowns.',
      reflect:
        'Which audience fear would tempt you to oversell?',
      next: 'Add one sentence that invites the strongest critique.',
    },
    practice: {
      mid: 'm05',
      intro:
        'Brief practice is forensic—every line earns its place.',
      taskTitle: 'Fidelity pass',
      bullets: [
        'Highlight inferred vs. sourced claims.',
        'Add one dissent note that matters.',
        'Tighten without losing truth.',
      ],
      output: 'Brief + fidelity checklist.',
      prompt: 'If you cannot defend a line, cut or qualify it.',
      next: 'Swap with a peer for adversarial read.',
    },
  },
  rtc: {
    titles: {
      m5: 'Quant literacy for consumers of research',
      m7: 'Writing judgments: thesis, limitations, recommendations',
    },
    m5: {
      intro:
        'Numbers persuade because they look objective—your job is to read methods before impressions.',
      conceptTitle: 'Method before headline',
      concept:
        'Ask population, design, confounding, effect size, uncertainty, and incentives before updating beliefs.',
      workedTitle: 'Decode one figure',
      worked:
        'Pick a chart or table from a paper—rewrite what it can and cannot say; list two misreadings a hurried exec would make.',
      reflect:
        'Which statistical buzzword do you nod along with though you cannot define it?',
      next: 'Define it in one sentence without jargon.',
    },
    m7: {
      intro:
        'Judgment writing is humility with backbone—limitations strengthen credibility.',
      conceptTitle: 'Recommendations under uncertainty',
      concept:
        'Pair claims with limits; separate evidence strength; offer conditional actions.',
      workedTitle: 'limitations-first abstract',
      worked:
        'Write six sentences: question, strongest evidence, key weakness, what you’d need next, provisional recommendation, falsifier.',
      reflect:
        'Where do you hide uncertainty to sound authoritative?',
      next: 'Expose one limitation explicitly in your next memo.',
    },
    practice: {
      mid: 'm05',
      intro:
        'Quant practice means tracing the chain—no borrowed prestige.',
      taskTitle: 'Claim trace',
      bullets: [
        'Quote the claim.',
        'Trace method and sample.',
        'State what remains unknown.',
      ],
      output: 'Claim → method → limits note.',
      prompt: 'If the chain breaks, downgrade confidence loudly.',
      next: 'Prefer qualified truth over crisp wrong.',
    },
  },
  lat: {
    titles: {
      m5: 'Feedback and coaching fundamentals',
      m7: 'Team learning: retros, postmortems, blameless analysis',
    },
    m5: {
      intro:
        'Feedback lands when it is behavioral, situational, and oriented to growth—not identity judgment.',
      conceptTitle: 'Intent–behavior–impact without theater',
      concept:
        'Separate observation from story; invite perspective; co-create next experiment; avoid pseudo-coaching lectures.',
      workedTitle: 'Sixty-second coaching script',
      worked:
        'Draft feedback on a real scenario using behavior specifics, impact, question, request—no personality labels.',
      reflect:
        'Which power dynamic makes you soften or sharpen too much?',
      next: 'Rehearse tone—warmth without vagueness.',
    },
    m7: {
      intro:
        'Learning organizations run blameless retros—systems thinking beats heroes and villains.',
      conceptTitle: 'Incident → learning artifact',
      concept:
        'Timeline facts first; contributing factors across layers; experiments that reduce recurrence—assign owners.',
      workedTitle: 'Postmortem spine',
      worked:
        'Sketch a blameless outline: impact, timeline, detection gap, mitigations now, systemic fixes, metrics to watch.',
      reflect:
        'Where does your culture punish messengers—and how would you repair that?',
      next: 'Pilot outline on a small incident first.',
    },
    practice: {
      mid: 'm05',
      intro:
        'Feedback practice is interpersonal risk—prepare language that preserves dignity.',
      taskTitle: 'Feedback script',
      bullets: [
        'Name observable behavior.',
        'Describe impact on work outcomes.',
        'Invite their view—co-design next step.',
      ],
      output: 'Script + intent/behavior/impact structure.',
      prompt: 'No diagnosis of character—behavior only.',
      next: 'Deliver to a trusted peer for punchy critique.',
    },
  },
  taf: {
    titles: {
      m5: 'Facilitation moves for live sessions',
      m7: 'Assessment that informs teaching, not ranking obsession',
    },
    m5: {
      intro:
        'Facilitation is designing attention—moves exist to serve outcomes, not performance.',
      conceptTitle: 'Moves tied to checks for understanding',
      concept:
        'Pair each segment with a check: poll, brief application, peer explain, exit ticket—evidence beats “any questions?”',
      workedTitle: 'Agenda with cognitive breaks',
      worked:
        'Outline 45 minutes: objective, activation, modeling, guided practice, check, consolidation—name facilitation move each segment.',
      reflect:
        'Which move is your crutch when energy drops—and what would better evidence learning?',
      next: 'Replace one lecture minute with a check.',
    },
    m7: {
      intro:
        'Assessment serves instruction—when scores become reputation games, learning dies.',
      conceptTitle: 'Assessment → instructional response',
      concept:
        'Map items to objectives; schedule reteach; avoid curves that hide instructional failure.',
      workedTitle: 'Item-to-reteach link',
      worked:
        'Pick three missed items from a hypothetical quiz—write misconception hypothesis and 10-minute reteach plan for each.',
      reflect:
        'Where does your system reward ranking over growth?',
      next: 'Change one policy locally you control.',
    },
    practice: {
      mid: 'm05',
      intro:
        'Facilitation practice is choreography plus inclusion—plan airtime.',
      taskTitle: 'Live session blueprint',
      bullets: [
        'Define participation norms you can cite.',
        'Plan two inclusion checks.',
        'Add repair script if harm occurs.',
      ],
      output: 'Agenda + moves + inclusion checks.',
      prompt: 'Design for the quiet expert and the dominant voice alike.',
      next: 'Dry-run with a colleague—time the checks.',
    },
  },
}

function lessonBlocks(pre, mod, V, T) {
  const L = mod === 'm5' ? V.m5 : V.m7
  const title = mod === 'm5' ? T.m5 : T.m7
  const id = `${pre}-${mod === 'm5' ? 'm05' : 'm07'}-lesson`
  return [
    {
      id: `${id}-ov-intro`,
      type: 'intro',
      eyebrow: mod === 'm5' ? 'Applied stretch' : 'Professional judgment',
      title,
      body: L.intro,
    },
    {
      id: `${id}-ov-concept`,
      type: 'concept_explanation',
      eyebrow: 'Discipline lens',
      title: L.conceptTitle,
      body: L.concept,
    },
    {
      id: `${id}-ov-worked`,
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: L.workedTitle,
      body: L.worked,
      example: 'Keep artifacts under one page unless your reviewer explicitly wants depth.',
    },
    {
      id: `${id}-ov-reflect`,
      type: 'reflection_prompt',
      title: 'Calibration',
      prompt: L.reflect,
    },
    {
      id: `${id}-ov-next`,
      type: 'next_step',
      body: L.next,
    },
  ]
}

function practiceBlocks(pre, pf, V) {
  const mid = pf.mid
  const id = `${pre}-${mid}-practice`
  const P = V.practice
  return [
    {
      id: `${id}-ov-intro`,
      type: 'intro',
      eyebrow: 'Applied lab',
      title: 'Practice that ships receipts',
      body: P.intro,
    },
    {
      id: `${id}-ov-task`,
      type: 'practice_task',
      title: P.taskTitle,
      bullets: P.bullets,
      prompt: P.prompt,
    },
    {
      id: `${id}-ov-output`,
      type: 'output_prompt',
      title: 'Expected artifact',
      outputExpectation: P.output,
      prompt: 'Prefer tables, short memos, or checklists over slide-only outputs.',
    },
    {
      id: `${id}-ov-next`,
      type: 'next_step',
      body: P.next,
    },
  ]
}

function esc(s) {
  return JSON.stringify(s)
}

const rec = {}
for (const [slug, pre] of courses) {
  const V = VOICES[pre]
  const T = V.titles
  rec[`${slug}::${pre}-m05-lesson`] = lessonBlocks(pre, 'm5', V, T)
  rec[`${slug}::${pre}-m07-lesson`] = lessonBlocks(pre, 'm7', V, T)
  rec[`${slug}::${pre}-${V.practice.mid}-practice`] = practiceBlocks(pre, V.practice, V)
}

function serializeBlock(b) {
  const lines = ['    {']
  for (const k of ['id', 'type', 'eyebrow', 'title', 'body', 'bullets', 'prompt', 'example', 'outputExpectation']) {
    const v = b[k]
    if (v === undefined) continue
    if (k === 'bullets') {
      lines.push(`      ${k}: [`)
      for (const item of v) lines.push(`        ${esc(item)},`)
      lines.push(`      ],`)
    } else {
      lines.push(`      ${k}: ${esc(v)},`)
    }
  }
  lines.push(`    }`)
  return lines.join('\n')
}

function serializeBlocks(blocks) {
  return `[\n${blocks.map((b) => serializeBlock(b)).join(',\n')}\n  ]`
}

let out = `/**
 * Mid-course bespoke instructional overrides — lessons m05/m07 + one applied practice per flagship.
 * Regenerate: node scripts/build-flagship-mid-session-overrides.mjs
 */

import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'

export const FLAGSHIP_SESSION_CONTENT_OVERRIDES_MIDCOURSE: Partial<
  Record<string, FlagshipSessionContentBlock[]>
> = {
`

for (const k of Object.keys(rec).sort()) {
  out += `  ${esc(k)}: ${serializeBlocks(rec[k])},\n\n`
}
out += '}\n'

writeFileSync(outPath, out)
console.log('wrote', Object.keys(rec).length, 'session overrides to', outPath)
