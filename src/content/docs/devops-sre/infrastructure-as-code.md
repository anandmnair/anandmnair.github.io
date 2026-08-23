---
title: 'Infrastructure as code'
description: >-
  Because the alternative is a production environment nobody can reproduce. Manual
  configuration produces drift, drift produces the environment-specific bug, and that bug
  is the one that takes three days.
order: 6
cardBadges: ['Infrastructure as Code', 'Terraform']
---

### Why

Because the alternative is a production environment nobody can reproduce. Manual
configuration produces drift, drift produces the environment-specific bug, and
the environment-specific bug is the one that takes three days.

What IaC gives you:

- **Reproducibility.** A new environment from a known-good definition, in
  minutes.
- **Review.** Infrastructure changes go through the same pull request as code
  changes, seen by more than one person.
- **History.** Who changed the firewall rule, when, and why — recoverable from
  `git log` rather than from memory.
- **Disaster recovery** that is a pipeline run rather than an archaeology
  project.

### In practice

**Declarative over imperative** — Terraform or Bicep describing the target
state, not a script of steps. **Immutable infrastructure** — replace rather than
patch; no SSH into production to fix something by hand, because that fix exists
nowhere and is lost at the next deployment. **Modules** for repeated patterns.
**State stored remotely** with locking. **Plan output reviewed** in the pull
request, so the diff is visible before it is applied.

The test of whether you have it: could you rebuild production from an empty
subscription using only what is in version control? If not, you have scripts.
