# Module 16: Capstone — End-to-End AI-Supported Workflow — Part B

*Part B continues directly from Part A. Part A covered the continuity bridge from Module 15, what was preserved and improved, the estimated time, the module purpose and learner outcomes, the capstone overview and eleven required components, the seven-criteria task selection, the planning canvas, the table of artifacts to reuse, the eight-step self-critique fallback, the rubric, the certificate-readiness conditions, and the pause-and-check. Part B is the demonstration and assessment half of the module: a fully worked capstone example, a shorter second mini-example, the capstone work sequence, the final reflection prompt, the submission checklist, the portfolio artifact specification, the completion evidence, the revision guidance, the course completion transition, and the Cursor-mapping notes. Part A is not repeated here.*

## Fully worked capstone example

This worked example shows what a complete end-to-end capstone bundle looks like when the eleven components are present, the seven rubric criteria are addressed, and the self-critique fallback has actually been run. It is one capstone, not a template. Your capstone will look different in the specifics. Read this one to see the discipline, not to copy the surface.

The learner is *Wanjiru Kimani*, a Small Business and Entrepreneurship pathway learner and the owner of *Nakala Prints*, a small print-and-design shop in Eastlands, Nairobi. Wanjiru has one part-time assistant and handles most customer communication herself on WhatsApp. The shop produces branded notebooks, business cards, banners, and small-run packaging for SMEs and individuals. Wanjiru completed Modules 1–15 over five weeks, has a Module 15 prompt pack and playbook for customer-reply tasks, and is now running her capstone.

### 1. Problem and task framing

**Task title.** *Customer-Reply Workflow for Delivery-Window Change Requests on Branded Notebook Orders.*

**Learner context.** *I run Nakala Prints, a print-and-design shop in Eastlands, Nairobi. I have one part-time assistant. Most customer communication happens on WhatsApp, both on my personal-business line and the shop number. Pathway: Small Business and Entrepreneurship.*

**Intended audience.** *Recurring SME customers who order branded notebooks for corporate gifts, staff onboarding kits, or training events. Most are office managers or admin officers with whom I have an existing relationship. They are reachable on WhatsApp and English/Swahili-mixed messaging is normal.*

**Pathway connection.** *Small Business and Entrepreneurship. The reply pack is workplace-credible evidence that I can run AI-assisted customer communication consistently, with privacy and disclosure discipline, and that the operation does not depend on me being personally available for every reply.*

**Problem.** *Delivery-window changes happen roughly twice a week — usually because of a printer queue overflow, a paper-stock delay from my supplier, or a power-cut affecting the lamination station. Each time, I write a reply from scratch on WhatsApp. The replies vary in tone (some apologetic, some terse), occasionally promise a window I cannot actually meet, and sometimes leak operational detail customers do not need (e.g., naming the supplier). I want a reusable workflow that produces consistent, accurate, on-tone replies with a documented review step before send.*

**Success criteria.** Five criteria, each checkable: (a) the reply addresses the customer by their first name; (b) the reply names the original delivery window and the new committed window; (c) the reply contains no commitment beyond the window change (no compensation, no priority promise, no second-guarantee); (d) the reply is under 120 words; (e) I can review the reply in under thirty seconds before sending.

**Risks.** Four named, each with a catch. *(i) AI invents a delivery window not supported by the production tracker — catch: human verification at Stage 4 against the daily tracker.* *(ii) AI uses a phrase that sounds generic or templated and damages the customer relationship — catch: review-criteria item on tone match against the team voice guide.* *(iii) Customer's note pasted into the prompt contains an M-Pesa transaction code or a phone number — catch: Stage 1 sanitisation step, with the safety checklist applied before pasting.* *(iv) AI confidently produces a reply for a request the workflow is not designed for (e.g., a refund, an angry customer, a dispatched-and-lost order) — catch: boundary list inside the prompt and the playbook, with escalation routes.*

**Boundaries.** *Not for refund requests (use the refund process). Not for already-dispatched orders that have not arrived (escalate to Boda dispatch desk). Not for distressed, angry, or threatening customers (the empathetic-reply path is human-only). Not for customers whose details have not been verified against the order book.*

**Final deliverable.** *One customer reply, under 120 words, addressed to the customer by name, naming the original and new delivery window, with no commitment beyond the window change, in Nakala's standard voice (warm but business-direct, English-Swahili-friendly), ready for me to send on WhatsApp.*

### 2. Workflow map

Five stages, in order, with named owners.

*Stage 1 — Sanitise inputs (human, Wanjiru).* Strip out any M-Pesa transaction code, phone number, or other restricted-tier detail from the customer note before pasting. Replace customer name with first name only. Confirm the original window and the requested new window from the production tracker.

*Stage 2 — Run the customer-reply prompt (AI).* Use the *Delivery-Window Change Reply* prompt from the Module 15 pack (current version: v3). Inputs: customer first name, original window, new committed window, feasibility flag (yes/no/partial), and a short sanitised version of the customer's note if relevant.

*Stage 3 — Review the AI output against review criteria (human, Wanjiru).* Apply the seven-item review checklist from the prompt pack. If any criterion fails, edit directly or re-run with a clarifying constraint.

*Stage 4 — Verify the new delivery commitment against the production tracker (human, Wanjiru).* Open the tracker, confirm the new window is feasible against the printer queue, paper stock, and power-window forecast. If the commitment cannot be verified, halt and escalate to dispatch.

*Stage 5 — Approve and send on WhatsApp (human, Wanjiru).* Copy the final reply into WhatsApp, confirm the recipient is correct, send. Log the reply in the customer log with the timestamp.

The map sits as a numbered diagram in the bundle, with a short prose paragraph explaining each stage's owner and what triggers a halt.

### 3. Prompt pack or playbook used

Wanjiru's bundle extends the Module 15 prompt pack she had already built. The pack now contains four prompts; the one used in this capstone is reproduced in full below with the nine-element structure intact.

**Prompt name.** *Delivery-Window Change Reply.*

**Version.** *v3, 2026-04-22.*

**1. Purpose.** Drafts a short customer reply for a delivery-window change request, in Nakala's standard tone, when the original order has not yet been dispatched.

**2. Audience.** Wanjiru, owner-operator. The prompt is designed to be runnable by Wanjiru's part-time assistant when Wanjiru is unavailable, with the same review checklist applied before send.

**3. Input requirements.** Customer first name; original delivery window (date and time band); new committed window; feasibility flag (yes / no / partial-with-explanation); optional sanitised customer note (M-Pesa codes, phone numbers, and full names removed before pasting).

**4. Prompt text.**

> *You are drafting a short WhatsApp reply on behalf of Nakala Prints, a small print-and-design shop in Eastlands, Nairobi. The customer's name is {first name}. They ordered branded notebooks. Their original delivery window was {original window}. The new committed window is {new window}. Feasibility flag: {yes / no / partial}. Customer note (sanitised): {note or 'none'}.*
>
> *Write a single message, under 120 words, in warm-but-business-direct tone. Address the customer by first name. Name the original window and the new committed window explicitly. If the feasibility flag is 'partial', explain only the part that is committed and what is still being confirmed — do not invent specifics. If the flag is 'no', do not propose a window; instead say we will confirm within four working hours and ask the customer to hold.*
>
> *Constraints. No commitments beyond the window change. No promises of compensation, refunds, priority, or future discount. No mention of suppliers, equipment, or operational detail. No 'Dear Valued Customer'. No 'we apologise for any inconvenience caused' (it sounds templated for our customer base).*
>
> *Format. WhatsApp message. One greeting line. Two to four short body lines. One closing line. No bullet points. No headers.*
>
> *Review cue. If any required input is missing or unclear, mark the section [to confirm] rather than filling it in. Do not invent the customer's first name.*

