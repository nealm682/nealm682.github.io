/* CONCEPTS — ideas worked out in public. Leaf nodes live in 71-.js
   Edit freely. Each file calls NM.add([...]) and the graph picks it up.
   Node shape: id, kind, cat, parent, label, kicker, title, body, more, foot, tags
*/

NM.add([

{ id:"loops", kind:"leaf", cat:"Concepts", label:"The Four Loops", parent:"painted",
  kicker:"Concepts", title:"Four processes at four speeds",
  body:"The architecture under this page: four loops running at different rates against one shared node map, joined by a single rule.",
  more:"Conversation runs once per interaction. Network reads deliver arbitrary text fragments 20–60 times a second with no boundary guarantees. A parser scans for complete objects and emits one patch each. The renderer redraws at display refresh, 60–144 times a second.\n\nThe rule that joins them: loops one through three <strong>mutate</strong> state; loop four <strong>samples</strong> it. A node that arrives mid-stream simply starts existing, and its entrance animation is a function of time-since-arrival. The overlap between still-arriving and already-animating is the painted-live effect.\n\nThis is the canonical game-loop pattern — simulation decoupled from rendering — with two extra producer loops on top, and one deliberate inversion: the rate mismatch between producer and consumer is treated as visible choreography rather than hidden behind a loading state.",
  foot:"Lineage: Nystrom's game loop · Fiedler's accumulator",
  tags:["Architecture","Game loop","Streaming"] },

{ id:"springs", kind:"leaf", cat:"Concepts", label:"Analytic Springs", parent:"painted",
  kicker:"Concepts", title:"Springs without integration",
  body:"Every animated value on this page is a damped harmonic oscillator solved in closed form — which is why it can be interrupted mid-flight.",
  more:"A duration-based tween is a scripted path from A to B. Change your mind halfway and you get a discontinuity you have to hide. A spring has a destination and no opinion about the route, so it can be retargeted at any moment.\n\nThe objection is that springs normally integrate per frame, which gives up frame-rate independence. They don't have to. A damped oscillator has an exact analytic solution: store (u₀, v₀, t₀) and evaluate at elapsed time. Same sampler shape, no accumulated error.\n\nRetargeting is then four lines — read current displacement and velocity, set a new target, carry the velocity through. The animation never stops, never snaps, and never queues.\n\nOne rule does most of the perceptual work: <strong>spatial</strong> properties overshoot, <strong>effects</strong> properties never do. Overshooting position reads as mass. Overshooting opacity reads as a flicker.",
  foot:"Verified against RK4 integration · six tokens, not forty knobs",
  tags:["Motion","Physics","M3 Expressive"] },

{ id:"painted", kind:"sub", cat:"Concepts", label:"Painted UI", parent:"cpt",
  kicker:"Concepts · Research", title:"Cheap painted UI",
  body:"Reproducing the illusion that a screen is being painted live by a model — at near-zero marginal cost per user.",
  more:"Generating actual video of an interface is spectacular and economically impossible at scale. The research question is how much of that feeling can be recovered with a small semantic stream and a client-side compositor doing the rest.\n\nThe answer so far is: most of it. The model emits semantic patches — what exists, what it means, how important it is. A choreographer turns intent into motion parameters locally, with no tokens spent on animation. The compositor paints. Cost per user approaches the cost of the text stream alone.\n\nWhat this buys that video generation cannot: interruption. You can change your mind mid-animation and the interface responds continuously, because the motion is being computed rather than played back.\n\nThis page is a working instance of the whole argument.",
  foot:"Side research · github.com/nealm682/painted-ui",
  links:[{label:"The painted-ui wiki", url:"https://nealm682.github.io/painted-ui/"}],
  tags:["Research","Generative UI","Canvas"] },

{ id:"quiesce", kind:"leaf", cat:"Concepts", label:"Quiescence", parent:"painted",
  kicker:"Concepts", title:"Knowing when to stop",
  body:"Ambient motion is a budgeted choice, not a default. After idle, this page stops the render loop completely.",
  more:"There's a real tension in expressive interfaces. Material's guidance is restraint — motion without meaning is clutter, and hero moments should be rare. Painted UI's instinct is the opposite: the painter never stops, because stopping breaks the illusion.\n\nHardware settles the argument. Variable-refresh displays drop to as low as 10 Hz when content is static, and that's where the battery saving lives. Continuous ambient motion pins the panel at its maximum rate indefinitely.\n\nSo: ambient drift is on by default, but it's budgeted. After idle with every spring settled, the loop genuinely stops — the HUD will read <strong>quiesced · 0 fps</strong>. Any input wakes it. The Live/Still toggle makes the budget explicit, and reduced-motion preferences remove bounce rather than removing motion.",
  foot:"Watch the HUD — leave the page alone for a few seconds",
  tags:["Performance","Accessibility","Battery"] },

/* NOTE: this was kind:"leaf" with parent:"cpt" — a leaf hanging off a hub,
   which the layout never shows (leaves only appear when their parent SUB is
   opened). Changed to "sub" so it renders under Concepts. */
{ id:"llm-wiki", kind:"sub", cat:"Concepts", label:"LLM Wiki", parent:"cpt",
  kicker:"Concepts", title:"Knowledge that compounds",
  body:"The single practice that most changed how I work with AI. Instead of asking an LLM to retrieve from raw files every time, I have it build and maintain a persistent wiki — and the difference in output quality is not incremental.",
  more:"I was doing what everyone does: dumping documents into context and prompting. It worked, sort of. But every session started from zero. Subtle questions that required connecting three sources never got good answers because the model had to rediscover the connections each time.\n\nKarpathy wrote up a pattern that reframed the whole thing for me. The idea: instead of retrieval at query time, have the LLM incrementally compile knowledge into a persistent wiki. Each new source gets read, extracted, and integrated — cross-references updated, contradictions flagged, synthesis revised. The knowledge compounds instead of evaporating.\n\nI adopted it immediately and haven't looked back. My workflow now: Obsidian open on one side, Claude Code on the other. The agent reads sources, writes wiki pages, maintains the index. I browse in real time, follow links, check the graph view, ask questions that build on previous answers. The answers file back into the wiki as new pages. Everything compounds.\n\nThe reason it sticks: I'm not doing the bookkeeping. The fifteen-file update after ingesting one source — the part that made me abandon every previous wiki — just happens. The maintenance cost dropped to near zero, which means the wiki actually survives contact with real life.\n\nThree layers: raw sources (immutable, never touched by the agent), the wiki (agent-written markdown with cross-references), and a schema that keeps the agent disciplined about structure and conventions.",
  foot:"Pattern from Karpathy · adopted into daily practice",
  loop:"assets/wiki-graph-loop.mp4",
  loopPoster:"assets/wiki-graph-poster.jpg",
  loopLabel:"The graph view of a wiki built this way — the agent writes the pages and maintains the links; I read them.",
  links:[{label:"Read the full note", url:"notes/llm-wiki/"}],
  tags:["Knowledge engineering","Obsidian","Compounding artifacts"] },

/* Deliberately NOT a summary of the operating-knowledge page — that story lives
   on the Approach branch (id "company"). This is the one reusable technique
   extracted out of it, which is what earns it a slot here rather than a
   second node saying the same thing. */
{ id:"inbox", kind:"sub", cat:"Concepts", label:"Append-Only", parent:"cpt",
  kicker:"Concepts", title:"Many writers, one truth",
  body:"Sixty people cannot share one working copy of the truth. The fix isn't better locking — it's that nobody edits anything, ever.",
  more:"The obvious design is a shared folder everyone can write into. It fails immediately, and not for the reason people expect.\n\n<strong>Attribution comes from commits.</strong> Let sixty people edit files in one working copy and the reviewer opens it to find forty modified files with no author, no rationale, and no way to tell which change belongs with which. Worse, a review is only worth doing when it's looking at one coherent proposal. A pile of loose edits isn't reviewable at any level of effort.\n\n<strong>So invert it: nobody edits, everybody creates.</strong> Each proposal is a new file — what the rule is, the case it came from, which page it would amend, who and when. New files never collide, which deletes locking, conflict resolution and last-write-wins in a single move. Attribution is the filename.\n\n<strong>The property I didn't anticipate.</strong> Because the inbox sits outside the repository, only accepted material is ever committed. Rejected proposals — wrong ones, or ones carrying details that shouldn't be kept — are deleted rather than buried in history. Version control is superb at remembering and very bad at forgetting, and this is the seam where you still get to choose.\n\nOne person then merges, which is what turns a concurrency trick into a governance model: <strong>many may propose, one decides what becomes true.</strong>",
  foot:"Lineage: Maildir's lock-free delivery · append-only logs",
  links:[{label:"Where this came from — the company version", url:"operating-knowledge/"}],
  tags:["Concurrency","Governance","Provenance"] },

/* Spec-Driven moved to the Approach branch (id "specs") — it's part of how
   the work gets done, not a side concept, and two nodes saying the same
   thing split the story. */

]);
