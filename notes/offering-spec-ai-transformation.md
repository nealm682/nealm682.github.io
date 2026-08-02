# Offering Spec — Firm-Wide AI Context Layer

**Status:** Draft v0.1 — internal operating spec, not sales collateral
**Author:** Neal Meinke
**Date:** 2026-08-02
**Reader:** me, first. Then anyone I bring in to deliver this.

---

## 0. What this document is and isn't

This is the **offering spec**: what the service is, who buys it, how it's delivered, how it's priced, and where it breaks. It is deliberately internal — it contains the things I would not say to a prospect on the first call, including the parts I don't know yet.

Two other documents follow from this one and are explicitly out of scope here:

- **Implementation spec** — the technical architecture. Connector map, packaging and distribution mechanism, knowledge base schema, guardrail enforcement. Written after the commercial shape is settled, because the commercial shape constrains the architecture.
- **Sales narrative** — the externally-facing version. Derived from §1 and §2 of this document, with §5 through §10 removed.

The test for this document: hand it to someone with no context and see whether they'd build the same service. Where two reasonable readers would diverge, there's a hole. Holes are marked `[OPEN]` rather than papered over.

---

## 1. The problem

### 1.1 The market has already tried AI and it didn't work

Nearly every professional services firm of 20–100 people has already bought AI seats. Someone signed up for ChatGPT or Copilot, told the team about it, and eleven months later a handful of people use it to rewrite emails. Nothing structural changed.

This is the single most important fact about the market, and it cuts both ways. It means **the buyer is already educated and already disappointed** — I don't have to sell the concept of AI, which is the expensive part of selling. But it also means the buyer has a formed opinion that this doesn't work, and the opinion is based on real evidence.

The position is not "AI can help your firm." They've heard that. The position is:

> You deployed a model. You didn't deploy a system. A model with no access to your files, no knowledge of how your firm works, no repeatable procedures, and nothing enforced will produce exactly the result you got.

### 1.2 Six failure modes, six elements

The six elements aren't a framework I'm retrofitting to a sales pitch. They were derived from doing the work, and each one exists because it covers a failure the others don't. What makes them sell is that every complaint a disappointed firm has maps cleanly onto a missing element.

| What they say | What's missing | Element |
|---|---|---|
| "It doesn't know anything about our files." | Filesystem and system access | 1 · Workspace |
| "I have to re-explain everything every single time." | Persistent ground truth | 2 · Knowledge Base |
| "Two people ask the same thing and get different answers." | Packaged repeatable procedures | 3 · Procedures |
| "It wrote something we can't legally send." | Enforced constraints | 4 · Guardrails |
| "It confidently did the wrong thing." | Written plan before execution | 5 · Written Plans |
| "We didn't catch the mistake until a client did." | Comprehension verification | 6 · Visual Proof |

This table is the highest-leverage artifact in the whole offering. It converts a vague sense of disappointment into a specific, named diagnosis — and a diagnosis implies a treatment. I should be able to run a prospect through this in five minutes on a first call and have them recognize their own firm in at least four rows.

### 1.3 The deeper problem: tacit knowledge doesn't scale

Underneath the tooling complaint is a structural one. In a firm of this size, the firm's actual value — how we price, how we talk to clients, what we do when X happens, who we call for Y — lives undocumented in a small number of experienced people's heads.

That knowledge is invisible until someone leaves, and then it's a crisis. It's why onboarding takes six months. It's why quality varies by practitioner. It's why the principal can't take a real vacation.

The Knowledge Base element is not a feature. **It is the extraction of tacit firm knowledge into a maintained, queryable asset that both humans and agents read from.** The AI layer is the forcing function and the delivery mechanism, but the durable asset is the documented firm.

This matters commercially: it means the value survives even if the models change, and it's the honest answer to "what if AI gets commoditized."

---

## 2. The six elements, translated

The names I use for myself are engineering names. "Harness" and "wiki" will lose a broker or a managing partner in the first thirty seconds. Business-facing names below; originals retained for the implementation spec and for technical audiences.

`[OPEN]` The set of business-facing names is a first pass. Worth testing against three real prospects before committing to them in collateral.

### 1 · Workspace *(harness)*

**The claim:** An assistant that can't see your systems is giving you opinions, not work.

