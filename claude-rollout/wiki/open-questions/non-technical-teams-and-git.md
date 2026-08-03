---
type: open-question
strength: moderate
severity: high
sources: [2026-08-03-reddit-claudecode-team-usage]
corroboration: 2 handles raising it, 0 answering it
created: 2026-08-03
updated: 2026-08-03
tags: [non-technical, storage, git, unanswered]
---

# What do non-developer teams use instead of git?

Two people raised this independently. **Nobody in the thread answered either of them.** The silence
is the finding.

## Evidence

`elmarto356`:

> "in my team have use google drive, using the internal tools, we have think about use of github, but
> the problem is now we work with PDFs, Opus (whatsapp audio format), MP3, MP4, etc, and is dificult
> see or upload this files to github, and my team not all have technical knowment"

`Fabian-88`, R&D scientists at a food company, asks the same thing directly and receives no reply:

> "wie hat das für euch funktioniert mit google drive? hab das selbe gedankliche problem mit github,
> da wir no-coder sind."
>
> *(How has Google Drive worked out for you? I have the same conceptual problem with GitHub, since
> we're no-coders.)*

## The two distinct problems

Worth separating, because they have different answers:

1. **Binary and media files.** Git is built for text diffs. PDFs, audio and video bloat the repo
   permanently and produce no reviewable diff. This is a real technical mismatch, not a skills gap.
2. **People who don't use git.** A separate problem, and the one my two-harness split already
   addresses — producers never see the repository.

`elmarto356` has both at once, which is probably why nobody answered.

## Implications for my design

My answer to (2) is solid and matches what `mbcoalson` is attempting. My answer to (1) is thinner
than I thought.

The knowledge layer is markdown, so git is right for it. But a real brokerage's *evidence* is
photographs, scanned disclosures, PDFs and recorded calls — and my proposal files are supposed to
carry provenance back to the case. **If provenance means attaching the source artefact, the repo
gets binaries.** Current thinking: provenance should be a *reference* to where the artefact lives in
the firm's existing systems, never a copy. That keeps the repo textual and has the side benefit of
not duplicating client material into version control — which is also the safer answer for
[[wiki/anti-patterns/documentation-as-the-only-control]] and for the PII gate in the architecture doc.

Not yet written up as settled. Flagged to [[review-queue]].

## What would resolve it

Any account of a completed non-developer rollout with an answer to the binary-evidence problem. None
exists in this source.

Related: [[wiki/patterns/cowork-for-non-developers]].
