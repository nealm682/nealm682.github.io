---
type: open-question
strength: strong
severity: resolved-with-caveat
sources: [2026-08-03-support-use-plugins-in-claude, 2026-08-03-reddit-claudecode-team-usage]
created: 2026-08-03
updated: 2026-08-03
tags: [cowork, hooks, guardrails]
---

# Do hooks work in Cowork? — Yes

**Resolved on the day it was raised, in the favourable direction, by first-party documentation that
contradicts the practitioner comment this page was originally built on.**

## Evidence

[[raw/clippings/2026-08-03-support-use-plugins-in-claude]], article dated 2026-05-29, under
"Where you can use plugins":

> "You can install and use plugins in chat on the web, the Chat tab in Claude Desktop, and Claude
> Cowork. The skills bundled in a plugin work across all three. Hooks and sub-agents run only in
> Cowork, so they appear grayed out in chat."

Read that carefully: hooks are not merely *supported* in Cowork, they are the surface where hooks
run. It is **chat** that lacks them. The concern was inverted.

## What this settles

The largest risk in my offering — that compliance constraints would degrade to strongly-worded
requests on the surface my producers use — does not apply as feared. Hooks are available where the
producers are, and they arrive bundled inside a plugin, which is also the distribution mechanism.

## What it does not settle

The documentation establishes that hooks *run*. It does not describe **which lifecycle events are
available, or whether a hook can block an action rather than merely observe it.** My framework needs
the stronger property: a mechanism that fires whether or not the model cooperates, and that can stop
something from happening.

So the question has not disappeared, it has shrunk — from "does this capability exist at all" to
"what exactly can it gate." That is a far smaller question and it is answered by testing a real hook
against a real send, not by reading further.

## Standing constraint, unchanged

Until a blocking hook has been demonstrated end to end, **no proposal describes compliance as
guaranteed.** The tier model in the offering spec holds: this raises confidence that a Control tier
is achievable, it does not yet prove any specific control.

## History

**[2026-08-03] Superseded.** This page was created earlier the same day rating the question `weak` /
`blocking`, on the strength of one comment in
[[raw/clippings/2026-08-03-reddit-claudecode-team-usage]]. `mbcoalson`, describing a plan to put
mechanical engineers on Cowork, wrote:

> "Note hooks do not currently work within Cowork."

That comment was roughly four months old at capture and is contradicted by documentation dated
2026-05-29. Retained rather than deleted, because it is a useful calibration: a single dated
practitioner comment nearly redirected an architecture. The rule that caught it — grade by
corroboration, re-test anything about product capability — earned its place today.

Related: [[wiki/concepts/deterministic-vs-advisory]], [[wiki/patterns/cowork-for-non-developers]],
[[wiki/open-questions/team-plan-mechanics]].
