/* ============================================================
   APPLICATION ROOT & COORDINATOR
   Module Bootstrapper, Lifecycle Orchestrator & Animation Loop
   ============================================================ */

import { $, RM } from './utils.js';
import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initHero, heroUpdate, fitName, setHeroVisibility } from './hero.js';
import { initTech } from './tech.js';
import { initJourney, journeyUpdate } from './journey.js';
import { initGallery } from './gallery.js';
import { initResume } from './resume.js';
import { initEffects, glowUpdate } from './effects.js';

(() => {
  // Reduced motion user preference
  if (RM) {
    document.documentElement.classList.add('rm');
  }

  // Initialize navigation & capture mobile menu closer
  const { setMenu } = initNavigation();

  // Initialize theme manager with menu close callback
  initTheme(() => setMenu(false));

  // Initialize feature modules
  initHero();
  initTech();
  initJourney();
  initGallery();
  initResume();
  initEffects();

  /* ---------- Visibility Tracking for Frame Optimization ---------- */
  const heroEl = $('#home');
  const jrEl = $('#journey');
  const vis = { hero: true, jr: false };

  if (heroEl || jrEl) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === heroEl) {
          vis.hero = entry.isIntersecting;
          setHeroVisibility(vis.hero);
        }
        if (entry.target === jrEl) {
          vis.jr = entry.isIntersecting;
        }
      });
    }, { rootMargin: '10% 0px' });

    if (heroEl) io.observe(heroEl);
    if (jrEl) io.observe(jrEl);
  }

  /* ---------- Main RAF Animation Loop ---------- */
  function frame() {
    glowUpdate();
    if (vis.hero) heroUpdate();
    if (vis.jr) journeyUpdate();
    if (!RM) requestAnimationFrame(frame);
  }

  /* ---------- Viewport Resize Handler ---------- */
  function refresh() {
    fitName();
    journeyUpdate();
    heroUpdate();
  }

  window.addEventListener('resize', refresh, { passive: true });
  refresh();
  requestAnimationFrame(frame);
})();
