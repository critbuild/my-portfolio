# Architecture and ownership

## One static application

A modular monolith: Astro renders HTML at build time; plain CSS owns presentation and motion; one small TypeScript module enhances browser interactions. There is no client framework, router, API, database, or animation library. Components do not hydrate in the browser.

The home page contains Hero, Work, About, and Contact chapters. Chapters have a `100svh` minimum height, not a fixed height: long content expands on narrow screens. Ordinary anchors and project links work without JavaScript. The visual identity is orange (`#ff5a1f`), near-black (`#080808`), white, bold Manrope typography, and original mountain-shadow SVG artwork.

## Source owners

Paths are relative to the project root.

| Owner | Responsibility |
| --- | --- |
| [`src/data/portfolio.ts`](../src/data/portfolio.ts) | `profile`, the typed `Project` contract, and the ordered project collection |
| [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro) | Metadata, font preload, header/navigation, main slot, footer, and script entry |
| [`src/pages/index.astro`](../src/pages/index.astro) | Home composition, editorial copy, and one mapped project-card template |
| [`src/pages/projects/[slug].astro`](../src/pages/projects/[slug].astro) | Static routes, shared project-detail template, collection-derived total, circular next-project navigation, and scoped detail styles |
| [`src/pages/404.astro`](../src/pages/404.astro) | Missing-page content and scoped styles |
| [`src/components/ChapterKicker.astro`](../src/components/ChapterKicker.astro) | Repeated chapter label, number, animated divider, and ornament; accepts `number` and `label` |
| [`src/components/Icon.astro`](../src/components/Icon.astro) | Inline SVG icons; accepted names derive from the path map |
| [`src/styles/global.css`](../src/styles/global.css) | Shared tokens, responsive layout, components, and CSS motion in explicit cascade layers |
| [`src/styles/fonts.css`](../src/styles/fonts.css) | Self-hosted Latin Manrope variable WOFF2 face |
| [`src/scripts/site.ts`](../src/scripts/site.ts) | Menu events, motion preference, visibility, focus safety, and reveal lifecycle |
| [`public/art/`](../public/art/) | Original SVG illustrations; conceptual artwork, not product screenshots |
| [`public/fonts-OFL.txt`](../public/fonts-OFL.txt) | Redistributed font copyright and SIL Open Font License |
| [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) | Checks/builds the site and publishes `dist/` to GitHub Pages using its configured origin/base path |

Keep unique home sections together. Extract shared knowledge or repeated behavior, not every repeated HTML tag. Global visual rules stay in CSS; do not mirror them as JavaScript animation definitions.

## Content contract

- Identity and GitHub contact links come from `profile`. There is no pretend contact form or invented email, résumé, or social link.
- Add or reorder projects in `projects`. Keep each `slug` unique, supply its artwork as a `/art/...` path, and maintain the intended `number` labels. Templates apply the deployment base to artwork URLs. Cards, static routes, totals, and next-project navigation share this collection; the total uses `projects.length`, padded to at least two digits.
- About text remains editorial copy in `index.astro`, not verified employment history. Do not add personal facts or outcome metrics without supplied evidence.
- Fairy's summary was grounded in its sibling repository's README; Crit's in its sibling repository's `--help` text (`src/main.rs`) and `Cargo.toml`. Verify those sources when changing their claims; sibling repositories are content references, not runtime dependencies.

## Motion contract

- The native `<details>` mobile menu remains usable without JavaScript. Enhancement closes it on navigation, outside click, Escape, or the desktop breakpoint; Escape restores trigger focus.
- `critbuild-motion` in local storage stores the visitor preference. OS reduced-motion takes precedence. `data-motion` on the document root represents effective motion, including document visibility; `data-scroll-motion` selects `native` or `fallback` based on CSS support.
- `data-reveal-frame` marks a stable observer target. Its `data-reveal="title"`, `"media"`, or `"rule"` descendants animate. Artwork frames also use `data-reveal-surface` for the orange shutter. Preserve these hooks when extracting markup.
- One IntersectionObserver watches reveal frames, the hero, and the mist. Finite animations use `is-entering` / `is-revealing`; completion or cancellation removes the trigger classes. Leaving and re-entering the active viewport band replays reveals.
- CSS scroll timelines add mountain parallax, hero departure, diagonal chapter openings, and contact-arrow rotation. Unsupported browsers retain timed entrances. No scroll interception, forced snapping, pinning, scroll listener, or JavaScript animation loop.
- Hidden documents and disabled motion cancel finite reveals; mist pauses offscreen. Keyboard focus reveals interactive content without artwork curtains or chapter clipping. Without JavaScript, content is visible and the motion button stays hidden.

## Resource and build constraints

Self-host fonts and artwork. Keep project images lazy-loaded with explicit dimensions, preload the single shared font, and retain its license. Avoid background video, WebGL, particle engines, large blur/filter surfaces, third-party runtime requests, and persistent compositor hints. The existing application-JavaScript target is below 10 KB gzipped; transfer bytes are not a measurement of tab or GPU memory.

[`astro.config.mjs`](../astro.config.mjs) uses esbuild for CSS minification. The previously inspected Lightning CSS output merged named `animation-timeline` longhands into shorthand rejected by Chromium, disabling production scroll effects. Changing this setting requires observing actual scroll-linked transforms in a production build, not merely a successful compilation.
