---
title: 'Observability by design'
description: >-
  Observability is a design constraint, not a dashboard you add before go-live. The question
  it answers: when this misbehaves at 3am, can someone who did not write it work out why?
  Logs, functional and technical monitoring, tracing, and resilience that minimises blast
  radius rather than pretending failure won't happen.
order: 11
cardBadges: ['Observability', 'Resilience']
---

Observability is a design constraint, not a dashboard you add before go-live.
The question it answers is: **when this misbehaves at 3am, can someone who did
not write it work out why?**

### Logs

Levels that mean something:

- **ERROR** — something failed that needs human action. Every ERROR should be
  actionable. If nobody acts on it, it is not an error.
- **WARN** — degraded but handled. A failover fired, a retry succeeded.
- **INFO** — significant business events. Structured, with a correlation ID.
- **DEBUG** — diagnostic detail, off in production, available when needed.

Structured (JSON) rather than free text, with a correlation ID propagated across
every service boundary. Without correlation, distributed logs are a haystack per
service and no thread between them.

### Functional and technical monitoring

Two different questions, and most teams only answer the second.

**Technical** — is the system healthy? CPU, memory, latency, error rate, queue
depth, connection pools.

**Functional** — is the *business* healthy? Applications approved per hour,
documents processed, settlement failures, events consumed versus published.

A service can be technically perfect and functionally dead: all endpoints
returning 200, and zero orders processed since 04:00 because an upstream stopped
publishing. Only functional monitoring catches that, and it is what stakeholders
actually care about.

### Metrics

Instrument what you would want during an incident, and design them before the
incident. Rate, errors, duration for every dependency; business counters for
every significant domain event; saturation for every bounded resource.

Percentiles, not averages. An average response time of 200ms hides a p99 of nine
seconds, and the p99 is your angriest users.

### APM and tracing

Distributed tracing turns "the request was slow" into "the request spent 4.2
seconds in the third of six calls to the pricing service". In a microservices
estate this is not optional — without it, root-cause analysis is guesswork
conducted across teams.

### Heartbeats and health

Liveness and readiness are different questions: *should I be restarted* versus
*should I receive traffic*. Conflating them causes restart loops during
transient dependency failures.

Heartbeats matter most for the things that are silent when broken — schedulers,
consumers, batch jobs. A consumer that has processed nothing for an hour looks
identical to a consumer with nothing to do, unless you instrumented the
difference.

### Self-healing and recovery

Design the recovery path, do not improvise it during the incident: retries with
exponential backoff and jitter, circuit breakers, dead-letter queues with a
documented replay procedure, idempotent consumers so replay is safe.

Idempotency is the precondition for all of it. Without it, every recovery
mechanism risks making things worse.

### Resilience — acting on failure

Resilience is not preventing failure. It is **minimising the blast radius**.

The question for every dependency: what should the user experience when this is
unavailable? Usually the answer is not an error page. Stale data with a
freshness indicator, reduced functionality, a queued request — most read paths
have a graceful degradation that is far better than failing, and nobody designs
it because the failure case is discussed last.

This is the thinking behind the [Failover library](/projects/failover/): make
degradation declarative, and make it visible in metrics so it is never silent.

### SRE

Error budgets turn reliability into an engineering trade-off rather than an
argument. Define an SLO, measure it, and let the remaining budget decide whether
the next sprint ships features or pays down reliability debt. When the budget is
spent, the decision has already been made — which removes the recurring fight
between delivery and operations.

See [DevOps / SRE](/devops-sre/) for the delivery side.
