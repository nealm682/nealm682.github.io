---
type: concept
strength: moderate
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 1 handle with substantial detail, 1 partial
created: 2026-08-03
updated: 2026-08-03
tags: [hooks, guardrails, determinism]
---

# A context file is a suggestion, a linter is a wall

The single most useful sentence in the thread, and an independent restatement of the distinction my
whole guardrail argument rests on.

## Evidence

`Such_Independent_234`:

> "I'm finding that the best things you can do for agents was the same thing you should have been
> doing for humans all along. I'm not sold on the hyped tool of the day or MCP that promises you the
> best agent memory ever. Constrain agents through tools, environment, and code organization.
>
> I think the patterns that survive AI assisted development are the ones agents can't ignore. Things
> like linter errors, type errors, permission boundaries, CI gates, etc. These are deterministic.
> Relying on agent specific documentation is more risky. Agents may read it, may follow it, or may
> hallucinate something instead. A context file is a suggestion but a linter is a wall."

The partial corroboration is `boatsnbros`, who does not state the principle but implements it —
PRs cannot merge without the review-skill output and TDD proof, which is a gate rather than a request.

## Why this matters more than it looks

I reached "a skill is an instruction, a hook is a mechanism" from my own work. This is somebody with
no exposure to that framing reaching the same conclusion from production scar tissue, and phrasing
it better than I did. *A context file is a suggestion but a linter is a wall* is the sentence I wish
I had written.

It also generalises further than my version. My framing is about hooks specifically. Theirs is about
**the whole environment** — types, permissions, CI, code organisation. The claim is that the
durable constraints are the ones that are structural rather than textual, whatever form they take.

## Implications for my design

Two adjustments.

**First**, my three-tier obligation model (discovery / operating guidance / control) is the right
shape, but the Control tier should be defined by *structure*, not by "hooks." If hooks are
unavailable at a given surface, the question becomes what other structural constraint can do the job
— a required second pass, a checklist that blocks send, a human signature — rather than concluding
that control is impossible.

**Second**, and less comfortably: this is an argument that the knowledge layer, being textual, is
inherently advisory. Everything in the wiki is a suggestion the model may ignore. That is fine for
the Discovery and Operating-guidance tiers and it is a real limit on what a wiki can ever promise.
Worth saying out loud rather than discovering in front of a compliance officer.

Related: [[wiki/open-questions/hooks-in-cowork]], [[wiki/anti-patterns/documentation-as-the-only-control]].
