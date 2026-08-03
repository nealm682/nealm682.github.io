---
type: pattern
strength: strong
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 6 independent handles
created: 2026-08-03
updated: 2026-08-03
tags: [distribution, governance, skills]
---

# Ship a plugin library, not a document

The most corroborated finding in the thread, and it contradicts the instinct of the person asking.
They assumed the answer to "how do I scale this to a team" was a better shared `CLAUDE.md`.
Six separate practitioners answered, in effect: **the document is not the unit of distribution —
the plugin is.**

A plugin bundles commands, skills and hooks, lives in a private marketplace on a Team account, and
is versioned and pushed by an admin. That turns "everyone please read this file" into "everyone has
the current version because it was distributed to them."

## Evidence

`ryan_the_dev`, the bluntest version:

> "Set up a marketplace. Use that for shared skills. Ignore customizing Claude md. Standardize with
> skills."

`mbcoalson`, who is running the closest scenario to my own — a non-developer team:

> "I start pushing plugins out onto the private marketplace you have available on the Team account.
> Plugins combine commands, skills, and hooks as needed and can be versioned by the admin, which
> should be you."

`boatsnbros`, with the governance layer attached:

> "we built an internal Claude plugin based on our development standards docs + a few popular
> plugins (eg superpowers), and accept PRs to it for adding new skills for workflows"

`freeformz`: *"Setup an internal marketplace with shared skills/plugins/etc. I recently did this."*
`theangi`: *"Sharing team plugins, with skills, commands etc seems the best way to share it across
teammates."* `Intrepid_Parking_225`: *"Yeah shared skills has been the main tool that's worked for
us as well."*

`italian-sausage-nerd` reached a similar place from a different direction — a single skills repo
plus a sync script — and named the reason the document alone fails:

> "a single skills.md repo with "this is how we do auth", "this is how you should write test
> reports" etc., and a sync script helps enforce consistency across the sdlc, broader than what you
> could fit in a single projects claude.md"

## Implications for my design

I have had the emphasis wrong. My material treats the wiki as the centrepiece and skills as element
three of six. The field evidence says the **distribution mechanism is the thing that made rollouts
work**, and the knowledge underneath it is necessary but not sufficient.

This does not mean `ryan_the_dev` is right to ignore the knowledge layer — he is describing a team
of developers who share a codebase, where the "how we work" context is already partly encoded in
the repo. A brokerage has no such substrate, so the wiki is doing more work in my case. But the
packaging insight stands, and it resolves part of an open question I had flagged as blocking:
**the distribution mechanism is a private marketplace plus versioned plugins**, not a folder I have
to invent a sync story for.

Related: [[wiki/patterns/skills-as-reviewed-code]], [[wiki/patterns/cowork-for-non-developers]],
[[wiki/open-questions/hooks-in-cowork]].
