/** Prints TS fragment for FLAGSHIP_ASSESSMENT_BESPOKE_MID_TRIPLES */
const rows = [
  {
    id: 'ae-m05',
    mcq: [
      'When is AI-supported practice still authentic learning?',
      'When outputs are labeled drafts you verify against sources—and forbidden moves stay forbidden.',
      'When the model writes the submitted exam answer you paste in verbatim.',
    ],
    scen: [
      'Integrity under grading pressure.',
      'You used AI to draft quiz explanations you truly understand—but a peer argues any AI touch is cheating.',
      'Show your verification steps and learning artifacts; invite instructor policy clarity.',
      'Hide AI use entirely—tone matters more than disclosure.',
    ],
    refl: ['Applied evidence · cognition', 'I separated practice scaffolding from substituted cognition and stated my verification lane.'],
  },
  {
    id: 'ae-m08',
    mcq: [
      'Customer PII landed in an unapproved assistant. What is the most defensible first response?',
      'Stop further submissions; escalate per incident policy; preserve logs; scope exposure.',
      'Ask the chatbot to delete the conversation and proceed as if risk is gone.',
    ],
    scen: [
      'Leak triage.',
      'Support pastes patient IDs into a public tool; screenshots circulate internally “for speed.”',
      'Contain spread; notify security lead; classify data; start controlled comms—not casual DMs.',
      'Delete the chat locally—problem solved if nobody screenshots.',
    ],
    refl: ['Applied evidence · sensitive data', 'I documented one paste/stay-local rule I will enforce under fatigue.'],
  },
  {
    id: 'sw-m05',
    mcq: [
      'Exec wants a one-pager tonight; two sources disagree. Best synthesis discipline?',
      'Keep claims tied to sources; label conflicts; qualify conclusions; propose what data resolves.',
      'Smooth contradictions into a confident headline—executives want certainty.',
    ],
    scen: [
      'Research synthesis deadline.',
      'Marketing claims a 40% lift; finance shows flat revenue—same quarter.',
      'Publish conflict explicitly; separate definitions; recommend measurement plan before budget moves.',
      'Pick the friendlier chart—alignment beats nuance.',
    ],
    refl: ['Applied evidence · synthesis', 'I preserved provenance on at least one non-obvious claim.'],
  },
  {
    id: 'sw-m08',
    mcq: [
      'Two teams forked the same workflow under different names. What fixes catalog drift?',
      'Assign owner; deprecate duplicate; migration note; single catalog entry with version.',
      'Let divergence continue—teams know their contexts best.',
    ],
    scen: [
      'Workflow library chaos.',
      'Automation routes refunds differently by office; CSAT drops but dashboards look “green.”',
      'Freeze changes; unify routing spec; measure misroutes as primary KPI.',
      'Add another automation branch—coverage proves progress.',
    ],
    refl: ['Applied evidence · workflow ownership', 'I named an owner for one ambiguous handoff step.'],
  },
  {
    id: 'dd-m05',
    mcq: [
      'Finance sees revenue rise with marketing spend and wants immediate scale-up. Most honest analytic stance?',
      'Lay out confounders; propose pilots; define falsifiers before reallocating millions.',
      'Correlation implies causation here—fund the spike.',
    ],
    scen: [
      'Budget meeting stakes.',
      'Seasonality and pricing changed the same quarter as spend—leadership wants a causal story fast.',
      'Expose rival explanations; propose experiment or matched analysis; clarify decisions under uncertainty.',
      'Tell the heroic marketing story—budgets move on narrative.',
    ],
    refl: ['Applied evidence · causality', 'I stated one confounder that could explain an apparent lift.'],
  },
  {
    id: 'dd-m08',
    mcq: [
      'Leadership wants a flattering KPI narrative; your pack shows mixed performance. Best move?',
      'Align to definitions; show leading vs lagging; surface uncertainty; recommend decisions—no cherry-picking.',
      'Pick the strongest chart angle—credibility is theater.',
    ],
    scen: [
      'Stakeholder storytelling pressure.',
      'Board deck is tomorrow; sponsor asks you to drop the “messy” operational chart.',
      'Keep both views; annotate limitations; tie to decision and risk—not reputation management.',
      'Archive the messy chart—clarity is optional.',
    ],
    refl: ['Applied evidence · reporting', 'I tied one KPI to an explicit decision it should drive.'],
  },
  {
    id: 'wf-m05',
    mcq: [
      'Duplicate charges appear after retries during an outage. What lens matters most?',
      'Idempotency keys; retry semantics; reconciliation; honest user-facing status.',
      'Users should tap more carefully—education fixes fraud.',
    ],
    scen: [
      'Payments incident.',
      'Retries double-charge during gateway flap; finance wants a quick “make customers whole” patch.',
      'Stop harmful retries; replay safely; reconcile ledger; postmortem idempotency gaps.',
      'Refund manually forever—engineering can wait.',
    ],
    refl: ['Applied evidence · data integrity', 'I separated user error from systemic retry failure.'],
  },
  {
    id: 'wf-m08',
    mcq: [
      'Partner API flaps and your job queue stalls. Best operational posture?',
      'Backoff; shed load; dead-letter with replay; communicate ETA; protect operator sleep.',
      'Hammer retries—uptime dashboards reward volume.',
    ],
    scen: [
      'Reliability weekend.',
      'Pager storm; junior on-call suggests infinite retries to “clear the backlog.”',
      'Cap retries; isolate blast radius; customer comms with honest ETA; preserve logs.',
      'Restart everything—thrash sometimes works.',
    ],
    refl: ['Applied evidence · resilience', 'I named one circuit-breaker behavior I would ship.'],
  },
  {
    id: 'ds-m05',
    mcq: [
      'Backup jobs show green but restores were never tested. What risk are you actually carrying?',
      'Unknown recoverability—schedule restore drill; verify integrity; close gaps explicitly.',
      'Green checks mean backups work—monitoring equals safety.',
    ],
    scen: [
      'Restore reality.',
      'Finance needs last month’s ledger after laptop theft; backups exist but nobody knows the passphrase chain.',
      'Declare recoverability unknown; execute drill; document chain of custody fixes.',
      'Assume IT will recover—trust the department.',
    ],
    refl: ['Applied evidence · recoverability', 'I scheduled one smallest viable restore test.'],
  },
  {
    id: 'ds-m08',
    mcq: [
      'Suspected breach; legal unreachable. What is the first-hour priority?',
      'Contain; preserve logs; assign comms owner; follow playbook; avoid speculation publicly.',
      'Tweet transparency—customers respect speed.',
    ],
    scen: [
      'Incident hour one.',
      'Sales posted a customer list to a shared drive “for convenience.”',
      'Revoke shares; preserve evidence; scope data classes; notify security lead before public talk-tracks.',
      'Delete the folder quietly—avoid drama.',
    ],
    refl: ['Applied evidence · incident response', 'I separated containment from premature public disclosure.'],
  },
  {
    id: 'mg-m05',
    mcq: [
      'Engagement rises but pipeline is flat. What is the disciplined growth response?',
      'Expose the decision each metric serves; propose leading indicators tied to experiments—not vanity applause.',
      'Post more—volume proves learning.',
    ],
    scen: [
      'Vanity spike.',
      'Leadership celebrates impressions while SQLs stall; budget asks land on your desk.',
      'Translate metrics to hypotheses; propose kill criteria; tie spend to falsifiable signals.',
      'Buy influencers—awareness fixes everything eventually.',
    ],
    refl: ['Applied evidence · growth metrics', 'I demoted one vanity KPI and replaced it with a falsifiable signal.'],
  },
  {
    id: 'mg-m08',
    mcq: [
      'Growth wants fewer signup verification steps for conversion. Best judgment?',
      'Model fraud/abuse risk; staged rollout; guardrail metrics; ethics note—not friction theater.',
      'Remove friction—conversion rate is truth.',
    ],
    scen: [
      'Friction vs. abuse.',
      'Bot signups spike after CAPTCHA removal; CS escalates.',
      'Rollback gate; instrument bot signals; staged experiment with ethics review.',
      'Ignore bots—growth solves trust later.',
    ],
    refl: ['Applied evidence · conversion ethics', 'I named one abuse scenario a simplification could invite.'],
  },
  {
    id: 'bb-m05',
    mcq: [
      'Sales asks pricing below your ethical floor “just this quarter.” Best response?',
      'Reject or restructure; document trade-offs; escalate with transparent math—not silent exceptions.',
      'Say yes once—exceptions stay private.',
    ],
    scen: [
      'Ethical floor pressure.',
      'Big logo deal tempts leadership; margin math barely holds at the discount.',
      'Publish sensitivity; refuse silent erosion; propose scope trade—not hidden floors.',
      'Discount now—brand beats margin.',
    ],
    refl: ['Applied evidence · pricing integrity', 'I tied price talk to explicit trade-space variables.'],
  },
  {
    id: 'bb-m08',
    mcq: [
      'Teams burn out under “everything is priority one.” Most adult operating move?',
      'Cut initiatives explicitly; log cuts; protect quality bar; communicate trade-offs—grind is not culture.',
      'Motivate harder—heroes save quarters.',
    ],
    scen: [
      'Overload meeting.',
      'Roadmap doubles while headcount flat; execs want optimism.',
      'Force ranked cuts; assign owners to sunset work; publish decisions.',
      'Add stretch goals—pressure reveals stars.',
    ],
    refl: ['Applied evidence · operating rhythm', 'I named one initiative I would stop this quarter with rationale.'],
  },
  {
    id: 'mf-m05',
    mcq: [
      'Customer demands Net-120 while your cash runway tightens. Best finance stance?',
      'Model cash timing; trade price or scope; document risk acceptance—not vibes.',
      'Preserve relationship at any payment term.',
    ],
    scen: [
      'Cash timing crunch.',
      'Sales promises Net-120 verbally; treasury learns late.',
      'Rebuild cash forecast; negotiate explicit terms; expose downside to leadership.',
      'Accept—losing the logo is worse.',
    ],
    refl: ['Applied evidence · cash discipline', 'I converted one verbal term into a written scenario impact.'],
  },
  {
    id: 'mf-m08',
    mcq: [
      'Investor deck smooths variance; you spot definition drift across quarters. What do you do?',
      'Fix definitions; reconcile periods; disclose drivers—numbers earn trust through honesty.',
      'Keep the hero chart—story beats footnotes.',
    ],
    scen: [
      'Reporting pressure.',
      'CFO wants “clean” EBITDA for the roadshow; ops sees different cuts.',
      'Publish bridge; align definitions; note judgment calls explicitly.',
      'Pick the definition that flatters—markets reward simplicity.',
    ],
    refl: ['Applied evidence · reporting trust', 'I flagged one definition that would change conclusions if moved.'],
  },
  {
    id: 'prd-m05',
    mcq: [
      'Leadership locks a ship date before discovery closes. Best product discipline?',
      'Expose assumptions; checkpoint decisions; buffer or cut scope—dates without discovery are debt.',
      'Commit loudly—teams need pressure.',
    ],
    scen: [
      'Date lock-in.',
      'Sales promises a customer deadline; engineering has unknown integration risk.',
      'Publish risks; negotiate scope trade; instrument leading signals; refuse silent heroics.',
      'Launch anyway—iteration beats planning.',
    ],
    refl: ['Applied evidence · roadmap bets', 'I wrote one scope cut tied to uncertainty—not heroics.'],
  },
  {
    id: 'prd-m08',
    mcq: [
      'Execs want green status while risks accumulate. What does professional status reporting require?',
      'Evidence-based status; top risks with owners; refuse false green—trust is the asset.',
      'Stay green until launch—panic kills morale.',
    ],
    scen: [
      'Status theater.',
      'Launch is two weeks away; QA sees defect clusters; PM is urged to stay positive.',
      'Yellow the status with evidence; gate release; document trade-offs explicitly.',
      'Ship quiet hotfixes—users won’t notice.',
    ],
    refl: ['Applied evidence · stakeholder clarity', 'I separated optimism from verified readiness.'],
  },
  {
    id: 'pex-m05',
    mcq: [
      'Risk register lists “integration may slip” with no trigger. What makes this real?',
      'Observable triggers; owners; dates; escalation—otherwise it is commentary.',
      'Hope—teams know the importance.',
    ],
    scen: [
      'Slipping integration.',
      'Vendor API latency creeps; nobody escalates until the deadline.',
      'Add trigger thresholds; weekly evidence review; mitigation owner with date.',
      'Work weekends—deadlines focus people.',
    ],
    refl: ['Applied evidence · risk triggers', 'I converted one vague risk into a triggered plan.'],
  },
  {
    id: 'pex-m08',
    mcq: [
      'Ship date met; defects spike in production. Best delivery judgment?',
      'Strengthen DoD; gate releases; blameless retro; fix systemic quality—not endless hotfix heroics.',
      'Hotfix quickly—speed is the market.',
    ],
    scen: [
      'Quality debt.',
      'Exec celebrates launch; support tickets explode.',
      'Rollback posture; defect triage; retro with systemic fixes; redefine done.',
      'Train users harder—human error explains tickets.',
    ],
    refl: ['Applied evidence · definition of done', 'I tied a release gate to observable quality signals.'],
  },
  {
    id: 'cl-m05',
    mcq: [
      'You widen applications endlessly to soothe anxiety. What improves search outcomes?',
      'Tight targets; measurable experiments; weekly learning—not spray volume.',
      'Apply everywhere—luck favors persistence.',
    ],
    scen: [
      'Spray-and-pray spiral.',
      'You sent 200 generic apps; callbacks are noise; motivation crashes.',
      'Pause; sharpen ICP; craft proof for fewer employers; define stop rules.',
      'Increase volume further—statistics must kick in.',
    ],
    refl: ['Applied evidence · search strategy', 'I defined one kill criterion for an experiment this week.'],
  },
  {
    id: 'cl-m08',
    mcq: [
      'Interviewers ask for impact; you answer with adjectives. What demonstrates competence?',
      'Metrics, tradeoffs, mistakes caught—dense evidence invites follow-ups.',
      'Warm rapport substitutes for proof.',
    ],
    scen: [
      'Behavioral depth.',
      'Panel asks “Tell me about conflict”—you drift into philosophy.',
      'Give situation, conflict metric, actions, outcomes; invite specifics.',
      'Stay abstract—avoid burning bridges.',
    ],
    refl: ['Applied evidence · interview evidence', 'I upgraded one story with a measurable outcome.'],
  },
  {
    id: 'cc-m05',
    mcq: [
      'Sponsor wants a brief that justifies a decision already made. What does integrity require?',
      'Preserve contested facts; separate interpretation; document dissent pathways.',
      'Tell the story they want—alignment wins rooms.',
    ],
    scen: [
      'Brief as weapon.',
      'Legal worries liability; sponsor asks you to omit caveats “for momentum.”',
      'Footnote caveats; separate facts vs asks; refuse silent laundering.',
      'Soften caveats—speed matters more than precision.',
    ],
    refl: ['Applied evidence · brief fidelity', 'I labeled one claim as disputed with sources.'],
  },
  {
    id: 'cc-m08',
    mcq: [
      'Proof is thin but the memo ships tomorrow. Best persuasive discipline?',
      'Qualify confidence; propose data to collect; conditional recommendations—honesty scales.',
      'Assert boldly—confidence persuades executives.',
    ],
    scen: [
      'Thin proof deadline.',
      'Leadership wants a hard recommendation on partial data.',
      'Expose gaps; propose decision under uncertainty with next evidence steps.',
      'Hide uncertainty—decisiveness signals leadership.',
    ],
    refl: ['Applied evidence · persuasive integrity', 'I stated one unknown that would change the recommendation.'],
  },
  {
    id: 'rtc-m05',
    mcq: [
      'Abstract claims huge effect; methods section shows tiny sample. What should you do first?',
      'Read methods; judge power and design; downgrade headline belief accordingly.',
      'Share the abstract—big numbers signal truth.',
    ],
    scen: [
      'Headline temptation.',
      'Exec forwards a viral study supporting a pet policy.',
      'Trace claim to design; list threats; propose better evidence before policy.',
      'Forward widely—speed beats rigor.',
    ],
    refl: ['Applied evidence · quant literacy', 'I named one design limitation that caps believability.'],
  },
  {
    id: 'rtc-m08',
    mcq: [
      'Research expands without a stopping rule. Most disciplined move?',
      'Define stopping criteria; capture unknowns; ship provisional memo with limits.',
      'Keep researching—partial truth is irresponsible.',
    ],
    scen: [
      'Endless literature spiral.',
      'Deadline looms; more papers appear weekly.',
      'Timebox; summarize knowns/unknowns; schedule next evidence sprint explicitly.',
      'Delay delivery—quality requires completeness.',
    ],
    refl: ['Applied evidence · stopping rules', 'I wrote one stopping signal that ends the current pass.'],
  },
  {
    id: 'lat-m05',
    mcq: [
      'Feedback lands poorly; teammate becomes defensive. Best coaching move?',
      'Repair relationship; separate behavior from identity; reschedule with specifics and care.',
      'Double down—they need resilience.',
    ],
    scen: [
      'Feedback rupture.',
      'You named a missed commitment; they hear character attack.',
      'Acknowledge impact; clarify intent; co-create next experiment; avoid shame.',
      'Escalate to HR immediately—conflict is risk.',
    ],
    refl: ['Applied evidence · feedback repair', 'I separated observation from story in one sentence.'],
  },
  {
    id: 'lat-m08',
    mcq: [
      'Cross-team exec meeting becomes blame tennis. What breaks the loop?',
      'Surface interfaces; assign decision rights; measure handoffs; document trade-offs—not vibes.',
      'Facilitate positivity—culture fixes matrix issues.',
    ],
    scen: [
      'Matrix swamp.',
      'Both teams “own” prioritization; customers suffer delays.',
      'Map decision rights; assign single arbiter for interface; track SLA across teams.',
      'More steering committees—alignment takes time.',
    ],
    refl: ['Applied evidence · coordination', 'I named one interface where decision rights were ambiguous.'],
  },
  {
    id: 'taf-m05',
    mcq: [
      'One learner dominates discussion. Most inclusive facilitation move?',
      'Redistribute airtime with neutral moves; revisit norms; break into pairs—avoid shame.',
      'Let experts talk—efficiency respects expertise.',
    ],
    scen: [
      'Airtime hog.',
      'Senior participant derails every prompt; others go quiet.',
      'Use stack or round; pair-share; reset norms kindly; protect psychological safety.',
      'Call them out publicly—fairness needs confrontation.',
    ],
    refl: ['Applied evidence · facilitation', 'I chose one neutral move that protects quiet learners.'],
  },
  {
    id: 'taf-m08',
    mcq: [
      'Async forum is silent; grades loom. Best teaching response?',
      'Differentiate prompts; offer alternate formats; synchronous repair; accessibility check—not more PDFs.',
      'Post more readings—volume teaches responsibility.',
    ],
    scen: [
      'Ghosted async cohort.',
      'International learners lag; forum dead; two students admit shame about language.',
      'Offer low-stakes voice alternatives; small groups; targeted invites; revise prompt clarity.',
      'Penalize silence—accountability builds grit.',
    ],
    refl: ['Applied evidence · inclusive async', 'I redesigned one prompt to reduce hidden barriers.'],
  },
]

function esc(s) {
  return JSON.stringify(s)
}

let out = ''
for (const r of rows) {
  const [mq, mb, mw] = r.mcq
  const [sp, ss, sb, sw] = r.scen
  const [rt, rb] = r.refl
  out += `  ${esc(r.id)}: [
    mcq(
      ${esc(mq)},
      ${esc(mb)},
      ${esc(mw)},
    ),
    scen(
      ${esc(sp)},
      ${esc(ss)},
      ${esc(sb)},
      ${esc(sw)},
    ),
    refl(
      ${esc(rt)},
      ${esc(rb)},
    ),
  ],
`
}
console.log(out)