**5. Example use.** Shown in section 7 below.

**6. Boundaries.** Not for refund requests. Not for already-dispatched orders. Not for angry, distressed, or threatening customers. Not for customers whose order details have not been verified against the order book. Not for first-time customers (the first-time-customer flow is human-only and slower on purpose).

**7. Review criteria.** Seven items, each checkable in under five seconds. *(a) Customer first name present and spelled correctly?* *(b) Original window named?* *(c) New window named (or [to confirm] if flag was 'no')?* *(d) Reply under 120 words?* *(e) No commitment beyond the window change?* *(f) Tone matches Nakala voice (warm, direct, no boilerplate)?* *(g) No mention of supplier, equipment, or operational detail?*

**8. Ownership.** Wanjiru. Questions or proposed changes go to Wanjiru first.

**9. Version notes.** *v1 2026-03-18 initial. v2 2026-04-09 added the four-working-hour clause for the 'no' flag after a near-miss where v1 invented a window. v3 2026-04-22 tightened tone constraints after a customer feedback note that v2 read templated; added the no-supplier-naming clause after I caught myself naming the paper supplier in a draft.*

The playbook the prompt sits inside is the *Customer Communication Playbook v2*, which has the eight Module 15 elements (when to use, steps, prompts referenced by name and version, review checkpoints, safety boundaries, escalation rules, expected outputs, failure signs). The capstone bundle includes both the prompt pack and the playbook in full; only the prompt entry above is reproduced here for length.

### 4. AI-assisted outputs

Three real outputs the workflow produced on three different requests in one working week. The customer details are abstracted (Customer A, B, C) per the safety discipline; the operational details are the real ones from Wanjiru's tracker.

**Output 1 — Customer A. Branded notebook order, 200 units, original window Monday afternoon, new window Wednesday morning, feasibility flag 'yes'.**

*AI draft (first run):*

> *Hi James — quick update on your Nakala order. Your 200 branded notebooks were on track for Monday afternoon, but a paper-stock delay on our end means we are now committed to Wednesday morning, between 9 and 12. The notebooks will be the same spec we agreed, and I will send a confirmation when they leave the shop. Thanks for your patience — let me know if Wednesday morning will not work for you and we will figure something out together. — Wanjiru*

*Word count: 76. Review checklist:* (a) yes; (b) yes — Monday afternoon; (c) yes — Wednesday 9–12; (d) yes; (e) almost — *"figure something out together"* drifts toward an open-ended commitment; (f) yes; (g) no — *"paper-stock delay"* names operational detail.

**Output 2 — Customer B. Branded notebook order, 50 units, original window Friday morning, new window Monday afternoon, feasibility flag 'partial', customer note (sanitised): "We have a training on Tuesday — really need them by then."**

*AI draft (first run):*

> *Hi Mercy — checking in on your Nakala order. Your 50 notebooks were originally scheduled for Friday morning. We can now commit to Monday afternoon for the print run, with binding to be confirmed by Monday evening — I will message you with a binding confirmation by 5 pm Monday at the latest. I have noted that you need them by Tuesday for the training, and the Monday afternoon-to-evening window keeps that on track. — Wanjiru*

*Word count: 81. Review checklist:* (a) yes; (b) yes — Friday morning; (c) partial committed (Monday afternoon for print, evening for binding) clearly stated; (d) yes; (e) yes — no compensation, no priority promise, no second guarantee; (f) yes; (g) yes.

**Output 3 — Customer C. Branded notebook order, 1,000 units, original window Wednesday, new window unknown, feasibility flag 'no'.**

*AI draft (first run):*

> *Hi Anita — I owe you a quick update on your 1,000-unit Nakala order. We had committed to Wednesday and we will not make that window. I do not want to give you a new date that I cannot stand behind, so I am asking for four working hours from now to confirm a window I am sure of, and I will message you back today with that commitment. I am sorry for the disruption to your planning. — Wanjiru*

*Word count: 81. Review checklist:* (a) yes; (b) yes — Wednesday; (c) [to confirm] correctly used; (d) yes; (e) yes; (f) yes — apology is direct, not templated; (g) yes.

### 5. Verification and review notes

Each AI output was reviewed against the seven-item review checklist (results in section 4) and against the production tracker for the new committed windows. The verification log below records the checkable claims in each final output and traces them to a verified source.

**Output 1 — Customer A.** Two checkable claims: *(i) original window was Monday afternoon* — verified against the order entry in Wanjiru's order book, dated 2026-04-15, customer A's order, original window Monday 14:00–18:00. *(ii) new committed window is Wednesday morning between 9 and 12* — verified against the production tracker, Wednesday 09:00–12:00 slot reserved for Customer A's order, paper stock arriving Tuesday afternoon, lamination station available. Both claims trace.

**Output 2 — Customer B.** Three checkable claims: *(i) original window Friday morning* — verified, order book entry 2026-04-15, original window Friday 09:00–12:00. *(ii) Monday afternoon for print run* — verified, production tracker Monday 14:00–17:00 slot reserved. *(iii) binding confirmation by 5 pm Monday* — partially verified, contingent on the binding-station reopening Monday morning after the weekend power schedule; recorded as a soft commitment with an explicit review point at 5 pm Monday. Marked clearly with the *"by 5 pm Monday at the latest"* language so the customer knows it is a confirmation point, not a guarantee.

**Output 3 — Customer C.** One checkable claim: *(i) we had committed to Wednesday* — verified against the order book, customer C's order, original window Wednesday all-day. The four-working-hour confirmation window is recorded as a commitment Wanjiru is making, traceable to the prompt pack's standard treatment of the 'no' flag.

The review surfaced one error in Output 1 — the *"figure something out together"* phrasing — which was corrected before send (see revision notes below). No errors in Outputs 2 or 3. The review checklist took roughly fifteen seconds per output once Wanjiru had run it three times.

### 6. Safety and privacy boundaries

The bundle's safety discipline applies at four levels.

*Input level.* All customer notes were sanitised before pasting. In Output 2, the original customer note read *"We have a training on Tuesday — really need them by then. M-Pesa code QXR1234567 sent yesterday."* The sanitised version omitted the M-Pesa code and read *"We have a training on Tuesday — really need them by then."* The M-Pesa code was not needed for the reply task and is restricted-tier under the Module 10 classification.

*Prompt level.* The prompt itself encodes safety constraints: it requires the customer's first name only (not full name), refuses to invent details, and does not request operational identifiers (order numbers, phone numbers, M-Pesa codes) as inputs. The boundary list inside the prompt pack excludes refund requests, dispatched orders, and angry-customer paths from the workflow entirely.

*Output level.* The AI outputs themselves contain only the customer's first name, the order quantity, the original window, the new window, and the operational explanation calibrated to the constraints. Output 1's first run contained the phrase *"paper-stock delay on our end"*, which named operational detail. This was caught at review and revised (see section 7 below) before send. Output 2 and Output 3 contained no operational detail naming.

