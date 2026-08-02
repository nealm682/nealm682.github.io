/* HUBS — the five primary branches
   Edit freely. Each file calls NM.add([...]) and the graph picks it up.
   Node shape: id, kind, cat, parent, label, kicker, title, body, more, foot, tags
*/

NM.add([

{ id:"exp", kind:"hub", cat:"Experience", label:"Experience",
  kicker:"Experience · Current role",
  title:"Senior Lead Application Developer at ADP",
  body:"I work on <strong>ADP Assist</strong> — ADP's flagship AI assistant — on the team building its agent layer. ADP is a Fortune 500 company, and more than 80% of the Fortune 500 are its clients.\n\nSix years of enterprise conversational and agentic AI before and alongside it: insurance, financial services, and now HR technology.",
  more:"The path here went conversational UX → intent modeling → production chatbot engineering → agent architecture. Each step more technical than the last, and each one built on the one before rather than replacing it.\n\nBut the career has two arcs, and they turned out to converge.\n\nThe first ran 2004–2019: employer benefits strategy, operations leadership, ecommerce direction, and C-suite strategy with P&L ownership. Revenue growth, team building, and a lot of time in rooms with non-technical decision makers.\n\nThe second started in 2020 with a contract role designing conversational UX for financial services, and got progressively more technical from there.\n\nMost AI engineers can't run a stakeholder meeting. Most operators can't ship an agent. The overlap is small, and it is the entire reason I get pulled into ambiguous problems where nobody has written the requirements yet.",
  foot:"ADP Assist · Aetna · Lincoln Financial · Digitel · ABC Water",
  links:[{label:"Full résumé — dates, titles, achievements", url:"resume/", primary:true}],
  tags:["ADP Assist","Fortune 500","Agent architecture"] },

{ id:"skl", kind:"hub", cat:"Skills", label:"Skills",
  kicker:"Skills", title:"What I actually do",
  body:"Deep conversational-AI expertise plus modern agent tooling. Production systems, not demos — the things I've built serve tens of millions of users monthly.",
  more:"The older half is conversational AI: intent design, dialog state, fallback strategy, and the unglamorous accuracy work that decides whether any of it survives contact with real users. Ten years of it — starting independently in 2016, at enterprise scale since 2020.\n\nThe newer half is agent architecture and context engineering. Looping LLM systems with tool calls, structured output enforcement, and permission gating — and the curated context layers that make them accurate rather than merely fluent.\n\nLanguages: TypeScript, Node, Python on the backend; Stencil, React, and Dart/Flutter on the front. MongoDB. I move across the stack fluidly, which is much easier now than it was three years ago.\n\nThe skill I'd actually lead with isn't on any of these lists: I can tell when an AI system is confidently wrong, and I know how to find out why.",
  foot:"Expert: conversational AI · Advanced: agents, prompt eng., delivery",
  tags:["Conversational AI","Agents","Context engineering"] },

{ id:"prj", kind:"hub", cat:"Projects", label:"Projects",
  kicker:"Projects", title:"What I've actually shipped",
  body:"Production systems at enterprise scale during the day; self-built SaaS at night. The work ones reach millions of people. The personal ones taught me the parts of the stack the day job doesn't touch.",
  more:"Three built at work, three built on my own time.\n\nThe enterprise work is conversational and agentic AI in production — HR technology, health insurance, and financial services. Large systems built by many teams, where my contribution is a defined piece rather than the whole thing.\n\nThe personal ones are where I learn everything the day job doesn't require: frontend, database design, auth, billing, deployment, and the tedious compliance work that separates a demo from a product. Premium Tracker went through the full Google Workspace Marketplace review. Full Semester was a founder attempt that didn't reach traction. The EDGAR platform is an ongoing fight with filings that refuse to be consistent.\n\nNone of the personal ones made me rich. All of them made me better at the day job, which turned out to be the actual return.",
  foot:"Three at work · three on my own time",
  links:[{label:"Personal repos on GitHub", url:"https://github.com/nealm682"}],
  tags:["Production AI","SaaS","Full lifecycle"] },

{ id:"app", kind:"hub", cat:"Approach", label:"Approach",
  kicker:"Approach", title:"Six things, and they compound",
  body:"Most people using AI to code are prompting. I'm running a system — six elements, each covering a failure mode of the others.",
  more:"If you asked why I'm measurably better at this than I was a year ago, it isn't one technique. It's six that reinforce each other:\n\n<strong>1 · The harness.</strong> An agent with real filesystem access, connected to the systems the work actually lives in.\n\n<strong>2 · The wiki.</strong> Ground truth and rules, maintained deliberately, so agents start with compounding context.\n\n<strong>3 · Skills.</strong> Repetitive work explained once and executed the same way every time.\n\n<strong>4 · Hooks.</strong> Guarantees that fire whether or not the model cooperates.\n\n<strong>5 · Spec-driven development.</strong> Most of the thinking happens before implementation, in markdown.\n\n<strong>6 · HTML explainers.</strong> Visual artifacts that teach me the material — and prove the agent understood it.\n\nEach one covers something the others miss. The harness fixes the model not seeing the real system. The wiki fixes it starting cold. Skills fix the same task being done differently every time. Hooks fix instructions being ignored. Specs fix ambiguity getting resolved by improvisation. Explainers fix misunderstanding staying invisible until it ships.\n\nProject managers started asking how I produce this much detail. That was the signal it was worth naming rather than just doing.",
  foot:"Harness · wiki · skills · hooks · specs · explainers",
  tags:["Claude Code","Spec-driven","Context engineering"] },

{ id:"cpt", kind:"hub", cat:"Concepts", label:"Concepts",
  kicker:"Concepts", title:"Ideas I'm working out in public",
  body:"The things I'm actively thinking about, written up as I go. Some are load-bearing in production work; some are side-project research that hasn't found its application yet.",
  more:"This branch is the one I expect to grow fastest.\n\nWriting a concept down is how I find out whether I actually understand it. Most of these started as something I built, hit friction with, and only understood properly on the third attempt — which is why the notes include what didn't work rather than just the conclusion.\n\nThe painted-UI research is a genuine side obsession: reproducing the feeling that a screen is being painted live by a model, at near-zero marginal cost per user. This page is a working instance of it.\n\nClick into any of these for the long version.",
  foot:"Expand this branch — each node is a note in progress",
  links:[{label:"painted-ui", url:"https://nealm682.github.io/painted-ui/"}],
  tags:["Research","Notes","Painted UI"] },


]);
