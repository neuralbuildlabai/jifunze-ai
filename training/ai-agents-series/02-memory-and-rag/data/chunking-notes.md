# Chunking strategies

The unit of retrieval is the chunk, not the document. Choose chunks too small and you lose context. Choose chunks too large and you bury the signal in noise.

## Three strategies

1. **Fixed-size token windows.** Split the document into N-token windows with a small overlap (e.g. 500 tokens with 50 overlap). Simple, predictable, and the right starting point.
2. **Semantic boundaries.** Split on paragraphs, headings, or sentence groups. Better for prose; worse for code.
3. **Document structure.** Use the headings of a markdown document as natural chunks, with the heading itself prepended. Best when your corpus has consistent structure.

## Recommended starting point

For a mixed corpus of notes and documentation:

- 500 tokens per chunk
- 50 tokens of overlap between consecutive chunks
- Chunks always end on a sentence boundary if possible

This is what `02_rag_pipeline.py` implements. It is not state-of-the-art, but it is honest and easy to reason about.

## Failure modes

- **Chunks that span only a code fence.** All the surrounding context is lost. Fix: include the section heading.
- **Chunks where the relevant sentence is split between two windows.** Overlap mitigates this.
- **A chunk that's mostly boilerplate (license, navigation).** This pollutes the store with noise. Filter at chunk time, not at retrieval time.
