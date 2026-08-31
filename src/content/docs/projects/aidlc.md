---
title: 'AIDLC — AI Development Life Cycle'
titleIcon: >-
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img"
  aria-label="AIDLC logo"><defs><linearGradient id="aidlc-g" x1="0" y1="0"
  x2="1" y2="1"><stop offset="0" stop-color="#7c8cf8"/><stop offset="1"
  stop-color="#22d3ee"/></linearGradient></defs><circle cx="32" cy="32"
  r="23" fill="none" stroke="url(#aidlc-g)" stroke-width="5"
  stroke-linecap="round" stroke-dasharray="112 38"/><path
  d="M49 13 L58 17 L52 24 Z" fill="#22d3ee"/><g fill="url(#aidlc-g)"><circle
  cx="32" cy="18.3" r="2.4"/><rect x="31" y="19.8" width="2" height="5"/><rect
  x="21.5" y="24.5" width="21" height="18" rx="4.5"/><rect x="18.4" y="30"
  width="3" height="7" rx="1.5"/><rect x="42.6" y="30" width="3" height="7"
  rx="1.5"/></g><g fill="#ffffff"><circle cx="27.5" cy="32.3" r="2.7"/><circle
  cx="36.5" cy="32.3" r="2.7"/><rect x="27.5" y="37.4" width="9" height="2.4"
  rx="1.2"/></g></svg>
description: 'AIDLC is a tool-agnostic, agent-driven development life cycle. You feed it a requirement in .md format, and a pipeline of specialized AI agents takes it from analysis to pull request — with an objective exit check at every phase boundary and an explicit human gate at the phases that carry one. It works with Claude Code, GitHub Copilot, Cursor, Gemini CLI, Windsurf, and JetBrains IDEs through a single installer.'
order: 1
---

**Agentic AI · TDD · Multi-tool Pipeline**

AIDLC is not a prompt collection — it is a **governed delivery process** for
AI-assisted software. You feed it a requirement in `.md` form, and an
eleven-phase pipeline of narrow-responsibility AI agents carries it from
knowledge-base sync to merge-ready pull requests: an **objective exit check at
every phase boundary**, an **explicit human gate** at the phases that carry
one, and a machine-readable run record that makes the whole thing resumable
and auditable.

## The problem it solves

"One big prompt" development fails in predictable, expensive ways — invented
requirements, 2,000-line diffs nobody can review, tests written to fit the
code, confident hallucination of APIs, quality that erodes as the session
fills its context window, and work that is lost the moment the session ends.

<pre class="mermaid">
flowchart TB
  subgraph OBP["One big prompt"]
    direction TB
    A1["Requirement, partly assumed"] --> A2["One long session"]
    A2 --> A3["2,000-line diff"]
    A3 --> A4{"Review"}
    A4 -- "what was it supposed to do?" --> A1
  end
  subgraph AID["AIDLC"]
    direction TB
    B1["Requirement, gaps answered"] --> B2["MVP slices"]
    B2 --> B3["diff per MVP, ~400 lines"]
    B3 --> B4{"Gate"}
    B4 -- "objective checklist plus your approval" --> B5["Next MVP"]
    B4 -- "rejected" --> B6["Routed to the owning phase"]
  end
</pre>

## The pipeline

Analysis and Design run once. Planning slices the requirement into MVPs
*against the approved architecture* — the one default pre-dev gate. Develop →
Document → Test → Review → Pull Request then repeats **once per MVP** in
dependency order, and each MVP ships as its own reviewable PR of ~10–20 files.
Every step is recorded in `state.json`, so an interrupted run resumes exactly
where it stopped.

<pre class="mermaid">
flowchart LR
  R(["Requirement .md"]) --> P0["Phase 0 · Knowledge Base"]
  P0 --> P1["Phase 1 · Analysis"]
  P1 --> P2["Phase 2 · Design"]
  P2 --> P3["Phase 3 · Planning"]
  P3 --> G3{{"GATE 3 · human"}}
  G3 --> P4

  subgraph LOOP ["per MVP · dependency order"]
    direction LR
    P4["Phase 4 · Develop (TDD)"] --> P5["Phase 5 · Document"]
    P5 --> P6["Phase 6 · Test"]
    P6 --> P7["Phase 7 · Review (automated hard block)"]
    P7 --> P8["Phase 8 · Pull Request"]
  end

  P8 --> G8{{"GATE 8 · human · per MVP"}}
  G8 -- "MVPs remain" --> P4
  G8 -- "finding at req / design / slice altitude" --> P1
  G8 -- "last MVP" --> DONE(["You review and merge each MVP's PR"])
  G8 -. "optional" .-> P9["Phase 9 · Deploy"]
  G8 -. "optional" .-> P10["Phase 10 · Self-Retrospection"]
</pre>

### Phases and agents

