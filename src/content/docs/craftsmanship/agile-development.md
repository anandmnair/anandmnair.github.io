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

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="Feedback loop: build, release, observe, learn, adjust — shorten the loop time">
  <style>
    .t { font-family: inherit; }
    .ring { fill: none; stroke: var(--line-strong, #c8cce0); stroke-width: 2; stroke-dasharray: 5 6; }
    .arc { fill: none; stroke: var(--accent, #4f46e5); stroke-width: 2.5; }
    .pill { fill: var(--bg-elev, #f7f8fc); stroke: var(--accent, #4f46e5); stroke-width: 1.5; }
    .n { font-size: 14px; font-weight: 600; fill: var(--ink, #0f172a); }
    .cap { font-size: 13px; font-weight: 600; fill: var(--accent-ink, #4338ca); }
    .q { font-size: 12px; fill: var(--muted, #64748b); font-style: italic; }
    .sm { font-size: 11.5px; fill: var(--ink-soft, #475569); }
  </style>
  <defs><marker id="fl-ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><polygon points="0,0 8,4 0,8" fill="var(--accent, #4f46e5)"/></marker></defs>
  <g class="t">
    <circle class="ring" cx="320" cy="176" r="118"/>
    <path class="arc" d="M320 58 A118 118 0 0 1 424 120" marker-end="url(#fl-ar)"/>
    <path class="arc" d="M432 148 A118 118 0 0 1 390 268" marker-end="url(#fl-ar)"/>
    <path class="arc" d="M356 288 A118 118 0 0 1 232 262" marker-end="url(#fl-ar)"/>
    <path class="arc" d="M210 236 A118 118 0 0 1 204 128" marker-end="url(#fl-ar)"/>
    <path class="arc" d="M218 104 A118 118 0 0 1 288 62" marker-end="url(#fl-ar)"/>
    <g>
      <rect class="pill" x="272" y="34" width="96" height="34" rx="17"/>
      <text class="n" x="320" y="56" text-anchor="middle">Build</text>
      <rect class="pill" x="418" y="112" width="104" height="34" rx="17"/>
      <text class="n" x="470" y="134" text-anchor="middle">Release</text>
      <rect class="pill" x="386" y="262" width="106" height="34" rx="17"/>
      <text class="n" x="439" y="284" text-anchor="middle">Observe</text>
      <rect class="pill" x="152" y="262" width="94" height="34" rx="17"/>
      <text class="n" x="199" y="284" text-anchor="middle">Learn</text>
      <rect class="pill" x="122" y="112" width="98" height="34" rx="17"/>
      <text class="n" x="171" y="134" text-anchor="middle">Adjust</text>
    </g>
    <text class="cap" x="320" y="168" text-anchor="middle">loop time</text>
    <text class="q" x="320" y="190" text-anchor="middle">the only number</text>
    <text class="q" x="320" y="208" text-anchor="middle">that matters</text>
    <text class="sm" x="320" y="332" text-anchor="middle">shorten it, or the loop teaches you nothing before the context changes</text>
  </g>
</svg>
</figure>

### User stories, slicing and MVP

A user story is a **placeholder for a conversation**, not a specification. Its
value is in the discussion, and its acceptance criteria are the residue.

Slice **vertically**. A slice that touches UI, service and database and delivers
something a user can do is worth more than three horizontal slices that deliver
nothing until they meet.

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 380" role="img" aria-label="Two ways to slice delivery: components that are useless until the end, versus something usable at every step">
  <style>
    .t { font-family: inherit; }
    .cap { font-size: 12px; fill: var(--muted, #64748b); }
    .hd { font-size: 14px; font-weight: 600; fill: var(--ink, #0f172a); }
    .ink { fill: none; stroke: var(--ink-soft, #475569); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .wheel { fill: var(--bg-elev, #f7f8fc); stroke: var(--ink-soft, #475569); stroke-width: 2.2; }
    .edge { stroke: var(--ink-soft, #475569); stroke-width: 2.2; }
    .bad { fill: var(--bg-sunken, #eef0f9); }
    .good { fill: var(--accent, #4f46e5); fill-opacity: 0.3; }
  </style>
  <text x="16" y="24" class="t hd">Slicing by component — nothing works until the last step</text>
  <g class="t">
    <g transform="translate(30,54)">
      <circle cx="26" cy="40" r="20" class="wheel"/>
      <text x="0" y="82" class="cap">wheel</text>
    </g>
    <g transform="translate(200,54)">
      <rect x="0" y="26" width="86" height="14" rx="4" class="bad edge"/>
      <circle cx="16" cy="52" r="12" class="wheel"/><circle cx="70" cy="52" r="12" class="wheel"/>
      <text x="0" y="82" class="cap">chassis</text>
    </g>
    <g transform="translate(370,54)">
      <path d="M2 40 L18 16 H74 L90 40 Z" class="bad edge"/>
      <rect x="0" y="40" width="92" height="12" rx="4" class="bad edge"/>
      <text x="0" y="82" class="cap">body</text>
    </g>
    <g transform="translate(545,54)">
      <path d="M4 44 L22 18 H82 L100 44 Z" class="good edge"/>
      <rect x="0" y="44" width="104" height="14" rx="5" class="good edge"/>
      <circle cx="24" cy="66" r="12" class="wheel"/><circle cx="82" cy="66" r="12" class="wheel"/>
      <text x="0" y="96" class="cap">car — first feedback, month 18</text>
    </g>
  </g>
  <line x1="16" y1="176" x2="704" y2="176" stroke="var(--line, #e0e4f0)" stroke-width="1"/>
  <text x="16" y="208" class="t hd">Slicing by outcome — usable at every step</text>
  <g class="t">
    <g transform="translate(30,238)">
      <rect x="0" y="30" width="72" height="9" rx="4" class="good edge"/>
      <circle cx="14" cy="50" r="10" class="wheel"/><circle cx="58" cy="50" r="10" class="wheel"/>
      <text x="0" y="82" class="cap">skateboard</text>
    </g>
    <g transform="translate(200,238)">
      <circle cx="16" cy="50" r="12" class="wheel"/><circle cx="70" cy="50" r="12" class="wheel"/>
      <path d="M16 50 H70 M62 50 V20 H78" class="ink"/>
      <rect x="0" y="44" width="40" height="8" rx="4" class="good edge"/>
      <text x="0" y="82" class="cap">scooter</text>
    </g>
    <g transform="translate(370,238)">
      <circle cx="18" cy="48" r="18" class="wheel"/><circle cx="86" cy="48" r="18" class="wheel"/>
      <path d="M18 48 L48 20 H70 L86 48 M48 20 L40 48 M70 20 V12 H82" class="ink"/>
      <text x="0" y="82" class="cap">bicycle</text>
    </g>
    <g transform="translate(545,238)">
      <path d="M4 44 L22 18 H82 L100 44 Z" class="good edge"/>
      <rect x="0" y="44" width="104" height="14" rx="5" class="good edge"/>
      <circle cx="24" cy="66" r="12" class="wheel"/><circle cx="82" cy="66" r="12" class="wheel"/>
      <text x="0" y="96" class="cap">car — feedback since week 2</text>
    </g>
  </g>
</svg>
</figure>

The illustration everyone knows and few follow: if the goal is a car, do not
deliver a wheel, then an axle, then a chassis. Nobody can use any of them, and
you learn nothing until the end. Deliver a skateboard, then a bicycle, then a
motorbike, then a car. Each one moves someone from A to B. Each one teaches you
something about how they actually travel — and occasionally teaches you they
never wanted a car.

MVP means **minimum viable** — the smallest thing that is genuinely usable and
from which you learn something. Not the smallest thing you can ship, and not the
first release of a plan you have already fixed.
