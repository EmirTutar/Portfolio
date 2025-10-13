<<<<<<< HEAD
# Emircan - Portfolio Website
=======
# Emircan Tutar — Portfolio (React + Vite)

Mehrsprachige Portfolio-Seite (DE/EN/TR) mit Dark Theme, React Router, i18n und PDF-Embed.

## Quickstart
```bash
npm install
npm run dev
```

Öffne `http://localhost:5173` im Browser.

## Build
```bash
npm run build
npm run preview
```

## GitHub Pages Deployment (via Actions)
1. Repository auf GitHub erstellen und Code pushen.
2. In GitHub: **Settings → Pages → Source = GitHub Actions**.
3. Workflow-Datei `.github/workflows/deploy.yml` ist bereits enthalten.

**Hinweis zu Routing:** In Produktion wird `HashRouter` verwendet (`/#/route`), damit GitHub Pages ohne 404 direkt auf Unterseiten funktioniert.

## Inhalte pflegen
- **Timeline:** `src/data/timeline.js`
- **Projekte:** `src/data/projects.js`
- **Technologien:** `src/data/technologies.js`
- **Übersetzungen:** `public/locales/{de|en|tr}/translation.json`
- **CV (PDF):** `public/EmircanTutar_CV.pdf` (kann ersetzt/aktualisiert werden)

Viel Erfolg!
>>>>>>> 59b3b6d (Prepare for GitHub Pages (vite base + relative asset paths))