AIDLC ships **9 specialist agents**, each a senior-practitioner persona with
explicit inputs, outputs, and a least-privilege tool allowlist (the reviewer,
for instance, has no edit access — it reports findings, it does not silently
fix them).

| # | Phase | Agent | Human gate |
|---|-------|-------|------------|
| 0 | Knowledge Base | `ai-curator` | — build / refresh, SHA-checked |
| 1 | Analysis | `ai-analyst` | automated · gap questions always answered |
| 2 | Design | `ai-architect` | automated · HLD, LLD, ADR drafts |
| 3 | Planning | `ai-analyst` + `ai-architect` | **GATE 3** · requirement + arch + MVP plan + impl plan |
| 4 | Develop *(per MVP)* | `ai-developer-{java,python,frontend,generic}` | automated · strict TDD, red → green → refactor |
| 5 | Document *(per MVP)* | `ai-documenter` | automated · ADRs, MkDocs, Javadoc audit |
| 6 | Test *(per MVP)* | `ai-tester` | automated · IT + E2E, coverage/mutation hard block |
| 7 | Review *(per MVP)* | `ai-reviewer` | automated · Sonar / ArchUnit / security hard block |
| 8 | Pull Request *(per MVP)* | orchestrator + `ai-curator` | **GATE 8** · this MVP's PR + open findings + routing |
| 9 | Deployment *(optional)* | `ai-devops` | GATE 9 · pre-merge preview deploy + smoke |
| 10 | Self-Retrospection *(optional)* | `ai-retrospecter` | GATE 10 · suggest-only proposal |

## What ships

The tool-agnostic core is a flat set of Markdown files: **9 agents**, **33
skills**, **5 prompts**, plus 16 guidelines, 4 runtime reference contracts,
and 18 artifact templates. The installer converts them into each tool's native
format.

### Agents (9)

| Agent | Phase | Role |
|-------|-------|------|
| `ai-curator` | 0, 8 | Knowledge curator — build / refresh / sync the Knowledge Base |
| `ai-analyst` | 1, 3 | Sr. Analyst — requirement intake, gap analysis; MVP slicing with guardrails |
| `ai-architect` | 2, 3 | Sr. Architect — HLD / LLD, ADR drafts; per-MVP implementation plan |
| `ai-developer-{java,python,frontend,generic}` | 4 | Sr. Developer per stack — strict TDD, clean/SOLID/hexagonal code |
| `ai-documenter` | 5 | Technical writer — ADRs, MkDocs site, Javadoc / JSDoc audit |
| `ai-tester` | 6 | Sr. QA Engineer — integration / E2E, coverage & mutation hard block |
| `ai-reviewer` | 7 | Principal reviewer — Sonar / ArchUnit / security block, findings to the PR |
| `ai-devops` | 9 *(optional)* | Sr. DevOps — immutable artifact, pre-merge preview deploy, rollback path |
| `ai-retrospecter` | 10 *(optional)* | Process analyst — suggest-only proposal from run-history signal |

### Skills (33)

Loaded per phase, never all at once — a skill is a standards document an agent
reads before acting.

| Group | Skills |
|-------|--------|
| **Process & knowledge** | `ai-knowledge-base` · `ai-requirement-intake` · `ai-requirement-analysis` · `ai-agile-planning` · `ai-system-design` · `ai-adr` · `ai-mkdocs-documentation` |
| **Engineering discipline** | `ai-tdd` · `ai-bdd` · `ai-testing-strategy` · `ai-code-quality` · `ai-hexagonal-architecture` · `ai-ddd` · `ai-security` · `ai-git` · `ai-cross-repo-workspace` |
| **Stacks** | `ai-java21` · `ai-java25` · `ai-spring` · `ai-spring-security` · `ai-python` · `ai-angular` · `ai-react` · `ai-web-fundamentals` |
| **AI features** | `ai-llm-foundations` · `ai-llm-python` · `ai-llm-java` |
| **Deploy** *(optional)* | `ai-deployment` · `ai-containers` |
| **Retrospection** *(optional)* | `ai-retrospection-analysis` |
| **Meta / scaffolding** | `ai-agent-generator` · `ai-skill-generator` · `ai-prompt-generator` |

### Prompts (5)

| Prompt | Invocation | Purpose |
|--------|-----------|---------|
| `ai-orchestrator` | `/aidlc <requirement>` | Master pipeline — coordinates every agent through Phases 0–10 with the human gates |
| `ai-bugfix` | reference-only | Scoped TDD bugfix loop — reproduce → fix → verify, no full pipeline |
| `ai-pr-readiness` | reference-only | Standalone Phase 7 + 8 — review, KB sync, PR prep for a branch built outside AIDLC |
| `ai-deploy` | `/ai-deploy [env]` | Standalone Phase 9 — build, preview deploy, verify, rollback. Off unless `deployment.enabled` |
| `ai-retrospecter` | `/ai-retrospecter` | Standalone Phase 10 — suggest-only proposal. Off unless `self_retrospection.enabled` |

