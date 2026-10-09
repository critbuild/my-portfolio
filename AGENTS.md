# Portfolio agent guide

Start at [docs/README.md](docs/README.md), then read only the task-relevant document:

- [Architecture and ownership](docs/architecture.md): source map, content, motion, performance constraints.
- [Development and verification](docs/development.md): commands, browser checks, documentation upkeep.
- [Hosting and custom domain](docs/deployment.md): GitHub Pages automation and `critbuild.io` DNS/HTTPS.

## Guardrails

- Keep a modular monolith: shared layout, typed content, small components for real repetition. Do not split unique sections merely to create more files.
- Preserve static Astro output, native CSS motion, and the small event-driven TypeScript runtime. No client framework or animation dependency without a demonstrated need.
- Preserve the approved layout, keyboard access, reduced-motion behavior, and usable content/navigation without JavaScript.
- Keep personal and project claims grounded; do not invent contact details, screenshots, achievements, or metrics.

## Keep this guide lean

Keep only navigation and durable constraints here. Update the owning document in `docs/` alongside behavior changes; link new documents from its index. Do not append session logs, task lists, benchmark snapshots, or duplicate implementation details.

`docs/superpowers/` is historical, not an execution plan or current architecture.
