/* ============================================================
   THEME & COLOR PALETTE MANAGER
   Multi-Palette Selection, Light/Dark Modes & LocalStorage Sync
   ============================================================ */

import { $, $$ } from './utils.js';

const root = document.documentElement;

export function applyMode(mode, persist = true) {
  root.setAttribute('data-mode', mode);
  const isLight = mode === 'light';

  const modeBtn = $('#modeBtn');
  if (modeBtn) {
    modeBtn.setAttribute('aria-pressed', String(isLight));
    modeBtn.setAttribute('aria-label', isLight ? 'Switch to dark background' : 'Switch to light background');
  }

  const mModeBtn = $('#mModeBtn');
  const mModeLabel = $('#mModeLabel');
  if (mModeBtn && mModeLabel) {
    mModeBtn.setAttribute('aria-pressed', String(isLight));
    mModeLabel.textContent = isLight ? 'Switch to dark background' : 'Switch to light background';
  }

  if (persist) {
    try {
      localStorage.setItem('irfan-mode', mode);
    } catch (e) {
      console.warn('LocalStorage unavailable for theme mode:', e);
    }
  }
}

export function applyTheme(themeName, persist = true) {
  root.setAttribute('data-theme', themeName);

  $$('#themeMenu button, .m-themes button').forEach(btn => {
    btn.setAttribute('aria-checked', String(btn.dataset.theme === themeName));
  });

  if (persist) {
    try {
      localStorage.setItem('irfan-theme', themeName);
    } catch (e) {
      console.warn('LocalStorage unavailable for theme palette:', e);
    }
  }
}

export function initTheme(onMenuCloseCallback) {
  const modeBtn = $('#modeBtn');
  const mModeBtn = $('#mModeBtn');
  const themeBtn = $('#themeBtn');
  const themeMenu = $('#themeMenu');
  const mThemes = $('.m-themes');

  // Toggle Dark/Light mode on desktop button
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      const currentMode = root.getAttribute('data-mode') === 'light' ? 'dark' : 'light';
      applyMode(currentMode, true);
    });
  }

  // Toggle Dark/Light mode on mobile button
  if (mModeBtn) {
    mModeBtn.addEventListener('click', () => {
      const currentMode = root.getAttribute('data-mode') === 'light' ? 'dark' : 'light';
      applyMode(currentMode, true);
      if (typeof onMenuCloseCallback === 'function') onMenuCloseCallback();
    });
  }

  // Desktop Theme Menu Dropdown
  const closeThemeMenu = () => {
    if (themeMenu && themeBtn) {
      themeMenu.hidden = true;
      themeBtn.setAttribute('aria-expanded', 'false');
    }
  };

  const openThemeMenu = () => {
    if (themeMenu && themeBtn) {
      themeMenu.hidden = false;
      themeBtn.setAttribute('aria-expanded', 'true');
    }
  };

  if (themeBtn && themeMenu) {
    themeBtn.addEventListener('click', e => {
      e.stopPropagation();
      themeMenu.hidden ? openThemeMenu() : closeThemeMenu();
    });

    document.addEventListener('click', e => {
      if (!themeMenu.hidden && !themeMenu.contains(e.target) && e.target !== themeBtn) {
        closeThemeMenu();
      }
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeThemeMenu();
    });

    themeMenu.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      applyTheme(btn.dataset.theme, true);
      if (btn.dataset.theme === 'peach') applyMode('light', true);
      closeThemeMenu();
    });
  }

  // Mobile Theme Picker Buttons
  if (mThemes) {
    mThemes.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      applyTheme(btn.dataset.theme, true);
      if (btn.dataset.theme === 'peach') applyMode('light', true);
      if (typeof onMenuCloseCallback === 'function') onMenuCloseCallback();
    });
  }

  // Initialize initial state from attributes or defaults
  const initialTheme = root.getAttribute('data-theme') || 'professional';
  const initialMode = root.getAttribute('data-mode') || 'dark';
  applyTheme(initialTheme, false);
  applyMode(initialMode, false);
}
