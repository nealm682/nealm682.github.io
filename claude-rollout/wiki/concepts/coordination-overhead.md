---
type: concept
strength: moderate
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 2 handles
created: 2026-08-03
updated: 2026-08-03
tags: [scale, coordination, failure-modes]
---

# The bottleneck moves from producing to coordinating

The most consistent structural observation about what changes between solo and team use.

## Evidence

`ultrathink-art`, running six agents in production:

> "the bottleneck shifted from 'how fast can one person code' to 'how do multiple agents stay
> coherent on the same codebase.' We run 6 AI agents that commit code daily. The coordination problem
> is harder than the coding problem."

And, in a second comment:

> "Solo, you can be pretty undirected — throw problems at it, iterate fast. Team use requires shared
> context and explicit agreements about what each agent is responsible for."

> "The thing that broke most often wasn't individual agent quality. It was git conflicts and deploy
> races when multiple agents pushed to main simultaneously. We had to add serialization rules before
> any of it was stable. Before adding your first teammate: figure out your merge/deploy serialization
> strategy first. It'll save you a painful incident."

`boatsnbros` reports the same collision from a human-team angle, and their conclusion is striking:

> "Biggest change has been we no longer want individual developers working on the same microservice
> at the same time - too much merge conflict heck as writing lines of code is no longer the slow
> part."

## The generalisable claim

When production gets cheap, **contention becomes the constraint.** Both accounts describe teams
reorganising their work boundaries — not their tooling — once output speed stopped being the limit.

## Implications for my design

This is the same force that makes the append-only inbox necessary, arriving from a different
direction. My argument for it was concurrency safety and reviewability. Theirs is that coordination
cost is the thing that actually bites at team scale, and that it bites *before* quality does.

The transferable warning: **decide the contention strategy before adding the second person, not
after.** For me that is the reviewer queue and the promotion gate, and it means those cannot be
phase-three items in a rollout even if they are lightly implemented at first.

Related: [[wiki/anti-patterns/shared-mutable-context]], [[wiki/patterns/local-overlay-with-promotion]].
