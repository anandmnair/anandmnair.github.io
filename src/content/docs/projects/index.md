---
title: 'Projects'
description: 'Open-source libraries, products, and proofs of concept I have built — what problem each one solves, and where to read the code.'
navLabel: 'Projects'
order: 2
tags: ['open-source', 'product', 'library', 'poc', 'experimental', 'demo']
updated: 2026-08-23
projects:
  - name: AIDLC
    stack: Agentic AI · TDD · Multi-tool Pipeline
    blurb: >-
      A tool-agnostic, agentic AI development life cycle. Feed it a requirement in .md
      format and seven specialist AI agents take it from analysis to pull request, with a
      mandatory human gate at every phase boundary.
    page: /projects/aidlc/
    repo: https://github.com/anandmnair/aidlc
    docs: https://anandmnair.github.io/aidlc/
    year: 2026
    badges: [product]
  - name: KnowledgeBase Platform
    stack: Java · Spring Boot · RAG
    blurb: >-
      Turns code repositories into a queryable knowledge base — ask natural-language
      questions at repository, application, or workspace scope and get grounded answers
      with confidence scores and exact source citations.
    page: /projects/knowledgebase-platform/
    repo: https://github.com/anandmnair/KnowledgeBase-Platform
    docs: https://anandmnair.github.io/KnowledgeBase-Platform/
    year: 2026
    badges: [product]
  - name: Knowledge Platform
    stack: Java 21 · Spring Boot · Hexagonal · pgvector
    blurb: >-
      A second, hexagonal take on the same problem as KnowledgeBase Platform — every
      external dependency (LLM, embeddings, vector store, language analyzer) sits behind
      a port, swappable without touching the core.
    page: /projects/knowledge-platform/
    repo: https://github.com/anandmnair/knowledge-platform
    year: 2026
    badges: [product]
  - name: Copilot Skills Kit
    stack: GitHub Copilot · Skills · Prompts
    blurb: >-
      Early experiment standardising GitHub Copilot skills and prompts across a team.
      Deprecated in favour of AIDLC, which does the same job tool-agnostically.
    page: /projects/copilot/
    repo: https://github.com/anandmnair/copilot
    year: 2026
    badges: [poc]
  - name: Document Extractor
    stack: Python · FastAPI · Agentic AI
    blurb: >-
      Extracts MT700 letter-of-credit fields from PDF documents via an LLM, for
      automating LC issuance. Every extracted value is traced back to its source
      document, page and line.
    page: /projects/document-extractor/
    repo: https://github.com/anandmnair/document-extractor
    year: 2026
    badges: [poc]
  - name: Failover
    stack: Java · Spring Boot · Resilience
    blurb: >-
      Annotation-driven failover for Spring Boot. When an upstream API goes down, callers
      degrade gracefully on recovery data instead of cascading the outage — with failover
      rate, recovery rate and failure frequency exposed as metrics.
    page: /projects/failover/
    repo: https://github.com/societe-generale/failover
    docs: https://societe-generale.github.io/failover/
    year: 2022
    badges: [library, opensource]
  - name: Failover Demo
    stack: Java · Spring Boot · Demo
    blurb: >-
      The smallest complete example of the Failover library: an upstream that fails on
      demand, a consumer annotated for failover, and the metrics showing the degradation
      as it happens.
    page: /projects/failover-demo/
    repo: https://github.com/societe-generale/failover-demo
    year: 2022
    badges: [opensource]
  - name: REST Validation Demo
    stack: Java · Spring · Bean Validation
    blurb: >-
      Custom-annotation REST validation for Spring — keeps the main flow free of nested
      if-else boilerplate for input checks.
    page: /projects/rest-validation-demo/
    repo: https://github.com/anandmnair/rest-validation-demo/tree/master
    year: 2020
    badges: [poc]
  - name: Confidential Fields
    stack: Kotlin · Field-Level Encryption
    blurb: >-
      '@Confidential' field annotation for centralised confidentiality handling. Started
      as a POC, went on to be reused across many teams outside its original business unit.
    page: /projects/crypto/
    repo: https://github.com/anandmnair/crypto
    year: 2019
    badges: [poc]
  - name: Feedback API
    stack: Kotlin · Generic Feedback Collection
    blurb: >-
      Generic, application-agnostic feedback collection endpoint. Shelved once a similar
      platform capability shipped elsewhere.
    page: /projects/feedback-api/
    repo: https://github.com/anandmnair/feedback-api
    year: 2019
    badges: [poc]
  - name: Job Scheduler
    stack: Java · Spring Batch · REST
    blurb: >-
      REST-triggered Spring Batch job scheduling — trigger, monitor and manage batch
      jobs over HTTP.
    page: /projects/job-scheduler/
    repo: https://github.com/anandmnair/job-scheduler
    year: 2018
    badges: [poc]
  - name: RabbitMQ Advanced Spring Boot Starter
    stack: Java · Spring Boot · RabbitMQ
    blurb: >-
      Turns the RabbitMQ boilerplate every team rewrites — exchange and queue declaration,
      retry policy, dead-letter routing, error handling — into configuration with
      opinionated defaults.
    page: /projects/rabbitmq-advanced-spring-boot-starter/
    repo: https://github.com/societe-generale/rabbitmq-advanced-spring-boot-starter
    docs: https://societe-generale.github.io/rabbitmq-advanced-spring-boot-starter/
    year: 2018
    badges: [library, opensource]
  - name: Notification Service
    stack: Java · Spring Boot · Email
    blurb: >-
      Standalone email notification service — decoupling notification-sending from
      application code.
    page: /projects/notification-service/
    repo: https://github.com/anandmnair/notification-service/tree/master
    year: 2017
    badges: [experimental]
  - name: Workflow via Event Sourcing
    stack: Java · Axon Framework · Event Sourcing
    blurb: >-
      Event-sourced workflow on Axon, built to make the concept concrete for a team
      unfamiliar with it. Secured buy-in for a project that later continued internally.
    page: /projects/workflow-axon-demo/
    repo: https://github.com/anandmnair/workflow-axon-demo
    year: 2017
    badges: [poc]
  - name: Deal Workflow Demo
    stack: Java · Axon Framework · Event Sourcing
    blurb: >-
      Companion demo applying the same Axon event-sourcing approach to a deal workflow.
    page: /projects/deal-workflow-axon-demo/
    repo: https://github.com/anandmnair/deal-workflow-axon-demo
    year: 2017
    badges: [poc]
  - name: AMQP Auto-Config Experiment
    stack: Java · Spring Boot · RabbitMQ
    blurb: >-
      Auto-configures Spring for RabbitMQ with zero wiring code — connection, exchanges
      and queues configure themselves.
    page: /projects/spring-boot-starter-amqp-rabbit-auto-config/
    repo: https://github.com/anandmnair/spring-boot-starter-amqp-rabbit-auto-config
    year: 2017
    badges: [poc]
  - name: Spring Cloud Eureka Microservices
    stack: Java · Spring Cloud · Eureka
    blurb: >-
      Early microservices modernisation of a Swing-based monolith — Eureka service
      registry, load balancing, routing, API gateway.
    page: /projects/spring-cloud-eureka/
    repo: https://github.com/anandmnair/spring-cloud-eureka
    year: 2017
    badges: [poc]
  - name: Spring Data JPA Demo
    stack: Java · Spring Data JPA
    blurb: >-
      The team's first Spring Data JPA POC, proposed as a simpler replacement for a
      heavier persistence framework. Adopted across teams after.
    page: /projects/spring-data-jpa-demo/
    repo: https://github.com/anandmnair/spring-data-jpa-demo
    year: 2017
    badges: [poc]
  - name: Comprehensive Testing Strategy
    stack: Java · Testing Pyramid · BDD
    blurb: >-
      Sample app built with outside testing experts, demonstrating a comprehensive
      testing strategy at enterprise scale.
    page: /projects/comprehensive-testing/
    repo: https://github.com/anandmnair/comprehensive-testing
    year: 2016
    badges: [experimental]
  - name: Default Repository
    stack: Java · Spring Batch · Microservices · BDD
    blurb: >-
      Grab-bag of early POCs — Spring Batch, microservices with service registry, web
      service, API gateway, BDD with Cucumber.
    page: /projects/default-repository/
    repo: https://github.com/anandmnair/DefaultRepository
    year: 2013
    badges: [poc]
---
Most of what's below are proofs of concept and internal experiments, not
open-source libraries — three are: Failover, its demo, and the RabbitMQ
Advanced Spring Boot Starter. The rest are products, POCs, and experiments
built to test an idea, unblock a team, or settle an argument, kept here as a
record of what was tried and what came of it.
