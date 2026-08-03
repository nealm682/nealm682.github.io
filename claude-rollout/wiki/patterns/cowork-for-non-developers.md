---
type: pattern
strength: moderate
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 2 handles pursuing it, 2 more with the same need
created: 2026-08-03
updated: 2026-08-03
tags: [cowork, non-technical, distribution]
---

# Cowork for non-developers, Code for the admin

The closest thing in the thread to my own scenario, and it validates the two-harness split from
someone building it for mechanical engineers rather than realtors.

## Evidence

`mbcoalson`:

> "My team is primarily mechanical engineers, not SWEs. My plan is to put my team on Claude Cowork,
> not Claude Code. Then I start pushing plugins out onto the private marketplace you have available
> on the Team account. Plugins combine commands, skills, and hooks as needed and can be versioned by
> the admin, which should be you."

`treasury_minister`: *"I find this interesting. I'm thinking the same approach for my team."*

`Fabian-88`, R&D scientists at a food company, describes themselves as *"no-coder"* and asks how it
went — the thread does not record an answer, which is itself worth noting.

## Caveats

This is a **plan, not a result.** `mbcoalson` says "My plan is to" and "I'm just getting started on
this as well." The only outcome they report back is a negative one — see
[[wiki/open-questions/hooks-in-cowork]]. Nobody in the thread reports a completed non-developer
rollout.

That absence is the finding. Several people want this; nobody has finished it.

## Implications for my design

Direct support for the two-harness architecture, and reassurance that the shape is not eccentric —
someone else arrived at "non-technical staff on Cowork, admin on Code, plugins pushed centrally"
independently.

The commercial read is more interesting: **the people who need this are already trying to build it
themselves and getting stuck.** That is a market signal in both directions. It confirms demand and it
warns that the buyer may believe they can do it in-house until they hit the same walls.

Related: [[wiki/patterns/internal-plugin-marketplace]], [[wiki/open-questions/non-technical-teams-and-git]].
