# Prompt Engineering Examples

Practical code demonstrations of the techniques in the Prompt Engineering Fundamentals video.

## Files

- `01_basic_prompts.py` — five core principles (Clarity, Context, Structure, Constraints, Examples)
- `02_advanced_techniques.py` — eight techniques plus temperature comparison
- `requirements.txt` — Python dependencies
- `.env.example` — template for your API key

## Setup

```bash
# from this directory
pip install -r requirements.txt
cp .env.example .env
# then edit .env and paste your OpenAI key
```

## Running

Both scripts support an interactive mode (default — pauses between examples) and an `--auto` mode (runs straight through, useful for screen recording or smoke-testing).

```bash
# interactive
python 01_basic_prompts.py
python 02_advanced_techniques.py

# auto (no pauses)
python 01_basic_prompts.py --auto
python 02_advanced_techniques.py --auto
```

## Configuration

Both scripts read from environment variables:

| Variable | Default | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | _required_ | Your OpenAI API key |
| `MODEL` | `gpt-4o` | Override the model used (e.g., `gpt-4o-mini` for faster/cheaper demos) |

## Robustness

Both scripts include simple exponential-backoff retry on transient API errors, so a single rate-limit hiccup mid-recording won't blow up the demo. Long responses are truncated at the nearest sentence boundary rather than mid-word, so the on-screen output reads cleanly.

## Adding your own examples

Use this skeleton:

```python
"""
Your Example Title
What it demonstrates.
"""

import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def your_example() -> None:
    prompt = "Your prompt here"
    response = client.chat.completions.create(
        model=os.getenv("MODEL", "gpt-4o"),
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
    print(response.choices[0].message.content)


if __name__ == "__main__":
    your_example()
```

## Troubleshooting

**Import errors** — re-run `pip install -r requirements.txt`.

**`OPENAI_API_KEY is not set`** — make sure you copied `.env.example` to `.env` and the file is in this directory.

**Rate limits** — the scripts retry automatically. If you hit them repeatedly, either upgrade your API tier or set `MODEL=gpt-4o-mini` for cheaper calls.

## Further reading

- OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering
- Anthropic prompt engineering: https://docs.anthropic.com/claude/docs/prompt-engineering
