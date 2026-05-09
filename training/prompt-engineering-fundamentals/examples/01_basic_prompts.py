"""
Basic Prompt Examples
Demonstrates fundamental prompt engineering principles.

Usage:
    python 01_basic_prompts.py            # interactive (Press Enter between examples)
    python 01_basic_prompts.py --auto     # run all examples without pausing (good for recording)
"""

import argparse
import os
import sys
import time

from openai import OpenAI, OpenAIError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Lazy client construction — OpenAI(api_key=None) raises immediately, so we
# only construct the client when a key is present. main() prints a friendly
# error if the key is missing.
_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=_API_KEY) if _API_KEY else None

MODEL = os.getenv("MODEL", "gpt-4o")


def call_llm(prompt: str, temperature: float = 0.7, max_retries: int = 3) -> str:
    """Call the LLM with simple exponential-backoff retry on transient errors."""
    last_err: Exception | None = None
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model=MODEL,
                messages=[{"role": "user", "content": prompt}],
                temperature=temperature,
            )
            return response.choices[0].message.content
        except OpenAIError as err:
            last_err = err
            wait = 2**attempt
            print(f"  ⚠️  API error ({err.__class__.__name__}); retrying in {wait}s...")
            time.sleep(wait)
    return f"[Error after {max_retries} attempts: {last_err}]"


def truncate_at_sentence(text: str, max_chars: int) -> str:
    """Truncate text at the last sentence boundary before max_chars."""
    if len(text) <= max_chars:
        return text
    snippet = text[:max_chars]
    cut = max(snippet.rfind(". "), snippet.rfind("? "), snippet.rfind("! "))
    if cut > max_chars // 2:
        return snippet[: cut + 1] + " ..."
    return snippet + "..."


def example_clarity():
    """Demonstrates the importance of clarity in prompts"""
    print("\n" + "=" * 60)
    print("EXAMPLE 1: CLARITY")
    print("=" * 60)

    # Vague prompt
    vague_prompt = "Help me with my email"
    print("\n❌ VAGUE PROMPT:")
    print(f"'{vague_prompt}'")
    print("\nResponse:")
    print(call_llm(vague_prompt))

    # Clear prompt
    clear_prompt = """Write a professional email to my client apologizing for a delayed project delivery.
The delay was due to unexpected technical issues with our server infrastructure.
Maintain a positive and reassuring tone, and propose a new deadline of next Friday.
Keep it under 150 words."""

    print("\n" + "-" * 60)
    print("\n✅ CLEAR PROMPT:")
    print(f"'{clear_prompt}'")
    print("\nResponse:")
    print(call_llm(clear_prompt))


def example_context():
    """Demonstrates the importance of context"""
    print("\n" + "=" * 60)
    print("EXAMPLE 2: CONTEXT")
    print("=" * 60)

    # Without context
    no_context = "Explain quantum computing"
    print("\n❌ WITHOUT CONTEXT:")
    print(f"'{no_context}'")
    print("\nResponse:")
    print(truncate_at_sentence(call_llm(no_context), 300))

    # With context
    with_context = """I'm a high school teacher preparing a lesson for 10th graders who have basic knowledge
of atoms and electricity. Explain quantum computing using simple analogies they can relate to.
Keep it under 300 words and avoid complex mathematical formulas."""

    print("\n" + "-" * 60)
    print("\n✅ WITH CONTEXT:")
    print(f"'{with_context}'")
    print("\nResponse:")
    print(call_llm(with_context))


