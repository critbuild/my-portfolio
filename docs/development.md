# Development and verification

## Commands

Run from the `portfolio/` project directory. Node.js and npm requirements live in [`package.json`](../package.json); use `npm ci` for a lockfile-based install.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Astro development server |
| `npm run format:css` | Format `src/styles/*.css` with the installed Prettier version |
| `npm run check` | Astro and TypeScript diagnostics |
| `npm run build` | Generate the production site in `dist/` |
| `npm run start -- --port 4321` | Serve the production output locally |

Shared styles use multiline CSS and the existing cascade layers. Project-detail and missing-page styles remain scoped in their Astro files. Formatting is build-time tooling, not a browser dependency.

## Change workflow

1. Use the [source ownership map](architecture.md#source-owners); inspect current callers and existing patterns before editing.
2. Make the smallest cohesive change. Preserve the shared data/layout boundaries instead of adding parallel implementations.
3. Format changed shared CSS, then run `npm run check` and `npm run build` after implementation.
4. Exercise the changed path in the production preview. Compilation alone cannot prove layout, motion, or navigation.
5. Update the owning documentation and remove temporary fixtures. Report only the verification actually performed and any remaining limits.

## Browser smoke checks

Choose checks affected by the change; motion or shared-layout changes need the broader set. Use screenshots for visual proof, not only DOM assertions.

- **Layout:** inspect desktop and phone widths, including 320px for overflow. Verify the hero, all chapters, and project pages; content must grow rather than clip. For a layout-preserving refactor, compare chapter/card geometry before and after.
- **Shared chapter markup:** inspect Work, About, and Contact labels/dividers; verify divider motion still triggers and settles after component extraction.
- **Navigation:** open a project from Work, follow next-project navigation through the collection, return to Work, and verify an unknown route serves the missing-page surface.
- **Project data:** when changing collection-dependent behavior, render with an additional in-memory project and check the displayed total follows the collection. Do not ship the temporary entry.
- **Mobile menu:** open it, navigate, and verify closure; also check outside click, Escape with returned focus, and resizing to desktop.
- **Motion:** observe hero arrival, chapter/title cuts, artwork shutters, forward and reverse scroll effects, replay after leaving the active band, settled finite effects, and offscreen mist pause.
- **Access and preferences:** focus a project during a reveal; confirm it stays visible. Toggle motion and reload/navigate to a project. Enable OS reduced-motion during animation and confirm immediate cancellation. Disable JavaScript and check content, native menu, anchors, and project navigation.
- **Fallbacks:** exercise the no-scroll-timeline branch. Feature-detection overrides in Chromium check the branch, not compatibility with another browser engine.
- **Visibility:** verify a real `document.visibilityState` transition before claiming hidden-tab cancellation. Earlier managed headless tabs did not expose that transition; synthetic events alone are not proof.

Do not infer RAM use from asset sizes or JavaScript heap alone. Cross-browser and real-device performance claims need their own measurements.

## Deployment

GitHub Pages publishes the production `dist/` artifact. See [Hosting and custom domain](deployment.md) for the automated workflow, deployment-base handling, and the `critbuild.io` registration/DNS/HTTPS steps.

Astro preview is a local verification server, not the deployment server. Follow its printed address and stop command; stop temporary verification servers when finished.

## Keep documentation lean

- `AGENTS.md` holds navigation and durable constraints, not implementation detail.
- `docs/README.md` routes readers to one owning document per topic. Link new maintained documents there.
- Update the existing owner alongside changed behavior; avoid duplicating architecture, commands, or motion rules across pages.
- Keep the project README a quick start. Do not accumulate session transcripts, completed task lists, or undated benchmark snapshots in maintained guidance.
- `docs/superpowers/` preserves the retired Next.js terminal design only. Do not execute those plans or treat them as current requirements.
