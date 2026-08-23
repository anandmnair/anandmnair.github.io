---
title: Anand Manissery
description: Technology evangelist and architect — 17+ years of distributed systems, domain-driven design, and engineering craft.
navLabel: Home
order: 1
updated: 2026-08-23
competencies:
  - label: Digital transformation & legacy modernisation
    detail: Strangler-fig migration, parallel consistency checking, incremental cutover
    href: /digital-transformation/
  - label: Microservices & event-driven architecture
    detail: Immutable producer-driven events, versioning, catalogues, replay
    href: /technology/
  - label: Domain-driven design
    detail: Event storming, bounded contexts, business process over data model
    href: /craftsmanship/domain-driven-design/
  - label: Hexagonal architecture
    detail: Domain / infrastructure / bootstrap, boundaries enforced by tests
    href: /craftsmanship/hexagonal-architecture/
  - label: Test-driven development
    detail: Red-green-refactor as a design tool, not a coverage exercise
    href: /craftsmanship/test-driven-development/
  - label: Behaviour-driven development
    detail: Executable specifications, shared language with the business
    href: /craftsmanship/behaviour-driven-development/
  - label: Design-first APIs
    detail: OpenAPI contracts before code, maturity and quality as gates
    href: /craftsmanship/design-first-approach/
  - label: Observability by design
    detail: Functional and technical monitoring, metrics, APM, self-healing
    href: /craftsmanship/observability-by-design/
  - label: AI development life cycle
    detail: Copilot and Claude Code practice, adoption maturity, agentic workflows
    href: /ai/
  - label: Engineering leadership
    detail: Guilds, craftsmanship culture, skills-based hiring, high-performing teams
    href: /teams/
skills:
  - area: Languages
    items: ['Java', 'Kotlin', 'Python']
  - area: Front-end
    items: ['JavaScript', 'TypeScript', 'Angular', 'HTML', 'CSS']
  - area: Frameworks
    items: ['Spring Boot', 'Spring Cloud', 'Spring AI']
  - area: Messaging
    items: ['Kafka', 'RabbitMQ']
  - area: Data
    items: ['Oracle', 'PostgreSQL', 'MongoDB', 'Elasticsearch']
  - area: APIs
    items: ['REST', 'OpenAPI / Swagger', 'Contract testing']
  - area: Containers
    items: ['Docker', 'Kubernetes']
  - area: Observability
    items: ['ELK Stack', 'Grafana', 'APM']
  - area: Cloud
    items: ['Azure']
  - area: Delivery
    items: ['Git', 'Jenkins', 'GitHub Actions', 'CI/CD', 'IaC']
  - area: AI
    items: ['Claude', 'OpenAI', 'Agentic orchestration', 'RAG', 'LLM evaluation']
projects:
  - name: Failover
    stack: Java · Spring Boot · Resilience
    blurb: >-
      Annotation-driven failover for Spring Boot. When an upstream API goes down, callers
      degrade gracefully on recovery data instead of cascading the outage — with failover
      rate, recovery rate and failure frequency exposed as metrics.
    page: /projects/failover/
    repo: https://github.com/societe-generale/failover
    docs: https://societe-generale.github.io/failover/
  - name: RabbitMQ Advanced Spring Boot Starter
    stack: Java · Spring Boot · RabbitMQ
    blurb: >-
      Turns the RabbitMQ boilerplate every team rewrites — exchange and queue declaration,
      retry policy, dead-letter routing, error handling — into configuration with
      opinionated defaults.
    page: /projects/rabbitmq-advanced-spring-boot-starter/
    repo: https://github.com/societe-generale/rabbitmq-advanced-spring-boot-starter
    docs: https://societe-generale.github.io/rabbitmq-advanced-spring-boot-starter/
  - name: Failover Demo
    stack: Java · Spring Boot · Demo
    blurb: >-
      The smallest complete example of the Failover library: an upstream that fails on
      demand, a consumer annotated for failover, and the metrics showing the degradation
      as it happens.
    page: /projects/failover-demo/
    repo: https://github.com/societe-generale/failover-demo
vitals:
  - label: Experience
    value: 17+ years engineering mission-critical software systems.
  - label: AI Mastery & Craftsmanship
    value: Mastering AI engineering and craftsmanship as rigorous enterprise disciplines.
  - label: Architecture & Design
    value: Standardising platform-wide microservices architecture and observability.
  - label: Open Source Contributions
    value: Creator of Failover and RabbitMQ Advanced Spring Boot Starter.
  - label: Leadership
    value: Leading and mentoring high-performing engineering teams.
  - label: Active Frontiers
    value: Scaling event-driven architectures and embedding agentic AI into the SDLC.
stats:
  - value: '17+'
    label: years building software
  - value: '3'
    label: open-source libraries
  - value: '100+'
    label: services depending on those libraries
  - value: '12'
    label: sections of working notes
starters:
  - /craftsmanship/
  - /technology/
  - /ai/
---

I am a technology evangelist and architect with **17+ years** building software
that has to keep working: high transaction volumes, strict regulatory
constraints, and estates old enough that parts of them predate the people
maintaining them.

My work sits where architecture meets craft — event-driven microservices,
domain-driven design, hexagonal boundaries, and a testing discipline that makes
change safe. Lately most of my attention goes to agentic AI in the development
life cycle: not the demo version, but the one that survives adoption by a large
engineering organisation where someone still has to be accountable for the code.

This site is where I write that down. Patterns I keep returning to, the
reasoning behind them, and the libraries I have open-sourced.
