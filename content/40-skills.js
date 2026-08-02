/* SKILLS
   Edit freely. Each file calls NM.add([...]) and the graph picks it up.
   Node shape: id, kind, cat, parent, label, kicker, title, body, more, foot, tags
*/

NM.add([

{ id:"conv", kind:"sub", cat:"Skills", label:"Conversational AI", parent:"skl",
  kicker:"Skills · Expert", title:"Conversational AI",
  body:"Ten years in conversational AI — six of them at enterprise scale. Watson, Dialogflow, TypeScript flows, and now agent frameworks.",
  more:"<strong>Worth separating those two numbers.</strong> I started in 2016, independently, under the brand Artificial Savant as a registered IBM Business Partner — selling and demoing chatbots and video analytics to businesses of every size. Self-directed, client-funded, and nothing like enterprise scale.\n\nEnterprise started in 2020 at Lincoln Financial, my first Fortune 250. Then Aetna and CVS Health, then ADP. Six years of that.\n\nThe first four years are why the six work. I'd built and demoed enough to sound credible in a room full of enterprise stakeholders before anyone let me near a production system serving millions of people.\n\nThe craft itself: intent design, dialog state management, fallback strategy, disambiguation, and the accuracy work that decides whether a conversational system survives contact with users.\n\nThe pattern that repeats across every platform: the interesting failures are never the ones where the model doesn't understand. They're the ones where it understands the words, gets the intent wrong, and answers anyway — fluently.",
  foot:"2016 independent (Artificial Savant) · 2020 → enterprise",
  foot:"Watson · Dialogflow · LangGraph · TypeScript flows",
  tags:["Watson","Dialogflow","LangGraph"] },

{ id:"agents", kind:"sub", cat:"Skills", label:"AI Agents", parent:"skl",
  kicker:"Skills · Advanced", title:"Agent architecture",
  body:"Looping LLM architectures with tool calls, structured output enforcement, and permission gating.",
  more:"An agent is a loop, not a prompt. Resolve intent, check what the user is permitted to do, choose a tool, call it, look at what came back, decide whether you're done.\n\nMost of the engineering is in the parts that aren't the model: what happens when a tool call fails, how you stop a loop that isn't converging, how you enforce structured output so downstream code can rely on it, and how you keep the agent from confidently taking an action it shouldn't.\n\nMCP is the piece that makes this practical in a real company — it's how an agent reaches systems of record instead of a frozen snapshot of them.",
  foot:"MCP · LangGraph · AWS Strands · structured output",
  tags:["MCP","LangGraph","Strands"] },

{ id:"ctx", kind:"sub", cat:"Skills", label:"Context Engineering", parent:"skl",
  kicker:"Skills · Advanced", title:"Context engineering",
  body:"Curated, maintained knowledge layers that make agents accurate. The counterintuitive part: subtraction beats addition.",
  more:"An unfiltered dump of a company's files is worse than nothing. Not slower — actively worse, because it converts a model that would have said something obviously generic into one that says something specific and wrong.\n\nThe mechanism is simple. Your shared drive holds the current policy and also the one from 2019 that nobody deleted. Nothing in the folder structure says which is true. A human ignores the old one from memory. The model finds a confident, well-formatted, authoritative-looking document and uses it.\n\nSo the discipline is editorial, not technical: state the purpose before adding anything, connect what changes rather than freezing it as text, and prune as aggressively as you add. The biggest accuracy gain I've ever gotten came from deleting things.",
  foot:"Curation over collection · subtraction beats addition",
  tags:["RAG audit","Prompt eng.","Wiki pattern"] },

{ id:"cc", kind:"sub", cat:"Skills", label:"AI-Accelerated Delivery", parent:"skl",
  kicker:"Skills · Advanced", title:"AI-accelerated delivery",
  body:"Claude Code orchestration with parallel agents, roughly 2× throughput and climbing.",
  more:"Spec-driven development plus the LLM wiki pattern applied to live codebases, with parallel agents doing research, implementation, and verification as separate passes.\n\nThe throughput number is real but it's the least interesting part. What actually changed is the kind of work I take on: brownfield integration into unfamiliar, actively-developed components used to be a multi-week onboarding cost, and now it's a mapping exercise I do collaboratively with agents in an afternoon.\n\nThe failure mode to avoid is treating the agent as an oracle. Everything it concludes about a repo gets verified by an independent pass before I act on it.",
  foot:"Spec-driven · parallel agents · brownfield onboarding",
  tags:["Claude Code","Parallel agents"] },


]);
