# Episode 1 — Intro to AI Agents (30 minutes)

A working, beginner-to-intermediate introduction. By the end of this video you have a real agent running on your laptop, with a real system prompt, real tool schemas, and a real iteration cap. No magic, no AutoGPT, no hand-waving.

Pacing target: ~150 words per minute. Time markers in `[m:ss]` format.

---

## SECTION 1 — What an agent actually is (0:00 – 4:00)

### [0:00] Cold open

> "If you've used ChatGPT, you've used a chatbot. If you've watched ChatGPT call a calculator, look something up on the web, and then write a summary in one go — you've used an agent.
>
> The difference is small in the chat window and big in the code. In the next thirty minutes you and I are going to build that agent. Not a framework, not a wrapper, not 'just install LangChain' — we're going to write the loop ourselves, in about a hundred and fifty lines of Python.
>
> By the end you'll know what a tool is, what the ReAct loop is, why your agent needs a system prompt, and what an iteration cap protects you from."

**[VISUAL]** Title card: "AI Agents — Episode 1: Intro." Hold for 3 seconds.

### [0:30] Two definitions to draw a line

> "Let's draw a clean line between a chatbot and an agent.
>
> A chatbot takes your message, sends it to the model, returns the model's reply. One in, one out.
>
> An agent does that, but it's also allowed to *act* between your input and its reply. It can call a function, look up a document, run a calculation, send an email — and it can do those things several times before answering you. That little loop, from your input to the final reply, is what we're building today."

**[VISUAL]** Side-by-side diagram:
- Left: `User → LLM → Reply`
- Right: `User → LLM ↔ Tools → Reply`

### [1:30] What an agent needs to be useful

> "An agent worth running has four things:
>
> One — **a system prompt**. A short paragraph that tells the model what role it's playing. We'll write one in five minutes.
>
> Two — **tools**. Functions the model is allowed to call. We'll start with a single calculator and grow from there.
>
> Three — **a control loop**. The bit that lets the model think, act, observe what happened, and think again. This is the ReAct pattern, and we'll implement it from scratch.
>
> Four — **safety rails**. An iteration cap, a token cap, and a guard against runaway costs. These are non-negotiable."

**[VISUAL]** Four-quadrant diagram, one item per quadrant.

### [2:30] What we're explicitly skipping today

> "I want to be honest about what's *not* in this video. Memory — that's Episode 2. RAG — also Episode 2. Multi-agent systems, fine-tuning, prompt injection, evaluation — that's Episode 3. We're not doing those today on purpose. The biggest mistake in agent tutorials is trying to cram all of that into thirty minutes. You end up with a tour of buzzwords and no working code.
>
> Today is one thing: build a single-tool agent that actually works."

**[VISUAL]** Slide listing: "Today: ReAct loop. Not today: memory, RAG, prod, eval, safety hardening — that's the rest of the series."

### [3:00] Real-world examples (brief)

> "Where do agents actually show up in 2025? Three places worth naming.
>
> First, **research and analysis** — the kind of agent that takes a question, searches three sources, reads them, and writes a synthesis. GitHub Copilot Workspace, Perplexity's deep-research mode, Anthropic's Claude with tool use. All variations on the loop you're about to write.
>
> Second, **coding agents** — Claude Code, Cursor's agent mode, GitHub's Copilot Chat with workspace context. Same loop, different tools.
>
> Third, **back-office automation** — agents that read invoices, classify them, and write to a database. Less glamorous, more cash-positive.
>
> All three use the same ReAct loop you're about to write."

---

## SECTION 2 — The four pieces, on slides (4:00 – 9:00)

**[VISUAL]** Switch to slide deck.

### [4:00] The LLM brain

> "The model is the reasoning engine. For this video we'll use `gpt-4o-mini` — it's cheap, fast, and supports tool calling. You can swap it for `gpt-4o`, Claude 3.5 Sonnet, or any model with a tool-calling API. The agent code doesn't change.
>
> One thing to know: there's a difference between a *chat* completion and a *function-calling* completion. We're using function calling. The model returns either a normal message or a structured request to call one of your tools. Your code reads that, runs the tool, sends the result back, and the loop continues."

**[VISUAL]** Slide: model output is either `{role: "assistant", content}` or `{role: "assistant", tool_calls: [...]}`.

### [5:00] Tools

