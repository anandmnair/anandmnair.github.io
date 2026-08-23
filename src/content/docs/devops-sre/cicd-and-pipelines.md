---
title: 'CI/CD and pipelines'
description: >-
  Two rules the whole thing depends on: build once and promote the artefact, and put
  the fastest, most likely failure first. Pipeline stages, deployment strategies, and the
  step that gets skipped — practising the rollback.
order: 2
cardBadges: ['CI/CD', 'Blue-Green Deploy']
---

**Continuous integration** means everyone merges to trunk frequently and the
build verifies it. If integration happens at the end of a sprint, you have
version control, not CI.

**Continuous delivery** means every green commit is *releasable*. Whether you
release it is a business decision; whether you *could* is an engineering one.

### Pipeline stages

| Stage | Gate | Budget |
|---|---|---|
| Build & unit test | Compile, fast tests | Under 5 min |
| Static analysis | Lint, security scan, coverage, architecture rules | Under 3 min |
| Integration test | Testcontainers against real dependencies | Under 10 min |
| Contract verification | Consumer expectations still met | Fast |
| Package | Immutable, versioned artefact | — |
| Deploy to non-prod | Automatic | — |
| Acceptance / BDD | Business behaviour | Under 15 min |
| Deploy to production | Automated, approval optional | — |

Two rules the whole thing depends on:

**Build once, promote the artefact.** The binary tested in staging is the binary
that reaches production. Rebuilding per environment means you tested something
else.

**Fast feedback first.** Order stages so the cheapest, most likely failure runs
earliest. A pipeline that takes forty minutes to tell you about a formatting
error trains people to stop watching it.

### Deployment strategies

Blue-green for instant rollback. Canary when you want real traffic to tell you
before everyone gets it. Rolling as the sensible Kubernetes default. Feature
flags to separate *deploy* from *release*, which is what makes trunk-based
development safe.

And the one that gets skipped: **practise the rollback.** An untested rollback
path is a hypothesis.
