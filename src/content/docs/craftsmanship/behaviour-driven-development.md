---
title: 'Behaviour-Driven Development'
description: >-
  BDD is TDD's conversation moved outward — from "does this unit work" to "do we agree on
  what the system should do". Written with the business, in Gherkin, so ambiguity surfaces
  while writing the scenario instead of during UAT.
order: 5
cardBadges: ['BDD', 'Gherkin']
---

BDD is TDD's conversation moved outward — from "does this unit work" to **"do we
agree on what the system should do"**.

The artefact is an executable specification in business language:

```gherkin
Feature: Credit limit approval

  Scenario: Application within the delegated limit
    Given an applicant with an internal rating of A
    And a requested amount of 500,000
    When the application is submitted
    Then it is approved automatically
    And an ApplicationApproved event is published
```

Written **with** the business, not translated for them afterwards. The value is
not the automation; it is that ambiguity surfaces while writing the scenario
rather than during UAT. Half the time the useful outcome of a BDD session is
discovering that two stakeholders meant different things by "approved".

**Failure modes to avoid:**

- **Gherkin as a scripting language.** `Given I click the button with id "sub-1"`
  is a UI test wearing a costume. Write behaviour, not interaction.
- **Scenario explosion.** BDD covers the behaviours that matter to the business.
  Every edge case belongs in unit tests, where it runs in milliseconds.
- **Nobody outside engineering reads them.** Then they are expensive
  integration tests, and you should say so.
