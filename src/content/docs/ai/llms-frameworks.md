---
title: 'LLMs & frameworks'
description: 'Untested prompts are untested code. Build a small evaluation set early — representative inputs with known-good outputs — and run it on every prompt change. Without it, "the new'
order: 4
---

- **Models** — Claude (Anthropic), GPT (OpenAI). Model choice matters less than
  the harness around it; assume you will swap.
- **Provider abstraction.** A pluggable provider registry, not a hard dependency.
  Prices, capabilities and availability all change faster than your release cycle.
- **Python** — the ecosystem for pipelines, evaluation and orchestration.
- **Spring AI** — when the workload belongs inside an existing JVM service and
  the operational model matters more than the ML ecosystem.
- **Retrieval** — PostgreSQL with `pgvector` where you already run Postgres, a
  dedicated store where scale demands it. Start with what you already operate.

### Evaluation

Untested prompts are untested code. Build a small evaluation set early —
representative inputs with known-good outputs — and run it on every prompt
change. Without it, "the new prompt seems better" is the entire quality process.
