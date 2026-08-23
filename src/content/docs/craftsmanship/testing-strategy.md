---
title: 'Testing strategy'
description: >-
  Wide and fast at the bottom, narrow and slow at the top. The test pyramid, TDD and BDD
  answering different questions, mutation testing to check the tests actually check
  something, and contract testing so independent deployment is real.
order: 8
cardBadges: ['Test Pyramid', 'Mutation Testing']
---

### The pyramid

![Test pyramid](/img/test-pyramid.svg)

Wide and fast at the bottom, narrow and slow at the top:

| Level | Verifies | Proportion |
|---|---|---|
| **Unit** | Domain logic, branches, edge cases | The bulk |
| **Integration** | Adapters against real infrastructure (Testcontainers) | Substantial |
| **Contract** | Producer and consumer still agree | One per integration |
| **BDD / acceptance** | Business behaviour end to end | The behaviours that matter |
| **E2E / UI** | The critical journeys only | A handful |

The inverted pyramid — a thin unit layer under a mass of slow end-to-end tests —
is the most expensive shape in software. The suite takes an hour, fails
intermittently, and teams learn to re-run rather than investigate. At that point
the tests cost money and provide no confidence.

### TDD and BDD together

They answer different questions and are not alternatives. BDD: *are we building
the right thing?* TDD: *are we building it correctly?* BDD scenarios come from
the business conversation and stay few. Unit tests come from the design loop and
stay many.

### Mutation testing

Coverage tells you a line executed. It does not tell you that anything checked
the result — a test suite that calls every method and asserts nothing reports
100%.

Mutation testing changes the code deliberately (flips a conditional, alters a
boundary, removes a call) and re-runs the suite. A mutant that survives is a
change no test noticed: proof of a gap that coverage reported as covered.

Run it on the domain layer, where the logic that matters lives. Running it
across an entire codebase is slow and mostly tells you that your getters are
untested, which you already knew.

### Contract testing

In a distributed system, integration bugs surface at the seams. Contract tests
put a verifiable agreement at each seam: the consumer declares what it expects,
the provider verifies it can deliver, and CI fails on the day someone breaks it —
not in production three weeks later.

This is what makes independent deployment real. Without it, "microservices" that
must be released together are a distributed monolith with extra network hops.
