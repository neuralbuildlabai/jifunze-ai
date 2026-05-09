# Prompt Engineering Fundamentals Script (30 Minutes)

> **Slide deck:** `slides/index.html` (22 slides). Slide cues below are descriptive — see `production-guide.md` for the canonical slide-to-time table.

---

## SECTION 1: INTRODUCTION (0:00 - 3:00)

### Opening (0:00 - 0:30)
**[SLIDE: Title - "Prompt Engineering Fundamentals"]**

"Welcome to Prompt Engineering Fundamentals. In the next 30 minutes, you'll learn how to communicate effectively with AI language models to get the results you want. Whether you're building AI applications, automating tasks, or just trying to get better responses from ChatGPT, this course will give you the essential skills you need."

### What is Prompt Engineering? (0:30 - 1:30)
**[SLIDE: Definition & Importance]**

"Prompt engineering is the art and science of crafting inputs—called prompts—that guide AI language models to produce desired outputs. Think of it as learning a new language, but instead of talking to a person, you're communicating with an AI.

Why does this matter? The same AI model can give you brilliant insights or complete nonsense, depending entirely on how you ask. A well-crafted prompt can:
- Save you hours of back-and-forth
- Produce more accurate and relevant results
- Unlock capabilities you didn't know the AI had
- Make your AI applications more reliable and useful"

### The Power of Good Prompts (1:30 - 2:30)
**[SLIDE: Before/After Examples]**

"Let me show you the difference a good prompt makes.

**Bad Prompt:** 'Write about dogs'
**Result:** Generic, unfocused content about dogs

**Good Prompt:** 'Write a 200-word article explaining why dogs make excellent therapy animals for children with autism. Include specific behavioral traits and cite recent research.'
**Result:** Focused, detailed, actionable content

The difference? Clarity, specificity, and structure. These are the foundations of prompt engineering."

### Course Overview (2:30 - 3:00)
**[SLIDE: 5 Core Principles]**

"In this course, we'll cover:
- Core principles that make prompts effective
- Proven techniques like few-shot learning and chain-of-thought
- Advanced patterns for complex tasks
- Common mistakes and how to avoid them

By the end, you'll be able to craft prompts that consistently deliver high-quality results. Let's dive in."

---

## SECTION 2: CORE PRINCIPLES (3:00 - 10:00)

### Principle 1: Clarity (3:00 - 4:30)
**[SLIDE: Clarity - Be Specific]**

"The first principle of prompt engineering is clarity. AI models are incredibly powerful, but they can't read your mind. You need to be explicit about what you want.

**Vague Prompt:**
'Help me with my email'

**Clear Prompt:**
'Write a professional email to my client apologizing for a delayed project delivery. The delay was due to unexpected technical issues. Maintain a positive tone and propose a new deadline of next Friday.'

Notice the difference? The clear prompt specifies:
- The type of content (professional email)
- The recipient (client)
- The purpose (apologize for delay)
- The reason (technical issues)
- The tone (positive)
- The action (propose new deadline)

**Key Takeaway:** Never assume the AI knows your context. State it explicitly."

### Principle 2: Context (4:30 - 6:00)
**[SLIDE: Context - Provide Background]**

"The second principle is context. AI models perform better when they understand the situation.

**Without Context:**
'Explain quantum computing'

**With Context:**
'I'm a high school teacher preparing a lesson for 10th graders who have basic knowledge of atoms and electricity. Explain quantum computing using simple analogies they can relate to. Keep it under 300 words.'

The context tells the AI:
- Your role (teacher)
- Your audience (10th graders)
- Their knowledge level (basic physics)
- The desired approach (simple analogies)
- The constraints (300 words)

**Pro Tip:** Think of context as setting the stage. The more relevant details you provide, the better the performance."

### Principle 3: Structure (6:00 - 7:30)
**[SLIDE: Structure - Format Matters]**

"The third principle is structure. How you organize your prompt affects the output quality.

**Unstructured Prompt:**
'I need a business plan for a coffee shop with financial projections and marketing strategy and competitive analysis'

**Structured Prompt:**
```
Create a business plan for a specialty coffee shop with the following sections:

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

Use bullet points for clarity and include specific numbers where possible.
```

The structured version:
- Uses clear sections
- Specifies word counts
- Defines subsections
- States format preferences

