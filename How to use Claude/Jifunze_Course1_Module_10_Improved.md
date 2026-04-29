# Module 10: Privacy, Risk, Boundaries, and Safe Operational Use

## Continuity bridge from Module 9
Module 9 set the responsibility floor for the rest of the course: that AI is a tool the human uses, not an actor the human defers to; that every output that affects another person needs a guardrail layer (clarity, verification, disclosure); that bias and accountability are problems the human carries even when the words came from a model; and that the right move when something feels off is to pause and escalate rather than push through. Module 10 turns those guardrails into operational habits at the keyboard. Privacy, risk, boundaries, and safe operational use are how the responsibility posture from Module 9 plays out in the choices you make before pasting, while running, and after seeing the output. Module 9 named what the human owes; Module 10 names what the human does — minimum-necessary information, four-tier classification of inputs, redaction or abstraction where useful, and a clear pause-or-escalate rule for the cases where AI use is not the right move at all. Carry forward, in particular, Module 9's *pause and escalate* habit; it is the same instinct this module turns into a daily privacy discipline.

## What was wrong before
The original course placed privacy and safety late in the sequence, at Module 15. By that point a learner had already worked through prompt design, study, work, and operational applications, which means they had been encouraged to paste real materials into AI tools for several modules before anyone taught them how to think about what is in those materials. Privacy was treated as a capstone topic — almost a compliance footnote — rather than a baseline discipline that should shape every prompt from the first one. The teaching itself was thin: a few warnings about not pasting passwords, a passing reference to data protection law, and no working framework a learner could apply prompt by prompt. There were no practice activities. There was no four-tier classification, no minimum-necessary principle, no distinction between redaction and abstraction, and no clear escalation guidance for the situations where AI use should be paused entirely. A learner who finished the original Module 15 left with a general sense that "you should be careful" but no operational habit they could rely on under time pressure.

## What was improved
Module 10 — formerly Module 15 — is repositioned earlier in the course so that learners build safety discipline *before* they apply AI to study, work, business, healthcare, HR, or finance contexts. The reordering is not cosmetic. Privacy habits formed in week one carry into every later prompt; privacy habits taught at the end have to undo what the learner has already practised. The teaching content is now a working module rather than a warning paragraph. It introduces a single decision principle (minimum necessary information), a four-tier sensitivity classification a learner can apply quickly to any input, and a clear distinction between redaction and abstraction with examples of each. It surveys — at a high level only, and with explicit caveats — the kinds of legal and policy regimes that shape privacy expectations in Kenya and the East African Community, in the GDPR area, and in US sector-specific frameworks, so learners know when to pause and ask rather than assume. Four worked examples show real prompts being de-risked, including one case where the right decision is not to use AI at all. Four supplied practice activities give a self-learner the materials to drill these decisions: a 20-item sensitivity sort, a minimum-necessary rewrite with four risky prompts, a boundary-check worksheet covering five use cases, and a safe-alternative workflow design for one operational task the learner actually does. The module is serious and practical. It does not provide legal advice and explicitly notes that laws and policies vary by jurisdiction and organisation.

## Estimated time
Roughly two and a half to three and a half hours of focused work end-to-end, broken down as follows:

- **Core lesson** — 35 to 45 minutes.
- **Worked examples** — 25 to 35 minutes (read once, then re-read at least one with your own work in mind).
- **Practice activities** — 60 to 75 minutes total (the four activities can be split across two sittings).
- **Knowledge-to-output task** — 30 to 45 minutes.
- **Checkpoint quiz and revision** — 15 to 20 minutes.
- **Total estimated time** — approximately 2h 45m to 3h 30m.

A learner who already works in a regulated environment — healthcare, finance, HR, law, education — may move faster through the lesson but should spend the full time on the practice activities, since those are where the habit is built rather than just understood.

## Module purpose
Most early problems with AI use are not about the AI being wrong. They are about the human pasting too much, sharing the wrong thing, or pasting something that should never have been put into a third-party tool at all. Once information leaves your screen it is hard to call back. This module teaches the operational discipline that makes daily AI use safer: how to share the minimum necessary detail, how to classify a piece of information before you paste it, how to redact or abstract sensitive content into a form the AI can still help with, and how to recognise the situations where the right move is to pause, escalate, or not use AI at all. These habits matter from the first prompt onward, which is why this module is positioned before applied study, work, business, and operations modules rather than after.

## Learner outcomes
By the end of this module, you should be able to:

- Apply the *minimum necessary information* test before pasting anything into an AI tool.
- Classify a piece of information into one of four tiers — safe, caution, restricted, never-enter — and explain your reasoning.
- Redact or abstract sensitive content so an AI can still assist you without seeing identifying detail.
- Identify the typical privacy risks in workplace, school, business, client-facing, healthcare, HR, and finance contexts, and adjust your prompts accordingly.
- Recognise — at a survey level only — when Kenyan/EAC, GDPR, or US sector-specific rules suggest your AI use needs an internal policy check before you proceed.
- Decide when a task should be paused, escalated to a human, or kept out of an AI tool entirely.
- Produce a Safe-Use Decision Card and a redacted version of one real prompt you would otherwise have sent.

## Core lesson

The AI does not know what is sensitive in your work. It does not know which name is a colleague and which name is a public figure, which spreadsheet row is a customer and which is an example, which note is privileged and which is published. It will work with whatever you give it. That puts the responsibility for what gets shared at the keyboard — yours. The good news is that the discipline you need is small, repeatable, and faster than the alternative. It rests on one principle, one classification, and one habit of pausing.

### The minimum necessary information test
The single most useful habit for safe AI use is asking, before you paste: *what is the smallest amount of information the AI actually needs in order to help me with this task?* That is the minimum-necessary test. Most privacy mistakes happen because the answer to that question is much smaller than what people paste. It is faster to paste the entire email, the entire patient note, the entire pay slip, the entire client message — so people paste it. The AI will use whatever is in front of it, including everything you did not need to share.

The test has two parts. First, identify what the AI must know to do the task. If you want help replying to a customer about a delivery delay, the AI needs the delay reason, the new date, and the relationship — it does not need the customer's full name, ID number, address, payment record, or the previous twelve emails. Second, strip everything else before you paste. The output will be just as good — sometimes better, because the AI is not distracted by irrelevant detail — and your privacy exposure is much smaller.

A practical way to phrase it: *what would I be comfortable with if this prompt and output were reviewed tomorrow by my manager, my organisation's compliance team, the customer themselves, or a regulator?* If the answer is "fine" — proceed. If the answer is "not really" — strip more, or do not use AI for this task.

### The four-tier sensitivity classification
The minimum-necessary test works better when you can classify what you are looking at quickly. Use these four tiers.

**Tier 1 — Safe.** Information that is already public, already shared widely, or genuinely generic. Examples: a published job description, a public syllabus, public marketing copy, a recipe, a published article, a generic question about a topic, your own non-sensitive notes about a public subject. *Default action:* you can paste it into an AI tool without further redaction. The minimum-necessary test still applies — do not paste an entire 80-page document when a paragraph will do — but no extra step is required.

**Tier 2 — Caution.** Information that is internal to you, your team, or your organisation, but does not directly identify a third party and is unlikely to cause harm if it leaked in isolation. Examples: a draft meeting agenda, internal notes you wrote about your own approach, a non-confidential project plan, a paraphrased work problem with names removed, a summary of a class you are teaching, a generic version of a report you are drafting. *Default action:* paste with light redaction — remove names, organisational references, and any specific identifiers that are not essential to the task.

**Tier 3 — Restricted.** Information that identifies a third party (a colleague, a student, a client, a patient, a candidate, a counterparty), or that touches health, finance, HR, legal, or disciplinary content. Examples: a patient note, a student's grade with their name attached, a colleague's performance issue, a client's contract details, a salary figure tied to a person, a customer's full payment history, an HR complaint. *Default action:* do not paste raw. Use abstraction (rewrite into generic, non-identifying terms) before involving an AI, and check whether your organisation has a policy that restricts AI use for this content type at all.

**Tier 4 — Never-enter.** Information that should not be entered into a general-purpose AI tool under any circumstances, even abstracted, unless your organisation has explicitly approved a tool for this use. Examples: passwords, API keys, full payment-card numbers, national ID numbers, biometric data, raw medical records, personal data under active legal hold, content protected by attorney-client or doctor-patient confidentiality, classified or contractually restricted data, identifying detail about children. *Default action:* do not enter, do not paraphrase, do not "test it just to see." If a task seems to require this content, that is the signal to pause and escalate, not to find a way around it.

