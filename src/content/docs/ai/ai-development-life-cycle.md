---
title: 'AI Development Life Cycle'
description: >-
  Once a model drafts the first pass, review — not typing — becomes the bottleneck. Four
  maturity levels, from autocomplete to agentic, and one rule that survives all of them:
  the engineer owns every line.
order: 1
cardBadges: ['Agentic Pipeline', 'Human-in-the-Loop']
---

The traditional life cycle assumes a human writes every line and a human reviews
every line. Once a model writes most of the first draft, the cost structure
changes: producing code becomes cheap, and **validating** code becomes the
bottleneck. An AI development life cycle is what you build when you take that
seriously.

The phases that change most:

- **Requirements and design.** Now worth writing down precisely, because a
  written specification is machine-readable input rather than a document nobody
  opens. Ambiguity that a human developer would have resolved by asking becomes
  a hallucinated assumption.
- **Implementation.** The model drafts, the engineer directs. The skill shifts
  from typing to specifying, reviewing and rejecting.
- **Review.** The most under-invested phase. Volume goes up, so review has to get
  faster without getting shallower — which means automated gates (tests, mutation
  testing, architecture rules, contract checks) carry more of the load.
- **Documentation.** Cheap enough now that there is no excuse. See
  [living documentation](/craftsmanship/documentation/).

### Adoption maturity

Teams do not jump to agentic. They climb:

| Level | What it looks like | What it needs |
|---|---|---|
| **L1 — Assisted** | Autocomplete, inline suggestions | Nothing. It happens by itself. |
| **L2 — Conversational** | Chat for design, debugging, explanation | Prompting skill, context discipline |
| **L3 — Directed** | Model executes multi-file tasks under supervision | Project context files, tests as the safety net |
| **L4 — Agentic** | Model plans and executes workflows, human approves outcomes | Verifiable goals, guardrails, restraint |

The mistake is measuring adoption by tool licences rather than by level. A
thousand seats at L1 is not a transformation.

### Copilot, not autopilot

The principle everything else hangs from. AI writes a great deal of the code; it
owns none of it. **The engineer whose name is on the commit is accountable for
every line in it** — the same standard as code copied from Stack Overflow, just
at higher volume.

This is not a cultural nicety. It determines whether your review process holds
when output volume triples.

### Token economics

Agentic workflows have a cost curve nobody models until the invoice arrives.
Context window is a budget: what you load, how often you reload it, and how much
of the conversation you carry forward. Practical levers — scope the task
narrowly, keep project context files small and current, prefer several short
sessions to one long one, and cache what does not change.