**Key Takeaway:** Structure your prompt like you'd structure the output you want."

### Principles 4 & 5: Constraints and Examples (7:30 - 10:00)
**[SLIDE: Constraints & Examples]**

"The fourth principle is constraints. Boundaries actually improve creativity and relevance.

**Without Constraints:**
'Write a story'

**With Constraints:**
'Write a 500-word science fiction story about a robot learning to paint. The story should:
- Be suitable for ages 8-12
- Have a positive message about creativity
- Include dialogue between the robot and a human mentor
- End with the robot's first exhibition'

Useful constraints include:
- **Length:** Word count, character limit, number of items
- **Tone:** Professional, casual, humorous, serious
- **Format:** Bullet points, paragraphs, tables, code
- **Audience:** Age, expertise level, cultural context
- **Style:** Technical, conversational, academic

**Pro Tip:** Constraints don't limit the AI—they focus it.

The fifth principle is examples. Sometimes showing is better than telling.

**Without Example:**
'Write product descriptions in our brand voice'

**With Example:**
'Write product descriptions in our brand voice. Here's an example:

Product: Wireless Earbuds
Our Style: 'Meet your new workout buddy. These earbuds laugh in the face of sweat, stay put during burpees, and deliver crystal-clear sound that makes every playlist feel like a personal concert. Battery life? 8 hours of pure audio bliss.'

Now write a similar description for: Smartwatch'

Examples help the AI understand your style, level of detail, tone, and structure.

**Key Takeaway:** One good example is worth a thousand words of instruction."

---

## SECTION 3: PROMPTING TECHNIQUES (10:00 - 22:00)

### Technique 1: Zero-Shot Prompting (10:00 - 11:30)
**[SLIDE: Zero-Shot vs Few-Shot]**

"Now let's explore specific techniques. First up: zero-shot prompting.

Zero-shot means asking the AI to perform a task without providing examples. You rely entirely on the model's pre-trained knowledge.

**Example:**
'Translate this English text to French: The weather is beautiful today.'

**When to use zero-shot:**
- Simple, straightforward tasks
- Common operations (translation, summarization)
- When you don't have examples
- For quick, one-off requests

**Strengths:**
- Fast and simple
- No example preparation needed
- Works well for common tasks

**Limitations:**
- Less control over output format
- May not match your specific style
- Can be inconsistent for complex tasks

**Best Practice:** Start with zero-shot. If results aren't satisfactory, move to few-shot."

### Technique 2: Few-Shot Prompting (11:30 - 13:30)
**[SLIDE: Zero-Shot vs Few-Shot]**

"Few-shot prompting means providing examples before asking for the task. This dramatically improves consistency and quality.

**Example:**
```
Convert these customer reviews to sentiment scores (1-5):

Review: 'This product exceeded my expectations!'
Sentiment: 5

Review: 'It's okay, nothing special.'
Sentiment: 3

Review: 'Terrible quality, broke after one use.'
Sentiment: 1

Review: 'Great value for money, highly recommend.'
Sentiment: ?
```

**When to use few-shot:**
- Custom formats or styles
- Consistent output structure needed
- Domain-specific tasks
- When zero-shot results are inconsistent

**How many examples?**
- 2-3 examples: usually sufficient
- 5-10 examples: for complex patterns
- More isn't always better (context limits)

**Pro Tips:**
- Use diverse examples covering edge cases
- Ensure examples are high quality and consistently labeled
- Keep examples concise
- Match the format you want in output"

### Technique 3: Chain-of-Thought (13:30 - 15:30)
**[SLIDE: Chain-of-Thought Prompting]**

"Chain-of-thought prompting asks the AI to show its reasoning process. This dramatically improves accuracy for complex problems.

**Without Chain-of-Thought:**
'If a store has 15 apples and sells 40% of them, then receives a shipment of 8 more apples, how many apples does it have?'
**Result:** May give wrong answer

**With Chain-of-Thought:**
'If a store has 15 apples and sells 40% of them, then receives a shipment of 8 more apples, how many apples does it have? Let's solve this step by step.'

**AI Response:**
'Let's solve this step by step:
1. Starting apples: 15
2. Apples sold: 40% of 15 = 0.40 × 15 = 6 apples
3. Apples remaining: 15 - 6 = 9 apples
4. New shipment: 8 apples
5. Final total: 9 + 8 = 17 apples

