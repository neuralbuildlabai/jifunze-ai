# Module 3: Prompts as Control

## What was preserved
The T-C-C-F-A model — Task, Context, Constraints, Format, Audience — as the teaching frame for prompt design. The framing that prompts are not decoration but the control surface that determines whether AI output is usable. The four worked-example concept titles from the original module: late-assignment email, lesson summary versus revision-and-quiz aid, generic versus context-rich customer message, and performance review with evidence boundaries. These four cover the most common ways a beginner's prompt goes wrong — vague task, missing context, no constraints, ungrounded claims — and they are kept because each one teaches a different lesson.

## What was improved
Every teaching part now has a body. Each of the five T-C-C-F-A elements has a one-paragraph definition and at least one weak-versus-strong inline mini-example. The reason vague prompts fail is taught explicitly rather than implied, and the idea that prompt revision is a normal workflow — not a sign of failure — is named directly. The four worked examples now contain the actual prompts, the actual AI outputs, an analysis of what sounds correct and what is wrong, the strengthened prompt, and the new output. Every practice activity supplies the items the learner needs — four weak prompts to improve, two prompt-output pairs to compare, one task for the context exercise, three tasks for the constraint drill — so a self-learner can do the work without a facilitator. The boilerplate tail is removed and replaced with completion evidence, revision guidance, and a forward-pointing transition. The checkpoint expands to eight scored questions across multiple-choice, scenario, short-answer, and application formats with a model answer key. A capstone-save reminder ties the artifact forward to Modules 4, 5, 15, and 16.

## Estimated time
Two to two and a half hours of focused work, including the practice activities and writing the portfolio artifact. A learner with prior prompting experience may finish closer to two hours; a complete beginner may take longer because the practice activities require running prompts in their own AI tool and reviewing the outputs carefully.

## Module purpose
Most people who try AI for the first time write short, vague prompts and then judge the tool by what comes back. The output is generic, so they conclude the tool is not useful for their work. The problem is usually upstream: the prompt did not give the AI enough to work with. This module teaches you to treat the prompt as a control surface — the place where you decide what the AI does, what it knows, what it must respect, what shape the output takes, and who it is for. Prompt skill is the single most-leveraged skill in practical AI use, and it carries forward into every later module of this course and into the kinds of digital, communication, and operational work AI is increasingly used for.

## Learner outcomes
By the end of this module, you should be able to:

- Explain in plain language why a vague prompt usually produces a vague output, and why prompt revision is a normal workflow rather than a sign of failure.
- Apply the T-C-C-F-A model — Task, Context, Constraints, Format, Audience — to write a prompt for a real task you do.
- Diagnose a weak prompt by naming which T-C-C-F-A element is missing or underspecified.
- Strengthen a weak prompt with three different element-specific improvements and predict how each one will change the output.
- Recognize when more detail starts to clutter a prompt rather than improve it.
- Produce a Before/After Prompt Rewrite for one task you actually do, plus a reusable prompt contract you can adapt to other tasks.

## Core lesson

A prompt is not just a question you type. It is the set of instructions the AI uses to decide what to produce, how to shape it, and what to leave out. Two prompts asking the same broad question can produce very different outputs because the AI is filling in everything you did not say. When you write a vague prompt, the AI fills the gaps with statistical defaults: the most common audience, the most common phrasing, the most common length. That is why "write something about late assignments" produces a generic email that fits no real classroom. The fix is not to write longer prompts; it is to write more *controlled* prompts. The five elements below — T-C-C-F-A — are a working checklist for the kind of control that actually changes the output.

### Task
Task is the verb. It is what you want the AI to actually do — draft, summarize, rewrite, compare, translate, classify, brainstorm, restructure, explain. A weak Task is the most common reason a prompt fails: the verb is missing or so broad that the AI has to guess what you mean. *Write something about late assignments* has no Task verb at all — *something* is not a task. The AI defaults to the most generic interpretation, which is usually a broad essay or generic email that fits no specific situation.

A strong Task is specific enough that you could check whether the AI did what you asked. *Draft a single email reminding undergraduate students that the assignment is now five days late and that submissions close at midnight Friday* names the verb (draft), the artifact (a single email), and the action being communicated (a reminder with a deadline). The AI now knows what to produce, not just what topic to talk about.

