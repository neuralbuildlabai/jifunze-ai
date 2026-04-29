# Module 4: Prompt Engineering — Structure, Constraints, and Output Design

## What was preserved
The original module's framing of prompting as something deliberate — engineered, not improvised — is kept. The idea that a good prompt assigns a role, sets a task, supplies context, names constraints, specifies the shape of the output, and tells the AI what to flag for human review is preserved as the core teaching frame. The four worked-example concept titles from the original — study aid redesign, customer communication about a price change, review-ready feedback from performance notes, and the cluttered-to-clean rewrite — are kept because each one isolates a different failure mode that learners hit once they move past basic prompting and start designing prompts they will reuse.

## What was improved
The five short teaching paragraphs in the original are replaced with a six-element model — R-T-C-C-O-R, for Role, Task, Context, Constraints, Output format, and Review cue — and each element is given a one-paragraph definition with an inline weak-versus-strong mini-example. The relationship to Module 3's T-C-C-F-A model is taught directly rather than implied: where Module 3 treated the prompt as a control surface, Module 4 treats it as something you engineer, version, and stress-test. Output design is taught as a skill in its own right, with named patterns for tables, checklists, summaries, briefs, and step-by-step outputs. The worked examples now include the actual prompt, the AI output, an analysis of what sounds correct and what is wrong, the engineered version, and the new output. Practice activities supply the items learners need — three weak prompts for the engineering makeover, one source document for the output design lab, five tasks for the constraint selection drill, and clear instructions for creating three reusable prompt patterns. Boilerplate, facilitator-only language, and motivational filler are removed.

## Estimated time
Two and a half to three hours of focused work. The module is heavier than Module 3 because output design takes practice — most learners run each of their engineered prompts at least twice before the output looks the way it should. A learner who completed Module 3 seriously and built a real Before/After Prompt Rewrite artifact will move faster here, because the Module 3 final selected prompt becomes the starting point for the engineering work in this module.

## Module purpose
By Module 3, you can write a prompt that is specific enough to produce a usable output. That is the floor. Most real work — at a job, in a small business, in study, in a community organisation — needs more than a usable one-off output. It needs prompts you can trust to produce the same shape of result every time, prompts that another person on your team could read and run, prompts that flag their own gaps instead of quietly making things up. That is what prompt *engineering* means: treating the prompt as a small piece of working software you design once and reuse, rather than something you retype from scratch each time. This module teaches the engineering layer on top of the Module 3 control surface — adding a role line, an explicit output design, and a review cue that tells the AI what to escalate. These three additions do most of the work that separates an amateur prompt from a professional one.

## Learner outcomes
By the end of this module, you should be able to:

- Explain in plain language how Module 4's R-T-C-C-O-R model extends Module 3's T-C-C-F-A model, and name the two elements that are genuinely new.
- Apply R-T-C-C-O-R to engineer a prompt for a real task you do, with each element explicitly present and labelled.
- Choose an output design — table, checklist, summary, brief, or step-by-step — that matches the next thing you will do with the output, and defend the choice in one sentence.
- Write a Review cue that tells the AI what to flag, what to refuse, and what to leave to a human, instead of producing confident filler.
- Diagnose a cluttered prompt by naming the contradictory or redundant clauses, and rewrite it without losing the useful content.
- Produce three reusable prompt patterns drawn from tasks you actually do, and name the slots in each pattern that change every run versus the slots that stay stable.

## Core lesson

A prompt that controls the AI is the floor. A prompt you can hand to a colleague, run again next week, and trust to flag its own weaknesses is the ceiling. To get from one to the other, you have to think about prompts the way an engineer thinks about a small reusable function: it has inputs, it has a job, it has rules, it produces a known shape of output, and it tells you when it cannot do its job safely. The R-T-C-C-O-R model is the short version of that engineering frame. The six elements are Role, Task, Context, Constraints, Output format, and Review cue. Three of them — Task, Context, Constraints — carry forward from Module 3 with very little change. One of them — Output format — replaces and deepens what Module 3 called Format. Two of them — Role and Review cue — are new in this module, and they are where most of the leverage lives.

A note on how Audience moved. In Module 3 you treated Audience as its own element, separate from Context. In real engineered prompts, Audience almost always sits inside Context — *who you are writing to, what they already know, what relationship you have with them* — so this module folds it into Context to keep the model clean. You are not losing the idea; you are using it more naturally.

### Role
Role tells the AI who it should be while it works on your task. It is a single sentence at the top of the prompt that frames perspective, depth of knowledge, and tone in advance. The reason Role matters is that the AI's default voice is mid-formal, mid-Western, mid-confident generalist. That voice is wrong for almost every real job. A Role line replaces the default with someone whose perspective fits the work — *an experienced primary-school teacher in Kenya*, *a senior payroll accountant who has handled disputes with KRA before*, *a careful HR business partner who writes evidence-based feedback*, *a customer-care lead at a small printing business*. The shift is not cosmetic. The AI uses the Role to choose vocabulary, decide how much to assume the reader knows, and pick which trade-offs to surface.

Compare *write feedback for a junior staff member* with *you are an experienced HR business partner who writes evidence-based feedback and never invents specifics. Write feedback for a junior staff member.* The first prompt produces generic, polished feedback that sounds plausible but pulls examples from nowhere. The second prompt produces shorter, more careful feedback with hedged phrasing on anything not in the supplied evidence. The Role line did not make the AI more honest by accident — it set the perspective from which the rest of the prompt is interpreted.

A useful Role line names the function (HR business partner, payroll accountant, study coach, customer-care lead) and one quality that matters for the task (*evidence-based*, *plain-English*, *deadline-driven*, *cautious about over-promising*). Vague Role lines like *be a helpful expert* do nothing; the AI was already going to attempt that. The test is the same as for constraints: if you can predict what the output will *not* sound like once the Role is in place, the Role is doing real work.