*Bundle level.* For the capstone submission, the customer names are abstracted (A, B, C) and the order quantities are kept as stand-ins. The phone numbers and full WhatsApp screenshots are excluded from the bundle. A reader of the bundle can see the workflow's design and discipline without seeing identifying information about real customers.

The Module 10 operational safety checklist was applied stage by stage. At Stage 1, the sanitisation check ran in under ten seconds per request. At Stage 5, the recipient confirmation prevented sending Output 2 to Customer A's number (a near-miss caught by the checklist).

### 7. Revision notes

Three revisions were made between first AI draft and final sent message.

*Output 1 revision.* The AI first draft contained *"figure something out together"*, which the review checklist caught as a drift toward an open-ended commitment, and *"paper-stock delay on our end"*, which named operational detail the boundary list excludes. Wanjiru edited the closing line to *"Let me know if Wednesday morning will not work and we will adjust the slot from there."* and the explanation to *"a delay on our end"* without naming the supplier or equipment. Final word count: 73. Final reply met all seven review-checklist items.

*Output 2 revision.* No changes between first AI draft and final sent message. The review checklist passed on first run.

*Output 3 revision.* No changes between first AI draft and final sent message. The 'no' flag handling worked as designed; the four-working-hour clause was applied without invention.

Each revision is recorded in a revision log inside the bundle, with the surfacing item from the review checklist named (Output 1 revision: items (e) and (g) of the checklist).

The version-noting discipline carries forward into the prompt pack itself. After the capstone week, Wanjiru added a v3.1 note to the prompt pack: *"Add a constraint to the prompt that closing lines should not invite open-ended adjustment ('we will figure something out together'); the open-ended phrasing slipped past v3 and required manual editing in the capstone week. Constraint added 2026-04-29 after the capstone."* The constraint update is the kind of small revision the version-control habit catches and records.

### 8. Final output

The final outputs of the capstone are three sent customer messages, plus the workflow itself as a reusable asset. The three sent messages are reproduced below in their final form (after revision).

*Final reply to Customer A:*

> *Hi James — quick update on your Nakala order. Your 200 branded notebooks were on track for Monday afternoon, but a delay on our end means we are now committed to Wednesday morning, between 9 and 12. The notebooks will be the same spec we agreed. I will send a confirmation when they leave the shop. Let me know if Wednesday morning will not work and we will adjust the slot from there. — Wanjiru*

*Final reply to Customer B:* (unchanged from section 4 Output 2.)

*Final reply to Customer C:* (unchanged from section 4 Output 3.)

The reusable asset — the *Delivery-Window Change Reply v3.1* prompt entry plus the *Customer Communication Playbook v2* — is the durable output. It will run on the next delivery-window change request without rebuilding, and the version-control habit will absorb the next learning.

### 9. Disclosure statement

Adapted from Wanjiru's Module 9 accountability statement and aligned with Course1_Disclosure_Note.md.

> *AI assistance disclosure. The replies sent to my customers in the capstone week were drafted with help from Claude, used as a structured-prompt assistant under the Delivery-Window Change Reply v3 prompt and the Customer Communication Playbook v2. AI drafted the first version of each reply from the inputs I supplied (sanitised). I reviewed each draft against a seven-item checklist, verified the new delivery window against my production tracker before sending, and edited the drafts where the review surfaced an issue (one of three drafts required edits before send). I am responsible for the accuracy of every commitment made in the replies, the appropriateness of the tone, the safe handling of customer information, and the operational fit of the workflow.*

The disclosure is included with the bundle and would also be appropriate to include if Wanjiru shows the capstone to a senior reviewer, a potential business partner, or a future customer who asks how Nakala handles AI-supported communication.

### 10. Self-critique notes

Wanjiru ran the eight-step self-critique fallback against the bundle. The results below are summarised in the bundle as the *Self-Critique Notes* file.

*Step 1 — 24-hour pause.* Done. Wanjiru finished the bundle on a Saturday evening and returned to it on Monday morning. The pause surfaced two things she had missed on Saturday: the Output 1 revision was recorded but the why-was-it-caught (review-checklist items (e) and (g)) was not yet recorded; and the disclosure statement read more confident than the rest of the bundle. Both fixed.

*Step 2 — named-reader test.* Wanjiru picked Mwangi, a former office colleague who is now an operations manager at a logistics firm and whose judgment she respects. *Mwangi would say the workflow design is solid, the prompt pack is reusable, and the verification log is honest. He would push back on the disclosure: it slightly overstates AI involvement (the AI drafted three replies in the capstone; the workflow itself was designed by me, the boundaries are mine, the tone guide is mine, and the safety discipline is mine). The disclosure should not read as if AI did all of it.* Disclosure statement revised after this critique to the version reproduced in section 9.

*Step 3 — claim-trace test.* Every checkable claim in the three final replies traces to a verified source (verification log section 5). One soft commitment in Output 2 ("binding confirmation by 5 pm Monday") is flagged as a soft commitment with an explicit review point, not as a verified fact. No claim in the bundle is presented as evidence without traceability or an honest uncertainty label.

*Step 4 — privacy review.* Inputs sanitised. M-Pesa code excluded. Customer names abstracted in the bundle. No operational detail (supplier names, equipment names, internal pricing) appears anywhere. WhatsApp screenshots excluded. The bundle could be shared with Mwangi without exposing customer information.

*Step 5 — usefulness test.* Read Outputs 1, 2, 3 from the customer's perspective. *As Customer A, I would accept the reply — the new window is clear, the language is direct, the closing line is open without being mushy.* *As Customer B, I would accept the reply — the partial commitment is honest and the explicit review point at 5 pm Monday is reassuring.* *As Customer C, I would accept the reply — being told a date is not yet committable is better than being told a date that slips again.* The workflow does the job.

*Step 6 — prompt review.* The prompt was tested against the four Module 15 quality tests. *Could another person use this without explanation?* Yes — Wanjiru's assistant ran the prompt on Output 2 with the inputs supplied and produced a reply that met the review checklist. *Does it work on a fresh scenario?* Yes — Output 3 (the 'no' flag) is a fresh scenario the prompt was not first built against; the four-working-hour clause held. *Does it preserve safety and review?* Yes — the boundary list and the review checklist are inside the pack, not separate. *Does it produce reviewable output?* Yes — every output is checkable against the seven-item list in under thirty seconds.

*Step 7 — revision log.* Three revisions recorded with the surfacing item named (sections 7 and 9). The revision log is honest: it shows the open-ended-phrasing catch, the disclosure overstatement catch, and the version-note update for the v3.1 constraint.

*Step 8 — final confidence note.* *I am confident in the workflow design, the prompt pack, the playbook, the safety discipline, and the disclosure. I am less confident in the playbook's escalation routes — they are written but they have not been tested under a real escalation case in the capstone week, only in the design. To lift the playbook to Strong on the rubric's reusability criterion, I would need to run the workflow on at least one case that triggers escalation (an angry customer, a dispatched-and-lost order, a customer asking for a refund) and document what the escalation looked like. That test is on the next-month list, not on this capstone.*

### 11. Rubric scoring commentary

Wanjiru self-graded against the seven rubric criteria. Her scoring is reproduced below with the rationale.

**1. Problem framing — Strong.** *The framing is specific. The audience is described concretely. The success criteria are checkable. The risks are named with their catches. The boundaries are named at the same level of specificity as what the workflow is for. A reviewer could grade the output against the framing without inventing the standard.*

