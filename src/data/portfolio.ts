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
    slug: 'qq',
    title: 'qq',
    number: '02',
    category: 'Composable agent toolkit',
    summary:
      'A Rust toolkit for running and orchestrating AI agents, with a terminal interface, workspace tools, and explicit action approvals.',
    stack: ['Rust', 'TUI', 'MCP', 'RON'],
    art: '/art/qq.svg',
    overview:
      'qq is a composable toolkit for building, running, and orchestrating AI agents. Its interactive terminal interface connects to a user-scoped background server. Agents can work with files, shell commands, and MCP tools, with approval policy making the boundary between a proposed action and execution explicit.',
    features: [
      {
        title: 'A terminal surface. A separate server.',
        text: 'Launching qq without a subcommand opens the interactive TUI against a user-scoped background server. The server can also run in the foreground through qq serve, keeping the interface and agent service distinct.',
      },
      {
        title: 'Actions cross an approval boundary.',
        text: 'Read-only, ask, and auto modes define which tools may execute. Approval prompts expose the exact command or edit diff; session grants and allowlisted command prefixes make permission specific rather than implicit.',
      },
      {
        title: 'Tools share an event and policy flow.',
        text: 'MCP tools join the same approval and event flow as built-in tools, under namespaced identifiers. Both stdio and streamable-HTTP transports are supported, with workspace declarations gated by trust.',
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
