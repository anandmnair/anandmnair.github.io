---
title: 'Move to cloud'
description: >-
  Lift-and-shift moves the problem to a more expensive place, and a full rewrite is the
  big-bang rewrite with a new name. The workable path is per-application triage — retire,
  rehost, replatform, refactor, or replace — accelerated by a standardised framework built
  once and reused.
order: 5
cardBadges: ['Cloud Migration', 'Twelve-Factor']
---

Lift-and-shift moves the problem to a more expensive place. Full re-architecture
of everything at once is the big-bang rewrite with a new name. The workable path
is per-application triage:

| Path | When |
|---|---|
| **Retire** | Nobody uses it. Check first — this is more common than expected |
| **Rehost** | Low value, low change. Move it, do not invest in it |
| **Replatform** | Containerise, externalise config and state, keep the code |
| **Refactor** | High change, high value. Worth real architectural investment |
| **Replace** | A generic subdomain someone already sells better than you build |

What accelerates the programme is not per-application heroics. It is the
**standardised framework** — a reference architecture, a shared pipeline,
templates, common libraries — built once and reused. The first application takes
months; the twentieth takes days. Skipping that industrialisation step is why
cloud programmes stay expensive for their whole duration.

Practical necessities before any of it: externalised configuration, no local
state, health endpoints, structured logging, and twelve-factor discipline
generally. An application that cannot restart cleanly cannot be orchestrated.