**2. Prompt and workflow design — Strong.** *The prompt has the Module 4 / Module 15 nine-element structure visibly applied. The playbook has the Module 15 eight-element structure. The workflow has stages, owners, AI-assist decisions, review checkpoints, safety boundaries, and failure signs. The pack has been version-noted across four versions and tested on a fresh scenario (the 'no' flag in Output 3).*

**3. Verification and review — Ready.** *Every checkable claim in the three final replies is traced. The review checklist was applied to every AI output, with the review evidenced in section 4 and section 7. One soft commitment is honestly flagged. The bundle does not yet meet Strong because the verification log is straightforward — it relied on Wanjiru's own production tracker, which is the only source she had — and a Strong rating would require multi-source verification on at least one claim. The 'Ready' rating is honest.*

**4. Safety and privacy — Strong.** *The Module 10 classification is applied at every stage. Caution-tier inputs are sanitised. Restricted-tier inputs (M-Pesa codes) are excluded. The bundle as a whole is free of identifying information about real customers. The boundary list is specific to this workflow's failure modes, not generic. The bundle could be published openly without harm.*

**5. Usefulness of final output — Strong.** *The three final replies do the job. The intended audience (the actual customers) would accept them as satisfactory responses. The bundle includes a short note on what each reply does and does not establish (the soft commitment in Output 2 is named).*

**6. Reusability and transfer — Ready.** *The pack and the playbook are reusable assets. Another person — Wanjiru's assistant — has run the prompt on a fresh request and produced an acceptable output. The bundle does not yet meet Strong because the playbook's escalation routes have not been tested in a live escalation case during the capstone week. The 'Ready' rating reflects this honestly. The plan to lift it to Strong (a real escalation test next month) is recorded in the confidence note.*

**7. Reflection and improvement — Ready.** *The reflection (see the next section) names two things Wanjiru now knows about her own AI use that she did not know at the start of Course 1. The revision log records what changed and what surfaced the change. The confidence note names where the bundle is strong, where it is less confident, and what would lift the lower areas. The bundle does not yet meet Strong because the reflection is descriptive on the AI side and could go further on what Wanjiru would do differently in workflow design specifically; the second pass is on the post-capstone list.*

**Overall.** Strong on four criteria (problem framing, prompt/workflow design, safety and privacy, usefulness). Ready on three criteria (verification and review, reusability and transfer, reflection and improvement). No criterion at Developing. No criterion at Not ready. The capstone meets the certificate-readiness rule (every criterion at Ready or higher, at least four at Strong) without revision.

A reviewer reading the bundle would arrive at roughly the same rating. Wanjiru ran the named-reader test (step 2 of the self-critique fallback) and Mwangi's projected reading matched the self-grading within one level on every criterion.

## Optional second mini-example

This example is shorter and illustrates the same discipline applied to a different task family. Less detail is shown; the structure is the same.

**Learner.** *David Otieno*, an operations coordinator in a three-person team at a small accountancy firm in Westlands, Nairobi. Pathway: Digital Work Starter, with strong overlap to AI Productivity Professional.

**Capstone task.** *Weekly Internal Recap Workflow for the operations team.* The recap is a short Friday document the team lead reads on Monday morning to know what happened, what is blocked, and what needs a decision in the coming week.

**Problem and task framing.** *Audience: the team lead. Input: the team's running notes file plus David's own notes from the week. Output: a one-page recap, in the team's standard sections (What happened, What is blocked, What needs your input). Constraints: under 400 words, no sensitive client names, no decisions presented as facts. Risks: AI inflates progress; AI invents a blocker that did not happen; AI summarises a confidential client matter without sanitisation. Catches: the verification step against the running notes file; the boundary list excluding client-name material from the prompt; the review checklist applied before sharing.*

**Workflow map.** Four stages. *(1) Sanitise the week's notes (David) — strip client names, replace with role descriptors. (2) Run the recap prompt (AI). (3) Review against the seven-item checklist (David). (4) Share with the team lead on Monday morning (David).*

**Prompt pack.** Single prompt — *Weekly Recap Prompt v2*, extending David's Module 15 pack. Nine elements present. Inputs: sanitised week's notes, the running blockers list, the standing-decisions list. Boundaries: not for board-facing recaps; not for client-confidential matters; not for HR escalations.

**Realistic AI output.** A 380-word recap in the three sections, with two blockers named (a vendor invoice waiting on a clarification; an internal tooling permission issue) and one decision request (whether to take on a fourth audit in May, given the current load). Tone: factual, no inflation, no decision presented as fact.

**Verification.** Every blocker and decision request traced to the running notes file or to a Slack thread David could point to. One AI-suggested blocker (*"the bookkeeping software upgrade is pending"*) was removed at review because it was a possibility, not a current blocker — David could not trace it to a real source.

**Safety and privacy.** Client names sanitised at Stage 1. The recap names *"the May audit client"* and *"the SME tax-advisory client"* rather than the real names. The team lead, as the recap's audience, knows which client each refers to from context. A reader outside the team would not.

**Revision.** One revision — the AI's draft of the *What needs your input* section listed three items; David removed two of them as not needing the lead's input this week, kept one (the fourth audit decision), and tightened the framing to ask for a decision by Wednesday.

**Final output.** The 380-word recap, sent on Monday morning. Plus the *Weekly Recap Prompt v2* and the workflow map, saved as the reusable asset.

**Disclosure.** *AI assistance disclosure: this recap was drafted with help from Claude using the Weekly Recap Prompt v2. AI drafted the first version from my sanitised inputs. I reviewed against a seven-item checklist, removed one inferred blocker that I could not verify, and tightened the decision-request section. I am responsible for the accuracy of every blocker and decision named.*

**Self-critique summary.** Strong on workflow design, prompt pack, safety. Ready on usefulness (the team lead has read two recaps in the workflow's design phase and accepted them; the capstone week's recap met the same standard). Ready on verification (one inferred-but-not-verifiable item caught at review and removed; the rest traced). Ready on reflection. No Developing or Not ready ratings.

The mini-example demonstrates the same shape applied to an office workflow rather than a customer-communication workflow. The discipline transfers; the surface differs.

## Capstone work sequence

The sequence below is the order in which a learner runs the capstone end-to-end. Each step depends on the steps before it. Skipping forward — designing the prompts before completing the planning canvas, running the workflow before classifying the inputs — produces the failure modes the rubric catches. The total time across the eleven steps is twelve to eighteen hours of focused work, spread across two to four sittings over a week.

**1. Choose the task.** Run candidate tasks through the seven selection criteria from Part A (useful, realistic, bounded, reviewable, not too sensitive, pathway-connected, completable in the available time). Write the task in one sentence that names the audience, the input, and the output. If the sentence is hard to write, the task is not yet bounded — keep refining until the sentence is concrete.

**2. Complete the planning canvas.** Fill in all fifteen fields from Part A's *Capstone planning canvas* section. Keep each field short but specific. The canvas is the document a reviewer reads first when they open the bundle, and it is the document you read again before each working session to keep the capstone honest. A canvas that took fifteen minutes is usually a canvas that did not do the work.

**3. Gather earlier artifacts.** Open the five required earlier artifacts (Module 6 verification habit, Module 9 accountability statement, Module 10 classification table and operational safety checklist, Module 12 workflow map, Module 15 prompt pack and playbook) in one folder. For each, ask whether you can lift its structure directly into the capstone bundle or whether you need to revise it first. If any of the five needs substantial rebuilding, revise the underlying artifact before continuing — the capstone built on weak inputs is itself weak.

