---
title: 'Projects'
description: 'Open-source libraries I have written, what problem each one solves, and where to read the code.'
navLabel: 'Projects'
order: 2
tags: ['open-source']
updated: 2026-08-23
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
  - name: AIDLC
    stack: Agentic AI · TDD · Multi-tool Pipeline
    blurb: >-
      A tool-agnostic, agentic AI development life cycle. Feed it a requirement in .md
      format and seven specialist AI agents take it from analysis to pull request, with a
      mandatory human gate at every phase boundary.
    page: /projects/aidlc/
    repo: https://github.com/anandmnair/aidlc
    docs: https://anandmnair.github.io/aidlc/
  - name: KnowledgeBase Platform
    stack: Java · Spring Boot · RAG
    blurb: >-
      Turns code repositories into a queryable knowledge base — ask natural-language
      questions at repository, application, or workspace scope and get grounded answers
      with confidence scores and exact source citations.
    page: /projects/knowledgebase-platform/
    repo: https://github.com/anandmnair/KnowledgeBase-Platform
    docs: https://anandmnair.github.io/KnowledgeBase-Platform/
---
Libraries built to solve a problem that kept recurring across teams, then
open-sourced because the problem was not specific to any one of them. Each
started as an internal fix and earned its way out.
