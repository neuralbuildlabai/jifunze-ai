# A short primer on embeddings

An embedding is a fixed-length vector of floating-point numbers that represents a piece of text. Two pieces of text with similar meaning have embeddings that are close together in vector space, even if they share no exact words. "How do I revoke an API key?" and "Where do I deactivate a token?" have nearby embeddings even though only the words "I" and "a" overlap.

## How similarity works

The most common similarity measure is cosine similarity — the cosine of the angle between two vectors. It ranges from -1 (opposite) to +1 (identical). For sentence embeddings the practical range is about 0.5 to 0.95; anything below 0.5 is usually unrelated.

## Choosing an embedding model

Three considerations:

- **Cost.** OpenAI's `text-embedding-3-small` is roughly 5× cheaper than the older `text-embedding-ada-002` and produces better retrieval results in most benchmarks.
- **Dimensionality.** Higher-dimensional embeddings retain more information but cost more memory and slower nearest-neighbor search. 1536 dimensions is a common sweet spot.
- **Domain.** General-purpose models are fine for most use cases. Specialized models (e.g. a code embedding model) help when your domain language is unusual.

## Common pitfalls

- **Mixing models.** All vectors in your store must come from the same embedding model. Switching models means re-embedding everything.
- **No chunking.** Embedding a 50-page document as one vector loses too much information. Chunk into 200–800 token windows.
- **Stale memory.** Old vectors that contradict new information silently win retrieval calls. A simple TTL or recency boost helps.
