"""
Episode 1 — File 2: A simple agent with a real ReAct loop.

Run:
    python code/02_simple_agent.py

What you'll learn:
- How to write the agent control loop yourself in <100 lines.
- Why a system prompt is the highest-leverage line in your agent code.
- How JSON Schema tool definitions remove a whole class of bugs.
- How `max_iterations` and `max_completion_tokens` keep your bill bounded.
- How the model recovers when a tool call fails.

Prerequisites:
- 01_first_tool.py read and understood.
- OPENAI_API_KEY in a .env file at the series root, or in your shell.
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

# Calculator matches `01_first_tool.safe_calculate` (duplicated so this file runs standalone).

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
                "Only basic arithmetic (+ - * / // % **) is allowed."
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


# ---------------------------------------------------------------------------
# The system prompt. This is the highest-leverage line in the codebase.
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = (
    "You are a careful research assistant. "
    "You answer the user's question concisely, using the provided tools when "
    "they help. Show your reasoning briefly in plain language. "
    "If a question is out of scope or you cannot be confident, say so plainly "
    "rather than guessing."
)


# ---------------------------------------------------------------------------
# The agent.
# ---------------------------------------------------------------------------

@dataclass
class SimpleAgent:
    """A minimal ReAct-loop agent.

    The contract:
    - The model is asked for a response.
    - If the response includes tool calls, we run them and append the
      results to the history with `role: "tool"` and the matching
      `tool_call_id`.
    - We loop until the model returns a normal message or we hit
      `max_iterations`.
    """

    client: OpenAI
    tools: list[Tool]
    model: str = "gpt-4o-mini"
    max_iterations: int = 10
    max_completion_tokens: int = 512
    system_prompt: str = SYSTEM_PROMPT
    verbose: bool = True
    history: list[dict] = field(default_factory=list)

    def __post_init__(self) -> None:
        self.tools_by_name = {t.name: t for t in self.tools}
        self.history = [{"role": "system", "content": self.system_prompt}]

    def _tools_payload(self) -> list[dict]:
        """Translate our `Tool` list into the shape the OpenAI API expects."""
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

    def _serialize_assistant_message(self, message) -> dict:  # noqa: ANN001
        """Convert an SDK ChatCompletionMessage into a plain dict.

        We do this because mixing SDK objects and plain dicts in `history`
        works most of the time but fails the moment you try to pickle, log,
        or replay the conversation. Plain dicts are predictable.
        """
        return {
            "role": "assistant",
            "content": message.content,
            "tool_calls": [
                {
                    "id": tc.id,
                    "type": "function",
                    "function": {
                        "name": tc.function.name,
                        "arguments": tc.function.arguments,
                    },
                }
                for tc in (message.tool_calls or [])
            ],
        }

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
        self.history.append({"role": "user", "content": user_query})

        for iteration in range(1, self.max_iterations + 1):
            if self.verbose:
                print(f"  [iteration {iteration}]")

            response = self.client.chat.completions.create(
                model=self.model,
                messages=self.history,
                tools=self._tools_payload(),
                tool_choice="auto",
                max_completion_tokens=self.max_completion_tokens,
            )
            message = response.choices[0].message
            assistant_dict = self._serialize_assistant_message(message)
            self.history.append(assistant_dict)

            tool_calls = message.tool_calls or []
            if not tool_calls:
                # Plain final answer.
                return message.content or ""

            # Execute every tool call the model asked for, in order.
            for tc in tool_calls:
                if self.verbose:
                    print(f"    -> tool call: {tc.function.name}({tc.function.arguments})")
                result = self._execute_tool(tc.function.name, tc.function.arguments)
                if self.verbose:
                    truncated = result if len(result) <= 80 else result[:77] + "..."
                    print(f"       result: {truncated}")
                self.history.append(
                    {
                        "role": "tool",
                        "tool_call_id": tc.id,
                        "content": str(result),
                    }
                )

        return f"(stopped after {self.max_iterations} iterations without a final answer)"


# ---------------------------------------------------------------------------
# Demo.
# ---------------------------------------------------------------------------

def build_agent() -> SimpleAgent:
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        sys.exit("OPENAI_API_KEY not set. Copy ../.env.example to .env and fill it in.")

    calculator = Tool(
        name="calculate",
        description=(
            "Evaluate a basic arithmetic expression. "
            "Operators: + - * / // % ** and unary minus. No function calls, "
            "no variables, no constants from math (use 2**0.5 for sqrt(2))."
        ),
        parameters_schema={
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": (
                        "A pure arithmetic expression as a string, e.g. "
                        "'17 * 23' or '(10 + 5) ** 2'."
                    ),
                }
            },
            "required": ["expression"],
            "additionalProperties": False,
        },
        function=safe_calculate,
    )

    return SimpleAgent(client=OpenAI(api_key=api_key), tools=[calculator])


def main() -> None:
    print("=" * 60)
    print("Episode 1 / File 2 — Simple agent with one tool")
    print("=" * 60)

    agent = build_agent()

    queries = [
        "What is 17 times 23, plus 5 percent of that result? Give me the final number.",
        # The next one is deliberately ill-fitting for our calculator.
        # The model should try sqrt(2), discover that's disallowed, and switch to 2 ** 0.5.
        "What is the square root of 2, to four decimal places?",
    ]

    for query in queries:
        print(f"\nUSER: {query}")
        # Each query gets a fresh agent so we don't leak history between demos.
        agent = build_agent()
        answer = agent.run(query)
        print(f"\nFINAL ANSWER: {answer}\n")
        print("-" * 60)


if __name__ == "__main__":
    main()
