---
title: 'Failover'
description: 'External APIs fail. In a large service estate one failure becomes an outage for everyone downstream, and the usual answer — a circuit breaker — stops the cascade but still leaves'
order: 1
---

**Java · Spring Boot · Resilience**

External APIs fail. In a large service estate one failure becomes an outage for
everyone downstream, and the usual answer — a circuit breaker — stops the
cascade but still leaves the user blocked.

Failover takes a different position: **degrade, do not stop**. Annotate the
call, declare a recovery source, and when the upstream is unavailable the caller
continues on last-known-good data. For a large class of read paths that is the
difference between a degraded feature and a dead screen.

The operational half matters as much as the annotation. Failover rate, recovery
rate and failure frequency are exposed as first-class metrics, so degradation is
visible rather than silent — you find out that an upstream has been failing for
a week from a dashboard, not from a customer.

A side effect worth mentioning: it made non-production environments usable.
Flaky upstream dependencies in test environments cost more engineering hours
than anyone likes to admit.

[Repository](https://github.com/societe-generale/failover) ·
[Documentation](https://societe-generale.github.io/failover/)
