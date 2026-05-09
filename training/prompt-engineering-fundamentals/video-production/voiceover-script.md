# Voiceover Script — Prompt Engineering Fundamentals

Six sessions, written for natural narration at **130–145 words per minute** (target: 140 wpm). Total runtime ≈ 30 minutes.

## Voice direction

Warm, clear, confident, instructional. **Not** hype-heavy ("amazing!", "incredible!"). **Not** robotic or stiff. **Not** corporate. The narrator sounds like a knowledgeable friend who's done this work, not a marketer. Contractions throughout. Short sentences mixed with longer ones. Strategic pauses noted with **[pause]** — these are 0.4–0.8 seconds, not awkward silences. Em-dashes signal a thought-shift; the reader can lean on them.

## Reading conventions

- **[SLIDE: N — Title]** — switch to that slide.
- **[pause]** — half-beat pause. Don't say it; just leave the air.
- **[demo opt: …]** — optional live demo cue for the producer. Skip if recording solo.
- *italics* — light vocal emphasis, not heavy.
- All numbers under 100 are spelled out for the narrator (e.g., "twenty-two slides", "forty percent") to avoid TTS misreading; you can revert when reading live.

---

## SESSION 1 — What Prompt Engineering Is and Why It Matters

**Target:** 4:30 · **Slides:** 1, 2, 3 · **Word count target:** ~620

[SLIDE: 1 — Title]

Welcome to Prompt Engineering Fundamentals. I'm glad you're here.

Over the next thirty minutes, you'll learn how to talk to AI models in a way that actually gets you what you want. We'll cover five core principles, eight practical techniques, four advanced patterns, and the most common mistakes — so you don't have to make them yourself.

If you've ever asked ChatGPT, or Claude, or Gemini something — and gotten back an answer that was *fine*, but not quite right — this course is for you. The interesting thing is, the same model that gave you that mediocre answer is capable of giving you something genuinely useful. The model didn't change. The prompt did. [pause]

[SLIDE: 2 — What is Prompt Engineering?]

So let's start with a definition. Prompt engineering is the craft of writing inputs — prompts — that guide AI language models to produce the output you actually need.

I want you to think of it less as coding, and more as learning to brief somebody well. If you've ever managed a contractor, or onboarded a new hire, you already know this skill. The clearer your brief — the more context, the more specific the deliverable — the better the work that comes back. Same idea, different audience.

Why does it matter? Three things, mainly.

First — a well-written prompt saves you time. You stop going back and forth, asking the AI to redo something, because you got it right the first time.

Second — it produces results that actually fit your context. Your audience. Your tone. Your constraints. The prompt is the part where your specific situation gets translated into something the model can act on.

And third — and this is the one most people miss — it unlocks capabilities the model already has, but that you'd never see if you ask it the wrong way. The model knows more than your average prompt is asking it to do. [pause]

[SLIDE: 3 — The Power of Good Prompts]

Let me show you what this looks like.

Imagine I ask the AI to "write about dogs." That's it. Three words. What I'll get back is technically about dogs. But it'll be generic. Broad. Mostly useless if I had a real reason for asking.

Now compare that to: "Write a 200-word article explaining why dogs make excellent therapy animals for children with autism. Include specific behavioral traits, and cite recent research." [pause]

Same model. Same response time. Wildly different output. The second prompt got me a focused piece of writing I could actually publish — or at least edit lightly and publish.

What's the difference? Three things, really. *Clarity* — about what I want. *Specificity* — the details that matter. And *structure* — the way I framed it. Those three ideas underpin everything else in this course.

Here's what to expect from the rest of the videos. Sessions two and three give you the foundation — five principles, then seven of the eight techniques. Session four covers refinement — the eighth technique plus four advanced patterns you'll use for production work. Session five covers the mistakes everyone makes, plus three habits for safer prompting. And session six wraps up with the quiz, the workbook, and what to take with you.

Quick note before we dive in: you don't need to know how to code to follow this course. Every technique we'll cover works in any chat-based AI tool — ChatGPT, Claude, Gemini, the works. There is an optional code track, if you want to try them through an API — but it's just that. Optional. The real skill lives in the prompt itself, and the prompt is the same whether you type it into a chat box or send it through a script.

