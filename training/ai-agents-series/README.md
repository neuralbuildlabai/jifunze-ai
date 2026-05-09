# AI Agents — A Three-Part Training Series

A practical, beginner-to-intermediate video series on building real AI agents. Three episodes of about 30 minutes each, with working code, real failure modes, and current (2024–2025) tooling and models.

---

## Why three episodes instead of one

Agents are a deep enough topic that a single 30-minute video can either skim everything or teach one thing well. This series teaches three things well:

1. **Episode 1 — Intro.** What an agent actually is, the ReAct loop, tools, and a working agent in under 200 lines of Python.
2. **Episode 2 — Memory & RAG.** Why memory matters, how vector embeddings work, chunking strategies, and a real RAG pipeline plugged into your agent.
3. **Episode 3 — Production & Safety.** What changes when you go from demo to production: prompt injection, eval harnesses, observability, schema validation, and a live failure walkthrough.

Each episode produces a working artifact you can run yourself. By the end of the series, you have an agent with persistent memory, retrieval, evaluation, and basic safety controls.

---

## Audience and prerequisites

The series is designed to ramp:

| Episode | You need | You'll be able to |
|---|---|---|
| 1 — Intro | Basic Python; you've called an API before. | Build a single-tool agent with a ReAct loop. |
| 2 — Memory & RAG | Episode 1, plus a passing comfort with lists/dicts. | Build a RAG pipeline and plug it into the agent as a tool. |
| 3 — Production & Safety | Episode 2, plus willingness to run tests and read logs. | Add an eval harness, structured logs, and prompt-injection defenses. |

You do **not** need ML, vector-database, or distributed-systems experience.

---

## Repository layout

```
training/ai-agents-series/
├── README.md                          ← you are here
├── production-guide.md                ← shared video-production guide
│
├── 01-intro/
│   ├── README.md                      ← per-episode setup + run instructions
│   ├── script.md                      ← 30-minute video script with timing
│   ├── requirements.txt
│   └── code/
│       ├── 01_first_tool.py           ← the smallest possible tool
│       ├── 02_simple_agent.py         ← ReAct loop + system prompt + JSON Schema tools
│       └── 03_streaming_agent.py      ← same agent, streamed output + token caps
│
├── 02-memory-and-rag/
│   ├── README.md
│   ├── script.md
│   ├── requirements.txt
│   └── code/
│       ├── 01_persistent_memory.py    ← persistent ChromaDB, dedup, salience filter
│       ├── 02_rag_pipeline.py         ← chunk → embed → retrieve → answer
│       └── 03_memory_agent.py         ← agent + RAG-as-a-tool + recall filters
│
└── 03-production-and-safety/
    ├── README.md
    ├── script.md
    ├── requirements.txt
    └── code/
        ├── 01_prompt_injection_demo.py ← attacker text inside a tool result
        ├── 02_eval_harness.py          ← test cases + assertions on agent outputs
        └── 03_observability.py         ← structured logs, cost tracking, schema validation
```

Each `code/` folder is independently runnable. Episodes do not share Python state — only ideas.

---

## Models used

The series uses current (mid-2024 onward) defaults rather than the 2023-era `gpt-4` / `text-embedding-ada-002` pairing:

- **Reasoning models** — `gpt-4o-mini` for cheap loops, `gpt-4o` or `claude-3.5-sonnet` for harder reasoning.
- **Embeddings** — `text-embedding-3-small` (cheaper, better than `ada-002`).
- **Vector store** — ChromaDB with `PersistentClient` so memory survives between runs.

Provider lock-in is avoided where reasonable: the `Tool` abstraction in Episode 1 is portable, and Episode 3 includes a brief Anthropic comparison so viewers know there's a world beyond OpenAI.

---

## What makes this series different

This series was built in response to a specific review of an earlier 30-minute "AI Agents" tutorial. The key changes:

1. **Scope is honest.** One topic per episode, no rushing.
2. **Code does what the script claims.** Persistent memory actually persists. The system prompt actually exists. Tool parameters carry types.
3. **Failure modes are first-class.** Every episode shows the agent getting something wrong and how to recover.
4. **No unconstrained `eval()` on user input.** The calculator parses with `ast`, allowlists nodes, then evaluates the compiled tree (the usual pattern for safe arithmetic demos — not a blind `eval(expression)` and not `ast.literal_eval` for full expressions).
5. **Prompt injection is named, demoed, and defended against** — not buried in one bullet point.
6. **Models are current.** No mention of AutoGPT or BabyAGI as a "next step."
7. **Exercises and a quiz close each episode.** Passive viewing is not the goal.

---

## Quick start

```bash
# From the series root
cd 01-intro
python -m venv .venv
source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example .env       # (or create your own)

# Episode 1 — first tool
python code/01_first_tool.py

# Episode 1 — agent
python code/02_simple_agent.py
```

You will need an `OPENAI_API_KEY` in `.env`. Episodes 2 and 3 also work with `ANTHROPIC_API_KEY` if you prefer Claude.

---

## Suggested viewing path

For learners new to agents:

1. Watch Episode 1, then run `02_simple_agent.py` and break it (try a query the tools can't answer).
2. Watch Episode 2, then run `03_memory_agent.py` against a folder of your own notes.
3. Watch Episode 3, then port the eval harness to one of your own projects.

Each episode ends with a one-question take-home and a checklist. The take-homes connect to the next episode — by the end of the series you have shipped a small but honest agent.

---

## Troubleshooting

Common issues across the series live in each episode's README. The series-level rule of thumb:

- **`ModuleNotFoundError`** → you're in the wrong folder; `pip install -r requirements.txt` from inside the episode folder.
- **`AuthenticationError`** → check `.env`; quotes around the API key are usually the culprit.
- **Quiet hangs** → add a `max_iterations` cap; the agent is probably looping.
- **High bills** → use `gpt-4o-mini` for development; switch to `gpt-4o` only when reasoning quality is the bottleneck.

---

## License and attribution

Educational use. Code is intentionally minimal so you can lift pieces into your own projects. Share, fork, and improve.