**4. Classify information.** Apply the Module 10 four-tier classification to every input the workflow will consume and every output the workflow will produce. Mark each input as safe, caution, restricted, or never-enter. For caution-tier inputs, name the sanitisation step. For restricted-tier or never-enter inputs, redesign the workflow to abstract or exclude them. Do not begin the workflow design until the classification is complete and clean.

**5. Select prompt pack or playbook.** Decide whether the capstone extends an existing Module 15 prompt pack (most common) or whether it needs a new pack built fresh inside the capstone (rarer, and a sign the Module 15 artifact may not have covered the task family). For the prompts the workflow depends on, ensure each entry has the Module 15 nine elements at full quality. For the playbook, ensure all eight elements are present.

**6. Run the AI-assisted workflow.** Execute the workflow on the chosen task. Sanitise inputs at Stage 1. Run the prompts at the AI-assisted stages. Save every AI output as a working artifact, not only the final output. The rubric grades the workflow, not only the final output. If a prompt produces an output you have to substantially rewrite, that is a signal the prompt needs revision — note it in the version log and revise the prompt before running the next instance.

**7. Review and verify.** Apply the review criteria from the prompt pack to every AI output. Apply the Module 6 verification habit to every checkable claim in the final output. Build the verification log as you go, not at the end. *I checked the figures* is not verification; *I checked the 14% figure against the KNBS 2024 release; the figure is in the report; the page reference is on page 27* is. If a claim cannot be traced, either find a source you can trace it to, or remove the claim, or label it honestly as uncertain.

**8. Revise.** Act on what review and verification surfaced. Edit the drafts. Re-run the prompts where edits would not be enough. Update the prompt pack with version notes if a recurring issue points to a prompt-level revision. Build the revision log as you revise — a log written after the fact is rarely accurate.

**9. Complete self-critique or peer/facilitator critique.** Run the eight-step self-critique fallback from Part A: 24-hour pause, named-reader test, claim-trace test, privacy review, usefulness test, prompt review, revision log, final confidence note. If a peer or facilitator review is available in your deployment, take it; the self-critique fallback is the substitute when peer review is unavailable, designed to do the same work against the same rubric.

**10. Write the final reflection.** One page. Use the structured template in the next section. Resist the temptation to write a self-congratulation note — the reflection that calibrates honestly is more valuable to a reviewer (and to your future self) than the reflection that says everything was strong.

**11. Package the portfolio.** Assemble the eleven required components into the bundle. Use the filename pattern. Add the disclosure statement. Add the context note that introduces the bundle to a reader who is not in the room. Save in the format that fits your audience (PDF, Notion, Google Drive, GitHub, personal site, printed packet). Run the final submission checklist (next section but one) before submitting.

A learner who runs the eleven steps in order, with the planning canvas honest and the five required earlier artifacts in hand, finishes the capstone in the twelve-to-eighteen-hour budget. A learner who skips the planning canvas, or who tries to design prompts before classifying inputs, or who attempts the self-critique without the 24-hour pause, will exceed the budget — and the rubric will catch the parts that were rushed.

## Final reflection prompt

The reflection is one page, maximum. The structure below is a template, not a form to complete mechanically. Each prompt is short on purpose; the discipline is in deciding what is worth saying, not in volume. Use the prompts as starting points; write in your own voice; keep the answers honest.

**1. What I used AI for.** Name what AI did in this capstone, in plain language. Not *AI helped with the workflow* — *AI drafted the first version of three customer replies from sanitised inputs, suggested two alternative phrasings for the apology line, and produced a four-section playbook outline that I then revised against the Module 12 SOP discipline.* The boundary between what AI did and what you did should be visible to a reader who was not in the room.

**2. What I did myself.** Name what you did. Not *I reviewed the work* — *I designed the workflow, classified the inputs against the Module 10 tiers, wrote the boundary list, sanitised every input before pasting, applied the seven-item review checklist to every AI output, verified each delivery commitment against my production tracker, edited the open-ended phrasing in Output 1, ran the eight-step self-critique fallback, and wrote the disclosure statement.* This list is what makes you the human responsible for the bundle; the disclosure standard depends on it being accurate.

**3. What I verified.** Name the checkable claims in the final output and the source each was traced to. If anything was not traceable, name it as uncertain. The verification reflection is also a check on your own habit: a learner who cannot list what they verified is a learner whose verification was thinner than the bundle implied.

**4. What I changed.** Name the changes you made between the AI's first drafts and the final outputs. Not *I edited the drafts* — *I removed the phrase "figure something out together" from Output 1 because it drifted toward an open-ended commitment; I removed the phrase "paper-stock delay on our end" because it named operational detail the boundary list excludes; I tightened the closing line of the disclosure after the named-reader test surfaced that it overstated AI involvement.* The change list is also the revision log, in narrative form.

**5. What I refused to automate.** Name the parts of the workflow you deliberately kept human. *I kept the Stage 4 verification step human-only because the production tracker is updated by me and the verification belongs to the same person who keeps the tracker honest. I kept the angry-customer reply path entirely human-only because the workflow does not handle distress well and the empathy that case requires is not what AI assistance is for.* The refusal list is part of the AI-judgment you are demonstrating.

**6. What privacy and safety boundaries I followed.** Name the Module 10 boundaries that bound the capstone in practice. *No M-Pesa transaction codes pasted into prompts. No full customer names — first name only. No phone numbers. No supplier or equipment names in the AI outputs. No real customer names in the bundle submitted for the certificate. No restricted-tier inputs entered the workflow at any stage.* The boundary list is the safety section's narrative version.

**7. What I would improve next time.** Name two or three things, specifically. Not *I would do it better* — *I would test the playbook's escalation routes on a real escalation case (an angry customer, a refund request, a dispatched-and-lost order) before treating the playbook as fully reusable; I would build the verification log as I worked rather than at the end of the capstone week; I would write the disclosure statement before the named-reader test, not after, so the calibration happens earlier.* The improvement list is what makes the reflection a working document for your next capstone-shaped task in real work.

**8. What this artifact shows about my AI judgment.** One or two sentences. Not *it shows I used AI well* — *it shows that I can run an AI-supported workflow on a task I actually do, with the safety, verification, and disclosure disciplines visible inside the work rather than added at the end; it also shows that I know which parts of the work are not for AI to do, and that the certainty I have about that is itself part of what I am demonstrating.* This sentence is the one a reviewer remembers; it is also the sentence the certificate stands on.

A reflection that follows the eight prompts above honestly is roughly 350 to 500 words — one page in most layouts. A reflection that runs longer is usually padding; a reflection that runs much shorter is usually skipping. Aim for the eight items, written tightly, with one concrete example per item. The honesty matters more than the length.

## Final submission checklist

Run this checklist before submitting the capstone bundle. Each item is binary — either present or not. A capstone with one or more missing items is not yet ready for submission; complete the missing item before submitting rather than submitting and waiting for the bundle to be returned.

- **Planning canvas.** All fifteen fields filled in. Each field specific enough that a reviewer could grade the bundle against it. The canvas is the first document in the bundle.

- **Workflow map.** Stages named, owners assigned per stage, AI-assist decisions explicit, review checkpoints in place, halt and escalation conditions named.

- **Prompt pack or playbook.** All nine elements per prompt entry. All eight elements per playbook entry. Version notes present. Boundaries named. Review criteria checkable.

