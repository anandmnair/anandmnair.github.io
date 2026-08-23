---
title: 'Documentation'
description: >-
  Every system carries decisions whose reasoning is invisible in the code. Docs as code, ADRs
  for the decisions worth remembering, and living documentation generated from things that
  must stay true — so drift breaks the build instead of the docs going stale.
order: 9
cardBadges: ['ADR', 'Docs as Code']
---

### Why

Every system carries decisions whose reasoning is invisible in the code. Six
months later the reasoning is gone, and the next engineer either preserves a
constraint that no longer exists or removes one that still matters. Both are
expensive; the second is expensive at 3am.

Documentation is not for you. It is for the person who arrives after you.

### Docs as code

Markdown in the repository, built by MkDocs or Docsify, published by the
pipeline. In the repo means it is reviewed in the same pull request as the change
— which is the only mechanism that has ever kept documentation current. A wiki
in a separate tool goes stale, always, regardless of good intentions.

### Architecture Decision Records

A short, immutable record per significant decision: context, options considered,
decision, consequences. Numbered, dated, never edited — superseded by a later
ADR instead.

The value is almost entirely in **consequences**. "We chose Kafka" is trivia.
"We chose Kafka, accepting operational complexity and at-least-once delivery,
because we need replay and multiple independent consumers" is the sentence that
tells a future engineer whether the constraint still holds.

Write one when a decision is expensive to reverse, affects more than one team,
or was contested. Not for every library choice.

### API and code documentation

Javadoc on public APIs and domain concepts — the **why**, not a restatement of
the signature. `/** Gets the name. */` on `getName()` is noise that trains people
to skip the comments that matter.

For services, the OpenAPI spec is the API documentation. See
[design-first](#design-first-approach).

### Living documentation

Documentation generated from things that must stay true: architecture diagrams
from ArchUnit rules, API docs from the OpenAPI contract, behaviour documentation
from executed BDD scenarios, dependency graphs from the build.

If a document can drift from reality without anything failing, it will. The goal
is to make drift break the build.
