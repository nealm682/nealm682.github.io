/* PROJECTS — three built at work, three built on my own time.
   Edit freely. Each file calls NM.add([...]) and the graph picks it up.
   Node shape: id, kind, cat, parent, label, kicker, title, body, more, foot, tags

   ⚠️ On the work projects: every technical claim about ADP Assist below comes
   from ADP's own published technical whitepaper (linked on the node), not from
   anything internal. Contribution is scoped honestly — these are large systems
   built by many teams. Aetna and Lincoln were client engagements with no
   published material, so they stay at the level of a resume line.
*/

NM.add([

/* ---------- built at work ---------- */

{ id:"assist", kind:"sub", cat:"Projects", label:"ADP Assist", parent:"prj",
  kicker:"Work · 2022 → present · Current",
  title:"ADP's flagship AI assistant",
  body:"Senior Lead Application Developer on ADP Assist — a cross-platform AI assistant spanning payroll, time, talent, benefits, recruitment, analytics and compliance. Built by many teams; I've worked on it across two complete architectural generations.",
  more:"<strong>What it is.</strong> ADP Assist processes natural-language requests, resolves intent and entities against a custom intent engine and HCM ontology, then contextualizes the request by retrieving from domain knowledge, process knowledge, and client-specific data. It assembles an execution plan and carries it out through APIs, with guardrails monitoring every stage. It runs on a combination of foundational and home-grown models, at a scale of 1.1 million clients across 140 countries and 42 million wage earners — close to 20% of the US working population.\n\n<strong>The part I'd actually want to talk about: I've built this product twice.</strong>\n\nThe first version ran on an IBM Watson Assistant backend, and I helped build it — intent-based dialog, 65 conversational agents spanning benefits, payroll, time off, absence management, hiring and pay.\n\nThen we made the call to leave the platform entirely and build our own: an event-driven architecture with agents coded in TypeScript, and LangGraph handling multi-turn flows. That migration is the most instructive thing I've been through professionally. Moving off a managed conversational platform onto your own stack means every convenience it gave you — state, routing, fallback, session handling — becomes something you own and have to get right.\n\nSince the conversion we've worked across several agent frameworks, notably <strong>AWS Strands Agents</strong>: semi-autonomous looping agents driven by prompting and MCP tool building. A representative one I built handles employee profile data — it checks permissions first, resolves which field the user means, asks a clarifying question when intent is ambiguous rather than guessing, retrieves the on-file value through an MCP tool call, and returns it with an edit path.\n\nADP Assist is now being integrated with third-party platforms, including Microsoft Teams.\n\n<strong>Being precise:</strong> ADP Assist is a large product built by many teams across the company. I'm a contributing developer on it, not its author. The product description above comes from ADP's public technical whitepaper.",
  foot:"Watson Assistant → event-driven TypeScript + LangGraph → AWS Strands & MCP",
  video:"K5i9m6VCIfU",
  videoLabel:"ADP Assist in Microsoft Teams",
  links:[{label:"ADP Assist technical whitepaper", url:"https://www.adp.com/-/media/adp/refresh2025/images/what-we-offer/ai-overview/capabilities/adp-assist-technical-whitepaper.pdf"}],
  tags:["AWS Strands","MCP","LangGraph"] },

{ id:"provider", kind:"sub", cat:"Projects", label:"Aetna Provider Search", parent:"prj",
  kicker:"Work · 2021 – 2022",
  title:"Find a doctor, by asking for one",
  body:"Conversational provider search for a health insurer. I was the developer configuring the IBM Watson Assistant backend — so a member could describe the care they needed instead of navigating a directory.",
  more:"<strong>The shape of it.</strong> Watson Assistant handled dialog; behind it sat the part that actually mattered — coded logic and microservice integrations that returned real member data rather than generic content. Structurally a chatbot, but the value was never in the chat. It was in what the backend could reach.\n\n<strong>The constraint that made it interesting: entitlements.</strong> Two members can ask the identical question and be owed different answers. What's in network, what's covered, what a given plan permits — all of it varies per member, so every response had to be resolved against that member's actual coverage before it could be returned. You cannot answer 'find me a cardiologist' generically without being wrong for most of the people asking.\n\n<strong>The NLU underneath.</strong> Intent classification, entity extraction, annotation, and ground truth creation. Members looking for care don't use the categories a provider directory is organized by — they describe a symptom, a location, a plan constraint, or a name they half-remember.\n\nGround truth creation is the least glamorous and most decisive part of that work. A model is only as good as the labelled examples underneath it, and most accuracy problems that look like model problems turn out to be labelling problems.\n\n<strong>The outcome was measured in cost per call.</strong> Every interaction the assistant resolved was one that never reached a human agent.",
  foot:"IBM Watson Assistant · microservice integration · entitlement-aware responses",
  links:[{label:"Aetna's find-a-doctor tool", url:"https://www.aetna.com/individuals-families/find-a-doctor.html"}],
  tags:["Watson Assistant","Healthcare","Entitlements"] },

{ id:"voicebot", kind:"sub", cat:"Projects", label:"Lincoln Voicebot", parent:"prj",
  kicker:"Work · 2020 – 2021",
  title:"Keeping callers off hold",
  body:"Conversational AI UX Designer on the voice agent for Lincoln Financial's life insurance division, built on Google Dialogflow. The goal was blunt: reduce the number of callers who needed a live agent.",
  more:"<strong>The work started with listening.</strong> Not to stakeholders — to calls. I went through transcripts and recordings of real conversations to find out what people were actually phoning about, which is reliably different from what anyone assumes. Call volume is a distribution, and until you know its shape you're guessing at which intents are worth building.\n\nThat listening drove everything downstream: which intents existed at all, where the voice agent was failing, and which handoffs to a human were genuinely necessary versus a design failure.\n\n<strong>Annotation and labelling.</strong> Classification and entity extraction training data, built by hand. Tedious, and the part that determines whether any of it works.\n\n<strong>Designing the phone experience.</strong> I drew a lot of call flows. Voice removes every crutch a screen gives you — no scrollback, no menu, no way to present three options at once and let someone choose. Every ambiguity has to be resolved out loud, in one pass, without exhausting the caller's patience.\n\nThat constraint was the best training I could have had. Clarification paths, graceful failure, confirming before acting — the patterns I rely on in agent design now came directly from voice, where getting them wrong is immediately, audibly obvious.\n\nIt was also the pivot point. I came into this role from the business side and left it building conversational systems.",
  foot:"Google Dialogflow · VUI design · call transcript analysis · annotation",
  tags:["Voice","Dialogflow","Deflection"] },

/* ---------- built on my own time ---------- */

{ id:"edgar", kind:"sub", cat:"Projects", label:"SEC EDGAR Analysis", parent:"prj",
  kicker:"Side project · In development", title:"Buffett-style analysis platform",
  body:"XBRL parsing straight from SEC filings into a nine-category scoring model.",
  more:"Pulls financial data directly from SEC EDGAR filings, parses the XBRL, and scores companies across nine categories in a value-investing frame.\n\nThe hard part isn't the scoring model — it's that filing structure varies wildly between companies and across years. Two firms reporting the same concept will tag it differently, and a parser that works perfectly on one filer will silently produce garbage on the next.\n\nWhich makes it a good exercise in the thing I care about generally: knowing when your pipeline is confidently wrong.",
  foot:"Python · XBRL · in development",
  links:[{label:"Source on GitHub", url:"https://github.com/nealm682/Investor"}],
  tags:["Python","XBRL","SaaS"] },

{ id:"fs", kind:"sub", cat:"Projects", label:"Full Semester", parent:"prj",
  kicker:"Side project · 2025", title:"Full Semester",
  body:"AI edtech tool: syllabus in, colour-coded semester calendar out. Founder.",
  more:"Extracts every date and deliverable from unstructured course syllabi and writes them into Google Calendar, colour-coded by class, as a single chronological master list.\n\nThe insight was that students lose points to logistics rather than difficulty — the assignment they forgot, not the one they couldn't do. The extraction problem is genuinely hard, because a syllabus is a document format with no format.\n\nFounded and built it; it didn't reach sustainable traction. Worth including precisely because it didn't.",
  foot:"Python · React · Google Calendar API · site retired",
  video:"3DEZBDiCjxM",
  videoLabel:"Full Semester — walkthrough",
  tags:["Python","React","EdTech"] },

{ id:"pt", kind:"sub", cat:"Projects", label:"Premium Tracker", parent:"prj",
  kicker:"Side project · Live", title:"Premium Tracker",
  body:"Google Workspace Marketplace add-on for options traders. Taken through full marketplace approval.",
  more:"A Workspace add-on that tracks options premium for traders, live at getpremiumtracker.com.\n\nThe build was the easy half. The other half — OAuth scopes, verification, privacy policy, security assessment, and Marketplace review — is the part that turns a working script into something a stranger can install. It is tedious, it is where most side projects die, and doing it once end-to-end is worth more than three more prototypes.",
  foot:"Google Workspace · OAuth · live on the Marketplace",
  video:"zQC594NbBL4",
  videoLabel:"Premium Tracker — walkthrough",
  links:[
    {label:"Install from Google Workspace Marketplace", url:"https://workspace.google.com/marketplace/app/premium_tracker/87170287711"},
    {label:"getpremiumtracker.com", url:"https://getpremiumtracker.com"}
  ],
  tags:["Workspace","OAuth","Fintech"] },


]);
