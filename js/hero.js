/* ============================================================
   HERO WORKSTATION & CODE SIMULATOR
   Responsive Name Typography, Parallax Motion & Monitor IDE
   ============================================================ */

import { $, clamp, lerp, esc, RM, vh } from './utils.js';
import { ROLE_TEXT, CODE_SNIPPET } from './config.js';

let mx = 0, my = 0, tx = 0, ty = 0;
let visHero = true;

export function fitName() {
  const hero = $('#home');
  const nameEl = $('#name');
  const l1 = $('.l1');
  const l2 = $('.l2');
  if (!hero || !nameEl || !l1) return;

  const W = hero.clientWidth;
  const H = hero.clientHeight;
  const one = W >= 900;

  nameEl.classList.toggle('one', one);
  nameEl.style.setProperty('--fs', '100px');

  const w1 = l1.getBoundingClientRect().width / 100;
  const perEm = one ? w1 + (l2 ? l2.getBoundingClientRect().width / 100 : 0) + .16 : w1;
  if (!perEm) return;

  const byWidth = (W * .9) / perEm;
  const byHeight = H * (one ? .32 : .3);
  nameEl.style.setProperty('--fs', Math.min(byWidth, byHeight) + 'px');
}

export function heroUpdate() {
  const nameEl = $('#name');
  const figWrap = $('#figWrap');
  const heroInfo = $('#heroInfo');
  if (!nameEl || !figWrap || !heroInfo) return;

  const y = window.scrollY;
  mx = lerp(mx, tx, .06);
  my = lerp(my, ty, .06);

  nameEl.style.setProperty('--ny', (y * .28 - my * 8) + 'px');
  nameEl.style.marginLeft = (-mx * 14) + 'px';
  figWrap.style.setProperty('--fy', (y * .12 + my * 4) + 'px');
  heroInfo.style.opacity = clamp(1 - y / (vh() * .55));
}

export function setHeroVisibility(isVisible) {
  visHero = isVisible;
}

export function initHero() {
  fitName();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitName);
  }

  // Pointer move parallax for Hero
  if (!RM) {
    window.addEventListener('pointermove', e => {
      tx = (e.clientX / window.innerWidth - .5) * 2;
      ty = (e.clientY / window.innerHeight - .5) * 2;
    }, { passive: true });
  }

  /* ---------- Role Typing Effect ---------- */
  const typed = $('#typed');
  if (typed) {
    if (RM) {
      typed.textContent = ROLE_TEXT;
    } else {
      let ti = 0;
      const tick = () => {
        typed.textContent = ROLE_TEXT.slice(0, ++ti);
        if (ti < ROLE_TEXT.length) {
          setTimeout(tick, 50 + Math.random() * 45);
        }
      };
      setTimeout(tick, 1500);
    }
  }

  /* ---------- Live Code on Triple Monitor ---------- */
  const codeEl = $('#code');
  const gutEl = $('#gutter');

  if (codeEl && gutEl) {
    const TOK = /(?<cm>#.*$)|(?<str>"[^"\n]*"?|'[^'\n]*'?)|(?<dec>@[\w.]+)|\b(?<kw1>class|def)(?<sp>\s+)(?<nm>\w+)|\b(?<kw2>from|import|return|if|else|for|in|as|None|True|False)\b|\b(?<num>\d+)\b|\b(?<fn>[A-Za-z_]\w*)(?=\()/gm;

    function highlight(src) {
      let out = '', last = 0;
      src.replace(TOK, (m, ...rest) => {
        const g = rest[rest.length - 1];
        const off = rest[rest.length - 3];
        out += esc(src.slice(last, off));
        if (g.cm) out += '<span class="tk-c">' + esc(g.cm) + '</span>';
        else if (g.str) out += '<span class="tk-s">' + esc(g.str) + '</span>';
        else if (g.dec) out += '<span class="tk-d">' + esc(g.dec) + '</span>';
        else if (g.kw1) out += '<span class="tk-k">' + g.kw1 + '</span>' + g.sp + '<span class="tk-d">' + g.nm + '</span>';
        else if (g.kw2) out += '<span class="tk-k">' + g.kw2 + '</span>';
        else if (g.num) out += '<span class="tk-n">' + g.num + '</span>';
        else if (g.fn) out += '<span class="tk-f">' + g.fn + '</span>';
        last = off + m.length;
        return m;
      });
      return out + esc(src.slice(last));
    }

    const MAX_LINES = 10;
    function renderCode(charCount) {
      const lines = CODE_SNIPPET.slice(0, charCount).split('\n');
      const start = Math.max(0, lines.length - MAX_LINES);
      const shown = lines.slice(start);
      codeEl.innerHTML = highlight(shown.join('\n')) + '<i class="caret"></i>';
      gutEl.textContent = shown.map((_, i) => start + i + 1).join('\n');
    }

    let typedN = 0;
    function codeStep() {
      if (!visHero) return setTimeout(codeStep, 400);
      if (typedN < CODE_SNIPPET.length) {
        const ch = CODE_SNIPPET[typedN++];
        renderCode(typedN);
        return setTimeout(codeStep, ch === '\n' ? 240 : 22 + Math.random() * 38);
      }
      setTimeout(() => {
        typedN = 0;
        codeStep();
      }, 3400);
    }

    renderCode(0);
    if (RM) {
      renderCode(CODE_SNIPPET.length);
    } else {
      setTimeout(codeStep, 1300);
    }
  }
}