### Task
Task carries forward from Module 3 with the same definition: it is the verb that names what the AI must produce. *Draft*, *summarize*, *rewrite*, *compare*, *classify*, *brainstorm*, *redraft*. In an engineered prompt, the Task line sits directly under the Role line and reads as a clean instruction — *Draft a single email reminding undergraduate students that the assignment is now five days late.* If the Task is missing or hidden inside three clauses of context, the AI guesses, and the rest of the prompt cannot rescue the guess.

The most common engineering-stage failure is silently turning a Task into a topic. *Help me think about feedback* is a topic. *Draft a 250-word feedback note for one named team member, drawn only from the evidence below* is a Task. If you cannot read your prompt and answer *yes* or *no* to the question *did the AI do that?*, the verb is too broad. The same self-test from Module 3 applies, and it applies harder here, because engineered prompts get reused — a vague Task copies a vague output forward every time the prompt is run.

### Context
Context is the background the AI needs in order to produce something that fits your situation: who you are, who the output is for, what already happened, what the recipient already knows, and what constraints come from your environment such as language, channel, country, or industry. Module 3 taught Context as one of five elements; in this module Context also absorbs Audience, because in real engineered prompts the reader is part of the situation, not a separate slot.

Context that earns its place changes what the AI produces. *A customer asking about a delay* produces a generic apology. *A recurring corporate-gift customer who paid in full last week and is asking on WhatsApp why Friday delivery did not happen* produces a specific reply for that customer, that channel, and that delay. The test from Module 3 still holds: if the AI's draft would shift when you add a piece of context, it belonged in the prompt; if not, it is noise and you should cut it. The cut-it discipline matters more in engineered prompts because reusable prompts collect context the way old documents collect comments — by the third revision, half of it is no longer doing work.

### Constraints
Constraints are the rules the output must respect. They are the *do this, do not do that* layer of the prompt — length, tone, banned phrases, content boundaries, language register. Module 3 covered Constraints in depth and that material carries forward unchanged. The new point in Module 4 is that Constraints and Output format are now separate concerns, even though they overlap. Constraints describe *rules of behaviour* (under 120 words, no admission of legal fault, no exclamation marks, plain Kenyan English). Output format describes *the shape of the artifact itself* (a table with three columns, a checklist of seven items, a one-paragraph summary plus a three-bullet headline). Splitting them keeps the prompt readable when both are present.

A small but useful test for engineered Constraints: state at least one in the negative form. *Do not promise a refund. Do not use "Dear Valued Customer." Do not invent specifics not in the supplied evidence.* Negative constraints are uncomfortable to write because they sound rude, but they are the most reliable way to stop the AI from drifting into its defaults. A prompt that has only positive constraints — *be warm, be clear, be professional* — is a prompt the AI will interpret as decoration. A prompt with two negative constraints next to two positive ones tends to behave.

### Output format
Output format is where engineered prompts pull most clearly ahead of Module 3-level prompts. In Module 3 you asked for a shape — a paragraph, a list, a table — and the AI obliged. In Module 4 you *design* the output: you decide the columns of the table, the order of the steps in the step-by-step, the headings of the brief, the priority order of the checklist, the length of the summary in words rather than in sentences. The output design is part of the prompt because it is part of the work; the shape of the output decides how usable it is for the next task you will do.

Compare *summarize this report* with *Output format: a one-page brief in this exact structure — (1) headline finding in one sentence, (2) three supporting points in one short paragraph each, (3) two open questions worth raising in the meeting, (4) one recommended next step. Total length under 350 words.* The first produces a fluent four-paragraph summary the learner has to reshape before they can use it. The second produces a brief that is already in meeting-ready shape. The content overlap is high; the *usefulness* gap is large. Designing the output up front — rather than reshaping after — is the single fastest way to cut the time you spend editing AI work.

### Review cue
Review cue is the second new element in this module and it is where engineered prompts become safe to reuse. A Review cue tells the AI what to flag, what to refuse, and what to leave to a human. It is the line that prevents the most expensive AI failure — confident output that looks correct but contains invented specifics, missing evidence, or claims the AI was not in a position to make. A typical Review cue reads like *If any required information is missing from the supplied notes, mark that section as [evidence gap — to confirm] rather than filling it in. Do not invent names, numbers, dates, or quotes.* Or, *At the end of the output, list any points where you had to make an assumption, and one suggested question I should ask before sending this.*

The reason Review cue matters is that the AI will, by default, produce a smooth-sounding output even when it does not have enough to work with. The smoothness is the danger. A prompt without a Review cue trains you to trust the wrong things. A prompt with a Review cue produces shorter, more honest output and tells you exactly where to look before you send, paste, or sign anything. In any task that touches HR, legal, financial, medical, customer-facing, or compliance content — anywhere a fabricated detail would cost you — the Review cue is not optional. It is the part of the prompt that makes the rest safe to reuse.

A useful Review cue does at least one of three things: instructs the AI to flag missing evidence rather than fill it in, instructs the AI to list its assumptions at the end of the output, or instructs the AI to refuse a section it cannot complete safely and explain why. A prompt with all three cues, kept under three lines, is usually enough.

### Output design as a craft
Output format is the slot in the prompt; output design is the skill behind it. Beginners ask for a list. Engineers ask for the right list. Five output patterns cover most real work, and each one fits a different next step:

A *table* fits any task where you will compare several items along the same set of attributes — vendor options, candidates, ideas, dates. The columns are the comparison axes; the rows are the items. A useful table prompt names the columns explicitly (*columns: Item, Cost in KES, Time required, Risk level, Recommendation*) so the AI does not invent its own.

