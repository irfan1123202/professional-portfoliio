/* ============================================================
   NAVIGATION & USER CONTROLS
   Mobile Drawer, Active Nav Observer, Popovers & Back to Top
   ============================================================ */

import { $, $$, RM } from './utils.js';
import { CONFIG } from './config.js';

export function initNavigation() {
  const menu = $('#menu');
  const menuBtn = $('#menuBtn');
  const hamLabel = menuBtn ? menuBtn.querySelector('.ham-label') : null;

  /* ---------- Mobile Drawer Menu ---------- */
  const setMenu = open => {
    if (!menu || !menuBtn) return;
    menu.classList.toggle('open', open);
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    if (hamLabel) hamLabel.textContent = open ? 'Close' : 'Menu';
  };

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    menu.addEventListener('click', e => {
      if (e.target.closest('a')) setMenu(false);
    });
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- Active Section Nav Highlighting ---------- */
  const navLinks = $$('.menu a');
  if (navLinks.length > 0) {
    const secObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('on', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -54% 0px' });

    $$('main > section').forEach(sec => secObs.observe(sec));
  }

  /* ---------- External Links Binding ---------- */
  const L = CONFIG.links;
  function setLink(el, href, external = true) {
    if (!el) return;
    if (href) {
      el.href = href;
      if (external) {
        el.target = '_blank';
        el.rel = 'noopener';
      }
      el.hidden = false;
      el.classList.remove('unset');
    } else {
      el.classList.add('unset');
      el.title = 'Link not added yet';
    }
  }

  setLink($('#cEmail'), L.email ? 'mailto:' + L.email : '', false);
  setLink($('#cLinkedin'), L.linkedin);
  if (L.github) setLink($('#cGithub'), L.github);

  if (L.pollifyLive || L.pollifyRepo) {
    const pollifyLinks = $('#pollifyLinks');
    if (pollifyLinks) pollifyLinks.hidden = false;
    if (L.pollifyLive) setLink($('#pollifyLive'), L.pollifyLive);
    if (L.pollifyRepo) setLink($('#pollifyRepo'), L.pollifyRepo);
  }

  /* ---------- Call / WhatsApp Popover ---------- */
  const phoneBtn = $('#phoneBtn');
  const phoneMenu = $('#phoneMenu');
  const pmCall = $('#pmCall');
  const pmWhatsapp = $('#pmWhatsapp');

  if (phoneBtn && phoneMenu) {
    if (L.phone) {
      const digits = L.phone.replace(/[^\d]/g, '');
      if (pmCall) pmCall.href = 'tel:' + L.phone;
      if (pmWhatsapp) pmWhatsapp.href = 'https://wa.me/' + digits + '?text=' + encodeURIComponent('Hii Irfan');
    }

    const closePhone = () => {
      phoneMenu.hidden = true;
      phoneBtn.setAttribute('aria-expanded', 'false');
    };
    const openPhone = () => {
      phoneMenu.hidden = false;
      phoneBtn.setAttribute('aria-expanded', 'true');
    };

    phoneBtn.addEventListener('click', e => {
      e.stopPropagation();
      phoneMenu.hidden ? openPhone() : closePhone();
    });

    document.addEventListener('click', e => {
      if (!phoneMenu.hidden && !phoneMenu.contains(e.target) && e.target !== phoneBtn) {
        closePhone();
      }
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closePhone();
    });
  }

  /* ---------- Profile Avatar Popover ---------- */
  const avatarBtn = $('#avatarBtn');
  const avatarMenu = $('#avatarMenu');

  if (avatarBtn && avatarMenu) {
    const closeAvatar = () => {
      avatarMenu.hidden = true;
      avatarBtn.setAttribute('aria-expanded', 'false');
    };
    const openAvatar = () => {
      avatarMenu.hidden = false;
      avatarBtn.setAttribute('aria-expanded', 'true');
    };

    avatarBtn.addEventListener('click', e => {
      e.stopPropagation();
      avatarMenu.hidden ? openAvatar() : closeAvatar();
    });

    document.addEventListener('click', e => {
      if (!avatarMenu.hidden && !avatarMenu.contains(e.target) && e.target !== avatarBtn) {
        closeAvatar();
      }
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAvatar();
    });
  }

  /* ---------- Back to Top Button ---------- */
  const toTop = $('#toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > window.innerHeight * 1.1);
    }, { passive: true });

    toTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: RM ? 'auto' : 'smooth'
      });
    });
  }

  return { setMenu };
}
