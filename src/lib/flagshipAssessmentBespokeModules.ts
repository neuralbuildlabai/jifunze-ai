/**
 * Hand-authored mastery checkpoints for anchor modules (foundations, pivotal practice, late mastery)
 * across all 15 flagship courses — replaces generator defaults where present.
 */

import type { FlagshipAssessmentItem } from './flagshipAssessmentTypes'
import { assessmentItemId } from './flagshipAssessmentTypes'
import { FLAGSHIP_ASSESSMENT_COMPLETION_PRESTAMPED } from './flagshipAssessmentCompletion'

type Mcq = Omit<Extract<FlagshipAssessmentItem, { kind: 'mcq' }>, 'id'>
type Scen = Omit<Extract<FlagshipAssessmentItem, { kind: 'scenario_judgment' }>, 'id'>
type Refr = Omit<Extract<FlagshipAssessmentItem, { kind: 'reflection_confirm' }>, 'id'>
type Trio = readonly [Mcq, Scen, Refr]

function mcq(prompt: string, best: string, wedge: string, rationale?: string, thirdDecoy?: string): Mcq {
  return {
    kind: 'mcq',
    prompt,
    choices: [best, wedge, thirdDecoy ?? 'Treat finishing quickly as proof of mastery.'],
    correctIndex: 0,
    rationale: rationale ?? 'Depth ties claims to evidence and falsifiers—not pace.',
  }
}

function scen(prompt: string, scenario: string, best: string, wedge: string, rationale?: string, thirdDecoy?: string): Scen {
  return {
    kind: 'scenario_judgment',
    prompt,
    scenario,
    choices: [best, wedge, thirdDecoy ?? 'Wait indefinitely—no decision is permissible until certainty is absolute.'],
    correctIndex: 0,
    rationale: rationale ?? 'Professionals surface assumptions, downside, and evidence standards before acting.',
  }
}

function refl(prompt: string, attestation: string): Refr {
  return { kind: 'reflection_confirm', prompt, attestation }
}

function stamp(moduleId: string, trio: Trio): FlagshipAssessmentItem[] {
  return trio.map((item, i) => ({
    ...item,
    id: assessmentItemId(moduleId, i),
  })) as FlagshipAssessmentItem[]
}

/** Modules that receive fully bespoke checkpoint triples (ids ::a0–::a2 stable). */
export function bespokeAssessmentTriple(moduleId: string): FlagshipAssessmentItem[] | undefined {
  const trio =
    FLAGSHIP_ASSESSMENT_BESPOKE_TRIPLES[moduleId] ??
    FLAGSHIP_ASSESSMENT_BESPOKE_MID_TRIPLES[moduleId]
  if (trio) return stamp(moduleId, trio)
  return FLAGSHIP_ASSESSMENT_COMPLETION_PRESTAMPED[moduleId]
}

