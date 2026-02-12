# Internet Redactor

Internet Redactor is a cross-platform desktop application (macOS + Windows) built with **Electron**, **React**, and **strict TypeScript**.

## Core Product Goal

The app helps users redact personal historical content (posts/comments) from supported websites with a **security-first execution model**:

1. Prefer **official site APIs** for preview + deletion.
2. Use **browser automation only as a fallback** for websites without robust APIs.
3. Keep destructive actions in the Electron **main process**, not the renderer.

## Architecture & Security Defaults

- Package manager: **pnpm**
- Frontend tooling: **Vite + React**
- TypeScript: **strict mode ON**
- Tests: **Vitest** (unit/integration), **Playwright** (fallback automation E2E)
- Lint/format: **ESLint + Prettier**
- Token storage: **OS-protected secure storage** via `keytar` (Keychain/DPAPI-backed)
- Electron BrowserWindow defaults:
  - `contextIsolation: true`
  - `nodeIntegration: false`
  - `sandbox: true`
  - `webSecurity: true`
  - `allowRunningInsecureContent: false`
- IPC is allowlisted and origin-validated.
- No arbitrary embedded website views in the UI.

## Repository Layout

```text
.
├── apps
│   └── desktop
│       ├── package.json
│       ├── playwright.config.ts
│       ├── src
│       │   ├── main
│       │   │   └── index.ts
│       │   ├── preload
│       │   │   └── index.ts
│       │   └── renderer
│       │       ├── index.html
│       │       └── src
│       │           ├── App.tsx
│       │           ├── components
│       │           │   └── SiteSelector.tsx
│       │           ├── global.d.ts
│       │           ├── main.tsx
│       │           └── styles
│       │               └── app.css
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── vite.main.config.ts
│       ├── vite.preload.config.ts
│       └── vitest.config.ts
├── packages
│   ├── connectors
│   │   ├── package.json
│   │   └── src
│   │       ├── connectors
│   │       │   ├── legacyForumConnector.ts
│   │       │   └── redditConnector.ts
│   │       ├── index.ts
│   │       ├── registry.test.ts
│   │       ├── registry.ts
│   │       └── types.ts
│   ├── core
│   │   ├── package.json
│   │   └── src
│   │       ├── index.test.ts
│   │       └── index.ts
│   └── shared
│       ├── package.json
│       └── src
│           ├── http
│           │   └── apiClient.ts
│           ├── index.ts
│           ├── security
│           │   └── secureStore.ts
│           ├── types.ts
│           └── validation
│               ├── ipc.test.ts
│               └── ipc.ts
├── tests
│   └── e2e
│       └── legacy-forum.spec.ts
├── eslint.config.js
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── .prettierrc.json
```

## High-Level Flow

1. User chooses a supported site in the React UI.
2. Renderer calls a minimal preload bridge API.
3. Main process validates IPC origin + payload schema.
4. Main process loads OAuth session from secure OS storage.
5. Connector executes preview/delete with official API when available.
6. Fallback connector path is isolated for Playwright-based automation tests.

## Commands

From repo root:

- `pnpm dev` – run renderer + Electron in development.
- `pnpm build` – build all packages/apps.
- `pnpm test` – run all Vitest tests.
- `pnpm test:e2e` – run Playwright fallback tests.
- `pnpm lint` – run ESLint across workspaces.
- `pnpm format` – format with Prettier.

## Current Connector Notes

- `reddit`: official API connector scaffold for preview/delete.
- `legacy-forum`: automation-fallback connector scaffold (for sites lacking APIs).

> Add site-specific OAuth/OpenID provider configs and scopes before production use.
