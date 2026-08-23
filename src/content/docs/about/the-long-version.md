---
title: 'The long version'
description: 'I have been writing software for 17+ years, almost all of it on systems where failure is expensive and change is constant — high transaction volumes, strict regulatory'
order: 1
---

I have been writing software for **17+ years**, almost all of it on systems
where failure is expensive and change is constant — high transaction volumes,
strict regulatory constraints, and estates old enough that parts of them predate
the people maintaining them. That is a good school. It teaches you that
architecture is not a diagram, it is the set of decisions you can still reverse
in three years.

I started in core Java and enterprise frameworks: batch pipelines, messaging
infrastructure, migration tooling. Then came the decomposition years — turning a
desktop monolith into a first microservice, then doing that repeatedly and at
increasing scale, until the interesting question stopped being *how do I split
this* and became *what are the boundaries, and how do I stop them eroding*.
Domain-driven design, hexagonal architecture and test-enforced boundaries are
the answers I keep returning to.

Along the way I have written libraries that a hundred services depend on, run
the guilds where standards get argued into existence, rebuilt hiring around
skills rather than trivia, and taken migrations that were estimated in years and
delivered them in months by finding the thing everyone was waiting for.

Now most of my attention goes to two things. **Event-driven architecture done
properly** — immutable producer-driven events, versioning, catalogues, replay —
because that is the difference between a system of services and a distributed
monolith. And **agentic AI in the development life cycle**: not the demo, but the
version that holds up when a large engineering organisation adopts it and
someone still has to be accountable for the code.