A useful test: if you can read your prompt and ask "did the AI do that, yes or no?" your Task is probably specific enough. If the answer is "kind of" or "I'm not sure what *that* even is," the verb is too vague. This is why vague prompts fail — they leave the most important decision, what the AI is producing, to the AI itself. A first prompt that fails this test is not a sign you are bad at prompting. It is a sign you have found the first thing to revise.

### Context
Context is the background the AI needs in order to produce something that fits your situation. The AI does not know who you are, who you are writing to, what already happened, what was already said, or what the constraints of your environment are. If you do not tell it, it will guess. The guess is usually plausible and usually wrong in some specific way that matters.

Compare *help me reply to a customer* with *help me reply to a recurring small-business customer who ordered ten branded notebooks for a corporate gift two weeks ago, paid in full last week, and is now asking on WhatsApp why delivery is delayed past the agreed Friday*. The first prompt produces a generic apology that could have been written for any business in any country. The second produces a reply that addresses this customer, this order, this channel, and this delay reason — because the AI now has somewhere specific to land.

Context that helps the AI usually includes: who you are, who the message or output is for, the relationship between you, what already happened, what the recipient already knows, and any constraints from your environment such as industry, location, language, or channel. You do not need every detail; you need the details that change the answer. If the AI's draft would shift when you add a piece of context, it belonged in the prompt.

### Constraints
Constraints are the rules the output must respect. They are the *do this, do not do that* layer of the prompt. Constraints matter because the AI will, by default, use whatever conventions are most common in its training data. Those defaults are often wrong for your situation: too long, too formal, too American, too apologetic, too promise-heavy, too generic, too repetitive.

Compare *write an apology email* with *write an apology email that stays under 120 words, does not admit legal fault, does not promise a refund, uses one short paragraph, and offers a specific next step*. The first prompt produces a long, over-apologetic message with vague reassurances. The second produces a short, careful note that you could actually send without your manager rewriting it. The constraints did not make the prompt stiff; they made the output usable.

Useful constraints often cover length (under 120 words, three bullets, one paragraph), tone (warm but professional, no exclamation marks, no emoji), content boundaries (no legal admission, no medical advice, no promises about timelines), and language (Kenyan English, no jargon, no business-school phrases). One signal you have chosen well: you can predict what the output will *not* contain, not just what it will contain. Constraints are how you stop the AI from being generic.

### Format
Format is the shape of the output. The same content can come back as a paragraph, a numbered list, a table, a bulleted summary, a draft email, a checklist, a side-by-side comparison, or a step-by-step plan. Shape is not a stylistic preference. It is part of whether the output is useful for the next thing you have to do with it.

Compare *summarize this lesson* with *summarize this lesson as five revision bullets, then write five short-answer quiz questions with answers underneath each*. The first produces a short paragraph the learner has to re-read several times to extract anything useful. The second produces a study aid the learner can revise from. The content overlaps; the format does the work.

Useful Format choices match the next step. If you are going to forward the output, draft it as a message. If you are going to compare options, ask for a table. If you are going to revise from it, ask for bullets and questions. If you are going to brief someone, ask for a one-paragraph summary plus a three-bullet headline. The format question is essentially: *what am I going to do with this output?* The answer tells you the shape to ask for. When you are unsure, name the next step explicitly inside the prompt — *I will use this to brief my manager in a 5-minute conversation* — and let the AI choose a fitting shape.

### Audience
Audience is who the output is for. Audience changes everything downstream — vocabulary, tone, length, what you assume the reader already knows, what cultural references land, what register feels right. The same content explained for a Form Two student, a parent, and a school board reads differently. If you do not name the audience, the AI defaults to a generic, mid-formal, mid-Western reader, which is almost never the actual reader.

Compare *explain photosynthesis* with *explain photosynthesis to a Form Two biology student in plain Kenyan English, using one analogy from cooking, in under 150 words*. The first produces a textbook paragraph. The second produces an explanation a student can actually follow. The Audience description does most of the work — *Form Two*, *Kenyan English*, *cooking analogy* — because each of those decisions removes a default the AI would otherwise have used.

