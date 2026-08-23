---
title: 'Parallel run and consistency checking'
description: 'The technique that turns a terrifying migration into a boring'
order: 3
---

The technique that turns a terrifying migration into a boring one.

Run old and new side by side against production traffic. Send every request to
both. Serve the old system's response. **Compare the two and log every
difference.**

The differences are your specification. Each one is either a bug in the new
system or an undocumented behaviour of the old — and you find out which while
nobody is affected, because the old response is still the one being served.

Cut over when the difference rate reaches zero and stays there. At that point the
cutover is a routing change, and it is unremarkable, because the new system has
already been answering correctly for weeks.

The same idea applies to data migration: migrate, then run an **automated
consistency tracker** comparing source and target continuously, with checksums
per record and per batch. A migration of tens of millions of records is only
credible if it is continuously verified — otherwise "it completed" and "it is
correct" are two different claims and you can only make the first.
