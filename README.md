# AfixTech — Professional Static Portfolio & Commercial Website

This is the authoritative source repository for the AfixTech portfolio website (Project Code: `PROJECT 01`). It is engineered as a fully static, high-performance website built with semantic HTML5, CSS3, and modern vanilla JavaScript (ES6+).

## 1. Project Overview
* **Client:** AfixTech
* **Brand Subtitle:** Communications Networks
* **Primary Contact Phone:** +234 810 592 1083
* **Primary Contact Email:** afixtech.cn@gmail.com
* **Primary Objective:** Showcase AfixTech's professional web engineering capabilities and capture client project inquiries.

---

## 2. Technical Stack & Philosophy
* **Markup:** Semantic HTML5 with WCAG 2.2 AA accessibility landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **Styling:** Modular CSS3 with CSS custom properties (`tokens.css`), reset (`reset.css`), base layout (`base.css`), component architecture (`components.css`), and page-specific styles (`pages.css`). No CSS frameworks (Tailwind, Bootstrap) are used.
* **Scripting:** Vanilla JavaScript ES6+ ES Modules (`main.js`, `nav.js`, `animations.js`, `form.js`, `utils.js`). No external heavy JS frameworks (React, Vue) or libraries (jQuery) are used.
* **Build Philosophy:** Pure static HTML source authoring. Zero build heavy tooling required; completely readable source code.

---

## 3. Shared Layout Strategy Decision
Per Section 2.5 of the production specification and client decision:
* **Selected Option:** Option C — Duplicated HTML across pages with strict layout discipline.
* **Rationale:** Provides 100% zero-JS fallback, guarantees immediate SEO indexability without runtime client rendering delays, and ensures simple static CDN deployment.

---

## 4. Contact Form Integration
* **Service:** Web3Forms third-party static endpoint (`https://api.web3forms.com/submit`).
* **Validation & Security:** Native HTML5 constraints with client-side JS feedback, hidden honeypot spam protection (`botcheck`), and accessible `aria-live` status regions.
* **Fallback:** Direct mailto links to `afixtech.cn@gmail.com`.

---

## 5. Directory Architecture
```
afixtech/
├── index.html                   # Homepage
├── about.html                   # About AfixTech
├── services.html                # Services index (9 core categories)
├── portfolio.html               # Portfolio index with JS filtering
├── process.html                # 6-stage methodology & Why AfixTech
├── contact.html                 # Contact details & Web3Forms form
├── 404.html                     # Custom 404 page
│
├── portfolio/
│   ├── afixtech-portfolio.html  # Flagship portfolio case study
│   └── swiftdrop-logistics.html # SwiftDrop Logistics case study
│
├── assets/
│   ├── css/
│   │   ├── reset.css            # Standardized browser reset
│   │   ├── tokens.css           # Color palette, clamp typography, spacing
│   │   ├── base.css             # Typography & grid primitives
│   │   ├── components.css       # Nav, buttons, cards, forms, footer
│   │   └── pages.css            # Page-specific rules & mockups
│   │
│   └── js/
│       ├── main.js              # Entry point loader
│       ├── nav.js               # Mobile focus trap & ARIA menu
│       ├── animations.js        # IntersectionObserver scroll reveals
│       ├── form.js              # Client-side form validation
│       └── utils.js             # Portfolio category filtering
│
├── robots.txt                   # Search engine crawling rules
├── sitemap.xml                  # XML sitemap
└── README.md                    # Project documentation
```

---

## 6. Local Development & Preview
To run the website locally, use any standard static server:

```bash
# Using Python built-in HTTP server:
python3 -m http.server 8000

# Or using Node http-server:
npx http-server . -p 8000
```
Then open `http://localhost:8000` in your web browser.

---

## 7. Automated Site Verification
We created a custom Python audit script to verify site health:
```bash
python3 /home/jules/self_created_tools/verify_site.py
```
This script validates image `alt` attributes, internal link integrity, and heading hierarchy across all HTML files.

---

## 8. Security & Deployment Headers
Recommended headers to configure at your static hosting provider (Netlify / Vercel / Cloudflare Pages):
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.web3forms.com; img-src 'self' data:;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
