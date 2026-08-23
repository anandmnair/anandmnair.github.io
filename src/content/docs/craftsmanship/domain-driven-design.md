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
its invariants, the decisions it makes. If your domain objects are getters and
setters and all behaviour lives in a service class, you have written a
transaction script and called it DDD. Sometimes a transaction script is the
right answer; just do not confuse the two.

Rule of thumb: **if the domain layer imports anything from the framework, the
boundary has already failed.**
