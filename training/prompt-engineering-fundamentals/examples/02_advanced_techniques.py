"""
Advanced Prompting Techniques
Demonstrates zero-shot, few-shot, chain-of-thought, and other advanced patterns.

Usage:
    python 02_advanced_techniques.py            # interactive (Press Enter between techniques)
    python 02_advanced_techniques.py --auto     # run all techniques without pausing (good for recording)
"""

import argparse
import os
import sys
import time

from openai import OpenAI, OpenAIError
from dotenv import load_dotenv

load_dotenv()

# Lazy client construction — OpenAI(api_key=None) raises immediately, so we
# only construct the client when a key is present. main() prints a friendly
# error if the key is missing.
_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=_API_KEY) if _API_KEY else None

MODEL = os.getenv("MODEL", "gpt-4o")


def call_llm(
    prompt: str,
    temperature: float = 0.7,
    system_prompt: str | None = None,
    max_retries: int = 3,
) -> str:
    """Call the LLM with simple exponential-backoff retry on transient errors."""
    messages: list[dict[str, str]] = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})

    last_err: Exception | None = None
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model=MODEL,
                messages=messages,
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


def example_zero_shot():
    """Demonstrates zero-shot prompting"""
    print("\n" + "=" * 60)
    print("TECHNIQUE 1: ZERO-SHOT PROMPTING")
    print("=" * 60)
    print("\nDirect task without examples - relies on model's pre-trained knowledge")

    prompt = "Translate this English text to French: The weather is beautiful today."

    print(f"\nPrompt: '{prompt}'")
    print("\nResponse:")
    print(call_llm(prompt, temperature=0.3))

    print("\n💡 Use zero-shot for: Simple tasks, common operations, quick requests")


def example_few_shot():
    """Demonstrates few-shot prompting"""
    print("\n" + "=" * 60)
    print("TECHNIQUE 2: FEW-SHOT PROMPTING")
    print("=" * 60)
    print("\nProvide consistently labeled examples to guide the model's output format and style")

    prompt = """Convert these customer reviews to sentiment scores (1-5):

Review: "This product exceeded my expectations! Absolutely love it."
Sentiment: 5

Review: "It's okay, nothing special. Does the job."
Sentiment: 3

Review: "Terrible quality, broke after one use. Very disappointed."
Sentiment: 1

Review: "Great value for money, highly recommend to everyone!"
Sentiment: 5

Review: "The product arrived damaged and customer service was unhelpful."
Sentiment: ?"""

    print(f"\nPrompt:\n{prompt}")
    print("\nResponse:")
    print(call_llm(prompt, temperature=0.2))

    print("\n💡 Use few-shot for: Custom formats, consistent output, domain-specific tasks")


def example_chain_of_thought():
    """Demonstrates chain-of-thought prompting"""
    print("\n" + "=" * 60)
    print("TECHNIQUE 3: CHAIN-OF-THOUGHT PROMPTING")
    print("=" * 60)
    print("\nAsk the model to show its reasoning process")

    # Without CoT
    without_cot = (
        "If a store has 15 apples and sells 40% of them, then receives a shipment of 8 more apples, "
        "how many apples does it have?"
    )

    print("\n❌ WITHOUT CHAIN-OF-THOUGHT:")
    print(f"Prompt: '{without_cot}'")
    print("\nResponse:")
    print(call_llm(without_cot, temperature=0.1))

    # With CoT
    with_cot = without_cot + " Let's solve this step by step."

    print("\n" + "-" * 60)
    print("\n✅ WITH CHAIN-OF-THOUGHT:")
    print(f"Prompt: '{with_cot}'")
    print("\nResponse:")
    print(call_llm(with_cot, temperature=0.1))

    print("\n💡 Use CoT for: Math problems, logical reasoning, multi-step processes")


def example_role_prompting():
    """Demonstrates role prompting"""
    print("\n" + "=" * 60)
    print("TECHNIQUE 4: ROLE PROMPTING")
    print("=" * 60)
    print("\nAssign the AI a specific persona or expertise")

    # Basic prompt
    basic = "Explain blockchain technology"
    print("\n❌ BASIC PROMPT:")
    print(f"'{basic}'")
    print("\nResponse:")
    print(truncate_at_sentence(call_llm(basic), 300))

    # Role prompt
    role_prompt = """You are a blockchain expert with 10 years of experience explaining complex concepts
to business executives. Explain blockchain technology in a way that highlights business value and
practical applications, avoiding technical jargon. Keep it under 200 words."""

    print("\n" + "-" * 60)
    print("\n✅ WITH ROLE:")
    print(f"'{role_prompt}'")
    print("\nResponse:")
    print(call_llm(role_prompt))

    print("\n💡 Use role prompting for: Expert perspectives, specific tones, targeted audiences")


def example_template_prompting():
    """Demonstrates template prompting"""
    print("\n" + "=" * 60)
    print("TECHNIQUE 5: TEMPLATE PROMPTING")
    print("=" * 60)
    print("\nUse structured formats for consistent, repeatable results")

    template = """Task: Create a product description
Context: Eco-friendly bamboo toothbrush for environmentally conscious consumers
Format:
- Headline (5-7 words)
- Benefits (3 bullet points)
- Call-to-action (1 sentence)
Constraints:
- Tone: Friendly and informative
- Length: Under 100 words total
- Avoid: Greenwashing language
- Focus: Sustainability and quality"""

    print(f"\nTemplate:\n{template}")
    print("\nResponse:")
    print(call_llm(template))

    print("\n💡 Use templates for: Recurring tasks, team consistency, scalable workflows")


