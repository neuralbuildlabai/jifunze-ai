# Episode 1 — Intro to AI Agents

A 30-minute working introduction to AI agents. By the end of this episode you have a single-tool agent running locally, with a real system prompt, JSON Schema tool definitions, and an iteration cap.

## What you'll build

Three small Python files, each one strictly more capable than the last:

1. `01_first_tool.py` — the smallest possible tool, just to make the abstraction concrete.
2. `02_simple_agent.py` — a real agent class with a system prompt, ReAct loop, and JSON Schema tool definitions.
3. `03_streaming_agent.py` — the same agent with streamed output and a per-call token cap.

Total run time on a fast laptop: about 15 seconds across the three demos. Total cost using `gpt-4o-mini`: less than $0.01.

## Prerequisites

- Python 3.10+ (3.11 recommended)
- An OpenAI API key with credits
- A terminal you're comfortable in
- Familiarity with basic Python (functions, classes, dictionaries)

You do **not** need any prior agent or LLM experience.

## Setup

```bash
cd 01-intro
python -m venv .venv
source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example .env
# edit .env and paste your OPENAI_API_KEY
```

## Run

```bash
# 1 — see what a tool looks like on its own
python code/01_first_tool.py

# 2 — see the full agent loop with one tool
python code/02_simple_agent.py

# 3 — same agent, but with streamed output
python code/03_streaming_agent.py
```

Each script prints a banner at the top so you know which demo you're watching.

## What's in the code (and why it matters)

**System prompts.** Every agent in this episode has a system prompt — a short paragraph telling the model what role it plays and what it should refuse. This is the highest-leverage line in any agent codebase. Skip it and your agent will hallucinate its own personality.

**JSON Schema tool definitions.** The `Tool` class accepts an explicit `parameters_schema`. The model knows whether `expression` is a string and whether it's required. Without this, the LLM guesses, and the wrong guesses are hard to debug.

**Iteration and token caps.** The agent has a `max_iterations` ceiling and a `max_completion_tokens` per-call cap. Hitting either returns gracefully rather than burning money in a loop.

**No raw `eval()` on user strings.** The calculator uses `ast.parse`, an allowlist of node types, `compile`, then `eval()` on that bytecode only — not `ast.literal_eval` (which cannot do general arithmetic). Unconstrained `eval()` on user input belongs in production code about as much as bare `pickle.loads`.

**Failure walkthrough.** `02_simple_agent.py` prints a deliberately wrong tool argument once, so you see how the model recovers.

## Exercises

Try these before watching Episode 2.

1. **Add a `read_file(path)` tool.** Restrict it to a sandbox directory. Have the agent summarise the README.
2. **Break the agent.** Ask it to compute something the calculator doesn't support (`sin(0.5)`). Watch the failure mode. Decide whether you want to (a) add a new tool or (b) extend the existing one.
3. **Switch the model** from `gpt-4o-mini` to `gpt-4o`. Run the same query. Compare the latency, the cost (visible in OpenAI's dashboard), and the answer quality. Decide which one is the right default for your real use case.

## Take-home for Episode 2

The agent in this episode has zero memory. Run it twice with related queries — it forgets everything between runs. Episode 2 fixes that with persistent vector memory and a real RAG pipeline.

## Troubleshooting

- **`AuthenticationError`** — your `OPENAI_API_KEY` isn't loaded. Verify with `python -c "import os; print(os.getenv('OPENAI_API_KEY'))"`.
- **`max_iterations`** reached — the agent is stuck in a loop. Re-read the system prompt; it's probably ambiguous.
- **The model says "I don't have a tool for that"** — your tool description isn't matching the model's interpretation of the user's request. Tighten the description.
- **The streaming demo prints all at once** — your terminal is buffering. Run with `python -u code/03_streaming_agent.py`.

## What this episode deliberately does NOT cover

- Long-term memory (Episode 2)
- RAG pipelines (Episode 2)
- Multi-agent systems (out of scope for the series)
- Prompt injection defense (Episode 3)
- Evaluation harnesses (Episode 3)
- Observability and cost tracking (Episode 3)

Keeping the intro narrow is deliberate.