The borders between tiers are not always sharp. A colleague's name in a public org chart is different from the same name attached to a disciplinary note. The right call sometimes depends on your organisation's policy. When you are unsure, treat the item as the higher tier and either redact further or stop.

### Redaction and abstraction
There are two ways to reduce the sensitivity of what you paste, and they are not the same thing. The difference matters because, in some situations, redaction alone is not enough.

**Redaction** removes specific identifying detail while leaving the structure intact. *"Mr. James Otieno, ID 12345678, who works at Equity Bank and earns KES 180,000, asked for…"* becomes *"[Customer], who works at [employer] and earns [salary], asked for…"*. The structure is the same; the identifying tokens are gone. Redaction is appropriate for Tier 2 and many Tier 3 items, when the AI does not need to know *who* it is in order to help with *what* the task is.

**Abstraction** rewrites the situation at a higher level so that the specific case is no longer visible. *"My patient John, a 67-year-old man with Type 2 diabetes and hypertension, is asking whether he can stop his metformin"* becomes *"What is the general clinical guidance on whether a long-term Type 2 diabetes patient with hypertension can discontinue metformin, and what factors should the clinician weigh?"* The patient's identity is gone *and* the specific case is gone — what remains is the general clinical question. Abstraction is the right move for Tier 3 content where redaction alone still leaves enough specificity that the case could be re-identified by anyone who knew the people involved.

A useful test: imagine the prompt being read by someone who works in your organisation but does not know this case. Could they identify the person from what is left in the prompt? If yes, you have redacted but not abstracted, and for sensitive content that is often not enough.

### Privacy risk by context
The same information can be Tier 2 in one context and Tier 4 in another. A short tour of the contexts most learners encounter:

**Workplace.** Internal documents, draft strategies, performance information, salary data, vendor contracts, and disciplinary content all sit in Tier 2 or Tier 3. Most organisations have policies — written or unwritten — that restrict pasting confidential business information into external AI tools. If you are not sure whether your employer has a policy, that is a question to ask before you paste, not after.

**School.** Student names, grades, parent contacts, disciplinary notes, individual learning-plan content, exam-paper drafts, and unpublished assessment material are sensitive. A learner's grade attached to their name is Tier 3. A confidential exam paper is Tier 4 until the moment it has been administered.

**Business and clients.** Anything a customer told you in confidence — payment history, contract terms, complaints, internal disputes, identifying contact details — sits in Tier 3 or higher. The fact that a small business does not have a formal compliance team does not lower the tier. It raises the responsibility on the person at the keyboard.

**Healthcare.** Patient identifiers, clinical notes, diagnoses, medications, lab results, mental-health content, and anything that could re-identify a patient are Tier 3 or Tier 4. In many jurisdictions, raw clinical content should not be entered into general-purpose AI tools at all without an approved health-data pipeline.

**HR.** Performance issues, grievances, salary information, references, candidate evaluations, and disciplinary content are Tier 3 or Tier 4. Plus the fairness consideration: an AI's draft of a performance comment or a candidate evaluation can carry forward biases or invented detail (see the Module 3 evidence-boundaries example) into someone's permanent record.

**Finance.** Payment-card numbers, full bank-account numbers, transaction history tied to a person, and tax identifiers are Tier 4. Aggregate trends, anonymised totals, generic policy questions, and your own personal-finance planning sit lower, but client-by-client data with names attached is Tier 3 at minimum.

The shared lesson across these contexts: the riskiest pastes are usually convenience pastes — the entire email thread, the entire spreadsheet row, the entire patient note — and the convenience comes at a cost the person at the keyboard often does not see until something goes wrong.

### Survey-level jurisdiction note
This is not legal advice. Laws and policies vary by jurisdiction and organisation, and they change. The point of this short section is to help you know when to pause and ask, not to give you the legal answer.

**Kenya and the East African Community.** Kenya's Data Protection Act, 2019 sets obligations around how personal data is collected, processed, and shared, and assigns oversight to the Office of the Data Protection Commissioner. Other EAC member states have their own data-protection regimes at varying stages of development. As a working baseline, treat any personal data about an identifiable individual as a Tier 3 item, and ask whether your organisation has a position on AI use before you involve a general-purpose tool.

**GDPR (EU/UK area).** The EU General Data Protection Regulation, and the UK's adaptation of it, place strong obligations on anyone handling personal data of individuals in those jurisdictions, including consent, purpose limitation, data minimisation, and rules on cross-border transfer. If a customer, student, patient, or colleague is in this jurisdiction, the bar for AI handling of their data is high and an organisational policy almost certainly applies. Do not assume that your personal account on a global AI tool is GDPR-compliant for your work; your organisation will have a view on which tools are approved.

**US sector-specific rules.** The United States does not have a single federal data-protection law in the way Kenya or the GDPR area does, but it has strong sector-specific frameworks. Healthcare data is governed by HIPAA. Educational records are governed by FERPA. Financial information falls under several frameworks including GLBA. Children's data is governed by COPPA. Several US states (California's CCPA/CPRA among them) add general privacy protections on top. For a non-specialist learner, the practical implication is the same as the Kenyan and GDPR notes: if you are working with healthcare, educational, financial, or children's data and the data subjects are in the US, assume the bar is high and confirm the policy before involving an AI tool.

The honest summary across all three regimes: the *shape* of the answer is similar. Personal, identifying, sensitive data needs more care than general data. Organisations are usually responsible for the choice of tool. *The absence of a clear yes is not a yes.*

### When to pause or escalate
There are situations where the right move is to stop using AI for the task, not to keep refining the prompt. Pause and escalate when any of the following is true:

- The task involves Tier 4 content and there is no approved tool for that content type in your organisation.
- The task touches an active legal matter, a disciplinary process, a regulatory investigation, or a contractual dispute.
- The information involves a child, a patient, a victim of harm, or another person whose privacy carries extra weight.
- You are being asked to put the AI in a decision-making role that should belong to a human — hiring, firing, medical diagnosis, credit decisions, disciplinary outcomes.
- You do not know whether your organisation allows AI for this content, and you cannot find out before the deadline.
- You feel a small unease about pasting and cannot say why. That unease is data; do not paste over it.

Escalation does not mean "give up." It means raise the question to the person or function in your organisation who has the authority to answer it — your line manager, your compliance or data-protection contact, your IT lead, your school administration, your professional body. If no such function exists, the safer default is *do not paste* until a clear policy exists.

## Fully written worked examples

### Worked example 1: Raw customer detail to safer abstracted prompt

**Scenario.** Wanjiru runs a small printing business. A customer has emailed asking for a partial refund on an order that was delivered late and partially incorrect. Wanjiru wants AI help drafting a careful reply.

**Risky prompt — raw detail pasted in:**
> Help me reply to this customer email.
>
> *From: James Otieno (james.otieno@example.co.ke, +254 712 345 678)*
> *Subject: Refund request — order #4471*
> *Hi Wanjiru, I placed an order on the 12th for 500 branded notebooks for our company event on the 22nd at the Nairobi Serena. The notebooks arrived two days late, and 60 of them have the wrong logo (Equity Bank instead of Equity Group Foundation). I paid KES 75,000 by M-Pesa from 0712 345 678, transaction code QGH8X9P12. My ID number for invoicing is 12345678 and our KRA PIN is A001234567Z. I would like a partial refund and a re-print of the affected 60. Please advise.*
>
> Tone: warm, professional, accountable. Offer a partial refund and a reprint by Friday.

**What is wrong with this prompt.** Wanjiru has pasted the customer's full name, email address, phone number, M-Pesa transaction code, ID number, KRA PIN, and the name of his employer's parent organisation into a general-purpose AI tool. The AI does not need any of this information to help draft the reply. The task is *write a careful reply that acknowledges the late delivery and 60 wrong notebooks, offers a partial refund and a reprint by Friday, and keeps the relationship.* None of the personal identifiers change the wording of the reply. They do, however, expand Wanjiru's privacy exposure substantially and would not be appropriate to share with a third-party tool.

**Better prompt — abstracted:**
> Help me draft a short, warm, professional reply to a customer who is asking for a partial refund on a printing order. Context:
>
> - The order was for branded notebooks for a corporate event.
> - Two issues: the order arrived two days late, and roughly 12% of the units carry an incorrect version of the customer's logo.
> - The customer paid in full.
> - I want to acknowledge both issues without legalese, offer a partial refund proportionate to the affected units, and commit to reprinting the affected units by Friday this week.
> - Tone: warm, accountable, plain Kenyan English. Not corporate.
> - Length: under 150 words.
> - Format: a single email body, no subject line.

