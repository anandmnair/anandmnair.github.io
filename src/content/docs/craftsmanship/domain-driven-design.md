---
title: 'Domain-Driven Design'
description: 'Start at a whiteboard with the people who know the business, and write domain events on sticky notes — past tense, one per note: Order Placed, Credit Approved, Document Verified,'
order: 2
---

### Event storming

Start at a whiteboard with the people who know the business, and write **domain
events** on sticky notes — past tense, one per note: *Order Placed*, *Credit
Approved*, *Document Verified*, *Payment Settled*.

Not entities. Not tables. Events. The past tense matters: it forces a statement
about something that happened in the business rather than a noun that might
become a class.

![Event storming wall](/img/event-storming.svg)

Rules that keep the session useful:

- Everyone writes at once. No round-the-table turn-taking.
- Duplicates are signal, not waste — two people writing the same event means it
  matters, and two people writing it *differently* means you have found an
  ambiguity worth an hour.
- Put disagreements on a hot-spot note and move on. The disagreements are the
  most valuable output of the day.

### Grouping events

Arrange the events on a timeline, then look for the seams. Clusters form
naturally: events that always happen together, events that share vocabulary,
events that the same people care about.

The seams are where the language changes. When "order" starts meaning something
different on the left of a gap than on the right, you have found a boundary.

### Identifying high-level domains

From the clusters, name the domains. Then classify honestly:

- **Core** — where you actually compete. Invest your best people here.
- **Supporting** — necessary, specific to you, not a differentiator.
- **Generic** — everybody needs it and nobody wins with it. Buy it.

The classification drives investment. Hand-building a generic subdomain is the
most common architectural waste I see, and it is always justified as "our needs
are special".

### Bounded contexts

Refine each domain into subdomains, and draw the **bounded context** — the
boundary inside which a term means exactly one thing.

The point is not to agree on a universal definition of "customer". It is to stop
trying. Two contexts may hold different models of the same real-world thing, and
that is correct. What must be explicit is the translation between them: the
context map, and an anti-corruption layer where a foreign model would otherwise
leak in.

### A domain is a business process, not a table

The most common failure in DDD adoption: taking the database schema, renaming
tables to "aggregates", and declaring victory. The result is the same anaemic
model with new vocabulary.

A domain model expresses **what the business does** — the process, its rules,
its invariants, the decisions it makes. Anaemic model means domain objects are
getters/setters and *all* behaviour got pushed out — that is the failure, not
the existence of a service class. Split it clean, three kinds:

- **Domain object** (entity, value object, aggregate) — holds its own
  invariants and rules. Anything a single object can decide by itself belongs
  here, not in a service.
- **Domain service** — for logic that needs multiple domain objects or several
  collaborators (services, providers) to cooperate. Still business logic,
  still lives in the domain layer, just orchestration instead of
  single-object behaviour.
- **Adapter** — infrastructure only: DB, HTTP, messaging, framework glue. No
  business rules here, ever. If an adapter is deciding something instead of
  translating something, logic leaked out of the domain.

Sometimes a transaction script is the right answer — thin domain, all steps in
one script. Fine, as long as it is a conscious choice, not business rules
quietly leaking into an adapter or a service class doing decision-making that
belongs on the domain object.

That separation — where the domain model lives and what it may depend on — is
a hexagonal architecture concern; see [Hexagonal
Architecture](/craftsmanship/hexagonal-architecture/).
