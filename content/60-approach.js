/* APPROACH — how the work gets done.
   Six elements that compound. Generated from the delivery-stack page in
   Neal's engineering wiki.

   Edit freely. Each file calls NM.add([...]) and the graph picks it up.
   Node shape: id, kind, cat, parent, label, kicker, title, body, more, foot, tags
*/

NM.add([

{ id:"harness", kind:"sub", cat:"Approach", label:"The Harness", parent:"app",
  kicker:"Approach · 1 of 6",
  title:"An LLM without filesystem access is a consultant",
  body:"Using a chat window is not the same activity as running an agent inside your repository. Read, write, create, delete — that difference accounts for most of the gain.",
  more:"Claude Code navigates a repository rather than being handed files. On initialization it explores and documents the repo; on every invocation after that it reads its own notes first, so it arrives oriented instead of asking.\n\nThe contrast with in-editor assistants is the whole point. Copilot needs you to decide in advance which files matter — and choosing the relevant context <strong>is</strong> the hard part of the problem. That's precisely the part worth delegating.\n\nThen there's everything that isn't code. I connect Claude to Jira for reading request tickets and writing the documentation and comments back into them, plus Webex, Splunk logs, and the Git repository. The administrative half of engineering — hours spent, no code produced — becomes tractable.\n\nWriting quality matters more here than it sounds. A ticket comment written well decides whether the next person understands the state of the work. That's operational, not cosmetic.\n\nWorth saying plainly: this tooling improves monthly. I re-test things that weren't possible a quarter ago, because several of them now are.",
  foot:"Claude Code · MCP · Jira · Splunk · Webex · Git",
  tags:["Filesystem access","MCP","Tooling"] },

{ id:"wiki", kind:"sub", cat:"Approach", label:"The Wiki", parent:"app",
  kicker:"Approach · 2 of 6",
  title:"Ground truth, maintained deliberately",
  body:"A persistent knowledge base holding the rules and facts that have to stay consistent across sessions — so agents start with compounding context instead of starting cold.",
  more:"It holds more than code structure. I add projects, resources, and material adjacent to the work, including things that aren't code at all.\n\n<strong>Audience-aware content.</strong> I keep a wiki on stakeholder communication — researched best practices, accessibility, stakeholder perspectives, and explicit guidance on articulating complexity. Who the reader is changes the output: a developer and a product owner should get materially different explanations of the same change, and the system knows that.\n\n<strong>Ingestion is a designed process.</strong> I built a skill that branches by resource type rather than treating every source the same. And instead of dumping a document in, I have Claude interview me about it, so the right context and relationships get captured at the point of entry. That interview is where accuracy is won or lost.\n\n<strong>The graph is readable.</strong> The whole thing opens in Obsidian as a graph, which makes the relationships visible rather than implied.",
  foot:"LLM knowledge base · custom ingestion skill · Obsidian graph view",
  loop:"assets/wiki-graph-loop.mp4",
  loopPoster:"assets/wiki-graph-poster.jpg",
  loopLabel:"My own engineering wiki, seen in Obsidian's graph view — every node a page, every edge a cross-reference the agent maintains.",
  tags:["Ground truth","Context engineering","Obsidian"] },

{ id:"skills", kind:"sub", cat:"Approach", label:"Skills", parent:"app",
  kicker:"Approach · 3 of 6",
  title:"Repetition, packaged once",
  body:"A repetitive task gets explained to Claude one time, as a skill. It follows those instructions reliably — which turns a recurring judgment call into a deterministic procedure.",
  more:"The value compounds in two directions.\n\nA skill refined across several iterations becomes more dependable than the ad-hoc version of the same task, because each round of use surfaces a case the instructions didn't cover.\n\nAnd it stops depending on me remembering how I did it last time. That's the quiet win — the consistency isn't coming from discipline, it's coming from the procedure existing outside my head.",
  foot:"Write once · refine across iterations · stop re-deciding",
  tags:["Automation","Consistency","Reuse"] },

{ id:"hooks", kind:"sub", cat:"Approach", label:"Hooks", parent:"app",
  kicker:"Approach · 4 of 6",
  title:"Safeguards that don't depend on compliance",
  body:"Pre- and post-hooks make something happen regardless of whether the model follows instruction. That distinction is architectural, not stylistic.",
  more:"A skill is an instruction the model chooses to follow. A hook is a mechanism that fires either way.\n\nSo the design rule falls out on its own: anything that <strong>must</strong> be true — formatting, checks, logging, guardrails — belongs in a hook rather than in a prompt. Anything that benefits from judgment belongs in a skill.\n\nA lot of the frustration people report with agentic coding comes from putting a requirement in the wrong one of those two categories.",
  foot:"A skill is an instruction · a hook is a mechanism",
  tags:["Guardrails","Determinism","Reliability"] },

{ id:"specs", kind:"sub", cat:"Approach", label:"Spec-Driven", parent:"app",
  kicker:"Approach · 5 of 6",
  title:"Everything starts with a specification",
  body:"I spend the majority of my time planning and designing spec markdown files rather than writing implementation. It's the single change that most improved my code.",
  more:"The loop: draft the spec, read it critically — as a reader rather than as the author — iterate through corrections, and only then build.\n\nThat reading pass is where errors surface. Ambiguity caught in a spec costs minutes. The same ambiguity caught during implementation costs a rewrite, and an agent that hits an unspecified decision won't stop to ask — it will invent a plausible answer and keep going.\n\nThe practical test: hand the spec to someone with no context and see whether they'd build the same thing. If two reasonable readers would diverge, there's a hole, and that hole is exactly where the improvisation happens.\n\nMost of the thinking now happens before implementation rather than during it, which is a better place for it.",
  foot:"Plan in markdown · read as a reader · iterate · then build",
  tags:["Planning","Specifications","Quality"] },

{ id:"explainers", kind:"sub", cat:"Approach", label:"HTML Explainers", parent:"app",
  kicker:"Approach · 6 of 6",
  title:"Visual proof that the plan was understood",
  body:"Animation- and graphic-rich single-page files generated from the wiki, explaining a concept, a detail, or a status — illustrations, animations, dropdowns, video.",
  more:"Two uses, and the second is the one people miss.\n\n<strong>Learning.</strong> I'm a visual learner. A plan or a concept lands faster as an illustrated, animated page than as prose, so I build one when I need to actually absorb something rather than skim it.\n\n<strong>Auditing comprehension.</strong> Reviewing a visual explanation of the plan exposes whether the agent genuinely understood the task. A misunderstanding can hide comfortably inside a well-written paragraph. It cannot hide in a diagram — the boxes are either in the right places or they aren't.\n\nSo it's a proof mechanism, not a presentation format. This page is one of them.",
  foot:"Learn from it · and use it to check the agent's comprehension",
  tags:["Visual learning","Verification","Accessibility"] },

/* The six above are how I work. This one is what happens when a company runs
   the same system — deliberately not numbered, because it's the consequence
   of the six rather than a seventh element. */
{ id:"company", kind:"sub", cat:"Approach", label:"At Company Scale", parent:"app",
  kicker:"Approach · At company scale",
  title:"Six elements for one person is a productivity tool",
  body:"Run the same system across a whole company and something different happens: the deposits are made by many people and the extractions are made by many people, and they aren't the same people.",
  more:"On one person this compounds, but the ceiling is however much that person does. At company level the mechanism changes.\n\n<strong>The layer has to run both directions.</strong> Everyone designs for extraction — ask a question, get an answer grounded in how the company works. Almost nobody designs for deposit, which is what makes the other direction survive. An experienced person doing real work through the harness leaves evidence: the exception they made, the threshold they applied, the vendor who let them down. That material is produced whether or not anyone intended to produce it.\n\n<strong>Which is the answer to why every company wiki dies.</strong> Not laziness — bad incentives. The person with the knowledge pays the cost of writing it down and someone else receives the benefit. Any system built on that decays to the rate at which people voluntarily do unpaid work. Make the deposit a byproduct of the job and there's nothing left to skip.\n\n<strong>What it doesn't solve.</strong> Capture is mechanical; deciding which of two contradictory things is now true is judgment, and somebody at the company has to own it. If nobody does, the layer accumulates contradictions instead of going stale — a different failure, not a better one.\n\nThe band where this matters most is roughly 20 to 100 people. Below that the owner knows everything and you can just ask them.",
  foot:"Extract and deposit · the company layer and the personal one",
  links:[
    {label:"The visual explainer — for business owners", url:"operating-knowledge/", primary:true},
    {label:"The long version — Why Your Company Wiki Died", url:"notes/company-harness/"}
  ],
  tags:["Institutional knowledge","Small business","Two-way layer"] }

]);