const FLAGSHIP_ASSESSMENT_BESPOKE_TRIPLES: Partial<Record<string, Trio>> = {
  // --- AI Essentials ---
  'ae-m01': [
    mcq(
      'Which stance matches foundational prompt engineering + AI literacy best?',
      'Prompts steer stochastic systems—I treat prompt quality as part of output quality, and I still verify claims because fluency is not truth.',
      'Fluent length or tone substitutes for verifying facts, limits, and citations.',
      'Judgment ties outputs to stakes, failure modes, and falsifiers—not vibes.',
    ),
    scen(
      'Choose the best next move.',
      'A teammate forwards an AI-generated sales forecast with no citations. Revenue targets go out tomorrow.',
      'Label claim types (fact vs. extrapolation); demand sources or downgrade confidence in the narrative.',
      'Ship it—speed builds credibility with leadership.',
    ),
    refl(
      'Applied evidence · failure modes + prompts',
      'I tagged real model outputs with at least two failure modes (e.g., fabrication, omission), noted one prompt weakness that could have contributed, and stated what verification step I would run before reuse.',
    ),
  ],
  'ae-m04': [
    mcq(
      'Which prompt engineering habit is most defensible?',
      'Intent, constraints, evidence policy, output schema, and refusal behavior are explicit before iteration.',
      'Longer prompts always beat shorter ones—detail equals quality.',
    ),
    scen(
      'Behavior under pressure.',
      'Legal asks for a client memo tonight; your draft cites no sources. Stakeholders treat it as finished.',
      'Escalate thin evidence—qualify claims, refuse invented citations, propose review gates.',
      'Publish fast—tone matters more than traceability.',
    ),
    refl(
      'Applied evidence · prompt engineering spec',
      'I iterated at least one prompt with saved versions and noted what behavioral change each revision sought.',
    ),
  ],
  'ae-m14': [
    mcq(
      'What is the most important outcome of a team AI use agreement?',
      'Shared disclosure, review ownership, data boundaries, and escalation paths so AI-assisted work is auditable—not “everyone uses their favorite tool.”',
      'A longer policy document that nobody reads after week one.',
    ),
    scen(
      'Judgment call.',
      'A client deliverable was AI-assisted but reviewers never agreed who checked facts; the team learns Friday night.',
      'Pause send; assign a named reviewer; rebuild provenance; disclose assistance per the team template; log the gap for norm updates.',
      'Ship quietly—disclosure might worry the client.',
    ),
    refl(
      'Applied evidence · team AI coordination',
      'I drafted a one-page team AI use agreement (or solo equivalent) with disclosure, review ownership, data boundaries, and escalation—and mapped responsibilities for at least three AI-assisted steps.',
    ),
  ],

  // --- Smart Workflows ---
  'sw-m01': [
    mcq(
      'Which definition best captures workflow ownership for AI-assisted work?',
      'Every interface has inputs, outputs, owners, SLAs or checkpoints—and named prompt/spec slots per step—implicit handoffs are treated as defects.',
      'Automation means fewer meetings—ownership is optional once tools exist.',
    ),
    scen(
      'Operational reality.',
      'A “simple” AI triage keeps misrouting refunds; tickets age quietly.',
      'Roll back automation branch; add measurable gates; assign owner for exception queue.',
      'Add another model call—volume proves success.',
    ),
    refl(
      'Applied evidence · interfaces + prompt slots',
      'I drew one swimlane or interface sketch with owners, named two failure modes it must surface early, and indicated prompt/spec slots for AI touchpoints.',
    ),
  ],
  'sw-m05': [
    mcq(
      'What makes synthesis executive-ready?',
      'Claims trace to sources; conflicts stay visible; recommendations match evidence strength.',
      'Confidence in tone substitutes for confidence in data.',
    ),
    scen(
      'Evidence conflict.',
      'Two studies disagree on uplift; exec wants a single recommendation today.',
      'Summarize disagreement, stakes of wrong choice, cheapest next experiment—avoid false precision.',
      'Average the percentages and pick the midpoint.',
    ),
    refl(
      'Applied evidence · evidence table',
      'My evidence table distinguishes claim strength and notes at least one unresolved conflict explicitly.',
    ),
  ],
  'sw-m09': [
    mcq(
      'Which automation decision is most mature?',
      'Triggers, blast radius, kill switch, and owner are defined before production traffic.',
      'Ship first—guardrails slow innovation.',
    ),
    scen(
      'Risk spike.',
      'Automation branch doubled errors after a vendor model update.',
      'Trip kill switch; freeze scope; postmortem with vendor + rollback criteria.',
      'Prompt harder until quality returns.',
    ),
    refl(
      'Applied evidence · automation',
      'I documented one automated branch with false-positive tolerance and who can flip the kill switch.',
    ),
  ],

  // --- Data & Decisions (BI / KPI discipline) ---
  'dd-m01': [
    mcq(
      'Before trusting a KPI tile, what question comes first?',
      'What exactly is counted, excluded, windowed—and could this metric reward the wrong behavior?',
      'Is the color green?',
    ),
    scen(
      'Dashboard drama.',
      'Exec sees “conversion up 30% WoW.” Marketing wants budget doubled Monday.',
      'Inspect cohort, definitions, mix shifts, experiment overlap—delay spend until ambiguity shrinks.',
      'Approve budget—charts do not lie.',
    ),
    refl(
      'Applied evidence · metric autopsy',
      'I annotated at least one real chart or KPI with numerator/denominator risks and one vanity trap I will avoid.',
    ),
  ],
  'dd-m05': [
    mcq(
      'Which phrase matches causal humility?',
      'Association is not mechanism—I list confounders and what experiment would falsify my story.',
      'Correlation above 0.7 means we can scale the intervention safely.',
    ),
    scen(
      'Policy pressure.',
      'Headline says training cut defects 40%; plant manager wants roll-out funds.',
      'Demand design, comparison window, Hawthorne risks—pilot with pre-registered metrics.',
      'Fund immediately—positive percent equals proof.',
    ),
    refl(
      'Applied evidence · falsifiers',
      'I wrote at least one falsifier or confounder I cannot yet rule out for a live decision.',
    ),
  ],
  'dd-m09': [
    mcq(
      'Thin data + high stakes—best move?',
      'State priors, buy-information threshold, escalate early when harm potential exceeds proof.',
      'Decide from gut—delay looks weak.',
    ),
    scen(
      'Safety signal.',
      'Two early metrics conflict; PR wants an all-clear narrative today.',
      'Transparent limits; smallest dataset that reduces variance; escalation with unknowns logged.',
      'Pick the friendlier metric for the release note.',
    ),
    refl(
      'Applied evidence · thin data',
      'I named one decision where I would stop the metric theater and buy better data—or escalate instead of smoothing.',
    ),
  ],

  // --- Web & Software ---
  'wf-m01': [
    mcq(
      'Which collaboration stance fits non-engineers leading technical work?',
      'Trace flows end-to-end; ask falsifiable questions about failure points—not buzzwords.',
      'Memorize stack names to sound credible in meetings.',
    ),
    scen(
      'Vendor pitch.',
      'Sales claims “enterprise-grade security.” Launch is six weeks away.',
      'Ask for scopes, audit logs, breach history, SSO path—document acceptance checks.',
      'Trust the badge—timeline is sacred.',
    ),
    refl(
      'Applied evidence · flow trace',
      'I traced at least one user action to rough client/server/storage steps I could explain without jargon.',
    ),
  ],
  'wf-m04': [
    mcq(
      'Least-privilege API consumption means:',
      'Scopes match smallest blast radius; rotation and audit trails are planned—not assumed.',
      'Use admin tokens so integration “just works.”',
    ),
    scen(
      'Leak scare.',
      'Long-lived token committed to a public repo briefly.',
      'Rotate, revoke lineage, notify per policy; review scopes exposed.',
      'Delete repo folder—assume Git forgets.',
    ),
    refl(
      'Applied evidence · API checklist',
      'I listed auth/scopes/rate-limit risks for one API my org depends on.',
    ),
  ],
  'wf-m09': [
    mcq(
      'Vendor evaluation maturity shows when:',
      'Exit criteria, data portability, and proof milestones exist before spend scales.',
      'The deck looks polished and uses cloud words.',
    ),
    scen(
      'Lock-in risk.',
      'Vendor hints export “soon.” Contract renewal is next month.',
      'Document gaps; negotiate milestones; prepare parallel path or delay expansion.',
      'Sign renewal—switching cost is someone else’s problem later.',
    ),
    refl(
      'Applied evidence · vendor rubric',
      'I scored at least one vendor dimension I will not compromise on (portability, ops, exit).',
    ),
  ],

  // --- Digital Safety ---
  'ds-m01': [
    mcq(
      'Proportionate defense means:',
      'Assets and adversaries named; controls sized to real harm—not checklist theater.',
      'Buy the most expensive tool so leadership sleeps.',
    ),
    scen(
      'Panic email.',
      'Finance forwards “urgent wire change” from CEO lookalike domain.',
      'Verify out-of-band; refuse single-channel confirmation; escalate using playbook.',
      'Reply quickly to keep the CEO happy.',
    ),
    refl(
      'Applied evidence · threat framing',
      'I listed my top assets and the realistic adversary classes—not movie plots—for my context.',
    ),
  ],
  'ds-m06': [
    mcq(
      'Least privilege in SaaS sprawl starts with:',
      'Explicit tiers, periodic link/group audits, owners per sensitive asset.',
      'Everyone editor access—trust speeds work.',
    ),
    scen(
      'Contractor leaves.',
      'Shared folders still contain strategy docs; offboarding checklist unchecked.',
      'Revoke seats; rotate shared links; verify logs for unusual pulls.',
      'Assume cloud handles it.',
    ),
    refl(
      'Applied evidence · access review',
      'I captured one sharing habit I will change (links, groups, or classification).',
    ),
  ],
  'ds-m09': [
    mcq(
      'Team rituals matter because:',
      'Hygiene embedded in onboarding/offboarding beats annual security theater.',
      'Quarterly training videos satisfy compliance forever.',
    ),
    scen(
      'Audit finding.',
      'Quarterly access review unfinished; auditors arrive Friday.',
      'Honest gap list; dated remediation; owners named—credibility beats cover-up.',
      'Mass-delete seats randomly to show action.',
    ),
    refl(
      'Applied evidence · rituals',
      'I drafted one onboarding or offboarding moment that teaches security without lecture.',
    ),
  ],

  // --- Marketing & Growth (KPI / dashboards) ---
  'mg-m01': [
    mcq(
      'Growth discipline starts with:',
      'Hypotheses tied to observable signals—with falsifiers named before gathering friendly anecdotes.',
      'Posting more proves momentum.',
    ),
    scen(
      'Vanity KPI.',
      'Leadership celebrates “awareness” up while pipeline flat. Spend request lands on your desk.',
      'Expose decision the metric should drive; propose leading indicators you control this week.',
      'Double content volume—noise creates learning.',
    ),
    refl(
      'Applied evidence · hypotheses',
      'I rewrote at least one vague KPI into hypothesis + metric + timeframe + falsifier.',
    ),
  ],
  'mg-m06': [
    mcq(
      'Channel economics sanity means:',
      'Fit, workload, cash timing, and kill rules explicit—capital and creative capacity bounded.',
      'Be everywhere weakly beats dominating one channel.',
    ),
    scen(
      'Budget pressure.',
      'Paid leads spike errors; exec wants budget +50% immediately.',
      'Inspect CAC sensitivity, ops load, kill criteria—negotiate staged tests not blind scale.',
      'Spend through the dip—volume solves quality.',
    ),
    refl(
      'Applied evidence · channel scorecard',
      'My scorecard names one kill rule tied to evidence—not ego—for an active channel.',
    ),
  ],
  'mg-m09': [
    mcq(
      'Honest growth analytics requires:',
      'Attribution humility, guardrails, weekly narrative that drives actions—not vanity recap.',
      'Single north-star chart answers everything.',
    ),
    scen(
      'Dashboard fight.',
      'Two platforms disagree on conversion; marketing and finance both cite “truth.”',
      'Align definitions, cohort windows, units; document what you cannot reconcile yet.',
      'Pick the higher number for the exec deck.',
    ),
    refl(
      'Applied evidence · dashboard review',
      'I wrote one weekly learning line that names variance vs. plan and the next action—not activity.',
    ),
  ],

  // --- Business Builder ---
  'bb-m01': [
    mcq(
      'A venture hypothesis is serious when:',
      'Substitutes and inertia are named; falsifying signals exist; scope matches runway.',
      'Passion intensity correlates with market size.',
    ),
    scen(
      'Pitch night.',
      'Cofounder loves the idea; no one has paid or pre-committed.',
      'Design cheapest kill test on willingness to pay—protect calendar and cash.',
      'Build MVP—users will appear when it exists.',
    ),
    refl(
      'Applied evidence · substitution',
      'I mapped why buyers stay with status quo today—not caricature—for my context.',
    ),
  ],
  'bb-m06': [
    mcq(
      'Throughput before hype means:',
      'Bottleneck and quality bar explicit before demand amplification.',
      'Marketing spend fixes delivery.',
    ),
    scen(
      'Growth push.',
      'Sales promises shorten; support backlog explodes.',
      'Throttle acquisition; surface bottleneck; fix with dated owners.',
      'Hire faster—always a people problem.',
    ),
    refl(
      'Applied evidence · operating KPI strip',
      'I named bottleneck plus one operating signal I will review weekly (throughput, defects, or cycle).',
    ),
  ],
  'bb-m10': [
    mcq(
      'Measured expansion discipline:',
      'Cohort or retention signals gate sequencing—vanity top-line growth rejected.',
      'Follow competitor funding headlines.',
    ),
    scen(
      'Board slide.',
      'User count up; churn masked by acquisition.',
      'Expose cohort curves; tie spend to retention economics—delay scale until proof.',
      'Celebrate gross adds—logo count builds trust.',
    ),
    refl(
      'Applied evidence · cohort honesty',
      'I stated one activation or retention metric with honest denominator—not cherry-picked window.',
    ),
  ],

  // --- Money & Finance ---
  'mf-m01': [
    mcq(
      'Cash vs accrual literacy matters because:',
      'Payroll and terms determine what you can spend Tuesday—not narrative profit.',
      'Profit equals money available tomorrow.',
    ),
    scen(
      'Panic cash.',
      'P&L looks fine; payroll might bounce Friday.',
      'Open rolling cash plan with dated obligations—negotiate timing before strategic bets.',
      'Cut marketing randomly to feel proactive.',
    ),
    refl(
      'Applied evidence · timing',
      'I diagrammed or listed one obligation where timing could surprise me if ignored.',
    ),
  ],
  'mf-m06': [
    mcq(
      'Leverage judgment means:',
      'Payment shapes, covenants, stress months explicit—sleep-at-night metrics named.',
      'Low rate equals free upside.',
    ),
    scen(
      'Covenant whisper.',
      'Lender hints flexibility “informal” if you stretch inventory.',
      'Model stress; refuse handshake ambiguity; escalate to qualified advice if needed.',
      'Take informal flexibility—speed first.',
    ),
    refl(
      'Applied evidence · leverage',
      'I sketched stressed payments or named when DIY advice ends for my case.',
    ),
  ],
  'mf-m09': [
    mcq(
      'Recurring money systems succeed when:',
      'Triggers and owners exist—metrics instrument only decisions that matter.',
      'More spreadsheets equals more control.',
    ),
    scen(
      'Alarm fatigue.',
      'Weekly finance email ignored; variance silently grows.',
      'Reduce signals; tie alerts to decisions; calendar owner reviews.',
      'Send longer emails so seriousness shows.',
    ),
    refl(
      'Applied evidence · calendar',
      'I listed one trigger that forces review without crying wolf.',
    ),
  ],

  // --- Product Thinking ---
  'prd-m01': [
    mcq(
      'Outcome thinking means:',
      'Observable user or business change stated before feature lists.',
      'Roadmap density equals strategy.',
    ),
    scen(
      'Feature pressure.',
      'Exec requests “AI chat” parity with competitor.',
      'Unpack job-to-be-done, outcome metric, ethics—time-box discovery before build.',
      'Match feature checklist—parity reduces risk.',
    ),
    refl(
      'Applied evidence · outcomes',
      'I rewrote at least one feature idea into an outcome statement with a measure.',
    ),
  ],
  'prd-m06': [
    mcq(
      'Specs reduce rework when:',
      'Acceptance criteria testable without interpretation fights—tradeoffs logged.',
      'Everyone trusts intent—writing slows shipping.',
    ),
    scen(
      'Launch bug.',
      'Design and engineering argue whether “done” includes offline mode.',
      'Freeze scope slice; write criteria; decide explicit non-goals for this release.',
      'Let QA decide in the bug tracker.',
    ),
    refl(
      'Applied evidence · acceptance criteria',
      'I drafted criteria a tester could execute without asking me for intent.',
    ),
  ],
  'prd-m09': [
    mcq(
      'Ethical product research requires:',
      'Consent boundaries and proportionate data—collect only what decisions need.',
      'More tracking surfaces more insight—defaults favor analytics.',
    ),
    scen(
      'Growth hack suggestion.',
      'PM proposes hidden retention hooks users cannot disable.',
      'Reject dark patterns; document ethical posture; ship transparent controls.',
      'Ship quietly—conversion lifts fund better UX later.',
    ),
    refl(
      'Applied evidence · ethics',
      'I flagged one manipulative pattern I refuse to ship and what I would measure instead.',
    ),
  ],

  // --- Project Execution ---
  'pex-m01': [
    mcq(
      'Charter discipline means:',
      'Success signals and non-goals explicit—hidden scope treated as risk.',
      'Detailed tickets substitute for intent.',
    ),
    scen(
      'Scope creep.',
      'Sponsor adds “small” requirements weekly—team burns out.',
      'Surface trade-offs; document non-goals; escalate with impact and dates.',
      'Absorb quietly—relationships matter more than dates.',
    ),
    refl(
      'Applied evidence · charter',
      'I listed non-goals or hidden commitments masquerading as tasks for my initiative.',
    ),
  ],
  'pex-m06': [
    mcq(
      'Execution cadence earns trust when:',
      'Checkpoints produce decisions from signals—not recycled status theater.',
      'More meetings equals better alignment.',
    ),
    scen(
      'Status meeting.',
      'Thirty slides; zero decisions; deadline Friday.',
      'Cut deck; publish async status strip; reserve meeting for decisions and owners.',
      'Add slides so leadership feels informed.',
    ),
    refl(
      'Applied evidence · status',
      'I drafted one weekly outline tying milestones, blockers, and asks—not activity.',
    ),
  ],
  'pex-m09': [
    mcq(
      'Pressure delivery maturity shows when:',
      'Escalation carries evidence snapshot and trade options—not panic.',
      'Working harder proves commitment.',
    ),
    scen(
      'Exec ping.',
      'Two executives conflict on priority; team thrashes.',
      'Isolate scope trade; escalate with options, dates, quality impact—shield makers.',
      'Say yes to both—teams adapt.',
    ),
    refl(
      'Applied evidence · escalation',
      'I tied one escalation story to metrics or facts—not tone—that justified urgency.',
    ),
  ],

  // --- Career Launch ---
  'cl-m01': [
    mcq(
      'Career direction quality improves when:',
      'Constraints and hypotheses are written—exploration has falsifiers.',
      'Vision boards attract opportunities.',
    ),
    scen(
      'Romantic target.',
      'You want “impact” roles but avoid defining compensation floor.',
      'Name constraints; test role families against evidence—adjust targets honestly.',
      'Apply broadly—volume surfaces fit.',
    ),
    refl(
      'Applied evidence · constraints',
      'I listed immovable constraints and one hypothesis I will test this quarter.',
    ),
  ],
  'cl-m06': [
    mcq(
      'Networking quality means:',
      'Curiosity and specificity—follow-ups add value without extraction guilt.',
      'Connections count equals career progress.',
    ),
    scen(
      'Follow-up guilt.',
      'You want a referral but have not engaged their work.',
      'Offer insight or clarify ask tied to their domain—respect decline paths.',
      'Ping weekly until they respond.',
    ),
    refl(
      'Applied evidence · outreach',
      'I wrote one conversation prep with a question referencing their actual work—not generic praise.',
    ),
  ],
  'cl-m10': [
    mcq(
      'Negotiation readiness means:',
      'BATNA, trade space, regret criteria explicit—accept/reject deliberate.',
      'Highest offer wins emotionally.',
    ),
    scen(
      'Offer deadline.',
      'Complex offer arrives Sunday night; adrenaline spikes.',
      'Decode components; clarify unknowns; decide against criteria—not clock panic.',
      'Accept immediately—deadlines prove scarcity.',
    ),
    refl(
      'Applied evidence · readiness pack',
      'I traced one résumé bullet to evidence an interviewer could verify.',
    ),
  ],

  // --- Clear Communication ---
  'cc-m01': [
    mcq(
      'Executive-grade communication starts with:',
      'Audience, decision, success signal, constraints—before paragraphs.',
      'Strong hooks and polish signal competence.',
    ),
    scen(
      'Inbox flood.',
      'CEO asks “thoughts?” with no decision frame.',
      'Reply with proposed decision, risks, ask—bounded length.',
      'Draft comprehensive essay showing thoroughness.',
    ),
    refl(
      'Applied evidence · intent',
      'I stated audience + decision + success signal for one real piece I owe.',
    ),
  ],
  'cc-m06': [
    mcq(
      'Evidence-laned memos protect readers when:',
      'Facts, interpretations, recommendations visually separated—appendix receipts.',
      'Confidence adjectives replace citations.',
    ),
    scen(
      'Inference leak.',
      'Legal notices recommendation implies causation facts do not support.',
      'Flag gap; downgrade claim; add exhibit or soften recommendation.',
      'Keep tone confident—execs prefer certainty.',
    ),
    refl(
      'Applied evidence · memo lanes',
      'I labeled one interpretation vs fact in my draft and pointed to evidence.',
    ),
  ],
  'cc-m10': [
    mcq(
      'Portfolio assembly maturity:',
      'Pieces prove range + judgment—not volume; doctrine explains boundaries.',
      'More samples always impress.',
    ),
    scen(
      'Reviewer fatigue.',
      'Peer says pieces feel disjoint; voice unstable.',
      'Cut ruthlessly; harmonize spine; narrate trade-offs explicitly.',
      'Add cover letter optimism.',
    ),
    refl(
      'Applied evidence · portfolio',
      'I chose artifacts that prove promised strengths—not everything I ever wrote.',
    ),
  ],

  // --- Research & Critical Thinking ---
  'rtc-m01': [
    mcq(
      'Falsifiable inquiry means:',
      'Evidence could change my answer—scope and exclusions explicit.',
      'Strong opinions signal expertise.',
    ),
    scen(
      'Hot headline.',
      'Stakeholder wants policy from one viral article.',
      'Scope question; hunt sources; delay prescription until evidence ladder exists.',
      'Act fast—public pressure demands response.',
    ),
    refl(
      'Applied evidence · scope',
      'I wrote one falsifier or exclusion for a live question I care about.',
    ),
  ],
  'rtc-m06': [
    mcq(
      'Synthesis under disagreement requires:',
      'Contradictions mapped with cited anchors—not “both sides” mush.',
      'Average expert opinions.',
    ),
    scen(
      'Expert split.',
      'Two papers conflict; exec wants single recommendation today.',
      'Document disagreement landscape; what evidence would adjudicate; proportional confidence.',
      'Pick the credential you like better.',
    ),
    refl(
      'Applied evidence · disagreement map',
      'I noted where experts agree vs clash with at least one citation anchor.',
    ),
  ],
  'rtc-m09': [
    mcq(
      'Intellectual honesty under identity pressure means:',
      'Motivated reasoning surfaced—critique invited before beliefs cement.',
      'Defend tribe first—correction harms reputation.',
    ),
    scen(
      'Confirmation cheer.',
      'Your side’s study confirms what you hoped—media celebrates.',
      'Stress-test methods; seek adversarial pass; log limits.',
      'Share widely—speed builds allyship.',
    ),
    refl(
      'Applied evidence · bias',
      'I logged one recent read where I cheered instead of scrutinized—and what I will do next time.',
    ),
  ],

  // --- Leadership & Teams ---
  'lat-m01': [
    mcq(
      'Leadership vs theater distinguishes:',
      'Observable outcomes and learning signals—not visibility hacks.',
      'Busy calendars prove leadership.',
    ),
    scen(
      'Vanity sprint.',
      'Team ships heroics weekly; quality slips silently.',
      'Name standards; cut performative urgency; instrument outcomes.',
      'Celebrate hustle—culture needs energy.',
    ),
    refl(
      'Applied evidence · outcomes',
      'I separated one leadership outcome I will measure from one theater pattern I will drop.',
    ),
  ],
  'lat-m06': [
    mcq(
      'Conflict repair maturity:',
      'Facts, impact, request, follow-up dates—HR path known if needed.',
      'Staying calm means avoiding hard topics.',
    ),
    scen(
      'Public clash.',
      'Two leads argue in Slack; sides form.',
      'Move to structured conversation; separate standards from personalities; schedule follow-through.',
      'Let them vent—sunlight heals.',
    ),
    refl(
      'Applied evidence · repair',
      'I outlined one hard conversation with facts → impact → request.',
    ),
  ],
  'lat-m09': [
    mcq(
      'Performance management with dignity means:',
      'Early evidence trails; capability vs conduct clarity; humane metrics.',
      'Stack rank restores fairness.',
    ),
    scen(
      'Surprise review.',
      'Report shocked by negative rating—no prior signals documented.',
      'Reset process; document behaviors; offer support path with dates.',
      'Defend rating—surprise teaches resilience.',
    ),
    refl(
      'Applied evidence · performance',
      'I tied feedback to observable outcomes—not labels—for one real scenario.',
    ),
  ],

  // --- Teaching & Facilitation ---
  'taf-m01': [
    mcq(
      'Observable outcomes mean:',
      'Strangers could see mastery signals—not vague “understanding” verbs alone.',
      'Coverage equals learning.',
    ),
    scen(
      'Time crunch.',
      'Admin wants syllabus compressed 40%; standards slide.',
      'Cut topics; protect checks for understanding; document trade-offs explicitly.',
      'Speed lecture—smart students keep up.',
    ),
    refl(
      'Applied evidence · outcomes',
      'I rewrote one vague objective into observable learner behavior.',
    ),
  ],
  'taf-m06': [
    mcq(
      'Inclusive facilitation requires:',
      'Norms learners can cite; accessibility passes; repair scripts for mistakes.',
      'Politeness substitutes for inclusion.',
    ),
    scen(
      'Dominant voice.',
      'One learner monopolizes; others withdraw.',
      'Redistribute airtime with moves that avoid shame; revisit norms.',
      'Let group self-regulate—adults manage themselves.',
    ),
    refl(
      'Applied evidence · norms',
      'I drafted one norm my room could cite when friction appears.',
    ),
  ],
  'taf-m09': [
    mcq(
      'Assessment that informs teaching:',
      'Items map to objectives; results schedule instructional revisions—not ranking hunger.',
      'Hard exams prove rigor.',
    ),
    scen(
      'Scores crash.',
      'Midterm bell curve ugly; parents email.',
      'Analyze misconception patterns; revise instruction; proportionate support.',
      'Curve grades—preserve reputation.',
    ),
    refl(
      'Applied evidence · instructional review',
      'I linked one assessment item to an objective and stated what teaching change follows if scores miss.',
    ),
  ],
}

