---
title: 'KnowledgeBase Platform'
description: 'Turns code repositories into a queryable knowledge base — ask natural-language questions at repository, application, or workspace scope and get grounded, cited answers.'
order: 2
---

**Java · Spring Boot · RAG**

Onboarding onto an unfamiliar codebase usually means grepping around and
interrupting someone who already knows it. KBP turns the repository itself
into something you can ask: natural-language questions at repository,
application, or workspace scope, answered with confidence scores and exact
source citations.

Underneath, it derives functional hierarchies — domain, feature, scenario —
and generates BDD specs that can drive modernization rewrites. A hexagonal
core (`kbp-core`) stays framework-free and ArchUnit-enforced; PostgreSQL with
pgvector backs retrieval; secret and PII scrubbing runs before anything is
embedded. Coverage, mutation score, and dependency rules are build-fail
gates, not advisory checks.

[Repository](https://github.com/anandmnair/KnowledgeBase-Platform) ·
[Documentation](https://anandmnair.github.io/KnowledgeBase-Platform/)
