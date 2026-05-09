"""
Episode 2 — File 1: Persistent vector memory with deduplication and a salience filter.

Run:
    python code/01_persistent_memory.py

What you'll learn:
- How to use ChromaDB's PersistentClient (the version that actually persists).
- How to write a small dedup + salience filter so memory stays useful.
- How to read similarity scores and use them to debug retrieval.

This file does NOT call an LLM. It's the smallest standalone vector store that
behaves the way memory should — durable, deduplicated, and not full of junk.
"""

from __future__ import annotations

import hashlib
import os
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

import chromadb
from chromadb.utils import embedding_functions
from dotenv import load_dotenv


# ---------------------------------------------------------------------------
# Salience: what we don't bother storing.
# ---------------------------------------------------------------------------
#
# Conservative on purpose. Better to keep too much than to filter too hard.

_LOW_VALUE = {
    "ok", "okay", "sure", "thanks", "thank you", "got it",
    "yes", "no", "yep", "nope", "k", "kk",
}


def _should_remember(content: str) -> bool:
    """Salience filter. Returns True if `content` is worth storing."""
    s = content.strip()
    if len(s) < 8:
        return False
    if s.lower() in _LOW_VALUE:
        return False
    return True


# ---------------------------------------------------------------------------
# Dedup: hash the normalised content. Same hash means we already have it.
# ---------------------------------------------------------------------------

def _content_hash(content: str) -> str:
    return hashlib.sha256(content.strip().lower().encode("utf-8")).hexdigest()[:16]


# ---------------------------------------------------------------------------
# The Recall result type.
# ---------------------------------------------------------------------------

@dataclass
class Recall:
    text: str
    similarity: float       # cosine similarity, range -1.0 to 1.0
    metadata: dict


# ---------------------------------------------------------------------------
# The memory store.
# ---------------------------------------------------------------------------

class PersistentMemory:
    """A small wrapper around ChromaDB with persistence, dedup, and salience.

    The store lives on disk under `path` (default ./chroma) and survives
    process restarts. Two methods you actually use:

        memory.remember(text)               # add a fact
        memory.recall(query, n=3)           # retrieve top-n similar facts
    """

    def __init__(
        self,
        path: str | Path = "./chroma",
        collection_name: str = "agent_memory",
        embedding_model: str = "text-embedding-3-small",
        api_key: str | None = None,
    ) -> None:
        api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise RuntimeError(
                "OPENAI_API_KEY is required for embeddings. "
                "Copy ../.env.example to .env and fill it in."
            )

        self._client = chromadb.PersistentClient(path=str(path))
        self._embed = embedding_functions.OpenAIEmbeddingFunction(
            api_key=api_key,
            model_name=embedding_model,
        )
        self._collection = self._client.get_or_create_collection(
            name=collection_name,
            embedding_function=self._embed,
            metadata={"hnsw:space": "cosine"},
        )

    def __len__(self) -> int:
        return self._collection.count()

    def remember(self, text: str, source: str = "user") -> str:
        """Store `text` if it passes salience and dedup filters.

        Returns one of: "added", "skipped:duplicate", "skipped:low-value".
        """
        if not _should_remember(text):
            return "skipped:low-value"

        content_id = _content_hash(text)
        existing = self._collection.get(ids=[content_id])
        if existing.get("ids"):
            return "skipped:duplicate"

        self._collection.add(
            ids=[content_id],
            documents=[text],
            metadatas=[
                {
                    "source": source,
                    "stored_at": datetime.now(timezone.utc).isoformat(),
                }
            ],
        )
        return "added"

    def remember_many(self, texts: Iterable[str], source: str = "user") -> dict[str, int]:
        counts = {"added": 0, "skipped:duplicate": 0, "skipped:low-value": 0}
        for t in texts:
            counts[self.remember(t, source=source)] += 1
        return counts

    def recall(self, query: str, n: int = 3) -> list[Recall]:
        if self._collection.count() == 0:
            return []
        results = self._collection.query(
            query_texts=[query],
            n_results=min(n, self._collection.count()),
            include=["documents", "metadatas", "distances"],
        )
        documents = results["documents"][0]
        metadatas = results["metadatas"][0]
        distances = results["distances"][0]
        # ChromaDB returns cosine *distance* (0 = identical, 2 = opposite).
        # Convert to similarity (1 = identical, -1 = opposite).
        return [
            Recall(text=d, similarity=1 - dist, metadata=md)
            for d, dist, md in zip(documents, distances, metadatas)
        ]

    def reset(self) -> None:
        """Wipe everything. Use sparingly."""
        self._client.delete_collection(self._collection.name)
        self._collection = self._client.get_or_create_collection(
            name=self._collection.name,
            embedding_function=self._embed,
            metadata={"hnsw:space": "cosine"},
        )


# ---------------------------------------------------------------------------
# Demo.
# ---------------------------------------------------------------------------

def main() -> None:
    print("=" * 60)
    print("Episode 2 / File 1 — Persistent vector memory")
    print("=" * 60)

    load_dotenv()
    if not os.getenv("OPENAI_API_KEY"):
        sys.exit("OPENAI_API_KEY not set. Copy ../.env.example to .env and fill it in.")

    memory = PersistentMemory(path="./chroma")
    print(f"Memory store loaded with {len(memory)} existing entries.\n")

    facts = [
        "The user's name is Jordan and they prefer concise answers.",
        "Jordan is working on a Python data pipeline for invoice processing.",
        "Jordan dislikes verbose system messages and over-explanation.",
        "Jordan is in the GMT+3 time zone.",
        # A duplicate of the first one — should dedup.
        "The user's name is Jordan and they prefer concise answers.",
        # Low-value — should be filtered out.
        "ok",
    ]

    counts = memory.remember_many(facts)
    print("Insert results:")
    for status, n in counts.items():
        print(f"  {status:>22} : {n}")
    print(f"\nMemory store now has {len(memory)} entries.\n")

    queries = [
        "What's Jordan's preferred response style?",
        "What kind of project is Jordan working on?",
        "Tell me about quantum computing.",  # not in memory
    ]

    print("Recall results (similarity in [-1, 1], higher = more similar):\n")
    for q in queries:
        print(f"Q: {q}")
        for r in memory.recall(q, n=3):
            print(f"  [{r.similarity:+.3f}] {r.text}")
        print()

    print("Run this script again — the second run should report duplicate")
    print("rejections rather than re-adding everything. That's the persistence")
    print("working.")


if __name__ == "__main__":
    main()
