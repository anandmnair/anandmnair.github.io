---
title: 'AI'
description: 'The AI development life cycle, automation, agentic use cases, and the models and frameworks behind them.'
navLabel: 'AI'
order: 3
tags: ['ai', 'agentic', 'llm']
updated: 2026-08-23
cards: true
projects:
  - name: AIDLC
    stack: Agentic AI · TDD · Multi-tool Pipeline
    blurb: >-
      A tool-agnostic, agentic AI development life cycle. Feed it a requirement in .md
      format and seven specialist AI agents take it from analysis to pull request, with a
      mandatory human gate at every phase boundary.
    page: /projects/aidlc/
    repo: https://github.com/anandmnair/aidlc
    docs: https://anandmnair.github.io/aidlc/
    year: 2026
    badges: [product]
  - name: KnowledgeBase Platform
    stack: Java · Spring Boot · RAG
    blurb: >-
      Turns code repositories into a queryable knowledge base — ask natural-language
      questions at repository, application, or workspace scope and get grounded answers
      with confidence scores and exact source citations.
    page: /projects/knowledgebase-platform/
    repo: https://github.com/anandmnair/KnowledgeBase-Platform
    docs: https://anandmnair.github.io/KnowledgeBase-Platform/
    year: 2026
    badges: [product]
  - name: Knowledge Platform
    stack: Java 21 · Spring Boot · Hexagonal · pgvector
    blurb: >-
      A second, hexagonal take on the same problem as KnowledgeBase Platform — every
      external dependency (LLM, embeddings, vector store, language analyzer) sits behind
      a port, swappable without touching the core.
    page: /projects/knowledge-platform/
    repo: https://github.com/anandmnair/knowledge-platform
    year: 2026
    badges: [product]
  - name: Copilot Skills Kit
    stack: GitHub Copilot · Skills · Prompts
    blurb: >-
      Early experiment standardising GitHub Copilot skills and prompts across a team.
      Deprecated in favour of AIDLC, which does the same job tool-agnostically.
    page: /projects/copilot/
    repo: https://github.com/anandmnair/copilot
    year: 2026
    badges: [poc]
  - name: Document Extractor
    stack: Python · FastAPI · Agentic AI
    blurb: >-
      Extracts MT700 letter-of-credit fields from PDF documents via an LLM, for
      automating LC issuance. Every extracted value is traced back to its source
      document, page and line.
    page: /projects/document-extractor/
    repo: https://github.com/anandmnair/document-extractor
    year: 2026
    badges: [poc]
---
AI changed how software gets written before it changed what software does. Both
matter, and they need different disciplines — one is an engineering practice
question, the other an architecture question.

## Practice and architecture

- **How code gets written** — the
  [AI development life cycle](/ai/ai-development-life-cycle/) and the
  [models and frameworks](/ai/llms-frameworks/) behind it. The engineer owns
  every line; review, not typing, is the bottleneck.
- **What the software does** — [automation](/ai/automation/) and
  [agentic use cases](/ai/agentic-use-cases/). Where a probabilistic component
  earns its place in a system that still has to be correct.

## Principles

The rules that survive contact with a real pipeline:

- **AI is probabilistic — design for it.** Assume confident wrong answers and
  build the system that catches them.
- **Deterministic validation is first-class.** Testable, versioned, owned — the
  same bar as any other production code.
- **Never block the business process.** If the model is wrong or unavailable,
  the work falls back to a human and keeps moving.
- **Maker–checker.** The model proposes; deterministic rules and, where needed,
  a human dispose.
- **Close the loop.** Human corrections feed back into prompts and rules —
  improvement by design, not a rising tide of escalations.

See [automation](/ai/automation/) for these worked through on a
document-verification pipeline.
