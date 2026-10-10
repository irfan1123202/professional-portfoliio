/* ============================================================
   JOURNEY & TIMELINE
   Curved SVG Bezier Arc, Walking Node & Scroll Sync
   ============================================================ */

import { $, $$, clamp, lerp, RM, sceneProgress } from './utils.js';

const P0 = [20, 280];
const P1 = [500, -60];
const P2 = [980, 280];

const bez = t => [
  (1 - t) * (1 - t) * P0[0] + 2 * t * (1 - t) * P1[0] + t * t * P2[0],
  (1 - t) * (1 - t) * P0[1] + 2 * t * (1 - t) * P1[1] + t * t * P2[1]
];

let nodes = [];
let cards = [];
let tNode = [];
let NN = 0;
let lastIdx = -1;
let jrEl = null;
let walkerEl = null;
let arcLitEl = null;

const place = (el, t) => {
  if (!el) return;
  const [x, y] = bez(t);
  el.style.left = (x / 10) + '%';
  el.style.top = (y / 3) + '%';
};

export function journeyUpdate() {
  if (!jrEl || !walkerEl || !arcLitEl || NN === 0) return;

  const p = RM ? 1 : sceneProgress(jrEl).p;
  const q = clamp(p * 1.08);
  const t = lerp(tNode[0], tNode[NN - 1], q);

  place(walkerEl, t);

  const [ex, ey] = bez(t);
  const c1 = [lerp(P0[0], P1[0], t), lerp(P0[1], P1[1], t)];
  arcLitEl.setAttribute(
    'd',
    `M${P0[0]} ${P0[1]} Q${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`
  );

  const idx = RM ? NN - 1 : Math.round(q * (NN - 1));
  if (idx !== lastIdx) {
    lastIdx = idx;
    nodes.forEach((n, i) => n.classList.toggle('on', i <= idx && (RM || i === idx)));
    cards.forEach((c, i) => c.classList.toggle('on', i === idx));
  }
}

export function initJourney() {
  jrEl = $('#journey');
  walkerEl = $('#walker');
  arcLitEl = $('#arcLit');
  nodes = $$('.node');
  cards = $$('.card');
  NN = nodes.length;

  if (NN === 0) return;

  tNode = nodes.map((_, i) => (((i + .5) / NN) * 1000 - 20) / 960);
  nodes.forEach((n, i) => place(n, tNode[i]));
  journeyUpdate();
}
