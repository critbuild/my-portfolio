export interface Project {
  slug: string;
  title: string;
  number: string;
  category: string;
  summary: string;
  stack: string[];
  art: string;
  overview: string;
  features: { title: string; text: string }[];
}

export const profile = {
  name: 'critbuild',
  github: 'https://github.com/critbuild',
  description:
    'The developer portfolio of critbuild. Local companions, agent tools, and purposeful digital experiences — built with a small browser footprint.',
};

export const projects: Project[] = [
  {
    slug: 'fairy',
    title: 'Fairy',
    number: '01',
    category: 'Local desktop companion',
    summary:
      'A local desktop companion connecting conversation, desktop tools, and durable memory through one shared backend and several everyday interfaces.',
    stack: ['Python', 'FastAPI', 'Tauri v2', 'Rust', 'QML', 'SQLite'],
    art: '/art/fairy.svg',
    overview:
      'Fairy brings conversation and desktop capabilities into a local companion. A hotkey-opened Noctalia panel offers an everyday entry point, while a Tauri shell holds chat and workspaces. Behind these different surfaces, one backend owns the turn pipeline, registered tools, and durable local state.',
    features: [
      {
        title: 'Different surfaces. One conversation path.',
        text: 'CLI chat, optional voice, the Noctalia panel, and the Tauri dashboard share the /turns backend. Voice becomes text before entering the same ChatFacade and TurnManager pipeline as typed conversation.',
      },
      {
        title: 'A companion within the desktop.',
        text: 'Super+Space opens the Noctalia QML panel for attention, running work, conversation, and a prompt that can summon apps. The Tauri v2 shell provides a separate home for persistent chat, Terminal, and Studio.',
      },
      {
        title: 'Memory with a local authority.',
        text: 'Exact SQLite conversation recall sits alongside a separate MemoryStore authority. Semantic recall is a disposable projection, while capture and consolidation remain auditable and local state persists beyond a single turn.',
      },
    ],
  },
  {
    slug: 'crit',
    title: 'Crit',
    number: '02',
    category: 'Worktree-first terminal',
    summary:
      'A worktree-first terminal for OMP and OpenCode: one Git branch per pane, an isolated Docker environment per worktree, and a natural-language launcher for the controls.',
    stack: ['Rust', 'ratatui', 'Docker Compose', 'Kitty'],
    art: '/art/crit.svg',
    overview:
      'Crit runs coding agents inside Git worktrees instead of a single checkout. Tabs and splits map to branches, each worktree can bring up its own Compose stack on isolated loopback ports, and an F1 launcher turns plain requests into supported Crit actions. Agent sessions, workspace shells, and Kitty shortcuts stay inside one terminal.',
    features: [
      {
        title: 'A branch is a pane.',
        text: 'Splitting the terminal asks for a branch name and opens its worktree in the second pane, based on the focused checkout’s HEAD. Tabs open worktrees, other project folders, or already-open projects; Ctrl+D drops into an agent’s workspace shell without stopping it, and closing a tab never deletes its checkout.',
      },
      {
        title: 'Environments that do not collide.',
        text: 'New worktrees start their Compose stack automatically when configured. Each gets its own project, networks, named volumes, build image, and dynamically allocated loopback host ports; external networks, external volumes, and host networking are refused. An optional crit.toml injects a sibling service’s URL into a container’s runtime environment.',
      },
      {
        title: 'Natural language, bounded actions.',
        text: 'F1 interprets a request through the authenticated OMP installation with no tools, extensions, or persistent session. Only supported Crit actions and known destinations can execute — never model-generated shell commands — and destructive actions still confirm. F2 exposes the same controls without a model.',
      },
    ],
  },
  {
    slug: 'portfolio',
    title: 'critbuild',
    number: '03',
    category: 'Personal portfolio',
    summary:
      'A static portfolio pairing original mountain illustrations with editorial typography, native CSS motion, and a deliberately small browser runtime.',
    stack: ['Astro', 'CSS', 'TypeScript', 'SVG'],
    art: '/art/portfolio.svg',
    overview:
      'This portfolio pairs mountain shadows with a high-contrast orange, black, and white identity. Original SVG landscapes carry the atmosphere; bold typography and precise rules give the projects room to breathe. Astro produces static pages, with plain CSS and small, event-driven TypeScript supporting the presentation.',
    features: [
      {
        title: 'Static pages. Direct navigation.',
        text: 'Astro generates the landing page and all three project routes from shared project data. Navigation uses ordinary links, and each project’s copy, illustration, and architecture notes remain available without JavaScript.',
      },
      {
        title: 'Atmosphere drawn, not streamed.',
        text: 'Original SVG illustrations use monochrome mountain silhouettes, white technical linework, and vivid orange accents. They are conceptual artwork, not product screenshots, and need no video, canvas, or WebGL renderer.',
      },
      {
        title: 'A deliberately small runtime.',
        text: 'Plain CSS handles layout and native motion, while tiny event-driven TypeScript supports interaction. The site uses no React or animation library, keeping the presentation independent of a client-side application framework.',
      },
    ],
  },
];