**What it is in a firm:** The agent connected to where the work actually lives — email, calendar, document storage, CRM, and the industry-specific system of record. Read and write, not upload-and-paste.

**Why it's first and why it's least interesting:** It's the precondition for everything else, and it's also the most commoditized. Connectors are table stakes and will keep getting easier. I should not position this as the differentiator, because in eighteen months it won't be one.

### 2 · Knowledge Base *(wiki)*

**The claim:** Every session starting from zero is the reason it never got better.

**What it is in a firm:** A maintained body of ground truth — how this firm does things, what the rules are, what's true about the market and the clients, what the standards are. Structured so an agent reads it before doing anything, and so a human can read it too.

**Why this is the actual business:** It's the only element a competitor can't replicate by buying the same software, it's the only one that compounds, and it's the only one that requires ongoing work. Which makes it both the moat and the recurring revenue.

**The hard part, stated plainly:** Extraction is an interview problem, not a document-dump problem. Handing me the policy manual gets me 20% of what's actually operative. The other 80% is in people's heads and comes out through structured interviews. That is labor, it is the bulk of the diagnostic, and it's why this can't be sold as software.

### 3 · Procedures *(skills)*

**The claim:** The same task done a different way every time is not a process, it's a habit.

**What it is in a firm:** The eight to twelve documents and communications the firm produces over and over, each explained once and then executed the same way by anyone.

**Why it matters commercially:** This is the visible ROI and the fastest thing to demo. A practitioner watching their most tedious recurring artifact get produced correctly in ninety seconds is the moment the sale actually closes. Procedures are what I lead with in the pilot even though the Knowledge Base is what I'm really building.

### 4 · Guardrails *(hooks)*

**The claim:** A skill is an instruction. A guardrail is a mechanism. Anything that *must* be true belongs in the second category.

**What it is in a firm:** Regulatory and brand constraints enforced regardless of whether the model cooperates — prohibited language screening, required disclosures, scope limits on advice, PII handling.

**Why this closes the principal:** The practitioners want speed. The principal carries the liability. Guardrails are the only element addressed to the person who signs. On a first call with a principal, this is the element I lead with — not procedures.

`[OPEN]` **Enforcement mechanism is unresolved.** The hook surface in a desktop/Cowork deployment is thinner than in Claude Code, and I have not verified what's actually enforceable versus merely instructed for non-technical seats. If some guardrails degrade to strongly-worded instructions, I need to say so plainly rather than let a principal believe something is enforced when it isn't. **This must be resolved before the first paid engagement.** Selling a compliance guarantee I can't deliver is the fastest way to end this business.

#### 2.4.1 Three tiers of obligation

Not every output carries the same duty, and conflating them is what makes AI pitches sound dishonest to anyone technical. Every workflow gets sorted into one of these before it's built:

| Tier | Standard | Where it lives |
|---|---|---|
| **Discovery** | Probabilistic capture is acceptable | The deposit loop. Missing one costs nothing permanent, because rules recur. |
| **Operating guidance** | Grounded generation, then human review | Drafts, summaries, comparisons, correspondence. Most of the day-to-day value. |
| **Control** | Deterministic check plus required approval | Regulatory disclosure, prohibited language, mandatory approvals, retention. A single miss is the whole problem. |

The commitment that follows: **nothing in the Control tier is ever described in Discovery-tier language.** This is also the sorting exercise that makes the §2.4 open question tractable — I only need real enforcement for the third tier, which is a much smaller surface than "everything."

### 5 · Written Plans *(spec-driven)*

**The claim:** An agent that hits an unspecified decision won't stop and ask. It will invent a plausible answer and keep going.

**What it is in a firm:** Honestly — not something 60 practitioners will do. This element is primarily **how I run the engagement**, and secondarily a discipline I teach the context owner for any significant new procedure.

**Positioning:** Reposition from "thing you install" to "how the work gets delivered." It's a credibility element and a differentiator against consultants who improvise. It appears in the sales narrative as methodology, not as a deliverable.

### 6 · Visual Proof *(HTML explainers)*

**The claim:** A misunderstanding hides comfortably in a well-written paragraph. It cannot hide in a diagram.

**What it is in a firm — two distinct uses:**