> "A tool is a Python function plus three pieces of metadata: a name, a description, and a parameter schema. The schema is the part most tutorials skip, and skipping it is exactly why their agents misbehave.
>
> Here's why the schema matters. If you only tell the model 'this tool takes an expression,' it has to guess whether `expression` is a string or a number. Sometimes it guesses right. Sometimes it sends `{expression: 5}` instead of `{expression: \"5\"}` and your code crashes. With a real JSON Schema — type, description, required — the model knows.
>
> We're going to define every tool with a schema. It costs you four lines per tool and it saves you fifty in debugging."

**[VISUAL]** Side-by-side — bad tool (no schema) vs good tool (full schema).

### [6:30] The ReAct loop

> "The control loop is the heart of an agent. The pattern is called ReAct — Reason, Act, Observe, repeat. It looks like this:
>
> The user sends a message. The model reasons about what to do. If it picks a tool, your code runs the tool, captures the result, and feeds it back to the model. The model reasons again. If it has enough information, it writes a final answer. If not, it picks another tool. You loop until the model returns a final answer or you hit your iteration cap.
>
> Two practical rules. First, every tool result goes back into the conversation history with `role: \"tool\"` and the matching `tool_call_id`. Skip that and the next call to the model is malformed. Second, the model can request multiple tool calls in one turn — your code has to handle that, not just the first one."

**[VISUAL]** Animated loop diagram:
1. User → model.
2. Model returns tool call(s).
3. Code executes tools.
4. Results go back to model.
5. Steps 2–4 repeat until model returns final answer.

### [8:00] Safety rails

> "Three safety rails that every agent in production has, and that mine will have today.
>
> One — **`max_iterations`**. If the model gets confused and keeps asking for tools, you stop after, say, ten loops and return whatever you have.
>
> Two — **`max_completion_tokens`**. A per-call cap on how much the model can write. This bounds your worst case.
>
> Three — **a system prompt that names the scope**. 'You are a research assistant. You answer questions using the provided tools. If a question is out of scope, say so.' This sentence is the cheapest insurance you can buy."

**[VISUAL]** Three icons: a clock (iterations), a token, a shield (system prompt).

---

## SECTION 3 — Build a tool (9:00 – 12:30)

**[VISUAL]** Switch to code editor. Open `code/01_first_tool.py`.

### [9:00] What we're about to build

> "Open `code/01_first_tool.py`. We're going to look at the smallest possible useful tool: a calculator. Forty lines of Python. Once you understand this, the agent loop is easy."

### [9:30] The Tool class

> "Here's our Tool class. Three fields — name, description, and parameters_schema. Plus the function itself. That's it. Every tool in the entire series will use this exact shape."

**[ON SCREEN]** Reveal the `Tool` dataclass.

```python
@dataclass
class Tool:
    name: str
    description: str
    parameters_schema: dict
    function: Callable[..., str]
```

> "Notice `parameters_schema` is a dict — it's a JSON Schema fragment. We pass it straight to the model. No inferring types from function signatures, no guessing."

### [10:00] A real calculator (no raw `eval` on user text)

> "Now the calculator. The version you'll see in a lot of agent tutorials does `eval(user_string)` — unconstrained. Don't ship that. It's a security hole, and once a viewer copies it into production, it's their security hole.
>
> Instead — `ast.parse`, walk the tree with a whitelist of allowed node types, `compile`, then evaluate that bytecode. We're not using `ast.literal_eval` here; that can't express general arithmetic. We're using the standard guarded pattern for a numeric expression."

**[ON SCREEN]** Reveal `safe_calculate` function. Walk through:

```python
def safe_calculate(expression: str) -> str:
    """Evaluate a basic arithmetic expression safely."""
    allowed = (ast.Expression, ast.BinOp, ast.UnaryOp, ast.Constant,
               ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Mod, ast.Pow, ast.USub)
    tree = ast.parse(expression, mode="eval")
    for node in ast.walk(tree):
        if not isinstance(node, allowed):
            raise ValueError(f"Disallowed expression: {type(node).__name__}")
    return str(eval(compile(tree, "<calc>", "eval")))
```

> "We `compile` the parsed tree and then evaluate, but only after we've walked the tree and confirmed every node is in our allowlist. No function calls, no attribute access, no imports."

### [11:30] Wrap it as a Tool

```python
calculator = Tool(
    name="calculate",
    description="Evaluate a basic arithmetic expression. Operators: + - * / % **.",
    parameters_schema={
        "type": "object",
        "properties": {
            "expression": {
                "type": "string",
                "description": "A pure arithmetic expression like '17 * 23' or '(10 + 5) ** 2'.",
            }
        },
        "required": ["expression"],
    },
    function=safe_calculate,
)
```

