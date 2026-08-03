---
type: anti-pattern
strength: moderate
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 1 handle with specific detail, 1 partial
created: 2026-08-03
updated: 2026-08-03
tags: [failure-modes, concurrency, handoffs]
---

# Letting participants read each other's in-progress state

Reported as something tried and abandoned, with the replacement named.

## Evidence

`ultrathink-art`:

> "What we got wrong early: shared context. Agents reading each other's in-progress notes would
> sometimes contradict or overwrite. The fix was strict artifact handoffs — agent A produces a JSON
> spec, agent B consumes it. No shared mutable state between runs."

And the coordination machinery they ended up with:

> "task states (pending → claimed → in_progress → review → complete) enforced at the work queue
> level. No agent can grab work another agent already claimed. Heartbeats detect dead agents and
> reset their tasks."

## The principle

Two failure mechanisms, and they are different problems:

- **Contradiction** — participant B reads participant A's half-formed thinking and treats it as
  settled.
- **Overwrite** — concurrent writes to the same mutable state, last one wins, silently.

The fix named is *immutable artefacts passed between stages* rather than a shared scratchpad, plus
explicit ownership so two participants cannot hold the same item.

## Implications for my design

This is the strongest outside support for the append-only inbox, and it sharpens why it works. I had
justified it on collision-avoidance. This says the subtler danger is **contradiction** — half-formed
material being read as if it were settled.

Which maps directly onto my review gate: a proposal in the inbox is explicitly *not yet true*, and
nothing reads from the inbox except the reviewer. If producers' agents could read the inbox, they
would be reading each other's unratified opinions as ground truth. Worth stating explicitly in the
architecture doc — it is currently implied by the diagram but never said.

The task-state machine is over-engineered for a brokerage with a handful of proposals a week. Worth
remembering if volume ever justifies it.

Related: [[wiki/concepts/coordination-overhead]], [[wiki/patterns/local-overlay-with-promotion]].
