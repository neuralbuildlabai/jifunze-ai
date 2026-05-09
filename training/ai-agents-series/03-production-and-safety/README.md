# Episode 3 — Production & Safety

A 30-minute working introduction to taking the agent from a working demo to something you'd actually deploy. By the end of this episode you have a prompt-injection-aware agent, an evaluation harness with assertions, and structured logs you can audit after the fact.

## What you'll build

Three small Python files, each one strictly more capable than the last:

1. `01_prompt_injection_demo.py` — a deliberate prompt-injection attack against the Episode 2 agent, plus the system-prompt and tool-result hardening that defends against it.
2. `02_eval_harness.py` — a tiny evaluation framework that runs test cases against your agent, asserts on outputs, computes pass rates, and prints a regression-friendly summary.
3. `03_observability.py` — structured JSON logging of every model call and tool call, with cost tracking per run and schema validation of tool arguments.

Total run time on a fast laptop: about a minute across the three demos. Total cost using `gpt-4o-mini`: a few cents.

## Prerequisites

- Episode 2 completed (`03_memory_agent.py` runs, memory and RAG work).
- Python 3.11+ recommended.
- An OpenAI API key with credits.
- Familiarity with `pytest`-style assertions (helpful, not required).

## Setup

```bash
cd 03-production-and-safety
python -m venv .venv
source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example .env
```

## Run

```bash
# 1 — see prompt injection succeed and then defend against it
python code/01_prompt_injection_demo.py

# 2 — run a small eval harness with pass/fail summary
python code/02_eval_harness.py

# 3 — observe the same agent with structured logs and cost tracking
python code/03_observability.py
```

## What's in the code (and why it matters)

**Prompt injection is a real threat, demonstrated.** Most tutorials mention it in one bullet point. We actually run an attack: a malicious string sneaks into a tool result, the model follows it, and the agent leaks the conversation. Then we add the three defenses that block it: scoped system prompt, tool-result framing, and a content firewall.

**Eval harness with real assertions.** Test cases live in a JSON file. Each case lists a query, an expected behaviour (correct answer, correct tool used, refusal, etc.), and a scorer. The harness runs them all, summarises pass rates, and exits non-zero on regression — perfect for CI.

**Cost tracking.** Every model call logs prompt tokens, completion tokens, and a calculated cost. You see exactly how much each query cost. Surprises in cloud bills come from not measuring this; we measure.

**Structured logs.** JSON-line logs with stable keys for grep/jq pipelines: `event`, `model`, `tool`, `tokens`, `cost_usd`, `iteration`. Trace any run after the fact without rummaging through stdout.

**Schema validation at tool boundaries.** Tool argument JSON is validated against the `parameters_schema` from Episode 1 *before* the function is called. Bad arguments produce useful errors instead of stack traces.

**Anthropic comparison.** A 90-second appendix in the script that shows how the same defenses translate to Claude's tool-use API. Provider-portable, not OpenAI-specific.

## Exercises

These are the highest-value exercises in the series. If you skip them you don't really know how the production half works.

1. **Add a new test case to `eval_cases.json`** that the agent currently fails. Watch the eval harness flag it. Decide whether to fix the agent or update the test.
2. **Try a fresh prompt injection.** Pick a different malicious instruction. Does the defense from `01_prompt_injection_demo.py` catch it? If not, harden the system prompt and re-test.
3. **Write a Grafana / Datadog query** (or just a `jq` filter) over the JSON logs that finds: the most expensive single query, the slowest tool call, and queries that hit `max_iterations`. These are the three signals you actually want in production.

## Production checklist

The episode closes with a one-page checklist. The short version:

1. System prompt names scope and refuses out-of-scope.
2. Tool arguments validated against schema before function call.
3. Tool results never trusted; framed as data, not instruction.
4. `max_iterations` and `max_completion_tokens` always set.
5. Every model call logged with cost and latency.
6. Every tool call logged with arguments and result hash.
7. Eval harness runs on every PR, fails CI on regression.
8. Secrets in environment, not in code, not in logs.
9. Provider-agnostic Tool abstraction so you can swap models.
10. Manual review of any new tool that touches the file system, the network outside an allowlist, or any user data.

## Troubleshooting

- **Prompt injection demo doesn't reproduce** — the model variance is real. The injection works ~95% of the time on `gpt-4o-mini`. If your run doesn't reproduce, try `gpt-4o` (the model is harder to fool but the demo still works) or vary the attacker text.
- **Eval harness fails on a test you think should pass** — read the assertion. Many "wrong" outputs are actually right under a stricter spec.
- **Cost tracking shows zero** — pricing for new models drifts; update the `PRICING` dict in `03_observability.py` to match your account's pricing page.
- **Structured logs are noisy** — pipe through `jq -c '. | {event, tool, cost_usd}'` to keep just what you need.

## What this episode deliberately does NOT cover

- Distributed tracing across multiple services (use OpenTelemetry; that's an episode of its own).
- Streaming evaluation (real-time eval against streamed outputs).
- Fine-tuning models for safety (a different topic in the field).
- Red-teaming methodologies at scale (separate professional discipline).

This episode covers the production-and-safety basics that every deployed agent needs. The advanced topics above build on top of these basics.

## Where to go next

The series is complete. From here:

- **Apply this to your real codebase.** Pick one production agent. Add the eval harness first, the logs second, the prompt-injection defense third.
- **Evaluate frameworks.** With a working eval harness, you can credibly compare LangGraph, CrewAI, the OpenAI Assistants API, and the Anthropic Agent SDK. Don't pick before you measure.
- **Read the references in the script's appendix.** They're current as of the recording.
