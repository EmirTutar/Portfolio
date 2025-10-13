# Emircan Tutar — Portfolio (React + Vite)

Multilingual (EN/DE/TR) React portfolio with dark theme, routing, i18n, and embedded PDF résumé. Ready for GitHub Pages.

## Quick Start
```bash
npm install
npm run dev   # http://localhost:5173
```

## Build
```bash
npm run build
npm run preview
```

## GitHub Pages
1. In `vite.config.js` set:
   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/REPO_NAME/'   // your repo name (case-sensitive)
   })
   ```
2. Use Vite base URL for runtime assets:
   - `src/i18n/i18n.js`:
     ```js
     backend: { loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json` }
     ```
   - `src/pages/Resume.jsx`:
     ```jsx
     const pdf = `${import.meta.env.BASE_URL}EmircanTutar_CV.pdf`
     ```
3. Push to GitHub → **Settings → Pages → Source: GitHub Actions**  
   Workflow: `.github/workflows/deploy.yml`.

## Edit Content
- Timeline: `src/data/timeline.js`  
- Projects: `src/data/projects.js`  
- Technologies: `src/data/technologies.js`  
- Translations: `public/locales/{en|de|tr}/translation.json`  
- Résumé (PDF): `public/EmircanTutar_CV.pdf`

