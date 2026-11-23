# Subrat Ojha — Portfolio

A merge of two designs:

1. **The intro film** — a procedurally drawn, top-down city plaza that pushes
   in on a developer at a laptop (gold on ink, Newsreader + Figtree).
2. **The paper portfolio** — a narrow, dashed-rule column with mono labels,
   section rail, daylight/nocturne themes.

The film is the first viewport. It dissolves, via a dithered edge, into the
paper column that carries the actual portfolio.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Content

All copy and links live in **`config/content.ts`**, taken from
`public/Subrat_Ojha_Resume.pdf` (Aug 2026):

- `profile` — name, role, tagline, location, email, socials, résumé URL
- `intro` — about copy and the "currently" list
- `projects` — ShipCommerce, ResumeXpert, Danni, Hospital Management System,
  MultiThreaded Web Server
- `stack` — six groups mapped from the resume's technical skills
- `experience` — IbaseIT (Apr 2025 — present)
- `education` — MCA, Krupajal Engineering College; BCA, Bhadrak Autonomous College
- `community` — hackathons, CRY, Little Hope
- `sections` — header and section-rail order

`public/Subrat_Ojha_Resume.pdf` is served as the "Résumé" link in the contact
section.

## Deploy (Netlify)

The repo is set up for zero-config Netlify deploys:

1. Netlify → **Add new site → Import an existing project** → pick
   `Subrat-ojha/Portfolio`.
2. Netlify reads `netlify.toml`: build `npm run build`, publish `.next`,
   Node 22 (also pinned in `.nvmrc`).

The OpenNext adapter (`@netlify/plugin-nextjs`) is installed and updated by
Netlify automatically — deliberately not pinned in `package.json`. No
environment variables are needed: the site is static, and the résumé PDF is
served from `public/`.

CLI alternative:

```bash
npx netlify-cli deploy --build --prod
```

## Structure

```
app/
  layout.tsx        fonts, metadata, no-flash theme script
  page.tsx          hero + framed page
  globals.css       theme tokens, paper frame, hero text choreography
components/
  cinematic-hero.tsx  React wrapper: controls, photo, text reveal
  page-sections.tsx   About / Work / Stack / Experience / Education / Community / Contact
  section-shell.tsx   per-section observer + animated chapter header
  words.tsx           splits a heading into revealed words
  scroll-fx.tsx       feeds scroll position to CSS (ghost numerals, gutters)
  site-header.tsx     appears after the film, with scroll progress
  section-rail.tsx    right-side scrollspy rail
  theme-toggle.tsx    nocturne (default) ↔ daylight
  portrait.tsx        reads the photo added in the hero
lib/
  city-scene.ts     the canvas engine (city, crowd, camera, zoom)
```

## Details worth knowing

- The scene has **no image or video assets**. Everything is drawn per frame;
  `prefers-reduced-motion` renders one static final frame instead.
- **Add your photo** in the hero is stored in `localStorage` (`so:portrait`)
  and drawn as the developer's portrait once the camera is close, then reused
  as the About avatar. It never leaves the browser.
- The paper page repeats the intro's language on scroll: each section draws its
  eyebrow rule, surfaces its heading word by word out of blur, drifts an
  outlined chapter numeral against the scroll, and cascades its body items.
  One `IntersectionObserver` per section plus one rAF scroll listener; no
  animation library.
- **Nocturne** is the default theme; the toggle writes `so:theme` and an inline
  script applies it before first paint so there is no flash.
- Private work (ShipCommerce, Danni) is marked "Private" instead of linking
  nowhere. Public repos and ResumeXpert link out.
