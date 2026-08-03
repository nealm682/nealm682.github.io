---
type: pattern
strength: moderate
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 1 handle, substantial detail
created: 2026-08-03
updated: 2026-08-03
tags: [governance, personal-layer, promotion]
---

# A personal `.local` layer, reviewed upward periodically

One practitioner describes, unprompted, almost exactly the two-tier design I arrived at from the
contractor-privacy angle — and arrives at it from a completely different motivation: letting people
customise without fragmenting the shared version.

## Evidence

`HaagNDaazer`:

> "for most of the Claude type markdown files, you can also have a .local version that is not git
> versioned, giving each team member a way to customize aspects for themselves, those changes should
> be reviewed regularly to see where individuals are maybe improving on a process and potentially
> merge that into the team wide markdowns"

Three components, all of which match my design: a private per-person layer, a shared governed layer,
and **an explicit, periodic, human promotion step between them.** Note that the promotion is
described as a review of what individuals have improved — treating the personal layer as a source of
candidate improvements rather than as clutter to be tolerated.

## Implications for my design

Independent corroboration of the company-layer / personal-layer / promotion-gate structure, from
someone with no exposure to my framing and a different reason for needing it.

One thing they have that I do not: `.local` files are excluded by gitignore, so the boundary is
**enforced by tooling rather than by policy.** In my design the boundary is a rule the reviewer
follows. Making it structural — the personal layer physically outside the synced folder — is
strictly better and costs nothing. Worth adopting.

Also worth noting what is missing from their version: any statement about *ownership* of the personal
layer. In a team of employees that question does not arise. With 1099 producers it is the whole
question. So the mechanism transfers; the contractual framing around it is mine to add.

Related: [[wiki/patterns/skills-as-reviewed-code]], [[wiki/anti-patterns/shared-mutable-context]].
