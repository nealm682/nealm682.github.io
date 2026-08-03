---
type: concept
strength: definitional
sources: [2026-08-03-support-use-plugins-in-claude, 2026-08-03-reddit-claudecode-team-usage]
created: 2026-08-03
updated: 2026-08-03
tags: [terminology, architecture, vocabulary]
---

# Harness

**The software around the model that turns a text predictor into something that can perceive and
act.** The model on its own is stateless: text in, text out, no memory, no hands. The harness is
everything wrapped around it that makes it capable of doing anything.

## Where the word comes from

Borrowed from **test harness** — the scaffolding that runs a piece of code, feeds it inputs and
captures what comes out. The code under test doesn't know it's in a harness; the harness is the
apparatus that makes it runnable and observable. There's an echo of **wiring harness** too: the
bundle that connects components to each other and to power, which is arguably closer to how I use it.

Both are general software usage rather than anything specific to this domain. Flagged because the
next section matters.

## Nobody else in the corpus calls it this

Checked: the word "harness" appears **zero times** across all three snapshotted sources — twenty-five
practitioners and two documentation pages. The concept is unmistakably present; the label is not.

What people use instead:
- **"scaffolding"** — `DifferenceTimely8292` asks about "a scaffolding repo... for enterprise or team
  setting"
- **environment / constraints** — `Such_Independent_234`: *"Constrain agents through tools,
  environment, and code organization."* That is a description of a harness by its function, without
  naming it.
- Most people simply say the product name and let it stand for the category.

This cuts both ways and I should hold both halves. **In my favour:** it's distinctive vocabulary I
own, and it names something people clearly feel but don't have a word for. **Against:** it isn't
shared vocabulary, so it buys no recognition. Saying "harness" to a practitioner does not land the
way "skills" or "plugins" does — it needs a sentence of explanation every time.

## What a harness comprises

- the loop, so it can take more than one step
- tool definitions, and the parser that turns model output into real calls
- filesystem access — read, write, create, delete
- connections to systems of record
- permission gating, and anything that fires whether or not the model cooperates
- context assembly — what gets loaded before it starts

## It's a category, not a product

Claude Code is a harness. So is Codex CLI, Cowork, Cursor's agent mode, Aider. **The model is the
engine; the harness is the vehicle.** The same model behaves completely differently across harnesses,
which is the entire claim behind "an LLM without filesystem access is a consultant" — a statement
about the wrapper, not about the model.

## Grading one — it's a spectrum, not a binary

Useful questions, and the documented answers where they exist:

| Question | Chat | Cowork | Claude Code |
|---|---|---|---|
| Read the environment? | no | yes | yes |
| Write and act? | no | yes | yes |
| Loop, or answer once? | once | loops | loops |
| Persist between runs? | limited | yes | yes |
| Run skills? | yes | yes | yes |
| **Enforce something the model can't ignore?** | **no** | **yes** | **yes** |

That last row is documented in [[raw/clippings/2026-08-03-support-use-plugins-in-claude]]:

> "The skills bundled in a plugin work across all three. Hooks and sub-agents run only in Cowork, so
> they appear grayed out in chat."

## Implications for my design

**"Cowork or Claude Code?" was the wrong question,** and I spent real time on it. Both are harnesses,
both score high on every row. The choice is about **who is sitting there** — a terminal versus a
desktop app — not about capability. See [[wiki/patterns/cowork-for-non-developers]].

**Chat is the one that actually fails.** It cannot enforce anything, which puts every Control-tier
obligation out of reach on that surface. "We gave everyone ChatGPT and nothing changed" is a harness
problem with a precise diagnosis, not a vague one.

**Keep the word where it earns its place.** Precise and correct on the Approach branch, for engineers.
Jargon that costs the first thirty seconds on the business page — which is why that page says "the
assistant is connected to the systems the work actually lives in" and never uses the term at all.

Related: [[wiki/concepts/deterministic-vs-advisory]], [[wiki/patterns/cowork-for-non-developers]],
[[wiki/open-questions/hooks-in-cowork]].
