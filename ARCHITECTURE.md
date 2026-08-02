# Architecture

How this site is put together, and where to add things.

---

## Directory

```
nealm682.github.io/
├── index.html                    the shell — markup + the list of content files
├── .nojekyll                     tell GitHub Pages to serve files as-is
│
├── assets/
│   ├── site.css                  homepage styling + design tokens
│   ├── engine.js                 the graph engine — physics, layout, rendering
│   └── notes.css                 styling for the notes section
│
├── content/                      ← EVERYTHING YOU EDIT LIVES HERE
│   ├── 00-identity.js            the line beside your name
│   ├── 10-core.js                the centre node
│   ├── 20-hubs.js                the five primary branches
│   ├── 30-experience.js          one node per role
│   ├── 40-skills.js
│   ├── 50-projects.js
│   ├── 60-approach.js
│   ├── 70-concepts.js
│   └── 71-concepts-painted-ui.js third-layer nodes under "Painted UI"
│
└── notes/                        long-form interactive notes
    ├── index.html                note directory
    └── context-layer/index.html  one note per folder
```

**The rule:** facts live in `content/`. Nothing else needs touching to add or
change what the site says.

---

## How content loads

`index.html` defines a tiny registry, then pulls in each content file with a
plain `<script>` tag:

```html
<script>window.NM = { nodes: [], add: ... , setIdentity: ... };</script>
<script src="content/30-experience.js"></script>
```

Each content file calls `NM.add([...])`. The engine loads last and reads
`NM.nodes`.

Plain script tags rather than `fetch()` on purpose — it means you can
double-click `index.html` and it works from disk. A `fetch`-based loader would
fail on `file://` and force you to run a local server just to preview a typo fix.

---

## Adding content

### A new node on an existing branch

Open the relevant `content/` file, copy an existing entry, change the fields.
That's the whole process.

```js
{ id:"unique-id",          // no spaces, must be unique across all files
  kind:"sub",              // core | hub | sub | leaf
  cat:"Skills",            // drives the colour — see the palette below
  parent:"skl",            // the id this hangs off (not needed for core/hub)
  label:"Shown on canvas", // keep it short, it renders under the node
  kicker:"Skills · Advanced",
  title:"Headline in the reading panel",
  body:"Short read. Types in character by character.",
  more:"Long read. Blank lines with \\n\\n become paragraphs.",
  foot:"small mono line at the bottom — plain text only, no markup",
  links:[{label:"See it live", url:"https://...", primary:true}],  // optional
                    // primary:true renders it filled instead of outlined —
                    // use at most one per node, for the action you most want taken
  video:"YOUTUBE_ID",                                // optional, see below
  videoLabel:"Caption on the thumbnail",             // optional
  tags:["Chip","Chip","Chip"] }
```

### Emphasis

`body` and `more` support `<strong>...</strong>`. Nothing else — no other tags,
no links inside the text (use the `links` array for those).

In `body` the emphasis appears once the type-in animation finishes, since the
text types one character at a time and a half-written tag would show as
literal text. That's handled for you; just write the tag.

`foot`, `label`, and `tags` are plain text and will show markup literally.

### Embedding a demo video

Add `video` with just the YouTube ID — the part after `watch?v=`. So
`https://www.youtube.com/watch?v=zQC594NbBL4` becomes `video:"zQC594NbBL4"`.

It renders as a thumbnail with a play button. The real player only loads when
someone presses it, so the page never pulls YouTube's script or sets
third-party cookies for visitors who don't watch. Switching nodes tears down a
playing video automatically.

Don't also add a "Watch the demo" link — the embed replaces it.

### Embedding a short looping clip

For showing something rather than describing it — a screen recording, a UI in
motion. Silent, autoplaying, repeating, no controls:

```js
loop:"assets/your-clip.mp4",
loopPoster:"assets/your-clip-poster.jpg",
loopLabel:"One line explaining what you're looking at",
```

**Use MP4, not GIF.** A screen recording as a GIF is several times the file
size at half the resolution and 256 colours, which falls apart on this dark
gradient. The wiki clip: 13.7MB source → 0.51MB MP4, versus 1.7MB for a GIF
of only a third the duration at 600px.

To encode a source recording:

