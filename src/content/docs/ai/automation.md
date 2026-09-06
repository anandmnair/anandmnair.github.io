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

## Maker–checker

The split above is a **maker–checker** pattern. The model is the maker: it
proposes. The checker is deterministic — rules, cross-field consistency,
reference-data lookups, confidence thresholds — with a human as the final
checker on anything the rules cannot clear.

Treat the checker as production code, not configuration:

- **Versioned.** A rule change is a reviewed commit with history, not an edit
  to a spreadsheet.
- **Tested.** Every rule has unit tests over known-good and known-bad inputs.
- **Owned.** Someone is accountable for the rule set the way someone owns a
  service.

A provider shipping a new model version can regress extraction silently. A
tested, versioned checker is what catches that before it reaches a customer.

## Worked example: MT700 letter-of-credit checks

Extract the fields of an MT700 letter of credit from a PDF, then run compliance
and business-rule checks against them.

**One step — extract and check together.** The model reads the document *and*
applies the rules in a single pass. One misread field cascades: a wrong
`expiry date` or `amount` trips five downstream rules at once, and the failure
surfaces at the end of the run — after the tokens are spent and a reviewer has
waited. The failure is late, expensive, and total.

<pre class="mermaid">
flowchart LR
  subgraph ONE["One step"]
    direction LR
    D1["PDF"] --> M1["Model: extract + apply rules"]
    M1 --> R1{"Pass?"}
    R1 -- no --> X1["Fails late · rerun the whole pass"]
    R1 -- yes --> OK1["Accepted"]
  end
  subgraph SPLIT["Extract, then validate"]
    direction LR
    D2["PDF"] --> M2["Model: extract fields only"]
    M2 --> V2["Deterministic validation"]
    V2 --> R2{"Clear?"}
    R2 -- no --> H2["Human · override the field"]
    H2 --> V2
    R2 -- yes --> A2["Auto rule checks"]
    A2 --> OK2["Accepted"]
  end
</pre>

**Split — extract, then validate.** The model only extracts. Deterministic
validation checks the fields; whatever it cannot clear goes to a human who
corrects or overrides that value, and the case re-enters validation. Most
documents clear automatically; the rest are a bounded review of specific
fields, not a rerun of the whole document.

## Fail without blocking

The business process cannot stop because a model is slow, rate-limited or down.
Build the manual path as a first-class route, not a catch block: if extraction
is unavailable, the case lands in the same review queue a low-confidence result
would, and the process keeps moving.

## Close the loop

Human overrides are data. Feed them back — into the extraction prompt's
examples and into the rule set — so the same misread does not return next
month. The aim is improvement by design, not a growing pile of escalations.
