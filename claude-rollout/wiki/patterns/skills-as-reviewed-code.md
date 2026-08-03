---
type: pattern
strength: strong
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 4 independent handles
created: 2026-08-03
updated: 2026-08-03
tags: [governance, review, consistency]
---

# Treat prompts as code that gets reviewed

Consistency was the original poster's fifth question — how do you stop output being good only for
the one person who prompts well. The answer practitioners converged on is not training. It is
**putting the prompt itself under version control and code review.**

## Evidence

`Substantial_Doubt139` states the principle:

> "Treating prompts as code that gets reviewed and versioned is the only way the consistency problem
> becomes tractable."

`thlandgraf` gives the mechanism:

> "treat CLAUDE.md as team infrastructure not personal notes — build commands, naming conventions,
> testing patterns, all version-controlled in Git so every session picks it up. And custom skills in
> .claude/commands/ solve the consistency problem — instead of hoping everyone prompts the same way,
> write a markdown file for each repeatable workflow and anyone can run /my-skill to get consistent
> output."

`boatsnbros` runs it as an actual review process — the plugin accepts PRs for new skills, and
separately requires that PRs carry the output of a review skill:

> "PRs now require notes from our /review-code skill and full tdd proof."

`HaagNDaazer` adds the enforcement half: *"worth enforcing that everything must be a Pull Request as
breadcrumbs for the project."*

## Implications for my design

This is my inbox → review → publish loop, arrived at independently, in an engineering context where
the review surface already exists. It is direct support for the governance model, and it suggests
the model is not exotic — it is what teams reach for once the pain shows up.

The gap it exposes: these teams get review for free because their reviewers are developers who
already live in PRs. My reviewer is a transaction coordinator. **The pattern transfers; the
interface does not.** That is exactly the split I designed two harnesses for, and this is the first
outside evidence that the split is necessary rather than fussy.

Related: [[wiki/patterns/internal-plugin-marketplace]], [[wiki/patterns/pull-requests-as-decision-trail]].
