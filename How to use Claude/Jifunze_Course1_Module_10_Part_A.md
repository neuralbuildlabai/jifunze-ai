# Module 10: Privacy, Risk, Boundaries, and Safe Operational Use

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
