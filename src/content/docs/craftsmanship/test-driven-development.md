---
title: 'Test-Driven Development'
description: >-
  TDD is a design technique that produces tests as a by-product — teams that adopt it as a
  testing technique abandon it within a quarter. Red, green, refactor, and the design
  pressure of hard-to-test code is the actual point.
order: 4
cardBadges: ['TDD', 'Red-Green-Refactor']
---

TDD is a **design technique** that produces tests as a by-product. Teams that
adopt it as a testing technique abandon it within a quarter, because as a pure
testing technique it is slower than writing tests afterwards.

The loop:

1. **Red.** Write a failing test for the next small behaviour. If it passes
   immediately, your test is wrong or the behaviour already exists.
2. **Green.** Write the least code that passes. Ugly is fine here.
3. **Refactor.** Now make it right, with the test holding the behaviour still.

The design pressure is the point. Code that is hard to test is hard to test for
a reason — too many dependencies, hidden state, a class doing four things. TDD
makes that pain immediate rather than deferring it to the person who maintains
it next year.

**What it is not:** 100% coverage. Coverage measures which lines ran, not
whether anything was verified. See [mutation testing](#testing-strategy).

**Where it earns most:** domain logic, algorithms, anything with branches and
edge cases. **Where it earns least:** glue code, configuration, thin adapters.
Be honest about the difference instead of applying it uniformly and resenting it.
