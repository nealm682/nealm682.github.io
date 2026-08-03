---
type: review-queue
created: 2026-08-03
---

# Review queue

Claims that would change something in `/operating-knowledge/`, `/notes/architecture/` or the offering
spec. Nothing here has been applied. Approve, revise or reject — then log it.

---

## [2026-08-03] Reframe skills as the distribution unit, not element three of six

**From:** [[wiki/patterns/internal-plugin-marketplace]] · strength `strong`, 6 handles

Six practitioners independently say the shared plugin/skills library is what made a rollout work, and
one says to ignore customising CLAUDE.md entirely. My material leads with the knowledge layer.

**Proposed change:** on the business page, promote the packaging story; keep the wiki as the *content*
but present skills as the *delivery*.
**Argument against:** their teams share a codebase that already encodes much of the context. A
brokerage has no such substrate, so the wiki carries more weight in my case than in theirs.
**Status:** pending.

---

## [2026-08-03] Make the personal/company boundary structural rather than policy

**From:** [[wiki/patterns/local-overlay-with-promotion]] · strength `moderate`

`HaagNDaazer` keeps personal overlays as gitignored `.local` files — the boundary is enforced by
tooling. Mine is a rule the reviewer follows.

**Proposed change:** put the personal layer physically outside the synced folder. Cheap, strictly
safer, removes a policy I would otherwise have to police.
**Status:** pending. Low risk — I would apply this.

---

## [2026-08-03] Admit the supersession gap

**From:** [[wiki/concepts/decision-supersession-gap]] · strength `weak`, 1 detailed source

Knowledge layers record what is true, not what stopped being true or what was built on the old
assumption. Reported as a month-three wall.

**Proposed change:** add supersession to the entry schema, and add this to the honest-limits section
rather than waiting for a client to find it.
**Argument against:** single source, and the dependency half may be unsolvable inside the layer.
**Status:** pending. Leaning accept for the limits section, defer the schema change.

---

## [2026-08-03] Narrow the guardrail language pending a hooks test

**From:** [[wiki/open-questions/hooks-in-cowork]] · strength `strong`

~~One four-month-old comment says hooks do not work in Cowork.~~ **Superseded same day:**
documentation dated 2026-05-29 says hooks run *only* in Cowork.

**Standing constraint, unchanged:** no proposal describes compliance as *guaranteed* until a
**blocking** hook is demonstrated end to end. Presence is documented; the ability to stop an action
is not.
**Status:** constraint retained, severity reduced. Test still outstanding.

---

## [2026-08-03] Rebuild the distribution section of the architecture doc

**From:** [[wiki/open-questions/team-plan-mechanics]] · strength `strong`, first-party docs

The architecture doc invents a shared-folder-and-sync mechanism and flags an open question about
whether the desktop agent writes reliably to a network share. Org plugin marketplaces already do
this: private GitHub repo, auto-sync on PR merge, `Required` install preference, members cannot edit
org-managed plugins.

**Proposed change:** replace the `wiki/` publish path in the architecture diagram with the
marketplace; delete the sync open-question; add the real constraints (Team vs Enterprise group
overrides, failed-sync behaviour, 50 MB / 500 plugin limits, github.com private repos only).
**Argument against:** none identified. This is the platform doing what I was going to build.
**Status:** pending — this is the largest single simplification available and should be applied.

---

## [2026-08-03] Reconsider the two-tier folder model

**From:** [[wiki/open-questions/team-plan-mechanics]]

If the company layer ships as a plugin rather than as a synced folder, the `wiki/` half of my
directory tree may be redundant. The `inbox/` half is not — nothing in the platform provides a
proposal queue.

**Open:** does a plugin-delivered knowledge layer still read naturally as files the agent greps, or
does it change how skills reference their dependencies?
**Status:** pending. Needs a working test before the architecture doc is redrawn.

---

## [2026-08-03] Provenance by reference, never by copy

**From:** [[wiki/open-questions/non-technical-teams-and-git]] · strength `moderate`

Non-developer teams work in PDFs, audio and video. Git handles none of it well, and copying client
artefacts into a repo is also the PII hazard already flagged in the architecture doc.

**Proposed change:** provenance fields point at where the artefact lives in the firm's existing
systems. Never a copy.
**Status:** pending. Leaning accept — it solves two problems at once.
