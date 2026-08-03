# Log

## [2026-08-03] ingest | r/ClaudeCode — "How are you actually using Claude Code as a team?"

Source supplied by Neal as a print-to-PDF; reddit.com is not agent-fetchable and no workaround was
attempted. Extracted with `pdfplumber`, both artifacts stored in `raw/clippings/` with hashes.

Pages created: 15 (schema, overview, index, review-queue, log, 6 patterns, 2 anti-patterns,
3 concepts, 3 open questions). Pages updated: 0 — first ingest.

**Key additions.** Six independent handles point at a private plugin marketplace as the distribution
mechanism, which partially answers a question I had marked blocking. Two independent corroborations
of my own design arrived unprompted: the deterministic-versus-advisory distinction
(`Such_Independent_234`, phrased better than mine) and the personal-layer-with-promotion structure
(`HaagNDaazer`).

**Two things got worse, not better.** `mbcoalson` reports hooks not working in Cowork — single
source, four months old, and exactly the failure I had flagged as the largest risk. And
`Substantial_Doubt139` names a gap I had not considered: knowledge layers record current truth but
not supersession or dependency, reportedly biting around month three.

**Notable absence.** Nobody in the thread reports a *completed* non-developer rollout. Several want
one. Two people asked how to handle non-code files and neither got an answer.

Five items routed to `review-queue.md`. None applied.

## [2026-08-03] note | web search attempted, not ingested

Searched for enterprise rollout guidance alongside the Reddit source. Results were dominated by
SEO/content-marketing pages making specific unattributed claims (line-count caps for CLAUDE.md,
30/60/90-day plans, adoption statistics). No page was snapshotted, so under rule 1 none of it is
citable and none of it entered the wiki. Recorded here so the gap is deliberate rather than an
oversight — and so I don't re-run the same search expecting better.

## [2026-08-03] ingest | Claude Help Center — plugins, and org plugin marketplaces

Two first-party articles fetched and snapshotted after Neal asked whether Claude Code would be needed
for non-developers, given the Reddit claim that Cowork lacks hooks.

**The premise was false, and the wiki caught it.** Documentation dated 2026-05-29 states hooks and
sub-agents run *only* in Cowork and are greyed out in chat. The practitioner comment was roughly four
months old and inverted. `hooks-in-cowork` rewritten; the superseded claim moved to `## History` per
rule 3 rather than deleted, because a single dated comment nearly redirected an architecture.

**Second question answered better than hoped.** `team-plan-mechanics` was `unverified` and is now
fully documented — promoted from open-question to pattern. Org marketplaces sync from a private
GitHub repo on PR merge, `Required` plugins cannot be uninstalled, and members cannot edit
org-managed plugins. Three things I had designed by hand are platform behaviour.

Pages created: 2 sources. Pages updated: 4 (hooks-in-cowork, team-plan-mechanics, index, overview).
Review queue: 1 item downgraded, 2 added.

**Standing caveat carried forward.** Hooks existing is not hooks *blocking*. The offering may not
describe compliance as guaranteed until a blocking hook is demonstrated end to end.

## [2026-08-03] define | harness

Added [[wiki/concepts/harness]] after Neal asked whether "harness" meant Claude Code or Codex — a
sign the term was doing work in my writing without being pinned down anywhere.

**The finding worth keeping:** the word appears **zero times** across all three snapshots — 25
practitioners and two documentation pages. The concept is everywhere; the label is mine. Others reach
for "scaffolding", or describe it functionally (`Such_Independent_234`: "Constrain agents through
tools, environment, and code organization"), or just name the product. Distinctive vocabulary I own,
and vocabulary that buys no recognition — both are true and the page says so.

Also resolved, retroactively: **"Cowork or Claude Code?" was the wrong question.** Both are harnesses
and both score high on every capability row. The real variable is who is sitting there. Chat is the
surface that actually fails, because it cannot enforce anything.

Schema updated: added a `definitional` strength grade for pages that define a term rather than report
a finding. Factual claims inside such a page still carry their own citations.

Pages created: 1. Pages updated: 2 (CLAUDE.md, index.md).
