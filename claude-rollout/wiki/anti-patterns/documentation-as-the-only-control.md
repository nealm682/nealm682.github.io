---
type: anti-pattern
strength: moderate
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 1 detailed, reinforced by the pattern of what teams built instead
created: 2026-08-03
updated: 2026-08-03
tags: [guardrails, failure-modes]
---

# Relying on a document to be followed

The inverse of [[wiki/concepts/deterministic-vs-advisory]], stated as a thing that goes wrong.

## Evidence

`Such_Independent_234`:

> "Relying on agent specific documentation is more risky. Agents may read it, may follow it, or may
> hallucinate something instead."

*(Reconstructed across a page break in the capture — the printed PDF splits this sentence and injects
"Skip to main content" between "risky." and "documentation". Verified against the extraction.)*

The indirect evidence is stronger than the direct quote: **almost nobody in the thread proposed
documentation as the answer to consistency.** The person asking assumed it would be; the responders
went to versioned skills, PR gates, TDD proof, review skills, and CI. The consensus solution to "how
do I get consistent output" was structural, not textual.

## The trap

The failure is quiet. A document that is ignored produces output that looks fine most of the time,
so the gap between what the document says and what actually happens widens invisibly until something
lands in front of a client.

## Implications for my design

Uncomfortable and worth sitting with: **most of what I am selling is textual.** The wiki is a
document. Skills are documents. Both are advisory.

That is defensible for the Discovery and Operating-guidance tiers, where a human is reading the
output anyway. It is not defensible for the Control tier, and it means the honest version of my
pitch is narrower than the confident version:

**My wording, not a quote —** the honest claim is: *the layer makes good output far more likely, and
makes errors findable and fixable at the source. It does not make bad output impossible.*

The second half of that sentence is the one that earns the first half in front of anyone technical.

Related: [[wiki/concepts/deterministic-vs-advisory]], [[wiki/open-questions/hooks-in-cowork]].