**Reasoning.** The abstracted prompt removes every personal identifier and every transactional detail the AI does not need (transaction code, ID number, KRA PIN, phone number, customer name, customer email, the specific employer name). It keeps the structural facts that actually shape the reply: a corporate-event order, a late delivery, a wrong logo on a known proportion of units, full payment received, and the make-good Wanjiru wants to offer. The AI now produces a usable reply, and the customer's personal information has not left Wanjiru's inbox. **What the learner should notice:** the prompt is *shorter*, not longer. Privacy redaction usually shrinks a prompt rather than padding it.

### Worked example 2: Weak prompt with unnecessary sensitive content

**Scenario.** A team leader, Joseph, wants AI help summarising 1:1 notes from the past month into themes he can bring to his manager. He pastes in his raw notes for three direct reports.

**Risky prompt:**
> Summarise the 1:1 notes from this month for me, into themes I should bring to my manager.
>
> *Sarah Adhiambo — 12 March: shared that she is going through a divorce and her husband has been threatening her; asked for flexible hours. 19 March: better mood, said her sister has moved in to help with the kids. 26 March: applied for the senior accountant role internally; asked me to be a reference.*
>
> *David Kiprop — 14 March: missed two deadlines; said he is on antidepressants and the dose changed; asked to keep this private. 21 March: caught up on work; mood still low. 28 March: asked about taking two weeks of unpaid leave for a family bereavement.*
>
> *Aisha Mohamed — 15 March: complaint about a colleague using a slur during a team lunch. She named the colleague, Brian Mwangi. She asked whether to file an HR complaint and asked me to keep her name out of any informal discussion.*

**What is wrong with this prompt.** Almost everything in these notes is Tier 3 or Tier 4. Joseph has pasted the names of three direct reports, the name of a colleague accused of harassment, and detail covering domestic violence, mental health, medication, bereavement, an internal complaint, and a confidence Aisha specifically asked him to protect. The original *task* — extract themes for a manager conversation — does not require any of this raw material to be inside the AI tool. It can be done from short, abstracted notes the team leader controls. Pasting the raw notes turns a routine summary into a serious confidentiality breach.

**Better prompt — minimum-necessary, abstracted, and structured:**
> I will paste short abstracted notes from my 1:1s this month. No names. I want help identifying two or three themes I should raise with my manager about workload, wellbeing, and team dynamics.
>
> - Direct report A: ongoing personal difficulty outside work; requested flexible hours; performance has been steady to improving.
> - Direct report B: missed two deadlines early in the month; raised a private health matter affecting concentration; later requested leave for a family bereavement; performance recovering but inconsistent.
> - Direct report C: raised an interpersonal incident on the team that involves another colleague; requested confidentiality on her involvement; wants to know the right channel for a formal complaint.
>
> Help me write a three-bullet "themes for my manager" summary, plus one short note about which item should not be discussed in a wider forum because confidentiality was requested.

**What changed.** The names are gone. The medical, marital, and harassment-specific details are gone. What remains is enough for the AI to help with the *summary task* — workload patterns, wellbeing signals, channel for a formal complaint — without the raw confidences leaving Joseph's notes. The output Joseph will need to handle himself is also clearer: he keeps the raw notes for his own reference, brings the abstracted themes to his manager, and handles the harassment complaint through the proper HR channel rather than through any AI-mediated draft.

**The key lesson.** When the original notes are this sensitive, the right move is not to find a clever prompt structure — it is to never paste the raw notes in the first place. *You write the abstraction yourself, and the AI works only with the abstraction.* That sequence — human abstracts first, AI assists second — is the safe pattern for anything Tier 3 or above.

### Worked example 3: Better workflow that summarises instead of exposing raw notes

**Scenario.** Dr. Mutiso, a clinician, wants AI help drafting a patient-education leaflet on managing Type 2 diabetes for adults who have just been diagnosed.

**Risky workflow.** Paste three real patient case notes into the AI to "ground" the leaflet, hoping the result will feel realistic. The case notes contain identifying detail — name, age, ID number, dates of visits, comorbidities, prescribed medications. The AI produces a fluent leaflet, but three patients' clinical content has now passed through a general-purpose tool, and the leaflet itself may contain language specific enough to re-identify one of the cases to a colleague who knows the patients.

**Better workflow.** Treat the AI as a writing tool that needs general material, not patient-specific material. The work happens in three steps.

*Step 1 — human abstracts the clinical content.* Dr. Mutiso writes, from her own clinical knowledge, a one-paragraph generic description of newly diagnosed adult Type 2 diabetes, the lifestyle and medication considerations she wants the leaflet to cover, the reading level she is writing for, and the tone (encouraging, not alarming). She does not consult specific patient notes while writing the abstraction.

*Step 2 — AI prompt:*
> Draft a one-page patient-education leaflet for adults who have just been diagnosed with Type 2 diabetes. Cover, in plain language: what Type 2 diabetes is, the role of diet and physical activity, what to expect from initial medication if prescribed, the importance of regular review, and warning signs that need urgent attention. Tone: calm, encouraging, not alarming. Reading level: suitable for an adult with secondary education. Length: roughly 350 words. No specific case examples. No drug dosages. End with a single line directing the reader to discuss their personal plan with their own clinician.

*Step 3 — clinical review.* Dr. Mutiso reviews the AI draft against her clinical knowledge, edits for accuracy, removes anything that drifted toward direct medical advice, and — only after the leaflet is generic and accurate — checks whether the language could re-identify any actual patient she has seen recently. If yes, she edits further.

**Why this is the right pattern.** No patient detail ever leaves the clinic. The AI is doing the part of the job it is suited for — producing fluent, plain-language educational text — and the human is doing the part of the job that requires clinical judgement, jurisdictional awareness, and patient-confidentiality protection. The leaflet is no less useful for not having been "grounded" in real cases; in fact, it is safer and almost certainly clearer.

**Generalising the pattern.** Wherever you are tempted to paste raw notes — case notes, performance notes, client files, complaint records — ask yourself whether the AI actually needs the raw notes or whether it needs *your summary of the notes*. In almost every case, your summary is enough. Writing the summary first, then prompting the AI from the summary, is the workflow that scales.

### Worked example 4: High-risk context where AI use should be paused or escalated

**Scenario.** Faith works in HR at a mid-sized organisation. A formal grievance has been filed by an employee against their line manager. The grievance involves allegations of harassment, references to the employee's medical history, and a request for an internal investigation. Faith's manager asks her to "use AI to summarise the grievance and draft a response."

**Why the right move is to pause, not to refine the prompt.** This task hits several pause-and-escalate triggers at once.

*Tier 4 content.* The grievance contains identifying detail about a named employee, a named manager, and the employee's medical history. None of this should be entered into a general-purpose AI tool.

*Active disciplinary process.* The matter is now in a formal grievance pipeline, which means the documentation may be subject to internal investigation procedures, possible legal review, and — depending on the jurisdiction and outcome — disclosure obligations. Documents created with AI assistance can carry a chain-of-evidence question that adds friction or risk to the investigation.

*Decision-making weight.* A drafted response to a formal grievance is not an ordinary email. It carries organisational position, may be relied on by either party, and could later appear in a hearing. AI assistance on a draft of this kind needs more than prompt skill; it needs an organisational decision about whether AI is allowed in this workflow at all.

*Vulnerability.* The complainant has shared sensitive personal information in confidence. Pasting the grievance into an external tool, even abstracted, may itself breach the confidence depending on the policy.

**What Faith should do instead.**

1. *Do not paste the grievance into any AI tool.* Not abstracted, not summarised through the AI, not "just to test the wording."
2. *Escalate the request.* Tell her manager, in writing, that the grievance contains protected and disciplinary content and that she would like guidance on whether AI assistance is permitted on this matter, and which tool — if any — is approved. If the organisation has an HR director, a compliance lead, or a data-protection officer, that person should weigh in.
3. *Use AI only on the parts of the work where it is appropriate.* If her manager later confirms that AI may be used to draft *generic templates* — an acknowledgement-of-receipt letter, a process-explanation page, a description of the grievance procedure — Faith can prompt for those without referencing the specific case at all.
4. *Document the decision.* A short note in her own records that says *AI was not used on the case content; case-specific drafting was done manually; AI assistance was limited to generic procedural templates* protects Faith and the process if the matter is later reviewed.

**The general lesson.** Refining a prompt does not change the underlying sensitivity of what the prompt contains. Some tasks are not prompt problems; they are governance problems. When the task involves Tier 4 content, an active grievance or legal matter, a vulnerable individual, or a decision-weight outcome, the right operational move is to pause, escalate, and let the policy answer come in before the prompt does.

