"""
Episode 2 — File 3: Agent + persistent memory + RAG (as two distinct tools).

Run:
    python code/03_memory_agent.py

What you'll learn:
- How to plug Episode 1's agent into a persistent memory store and a RAG
  pipeline at the same time.
- Why memory and RAG should be two separate tools the model picks between,
  not one fused thing.
- How to write a system prompt that helps the model pick the right tool.

Prerequisites:
- 01_persistent_memory.py and 02_rag_pipeline.py read and understood.
- A populated ./chroma_rag/ collection (running 02 first sets this up).
"""

from __future__ import annotations

import ast
import json
import os
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable

from dotenv import load_dotenv
from openai import OpenAI

# Local imports — these are sibling files, not packages.
sys.path.insert(0, str(Path(__file__).parent))
import importlib.util


def _load_module(name: str, file_name: str):
    spec = importlib.util.spec_from_file_location(name, Path(__file__).parent / file_name)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


_pm_mod = _load_module("persistent_memory", "01_persistent_memory.py")
_rag_mod = _load_module("rag_pipeline", "02_rag_pipeline.py")

PersistentMemory = _pm_mod.PersistentMemory
load_corpus = _rag_mod.load_corpus
build_index = _rag_mod.build_index
retrieve = _rag_mod.retrieve


# ---------------------------------------------------------------------------
# Tool abstraction (carried over from Episode 1, intentionally identical).
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
# System prompt — calls out the two distinct tools.
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = (
    "You are a careful research assistant with two long-term resources: "
    "(1) `recall_memory` — facts the user has told you in past conversations; "
    "(2) `search_documents` — a corpus of reference notes you can look up. "
    "Use the right tool for the question:\n"
    "- Prefer `search_documents` for factual questions about the corpus.\n"
    "- Prefer `recall_memory` when the user refers to previous conversations or their preferences.\n"
    "- Use `calculate` for arithmetic.\n"
    "Answer concisely. Cite the source filename when you used document search. "
    "If you cannot find the answer, say so plainly."
)


# ---------------------------------------------------------------------------
# Tool implementations bound to a memory + RAG instance.
# ---------------------------------------------------------------------------

def make_tools(memory: PersistentMemory, rag_collection) -> list[Tool]:
    def recall_memory(query: str) -> str:
        hits = memory.recall(query, n=3)
        if not hits:
            return "(no relevant memories found)"
        lines = []
        for h in hits:
            lines.append(f"[similarity {h.similarity:+.2f}] {h.text}")
        return "\n".join(lines)

    def search_documents(query: str) -> str:
        hits = retrieve(rag_collection, query)
        if not hits:
            return "(corpus is empty)"
        lines = []
        for h in hits:
            lines.append(
                f"[similarity {h['similarity']:+.2f}, source: {h['source']}, chunk {h['chunk_index']}]\n{h['text']}"
            )
        return "\n\n".join(lines)

    return [
        Tool(
            name="calculate",
            description="Evaluate a basic arithmetic expression. Operators: + - * / // % ** and unary minus.",
            parameters_schema={
                "type": "object",
                "properties": {
                    "expression": {"type": "string", "description": "A pure arithmetic expression."}
                },
                "required": ["expression"],
                "additionalProperties": False,
            },
            function=safe_calculate,
        ),
        Tool(
            name="recall_memory",
            description=(
                "Retrieve facts the user has told you in past conversations. "
                "Use this when the user refers to previous conversations, their preferences, "
                "or things they shared earlier."
            ),
            parameters_schema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "What you want to recall about the user."}
                },
                "required": ["query"],
                "additionalProperties": False,
            },
            function=recall_memory,
        ),
        Tool(
            name="search_documents",
            description=(
                "Search the reference document corpus for factual information. "
                "Use this for any question that asks about content in the corpus "
                "(e.g. 'According to X...', 'What does the documentation say about Y?'). "
                "Returns the top matching chunks with their source filenames."
            ),
            parameters_schema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "The information need, in natural language."}
                },
                "required": ["query"],
                "additionalProperties": False,
            },
            function=search_documents,
        ),
    ]


# ---------------------------------------------------------------------------
# Memory-aware agent. Same shape as Episode 1's SimpleAgent, plus auto-write
# to memory when the user shares something declarative.
# ---------------------------------------------------------------------------

@dataclass
class MemoryAgent:
    client: OpenAI
    memory: PersistentMemory
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

    def run(self, user_query: str) -> str:
        # Auto-remember: if the user states a fact about themselves, save it.
        # The salience filter inside PersistentMemory keeps this conservative.
        # We DO NOT remember questions, only declarative statements.
        if not user_query.strip().endswith("?"):
            outcome = self.memory.remember(user_query, source="user")
            if self.verbose and outcome == "added":
                print(f"  [memory] added: {user_query[:70]}")

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
            self.history.append(self._serialize_assistant_message(message))

            tool_calls = message.tool_calls or []
            if not tool_calls:
                return message.content or ""

            for tc in tool_calls:
                if self.verbose:
                    args_preview = tc.function.arguments[:80] + ("..." if len(tc.function.arguments) > 80 else "")
                    print(f"    -> tool: {tc.function.name}({args_preview})")
                tool = self.tools_by_name.get(tc.function.name)
                if tool is None:
                    result = f"Error: tool {tc.function.name!r} not registered."
                else:
                    try:
                        kwargs = json.loads(tc.function.arguments)
                        result = tool.call(**kwargs)
                    except json.JSONDecodeError as exc:
                        result = f"Error parsing arguments: {exc}"
                if self.verbose:
                    truncated = result if len(result) <= 100 else result[:97] + "..."
                    print(f"       result: {truncated}")
                self.history.append(
                    {"role": "tool", "tool_call_id": tc.id, "content": str(result)}
                )

        return f"(stopped after {self.max_iterations} iterations)"


# ---------------------------------------------------------------------------
# Demo.
# ---------------------------------------------------------------------------

def main() -> None:
    print("=" * 60)
    print("Episode 2 / File 3 — Agent with persistent memory + RAG")
    print("=" * 60)

    load_dotenv()
    if not os.getenv("OPENAI_API_KEY"):
        sys.exit("OPENAI_API_KEY not set. Copy ../.env.example to .env and fill it in.")

    # Build (or reload) both stores.
    memory = PersistentMemory(path="./chroma")
    print(f"Memory store: {len(memory)} entries.")

    data_dir = Path(__file__).resolve().parent.parent / "data"
    docs = load_corpus(data_dir)
    rag_collection = build_index(docs)

    tools = make_tools(memory, rag_collection)
    client = OpenAI()
    agent = MemoryAgent(client=client, memory=memory, tools=tools)

    interactions = [
        # Declarative — should be added to memory.
        "My favourite arithmetic operator is the Python two-stars power operator.",
        # Memory recall.
        "What did I tell you about my preferences earlier?",
        # RAG question.
        "According to the embeddings primer, why is dimensionality important?",
        # Calculation question.
        "Compute 2 ** 10 for me, please.",
        # Out of scope.
        "Who won the 1998 World Cup final?",
    ]

    for q in interactions:
        print("\n" + "=" * 60)
        print(f"USER: {q}")
        answer = agent.run(q)
        print(f"\nASSISTANT: {answer}")


if __name__ == "__main__":
    main()
