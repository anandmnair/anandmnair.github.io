---
title: 'Monitoring'
description: >-
  The delivery-side counterpart to observability by design — that page covers what to
  instrument, this one covers where it lands: logs, metrics, dashboards and tracing.
order: 4
cardBadges: ['Monitoring', 'Observability']
---

The delivery-side counterpart to
[observability by design](/craftsmanship/observability-by-design/) — that page
covers what to instrument; this one covers where it lands.

- **Logs** — structured JSON, shipped to ELK, correlation ID propagated across
  every service boundary. Retention set deliberately: hot for days, warm for
  weeks, archived for the compliance period.
- **Metrics** — a time-series store behind Grafana. Rate, errors and duration
  per dependency; business counters per significant domain event.
- **Dashboards** — one per service for the team who owns it, one per business
  flow for everyone else. The second kind is what an incident commander opens
  first, and it is usually the one that does not exist.
- **Tracing** — APM across service boundaries, because in a distributed system a
  stack trace tells you where it surfaced, not where it started.