- **AI outputs.** The actual outputs the workflow produced, saved as evidence. Not only the final outputs — the intermediate drafts as well, because the rubric grades the workflow, not only the final output.

- **Review notes.** The review checklist applied to every AI output, with results recorded. The verification log for every checkable claim in the final output, with sources traceable. Source-quality notes where relevant.

- **Safety boundaries.** The Module 10 classification of inputs and outputs documented. Sanitisation steps named. Restricted-tier and never-enter-tier inputs excluded or abstracted. The bundle as a whole free of identifying information about real people without consent.

- **Revision log.** What changed between first draft and final output, why, and which review or critique surfaced it. Three or four entries is a normal range; zero entries usually means the self-critique did not happen.

- **Final deliverable.** The thing the workflow is for. The customer reply, the recap, the synthesis brief, the SOP — whatever the task produces. *Final* means after revision, not the first AI draft.

- **Self-critique or peer critique.** Either the eight-step self-critique fallback (full results recorded) or a peer/facilitator review (where available). The named-reader test, the claim-trace, the privacy review, the usefulness test, the prompt review, the revision log, and the confidence note are visible in the bundle.

- **Reflection.** One page. The eight prompts from the structured template addressed honestly. Concrete examples per prompt.

- **Disclosure statement.** Adapted from the Module 9 accountability statement, aligned with Course1_Disclosure_Note.md. Names the tool, the task, the review, the changes, and the responsibility.

- **Portfolio folder naming.** Files named per the convention: `Module16_AI_Workflow_Capstone_[YourName].(pdf|docx)` for the assembled document; component files inside a `16_Capstone/` folder following the structure in Course1_Portfolio_Guide.md.

If every item is checked, the bundle is ready. If any item is missing, complete it before submitting. The certificate-readiness rule from Part A — every rubric criterion at Ready or higher, at least four at Strong, no high-risk privacy failure, no unsupported claim presented as evidence, disclosure included, self-critique completed — is the rule the bundle is graded against. The submission checklist is what makes sure no required component is missing on the day of submission.

## Portfolio artifact

**Artifact name.** End-to-End AI-Supported Workflow Portfolio.

**Required filename.** `Module16_AI_Workflow_Capstone_[YourName].pdf` or `Module16_AI_Workflow_Capstone_[YourName].docx`. The component files inside a `16_Capstone/` sub-folder follow the structure in Course1_Portfolio_Guide.md.

**Required contents (in this order).**

1. *Bundle introduction.* One short paragraph naming the learner, the pathway, the task title, and the purpose of the bundle. Written for a reader who has not seen the rest of the course.

2. *Planning canvas.* All fifteen fields from Part A's canvas, completed.

3. *Workflow map.* Stages, owners, AI-assist decisions, review checkpoints, halt and escalation conditions.

4. *Prompt pack and playbook.* The full prompt entries (Module 15 nine-element structure) for the prompts the workflow runs, plus the full playbook (Module 15 eight-element structure) the prompts sit inside. Version notes included.

5. *AI-assisted outputs.* The actual outputs the workflow produced. Drafts and final versions both included.

6. *Review and verification notes.* The review checklist applied to every AI output. The verification log for every checkable claim in the final output. Source-quality notes where relevant.

7. *Safety and privacy boundaries.* The Module 10 classification, the sanitisation steps, the excluded categories, the operational safety checklist applied stage by stage.

8. *Revision notes.* The log of what changed between first AI draft and final output, why, and which review or critique surfaced it.

9. *Final deliverable.* The thing the workflow is for, in its post-revision form.

10. *Self-critique notes.* The eight-step self-critique fallback (or peer/facilitator review) results.

11. *Final reflection.* One page, structured against the eight prompts in the template above.

12. *Disclosure statement.* Adapted from the Module 9 accountability statement, aligned with Course1_Disclosure_Note.md.

**Self-check acceptance criterion.** Run the rubric (seven criteria) against the bundle as a whole. The bundle meets the acceptance criterion when every criterion is at Ready or Strong, at least four are at Strong, no criterion is at Developing or Not ready, no high-risk privacy failure is present, no unsupported claim is presented as evidence, the disclosure is included, and the self-critique has surfaced and corrected at least one issue (or honestly flagged it in the confidence note).

**Pathway connection.** This artifact is the strongest single proof point in the Course 1 portfolio for every Jifunze pathway. *Digital Work Starter*: an end-to-end workflow a learner can show as evidence they can apply AI safely in workplace tasks. *AI Productivity Professional*: a working asset that integrates prompt design, workflow discipline, verification, and reusability in one bundle. *Remote Work and Freelancing*: a capstone a freelancer can adapt and present to a first client as part of *how I work*. *Small Business and Entrepreneurship*: an operations or customer-communication workflow a small-business owner can run on the next instance of the task without rebuilding. *Junior Tech Builder*: a demonstration of disciplined AI integration in a non-coding context, which is the responsible-use foundation a builder needs before integrating AI into a product.

## Module completion evidence

The learner has completed Module 16 meaningfully when:

- The capstone task satisfies all seven selection criteria from Part A and is described in one sentence that names the audience, the input, and the output.

- The planning canvas has all fifteen fields filled in at the level of specificity that lets a reviewer grade the bundle against it.

- The workflow map has stages, owners per stage, AI-assist decisions, review checkpoints, halt and escalation conditions named explicitly.

- The prompt pack and playbook have the Module 15 nine-element and eight-element structures at full quality, with version notes.

- The AI-assisted outputs are saved as evidence, not only described.

- Every checkable claim in the final output is traced in the verification log to a verified source, or honestly flagged as uncertain with the reason named.

- The Module 10 safety classification is documented and applied stage by stage; caution-tier inputs are sanitised; restricted-tier and never-enter-tier inputs are excluded or abstracted; the bundle as a whole is free of identifying information about real people without consent.

- A revision log records what changed between first draft and final output, why, and which review or critique surfaced it.

- The self-critique fallback's eight steps (or a peer/facilitator review) are completed, with the results recorded in the bundle.

- The one-page reflection addresses the eight prompts from the template, with concrete examples.

- The disclosure statement is present and substantively follows Course1_Disclosure_Note.md.

- The rubric scoring (self-graded) places every criterion at Ready or higher, with at least four at Strong, no Developing, no Not ready.

- The bundle is saved with the required filename pattern and assembled in the format that fits the learner's audience.

- The certificate-readiness conditions from Part A are all true at the time of submission.

A capstone bundle that meets every item above is the centrepiece of the Jifunze portfolio and the final piece of evidence the certificate stands on.

## Revision guidance

If your capstone bundle does not yet meet the standard, the guidance below maps the most common failure modes onto specific revisions. Take the failure mode that fits your bundle, run the revision, and resubmit. There is no attempt cap on capstone resubmission; revision is part of completion, not a separate stage.

**If the capstone task is too broad** — the audience is *users* or *customers* without further description, the success criteria are absent or written as adjectives, the workflow tries to do several tasks at once, the time budget cannot fit the scope — return to *Choosing your capstone task* in Part A and to the *Capstone planning canvas*. Cut the scope. Cut the audience from a category to one specific person or group. Cut the input from *all my notes* to one document. Cut the output from *a full report* to one section. The most common scope-fix is also the most painful: the task that seemed exciting becomes the task that fits the rubric only after it is made smaller. Make it smaller anyway.