Audience is also where prompt revision becomes a normal workflow. Even with a strong T-C-C-F-A prompt, the first output may miss the audience by a small but real margin — too formal, too soft, too generic, slightly off-tone. The fix is not to throw out the prompt or the tool. It is to keep the prompt and adjust one element. *Make the same email shorter and warmer. Cut the corporate phrases. Use the kind of language you would use on WhatsApp.* This kind of revision — small, targeted, repeatable — is how prompts actually get good. Treat the first output as a draft, not a verdict.

A note on clutter. More detail is not always better. Prompts can become so long that the AI loses track of what matters, or the constraints contradict each other and the output becomes stiff and unusable. The five elements above are a checklist, not a quota. Use the elements that change the output for *this* task. If a constraint, an audience description, or a format note does not change the AI's behaviour in a way you can see, it is probably noise.

## Fully written worked examples

### Worked example 1: Late-assignment email to students

**Weak prompt:** *Write an email about late assignments.*

**AI output:**
> **Subject: Important Notice Regarding Late Assignments**
>
> Dear Students,
>
> I hope this message finds you well. I am writing to remind you of the importance of submitting assignments on time. Late submissions can have a significant impact on your overall academic performance and may result in penalties as outlined in the course policy.
>
> If you are experiencing difficulties that are affecting your ability to meet deadlines, please do not hesitate to reach out so we can discuss possible accommodations. We are committed to supporting you throughout your studies.
>
> Best regards,
> Your Instructor

**What sounds correct.** The email is grammatically clean, has a subject line, opens politely, and closes professionally. It would not embarrass anyone if sent.

**What is wrong.**
- It does not name *which* assignment, *which* class, *which* deadline, or *how* late the submissions are. A student receiving this email would not know whether it applies to them.
- The tone is mid-formal corporate, which fits no real classroom. A real lecturer either sounds warmer (small undergraduate class) or sharper (a strict deadline with consequences). This sounds neither.
- It offers vague accommodations ("possible accommodations") without naming what is on offer or how to ask.
- It contains no Task verb the recipient can act on. The student does not know what to do next.

**Strengthened prompt with audience and constraint:**
> Draft a single short email to undergraduate students in my second-year communications class. The Module 3 reflection assignment was due last Friday and is now five days late. Submissions close at midnight this Friday. I want to remind students who have not submitted, name the new cutoff clearly, mention that late submissions still attract the standard 10% per-day penalty, and invite anyone facing a real difficulty to reply by Wednesday so we can discuss it. Keep it under 150 words. Warm but firm. No "I hope this message finds you well." Plain English suitable for Kenyan undergraduate students. Sign-off: Mr. Otieno.

**New AI output:**
> **Subject: Module 3 reflection — final cutoff is Friday at midnight**
>
> Hi all,
>
> A quick note for those of you who have not yet submitted the Module 3 reflection assignment. It was due last Friday, so it is now five days late.
>
> The final cutoff is this Friday at midnight. The standard late penalty of 10% per day still applies up to that point. After Friday, the system will close.
>
> If something genuine is getting in the way — health, work, family, anything serious — reply to this email by Wednesday and we can talk about it. I would rather hear from you early than chase you afterwards.
>
> Otherwise, please get the submission in.
>
> Mr. Otieno

**Side-by-side comparison.** The first email talks *about* late assignments. The second email talks *to* students who have not submitted a specific assignment. The Task verb (remind), the Context (which class, which assignment, how late), the Constraints (under 150 words, no corporate opener, plain English, name the penalty, name the deadline), the Format (a short email with subject line), and the Audience (Kenyan undergraduate students in a specific course) together produce something a real lecturer could actually send. **What the learner should notice:** the second prompt is longer than the first, but it is not longer because of decoration. Every added clause closes a gap the AI would otherwise have filled with a generic default.

### Worked example 2: Lesson summary versus revision-bullet-plus-quiz prompt

This example shows the same source material run through two prompts that differ only in Task and Format. The point is to see how Format alone changes whether an output is useful.