A *checklist* fits any task where you will execute the items one by one — a packing list, an onboarding sequence, a pre-meeting prep, a closing-shift routine. A useful checklist prompt names the checklist's purpose so the AI orders the items correctly (*ordered by what must happen first*) and names what counts as done (*each item starts with an action verb and ends with a clear completion signal*).

A *summary* fits any task where you will read the output once and move on — a research brief, a meeting recap, a policy explanation. A useful summary prompt names the length in words (*180–220 words*) rather than in sentences, and names the reader so the AI picks the right register.

A *brief* fits any task where you will use the output to make a decision or run a meeting — a one-pager for a manager, a recommendation memo, a pre-read. A useful brief prompt fixes the structure (headline, supporting points, open questions, recommendation) so the brief is comparable from one run to the next.

A *step-by-step* fits any task where someone will follow the output as instructions — a tutorial, a how-to, a recovery procedure, a process description. A useful step-by-step prompt names the assumed starting state of the reader, the assumed end state, and the maximum number of steps. A step-by-step that starts five steps in and ends five steps short of the goal is the single most common output design failure.

You will not always need a designed output. Some tasks genuinely call for a paragraph. The discipline is to ask, before you write the prompt, *what am I going to do with this output?*, and let the answer choose the design. If the answer is *forward it to a colleague*, design a brief. If the answer is *follow it Monday morning*, design a step-by-step. If the answer is *decide between three options*, design a table. The output design is not stylistic decoration; it is the part of the prompt that decides whether you can actually use the result without reshaping it.

### When prompt detail helps and when it clutters
A common failure mode at the engineering stage is over-prompting. The learner has just learned six elements, becomes excited, and writes a 400-word prompt for a task that needed 80. The output then comes back stiff, contradictory, or shorter than the prompt itself. Three patterns drive most of the clutter, and naming them makes them easier to avoid.

The first is contradictory tone. *Professional, friendly, casual but not too casual, formal-yet-warm* is not a tone instruction; it is a tone argument. The AI cannot satisfy all four at once and ends up averaging them into something flat. Pick one tone direction, name it once, and move on.

The second is double-specified format. *Use bullet points but also write it in paragraphs* and *short and comprehensive* are the same mistake — asking the AI for a thing and its opposite in the same line. Pick one format. If you genuinely need two shapes, separate them: *first a one-paragraph summary, then three bullets underneath.*

The third is decoration constraints. *Be helpful. Be clear. Be useful. Be thoughtful.* These instructions do not change any specific behaviour the learner could check, because the AI was already going to attempt all of them. Decoration constraints crowd the prompt and dilute the constraints that are doing real work. The Module 3 self-check still applies: if removing a constraint would not change the output, the constraint was decoration. Delete it.

The simplest test for whether your engineered prompt is the right length is to read it back and ask, for each clause, *what default behaviour is this clause preventing?* If you can answer in plain language, the clause earns its place. If you cannot, cut it. A clean R-T-C-C-O-R prompt with six well-chosen lines almost always beats a stuffed prompt with sixteen.

## Fully written worked examples

### Worked example 1: Study aid prompt redesign

**Weak prompt:** *Make me a study guide for the photosynthesis lesson.*

**AI output:**
> **Photosynthesis: Study Guide**
>
> Photosynthesis is the process by which plants make their own food. It happens in the leaves of green plants, where sunlight is absorbed by a green pigment called chlorophyll. Plants take in carbon dioxide from the air and water from the soil and use sunlight to convert these into glucose and oxygen. The glucose is used by the plant for growth and energy storage, while oxygen is released into the air. Several factors can affect how fast photosynthesis occurs, including the amount of light, the temperature, and the availability of carbon dioxide and water. This process is essential not only for plants but also for animals and humans, who depend on the oxygen released and the food produced.
>
> Important things to remember:
> - Photosynthesis happens in the leaves.
> - Plants need sunlight, water, and carbon dioxide.
> - The result is glucose and oxygen.
> - Many living things depend on this process.

**What sounds correct.** The output is fluent, factually broadly right, has a heading, and ends with a few bullet points labelled as *important things to remember*. A learner who has not seen a real study aid before would believe this is one.

**What is wrong.**
- It is a textbook paragraph followed by four generic bullets. It is not designed for revision — the learner cannot self-test from it, and the bullets do not isolate the most testable points.
- There is no Role. The AI has no perspective from which to decide what *Form Two* readers need versus what a teacher revising for an exam needs versus what a parent wants to know.
- The Output format is undesigned. *Study guide* is a category, not a shape. The AI defaulted to the shape it sees most often in training data, which is an explanatory paragraph plus a small bullet list.
- There is no Review cue, so the AI has no instruction about flagging anything it is unsure of, naming the syllabus level, or pointing out where the lesson notes were thin.

**Engineered prompt with R-T-C-C-O-R explicit:**
> **Role:** You are an experienced Kenyan secondary-school biology teacher who prepares revision aids for Form Two students sitting end-of-term exams.
>
> **Task:** Turn the lesson notes I will paste below into a revision aid the student can use to test themselves the night before an exam.
>
> **Context:** The student is in Form Two, follows the 8-4-4 biology syllabus, and learns best when concepts are anchored to short examples. They have already read the chapter once. They are revising, not learning from scratch.
>
> **Constraints:** Plain English suitable for a 14-year-old. No long paragraphs. No motivational language. Do not invent facts that are not in the lesson notes. If a key idea is missing from the notes that you would expect at this syllabus level, flag it as *[gap — confirm with teacher]* rather than filling it in.
>
> **Output format:**
> 1. *Six revision bullets* — one short sentence each, ordered from most to least testable.
> 2. *Five short-answer quiz questions* — each followed by the correct answer in one line.
> 3. *One stretch question* — slightly harder, with the answer below it, useful for a student aiming for an A.
>
> **Review cue:** At the bottom, list any points where the lesson notes were thin or where you had to make an assumption.
>
> **Lesson notes:** [paste lesson content here]

