---
type: index
created: 2026-08-03
updated: 2026-08-03
---

# Index

What other people have actually done rolling Claude Code and Cowork out to staff.
Start with [[overview]]. Open items live in [[review-queue]].

## Sources

| Snapshot | Venue | Retrieved | Notes |
|---|---|---|---|
| [[raw/clippings/2026-08-03-reddit-claudecode-team-usage]] | r/ClaudeCode | 2026-08-03 | ~25 practitioners; PDF + extracted text |
| [[raw/clippings/2026-08-03-support-use-plugins-in-claude]] | Claude Help Center | 2026-08-03 | first-party; article dated 2026-05-29 |
| [[raw/clippings/2026-08-03-support-manage-org-plugins]] | Claude Help Center | 2026-08-03 | first-party; org marketplace mechanics |

## Patterns — what people say worked

| Page | Strength | One line |
|---|---|---|
| [[wiki/patterns/internal-plugin-marketplace]] | strong | Ship a versioned plugin library, not a document |
| [[wiki/patterns/skills-as-reviewed-code]] | strong | Prompts under version control and code review |
| [[wiki/patterns/pair-sessions-over-docs]] | strong | Twenty minutes of shoulder-surfing beats a guide |
| [[wiki/patterns/local-overlay-with-promotion]] | moderate | Private `.local` layer, reviewed upward periodically |
| [[wiki/patterns/pull-requests-as-decision-trail]] | moderate | The agent reads decision history to ask better questions |
| [[wiki/patterns/cowork-for-non-developers]] | moderate | Cowork for staff, Code for the admin |
| [[wiki/open-questions/team-plan-mechanics]] | strong | Org marketplaces: PR merge is the publish event |

## Anti-patterns — what people say broke

| Page | Strength | One line |
|---|---|---|
| [[wiki/anti-patterns/shared-mutable-context]] | moderate | Reading each other's in-progress state contradicts and overwrites |
| [[wiki/anti-patterns/documentation-as-the-only-control]] | moderate | A document that may be ignored fails quietly |

## Concepts

| Page | Strength | One line |
|---|---|---|
| [[wiki/concepts/harness]] | definitional | The software around the model that gives it hands — a category, not a product |
| [[wiki/concepts/deterministic-vs-advisory]] | moderate | "A context file is a suggestion but a linter is a wall" |
| [[wiki/concepts/coordination-overhead]] | moderate | When production gets cheap, contention becomes the constraint |
| [[wiki/concepts/decision-supersession-gap]] | weak | Skills record what is true, not what stopped being true |

## Open questions

| Page | Severity | Resolved by |
|---|---|---|
| [[wiki/open-questions/non-technical-teams-and-git]] | high | An account of a completed non-developer rollout |
| [[wiki/open-questions/hooks-in-cowork]] | *narrowed* | Hooks confirmed present; what they can **gate** still needs a test |

## Resolved

| Page | Was | Outcome |
|---|---|---|
| [[wiki/open-questions/hooks-in-cowork]] | blocking | Docs say hooks run **only** in Cowork — the concern was inverted |
| [[wiki/open-questions/team-plan-mechanics]] | unverified | Fully documented; replaces most of my invented plumbing |