> "The description is what the model reads to decide whether to use this tool. Be specific. 'Evaluate a basic arithmetic expression' is better than 'calculator.'"

### [12:00] Run the file

**[ON SCREEN]** Switch to terminal.

```bash
$ python code/01_first_tool.py
```

> "We're not running the agent yet — just the tool. We pass an expression directly. The point is to convince yourself that a 'tool' is just a Python function that knows what its arguments look like."

---

## SECTION 4 — Build the agent (12:30 – 22:00)

**[VISUAL]** Open `code/02_simple_agent.py`.

### [12:30] Walk the file top to bottom

> "Open `code/02_simple_agent.py`. We're going to build a real agent class with the calculator from the previous file plus the ReAct loop. About a hundred lines of code, end to end."

### [13:00] The system prompt

```python
SYSTEM_PROMPT = (
    "You are a careful research assistant. "
    "You answer the user's question using the provided tools when helpful. "
    "Show your reasoning briefly. If a question is out of scope or you can't be confident, say so."
)
```

> "This is the highest-leverage line in the file. Don't skip it. Without a system prompt, the model invents its own personality, which often means apologising for everything or refusing to use tools at all."

### [14:00] The Agent class

**[ON SCREEN]** Reveal the class definition.

```python
class SimpleAgent:
    def __init__(self, client, tools, model="gpt-4o-mini",
                 max_iterations=10, max_completion_tokens=512):
        self.client = client
        self.tools = {t.name: t for t in tools}
        self.model = model
        self.max_iterations = max_iterations
        self.max_completion_tokens = max_completion_tokens
        self.history = [{"role": "system", "content": SYSTEM_PROMPT}]
```

> "Three things to notice. The system prompt is the first message. The tools are stored by name in a dict so we can dispatch fast. And there are explicit caps for iterations and per-call tokens."

### [15:00] Format tools for the API

```python
def _tools_payload(self):
    return [{
        "type": "function",
        "function": {
            "name": t.name,
            "description": t.description,
            "parameters": t.parameters_schema,
        },
    } for t in self.tools.values()]
```

> "OpenAI's API takes tools in this shape. We pass through our schema directly. No inference, no guessing."

### [16:00] The run loop

**[ON SCREEN]** Reveal `run()`.

```python
def run(self, user_query: str) -> str:
    self.history.append({"role": "user", "content": user_query})

    for iteration in range(self.max_iterations):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=self.history,
            tools=self._tools_payload(),
            tool_choice="auto",
            max_completion_tokens=self.max_completion_tokens,
        )
        message = response.choices[0].message

        # serialize the assistant message into the history
        self.history.append({
            "role": "assistant",
            "content": message.content,
            "tool_calls": [
                {"id": tc.id, "type": "function",
                 "function": {"name": tc.function.name, "arguments": tc.function.arguments}}
                for tc in (message.tool_calls or [])
            ],
        })

        if not message.tool_calls:
            return message.content or ""

        for tc in message.tool_calls:
            tool = self.tools.get(tc.function.name)
            if tool is None:
                result = f"Error: tool {tc.function.name!r} not registered."
            else:
                try:
                    args = json.loads(tc.function.arguments)
                    result = tool.function(**args)
                except Exception as exc:
                    result = f"Error executing {tool.name}: {exc}"
            self.history.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "content": str(result),
            })

    return "Max iterations reached without a final answer."
```

> "Read this slowly. The loop runs at most `max_iterations` times. Each iteration, we send the history to the model. If the model wants tools, we run them and append the results with the matching `tool_call_id`. If the model returns a normal message, we return it.
>
> One subtle thing: we serialize the assistant message into a plain dict before appending it to history. The OpenAI SDK returns an object; appending it directly works *most* of the time but breaks the moment you try to pickle the history or pass it to another tool. Plain dicts are predictable."

### [19:00] Run the agent

**[ON SCREEN]** Terminal.

```bash
$ python code/02_simple_agent.py
```

> "Let's give it a real prompt. 'What is 17 times 23, plus 5 percent?'
>
> Watch the trace. The model picks `calculate`. We run it. The result goes back. The model picks `calculate` again for the percent step. We run it. Then it returns a final answer. Three iterations, two tool calls, one final response."

**[ON SCREEN]** Show the actual trace from the script's verbose mode.

### [20:30] Show one failure

> "Now I'm going to break it on purpose. I ask the agent for `sqrt(2)`. The calculator doesn't support `sqrt`. Watch."