- **Internal.** Training artifacts for rollout, and my verification that a procedure was understood before it ships to 60 people.
- **Client-facing.** A visual one-pager the practitioner sends their own client. This is a *product* the firm gets, not just internal plumbing, and it's the element most likely to surprise a prospect in a good way.

The second use is worth more than the first commercially and I have been under-selling it.

**Non-negotiable design rule: explainers are compiled, never maintained.** The obvious approach — write the wiki page, then build the explainer, then encode the skill, then draft the checklist — produces four surfaces carrying the same rule, and they will disagree within a quarter. That is the decay problem this whole offering exists to solve, reintroduced through the back door and made worse, because now every disagreeing artefact looks authoritative.

So the canonical entry carries structured fields — rule, rationale, examples, exceptions, provenance, effective date, owner, sensitivity class — and every downstream surface is *generated* from it: wiki page, skill, explainer, checklist, onboarding lesson. Generated files are disposable, marked as generated, and regenerated often enough that hand edits get overwritten visibly.

This is also the clearest answer to "what is the retainer actually for." Maintenance is one entry plus a recompile, not four documents — which is defensible, and gets cheaper per rule as the library grows.

---

## 3. Who this is for

### 3.1 Define the ICP by traits, not industry

Industry-first targeting produces a scattered pipeline and forces me to relearn a domain per deal. The firms this works for share structural traits. Target the traits.

A firm qualifies when **most** of the following are true:

1. **Tacit knowledge concentration.** The firm's operating knowledge is undocumented and held by a handful of experienced people.
2. **Semi-autonomous practitioners.** Agents, partners, producers, advisors — people who can't simply be told what tools to use.
3. **Regulated written output.** What gets written and sent carries real compliance or liability exposure.
4. **Repeatable artifacts.** Three or more documents/communications produced weekly in roughly the same shape.
5. **Fragmented systems.** CRM, email, document storage, and a vertical system of record that don't talk to each other.
6. **No knowledge owner.** Nobody's actual job is maintaining institutional knowledge.
7. **Prior disappointment.** They've already tried AI and it didn't stick.

### 3.2 Size band: roughly 20–100 practitioners

- **Below ~20:** the shared firm layer doesn't amortize. The build cost per head is too high and the principal is usually the only real knowledge holder, which makes it a personal-productivity engagement instead.
- **Above ~100–150:** IT and procurement enter, security review becomes a real workstream, and I'm competing with firms that have a security questionnaire team. Not unwinnable, but a different business.

### 3.3 Verticals that match the traits

Ranked by trait fit, not by my familiarity:

| Vertical | Notes |
|---|---|
| Real estate brokerage | Strong fit on all seven. 1099 structure is the complication (see §9). |
| Insurance agency (P&C / benefits) | Strong fit. Heavy regulated correspondence, producer autonomy, carrier-specific tacit knowledge. |
| Small law firm | Strongest on regulated output and tacit knowledge. Highest resistance to tooling change. |
| Accounting / tax practice | Strong fit, brutal seasonality — sell in May, not February. |
| Wealth management RIA | Strong fit, highest compliance bar, likely the highest willingness to pay for guardrails. |
| Marketing / creative agency | Good fit on repeatable artifacts, weak on regulated output. Guardrails story is softer. |
| Medical / dental group | Strong fit but HIPAA raises the floor on what I have to be able to attest to. Defer. |

`[OPEN]` **Depth vs. breadth.** Going deep on one vertical means the firm-layer knowledge base becomes partially reusable across clients — a real compounding asset and a large margin improvement by client three or four. Going broad means a larger pipeline and no reusable asset. I think depth wins, but I should not decide this until after the first two engagements tell me how much of the firm layer is genuinely portable.

### 3.4 What they'd do instead

A prospect always has alternatives, including doing nothing. Naming them honestly is how I find out where I actually lose.

| Alternative | Where it beats me | Where it doesn't |
|---|---|---|
| **Do nothing / keep the seats they have** | Free, no change management | Nothing changes — but this is the default and the real competitor |
| **Vertical SaaS adding AI features** (CRM, transaction management) | Cheap, already installed, zero integration work | Generic across every firm using it — no firm-specific ground truth, which is the entire point |
| **A general AI consultancy** | Bigger, more credible on paper, has a security team | Sells strategy decks and pilots; rarely delivers a maintained asset |
| **Hire someone internally** | Permanent, cheaper at steady state | Can't hire for this yet at firm scale; 9-month ramp; single point of failure |
| **A tech-forward practitioner doing it themselves** | Free, already happening | Produces a personal overlay, never a firm layer — and it leaves when they do |

