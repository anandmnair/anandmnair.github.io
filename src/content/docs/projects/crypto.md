---
title: 'Confidential Fields'
description: 'A POC for annotating domain fields with @Confidential to manage confidentiality centrally, instead of every team hand-rolling its own encryption. Grew far beyond the POC stage.'
order: 9
---

**Kotlin · Field-Level Encryption**

Every team handling sensitive domain data was solving confidentiality the
same way, badly, separately. This POC proposed a single answer: annotate the
field with `@Confidential` and let a shared mechanism handle the encryption,
instead of each team writing its own.

Worth noting: this one didn't stay a POC. It went on to become a widely
reused solution across many teams — well outside the business unit it
started in.

[Repository](https://github.com/anandmnair/crypto)
