# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build to ./dist
npm run preview    # Preview production build
npm run lint       # Lint with ESLint
npm run format     # Format with Prettier
```

No test suite is configured.

## Architecture

React 18 + Vite portfolio site deployed to GitHub Pages (emirtutar.github.io/Portfolio). Uses **HashRouter** (not BrowserRouter) — this is intentional and required for GitHub Pages to work without server-side routing.

**Content is data-driven**: all editable content lives in `src/data/` as JS modules, not hardcoded in components. When adding or modifying projects, experience, or skills, edit only the data files.

**i18n is mandatory**: every UI string must go through `useTranslation()` with a key defined in all three locale files (`public/locales/{en,de,tr}/translation.json`). The i18n backend loads from `import.meta.env.BASE_URL` + `locales/` — use this pattern when referencing public assets in code.

### Key directories

- `src/data/` — source of truth for projects, timeline, and technologies
- `src/pages/` — one file per route; `ProjectDetail.jsx` uses the `id` field from `projects.js` for dynamic routing
- `src/i18n/i18n.js` — i18next config with HTTP backend (translations loaded at runtime, not bundled)
- `public/locales/` — translation JSON files (must stay in sync across `en`, `de`, `tr`)
- `public/` — static assets including the resume PDF and project demo assets

### Vite config note

`vite.config.js` sets `base: '/Portfolio/'`. Asset paths in code must use `import.meta.env.BASE_URL` rather than hardcoded `/` roots, or they will break on GitHub Pages.

### Prettier config

No semicolons, single quotes, trailing commas (ES5 mode). Run `npm run format` before committing.

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on push to `main`: `npm ci` → `npm run build` → deploys `./dist` to GitHub Pages. No manual deployment steps needed.
