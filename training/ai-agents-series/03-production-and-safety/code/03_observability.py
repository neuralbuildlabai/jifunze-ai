"""
Episode 3 — File 3: Structured logging, cost tracking, and schema validation.

Run:
    python code/03_observability.py
    tail -f agent.log.jsonl | jq -c '. | {event, model, tool, cost_usd, latency_ms}'

What you'll learn:
- How to emit JSON-line logs with stable keys for grep/jq pipelines.
- How to track cost per run, per model call, and per tool call.
- How to validate tool arguments against their JSON Schema before calling the
  tool function, so bad arguments produce a useful error string.
- How to attach a stable run_id to every log line so you can reconstruct a
  single agent run from a busy log file.
"""

from __future__ import annotations

import ast
import json
import os
import sys
import time
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

from dotenv import load_dotenv
from jsonschema import ValidationError, validate
from openai import OpenAI


# ---------------------------------------------------------------------------
# Pricing — update from your account's pricing page when models change.
# ---------------------------------------------------------------------------

PRICING = {
    "gpt-4o-mini": {"in": 0.15 / 1_000_000, "out": 0.60 / 1_000_000},
    "gpt-4o":      {"in": 2.50 / 1_000_000, "out": 10.00 / 1_000_000},
}


def _cost(model: str, prompt_tokens: int, completion_tokens: int) -> float:
    p = PRICING.get(model)
    if not p:
        return 0.0
    return prompt_tokens * p["in"] + completion_tokens * p["out"]


# ---------------------------------------------------------------------------
# JSON-line logger.
#
# One file per process. Stable keys. Append-only. No locking — we accept that
# parallel writers may interleave; in practice you'd ship a per-process file
# and aggregate later.
# ---------------------------------------------------------------------------

LOG_PATH = Path(__file__).with_name("agent.log.jsonl")


def emit(event: dict) -> None:
    """Emit one event as a single JSON line."""
    event = {"ts": datetime.now(timezone.utc).isoformat(), **event}
    with LOG_PATH.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(event) + "\n")


# ---------------------------------------------------------------------------
# Tool abstraction with schema validation.
# ---------------------------------------------------------------------------

@dataclass
class Tool:
    name: str
    description: str
    parameters_schema: dict
    function: Callable[..., str]


def safe_call_tool(tool: Tool, raw_args: str, run_id: str) -> str:
    """Validate JSON args against the schema, then run the tool function.

    Errors are returned as strings so the agent loop can feed them back to
    the model rather than crashing.
    """
    try:
        args = json.loads(raw_args)
    except json.JSONDecodeError as exc:
        emit({"event": "tool_error", "run_id": run_id, "tool": tool.name, "error": f"invalid_json: {exc}"})
        return f"Invalid JSON arguments: {exc}"
    try:
        validate(args, tool.parameters_schema)
    except ValidationError as exc:
        emit({"event": "tool_error", "run_id": run_id, "tool": tool.name, "error": f"schema: {exc.message}"})
        return f"Schema validation failed: {exc.message}"
    try:
        return str(tool.function(**args))
    except Exception as exc:  # noqa: BLE001
        emit({"event": "tool_error", "run_id": run_id, "tool": tool.name, "error": f"runtime: {exc}"})
        return f"Error in tool {tool.name!r}: {exc}"


# ---------------------------------------------------------------------------
# Reused calculator + a deliberately strict search tool.
# ---------------------------------------------------------------------------

_ALLOWED_NODES = (
    ast.Expression, ast.BinOp, ast.UnaryOp, ast.Constant,
    ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Mod, ast.Pow, ast.FloorDiv,
    ast.USub, ast.UAdd,
)


def safe_calculate(expression: str) -> str:
    tree = ast.parse(expression, mode="eval")
    for node in ast.walk(tree):
        if not isinstance(node, _ALLOWED_NODES):
            raise ValueError(f"Disallowed expression: {type(node).__name__}.")
    return str(eval(compile(tree, "<calc>", "eval")))  # noqa: S307


def fake_search(query: str) -> str:
    if "embedding" in query.lower():
        return (
            "Embeddings are vectors of floats representing text. "
            "Cosine similarity is the standard distance metric. "
            "Dimensionality affects cost vs. recall."
        )
    return "no results found in the corpus."


CALCULATOR = Tool(
    name="calculate",
    description="Evaluate a basic arithmetic expression. Operators: + - * / // % **.",
    parameters_schema={
        "type": "object",
        "properties": {
            "expression": {"type": "string", "description": "A pure arithmetic expression."}
        },
        "required": ["expression"],
        "additionalProperties": False,
    },
    function=safe_calculate,
)

SEARCH = Tool(
    name="search_documents",
    description="Search the document corpus for information.",
    parameters_schema={
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "What to search for."}
        },
        "required": ["query"],
        "additionalProperties": False,
    },
    function=fake_search,
)


# ---------------------------------------------------------------------------
# Observable agent.
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = (
    "You are a careful research assistant. Use tools when helpful. "
    "Answer concisely. If the answer is not in the corpus, say so plainly."
)


