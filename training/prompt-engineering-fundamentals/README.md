# Prompt Engineering Fundamentals — 30 Minutes

A 30-minute Jifunze.ai course on prompt engineering for large language models. Covers core principles, eight techniques, and advanced patterns. No coding required to complete the course; an optional code track is available for learners who want to run the demos themselves. Designed as the prerequisite for the AI Agents series.

## Folder layout

```
prompt-engineering-fundamentals/
├── README.md                   # this file — start here
├── script.md                   # 30-minute narration script
├── production-guide.md         # recording + editing checklist (canonical timing table)
├── quiz.md                     # 12-question knowledge check with answer key
├── learner-workbook.md         # hands-on practice tasks (no code required)
├── facilitator-notes.md        # delivery notes for live cohorts
├── slides/
│   └── index.html              # 22-slide deck (open in browser, arrow keys to navigate)
└── examples/                   # OPTIONAL code track
    ├── README.md               # how to run the Python demos
    ├── requirements.txt
    ├── .env.example            # copy to .env, add your key
    ├── 01_basic_prompts.py     # 5 core principles
    └── 02_advanced_techniques.py  # 8 techniques + temperature
```

## Video structure (30 minutes)

| Section | Time | Content |
|---|---|---|
| Introduction | 0:00–3:00 | What prompt engineering is and why it matters |
| Core Principles | 3:00–10:00 | Clarity, Context, Structure, Constraints, Examples |
| Techniques | 10:00–22:00 | Zero-shot, Few-shot, Chain-of-Thought, Role, Iterative, Template, Negative, Comparative |
| Advanced Patterns | 22:00–27:00 | System vs User, Parameter Tuning, Chaining, Meta Prompting |
| Best Practices | 27:00–30:00 | Common pitfalls, testing, checklist, closing |

The full slide-to-time table lives in `production-guide.md` and is the source of truth.

## Target audience

Anyone who works with AI tools — product managers, marketers, operators, founders, and developers new to LLMs. The course is designed to be accessible without coding background; the techniques work the same whether you're typing into ChatGPT, Claude, or calling an API.

## Learner outcomes

By the end of this course, learners will be able to:

1. Diagnose why a vague or poorly-structured prompt produced a weak response.
2. Apply the five core principles — Clarity, Context, Structure, Constraints, Examples — to rewrite a weak prompt into a strong one.
3. Choose deliberately between zero-shot, few-shot, chain-of-thought, role, iterative, template, negative, and comparative prompting depending on the task.
4. Use advanced patterns — system prompts, temperature tuning, prompt chaining, and meta-prompting — for production or multi-step work.
5. Avoid the five most common prompt-engineering pitfalls.
6. Run a simple test-and-iterate loop on their own prompts.

## Prerequisites

**Required:** A working understanding of what a large language model is, and access to any chat-based AI assistant (ChatGPT, Claude, Gemini, or similar) for the workbook exercises.

**Optional (code track only):** Python 3.10+ and an OpenAI API key. See `examples/README.md`. The video and workbook are complete without this.

## Completion outcome

A learner who completes this course will have:

- Watched the 30-minute video.
- Passed the `quiz.md` knowledge check (target: 9 of 12 correct).
- Completed the four practice tasks in `learner-workbook.md`.
- A starter prompt library of their own well-formed prompts (built during the workbook).

That bundle is what Jifunze should record as the certification artifact.

## Recording quickstart (for facilitators / producers)

1. Read `facilitator-notes.md` for delivery notes.
2. Open `slides/index.html` in a browser, full-screen, arrow keys to navigate.
3. Practice once through `script.md` with a stopwatch — target ~4,500 words at 150 wpm; current draft is ~3,300 words, leaving headroom for live demos and pauses.
4. Run `examples/01_basic_prompts.py --auto` and `examples/02_advanced_techniques.py --auto` once to verify API access and capture backup outputs.
5. Follow `production-guide.md` for recording sessions, export settings, and post-production checklist.

## Next course

This is the prerequisite for the **AI Agents series** (`../ai-agents-series/`).
