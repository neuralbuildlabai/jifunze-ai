# Episode 2 — Memory & RAG (30 minutes)

The agent from Episode 1 is stateless. By the end of this video it has persistent vector memory, a real RAG pipeline, and clear boundaries between "things the user told me before" and "things in my document corpus."

Pacing target: ~150 words per minute.

---

## SECTION 1 — Why memory matters (0:00 – 4:00)

### [0:00] Cold open

> "Run the agent we built in Episode 1 twice. Ask the same question both times. Now ask a follow-up. Watch what happens.
>
> It forgets. Every run is fresh. There is no memory.
>
> Today we fix that — properly. Not the in-memory tutorial version that loses everything when you close the terminal. Persistent vector memory. A real RAG pipeline. Plug them into Episode 1's agent, and end the video with something that remembers what you talked about yesterday."

**[VISUAL]** Title card: "AI Agents — Episode 2: Memory & RAG."

### [0:30] What we mean by memory

> "Two kinds of memory, and a tutorial mistake I want to call out.
>
> Short-term memory is the conversation history. Within a single run of the agent, the model already remembers everything you've said because we keep appending to a list and sending it back. That part works.
>
> Long-term memory is what happens between runs. Close the terminal, open it again tomorrow — does the agent know what you asked? Without explicit work, no. We need to write things to disk and read them back as embeddings.
>
> The mistake — almost every tutorial I've reviewed says 'this gives the agent persistent memory' and then uses ChromaDB's in-memory client. The store evaporates the moment the process exits. We're going to use the persistent client and verify the data survives."

**[VISUAL]** Two-column slide: short-term (in-process list) vs long-term (persistent vector store).

### [1:30] Memory vs RAG — they are not the same thing

> "Don't conflate memory and RAG.
>
> Memory is *about* the user. What did *you* tell the agent? What did *we* talk about?
>
> RAG — retrieval-augmented generation — is *about* a corpus. The agent has access to a folder of documents, and it can search them. The user might have never seen those documents.
>
> Both use vector embeddings. Both look almost identical from the model's point of view. But they answer different questions and they should be separate tools the agent can pick from. Treating them as one thing is how agents end up confidently citing the user's own past message as a source."

**[VISUAL]** Two distinct boxes: "User memory" (left) and "Document corpus / RAG" (right).

### [2:30] What we'll build

> "Three files. Each one strictly more capable than the last.
>
> One — `01_persistent_memory.py`. The smallest persistent vector store you can run on your laptop. With deduplication, so we don't fill it with junk. With a salience filter, so trivial confirmations don't pollute the store.
>
> Two — `02_rag_pipeline.py`. Chunk a folder of markdown files, embed each chunk, store the vectors, and write a query function that retrieves the most relevant chunks and answers a question with them.
>
> Three — `03_memory_agent.py`. Take Episode 1's agent and add both — memory and RAG — as two distinct tools the agent can pick from."

---

## SECTION 2 — Embeddings, in plain English (4:00 – 8:00)

### [4:00] What an embedding actually is

> "An embedding is a vector of about 1500 floating-point numbers that represents a piece of text. The numbers themselves don't mean anything to you or me — but two pieces of text with similar meaning produce vectors that are close together in space.
>
> 'How do I revoke an API key?' and 'Where do I deactivate a token?' share almost no words, but their embeddings are close. That's the entire trick. Search by *meaning*, not by exact words."

**[VISUAL]** Two short text snippets with near-identical vector visualisations next to a third unrelated text with a very different vector.

### [5:00] Cosine similarity

> "The standard way to measure 'closeness' between two vectors is cosine similarity — the cosine of the angle between them. Don't worry if the math is rusty. The number ranges from minus one (opposite meanings) to plus one (identical meanings). For sentence embeddings, anything above 0.7 is usually clearly related; anything below 0.5 is usually unrelated.
>
> Most vector databases compute this for you. You don't write the math, you call `.query()`."

