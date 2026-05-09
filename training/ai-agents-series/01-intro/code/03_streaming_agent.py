"""
Episode 1 — File 3: Streaming output.

Run:
    python -u code/03_streaming_agent.py

What you'll learn:
- How to stream the assistant's text as it arrives.
- How to assemble streamed tool calls (which arrive as JSON deltas).
- Why the perceived latency drops dramatically even though the wall-clock
  time is the same as the non-streaming version.

This file is structurally identical to 02_simple_agent.py except for the
`run()` method, which is rewritten around the streaming API.
"""

from __future__ import annotations

import ast
import json
import os
import sys
from dataclasses import dataclass, field
from typing import Any, Callable

from dotenv import load_dotenv
from openai import OpenAI


_ALLOWED_NODES = (
    ast.Expression, ast.BinOp, ast.UnaryOp, ast.Constant,
    ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Mod, ast.Pow, ast.FloorDiv,
    ast.USub, ast.UAdd,
)


def safe_calculate(expression: str) -> str:
    tree = ast.parse(expression, mode="eval")
    for node in ast.walk(tree):
        if not isinstance(node, _ALLOWED_NODES):
            raise ValueError(
                f"Disallowed expression: {type(node).__name__}. "
                "Only basic arithmetic is allowed."
            )
    return str(eval(compile(tree, "<calc>", "eval")))  # noqa: S307


@dataclass
class Tool:
    name: str
    description: str
    parameters_schema: dict
    function: Callable[..., str]

    def call(self, **kwargs: Any) -> str:
        try:
            return str(self.function(**kwargs))
        except Exception as exc:  # noqa: BLE001
            return f"Error in tool {self.name!r}: {exc}"


SYSTEM_PROMPT = (
    "You are a careful research assistant. "
    "You answer the user's question concisely, using the provided tools when "
    "they help. Stream your reasoning briefly. If a question is out of scope "
    "or you cannot be confident, say so plainly rather than guessing."
)


@dataclass
class StreamingAgent:
    client: OpenAI
    tools: list[Tool]
    model: str = "gpt-4o-mini"
    max_iterations: int = 10
    max_completion_tokens: int = 512
    system_prompt: str = SYSTEM_PROMPT
    history: list[dict] = field(default_factory=list)

    def __post_init__(self) -> None:
        self.tools_by_name = {t.name: t for t in self.tools}
        self.history = [{"role": "system", "content": self.system_prompt}]

    def _tools_payload(self) -> list[dict]:
        return [
            {
                "type": "function",
                "function": {
                    "name": t.name,
                    "description": t.description,
                    "parameters": t.parameters_schema,
                },
            }
            for t in self.tools
        ]

    def _execute_tool(self, name: str, arguments_json: str) -> str:
        tool = self.tools_by_name.get(name)
        if tool is None:
            return f"Error: tool {name!r} is not registered."
        try:
            kwargs = json.loads(arguments_json)
        except json.JSONDecodeError as exc:
            return f"Error parsing arguments for {name}: {exc}"
        return tool.call(**kwargs)

    def run(self, user_query: str) -> str:
        """Streamed version of the ReAct loop.

        Streaming complicates two things:
        1. The assistant's text content arrives in `delta.content` chunks.
        2. Tool calls arrive in `delta.tool_calls` chunks where the
           `function.arguments` field is a *fragment* of JSON. We have to
           accumulate fragments by `index` until the stream ends.
        """
        self.history.append({"role": "user", "content": user_query})

        for iteration in range(1, self.max_iterations + 1):
            print(f"\n  [iteration {iteration}] ", end="", flush=True)

            stream = self.client.chat.completions.create(
                model=self.model,
                messages=self.history,
                tools=self._tools_payload(),
                tool_choice="auto",
                max_completion_tokens=self.max_completion_tokens,
                stream=True,
            )

            # Accumulators across the stream.
            content_parts: list[str] = []
            # Tool calls arrive by `index`; we build them up incrementally.
            tool_call_acc: dict[int, dict] = {}

            for chunk in stream:
                if not chunk.choices:
                    continue
                delta = chunk.choices[0].delta

                # Stream visible text as it arrives.
                if delta.content:
                    print(delta.content, end="", flush=True)
                    content_parts.append(delta.content)

                # Tool-call deltas: assemble by index.
                for tc_delta in (delta.tool_calls or []):
                    idx = tc_delta.index
                    slot = tool_call_acc.setdefault(
                        idx,
                        {"id": "", "name": "", "arguments": ""},
                    )
                    if tc_delta.id:
                        slot["id"] = tc_delta.id
                    if tc_delta.function and tc_delta.function.name:
                        slot["name"] = tc_delta.function.name
                    if tc_delta.function and tc_delta.function.arguments:
                        slot["arguments"] += tc_delta.function.arguments

            # End of stream — assemble the assistant message.
            assistant_dict = {
                "role": "assistant",
                "content": "".join(content_parts) or None,
                "tool_calls": [
                    {
                        "id": v["id"],
                        "type": "function",
                        "function": {
                            "name": v["name"],
                            "arguments": v["arguments"],
                        },
                    }
                    for v in sorted(tool_call_acc.values(), key=lambda d: d["id"])
                ],
            }
            self.history.append(assistant_dict)

            # No tool calls -> we're done.
            if not assistant_dict["tool_calls"]:
                print()  # newline after the streamed text
                return assistant_dict["content"] or ""

            # Execute tool calls and append results.
            for tc in assistant_dict["tool_calls"]:
                print(f"\n    -> tool call: {tc['function']['name']}"
                      f"({tc['function']['arguments']})", flush=True)
                result = self._execute_tool(
                    tc["function"]["name"], tc["function"]["arguments"]
                )
                truncated = result if len(result) <= 80 else result[:77] + "..."
                print(f"       result: {truncated}", flush=True)
                self.history.append(
                    {
                        "role": "tool",
                        "tool_call_id": tc["id"],
                        "content": str(result),
                    }
                )

        return f"(stopped after {self.max_iterations} iterations)"


def build_agent() -> StreamingAgent:
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        sys.exit("OPENAI_API_KEY not set. Copy ../.env.example to .env and fill it in.")

    calculator = Tool(
        name="calculate",
        description=(
            "Evaluate a basic arithmetic expression. "
            "Operators: + - * / // % ** and unary minus. No function calls."
        ),
        parameters_schema={
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "A pure arithmetic expression as a string.",
                }
            },
            "required": ["expression"],
            "additionalProperties": False,
        },
        function=safe_calculate,
    )

    return StreamingAgent(client=OpenAI(api_key=api_key), tools=[calculator])


def main() -> None:
    print("=" * 60)
    print("Episode 1 / File 3 — Streaming agent")
    print("=" * 60)
    print("Tip: run with `python -u` to disable Python's stdout buffering")
    print("     so the streamed output really does appear character-by-character.\n")

    agent = build_agent()
    query = (
        "What is 17 times 23? Then take 5 percent of that result. "
        "Show me the running calculation as you stream the answer."
    )
    print(f"USER: {query}")
    answer = agent.run(query)
    print(f"\nFINAL ANSWER:\n{answer}\n")


if __name__ == "__main__":
    main()