**New AI output (with the photosynthesis notes from Module 3 pasted in):**
> **Revision bullets**
> 1. Photosynthesis converts water and carbon dioxide into glucose and oxygen using light energy from the sun.
> 2. The reaction takes place mainly in the chloroplasts of leaf cells; chlorophyll absorbs the light energy.
> 3. The light reactions split water and produce ATP and NADPH; the Calvin cycle uses these to fix carbon dioxide into glucose.
> 4. The rate of photosynthesis depends on light intensity, carbon dioxide concentration, temperature, and water availability.
> 5. Oxygen is released as a by-product and is needed by most living things for respiration.
> 6. Glucose is the plant's food and energy store; some is used immediately and some is stored as starch.
>
> **Quiz**
> 1. What two raw materials are combined during photosynthesis? — Water and carbon dioxide.
> 2. Where in the leaf cell does photosynthesis mainly occur? — In the chloroplasts.
> 3. What pigment absorbs the light energy? — Chlorophyll.
> 4. Name two factors that affect the rate of photosynthesis. — Any two of: light intensity, carbon dioxide concentration, temperature, water availability.
> 5. Why is the oxygen released by plants important to other living things? — They need it for respiration.
>
> **Stretch question**
> What is the role of ATP and NADPH in the Calvin cycle? — They supply the energy and reducing power that the Calvin cycle uses to fix carbon dioxide into glucose.
>
> **Notes for the teacher**
> - The lesson notes did not mention starch storage in detail; bullet 6 is the standard syllabus expectation, but please confirm against the chapter.
> - *[gap — confirm with teacher]* The notes did not cover limiting factors as a graphed concept, which is a common Form Two exam question.

**What the learner should notice.** The Module 3 version of this prompt produced a usable revision aid by adding Format and Audience. The Module 4 version goes further: the Role line sets the perspective of an experienced syllabus-aware teacher, the engineered Output format fixes the structure (six bullets, five questions, one stretch), and the Review cue produces two flags at the bottom that tell the teacher exactly where the notes were thin. Notice that the engineered prompt is not dramatically longer than the Module 3 version — it is more *organised*. The labelled R-T-C-C-O-R structure makes it easy to reuse next term for a different topic by changing only the lesson notes and the syllabus reference.

### Worked example 2: Customer communication about a price increase

**Weak prompt:** *Write an email to my customers letting them know prices are going up.*

**AI output:**
> **Subject: Important Update Regarding Our Pricing**
>
> Dear Valued Customers,
>
> We hope this message finds you well. We are writing to inform you of an upcoming change to our pricing structure. Due to rising operational costs and our continued commitment to delivering high-quality service, we will be implementing a price adjustment effective from the beginning of next month.
>
> We understand that any change in pricing can be inconvenient, and we want to assure you that this decision was not made lightly. Your satisfaction remains our top priority, and we will continue to work tirelessly to provide you with the exceptional value and service you have come to expect from us.
>
> Should you have any questions or concerns, please do not hesitate to reach out to our customer service team. Thank you for your understanding and continued support.
>
> Warm regards,
> The Team

**What sounds correct.** It is grammatically clean, polite, and recognisably an email. A small business owner in a hurry might paste it into a draft.

**What is wrong.**
- It does not name the actual price change. The customer cannot find out from this email what their new price will be, when exactly it starts, which products are affected, or whether their existing orders are honoured at the old rate.
- The tone is corporate-American boilerplate — *Dear Valued Customers*, *we hope this message finds you well*, *exceptional value*, *commitment to quality*, *tirelessly*. None of those phrases belong in a message from a small Kenyan business to recurring customers.
- It performs apology and reassurance without giving the customer anything to act on. There is no clear next step, no contact for questions, no honest reason for the change.
- There is no Role and no Review cue, so the AI has no perspective to write from and no instruction to flag the things only the business owner knows (the actual percentages, the actual start date, the grace period, the product list).

**Engineered prompt with R-T-C-C-O-R explicit:**
> **Role:** You are a careful customer-care lead at a small Kenyan business. You write directly, do not over-promise, and never invent numbers, dates, or product details.
>
> **Task:** Draft a short message to recurring customers announcing a price change for our printing services, effective 1 June 2026.
>
> **Context:**
> - Sender: I run a small printing business in Nairobi. I will sign as "Wanjiru, Westlands Printing."
> - Customer: recurring small-business customers who order branded items (business cards, notebooks, brochures). Most prefer WhatsApp; a few prefer email.
> - Reason for the change: paper and ink costs have risen since January and the old prices no longer cover the cost of materials.
> - What I want them to know: prices on most items are going up between 8% and 12% from 1 June; orders confirmed and paid before 31 May will be honoured at the current rate; existing quotes already issued remain valid for 14 days; specific new prices will be on the updated price list, which I will send as a separate attachment.
> - What I do not want them to feel: ambushed, talked down to, or talked at like a corporate mailing list.
>
> **Constraints:** Under 140 words. Plain Kenyan English. No "Dear Valued Customer." No "exceptional value." No "tirelessly." Do not promise the price will not change again. Do not invent specific percentages — write *between 8% and 12%* exactly as supplied. Acknowledge the change directly without apologising five times.
>
> **Output format:** Two versions side by side — a WhatsApp message under 90 words for the customers I message directly, and a short email under 140 words with a subject line for the customers I email. Sign both as "Wanjiru, Westlands Printing."
>
> **Review cue:** At the end, list any details I should double-check before sending, and one piece of context that, if added, would make the message more honest.

