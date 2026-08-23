---
title: 'Alerting'
description: >-
  The hardest thing on this page to get right, and the thing most estates get wrong in
  the same direction: too many alerts. Alert on symptoms not causes, give every alert an
  action, and route by ownership.
order: 5
cardBadges: ['Alerting', 'Alert Fatigue']
---

The hardest thing on this page to get right, and the thing most estates get
wrong in the same direction: too many alerts.

**Alert on symptoms, not causes.** "Checkout error rate above 2% for five
minutes" is actionable. "CPU above 80%" is a fact that may mean nothing —
autoscaling is doing its job.

**Every alert must have an action.** If the response is to acknowledge and move
on, it is not an alert. Make it a dashboard panel or delete it.

**Page for user impact. Ticket for everything else.** A queue growing slowly at
2am is a ticket. Payments failing is a page.

**Alert fatigue is a safety problem, not an annoyance.** A team receiving forty
alerts a night stops reading them, and the one that mattered arrives at 3:12am
and is dismissed with the rest. If that is happening, deleting alerts is the
highest-value work available — measure how many fired last month and how many
led to action, and remove the difference.

**Route by ownership.** An alert reaching someone who cannot fix it is noise
plus a delay.