**Source — paste-in lesson notes (compressed for the example):**
> Photosynthesis is the process by which green plants use sunlight to convert water and carbon dioxide into glucose and oxygen. The reaction takes place mainly in the chloroplasts of leaf cells, where the green pigment chlorophyll absorbs light energy. The light reactions split water molecules and produce ATP and NADPH; the Calvin cycle uses these to fix carbon dioxide into glucose. Factors affecting the rate include light intensity, carbon dioxide concentration, temperature, and water availability. Plants release oxygen as a by-product, which is essential for the respiration of most other living things.

**Prompt A — lesson summary:**
> Summarize the lesson notes above into one short paragraph for a Form Two biology student.

**AI output A:**
> Photosynthesis is how green plants use sunlight, water, and carbon dioxide to make glucose and oxygen. The process happens in the chloroplasts of leaf cells, where chlorophyll absorbs light. Light intensity, carbon dioxide, temperature, and water all affect how fast it happens. The oxygen released is what most living things need to breathe.

**Prompt B — revision bullets plus quiz:**
> Turn the lesson notes above into a revision aid for a Form Two biology student. First, give five revision bullets covering the most testable points. Then write five short-answer quiz questions, each followed by the correct answer in one line. Use plain English. No long paragraphs.

**AI output B:**
> **Revision bullets**
> - Photosynthesis converts water and carbon dioxide into glucose and oxygen, using sunlight as the energy source.
> - The reaction takes place in the chloroplasts of leaf cells; chlorophyll absorbs the light energy.
> - The light reactions split water and produce ATP and NADPH; the Calvin cycle uses these to fix carbon dioxide into glucose.
> - The rate is affected by light intensity, carbon dioxide concentration, temperature, and water availability.
> - Oxygen is released as a by-product and is needed by most living things for respiration.
>
> **Quiz**
> 1. What two raw materials do plants combine during photosynthesis? — Water and carbon dioxide.
> 2. Where in the leaf cell does photosynthesis mainly take place? — In the chloroplasts.
> 3. What pigment absorbs light energy for photosynthesis? — Chlorophyll.
> 4. Name two factors that affect the rate of photosynthesis. — Any two of: light intensity, carbon dioxide concentration, temperature, water availability.
> 5. Why is the oxygen released by photosynthesis important? — Most living things need it for respiration.

**Reasoning for the difference.** Both prompts cover the same source material. Output A is a fluent paragraph the student has to re-read three times to extract the testable facts. Output B is already a study aid: the student can read the bullets, then test themselves with the quiz, then return to the bullets. The content overlap is high; the *usefulness* gap is large. Format choices match the next step — in this case, the next step is revising for a test, not reading for general understanding. **What the learner should notice:** when the next step is concrete (revise, compare, brief, decide), naming that step inside the Format almost always produces a better output than asking for a generic summary.

### Worked example 3: Context-rich Kenyan WhatsApp customer-delay message

**Generic prompt:**
> Write a message to a customer about a delayed order.

**AI output (generic):**
> Dear Valued Customer,
>
> Thank you for your recent order. We sincerely regret to inform you that there has been an unforeseen delay in the delivery of your items. We deeply apologize for any inconvenience this may have caused and assure you that we are doing our utmost to resolve the situation as quickly as possible. We will provide an update at the earliest opportunity. Thank you for your patience and continued support.
>
> Sincerely,
> The Team

**What is wrong.** This message is too long and too formal for WhatsApp. It uses corporate phrases — *Dear Valued Customer*, *unforeseen delay*, *deeply apologize*, *at the earliest opportunity* — that no real Kenyan small-business owner uses with a recurring customer. It does not name the order, the customer, the reason for the delay, or a real next step. It performs apology without solving anything. Sending this on WhatsApp would feel cold, generic, and slightly off — exactly the kind of message customers ignore or screenshot and forward to friends.

