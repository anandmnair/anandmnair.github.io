---
title: 'AMQP Auto-Config Experiment'
description: 'An experiment auto-configuring Spring with RabbitMQ as the message broker, so no wiring code is required at all.'
order: 16
---

**Java · Spring Boot · RabbitMQ**

Early experiment in auto-configuring Spring for RabbitMQ — the goal was zero
wiring code: drop the starter on the classpath and the broker connection,
exchanges, and queues configure themselves.

[Repository](https://github.com/anandmnair/spring-boot-starter-amqp-rabbit-auto-config)
