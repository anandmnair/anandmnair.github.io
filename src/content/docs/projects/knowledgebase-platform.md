---
title: 'KnowledgeBase Platform'
titleIcon: >-
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img"
  aria-label="KnowledgeBase Platform logo"><circle cx="24" cy="24" r="22"
  fill="#1565c0"/><circle cx="16" cy="18" r="4" fill="#90caf9"/><circle
  cx="32" cy="18" r="4" fill="#90caf9"/><circle cx="24" cy="32" r="4"
  fill="#90caf9"/><line x1="16" y1="18" x2="24" y2="32" stroke="#e3f2fd"
  stroke-width="1.6"/><line x1="32" y1="18" x2="24" y2="32" stroke="#e3f2fd"
  stroke-width="1.6"/><line x1="16" y1="18" x2="32" y2="18" stroke="#e3f2fd"
  stroke-width="1.6"/></svg>
description: 'Turns code repositories into a queryable knowledge base — ask natural-language questions at repository, application, domain or workspace scope and get grounded answers with confidence scores and exact source citations.'
order: 2
---

**Java · Spring Boot · Hexagonal · RAG · pgvector**

Onboarding onto an unfamiliar codebase usually means grepping around and
interrupting whoever already knows it. **KBP** turns the repository itself
into something you can ask: point it at a Git remote, let it index the head
commit, then ask natural-language questions and get answers that **cite the
exact files and lines** they are grounded in — at repository, application,
domain or workspace scope, each with a confidence score, the answering model,
and latency.

On top of retrieval it derives a **Domain → Feature → Scenario** hierarchy
from the code and generates cited Markdown specs and Gherkin BDD files that
can drive modernization rewrites of legacy systems.

## The web UI

Everything is driven from one embedded web UI — no separate front-end app and
no build step. Three surfaces talk to versioned `/api/v1/**` endpoints:

| Surface | Route | What it is for |
|---------|-------|----------------|
| **Home · Ask** | `/home` | Ask questions about the indexed code. Answers render Markdown, highlighted code and Mermaid diagrams, each with citations, a confidence score, the answering model and latency. Optionally generate BDD (Gherkin) scenarios or restrict the search to code and tests only. Past conversations reload from a history picker. |
| **Graph** | `/graph` | A canvas view of one scope's code units plus the tables, queues and topics they touch. Nodes are coloured by type; edges are calls and reads/writes. Click a node to inspect it and walk its neighbours. |
| **Configuration** | `/config` | Onboard repositories, run and cancel scans, manage applications, domains and workspaces. Deriving an application builds its Domain → Feature → Scenario hierarchy from the linked code. |

<figure>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/img/kbp/home-dark.jpg" />
    <img src="/img/kbp/home-light.jpg" alt="Home · Ask — a reloaded conversation whose answer renders a centered Mermaid flowchart, with grounded-in citations, a confidence pill and the answer toolbar" loading="lazy" />
  </picture>
  <figcaption><strong>Home · Ask</strong> — an answer rendering a Mermaid diagram (with Source / Image copy buttons), grounded-in citations, a confidence pill, the answering model, and the BDD / download / feedback controls.</figcaption>
</figure>

<figure>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/img/kbp/graph-dark.jpg" />
    <img src="/img/kbp/graph-light.jpg" alt="Graph — the failover repository scope, code units coloured by type, node and relationship legends on the right, scope switch and entity list on the left" loading="lazy" />
  </picture>
  <figcaption><strong>Graph</strong> — one scope's code units coloured by type, the node and relationship legends on the right, the scope switch and entity list on the left, a path filter at the bottom.</figcaption>
</figure>

<figure>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/img/kbp/config-dark.jpg" />
    <img src="/img/kbp/config-light.jpg" alt="Configuration — the Repositories tab with onboarded repos, a GitHub link and short SHA per row, last-indexed time, live status and Scan / Force scan / Delete actions" loading="lazy" />
  </picture>
  <figcaption><strong>Configuration</strong> — the Repositories tab: a GitHub link and short SHA per row, last-indexed time, live scan status, and Scan / Force scan / Delete actions.</figcaption>
</figure>

## Architecture

A hexagonal, multi-module platform: a pure domain core (`kbp-core`,
framework-free and ArchUnit-enforced) surrounded by replaceable adapters. Two
Spring Boot apps wire it together — an API serving the REST surface and an
embedded web UI, and a worker running ingestion jobs on bounded virtual
threads.

<pre class="mermaid">
flowchart LR
  U["Engineer / BA / Architect"] --> UI["Web UI — /home, /graph, /config"]
  UI --> API["kbp-app-api — REST + OpenAPI"]
  API --> CORE["kbp-core — pure domain, ports only"]
  WORKER["kbp-app-worker — ingestion jobs"] --> CORE
  CORE -. ports .-> ADP["Adapters"]
  ADP --> PG[("PostgreSQL 16 + pgvector")]
  ADP --> GIT["Git remotes (JGit)"]
  ADP --> LLM["LLM + embedding providers"]
</pre>

The dependency rule points one way — toward the core, which depends on
nothing but `java.*`. It is enforced three ways, all build-failing: ArchUnit
(`HexagonalRulesTest`), Maven Enforcer banned-dependency coordinates, and the
module graph (only `kbp-app-*` modules declare Spring Boot starters).