The pattern: **everything cheaper than me produces generic output, and everything more credible than me produces a document instead of a working system.** That gap is the position. If a competitor closes it, I need to know quickly.

---

## 4. Architecture at scale: two tiers

The scale problem is not "how do 60 people get a chatbot." It's that a shared context layer and a personal context layer have opposite requirements, and collapsing them breaks both.

### 4.1 Firm layer — shared, governed, versioned

Read-only to practitioners. Changes flow through the context owner.

Contains: compliance and regulatory rules · firm policy · service standards and brand voice · document templates and quality bars · approved vendor and referral lists · market and domain knowledge · the procedure library · the guardrail set.

**Governance rule:** a practitioner who thinks the firm layer is wrong files a change request; they do not edit it. Sixty people with write access to ground truth produces sixty versions of ground truth within a quarter, which is the same as having none.

### 4.2 Practitioner overlay — personal, private, thin

Owned and edited by the individual.

Contains: their book of business · their territory or specialty · their client history and preferences · their personal voice calibration · their active matters.

**Privacy rule:** overlays do not merge upward automatically. If something in an overlay belongs in the firm layer, it gets promoted deliberately by the context owner, with the practitioner's knowledge. Silent harvesting of individual practitioners' books into a firm asset is both an ethical problem and, with 1099 practitioners, potentially a contractual one. Get this wrong once and adoption is finished.

**Deliberately thin.** Every hour a practitioner spends maintaining their overlay is an hour they resent. The design target is under 30 minutes of setup and near-zero ongoing maintenance. Everything that *can* live in the firm layer *should*.

### 4.3 Why two tiers is the commercial insight

The firm layer is what they buy once and what the retainer maintains. The overlays are what make it feel personal enough that practitioners actually adopt it. Sell the first, but the second is what determines whether the engagement succeeds.

### 4.4 Distribution

`[OPEN]` Packaging and distribution mechanism for 60 non-technical seats is **unverified**. Working assumption: the firm layer, procedure library, guardrails, and connector configuration are bundled and installed per-seat, with centralized updates. I need to confirm against the current admin, plugin, and deployment surface before quoting a build.

This is the largest technical unknown in the offering and it belongs in the implementation spec. Do not quote a full-firm build until it's resolved.

---

## 5. The context owner problem

**This is the failure mode that kills engagements, and it is not a technical one.**

The Knowledge Base element requires deliberate maintenance. When I do this for myself, I'm the maintainer and it's invisible. At 60 people, maintenance is a job — and at nearly every firm in the target band, that job does not currently exist and nobody is sitting idle waiting to be given it.

**Untended, a firm knowledge base decays to unreliable in roughly a quarter.** Rules change, a template gets superseded, a vendor relationship ends. It doesn't announce its decay; it just quietly starts producing wrong answers, and the firm concludes the AI stopped working. That outcome looks like my failure regardless of whose fault it was.

### 5.1 Who the owner is

Not the principal — they won't sustain it. Not the newest hire — they don't know what's true.

The right person usually already exists as the person everybody asks when they don't know the rule: transaction coordinator, office manager, operations director, senior paralegal, agency account manager.

Required traits: knows the operative rules · respected enough to arbitrate a disagreement about what's true · has 3–5 hours a week that can actually be freed · is not so senior that this is beneath them or so junior that it's above them.

**Two people, not one — primary and backup.** A single owner is a single point of failure sitting directly on top of the asset the client just paid to build. They take holidays, they get ill, and eventually they resign. The backup doesn't need to work the queue weekly; they need to have done it enough that a fortnight's absence isn't a fortnight's decay. In practice this is usually the operations lead as primary with the principal as backup — the principal won't sustain the routine, but they can absolutely cover it and they benefit from seeing the queue occasionally.

Both names go in the build-stage gate at §5.3, not just the first.

### 5.2 Three ownership models

