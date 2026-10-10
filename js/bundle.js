/* ============================================================
   MOHAMED IRFAN — PORTFOLIO RUNTIME BUNDLE
   Compiled from ES modules in js/ for universal file:// and http:// support
   ============================================================ */
(() => {
  'use strict';

  /* --- config.js --- */
  /* ============================================================
   PORTFOLIO CONFIGURATION & DATA
   Contact links, Tech Skills, Code Snippets & Resume Info
   ============================================================ */

const CONFIG = {
  links: {
    email: "irfanmohamed1182005@gmail.com",
    linkedin: "https://www.linkedin.com/in/mohamedirfan58",
    github: "https://github.com/irfan1123202",
    phone: "+918825464756",
    pollifyLive: "",  // Live demo URL (optional)
    pollifyRepo: ""   // GitHub repository URL (optional)
  }
};

const RESUME_FILENAME = "Mohamed_Irfan_Resume.pdf";
const RESUME_PDF_PATH = "assets/resume/Mohamed_Irfan_Resume.pdf";

const ROLE_TEXT = "Full Stack Developer & AI Enthusiast";

/* Tech Universe Skills: [CategoryKey, CategoryLabel, [[SkillName, SVGIconId, SkillDescription], ...]] */
const TECH_STACK = [
  ['fe', 'Frontend', [
    ['HTML', 'i-html5', 'Structures every page I build'],
    ['CSS', 'i-css3', 'Styling, layout and responsive design'],
    ['JavaScript', 'i-js', 'Interactive logic in the browser'],
    ['Bootstrap', 'i-bootstrap', 'Fast, responsive UI components']
  ]],
  ['be', 'Backend', [
    ['Python', 'i-python', 'My core backend language'],
    ['Flask', 'i-flask', 'Lightweight APIs and routing'],
    ['REST APIs', 'i-api', 'Connecting frontend to backend']
  ]],
  ['ml', 'Data & ML', [
    ['Pandas', 'i-pandas', 'Cleaning and analyzing data'],
    ['NumPy', 'i-numpy', 'Numerical computing'],
    ['Matplotlib', 'i-matplotlib', 'Plotting and visualizing data'],
    ['Scikit-learn', 'i-sklearn', 'Building ML models']
  ]],
  ['db', 'Database', [
    ['SQL', 'i-db', 'Querying relational data'],
    ['MySQL', 'i-db', 'Relational database design'],
    ['MongoDB', 'i-mongodb', 'Flexible NoSQL storage'],
    ['SQLite', 'i-db', 'Lightweight local databases']
  ]],
  ['tl', 'Tools', [
    ['Git', 'i-git', 'Version control for every project'],
    ['GitHub', 'i-github', 'Hosting and collaborating on code'],
    ['VS Code', 'i-vscode', 'My daily code editor'],
    ['Postman', 'i-postman', 'Testing and debugging APIs'],
    ['Jupyter', 'i-jupyter', 'Prototyping and data notebooks']
  ]]
];

/* Live Code displayed on the interactive center monitor */
const CODE_SNIPPET = [
  'from flask import Flask, jsonify, request',
  '',
  'app = Flask(__name__)',
  '',
  '# GreenBot: answer a visitor question',
  '@app.route("/ask", methods=["POST"])',
  'def ask():',
  '    question = request.json["question"]',
  '    answer = knowledge_base.search(question)',
  '    return jsonify({"answer": answer})',
  '',
  'if __name__ == "__main__":',
  '    app.run(debug=True)'
].join('\n');


  /* --- utils.js --- */
  /* ============================================================
   UTILITY HELPERS
   DOM Selectors, Math Interpolation & Hardware Query Utilities
   ============================================================ */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (start, end, progress) => start + (end - start) * progress;
const ease = t => 1 - Math.pow(1 - t, 3);
const vh = () => window.innerHeight;

const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const esc = str =>
  str.replace(/&/g, '&amp;')
     .replace(/</g, '&lt;')
     .replace(/>/g, '&gt;');

function sceneProgress(sectionEl) {
  const rect = sectionEl.getBoundingClientRect();
  const total = sectionEl.offsetHeight - vh();
  return {
    p: clamp(-rect.top / total),
    top: rect.top,
    total
  };
}

function b64ToBlob(b64, mimeType = 'application/pdf') {
  const binaryString = atob(b64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}


  /* --- theme.js --- */
  /* ============================================================
   THEME & COLOR PALETTE MANAGER
   Multi-Palette Selection, Light/Dark Modes & LocalStorage Sync
   ============================================================ */



const root = document.documentElement;

function applyMode(mode, persist = true) {
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

function applyTheme(themeName, persist = true) {
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

function initTheme(onMenuCloseCallback) {
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


  /* --- navigation.js --- */
  /* ============================================================
   NAVIGATION & USER CONTROLS
   Mobile Drawer, Active Nav Observer, Popovers & Back to Top
   ============================================================ */




function initNavigation() {
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


  /* --- hero.js --- */
  /* ============================================================
   HERO WORKSTATION & CODE SIMULATOR
   Responsive Name Typography, Parallax Motion & Monitor IDE
   ============================================================ */




let mx = 0, my = 0, tx = 0, ty = 0;
let visHero = true;

function fitName() {
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

function heroUpdate() {
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

function setHeroVisibility(isVisible) {
  visHero = isVisible;
}

function initHero() {
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


  /* --- tech.js --- */
  /* ============================================================
   TECH UNIVERSE & 3D SKILL CARDS
   Dynamic Card Generation, 3D Perspective Tilt & Interactive Flip
   ============================================================ */




function initTech() {
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


  /* --- journey.js --- */
  /* ============================================================
   JOURNEY & TIMELINE
   Curved SVG Bezier Arc, Walking Node & Scroll Sync
   ============================================================ */



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

function journeyUpdate() {
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

function initJourney() {
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


  /* --- gallery.js --- */
  /* ============================================================
   PROJECT PHOTO GALLERIES & LIGHTBOX
   Accordion Toggles & Keyboard-Navigable Modal Viewer
   ============================================================ */



function initGallery() {
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


  /* --- resume.js --- */
  /* ============================================================
   RESUME DOWNLOAD HANDLER
   Cross-Environment PDF Delivery & Download Button Feedback
   ============================================================ */




function initResume() {
  const resumeBtn = $('#resumeBtn');
  if (!resumeBtn) return;

  let resumeBusy = false;

  async function downloadPdf() {
    try {
      const response = await fetch(RESUME_PDF_PATH);
      if (!response.ok) throw new Error('File not found');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = RESUME_FILENAME;
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      return true;
    } catch (e) {
      // Direct link fallback
      const a = document.createElement('a');
      a.href = RESUME_PDF_PATH;
      a.download = RESUME_FILENAME;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
      return true;
    }
  }

  resumeBtn.addEventListener('click', async () => {
    if (resumeBusy) return;
    resumeBusy = true;
    resumeBtn.dataset.state = 'busy';

    try {
      const hasClaude = typeof window.claude !== 'undefined' && typeof window.claude.use === 'function';
      const downloads = hasClaude ? await window.claude.use('downloads') : null;

      if (downloads) {
        const response = await fetch(RESUME_PDF_PATH);
        const blob = await response.blob();
        await downloads.save({ filename: RESUME_FILENAME, data: blob });
        resumeBtn.dataset.state = 'done';
      } else {
        await downloadPdf();
        resumeBtn.dataset.state = '';
      }
    } catch (err) {
      if (err && err.code === 'declined') {
        resumeBtn.dataset.state = '';
      } else {
        await downloadPdf();
        resumeBtn.dataset.state = 'err';
      }
    } finally {
      resumeBusy = false;
      setTimeout(() => {
        resumeBtn.dataset.state = '';
      }, 2200);
    }
  });
}


  /* --- effects.js --- */
  /* ============================================================
   VISUAL EFFECTS & MICRO-INTERACTIONS
   Neon Cursor Glow, Marquee Track, Tilt, Spotlight & Counters
   ============================================================ */




let gx = 0, gy = 0, gtx = 0, gty = 0, gOn = false;
let glowEl = null;

function glowUpdate() {
  if (!gOn || !glowEl) return;
  gx = lerp(gx, gtx, .16);
  gy = lerp(gy, gty, .16);
  glowEl.style.transform = `translate3d(${gx.toFixed(1)}px,${gy.toFixed(1)}px,0)`;
}

function initEffects() {
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


  /* --- main.js --- */
  /* ============================================================
   APPLICATION ROOT & COORDINATOR
   Module Bootstrapper, Lifecycle Orchestrator & Animation Loop
   ============================================================ */











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

})();
