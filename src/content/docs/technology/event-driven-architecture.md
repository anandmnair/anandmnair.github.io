---
title: 'Event-driven architecture'
description: >-
  Request/response couples caller to callee; events invert that by letting the producer state
  what happened and consumers decide what it means to them. When to reach for events over APIs,
  what a well-formed event looks like, and the practical costs of event sourcing.
order: 2
cardBadges: ['Event Sourcing', 'Sagas']
---

### Why event-driven

Request/response couples the caller to the callee: the caller must know who to
call, and must be up at the same moment. Every new consumer of a business fact
means changing the producer.

Events invert that. The producer states what happened; consumers decide what it
means to them. Adding the fourth consumer of *Payment Received* requires no
change to the payment service — which is what independent evolution actually
looks like in practice.

What you buy: temporal decoupling (consumers can be down and catch up),
extensibility without producer changes, and a natural audit trail.

What you pay: eventual consistency, harder debugging, ordering and duplication
concerns, and an operational surface that includes the broker.

### What an event is

An event is **a business fact that has already happened**. Past tense,
immutable, meaningful to someone who does not work in your team.

*Order Placed*. *Credit Approved*. *Document Verified*. Not *Order Table Row
Inserted*, and not *Please Update The Ledger* — that is a command wearing an
event's clothes, and it recreates the coupling you were trying to remove.

Properties worth insisting on:

- **Immutable.** It happened. If it was wrong, publish a correcting event.
- **Functional, not technical.** Named in business language, meaningful outside
  engineering. A non-technical stakeholder should recognise the name.
- **Producer-driven.** The producer decides what to publish based on what the
  business does, not on what one consumer currently needs.
- **Self-contained.** Enough data to be useful without a synchronous callback to
  the producer — which would reintroduce the coupling.
- **Versioned from day one.** The first schema change arrives sooner than you
  think.

### Eventual consistency

The part that has to be explained to the business, in business terms, before you
build it — because it will be discovered as a bug otherwise.

"When the order is placed, the dashboard updates within about two seconds"
either is or is not acceptable. Ask. Usually the answer is that it is fine, and
occasionally there is one screen where it truly is not — and that one screen is
worth designing around rather than abandoning the architecture for.

Engineering consequences: consumers must be **idempotent**, because at-least-once
delivery is the norm. Order is guaranteed only within a partition, so partition
by the key whose ordering matters. And there is no distributed transaction —
use sagas with explicit compensation, and design the compensation before you
need it.

### APIs versus events — why and when

Both, deliberately.

| Use an API when | Use an event when |
|---|---|
| The caller needs an answer to continue | The producer is stating a fact |
| It is a query | It is a notification of change |
| Consistency must be immediate | Consumers can catch up |
| One known consumer | Many, or unknown, consumers |
| The caller drives the interaction | The producer drives it |

The common failure is picking one for everything. All-synchronous produces a
brittle chain where any hop takes the whole flow down. All-events produces a
system where nobody can answer "what is the current state of order 12345"
without replaying history.

A useful heuristic: **queries over APIs, facts over events.**

### Event sourcing

Store the sequence of events as the source of truth; derive current state by
replaying them. The aggregate is rebuilt from its own history rather than loaded
from a row.

**What it gives you:** perfect auditability — not a log *about* the changes, the
changes themselves. Temporal queries: what did this look like last Tuesday.
Projections built after the fact from history you already have, including for
questions nobody asked at design time. And a genuine ability to fix a
projection bug by rebuilding rather than patching data.

**What it costs:** a steep conceptual step for the team, and a set of problems
that only appear at scale.

Practical concerns, in the order they will bite:

- **Aggregate design.** The aggregate is the consistency boundary. Too large and
  you serialise unrelated work behind one stream; too small and invariants span
  aggregates, which they must not. This is the decision that determines whether
  event sourcing works for you.
- **Replay performance.** An aggregate with a hundred thousand events is slow to
  rebuild. **Snapshots** — periodic materialised state, replay only from there.
- **Schema evolution.** Events are immutable and permanent, so old versions live
  forever. **Upcasting** transforms an old event to the current shape on read;
  downcasting handles the reverse for older consumers. Plan this before the
  first schema change, not during it.
- **Storage growth.** The log only grows. Have an archival and cold-storage
  answer before you need one.
- **Deletion.** "Immutable log" and "right to erasure" are in direct tension.
  Crypto-shredding — encrypt personal data per subject, delete the key — is the
  usual reconciliation. Decide early; retrofitting is painful.

Frameworks such as Axon give you the aggregate model, event store, snapshotting,
upcasting and projection infrastructure. Worth using rather than building —
these are exactly the parts that look simple in a prototype and are not.

**When to use it:** domains where the history *is* the business — financial
transactions, regulated approvals, anything with a hard audit requirement. Not
as a default storage strategy. Applied to a CRUD domain it is a large amount of
machinery producing a slower version of a table.
