---
title: 'Modernising the code, not just the runtime'
description: >-
  A containerised monolith on Kubernetes is a monolith with a higher hosting bill. The internal
  changes that matter: find the boundaries with event storming, modularise in place with
  architecture tests, write characterisation tests before changing anything, and replace the
  data coupling.
order: 6
cardBadges: ['Event Storming', 'Characterisation Tests']
---

A containerised monolith on Kubernetes is a monolith with a higher hosting bill.
The internal changes that matter:

- **Find the boundaries** before splitting anything —
  [event storming](/craftsmanship/domain-driven-design/#event-storming) on the legacy domain usually
  reveals seams the code does not show.
- **Modularise in place first.** Enforce boundaries inside the existing codebase
  with [architecture tests](/craftsmanship/hexagonal-architecture/#enforce-it-with-tests). Extraction
  becomes mechanical once the boundary already holds.
- **Characterisation tests before you change anything.** Capture what the system
  *does*, not what it should do. Without them you cannot tell a fix from a
  regression.
- **Replace the data coupling.** Shared database tables are the strongest
  coupling in most legacy estates and the last thing anyone removes. Until it
  goes, the services are not independent regardless of what the deployment
  diagram claims.