The companion workbook has four hands-on practice tasks. You'll get the most out of this course if you treat the videos as the *what*, and the workbook as the *how*. Pause where you need to, run your own examples in your AI tool of choice, and build up a prompt library you'll actually use later.

Alright. In the next session, we'll cover the five core principles that make any prompt better. Let's go.

---

## SESSION 2 — The Five Core Prompt Principles

**Target:** 6:30 · **Slides:** 4, 5, 6, 7, 8 · **Word count target:** ~895

[SLIDE: 4 — 5 Core Principles]

Five principles. They're not magic, and they're not new. They're the same five things that make any kind of communication work — but stated explicitly, because the AI won't fill in gaps the way a human collaborator does.

Clarity. Context. Structure. Constraints. Examples.

We'll go through each with a quick before-and-after, and you'll start to see the pattern. Once you internalize these five, almost every prompt-engineering technique will feel like a small twist on one of them. [pause]

[SLIDE: 5 — Clarity]

Principle one — clarity. Be specific.

Watch what happens when I ask: "Help me with my email."

That's not a prompt. That's the *opening line* of a conversation I haven't had yet. The AI doesn't know what email, who it's to, what tone, what outcome I want. So it's going to guess. And guess wrong.

Now look at this version: "Write a professional email to my client apologizing for a delayed project delivery. The delay was due to unexpected technical issues. Maintain a positive tone, and propose a new deadline of next Friday."

What changed? I named the type of content. The recipient. The purpose. The reason. The tone. And the action I want. That's six pieces of information I added — and the result will be six times more useful.

There's a quick mental check I use for clarity. Read your prompt out loud. If a contractor could deliver three completely different things and all of them would technically match what you wrote, the prompt isn't clear yet. Add the next constraint until only one shape of answer makes sense.

The takeaway is simple: never assume the AI knows your context. State it. [pause]

[SLIDE: 6 — Context]

Principle two — context.

Where clarity is about *what* you want, context is about *why* it matters and *who* it's for.

Compare these two prompts. First: "Explain quantum computing." The AI gives you a wall of physics jargon — and depending on the model, it may be technically accurate but completely useless to your audience.

Now: "I'm a high school teacher preparing a lesson for tenth graders, who have basic knowledge of atoms and electricity. Explain quantum computing using simple analogies they can relate to. Keep it under three hundred words."

Context tells the AI five things. Your *role* — teacher. Your *audience* — tenth graders. Their *knowledge level* — basic physics. The *desired approach* — analogies. And the *constraints* — under three hundred words.

Think of context as setting the stage. The more relevant detail you give, the better the performance. And by *relevant*, I do mean relevant — don't pad your prompts with unnecessary backstory. Quality of context, not quantity. A two-sentence context line that actually tells the model who's reading and what they need is worth ten sentences of generic preamble. [pause]

[SLIDE: 7 — Structure]

Principle three — structure.

How you organize your prompt directly shapes the output. If you ask for a business plan in a single run-on sentence, you'll get a single run-on response. If you ask for one with named sections and lengths, you'll get something that looks like a real document.

Watch this. The unstructured version: "I need a business plan for a coffee shop with financial projections and marketing strategy and competitive analysis."

The AI knows roughly what you want, but it has no scaffolding to hang the answer on.

Now the structured version. I'm asking for the same thing — but I'm naming each section, listing the subsections under it, giving target word counts, and specifying bullet-point format. The AI now has a template to fill in, and the response comes back organized exactly like I asked.

Rule of thumb — structure your prompt the way you'd want the output structured. If you want headers, use headers in the prompt. If you want a numbered list of five things, ask for a numbered list of five things. The shape of the prompt teaches the model the shape of the answer. [pause]

[SLIDE: 8 — Constraints and Examples]

Two principles in this slide, because they pair naturally.

Principle four — constraints.

Constraints don't limit creativity. They focus it. A prompt that says "write a story" gives you something generic. A prompt that says "write a 500-word science fiction story about a robot learning to paint, suitable for ages 8 to 12, with a positive message about creativity" — that prompt gives you a much better story. The constraints aren't shackles. They're a frame.

Useful constraints to remember: length, tone, format, audience, and style. Pick the ones that matter for your task. You don't need all five every time — but pick deliberately.