## Supplied practice activity materials

### Practice activity 1 — Sensitivity sorting (20-25 minutes)
For each of the 20 items below, decide which tier it belongs to *as a default, before any redaction*: Safe, Caution, Restricted, or Never-enter. Write the tier name and a one-line reason. Then, for items 5, 9, and 16 specifically, also write one sentence on what would shift each item up or down a tier.

1. A press release that has already been published on your company's website.
2. The text of a public job description posted on a careers site.
3. Your own paraphrased notes about how you plan to approach a client meeting.
4. A draft internal strategy document marked "internal use only."
5. A colleague's name and team — visible in the public org chart — alongside a performance comment.
6. A patient's clinical note including age, comorbidities, and current medication.
7. A student's grade with their full name attached.
8. A generic question about the difference between Excel formulas and pivot tables.
9. A redacted version of a customer complaint with names removed.
10. A draft of a formal grievance response naming the parties.
11. The full text of a contract you are negotiating, including pricing.
12. A summary of a public news article.
13. Your own résumé (your information, your decision to share).
14. A list of API keys for a system you administer.
15. A national ID number.
16. A photograph that contains a child's face and the name of their school.
17. A paragraph describing, in generic terms, how a team handled a difficult project.
18. A spreadsheet of customer payment-card numbers.
19. A draft exam paper for a test that has not yet been administered.
20. A paraphrased description of a dispute between two named team members.

When you finish, look at how many of your items landed in Tier 3 or Tier 4. The proportion is usually higher than people expect, which is part of why the minimum-necessary habit matters.

### Practice activity 2 — Minimum-necessary rewrite (20-25 minutes)
Each of the four prompts below contains content the AI does not need to do the task. Rewrite each prompt so that it uses the minimum necessary information. For each rewrite, write one short paragraph naming what you removed and why.

**Risky prompt 1.** *Help me reply to this resignation email I just received from Mary Wanjiku, our senior accountant. She says her last day is the 30th, that her new employer is Safaricom, that she is leaving because of conflict with her line manager David Kiprop, and that she wants her unused leave (12 days) paid out. Tone: warm, professional, accept the resignation cleanly.*

**Risky prompt 2.** *Draft a short performance-improvement note for our intern, Brian Otieno, ID number 87654321, who has missed three consecutive Monday meetings and submitted his last two reports late. He is on a six-month internship that ends 30 June. Reference the specific dates and his ID number in the note.*

**Risky prompt 3.** *Write a follow-up message to a patient, Mrs. Achieng, 58, who came in last Tuesday with chest pain that turned out to be musculoskeletal, and who was prescribed ibuprofen 400 mg three times daily. I want to remind her about the follow-up review scheduled for next Tuesday and ask whether her pain has reduced.*

**Risky prompt 4.** *Help me draft a message to my landlord, Mr. Patel (+254 722 998 877), about the leaking tap. My address is House 14, Riverside Park, Nairobi. The lease number is RP-2023-014. The tap has been leaking for five days.*

Self-check after each rewrite: would the AI's output meaningfully change if you put the removed detail back in? If not, the removed detail was exposure without benefit — exactly what the minimum-necessary test is meant to catch.

### Practice activity 3 — Boundary-check worksheet (20-25 minutes)
For each of the five use cases below, decide whether AI use is *appropriate as described*, *appropriate after redaction or abstraction*, or *should be paused and escalated*. Write a short paragraph (3-5 sentences) of reasoning for each decision, naming the specific factor that drove the call.

**Use case 1.** A primary-school teacher wants to use an AI tool to draft a generic letter to parents about an upcoming school holiday calendar. No student names, no grades, no individual learning information.

**Use case 2.** A finance officer wants to use an AI tool to summarise a stack of supplier invoices for an internal cash-flow report. The invoices contain supplier names, amounts, and bank-account numbers.

**Use case 3.** A hospital administrator wants AI help drafting talking points for a public-health awareness day. No patient data is involved.

**Use case 4.** A line manager wants AI assistance drafting an email that will inform a team that one of their colleagues is leaving. The colleague has not yet announced their departure publicly and has asked that the news not be shared until next Monday.

**Use case 5.** A small-business owner wants to use AI to analyse a CSV of last year's customer transactions to spot seasonality patterns. The CSV has customer names, phone numbers, item descriptions, and amounts.

When you finish, compare the five decisions. Notice how the appropriate response is shaped less by the *type* of work (drafting, summarising, analysing) and more by *what is in the input*.

### Practice activity 4 — Safe-alternative design for one operational task (25-30 minutes)
Pick one task you actually do at work, in study, or in your own business that involves sensitive or identifying information. Common candidates: writing a customer reply, drafting a colleague's feedback, summarising meeting notes, preparing patient education, drafting an HR communication, building a financial summary, marking student work.

Design a *safe alternative workflow* for the task in four labelled steps.

1. *What the AI does not see.* Name the raw inputs that should never reach the AI. Be specific — file names, document types, identifying fields.
2. *What you abstract or redact before involving the AI.* Describe how you transform the raw inputs into a form the AI can work with. Include whether you are using redaction, abstraction, or both, and why.
3. *The prompt itself.* Write the actual minimum-necessary prompt you would use, in full, as if you were about to paste it into the tool.
4. *What you check after the AI output.* Name the privacy and accuracy checks you run before sending, saving, or sharing the result. Include at least one re-identification check ("could someone who knows this case still recognise it?") and one accuracy check.

Length: roughly half a page. The point of this exercise is to design a workflow you could actually use the next time the task comes up, not a hypothetical one. If you find that step 1 — *what the AI does not see* — empties the task to the point where AI cannot meaningfully help, that is itself a finding: not every operational task is a good fit for a general-purpose AI tool.

## Pause and check
Before moving on, ask yourself:

- Can I name the four sensitivity tiers and give one example of each from my own life?
- Looking at the last three things I pasted into an AI tool, would any of them have benefited from redaction or abstraction?
- Can I name two situations in my own work where the right move would be to pause and escalate rather than refine the prompt?
- Do I know which person or function in my organisation I would escalate a privacy-sensitive AI question to?

If any answer is no, return to the relevant section. The fourth question is worth taking seriously even if you have no formal compliance contact in your organisation — knowing in advance whom you would ask is part of being ready, and the question is much harder to answer in the middle of an actual incident than in advance.

## Knowledge-to-output task
Produce two artifacts. Both will go into your portfolio and be referenced by later modules in this course.

**Artifact 1 — Safe-Use Decision Card.** A one-page document you could keep open beside your work. The card should contain:

- The minimum-necessary test, in one sentence, in your own words.
- The four sensitivity tiers — Safe, Caution, Restricted, Never-enter — with one example of each drawn from *your* work, study, or daily life rather than from this module.
- A short list of the contexts most relevant to your situation (workplace, school, business, healthcare, HR, finance — pick the ones that apply) with a one-line note on the typical sensitivity tier of the content you handle in each.
- Your personal pause-and-escalate triggers — three or four situations where you would stop and ask before pasting.
- The name (or role/title) of the person or function you would escalate to in your organisation. If there is no such person, write *no clear contact — confirm before applying AI to sensitive work*, and note the question you would want answered before you proceed.

**Artifact 2 — Redacted-prompt example.** Choose a recent prompt you have written, or would have written, that contained Tier 2 or Tier 3 content. Show three things side by side:

1. The original prompt as you would have written it, with the sensitive content visible.
2. The redacted or abstracted version as you would now send it.
3. A short note (50-80 words) on what you removed, whether you used redaction or abstraction or both, and why.

If the original prompt would have contained Tier 4 content, do not paste the original anywhere — including in this artifact. Instead, describe the task in generic terms and explain why your decision is *do not use AI for this* rather than *redact and proceed*. Naming the reason is the artifact in that case.


# Module 10: Privacy, Risk, Boundaries, and Safe Operational Use — Part B

*Part B continues directly from Part A. It contains the assessment, artifact, completion evidence, revision guidance, transition, and platform-mapping notes. The core lesson, worked examples, practice activity materials, pause-and-check, and knowledge-to-output task are in Part A and are not repeated here.*

## Checkpoint quiz

Eight questions. Pass threshold: at least 6 of 8 questions correct. Use a paper notebook or a separate file. Do not look back at Part A while answering. After you finish, mark yourself against the answer key in the next section.

1. *(Multiple choice)* The *minimum necessary information* test asks one specific question before you paste anything into an AI tool. Which of the following is that question?
   a. *What is the most professional way to phrase this prompt?*
   b. *What is the smallest amount of information the AI actually needs in order to help me with this task?*
   c. *Will the AI be able to understand this without context?*
   d. *Have I given the AI enough background to produce a confident answer?*

