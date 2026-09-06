---
title: 'Domain-Driven Design'
description: >-
  Start at a whiteboard with the people who know the business and write domain events on
  sticky notes, past tense, one per note. From event storming to bounded contexts to a domain
  model that expresses what the business does, not a renamed database schema.
order: 2
cardBadges: ['Event Storming', 'Bounded Contexts']
---

### Event storming

Start at a whiteboard with the people who know the business, and write **domain
events** on sticky notes — past tense, one per note: *Order Placed*, *Credit
Approved*, *Document Verified*, *Payment Settled*.

Not entities. Not tables. Events. The past tense matters: it forces a statement
about something that happened in the business rather than a noun that might
become a class.

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360" role="img" aria-label="An event storming wall: orange domain events on a timeline, with commands, actors, aggregates, policies and hotspots around them">
  <style>
    .t { font-family: inherit; }
    .n { font-size: 10.5px; fill: #1e1b4b; }
    .k { font-size: 11px; fill: var(--muted, #64748b); }
    .hd { font-size: 13px; font-weight: 600; fill: var(--ink, #0f172a); }
    .note { stroke: rgba(0, 0, 0, 0.16); stroke-width: 1; }
    .board { fill: var(--bg-elev, #f7f8fc); }
    .swim { stroke: var(--line, #e0e4f0); stroke-width: 1; }
    .flow { stroke: var(--line-strong, #c8cce0); stroke-width: 1.5; }
  </style>
  <rect class="board" width="720" height="360" rx="6"/>
  <g class="swim" fill="none"><path d="M0 60h720M0 150h720M0 240h720"/></g>
  <text x="16" y="26" class="t hd">Time →</text>
  <path class="flow" d="M16 38 H704" fill="none" marker-end="url(#es-a)"/>
  <defs><marker id="es-a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="var(--line-strong, #c8cce0)"/></marker></defs>
  <g class="t">
    <g transform="translate(28,72) rotate(-1.5)"><rect width="104" height="66" rx="2" fill="#f5a623" class="note"/><text x="10" y="26" class="n">Order</text><text x="10" y="40" class="n">Placed</text></g>
    <g transform="translate(180,74) rotate(1)"><rect width="104" height="66" rx="2" fill="#f5a623" class="note"/><text x="10" y="26" class="n">Payment</text><text x="10" y="40" class="n">Received</text></g>
    <g transform="translate(332,70) rotate(-1)"><rect width="104" height="66" rx="2" fill="#f5a623" class="note"/><text x="10" y="26" class="n">Credit</text><text x="10" y="40" class="n">Approved</text></g>
    <g transform="translate(484,76) rotate(1.8)"><rect width="104" height="66" rx="2" fill="#f5a623" class="note"/><text x="10" y="26" class="n">Order</text><text x="10" y="40" class="n">Shipped</text></g>
  </g>
  <g class="t">
    <g transform="translate(28,162) rotate(1)"><rect width="92" height="58" rx="2" fill="#7ab8e8" class="note"/><text x="10" y="24" class="n">Place</text><text x="10" y="38" class="n">Order</text></g>
    <g transform="translate(136,168) rotate(-2)"><rect width="66" height="52" rx="2" fill="#ffe066" class="note"/><text x="9" y="24" class="n">Customer</text></g>
    <g transform="translate(332,162) rotate(-1)"><rect width="92" height="58" rx="2" fill="#7ab8e8" class="note"/><text x="10" y="24" class="n">Approve</text><text x="10" y="38" class="n">Credit</text></g>
    <g transform="translate(440,168) rotate(1.5)"><rect width="66" height="52" rx="2" fill="#ffe066" class="note"/><text x="9" y="24" class="n">Risk</text><text x="9" y="38" class="n">Officer</text></g>
  </g>
  <g class="t">
    <g transform="translate(180,250) rotate(-1.2)"><rect width="112" height="56" rx="2" fill="#c9a8e8" class="note"/><text x="10" y="24" class="n">whenever paid</text><text x="10" y="38" class="n">→ check credit</text></g>
    <g transform="translate(332,252) rotate(1)"><rect width="96" height="56" rx="2" fill="#f3ece2" class="note"/><text x="10" y="24" class="n">Order</text><text x="10" y="38" class="k">aggregate</text></g>
    <g transform="translate(484,246) rotate(-8)"><rect width="86" height="52" rx="2" fill="#f39ab5" class="note"/><text x="9" y="24" class="n">who owns</text><text x="9" y="38" class="n">the limit?</text></g>
  </g>
  <g class="t" transform="translate(596,150)">
    <g><rect width="12" height="12" fill="#f5a623" class="note"/><text x="18" y="10" class="k">event</text></g>
    <g transform="translate(0,22)"><rect width="12" height="12" fill="#7ab8e8" class="note"/><text x="18" y="10" class="k">command</text></g>
    <g transform="translate(0,44)"><rect width="12" height="12" fill="#ffe066" class="note"/><text x="18" y="10" class="k">actor</text></g>
    <g transform="translate(0,66)"><rect width="12" height="12" fill="#c9a8e8" class="note"/><text x="18" y="10" class="k">policy</text></g>
    <g transform="translate(0,88)"><rect width="12" height="12" fill="#f39ab5" class="note"/><text x="18" y="10" class="k">hotspot</text></g>
  </g>
</svg>
</figure>

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
