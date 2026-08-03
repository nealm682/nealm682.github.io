---
type: source
title: "Use plugins in Claude"
venue: Claude Help Center (support.claude.com)
url: https://support.claude.com/en/articles/13837440-use-plugins-in-claude
article_dated: 2026-05-29
retrieved: 2026-08-03
retrieved_by: agent web fetch
authority: first-party product documentation
---

# Snapshot — key passages

Verbatim, from the section "Where you can use plugins". **Emphasis is never added inside quoted
material in this file** — anything that looks like markup below is the source's own:

> "You can install and use plugins in chat on the web, the Chat tab in Claude Desktop, and Claude
> Cowork. The skills bundled in a plugin work across all three. Hooks and sub-agents run only in
> Cowork, so they appear grayed out in chat."

*(The sentence that matters is the third one. Noting that here rather than bolding it inside the
quote, so the quoted text stays byte-comparable against the source.)*

On what a plugin is:

> "Each plugin bundles skills, connectors, and sub-agents into a single package"

Plugin availability:

> "Plugins are available to all paid plans (Pro, Max, Team, Enterprise)."

On the network path, relevant to any security conversation:

> "In Cowork, connectors reach external services through Anthropic's cloud, not through your local
> network. A custom connector must point to a server that's reachable over the public internet from
> Anthropic's IP ranges."

On organization-managed plugins:

> "You can't edit organization-managed plugins. This keeps shared tooling consistent across your team."
> "Some plugins may be auto-installed or required for you. You can uninstall auto-installed plugins if
> you don't need them, but required plugins can't be removed."

Local MCP caution:

> "Plugins may include local MCP servers that run on your computer with the same permissions as any
> other program you run. Only install plugins from sources you trust."
