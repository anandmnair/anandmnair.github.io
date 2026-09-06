---
title: 'AIDLC — AI Development Life Cycle'
titleIcon: >-
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img"
  aria-label="AIDLC logo"><defs><linearGradient id="aidlc-g" x1="0" y1="0"
  x2="1" y2="1"><stop offset="0" stop-color="#7c8cf8"/><stop offset="1"
  stop-color="#22d3ee"/></linearGradient></defs><circle cx="32" cy="32"
  r="23" fill="none" stroke="url(#aidlc-g)" stroke-width="5"
  stroke-linecap="round" stroke-dasharray="112 38"/><path
  d="M49 13 L58 17 L52 24 Z" fill="#22d3ee"/><g fill="url(#aidlc-g)"><circle
  cx="32" cy="18.3" r="2.4"/><rect x="31" y="19.8" width="2" height="5"/><rect
  x="21.5" y="24.5" width="21" height="18" rx="4.5"/><rect x="18.4" y="30"
  width="3" height="7" rx="1.5"/><rect x="42.6" y="30" width="3" height="7"
  rx="1.5"/></g><g fill="#ffffff"><circle cx="27.5" cy="32.3" r="2.7"/><circle
  cx="36.5" cy="32.3" r="2.7"/><rect x="27.5" y="37.4" width="9" height="2.4"
  rx="1.2"/></g></svg>
description: 'AIDLC is a tool-agnostic, agent-driven development life cycle. You feed it a requirement in .md format, and a pipeline of specialized AI agents takes it from analysis to pull request — with an objective exit check at every phase boundary and an explicit human gate at the phases that carry one. It works with Claude Code, GitHub Copilot, Cursor, Gemini CLI, Windsurf, and JetBrains IDEs through a single installer.'
order: 1
---

**Agentic AI · TDD · Multi-tool Pipeline**

AIDLC is not a prompt collection — it is a **governed delivery process** for
AI-assisted software. You feed it a requirement in `.md` form, and an
eleven-phase pipeline of narrow-responsibility AI agents carries it from
knowledge-base sync to merge-ready pull requests: an **objective exit check at
every phase boundary**, an **explicit human gate** at the phases that carry
one, and a machine-readable run record that makes the whole thing resumable
and auditable.

## The problem it solves

