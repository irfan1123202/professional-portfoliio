/* ============================================================
   VISUAL EFFECTS & MICRO-INTERACTIONS
   Neon Cursor Glow, Marquee Track, Tilt, Spotlight & Counters
   ============================================================ */

import { $, $$, clamp, lerp, RM, fine } from './utils.js';
import { TECH_STACK } from './config.js';

let gx = 0, gy = 0, gtx = 0, gty = 0, gOn = false;
let glowEl = null;

export function glowUpdate() {
  if (!gOn || !glowEl) return;
  gx = lerp(gx, gtx, .16);
  gy = lerp(gy, gty, .16);
  glowEl.style.transform = `translate3d(${gx.toFixed(1)}px,${gy.toFixed(1)}px,0)`;
}

export function initEffects() {
  /* ---------- Scroll Progress Bar ---------- */
  const bar = $('#progress');
  if (bar) {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? clamp(window.scrollY / h) : 0).toFixed(4) + ')';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Tech Marquee Infinite Loop ---------- */
  const mqTrack = $('#mqTrack');
  if (mqTrack && mqTrack.children.length === 0) {
    [0, 1].forEach(dup => {
      TECH_STACK.forEach(([_, __, items], catIdx) => {
        items.forEach(([name], i) => {
          const el = document.createElement('div');
          el.className = 'mq-item' + ((i + catIdx) % 3 === 0 ? ' fill' : '');
          if (dup) el.dataset.dup = '1';
          el.innerHTML = `<span>${name}</span>`;
          mqTrack.appendChild(el);
        });
      });
    });
  }

  /* ---------- Neon Cursor Glow & 3D Interactive Card Tilt ---------- */
  glowEl = $('#glow');
  if (fine && !RM) {
    window.addEventListener('pointermove', e => {
      gtx = e.clientX;
      gty = e.clientY;
      if (!gOn && glowEl) {
        gOn = true;
        gx = gtx;
        gy = gty;
        glowEl.style.opacity = '1';
      }
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', () => {
      gOn = false;
      if (glowEl) glowEl.style.opacity = '0';
    });

    $$('[data-tilt]').forEach(el => {
      const max = parseFloat(el.dataset.tilt) || 8;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', ((px - .5) * 2 * max).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((.5 - py) * 2 * max).toFixed(2) + 'deg');
        el.style.setProperty('--sx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--sy', (py * 100).toFixed(1) + '%');
      });

      el.addEventListener('pointerleave', () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });

    $$('.spot').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Reveal on Scroll ---------- */
  const revealEls = $$('.reveal');
  revealEls.forEach(el => {
    const group = el.parentElement;
    if (!group) return;
    const siblings = [...group.children].filter(c => c.classList.contains('reveal'));
    const idx = siblings.indexOf(el);
    if (siblings.length > 1) {
      el.classList.add('reveal-stagger');
      el.style.setProperty('--rd', (idx * 0.08) + 's');
    }
  });

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ---------- CGPA Count-Up Animation ---------- */
  const cgpaEl = $('#cgpaNum');
  if (cgpaEl) {
    const target = parseFloat(cgpaEl.dataset.target);
    const countUp = () => {
      if (RM) {
        cgpaEl.textContent = target.toFixed(2);
        return;
      }
      const dur = 1400;
      const start = performance.now();
      const tick = now => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        cgpaEl.textContent = (target * eased).toFixed(2);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp();
          obs.disconnect();
        }
      });
    }, { threshold: .6 }).observe(cgpaEl);
  }
}
