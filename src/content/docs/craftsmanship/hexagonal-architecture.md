---
title: 'Hexagonal architecture'
description: >-
  Also called ports and adapters. One rule: dependencies point inward — domain,
  infrastructure and bootstrap kept apart, enforced with ArchUnit so the boundary can't
  quietly erode one pragmatic exception at a time.
order: 7
cardBadges: ['Ports & Adapters', 'ArchUnit']
---

Also called ports and adapters. One rule: **dependencies point inward.**

### Domain

The centre. Business rules, entities, value objects, domain services, domain
events. It defines **ports** — interfaces describing what it needs from the
outside world, written in its own vocabulary.

No Spring. No JPA. No HTTP. No Kafka. Not "we abstracted it well"; genuinely
absent. The domain should compile and its tests should run with no framework on
the classpath, in milliseconds, with no container starting.

### Infrastructure

The adapters. REST controllers, JPA repositories, Kafka producers and consumers,
external API clients, file readers. Each implements a port defined by the domain
or drives one.

This is the layer that changes for reasons that have nothing to do with the
business — a library upgrade, a broker migration, a new API version. Isolating
that churn from the domain is the entire return on the pattern.

### Bootstrap

The composition root. Wiring, configuration, dependency injection, the
application entry point. It knows about everything; nothing knows about it.

Keeping bootstrap separate from infrastructure is what stops "just autowire it
here" from quietly reintroducing the coupling you removed.

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" role="img" aria-label="Hexagonal architecture: a request flows from an outside adapter through an inbound port into the domain, out through an outbound port, and back through infrastructure to a database">
  <style>
    .hx-t { font-family: inherit; }
    .hx-h1 { font-size: 17px; font-weight: 700; fill: var(--bg, #ffffff); }
    .hx-h2 { font-size: 13px; font-weight: 600; fill: var(--ink-soft, #475569); }
    .hx-sm { font-size: 11.5px; fill: var(--ink-soft, #475569); }
    .hx-core-sm { font-size: 11.5px; fill: var(--bg, #ffffff); opacity: 0.72; }
    .hx-port { font-size: 10.5px; fill: var(--accent-ink, #4338ca); font-weight: 600; }
    .hx-cap { font-size: 12px; fill: var(--muted, #64748b); }
    .hx-shell { fill: none; stroke: var(--line, #e0e4f0); stroke-width: 1.5; stroke-dasharray: 6 5; }
    .hx-infra { fill: var(--bg-elev, #f7f8fc); stroke: var(--accent, #4f46e5); stroke-width: 2; }
    .hx-core { fill: var(--accent, #4f46e5); }
    .hx-port-dot { fill: var(--bg, #ffffff); stroke: var(--accent-ink, #4338ca); stroke-width: 2.5; }
    .hx-wire { stroke: var(--accent, #4f46e5); stroke-width: 1.5; }
    .hx-dot { opacity: 0; }
    @supports (offset-path: path('M0 0 L1 1')) {
      .hx-dot {
        offset-path: path('M150 186 L228 199 L320 250 L412 305 L468 300');
        animation: hx-travel 4s linear infinite;
      }
      @keyframes hx-travel {
        0%   { offset-distance: 0%;   opacity: 0; }
        7%   { opacity: 1; }
        90%  { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }
    }
    @media (prefers-reduced-motion: reduce) { .hx-dot { animation: none; opacity: 0; } }
  </style>
  <defs><marker id="hx-a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="var(--accent, #4f46e5)"/></marker></defs>
  <g class="hx-t">
    <rect class="hx-shell" x="40" y="26" width="560" height="388" rx="10"/>
    <text class="hx-cap" x="56" y="48">bootstrap — wiring, configuration, entry point</text>
    <polygon class="hx-infra" points="320,86 452,162 452,314 320,390 188,314 188,162"/>
    <text class="hx-h2" x="320" y="118" text-anchor="middle">infrastructure — adapters</text>
    <polygon class="hx-core" points="320,146 412,199 412,305 320,358 228,305 228,199"/>
    <text class="hx-h1" x="320" y="245" text-anchor="middle">DOMAIN</text>
    <text class="hx-core-sm" x="320" y="268" text-anchor="middle">rules · entities · events</text>
    <text class="hx-core-sm" x="320" y="286" text-anchor="middle">no framework</text>
    <circle class="hx-port-dot" cx="320" cy="146" r="6"/>
    <circle class="hx-port-dot" cx="412" cy="199" r="6"/>
    <circle class="hx-port-dot" cx="412" cy="305" r="6"/>
    <circle class="hx-port-dot" cx="320" cy="358" r="6"/>
    <circle class="hx-port-dot" cx="228" cy="305" r="6"/>
    <circle class="hx-port-dot" cx="228" cy="199" r="6"/>
    <text class="hx-port" x="320" y="136" text-anchor="middle">port</text>
    <text class="hx-sm" x="474" y="180">REST controllers</text>
    <text class="hx-sm" x="474" y="204">Kafka consumers</text>
    <text class="hx-sm" x="474" y="300">JPA repositories</text>
    <text class="hx-sm" x="474" y="324">API clients</text>
    <text class="hx-sm" x="166" y="180" text-anchor="end">scheduler</text>
    <text class="hx-sm" x="166" y="204" text-anchor="end">CLI</text>
    <text class="hx-sm" x="166" y="300" text-anchor="end">file store</text>
    <text class="hx-sm" x="166" y="324" text-anchor="end">cache</text>
    <path class="hx-wire" d="M470 190 L424 197" marker-end="url(#hx-a)"/>
    <path class="hx-wire" d="M470 306 L424 304" marker-end="url(#hx-a)"/>
    <path class="hx-wire" d="M170 190 L216 197" marker-end="url(#hx-a)"/>
    <path class="hx-wire" d="M170 306 L216 304" marker-end="url(#hx-a)"/>
    <circle class="hx-dot" r="5" fill="var(--accent, #4f46e5)"/>
    <text class="hx-cap" x="320" y="412" text-anchor="middle">dependencies point inward — always</text>
  </g>
</svg>
</figure>

### Enforce it with tests

A boundary nobody tests is a boundary that has already been crossed. ArchUnit
for the JVM, import-linter for Python:

```java
@ArchTest
static final ArchRule domain_is_independent =
    noClasses().that().resideInAPackage("..domain..")
        .should().dependOnClassesThat()
        .resideInAnyPackage("..infrastructure..", "org.springframework..", "javax.persistence..");
```

Written on day one this costs an hour. Retrofitted after two years it is a
migration project. Every hexagonal codebase that decayed did so one pragmatic
exception at a time, each individually reasonable.