**[VISUAL]** A simple slide showing cosine similarity values for three pairs of sentences.

### [6:00] Choosing a model

> "Three things to know when picking an embedding model.
>
> Cost — OpenAI's `text-embedding-3-small` is roughly five times cheaper than `text-embedding-ada-002`, the model most older tutorials use, and it produces better retrieval results. Use the new one. There is no reason to use ada-002 in 2025.
>
> Dimensionality — 1536 is a common default. Higher means more information per vector at the cost of slower search and more memory.
>
> Domain — general-purpose models are fine for almost everything. If you're embedding code or specialised legal text, look up a model trained on that domain."

**[VISUAL]** Slide: three columns titled "cost," "dim," "domain," with the recommended defaults bolded.

### [7:00] One pitfall to avoid

> "All your vectors must come from the same embedding model. If you index half your corpus with one model and switch to another, retrieval gets noticeably worse and you can't tell why. Pick a model, write it down, stick to it. If you change models, you re-index from scratch.
>
> ChromaDB will let you mix models silently. Don't."

---

## SECTION 3 — Build a persistent memory store (8:00 – 14:00)

**[VISUAL]** Open `code/01_persistent_memory.py`.

### [8:00] Open the file

> "Open `01_persistent_memory.py`. We're building a small wrapper around ChromaDB with three things most tutorials skip: persistence, deduplication, and a salience filter."

### [8:30] PersistentClient, not Client

```python
client = chromadb.PersistentClient(path="./chroma")
```

> "One word change versus most tutorials. `PersistentClient` writes to disk. `Client` is in-memory and disappears when the process exits. Look at the directory after you run the script — there's a `chroma/` folder full of SQLite files. Delete it to wipe and start over."

### [9:30] Dedup and salience

> "Two filters before we add anything to memory.
>
> First — dedup. Hash the content. If we already have the same hash, skip. This means asking the agent the same question twice doesn't double-write.
>
> Second — salience. A short list of patterns we don't bother memorising. 'ok', 'thanks', 'sure'. Things that don't help future retrieval. The list is short and conservative — false negatives are better than false positives here."

**[ON SCREEN]** Reveal `_should_remember()` and the dedup logic.

```python
def _should_remember(content: str) -> bool:
    if len(content.strip()) < 8:
        return False
    if content.strip().lower() in _LOW_VALUE:
        return False
    return True
```

> "If your filter is too aggressive, you lose useful memories. If it's too loose, the store fills with junk and retrieval gets worse. This list errs on the side of letting things in."

### [10:30] Add and recall

> "The two operations you actually use:
>
> `remember(text)` — embed and store, with metadata for the timestamp.
> `recall(query, n)` — embed the query, find the n closest stored vectors, return the texts and a similarity score for each.
>
> Notice we return the similarity scores. Tutorials that hide the scores are doing you a disservice — when retrieval misses, the scores are how you debug it."

```python
def recall(self, query: str, n: int = 3) -> list[Recall]:
    results = self._collection.query(
        query_texts=[query],
        n_results=n,
        include=["documents", "metadatas", "distances"],
    )
    # cosine distance -> similarity
    return [
        Recall(text=d, similarity=1 - dist, metadata=md)
        for d, dist, md in zip(
            results["documents"][0],
            results["distances"][0],
            results["metadatas"][0],
        )
    ]
```

### [12:00] Run it

**[ON SCREEN]** Terminal.

```bash
$ python code/01_persistent_memory.py
```

> "Watch the script. We add five facts. We dedupe a duplicate. We recall against three different queries — one that should match strongly, one that should match weakly, one that should be near zero. The similarity scores tell us whether retrieval did the right thing."

**[ON SCREEN]** Show the printed similarity scores.

### [13:00] Verify persistence

> "Now the proof that memory persists. Run the script again."

**[ON SCREEN]** Re-run.