Full detail — personas, per-phase mapping, prompt source — is in the docs
[Catalog](https://anandmnair.github.io/aidlc/reference/catalog/).

## Two checks at every boundary

<pre class="mermaid">
flowchart LR
  W["Phase work"] --> C{"Objective exit conditions"}
  C -- "any fail" --> F["Fix or report — the gate is NOT presented"]
  F --> W
  C -- "all met" --> H{"Explicit human approval"}
  H -- "approved / continue / go" --> N["Next phase"]
  H -- "anything else" --> Rj["Ask what to refine, record the rejection"]
  Rj --> W
</pre>

A passing checklist never substitutes for approval; approval never waives a
failed condition. By default only **Planning** and each MVP's **Pull Request**
stop for a human — `strict_predev` adds gates after Analysis and Design.
Rejection routes **back, not forward**: a review finding that is really a
requirement problem re-enters Phase 1, a design flaw Phase 2, a slicing issue
Phase 3, a code issue Phase 4 — and rolling back voids every later gate.
Agents never merge; you merge each MVP's PR yourself.

## Context as an engineering constraint

Agents read a curated, commit-SHA-synced **Knowledge Base** (~2,100 tokens:
root + touched shard + generated API map) instead of rescanning the repo each
phase — against ~139,000 tokens for a full-tree load, and the KB's budget is
enforced by a CI gate so it cannot quietly grow into the thing it replaced.
Anchor-scoped reference reads, ≤10-line handoff summaries, tiered guidelines,
per-phase skill loading, and diffs-over-files round out the six mechanisms.

## Quality gates

Quality is built in, not inspected in — TDD, clean code, and architecture
rules are part of the definition of done for **every MVP**, not a later phase.
The measurable gates every delivery must pass:

| Gate | Threshold | Enforced by |
|------|-----------|-------------|
| Line + branch coverage | ≥ 95 % overall | test run + coverage tool |
| Mutation score (domain) | ≥ 95 % | PIT, or the stack's equivalent |
| Sonar | 0 blockers, 0 criticals, no new smells above threshold | Sonar quality gate |
| Architecture boundaries | all rules green | ArchUnit tests |
| TDD | no production code without a preceding failing test | MVP log + review |
| Javadoc / JSDoc | current on all public APIs | documenter audit |
| Diff size | ≤ ~400 lines per MVP, else split and re-gate | orchestrator |
| Secrets | none in the diff | secret scan |

Thresholds live in `install/config.yaml` — a repo with different standards
changes the file, not the agents. When mutation testing finds surviving
mutants, the fix is stronger tests; weakening code or tests to game a metric
is a guideline violation.

**Hexagonal architecture is the structural gate.** Business logic sits in a
domain module with zero framework dependencies; ports are interfaces defined
there; adapters implement them in separate modules and may use frameworks. A
dependency from domain to Spring is a build failure, not a review comment.

<pre class="mermaid">
flowchart TD
  subgraph Adapters["Adapters — frameworks allowed"]
    REST["REST controllers"]
    DB["Persistence"]
    MSG["Messaging"]
    UI["UI"]
  end
  subgraph Domain["Domain — zero framework dependencies"]
    PORTS["Ports = interfaces"]
    LOGIC["Business logic"]
  end
  REST --> PORTS
  DB --> PORTS
  MSG --> PORTS
  UI --> PORTS
  PORTS --- LOGIC
</pre>

## Non-negotiables

Sixteen mandatory guidelines run underneath every agent in every phase — the
design constraint behind all of them: *doing too much, too confidently, too
soon* is the default failure mode to fight.

- **Never assume, never hallucinate** — ambiguity is escalated to you, always.
- **TDD** — no production code without a failing test first; red → green → refactor.
- **Hexagonal architecture** — framework-free domain, ports and adapters, ArchUnit-enforced.
- **Quality gates** — line/branch coverage ≥ 95 %, domain mutation score ≥ 95 %, Sonar clean.
- **Restraint** — every changed line traces to the request; no scope creep.
- **Never weaken a check to make it pass** — a red pipeline reported honestly beats a green one bought by loosening a gate.
- **Status footer** on every response — mode, model, token usage.

## Tool-agnostic

One installer converts the tool-agnostic Markdown core into each target's
native format — Claude Code subagents, GitHub Copilot chat modes, Cursor
rules, Gemini CLI, Windsurf rules, JetBrains AI Assistant rules. The persona
and behavior are identical everywhere; only the packaging differs.

```bash
git clone https://github.com/anandmnair/aidlc.git ~/aidlc
~/aidlc/install/install.sh --tool claude --scope repo
claude   # then:  /aidlc requirements/my-feature.md
```

[Repository](https://github.com/anandmnair/aidlc) ·
[Documentation](https://anandmnair.github.io/aidlc/)
