---
title: 'Azure'
description: >-
  The platform decisions that shape everything above: AKS, Azure DevOps or GitHub
  Actions, Key Vault for secrets, and managed identities over connection strings.
order: 3
cardBadges: ['Azure', 'AKS', 'Key Vault']
---

The platform decisions that shape everything above:

- **AKS** for container orchestration — with the resource requests and limits
  actually set, which is the difference between a cluster that degrades
  gracefully and one that evicts randomly.
- **Azure DevOps or GitHub Actions** for pipelines. Either works; consistency
  across the estate matters more than the choice.
- **Key Vault** for secrets. Never in the repository, never in pipeline
  variables as plain text, rotated on a schedule someone owns.
- **Managed identities** over connection strings wherever the service supports
  it — credentials you never hold are credentials you cannot leak.
- **Managed data services** unless you have a specific reason to run your own.
  Operating a database well is a full-time skill, and it is rarely the skill
  your team is short of.