2. *(Multiple choice)* Which of the following items is Tier 4 — *Never-enter* — by default for a general-purpose AI tool, regardless of how carefully the prompt is worded?
   a. A draft internal meeting agenda marked *internal use only.*
   b. A paraphrased summary of a customer complaint with names removed.
   c. A patient's full national ID number alongside their clinical history.
   d. A published company press release.

3. *(Scenario — redaction versus abstraction)* A school office manager wants AI help drafting a polite reply to a parent who has complained about the way their child was disciplined last week. The original complaint email names the child, the teacher, the date, the specific incident, and the parent's view of what happened. The office manager asks: *"Should I just remove the names before pasting, or do I need to do something more than that?"* Answer in two or three sentences. Name which of the two techniques (redaction or abstraction) is the right call here, explain why, and give one short example of how the abstracted version would read.

4. *(Scenario — pause or escalate)* A junior HR officer has been asked by her manager to *"use AI to summarise the formal harassment grievance that was filed yesterday and draft a first response."* The grievance names two employees, references the complainant's medical history, and is now in a formal investigation pipeline. The HR officer can write a clear AI prompt and is confident she can phrase it carefully. In two or three sentences, explain why the right answer here is *not* a better prompt, and name two specific factors from Part A that make this a pause-and-escalate situation rather than a prompt-engineering situation.

5. *(Short answer — redaction versus abstraction in your own words)* Explain in two or three sentences the difference between *redaction* and *abstraction*. Then give one short example of each, drawn from a task you actually do at work, in study, in your own business, or in your community. Your two examples should not be the patient-leaflet or 1:1-notes examples from Part A.

6. *(Short answer — privacy risk by context)* Pick two of the following contexts: workplace, school, business and clients, healthcare, HR, finance. For each of the two you pick, name in one or two sentences the *typical* default sensitivity tier of the content you would handle in that context, and one specific information type from that context that should not enter a general-purpose AI tool even after redaction.

7. *(Application — minimum-necessary rewrite)* Rewrite the following risky prompt so that it uses the minimum necessary information for the task the user is actually trying to accomplish. Below your rewrite, write a short paragraph (3–5 sentences) naming what you removed, whether you used redaction or abstraction (or both), and why each removal made the prompt safer without making the AI's output worse.
   *Risky prompt:* *"Help me draft a short message to my customer Grace Wambui, ID number 12345678, KRA PIN A009876543B, phone +254 722 111 222, who paid KES 48,000 by M-Pesa transaction QRT3K8L19 for our salon's bridal package last Saturday. She has complained that the senior stylist Joyce arrived 90 minutes late and that the makeup ran during photos. I want to apologise warmly, offer a 25% credit on her next visit, and keep her as a regular customer."*

8. *(Application — sensitivity sort with reasoning)* For each of the five items below, write the tier name (*Safe*, *Caution*, *Restricted*, or *Never-enter*) and one short sentence (one or two lines) on the reasoning. Then, for the item you are *least* sure about, write one extra sentence on what would shift it up or down a tier.
   - i. A draft policy memo on remote-working hours that names no individual employees.
   - ii. A list of customer mobile-money phone numbers attached to first names and amounts paid last month.
   - iii. A photograph of a child in school uniform with the school's name visible on the wall behind them.
   - iv. A paragraph in which you describe, in generic terms, how *a* finance team handled *a* late-payment problem, with no organisation or person named.
   - v. A draft of a formal disciplinary notice naming the employee, the manager, the alleged conduct, and the date of the next hearing.

## Answer key with explanations

1. **b.** The minimum-necessary test asks *what is the smallest amount of information the AI actually needs in order to help me with this task?* The other options are real questions a learner might ask, but they are not the test from Part A. (a) is about phrasing, not exposure. (c) is about context-fit, not minimum exposure. (d) is the opposite habit — pushing toward *more* context — which is exactly what the minimum-necessary test is designed to discipline.

2. **c.** A national ID number combined with clinical history is Tier 4 in two ways at once: an identifying government number (Tier 4 by itself) plus identifying clinical content (Tier 3 or Tier 4, depending on jurisdiction and policy). Either factor alone would be enough to keep this out of a general-purpose tool. (a) is Tier 2 — internal but not third-party-identifying. (b) is Tier 2 or Tier 3 depending on detail, but redaction has already been applied. (d) is Tier 1 by definition because it is already public.

3. **The right call is *abstraction*, not just redaction.** Strong answers note both points: (1) removing the child's name, the teacher's name, and the date is redaction, and that alone leaves a prompt where anyone in the school who knows the case could still recognise it from the description of the incident, and (2) the safer move is to abstract — rewrite the situation at a higher level so the specific case is no longer visible. A strong abstracted example reads something like: *"A parent has complained about how their child was disciplined for a low-level classroom incident. Help me draft a warm reply that acknowledges the concern, explains our general approach, and offers a meeting to discuss further. No specific names, dates, or incident details."* Half-credit for an answer that picks abstraction but cannot give a usable example, or that picks redaction and gives a strong reason but misses that the case is still re-identifiable.

4. **The right answer is *pause and escalate*, not refine the prompt.** Strong answers name at least two of the following Part A factors: (1) Tier 4 content — the grievance contains identifying personal data and medical history; (2) active disciplinary or investigative process — the matter is in a formal grievance pipeline and may be subject to internal investigation rules and possible legal review; (3) decision-weight outcome — a drafted response to a formal grievance carries organisational position and can later appear in a hearing; (4) vulnerability — the complainant has shared sensitive personal information in confidence, and pasting the grievance into an external tool may itself breach that confidence. Half-credit for an answer that identifies the situation as serious but names only one factor, or that argues for a *very careful* prompt rather than a pause. The central insight Part A teaches: refining a prompt does not change the underlying sensitivity of what the prompt contains.

5. **Strong answers name the difference cleanly: redaction removes identifying detail while leaving the structure intact; abstraction rewrites the situation at a higher level so the specific case is no longer visible.** A strong personal example for redaction looks like a customer message with the customer's name, ID, and phone number replaced by *[customer]*, *[ID]*, *[phone]* but the rest of the situation untouched. A strong personal example for abstraction looks like a 1:1 note rewritten as *"a team member raised a private health matter affecting concentration"* rather than naming the medication, the diagnosis, and the person. Half-credit for an answer that defines the two correctly but where the examples are paraphrases of the Part A examples (patient leaflet, 1:1 notes) rather than from the learner's own life. Unacceptable: any answer that treats redaction and abstraction as the same thing, or that says *"both just remove names."*

6. **Strong answers pick two contexts and treat each one specifically rather than giving generic advice.** Acceptable answers cover the typical default tier *and* a never-enter example for each chosen context. Sample shapes the marker should accept: *Workplace — most internal documents are Tier 2 (drafts, agendas, project notes). Confidential strategy, salary data tied to named people, and disciplinary content are Tier 3 or higher; full salary spreadsheets with names attached should not enter a general-purpose AI tool. School — most teaching content is Tier 1 or Tier 2; a learner's grade attached to their name is Tier 3, and an unadministered exam paper is Tier 4. Healthcare — most patient-facing material is Tier 3 by default; raw clinical notes with identifiers are Tier 4 in most jurisdictions. Finance — aggregate trends and policy questions are Tier 1 or Tier 2; client-by-client data with names is Tier 3 at minimum; full payment-card numbers and mobile-money PINs are Tier 4.* Half-credit for an answer that names the right tiers but cannot supply a never-enter example specific to the context. Unacceptable: an answer that defaults every context to *"be careful."*

