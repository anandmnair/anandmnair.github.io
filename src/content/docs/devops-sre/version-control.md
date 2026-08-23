---
title: 'Version control'
description: 'Git, with a branching model chosen for how often you actually release rather than for how the last team did'
order: 1
---

Git, with a branching model chosen for how often you actually release rather
than for how the last team did it.

**Trunk-based development with short-lived branches** for teams releasing
frequently — branches measured in hours, merged behind feature flags. Long-lived
release branches make sense when you genuinely support multiple versions in
production; otherwise they are a merge tax paid weekly.

Practices that matter more than the model:

- **Small, coherent commits** with messages explaining *why*. The diff already
  says what.
- **Protected main.** Reviewed, green, and never force-pushed.
- **The pipeline definition lives in the repository.** Pipelines configured
  through a UI are undocumented, unreviewable and unreproducible.
- **Tag releases.** "Which commit is in production" should take five seconds.
