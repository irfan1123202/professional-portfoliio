/* ============================================================
   UTILITY HELPERS
   DOM Selectors, Math Interpolation & Hardware Query Utilities
   ============================================================ */

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (start, end, progress) => start + (end - start) * progress;
export const ease = t => 1 - Math.pow(1 - t, 3);
export const vh = () => window.innerHeight;

export const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const esc = str =>
  str.replace(/&/g, '&amp;')
     .replace(/</g, '&lt;')
     .replace(/>/g, '&gt;');

export function sceneProgress(sectionEl) {
  const rect = sectionEl.getBoundingClientRect();
  const total = sectionEl.offsetHeight - vh();
  return {
    p: clamp(-rect.top / total),
    top: rect.top,
    total
  };
}

export function b64ToBlob(b64, mimeType = 'application/pdf') {
  const binaryString = atob(b64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}
