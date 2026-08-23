---
title: 'Design-first approach'
description: 'Design the contract before the implementation. In a distributed system the contract is the only thing your consumers can actually see, and it is the hardest thing to change once'
order: 6
---

Design the contract before the implementation. In a distributed system the
contract is the only thing your consumers can actually see, and it is the
hardest thing to change once they depend on it.

### API design

Start from the consumer. What do they need, in what shape, and what will they do
with it? An API designed outward from your data model exports your internal
structure as a permanent public commitment.

Model **resources**, not operations. `POST /orders/{id}/cancel` beats
`POST /cancelOrder` — the first has a place to hang state, links and future
sub-resources; the second is RPC with extra steps.

### HTTP standards

Use the protocol rather than reinventing it inside a 200 response body.

- **Status codes** — `201` with `Location` on creation. `409` for a conflict.
  `422` for semantically invalid content. `202` when you accepted work you have
  not finished. Not `200 {"error": ...}`.
- **Idempotency** — `PUT` and `DELETE` are idempotent; make them so. For `POST`,
  support an idempotency key, because your clients will retry.
- **Caching** — `ETag` and `Cache-Control` are free performance most APIs ignore.
- **Errors** — one consistent structure across every endpoint, machine-readable
  code plus human-readable message. RFC 7807 `application/problem+json` if you
  have no strong reason otherwise.
- **Pagination and filtering** — decide once, apply everywhere. Inconsistency
  here is what makes an API tiring to consume.

### Quality and maturity

The Richardson maturity model is a useful ladder, but the pragmatic target is
level 2 done rigorously — correct resources, correct verbs, correct status codes
— rather than level 3 done partially. Hypermedia is valuable when clients are
genuinely decoupled and expensive theatre when they are not.

Quality gates worth automating: linting the OpenAPI spec, breaking-change
detection between versions, example validation, and a naming convention check.
All of these are cheap in CI and impossible to enforce in review.

### Documentation and tooling

**OpenAPI is the source of truth, not an export.** Write the specification
first, generate the server stubs and client SDKs from it, and validate at runtime
that the implementation still matches. When the spec is generated from
annotations on the code, the code is the contract and the spec is a lagging
description of whatever you happened to build.

Tooling that pays for itself: a spec editor with live preview, a linter in CI,
a mock server so consumers can build against the contract before you have
written anything, and generated SDKs so nobody hand-writes an HTTP client.
