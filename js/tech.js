/* ============================================================
   TECH UNIVERSE & 3D SKILL CARDS
   Dynamic Card Generation, 3D Perspective Tilt & Interactive Flip
   ============================================================ */

import { $, $$, fine } from './utils.js';
import { TECH_STACK } from './config.js';

export function initTech() {
  const techGroups = $('#techGroups');
  if (!techGroups) return;

  let allCards = $$('.tcard', techGroups);

  // If DOM is not yet populated, dynamically generate cards from TECH_STACK
  if (techGroups.children.length === 0) {
    allCards = [];
    TECH_STACK.forEach(([cat, label, items]) => {
      const group = document.createElement('div');
      group.className = 'tgroup';
      group.innerHTML = `<div class="tgroup-head" style="--cc:var(--c-${cat})"><span class="dot"></span><h3>${label}</h3><span class="n">${items.length}</span></div>`;

      const grid = document.createElement('div');
      grid.className = 'tgrid';
      grid.setAttribute('role', 'list');
      grid.setAttribute('aria-label', `${label} skills`);

      items.forEach(([name, icon, note], i) => {
        const card = document.createElement('div');
        card.className = 'tcard';
        card.style.setProperty('--cc', `var(--c-${cat})`);
        card.style.setProperty('--d', (i * 0.06) + 's');
        card.setAttribute('role', 'listitem');
        card.tabIndex = 0;
        card.innerHTML = `
          <div class="tcard-inner">
            <div class="tface tface-front">
              <svg class="ticon" aria-hidden="true"><use href="#${icon}"></use></svg>
              <span class="tname">${name}</span>
            </div>
            <div class="tface tface-back">
              <span class="tnote">${note}</span>
            </div>
          </div>
        `;
        grid.appendChild(card);
        allCards.push(card);
      });

      group.appendChild(grid);
      techGroups.appendChild(group);
    });
  }

  // Touch and Keyboard Flip
  allCards.forEach(card => {
    card.addEventListener('click', () => {
      if (!fine) card.classList.toggle('flip');
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flip');
      }
    });
  });

  // 3D Pointer Tilt
  if (fine) {
    allCards.forEach(card => {
      const max = 12;
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', ((px - .5) * 2 * max).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((.5 - py) * 2 * max).toFixed(2) + 'deg');
        card.style.setProperty('--sx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--sy', (py * 100).toFixed(1) + '%');
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  // Reveal On Scroll
  const tcardObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        tcardObs.unobserve(entry.target);
      }
    });
  }, { threshold: .2, rootMargin: '0px 0px -8% 0px' });

  allCards.forEach(card => tcardObs.observe(card));
}
