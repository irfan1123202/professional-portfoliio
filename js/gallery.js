/* ============================================================
   PROJECT PHOTO GALLERIES & LIGHTBOX
   Accordion Toggles & Keyboard-Navigable Modal Viewer
   ============================================================ */

import { $, $$ } from './utils.js';

export function initGallery() {
  /* ---------- Project Photo Accordion Toggles ---------- */
  $$('.gal-toggle').forEach(btn => {
    const targetId = btn.dataset.target;
    const panel = document.getElementById(targetId);
    if (!panel) return;

    btn.addEventListener('click', () => {
      const open = !panel.classList.contains('open');
      panel.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      const span = btn.querySelector('span');
      if (span) span.textContent = open ? 'Hide Project Photos' : 'View Project Photos';
    });
  });

  /* ---------- Fullscreen Image Lightbox ---------- */
  const lb = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCount = $('#lbCount');
  const lbClose = $('#lbClose');
  const lbPrev = $('#lbPrev');
  const lbNext = $('#lbNext');

  if (!lb || !lbImg || !lbClose || !lbPrev || !lbNext) return;

  let lbList = [];
  let lbIndex = 0;
  let lbLastFocus = null;
  const galleries = $$('.gal-feature');

  function getImgSrc(buttonEl) {
    const img = buttonEl.querySelector('img');
    return img ? img.src : '';
  }

  function render() {
    if (lbList.length === 0) return;
    const item = lbList[lbIndex];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    if (lbCount) {
      lbCount.textContent = `${lbIndex + 1} / ${lbList.length}`;
    }
  }

  function openLightbox(groupEl, clickedBtn) {
    const buttons = [...groupEl.querySelectorAll('button[data-img]')];
    lbList = buttons.map(b => ({
      key: b.dataset.img,
      src: getImgSrc(b),
      alt: b.querySelector('img') ? b.querySelector('img').alt : ''
    }));

    lbIndex = Math.max(0, buttons.indexOf(clickedBtn));
    lbLastFocus = document.activeElement;
    render();

    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lbLastFocus) lbLastFocus.focus();
  }

  function step(direction) {
    if (lbList.length === 0) return;
    lbIndex = (lbIndex + direction + lbList.length) % lbList.length;
    render();
  }

  galleries.forEach(group => {
    group.addEventListener('click', e => {
      const btn = e.target.closest('button[data-img]');
      if (!btn) return;
      openLightbox(group, btn);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => step(-1));
  lbNext.addEventListener('click', () => step(1));
  lb.addEventListener('click', e => {
    if (e.target === lb) closeLightbox();
  });

  window.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
}
