---
type: pattern
strength: moderate
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 3 handles
created: 2026-08-03
updated: 2026-08-03
tags: [provenance, governance, history]
---

# PRs and tickets as the searchable decision trail

Several teams use their existing work-tracking surface as the record of *why* things were decided,
and then point the agent at that record so it can ask better questions.

## Evidence

`HaagNDaazer` describes the fullest version:

> "I am also thinking through this and am also using Linear issues as a shared history of tech
> decisions across the project that Claude can then search to find related issues and learn as much
> as it can from that to ask better clarifying questions during planning. Then Claude takes the
> linear issue through the whole process, updating status and leaving comments along the way as it
> works so there is a nice history per issue."

`ObjectiveSalt1635` adds that mandatory PRs also create the hook for automated review:
*"Pull request mandatory also helps enforce using code review ai."*

`nikolaibibo` lists a whole stack in one line: *"Git, PRs, linear tickets and workspace is our setup
together with notion as Wiki."*

Note the distinction `HaagNDaazer` draws when asked why Linear rather than GitHub issues: tickets are
the work you are doing; GitHub issues are bugs people report. `__mson__` counters that GitLab issues
do both fine. The disagreement is about tooling, not about the principle.

## Implications for my design

The valuable idea here is **the agent reading the decision history to ask better clarifying
questions**, rather than only to produce output. That is a use of the layer I have not been selling:
not "the assistant knows the rules" but "the assistant knows what has already been argued about, so
it asks you the right question instead of the obvious one."

For a brokerage there is no Linear. The equivalent record is the transaction history and the
correspondence — which suggests the provenance field on each knowledge entry is doing more work than
I credited it with. See the entry schema in `/notes/architecture/`.

Related: [[wiki/concepts/decision-supersession-gap]].
