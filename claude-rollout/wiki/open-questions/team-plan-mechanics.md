---
type: pattern
strength: strong
severity: resolved
sources: [2026-08-03-support-manage-org-plugins, 2026-08-03-support-use-plugins-in-claude]
created: 2026-08-03
updated: 2026-08-03
tags: [team-plan, marketplace, admin, distribution, governance]
---

# Org plugin marketplaces — the distribution mechanism, documented

Was an open question rated `unverified`. First-party documentation answers all of it, and the answer
is better than the architecture I had designed around it.

## Evidence

From [[raw/clippings/2026-08-03-support-manage-org-plugins]]:

> "Plugin marketplaces allow Team and Enterprise plan owners to distribute curated plugins to
> everyone in their organization through Claude Cowork."

Two routes in, and they are explicitly matched to audience:

> "**Manual upload**—Upload individual plugin ZIP files through the admin UI."
> "**GitHub syncing**—Connect a private GitHub repository and Cowork automatically syncs plugins from
> it."

The sync trigger is the thing:

> "The GitHub marketplace will then be auto-synced whenever a PR is merged to that repo."

Distribution control, four settings, of which one is a genuine guarantee:

> "Required | Automatically installed for all org members without the option to remove it"

And the governance property I had planned to enforce by policy:

> "Members can't edit organization-managed plugins, which prevents conflicting changes to shared
> tooling."

## What this replaces in my design

My architecture doc invents a shared-folder-plus-sync story with an open question attached about
whether the desktop agent writes reliably to a network share. **Most of that is unnecessary.**

| I had designed | The platform already provides |
|---|---|
| Publish `wiki/` to a synced folder | GitHub-synced marketplace, auto-syncs on PR merge |
| Read-only by permission or convention | Members cannot edit org-managed plugins, by design |
| Hope everyone has the current version | `Required` — auto-installed, cannot be uninstalled |
| Producers never touch git | Only the owner connects the repo; members never see it |
| Repo must be private, in the firm's org | Private or internal repo mandated; public not allowed |

The PR-merge trigger is the part that matters most: **my reviewer's merge becomes the publish
event**, natively. Reviewer accepts a proposal → commits → merges → marketplace syncs → sixty
producers have the new rule. That is the round trip in my architecture diagram, running on
documented product behaviour instead of on plumbing I would have had to build.

## Constraints worth knowing before quoting

- Cowork **and** Skills must both be enabled for the organisation first.
- The repo must be on github.com, private or internal. GitHub Enterprise Server is not supported.
- Admin work happens **on Claude Desktop**, not in a terminal — so a non-engineer can plausibly own it.
- Group-level plugin access is **Enterprise only**. On a Team plan there is one setting for everyone —
  fine for a single-office brokerage, a constraint for a firm with distinct departments.
- A failed sync can temporarily remove plugins from members, and may reset installation preferences.
  That is an operational risk to design around, not a theoretical one.
- Limits: 50 MB per ZIP, 500 plugins per GitHub-synced marketplace, syncs up to 30 minutes.
- `marketplace.json` external `source` types are restricted; keep plugin folders inside the
  marketplace repo and use relative paths.

## History

**[2026-08-03] Superseded.** Created earlier the same day as an open question rated `unverified`,
because three practitioners described marketplaces as routine but none described the mechanics.
Answered by documentation the same day. Promoted from `open-question` to `pattern`.

Related: [[wiki/patterns/internal-plugin-marketplace]], [[wiki/open-questions/hooks-in-cowork]].
