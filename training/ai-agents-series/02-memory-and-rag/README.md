# Episode 2 — Memory & RAG

A 30-minute working introduction to giving your agent memory. By the end of this episode the agent from Episode 1 has persistent vector memory and a real RAG pipeline plugged in as a tool.

## What you'll build

Three small Python files, each one strictly more capable than the last:

1. `01_persistent_memory.py` — a persistent vector store with deduplication and a salience filter (so it doesn't pollute itself with junk).
2. `02_rag_pipeline.py` — a complete chunk → embed → retrieve → answer pipeline over a folder of text or markdown.
3. `03_memory_agent.py` — the Episode 1 agent, now with a persistent memory store *and* a RAG tool, with explicit recall-vs-rag boundaries.

Total run time on a fast laptop: about 45 seconds across the three demos. Total cost using `text-embedding-3-small` and `gpt-4o-mini`: well under $0.10.

## Prerequisites

- Episode 1 completed (you should be able to read `02_simple_agent.py` without surprises).
- Python 3.10+ (3.11 recommended)
- An OpenAI API key with embedding access
- A handful of `.txt` or `.md` files in `data/` if you want to point the RAG demo at your own content (a sample notes folder is provided).

You do **not** need any prior vector-database experience. This episode explains embeddings from first principles.

## Setup

```bash
cd 02-memory-and-rag
python -m venv .venv
source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example .env
# edit .env if you haven't already
```

The first run of `01_persistent_memory.py` creates a `./chroma/` directory next to the code. That's where your memory lives. Delete the directory to wipe and start over.

## Run

```bash
# 1 — persistent vector store, with dedup and salience
python code/01_persistent_memory.py

# 2 — full RAG pipeline (chunk -> embed -> retrieve -> answer)
python code/02_rag_pipeline.py

# 3 — agent + memory + RAG-as-a-tool
python code/03_memory_agent.py
```

A small `data/` folder of sample notes is included. Feel free to drop your own `.md` files into it — anything in `data/` is indexed.

## What's in the code (and why it matters)

**Persistence.** `chromadb.PersistentClient(path="./chroma")` — your vector store survives between runs. The Episode 1 critique called out exactly this: "memory persistence across sessions" claimed in tutorials but never delivered. We deliver it.

**Salience filter.** Not every interaction belongs in long-term memory. Trivial confirmations ("ok", "thanks") and exact duplicates of existing memories get rejected. The store stays clean, retrieval stays useful.

**Chunking.** Text is split into ~500-token windows with a small overlap. The chunker is intentionally simple — it's a starting point, not a state-of-the-art system.

**Retrieval boundaries.** "Memory recall" (what did the user ask about before?) and "RAG retrieval" (what does my document corpus say?) are separate concepts. Many tutorials conflate them. This episode treats them as distinct tools the agent can pick from.

**No `text-embedding-ada-002`.** That model has been superseded for two years. We use `text-embedding-3-small` — cheaper, better, and faster.

## Exercises

Try these before watching Episode 3.

1. **Plug in your own corpus.** Drop a folder of your real notes into `data/`. Re-run `02_rag_pipeline.py`. Note what retrieval gets right and what it gets wrong. Don't fix it yet — Episode 3 covers eval.
2. **Tune chunk size.** Change `CHUNK_TOKENS` from 500 to 200 and again to 1500. Run the same query each time. Observe retrieval quality. Bigger isn't always better.
3. **Break retrieval on purpose.** Ask the RAG agent something that's *adjacent* to your corpus but not in it (e.g. ask about a person mentioned once in a footnote). Watch how confidently it answers anyway. This is the failure mode Episode 3 names "hallucination via retrieval."

## Take-home for Episode 3

You now have an agent that remembers and retrieves. You also have an agent that will happily make things up if your retrieval misses. Episode 3 turns "happily makes things up" into "you can detect it and write tests against it."

## Troubleshooting

- **`chromadb` errors on first run** — usually a missing `sqlite3` build for older Python versions. Upgrade to Python 3.11.
- **`AuthenticationError` on embeddings** — your OpenAI key doesn't have access to embedding models. Check the API key's permissions in the OpenAI dashboard.
- **The RAG agent retrieves nothing** — your `data/` folder is empty or only has unsupported file types. The loader handles `.txt` and `.md`.
- **Memory grows unbounded** — that's normal in a tutorial. In production you'd set a TTL or a max-collection-size and prune. We don't do that here so the demo stays simple.

## What this episode deliberately does NOT cover

- Multi-modal (images, audio) embeddings
- Fine-tuned or specialized embedding models
- Hybrid retrieval (BM25 + dense)
- Reranking models (cross-encoder, Cohere Rerank, etc.)
- Production observability and monitoring (Episode 3)
- Eval for retrieval quality (Episode 3)

Episode 2 is the smallest honest version of memory + RAG. Episode 3 turns it into something you'd ship.
