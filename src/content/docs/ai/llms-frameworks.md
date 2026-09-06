---
title: 'LLMs & frameworks'
description: >-
  Claude and GPT behind a pluggable provider registry, Python for pipelines, pgvector for
  retrieval. Untested prompts are untested code — a small evaluation set run on every prompt
  change is the whole quality process.
order: 4
cardBadges: ['Claude', 'pgvector']
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

Make it a gate, not a ritual: the set runs in CI, a regression fails the build,
and a prompt edit ships with its eval delta the way code ships with tests. **If
you cannot test it, you cannot trust it in production** — and that holds for a
prompt, a retrieval config and a fine-tune alike.

### Tooling

Frameworks change; the evaluation set is the part that keeps its value. Pick the
lightest stack that covers your pipeline stages, and reach for a framework when a
concrete need appears — streaming, tool routing, multi-step orchestration — not
before.

| Stage | Python | JVM |
|---|---|---|
| Orchestration | LangChain, LlamaIndex, plain SDK | Spring AI, LangChain4j |
| Retrieval | LlamaIndex, `pgvector`, a dedicated store | Spring AI vector stores, `pgvector` |
| Prompt / program tuning | DSPy | prompt templates under version control |
| Evaluation | promptfoo, ragas, `pytest` | JUnit over a fixture set, promptfoo (CLI) |

Start with the vendor SDK and a folder of test cases. Get hands-on with the
models first — the abstraction you pick matters less than knowing what it hides.