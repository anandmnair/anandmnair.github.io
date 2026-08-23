---
title: 'Working notes'
description: 'Short pieces that do not warrant their own page'
order: 2
---

Short pieces that do not warrant their own page yet:

- **Snapshot frequency in event sourcing** is an operational parameter, not a
  design constant. Tune it from replay latency, and revisit when aggregate
  lifetimes change.
- **`@Transactional` on a domain service** is the most common hexagonal boundary
  violation, and the most defended. The transaction is an infrastructure concern.
- **Kafka partition count** is easy to increase and impossible to decrease
  without breaking key ordering. Choose it deliberately, then leave it.
- **Testcontainers changed integration testing.** Testing against a real
  database in CI removed most of the value of in-memory substitutes, and all of
  the arguments about whether H2 behaves like Oracle.
- **Correlation IDs** should be generated at the edge and propagated everywhere,
  including into log lines emitted by libraries. Retrofitting this costs more
  than it should.
- **A dead-letter queue without a documented replay procedure** is a directory
  where messages go to be forgotten.
