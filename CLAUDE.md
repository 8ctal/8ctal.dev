# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

8ctal's personal portfolio site (Spanish-language content), deployed at https://8ctal.dev. It is a **Vite + React 19** single-page app — not Next.js, no SSR/SSG, no file-based routing. 3D scenes are built with React Three Fiber, drei, and three.js; scroll/entrance animations use GSAP; styling is Tailwind CSS v4; the contact form sends through EmailJS.

## Commands

Package manager is **pnpm** (see `packageManager` in package.json; do not use npm/yarn — the lockfile is `pnpm-lock.yaml`).

- `pnpm install` — install dependencies
- `pnpm dev` — start the Vite dev server
- `pnpm build` — production build to `dist/`
- `pnpm preview` — serve the production build locally
- `pnpm lint` — ESLint (flat config in `eslint.config.js`)

There is no test suite in this repo.

`pnpm install` needs native postinstall scripts (`@tailwindcss/oxide`, `esbuild`) to run; these are pre-approved via `pnpm-workspace.yaml`'s `allowBuilds`/`onlyBuiltDependencies`. If a new dependency needs a postinstall script, pnpm will block it until it's added there too.

## Architecture

- `src/main.jsx` mounts `<App />`. `src/App.jsx` is a flat, un-routed composition of full-page `<section>` components from `src/sections/` (Hero, ShowcaseSection, LogoShowcase, FeatureCards, Experience, Certifications, TechStack, Testimonials, Contact, Footer) plus `NavBar` and `FloatingCVButton` from `src/components/`. Navigation is anchor links (`#work`, `#experience`, …) into that single scrolling page, not React Router.
- `src/constants/index.js` is the single source of truth for content data — nav links, hero words, counters, logos, project/experience/certification/testimonial entries, tech stack. Updating portfolio *content* almost always means editing this file (plus dropping new assets in `public/`), not the section JSX.
- 3D scenes live under `src/components/models/`, one subfolder per `<Canvas>`: `hero_models/` (HeroExperience, EightBall, PoolBall, Room, NetrunnerOffice, Particles, HeroLights) for the Hero section, `contact/` (ContactExperience, Computer) for the Contact section, `tech_logos/` (TechIconCardExperience) for the animated tech-stack icons. They load `.glb` files from `public/models/` via drei's `useGLTF`.
- Static assets (images, `.glb` models, the CV, textures, `screen.mp4`) live in `public/` and are referenced by root-relative paths (`/images/...`, `/models/...`), since Vite serves `public/` at the site root. `vite.config.js` sets `base: '/'` (the site is served from the domain root, not a subpath).
- `src/sections/Contact.jsx` submits via `@emailjs/browser`'s `sendForm`, reading three `VITE_APP_EMAILJS_*` values from `import.meta.env` (see below). Vite inlines `VITE_`-prefixed env vars into the client bundle at build time — they end up in the shipped JS, which is expected for EmailJS's public-key model.
- `gsap` is imported directly across several components/sections but is only a *peer* dependency of `@gsap/react`, so it must stay listed as its own direct dependency in `package.json` — under npm it worked by accident via hoisting, but pnpm's strict `node_modules` will fail the build (`Rollup failed to resolve import "gsap"`) if that direct dependency entry is ever removed.
- ESLint's `no-unused-vars` (see `eslint.config.js`) ignores identifiers starting with an uppercase letter or `_` (`varsIgnorePattern: '^[A-Z_]'`) — mainly so unused component imports don't get flagged. Lowercase unused vars/imports still fail lint (and thus fail the CI build).

## Environment variables

`.env` (gitignored; template in `.env_template`) must define:
- `VITE_APP_EMAILJS_SERVICE_ID`
- `VITE_APP_EMAILJS_TEMPLATE_ID`
- `VITE_APP_EMAILJS_PUBLIC_KEY`

These are required for the contact form to work, both locally (`pnpm dev`/`pnpm build`) and in CI. In GitHub Actions they're supplied as repository secrets of the same names (see Deployment).

## Deployment

- Hosted on GitHub Pages at the custom domain `8ctal.dev` (the CNAME is configured in the repo's Pages settings, not a `public/CNAME` file — Pages source is "GitHub Actions", build type `workflow`).
- `.github/workflows/deploy.yml` builds with pnpm and publishes via GitHub's native Pages Actions flow (`actions/upload-pages-artifact` + `actions/deploy-pages`) on every push to `main`, plus manual `workflow_dispatch`. No local build/deploy step is needed anymore.
- The previous manual flow (`npm run deploy` → the `gh-pages` package pushing `dist/` to a `gh-pages` branch) has been retired; `gh-pages` was removed from `devDependencies` and the `predeploy`/`deploy` scripts were removed. Don't reintroduce that flow — the `gh-pages` branch is no longer the Pages source.
