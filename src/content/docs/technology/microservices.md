---
title: 'Microservices'
description: 'Microservices solve an organisational problem — independent teams shipping independently — by paying a technical cost: network calls, partial failure, eventual consistency,'
order: 1
---

### A balanced approach

Microservices solve an **organisational** problem — independent teams shipping
independently — by paying a **technical** cost: network calls, partial failure,
eventual consistency, distributed debugging. When the organisational problem is
real, the trade is worth it. When it is not, you have bought the cost and none of
the benefit.

A well-modularised monolith with clean bounded contexts beats a badly cut
microservice estate on every axis: latency, consistency, debuggability,
operational cost. The best migration path I know is exactly that — modularise
first, then extract the modules that have earned independence.

Signals a service should be extracted:

- It scales on a genuinely different curve from the rest
- It changes far more or far less often than everything around it
- It has a distinct availability or compliance requirement
- A separate team owns it end to end

Signals it should not:

- "Microservices are the standard"
- The boundary follows a technical layer rather than a business capability
- Two services always deploy together — that is one service in two repositories

### Service registry and discovery

In dynamic environments instances come and go, so hard-coded endpoints fail.
Eureka and equivalents solve this at the application layer; Kubernetes solves it
at the platform layer with DNS and Services.

If you are already on Kubernetes, prefer the platform mechanism. Two discovery
systems in one estate is a source of incidents nobody enjoys diagnosing.

### Instances and replicas

Stateless services scale horizontally; that is most of the benefit. Which means
state has to go somewhere deliberate — a datastore, a cache, a broker — and
never in a field on a singleton.

Practical implications: no sticky sessions, no local file state, no in-memory
scheduling on a single node without leader election, and idempotent handlers so
a retry against a different replica is safe.

### Availability

Availability in a distributed system is multiplicative. Six services at 99.9%
each, all required to serve a request, gives you 99.4% — about four hours of
downtime a month, from components that all met their targets.

The fixes are architectural: reduce the number of synchronous hops on the
critical path, make dependencies optional wherever the business allows, and
design the degraded experience explicitly. See
[resilience](/craftsmanship/observability-by-design/#resilience--acting-on-failure).

### Scalability

Scale the bottleneck, not the system. That requires knowing where it is —
which is a
[metrics](/craftsmanship/observability-by-design/#metrics) question before it is an architecture one.

Load rarely distributes evenly. Usually one capability drives most of the cost,
and the value of independent deployability is that you can scale exactly that
one. If you find yourself scaling every service together, the boundaries are
probably wrong.

### CQRS

Command Query Responsibility Segregation: separate the model that **changes**
state from the model that **reads** it.

Reads and writes want different things. Writes want invariants, normalisation
and a strict consistency boundary. Reads want denormalised shapes matching
screens, and are usually far more numerous. Forcing both through one model means
one of them is compromised — normally reads, which is why so many systems are a
mass of joins feeding an over-fetched API.

CQRS earns its complexity when the read and write loads diverge sharply, or when
one write feeds many differently-shaped views. It is unnecessary overhead on a
straightforward CRUD service, and applying it uniformly is a common way to make
a simple system hard.

Note that CQRS does not require event sourcing, separate databases, or eventual
consistency. It requires two models. The rest are options.