@dataclass
class ObservableAgent:
    client: OpenAI
    tools: list[Tool]
    model: str = "gpt-4o-mini"
    max_iterations: int = 6
    max_completion_tokens: int = 300
    history: list[dict] = field(default_factory=list)

    def __post_init__(self) -> None:
        self.tools_by_name = {t.name: t for t in self.tools}
        self.history = [{"role": "system", "content": SYSTEM_PROMPT}]

    def _payload(self) -> list[dict]:
        return [{
            "type": "function",
            "function": {
                "name": t.name,
                "description": t.description,
                "parameters": t.parameters_schema,
            },
        } for t in self.tools]

    def run(self, user_query: str) -> str:
        run_id = uuid.uuid4().hex[:12]
        emit({
            "event": "run_started",
            "run_id": run_id,
            "model": self.model,
            "user_query_chars": len(user_query),
        })
        run_cost = 0.0
        run_start = time.time()

        self.history.append({"role": "user", "content": user_query})

        for iteration in range(1, self.max_iterations + 1):
            iter_start = time.time()
            response = self.client.chat.completions.create(
                model=self.model,
                messages=self.history,
                tools=self._payload(),
                tool_choice="auto",
                max_completion_tokens=self.max_completion_tokens,
            )
            latency_ms = int((time.time() - iter_start) * 1000)
            usage = response.usage
            call_cost = _cost(self.model, usage.prompt_tokens, usage.completion_tokens) if usage else 0.0
            run_cost += call_cost

            emit({
                "event": "model_call",
                "run_id": run_id,
                "iteration": iteration,
                "model": self.model,
                "tokens_in": usage.prompt_tokens if usage else 0,
                "tokens_out": usage.completion_tokens if usage else 0,
                "cost_usd": round(call_cost, 6),
                "latency_ms": latency_ms,
            })

            message = response.choices[0].message
            self.history.append({
                "role": "assistant",
                "content": message.content,
                "tool_calls": [
                    {
                        "id": tc.id, "type": "function",
                        "function": {"name": tc.function.name, "arguments": tc.function.arguments},
                    }
                    for tc in (message.tool_calls or [])
                ],
            })

            if not message.tool_calls:
                emit({
                    "event": "run_finished",
                    "run_id": run_id,
                    "iterations": iteration,
                    "cost_usd": round(run_cost, 6),
                    "latency_ms": int((time.time() - run_start) * 1000),
                })
                return message.content or ""

            for tc in message.tool_calls:
                tool = self.tools_by_name.get(tc.function.name)
                if tool is None:
                    result = f"Tool {tc.function.name!r} not registered."
                    emit({"event": "tool_error", "run_id": run_id, "tool": tc.function.name, "error": "not_registered"})
                else:
                    tool_start = time.time()
                    result = safe_call_tool(tool, tc.function.arguments, run_id)
                    emit({
                        "event": "tool_call",
                        "run_id": run_id,
                        "iteration": iteration,
                        "tool": tc.function.name,
                        "args_chars": len(tc.function.arguments or ""),
                        "result_chars": len(result),
                        "latency_ms": int((time.time() - tool_start) * 1000),
                    })
                self.history.append({"role": "tool", "tool_call_id": tc.id, "content": str(result)})

        emit({
            "event": "run_capped",
            "run_id": run_id,
            "iterations": self.max_iterations,
            "cost_usd": round(run_cost, 6),
            "latency_ms": int((time.time() - run_start) * 1000),
        })
        return f"(stopped after {self.max_iterations} iterations)"


# ---------------------------------------------------------------------------
# Demo.
# ---------------------------------------------------------------------------

def main() -> None:
    print("=" * 60)
    print("Episode 3 / File 3 — Observability + schema validation")
    print("=" * 60)

    load_dotenv()
    if not os.getenv("OPENAI_API_KEY"):
        sys.exit("OPENAI_API_KEY not set. Copy ../.env.example to .env and fill it in.")

    if LOG_PATH.exists():
        LOG_PATH.unlink()
    print(f"Writing logs to {LOG_PATH.resolve()}\n")

    agent = ObservableAgent(client=OpenAI(), tools=[CALCULATOR, SEARCH])

    queries = [
        "What is 17 times 23?",
        "What does the corpus say about embeddings?",
        "Who won the 1998 World Cup final?",
    ]
    for q in queries:
        print(f"\nUSER: {q}")
        answer = agent.run(q)
        print(f"ASSISTANT: {answer}")

    print("\n" + "=" * 60)
    print("Done. Inspect the log:")
    print(f"  cat {LOG_PATH.name}")
    print(f"  cat {LOG_PATH.name} | jq -c '. | {{event, tool, cost_usd}}'")
    total = 0.0
    for line in LOG_PATH.read_text().splitlines():
        evt = json.loads(line)
        if evt.get("event") == "run_finished":
            total += evt.get("cost_usd", 0)
    print(f"\nTotal observed run cost: ${total:.4f}")


if __name__ == "__main__":
    main()