**Invariants live in the types, not in review comments:**

- An `Answer` with no citations throws at construction — an uncited answer is unrepresentable.
- `ChunkerPort` accepts only a `ScrubbedCodeUnit` — unscrubbed content is unembeddable by type.
- Retrieval filters carry a `Principal` from day one — permission enforcement is config, not a later refactor.
- `Repository` lifecycle transitions (`indexing → ready | failed`) are guarded methods; illegal transitions throw.

## Ingestion pipeline

A repository at a commit SHA becomes queryable chunks, embeddings, and a
graph through stages S1–S8. A no-op guard skips the whole pipeline when the
head SHA is unchanged (zero clone, zero parse, zero tokens); summarize and
embed run in batches of 32, each written before the next is computed, so a
run that dies at 90 % keeps 90 % of its work.

<pre class="mermaid">
flowchart TD
  S1["S1 · Acquire — JGit shallow checkout"] --> S2["S2 · Detect & filter — LanguageDetector"]
  S2 --> S3["S3 · Parse — highest-fidelity adapter per language"]
  S3 --> S4a["S4a · Scrub — mandatory, non-bypassable"]
  S4a --> S4["S4 · Chunk — ScrubbedCodeUnit only"]
  S4 --> S5["S5 · Summarize — FAST tier, selective + cached"]
  S5 --> S7["S7 · Embed & index — summary + content, one vector"]
  S7 --> S8["S8 · Graph — call and data-access edges"]
  S8 --> S6["S6 · Derive hierarchy — async, per Application"]
</pre>

Scrubbing sits between parse and chunk **by type** — the next stage's only
accepted input is the scrubber's own output, so no secret or PII reaches an
embedding provider. Summaries are content-addressed and cached, so an
unchanged file keeps its summary across commits and a force re-scan collapses
the embed stage to a lookup.

## Retrieval — how an answer is built

One `AskQuestionService` implements both the one-shot ask and the multi-turn
conversation. Confidence is computed from retrieval signals only — never
parsed from model output — and any step that cannot ground an answer degrades
to a **Clarification** rather than guessing.

<pre class="mermaid">
flowchart TD
  A["Scope resolution — repo / app / domain / workspace to RepositoryRef set"] --> B["Authorization filter — SearchFilter over Principal"]
  B --> C["Query rewrite — FAST tier + vocabulary terms"]
  C --> D["Hybrid recall — vector top-40 union lexical top-20"]
  D --> E{"Sufficiency gate — per-channel score floors"}
  E -- "insufficient" --> CL["Clarification"]
  E -- "sufficient" --> F["Reciprocal Rank Fusion — rank-based, scale-free"]
  F --> G["Graph-seeded expansion — 1-hop over top-10 hits"]
  G --> H["Listwise rerank — cut to top-8"]
  H --> I["Grounded synthesis — FRONTIER tier"]
  I --> J{"Evidence assembly — citation verification"}
  J -- "no valid citation" --> CL
  J -- "cited" --> K["Answer — platform-computed confidence"]
</pre>

The same evidence discipline extends to the derived artifacts: spec
generation checks citations paragraph by paragraph, BDD rendering rejects any
Given/When/Then line whose chunk references don't resolve, and workspace
comparison won't assert `PRESENT_BOTH` / `DIFFERS` / `ONLY_A` / `ONLY_B`
without at least one backing code or test chunk.

## Modules

| Module | Role |
|--------|------|
| `kbp-core` | Pure domain — entities, value objects, ports. Zero framework dependencies |
| `kbp-persistence` | PostgreSQL + pgvector adapter; Flyway migrations |
| `kbp-llm` | LLM + embedding provider routing — `fake`, `anthropic`, `openai`, `gemini`, `ollama` |
| `kbp-scm-git` | Git source-control adapter (JGit shallow checkout) |
| `kbp-scrub` | Mandatory secret / PII scrubbing before any content is embedded |
| `kbp-parser-*` | One adapter per language — `java`, `sql`, `cobol`, `docs`, `treesitter` |
| `kbp-db-introspect` | Live-schema introspection, bind-parameter-only |
| `kbp-eval` | Golden-corpus evaluation harness |
| `kbp-app-api` | Spring Boot REST API + embedded UI (OpenAPI/Swagger, actuator) |
| `kbp-app-worker` | Spring Boot ingestion worker (bounded virtual threads) |

## Quality gates

Build-fail, not advisory:

- Line, instruction, branch, and method coverage **≥ 95 % per module** (JaCoCo), counting unit and integration tests — adapters tested only via Testcontainers are measured on those
- Mutation score **≥ 95 % on `kbp-core`** (PIT)
- Hexagonal dependency rules — ArchUnit + Maven Enforcer banned dependencies
- Integration tests for every key flow (Testcontainers)
- The browser code in `kbp-app-api` runs on Node's built-in test runner during that module's test phase

A zero-key, zero-cost profile (`provider: fake`) exercises the full pipeline
— ingestion, retrieval, spec and BDD generation — with no credentials, so the
whole stack comes up under five minutes with Docker Compose.

[Repository](https://github.com/anandmnair/KnowledgeBase-Platform) ·
[Documentation](https://anandmnair.github.io/KnowledgeBase-Platform/)
