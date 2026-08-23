---
title: 'Review'
description: 'Review is a design conversation, not a defect hunt. If the first time a reviewer sees an approach is in a completed pull request, the review is too late — the author has sunk days'
order: 10
---

Review is a design conversation, not a defect hunt. If the first time a reviewer
sees an approach is in a completed pull request, the review is too late — the
author has sunk days into it and the honest feedback is now expensive.

**What review is for:** is this the right approach, will the next person
understand it, does it hold at the boundaries, are the tests testing behaviour
rather than implementation.

**What automation is for:** formatting, style, lint, coverage thresholds,
architecture rules, breaking API changes. Nothing degrades a review culture
faster than humans arguing about whitespace.

**Practices that hold up:**

- Small pull requests. Review quality falls off a cliff past a few hundred
  lines — beyond that, reviewers approve rather than read.
- Talk about the approach before the implementation.
- Ask questions instead of issuing instructions. "What happens if this is called
  concurrently?" teaches; "add a lock" does not.
- Distinguish blocking concerns from preferences, explicitly. Unmarked
  preferences are how reviews become power struggles.
- Review your own diff first. It is remarkable what you catch.

This matters more in AI-assisted development, not less — volume goes up, so the
automated gates have to carry more and the human attention has to go where
judgement is actually required. See [Development (AI)](/development/).