**Context-rich prompt:**
> Help me write a short WhatsApp message to a customer about a delivery delay. Context:
> - Sender: I run a small printing business in Nairobi. My name is Wanjiru.
> - Customer: Mr. Kamau. He has ordered from me three or four times before for his real-estate agency. Friendly, prefers WhatsApp, uses straightforward Kenyan English.
> - What he ordered: 200 branded business cards, paid in full on Monday by M-Pesa.
> - Original promise: ready for collection on Friday at the shop in Westlands.
> - Delay reason: my paper supplier in Industrial Area received the wrong stock from the printer; the right paper arrives tomorrow afternoon. Cards will now be ready Monday by 2 p.m.
> - Tone: warm, plain, honest. Sounds like a real person. Not corporate.
> - Constraints: under 90 words. No "Dear Valued Customer." No "we sincerely apologize." Acknowledge the delay clearly. Give the new pickup time. Offer free same-day delivery to his Westlands office on Monday as the make-good.
> - Format: a single WhatsApp message, suitable for the channel.

**AI output (context-rich):**
> Hi Mr. Kamau, hope you're well. Quick update on your 200 business cards — I'm running a bit late. The paper from my supplier came in wrong, and the correct stock only arrives tomorrow afternoon. Cards will now be ready Monday by 2 p.m. instead of Friday. To make up for the delay, I'll deliver them to your Westlands office at no charge on Monday — just send me the exact location and a good time. Sorry for the change of plan, and thanks for your patience. — Wanjiru

**Review notes.** The context-rich version reads like a real message from a real person to a real recurring customer. It names the delay reason without over-explaining. It gives a concrete new time, not "as soon as possible." It offers a specific make-good (free Monday delivery) instead of vague reassurance. It keeps the warmth that fits a recurring relationship. **What the learner should notice:** the prompt context block looks long compared to the output, but every part of the context block did real work. Drop the customer's name and you lose *Mr. Kamau* and the warmth. Drop the delay reason and you lose the *paper came in wrong* honesty. Drop the channel and you get a stiff email instead of a WhatsApp message. Context is what made this output specific.

### Worked example 4: Performance review feedback with evidence boundaries

**Weak prompt:**
> Write performance review feedback for Sarah, a junior accountant on my team. She has been with us for eight months. Cover her strengths and areas for improvement.

**AI output (failure mode — invented examples):**
> **Performance Review — Sarah**
>
> **Strengths.** Sarah has shown strong attention to detail in her work, consistently delivering accurate reconciliations and thorough variance analyses. Her colleagues describe her as a reliable team member who is always willing to support junior staff. In Q2 she successfully led the migration of the accounts-payable workflow, which reduced processing time by 30%.
>
> **Areas for improvement.** Sarah occasionally struggles with stakeholder communication, particularly when explaining technical findings to non-finance colleagues. She would benefit from more confidence in client-facing meetings. Time management on competing deadlines is also an area to develop further.

**What is wrong.** Almost every specific claim in this output is *invented*. The AI was given no information about Sarah other than her role, length of tenure, and the request to cover strengths and improvements. It generated plausible-sounding details — Q2 accounts-payable migration, a 30% processing-time reduction, "struggles with stakeholder communication," client-facing meetings — none of which it could possibly know. A manager who pasted this into a real performance review would either embarrass themselves or, worse, document evaluations that did not happen. This is the most common AI failure mode in HR contexts: when there is no evidence to draw from, AI fills the gap with statistically plausible filler that reads like truth.

**Strengthened prompt with explicit evidence sources:**
> I want to draft performance review feedback for Sarah, a junior accountant who has been on my team for eight months. The review must use only the evidence I am pasting below — three months of 1:1 notes I have kept, two project debriefs, and one peer-feedback note. Do not invent examples, projects, percentages, or quotes. If a section of the review would benefit from evidence I have not provided, flag it as *[evidence gap — to confirm]* rather than filling it in.
>
> [PASTED 1:1 notes from January, February, March — covering: late submission of January reconciliation by 2 days; strong work on the supplier-statement clean-up project in February; one missed bank-rec sign-off in early March; explicit positive feedback from peer Maina on her willingness to help with VAT filing.]
>
> [PASTED project debriefs — one on the supplier-statement project (delivered on time, fewer corrections than usual); one on the Q1 management-accounts pack (her sections were accurate but submitted late, requiring rework by the senior).]
>
> [PASTED peer note from Maina, one paragraph.]
>
> Format: two short sections — *Strengths* and *Areas for development* — each with two or three bullets. Each bullet must point to a specific event from the evidence above. Tone: honest, professional, no corporate filler. Length: under 250 words.