Principle five — examples.

When telling the AI what you want is hard, *showing* it is easier. If you've got a brand voice, paste in a sample. If you want a specific output format, demonstrate it once. If you want a tone you can't quite describe in words, give the AI a paragraph that *has* that tone. The model is incredibly good at pattern matching — give it one good pattern, and it will follow it.

One good example often beats a thousand words of instruction. And — small but useful — the example you provide doesn't have to be perfect. It just has to be in the direction you want. The AI will smooth out the rest.

[demo opt: run the "Help me with my email" prompt vs the structured version live in any chat tool — about thirty seconds, side by side]

That's all five. Clarity. Context. Structure. Constraints. Examples. You'll see them woven through every technique we cover next.

If you want to start applying them right now, open the learner workbook and start Task 1 — it's a real-world internal email scenario that uses all five. Or keep watching, and come back to it.

In the next session, we'll layer eight practical techniques on top of these foundations. Let's go.

---

## SESSION 3 — Practical Prompting Techniques

**Target:** 7:30 · **Slides:** 9, 10, 11, 12, 13 · **Word count target:** ~1,030

[SLIDE: 9 — 8 Essential Techniques]

So far we've covered the five principles. They're how you write *any* prompt well. Now let's add specific techniques — patterns you'll reach for depending on the task.

Eight in total. We'll cover seven in this session. The eighth — comparative prompting — fits better with the advanced patterns in the next session, so I'll save it.

Quick map. Zero-shot. Few-shot. Chain-of-thought. Role prompting. Iterative refinement. Template prompting. Negative prompting. And in Session 4, comparative.

Don't worry about memorizing all eight names. The names matter less than knowing when to reach for which one. By the end of the workbook, you'll have used most of them naturally. [pause]

[SLIDE: 10 — Zero-Shot vs Few-Shot]

Let's start with the two most common — zero-shot and few-shot.

Zero-shot is what you've probably been doing already. You ask the AI to do a task, without showing it any examples. "Translate this English text to French." That's zero-shot. The AI relies entirely on what it learned during training.

It works for simple, common tasks. Translation. Summarization. Quick questions. The trade-off is that you have less control over format and style — and for unusual tasks, results can be inconsistent.

Few-shot is when you give the AI two or three examples *before* the actual task. And honestly — it's the highest-payoff technique you can learn.

Watch this. I want the AI to convert customer reviews into a number from 1 to 5. So I show it three examples first.

[demo: read the few-shot prompt aloud, slowly]

"Review: 'This product exceeded my expectations.' Sentiment: 5.
Review: 'It's okay, nothing special.' Sentiment: 3.
Review: 'Terrible quality, broke after one use.' Sentiment: 1."

And then I add the new review I actually want scored. The AI follows the pattern. It doesn't just understand what I want — it *sees* what I want.

Few-shot is your tool when you need consistent format, custom style, or domain-specific output. Two or three examples is usually enough. You don't need ten. And one tip — make sure your examples are *consistently labeled*. If your "5" examples and your "4" examples sound similar, the model will get confused. Be deliberate. [pause]

[SLIDE: 11 — Chain-of-Thought]

Technique three — chain-of-thought.

This one's almost magical. Ask the AI a multi-step reasoning problem, and add the words "Let's think step by step" — and the accuracy goes up. Sometimes dramatically.

Here's a math problem. "If a store has 15 apples, and sells 40 percent of them, then receives a shipment of 8 more apples — how many apples does it have?"

Without chain-of-thought, the AI might just guess. With chain-of-thought, it works through the steps. Starting count, fifteen. Sold, forty percent of fifteen — that's six. Remaining, nine. New shipment, eight. Total — seventeen.

The other thing chain-of-thought does — and this is just as valuable — it lets you *check* the work. If the AI made a mistake at step three, you can see it. You don't have to trust an opaque answer.

Use it for math, multi-step decisions, anything where you'd want to verify the logic. One thing to note — for genuinely simple tasks, chain-of-thought adds noise. Don't reach for it on a translation, or a one-line summary. Save it for when the reasoning matters. [pause]

[SLIDE: 12 — Role and Iterative]

Technique four — role prompting.

