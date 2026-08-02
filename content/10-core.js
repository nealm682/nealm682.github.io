/* CORE — the node everything hangs off. This is the intro; make it count.
   Edit freely. Each file calls NM.add([...]) and the graph picks it up.
   Node shape: id, kind, cat, parent, label, kicker, title, body, more, foot, tags
*/

NM.add([

{ id:"neal", kind:"core", cat:"Career", label:"Neal Meinke",
  kicker:"Start here",
  title:"I build enterprise AI agents — and a system for building them",

  body:"I'm a Senior Lead Application Developer at ADP, working on <strong>ADP Assist</strong> — their flagship AI assistant. Semi-autonomous, looping agents that call tools across thousands of API endpoints to make multi-step decisions in real time.\n\nSix years in enterprise conversational and agentic AI — Watson, Dialogflow, and now agent architectures — taught me the hard part isn't the model. It's delivering accurate, reviewable change inside large codebases that never stop moving.",

  more:"So I built a way to do that consistently.\n\nI run a spec-driven workflow on top of a persistent, self-updating engineering wiki — an LLM knowledge base that knows my repos, directories, and components, extended with a custom skill that populates it from the work I'm actually doing. My agents start with compounding context instead of starting cold every session.\n\n<strong>Onboarding into brownfield code.</strong> I integrate into large systems that other teams are actively changing underneath me. The wiki plus collaborative exploration turns a multi-week ramp into an afternoon of mapping.\n\n<strong>Validating before the merge.</strong> Simulating events, logic, and UI at the component level, so I know a change is correct and efficient before anyone reviews it — rather than discovering it in an integration environment days later.\n\n<strong>Auditing my own work.</strong> Independent agent teams re-check my research against the repo before I commit to an approach. The failure mode in this work isn't ignorance, it's confidence, and this is what catches it.\n\n<strong>Communicating the result.</strong> Single-page, accessibility-aware HTML reports that give multi-stakeholder projects the level of detail they actually want, instead of a wall of text nobody reads.\n\nThe outcome I'm proudest of isn't a metric. Project managers started coming to me to ask how I produce this much detail — which is what pushed me to keep refining the system rather than treating it as done.\n\n<strong>What happens when a company runs it.</strong> The six elements were built for my own work, but the more interesting question turned out to be what changes when a whole company runs them — many people depositing knowledge into a shared layer, many people drawing on it, and the knowledge no longer leaving when the person does. I wrote that up separately, for a non-technical audience.\n\nIf you're building enterprise AI agents and care as much about how they get delivered as whether they work, I'd like to talk.",

  foot:"AWS Strands · MCP · LangGraph · Claude Code · spec-driven delivery",
  links:[
    {label:"Read the résumé", url:"resume/", primary:true},
    {label:"For companies — turning operating knowledge into a layer", url:"operating-knowledge/"},
    {label:"Get in touch on LinkedIn", url:"https://www.linkedin.com/in/neal-meinke-40620150/"}
  ],
  tags:["Enterprise AI agents","Spec-driven delivery","AI practitioner"] },

/* ---------- hubs ---------- */

]);
