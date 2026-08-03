---
type: source
title: "Manage Claude Cowork plugins for your organization"
venue: Claude Help Center (support.claude.com)
url: https://support.claude.com/en/articles/13837433-manage-claude-cowork-plugins-for-your-organization
article_dated: "updated over 3 weeks ago (as at 2026-08-03)"
retrieved: 2026-08-03
retrieved_by: agent web fetch
authority: first-party product documentation
---

# Snapshot — key passages

Who and where:

> "Plugin marketplaces allow Team and Enterprise plan owners to distribute curated plugins to
> everyone in their organization through Claude Cowork."
> "Owners and Primary Owners of Team and Enterprise plans can manage organization plugins on Claude
> Desktop."
> "**Requirements:** Cowork and Skills must both be enabled for your organization before you can use
> plugin marketplaces."

Two distribution routes:

> "**Manual upload**—Upload individual plugin ZIP files through the admin UI. Best for quick
> iteration, one-off tools, or teams that don't use GitHub for plugin development."
> "**GitHub syncing**—Connect a private GitHub repository and Cowork automatically syncs plugins from
> it. Best when multiple developers collaborate on plugins or you want version-controlled updates."

Repository constraints:

> "Your repository must be **private or internal**—public repos aren't allowed for organization
> marketplaces. Repos hosted on custom GitHub Enterprise Server instances aren't supported. Your repo
> must be hosted on github.com."

Sync behaviour:

> "The GitHub marketplace will then be auto-synced whenever a PR is merged to that repo."
> "During a sync, Cowork compares the latest commit in your repo against the last-synced commit... If
> there are changes, Cowork reads the manifest, validates each plugin, and replaces all plugins in the
> marketplace with the current state of the repo. Syncs can take up to 30 minutes depending on the
> number of plugins."
> "**Important:** If a sync fails, plugins may be temporarily removed for your team members."

The four installation preferences — *Installed by default*, *Available for install*, *Not available*,
and *Required*:

> "Required | Automatically installed for all org members without the option to remove it | The plugin
> appears in their installed list without any action and cannot be disabled or uninstalled."

> "Members can't edit organization-managed plugins, which prevents conflicting changes to shared
> tooling."

Group-level control is Enterprise-only:

> "Group-level plugin access is available on Enterprise plans and configurable by Admins and above."

Limits: 50 MB per plugin ZIP; 100 plugins per manual marketplace, 500 per GitHub-synced; 30-minute
sync timeout; plugin names lowercase-hyphenated, max 64 characters.

Their own guidance table includes the row:

> "Plugins built by non-engineering teams | Manual upload"
