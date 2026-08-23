---
title: 'RabbitMQ Advanced Spring Boot Starter'
description: 'Every team wiring up Spring AMQP writes the same code: exchange and queue declaration, retry policy, dead-letter routing, error handling, message conversion. Written fresh each'
order: 12
---

**Java · Spring Boot · RabbitMQ · Messaging**

Every team wiring up Spring AMQP writes the same code: exchange and queue
declaration, retry policy, dead-letter routing, error handling, message
conversion. Written fresh each time, it is subtly different each time — and the
differences only surface during an incident.

This starter makes those choices opinionated defaults. A service declares what
it publishes and consumes; the plumbing follows. Retries and dead-letter routing
behave consistently across every service that uses it, which means an on-call
engineer debugging one service already understands the others.

[Repository](https://github.com/societe-generale/rabbitmq-advanced-spring-boot-starter) ·
[Documentation](https://societe-generale.github.io/rabbitmq-advanced-spring-boot-starter/)
