---
title: 'The feedback loop'
description: >-
  Build → release → observe → learn → adjust. The loop's value is inversely proportional to
  its length, and "observe" is the step most often missing — a team that releases fortnightly
  but doesn't know what happened after has an output cadence, not a feedback loop.
cardBadges: ['Feedback Loop', 'Observability']
order: 3
---

Build → release → observe → learn → adjust.

Its value is inversely proportional to its length, so the most useful question
in any process discussion is: **how long is our loop, and what would halve it?**
Usually the answer is a deployment bottleneck, a manual test cycle, or an
approval gate — process problems, not people problems, and each is fixable by
engineering.

**Observe** is the step most often missing. A team that releases fortnightly but
has no idea what happened after release has an output cadence, not a feedback
loop. This is where [observability](/craftsmanship/observability-by-design/)
stops being an operational concern and becomes a delivery one — functional
monitoring is how you find out whether the feature you shipped is used.
