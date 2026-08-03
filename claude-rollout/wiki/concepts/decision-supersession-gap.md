---
type: concept
strength: weak
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 1 handle, detailed and specific
created: 2026-08-03
updated: 2026-08-03
tags: [history, provenance, decay, open-problem]
---

# Skills record what is true, not what stopped being true

A failure mode I had not considered, reported as arriving on a predictable schedule.

## Evidence

`Substantial_Doubt139`, responding to the plugin-and-skills consensus:

> "CLAUDE.md and skills both work brilliantly for the "how we do things" layer, things like naming,
> testing, build commands. They're stickier for the "what we decided and why" layer, especially when
> a decision changes. A skill encodes the current right answer but doesn't tell you it used to be a
> different answer six weeks ago, or which work was built on the old assumption. Most teams I've seen
> using your setup hit that wall around month three, when someone reopens an old decision and there's
> no clean way to find what depends on it.
>
> Not a knock on the approach, more that infrastructure-as-code handles the standing rules better
> than it handles the mutable decisions underneath them."

## Why this is a real gap and not a quibble

Two distinct kinds of knowledge are being conflated by every design in the thread, mine included:

- **Standing rules** — how we name things, what the fee is, which vendor we use. A current-state
  document handles these perfectly.
- **Decisions** — we chose X over Y, for these reasons, and these things were built assuming it.
  A current-state document actively destroys this, because updating the rule erases the fact that it
  changed and what depended on it.

Version control preserves the *diff* but not the *dependency*. Knowing the fee changed in March does
not tell you which quotes went out under the old one.

## Implications for my design

My schemas have a `## History` section, which is a start and is not sufficient — it records that
something changed, not what was built on the old assumption.

The honest position is that this is **an unsolved problem in my design too**, and I should say so
rather than let a prospect discover it in month three. Two partial mitigations worth thinking about:

- Provenance on every entry already links a rule to the case that produced it. Extending that to
  record *supersession* — this rule replaced that one, on this date — is cheap.
- The harder half is dependency: what work was done under the old rule. That probably cannot be
  solved inside the knowledge layer at all, and belongs with whatever system holds the work itself.

Flagged to [[review-queue]] because it may change what I promise about the layer.

Related: [[wiki/patterns/pull-requests-as-decision-trail]].