def example_negative_prompting():
    """Demonstrates negative prompting"""
    print("\n" + "=" * 60)
    print("TECHNIQUE 6: NEGATIVE PROMPTING")
    print("=" * 60)
    print("\nTell the AI what NOT to do")

    prompt = """Write a professional email to a client about a project update.

Do NOT:
- Use overly formal or stiff language
- Include unnecessary apologies
- Make promises we can't keep
- Use corporate jargon or buzzwords
- Exceed 150 words
- Be vague about next steps

DO:
- Be clear and direct
- Provide specific timeline
- Sound confident and professional
- Include actionable next steps"""

    print(f"\nPrompt:\n{prompt}")
    print("\nResponse:")
    print(call_llm(prompt))

    print("\n💡 Use negative prompting for: Avoiding mistakes, preventing unwanted styles")


def example_comparative_prompting():
    """Demonstrates comparative prompting"""
    print("\n" + "=" * 60)
    print("TECHNIQUE 7: COMPARATIVE PROMPTING")
    print("=" * 60)
    print("\nAsk for multiple options or comparisons")

    prompt = """Write three versions of this headline with different tones:

Headline topic: New cybersecurity software launch

1. Professional and authoritative
2. Casual and friendly
3. Urgent and action-oriented

For each version, explain why the tone works for different audiences."""

    print(f"\nPrompt:\n{prompt}")
    print("\nResponse:")
    print(call_llm(prompt))

    print("\n💡 Use comparative prompting for: A/B testing, decision-making, exploring options")


def example_system_vs_user():
    """Demonstrates system vs user prompts"""
    print("\n" + "=" * 60)
    print("TECHNIQUE 8: SYSTEM VS USER PROMPTS")
    print("=" * 60)
    print("\nSystem prompts set persistent behavior; user prompts are specific tasks")

    system_prompt = """You are a helpful coding assistant specializing in Python.
You provide clear, well-commented code examples.
You explain concepts using simple analogies.
You always consider edge cases and error handling.
You write code that follows PEP 8 style guidelines."""

    user_prompt = "Write a function to validate email addresses"

    print(f"\nSystem Prompt:\n{system_prompt}")
    print(f"\nUser Prompt:\n{user_prompt}")
    print("\nResponse:")
    print(call_llm(user_prompt, system_prompt=system_prompt, temperature=0.3))

    print("\n💡 System prompts: Persistent behavior | User prompts: Specific tasks")


def example_temperature_effects():
    """Demonstrates the effect of temperature parameter"""
    print("\n" + "=" * 60)
    print("BONUS: TEMPERATURE PARAMETER")
    print("=" * 60)
    print("\nTemperature controls randomness and creativity")

    prompt = "Write a creative opening line for a science fiction novel"

    print(f"\nPrompt: '{prompt}'")

    print("\n🔵 LOW TEMPERATURE (0.2) - Focused and consistent:")
    print(call_llm(prompt, temperature=0.2))

    print("\n🟡 MEDIUM TEMPERATURE (0.7) - Balanced:")
    print(call_llm(prompt, temperature=0.7))

    print("\n🔴 HIGH TEMPERATURE (1.2) - Creative and varied:")
    print(call_llm(prompt, temperature=1.2))

    print("\n💡 Low: Factual tasks | Medium: General writing | High: Creative brainstorming")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Advanced prompting techniques")
    parser.add_argument(
        "--auto",
        action="store_true",
        help="Run all techniques without pausing for input (useful for recording).",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if not os.getenv("OPENAI_API_KEY"):
        print("ERROR: OPENAI_API_KEY is not set. Copy .env.example to .env and add your key.")
        return 1

    print("\n" + "=" * 60)
    print("ADVANCED PROMPTING TECHNIQUES")
    print(f"Model: {MODEL}")
    print("=" * 60)

    techniques = [
        ("Zero-Shot", example_zero_shot),
        ("Few-Shot", example_few_shot),
        ("Chain-of-Thought", example_chain_of_thought),
        ("Role Prompting", example_role_prompting),
        ("Template", example_template_prompting),
        ("Negative", example_negative_prompting),
        ("Comparative", example_comparative_prompting),
        ("System vs User", example_system_vs_user),
        ("Temperature", example_temperature_effects),
    ]

    for i, (_name, fn) in enumerate(techniques):
        fn()
        if i < len(techniques) - 1 and not args.auto:
            input(f"\nPress Enter to continue to next technique ({techniques[i + 1][0]})...")

    print("\n" + "=" * 60)
    print("ALL TECHNIQUES DEMONSTRATED")
    print("=" * 60)
    print("\nKey Takeaways:")
    print("1. Zero-shot: Quick and simple for common tasks")
    print("2. Few-shot: Provides examples for consistency")
    print("3. Chain-of-thought: Shows reasoning for complex problems")
    print("4. Role prompting: Shapes perspective and expertise")
    print("5. Templates: Ensures consistency and reusability")
    print("6. Negative prompting: Prevents unwanted outputs")
    print("7. Comparative: Generates multiple options")
    print("8. System prompts: Set persistent behavior")
    print("9. Temperature: Controls creativity vs consistency")
    print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
