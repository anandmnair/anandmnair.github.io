---
title: 'Testing strategy'
description: >-
  Wide and fast at the bottom, narrow and slow at the top. The test pyramid, TDD and BDD
  answering different questions, mutation testing to check the tests actually check
  something, and contract testing so independent deployment is real.
order: 8
cardBadges: ['Test Pyramid', 'Mutation Testing']
---

### The pyramid

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" role="img" aria-label="Test pyramid: unit, integration, contract, acceptance, end to end">
  <style>
    .t { font-family: inherit; }
    .band { stroke: var(--bg, #ffffff); stroke-width: 2; fill: var(--accent, #4f46e5); }
    .lbl { font-size: 14px; font-weight: 600; fill: #fff; }
    .lbl-sm { font-size: 11.5px; font-weight: 600; fill: #fff; }
    .note { font-size: 13px; fill: var(--ink-soft, #475569); }
    .cap { font-size: 12px; fill: var(--muted, #64748b); font-style: italic; }
    .tick { stroke: var(--line, #e0e4f0); stroke-width: 1; }
    .axis { stroke: var(--line-strong, #c8cce0); stroke-width: 1.5; }
  </style>
  <g class="t">
    <polygon class="band" points="300,30 352,96 248,96" fill-opacity="0.62"/>
    <polygon class="band" points="248,98 352,98 378,164 222,164" fill-opacity="0.72"/>
    <polygon class="band" points="222,166 378,166 404,232 196,232" fill-opacity="0.82"/>
    <polygon class="band" points="196,234 404,234 430,300 170,300" fill-opacity="0.91"/>
    <polygon class="band" points="170,302 430,302 456,368 144,368" fill-opacity="1"/>
    <text class="lbl-sm" x="300" y="82" text-anchor="middle">E2E / UI</text>
    <text class="lbl-sm" x="300" y="140" text-anchor="middle">Acceptance / BDD</text>
    <text class="lbl" x="300" y="206" text-anchor="middle">Contract</text>
    <text class="lbl" x="300" y="272" text-anchor="middle">Integration</text>
    <text class="lbl" x="300" y="342" text-anchor="middle">Unit</text>
    <line class="tick" x1="470" y1="76" x2="358" y2="76"/>
    <line class="tick" x1="470" y1="140" x2="384" y2="140"/>
    <line class="tick" x1="470" y1="206" x2="410" y2="206"/>
    <line class="tick" x1="470" y1="272" x2="436" y2="272"/>
    <line class="tick" x1="470" y1="342" x2="462" y2="342"/>
    <text class="note" x="482" y="81">a handful — critical journeys</text>
    <text class="note" x="482" y="145">the behaviours that matter</text>
    <text class="note" x="482" y="211">one per integration seam</text>
    <text class="note" x="482" y="277">real infrastructure</text>
    <text class="note" x="482" y="347">the bulk — fast, isolated</text>
    <line class="axis" x1="104" y1="40" x2="104" y2="356"/>
    <polygon points="104,366 100,354 108,354" fill="var(--line-strong, #c8cce0)"/>
    <text class="cap" x="94" y="116" text-anchor="end">slower</text>
    <text class="cap" x="94" y="134" text-anchor="end">more brittle</text>
    <text class="cap" x="94" y="288" text-anchor="end">faster</text>
    <text class="cap" x="94" y="306" text-anchor="end">more reliable</text>
  </g>
</svg>
</figure>

Wide and fast at the bottom, narrow and slow at the top:

| Level | Verifies | Proportion |
|---|---|---|
| **Unit** | Domain logic, branches, edge cases | The bulk |
| **Integration** | Adapters against real infrastructure (Testcontainers) | Substantial |
| **Contract** | Producer and consumer still agree | One per integration |
| **BDD / acceptance** | Business behaviour end to end | The behaviours that matter |
| **E2E / UI** | The critical journeys only | A handful |

The inverted pyramid — a thin unit layer under a mass of slow end-to-end tests —
is the most expensive shape in software. The suite takes an hour, fails
intermittently, and teams learn to re-run rather than investigate. At that point
the tests cost money and provide no confidence.

### TDD and BDD together

They answer different questions and are not alternatives. BDD: *are we building
the right thing?* TDD: *are we building it correctly?* BDD scenarios come from
the business conversation and stay few. Unit tests come from the design loop and
stay many.

### Mutation testing

Coverage tells you a line executed. It does not tell you that anything checked
the result — a test suite that calls every method and asserts nothing reports
100%.

Mutation testing changes the code deliberately (flips a conditional, alters a
boundary, removes a call) and re-runs the suite. A mutant that survives is a
change no test noticed: proof of a gap that coverage reported as covered.

Run it on the domain layer, where the logic that matters lives. Running it
across an entire codebase is slow and mostly tells you that your getters are
untested, which you already knew.

### Contract testing

In a distributed system, integration bugs surface at the seams. Contract tests
put a verifiable agreement at each seam: the consumer declares what it expects,
the provider verifies it can deliver, and CI fails on the day someone breaks it —
not in production three weeks later.

This is what makes independent deployment real. Without it, "microservices" that
must be released together are a distributed monolith with extra network hops.