| Model | Fit | Trade-off |
|---|---|---|
| **I retain it** | Firms with no plausible internal candidate | Highest recurring revenue, but caps how many clients I can carry and makes me a dependency |
| **Internal owner, trained** | Firms with a strong ops person | Cleanest for the client, lowest recurring revenue, highest risk of quiet decay |
| **Hybrid** | Default recommendation | I own it through the first quarter, transfer with training, retain a review-and-update cadence |

The hybrid is the honest recommendation and also the best commercial structure — it converts naturally into a maintenance retainer without the client feeling captured.

### 5.3 Make it a gate

**Naming the context owner *and their backup* is a precondition of the build stage, not a nice-to-have.** If a firm won't name them and won't pay me to be one, I should decline the build. Taking that engagement means selling something I know will fail in six months.

---

## 6. Engagement model

Three stages. Each one sells the next, and I never quote a price before I know what's in their heads.

### Stage 0 — Qualification call *(free, 45 min)*

Run the §1.2 diagnostic table. Score against §3.1 traits and §8 disqualifiers. Identify the plausible context owner. Outcome is a yes/no on the diagnostic, not a proposal.

### Stage 1 — Diagnostic + Pilot *(3–4 weeks, fixed fee, 5–8 practitioners)*

**The critical structural insight: the discovery *is* the deliverable.** Extracting tacit knowledge is the expensive labor, and it produces the firm layer. So it's billable work, not free pre-sales. This is what makes the whole model viable — and it's why I can quote a build honestly at the end instead of guessing.

Deliverables:

1. Current-state map — systems, workflows, where knowledge actually lives
2. Firm knowledge base v1, covering the top three workflows
3. Three to five working procedures for the pilot cohort
4. Guardrail set v1, with an explicit statement of what is *enforced* vs. *instructed*
5. Measured baseline on the artifacts in §7
6. Build proposal with a real number, based on observed scope

**Pilot cohort composition** — deliberately mixed, roughly:

