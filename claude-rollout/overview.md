---
type: overview
created: 2026-08-03
updated: 2026-08-03
---

# Overview — what practitioners actually do

One source so far ([[raw/clippings/2026-08-03-reddit-claudecode-team-usage]]), but a dense one:
~25 practitioners answering a person who had just been handed responsibility for a team rollout.

## The shape of the answers

Nobody said "write a better CLAUDE.md." That is the single most striking thing about the thread.
The person asking assumed the answer was a document; every experienced responder redirected to
**distribution and governance** instead — a shared plugin or skills library, versioned, reviewed,
and pushed out centrally.

The strongest signals, in rough order of corroboration:

| Finding | Strength | Page |
|---|---|---|
| Ship a private plugin/skills marketplace, not a document | strong | [[wiki/patterns/internal-plugin-marketplace]] |
| Skills are code: version them, review them by PR | strong | [[wiki/patterns/skills-as-reviewed-code]] |
| Onboarding is pairing, not documentation | strong | [[wiki/patterns/pair-sessions-over-docs]] |
| Deterministic walls beat advisory files | moderate–strong | [[wiki/concepts/deterministic-vs-advisory]] |
| Shared mutable context between agents is the failure mode | moderate | [[wiki/anti-patterns/shared-mutable-context]] |
| Personal `.local` overlay + periodic promotion upward | moderate | [[wiki/patterns/local-overlay-with-promotion]] |
| PRs and tickets as the decision trail | moderate | [[wiki/patterns/pull-requests-as-decision-trail]] |
| Cowork (not Code) for non-developer teams | moderate | [[wiki/patterns/cowork-for-non-developers]] |
| Skills capture rules but not *superseded* rules | weak–moderate | [[wiki/concepts/decision-supersession-gap]] |

## What this changes about my own design

Four things, and two of them are uncomfortable.

**Confirmed.** My hooks-versus-skills distinction was arrived at independently by a practitioner in
almost the same words — see [[wiki/concepts/deterministic-vs-advisory]]. So was the
company-layer/personal-layer split with a deliberate promotion step, see
[[wiki/patterns/local-overlay-with-promotion]]. That is the best kind of evidence: people who have
never read my page reaching the same conclusion from their own scar tissue.

**Corrected.** I have been treating the wiki as the centrepiece and skills as a supporting element.
The field evidence points the other way — the *distribution mechanism* is what teams say made the
difference, and `ryan_the_dev` goes as far as "Ignore customizing Claude md. Standardize with
skills." See [[wiki/patterns/internal-plugin-marketplace]].

**Answered — then overturned within the day.** My top blocking unknown was whether guardrails are
enforced or merely instructed in Cowork. A practitioner comment said hooks do not work there;
first-party documentation says hooks run **only** in Cowork and are greyed out in chat. The concern
was inverted. See [[wiki/open-questions/hooks-in-cowork]] — the superseded claim is kept in its
`## History`, because a single dated comment nearly redirected an architecture and that is worth
remembering.

**Newly exposed.** A gap I had not considered: knowledge systems capture what is true now, and are
poor at recording what *used to* be true and what was built on the old assumption. Reported as a
month-three wall. See [[wiki/concepts/decision-supersession-gap]].

**Replaced.** The distribution mechanism I had designed — a shared folder with a sync story and an
open question about whether the desktop agent writes to network shares — is largely unnecessary. Org
plugin marketplaces sync from a private GitHub repo **on PR merge**, members cannot edit
org-managed plugins, and a plugin can be marked `Required` so it cannot be uninstalled. My reviewer's
merge *is* the publish event. See [[wiki/open-questions/team-plan-mechanics]].

## What to look for next

- A test, not a source: what can a hook actually **gate** in Cowork? Presence is documented; blocking
  behaviour is not.
- Anything from a **non-developer** rollout. Two people in the thread raised the same problem
  (files that aren't code, teammates who don't use git) and neither got a good answer:
  [[wiki/open-questions/non-technical-teams-and-git]].
- Actual numbers. The thread is entirely qualitative. Nobody reported a measurement that survived
  contact with a sceptic.
- The mechanics of Team-plan private marketplaces, from documentation rather than from comments.