**If the workflow is unclear** — the stages are described in a paragraph rather than mapped, the AI's role and the human role are blurred, the review checkpoints are not named, a colleague reading the workflow would have to ask you a clarifying question — return to Module 12's workflow-map discipline and to *Workflow design* in Part A. Map the stages explicitly. Name the owner per stage. Name the AI-assist decision for each AI-touched stage. Name the review checkpoint for each human-review stage. Name the halt or escalation condition for each stage where one applies. The workflow map should be readable by a colleague who was not in the room.

**If the prompts are not tied to the task** — the prompts are generic prompts the learner already had and were dropped into the bundle, the prompts do not reference the workflow's inputs and outputs, the prompts have no boundaries specific to this task's failure modes, the review criteria are vague — return to Module 4's structured prompt design, Module 15's nine-element pack structure, and the *Prompt pack* component in Part A. Rewrite the prompts so their inputs match the workflow's inputs, their boundaries match the workflow's boundary list, their review criteria match the workflow's success criteria, and their version notes record the work the prompts did inside this capstone specifically.

**If verification is weak** — claims in the final output are not traced, the verification log is sparse or generic, *I checked the figures* appears as a description without the per-claim trace, the source-quality notes are missing where the workflow consumed sources — return to Module 6's verification habit and to the *Verification and review* rubric criterion. Build a per-claim verification table. Trace every checkable claim to a source the reader could check. Where a claim cannot be traced, either find a source, remove the claim, or label it honestly as uncertain. The bundle should not contain any claim presented as evidence that is not in the verification log.

**If privacy boundaries are missing** — the Module 10 classification is not documented, sanitisation steps are not named, real customer or client or student or patient details appear in the prompts or outputs or supporting evidence, the bundle contains identifying information that has not been abstracted — return to Module 10's classification table and operational safety checklist and to the *Safety and privacy* rubric criterion. Classify every input. Sanitise caution-tier inputs. Exclude restricted-tier and never-enter-tier inputs entirely or replace with abstracted or synthetic stand-ins. Confirm the bundle as a whole — including supporting evidence and screenshots — is free of identifying information. A capstone with even one privacy failure does not pass; the rubric grades the bundle as a whole.

**If the final output is not useful** — the output reads as a demonstration of AI use rather than as something a real reader would act on, the intended audience would not accept the output as a satisfactory response, the output requires significant rewriting before it could actually be used — return to *Usefulness of final output* in the rubric and to the planning canvas's *Final deliverable* field. Read the output as the intended audience would. If it does not do the job, either revise the output until it does or revise the workflow to produce a different output that does. The rubric does not credit fluent output that fails the usefulness test.

**If the reflection is shallow** — the reflection is descriptive rather than reflective (*I built a workflow and ran it*), the prompts are not addressed individually, the eight items from the template are not visible, the reflection is self-congratulatory rather than calibrated — return to the *Final reflection prompt* template above. Address each of the eight prompts with a concrete example. The reflection should name something you got wrong and corrected, not only something you got right. A confidence note that says everything is strong is harder to trust than a confidence note that names two real weaknesses and what they would take to fix.

**If the disclosure is missing or weak** — the disclosure is absent, or reads as boilerplate (*AI was used in the production of this work*), or overstates AI involvement, or minimises AI involvement, or off-loads responsibility to the AI — return to Course1_Disclosure_Note.md and to the *Disclosure statement* component in Part A. Adapt your Module 9 accountability statement. Name the tool, the task, the review, the changes, and what you remain responsible for. Be accurate in both directions: do not understate AI involvement, do not overstate it. The disclosure protects the reader, protects you, and protects the people downstream who will rely on the work.

**If the work does not reuse earlier artifacts** — the prompts are written fresh inside the capstone rather than extending the Module 15 pack, the workflow map is built fresh rather than extending Module 12, the safety classification is reconstructed rather than extending Module 10, the disclosure is written fresh rather than adapting Module 9 — return to the *Reusing earlier artifacts* section in Part A and to the table of which artifact feeds which capstone component. The capstone is not a from-scratch exercise; it is the integration test of Course 1. A capstone that does not visibly reuse the earlier work has either not done the earlier work well or is hiding the earlier work; in both cases, the rubric grades lower than the bundle could otherwise score.

The most common pattern across these failure modes: the capstone is rushed, the planning canvas was skipped or kept superficial, and the workflow design started before the framing was settled. The fix in those cases is to return to the canvas, fill it in honestly, and let the rest of the capstone follow from there. A capstone built on a strong canvas is rarely returned for substantive revision; a capstone built on a weak canvas almost always is.

## Course completion transition

Course 1 — AI Essentials is now complete.

You have worked through sixteen modules: a clear mental model of what AI is and what it is not; the discipline of correcting myths and applying responsible judgment; prompts as a control surface; structured prompt engineering with constraints, output design, iteration, and comparison; evidence, verification, and source-aware AI use; AI for writing, communication, and audience fit; AI for learning, study, and understanding without bypassing the learning; responsible use, accountability, privacy, and operational safety; AI for research and synthesis; AI for workflows, automation, and agents; AI for decision support and critical thinking; AI in teams and organisations; reusable AI systems built as prompt packs and playbooks; and the end-to-end capstone where the parts were tested together on one realistic piece of work.

You have built practical AI fluency. You can write prompts that produce reviewable output, verify claims against sources you can check, classify information by sensitivity and protect what matters, design workflows that put humans where judgment belongs, package what works into reusable assets that another person could pick up, and disclose your AI use plainly when it matters. You have done this in your own context, on tasks you actually do or could plausibly do, with evidence saved as you went. The portfolio you finish Course 1 with — sixteen module artifacts plus the capstone bundle — is portfolio-ready proof of that fluency.

The certificate, when issued, marks the moment the foundation becomes visible in finished work. It records that you completed the practice. It does not promise outcomes the practice does not produce.

Where you go next depends on the pathway you have been working toward. *Digital Work Starter* learners build on this foundation in pathway courses focused on workplace-credible AI-assisted communication, operations, and reporting. *AI Productivity Professional* learners deepen prompt-pack and playbook design, agent-aware workflow discipline, and reusable systems at greater scale. *Remote Work and Freelancing* learners extend client-ready intake-to-delivery workflows, disclosure practice for client-facing work, and the kind of safety discipline that lets a freelancer be trusted with client material. *Small Business and Entrepreneurship* learners apply the foundation to operations, customer communication, supplier handling, and decision support at the small-business scale. *Junior Tech Builder* learners pair this responsible-use foundation with the technical pathways that integrate AI into products and services.

Whichever pathway you choose next, the habits Course 1 trained — clear instruction, verification, judgment, privacy discipline, accountability, disclosure, version-noting, reusability — transfer. The tools will change. The thinking does not. Save your portfolio carefully, keep extending the prompt pack and the playbook on tasks you actually do, and treat the capstone as the first of many integration tests rather than the last.

You have done the work. The work is the certificate.

## Notes for Cursor mapping

- **Suggested module id.** `ae-m16`.

