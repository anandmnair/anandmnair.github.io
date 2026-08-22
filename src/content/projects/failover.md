---
title: Failover
description: Transparent failover for referential data — annotation-driven, Spring Boot native. TODO — rewrite in your own words.
role: TODO — your role, e.g. Author / Maintainer
year: '2023'
language: Java
tags: ['Spring Boot', 'Resilience', 'Library']
repo: https://github.com/societe-generale/failover
docs: https://societe-generale.github.io/failover/
featured: true
order: 1
---

## What it solves

TODO — describe the problem in two or three sentences. What breaks without this library, and who feels the pain.

## How it works

TODO — the mechanism in plain language. An annotation, a proxy, a fallback store — whatever the shape is.

```java
// TODO — replace with a real snippet from the project.
@Failover(fallback = "cachedReferential")
public List<Country> countries() {
    return referentialClient.countries();
}
```

## What I learned

TODO — the interesting part. A design trade-off, a mistake worth telling, a thing you would do differently.