"One big prompt" development fails in predictable, expensive ways — invented
requirements, 2,000-line diffs nobody can review, tests written to fit the
code, confident hallucination of APIs, quality that erodes as the session
fills its context window, and work that is lost the moment the session ends.

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 264" role="img" aria-label="One big prompt loops from a 2,000-line diff back to an assumed requirement; AIDLC moves forward through MVP slices and gated ~400-line diffs">
  <style>
    .cmp-t { font-family: inherit; }
    .cmp-node { fill: var(--bg-elev, #f7f8fc); stroke: var(--accent, #4f46e5); stroke-width: 1.5; }
    .cmp-gate { fill: var(--bg-elev, #f7f8fc); stroke: var(--accent-ink, #4338ca); stroke-width: 1.5; stroke-dasharray: 4 3; }
    .cmp-lbl { font-size: 10.5px; font-weight: 600; fill: var(--ink, #0f172a); }
    .cmp-cap { font-size: 11px; font-weight: 700; fill: var(--ink-soft, #475569); }
    .cmp-note { font-size: 9.5px; fill: var(--muted, #64748b); font-style: italic; }
    .cmp-fwd { fill: none; stroke: var(--accent, #4f46e5); stroke-width: 2; stroke-dasharray: 6 6; animation: cmp-flow 0.9s linear infinite; }
    .cmp-thrash { fill: none; stroke: var(--muted, #64748b); stroke-width: 1.6; stroke-dasharray: 4 4; animation: cmp-flow 0.7s linear infinite; }
    @keyframes cmp-flow { to { stroke-dashoffset: -12; } }
    @media (prefers-reduced-motion: reduce) { .cmp-fwd, .cmp-thrash { animation: none; } }
  </style>
  <defs><marker id="cmp-a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="var(--accent, #4f46e5)"/></marker>
  <marker id="cmp-am" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="var(--muted, #64748b)"/></marker></defs>
  <g class="cmp-t">
    <text class="cmp-cap" x="16" y="20">One big prompt</text>
    <g><rect class="cmp-node" x="16" y="34" width="128" height="38" rx="8"/><text class="cmp-lbl" x="80" y="57" text-anchor="middle">Requirement, assumed</text></g>
    <g><rect class="cmp-node" x="188" y="34" width="112" height="38" rx="8"/><text class="cmp-lbl" x="244" y="57" text-anchor="middle">One long session</text></g>
    <g><rect class="cmp-node" x="344" y="34" width="112" height="38" rx="8"/><text class="cmp-lbl" x="400" y="57" text-anchor="middle">2,000-line diff</text></g>
    <g><polygon class="cmp-gate" points="536,34 582,53 536,72 490,53"/><text class="cmp-lbl" x="536" y="57" text-anchor="middle">Review</text></g>
    <path class="cmp-fwd" d="M144 53 H188" marker-end="url(#cmp-a)"/>
    <path class="cmp-fwd" d="M300 53 H344" marker-end="url(#cmp-a)"/>
    <path class="cmp-fwd" d="M456 53 H490" marker-end="url(#cmp-a)"/>
    <path class="cmp-thrash" d="M536 72 V100 H80 V74" marker-end="url(#cmp-am)"/>
    <text class="cmp-note" x="300" y="96" text-anchor="middle">what was it supposed to do?</text>
    <line x1="16" y1="124" x2="704" y2="124" stroke="var(--line, #e0e4f0)" stroke-width="1"/>
    <text class="cmp-cap" x="16" y="152">AIDLC</text>
    <g><rect class="cmp-node" x="16" y="166" width="128" height="38" rx="8"/><text class="cmp-lbl" x="80" y="189" text-anchor="middle">Requirement, gaps answered</text></g>
    <g><rect class="cmp-node" x="184" y="166" width="96" height="38" rx="8"/><text class="cmp-lbl" x="232" y="189" text-anchor="middle">MVP slices</text></g>
    <g><rect class="cmp-node" x="320" y="166" width="124" height="38" rx="8"/><text class="cmp-lbl" x="382" y="189" text-anchor="middle">~400-line diff / MVP</text></g>
    <g><polygon class="cmp-gate" points="512,166 556,185 512,204 468,185"/><text class="cmp-lbl" x="512" y="189" text-anchor="middle">Gate</text></g>
    <g><rect class="cmp-node" x="588" y="166" width="100" height="38" rx="8"/><text class="cmp-lbl" x="638" y="189" text-anchor="middle">Next MVP</text></g>
    <path class="cmp-fwd" d="M144 185 H184" marker-end="url(#cmp-a)"/>
    <path class="cmp-fwd" d="M280 185 H320" marker-end="url(#cmp-a)"/>
    <path class="cmp-fwd" d="M444 185 H468" marker-end="url(#cmp-a)"/>
    <path class="cmp-fwd" d="M556 185 H588" marker-end="url(#cmp-a)"/>
    <path class="cmp-thrash" d="M512 204 V232 H382 V206" marker-end="url(#cmp-am)"/>
    <text class="cmp-note" x="300" y="228" text-anchor="middle">rejected → routed to the owning phase</text>
  </g>
</svg>
</figure>

## The pipeline

Analysis and Design run once. Planning slices the requirement into MVPs
*against the approved architecture* — the one default pre-dev gate. Develop →
Document → Test → Review → Pull Request then repeats **once per MVP** in
dependency order, and each MVP ships as its own reviewable PR of ~10–20 files.
Every step is recorded in `state.json`, so an interrupted run resumes exactly
where it stopped.

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 348" role="img" aria-label="The AIDLC pipeline: a requirement .md file passes through Knowledge Base, Analysis, Design and Planning, then GATE 3, then repeats Develop, Document, Test, Review and Pull Request once per MVP behind GATE 8, until every MVP's PR is merged">
  <style>
    .pf-t { font-family: inherit; }
    .pf-node { fill: var(--bg-elev, #f7f8fc); stroke: var(--accent, #4f46e5); stroke-width: 1.6; }
    .pf-gate { fill: var(--bg-elev, #f7f8fc); stroke: var(--accent-ink, #4338ca); stroke-width: 1.6; stroke-dasharray: 4 3; }
    .pf-loopbox { fill: none; stroke: var(--line-strong, #c8cce0); stroke-width: 1.4; stroke-dasharray: 7 5; }
    .pf-lbl { font-size: 10.5px; font-weight: 600; fill: var(--ink, #0f172a); }
    .pf-sub { font-size: 9.5px; fill: var(--muted, #64748b); }
    .pf-doc { fill: var(--bg-elev, #f7f8fc); stroke: var(--accent, #4f46e5); stroke-width: 1.6; }
    .pf-edge { fill: none; stroke: var(--accent, #4f46e5); stroke-width: 2; stroke-dasharray: 6 6; animation: pf-dash 0.9s linear infinite; }
    .pf-back { fill: none; stroke: var(--line-strong, #c8cce0); stroke-width: 1.6; }
    @keyframes pf-dash { to { stroke-dashoffset: -12; } }
    .pf-token { opacity: 0; }
    @supports (offset-path: path('M0 0 L1 1')) {
      .pf-token {
        offset-path: path('M46 72 L140 70 L260 70 L380 70 L500 70 L610 70 L610 122 L148 122 L148 210 L262 210 L376 210 L490 210 L608 210 L730 210 L650 300');
        animation: pf-travel 9s ease-in-out infinite;
      }
      @keyframes pf-travel {
        0%  { offset-distance: 0%;   opacity: 0; }
        5%  { opacity: 1; }
        92% { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }
    }
    @media (prefers-reduced-motion: reduce) { .pf-edge, .pf-token { animation: none; } .pf-token { opacity: 0; } }
  </style>
  <defs>
    <marker id="pf-ar" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="var(--accent, #4f46e5)"/></marker>
    <marker id="pf-arb" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="var(--line-strong, #c8cce0)"/></marker>
  </defs>
  <g class="pf-t">
    <path class="pf-edge" d="M66 71 H88" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M190 70 H210" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M310 70 H330" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M430 70 H450" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M550 70 H584" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M610 94 V122 H148 V186" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M196 210 H214" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M310 210 H328" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M424 210 H442" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M538 210 H556" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M660 210 H706" marker-end="url(#pf-ar)"/>
    <path class="pf-edge" d="M730 234 V300 H700" marker-end="url(#pf-ar)"/>
    <path class="pf-back" d="M754 210 H786 V326 H68 V210 H100" marker-end="url(#pf-arb)"/>
    <text class="pf-sub" x="72" y="322">GATE 8 · MVPs remain → next MVP · findings route back to Phase 1</text>
    <rect class="pf-loopbox" x="78" y="150" width="646" height="120" rx="10"/>
    <text class="pf-sub" x="90" y="166">Develop → Document → Test → Review → PR · once per MVP · dependency order</text>
    <path class="pf-doc" d="M22 48 h30 l14 14 v40 h-44 z"/>
    <path d="M52 48 v14 h14" fill="none" stroke="var(--accent, #4f46e5)" stroke-width="1.6"/>
    <text class="pf-lbl" x="44" y="86" text-anchor="middle">req</text>
    <text class="pf-sub" x="44" y="118" text-anchor="middle">.md</text>
    <g><rect class="pf-node" x="90" y="52" width="100" height="36" rx="8"/><text class="pf-lbl" x="140" y="74" text-anchor="middle">0 · KB</text></g>
    <g><rect class="pf-node" x="210" y="52" width="100" height="36" rx="8"/><text class="pf-lbl" x="260" y="74" text-anchor="middle">1 · Analysis</text></g>
    <g><rect class="pf-node" x="330" y="52" width="100" height="36" rx="8"/><text class="pf-lbl" x="380" y="74" text-anchor="middle">2 · Design</text></g>
    <g><rect class="pf-node" x="450" y="52" width="100" height="36" rx="8"/><text class="pf-lbl" x="500" y="74" text-anchor="middle">3 · Planning</text></g>
    <g><polygon class="pf-gate" points="610,44 636,70 610,96 584,70"/><text class="pf-lbl" x="610" y="73" text-anchor="middle">GATE 3</text></g>
    <g><rect class="pf-node" x="100" y="192" width="96" height="36" rx="8"/><text class="pf-lbl" x="148" y="214" text-anchor="middle">4 · Develop</text></g>
    <g><rect class="pf-node" x="214" y="192" width="96" height="36" rx="8"/><text class="pf-lbl" x="262" y="214" text-anchor="middle">5 · Document</text></g>
    <g><rect class="pf-node" x="328" y="192" width="96" height="36" rx="8"/><text class="pf-lbl" x="376" y="214" text-anchor="middle">6 · Test</text></g>
    <g><rect class="pf-node" x="442" y="192" width="96" height="36" rx="8"/><text class="pf-lbl" x="490" y="214" text-anchor="middle">7 · Review</text></g>
    <g><rect class="pf-node" x="556" y="192" width="104" height="36" rx="8"/><text class="pf-lbl" x="608" y="214" text-anchor="middle">8 · Pull Request</text></g>
    <g><polygon class="pf-gate" points="730,184 756,210 730,236 704,210"/><text class="pf-lbl" x="730" y="213" text-anchor="middle">GATE 8</text></g>
    <g><rect class="pf-node" x="600" y="282" width="100" height="36" rx="18"/><text class="pf-lbl" x="650" y="304" text-anchor="middle">merge PR</text></g>
    <circle class="pf-token" r="5.5" fill="var(--accent, #4f46e5)"/>
  </g>
</svg>
</figure>

### Phases and agents

AIDLC ships **9 specialist agents**, each a senior-practitioner persona with
explicit inputs, outputs, and a least-privilege tool allowlist (the reviewer,
for instance, has no edit access — it reports findings, it does not silently
fix them).

| # | Phase | Agent | Human gate |
|---|-------|-------|------------|
| 0 | Knowledge Base | `ai-curator` | — build / refresh, SHA-checked |
| 1 | Analysis | `ai-analyst` | automated · gap questions always answered |
| 2 | Design | `ai-architect` | automated · HLD, LLD, ADR drafts |
| 3 | Planning | `ai-analyst` + `ai-architect` | **GATE 3** · requirement + arch + MVP plan + impl plan |
| 4 | Develop *(per MVP)* | `ai-developer-{java,python,frontend,generic}` | automated · strict TDD, red → green → refactor |
| 5 | Document *(per MVP)* | `ai-documenter` | automated · ADRs, MkDocs, Javadoc audit |
| 6 | Test *(per MVP)* | `ai-tester` | automated · IT + E2E, coverage/mutation hard block |
| 7 | Review *(per MVP)* | `ai-reviewer` | automated · Sonar / ArchUnit / security hard block |
| 8 | Pull Request *(per MVP)* | orchestrator + `ai-curator` | **GATE 8** · this MVP's PR + open findings + routing |
| 9 | Deployment *(optional)* | `ai-devops` | GATE 9 · pre-merge preview deploy + smoke |
| 10 | Self-Retrospection *(optional)* | `ai-retrospecter` | GATE 10 · suggest-only proposal |

## What ships

The tool-agnostic core is a flat set of Markdown files: **9 agents**, **33
skills**, **5 prompts**, plus 16 guidelines, 4 runtime reference contracts,
and 18 artifact templates. The installer converts them into each tool's native
format.

### Agents (9)

| Agent | Phase | Role |
|-------|-------|------|
| `ai-curator` | 0, 8 | Knowledge curator — build / refresh / sync the Knowledge Base |
| `ai-analyst` | 1, 3 | Sr. Analyst — requirement intake, gap analysis; MVP slicing with guardrails |
| `ai-architect` | 2, 3 | Sr. Architect — HLD / LLD, ADR drafts; per-MVP implementation plan |
| `ai-developer-{java,python,frontend,generic}` | 4 | Sr. Developer per stack — strict TDD, clean/SOLID/hexagonal code |
| `ai-documenter` | 5 | Technical writer — ADRs, MkDocs site, Javadoc / JSDoc audit |
| `ai-tester` | 6 | Sr. QA Engineer — integration / E2E, coverage & mutation hard block |
| `ai-reviewer` | 7 | Principal reviewer — Sonar / ArchUnit / security block, findings to the PR |
| `ai-devops` | 9 *(optional)* | Sr. DevOps — immutable artifact, pre-merge preview deploy, rollback path |
| `ai-retrospecter` | 10 *(optional)* | Process analyst — suggest-only proposal from run-history signal |

### Skills (33)

Loaded per phase, never all at once — a skill is a standards document an agent
reads before acting.

| Group | Skills |
|-------|--------|
| **Process & knowledge** | `ai-knowledge-base` · `ai-requirement-intake` · `ai-requirement-analysis` · `ai-agile-planning` · `ai-system-design` · `ai-adr` · `ai-mkdocs-documentation` |
| **Engineering discipline** | `ai-tdd` · `ai-bdd` · `ai-testing-strategy` · `ai-code-quality` · `ai-hexagonal-architecture` · `ai-ddd` · `ai-security` · `ai-git` · `ai-cross-repo-workspace` |
| **Stacks** | `ai-java21` · `ai-java25` · `ai-spring` · `ai-spring-security` · `ai-python` · `ai-angular` · `ai-react` · `ai-web-fundamentals` |
| **AI features** | `ai-llm-foundations` · `ai-llm-python` · `ai-llm-java` |
| **Deploy** *(optional)* | `ai-deployment` · `ai-containers` |
| **Retrospection** *(optional)* | `ai-retrospection-analysis` |
| **Meta / scaffolding** | `ai-agent-generator` · `ai-skill-generator` · `ai-prompt-generator` |

### Prompts (5)

| Prompt | Invocation | Purpose |
|--------|-----------|---------|
| `ai-orchestrator` | `/aidlc <requirement>` | Master pipeline — coordinates every agent through Phases 0–10 with the human gates |
| `ai-bugfix` | reference-only | Scoped TDD bugfix loop — reproduce → fix → verify, no full pipeline |
| `ai-pr-readiness` | reference-only | Standalone Phase 7 + 8 — review, KB sync, PR prep for a branch built outside AIDLC |
| `ai-deploy` | `/ai-deploy [env]` | Standalone Phase 9 — build, preview deploy, verify, rollback. Off unless `deployment.enabled` |
| `ai-retrospecter` | `/ai-retrospecter` | Standalone Phase 10 — suggest-only proposal. Off unless `self_retrospection.enabled` |

Full detail — personas, per-phase mapping, prompt source — is in the docs
[Catalog](https://anandmnair.github.io/aidlc/reference/catalog/).

## Two checks at every boundary

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 208" role="img" aria-label="Phase work must pass the objective exit conditions before the human approval gate is even shown; failing either check routes back to the work">
  <style>
    .bd-t { font-family: inherit; }
    .bd-node { fill: var(--bg-elev, #f7f8fc); stroke: var(--accent, #4f46e5); stroke-width: 1.6; }
    .bd-check { fill: var(--bg-elev, #f7f8fc); stroke: var(--accent-ink, #4338ca); stroke-width: 1.6; stroke-dasharray: 4 3; }
    .bd-lbl { font-size: 10.5px; font-weight: 600; fill: var(--ink, #0f172a); }
    .bd-note { font-size: 9.5px; fill: var(--muted, #64748b); }
    .bd-pass { fill: none; stroke: var(--accent, #4f46e5); stroke-width: 2; stroke-dasharray: 6 6; animation: bd-flow 0.9s linear infinite; }
    .bd-fail { fill: none; stroke: var(--line-strong, #c8cce0); stroke-width: 1.6; }
    @keyframes bd-flow { to { stroke-dashoffset: -12; } }
    @media (prefers-reduced-motion: reduce) { .bd-pass { animation: none; } }
  </style>
  <defs>
    <marker id="bd-a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="var(--accent, #4f46e5)"/></marker>
    <marker id="bd-af" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="var(--line-strong, #c8cce0)"/></marker>
  </defs>
  <g class="bd-t">
    <g><rect class="bd-node" x="16" y="70" width="92" height="40" rx="8"/><text class="bd-lbl" x="62" y="94" text-anchor="middle">Phase work</text></g>
    <g><polygon class="bd-check" points="214,60 286,90 214,120 142,90"/><text class="bd-lbl" x="214" y="87" text-anchor="middle">exit</text><text class="bd-lbl" x="214" y="100" text-anchor="middle">conditions</text></g>
    <g><polygon class="bd-check" points="424,60 498,90 424,120 350,90"/><text class="bd-lbl" x="424" y="87" text-anchor="middle">human</text><text class="bd-lbl" x="424" y="100" text-anchor="middle">approval</text></g>
    <g><rect class="bd-node" x="566" y="70" width="120" height="40" rx="8"/><text class="bd-lbl" x="626" y="94" text-anchor="middle">Next phase</text></g>
    <path class="bd-pass" d="M108 90 H142" marker-end="url(#bd-a)"/>
    <path class="bd-pass" d="M286 90 H350" marker-end="url(#bd-a)"/>
    <text class="bd-note" x="318" y="84" text-anchor="middle">all met</text>
    <path class="bd-pass" d="M498 90 H566" marker-end="url(#bd-a)"/>
    <text class="bd-note" x="532" y="84" text-anchor="middle">approved</text>
    <path class="bd-fail" d="M214 120 V158 H62 V110" marker-end="url(#bd-af)"/>
    <text class="bd-note" x="150" y="154" text-anchor="middle">any fail — the gate is NOT shown</text>
    <path class="bd-fail" d="M424 120 V182 H62 V158" marker-end="url(#bd-af)"/>
    <text class="bd-note" x="330" y="178" text-anchor="middle">anything else — record the rejection, ask what to refine</text>
  </g>
</svg>
</figure>

A passing checklist never substitutes for approval; approval never waives a
failed condition. By default only **Planning** and each MVP's **Pull Request**
stop for a human — `strict_predev` adds gates after Analysis and Design.
Rejection routes **back, not forward**: a review finding that is really a
requirement problem re-enters Phase 1, a design flaw Phase 2, a slicing issue
Phase 3, a code issue Phase 4 — and rolling back voids every later gate.
Agents never merge; you merge each MVP's PR yourself.

## Context as an engineering constraint

Agents read a curated, commit-SHA-synced **Knowledge Base** (~2,100 tokens:
root + touched shard + generated API map) instead of rescanning the repo each
phase — against ~139,000 tokens for a full-tree load, and the KB's budget is
enforced by a CI gate so it cannot quietly grow into the thing it replaced.
Anchor-scoped reference reads, ≤10-line handoff summaries, tiered guidelines,
per-phase skill loading, and diffs-over-files round out the six mechanisms.

## Quality gates

Quality is built in, not inspected in — TDD, clean code, and architecture
rules are part of the definition of done for **every MVP**, not a later phase.
The measurable gates every delivery must pass:

| Gate | Threshold | Enforced by |
|------|-----------|-------------|
| Line + branch coverage | ≥ 95 % overall | test run + coverage tool |
| Mutation score (domain) | ≥ 95 % | PIT, or the stack's equivalent |
| Sonar | 0 blockers, 0 criticals, no new smells above threshold | Sonar quality gate |
| Architecture boundaries | all rules green | ArchUnit tests |
| TDD | no production code without a preceding failing test | MVP log + review |
| Javadoc / JSDoc | current on all public APIs | documenter audit |
| Diff size | ≤ ~400 lines per MVP, else split and re-gate | orchestrator |
| Secrets | none in the diff | secret scan |

Thresholds live in `install/config.yaml` — a repo with different standards
changes the file, not the agents. When mutation testing finds surviving
mutants, the fix is stronger tests; weakening code or tests to game a metric
is a guideline violation.

**Hexagonal architecture is the structural gate.** Business logic sits in a
domain module with zero framework dependencies; ports are interfaces defined
there; adapters implement them in separate modules and may use frameworks. A
dependency from domain to Spring is a build failure, not a review comment.

<figure class="diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 252" role="img" aria-label="Adapters for REST, persistence, messaging and UI depend inward on ports; ports are interfaces inside a framework-free domain, alongside the business logic">
  <style>
    .hx2-t { font-family: inherit; }
    .hx2-box { fill: none; stroke: var(--line-strong, #c8cce0); stroke-width: 1.4; stroke-dasharray: 7 5; }
    .hx2-chip { fill: var(--bg-elev, #f7f8fc); stroke: var(--accent, #4f46e5); stroke-width: 1.6; }
    .hx2-core { fill: var(--accent, #4f46e5); fill-opacity: 0.14; stroke: var(--accent, #4f46e5); stroke-width: 1.6; }
    .hx2-lbl { font-size: 10.5px; font-weight: 600; fill: var(--ink, #0f172a); }
    .hx2-cap { font-size: 10px; fill: var(--muted, #64748b); }
    .hx2-flow { fill: none; stroke: var(--accent, #4f46e5); stroke-width: 2; stroke-dasharray: 6 6; animation: hx2-flow 0.9s linear infinite; }
    @keyframes hx2-flow { to { stroke-dashoffset: -12; } }
    @media (prefers-reduced-motion: reduce) { .hx2-flow { animation: none; } }
  </style>
  <defs><marker id="hx2-a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="var(--accent, #4f46e5)"/></marker></defs>
  <g class="hx2-t">
    <rect class="hx2-box" x="20" y="16" width="600" height="72" rx="10"/>
    <text class="hx2-cap" x="32" y="32">Adapters — frameworks allowed</text>
    <g><rect class="hx2-chip" x="40" y="42" width="120" height="34" rx="8"/><text class="hx2-lbl" x="100" y="63" text-anchor="middle">REST controllers</text></g>
    <g><rect class="hx2-chip" x="180" y="42" width="120" height="34" rx="8"/><text class="hx2-lbl" x="240" y="63" text-anchor="middle">Persistence</text></g>
    <g><rect class="hx2-chip" x="320" y="42" width="120" height="34" rx="8"/><text class="hx2-lbl" x="380" y="63" text-anchor="middle">Messaging</text></g>
    <g><rect class="hx2-chip" x="460" y="42" width="120" height="34" rx="8"/><text class="hx2-lbl" x="520" y="63" text-anchor="middle">UI</text></g>
    <path class="hx2-flow" d="M100 76 V118" marker-end="url(#hx2-a)"/>
    <path class="hx2-flow" d="M240 76 V118" marker-end="url(#hx2-a)"/>
    <path class="hx2-flow" d="M380 76 V118" marker-end="url(#hx2-a)"/>
    <path class="hx2-flow" d="M520 76 V118" marker-end="url(#hx2-a)"/>
    <rect class="hx2-box" x="20" y="120" width="600" height="120" rx="10"/>
    <text class="hx2-cap" x="32" y="136">Domain — zero framework dependencies</text>
    <g><rect class="hx2-chip" x="140" y="144" width="360" height="34" rx="8"/><text class="hx2-lbl" x="320" y="165" text-anchor="middle">Ports = interfaces</text></g>
    <line x1="320" y1="178" x2="320" y2="190" stroke="var(--accent, #4f46e5)" stroke-width="1.6"/>
    <g><rect class="hx2-core" x="140" y="190" width="360" height="42" rx="10"/><text class="hx2-lbl" x="320" y="216" text-anchor="middle">Business logic</text></g>
  </g>
</svg>
</figure>

## Non-negotiables

Sixteen mandatory guidelines run underneath every agent in every phase — the
design constraint behind all of them: *doing too much, too confidently, too
soon* is the default failure mode to fight.

- **Never assume, never hallucinate** — ambiguity is escalated to you, always.
- **TDD** — no production code without a failing test first; red → green → refactor.
- **Hexagonal architecture** — framework-free domain, ports and adapters, ArchUnit-enforced.
- **Quality gates** — line/branch coverage ≥ 95 %, domain mutation score ≥ 95 %, Sonar clean.
- **Restraint** — every changed line traces to the request; no scope creep.
- **Never weaken a check to make it pass** — a red pipeline reported honestly beats a green one bought by loosening a gate.
- **Status footer** on every response — mode, model, token usage.

## Tool-agnostic

One installer converts the tool-agnostic Markdown core into each target's
native format — Claude Code subagents, GitHub Copilot chat modes, Cursor
rules, Gemini CLI, Windsurf rules, JetBrains AI Assistant rules. The persona
and behavior are identical everywhere; only the packaging differs.

```bash
git clone https://github.com/anandmnair/aidlc.git ~/aidlc
~/aidlc/install/install.sh --tool claude --scope repo
claude   # then:  /aidlc requirements/my-feature.md
```

[Repository](https://github.com/anandmnair/aidlc) ·
[Documentation](https://anandmnair.github.io/aidlc/)
