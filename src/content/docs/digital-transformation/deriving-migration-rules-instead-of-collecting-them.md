---
title: 'Deriving migration rules instead of collecting them'
description: 'A pattern worth generalising. Migration projects frequently stall waiting for business users to hand-write transformation rules for legacy data — a task that is slow, incomplete,'
order: 4
---

A pattern worth generalising. Migration projects frequently stall waiting for
business users to hand-write transformation rules for legacy data — a task that
is slow, incomplete, and produces rules that are wrong in ways nobody discovers
until later.

Deriving the rules from the data itself removes the dependency: analyse the
source, infer the mapping, propose it, and have humans **review** proposals
rather than author rules from scratch. Reviewing a proposal is an order of
magnitude faster than composing one, and the coverage is complete by
construction.

This is where the constraint on one programme turned out to be tooling rather
than capacity — a two-year roadmap delivered in six months, not by adding
people, but by removing the thing everyone was waiting on. Worth asking on any
stalled programme: **what is everyone waiting for, and could it be generated?**
