# Mohamed Irfan — Portfolio

A high-performance, modular portfolio website featuring custom glassmorphism design, responsive layouts, 3D interactive elements, and multi-palette color themes.

---

## 📁 Modular Architecture

The original monolithic single-file portfolio has been modularized into separate, dedicated CSS and JavaScript modules, clean HTML, and organized static assets:

```
portfolio/
├── index.html                   # Semantic HTML markup (clean & lightweight)
├── css/                         # Modular CSS stylesheets
│   ├── style.css                # Master bundle importing all CSS modules
│   ├── tokens.css               # Design tokens, color palettes, typography, CSS reset
│   ├── nav.css                  # Fixed header, mobile drawer menu, avatar & theme popovers
│   ├── hero.css                 # 3D workstation setup, triple monitors, live IDE styling
│   ├── tech.css                 # Tech Universe grid, 3D flip-cards, interactive hover states
│   ├── journey.css              # Scroll-driven curved SVG bezier timeline & milestone cards
│   ├── projects.css             # Featured project displays, simulated dashboards, tag pills
│   ├── gallery.css              # Collapsible project photo galleries & modal lightbox viewer
│   ├── resume.css               # Experience & education cards, CGPA counter, coursework
│   ├── about-contact.css        # About section pillars, contact CTA, phone/WhatsApp popover
│   └── animations.css           # Neon cursor follower, scroll progress, marquee, 3D tilt
├── js/                          # Native ES modules
│   ├── main.js                  # Application coordinator, lifecycle management & RAF loop
│   ├── config.js                # Contact links, social profiles, tech stack & code snippet data
│   ├── utils.js                 # DOM helpers, math interpolation (clamp/lerp/ease) & device queries
│   ├── theme.js                 # Theme switcher (6 palettes) & Light/Dark mode with LocalStorage sync
│   ├── navigation.js            # Mobile drawer, active link intersection observer & back-to-top
│   ├── hero.js                  # Responsive name sizing (fitName), parallax tilt & live code simulator
│   ├── tech.js                  # Dynamic skill card rendering, 3D pointer tilt & flip interactions
│   ├── journey.js               # Bezier curve math, walking glowing node & timeline scroll synchronization
│   ├── gallery.js               # Photo gallery accordion toggles & keyboard-accessible lightbox
│   ├── resume.js                # Cross-platform resume PDF download handler
│   └── effects.js               # Cursor neon glow, scroll progress bar, marquee track & CGPA count-up
└── assets/                      # External media & documents
    ├── images/
    │   ├── avatar.jpg           # Profile avatar photo
    │   └── projects/            # 25 High-resolution project screenshots
    │       ├── pollify-*.jpg
    │       ├── greenbot-*.jpg
    │       ├── sms-*.jpg
    │       ├── ashok-*.jpg
    │       ├── ecobuild-*.jpg
    │       └── mi-*.jpg
    └── resume/
        └── Mohamed_Irfan_Resume.pdf # Downloadable resume PDF
```

---

## 🚀 How to Run Locally

Because the application uses native JavaScript ES Modules (`<script type="module">`), run it using any local HTTP server:

### Option 1: Python
```bash
python -m http.server 3000
```
Then visit: `http://localhost:3000`

### Option 2: Node.js (npx serve or http-server)
```bash
npx -y serve .
```

---

## 🎨 Customization Guide

1. **Update Links & Contact Info**:
   Open [`js/config.js`](file:///c:/Users/Irfan/portfolio/js/config.js) and update the `CONFIG.links` object (email, LinkedIn, GitHub, phone, project live links).

2. **Add or Edit Skills**:
   In [`js/config.js`](file:///c:/Users/Irfan/portfolio/js/config.js), modify `TECH_STACK` to add or modify skill cards in each category.

3. **Update Theme Colors**:
   In [`css/tokens.css`](file:///c:/Users/Irfan/portfolio/css/tokens.css), adjust or add new color palettes under `[data-theme="..."]`.
