---
title: 'Document Extractor'
description: 'A proof of concept for extracting MT700 letter-of-credit fields from PDF documents via an LLM, with every extracted value traced back to the exact document, page, and line it came from.'
order: 5
---

**Python · FastAPI · Agentic AI**

Built to test whether LC (Letter of Credit) issuance could be automated with
an LLM in the loop, rather than a human reading through PDFs field by field.
A REST endpoint accepts a set of documents plus an action key; the action key
selects a prompt template (`prompts/mt700.yml` for MT 700 fields — applicant,
beneficiary, documentary credit number, expiry, shipment terms, and the rest
of the SWIFT field set); native PDFs go through PyMuPDF text extraction,
scanned ones through OCR, and both land in the same normalized page/line
corpus before the prompt goes to the model.

The detail worth calling out is the traceability: every extracted field comes
back with its source — which document, which page, which line — not just a
value. And the LLM call sits behind a `LLMClientProtocol`, so a
corpus-aware mock can stand in for Azure OpenAI in local dev and CI, matching
the real client's response shape exactly.

[Repository](https://github.com/anandmnair/document-extractor)
