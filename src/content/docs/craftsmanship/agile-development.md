---
title: 'Agile development'
description: >-
  Real agile is one thing: incremental delivery with a real feedback loop. Everything else —
  ceremonies, boards, story points, velocity — is machinery serving that, and machinery
  without the loop is theatre.
order: 3
cardBadges: ['Incremental Delivery', 'Vertical Slicing']
---

### Real agile

Real agile is one thing: **incremental delivery with a real feedback loop.**
Everything else — ceremonies, boards, story points, velocity — is machinery
serving that, and machinery without the loop is theatre.

The test is uncomfortable and simple: *when did feedback from a real user last
change what you were about to build?* If the answer is "we do not really have
one", you have a two-week waterfall with stand-ups.

### Feedback loops and failing fast

The loop is: build → release → observe → learn → adjust. Its value is inversely
proportional to its length. A loop measured in quarters teaches you almost
nothing, because by the time it closes the context has changed.

"Fail fast" is widely misquoted as permission to be careless. It means the
opposite: **make failures cheap and visible so you can afford to find them.**
That takes discipline — feature flags, automated tests, fast rollback,
observability. Failing fast without those is just failing.

![Feedback loop](/img/feedback-loop.svg)

### User stories, slicing and MVP

A user story is a **placeholder for a conversation**, not a specification. Its
value is in the discussion, and its acceptance criteria are the residue.

Slice **vertically**. A slice that touches UI, service and database and delivers
something a user can do is worth more than three horizontal slices that deliver
nothing until they meet.

![Skateboard, bike, car](/img/skateboard-bike-car.svg)

The illustration everyone knows and few follow: if the goal is a car, do not
deliver a wheel, then an axle, then a chassis. Nobody can use any of them, and
you learn nothing until the end. Deliver a skateboard, then a bicycle, then a
motorbike, then a car. Each one moves someone from A to B. Each one teaches you
something about how they actually travel — and occasionally teaches you they
never wanted a car.

MVP means **minimum viable** — the smallest thing that is genuinely usable and
from which you learn something. Not the smallest thing you can ship, and not the
first release of a plan you have already fixed.
