"""
Episode 1 — File 1: The smallest possible useful tool.

Run:
    python code/01_first_tool.py

What you'll learn:
- A tool is just a Python function with three pieces of metadata:
  a name, a description, and a JSON Schema for its arguments.
- A safe calculator: no unconstrained `eval()` on user input — parse with
  `ast`, allowlist node types, then evaluate the compiled expression.
- Why explicit schemas beat parameter inference from function signatures.

This file does NOT call any LLM. It exists to make the abstraction concrete
before we plug it into an agent in 02_simple_agent.py.
"""

from __future__ import annotations

import ast
from dataclasses import dataclass
from typing import Any, Callable


# ---------------------------------------------------------------------------
# 1 — The Tool abstraction.
# ---------------------------------------------------------------------------
#
# A tool is exactly four things. Don't overdesign this; keep it boring.

@dataclass
class Tool:
    """A callable function exposed to an agent.

    Fields
    ------
    name : str
        The identifier the model will use to invoke this tool. Stable, snake_case.
    description : str
        One or two sentences telling the model when to use this tool. Specific.
    parameters_schema : dict
        A JSON Schema fragment describing the arguments. The model reads this to
        decide what to pass.
    function : Callable[..., str]
        The Python function that does the work. It must return a string (or
        something coerce-able to one).
    """

    name: str
    description: str
    parameters_schema: dict
    function: Callable[..., str]

    def call(self, **kwargs: Any) -> str:
        """Run the tool. Errors are caught and returned as strings so the agent
        loop can feed them back to the model rather than crashing."""
        try:
            return str(self.function(**kwargs))
        except Exception as exc:  # noqa: BLE001 — we want to surface anything
            return f"Error in tool {self.name!r}: {exc}"


# ---------------------------------------------------------------------------
# 2 — A real calculator (guarded evaluation, not raw `eval()`).
# ---------------------------------------------------------------------------
#
# Almost every agent tutorial passes user text straight to `eval()`. Don't.
# Even with a restricted globals dict, that still exposes surprising escapes.
#
# Instead: parse with `ast`, walk the tree, reject anything outside the
# allowlist, `compile` the tree, then call `eval()` on that bytecode only.
# That is not `ast.literal_eval` (which only handles literals); it is the
# standard pattern for "arithmetic only" demos.

_ALLOWED_NODES = (
    ast.Expression,
    ast.BinOp,
    ast.UnaryOp,
    ast.Constant,
    # operators
    ast.Add,
    ast.Sub,
    ast.Mult,
    ast.Div,
    ast.Mod,
    ast.Pow,
    ast.FloorDiv,
    ast.USub,
    ast.UAdd,
)


def safe_calculate(expression: str) -> str:
    """Evaluate a basic arithmetic expression safely.

    Allowed operators: + - * / // % ** (and unary +/-).
    Anything else (function calls, attribute access, names) is rejected.

    >>> safe_calculate('17 * 23')
    '391'
    >>> safe_calculate('(10 + 5) ** 2')
    '225'
    """
    try:
        tree = ast.parse(expression, mode="eval")
    except SyntaxError as exc:
        raise ValueError(f"Could not parse {expression!r}: {exc}") from exc

    for node in ast.walk(tree):
        if not isinstance(node, _ALLOWED_NODES):
            raise ValueError(
                f"Disallowed expression: {type(node).__name__} "
                f"(only basic arithmetic is allowed)"
            )

    # Safe after the walk: evaluate compiled bytecode of the allowlisted tree.
    result = eval(compile(tree, "<calculator>", "eval"))  # noqa: S307
    return str(result)


# ---------------------------------------------------------------------------
# 3 — Wrap the function as a Tool.
# ---------------------------------------------------------------------------

calculator_tool = Tool(
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
                    "A pure arithmetic expression as a string, e.g. '17 * 23' "
                    "or '(10 + 5) ** 2'. Must be a single expression."
                ),
            }
        },
        "required": ["expression"],
        "additionalProperties": False,
    },
    function=safe_calculate,
)


# ---------------------------------------------------------------------------
# 4 — Demo. No LLM yet — just the tool.
# ---------------------------------------------------------------------------

def main() -> None:
    print("=" * 60)
    print("Episode 1 / File 1 — A single tool, no agent yet")
    print("=" * 60)

    examples = [
        "17 * 23",
        "(10 + 5) ** 2",
        "100 / 8",
        "2 ** 0.5",         # sqrt(2)
        "9 + 3 * (4 - 1)",  # respects precedence
    ]

    for expr in examples:
        result = calculator_tool.call(expression=expr)
        print(f"  calculate({expr!r:<22}) -> {result}")

    print()
    print("And here's a deliberately disallowed input:")
    bad = "__import__('os').system('echo pwned')"
    print(f"  calculate({bad!r:<55}) -> {calculator_tool.call(expression=bad)}")
    print()
    print("That error is the point. The next step (file 02) is to feed this")
    print("kind of error back to the model so it can pick a different approach.")


if __name__ == "__main__":
    main()
