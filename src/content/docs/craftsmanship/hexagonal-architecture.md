---
title: 'Hexagonal architecture'
description: 'Also called ports and adapters. One rule: dependencies point'
order: 7
---

Also called ports and adapters. One rule: **dependencies point inward.**

### Domain

The centre. Business rules, entities, value objects, domain services, domain
events. It defines **ports** — interfaces describing what it needs from the
outside world, written in its own vocabulary.

No Spring. No JPA. No HTTP. No Kafka. Not "we abstracted it well"; genuinely
absent. The domain should compile and its tests should run with no framework on
the classpath, in milliseconds, with no container starting.

### Infrastructure

The adapters. REST controllers, JPA repositories, Kafka producers and consumers,
external API clients, file readers. Each implements a port defined by the domain
or drives one.

This is the layer that changes for reasons that have nothing to do with the
business — a library upgrade, a broker migration, a new API version. Isolating
that churn from the domain is the entire return on the pattern.

### Bootstrap

The composition root. Wiring, configuration, dependency injection, the
application entry point. It knows about everything; nothing knows about it.

Keeping bootstrap separate from infrastructure is what stops "just autowire it
here" from quietly reintroducing the coupling you removed.

![Hexagonal architecture](/img/hexagonal.svg)

### Enforce it with tests

A boundary nobody tests is a boundary that has already been crossed. ArchUnit
for the JVM, import-linter for Python:

```java
@ArchTest
static final ArchRule domain_is_independent =
    noClasses().that().resideInAPackage("..domain..")
        .should().dependOnClassesThat()
        .resideInAnyPackage("..infrastructure..", "org.springframework..", "javax.persistence..");
```

Written on day one this costs an hour. Retrofitted after two years it is a
migration project. Every hexagonal codebase that decayed did so one pragmatic
exception at a time, each individually reasonable.