Answer: 17 apples'

**When to use chain-of-thought:**
- Math problems
- Logical reasoning
- Multi-step processes
- When you need to verify the logic
- Complex decision-making

**Key Phrases:**
- 'Let's think step by step'
- 'Let's solve this systematically'
- 'Let's break this down'
- 'Show your work'"

### Technique 4: Role Prompting (15:30 - 17:00)
**[SLIDE: Role & Iterative]**

"Role prompting assigns the AI a specific persona or expertise. This shapes the response style and depth.

**Basic Prompt:**
'Explain blockchain technology'

**Role Prompt:**
'You are a blockchain expert with 10 years of experience explaining complex concepts to business executives. Explain blockchain technology in a way that highlights business value and practical applications, avoiding technical jargon.'

**Effective Roles:**
- **Expert roles:** 'You are a senior software architect...'
- **Teacher roles:** 'You are a patient tutor explaining to a beginner...'
- **Professional roles:** 'You are a legal consultant reviewing...'
- **Creative roles:** 'You are a creative director brainstorming...'

**Why it works:**
- Activates relevant knowledge patterns
- Sets appropriate tone and complexity
- Provides implicit context
- Shapes the perspective

**Pro Tip:** Be specific about the role's expertise and audience."

### Technique 5: Iterative Refinement (17:00 - 18:30)
**[SLIDE: Role & Iterative]**

"Iterative refinement means building on previous responses to improve results.

**First Prompt:**
'Write a tagline for an eco-friendly water bottle'

**Response:**
'Stay hydrated, save the planet'

**Refinement:**
'Make it more playful and memorable, targeting millennials'

**Response:**
'Sip happens. Make it sustainable.'

**Further Refinement:**
'Good! Now create 3 variations with different tones'

**The Process:**
1. Start with a basic prompt
2. Evaluate the response
3. Provide specific feedback
4. Request adjustments
5. Repeat until satisfied

**Benefits:**
- Faster than rewriting entire prompts
- Builds on what works
- Allows for exploration
- More natural workflow

**Best Practice:** Be specific about what to change and what to keep."

### Technique 6: Template Prompting (18:30 - 20:00)
**[SLIDE: Template & Negative]**

"Template prompting uses structured formats for consistent, repeatable results.

**Example Template:**
```
Task: [Specific task description]
Context: [Relevant background information]
Format: [Desired output structure]
Constraints: [Limitations or requirements]
Example: [Optional sample output]
```

**Filled Template:**
```
Task: Create a product description
Context: Eco-friendly bamboo toothbrush for environmentally conscious consumers
Format:
- Headline (5-7 words)
- Benefits (3 bullet points)
- Call-to-action (1 sentence)
Constraints:
- Tone: Friendly and informative
- Length: Under 100 words total
- Avoid: Greenwashing language
```

**Benefits:**
- Consistency across multiple uses
- Easy to modify and reuse
- Reduces errors and omissions
- Scalable for teams

**Pro Tip:** Create templates for recurring tasks and save them for reuse."

### Technique 7: Negative Prompting (20:00 - 21:00)
**[SLIDE: Template & Negative]**

"Negative prompting tells the AI what NOT to do. This is surprisingly effective.

**Without Negative Prompting:**
'Write a professional email to a client'

**With Negative Prompting:**
'Write a professional email to a client. Do NOT:
- Use overly formal language
- Include unnecessary apologies
- Make promises we can't keep
- Use corporate jargon
- Exceed 150 words'

**When to use:**
- Avoiding common mistakes
- Preventing unwanted styles
- Excluding specific content
- Maintaining brand guidelines

**Examples:**
- 'Explain without using technical jargon'
- 'Summarize without losing key details'
- 'Write creatively but don't use clichés'
- 'Be persuasive without being pushy'

**Key Takeaway:** Sometimes it's easier to say what you don't want than what you do want."

### Technique 8: Comparative Prompting (21:00 - 22:00)
**[SLIDE: Comparative Prompting]**

"Comparative prompting asks the AI to analyze differences or provide multiple options.

**Example 1 - Compare Options:**
'Compare Python and JavaScript for building a web scraper. Create a table showing:
- Ease of learning
- Library support
- Performance
- Best use cases'

