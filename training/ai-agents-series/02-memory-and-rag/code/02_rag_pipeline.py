"""
Episode 2 — File 2: A complete RAG pipeline (chunk → embed → retrieve → answer).

Run:
    python code/02_rag_pipeline.py

What you'll learn:
- How to chunk text by tokens with overlap (and why overlap matters).
- How to load a folder of .md / .txt files into a vector store.
- How to retrieve top-k relevant chunks and answer a question with them.
- How to write the system prompt that stops the model from hallucinating
  beyond the provided context.

Indexes the contents of `./data/` (a small sample is shipped). Drop your own
.md or .txt files in there and re-run.
"""

from __future__ import annotations

import os
import sys
from dataclasses import dataclass
from pathlib import Path

import chromadb
import tiktoken
from chromadb.utils import embedding_functions
from dotenv import load_dotenv
from openai import OpenAI


# ---------------------------------------------------------------------------
# Tunables. Try changing these — that's part of the exercise.
# ---------------------------------------------------------------------------

CHUNK_TOKENS = 500
CHUNK_OVERLAP = 50
TOP_K = 3
EMBEDDING_MODEL = "text-embedding-3-small"
ANSWER_MODEL = "gpt-4o-mini"


# ---------------------------------------------------------------------------
# Chunking.
# ---------------------------------------------------------------------------

def chunk_text(text: str, chunk_tokens: int = CHUNK_TOKENS,
               overlap: int = CHUNK_OVERLAP) -> list[str]:
    """Split text into fixed-size token windows with overlap.

    Token-based chunking is more predictable than character-based: a chunk
    of 500 tokens fits in a known piece of the model's context, regardless
    of how many characters that translates to.
    """
    enc = tiktoken.encoding_for_model(ANSWER_MODEL)
    tokens = enc.encode(text)
    if not tokens:
        return []

    step = max(1, chunk_tokens - overlap)
    chunks: list[str] = []
    i = 0
    while i < len(tokens):
        window = tokens[i : i + chunk_tokens]
        chunks.append(enc.decode(window))
        if i + chunk_tokens >= len(tokens):
            break
        i += step
    return chunks


# ---------------------------------------------------------------------------
# Loading a corpus from disk.
# ---------------------------------------------------------------------------

@dataclass
class Doc:
    source: str
    text: str


def load_corpus(path: Path) -> list[Doc]:
    docs: list[Doc] = []
    if not path.exists():
        return docs
    for f in sorted(path.glob("**/*")):
        if f.is_file() and f.suffix.lower() in {".md", ".txt"}:
            docs.append(Doc(source=str(f.relative_to(path)), text=f.read_text(encoding="utf-8")))
    return docs


# ---------------------------------------------------------------------------
# Indexing.
# ---------------------------------------------------------------------------

def build_index(
    docs: list[Doc],
    persist_path: str = "./chroma_rag",
    collection_name: str = "rag_corpus",
    api_key: str | None = None,
) -> chromadb.api.models.Collection.Collection:
    api_key = api_key or os.getenv("OPENAI_API_KEY")
    client = chromadb.PersistentClient(path=persist_path)
    embed = embedding_functions.OpenAIEmbeddingFunction(
        api_key=api_key,
        model_name=EMBEDDING_MODEL,
    )
    collection = client.get_or_create_collection(
        name=collection_name,
        embedding_function=embed,
        metadata={"hnsw:space": "cosine"},
    )

    # Track which chunk IDs already exist so re-running is cheap.
    existing = set(collection.get().get("ids", []))

    added = 0
    for doc in docs:
        chunks = chunk_text(doc.text)
        ids: list[str] = []
        documents: list[str] = []
        metadatas: list[dict] = []
        for i, chunk in enumerate(chunks):
            chunk_id = f"{doc.source}::chunk{i:04d}"
            if chunk_id in existing:
                continue
            ids.append(chunk_id)
            documents.append(chunk)
            metadatas.append({"source": doc.source, "chunk_index": i})
        if ids:
            collection.add(ids=ids, documents=documents, metadatas=metadatas)
            added += len(ids)

    print(f"Indexed {added} new chunk(s); collection now has {collection.count()} total.")
    return collection


# ---------------------------------------------------------------------------
# Retrieve and answer.
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = (
    "You answer questions using ONLY the context provided. "
    "If the context does not contain the answer, say so plainly — do not guess. "
    "Be concise. Cite the source filename in parentheses for each claim."
)


def retrieve(collection, query: str, k: int = TOP_K) -> list[dict]:
    """Return top-k chunks for `query`, each with text, source, similarity."""
    if collection.count() == 0:
        return []
    results = collection.query(
        query_texts=[query],
        n_results=min(k, collection.count()),
        include=["documents", "metadatas", "distances"],
    )
    return [
        {
            "text": doc,
            "source": md["source"],
            "chunk_index": md["chunk_index"],
            "similarity": 1 - dist,
        }
        for doc, md, dist in zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0],
        )
    ]


def answer(collection, query: str, client: OpenAI) -> str:
    hits = retrieve(collection, query)
    if not hits:
        return "(corpus is empty — drop some .md or .txt files in ./data/)"

    context = "\n\n".join(
        f"[source: {h['source']}, chunk {h['chunk_index']}, similarity {h['similarity']:+.2f}]\n{h['text']}"
        for h in hits
    )
    user = f"Context:\n{context}\n\nQuestion: {query}"

    response = client.chat.completions.create(
        model=ANSWER_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user},
        ],
        max_completion_tokens=400,
    )
    return response.choices[0].message.content or ""


# ---------------------------------------------------------------------------
# Demo.
# ---------------------------------------------------------------------------

def main() -> None:
    print("=" * 60)
    print("Episode 2 / File 2 — RAG pipeline")
    print("=" * 60)

    load_dotenv()
    if not os.getenv("OPENAI_API_KEY"):
        sys.exit("OPENAI_API_KEY not set. Copy ../.env.example to .env and fill it in.")

    data_dir = Path(__file__).resolve().parent.parent / "data"
    docs = load_corpus(data_dir)
    print(f"Loaded {len(docs)} document(s) from {data_dir}.")

    collection = build_index(docs)
    client = OpenAI()

    queries = [
        "What are the four components every AI agent has?",
        "Why does the chunker use overlap?",
        # Outside the corpus on purpose — the system prompt should make us say so.
        "Who won the 1998 World Cup final?",
    ]

    for q in queries:
        print("\n" + "-" * 60)
        print(f"Q: {q}\n")
        hits = retrieve(collection, q)
        for h in hits:
            print(f"  retrieved [{h['similarity']:+.2f}] {h['source']} (chunk {h['chunk_index']})")
        print()
        print(f"A: {answer(collection, q, client)}")


if __name__ == "__main__":
    main()