You can ask the AI to take on a specific persona, and the response shape will shift. "You are a blockchain expert with ten years of experience explaining complex concepts to business executives — explain blockchain, highlighting business value, avoiding jargon."

Compare that to just "explain blockchain". The role version comes back focused on outcomes, ROI, real-world deployment. The basic version comes back with cryptographic primitives.

Roles work because they activate the patterns the model has seen during training. Naming a role isn't magic — it's pattern matching. So be specific. "You are an expert" is too vague. "You are a senior pediatric nurse explaining a procedure to a worried parent" — that's a role that does work.

Technique five — iterative refinement.

This one's so simple it almost doesn't sound like a technique. After the AI gives you a response, don't start over. Build on it.

"Make it more playful, targeting millennials." "Tighten the second paragraph." "Now give me three variations with different opening lines."

Iteration is faster than rewriting. It builds on what's working. And it's how you'll do most of your real work — the first draft is a starting point, not a finish line. The discipline is in being specific about what to change. "Make it better" is wasted breath. "Cut the introduction and start with the second paragraph" — that the AI can act on. [pause]

[SLIDE: 13 — Template and Negative]

Two more techniques in this section.

Technique six — template prompting.

A template is just a structured prompt format you reuse. *Task. Context. Format. Constraints. Example.* You fill in the blanks each time.

The benefit isn't that templates make individual prompts better — it's that they make your *team* consistent. If five people on your team use the same template for product descriptions, you'll get five outputs that sound like they came from one brand. That's worth a lot.

Build a template for any task you do more than three times. The first version doesn't have to be perfect. It just has to be reusable.

Technique seven — negative prompting.

Negative prompting is when you tell the AI what *not* to do.

"Write a professional email. Do not use overly formal language. Do not include unnecessary apologies. Do not make promises we can't keep. Do not exceed 150 words."

It works because sometimes it's easier to say what you don't want than what you do. And when you've been frustrated by the same kind of bad output a few times, listing the failure modes upfront tells the AI exactly what to avoid. The trick is being specific. "Don't be boring" doesn't work. "Don't use the word 'leverage' or 'synergy'" — that works.

That's seven. In the next session, we'll wrap up the eighth — comparative prompting — and stack on four advanced patterns: system prompts, temperature, prompt chaining, and meta prompting.

If you want to try few-shot right now, open Workbook Task 2 — the support ticket triager. It's the highest-reward exercise in the workbook. Try it before moving on.

---

## SESSION 4 — Compare, Refine, and Improve Outputs

**Target:** 5:30 · **Slides:** 14, 15, 16, 17, 18 · **Word count target:** ~755

[SLIDE: 14 — Comparative Prompting]

The eighth technique is comparative prompting. Use it when you want options, not a single answer.

Two main shapes. First — *compare*. "Compare Python and JavaScript for building a web scraper. Create a table covering ease of learning, library support, performance, and best use cases." The AI gives you a side-by-side that helps you decide.

Second — *variations*. "Write three versions of this headline. Professional and authoritative. Casual and friendly. Urgent and action-oriented." You get three drafts in one round, you pick the one that lands.

Comparative prompting is your tool for A/B testing copy, surfacing trade-offs in decisions, exploring before you commit. It's a productivity multiplier — one prompt does the work of three. And once you start using it, you'll wonder why you ever asked for a single version. [pause]

[SLIDE: 15 — System vs User Prompts]

Now four advanced patterns. These are concepts you'll absorb gradually — don't worry about memorizing them this pass.

First — system prompts versus user prompts.

If you're using an API, or if your chat tool has a "custom instructions" or "personality" setting — that's a system prompt. It's persistent. It applies to every message in the conversation.

The user prompt is what you type each time.

Use the system prompt for stable behavior. "You are a coding assistant specialized in Python. You write clear, well-commented code. You always consider edge cases." That sets the room.

Then your user prompts handle the specific tasks. "Write a function to validate email addresses." "Now refactor it for readability."

The analogy I like — system prompts are hiring instructions. User prompts are daily tasks. You don't re-hire your assistant every morning. You give them the job description once, and after that you just hand them work. [pause]

[SLIDE: 16 — Temperature and Parameters]

Pattern two — temperature.

Temperature is a number, usually between zero and two, that controls how random the AI's output is.

