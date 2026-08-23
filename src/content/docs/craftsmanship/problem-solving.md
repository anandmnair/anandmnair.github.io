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

A problem statement should describe the problem — nothing else. No fix baked
in, no guess at the cause. Just the symptom, who it hits, and some evidence
that it's real.

The classic bad one: "the room is hot, turn on the AC." That isn't a problem
statement, it's a solution wearing a disguise. A better version: "the room
hits 29°C by 2pm, four degrees above every other room in the building, and
it's been like this for two weeks." Now anyone can come in and suggest AC,
better insulation, blinds, whatever — and there's a number to check the fix
against later.

A couple more:

> **Bad:** "We need a caching layer."
> **Good:** "Checkout API p95 latency is 2.1s, up from 400ms last month, and
> 80% of that time comes from the same three read queries."

> **Bad:** "Users want dark mode."
> **Good:** "12% of support tickets this quarter mention eye strain or screen
> brightness, and every major competitor already ships a dark theme."

Simple test: if two different engineers read the statement and come back with
two different, valid solutions, it's a real problem statement. If it can only
lead to one answer, someone already picked the solution and wrote the problem
to match.

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

- **Think big.** Get the full picture before touching anything — how deep the
  problem goes, where the architecture needs to end up. Skip this and every
  small step becomes a local fix that doesn't add up to much.
- **Start small.** Once you know the big picture, don't try to solve it all at
  once — that's where most people get stuck. Break it into small pieces. Do an
  easy one first to build momentum, but don't save the hardest, riskiest piece
  for last. Once you've got a couple of wins, go after the risky part next —
  that's the one that actually proves the idea works.
- **Scale fast.** Once it works on a small scale, roll it out properly:
  templates, shared libraries, a real pipeline. Most transformations skip this
  part, which is why they end up with one shiny new service and forty untouched
  legacy ones.

A good example from a past project: regulators told us only the person
assigned to a deal should be able to see its sensitive details — not IT, not
support, not even the DBAs. Problem was, that data moved through dozens of
microservices across several platforms, since deals also touched approvals
and other business processes along the way.

Doing it the obvious way — going service by service, encrypting fields by
hand — would have taken three to five years.

Instead we studied the problem properly first, worked out where the real
complexity was, then built one small library: mark a field `@Confidential`
and it gets encrypted. We tried it on a single service first, with encryption
behind a toggle switched off — that service already had a lot of other
changes in flight, so we needed to be sure nothing else broke before flipping
it on. Once it held up, we turned encryption on in production.

By then we understood the problem and its rough edges well enough to roll the
same library out everywhere else. A small team scaled it across the rest of
the microservices in about a year to a year and a half, with no major issues.

### Find the blocker before adding people

A stalled programme is usually blocked on something specific and unglamorous — a
missing tool, an unavailable dataset, a dependency on a decision nobody owns.
Adding engineers to a blocked programme produces more blocked engineers.

One migration I worked on was quoted at three to five years. First instinct
was to put two or three more people on it. Turned out headcount had nothing
to do with it — the real problem was that business rules had to be pulled out
of existing systems and processes too tangled for anyone to actually finalise,
and every time a rule changed, the team redid the entire migration of millions
of documents from scratch.

We split the work in two instead. Move the documents first, with no rules
applied at all — that was the heavy lifting, done once. Apply the business
rules afterward, only to the metadata, which was cheap to redo whenever a
rule changed. Add people to a blocked project and you just get more blocked
people; find what's actually stuck first.
