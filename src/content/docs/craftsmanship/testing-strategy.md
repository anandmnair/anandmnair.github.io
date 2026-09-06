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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" role="img" aria-label="Test pyramid: unit at the wide fast base, up through integration, contract and acceptance, to a narrow end-to-end tip">
  <style>
    .tp-t { font-family: inherit; }
    .tp-band { stroke: var(--bg, #ffffff); stroke-width: 2; fill: var(--accent, #4f46e5); }
    .tp-lbl { font-size: 14px; font-weight: 600; fill: #fff; }
    .tp-lbl-sm { font-size: 11px; font-weight: 600; fill: #fff; }
    .tp-note { font-size: 13px; fill: var(--ink-soft, #475569); }
    .tp-cap { font-size: 12px; fill: var(--muted, #64748b); font-style: italic; }
    .tp-tick { stroke: var(--line, #e0e4f0); stroke-width: 1; }
    .tp-axis { stroke: var(--line-strong, #c8cce0); stroke-width: 1.5; }
    .tp-rise { fill: var(--accent, #4f46e5); opacity: 0; animation: tp-rise 4.5s ease-in-out infinite; }
    @keyframes tp-rise {
      0%   { transform: translateY(0);      opacity: 0; }
      12%  { opacity: 0.38; }
      82%  { opacity: 0.38; }
      100% { transform: translateY(-322px); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) { .tp-rise { animation: none; opacity: 0; } }
  </style>
  <defs>
    <clipPath id="tp-clip">
      <polygon points="300,40 330,104 360,168 390,232 420,296 450,360 150,360 180,296 210,232 240,168 270,104"/>
    </clipPath>
  </defs>
  <g class="tp-t">
    <polygon class="tp-band" points="300,40 330,104 270,104" fill-opacity="0.6"/>
    <polygon class="tp-band" points="270,104 330,104 360,168 240,168" fill-opacity="0.7"/>
    <polygon class="tp-band" points="240,168 360,168 390,232 210,232" fill-opacity="0.81"/>
    <polygon class="tp-band" points="210,232 390,232 420,296 180,296" fill-opacity="0.9"/>
    <polygon class="tp-band" points="180,296 420,296 450,360 150,360" fill-opacity="1"/>
    <g clip-path="url(#tp-clip)"><rect class="tp-rise" x="150" y="348" width="300" height="16"/></g>
    <text class="tp-lbl-sm" x="300" y="94" text-anchor="middle">E2E / UI</text>
    <text class="tp-lbl-sm" x="300" y="142" text-anchor="middle">Acceptance / BDD</text>
    <text class="tp-lbl" x="300" y="206" text-anchor="middle">Contract</text>
    <text class="tp-lbl" x="300" y="270" text-anchor="middle">Integration</text>
    <text class="tp-lbl" x="300" y="334" text-anchor="middle">Unit</text>
    <line class="tp-tick" x1="470" y1="90" x2="326" y2="90"/>
    <line class="tp-tick" x1="470" y1="138" x2="349" y2="138"/>
    <line class="tp-tick" x1="470" y1="202" x2="379" y2="202"/>
    <line class="tp-tick" x1="470" y1="266" x2="409" y2="266"/>
    <line class="tp-tick" x1="470" y1="330" x2="439" y2="330"/>
    <text class="tp-note" x="482" y="94">a handful — critical journeys</text>
    <text class="tp-note" x="482" y="142">the behaviours that matter</text>
    <text class="tp-note" x="482" y="206">one per integration seam</text>
    <text class="tp-note" x="482" y="270">real infrastructure</text>
    <text class="tp-note" x="482" y="334">the bulk — fast, isolated</text>
    <line class="tp-axis" x1="104" y1="50" x2="104" y2="350"/>
    <polygon points="104,42 99,54 109,54" fill="var(--line-strong, #c8cce0)"/>
    <polygon points="104,358 99,346 109,346" fill="var(--line-strong, #c8cce0)"/>
    <text class="tp-cap" x="94" y="100" text-anchor="end">slower</text>
    <text class="tp-cap" x="94" y="118" text-anchor="end">more brittle</text>
    <text class="tp-cap" x="94" y="290" text-anchor="end">faster</text>
    <text class="tp-cap" x="94" y="308" text-anchor="end">more reliable</text>
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
