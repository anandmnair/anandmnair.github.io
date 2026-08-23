---
title: 'SRE'
description: 'DevOps is the culture — shared ownership of build and run. SRE is the engineering discipline that makes reliability measurable rather than'
order: 7
---

DevOps is the culture — shared ownership of build and run. SRE is the
engineering discipline that makes reliability measurable rather than
aspirational.

- **SLI** — what you measure. Request latency, error rate, freshness.
- **SLO** — the target. 99.9% of requests under 300ms over 30 days.
- **Error budget** — what the SLO permits you to spend. At 99.9%, roughly 43
  minutes a month.

The error budget is the mechanism that matters, because it converts a recurring
argument into arithmetic. Budget remaining: ship features. Budget exhausted:
reliability work takes priority until it recovers. Nobody has to win a debate
about whether stability or delivery matters more; the number decides.

Two habits that compound: **blameless postmortems** — the question is what in
the system allowed a reasonable person to make that mistake — and **toil
reduction**, where manual operational work is tracked and deliberately
automated. Untracked toil expands until the team has no capacity for anything
else.
