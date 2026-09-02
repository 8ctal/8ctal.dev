# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, served by the same single-scroll page:

1. **Prospective freelance clients** deciding whether to hire Camilo for a custom web/mobile project — they want proof he can scope, build, and ship something that works.
2. **Recruiters / hiring managers** evaluating him for a full-time software engineering role — they want a fast read on technical range and real professional experience.

Both are doing the same job on this site: quickly judge technical range and credibility, then act — message him about a project, or reach out about a role.

## Product Purpose

Personal portfolio for Camilo Jaimes ("8ctal"), a Colombian software engineer. It exists to generate both freelance project leads and full-time job opportunities by showcasing shipped work, technical breadth, and verifiable professional experience. Success is a visitor using the EmailJS contact form, or downloading the CV to pursue a role.

## Positioning

A full-stack generalist (React, Node/Express, Java/Spring Boot, Flutter, Angular) who also builds real-time 3D/interactive experiences (Three.js, React Three Fiber) — most developer portfolios at this career stage show one or the other, not both. The site's own hero (a 3D scene, not a static image) is itself evidence of that craft, not just decoration.

## Operating Context

- The site is the "storefront" linked from GitHub, LinkedIn, Instagram, and X profiles (see `socialImgs` in `src/constants/index.js`).
- Single scrolling page, anchor-link navigation: Hero → Work/Projects → Experience → Skills/Tech stack → Certifications → Testimonials → Contact → Footer.
- Contact happens through the EmailJS-powered contact form; the CV is a Google Drive link (`cvLink`) surfaced via a floating CV button.
- All portfolio content (projects, experience, certifications, tech stack) is maintained by hand-editing `src/constants/index.js` — there is no CMS.

## Capabilities and Constraints

- Static SPA, no backend of its own. All content lives in `src/constants/index.js`.
- Deployed at the custom domain `8ctal.dev` via GitHub Pages (GitHub Actions build/deploy).
- The contact form depends on 3 `VITE_APP_EMAILJS_*` env vars being present at build time (see the project's `CLAUDE.md`).
- The Hero, Contact, and Tech Stack sections render `.glb` models via React Three Fiber/drei — any visual work touching them must account for 3D rendering cost, especially on mobile.
- Undecided: whether the current hero 3D asset (the eight-ball/pool-ball model) itself gets refined/replaced, or only the design system around it changes — that is a visual decision for later design work, not settled here.

## Brand Commitments

- Name/handle: **8ctal** (Camilo Jaimes), used consistently across GitHub, Instagram, X, LinkedIn, and the `8ctal.dev` domain.
- The **eight-ball / pool-ball motif** (the hero's 3D model, `logo_8ball.png`, `8ctal_logo_resized.png`) is a confirmed, binding brand element — any redesign builds on it rather than replacing it.
- Content is in **Spanish**; the audience is Spanish-speaking.

## Evidence on Hand

- Real shipped projects with descriptions, tech stacks, and links: ParchUIS, GymApp, School Admin, Wallet App, StyleBGA, Doctor Landing (`projects` in `src/constants/index.js`).
- Real professional experience with reviews: freelance developer (Ene 2025–actualidad), Administrador at "Cabecera" (Jun–Dic 2024), Director de marketing at "Probell" (Ene–May 2022).
- Real certifications with credential IDs and third-party verification links (MinTIC AI bootcamp, IBM/Coursera ML, Oracle Next Education backend, Udemy Flutter).
- Real CV (Google Drive link) and real social links (GitHub, Instagram, X, LinkedIn).
- **The Testimonials section is placeholder, not real evidence**: it currently renders fake reviewer data left over from the original template (English-language quotes, stock names like "Esther Howard", referencing a person named "Adrian" who isn't Camilo) and is manually hidden behind an "En construcción..." message in `src/sections/Testimonials.jsx`. Future work must not surface that placeholder content as real; either source genuine client testimonials or keep the section hidden.
- `expLogos` (`logo1.png`, `logo2.png`, `logo3.png`) appear to be unused/orphaned placeholder assets — not confirmed as used by any current section.

## Product Principles

1. Prove capability with real, verifiable work — every project, experience entry, and certification shown must be genuine (the existing certifications already link to verification pages; keep that standard).
2. Serve both audiences from one page — freelance clients and full-time recruiters must each find what they need without a forked experience.
3. The site's own execution is part of the pitch — its 3D work, animation, and performance should demonstrate the same craft being marketed, not undercut it.
4. Never ship fabricated content — placeholder/template material (like the current fake testimonials) must stay clearly out of the shipped experience until it's replaced with something real.