- 1 principal or designated broker *(their participation is the adoption signal to everyone else)*
- 1–2 top producers *(they have real systems worth extracting; they're also the hardest to impress and the most persuasive if won)*
- 2–3 solid middle performers *(the actual target population — the ROI case lives here)*
- 1–2 recent hires *(they have no tacit knowledge, which is exactly what reveals what onboarding requires)*

The cohort becomes the internal champions for rollout. Choosing them is a political act, not a random sample — say so to the principal explicitly.

### Stage 2 — Build *(6–10 weeks)*

Full firm knowledge base · complete procedure library · guardrails deployed · rollout to all practitioners in waves, not at once · context owner training and handover · explainer library for training and client-facing use.

**Gate:** named context owner *and backup* (§5.3), and the §4.4 distribution question resolved.

### Stage 3 — Maintenance retainer *(monthly, ongoing)*

Knowledge base maintenance · new and revised procedures · regulatory and rule updates · new-practitioner onboarding into the layer · quarterly review against §7 measures · model and tooling changes absorbed on their behalf.

This is the revenue that matters and the one most consistent with the framework's own claim that ground truth is *maintained deliberately*.

### 6.1 Pricing

`[OPEN]` No anchor yet. Deliberately unresolved until the first diagnostic is sold — I don't have a defensible number and inventing one now would just anchor me to a guess.

What I can commit to structurally:

- Stage 1 is fixed-fee and priced to be an easy yes for a firm this size. It's the wedge, not the profit.
- Stage 2 is quoted from observed scope after Stage 1, never before.
- Stage 3 is monthly, sized to the maintenance burden observed in Stage 2, and should be the majority of lifetime engagement value.
- Not per-seat. Per-seat invites comparison to software pricing, and this isn't software — the cost driver is knowledge extraction and maintenance, which doesn't scale with headcount the way seats do.

### 6.2 What they keep if they stop

A reader will ask this and I don't currently have an answer. It needs one before the first contract.

If a firm buys Stage 1 and declines Stage 2, they walk away with a knowledge base v1 and working procedures — the expensive part. I should assume some firms will try exactly that.

Position I'm inclined toward: **the extracted knowledge is theirs, unconditionally.** It's their firm's knowledge; claiming ownership of it is indefensible and would poison the extraction interviews, which only work if people are candid. What's mine is the method, the interview protocol, the procedure patterns, and the guardrail library.

That means Stage 1 has to be priced as real work rather than as a loss-leading wedge, because I can't rely on lock-in to recover it. It also means the retainer has to be earned continuously rather than structurally — which is uncomfortable but is the correct incentive.

`[OPEN]` Confirm this with an attorney before the first contract, particularly around the reusability of firm-layer patterns across clients in the same vertical (§3.3).

---

## 7. Measurement

Firms this size won't run a clean study, and practitioners will not fill out timesheets. So the measurement has to be cheap, honest, and resistant to flattery.

**Measure:**

1. **Artifact cycle time.** Pick five recurring artifacts. Time them, by observation, before the pilot and at week 12. Concrete and defensible.
2. **Guardrail catch count.** Number of prohibited-language, missing-disclosure, or out-of-scope items caught before send. Directly translatable to risk for the principal.
3. **Weekly active practitioners.** The honest one. If they aren't using it, nothing else on this list means anything, and this is the number I should watch hardest during rollout.
4. **New-hire time-to-competence.** Slow to read but the most valuable to the principal, since it's the tacit-knowledge problem measured directly.
5. **Structured practitioner interviews** at week 4 and week 12. Qualitative, but it's where I learn what's actually broken.

**Explicitly reject: self-reported hours saved multiplied by an hourly rate.** Every consultant produces that number, it's unfalsifiable, and sophisticated buyers discount it to zero. Refusing to produce it is itself a credibility signal — and I should say why out loud on the call.

---

## 8. Qualification and disqualification

### Qualify — pursue when

- The principal will personally participate, not just approve
- A plausible context owner exists and can be freed for 3–5 hrs/week
- Three or more workflows repeat weekly in roughly the same shape
- Core systems have APIs or at minimum reliable exports
- They've already tried AI and been disappointed *(motivated, educated buyer)*
- There is documented compliance exposure someone loses sleep over
- 20–100 practitioners

### Disqualify — decline when

- **No context owner and no willingness to fund one.** Hard stop. See §5.3.
- **The principal delegates entirely.** Without visible principal use, practitioner adoption doesn't happen. This is the single strongest predictor of failure.
- **The system of record is on-prem with no export.** The workspace element can't be built; everything downstream degrades to a chat window.
- **They want headcount reduction.** Wrong frame and it poisons adoption — practitioners asked to train their replacement will not participate honestly in knowledge extraction, which destroys the Knowledge Base. Reframe to capacity and consistency, or walk.
- **Fewer than ~15 practitioners.** Economics don't work.
- **Procurement requires a security program I can't service alone.**
- **They want it in four weeks.** Knowledge extraction has a floor. Compressing it produces a shallow layer that decays immediately.

Walking away from a bad-fit engagement is cheaper than delivering one. The delivery-heavy model means a failed engagement costs months, not hours.

---

## 9. Worked example — 60-agent brokerage, Tucson

Used throughout as the illustrative case. Real enough to be concrete, not a live prospect.

### 9.1 The 1099 problem — and why it changes the pitch

Realtors are independent contractors, not employees. Three consequences that reshape the entire engagement:

1. **The broker cannot mandate tooling.** Adoption is voluntary. Every design decision that adds practitioner friction is an adoption tax.
2. **The productivity pitch is aimed at the wrong person.** Agents keep their own production gains; the brokerage doesn't capture them directly. So "your agents will be more productive" is not, by itself, a reason for the brokerage to pay.
3. **Therefore the brokerage-level value is recruiting, retention, and risk** — a capability no other Tucson brokerage offers its agents, plus reduced E&O exposure on what agents write and send.

This generalizes: **in any firm with semi-autonomous practitioners, the buyer's motivation and the user's motivation are different, and the pitch has to satisfy both in the same conversation.** That's a core insight for the whole offering, not a real-estate quirk.

### 9.2 Buyer map

- **Designated broker / owner** — signs. Motivated by liability, recruiting, retention. Lead with Guardrails.
- **Operations / transaction coordinator** — the likely context owner. Motivated by no longer answering the same question forty times a week.
- **Top producers** — not the buyer, but the adoption kingmakers. If two of them use it visibly, the rest follow.

### 9.3 Firm layer contents

Arizona Department of Real Estate advertising and disclosure rules · fair housing language standards · the brokerage policy manual · listing presentation standards and quality bar · commission and referral structure · preferred vendor list (inspectors, lenders, title, contractors) · Tucson submarket knowledge — neighborhoods, HOA quirks, school districts, well and septic considerations, seasonal patterns · transaction milestone checklists.

### 9.4 Practitioner overlay

Farm area · past client roster and preferences · active listings and buyers · personal voice calibration · niche (first-time buyers, luxury, relocation, investment).

### 9.5 Candidate procedures

Listing description drafting · CMA preparation and narrative · offer comparison summary for a seller · weekly seller update · open house follow-up sequence · expired-listing outreach · transaction milestone communications · buyer consultation packet.

Lead the pilot with listing descriptions and offer comparisons — highest frequency, highest tedium, most visible quality delta.

### 9.6 Guardrails

Fair housing prohibited-language screening · ADRE advertising disclosure requirements (brokerage name, license) · hard scope limit against legal, tax, and appraisal advice · client PII handling · no representation of value as an appraisal.

### 9.7 Open items specific to this vertical

`[OPEN]` **MLS data access.** MLSSAZ data is licensed, and IDX/RESO access terms constrain what can be connected and how data may be used or retained. This must be checked against the actual license before I describe any MLS-connected capability to a brokerage. Assume nothing.

`[OPEN]` **Who pays.** Brokerage-funded, agent-funded, or split. Affects pricing structure and adoption dynamics substantially, and I don't have a view yet.

---

## 10. Open risks and unknowns

Ordered by how much damage each does if I'm wrong.

1. **Guardrail enforcement (§2.4).** If compliance constraints are instructions rather than mechanisms in a non-technical deployment, the strongest part of the pitch is weaker than stated. **Resolve before the first paid engagement.** Never let a principal believe something is enforced when it isn't.
2. **Distribution mechanism (§4.4).** Unverified path for 60 non-technical seats with centralized updates. Blocks Stage 2 quoting.
3. **Adoption with voluntary users (§9.1).** Semi-autonomous practitioners can't be compelled. The whole design has to earn its way in, and I have no data yet on what adoption rate is realistic.
4. **Knowledge decay (§5).** Mitigated by the §5.3 gate, but the gate is only as good as my willingness to enforce it against a signed contract.
5. **My own capacity.** This is a delivery-heavy, interview-heavy model. `[OPEN]` I don't know how many concurrent engagements one person can carry, and the answer determines whether this is a practice or a job. First engagement should be instrumented to find out.
6. **Pricing anchor (§6.1).** Unknown until the first diagnostic sells.
7. **Depth vs. breadth (§3.3).** Determines whether margin improves with each client or stays flat.
8. **My own liability exposure.** I would be selling compliance guardrails to regulated firms. If a guardrail fails to catch a fair housing violation or a missing disclosure, my exposure is not theoretical. `[OPEN]` Needs resolution before the first paid engagement: professional liability / E&O coverage, contractual limitation of liability, and — most importantly — **written language stating that guardrails reduce risk rather than eliminate it, and do not replace broker or compliance review.** The temptation on a sales call will be to overstate this, because it's the strongest part of the pitch. Don't.

9. **Commoditization.** Connectors and memory features get better and cheaper every quarter, and some of what I'd build by hand today will be a product feature. **The defense is that the firm layer is extracted knowledge, not software** — but I should re-test this assumption every few months rather than assume it holds.

---

## 11. Naming

`[OPEN]` The offering needs a name. "Six elements" describes the method, not the product.

Direction worth exploring: the durable noun in all of this is **the context layer** — the thing the firm owns afterward, distinct from whatever model is running on top of it. It's accurate, it survives model churn, and it's the actual asset.

Not deciding here. Deferred until the sales narrative is drafted.

---

## 12. Immediate next actions

1. Resolve the guardrail enforcement question (§2.4, §10.1) — blocking
2. Resolve the distribution mechanism (§4.4, §10.2) — blocking for Stage 2
3. Draft the Stage 1 diagnostic protocol — the interview guide is the core IP and doesn't exist yet
4. Test the §1.2 diagnostic table on three real prospects; revise the business-facing names based on what lands
5. Draft the sales narrative from §1, §2, §6
6. Write the implementation spec once §10.1 and §10.2 are resolved