**[ON SCREEN]** Run the broken example.

> "The model picks `calculate` with `expression='sqrt(2)'`. The calculator says 'Disallowed expression: Call' and returns an error string. The model reads that error in the next iteration. It tries something else — maybe `2 ** 0.5` — which our calculator does support. It works.
>
> *That's* the ReAct loop. The model adapts. This is the part chatbots can't do."

---

## SECTION 5 — Streaming and polish (22:00 – 26:00)

### [22:00] Why stream

> "One last upgrade in this episode. Right now the agent waits for the full response before printing anything. For a calculator that's fine. For an agent that writes paragraphs, viewers will think it hung. Streaming fixes that."

**[VISUAL]** Open `code/03_streaming_agent.py`.

### [23:00] What changes

> "Two changes from `02_simple_agent.py`. First, we pass `stream=True` to `chat.completions.create`. Second, we iterate over the chunks and print them as they arrive."

```python
stream = self.client.chat.completions.create(
    model=self.model,
    messages=self.history,
    tools=self._tools_payload(),
    tool_choice="auto",
    max_completion_tokens=self.max_completion_tokens,
    stream=True,
)

for chunk in stream:
    delta = chunk.choices[0].delta
    if delta.content:
        print(delta.content, end="", flush=True)
    # ... accumulate tool_calls until the stream ends
```

> "Tool calls are slightly trickier with streaming because they arrive as deltas — fragments of JSON arguments — that you have to assemble. The code in the file shows the full assembly. Read it once, copy it, move on."

### [24:30] Run it

**[ON SCREEN]** Terminal.

```bash
$ python code/03_streaming_agent.py
```

> "Same query, streamed output. Notice the response *appears* faster, even though the total latency is the same. Perceived speed is half of user experience."

---

## SECTION 6 — Wrap-up and take-home (26:00 – 30:00)

### [26:00] What you have now

> "Stop the recording for a second and look at what you have. About 200 lines of Python. A working agent class. A safe calculator tool. JSON Schema for tool arguments. A system prompt. An iteration cap. A token cap. Streaming output. Tool-error recovery.
>
> Every one of those is something you'll see again in production code. Most of them are things production code *forgets to add*."

### [27:00] What's broken about this agent

> "Be honest about the limits. The agent has zero memory between runs — close the terminal and it forgets. The calculator is the only tool. It can't read files, search the web, or remember what you asked yesterday.
>
> Episode 2 fixes the memory problem with persistent vector storage and a real RAG pipeline. Episode 3 takes everything we have and asks the harder questions: what happens when an attacker writes hostile text into a tool result? How do we know the agent is right? How do we keep the cost down at scale?"

### [28:00] Three exercises before next episode

> "Three things to try before you watch Episode 2.
>
> One — add a `read_file(path)` tool. Sandbox it to one directory. Have the agent summarise the README in this folder.
>
> Two — break the agent on purpose. Find a query the calculator can't answer. Watch the failure mode. Decide whether to add a new tool or extend the existing one.
>
> Three — switch the model from `gpt-4o-mini` to `gpt-4o`. Run the same query. Compare latency, cost, and answer quality. Decide which one is the right default for *your* use case.
>
> The point of these isn't to be hard. It's to give you the muscle memory of editing an agent and watching the consequences."

### [29:00] Quiz

**[VISUAL]** Slide with three questions and a 5-second pause after each.

> "Three quick questions.
>
> One — what does the system prompt do, and what happens if you skip it?
>
> Two — why do tool definitions need a JSON Schema?
>
> Three — name the two safety caps in the agent class.
>
> If you got all three, you're ready for Episode 2."

### [29:30] Close

> "Episode 2 is about memory. Real, persistent, vector-backed memory — and a RAG pipeline you'll plug into this same agent. The next 30 minutes turn this stateless calculator into something that actually remembers what you've asked.
>
> See you there."

**[VISUAL]** Title card: "Next: Episode 2 — Memory & RAG."

---

## Production notes

- The "broken on purpose" demo at [20:30] needs careful editing — the model sometimes recovers in one extra step, sometimes in three. If you get a long recovery in your take, edit it to one extra iteration so viewers see the recovery without losing the thread.
- The streaming demo at [24:30] looks identical to the non-streaming one in a still frame. Make sure your final video preserves the timing — don't aggressively cut dead time during the streaming output, or the visual proof of streaming gets lost.
- The system-prompt slide at [13:00] is the single highest-impact slide in the episode. Spend an extra beat on it.