**Corrected AI output:**
> **Performance Review — Sarah (8-month review)**
>
> **Strengths.**
> - Strong delivery on the February supplier-statement clean-up project: submitted on time and with fewer corrections than usual at debrief.
> - Reliable peer support, specifically on VAT filing — peer feedback from Maina notes her willingness to help without being asked.
> - Accuracy on technical work: her sections of the Q1 management-accounts pack were accurate at submission.
>
> **Areas for development.**
> - Timeliness on recurring deadlines. Two examples in the evidence: January reconciliation submitted two days late; her sections of the Q1 management-accounts pack submitted late, requiring rework by the senior.
> - One missed bank-rec sign-off in early March — small, but worth raising as a process habit to tighten.
> - *[evidence gap — to confirm]* No evidence in the supplied notes about stakeholder communication, client-facing presentation, or career-development conversations. If any of these is a development area, please add a 1:1 note before the review meeting.
>
> Note to reviewer: feedback above is drawn only from the supplied 1:1 notes, project debriefs, and peer note. Anything outside that evidence has been flagged as a gap.

**What the learner should notice.** Naming the evidence sources, instructing the AI not to invent, and providing an explicit *flag missing evidence* rule changed the output from confident fiction to a usable draft. The corrected version is shorter, less polished-sounding, and substantially more honest. It also tells the manager exactly where to add real evidence before the review meeting. This evidence-boundary technique is one of the most important habits in any AI use that touches HR, legal, medical, financial, or disciplinary content — anywhere the cost of a fabricated detail is high.

## Supplied practice activity materials

### Practice activity 1 — Prompt improvement lab (25-30 minutes)
Below are four weak prompts. For each one, produce three graded improvements. Each improvement must strengthen one specific T-C-C-F-A element, and you must name which element you strengthened. Run at least two of your final versions in your AI tool and compare the outputs to the original.

**Weak prompt 1:** *Write a CV for me.*

**Weak prompt 2:** *Help me prepare for my meeting tomorrow.*

**Weak prompt 3:** *Translate this email.*

**Weak prompt 4:** *Summarize this article.*

For each weak prompt, your three improvements should not all strengthen the same element. Spread them across T-C-C-F-A. For example, on Weak prompt 1: one improvement adds Audience (the role and employer you are applying to), one adds Constraints (length, sections to include, what to leave out), one adds Context (your relevant background and what the job description emphasises). Submit a short table with columns *Weak prompt*, *Improvement 1 (element)*, *Improvement 2 (element)*, *Improvement 3 (element)*, and *What I expect each improvement to change in the output*.

### Practice activity 2 — Output comparison challenge (15-20 minutes)
Below are two prompt-output pairs. Each pair shows the same task answered with two slightly different prompts. For each pair, identify which T-C-C-F-A element the prompt change targeted, and explain in one or two sentences how that change produced the output difference.

**Pair A**

*Prompt A1:* *Write a short message to my landlord about the leaking tap.*

*Output A1:*
> Hi, I just wanted to let you know that the tap in the kitchen is leaking. It has been getting worse over the past few days. Could you please arrange for someone to come fix it when you get a chance? Thanks.

*Prompt A2:* *Write a short message to my landlord about the leaking tap. He is responsive but only acts when there is a clear deadline. The tap has been leaking for a week and is now wasting visible water overnight. Polite but firm. Ask for a fix by the weekend. Under 70 words.*

*Output A2:*
> Hi — the kitchen tap has been leaking for a week and is now wasting a noticeable amount of water overnight. I would like to ask for someone to come and fix it by this weekend at the latest, before it gets worse. Please let me know who will come and when. Thank you.

**Pair B**

*Prompt B1:* *Give me ideas for a small business I could start.*

*Output B1:*
> Here are some small business ideas you could consider: 1. Freelance writing or content creation. 2. Online tutoring. 3. Reselling products on social media. 4. Photography services for events. 5. A small food delivery service in your local area. 6. Handmade crafts sold online. 7. Mobile car-washing service. 8. Dropshipping. 9. Personal fitness coaching. 10. Social-media management for small businesses.