Low temperature — say zero point two — gives you focused, deterministic, consistent answers. Use it for code, data extraction, anything factual.

Medium — around zero point seven — is the default for most tasks. Balanced.

High — north of one — gives you variety. Brainstorming, creative writing, ideation. Above one point two, output usually starts to degrade. So in practice, the useful range is zero to one point two.

Temperature isn't smarter or dumber. It's more or less random. Pick deliberately. There's a related parameter called top-p, sometimes called nucleus sampling — most of the time you can leave it alone and adjust temperature only. [pause]

[SLIDE: 17 — Prompt Chaining]

Pattern three — prompt chaining.

When a task is too complex for one prompt, break it into stages. Each stage uses the output of the previous one.

For a research report — first prompt, generate the outline. Second, take each section of the outline and pull the facts. Third, write the prose. Fourth, polish for flow.

The benefit isn't just better output — though it is better. The benefit is *debuggability*. If the report turns out wrong, you can look at each stage independently and find the failure point. Try fixing one giant prompt, and you'll spend an hour. Find the broken stage in a chain, and you'll fix it in five minutes. [pause]

[SLIDE: 18 — Meta Prompting]

Last pattern — meta prompting.

Meta prompting is when you ask the AI to help you write a better prompt. It sounds circular, but it works.

"I want to generate creative product names for organic skincare. Help me write a prompt that consistently produces 2-3 word names, nature-inspired, easy to pronounce. What prompt should I use?"

The AI will write you a stronger prompt than you'd have written yourself — because the AI has seen what good prompts in that domain look like. You're using it as a prompt engineering coach.

Three places to reach for meta prompting. When you're new to prompt engineering and want a starting point. When your existing prompt isn't quite working and you can't tell why. And when you're tackling a domain you don't normally work in.

[demo opt: ask any chat tool to "improve this prompt" and show the before/after — about forty-five seconds]

That's it for techniques and advanced patterns. Open Workbook Task 4 — iterating on a creative brief — to put refinement into practice.

In the next session, we'll cover the most common mistakes, plus three habits for safer prompting.

---

## SESSION 5 — Common Mistakes and Safer Prompting Habits

**Target:** 4:30 · **Slides:** 19, 20 · **Word count target:** ~625

[SLIDE: 19 — Common Pitfalls]

Five common mistakes. These come up over and over. If you can avoid them, your prompts will land in the top quartile of what most people produce.

One — being too vague. "Write something about marketing." That's not a prompt, that's a topic. Replace it with: "Write a 500-word blog post about email marketing best practices for small businesses, aimed at owners with no marketing background." Now the AI has a target it can actually hit.

Two — assuming context. "Fix this code." Where's the code? "Improve this paragraph." Which paragraph? You can't reference content the AI can't see. Always paste in the actual material you're asking it to work on. Or summarize it explicitly.

Three — ignoring format. If you don't say what shape you want the answer in, you'll get whatever shape the model defaults to. Specify: bullet points. Numbered list. Paragraphs. Table. Markdown headers. JSON. The format isn't an afterthought — it's part of the deliverable.

Four — not iterating. The first response is rarely the best one. Treat it as a draft. Refine. Tighten. Reroll a section. Iteration *is* the work — it's not extra effort, it's the actual job.

Five — overcomplicating. The opposite mistake. A 500-word prompt with thirteen constraints and four examples is harder to debug than a 100-word prompt that gets it right. Be concise but complete. Cut anything that doesn't earn its place. If you're not sure whether a sentence in your prompt is helping, delete it and see what happens. [pause]

[SLIDE: 20 — Best Practices Checklist]

The checklist on screen is the version you'll see in the workbook — before, during, after, and for production use. I want to add three more habits you won't see on the slide. These are about safety.

First — don't paste sensitive data into prompts. Customer names. Internal credentials. Unreleased pricing. Private documents. Personal health information. AI providers may use prompt content for evaluation or model improvement, depending on your plan and your settings. Treat your prompt like a public message until you've confirmed otherwise. If a prompt would be embarrassing to see leaked, find another way to do the task — strip identifying details, swap in fake data, or use a self-hosted model.

