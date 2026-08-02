/* ============================================================
   PAINTED CAREER MAP — engine
   No facts live in this file. Content is in content/*.js.

   Motion ported from the painted-ui wiki:
     techniques/motion-physics.md — analytic damped springs, spatial vs
       effects families, the six-token table (+ spatialThrow, documented below)
     concepts/four-loops.md       — producers mutate, the renderer samples
     concepts/client-side-compositing.md — canvas, never waits
   ============================================================ */

(function () {
"use strict";

var CATS = {
  Career:     "#f2f3f5",
  Experience: "#a8c7fa",
  Skills:     "#7dd3c0",
  Projects:   "#ffb77c",
  Approach:   "#d3bbff",
  Concepts:   "#f7a8c4"
};

var NODES = window.NM.nodes;
var IDENTITY = window.NM.identity || { role: "" };
var HUBS = NODES.filter(function (n) { return n.kind === "hub"; });
var BY_ID = {};
NODES.forEach(function (n) { BY_ID[n.id] = n; });

/* ============================================================
   1 · MOTION — analytic damped springs
   painted-ui wiki/techniques/motion-physics.md
   Spatial overshoots. Effects never does.
   ============================================================ */

/* Six tokens per scheme is the published vocabulary — plus one extension.
   spatialThrow exists because the six were solved to settle at Material's
   durations for *state changes*, where displacement dominates and release
   velocity is negligible. A thrown object is not a state change: it's a
   release into free motion, and at spatialSlow stiffness a hard flick lands
   only ~24px past rest versus ~8px for a gentle drop — the throw reads as
   the same animation either way. Softening it to (0.52, 76) makes the same
   two gestures land 86px and 18px apart, so velocity becomes visible.
   Flagged as a deviation, not folded in silently. */
var SCHEMES = {
  expressive: {
    spatialFast:    { z: 0.72, k: 462  },
    spatialDefault: { z: 0.68, k: 371  },
    spatialSlow:    { z: 0.65, k: 233  },
    spatialThrow:   { z: 0.52, k: 76   },
    effectsFast:    { z: 1.00, k: 3192 },
    effectsDefault: { z: 1.00, k: 1806 },
    effectsSlow:    { z: 1.00, k: 798  }
  },
  standard: {
    spatialFast:    { z: 0.90, k: 281  },
    spatialDefault: { z: 0.90, k: 138  },
    spatialSlow:    { z: 0.90, k: 60   },
    spatialThrow:   { z: 0.85, k: 76   },
    effectsFast:    { z: 1.00, k: 3192 },
    effectsDefault: { z: 1.00, k: 1806 },
    effectsSlow:    { z: 1.00, k: 798  }
  }
};

var REDUCED = window.matchMedia &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var schemeName = "expressive";
var ambient = !REDUCED;

function tok(name) {
  var t = SCHEMES[schemeName][name];
  if (REDUCED) return { z: 1.0, k: t.k * 2.2 };
  return t;
}

function Spring(value, eps) {
  this.target = value; this.u0 = 0; this.vel0 = 0; this.t0 = 0;
  this.tokName = "spatialDefault"; this.settled = true;
  this.eps = eps || 0.02; this._v = value;
}

Spring.prototype.eval = function (now) {
  if (this.settled) return { value: this.target, vel: 0 };
  var t = (now - this.t0) / 1000;
  var p = tok(this.tokName), w0 = Math.sqrt(p.k), z = p.z, u, v;
  if (z < 1) {
    var wd = w0 * Math.sqrt(1 - z * z);
    var A = this.u0, B = (this.vel0 + z * w0 * this.u0) / wd;
    var E = Math.exp(-z * w0 * t);
    u = E * (A * Math.cos(wd * t) + B * Math.sin(wd * t));
    v = E * ((B * wd - z * w0 * A) * Math.cos(wd * t) -
             (A * wd + z * w0 * B) * Math.sin(wd * t));
  } else {
    var c = this.vel0 + w0 * this.u0, Ec = Math.exp(-w0 * t);
    u = (this.u0 + c * t) * Ec;
    v = Ec * (c - w0 * (this.u0 + c * t));
  }
  return { value: this.target + u, vel: v };
};

/* Retarget: velocity carries through. Never snaps, never queues. */
Spring.prototype.to = function (target, tokName, now) {
  if (this.settled && Math.abs(this.target - target) < this.eps) {
    this.target = target; return;
  }
  var s = this.eval(now);
  this.u0 = s.value - target;
  this.vel0 = s.vel;
  this.target = target;
  this.tokName = tokName;
  this.t0 = now;
  this.settled = false;
};

Spring.prototype.snap = function (v) {
  this.target = v; this.u0 = 0; this.vel0 = 0; this.settled = true; this._v = v;
};

Spring.prototype.sample = function (now) {
  if (this.settled) { this._v = this.target; return this._v; }
  var s = this.eval(now);
  if (Math.abs(s.value - this.target) < this.eps && Math.abs(s.vel) < this.eps * 12) {
    this.settled = true; this._v = this.target;
  } else { this._v = s.value; }
  return this._v;
};

/* Time tracks — performances, not targets. strokeIn / typeSet. */
function trackP(t0, dur, now) {
  if (dur <= 0) return 1;
  var p = (now - t0) / dur;
  return p < 0 ? 0 : p > 1 ? 1 : p;
}
function easeOutCubic(p) { var f = 1 - p; return 1 - f * f * f; }

/* ============================================================
   2 · SCENE STATE
   ============================================================ */

var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var W = 0, H = 0, DPR = 1;

/* COMPACT — the responsive design decision, not just a size tweak.
   On a small stage the constellation shows only the core and the five hubs.
   Sub-nodes appear when you open their branch. Six large targets beat
   twenty-five small ones; the depth is still there, it's just one tap in. */
var COMPACT = false;
function updateCompact() {
  COMPACT = Math.min(W, H) < 520;
}

NODES.forEach(function (n, i) {
  n.x = new Spring(0, 0.05);
  n.y = new Spring(0, 0.05);
  n.r = new Spring(0, 0.05);
  n.alpha = new Spring(0, 0.002);
  n.corner = new Spring(1, 0.002);
  n.squish = new Spring(0, 0.002);
  n.glow = new Spring(0, 0.002);
  n.bornAt = 0;
  /* ambient drift — deterministic per node, evaluated closed-form at draw time.
     Never touches spring state, so retargeting stays exact. */
  n.ph = (i * 2.399963) % 6.2831853;
  n.sp = 0.22 + ((i * 37) % 13) / 42;
});

var EDGES = [];
NODES.forEach(function (n) {
  if (n.kind === "hub") EDGES.push({ a: "neal", b: n.id });
  else if (n.parent && BY_ID[n.parent]) EDGES.push({ a: n.parent, b: n.id });
});
EDGES.forEach(function (e) { e.alpha = new Spring(0, 0.002); e.bornAt = 0; });

var scene = {
  focus: null, selected: "neal", hover: null, pressed: null,
  drag: null,
  quiesced: false, lastInput: 0
};

/* ============================================================
   3 · LAYOUT — targets only. Springs travel.
   ============================================================ */

function layout(now, immediate) {
  var cx = W * 0.5, cy = H * 0.5;
  var unit = Math.min(W, H);
  var S = "spatialDefault";

  /* On a phone the stage is small, so proportional sizing produced 5px nodes.
     Radii get a boost and a floor below ~520px so every node stays a real
     target rather than something you have to zoom in to hit. */
  var BOOST = unit < 520 ? 1.5 : 1;
  function R(frac, floor) {
    return Math.max(unit * frac * BOOST, (floor || 0) * (BOOST > 1 ? 1 : 0));
  }

  var f = scene.focus ? BY_ID[scene.focus] : null;

  if (COMPACT && !f) {
    /* ---- small screen, level 0: core in the middle, hubs on a compass ---- */
    put(BY_ID.neal, cx, cy, unit * 0.085, 1, 1, S);
    compassRing(HUBS, cx, cy, unit * 0.070, S);
    HUBS.forEach(function (h) {
      var subs = childrenOf(h.id);
      park(subs, h.homeX, h.homeY, S);
      subs.forEach(function (s) { park(childrenOf(s.id), h.homeX, h.homeY, S); });
    });

  } else if (!f) {
    /* ---- level 0: constellation ---- */
    var ring = unit * (BOOST > 1 ? 0.255 : 0.225);
    put(BY_ID.neal, cx, cy, R(0.055, 26), 1, 1, S);

    HUBS.forEach(function (h, i) {
      var a = (i / HUBS.length) * Math.PI * 2 - Math.PI / 2;
      var hx = cx + Math.cos(a) * ring;
      var hy = cy + Math.sin(a) * ring * 0.96;
      put(h, hx, hy, COMPACT ? unit * 0.072 : R(0.036, 17), 1, 1, S);

      var subs = childrenOf(h.id);

      /* subs: wide arc, alternating orbit radius so labels never stack */
      subs.forEach(function (s, j) {
        var t = subs.length === 1 ? 0 : (j / (subs.length - 1)) - 0.5;
        var sa = a + t * 1.2;
        var sr = ring * (0.52 + (j % 2) * 0.26);
        var sx = hx + Math.cos(sa) * sr, sy = hy + Math.sin(sa) * sr * 0.96;
        put(s, sx, sy, R(0.016, 10), 0.64, 1, S);
        /* leaves park inside their parent until that branch is opened */
        park(childrenOf(s.id), sx, sy, S);
      });
    });

  } else if (f.kind === "hub") {
    /* ---- level 1: a hub is open ---- */
    var ax = COMPACT ? cx : W * 0.44, ay = COMPACT ? cy : H * 0.5;
    put(BY_ID.neal, W * 0.09, H * 0.10, unit * 0.019, COMPACT ? 0 : 0.40, 1, S);
    put(f, ax, ay, COMPACT ? unit * 0.072 : unit * 0.055, 1, 0.34, S);

    if (COMPACT) {
      /* the open hub sits centre-stage, its children on the compass around it */
      compassRing(childrenOf(f.id), ax, ay, unit * 0.058, S);
    } else {
      fan(childrenOf(f.id), ax, ay, unit * 0.27, R(0.026, 15), S, true);
    }

    /* other hubs retreat — a vertical rail on desktop, gone entirely on a
       phone where the nav strip already covers getting back */
    HUBS.filter(function (h) { return h.id !== f.id; })
        .forEach(function (h, i) {
      var oy = COMPACT ? H * 0.06 : H * (0.30 + i * 0.135);
      var ox = COMPACT ? W * 0.5 : W * 0.075;
      put(h, ox, oy, COMPACT ? unit * 0.002 : unit * 0.013, COMPACT ? 0 : 0.40, 1, "spatialFast");
      childrenOf(h.id).forEach(function (s) {
        put(s, ox, oy, unit * 0.003, 0, 1, "spatialFast");
        park(childrenOf(s.id), ox, oy, "spatialFast");
      });
    });

  } else {
    /* ---- level 2: a sub is open, its leaves fan out ---- */
    var hub = BY_ID[f.parent];
    var bx = COMPACT ? cx : W * 0.46, by = COMPACT ? cy : H * 0.5;

    put(BY_ID.neal, W * 0.085, H * 0.085, unit * 0.014, COMPACT ? 0 : 0.28, 1, S);
    if (hub) put(hub, COMPACT ? cx : W * 0.10, COMPACT ? cy : H * 0.20,
                 unit * (COMPACT ? 0.002 : 0.024), COMPACT ? 0 : 0.55, 1, S);
    put(f, bx, by, unit * (COMPACT ? 0.070 : 0.050), 1, 0.34, S);

    if (COMPACT) {
      /* same compass treatment one level down — the nav strip carries the
         way back, so nothing else needs to be on screen competing for taps */
      compassRing(childrenOf(f.id), bx, by, unit * 0.055, S);
    } else {
      fan(childrenOf(f.id), bx, by, unit * 0.26, R(0.024, 14), S, true);
    }

    /* sibling subs stay reachable in a column under the parent hub — on a
       phone they'd crowd the open branch, so the nav strip carries them */
    var sibs = hub ? childrenOf(hub.id).filter(function (s) { return s.id !== f.id; }) : [];
    sibs.forEach(function (s, i) {
      var sy = COMPACT ? H * 0.08 : H * (0.38 + i * 0.115);
      var sx = COMPACT ? W * 0.14 : W * 0.10;
      put(s, sx, sy, COMPACT ? unit * 0.002 : unit * 0.014, COMPACT ? 0 : 0.42, 1, "spatialFast");
      park(childrenOf(s.id), sx, sy, "spatialFast");
    });

    /* everything on other branches folds away entirely */
    HUBS.filter(function (h) { return !hub || h.id !== hub.id; })
        .forEach(function (h) {
      put(h, W * 0.05, H * 0.06, unit * 0.002, 0, 1, "spatialFast");
      childrenOf(h.id).forEach(function (s) {
        put(s, W * 0.05, H * 0.06, unit * 0.002, 0, 1, "spatialFast");
        park(childrenOf(s.id), W * 0.05, H * 0.06, "spatialFast");
      });
    });
  }

  function park(list, x, y, tk) {
    list.forEach(function (n) { put(n, x, y, unit * 0.002, 0, 1, tk); });
  }

  /* Compass ring — maximum angular separation for a small set of nodes.
     Four children land exactly N/E/S/W, five make a pentagon, three a
     triangle. The ellipse is fitted to the stage so the ring uses the full
     width on a phone rather than inscribing a circle in the short side. */
  function compassRing(list, cx0, cy0, rNode, tk) {
    if (!list.length) return;
    var padX = rNode + 46, padY = rNode + 40;
    var rx = Math.max(56, Math.min(W * 0.5 - padX, unit * 0.46));
    var ry = Math.max(50, Math.min(H * 0.5 - padY, unit * 0.46));
    list.forEach(function (s, j) {
      var a = -Math.PI / 2 + (j / list.length) * Math.PI * 2;
      var x = cx0 + Math.cos(a) * rx, y = cy0 + Math.sin(a) * ry;
      put(s, x, y, rNode, 1, 1, tk);
      park(childrenOf(s.id), x, y, tk);
    });
  }

  function fan(list, ax, ay, R, r, tk, wide) {
    var arc = Math.PI * (wide ? 0.88 : 0.7);
    list.forEach(function (s, j) {
      var t = list.length === 1 ? 0.5 : j / (list.length - 1);
      var a = -arc / 2 + t * arc;
      var x = ax + Math.cos(a) * R * 1.02, y = ay + Math.sin(a) * R;
      put(s, x, y, r, 1, 1, tk);
      park(childrenOf(s.id), x, y, tk);
    });
  }

  /* Keep every target inside the (now narrower) stage, with room for the
     label underneath and for spatial overshoot past the target. */
  function clampX(x, r) {
    var pad = r + 46;
    return Math.max(pad, Math.min(W - pad, x));
  }
  function clampY(y, r) {
    var pad = r + 30;
    return Math.max(pad, Math.min(H - pad - 18, y));
  }

  function put(n, x, y, r, alpha, corner, tk) {
    x = clampX(x, r); y = clampY(y, r);
    /* remembered so a dragged node knows where home is */
    n.homeX = x; n.homeY = y; n.homeR = r;
    if (immediate) {
      n.x.snap(x); n.y.snap(y); n.r.snap(r); n.corner.snap(corner); n.alpha.snap(0);
      return;
    }
    n.x.to(x, tk, now);
    n.y.to(y, tk, now);
    n.r.to(r, tk, now);
    n.corner.to(corner, "spatialSlow", now);
    n.alpha.to(alpha, "effectsDefault", now);
  }
}

function childrenOf(id) {
  return NODES.filter(function (n) { return n.parent === id; });
}

/* ============================================================
   4 · PAINT-IN
   ============================================================ */

function repaint(now) {
  var order = ["neal"].concat(HUBS.map(function (h) { return h.id; }));
  NODES.forEach(function (n) {
    var idx = order.indexOf(n.id);
    n.bornAt = now + (idx >= 0 ? idx * 85 : 560 + Math.random() * 420);
    n.alpha.snap(0);
  });
  EDGES.forEach(function (e) {
    e.bornAt = now + 300 + Math.random() * 500;
    e.alpha.snap(0);
  });
  layout(now, false);
}

/* ============================================================
   5 · RENDER LOOP
   ============================================================ */

var frames = 0, fpsAt = 0, rafId = null;
var elFps = document.getElementById("h-fps");
var elSprings = document.getElementById("h-springs");
var elState = document.getElementById("h-state");

function resize() {
  var rect = canvas.parentNode.getBoundingClientRect();
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = rect.width; H = rect.height;
  canvas.width = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  updateCompact();
  layout(performance.now(), false);
  renderNav();
  wake();
}

function frame(now) {
  rafId = null;
  var live = 0;

  NODES.forEach(function (n) {
    n._x = n.x.sample(now); n._y = n.y.sample(now); n._r = n.r.sample(now);
    n._a = n.alpha.sample(now); n._c = n.corner.sample(now);
    n._s = n.squish.sample(now); n._g = n.glow.sample(now);
    if (!n.x.settled) live++; if (!n.y.settled) live++; if (!n.r.settled) live++;
    if (!n.alpha.settled) live++; if (!n.corner.settled) live++;
    if (!n.squish.settled) live++; if (!n.glow.settled) live++;
  });
  EDGES.forEach(function (e) {
    e._a = e.alpha.sample(now);
    if (!e.alpha.settled) live++;
  });

  var performing = false;
  NODES.forEach(function (n) {
    if (now >= n.bornAt && n.alpha.target === 0 && n.alpha.settled) {
      var want = targetAlphaFor(n);
      if (want > 0) n.alpha.to(want, "effectsDefault", now);
    }
    n._stroke = trackP(n.bornAt, 480, now);
    if (n._stroke < 1 && now >= n.bornAt) performing = true;
  });
  EDGES.forEach(function (e) {
    if (now >= e.bornAt && e.alpha.target === 0 && e.alpha.settled) {
      e.alpha.to(edgeAlphaFor(e), "effectsSlow", now);
    }
    e._stroke = trackP(e.bornAt, 700, now);
    if (e._stroke < 1 && now >= e.bornAt) performing = true;
  });

  var typing = typeSetStep(now);
  var flying = camStep(now);        /* camera reset is a performance too */
  draw(now);

  frames++;
  if (now - fpsAt > 500) {
    elFps.textContent = Math.round(frames * 1000 / (now - fpsAt));
    elSprings.textContent = live;
    frames = 0; fpsAt = now;
  }

  /* Quiescence — ambient motion is budgeted, not unconditional.
     Idle long enough with everything settled and the loop truly stops. */
  var idle = now - scene.lastInput;
  var idleLimit = ambient ? 14000 : 1400;
  if (live === 0 && !performing && !typing && !flying && idle > idleLimit) {
    scene.quiesced = true;
    elState.textContent = "quiesced · 0 fps";
    elState.className = "state quiesced";
    elSprings.textContent = "0";
    return;
  }

  elState.textContent = performing || typing || flying ? "painting"
                      : live ? "settling"
                      : ambient ? "live · ambient" : "live";
  elState.className = "state";
  rafId = requestAnimationFrame(frame);
}

function wake() {
  scene.lastInput = performance.now();
  if (scene.quiesced) { scene.quiesced = false; fpsAt = performance.now(); frames = 0; }
  if (rafId === null) rafId = requestAnimationFrame(frame);
}

function targetAlphaFor(n) {
  var f = scene.focus ? BY_ID[scene.focus] : null;

  if (!f) {                                   /* constellation */
    if (n.kind === "leaf") return 0;
    /* small screen: only the core and the hubs — six big targets */
    if (n.kind === "sub") return COMPACT ? 0 : 0.64;
    return 1;
  }

  if (f.kind === "hub") {                     /* a hub is open */
    if (n.kind === "leaf") return 0;
    if (n.id === f.id || n.parent === f.id) return 1;
    if (COMPACT) return 0;                    /* nothing else competes for taps */
    if (n.id === "neal") return 0.40;
    if (n.kind === "hub") return 0.40;
    return 0;
  }

  /* a sub is open */
  if (n.id === f.id) return 1;
  if (n.parent === f.id) return 1;             /* its leaves */
  if (n.id === f.parent) return COMPACT ? 0 : 0.55;   /* the parent hub */
  if (COMPACT) return 0;
  if (n.kind === "sub" && n.parent === f.parent) return 0.42;  /* siblings */
  if (n.id === "neal") return 0.28;
  return 0;
}

function edgeAlphaFor(e) {
  var f = scene.focus;
  if (!f) {
    /* leaf edges stay dark until their branch opens */
    return BY_ID[e.b].kind === "leaf" ? 0 : 0.18;
  }
  if (e.a === f || e.b === f) return 0.32;
  var va = targetAlphaFor(BY_ID[e.a]), vb = targetAlphaFor(BY_ID[e.b]);
  return (va > 0.2 && vb > 0.2) ? 0.10 : 0;
}

/* which node should a click open? */
function focusTargetFor(n) {
  if (n.kind === "core") return null;
  if (n.kind === "hub")  return scene.focus === n.id ? null : n.id;
  if (n.kind === "sub")  return childrenOf(n.id).length ? n.id : n.parent;
  return n.parent;                             /* leaf: stay where we are */
}

/* one level out, rather than all the way home */
function stepUp() {
  var f = scene.focus ? BY_ID[scene.focus] : null;
  if (!f) return null;
  if (f.kind === "sub") return f.parent;
  return null;
}

/* ============================================================
   6 · PAINTER
   ============================================================ */

/* ambient offsets — closed-form, render-time only.
   Suppressed on the node under the cursor's control: a held node
   should feel attached to the hand, not still breathing. */
function held(n) { return scene.drag && scene.drag.id === n.id; }

function driftX(n, now) {
  if (!ambient || held(n)) return 0;
  var amp = n.kind === "sub" ? 3.6 : n.kind === "hub" ? 2.4 : 1.6;
  return Math.sin(now * 0.001 * n.sp + n.ph) * amp;
}
function driftY(n, now) {
  if (!ambient || held(n)) return 0;
  var amp = n.kind === "sub" ? 3.0 : n.kind === "hub" ? 2.0 : 1.3;
  return Math.cos(now * 0.001 * n.sp * 0.78 + n.ph * 1.7) * amp;
}
function breath(n, now) {
  if (!ambient || held(n)) return 1;
  return 1 + Math.sin(now * 0.001 * 0.44 + n.ph) * 0.014;
}

function draw(now) {
  ctx.clearRect(0, 0, W, H);

  var g = ctx.createRadialGradient(W * 0.5, H * 0.46, 0,
                                   W * 0.5, H * 0.46, Math.max(W, H) * 0.62);
  g.addColorStop(0, "rgba(60,72,102,0.20)");
  g.addColorStop(1, "rgba(14,15,19,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  NODES.forEach(function (n) {
    n._dx = n._x + driftX(n, now);
    n._dy = n._y + driftY(n, now);
  });

  /* Camera applies here and nowhere else. Everything below is drawn in world
     coordinates, so zoom and pan cannot perturb layout or any spring in flight. */
  ctx.save();
  ctx.translate(cam.x, cam.y);
  ctx.scale(cam.s, cam.s);

  /* edges — strokeIn is a scripted path, so a time track owns it */
  EDGES.forEach(function (e) {
    if (e._a < 0.01) return;
    var a = BY_ID[e.a], b = BY_ID[e.b];
    var p = easeOutCubic(e._stroke);
    var x1 = a._dx, y1 = a._dy;
    var x2 = x1 + (b._dx - x1) * p, y2 = y1 + (b._dy - y1) * p;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 - 14, x2, y2);
    ctx.strokeStyle = hexA(CATS[b.cat], e._a);
    ctx.lineWidth = b.kind === "hub" ? 1.5 : 1;
    ctx.stroke();
  });

  NODES.forEach(function (n) {
    if (n._a < 0.012 || n._r < 0.4) return;
    var col = CATS[n.cat];
    var sel = scene.selected === n.id, hov = scene.hover === n.id;
    var bs = breath(n, now);
    var sq = n._s;
    var rx = n._r * bs * (1 + sq * 0.16);
    var ry = n._r * bs * (1 - sq * 0.14);
    var radius = Math.min(rx, ry) * n._c;

    if (n._g > 0.01) {
      var gg = ctx.createRadialGradient(n._dx, n._dy, 0, n._dx, n._dy, rx * 3.1);
      gg.addColorStop(0, hexA(col, 0.20 * n._g));
      gg.addColorStop(1, hexA(col, 0));
      ctx.fillStyle = gg;
      ctx.fillRect(n._dx - rx * 3.1, n._dy - rx * 3.1, rx * 6.2, rx * 6.2);
    }

    ctx.beginPath();
    roundedRect(ctx, n._dx - rx, n._dy - ry, rx * 2, ry * 2, radius);
    ctx.fillStyle = hexA(col, n._a * (sel ? 0.26 : hov ? 0.17 : 0.10));
    ctx.fill();

    var sp = easeOutCubic(n._stroke);
    ctx.beginPath();
    if (sp >= 0.999) roundedRect(ctx, n._dx - rx, n._dy - ry, rx * 2, ry * 2, radius);
    else ctx.arc(n._dx, n._dy, Math.max(rx, ry), -Math.PI / 2, -Math.PI / 2 + sp * 6.2831853);
    ctx.strokeStyle = hexA(col, n._a * (sel ? 1 : 0.68));
    ctx.lineWidth = sel ? 2.2 : n.kind === "sub" ? 1.1 : 1.6;
    ctx.lineCap = "round";
    ctx.stroke();

    /* label — suppressed on retreated nodes so nothing ever overlaps.
       Threshold is scale-aware: a node too small to label at 1× becomes
       labellable once you've zoomed into it. */
    if (n._r * cam.s > 8 && n._a > 0.34) {
      var fs = n.kind === "core" ? 13.5 : n.kind === "hub" ? 12 : 10.5;
      ctx.font = ((n.kind === "sub" || n.kind === "leaf") ? "500 " : "600 ") + fs +
                 "px 'Space Grotesk', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = hexA(sel || hov ? "#ffffff" : col, n._a * (sel ? 1 : 0.80));
      ctx.fillText(n.label, n._dx, n._dy + ry + 9);
    }
  });

  /* ?lab: draw the actual tap targets, so hit-testing is visible rather than
     guessed at. If a ring doesn't sit under the node you're aiming for, the
     bug is here and not in your finger. */
  if (document.body.classList.contains("lab")) {
    NODES.forEach(function (n) {
      if (n._a < 0.15 || n._r < 3) return;
      ctx.beginPath();
      ctx.arc(n._dx, n._dy, n._r + padFor(n), 0, 6.2831853);
      ctx.strokeStyle = "rgba(125,211,192,0.28)";
      ctx.lineWidth = 1 / cam.s;
      ctx.setLineDash([3 / cam.s, 3 / cam.s]);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  ctx.restore();
}

function roundedRect(c, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function hexA(hex, a) {
  var n = parseInt(hex.replace("#", ""), 16);
  return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) +
         "," + Math.max(0, Math.min(1, a)).toFixed(3) + ")";
}

/* ============================================================
   7 · PANELS
   ============================================================ */

var dKicker = document.getElementById("d-kicker");
var dTitle  = document.getElementById("d-title");
var dBody   = document.getElementById("d-body");
var dChips  = document.getElementById("d-chips");
var detail  = document.getElementById("detail");
var dLong   = document.getElementById("d-long");
var dVideo  = document.getElementById("d-video");
var dLinks  = document.getElementById("d-links");

/* Demo videos load on click, not on render. A node with `video: "<id>"`
   shows a thumbnail; pressing play swaps in the real player. Nothing from
   YouTube is fetched until someone actually wants to watch. */
function renderVideo(n) {
  if (!dVideo) return;
  dVideo.innerHTML = "";
  if (n.loop) dVideo.appendChild(loopClip(n));
  if (n.video) dVideo.appendChild(ytFacade(n));
}

/* A short silent clip that plays inline and repeats — for showing a thing
   rather than describing it. Encoded as MP4 rather than GIF: a screen
   recording as a GIF is several times the size at half the resolution and
   256 colours, which falls apart on a dark gradient. */
function loopClip(n) {
  var fig = document.createElement("figure");
  fig.className = "clip";

  if (REDUCED) {
    /* reduced-motion: the still frame carries the same information */
    var im = document.createElement("img");
    im.src = n.loopPoster || "";
    im.alt = n.loopLabel || "";
    fig.appendChild(im);
  } else {
    var v = document.createElement("video");
    v.src = n.loop;
    if (n.loopPoster) v.poster = n.loopPoster;
    v.loop = true;
    v.muted = true;            /* property AND attribute — iOS needs both */
    v.setAttribute("muted", "");
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("preload", "metadata");
    v.autoplay = true;
    v.addEventListener("loadeddata", function () {
      var p = v.play();
      if (p && p.catch) p.catch(function () {
        v.controls = true;     /* autoplay refused — let them press it */
      });
    });
    fig.appendChild(v);
  }

  if (n.loopLabel) {
    var cap = document.createElement("figcaption");
    cap.textContent = n.loopLabel;
    fig.appendChild(cap);
  }
  return fig;
}

function ytFacade(n) {
  var facade = document.createElement("button");
  facade.className = "vfacade";
  facade.type = "button";
  facade.setAttribute("aria-label", "Play the demo video for " + n.label);

  var img = document.createElement("img");
  img.alt = "";
  img.loading = "lazy";
  img.src = "https://i.ytimg.com/vi/" + n.video + "/maxresdefault.jpg";
  img.onerror = function () {          /* not every upload has a maxres still */
    img.onerror = null;
    img.src = "https://i.ytimg.com/vi/" + n.video + "/hqdefault.jpg";
  };

  var play = document.createElement("span");
  play.className = "vplay";
  play.innerHTML = '<svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true">' +
                   '<path d="M1 1.8v16.4a1 1 0 0 0 1.52.85l13.4-8.2a1 1 0 0 0 0-1.7L2.52.95A1 1 0 0 0 1 1.8z" ' +
                   'fill="#fff"/></svg>';

  var cap = document.createElement("span");
  cap.className = "vcap";
  cap.textContent = n.videoLabel || "Watch the demo";

  facade.appendChild(img);
  facade.appendChild(play);
  facade.appendChild(cap);

  facade.addEventListener("click", function () {
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + n.video +
            "?autoplay=1&rel=0&modestbranding=1";
    f.title = (n.videoLabel || "Demo") + " — " + n.label;
    f.setAttribute("frameborder", "0");
    f.setAttribute("allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    f.allowFullscreen = true;
    dVideo.innerHTML = "";
    dVideo.appendChild(f);
  });

  /* MUST return the element — renderVideo appends it. Returning undefined
     here threw inside showNode, which silently aborted the rest of the
     function and left the previous node's links and chips on screen. */
  return facade;
}
var dFoot   = document.getElementById("d-foot");
var dScroll = document.getElementById("d-scroll");

document.getElementById("ident-role").innerHTML = IDENTITY.role;

var typeState = { full: "", shown: 0, t0: 0, cps: 1000 };

function showNode(id, now) {
  var n = BY_ID[id];
  if (!n) return;
  var col = CATS[n.cat];

  /* Clear every panel region up front. If anything below throws, the card
     shows an incomplete node rather than a mix of two — a silent partial
     render is much harder to spot than a missing section. */
  dLinks.innerHTML = "";
  dChips.innerHTML = "";
  if (dVideo) dVideo.innerHTML = "";

  detail.style.setProperty("--accent-live", col);
  dKicker.textContent = n.kicker;
  dTitle.textContent = n.title;

  /* The body types in one character at a time via textContent, so any markup
     in it would appear as literal text mid-type. Type the stripped version,
     then swap in the marked-up version the moment typing finishes. */
  typeState.rich  = n.body || "";
  typeState.full  = stripTags(typeState.rich);
  typeState.shown = 0;
  typeState.done  = false;
  typeState.t0    = now;

  dLong.innerHTML = escapeButBold(n.more || "");
  dFoot.textContent = n.foot || "";
  renderVideo(n);          /* also tears down a playing iframe on node change */
  dScroll.scrollTop = 0;

  /* effects family: opacity never overshoots */
  [dLong, dFoot].forEach(function (el) {
    el.style.transition = "none";
    el.style.opacity = "0";
  });
  requestAnimationFrame(function () {
    [dLong, dFoot].forEach(function (el) {
      el.style.transition = REDUCED ? "none" : "opacity .42s ease .12s";
      el.style.opacity = "1";
    });
  });

  /* outbound links — anything already hosted elsewhere */
  dLinks.innerHTML = "";
  (n.links || []).forEach(function (l, i) {
    var a = document.createElement("a");
    a.className = "golink";
    a.href = l.url;
    a.textContent = l.label;
    var external = /^https?:/i.test(l.url) && l.url.indexOf(location.host) === -1;
    if (external) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    if (l.primary) {
      /* one filled button per node, for the action you actually want taken */
      a.className = "golink primary";
      a.style.background = col;
      a.style.borderColor = col;
      a.style.color = "#0e0f13";
    } else {
      a.style.borderColor = hexA(col, 0.38);
      a.style.color = col;
    }
    a.innerHTML = escapeButBold(l.label) +
      '<span class="arr">' + (external ? "↗" : "→") + "</span>";
    dLinks.appendChild(a);
    setTimeout(function () {
      a.style.transition = REDUCED ? "none"
        : "opacity .3s ease, transform .3s cubic-bezier(.2,.8,.2,1)";
      a.style.opacity = "1";
      a.style.transform = "translateY(0)";
    }, REDUCED ? 0 : 300 + i * 60);
  });

  dChips.innerHTML = "";
  n.tags.forEach(function (t, i) {
    var el = document.createElement("span");
    el.className = "chip";
    el.textContent = t;
    el.style.borderColor = hexA(col, 0.34);
    el.style.color = col;
    dChips.appendChild(el);
    setTimeout(function () {
      el.style.transition = REDUCED ? "none"
        : "opacity .34s ease, transform .34s cubic-bezier(.2,.8,.2,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, REDUCED ? 0 : 200 + i * 55);
  });
}

function escapeButBold(s) {
  return s.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;").replace(/>/g, "&gt;")
          .replace(/&lt;strong&gt;/g, "<strong>")
          .replace(/&lt;\/strong&gt;/g, "</strong>");
}

function stripTags(s) { return (s || "").replace(/<[^>]+>/g, ""); }

function typeSetStep(now) {
  var full = typeState.full;
  if (!full) return false;
  if (typeState.shown >= full.length) {
    if (!typeState.done) {
      /* typing finished — render the real markup */
      dBody.innerHTML = escapeButBold(typeState.rich);
      typeState.done = true;
    }
    detail.style.setProperty("--caret", "0");
    return false;
  }
  var target = REDUCED ? full.length
                       : Math.floor(((now - typeState.t0) / 1000) * typeState.cps);
  typeState.shown = Math.min(full.length, Math.max(0, target));
  dBody.textContent = full.slice(0, typeState.shown);
  detail.style.setProperty("--caret", "1");
  return typeState.shown < full.length;
}

/* ============================================================
   8 · INPUT — clicks are messages
   ============================================================ */

/* A finger is about 9mm across and a mouse pointer is one pixel, so touch
   devices get much larger targets — and the small nodes get the most,
   since they're the ones that are hard to land on. */
var COARSE = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
var PAD_BIG   = COARSE ? 20 : 12;
var PAD_SMALL = COARSE ? 30 : 16;

function padFor(n) {
  var base = (n.kind === "sub" || n.kind === "leaf") ? PAD_SMALL : PAD_BIG;
  return base / cam.s;   /* divided by scale so it stays finger-sized on screen */
}

function hit(mx, my) {
  var best = null, bestScore = Infinity;
  for (var i = NODES.length - 1; i >= 0; i--) {
    var n = NODES[i];
    if (n._a < 0.15 || n._r < 3) continue;
    var d = Math.hypot(mx - n._dx, my - n._dy);
    var reach = n._r + padFor(n);
    if (d > reach) continue;
    /* score by how far *into* the target you landed, not raw distance —
       otherwise a big node always beats a small one you were aiming at */
    var score = d - n._r;
    if (score < bestScore) { best = n; bestScore = score; }
  }
  return best;
}

/* how close is the nearest node? used to swallow near-misses so a fumbled
   tap doesn't read as "tapped empty space" and collapse the view */
function nearestGap(mx, my) {
  var gap = Infinity;
  for (var i = 0; i < NODES.length; i++) {
    var n = NODES[i];
    if (n._a < 0.15 || n._r < 3) continue;
    gap = Math.min(gap, Math.hypot(mx - n._dx, my - n._dy) - n._r);
  }
  return gap;
}

/* Touch targeting: your fingertip covers the thing you're aiming at, so
   precision is a fiction. On coarse pointers a tap resolves to the nearest
   node within a generous radius rather than requiring a direct hit —
   "close enough" beats "exact" when the user can't see under their finger. */
var SNAP_RADIUS = 90;

function hitSnap(mx, my) {
  var direct = hit(mx, my);
  if (direct || !COARSE) return direct;

  var best = null, bestD = Infinity, limit = SNAP_RADIUS / cam.s;
  for (var i = 0; i < NODES.length; i++) {
    var n = NODES[i];
    if (n._a < 0.15 || n._r < 3) continue;
    var d = Math.hypot(mx - n._dx, my - n._dy) - n._r;
    if (d < limit && d < bestD) { best = n; bestD = d; }
  }
  return best;
}

function localPos(ev) {
  var r = canvas.getBoundingClientRect();
  return { x: ev.clientX - r.left, y: ev.clientY - r.top };
}

/* ============================================================
   8a · CAMERA — pinch to zoom, drag empty space to pan
   The graph is drawn in world coordinates; the camera is a transform
   applied at paint time only. Layout, springs, and physics never see it,
   so zooming can't perturb any motion in flight.
   ============================================================ */

var cam = { s: 1, x: 0, y: 0 };
var CAM_MIN = 0.45, CAM_MAX = 5;

function worldPos(ev) {
  var p = localPos(ev);
  return { x: (p.x - cam.x) / cam.s, y: (p.y - cam.y) / cam.s };
}

/* zoom about a fixed screen point — the pixel under your fingers stays put */
function zoomAt(px, py, factor) {
  var ns = Math.max(CAM_MIN, Math.min(CAM_MAX, cam.s * factor));
  var k = ns / cam.s;
  cam.x = px - (px - cam.x) * k;
  cam.y = py - (py - cam.y) * k;
  cam.s = ns;
}

/* reset is a performance, not a state change — so it's a time track */
var camAnim = null;
function camTo(s, x, y, now) {
  camAnim = { s0: cam.s, x0: cam.x, y0: cam.y, s1: s, x1: x, y1: y,
              t0: now, dur: 440 };
}
function camStep(now) {
  if (!camAnim) return false;
  var e = easeOutCubic(trackP(camAnim.t0, camAnim.dur, now));
  cam.s = camAnim.s0 + (camAnim.s1 - camAnim.s0) * e;
  cam.x = camAnim.x0 + (camAnim.x1 - camAnim.x0) * e;
  cam.y = camAnim.y0 + (camAnim.y1 - camAnim.y0) * e;
  if (trackP(camAnim.t0, camAnim.dur, now) >= 1) { camAnim = null; return false; }
  return true;
}

var pointers = new Map();   /* every active touch, for pinch */
var pinch = null;
var pan = null;
var lastTap = { t: 0, x: 0, y: 0 };

function pinchStep() {
  var pts = [];
  pointers.forEach(function (v) { if (pts.length < 2) pts.push(v); });
  if (pts.length < 2) return;
  var dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y) || 1;
  var mx = (pts[0].x + pts[1].x) / 2, my = (pts[0].y + pts[1].y) / 2;
  if (pinch) {
    zoomAt(mx, my, dist / pinch.dist);
    cam.x += mx - pinch.mx;          /* two fingers also pan */
    cam.y += my - pinch.my;
  }
  pinch = { dist: dist, mx: mx, my: my };
}

/* adjacency, so neighbours can give when a node is pulled */
var ADJ = {};
NODES.forEach(function (n) { ADJ[n.id] = []; });
EDGES.forEach(function (e) { ADJ[e.a].push(e.b); ADJ[e.b].push(e.a); });

/* fingers wobble on contact; a mouse doesn't */
var DRAG_SLOP = COARSE ? 11 : 5;   /* px before a press becomes a drag */
var NEIGHBOR_GIVE = 0.20;   /* how much connected nodes follow */

canvas.addEventListener("pointermove", function (ev) {
  var now = performance.now(), sp = localPos(ev), p = worldPos(ev);

  if (pointers.has(ev.pointerId)) pointers.set(ev.pointerId, { x: sp.x, y: sp.y });

  /* two fingers down: pinch owns the gesture entirely */
  if (pointers.size >= 2) { pinchStep(); wake(); return; }

  /* one finger on empty space: pan */
  if (pan) {
    cam.x += sp.x - pan.x;
    cam.y += sp.y - pan.y;
    if (Math.hypot(sp.x - pan.sx, sp.y - pan.sy) > DRAG_SLOP) pan.moved = true;
    pan.x = sp.x; pan.y = sp.y;
    canvas.style.cursor = "grabbing";
    wake();
    return;
  }

  /* ---- dragging: the node springs toward the cursor rather than sticking
     to it. The lag is the mass — retargeting a stiff spring every move
     gives trail on a fast pull and precision on a slow one. ---- */
  if (scene.drag) {
    var d = scene.drag, n = BY_ID[d.id];
    d.maxMove = Math.max(d.maxMove, Math.hypot(p.x - d.startX, p.y - d.startY));
    if (!d.moved && Math.hypot(p.x - d.startX, p.y - d.startY) > DRAG_SLOP) {
      d.moved = true;
      n.squish.to(0, "spatialFast", now);
      n.r.to(n.homeR * 1.14, "spatialFast", now);
      n.glow.to(1, "effectsFast", now);
      canvas.style.cursor = "grabbing";
    }
    if (d.moved) {
      var tx = p.x + d.offX, ty = p.y + d.offY;
      n.x.to(tx, "spatialFast", now);
      n.y.to(ty, "spatialFast", now);

      /* neighbours are dragged along a fraction of the way — the graph
         behaves like it's strung together rather than a pile of dots */
      var ddx = tx - n.homeX, ddy = ty - n.homeY;
      ADJ[d.id].forEach(function (mid) {
        var m = BY_ID[mid];
        if (m._a < 0.1 || m.homeX == null) return;
        m.x.to(m.homeX + ddx * NEIGHBOR_GIVE, "spatialSlow", now);
        m.y.to(m.homeY + ddy * NEIGHBOR_GIVE, "spatialSlow", now);
      });
    }
    wake();
    return;
  }

  var h = hit(p.x, p.y), id = h ? h.id : null;
  if (id !== scene.hover) {
    if (scene.hover && BY_ID[scene.hover]) BY_ID[scene.hover].glow.to(0, "effectsFast", now);
    scene.hover = id;
    if (id) BY_ID[id].glow.to(1, "effectsFast", now);
    canvas.style.cursor = id ? "grab" : "default";
  }
  wake();
});

canvas.addEventListener("pointerdown", function (ev) {
  var now = performance.now(), sp = localPos(ev), p = worldPos(ev);
  pointers.set(ev.pointerId, { x: sp.x, y: sp.y });
  camAnim = null;

  /* second finger down — abandon whatever one finger was doing */
  if (pointers.size >= 2) {
    if (scene.drag) endDrag(now);
    pan = null;
    pinch = null;
    pinchStep();
    wake();
    return;
  }

  var n = hit(p.x, p.y);
  if (n) {
    scene.pressed = n.id;
    n.squish.to(1, "spatialFast", now);
    scene.drag = {
      id: n.id, moved: false, t0: now, maxMove: 0,
      startX: p.x, startY: p.y,
      offX: n._dx - p.x, offY: n._dy - p.y
    };
  } else {
    pan = { x: sp.x, y: sp.y, sx: sp.x, sy: sp.y, moved: false };
  }
  try { canvas.setPointerCapture(ev.pointerId); } catch (e) {}
  ev.preventDefault();
  wake();
});

function endDrag(now) {
  var d = scene.drag;
  scene.drag = null;
  if (!d) return false;
  var n = BY_ID[d.id];

  /* A finger rolls on contact, so a tap can cross the drag threshold without
     being a drag. If the press was short and stayed close, call it a tap:
     send the node home quietly and let the selection through. */
  var wasTap = (now - d.t0) < 260 && d.maxMove < 30;
  if (d.moved && wasTap) {
    n.x.to(n.homeX, "spatialFast", now);
    n.y.to(n.homeY, "spatialFast", now);
    n.r.to(n.homeR, "spatialFast", now);
    ADJ[d.id].forEach(function (mid) {
      var m = BY_ID[mid];
      if (m.homeX == null) return;
      m.x.to(m.homeX, "spatialDefault", now);
      m.y.to(m.homeY, "spatialDefault", now);
    });
    return false;
  }

  if (d.moved) {
    /* Release: retarget home. Velocity carries through, so a flick throws the
       node past its rest position and it settles back — no extra code for the
       fling, it falls out of the spring already being in motion. */
    n.x.to(n.homeX, "spatialThrow", now);
    n.y.to(n.homeY, "spatialThrow", now);
    n.r.to(n.homeR, "spatialDefault", now);
    n.glow.to(scene.hover === n.id ? 1 : 0, "effectsFast", now);
    ADJ[d.id].forEach(function (mid) {
      var m = BY_ID[mid];
      if (m.homeX == null) return;
      m.x.to(m.homeX, "spatialDefault", now);
      m.y.to(m.homeY, "spatialDefault", now);
    });
    canvas.style.cursor = scene.hover ? "grab" : "default";
  }
  return d.moved;
}

/* Selection happens here, on pointerup — NOT on the click event.
   pointerdown calls preventDefault() to stop iOS text-selection and scroll,
   and on mobile Safari that also suppresses the synthetic click. Depending on
   `click` meant taps silently did nothing. Handling the tap ourselves removes
   the whole class of problem and works identically for mouse and finger. */
function handleTap(ev, now) {
  var p = worldPos(ev);
  var n = hitSnap(p.x, p.y);

  if (!n) {
    /* a near-miss is not a request to collapse the view */
    if (nearestGap(p.x, p.y) < (COARSE ? 62 : 34) / cam.s) return;
    var up = stepUp();
    scene.focus = up;
    scene.selected = up || "neal";
    showNode(scene.selected, now);
    layout(now, false);
    renderNav();
    return;
  }

  scene.selected = n.id;
  showNode(n.id, now);

  /* re-tapping the node you're already inside shouldn't throw you out */
  var target = focusTargetFor(n);
  if (!(COARSE && target === null && scene.focus === n.id)) scene.focus = target;
  layout(now, false);
  renderNav();
}

window.addEventListener("pointerup", function (ev) {
  var now = performance.now();
  var sp = localPos(ev);
  var wasPinching = pointers.size >= 2;

  pointers.delete(ev.pointerId);
  if (pointers.size < 2) pinch = null;

  if (scene.pressed && BY_ID[scene.pressed]) {
    BY_ID[scene.pressed].squish.to(0, "spatialFast", now);
  }
  scene.pressed = null;

  var panned = pan && pan.moved;
  pan = null;
  var dragged = endDrag(now);

  /* a tap is a pointerup that wasn't a drag, a pan, or half a pinch */
  var onCanvas = ev.target === canvas;
  var isTap = onCanvas && !dragged && !panned && !wasPinching &&
              (ev.button === undefined || ev.button === 0);

  if (isTap) {
    var onEmpty = !hit(worldPos(ev).x, worldPos(ev).y);
    var quick = now - lastTap.t < 320 &&
                Math.hypot(sp.x - lastTap.x, sp.y - lastTap.y) < 30;

    /* double-tap empty space resets the camera; on a node it's just two taps */
    if (quick && onEmpty && (cam.s !== 1 || cam.x !== 0 || cam.y !== 0)) {
      camTo(1, 0, 0, now);
      lastTap.t = 0;
    } else {
      lastTap = { t: now, x: sp.x, y: sp.y };
      handleTap(ev, now);
    }
  }

  canvas.style.cursor = scene.hover ? "grab" : "default";
  try { canvas.releasePointerCapture(ev.pointerId); } catch (e) {}
  wake();
});

/* desktop: wheel / trackpad pinch */
canvas.addEventListener("wheel", function (ev) {
  ev.preventDefault();
  camAnim = null;
  var sp = localPos(ev);
  zoomAt(sp.x, sp.y, Math.exp(-ev.deltaY * 0.0016));
  wake();
}, { passive: false });

window.addEventListener("pointercancel", function (ev) {
  var now = performance.now();
  pointers.delete(ev.pointerId);
  if (pointers.size < 2) pinch = null;
  pan = null;
  if (scene.pressed && BY_ID[scene.pressed]) BY_ID[scene.pressed].squish.to(0, "spatialFast", now);
  scene.pressed = null;
  endDrag(now);
  wake();
});

/* ============================================================
   8c · NAV STRIP — the reliable path on touch
   Aiming at a 10px circle you can't see under your thumb is a losing game
   no matter how generous the hit-testing is. The graph stays the pleasure;
   this strip is the guarantee. Mobile only — desktop has a mouse.
   ============================================================ */

var navstrip = document.getElementById("navstrip");

function openFor(n) {
  if (n.kind === "hub") return n.id;
  if (n.kind === "sub") return childrenOf(n.id).length ? n.id : n.parent;
  if (n.kind === "leaf") return n.parent;
  return null;
}

/* A native <select> rather than a row of chips. Tapping it hands off to the
   OS picker — a full-height, properly scrollable list with tap targets the
   platform guarantees. No custom touch handling, no scroll-vs-tap ambiguity,
   and it costs one row no matter how many nodes exist. Every node in the
   graph is two interactions away. */
var navselect = null;

function renderNav() {
  if (!navstrip) return;

  /* rebuild only when the tree changes; otherwise just sync the value,
     so re-rendering never closes an open picker */
  if (!navselect) {
    navselect = document.createElement("select");
    navselect.className = "navselect";
    navselect.setAttribute("aria-label", "Jump to a section");

    function opt(n, prefix) {
      var o = document.createElement("option");
      o.value = n.id;
      o.textContent = (prefix || "") + n.label;
      return o;
    }

    navselect.appendChild(opt(BY_ID.neal));

    HUBS.forEach(function (h) {
      var g = document.createElement("optgroup");
      g.label = h.label;
      g.appendChild(opt(h, ""));
      childrenOf(h.id).forEach(function (s) {
        g.appendChild(opt(s, "  "));
        childrenOf(s.id).forEach(function (l) {
          g.appendChild(opt(l, "    ↳ "));
        });
      });
      navselect.appendChild(g);
    });

    navselect.addEventListener("change", function () {
      var n = BY_ID[navselect.value];
      if (!n) return;
      var t = performance.now();
      scene.selected = n.id;
      showNode(n.id, t);
      scene.focus = openFor(n);
      layout(t, false);
      wake();
    });

    navstrip.appendChild(navselect);
  }

  if (navselect.value !== scene.selected) navselect.value = scene.selected;
}

/* NOTE: there is deliberately no "click" listener. Taps are resolved in
   pointerup (see handleTap). Having both meant every tap was processed twice —
   pointerup would open a hub and the click that followed would see you already
   inside it and toggle it shut, which read as "that node doesn't work". */

window.addEventListener("keydown", function (ev) {
  if (ev.key === "Escape") {
    var now = performance.now();
    scene.focus = null; scene.selected = "neal";
    showNode("neal", now); layout(now, false); wake();
  }
});

window.addEventListener("resize", resize);

var bExp = document.getElementById("b-exp"),   bStd = document.getElementById("b-std");
var bLive = document.getElementById("b-live"), bStill = document.getElementById("b-still");

function setScheme(name) {
  /* Product-level swap. Call sites name tokens, never durations — nothing else changes. */
  schemeName = name;
  bExp.setAttribute("aria-pressed", String(name === "expressive"));
  bStd.setAttribute("aria-pressed", String(name === "standard"));
  layout(performance.now(), false); wake();
}
function setAmbient(on) {
  ambient = on;
  bLive.setAttribute("aria-pressed", String(on));
  bStill.setAttribute("aria-pressed", String(!on));
  wake();
}
bExp.addEventListener("click", function () { setScheme("expressive"); });
bStd.addEventListener("click", function () { setScheme("standard"); });
bLive.addEventListener("click", function () { setAmbient(true); });
bStill.addEventListener("click", function () { setAmbient(false); });
document.getElementById("b-in").addEventListener("click", function () {
  camAnim = null; zoomAt(W / 2, H / 2, 1.45); wake();
});
document.getElementById("b-out").addEventListener("click", function () {
  camAnim = null; zoomAt(W / 2, H / 2, 1 / 1.45); wake();
});
document.getElementById("b-fit").addEventListener("click", function () {
  camTo(1, 0, 0, performance.now()); wake();
});
document.getElementById("b-repaint").addEventListener("click", function () {
  var now = performance.now();
  scene.focus = null; scene.selected = "neal";
  repaint(now); showNode("neal", now); wake();
});

if (REDUCED) setAmbient(false);

/* ============================================================
   8b · SPLITTER — the reader decides how much room the text gets
   ============================================================ */

var app = document.getElementById("app");
var split = document.getElementById("split");
var DEFAULT_RAIL = 41;                 /* vw */
var MIN_PX = 340;

function setRail(px, persist) {
  var min = MIN_PX;
  var max = window.innerWidth - 300;   /* the graph never disappears */
  px = Math.max(min, Math.min(max, px));
  var vw = (px / window.innerWidth) * 100;
  app.style.setProperty("--rail-w", vw.toFixed(2) + "vw");
  resize();                            /* canvas re-fits; layout re-targets */
  if (persist) { try { localStorage.setItem("nm-rail", vw.toFixed(2)); } catch (e) {} }
}

(function restoreRail() {
  try {
    var v = parseFloat(localStorage.getItem("nm-rail"));
    if (v && v > 5 && v < 90) app.style.setProperty("--rail-w", v + "vw");
  } catch (e) {}
})();

var dragging = false;

split.addEventListener("pointerdown", function (ev) {
  dragging = true;
  split.classList.add("dragging");
  document.body.classList.add("resizing");
  split.setPointerCapture(ev.pointerId);
  ev.preventDefault();
});

split.addEventListener("pointermove", function (ev) {
  if (!dragging) return;
  setRail(ev.clientX, false);
});

split.addEventListener("pointerup", function (ev) {
  if (!dragging) return;
  dragging = false;
  split.classList.remove("dragging");
  document.body.classList.remove("resizing");
  try { split.releasePointerCapture(ev.pointerId); } catch (e) {}
  setRail(ev.clientX, true);
});

split.addEventListener("dblclick", function () {
  app.style.setProperty("--rail-w", DEFAULT_RAIL + "vw");
  try { localStorage.removeItem("nm-rail"); } catch (e) {}
  resize();
});

split.addEventListener("keydown", function (ev) {
  var cur = app.getBoundingClientRect
    ? document.querySelector(".rail").getBoundingClientRect().width : 0;
  if (ev.key === "ArrowLeft")  { setRail(cur - 32, true); ev.preventDefault(); }
  if (ev.key === "ArrowRight") { setRail(cur + 32, true); ev.preventDefault(); }
  if (ev.key === "Home")       { split.dispatchEvent(new Event("dblclick")); }
});

/* ============================================================
   9 · BOOT
   ============================================================ */

/* ?lab on the URL reveals the HUD and the motion controls. Off by default:
   frame counters are for showing the engine off, not for reading a bio. */
try {
  if (/[?&#]lab\b/i.test(location.search + location.hash)) {
    document.body.classList.add("lab");
  }
} catch (e) {}

resize();
var t0 = performance.now();
layout(t0, true);
repaint(t0);
showNode("neal", t0);
renderNav();
wake();

})();