**New AI output:**
> **WhatsApp version**
> Hi — quick note from Wanjiru at Westlands Printing. Our material costs have risen since January, so from 1 June 2026 most of our prices will go up between 8% and 12%. Anything you confirm and pay for before 31 May stays at the current rate, and any quote I have already sent you is valid for 14 days. I will send the updated price list separately. Thanks for the steady business — happy to answer any questions here. — Wanjiru, Westlands Printing
>
> **Email version**
> **Subject: Price update from 1 June — current rates honoured until 31 May**
>
> Hello,
>
> A short update on pricing. Our paper and ink costs have risen since January, so from 1 June 2026 most of our prices will go up between 8% and 12%.
>
> Two things worth knowing. First, anything you confirm and pay for before 31 May will be honoured at the current rate. Second, any quote I have already sent you is valid for 14 days from its issue date.
>
> The full updated price list will follow as a separate attachment. If you would like a quote at the current rate before the change, reply to this email and I will send one over.
>
> Thank you for the continued work.
>
> Wanjiru, Westlands Printing
>
> **Details to double-check before sending**
> - Confirm the start date is exactly 1 June 2026 in your calendar (not the financial month start).
> - Confirm the cut-off is *31 May payment received*, not *31 May order placed*.
> - Confirm the 14-day quote validity is correct for *all* outstanding quotes, not only the most recent batch.
>
> **One piece of context that would make this more honest**
> If you can name one or two specific items where the increase is on the lower end of the range (for example, business cards at 8%) versus the higher end (for example, branded notebooks at 12%), customers will feel less ambushed and more able to plan.

**What the learner should notice.** The weak prompt produced a piece of corporate filler that neither informs nor reassures. The engineered prompt produced two channel-appropriate messages, both under their word limits, both naming the actual figures the business owner supplied, neither inventing numbers the AI did not have. The Review cue produced three concrete pre-send checks and one suggestion for making the message more honest — exactly the kind of work a careful customer-care lead would do, which is what the Role line told the AI to be. This is what *engineered* means in practice: the prompt does the work of a careful colleague, not the work of a fluent stranger.

### Worked example 3: Review-ready feedback from performance notes

**Weak prompt:** *I have to write feedback for a junior accountant. Here are some notes I kept. Make it sound professional.*
> [pasted notes: *Sarah, 8 months in role. Jan reconciliation late by 2 days. Feb supplier-statement clean-up went well — debrief noted fewer corrections than usual, delivered on time. March — missed bank-rec sign-off early in month. Q1 management-accounts pack — her sections accurate but late, senior had to rework. Peer note from Maina (March): "Sarah was generous with her time on VAT filing — helped without being asked."*]

**AI output (failure mode — slightly polished, slightly invented):**
> **Performance Feedback — Sarah**
>
> Sarah has demonstrated steady growth over her first eight months in the role. Her attention to detail has been a clear strength, particularly in reconciliations and supplier-statement work where she has consistently delivered accurate, well-organised output. Her February project on the supplier-statement clean-up was a standout, completed ahead of schedule and with positive feedback from the wider finance team. Sarah is also recognised by peers as a generous and supportive colleague — Maina specifically praised her willingness to support others on technical work such as VAT filing, which speaks to her collaborative approach.
>
> Areas for development centre on time management, particularly around concurrent deliverables. The January reconciliation and Q1 management-accounts pack both encountered timing slippages that affected downstream review. Sarah would benefit from sharper diary discipline and earlier escalation when workload pressure builds. With this lens applied, the second half of the year should see her develop into a fully reliable mid-level finance contributor.

**What sounds correct.** Fluent, professional in tone, clearly structured into strengths and development areas. A manager skim-reading it might paste it into the review document.

**What is wrong.**
- *Completed ahead of schedule* — the notes do not say that. They say *delivered on time*. The AI quietly upgraded the claim.
- *Positive feedback from the wider finance team* — the notes mention only one peer, Maina. The AI generalised one peer note into a team consensus.
- *Sharper diary discipline and earlier escalation* — the notes do not mention either of these. The AI invented a development theme that sounds plausible but is not grounded.
- *Develop into a fully reliable mid-level finance contributor* — this is a forward-looking promise the manager has not actually made. Putting it on paper turns it into a commitment.

This is the most dangerous AI failure mode in any work that touches HR, legal, or financial content: the output is fluent enough that the inventions look like the original evidence, and a manager who pastes it without re-reading the notes will sign off on claims they did not make.

**Engineered prompt with R-T-C-C-O-R explicit:**
> **Role:** You are a careful HR business partner who writes evidence-based feedback. You never invent specifics, you flag missing evidence rather than fill it in, and you do not make forward-looking promises on the manager's behalf.
>
> **Task:** Draft a draft-stage performance feedback note for Sarah, a junior accountant who has been on my team for eight months. The note will be reviewed and edited by me before the conversation. It is not the final version.
>
> **Context:**
> - Reviewer: me, the senior accountant on the team. I will deliver this in a 1:1 next week.
> - Subject: Sarah, 8 months in role.
> - The only evidence available is the notes I will paste below. Do not draw on anything else.
> - Cultural note: this team uses direct, plain language in feedback. We do not soften every observation with reassurance, but we also do not write feedback that sounds harsh.
>
> **Constraints:**
> - Under 250 words.
> - Two short sections only — *Strengths* and *Areas for development* — each with two or three bullets.
> - Every bullet must point to a specific event from the supplied evidence. No bullet may generalise from one peer note to a team-wide claim.
> - Do not invent projects, percentages, quotes, or development themes that are not in the notes.
> - Do not make forward-looking promises on my behalf (no *will become a reliable mid-level contributor*).
>
> **Output format:**
> *Strengths* — 2 or 3 evidence-anchored bullets.
> *Areas for development* — 2 or 3 evidence-anchored bullets.
> *Evidence gaps* — a clearly labelled section listing development areas the manager might want to discuss but that are not supported by the supplied evidence (for example, stakeholder communication, career-development conversations).
>
> **Review cue:** Below the draft, list (a) any phrasing that you suspect is too soft or too sharp for a draft-stage note that the manager will edit, and (b) one question I should ask Sarah in the 1:1 that the evidence does not let you answer.
>
> **Notes:** [pasted notes from above]