7. *(Application — rewrite)* **A passing rewrite removes every identifier the AI does not need to do the task and keeps only the structural facts that shape the apology.** A strong rewrite reads close to: *"Help me draft a short, warm reply to a customer who is unhappy with a bridal-package service. Two issues: the senior stylist arrived 90 minutes late, and the makeup did not last through the photos. The customer paid in full. I want to acknowledge both issues without legalese, offer a 25% credit on her next visit, and keep her as a regular customer. Tone: warm, accountable, plain English. Length: under 130 words. Format: a single message body, no subject line."* The accompanying paragraph should name the specific items removed (full name, ID number, KRA PIN, phone number, M-Pesa transaction code, the senior stylist's first name) and explain that this is mostly redaction (identifiers removed, structure preserved) with a light touch of abstraction (the stylist's name removed because the AI's apology does not need it, and naming the stylist in an external tool could be unfair to her). The marker should look for two things: every identifier is gone, *and* the AI's reply will be no worse for the removal. Half-credit for a rewrite that removes most identifiers but keeps one or two unnecessary ones (commonly the customer's first name or the M-Pesa code), or for a rewrite where the accompanying paragraph cannot articulate what redaction *did* and what abstraction *did*. Unacceptable: a rewrite that keeps the ID number, KRA PIN, full name, transaction code, or phone number on the grounds that *"the AI might need them."* It does not.

8. *(Application — sensitivity sort with reasoning)* **Acceptable tier assignments and short reasoning lines:**
   - i. *Caution.* Internal, no third-party identifiers, unlikely to cause harm if it leaked in isolation.
   - ii. *Restricted (Tier 3) at minimum, sliding toward Tier 4 once payment-card detail is involved.* Customer mobile-money phone numbers tied to names and amounts identify third parties and touch financial data. The names and the amounts together are enough for a re-identification; the phone numbers compound the risk.
   - iii. *Restricted, with strong pull toward Never-enter.* A child's image plus an identifying institution is the kind of content most jurisdictions and most platforms treat as sensitive by default. Even a redacted version (face blurred, school name removed) is typically not appropriate to upload to a general-purpose tool.
   - iv. *Safe to Caution.* The paragraph is generic, no individual or organisation is named, and it does not identify a third party. Pastable as long as the underlying real situation is not re-identifiable from internal context.
   - v. *Restricted to Never-enter, depending on policy.* A formal disciplinary notice naming all parties is Tier 3 or Tier 4 — it touches HR, legal, and disciplinary content at once. Most organisations restrict AI use on documents like this; some forbid it.
   A strong answer also notes, for the item the learner was *least* sure about, what would shift it. A common honest answer is item iii (the child photograph): blurring the face *and* removing the school identifier shifts it down toward Tier 2; conversely, any context that re-identifies the child shifts it back to Tier 4. Another defensible answer is item iv: replacing *"a finance team"* with the specific team and the named manager would lift it from Safe-to-Caution into Tier 3. Half-credit for an answer that gets four of the five tiers right but cannot give the *what would shift it* sentence. Unacceptable: any answer that places item ii or item v in *Safe*, since both miss the central lesson of Part A (third-party identifiers and disciplinary content are not Safe).

A learner who scores six or more out of eight has met the pass bar (at least 6 of 8). A learner who scores four or five should review the specific Part A sub-sections named in the *Revision guidance* section below, then retry. The most common pattern of failure on this checkpoint is over-classifying items as *Safe* — the revision guidance addresses that pattern directly.

## Portfolio artifact

**Title:** *Data Classification Table + Safer Prompt Rewrite + Operational Safety Checklist*
**Filename:** `Module10_Privacy_Safety_Checklist_[YourName].pdf` or `Module10_Privacy_Safety_Checklist_[YourName].docx`
**Length:** Three to five pages.

The artifact has six parts in this order. The point of the artifact is to leave you with a working safety floor you will actually use, not to produce a one-off document for an assignment.

1. **Your four-tier data classification table.** Build a single table with five columns — *Tier*, *Definition in your own words*, *Example from your work or study*, *Example from your business or client work*, and *Default action before the AI sees it.* The table has four rows, one per tier (*Safe*, *Caution*, *Restricted*, *Never-enter*). Every example in the table must be drawn from your own context — the kinds of files, messages, notes, spreadsheets, or records you actually handle — not from the Part A examples. The *Default action* column should name a concrete next step rather than a vague principle: *"paste as-is,"* *"redact names and identifiers, then paste,"* *"abstract into a generic version before involving the AI,"* *"do not paste; consult [named contact or function] if needed."*

2. **Safer prompt rewrite.** Choose one prompt you have written, or would have written, that contained Tier 2 or Tier 3 content. Show three things in sequence:
   - The original prompt as you would have written it, with the sensitive content visible. (If your real example would have contained Tier 4 content, do not paste that original anywhere — describe the task in generic terms, place a clear *original prompt withheld — Tier 4* note where the original would have gone, and skip ahead to step 2c.)
   - The rewritten prompt using minimum necessary information.
   - A short paragraph (50–100 words) naming what you removed, whether you used redaction or abstraction or both, and why each removal made the prompt safer without making the AI's output worse.

3. **Redaction or abstraction example.** Pick one piece of content you handle that needs more than name removal. Show the *before* and *after* in two short blocks (3–6 lines each), and label the technique you used. If you used redaction alone, say so and explain why the case could not be re-identified from the redacted version. If redaction was not enough, show the abstracted version and explain why redaction would have left the case re-identifiable. The example must be specific enough to be useful and abstracted enough to be safe to include in the artifact itself — apply the same discipline to the artifact that you apply to your prompts.

4. **Pause/escalate decision example.** Describe one task in your own work, study, business, or client context where the right move is *not* to refine a prompt — it is to pause and escalate, or not use AI at all. The description should be three to six sentences. Name the task, name which of the Part A pause-triggers it hits (Tier 4 content, active legal or disciplinary matter, vulnerable individual, decision-weight outcome, no-clear-policy-and-no-time-to-find-out, or unease you cannot explain), and name what you would do *instead* of using AI — including who you would escalate to. If you have no clear escalation contact, write that honestly and write the question you would want answered before you proceed.

5. **Operational safety checklist for your context.** Build a one-page checklist tailored to the work, study, business, or client context you operate in. Six to ten items. Each item is a short, checkable sentence in the imperative — *"Before pasting any customer message, remove the customer name, ID number, KRA PIN, phone number, and any payment reference"* rather than *"Be careful with customer information."* Each item names a *specific* behaviour, not a principle. The checklist should cover, at minimum: a minimum-necessary check (one item), a tier-classification check (one item), a redaction-or-abstraction check (one item), at least two context-specific items drawn from the situations you actually face, a pause-and-escalate trigger you commit to honour, and a re-identification check on the AI's output before you save or send it. The test for whether an item is good enough: could a colleague who has never read this module follow your checklist without asking you a clarifying question?

6. **Short disclosure or responsibility note.** A two-to-four-sentence note attached to the bottom of the artifact in the format introduced in the Course 1 Disclosure Note. Name the AI tool you used to draft any part of this artifact, what the AI did, what you reviewed, and what you remain responsible for. The disclosure is part of the artifact, not optional, because the artifact itself was likely produced with AI assistance and modelling honest disclosure on a privacy artifact is the point.

Save the artifact now. Tag it in your notes as *feeds: m11, m12, m14, m15, m16* so you can find it again when those modules ask for it.

**Acceptance criteria.** The artifact meets the standard when (a) every example in the classification table is drawn from your own context and not from Part A, (b) the prompt rewrite removes identifiers without making the AI's output worse, (c) the redaction-or-abstraction example correctly identifies which technique was needed and why, (d) the pause/escalate example names the specific trigger and the specific alternative action, (e) every item on the operational checklist is specific enough that a colleague could follow it without further explanation, and (f) the disclosure note is present and honest about what AI did and did not do in producing the artifact.

## Capstone-save reminder

The Module 10 artifact — your data classification table, your safer prompt rewrite, your redaction-or-abstraction example, your pause-and-escalate decision, your operational safety checklist, and your disclosure — is the safety floor for everything you do in the rest of Course 1. Five later modules pull directly from it. Save it where you can find it.

**Module 11 — AI for research, analysis, and synthesis.** Module 11 takes you into using AI to read, summarise, compare, and synthesise sources you did not write yourself. Some of those sources will be public (Tier 1) and pose no extra issue. Others will be internal documents, client material, interview transcripts, or notes that touch Tier 2, Tier 3, or Tier 4 content. Your Module 10 classification table and operational checklist will sit beside you as you decide which sources you can paste, which you must abstract first, and which should not enter the AI at all. Learners who skip Module 10's checklist tend to over-paste into Module 11 and find later that they have used a general-purpose AI tool on documents they should not have.

**Module 12 — AI for workflows, automation, and agents.** Module 12 asks you to design AI-assisted workflows for tasks you actually do. The Module 10 *operational safety checklist* becomes the privacy layer of every workflow you design — the *what does not enter the AI* step in your workflow diagrams comes directly from the checklist's tier and minimum-necessary items. The pause-and-escalate triggers you committed to in Module 10 become the *workflow stop conditions* in Module 12: explicit points at which the workflow stops and a human takes over. A workflow without these stop conditions is not yet a safe workflow.

**Module 14 — AI in teams and organisations.** Module 14 widens the discipline from your own AI use to AI use across a team or organisation. Your Module 10 artifact becomes the seed for the team-level version: your personal classification table is the basis of the team's shared classification standard; your personal checklist is the basis of the team's shared checklist; your pause-and-escalate triggers are the basis of the team's shared escalation policy. Module 14 will not ask you to write a corporate policy from scratch — it will ask you to extend what you already wrote in Module 10 so it works for more than one person.

**Module 15 — Building reusable AI systems: prompt packs and playbooks.** Module 15 is where you assemble a small library of prompt templates you reuse across roles, tasks, and tools. Every prompt that goes into your pack carries a one-line *boundary note* — *what content this prompt is and is not safe to use on*. That boundary note draws directly from your Module 10 classification table and operational checklist. Learners who write boundary notes seriously in Module 4 and again in Module 10 typically arrive at Module 15 with the framing of a working pack already in place; learners who skipped this part will rebuild it in Module 15 and lose time.

**Module 16 — Final capstone workflow.** Module 16 asks you to build an end-to-end AI-assisted workflow for one real task you do, end-to-end. The capstone is judged in part on safety and privacy: whether your workflow exposes data it should not, whether your workflow has named pause-and-escalate triggers, whether your workflow has a re-identification check before output is saved or sent, and whether your disclosure note matches what your workflow actually does. The capstone rubric (Appendix C of Module 16) treats safety as a *fail-state* criterion: a capstone that exposes sensitive data fails the safety criterion outright regardless of other strengths. Your Module 10 artifact is what keeps that from happening.

If you skip the artifact or save a thin version of it, five later modules become harder and one of them — the capstone — becomes outright risky. The strongest learners treat this artifact as a working draft they will keep editing across the rest of the course, not a one-time submission.

## Module completion evidence

The following outputs together prove that you have completed Module 10 meaningfully. Keep them in your portfolio folder.

- The 8-question checkpoint quiz, completed with at least 6 of 8 correct.
- Practice activity 1 submitted as a 20-item sensitivity sort with the tier name and a one-line reason for each item, plus the additional what-would-shift-the-tier note for items 5, 9, and 16.
- Practice activity 2 submitted as four minimum-necessary rewrites (one per supplied risky prompt), each with a short paragraph naming what was removed and why.
- Practice activity 3 submitted as five boundary-check decisions (one per supplied use case), each with a 3–5 sentence paragraph of reasoning naming the specific factor that drove the *appropriate / appropriate after redaction or abstraction / pause and escalate* call.
- Practice activity 4 submitted as one safe-alternative workflow design for a real operational task, in the four-step labelled format (*what the AI does not see*, *what you abstract or redact*, *the prompt itself*, *what you check after the AI output*).
- The Pause-and-check questions answered honestly in your working notes (not graded, but required for completion). The fourth question — *do I know which person or function in my organisation I would escalate a privacy-sensitive AI question to?* — should be answered with a name or role, or with an honest *no clear contact* note plus the question you would want answered.
- The Knowledge-to-output deliverables from Part A: the *Safe-Use Decision Card* and the *Redacted-prompt example*, both produced as described in the Part A *Knowledge-to-output task* section.
- The portfolio artifact saved as `Module10_Privacy_Safety_Checklist_[YourName].pdf` or `.docx`, containing all six required parts (classification table, safer prompt rewrite, redaction/abstraction example, pause/escalate example, operational safety checklist, disclosure note).

A learner with all of the above has finished Module 10 at the expected depth. A learner missing the artifact, two or more practice activities, or the operational checklist has not.

## Revision guidance

If you scored below 6 of 8 on the checkpoint, or if any of the situations below describe you, return to the named Part A section before moving on. The five revision triggers below cover the most common failure patterns on this module.

**You are classifying too much information as *Safe*.** Re-read the *Four-tier sensitivity classification* sub-section of the core lesson and the *Privacy risk by context* sub-section. The most common cause of over-classifying as Safe is treating *familiar to me* as *not sensitive* — a customer's name feels safe because you see it every day, a salary figure feels safe because it is on a spreadsheet you open every Friday, a child's photo feels safe because the parent shared it with you. None of those are Safe by default. Re-read the four-tier definitions and apply the test in Part A: *would this item be Safe, Caution, Restricted, or Never-enter if a colleague who has never seen it before encountered it for the first time?* If the answer changes when you imagine that colleague, you were treating familiarity as safety. Redo Practice activity 1 (the 20-item sensitivity sort) and pay specific attention to items that involve a third party (a customer, a colleague, a student, a patient, a counterparty), a salary or payment figure, an identifier (ID, KRA PIN, phone number), or a child. Almost none of those are Safe.

**You confuse redaction with abstraction.** Re-read the *Redaction and abstraction* sub-section of the core lesson and study Worked example 2 (the 1:1 notes) and Worked example 3 (the patient-education leaflet) closely. The most common cause of confusing the two is collapsing both into *"removing names."* Redaction removes specific identifying detail while leaving the structure intact; abstraction rewrites the situation at a higher level so the specific case is no longer visible. The diagnostic question from Part A is the one to use: *imagine the prompt being read by someone who works in your organisation but does not know this case — could they identify the person from what is left in the prompt?* If yes, you have redacted but not abstracted, and for sensitive content that is often not enough. Redo your prompt rewrite from the artifact with this question as your test.

**You are keeping sensitive details that are not necessary for the task.** Re-read the *Minimum necessary information test* sub-section of the core lesson and Worked example 1 (the printing-business customer reply). The most common cause of keeping unnecessary detail is the convenience reflex — copying the entire email, the entire spreadsheet row, the entire patient note, the entire pay slip — because trimming feels like extra work. The hidden cost is that everything you copy is now in a third-party tool, including everything the AI did not need. Apply the two-part test from Part A: first identify what the AI must know to do the task, then strip everything else before you paste. The output will be just as good — sometimes better, because the AI is not distracted by irrelevant detail. If your minimum-necessary rewrites in Practice activity 2 still contain identifiers, redo them with this test in front of you.

**You are trying to use AI in a high-risk context that should be paused or escalated.** Re-read the *When to pause or escalate* sub-section of the core lesson and Worked example 4 (the HR grievance). The most common cause of this failure is the assumption that *a careful enough prompt* can solve any privacy problem. It cannot. Some tasks are not prompt problems — they are governance problems, jurisdictional problems, or accountability problems, and the right operational move is to pause, escalate, and let the policy answer come in before the prompt does. The five Part A triggers — Tier 4 content with no approved tool, active legal or disciplinary process, vulnerable individuals, decision-weight outcomes, no clear policy and no time to find out, and unease you cannot explain — are the questions to run yourself through before you paste, not after. Redo Practice activity 3 (the boundary-check worksheet) and look for any case you marked *appropriate after redaction* that should have been *pause and escalate*.

**Your operational safety checklist is too vague to guide real behaviour.** Re-read the artifact specification in the *Portfolio artifact* section above, and study the contrast in Section 5 between *"Be careful with customer information"* (vague, useless) and *"Before pasting any customer message, remove the customer name, ID number, KRA PIN, phone number, and any payment reference"* (specific, checkable). The most common cause of a vague checklist is treating it as a list of principles rather than a list of behaviours. Apply this test to every item: *could a colleague who has never read this module follow this item without asking me a clarifying question?* If the answer is no, the item is a principle, not a checklist item. Rewrite each principle as a specific behaviour that names what to remove, what to check, what to abstract, and what to escalate. A checklist of six concrete behaviours is more useful than a checklist of fifteen vague principles, and it is the version you will actually run in real time.

## Transition to the next module

Module 10 gave you the safety floor for using AI responsibly with real information — the minimum-necessary test, the four-tier classification, the difference between redaction and abstraction, and the discipline of pausing or escalating when AI is the wrong tool for a task. That discipline is the floor every later module is built on. Module 11 builds on it directly by showing how to use AI for research, analysis, and synthesis without confusing fluent summaries with evidence — how to read with AI rather than just be read to, how to test what a synthesis is claiming, and how to keep your sources visible so a reader can check the work. The privacy habits you formed here travel with you into that work; the verification habits Module 11 adds sit on top.

## Notes for Cursor mapping

This section is for the platform team mapping Module 10 into Cursor. It is not part of the learner-facing module.

**Suggested module id:** `ae-m10`

**Suggested session and block breakdown.** Three sessions, sized for a 2h 45m to 3h 30m learner workload. Module 10 is heavier than its position in the sequence might suggest because the practice activities are decision-intensive — sensitivity sorting, minimum-necessary rewriting, and boundary-checking each require sustained judgement rather than recall.

- *Session 1 — Principles and classification (≈ 50 minutes).* Overview block (the *What was wrong before*, *What was improved*, *Estimated time*, *Module purpose*, and *Learner outcomes* sections from Part A). Core lesson sub-sections *The minimum necessary information test*, *The four-tier sensitivity classification*, and *Redaction and abstraction*. End with Worked example 1 (the printing-business customer reply) as the first applied demonstration.
- *Session 2 — Risk by context, jurisdiction note, and pause-and-escalate (≈ 60 minutes).* Core lesson sub-sections *Privacy risk by context*, *Survey-level jurisdiction note*, and *When to pause or escalate*. Worked examples 2, 3, and 4 (1:1 notes, patient-education leaflet, HR grievance). End with the Pause-and-check block.
- *Session 3 — Apply, assess, and produce (≈ 80 minutes).* Practice activities 1 through 4 (sensitivity sort, minimum-necessary rewrite, boundary-check worksheet, safe-alternative workflow design), the knowledge-to-output *Safe-Use Decision Card* and *Redacted-prompt example*, the 8-question checkpoint quiz, and the portfolio artifact upload.

**Likely content block types** (mapped to the platform's standard block library):

- *Overview / objectives* — the *What was wrong before*, *What was improved*, *Module purpose*, and *Learner outcomes* sections from Part A. The *Estimated time* breakdown should be exposed as a small visible bar at the top of the module so a self-learner can plan a session realistically.
- *Concept* — each of the seven core lesson sub-sections (*minimum necessary*, *four-tier classification*, *redaction and abstraction*, *privacy risk by context*, *survey-level jurisdiction note*, *when to pause or escalate*) rendered as concept blocks. The *four-tier classification* block should expose the four tiers as a comparison view (definition, examples, default action) rather than a stack of paragraphs. The *survey-level jurisdiction note* block must include a visible *not legal advice* tag inside the block, not just on the page header.
- *Guided example* — each of the four worked examples rendered as a single guided-example block with a collapsible *risky prompt → what is wrong → better prompt or workflow → what the learner should notice* substructure. Worked example 4 (the HR grievance) does not produce a *better prompt* because the answer is *do not prompt at all* — the substructure for that example must accommodate a *do-not-use* outcome rather than forcing a rewrite.
- *Practice* — one practice block per practice activity (four total), each pre-loaded with the supplied items so the learner does not have to leave the platform to begin. Practice activity 1 (the 20-item sensitivity sort) needs a four-tier dropdown or four-button selector per item plus a one-line reason field. Practice activity 3 (the boundary-check worksheet) needs a three-option selector (*appropriate as described*, *appropriate after redaction or abstraction*, *pause and escalate*) plus a paragraph field per use case.
- *Reflection* — the Pause-and-check block, with a separate flag for the fourth question (*do I know which person or function I would escalate to?*) so the platform can prompt the learner to write an answer rather than skip past it.
- *Knowledge-to-output* — the two-part task (Safe-Use Decision Card and Redacted-prompt example) as a single multi-step block with each artifact as its own sub-step.
- *Checkpoint* — the 8-question quiz.
- *Artifact upload* — the portfolio artifact, with the filename pattern enforced by the upload widget.
- *Remediation* — the Revision guidance section, mapped to deep-link buttons that jump back to the named Part A sub-sections.

**Quiz mapping notes.** Eight questions, four formats. Two are machine-checkable multiple choice (Q1, Q2) and can be scored automatically. The remaining six (Q3 through Q8) are rubric-checkable: each has a model answer plus criteria in the answer key. The platform should render Q3, Q4, Q5, Q6, Q7, and Q8 as text-area inputs with a learner-side self-assessment rubric (collapsible) below each. Q7 (the salon customer rewrite) is the most rubric-heavy and benefits from a side-by-side display of the learner's rewrite and the named identifiers from the original prompt — the learner should be able to tick each removed identifier as a self-check before scoring. Q8 (the five-item sensitivity sort) benefits from the same four-tier selector used in Practice activity 1 so the learner is using one consistent UI for tier classification across the module. The pass rule means the learner must mark themselves as correct on at least six of eight using the supplied criteria.

**Portfolio artifact mapping notes.** Upload widget should accept `.pdf` and `.docx` only. Filename must match the pattern `Module10_Privacy_Safety_Checklist_*.{pdf,docx}` — enforce on upload as a soft prompt (override allowed). The widget should expose all six required parts (classification table, safer prompt rewrite, redaction/abstraction example, pause/escalate example, operational safety checklist, disclosure note) as a checklist the learner ticks before submission, so partial uploads are caught at the point of submission. The acceptance-criteria block (the six (a)–(f) criteria from the *Portfolio artifact* section above) should render as a self-check rubric next to the upload control, not after submission. Tag the artifact in storage as `feeds:m11, feeds:m12, feeds:m14, feeds:m15, feeds:m16` so later modules can surface it automatically when needed. The classification table and the operational checklist should also be stored as separately retrievable sub-artifacts inside the file so Module 12 (workflow design) and Module 14 (team AI use) can pull them in directly without requiring the learner to copy-paste.

**Special UI needs.**

- The four-tier classification model should be rendered with a small persistent legend (Safe, Caution, Restricted, Never-enter) that is visible during all Session 2 and Session 3 blocks. Learners frequently lose the order of tiers once they start classifying their own items.
- The four-tier selector (used in Practice activity 1, Practice activity 3, the artifact's classification table, and checkpoint Q8) must be a consistent UI component across all four locations — same colours, same order, same hover text. Inconsistency here trains the learner that the model itself is inconsistent, which it is not.
- The survey-level jurisdiction sub-section must carry a visible *not legal advice* tag in the block header, and the Kenya / EAC, GDPR, and US sector-specific paragraphs should each be rendered as a small expandable panel rather than a wall of text. The point of the section is for a learner to know *when to pause and ask*, not to memorise legal frameworks.
- Worked example 4 (the HR grievance) should not be rendered with the same *risky prompt → engineered prompt* layout as the other three examples, because the answer in that example is *do not prompt*. The block should render with a *risky workflow → why the right move is pause-and-escalate → what to do instead* substructure to make the lesson land — that some tasks are not prompt problems at all.
- The pause-and-escalate trigger list (six items in the *When to pause or escalate* sub-section) should be exposed as a collapsible self-check the learner can run on any task they are about to prompt — not only inside the lesson, but as a re-usable UI component the platform surfaces in Modules 11 through 16 whenever the learner is about to paste user-supplied content into a prompt block. This is the single most reusable UI primitive in the module.
- The portfolio artifact upload should display the six-part checklist next to the upload control, not after submission, and the acceptance-criteria block (six (a)–(f) criteria) should be visible as a self-check rubric, not hidden behind a *submit* action.
- The Revision guidance section names five specific failure modes; each one should link back to the precise Part A sub-section named, not to *the module*. A learner who failed because they over-classified as *Safe* should land directly inside the *Four-tier sensitivity classification* sub-section, not at the top of Part A.

**How Part A and Part B should be combined into `Jifunze_Course1_Module_10_Improved.md`.**

Part A and Part B are the same module, split into two files only for authoring convenience. To produce the final deliverable file `Jifunze_Course1_Module_10_Improved.md`, concatenate them in this order, removing the Part B title line and italic note so the module reads as one continuous document:

1. From Part A, take everything from `# Module 10: Privacy, Risk, Boundaries, and Safe Operational Use` through the end of the *Knowledge-to-output task* section.
2. From Part B, take everything from `## Checkpoint quiz` through the end of `## Notes for Cursor mapping`.
3. Drop the Part B header line (`# Module 10: Privacy, Risk, Boundaries, and Safe Operational Use — Part B`) and the italic note immediately under it, since they exist only to orient the Part B file as a standalone fragment.
4. Verify that the final concatenated file has exactly one `# Module 10:` heading, exactly the full set of `##` section headings in the order specified by the Course 1 benchmark (*What was wrong before*, *What was improved*, *Estimated time*, *Module purpose*, *Learner outcomes*, *Core lesson*, *Fully written worked examples*, *Supplied practice activity materials*, *Pause and check*, *Knowledge-to-output task*, *Checkpoint quiz*, *Answer key with explanations*, *Portfolio artifact*, *Capstone-save reminder*, *Module completion evidence*, *Revision guidance*, *Transition to the next module*, *Notes for Cursor mapping*), and no duplicate sub-sections.
5. Verify that the *Notes for Cursor mapping* section sits last and is clearly marked as platform-team-only, not learner-facing. The *not legal advice* caveat in the *Survey-level jurisdiction note* sub-section must survive the merge intact.

Once concatenated and verified, the result is the canonical Module 10 file and supersedes both part files. The two part files can be archived but should not be deleted, since they are useful as authoring history.
