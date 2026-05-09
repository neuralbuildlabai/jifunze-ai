# Facilitator Notes — Prompt Engineering Fundamentals

For Jifunze.ai cohort facilitators delivering this course live (in-person, video call, or classroom). For pre-recording, see `production-guide.md` instead.

A 30-minute video expands to a **60–75 minute live session** when you add Q&A, live prompt demos, and the workbook walk-through. Plan accordingly.

---

## Suggested live session shape (75 min)

| Block | Time | What to do |
|---|---|---|
| Opening + framing | 5 min | Ask "what AI tool do you use weekly, and what frustrates you about it?" Anchor the course on their answers. |
| Sections 1–2 (Intro + Core Principles) | 15 min | Play the video or deliver the script live. Pause after slide 8 for one quick question round. |
| **Live demo break** | 5 min | Pick one bad/good prompt pair from slide 5 or 6. Run both prompts live in the chat tool everyone is using (ChatGPT or Claude). Let learners watch the difference. |
| Section 3 (Techniques) | 15 min | Cover all 8 techniques. Don't deep-dive each; the workbook will reinforce. |
| **Live demo break** | 5 min | Run the few-shot sentiment example from slide 10 live. Show how breaking the format (mis-labeling) breaks the model's output. |
| Section 4 (Advanced Patterns) | 8 min | Move quickly. The chaining and meta-prompting slides are where learners get curious — leave room for one question. |
| Section 5 (Pitfalls + Best Practices) | 5 min | Cover quickly; this is review territory. |
| Workbook kickoff | 12 min | Walk through Task 1 *together* — write the improved prompt as a class. This is the highest-value part of the session. |
| Q&A | 5 min | Open floor. |

---

## What learners typically ask, and how to answer

**"Does this work the same on Claude / Gemini / Llama / open-source models?"**
Yes — the principles transfer cleanly. Specific phrasing ("Let's think step by step") works on most modern models. Few-shot, chain-of-thought, and role prompting are model-agnostic. Where models differ is in *system-prompt support* (most have it now), *context window size*, and *temperature defaults*.

**"How do I know if my prompt is good without running it 50 times?"**
You don't need 50. Run it 3 times with different inputs that exercise the edge cases. If the format and tone hold across all 3, the prompt is reasonably stable. If it drifts, add few-shot examples or tighten the constraints.

**"What about prompt injection / jailbreaks?"**
Out of scope for this course — that's a security topic covered in the AI Agents series under tool-use safety. Acknowledge the question and point them forward.

**"Why does temperature go up to 2.0 if you're saying 1.2 is the practical max?"**
The API allows up to 2.0. Above ~1.2 the output usually degrades into incoherence on most models. The full range exists for research use cases (deliberate noise injection, sampling experiments). For practical work, stay 0.0–1.2.

**"Should I always use chain-of-thought?"**
No. CoT helps for math, multi-step logic, and decision-making with shown work. For simple tasks (translation, summarization, formatting) it adds noise and makes the response longer without helping. Use it when you'd want to *check* the reasoning.

**"What's the right length for a system prompt?"**
Concise but complete. 50–200 words for most production use cases. If your system prompt is over 500 words, you're probably trying to handle edge cases that should be in the user prompt or the application logic.

---

## Live demo failover

If your live API demo fails (rate limit, network, mistyped prompt):

- **Pre-tested backup outputs** are in `examples/` — both Python files have an `--auto` mode you can run before the session and screenshot the results.
- Treat a real failure as a teaching moment: "this is exactly why the production guide says to keep backup outputs."
- Don't retry more than twice live. Move on and circle back.

---

## Time-stretching and compressing

**If you have only 45 minutes:**
- Cut sections 4 (Advanced) to a single slide-flip mention. Tell learners to watch the video for those.
- Skip live demo #2 (few-shot). Keep demo #1.
- Workbook becomes homework, not in-session.

**If you have 90+ minutes:**
- Add a third live demo: chain-of-thought on the apple-store math problem from slide 11.
- Run **Workbook Task 3** (the payroll provider decision) together as a class — it's the most teaching-rich.
- Add 10 minutes of pair work where learners workshop each other's prompts.

---

## Accessibility and inclusion

- The slide deck uses purple-on-white text and red/green for bad/good comparisons. **For colorblind learners,** the ❌ and ✅ icons are intentional redundancy — make sure your screen-share resolution preserves them.
- The script is pitched at ~150 wpm in English. **For non-native English speakers in the room,** slow your live delivery to ~120 wpm and pause longer between principles.
- Avoid US-centric examples beyond what's already in the script (the dog/coffee-shop/sci-fi examples are broadly accessible). The payroll provider workbook task uses USD — flag that and let learners substitute their local currency.

---

## Common learner confusions to watch for

| Confusion | Where it shows up | How to address |
|---|---|---|
| "Few-shot means giving the model examples in a separate conversation." | Section 3 | Clarify: examples go *inside the same prompt*, before the new task. Show the structure on screen. |
| "System prompts are only for developers." | Section 4 | Most chat tools now expose a system prompt as "custom instructions" or "personality." Show one in the actual product they use. |
| "Higher temperature = smarter." | Section 4 | The opposite. Temperature controls randomness, not capability. |
| "Negative prompting is just adding 'don't do X' to any prompt." | Section 3 | Show a strong negative-prompt block (5+ specific things) vs a weak one ("don't be boring"). The discipline of being specific about what to avoid is the skill. |

---

## Post-session

- Post the **quiz** (`quiz.md`) and **workbook** (`learner-workbook.md`) links.
- Encourage learners to share their improved prompts from Task 1 in the cohort channel — peer review is the strongest reinforcement.
- Remind: the AI Agents course is the next step.
