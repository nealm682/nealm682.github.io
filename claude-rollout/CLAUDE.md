# CLAUDE.md — Claude Rollout Wiki

Always-on schema. Short on purpose: it loads every turn.

## Domain

**How other people are actually rolling Claude Code and Claude Cowork out to staff.** Not my
offering, not my architecture — field evidence from practitioners who have already tried it.
The point is to learn from their failures before repeating them, and to find independent
corroboration (or contradiction) for the design decisions in `/operating-knowledge/` and
`/notes/architecture/`.

Bias toward **what people reported went wrong**. Success stories are cheap; the month-three
wall is what's worth knowing.

## Three layers
- `raw/` — immutable snapshots. Read, never edit. Clippings land in `raw/clippings/`.
- `wiki/` — agent-written, interlinked. `patterns/`, `anti-patterns/`, `concepts/`, `open-questions/`.
- `overview.md` — the map, and the blueprint for what to go looking for next.

## The rules (every write)

1. **Cite the snapshot, never the live URL.** If it isn't in `raw/`, it isn't citable. A live
   link is a claim I can't check later.
2. **Grade every claim by corroboration**, in the page frontmatter:
   - `strong` — three or more independent practitioners
   - `moderate` — two, or one with substantial detail
   - `weak` — single source, or a secondary/marketing source
   - `unverified` — retrieved as a search summary only, page never snapshotted
   - `definitional` — defines a term rather than reporting a finding. Any factual claim inside it
     still carries its own citation; the definition itself does not.
3. **Never delete a fact.** Superseded claims move to `## History` with the date and what replaced them.
4. **Attribute to the handle**, not to "someone said". The handle is what makes it checkable.
5. **Mark time-sensitivity.** This tooling changes monthly. Any claim about what a product can or
   cannot do carries the date it was made and gets re-tested, not trusted.
6. **Gate risky writes.** Anything that would change a decision in the offering or architecture
   docs goes to `review-queue.md` rather than being applied silently.

## Page format
Frontmatter (`type`, `strength`, `sources`, `created`, `updated`, `tags`) + body with
`[[wiki-links]]` + `## Evidence` (direct quotes, attributed) + optional `## History` +
`## Implications for my design`.

That last section is the whole reason this wiki exists. A pattern with no stated implication
is a bookmark, not a note.

## Log & index
Append `## [YYYY-MM-DD] <op> | <title>` to `log.md` per operation. Update `index.md` on every ingest.