- **Suggested session/block breakdown.** Module 16 is large enough to map across multiple platform sessions rather than a single session. Recommended split:

  - *Session 1 — Capstone planning (covers Part A: continuity bridge, what was preserved/improved, estimated time, module purpose, learner outcomes, capstone overview, choosing your capstone task, capstone planning canvas, reusing earlier artifacts).* This is the *plan-and-frame* session. The session ends with a saved planning canvas and a confirmed task.
  - *Session 2 — Self-critique, rubric, certificate readiness (covers Part A: self-critique fallback, capstone rubric, certificate-readiness connection, pause and check).* This is the *standards-and-self-grading* session. The session ends with the learner having read the rubric against their planning canvas and a confirmed go-decision for capstone work.
  - *Session 3 — Worked example (covers Part B: fully worked capstone example, optional second mini-example).* This is the *see-it-done* session. The session ends with the learner having read at least one full worked capstone end-to-end.
  - *Session 4 — Capstone work sequence (covers Part B: capstone work sequence).* This is the *do-the-capstone* session, spread across the learner's actual two-to-four-day capstone window. Inside the session, sub-blocks for each of the eleven steps. The 24-hour pause inside Step 9 is part of the session timing, not extra to it.
  - *Session 5 — Final reflection, submission, completion (covers Part B: final reflection prompt, final submission checklist, portfolio artifact, module completion evidence, revision guidance, course completion transition).* This is the *finish-and-submit* session.

- **Likely content block types.**

  - Long-form prose for the planning canvas, the rubric, the self-critique fallback, and the worked-example narrative sections.
  - Boxed prompt-pack and playbook blocks (distinct visual treatment) for the worked example's prompt pack section and for the optional second mini-example.
  - Inline prompt blocks (boxed code-like styling) for the prompt text in the worked example.
  - Side-by-side comparison block for the *first AI draft* / *final reply* outputs in section 4 of the worked example, so the revision becomes visually traceable.
  - Verification-log table block for the worked example's verification log and for the rubric scoring commentary.
  - A pinned reference card showing the eleven required capstone components, the seven rubric criteria, and the eight self-critique fallback steps. This card should be accessible from any session and any block in Module 16.
  - A *capstone planning canvas* template (the fifteen fields) accessible from Session 1 and reusable from Sessions 2, 3, 4, 5 so the learner does not retype the structure.
  - A *self-critique fallback* template (the eight steps) accessible from Session 4's Step 9 sub-block.
  - A *final reflection* template (the eight prompts) accessible from Session 5.
  - A *submission checklist* template (the twelve items) accessible from Session 5 as a soft-blocking pre-submission step.

- **Rubric mapping notes.** Module 16 replaces the standard *checkpoint* block with a *capstone rubric* block. The rubric block displays each of the seven criteria (problem framing, prompt and workflow design, verification and review, safety and privacy, usefulness of final output, reusability and transfer, reflection and improvement) with the four-level evidence ladder (Not ready, Developing, Ready, Strong) and the level descriptions from Part A. The learner self-scores against the rubric (with the self-critique guide rendered alongside). In deployments with peer or facilitator review, the reviewer scores against the same rubric. The platform stores the rubric scores per criterion. The certificate-readiness logic checks: every criterion at Ready or higher, at least four at Strong, no high-risk privacy failure, no unsupported claim presented as evidence, disclosure included, self-critique completed.

- **Artifact upload notes.** Upload format: `.pdf` or `.docx` for the assembled bundle; the component sub-folder follows the structure in Course1_Portfolio_Guide.md. Filename pattern: `Module16_AI_Workflow_Capstone_[YourName].(pdf|docx)`. The platform's artifact-upload block presents the eleven required components as a checklist the learner ticks against the uploaded document. The submission checklist (the twelve items above) is presented as a separate review checklist before final submission, with each item ticked individually so the learner has surfaced any missing component before uploading. A *certificate-trigger* note appears on the upload confirmation, telling the learner that the capstone bundle plus the previously satisfied certificate-readiness conditions will trigger certificate issue automatically.

- **Certificate-readiness trigger notes.** Certificate issue is conditional on all eight readiness conditions from Part A being true at the same time: (1) all sixteen module quizzes passed with at least 6 of 8 correct each; (2) all required portfolio artifacts completed and accepted; (3) capstone completed (eleven components, rubric at Ready or higher on every criterion with at least four at Strong); (4) disclosure included; (5) self-critique or peer/facilitator critique completed; (6) revision completed where rubric or critique surfaced a gap; (7) no high-risk privacy failure; (8) no unsupported claim presented as evidence. The platform should expose a *certificate-readiness dashboard* surface on the learner's profile during Module 16, showing each condition as met or not yet met with a link to the underlying evidence. The certificate is issued automatically when all eight are met simultaneously; there is no waiver path and there is no time limit.

- **Special UI needs.**

  - A *task selection wizard* at the start of Session 1 that walks the learner through the seven selection criteria one at a time, with the candidate task captured at the end. The wizard should reject a candidate task that fails any criterion and prompt the learner to refine the task or pick a different one.
  - A *required-artifact gather* step in Session 1 that surfaces the five required earlier artifacts (Module 6, 9, 10, 12, 15) from the learner's portfolio and confirms each is at full quality. If any is weak, the platform routes the learner back to that module before continuing the capstone.
  - A *24-hour pause timer* inside Session 4's Step 9 sub-block that prevents the learner from advancing to the active self-critique steps for at least 24 hours after they mark the workflow finished. The timer is soft-blocking — the learner can override with a deliberate confirmation — but the default is enforced.
  - A *named-reader test* prompt inside Session 4's Step 9 sub-block that asks the learner to name one specific real person and write down what that person would say if they reviewed the bundle.
  - A *claim-trace* surface inside Session 5's submission checklist that lists every checkable claim the learner has identified in the final output and asks for a source or an uncertainty label per claim.
  - A *pathway-aware bundle preview* on the upload confirmation that surfaces which artifacts the learner's chosen pathway most directly cares about, so the bundle's narrative emphasis is calibrated to the audience that will read it next.

- **How Part A and Part B should be combined into Jifunze_Course1_Module_16_Improved.md.** Part A and Part B are written as a single module split across two files for length. The combined module is mapped as one Improved file with the following assembly rules:

  - The combined file is named `Jifunze_Course1_Module_16_Improved.md`.
  - Part A's content is placed first, in full, including the trailing transition paragraph (*"This is Part A of Module 16. Part B continues with..."*). That trailing paragraph is removed during the merge — it is a within-document handoff that is no longer needed when the document is single.
  - Part B's content is placed second, in full, starting with the first content section (*Fully worked capstone example*) and continuing through the Cursor-mapping notes. Part B's opening italic note (*"Part B continues directly from Part A..."*) is removed during the merge.
  - The section ordering in the combined file is therefore: continuity bridge from Module 15, what was preserved, what was improved, estimated time, module purpose, learner outcomes, capstone overview, choosing your capstone task, capstone planning canvas, reusing earlier artifacts, self-critique fallback, capstone rubric, certificate-readiness connection, pause and check, fully worked capstone example, optional second mini-example, capstone work sequence, final reflection prompt, final submission checklist, portfolio artifact, module completion evidence, revision guidance, course completion transition, notes for Cursor mapping.
  - The combined file is the canonical source for Module 16 and is the input both to the platform mapping and to any later course revision. The Part A and Part B files remain in the working folder as the authoring trail and are not platform-mapped directly.
  - The combined file's Cursor-mapping notes section (the one you are reading now, in Part B) is the operative mapping note. Part A does not have a separate mapping note; the mapping for the whole module lives at the end of the combined file.
  - File size after merge is large but not unusual for a capstone module; if the platform has a per-module file-size threshold that the merged file exceeds, the platform should split it across the five sessions named in the *Suggested session/block breakdown* above rather than splitting the source file.