**Example 2 - Multiple Versions:**
'Write three versions of this headline with different tones:
1. Professional and authoritative
2. Casual and friendly
3. Urgent and action-oriented

Headline topic: New cybersecurity software launch'

**Benefits:**
- Helps with decision-making
- Provides multiple perspectives
- Reveals trade-offs
- Generates options for A/B testing

**Use Cases:**
- Product comparisons
- Strategy evaluation
- Content variations
- Problem-solving approaches"

---

## SECTION 4: ADVANCED PATTERNS (22:00 - 27:00)

### System Prompts vs User Prompts (22:00 - 23:30)
**[SLIDE: System vs User Prompts]**

"When using AI APIs, you have two types of prompts: system and user.

**System Prompt:**
- Sets the AI's behavior and personality
- Provides persistent context
- Defines rules and constraints
- Stays constant across conversations

**Example System Prompt:**
```
You are a helpful coding assistant specializing in Python.
You provide clear, well-commented code examples.
You explain concepts using simple analogies.
You always consider edge cases and error handling.
```

**User Prompt:**
- Contains the specific request
- Changes with each interaction
- Builds on system prompt context

**Example User Prompt:**
```
Write a function to validate email addresses
```

**Best Practices:**
- Use system prompts for consistent behavior
- Keep system prompts concise but complete
- Use user prompts for specific tasks
- Test system prompts thoroughly

**Pro Tip:** System prompts are like hiring instructions; user prompts are like daily tasks."

### Parameter Tuning (23:30 - 25:00)
**[SLIDE: Temperature & Parameters]**

"Beyond the prompt text, you can control AI behavior with parameters.

**Temperature (0.0 - 2.0):**
- **Low (0.0-0.3):** Focused, deterministic, consistent
  - Use for: Code, data analysis, factual content
- **Medium (0.4-0.7):** Balanced creativity and consistency
  - Use for: General writing, explanations
- **High (0.8-1.2):** Creative, varied, unpredictable
  - Use for: Brainstorming, creative writing, ideation

**Example:**
```python
# Factual task - low temperature
response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Explain photosynthesis"}],
    temperature=0.2
)

# Creative task - higher temperature
response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Write a sci-fi story opening"}],
    temperature=0.9
)
```

**Other Parameters:**
- **max_tokens:** Limits response length
- **top_p:** Alternative to temperature (nucleus sampling)
- **frequency_penalty:** Reduces repetition
- **presence_penalty:** Encourages topic diversity

**Best Practice:** Start with default settings, then adjust based on results."

### Prompt Chaining (25:00 - 26:30)
**[SLIDE: Prompt Chaining]**

"Prompt chaining breaks complex tasks into sequential steps, using each output as input for the next.

**Example: Research Report Generation**

**Step 1 - Outline:**
```
Create an outline for a report on renewable energy trends.
Include 5 main sections with 3 subsections each.
```

**Step 2 - Research (for each section):**
```
Based on this outline section: [Section from Step 1]
List 5 key facts and statistics about this topic.
```

**Step 3 - Writing:**
```
Using these facts: [Facts from Step 2]
Write a 300-word section that flows naturally.
```

**Step 4 - Polish:**
```
Review this section: [Section from Step 3]
Improve clarity and add transitions.
```

**Benefits:**
- Handles complex tasks
- Maintains quality at each step
- Easier to debug and refine
- More control over process

**Use Cases:**
- Content creation workflows
- Data analysis pipelines
- Multi-stage problem solving
- Quality assurance processes"

### Meta Prompting (26:30 - 27:00)
**[SLIDE: Meta Prompting]**

"Meta prompting asks the AI to help you create better prompts.

**Example:**
```
I want to generate creative product names for a line of organic skincare products.
Help me write a prompt that will consistently generate:
- Memorable names (2-3 words)
- Nature-inspired themes
- Easy to pronounce
- Available as .com domains

What prompt should I use?
```

**AI Response:**
```
Use this prompt:

'Generate 10 product names for organic skincare products. Each name should:
- Be 2-3 words maximum
- Incorporate natural elements (plants, minerals, seasons)
- Be easy to pronounce in English
- Sound premium but approachable
- Avoid common skincare clichés

Format: Provide names with brief explanations of the natural inspiration.'
```