const FLAGSHIP_ASSESSMENT_BESPOKE_MID_TRIPLES: Partial<Record<string, Trio>> = {
  "ae-m02": [
    mcq(
      "Which habit resists prompt myths?",
      "I test prompts against explicit success criteria—clarity, constraints, evidence rules—not slogans from social media.",
      "If the prompt is long, the answer must be good.",
    ),
    scen(
      "Colleague optimization.",
      'A teammate claims a “magic phrase” fixes hallucinations on medical advice.',
      "Explain why templated phrases are not a substitute for evidence policy, refusal behavior, and human review at stake.",
      "Adopt the phrase team-wide immediately—volume proves adoption.",
    ),
    refl(
      "Applied evidence · prompt myths",
      "I recorded one prompt myth I used to believe and how I now test prompts instead.",
    ),
  ],
  "ae-m03": [
    mcq(
      "Why are prompts part of tool selection—not an afterthought?",
      "Different tools imply different prompt contracts, permissions, and data tiers; the control surface matters as much as the model name.",
      "Pick the highest benchmark score—benchmarks replace integration thinking.",
    ),
    scen(
      "Sensitive workflow.",
      "A vendor demo shows great answers when you paste customer notes into a web chat.",
      "Map data tier + refusal to paste; demand approved paths; define an acceptance-test prompt for the approved environment.",
      "Use the demo environment for speed—policy can catch up.",
    ),
    refl(
      "Applied evidence · prompt contract",
      "I sketched one minimum viable prompt contract (inputs, forbidden moves, output shape) for a real workflow.",
    ),
  ],
  "ae-m05": [
    mcq(
      'What makes prompt iteration defensible to a reviewer?',
      'Hypothesis per change, saved prompt/output pairs, rubric checks, and rollback when a “better” variant regresses format, safety, or evidence rules.',
      'Retrying with random wording until the answer feels confident enough.',
    ),
    scen(
      'Regression under deadline.',
      'Stakeholders prefer v3 tone, but v3 silently drops the citations table the client requires. Ship is tonight.',
      'Rollback to last known-good prompt spec, isolate which edit caused the regression, fix the contract, re-run checks before ship.',
      'Ship v3—tone approval means citations are probably fine.',
    ),
    refl(
      'Applied evidence · iteration',
      'I logged at least two prompt versions with what each change targeted, and one rubric row that forced a real rewrite—not cosmetic edits.',
    ),
  ],
  "sw-m02": [
    mcq(
      "What defines professional prompt engineering in a workflow context?",
      "Explicit role/context/constraints/format/refusal behavior, version notes, and output evaluation—not stylistic vibes.",
      "Use more adjectives until the model sounds confident.",
    ),
    scen(
      "Production incident.",
      "A vague prompt routes refunds incorrectly after a model update—volume looks fine.",
      "Freeze the prompt branch; diff prompt versions; add measurable gates; assign owner for prompt rollback.",
      "Prompt harder until quality returns—throughput proves success.",
    ),
    refl(
      "Applied evidence · prompt anatomy",
      "I wrote a structured prompt spec with labeled sections and one line on what v2 attempts to fix.",
    ),
  ],
  "sw-m04": [
    mcq(
      "When a multi-step chain drifts, what is the most mature response?",
      "Identify the failing step’s prompt contract, roll back or revise that block with a logged diff, and re-run with checkpoints.",
      "Re-run the whole chain until text looks acceptable.",
    ),
    scen(
      "Ops pressure.",
      "Step 3 skips the human checkpoint because tickets are backing up.",
      "Stop the skip; restore gate; measure misroutes; treat bypass as defect.",
      "Allow bypass during backlog—customer sentiment matters most.",
    ),
    refl(
      "Applied evidence · chain prompts",
      "I documented one rollback trigger tied to a specific step prompt—not a generic retry.",
    ),
  ],
  "ae-m08": [
    mcq(
      'You want AI to genuinely deepen your skill in a graded or certified subject—not just produce nicer-looking work. Which study loop is honest about that intent?',
      'Use AI to generate retrieval prompts you answer first from memory, to explain mistakes you cannot diagnose alone, and to pressure-test your reasoning—then verify the model against the syllabus and write the submission yourself, with allowed and forbidden moves named in advance.',
      'Have the model author the answer, then paraphrase it in your own voice; revise until a plagiarism checker is satisfied.',
      'Authentic learning keeps the cognitive work that exams and credentials actually measure on the human side. Scaffolding raises ceilings; substitution forges them. The fix is not paraphrasing—it is naming forbidden moves before deadline pressure rewrites them.',
      'Avoid AI entirely while studying; any contact corrupts the learning record.',
    ),
    scen(
      'Choose the most defensible move.',
      'It is 11 p.m. before a graded case study. You drafted the analysis yourself, but your conclusion contradicts a key reading. The model offers a clean, confident rewrite that resolves the tension. Your institution allows AI as a tutor but forbids submitted text the learner did not author.',
      'Stop the rewrite; ask the model to surface what each side of the contradiction assumes and which evidence would adjudicate; reread the source passage; write your own revised paragraph naming the unresolved tension; record the AI use accurately if disclosure is required.',
      'Paste the AI rewrite, change three sentences in your voice, and submit—the substance matches what you would have argued anyway.',
      'Tired-you needs a forbidden-move list written in advance: "model-authored submitted text" stays forbidden even when the rewrite is good. Tutoring on the contradiction is the allowed move; substituting authorship is not.',
      'Skip the deadline entirely—any AI-touched submission is a violation.',
    ),
    refl(
      'Applied evidence · integrity-forward study loop',
      'For one real graded or certified context I touch, I wrote a five-step study protocol with explicit allowed and forbidden moves, drafted at least one retrieval and one explanation prompt that scaffold rather than substitute, named the verification step I will run before submission, and stated the escalation move I will use when tempted to cross the line.',
    ),
  ],
  "ae-m06": [
    mcq(
      'You are choosing how hard to verify a claim before it influences a real decision. Which lens is most defensible?',
      'Match verification depth to reversibility and blast radius—score evidence strength explicitly, keep conflicts visible, and label unknowns instead of smoothing them.',
      'Trust three runs that agree, since repeated fluent answers usually share the same source.',
      'Verification lanes are sized to stakes, not to how confident the prose sounds. Three identical fluent answers can share one weak source; matched depth catches that.',
      'Verify everything to the same heavy standard—uniform rigor signals seriousness.',
    ),
    scen(
      'Pick the most defensible next action.',
      'You have a six-page AI summary on a vendor decision. The deadline is Friday. Two of the eight load-bearing claims have inline citation-shaped strings; one cites a paper a colleague cannot locate; three are reversible procurement details; the others touch a multi-year contract you cannot unwind cheaply.',
      'Split the claims into reversible vs irreversible lanes; open the cited paper before any quote travels; downgrade the unfindable citation to "uncited—needs source"; brief the executive with conflicts and the cheapest next information buy before signing.',
      'Forward the AI summary as-is with a confident cover note—Friday matters more than a missing citation; legal will catch real problems later.',
      'Senior judgment treats a fabricated-looking citation as a load-bearing failure on irreversible work, not a footnote nuisance. Reversible cells deserve a lighter pass; irreversible ones need provenance before they leave your hands.',
      'Refuse to use the AI summary at all and rewrite the brief from scratch by hand.',
    ),
    refl(
      'Applied evidence · verification table + conflict-visible brief',
      'For one real or realistic claim from this module, I built an evidence table that scores claim strength, preserves at least one unresolved conflict in the brief itself, names the cheapest next information buy, and states what observation would flip my recommendation.',
    ),
  ],
  "ae-m07": [
    mcq(
      'Which editorial move is most professional for AI-assisted writing?',
      'Separate structure, factual review, and tone; keep contested facts tied to citations or explicit gaps.',
      'Polish wording until it reads well while skipping factual traceability.',
    ),
    scen(
      'Stakeholder loves the draft.',
      'The brief cites no sources; release is tomorrow.',
      'Escalate thin evidence—qualify claims, refuse invented citations, propose review gates.',
      'Ship fast—tone matters more than traceability.',
    ),
    refl(
      'Applied evidence · writing lane',
      'I edited one AI draft with inline verification questions—not cosmetic fixes only.',
    ),
  ],
  "ae-m09": [
    mcq(
      'Which stance best matches responsible operational AI use?',
      'Disclosure, proportionate review, refusal boundaries, and named human owners for escalation—not “move fast and assume the model checked.”',
      'If the tool has an enterprise badge, accountability transfers to the vendor.',
    ),
    scen(
      'Shadow tool adoption.',
      'A team ships customer summaries from an unapproved assistant to meet SLAs.',
      'Stop the flow; restore approved paths; document incident; reinstate review owners.',
      'Allow it until someone complains—velocity proves value.',
    ),
    refl(
      'Applied evidence · responsibility',
      'I wrote one responsible-use rule I will enforce when tired—and the escalation path if I cannot.',
    ),
  ],
  "ae-m10": [
    mcq(
      'Before pasting into any AI tool, which test best protects you, your colleagues, and the people in the data?',
      'Apply the minimum-necessary test, classify the input into safe / caution / restricted / never-enter (classify up when tiers blur), redact identifiers or abstract the case, and pause to ask an authorised reviewer when policy is unclear or stakes are high.',
      'Paste the full source verbatim so the model has maximum context; the longer the input, the better the answer.',
      'Once content leaves your screen into a third-party tool you cannot fully recall it, so reduce the surface before you press send. The "absence of a clear yes is not a yes"—when tiers blur, the safer default is escalation, not convenience.',
      'Trust the vendor\'s "enterprise" badge as proof that any input is safe to share.',
    ),
    scen(
      'Choose the most defensible operational response.',
      'A teammate pastes a customer\'s full email thread—names, payment reference, account ID, and a complaint—into a public AI chat to draft a refund reply. Screenshots of the chat appear in an internal channel "to speed approval." Your team has a Tier 3 rule for client identifying data and an unapproved-tool policy.',
      'Stop further pastes; preserve logs and screenshots; notify the security or compliance lead per the incident playbook; scope which identifiers were exposed; reroute the refund through the approved tool with redacted prompts; capture the lesson in a never-enter checklist before the next shift.',
      'Have the teammate delete the chat locally and the internal screenshot, then proceed because no external complaint has arrived.',
      'Containment plus controlled escalation keeps the issue solvable; "delete and hope" destroys the evidence you would need if the customer or a regulator asks. The follow-up is a written rule a tired teammate can still execute next Tuesday.',
      'Block AI use across the team indefinitely as collective punishment until trust is restored.',
    ),
    refl(
      'Applied evidence · Safe-Use Decision Card + redacted prompt',
      'For one operational task I actually run, I wrote a Safe-Use Decision Card naming the data tier, the minimum-necessary input, the redaction or abstraction pattern, the never-enter classes, the pause-or-escalate trigger with a named contact, and I produced a redacted version of a real prompt I would otherwise have sent raw.',
    ),
  ],
  "ae-m11": [
    mcq(
      'What makes research synthesis executive-ready?',
      'Claims trace to sources; conflicts stay visible; recommendations match evidence strength.',
      'Confidence in tone substitutes for confidence in data.',
    ),
    scen(
      'Evidence conflict.',
      'Two studies disagree on uplift; exec wants a single recommendation today.',
      'Summarize disagreement, stakes of wrong choice, cheapest next experiment—avoid false precision.',
      'Average the percentages and pick the midpoint.',
    ),
    refl(
      'Applied evidence · synthesis',
      'My evidence table distinguishes claim strength and notes at least one unresolved conflict explicitly.',
    ),
  ],
  "ae-m12": [
    mcq(
      'Before any step of a workflow is handed to an agent, which readiness condition is non-negotiable?',
      'Triggers scored on stakes × reversibility × blast radius, named owners at each stage, explicit human gates where stakes spike, fallbacks a tired teammate could run during a model or vendor outage, and a kill switch that does not depend on the agent itself.',
      'Approve agent autonomy when the prototype works on a happy-path demo and the team is excited about throughput gains.',
      'Agent-readiness is conditions, not enthusiasm. If you cannot name inputs, outputs, success checks, kill switches, data tier, and the human owner when the agent stalls, you are not delegating—you are automating hope.',
      'Wait until vendors offer a "fully autonomous" mode that removes the need for human gates entirely.',
    ),
    scen(
      'Pick the most professional workflow move.',
      'Customer-support tickets are backing up. A teammate proposes letting the AI auto-close low-priority refunds without the human review step "just this week." The misroute rate from last month was 4%, the affected refunds touch real customer money, and the SOP requires a named reviewer before any external send.',
      'Refuse the bypass; restore the human gate; instrument misroutes as the primary KPI; surface the workload as a staffing problem with an owner and a date; only re-evaluate the gate after a measured pilot with rollback criteria written in advance.',
      'Allow the bypass for one week, document it in a chat thread, and revisit if customer satisfaction drops noticeably.',
      'A 4% misroute rate on real money is a defect, not a tolerance. Skipping the gate trades a measurable cost (your sleep) for an externalised one (their refund). The mature move treats the bypass as a regression and the backlog as a separate, named problem.',
      'Replace the human reviewer permanently because the AI handled the happy path during the demo.',
    ),
    refl(
      'Applied evidence · workflow diagram + fallback table',
      'For one real recurring workflow, I drew a diagram with decision diamonds, named owners at each stage, at least one human gate where stakes spike, prompt attachment points with version notes, and a fallback table that a tired teammate could execute during a model or vendor outage—plus the explicit condition that would revoke any agent autonomy I attach.',
    ),
  ],
  "ae-m13": [
    mcq(
      'Which decision-memo habit best preserves human accountability when AI helps with options analysis?',
      'Separate options analysis (which can be AI-assisted) from the decision record (which is human-owned), label model scenarios as hypotheses, surface assumptions and falsifiers a hostile reviewer could attack, and name the next information buy that would change the recommendation.',
      'Have the model rank the options and pick the one with the highest score; polish the supporting paragraphs so leadership reads a single confident recommendation.',
      'AI can widen options and stress-test arguments, but authorship, evidence standards, and accountability stay with the named human owner. A memo a busy reviewer can attack on substance is the goal—not a memo that smooths uncertainty into an executive-friendly verdict.',
      'Refuse to use AI in any decision context to avoid contaminating the record.',
    ),
    scen(
      'Pick the most defensible decision-support move.',
      'A division head wants a clear "go / no-go" on a multi-quarter vendor partnership by the end of the day. Your AI-assisted memo shows two scenarios that disagree because of one missing piece of usage data; one favours the deal, one does not. Polished phrasing could hide the gap; the data could land within ten working days.',
      'Write a decision-under-uncertainty memo: surface the conflict on page one, label both scenarios as hypotheses with falsifiers, propose either a delay-with-deadline or a staged commitment that can be unwound, and list the cheapest information buy that would adjudicate—signed by you, not by the model.',
      'Pick the more optimistic scenario so the meeting ends on time and the division head feels supported; you can revisit if the data later contradicts.',
      'Reviewers want substance they can challenge, not certainty they cannot. Ten days is cheap relative to a multi-quarter mistake; a staged commitment preserves optionality without starving the deadline. Polishing past a missing fact is what late corrections are made of.',
      'Refuse to recommend anything until every scenario converges on a single answer.',
    ),
    refl(
      'Applied evidence · decision memo + pre-mortem appendix',
      'For one real decision in my context, I wrote a two-page memo that names the question, criteria before options, explicit assumptions with owners, conflicts kept visible, falsifiers, and the cheapest next information buy—plus a pre-mortem appendix where I let the model attack my preferred option, then reconciled which critiques are real and which I can rule out, with the edit visible in the final memo.',
    ),
  ],
  "ae-m15": [
    mcq(
      'What makes a prompt pack maintainable across teammates?',
      'Named owners, version notes, test prompts, refusal boundaries, and a changelog—not a folder of “final v7 really final” screenshots.',
      'Longer prompts always beat shorter ones—detail equals quality.',
    ),
    scen(
      'Model update week.',
      'A shared playbook drifts: half the team uses an old refusal rule and customer tone shifts.',
      'Freeze changes; diff versions; assign owner; re-run acceptance prompts before reopening edits.',
      'Let everyone patch quietly—speed matters more than traceability.',
    ),
    refl(
      'Applied evidence · prompt packs',
      'I versioned one prompt pack slice and noted what behavior each version targeted.',
    ),
  ],
  "ae-m16": [
    mcq(
      'Which capstone stance matches "ready" as Jifunze defines it for AI Essentials?',
      'A bounded, real task where prompts, outputs, verification, revisions, privacy choices, and disclosure are all reviewer-visible—and the seven-criterion rubric self-score is honest about what is Ready, what is Developing, and what is still Not ready.',
      'A polished final artifact with every rough edge sanded down so reviewers cannot tell where AI helped, where you struggled, or what you decided not to claim.',
      'Ready in this course means a reviewer-visible workflow you would defend without me narrating it. Hidden process makes critique impossible; honest gaps invite useful feedback. Self-readiness here is a learning signal—not an external credential.',
      'A bundle that is much larger than the brief because volume signals seriousness.',
    ),
    scen(
      'Pick the most defensible final-pass move.',
      'It is the night before you mark capstone prep complete. A peer reviewer flags that your verification section names sources but never quotes the passages that support the load-bearing claims; the model offered to "fill the gaps" with citation-shaped strings that look correct.',
      'Refuse the invented citations; downgrade affected claims to "uncited—needs source" or scope them out of the bundle; quote the passages you actually verified with section refs; record the gap honestly in the self-critique with a dated plan to close it before any external use.',
      'Accept the model\'s suggested citations because the reviewer is unlikely to spot them and the deadline is real.',
      'A capstone that hides invented citations is not Ready; it is a future correction waiting to happen. Honest scope reduction plus a dated plan is stronger evidence of judgment than a "complete-looking" section the model authored.',
      'Withdraw the entire capstone because one section is thin.',
    ),
    refl(
      'Applied evidence · reviewer-ready capstone bundle',
      'My Module16_AI_Workflow_Capstone bundle traces every required deliverable to evidence I can point to (or to a labeled gap with a dated next step), includes the prompts, verification notes, revision trail, privacy choices, disclosure, self-critique, and a rubric self-score where every Ready or Strong row matches the artefact a reviewer can open—not how I want to feel about my work.',
    ),
  ],
  "sw-m05": [
    mcq(
      "Exec wants a one-pager tonight; two sources disagree. Best synthesis discipline?",
      "Keep claims tied to sources; label conflicts; qualify conclusions; propose what data resolves.",
      "Smooth contradictions into a confident headline—executives want certainty.",
    ),
    scen(
      "Research synthesis deadline.",
      "Marketing claims a 40% lift; finance shows flat revenue—same quarter.",
      "Publish conflict explicitly; separate definitions; recommend measurement plan before budget moves.",
      "Pick the friendlier chart—alignment beats nuance.",
    ),
    refl(
      "Applied evidence · synthesis",
      "I preserved provenance on at least one non-obvious claim.",
    ),
  ],
  "sw-m08": [
    mcq(
      "Two teams forked the same workflow under different names. What fixes catalog drift?",
      "Assign owner; deprecate duplicate; migration note; single catalog entry with version.",
      "Let divergence continue—teams know their contexts best.",
    ),
    scen(
      "Workflow library chaos.",
      "Automation routes refunds differently by office; CSAT drops but dashboards look “green.”",
      "Freeze changes; unify routing spec; measure misroutes as primary KPI.",
      "Add another automation branch—coverage proves progress.",
    ),
    refl(
      "Applied evidence · workflow ownership",
      "I named an owner for one ambiguous handoff step.",
    ),
  ],
  "dd-m05": [
    mcq(
      "Finance sees revenue rise with marketing spend and wants immediate scale-up. Most honest analytic stance?",
      "Lay out confounders; propose pilots; define falsifiers before reallocating millions.",
      "Correlation implies causation here—fund the spike.",
    ),
    scen(
      "Budget meeting stakes.",
      "Seasonality and pricing changed the same quarter as spend—leadership wants a causal story fast.",
      "Expose rival explanations; propose experiment or matched analysis; clarify decisions under uncertainty.",
      "Tell the heroic marketing story—budgets move on narrative.",
    ),
    refl(
      "Applied evidence · causality",
      "I stated one confounder that could explain an apparent lift.",
    ),
  ],
  "dd-m08": [
    mcq(
      "Leadership wants a flattering KPI narrative; your pack shows mixed performance. Best move?",
      "Align to definitions; show leading vs lagging; surface uncertainty; recommend decisions—no cherry-picking.",
      "Pick the strongest chart angle—credibility is theater.",
    ),
    scen(
      "Stakeholder storytelling pressure.",
      "Board deck is tomorrow; sponsor asks you to drop the “messy” operational chart.",
      "Keep both views; annotate limitations; tie to decision and risk—not reputation management.",
      "Archive the messy chart—clarity is optional.",
    ),
    refl(
      "Applied evidence · reporting",
      "I tied one KPI to an explicit decision it should drive.",
    ),
  ],
  "wf-m05": [
    mcq(
      "Duplicate charges appear after retries during an outage. What lens matters most?",
      "Idempotency keys; retry semantics; reconciliation; honest user-facing status.",
      "Users should tap more carefully—education fixes fraud.",
    ),
    scen(
      "Payments incident.",
      "Retries double-charge during gateway flap; finance wants a quick “make customers whole” patch.",
      "Stop harmful retries; replay safely; reconcile ledger; postmortem idempotency gaps.",
      "Refund manually forever—engineering can wait.",
    ),
    refl(
      "Applied evidence · data integrity",
      "I separated user error from systemic retry failure.",
    ),
  ],
  "wf-m08": [
    mcq(
      "Partner API flaps and your job queue stalls. Best operational posture?",
      "Backoff; shed load; dead-letter with replay; communicate ETA; protect operator sleep.",
      "Hammer retries—uptime dashboards reward volume.",
    ),
    scen(
      "Reliability weekend.",
      "Pager storm; junior on-call suggests infinite retries to “clear the backlog.”",
      "Cap retries; isolate blast radius; customer comms with honest ETA; preserve logs.",
      "Restart everything—thrash sometimes works.",
    ),
    refl(
      "Applied evidence · resilience",
      "I named one circuit-breaker behavior I would ship.",
    ),
  ],
  "ds-m05": [
    mcq(
      "Backup jobs show green but restores were never tested. What risk are you actually carrying?",
      "Unknown recoverability—schedule restore drill; verify integrity; close gaps explicitly.",
      "Green checks mean backups work—monitoring equals safety.",
    ),
    scen(
      "Restore reality.",
      "Finance needs last month’s ledger after laptop theft; backups exist but nobody knows the passphrase chain.",
      "Declare recoverability unknown; execute drill; document chain of custody fixes.",
      "Assume IT will recover—trust the department.",
    ),
    refl(
      "Applied evidence · recoverability",
      "I scheduled one smallest viable restore test.",
    ),
  ],
  "ds-m08": [
    mcq(
      "Suspected breach; legal unreachable. What is the first-hour priority?",
      "Contain; preserve logs; assign comms owner; follow playbook; avoid speculation publicly.",
      "Tweet transparency—customers respect speed.",
    ),
    scen(
      "Incident hour one.",
      "Sales posted a customer list to a shared drive “for convenience.”",
      "Revoke shares; preserve evidence; scope data classes; notify security lead before public talk-tracks.",
      "Delete the folder quietly—avoid drama.",
    ),
    refl(
      "Applied evidence · incident response",
      "I separated containment from premature public disclosure.",
    ),
  ],
  "mg-m05": [
    mcq(
      "Engagement rises but pipeline is flat. What is the disciplined growth response?",
      "Expose the decision each metric serves; propose leading indicators tied to experiments—not vanity applause.",
      "Post more—volume proves learning.",
    ),
    scen(
      "Vanity spike.",
      "Leadership celebrates impressions while SQLs stall; budget asks land on your desk.",
      "Translate metrics to hypotheses; propose kill criteria; tie spend to falsifiable signals.",
      "Buy influencers—awareness fixes everything eventually.",
    ),
    refl(
      "Applied evidence · growth metrics",
      "I demoted one vanity KPI and replaced it with a falsifiable signal.",
    ),
  ],
  "mg-m08": [
    mcq(
      "Growth wants fewer signup verification steps for conversion. Best judgment?",
      "Model fraud/abuse risk; staged rollout; guardrail metrics; ethics note—not friction theater.",
      "Remove friction—conversion rate is truth.",
    ),
    scen(
      "Friction vs. abuse.",
      "Bot signups spike after CAPTCHA removal; CS escalates.",
      "Rollback gate; instrument bot signals; staged experiment with ethics review.",
      "Ignore bots—growth solves trust later.",
    ),
    refl(
      "Applied evidence · conversion ethics",
      "I named one abuse scenario a simplification could invite.",
    ),
  ],
  "bb-m05": [
    mcq(
      "Sales asks pricing below your ethical floor “just this quarter.” Best response?",
      "Reject or restructure; document trade-offs; escalate with transparent math—not silent exceptions.",
      "Say yes once—exceptions stay private.",
    ),
    scen(
      "Ethical floor pressure.",
      "Big logo deal tempts leadership; margin math barely holds at the discount.",
      "Publish sensitivity; refuse silent erosion; propose scope trade—not hidden floors.",
      "Discount now—brand beats margin.",
    ),
    refl(
      "Applied evidence · pricing integrity",
      "I tied price talk to explicit trade-space variables.",
    ),
  ],
  "bb-m08": [
    mcq(
      "Teams burn out under “everything is priority one.” Most adult operating move?",
      "Cut initiatives explicitly; log cuts; protect quality bar; communicate trade-offs—grind is not culture.",
      "Motivate harder—heroes save quarters.",
    ),
    scen(
      "Overload meeting.",
      "Roadmap doubles while headcount flat; execs want optimism.",
      "Force ranked cuts; assign owners to sunset work; publish decisions.",
      "Add stretch goals—pressure reveals stars.",
    ),
    refl(
      "Applied evidence · operating rhythm",
      "I named one initiative I would stop this quarter with rationale.",
    ),
  ],
  "mf-m05": [
    mcq(
      "Customer demands Net-120 while your cash runway tightens. Best finance stance?",
      "Model cash timing; trade price or scope; document risk acceptance—not vibes.",
      "Preserve relationship at any payment term.",
    ),
    scen(
      "Cash timing crunch.",
      "Sales promises Net-120 verbally; treasury learns late.",
      "Rebuild cash forecast; negotiate explicit terms; expose downside to leadership.",
      "Accept—losing the logo is worse.",
    ),
    refl(
      "Applied evidence · cash discipline",
      "I converted one verbal term into a written scenario impact.",
    ),
  ],
  "mf-m08": [
    mcq(
      "Investor deck smooths variance; you spot definition drift across quarters. What do you do?",
      "Fix definitions; reconcile periods; disclose drivers—numbers earn trust through honesty.",
      "Keep the hero chart—story beats footnotes.",
    ),
    scen(
      "Reporting pressure.",
      "CFO wants “clean” EBITDA for the roadshow; ops sees different cuts.",
      "Publish bridge; align definitions; note judgment calls explicitly.",
      "Pick the definition that flatters—markets reward simplicity.",
    ),
    refl(
      "Applied evidence · reporting trust",
      "I flagged one definition that would change conclusions if moved.",
    ),
  ],
  "prd-m05": [
    mcq(
      "Leadership locks a ship date before discovery closes. Best product discipline?",
      "Expose assumptions; checkpoint decisions; buffer or cut scope—dates without discovery are debt.",
      "Commit loudly—teams need pressure.",
    ),
    scen(
      "Date lock-in.",
      "Sales promises a customer deadline; engineering has unknown integration risk.",
      "Publish risks; negotiate scope trade; instrument leading signals; refuse silent heroics.",
      "Launch anyway—iteration beats planning.",
    ),
    refl(
      "Applied evidence · roadmap bets",
      "I wrote one scope cut tied to uncertainty—not heroics.",
    ),
  ],
  "prd-m08": [
    mcq(
      "Execs want green status while risks accumulate. What does professional status reporting require?",
      "Evidence-based status; top risks with owners; refuse false green—trust is the asset.",
      "Stay green until launch—panic kills morale.",
    ),
    scen(
      "Status theater.",
      "Launch is two weeks away; QA sees defect clusters; PM is urged to stay positive.",
      "Yellow the status with evidence; gate release; document trade-offs explicitly.",
      "Ship quiet hotfixes—users won’t notice.",
    ),
    refl(
      "Applied evidence · stakeholder clarity",
      "I separated optimism from verified readiness.",
    ),
  ],
  "pex-m05": [
    mcq(
      "Risk register lists “integration may slip” with no trigger. What makes this real?",
      "Observable triggers; owners; dates; escalation—otherwise it is commentary.",
      "Hope—teams know the importance.",
    ),
    scen(
      "Slipping integration.",
      "Vendor API latency creeps; nobody escalates until the deadline.",
      "Add trigger thresholds; weekly evidence review; mitigation owner with date.",
      "Work weekends—deadlines focus people.",
    ),
    refl(
      "Applied evidence · risk triggers",
      "I converted one vague risk into a triggered plan.",
    ),
  ],
  "pex-m08": [
    mcq(
      "Ship date met; defects spike in production. Best delivery judgment?",
      "Strengthen DoD; gate releases; blameless retro; fix systemic quality—not endless hotfix heroics.",
      "Hotfix quickly—speed is the market.",
    ),
    scen(
      "Quality debt.",
      "Exec celebrates launch; support tickets explode.",
      "Rollback posture; defect triage; retro with systemic fixes; redefine done.",
      "Train users harder—human error explains tickets.",
    ),
    refl(
      "Applied evidence · definition of done",
      "I tied a release gate to observable quality signals.",
    ),
  ],
  "cl-m05": [
    mcq(
      "You widen applications endlessly to soothe anxiety. What improves search outcomes?",
      "Tight targets; measurable experiments; weekly learning—not spray volume.",
      "Apply everywhere—luck favors persistence.",
    ),
    scen(
      "Spray-and-pray spiral.",
      "You sent 200 generic apps; callbacks are noise; motivation crashes.",
      "Pause; sharpen ICP; craft proof for fewer employers; define stop rules.",
      "Increase volume further—statistics must kick in.",
    ),
    refl(
      "Applied evidence · search strategy",
      "I defined one kill criterion for an experiment this week.",
    ),
  ],
  "cl-m08": [
    mcq(
      "Interviewers ask for impact; you answer with adjectives. What demonstrates competence?",
      "Metrics, tradeoffs, mistakes caught—dense evidence invites follow-ups.",
      "Warm rapport substitutes for proof.",
    ),
    scen(
      "Behavioral depth.",
      "Panel asks “Tell me about conflict”—you drift into philosophy.",
      "Give situation, conflict metric, actions, outcomes; invite specifics.",
      "Stay abstract—avoid burning bridges.",
    ),
    refl(
      "Applied evidence · interview evidence",
      "I upgraded one story with a measurable outcome.",
    ),
  ],
  "cc-m05": [
    mcq(
      "Sponsor wants a brief that justifies a decision already made. What does integrity require?",
      "Preserve contested facts; separate interpretation; document dissent pathways.",
      "Tell the story they want—alignment wins rooms.",
    ),
    scen(
      "Brief as weapon.",
      "Legal worries liability; sponsor asks you to omit caveats “for momentum.”",
      "Footnote caveats; separate facts vs asks; refuse silent laundering.",
      "Soften caveats—speed matters more than precision.",
    ),
    refl(
      "Applied evidence · brief fidelity",
      "I labeled one claim as disputed with sources.",
    ),
  ],
  "cc-m08": [
    mcq(
      "Proof is thin but the memo ships tomorrow. Best persuasive discipline?",
      "Qualify confidence; propose data to collect; conditional recommendations—honesty scales.",
      "Assert boldly—confidence persuades executives.",
    ),
    scen(
      "Thin proof deadline.",
      "Leadership wants a hard recommendation on partial data.",
      "Expose gaps; propose decision under uncertainty with next evidence steps.",
      "Hide uncertainty—decisiveness signals leadership.",
    ),
    refl(
      "Applied evidence · persuasive integrity",
      "I stated one unknown that would change the recommendation.",
    ),
  ],
  "rtc-m05": [
    mcq(
      "Abstract claims huge effect; methods section shows tiny sample. What should you do first?",
      "Read methods; judge power and design; downgrade headline belief accordingly.",
      "Share the abstract—big numbers signal truth.",
    ),
    scen(
      "Headline temptation.",
      "Exec forwards a viral study supporting a pet policy.",
      "Trace claim to design; list threats; propose better evidence before policy.",
      "Forward widely—speed beats rigor.",
    ),
    refl(
      "Applied evidence · quant literacy",
      "I named one design limitation that caps believability.",
    ),
  ],
  "rtc-m08": [
    mcq(
      "Research expands without a stopping rule. Most disciplined move?",
      "Define stopping criteria; capture unknowns; ship provisional memo with limits.",
      "Keep researching—partial truth is irresponsible.",
    ),
    scen(
      "Endless literature spiral.",
      "Deadline looms; more papers appear weekly.",
      "Timebox; summarize knowns/unknowns; schedule next evidence sprint explicitly.",
      "Delay delivery—quality requires completeness.",
    ),
    refl(
      "Applied evidence · stopping rules",
      "I wrote one stopping signal that ends the current pass.",
    ),
  ],
  "lat-m05": [
    mcq(
      "Feedback lands poorly; teammate becomes defensive. Best coaching move?",
      "Repair relationship; separate behavior from identity; reschedule with specifics and care.",
      "Double down—they need resilience.",
    ),
    scen(
      "Feedback rupture.",
      "You named a missed commitment; they hear character attack.",
      "Acknowledge impact; clarify intent; co-create next experiment; avoid shame.",
      "Escalate to HR immediately—conflict is risk.",
    ),
    refl(
      "Applied evidence · feedback repair",
      "I separated observation from story in one sentence.",
    ),
  ],
  "lat-m08": [
    mcq(
      "Cross-team exec meeting becomes blame tennis. What breaks the loop?",
      "Surface interfaces; assign decision rights; measure handoffs; document trade-offs—not vibes.",
      "Facilitate positivity—culture fixes matrix issues.",
    ),
    scen(
      "Matrix swamp.",
      "Both teams “own” prioritization; customers suffer delays.",
      "Map decision rights; assign single arbiter for interface; track SLA across teams.",
      "More steering committees—alignment takes time.",
    ),
    refl(
      "Applied evidence · coordination",
      "I named one interface where decision rights were ambiguous.",
    ),
  ],
  "taf-m05": [
    mcq(
      "One learner dominates discussion. Most inclusive facilitation move?",
      "Redistribute airtime with neutral moves; revisit norms; break into pairs—avoid shame.",
      "Let experts talk—efficiency respects expertise.",
    ),
    scen(
      "Airtime hog.",
      "Senior participant derails every prompt; others go quiet.",
      "Use stack or round; pair-share; reset norms kindly; protect psychological safety.",
      "Call them out publicly—fairness needs confrontation.",
    ),
    refl(
      "Applied evidence · facilitation",
      "I chose one neutral move that protects quiet learners.",
    ),
  ],
  "taf-m08": [
    mcq(
      "Async forum is silent; grades loom. Best teaching response?",
      "Differentiate prompts; offer alternate formats; synchronous repair; accessibility check—not more PDFs.",
      "Post more readings—volume teaches responsibility.",
    ),
    scen(
      "Ghosted async cohort.",
      "International learners lag; forum dead; two students admit shame about language.",
      "Offer low-stakes voice alternatives; small groups; targeted invites; revise prompt clarity.",
      "Penalize silence—accountability builds grit.",
    ),
    refl(
      "Applied evidence · inclusive async",
      "I redesigned one prompt to reduce hidden barriers.",
    ),
  ],
}


/** Stable list for CI: every id must exist on a flagship curriculum module. */
export const FLAGSHIP_BESPOKE_ASSESSMENT_MODULE_IDS = Object.keys(
  FLAGSHIP_ASSESSMENT_BESPOKE_TRIPLES,
) as string[]

/** Mid-course bespoke checkpoint modules (two per flagship × 15). */
export const FLAGSHIP_MID_BESPOKE_ASSESSMENT_MODULE_IDS = Object.keys(
  FLAGSHIP_ASSESSMENT_BESPOKE_MID_TRIPLES,
) as string[]