**Corrected AI output:**
> **Performance feedback — Sarah (8-month review, draft)**
>
> **Strengths**
> - Strong delivery on the February supplier-statement clean-up project: delivered on time, with fewer corrections than usual at debrief.
> - Accuracy on technical work: her sections of the Q1 management-accounts pack were accurate at submission.
> - Generous peer support, specifically on VAT filing — peer note from Maina records that she helped without being asked.
>
> **Areas for development**
> - Timeliness on recurring deadlines. Two specific examples from the evidence: January reconciliation submitted two days late, and Q1 management-accounts pack sections submitted late, requiring rework by the senior.
> - One missed bank-rec sign-off in early March — small individually, but worth raising as a pattern of recurring deadline slips when read alongside the other two examples.
>
> **Evidence gaps**
> - No evidence in the supplied notes about stakeholder communication, presentation skills, or relationships outside the immediate team. If any of these is a development area, please add a 1:1 note before the conversation.
> - No evidence in the supplied notes about career direction, training preferences, or readiness for additional responsibility. Standard 8-month review topic, but not supported here.
>
> **Notes for the reviewer**
> - The phrasing on *recurring deadline slips* is on the sharper end. Soften to *a pattern of late submissions across three deliverables* if you would prefer to keep this draft warmer.
> - One question the evidence does not answer: *what got in the way on the late submissions?* Knowing whether the cause was workload, prioritisation, or something outside work changes the development conversation.

**What the learner should notice.** The Module 3 version of this example used evidence boundaries to stop the AI from inventing specifics. The Module 4 version goes further. The Role line tells the AI to be the kind of HR business partner who flags rather than fills, the Output format adds an explicit *Evidence gaps* section that the Module 3 version did not have, and the Review cue surfaces tone-of-draft issues and one well-chosen question for the 1:1. The corrected output is shorter, less polished-sounding, and substantially more useful as a *draft* — which is what the Task asked for. Notice that the engineered prompt is not asking the AI to write the final feedback. It is asking the AI to do the part of the work the AI is good at — structuring evidence — and to flag the parts only the manager can do.

### Worked example 4: Cluttered prompt to clean engineered prompt

**Cluttered prompt:**
> Hi! I need you to write a really short, professional, friendly, casual but not too casual, formal-yet-warm email to my colleagues about the team lunch on Friday at the new Italian place near the office. Make it positive and exciting, but not over the top, with a clear call to action, but not pushy, polite but firm, and a warm closing. Use bullet points but also write it in paragraphs. Mention the venue, the time, the menu, the dress code, the parking situation, the dietary options, the RSVP process, who is invited, who is not, the after-lunch plan, the WhatsApp group for questions, and the cost-sharing arrangement. Make sure it is under 80 words. Use emojis but not too many. Make it sound like me but you have not seen anything I have written.

**Initial AI output:**
> Hey team! Lunch on Friday at the new Italian spot near the office — pasta, pizza, pretty much everything. RSVP by Thursday, smart-casual, parking tight, after-lunch optional, WhatsApp group for questions, costs split, dietary options available. See you there!

**What is wrong.** The output reads like a checklist crammed into a single sentence. It manages to "mention" most of the items the prompt asked for, but in doing so it gives almost no real information — what time, which venue, how to RSVP, who is invited, what the cost is. The contradictions in the prompt forced the AI to compress its way through an impossible instruction. This is the engineering-stage version of the Module 3 clutter problem: more elements does not mean a better prompt.

**Diagnosis of the clutter, clause by clause.**
- *Professional, friendly, casual but not too casual, formal-yet-warm* — five tone instructions that average to nothing. Pick one.
- *Positive and exciting, but not over the top, with a clear call to action, but not pushy, polite but firm* — three more tone arguments stacked on top of the first set.
- *Use bullet points but also write it in paragraphs* — direct format contradiction.
- *Under 80 words* combined with a 12-item content list — mathematically impossible without dropping items or shrinking each one to a single phrase.
- *Use emojis but not too many* — vague constraint with no checkable rule.
- *Make it sound like me but you have not seen anything I have written* — Role-shaped instruction with no input the AI can use.

