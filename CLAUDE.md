# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

8ctal's personal portfolio site (Spanish-language content), deployed at https://8ctal.dev. It is a **Vite + React 19** app — not Next.js, no SSR/SSG, no file-based routing. Almost the whole site is still one scrolling page navigated by anchor links, but it does use **React Router** (`react-router-dom`, `<BrowserRouter>` in `main.jsx`) for a small number of real routes — `/blog` and `/blog/:slug` — alongside that anchor-link home page; see Architecture below. 3D scenes are built with React Three Fiber, drei, and three.js; scroll/entrance animations use GSAP (framer-motion also appears in several ported components); styling is Tailwind CSS v4; the contact form sends through EmailJS.

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

- `src/main.jsx` wraps `<App />` in `<BrowserRouter>` (and `MotionPreferenceProvider`). `src/App.jsx` renders the chrome that's global across every route — `BootLoader`, `CustomCursor`, `NavBar`, a `<Routes>` switch, `Footer`, `FloatingCVButton` — and the switch has three routes: `/` → `src/pages/Home.jsx` (the flat composition of full-page `<section>` components from `src/sections/`: Hero, StatsShowcase, ShowcaseSection, LogoShowcase, FeatureCards, Experience, Certifications, TechStack, Testimonials, RecentThoughts, Contact), `/blog` → `src/pages/BlogIndex.jsx`, `/blog/:slug` → `src/pages/BlogPost.jsx`. Within the home page, navigation is still anchor links (`#work`, `#experience`, …) into that single scrolling page. `NavBar.jsx`'s `navLinks` entries are `/#work`-style (leading slash) rather than bare `#work` so they still resolve correctly when clicked from `/blog`; a link containing `#` renders as a plain `<a>`, everything else (`/blog`) renders as a router `<Link>` — see its `NavLinkItem` helper.
- `public/404.html` plus a matching inline script in `index.html`'s `<head>` implement the standard GitHub-Pages SPA fallback (rafgraph/spa-github-pages): GitHub Pages has no server-side routing, so a hard reload or direct link to `/blog/algun-post` 404s without this. `pathSegmentsToKeep` in `404.html` is `0` because the site serves from its custom domain's root, not a `github.io/<repo>/` subpath.
- `src/constants/index.js` is the single source of truth for most content data — nav links, hero words, counters, logos, project/experience/certification/testimonial entries, tech stack. Updating portfolio *content* almost always means editing this file (plus dropping new assets in `public/`), not the section JSX. Blog posts are the one exception: they live in `src/constants/blog.js` (`body` is an array of paragraph strings — no Markdown/MDX pipeline is wired up) since they're a distinct content shape; `src/constants/blogIcons.js` is a small named-import lookup from a post's `icon` field to a lucide-react icon component (deliberately not `import * as Icons from "lucide-react"`, which would defeat tree-shaking for the whole icon set).
- Several components (`BlackHoleHeroSection`, `DisplayCards`, `StatsShowcase`, `CertificationStack`, `InteractiveFolderGallery`, `ProjectDetailModal`, `GlobeCdn`, `BlurText`) are hand-ported from TypeScript/Next.js reference components under `ref_components/` (21st.dev-style community components, several by way of `npx shadcn add <url>`). None of that TS tooling exists in this project, so porting means stripping `interface`/`type` blocks, generics, `as` casts and `!` non-null assertions by hand (or a small throwaway Node script for a long file — see git history) while deliberately preserving every explanatory comment, since esbuild's own TS→JS transform silently drops comments it can't reliably reattach. A ported component's shadcn/Next-specific bits (a `@/lib/utils` `cn` import, `bg-muted`/`text-muted-foreground`/other shadcn theme tokens, `"use client"`) get swapped for this project's own equivalents (`src/lib/cn.js`, the real `glass-*`/`black-*`/`blue-*` color tokens — see DESIGN.md) rather than left in, since none of those shadcn tokens resolve to anything here.
- 3D scenes live under `src/components/models/`, one subfolder per `<Canvas>`: `hero_models/` (HeroExperience, EightBall, PoolBall, Room, NetrunnerOffice, Particles, HeroLights) for the Hero section, `contact/` (ContactExperience, Computer) for the Contact section, `tech_logos/` (TechIconCardExperience) for the animated tech-stack icons. They load `.glb` files from `public/models/` via drei's `useGLTF`.
- Static assets (images, `.glb` models, the CV, textures, `screen.mp4`) live in `public/` and are referenced by root-relative paths (`/images/...`, `/models/...`), since Vite serves `public/` at the site root. `vite.config.js` sets `base: '/'` (the site is served from the domain root, not a subpath).
- `src/sections/Contact.jsx` submits via `@emailjs/browser`'s `sendForm`, reading three `VITE_APP_EMAILJS_*` values from `import.meta.env` (see below). Vite inlines `VITE_`-prefixed env vars into the client bundle at build time — they end up in the shipped JS, which is expected for EmailJS's public-key model.
- `gsap` is imported directly across several components/sections but is only a *peer* dependency of `@gsap/react`, so it must stay listed as its own direct dependency in `package.json` — under npm it worked by accident via hoisting, but pnpm's strict `node_modules` will fail the build (`Rollup failed to resolve import "gsap"`) if that direct dependency entry is ever removed.
- ESLint's `no-unused-vars` (see `eslint.config.js`) ignores identifiers starting with an uppercase letter or `_` (`varsIgnorePattern: '^[A-Z_]'`) — mainly so unused component imports don't get flagged. Lowercase unused vars/imports still fail lint (and thus fail the CI build). That pattern is `varsIgnorePattern` specifically, with no matching `argsIgnorePattern` configured: it covers top-level `const`/`import` bindings, but *not* an unused destructured function parameter, even one capitalized and only ever referenced as a JSX tag name (e.g. `({ as: Tag = "span" }) => <Tag />` — plain `no-unused-vars`, without `eslint-plugin-react`'s JSX-usage detection, doesn't credit that as a use). Destructure it as a plain `const` inside the function body instead, if that comes up.

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