*Prompt B2:* *Give me ideas for a small business I could start. Format: a table with three columns — Idea, Realistic monthly start-up cost in KES, Skills or assets I would need on day one. Five rows. Skip ideas that need more than KES 50,000 to start.*

*Output B2:* (a five-row table filtering out high-cost ideas, with realistic KES start-up estimates and a short list of required skills or assets per row)

For each pair, write one or two sentences naming which element changed and what difference it produced. **Reflection question:** in Pair B, what did the format change *do* that the original prompt could not?

### Practice activity 3 — Context vs no-context exercise (20-25 minutes)
**Task:** Draft a short message announcing that a Saturday community workshop has been moved from this Saturday to the following Saturday because the venue double-booked.

Run this task twice in your AI tool.

**Run 1 — no context.** Use only this prompt: *Draft a short message announcing that a Saturday community workshop has been moved from this Saturday to the following Saturday because the venue double-booked.*

**Run 2 — full context.** Use a prompt that includes all of the following:
- Sender (you, your role, the name of the group running the workshop).
- Audience (who is on the workshop sign-up list — age range, why they signed up, what they were expecting).
- Channel (WhatsApp group? email list? printed notice on a community board?).
- Tone (warm, apologetic, no corporate phrases).
- Constraints (under 100 words, name the new date and time, name the venue, give a contact for questions, no over-promising).
- Format (a single message, suitable for the channel you chose).

Save both outputs. Then write a one-paragraph analysis comparing them. Cover: which version you would actually send, what the no-context version got wrong or generic, and which one or two pieces of context did the most work in shifting the output. The point of this exercise is to feel — not just understand — how much context changes a result you might otherwise blame on the AI.

### Practice activity 4 — Constraint design drill (15-20 minutes)
For each of the three tasks below, add at least three well-chosen constraints to the prompt. For each constraint, write one short sentence explaining why you chose it — that is, what default behaviour it is preventing.

**Task 1.** Write a thank-you note to someone who interviewed you for a role last week.

**Task 2.** Draft a short note declining an invitation to speak at an event you cannot attend.

**Task 3.** Write a reminder message to a friend who borrowed money three weeks ago and has not paid it back.

A useful constraint usually does one of these things: shortens the output, removes a default phrase the AI overuses, prevents an over-promise, fixes the tone for the relationship, or adapts the language for the channel or culture. **Self-check:** if removing one of your constraints would not change the output, the constraint was decoration, not control. Replace it.

## Pause and check
Before moving on, ask yourself:

- Can I name the five T-C-C-F-A elements without looking, and give a one-sentence definition of each?
- Looking at a recent prompt I wrote in real life, can I name which element was missing or thinnest?
- Can I write a short, specific prompt for one task I do regularly — and predict, before I run it, what the output will and will not contain?

If any answer is no, return to the relevant teaching part. If all three are yes, move to the knowledge-to-output task.

## Knowledge-to-output task
Produce a *Before/After Prompt Rewrite* document covering one task you actually do — at work, in study, or in daily life. The document has four parts.

1. **Original weak prompt and output.** Paste in a real prompt you would have typed before this module, and the AI output it produced (or a realistic reconstruction if you have not used AI for this task before). Two to four sentences each.

2. **Two strengthened versions, each with a named weakness it addresses.** For each strengthened prompt, name which T-C-C-F-A element you strengthened and what default behaviour you were trying to prevent. Run both versions in your AI tool and paste the outputs.

3. **Reusable prompt contract template.** Build a short template you could reuse next time you do this task or a similar one. The template should have a labelled slot for each T-C-C-F-A element you found important for this task — not necessarily all five. Mark the slots that are *task-specific* (change every time) versus the slots that are *stable defaults* (carry over from one use to the next). Length: roughly half a page.

4. **One-paragraph reflection.** Write 100-150 words covering: which element made the biggest difference for this task, where you noticed the AI defaulting to something generic, and one thing you would change about your prompt next time even though the output already looks acceptable. The reflection is part of the artifact, not optional.