**Engineered prompt — clean R-T-C-C-O-R rewrite:**
> **Role:** You are a colleague writing a short internal team note in plain Kenyan English. Direct, warm, no corporate filler.
>
> **Task:** Draft a short Slack message announcing the team lunch this Friday.
>
> **Context:** Eight-person team. The lunch is at La Cucina (an Italian restaurant, two minutes' walk from the office) at 12:45 on Friday. Cost is KES 1,500 per person, split equally, paid by M-Pesa to the team admin by Thursday evening. Dietary options: vegetarian and gluten-free available — flag preference in the RSVP. RSVP in the team Slack channel by end of Thursday. After-lunch is optional; some of the team are heading back to the office at 14:30.
>
> **Constraints:** Under 90 words. One short paragraph for the announcement, then a labelled list of the four practical details (Where, When, Cost, RSVP). No emojis. No corporate phrases. Do not mention the dress code, the parking situation, or the WhatsApp group — they are not relevant to this message.
>
> **Output format:** A single Slack message — opening line, one short paragraph, four labelled detail lines, sign-off.
>
> **Review cue:** If any of the four practical details would be ambiguous to a new joiner who has not been to La Cucina, flag the line at the bottom.

**Engineered AI output:**
> Friday lunch is on — booked at La Cucina, the Italian place two minutes from the office. Quick details below; please RSVP in this channel by end of Thursday so we have a final number for the booking.
>
> **Where:** La Cucina, two minutes' walk from the office.
> **When:** Friday, 12:45.
> **Cost:** KES 1,500 per person, split equally — M-Pesa to the team admin by Thursday evening. Vegetarian and gluten-free available; flag preference in your RSVP.
> **RSVP:** Reply in this channel by end of Thursday.
>
> Some of us are heading back to the office at 14:30 — the after-lunch is optional.
>
> **Notes for sender**
> - *Where* line: a new joiner who has not been to La Cucina may need the building name or the cross-street, not just the walking time.

**What the learner should notice.** The original prompt was not under-engineered; it was over-engineered. Twelve content items, five tone words, one format contradiction, and one impossible word limit produced a single compressed sentence that informed no one. The clean rewrite kept only the items the team actually needs to act on (Where, When, Cost, RSVP), picked one tone direction, picked one format, removed the contradictory instructions, and added a Review cue that did one useful piece of work — flagging an ambiguity for a new joiner. The rewritten prompt is shorter, more controlled, and produces a message a real team would actually read. The lesson generalises: at the engineering stage, the discipline of cutting clauses is at least as important as the discipline of adding them.

## Supplied practice activity materials

### Practice activity 1 — Prompt engineering makeover (30–40 minutes)
Below are three weak prompts. For each one, produce a full engineered version using R-T-C-C-O-R, then run it in your AI tool and compare the output against the weak version. Each engineered prompt must label every R-T-C-C-O-R element clearly — *Role:*, *Task:*, *Context:*, *Constraints:*, *Output format:*, *Review cue:* — so a colleague reading your prompt could rearrange the slots without losing the meaning. If a slot would genuinely be empty for the task, write *not applicable* and one short reason; do not invent content to fill it.

**Weak prompt 1:** *Help me write a job description for a finance assistant role.*

**Weak prompt 2:** *Summarize this Saturday community-meeting transcript and tell me what to do next.*
*(For this prompt, assume you are pasting in a 600-word transcript of a community-association meeting that covered three agenda items — security, the borehole project, and the upcoming AGM.)*

**Weak prompt 3:** *Draft a follow-up message to a supplier who promised delivery on Monday and has gone quiet.*

For each prompt, after you run the engineered version, write three to five sentences naming (a) which of the six R-T-C-C-O-R elements made the biggest difference, (b) whether the Review cue produced anything useful, and (c) one element you suspect is now slightly bloated and could be cut without changing the output. Save the three engineered prompts and the three short analyses; you will use them in the knowledge-to-output task.

### Practice activity 2 — Output design lab (30–40 minutes)
Below is a short source document. Run it through three different output designs in your AI tool, using the same Role, Task, Context, and Constraints across all three runs and changing only the Output format slot. Compare the three outputs and decide which design is most useful for which next step.

**Source document — *Westlands Printing weekly cost note* (paste this into the prompt):**
> Week of 20 April 2026. Material costs continued to rise. Paper from Industrial Area supplier increased from KES 850 per ream to KES 920 per ream this week — third increase since January. Black ink cartridge prices stable; colour cartridges up 6%. Two large orders delivered: 500 branded notebooks for Bidii Real Estate (delivered on time, customer paid in full); 200 brochures for Mwangaza Health (delivered one day late due to paper shortage, customer accepted with a small discount). Three repeat customers asked about the rumoured price increase from 1 June; none have cancelled standing orders. One new lead from a referral — Acacia Schools, asking for a quote on 300 exercise books. Cash position end of week: KES 142,000 in M-Pesa till plus KES 38,000 owed by Mwangaza Health on 30-day terms. One staff issue: the junior printer was off sick three days; backlog cleared by Friday. Equipment: the second printer is making a clicking noise on long runs and probably needs servicing in the next two weeks.
>
> *(Source: weekly note kept by Wanjiru, the owner. Used as the input to her Saturday review of the week.)*

For each of the three runs, use this stable prompt scaffold and change only the **Output format** line:

> **Role:** You are a careful small-business adviser who writes for a one-person owner who has thirty minutes on a Saturday morning to review the week.
> **Task:** Turn the weekly cost note below into something I can use to run my Saturday review.
> **Context:** I am Wanjiru, the owner of Westlands Printing in Nairobi. I review the week, decide what to act on next week, and decide what to escalate.
> **Constraints:** Plain English. Do not invent numbers. If something is missing that would normally be in a weekly review (for example, profit margin), flag it rather than calculating it.
> **Output format:** *(insert one of the three options below)*
> **Review cue:** At the end, list any items that need a decision from me this weekend, separately from items that can wait until next week.

The three Output format options to run separately:

**Run A — Brief.** *A one-page brief in this exact structure: (1) headline finding in one sentence, (2) three supporting points in one short paragraph each, (3) two open questions worth thinking about this weekend, (4) one recommended action for next week. Total length under 350 words.*

**Run B — Table.** *A table with five columns — Item, Category (cost / customer / staff / equipment), This week's status, What changed from last week, Next-step recommendation. One row per item from the cost note. Below the table, three lines of plain text covering anything that did not fit a row.*

**Run C — Step-by-step.** *A six-step checklist for the Saturday review itself, ordered by what should happen first. Each step starts with an action verb (Review, Decide, Draft, Confirm, Schedule, Note) and ends with a one-line completion signal so I can tick it off.*

After running all three, write a short comparison (about 200 words) covering: which output design fit which next step best, where the same content gained or lost usefulness depending on the shape, and which design you would default to next Saturday and why. The point of this lab is to *feel* the difference output design makes when the content is identical.

### Practice activity 3 — Constraint selection drill (25–30 minutes)
For each of the five tasks below, write at least three engineered constraints — and at least one of them must be a *negative* constraint (a *do not do this* rule, not a *be like this* rule). For each constraint, write one short sentence naming what default behaviour the constraint is preventing. Then mark each constraint as either *control* (changes a specific behaviour you can check) or *decoration* (would not change the output if removed) and revise the decoration ones until they are control.

**Task 1.** Draft a short message to a school parent about a behaviour incident involving their Form One son in class today.

**Task 2.** Write a one-paragraph product description for a Kenyan small-business website selling handmade leather sandals.

**Task 3.** Reply to a customer review that gave your café two stars and complained about the service being slow on a busy Saturday.

**Task 4.** Draft a follow-up message to a job applicant you interviewed last week, letting them know they were not selected for the role.

**Task 5.** Write a short brief for the team about a new policy change — staff must clock in by 8:30 a.m. starting next month, and the existing 9 a.m. start time will no longer apply.

**Self-check.** A useful set of constraints for each task usually covers length, tone for the relationship, at least one banned phrase or behaviour, and at least one content boundary (for example, *do not promise a refund*, *do not commit to a future hiring round*, *do not name the other student involved*). If your constraints look the same across all five tasks, you are writing decoration. The constraints should change because the tasks change.

### Practice activity 4 — Three reusable prompt patterns (40–60 minutes)
The point of this activity is to build three R-T-C-C-O-R prompt patterns you will actually reuse. A *pattern* is a fill-in-the-blanks template — the slots that change every run are marked, and the slots that stay stable are written out as defaults. The work is to choose three real tasks you do, draft a clean R-T-C-C-O-R prompt for each, and then convert each prompt into a pattern.

**Step 1 — Choose three real tasks.** They should be tasks you do at least monthly, and they should be different in shape from each other. A good set covers one *communication* task (an email, a customer message, a parent note), one *thinking* task (a summary, a brief, a comparison), and one *making* task (drafting a job description, building a study aid, writing a price list note). If you cannot think of three, look at your last two weeks of messages and notes for the kinds of writing that come up repeatedly.

**Step 2 — Draft a clean R-T-C-C-O-R prompt for each.** Use the labelled-slot format from the worked examples. Do not skip slots; if a slot is genuinely empty, write *not applicable* with a one-line reason.

**Step 3 — Convert each prompt into a pattern.** For each of the six slots, mark whether it is *task-specific* (changes every run) or *stable default* (carries over from one run to the next). For example, in a customer-message pattern, the Role line and the *no corporate filler* constraints are usually stable defaults, while the customer name, the order details, and the delay reason are task-specific. Use a clear visual marker — for example, square brackets around the task-specific slots and plain text for the stable defaults.

**Step 4 — Stress-test each pattern.** Run each pattern with two different sets of task-specific inputs and compare the outputs. The pattern is good if the outputs are recognisably the same shape but appropriate to the different inputs. The pattern is weak if either output drifts off-tone, off-format, or off-scope — that means the pattern's stable defaults were not stable enough, and at least one constraint or output design line needs tightening.

**Deliverables for this activity.** Three named patterns, each on its own page with a short title, the labelled R-T-C-C-O-R prompt with task-specific slots clearly marked, the two stress-test outputs, and a one-paragraph note for each pattern covering what you would change after the stress-test. These three patterns are also part of the portfolio artifact for this module, so write them as work, not as a sketch.

## Pause and check
Before moving on, ask yourself:

- Can I name the six R-T-C-C-O-R elements without looking, and explain in one sentence each how Role and Review cue extend the Module 3 model?
- Looking at one of the engineered prompts I just wrote in the practice activities, can I point to the specific clause in each slot and name the default behaviour it is preventing?
- Can I describe, in plain language, the next thing I will do with the AI's output for one of my real tasks — and explain why I chose the output design I chose (table, checklist, summary, brief, or step-by-step) on the basis of that next step?

If any answer is no, return to the relevant teaching part. If all three are yes, move to the knowledge-to-output task.

## Knowledge-to-output task
Produce an *Engineered Prompt Pack* covering one task you actually do — at work, in study, or in daily life. The pack has four parts and builds directly on the Module 3 *Before/After Prompt Rewrite* artifact, so keep that file open while you work.

1. **Starting point — your Module 3 final selected prompt.** Paste in the final selected prompt from your Module 3 artifact, exactly as you wrote it. Below it, paste the AI output it produced in Module 3. Two to four sentences of context if the task needs explaining.

2. **Engineered version with R-T-C-C-O-R explicit.** Rewrite the same prompt using the labelled-slot R-T-C-C-O-R structure. Every slot must be labelled. The Role line must do real work — name the function and at least one quality. The Output format must be designed (named columns, fixed structure, named length), not just shaped (*a list*, *a paragraph*). The Review cue must instruct the AI to do at least one of: flag missing evidence, list its assumptions, or refuse a section it cannot complete safely. Run the engineered prompt in your AI tool and paste the output.

3. **Three reusable patterns based on this task family.** Take the engineered prompt from part 2 and produce three pattern variants for tasks in the same family — for example, if part 2 was a customer-delay message, the three patterns might be (a) a delay message, (b) a price-change message, (c) a sorry-we-cannot-do-it message. Each pattern uses the labelled-slot format with task-specific slots clearly marked and stable defaults written out. Each pattern should fit on one page.

4. **One-page reflection.** Write 250–350 words covering: which of the six R-T-C-C-O-R elements made the biggest difference for this task, what the Review cue surfaced that you would otherwise have missed, where you noticed the AI defaulting to something generic that the engineered prompt prevented, and one constraint or output design choice you suspect is overfit to your current situation and would need to change if a colleague reused the pattern. The reflection is part of the artifact, not optional.