> "It opens the existing collection, finds the same five facts, and dedupes the second add. The store survived between runs. That's the whole point."

---

## SECTION 4 — Build a RAG pipeline (14:00 – 22:00)

**[VISUAL]** Open `code/02_rag_pipeline.py`.

### [14:00] What changes

> "Memory was about facts the agent told us. RAG is about a corpus the agent reads. Three steps in a RAG pipeline:
>
> One — load and chunk the documents.
> Two — embed each chunk and store it.
> Three — at query time, embed the question, retrieve the top-k chunks, and feed them to the model along with the question.
>
> The first two are setup, run once. The third runs every query."

**[VISUAL]** Slide showing the three stages.

### [15:00] The chunker

> "Chunking is the most underrated step. Choose chunks too small and you lose context. Too large and you bury the signal."

**[ON SCREEN]** Reveal `chunk_text()`.

> "We split on tokens, not characters or words. 500-token windows with 50 tokens of overlap. The overlap is important — without it, a sentence that lands on a chunk boundary gets split and retrieval misses both halves."

```python
def chunk_text(text: str, chunk_tokens: int = 500, overlap: int = 50) -> list[str]:
    enc = tiktoken.encoding_for_model("gpt-4o-mini")
    tokens = enc.encode(text)
    chunks = []
    i = 0
    while i < len(tokens):
        window = tokens[i : i + chunk_tokens]
        chunks.append(enc.decode(window))
        i += chunk_tokens - overlap
    return chunks
```

### [17:00] Loading documents

> "We load any `.md` or `.txt` file in `./data/`. Real systems handle PDF, HTML, code, transcripts. We don't. The point of the demo is the pipeline, not the loaders."

```python
def load_corpus(path: Path) -> list[Doc]:
    docs = []
    for f in sorted(path.glob("**/*")):
        if f.suffix.lower() in {".md", ".txt"}:
            docs.append(Doc(source=str(f), text=f.read_text(encoding="utf-8")))
    return docs
```

### [18:00] Index

> "Indexing is `chunk + embed + store`. Notice the chunk IDs include the source filename and the chunk index — when retrieval returns a result we want to know where it came from."

```python
for doc in docs:
    for i, chunk in enumerate(chunk_text(doc.text)):
        collection.add(
            ids=[f"{doc.source}::{i}"],
            documents=[chunk],
            metadatas=[{"source": doc.source, "chunk_index": i}],
        )
```

### [19:00] Retrieve and answer

> "At query time we retrieve the top three chunks and feed them to the model with a system prompt that says: 'answer using *only* the context below. If the context doesn't cover it, say you don't know.'
>
> That last sentence is what stops the agent from hallucinating."

```python
SYSTEM_PROMPT = (
    "You answer questions using only the context provided. "
    "If the context does not contain the answer, say so plainly. "
    "Cite the source filename for each claim."
)
```

### [20:30] Run it

**[ON SCREEN]** Terminal.

```bash
$ python code/02_rag_pipeline.py
```

> "Three queries. The first should be answered well — the answer is in the corpus. The second is a partial match. The third is deliberately outside the corpus.
>
> Watch what the agent does on the third query. With our system prompt, it should say 'I don't know.' Most tutorial RAG agents would happily make up an answer. Ours doesn't."

**[ON SCREEN]** Show the three printed answers.

---

## SECTION 5 — Plug both into the agent (22:00 – 27:00)

**[VISUAL]** Open `code/03_memory_agent.py`.

### [22:00] Two tools, not one

> "Open `03_memory_agent.py`. The agent now has two new tools: `recall_memory` and `search_documents`. Both wrap the work we just did.
>
> The reason they're separate — and the reason this matters — is the model can decide which one to use. 'What did I ask you yesterday?' is a memory question. 'What does the embeddings primer say about cosine similarity?' is a RAG question. Mixing them confuses retrieval. Separating them lets the model pick correctly."

**[ON SCREEN]** Show the two tool definitions side by side.

