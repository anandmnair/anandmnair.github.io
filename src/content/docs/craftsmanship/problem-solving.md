---
title: 'Problem solving'
description: 'The first answer to "why did this break" is almost never the cause. It is the last thing that'
order: 1
---

### Five whys

The first answer to "why did this break" is almost never the cause. It is the
last thing that happened.

> The batch failed. **Why?** A record had a null field.
> **Why?** The upstream stopped sending it.
> **Why?** They released a schema change.
> **Why?** They did not know we consumed it.
> **Why?** There is no contract between us, only a shared database table.

The fix at level one is a null check. The fix at level five is a contract test.
One of those stops it happening again. Stopping at the first "why" is how a
system accumulates defensive code that documents nothing.

Two cautions: five is a rhythm, not a rule — sometimes the cause arrives at
three, sometimes at seven. And the chain must stay factual. The moment an answer
becomes "because they were careless", you have stopped analysing and started
allocating blame.

### What makes a good problem statement

A problem statement describes the problem, not the solution — no fix, no
mechanism, no tech choice. It states the symptom, who is affected, and the
evidence: how you know it's happening and how big it is.

> **Bad:** "The room is hot; turn on the AC."
> **Good:** "The room is 29°C at 2pm, 4°C above the building's other rooms,
> for the past two weeks."

The bad version already picked a solution (AC) and hides the actual evidence.
The good version gives anyone room to propose AC, insulation, blocking the
sun, or something better — and gives a number to check the fix against.

More pairs:

> **Bad:** "We need a caching layer."
> **Good:** "The checkout API p95 latency is 2.1s, up from 400ms last month,
> and 80% of that time is spent on the same three read queries."

> **Bad:** "Users want dark mode."
> **Good:** "12% of support tickets this quarter cite eye strain or brightness;
> our top three competitors all ship a dark theme."

A good problem statement can be handed to two different engineers and get two
different, valid solutions back. If it can only produce one solution, it was
a solution wearing a problem's clothes.

### Study the problem before solving it

The strongest predictor of a good solution is time spent understanding the
problem before proposing anything. Concretely: read the existing code before
proposing a rewrite. Reproduce the bug before theorising about it. Ask what the
user was trying to do, not what they clicked.

A useful test — **can you state the problem in one sentence without using the
word "should"?** If not, you are describing a solution.

### Break big problems into small ones

Large problems are not solved. They are decomposed until the pieces are
individually obvious, then reassembled.

The decomposition matters more than the effort. Split by **capability** — a
slice that delivers value end to end — rather than by **layer**, which produces
three teams and nothing shippable until all three finish. Every piece should be
independently verifiable; if you cannot tell whether a piece is done, it is not
a piece.

### Think big, start small, scale fast

- **Think big.** Understand the big picture first — the depth of the problem,
  the target architecture. Without it, every small step is a local optimum and
  the sum is a mess.
- **Start small.** Once you have the big picture, do not jump at solving
  everything — that is where most people get stuck. Break the big problem into
  small pieces. Start with an easy one to build momentum, but never leave the
  riskiest part for last. Once the easy pieces give you confidence, tackle the
  crucial, riskiest part next — that is what proves the approach.
- **Scale fast.** Once proven on a small perimeter, industrialise deliberately:
  templates, shared libraries, pipelines. This is the step most transformations
  skip, which is why they produce one good service and forty legacy ones.

**Example.** A regulatory recommendation required top-secret deals to be
readable only by the person assigned to them — not IT, not support, not DBAs —
even though deal data flowed through many microservices across several
platforms for business needs like approvals. The obvious fix, encrypting
sensitive fields everywhere by hand, was a 3–5 year effort across every
platform.

Instead: study the problem, understand complexity and team expertise, then
**start small** — build one library where sensitive fields are marked with a
`@Confidential` annotation. Prove it on one service, encryption behind a
feature toggle, off first so the rest of that service's (unrelated,
concurrent) changes could be verified safe. Once stable, toggle encryption on
in production. Only then, with the hard part proven, **scale fast**: roll the
same library to every other microservice with a small team over 12–18 months,
no major regressions.

### Find the blocker before adding people

A stalled programme is usually blocked on something specific and unglamorous — a
missing tool, an unavailable dataset, a dependency on a decision nobody owns.
Adding engineers to a blocked programme produces more blocked engineers.

One migration I worked on was quoted at 3–5 years; the first instinct was to
add 2–3 more people. The real bottleneck was never capacity — it was that
business rules had to be derived from existing systems and processes too
complex for users to finalise, and every rule change forced a full
re-migration of millions of documents. We decoupled the two: a two-stage
migration where the heavy document shift ran first, with no business rules
applied, and rules were applied afterward only to the documents' metadata —
cheap to redo as rules changed. Add people to a blocked programme and you get
more blocked people; find the coupling causing the block instead.
