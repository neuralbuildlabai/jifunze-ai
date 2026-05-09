# Prompt Engineering Fundamentals — Learner Workbook

Four hands-on practice tasks. Each takes 10–15 minutes. You only need a chat-based AI assistant (ChatGPT, Claude, Gemini, or similar) — no coding or API setup required.

By the end of this workbook, you'll have a starter prompt library of four production-quality prompts you wrote yourself.

---

## How to use this workbook

For each task:

1. **Read the scenario.**
2. **Write a "first-attempt" prompt** the way you would have before this course. Save it.
3. **Apply the principles + techniques** indicated to write an "improved" prompt.
4. **Run both prompts** in your AI tool and compare the responses.
5. **Self-check** against the rubric at the end of each task.
6. **Save your improved prompt** to the prompt library at the bottom of this file.

If you have a partner or cohort, swap improved prompts and rubric-grade each other's.

---

## Task 1 — Apply the five core principles

**Scenario.** Your manager is launching a 10-week internal mentorship program for first-year hires at a mid-sized company. She asks you to "send something out to managers explaining it."

**Your job:** write a prompt that gets the AI to produce an internal email *good enough to send with light edits.*

**Apply:** Clarity, Context, Structure, Constraints, Examples (you may not need all five — pick deliberately).

**Rubric — your improved prompt should specify:**

- [ ] **Clarity:** the exact deliverable (email, not a brochure), audience, and call-to-action.
- [ ] **Context:** what the program is, who it's for, and your role.
- [ ] **Structure:** what sections the email needs (e.g., intro, what managers do, deadline).
- [ ] **Constraints:** word count and tone.
- [ ] **Examples or none:** include a brand-voice sample only if your company has one — otherwise skip.

If your improved prompt hits 4 of 5 boxes deliberately, you've passed Task 1.

---

## Task 2 — Few-shot a custom format

**Scenario.** You have a backlog of customer support tickets. You want the AI to read each ticket and output a one-line triage tag in this exact format:

```
[Severity: low|med|high] [Category: billing|bug|feature-request|other] — <one-line summary>
```

**Your job:** write a few-shot prompt that produces this format reliably across new tickets you haven't shown it.

**Apply:** Few-shot prompting (Technique 2).

**Rubric:**

- [ ] You provided **at least 3 labeled examples** before asking for the new triage.
- [ ] Your examples cover **different severities and categories** (don't show three "high billing" tickets).
- [ ] Examples are **consistently labeled** — if review #1 is "med" then a similarly-toned example shouldn't be "high."
- [ ] The new ticket at the bottom of your prompt clearly invites the model to follow the pattern.
- [ ] You ran the prompt on **3 different new tickets** and the format held.

---

## Task 3 — Chain-of-thought + role for a hard reasoning task

**Scenario.** You're a small-business owner trying to decide between two payroll providers, A and B. Provider A charges $39/month + $6/employee. Provider B charges $0/month + $9/employee, but includes a $150 setup fee waived after 6 months. You have 8 employees and expect to grow to 15 within a year.

**Your job:** write a prompt that gets the AI to recommend the cheaper provider over a 12-month horizon, with its math visible so you can sanity-check it.

**Apply:** Role prompting (Technique 4) + Chain-of-thought (Technique 3).

**Rubric:**

- [ ] The prompt assigns a **specific, useful role** (e.g., "small-business CFO" — not just "expert").
- [ ] The prompt includes the **chain-of-thought trigger** ("Let's think step by step" or equivalent).
- [ ] You explicitly asked for the **math to be shown** for both providers across the year.
- [ ] You asked for a **final recommendation with the dollar difference**.
- [ ] You **manually verified** the AI's arithmetic — did it actually compute the right monthly totals? (This is the point of CoT: it lets you check the work.)

---

## Task 4 — Iterate on a creative brief

**Scenario.** You're naming a new line of organic skincare products. You want 10 candidate names that feel premium, nature-inspired, easy to pronounce, and ideally available as .com domains.

**Your job:** start with a basic prompt, then *iteratively refine* it across at least 3 turns until you have 10 names you'd actually consider.

**Apply:** Iterative Refinement (Technique 5) + optionally Meta Prompting (have the AI propose a better prompt for you).

**Rubric:**

- [ ] You wrote a **basic prompt** first and saved the response.
- [ ] You issued **at least 2 refinement turns** with specific feedback ("more playful," "drop any with -ology," "shorter").
- [ ] Each refinement was **specific, not vague** — "make it better" doesn't count.
- [ ] (Optional) You used meta-prompting at some point: asked the AI to propose a better version of your own prompt.
- [ ] You ended with **10 names you'd actually consider showing a designer**.

---

## Common-pitfall self-check

Across all four tasks, check yourself against the five pitfalls from the video:

- [ ] **Vagueness** — every prompt names the deliverable, audience, and constraints.
- [ ] **Assumed context** — you never asked the AI to "fix this" or "improve this" without giving it the actual content.
- [ ] **Ignored format** — every prompt that needs a specific format states it explicitly.
- [ ] **No iteration** — you treated at least one prompt as a starting point, not a final answer.
- [ ] **Overcomplication** — your prompts are as long as they need to be and no longer.

---

## Your prompt library

Save your **improved** prompts here. This is the artifact you keep from the course — re-use, tweak, and grow it over time.

### Prompt 1 — Internal email generator

```
<paste your improved prompt from Task 1 here>
```

**Notes / when to reuse:** ____

---

### Prompt 2 — Support ticket triager

```
<paste your improved few-shot prompt from Task 2 here>
```

**Notes / when to reuse:** ____

---

### Prompt 3 — Decision analyst with shown math

```
<paste your improved prompt from Task 3 here>
```

**Notes / when to reuse:** ____

---

### Prompt 4 — Creative naming brief

```
<paste your final refined prompt from Task 4 here>
```

**Notes / when to reuse:** ____

---

## What to do with this workbook

When all four tasks are complete and you've passed the rubric self-checks:

1. Save this file (it's now your starter prompt library).
2. Take `quiz.md` if you haven't already.
3. Move on to the **AI Agents** course — you're ready.

If a task felt hard, that's a signal — re-watch the corresponding section of the video and try the task again. The point isn't to complete the workbook quickly; it's to leave with prompts you'll actually use.