def example_structure():
    """Demonstrates the importance of structure"""
    print("\n" + "=" * 60)
    print("EXAMPLE 3: STRUCTURE")
    print("=" * 60)

    # Unstructured
    unstructured = (
        "I need a business plan for a coffee shop with financial projections "
        "and marketing strategy and competitive analysis"
    )
    print("\n❌ UNSTRUCTURED:")
    print(f"'{unstructured}'")
    print("\nResponse:")
    print(truncate_at_sentence(call_llm(unstructured), 400))

    # Structured
    structured = """Create a business plan for a specialty coffee shop with the following sections:

1. Executive Summary (150 words)
2. Market Analysis
   - Target demographic
   - Competitive landscape
3. Marketing Strategy
   - Social media approach
   - Local partnerships
4. Financial Projections
   - Startup costs
   - 3-year revenue forecast

Use bullet points for clarity and include specific numbers where possible."""

    print("\n" + "-" * 60)
    print("\n✅ STRUCTURED:")
    print(f"'{structured}'")
    print("\nResponse:")
    print(call_llm(structured))


def example_constraints():
    """Demonstrates the power of constraints"""
    print("\n" + "=" * 60)
    print("EXAMPLE 4: CONSTRAINTS")
    print("=" * 60)

    # Without constraints
    no_constraints = "Write a story"
    print("\n❌ WITHOUT CONSTRAINTS:")
    print(f"'{no_constraints}'")
    print("\nResponse:")
    print(truncate_at_sentence(call_llm(no_constraints), 300))

    # With constraints
    with_constraints = """Write a 500-word science fiction story about a robot learning to paint.
The story should:
- Be suitable for ages 8-12
- Have a positive message about creativity
- Include dialogue between the robot and a human mentor
- End with the robot's first exhibition
- Use simple vocabulary but engaging narrative"""

    print("\n" + "-" * 60)
    print("\n✅ WITH CONSTRAINTS:")
    print(f"'{with_constraints}'")
    print("\nResponse:")
    print(call_llm(with_constraints))


def example_with_examples():
    """Demonstrates the power of providing examples"""
    print("\n" + "=" * 60)
    print("EXAMPLE 5: PROVIDING EXAMPLES")
    print("=" * 60)

    # Without example
    no_example = "Write product descriptions in our brand voice"
    print("\n❌ WITHOUT EXAMPLE:")
    print(f"'{no_example}'")
    print("\nResponse:")
    print(truncate_at_sentence(call_llm(no_example), 200))

    # With example
    with_example = """Write product descriptions in our brand voice. Here's an example:

Product: Wireless Earbuds
Our Style: "Meet your new workout buddy. These earbuds laugh in the face of sweat, stay put during burpees,
and deliver crystal-clear sound that makes every playlist feel like a personal concert. Battery life?
8 hours of pure audio bliss."

Now write a similar description for:
Product: Smartwatch"""

    print("\n" + "-" * 60)
    print("\n✅ WITH EXAMPLE:")
    print(f"'{with_example}'")
    print("\nResponse:")
    print(call_llm(with_example))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Basic prompt engineering examples")
    parser.add_argument(
        "--auto",
        action="store_true",
        help="Run all examples without pausing for input (useful for recording).",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if not os.getenv("OPENAI_API_KEY"):
        print("ERROR: OPENAI_API_KEY is not set. Copy .env.example to .env and add your key.")
        return 1

    print("\n" + "=" * 60)
    print("BASIC PROMPT ENGINEERING EXAMPLES")
    print("Demonstrating Core Principles")
    print(f"Model: {MODEL}")
    print("=" * 60)

    examples = [
        example_clarity,
        example_context,
        example_structure,
        example_constraints,
        example_with_examples,
    ]

    for i, fn in enumerate(examples):
        fn()
        if i < len(examples) - 1 and not args.auto:
            input("\nPress Enter to continue to next example...")

    print("\n" + "=" * 60)
    print("EXAMPLES COMPLETE")
    print("=" * 60)
    print("\nKey Takeaways:")
    print("1. Clarity: Be specific about what you want")
    print("2. Context: Provide relevant background information")
    print("3. Structure: Organize your prompt logically")
    print("4. Constraints: Set boundaries to focus the output")
    print("5. Examples: Show the AI what you're looking for")
    print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
