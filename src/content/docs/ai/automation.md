---
title: 'Automation'
description: >-
  Probabilistic extraction, deterministic validation. Splitting an LLM pipeline this way took
  one document-verification pipeline from roughly 30% to 85% automated — and uncertain cases
  still route to a human.
order: 2
cardBadges: ['LLM Extraction', 'Deterministic Validation']
---

The pattern that has worked most reliably: **probabilistic extraction,
deterministic validation**.

A single LLM pass asked to "read this document and give me the correct fields"
plateaus quickly, because you cannot distinguish a confident wrong answer from a
correct one. Split it in two:

1. **Extract.** The model reads unstructured input and proposes structured
   output. Optimise for recall — it is allowed to be wrong.
2. **Validate.** Deterministic rules, cross-field consistency, reference-data
   lookups and confidence thresholds decide what is accepted, what is rejected,
   and what a human sees.

On a document-verification pipeline this took automation from roughly 30% to
85%. The gain did not come from a better model. It came from admitting the model
is probabilistic and putting the determinism somewhere it can be tested.

The corollary: **route the uncertain cases to a human, and make that routing a
first-class feature**. A pipeline with no exception path is a pipeline that will
be turned off.