**When to use meta prompting:**
- Learning prompt engineering
- Optimizing existing prompts
- Exploring new approaches
- Getting unstuck

**Key Takeaway:** The AI can be your prompt engineering coach."

---

## SECTION 5: BEST PRACTICES & COMMON PITFALLS (27:00 - 30:00)

### Common Mistakes (27:00 - 28:00)
**[SLIDE: Common Pitfalls]**

"Let's cover the most common prompt engineering mistakes:

**1. Being Too Vague**
❌ 'Write something about marketing'
✅ 'Write a 500-word blog post about email marketing best practices for small businesses'

**2. Assuming Context**
❌ 'Fix this code' (without showing the code)
✅ 'Here's my Python code: [code]. It's giving a TypeError. Please fix it and explain the issue.'

**3. Ignoring Format**
❌ 'List the benefits of exercise'
✅ 'List 5 benefits of exercise. Format as: Benefit name (bold) followed by 2-sentence explanation.'

**4. Not Iterating**
❌ Accepting first response without refinement
✅ Asking follow-up questions to improve results

**5. Overcomplicating**
❌ Writing 500-word prompts with excessive detail
✅ Being concise but complete

**Remember:** Good prompts are clear, specific, and structured—but not unnecessarily complex."

### Testing and Iteration (28:00 - 28:45)
**[SLIDE: Best Practices Checklist]**

"Professional prompt engineering requires testing and iteration.

**Testing Process:**
1. Write initial prompt
2. Test with multiple inputs (at least 3-5 variations)
3. Evaluate consistency (do you get similar quality?)
4. Identify failure cases (when does it break?)
5. Refine and retest

**What to test:**
- Different input variations
- Edge cases
- Various lengths
- Different tones
- Unusual requests

**Evaluation Criteria:**
- Accuracy: Is the information correct?
- Relevance: Does it address the request?
- Consistency: Similar quality across tests?
- Format: Matches desired structure?
- Tone: Appropriate for audience?

**Pro Tip:** Keep a log of prompts and results to track what works."

### Best Practices Summary (28:45 - 29:30)
**[SLIDE: Best Practices Checklist]**

"Here's your prompt engineering checklist:

**Before Writing:**
✅ Define your goal clearly
✅ Identify your audience
✅ Determine desired format
✅ Consider constraints

**While Writing:**
✅ Be specific and explicit
✅ Provide relevant context
✅ Use clear structure
✅ Include examples when helpful
✅ Set appropriate constraints

**After Writing:**
✅ Test with variations
✅ Iterate based on results
✅ Document what works
✅ Refine for consistency

**For Production:**
✅ Use templates for recurring tasks
✅ Version control your prompts
✅ Monitor output quality
✅ Gather user feedback
✅ Continuously improve

**Remember:** Prompt engineering is a skill that improves with practice."

### Conclusion & Next Steps (29:30 - 30:00)
**[SLIDE: Thank You & Resources]**

"Congratulations! You now have the fundamental skills to craft effective prompts for AI language models.

**Key Takeaways:**
- Clarity, context, and structure are essential
- Different techniques for different tasks
- Iteration leads to better results
- Testing ensures consistency

**Next Steps:**
1. Practice with real tasks
2. Experiment with different techniques
3. Build a prompt library
4. Learn about AI agents (our next course!)

**Resources:**
- Prompt engineering guides
- Community forums
- Example libraries
- Advanced courses

Thank you for watching! Start practicing today, and you'll see immediate improvements in your AI interactions. Happy prompting! 🚀"

---

## PRODUCTION NOTES

### Visual Elements Needed:
- Side-by-side comparisons of good vs bad prompts
- Animated diagrams showing prompt flow
- Code examples with syntax highlighting
- Real-time demonstrations of techniques
- Before/after result comparisons

### Pacing:
- Speak at ~150 words per minute (target: ~4,500 words total)
- Pause 2-3 seconds after key concepts
- Use vocal emphasis for important terms
- Maintain energy throughout

### Engagement:
- Show real examples, not just theory
- Demonstrate actual AI responses
- Include relatable scenarios
- Highlight practical applications
- Use humor appropriately

### Demonstrations:
- Live prompt testing
- Real-time refinement
- Comparison of techniques
- Parameter adjustments
- Success and failure examples
