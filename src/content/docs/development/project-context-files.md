---
title: 'Project context files'
description: >-
  The highest-leverage artefact in AI-assisted development. Treat it as code: version it,
  review changes to it, keep it short.
order: 4
cardBadges: ['Project Context', 'Docs as Code']
---

The highest-leverage artefact in AI-assisted development. Treat it as code:
version it, review changes to it, keep it short.

What belongs in it:

- Architecture in three sentences, and the boundaries that must not be crossed
- Build, test and run commands
- Conventions that are not obvious from the code
- Explicit non-goals — the things a well-meaning model will otherwise "helpfully"
  add

What does not: anything the model can read from the code itself. A context file
that restates the directory structure is context-window budget spent on nothing.