Second — verify factual claims. AI models hallucinate. Names, dates, statistics, citations, court cases, product specifications, version numbers — they can sound completely confident, and be completely wrong. Anything you'll put your name on, double-check from a primary source. The rule of thumb I use: if a customer or boss could ask "where did this come from?", you should know the answer before you hit send.

Third — be aware of where the model's expertise ends. Models are pattern matchers, not domain experts. They're great for first drafts, brainstorming, and structured tasks. They're *not* a substitute for legal advice, medical advice, financial decisions, or anything where being wrong has real consequences. The further you push outside common patterns, the more carefully you need to check the output. And for high-stakes domains, the model should be a research assistant — not the decision-maker.

Those three habits — don't share sensitive data, verify factual claims, know the model's edges — are how working prompt engineers stay out of trouble.

Pair them with the technique playbook from earlier sessions, and you've got a workflow you can trust.

In the final session, we'll wrap up — quiz, workbook, and what comes next.

---

## SESSION 6 — Quiz, Workbook, and Prompt Library Completion

**Target:** 3:30 · **Slides:** 21, 22 · **Word count target:** ~485

[SLIDE: 21 — Key Takeaways]

Quick recap before we wrap.

The five core principles — clarity, context, structure, constraints, examples. They're the foundation. Every technique we covered builds on them.

The eight techniques — zero-shot, few-shot, chain-of-thought, role prompting, iterative refinement, template, negative prompting, comparative. Each one fits a specific kind of task. Pick the right one, and your prompts get noticeably better.

The four advanced patterns — system prompts, temperature, prompt chaining, meta prompting. These are how production work gets done — when you've moved past one-off questions and you're building real workflows.

And the practice loop — write, test, iterate, document. The skill isn't memorizing techniques. It's noticing when a prompt isn't quite right, and knowing how to fix it. [pause]

[SLIDE: 22 — Thank You]

Three things to do before you call this course complete.

First — take the quiz. It's in the course folder, called *quiz.md*. Twelve questions, ten minutes, answer key included. Score yourself honestly. Nine out of twelve is the pass mark. If you fall short on a section, re-watch the corresponding video and try again — it's not a graded exam, it's a calibration check.

Second — work through the learner workbook. Four practice tasks, each takes about ten to fifteen minutes. The first is an internal email — a perfect first run at applying all five principles. The second is a few-shot triage exercise. The third is a chain-of-thought decision problem. The fourth is iterative refinement on a creative brief. Each task ends with a rubric you can check yourself against.

When you're done, you'll have something I want you to keep — a starter prompt library. Four prompts you actually wrote, that solve real problems, that you can keep tweaking and reusing. That library is the artifact of this course. It's worth more than any certificate.

Third — when you're ready, the next course is *AI Agents*. That's where we take everything you just learned and use it to build systems that don't just respond to prompts — they plan, they take actions, and they run real workflows. Prompt engineering is the foundation. Agents are what you build on top.

One last thing. The skill you've started building today only deepens with practice. Every prompt you write from here on is a chance to use one of these techniques deliberately. Notice when you reach for chain-of-thought. Notice when few-shot would have saved you a back-and-forth. The point of the workbook isn't to pass a test — it's to build the muscle.

Thanks for watching. Now go write some prompts.

---

## End-of-script word count summary

After the rewrite, target totals at 140 wpm:

| Session | Target words | Drafted | Minutes @140 wpm | Minutes @130 wpm |
|---|---|---|---|---|
| 1 | 620 | ~620 | 4:26 | 4:46 |
| 2 | 895 | ~895 | 6:24 | 6:53 |
| 3 | 1,030 | ~1,030 | 7:21 | 7:55 |
| 4 | 755 | ~755 | 5:24 | 5:48 |
| 5 | 625 | ~625 | 4:28 | 4:48 |
| 6 | 485 | ~485 | 3:28 | 3:43 |
| **Total** | **4,410** | **~4,410** | **31:31** | **33:54** |

A 31:30 raw recording trims to ~30:00 cleanly during editing (cleaning ums, tightening pauses, transition clipping). If your narrator runs slower at 130 wpm, expect ~33:54 raw → ~32:00 final cut — still acceptable for a course advertised as 30-minute.

Word counts above are estimates from the writer; run `wc -w` on the actual stripped narration during the recording rehearsal to confirm.
