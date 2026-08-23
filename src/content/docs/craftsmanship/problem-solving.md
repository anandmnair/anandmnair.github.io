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

- **Think big.** Know the target architecture. Without it, every small step is a
  local optimum and the sum is a mess.
- **Start small.** Ship the thinnest slice that proves the hard part. Not the
  easy part — the risky one.
- **Scale fast.** Once proven, industrialise deliberately: templates, shared
  libraries, pipelines. This is the step most transformations skip, which is why
  they produce one good service and forty legacy ones.

### Find the blocker before adding people

A stalled programme is usually blocked on something specific and unglamorous — a
missing tool, an unavailable dataset, a dependency on a decision nobody owns.
Adding engineers to a blocked programme produces more blocked engineers.

One migration I worked on was estimated at two years and delivered in six months
because the constraint was never capacity. It was that the migration rules had
to be hand-written by users. Build the tool that derives them, and the two-year
estimate evaporates.
