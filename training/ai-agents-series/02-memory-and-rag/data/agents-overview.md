# What is an AI agent?

An AI agent is an autonomous system that can perceive its environment, make decisions, and take actions to achieve specific goals. Unlike a simple chatbot that just produces a reply, an agent uses tools — search, calculation, file access, API calls — and loops over its own reasoning until it has enough information to answer.

## The four components

Every agent worth running has the same four parts:

1. **The reasoning model.** Usually a large language model with tool-calling support. GPT-4o, Claude 3.5, or any model with a structured-output API.
2. **Tools.** Python functions the model is allowed to call, each with a name, description, and JSON Schema.
3. **A control loop.** The orchestration layer that lets the model think, act, observe, and think again. Commonly known as the ReAct pattern.
4. **Safety rails.** A maximum iteration count, a per-call token cap, and a system prompt that names the scope.

## The ReAct pattern

The acronym stands for *Reason + Act*. The agent receives input, the model reasons about what to do, picks a tool, the tool runs, the model observes the result, and the loop continues until a final answer is reached.

## Why memory matters

A stateless agent forgets everything between runs. Memory comes in two flavors. Short-term memory is the conversation history within a single session. Long-term memory persists between sessions, typically in a vector database, and is retrieved by semantic similarity rather than exact keyword match.