### [23:30] Walk the agent

> "The agent class is the Episode 1 `SimpleAgent` with three changes:
>
> One — extra tools.
> Two — every successful interaction is written to memory.
> Three — the system prompt is updated to mention the new tools."

```python
SYSTEM_PROMPT = (
    "You are a careful research assistant with two long-term resources: "
    "(1) `recall_memory` — facts the user has told you in the past; "
    "(2) `search_documents` — a corpus of reference notes. "
    "Use the right tool for the question. Prefer document search for "
    "factual questions; prefer memory recall when the user refers to a "
    "previous conversation."
)
```

### [25:00] Run it

**[ON SCREEN]** Terminal.

```bash
$ python code/03_memory_agent.py
```

> "Two interactions in sequence.
>
> First, I tell the agent: 'My favourite arithmetic operator is the Pythonic two-stars-power-operator.' Watch — this gets written to memory. Salience filter passes it. Dedup doesn't fire because we haven't said it before.
>
> Second, I ask: 'What did I tell you about my preferences earlier?' The agent calls `recall_memory`, gets the right hit, and answers correctly.
>
> Third, I ask a corpus question — 'According to the embeddings primer, why is dimensionality important?' The agent calls `search_documents`, retrieves the relevant chunk, and answers from the corpus.
>
> Two questions, two different tools, both correct. That's the win."

**[ON SCREEN]** Show the trace.

---

## SECTION 6 — Wrap-up and take-home (27:00 – 30:00)

### [27:00] What's broken

> "Be honest about what's still wrong with this agent.
>
> One — retrieval can miss. The agent doesn't know it missed. It will sometimes answer confidently from a chunk that's only loosely related. We don't have a similarity threshold yet.
>
> Two — memory grows unbounded. There's no TTL, no max size, no archival. In production you'd prune.
>
> Three — there's no eval. We have no automatic check that 'good retrieval' produces 'good answer.' That's exactly what Episode 3 builds."

### [28:00] Three exercises

> "Three things to try before Episode 3.
>
> One — drop your own notes folder into `./data/` and re-run. See what retrieval gets right. See what it gets wrong.
>
> Two — change `CHUNK_TOKENS` from 500 to 200. Then to 1500. Re-run the same query each time. Decide what your sweet spot is for *your* corpus.
>
> Three — break retrieval on purpose. Ask the agent something that's only adjacent to your corpus. Watch how confidently it answers anyway. Make a note of which queries trip it up. We'll fix this in Episode 3."

### [29:00] Quiz

**[VISUAL]** Slide with three questions.

> "Quick check before you move on.
>
> One — what's the difference between memory and RAG?
> Two — why does the chunker use overlap?
> Three — what happens if you mix two different embedding models in the same store?
>
> If you got all three, you're ready for Episode 3."

### [29:30] Close

> "Episode 3 is about taking what we have and making it production-ready. Prompt injection — what happens when an attacker writes malicious text into a document we retrieve. Eval harnesses — how to know whether the agent is right. Observability — how to know what the agent did, in production, after the fact.
>
> The next 30 minutes turn this demo into something you'd actually deploy."

**[VISUAL]** Title card: "Next: Episode 3 — Production & Safety."

---

## Production notes

- Section 4 is the most code-heavy. Cut to the terminal at [20:30] aggressively — viewers want to see retrieval working before they want more code.
- The "deliberate miss" demo at [20:30] is the highest-value moment in the episode. If your model picks up the answer from somewhere else and answers it anyway, edit a stricter system prompt and re-record.
- The agent demo at [25:00] is sensitive to model variance. `gpt-4o-mini` does the right thing 95% of the time. If your take has it pick the wrong tool, retake. Don't post-edit confusion as success.
- Don't over-celebrate the "memory persists between runs" moment — that's table stakes, not magic. The big idea of the episode is the *separation* between memory and RAG, not the persistence.