```bash
ffmpeg -i source.mp4 -an -vf "scale=960:-2:flags=lanczos,fps=24" \
  -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart \
  assets/your-clip.mp4

ffmpeg -ss 3 -i source.mp4 -frames:v 1 -vf "scale=960:-2" -q:v 4 \
  assets/your-clip-poster.jpg
```

Keep source recordings out of git — `.gitignore` covers `assets/*-source.*`.
Git stores every version of a binary forever, so a large source bloats the
clone permanently even after you delete it.

Under `prefers-reduced-motion` the poster image is shown instead of the video.

### A new branch (a sixth hub)

1. Add the hub to `content/20-hubs.js` with `kind:"hub"` and a new `cat`.
2. Add its colour to `CATS` in `assets/engine.js` (one line, near the top).
3. Create `content/80-yourbranch.js` for its children.
4. Add one `<script src="content/80-yourbranch.js">` line to `index.html`.

The ring auto-spaces — five hubs or eight, the layout divides the circle evenly.

### A third-layer node

Set `kind:"leaf"` and `parent` to any **sub** id. That sub automatically
becomes expandable — clicking it anchors it and fans its leaves out.

`71-concepts-painted-ui.js` is the working example. The same trick works
anywhere: give `adp25` some leaves and the ADP role becomes a branch.

### A new note

Create `notes/your-slug/index.html`, link `../../assets/notes.css`, and add a
card to `notes/index.html`. Then link to it from a node:

```js
links:[{label:"Full note", url:"notes/your-slug/"}]
```

Relative URLs get a `→` arrow and open in place. Absolute `http(s)` URLs to
other hosts get a `↗` and open in a new tab.

---

## Palette

| Category   | Colour    |
|------------|-----------|
| Career     | `#f2f3f5` |
| Experience | `#a8c7fa` |
| Skills     | `#7dd3c0` |
| Projects   | `#ffb77c` |
| Approach   | `#d3bbff` |
| Concepts   | `#f7a8c4` |

---

## The engine, briefly

Not required reading to add content, but useful if you change behaviour.

- **Springs.** Every animated value is a damped harmonic oscillator solved in
  closed form from `(u₀, v₀, t₀)` — no integration, so it's frame-rate
  independent and can be retargeted mid-flight with velocity carrying through.
- **Two motion engines.** Springs own anything with a destination. Time tracks
  own performances where the route *is* the content: `strokeIn`, `typeSet`.
- **Token families.** Spatial properties overshoot, effects properties never do.
  Six tokens per scheme, plus `spatialThrow` for released drags — flagged in
  the code as a deliberate deviation from the six-token vocabulary.
- **Four loops.** Producers mutate state; the renderer samples it and never
  waits.
- **Quiescence.** After idle with everything settled, the render loop stops
  completely. Ambient drift is a budget, not a default.

Layout is three levels: constellation → hub open → sub open. Empty-click steps
out one level; `Escape` goes all the way home.

---

## Lab mode

Visitors see only the zoom control. The FPS/springs HUD and the motion
controls (Expressive/Standard, Live/Still, Repaint) are hidden by default —
they're for demonstrating the engine, not for reading a bio.

Add `?lab` to the URL to reveal them:

```
https://nealm682.github.io/?lab
```

Useful when showing someone the spring physics, the scheme swap, or the
quiescence behaviour. Anything tagged `class="lab"` in `index.html` follows
this switch, so new instrumentation just needs that class.

---

## Local preview

Double-click `index.html`. That's it.

If you'd rather serve it:

```bash
python -m http.server 8000
```

## Deploying

```bash
git add -A && git commit -m "..." && git push
```

Settings → Pages → Source must be **Deploy from a branch**, `main`, `/ (root)`.
If it's set to "GitHub Actions" with no workflow file in the repo, pushes build
nothing and the site silently stays on whatever was published when Pages was
first enabled.

**When you change `assets/site.css` or `assets/engine.js`, bump the `?v=` number
on its `<script>` / `<link>` tag in `index.html`.** Pages caches assets for about
ten minutes and browsers cache them longer, so without the bump a visitor can
load new markup against the old stylesheet — which looks exactly like the change
didn't deploy.

To check what the server is actually serving, open
`https://nealm682.github.io/assets/site.css` directly and search the text. That
distinguishes "not deployed" from "my browser cached it."
