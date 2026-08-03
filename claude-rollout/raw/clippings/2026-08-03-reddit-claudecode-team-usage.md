---
type: source
title: "How are you actually using Claude Code as a team? (not just solo)"
venue: r/ClaudeCode
url: https://www.reddit.com/r/ClaudeCode/comments/1rhswxk/how_are_you_actually_using_claude_code_as_a_team/
retrieved: 2026-08-03
retrieved_by: printed to PDF by Neal and supplied directly
post_age_at_capture: "5 months (post), comments 3–5 months"
artifacts:
  - 2026-08-03-reddit-claudecode-team-usage.pdf   # sha256[:16] c1bfa26bd12d99b4
  - 2026-08-03-reddit-claudecode-team-usage.txt   # sha256[:16] dca315b5a6d020f3
participants: 25+ distinct handles
---

# Snapshot notes

Retrieved as a print-to-PDF because reddit.com is not fetchable by the agent. Text extracted with
`pdfplumber`; the plain-text artifact is the extraction, the PDF is the original. Reddit's print
layout interleaves navigation chrome ("Skip to main content", "Create") into the comment text —
those fragments are artefacts of the capture, not of the source. Two consequences worth knowing when
checking a quotation against the extraction: sentences are sometimes **split across a page break**
with chrome injected mid-sentence, and Reddit renders typographic quotes (“ ”) which will not match a
straight-quote search.

**Why this source matters.** It is the highest-value item in the wiki so far: a person in exactly
the position I am selling into — promoted into "AI transformation" for a team with no idea how to
scale a solo workflow — and roughly twenty-five practitioners answering with what actually worked
and what broke.

**Standing caveat.** Every product-capability claim here is 3–5 months old at capture. Treat all of
them as needing re-test, not as current fact. See [[wiki/open-questions/hooks-in-cowork]].

## The question asked

The original poster (`Azrael_666`) had used Claude Code solo for two months, was handed a Team
subscription and five colleagues, and asked five specific things:

1. How do you share context between team members beyond `CLAUDE.md` in the repo?
2. What actually goes in a Team-plan Projects knowledge base, and is it useful?
3. How do you onboard people who have never touched it?
4. Is anyone really doing automated workflows (Slack, tickets, dashboards) or is that hype?
5. How do you keep output quality consistent, rather than good only for the person who prompts well?

Their framing, which is the reason I saved this:

> "I feel like there's a huge gap between 'I use Claude Code and it's awesome' and 'my whole team
> uses Claude Code effectively' and I'm standing right in that gap."

The full extracted text is in the `.txt` artifact alongside this file.
