---
title: 'Knowledge Platform'
description: 'A second, hexagonal take on turning any git repository into a queryable knowledge base — pluggable analyzers, embeddings, and LLM providers behind ports, none of them wired to a framework.'
order: 3
---

**Java 21 · Spring Boot · Hexagonal · pgvector**

KnowledgeBase Platform proved the idea worked. This is the rebuild that asks
what it looks like when every external dependency — the LLM, the embedding
model, the reranker, the vector store, even the language analyzer — is a
plugin behind a port, not a library baked into the core.

`platform-core` holds domain, use cases, and ports with zero infrastructure
imports; everything else — `platform-llm` (Anthropic, Gemini), `platform-embed`
(Voyage, Nomic), `platform-vector` (pgvector), `platform-rerank`, `platform-scm`
(JGit), and per-language analyzers for Java, .NET, Python, COBOL and SQL — is
an adapter module that depends inward only. A repo gets scanned into a
canonical code graph, enriched through a multi-pass summarize → extract →
verify → embed pipeline that is deliberately built to abstain rather than
guess, then served through hybrid, multi-hop retrieval with citations and
BDD-scenario generation for legacy features.

Same problem as KnowledgeBase Platform, different bet on where the
architecture boundaries should sit.

[Repository](https://github.com/anandmnair/knowledge-platform)
