# Prompt Engineering Fundamentals — Knowledge Check

12 questions covering the core principles, techniques, advanced patterns, and pitfalls from the video.

**Passing score:** 9 of 12 correct.
**Format:** Mostly multiple-choice; two short-answer questions at the end.
**Time:** 10 minutes.

Take the quiz once with the video closed, score yourself with the answer key, then revisit any sections where you got the question wrong.

---

## Section A — Core principles (Q1–Q5)

**1. Which of these is the strongest example of the *Clarity* principle?**

A. "Write something useful for my team."
B. "Help me with my project."
C. "Write a 200-word internal announcement to our 30-person engineering team about a planned 4-hour Friday-evening database migration. Tone: calm, factual."
D. "Make it good."

---

**2. The *Context* principle is mainly about telling the AI:**

A. The exact word count and format you want.
B. Your role, your audience, their knowledge level, and any constraints that matter.
C. What you do NOT want it to produce.
D. To show its reasoning step by step.

---

**3. You're asked to produce a business plan with several sections. Which prompt best applies the *Structure* principle?**

A. "Make me a business plan with everything I need."
B. "Write a business plan covering market, marketing, and money."
C. A numbered prompt that names each section, lists subsections, gives a target length per section, and specifies bullet-point format.
D. "Use markdown."

---

**4. True or false: Constraints (length, tone, audience, format) limit creativity and should be avoided when you want a creative response.**

A. True
B. False

---

**5. Which statement about the *Examples* principle is correct?**

A. Examples are only useful for technical prompts.
B. One well-chosen example can communicate style, tone, and structure faster than a long instruction.
C. The more examples you provide, the better — always.
D. Examples should always be hypothetical, never real.

---

## Section B — Techniques (Q6–Q9)

**6. You want the AI to convert customer reviews into a 1–5 sentiment score in a consistent format. Which technique fits best?**

A. Zero-shot
B. Few-shot
C. Negative prompting
D. Meta prompting

---

**7. Which phrase reliably triggers chain-of-thought reasoning?**

A. "Be smart about this."
B. "Let's think step by step."
C. "Use your knowledge."
D. "Be detailed."

---

**8. Role prompting works because:**

A. The AI literally hires the persona.
B. Naming a role activates relevant patterns the model has seen, shaping tone, vocabulary, and depth.
C. The model has hard-coded role personas it switches between.
D. It bypasses the model's safety guidelines.

---

**9. You want three different headlines — professional, casual, and urgent — for the same product launch. Which technique is the best fit?**

A. Negative prompting
B. Iterative refinement
C. Comparative prompting
D. Template prompting

---

## Section C — Advanced patterns and pitfalls (Q10–Q12)

**10. Which task is best served by a *low* temperature (0.0–0.3)?**

A. Brainstorming brand names
B. Generating creative story openings
C. Extracting structured data from a contract
D. Writing a poem

---

**11. *Prompt chaining* is most useful when:**

A. You want a single short answer.
B. The task is complex enough that breaking it into stages — outline, then draft, then polish — produces better quality than one giant prompt.
C. You want to limit the AI's vocabulary.
D. You're translating between languages.

---

**12. (Short answer.) The video lists five common pitfalls. Name any **three** of them in one line each, and for one of those three, write the *fix* in one sentence.**

> Write your answer here:

---

## Answer key

| # | Answer | Why |
|---|---|---|
| 1 | **C** | Specifies content type, audience size, duration, scope, and tone — clarity by every measure. The others are vague. |
| 2 | **B** | Context is the situational scaffolding: who you are, who you're writing for, what they know, what's bounded. |
| 3 | **C** | Structure mirrors the desired output: named sections, subsections, lengths, format. The others lack scaffolding. |
| 4 | **B (False)** | Constraints *focus* creativity. "Write a 500-word sci-fi story for ages 8–12 about a robot learning to paint" produces stronger creative output than "Write a story." |
| 5 | **B** | One well-chosen example beats paragraphs of instruction. Quality and relevance matter more than quantity, and real examples beat hypotheticals. |
| 6 | **B** | Few-shot — show 2–3 labeled review→score pairs and the model will follow the pattern reliably. Zero-shot would be inconsistent. |
| 7 | **B** | "Let's think step by step" (or close variants like "show your work") is the canonical chain-of-thought trigger. |
| 8 | **B** | Roles activate latent patterns. "You are a senior Python developer" shifts vocabulary, depth, and tone — but it's pattern-matching, not literal hiring. |
| 9 | **C** | Comparative prompting — explicitly ask for N versions with named tones in a single prompt. |
| 10 | **C** | Low temperature for factual, consistent tasks. Extraction from a contract demands consistency. The other three want creativity. |
| 11 | **B** | Chaining decomposes complex multi-stage work, so each step can be debugged and quality-checked independently. |
| 12 | **See below** | Any 3 of: being too vague; assuming context; ignoring format; not iterating; overcomplicating. Sample fix: *"Being too vague" → state the audience, length, and format up front.* |

---

## Self-scoring

- **11–12 correct:** Strong grasp. Move on to the workbook and then the AI Agents course.
- **9–10 correct:** Pass. Revisit any section where you missed a question.
- **7–8 correct:** Re-watch sections 2 and 3 (Core Principles and Techniques) before retaking.
- **6 or fewer:** Re-watch the full video. The workbook will reinforce the concepts.
