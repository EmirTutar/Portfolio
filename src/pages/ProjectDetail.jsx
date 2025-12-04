// src/pages/ProjectDetail.jsx
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import projects from '../data/projects'

function ZoomableImage({ src, alt, caption }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <figure className="card zoomable-figure" onClick={() => setOpen(true)}>
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', borderRadius: '8px' }}
        />
        <figcaption className="muted" style={{ marginTop: '.5rem' }}>
          {caption}{' '}
          <span style={{ fontSize: '.75rem', opacity: 0.8 }}>
            (Klicken zum Vergrößern)
          </span>
        </figcaption>
      </figure>

      {open && (
        <div className="lightbox" onClick={() => setOpen(false)}>
          <div className="lightbox-inner">
            <img src={src} alt={alt} />
          </div>
        </div>
      )}
    </>
  )
}

export default function ProjectDetail() {
  const { projectId } = useParams()
  const { t } = useTranslation()
  const project = projects.find(p => p.id === projectId)
  const base = import.meta.env.BASE_URL || '/'

  if (!project) {
    return (
      <section>
        <h1 className="section-title">{t('projects.title')}</h1>
        <p className="muted">Projekt nicht gefunden.</p>
        <Link to="/projects" className="btn" style={{ marginTop: '1rem' }}>
          ← Zur Projektübersicht
        </Link>
      </section>
    )
  }

  // Spezielle Detailansicht: eCAL Test Suite / Bachelorarbeit
  if (project.id === 'ecal-test-suite') {
    return (
      <section className="project-detail">
        <header className="project-detail-header card">
          <div>
            <h1 className="section-title">{project.title}</h1>
            <p className="muted">
              Docker- und Robot-Framework-basierte Integrationstests für die
              Open-Source-Middleware eCAL – inklusive generischem Testkonzept,
              Testfall-Templates und CI/CD-Integration.
            </p>
          </div>
          <div className="project-detail-tags">
            {project.technologies?.map(tech => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Überblick + Links */}
        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>Projektüberblick</h2>
            <p className="muted" style={{ marginBottom: '.75rem' }}>
              Im Rahmen meiner Bachelorarbeit
              <strong>
                {' '}
                „Developing a Concept for Automated Testing of IPC Middleware – Demonstrated with eCAL“
              </strong>{' '}
              habe ich ein wiederverwendbares Testkonzept für IPC-Middleware
              entworfen und mit eCAL umgesetzt. Die Test-Suite prüft u. a.
              Publish/Subscribe-Kommunikation, RPC-Szenarien, Crash-Verhalten
              und Netzwerkunterbrechungen über verschiedene Transportlayer
              (SHM, UDP, TCP).
            </p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>Standardisierte Ordnerstruktur und Docker-Setup pro Testfall</li>
              <li>Robot-Framework-Tests für funktionale und robuste Kommunikation</li>
              <li>Automatisierte Ausführung über GitHub Actions</li>
              <li>Bereitstellung der Testreports über GitHub Pages</li>
            </ul>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>Links & Ressourcen</h2>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                eCAL Test Suite (Software) :{' '}
                <a
                  href="https://github.com/eclipse-ecal/ecal-test-suite"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/eclipse-ecal/ecal-test-suite
                </a>
              </li>
              <li>
                eCAL Middleware (REPO):{' '}
                <a
                  href="https://github.com/eclipse-ecal/ecal"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/eclipse-ecal/ecal
                </a>
              </li>
              <li>
                Bachelorarbeit (PDF):{' '}
                <a
                  href={`${base}ecal-tests/bachelor-thesis-ipc-testing.pdf`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Developing a Concept for Automated Testing of IPC Middleware
                </a>
              </li>
              <li>
                Präsentation (PPTX):{' '}
                <a
                  href={`${base}ecal-tests/ipc_testing_final.pptx`}
                  target="_blank"
                  rel="noreferrer"
                >
                  IPC Testing – Presentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Screenshots / Diagramme */}
        <h2 className="section-title">Screenshots & Diagramme</h2>
        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          <ZoomableImage
            src={`${base}ecal-tests/github-pages-tests.png`}
            alt="Übersicht der eCAL Integration Test Reports"
            caption="GitHub-Pages-Übersicht aller Testläufe mit Links zu Detailreports."
          />

          <ZoomableImage
            src={`${base}ecal-tests/test-report.png`}
            alt="Robot Framework Testreport"
            caption="Robot-Framework-Report mit Status, Statistiken und Laufzeiten."
          />

          <ZoomableImage
            src={`${base}ecal-tests/execution.png`}
            alt="Execution Flow der Testarchitektur"
            caption="Execution-Flow: Robot Framework → Docker-Build → Container → eCAL-Testapplikation → Reports."
          />

          <ZoomableImage
            src={`${base}ecal-tests/structer.png`}
            alt="Ordnerstruktur der Testfälle"
            caption="Standardisierte Struktur pro Testfall (C++, Robot-Tests, Skripte, Dockerfile, Libraries)."
          />

          <ZoomableImage
            src={`${base}ecal-tests/rpc-bsp.png`}
            alt="RPC Reconnect Sequenzdiagramm"
            caption="Testfall „RPC Reconnect“: Netzwerkausfall, Reconnect und erneute erfolgreiche RPC-Kommunikation."
          />

          <ZoomableImage
            src={`${base}ecal-tests/pub-crash-bsp.png`}
            alt="Publisher Crash Sequenzdiagramm"
            caption="Testfall „Publisher-Crash“: Publisher stürzt ab, Subscriber bleibt stabil und meldet das Fehlerszenario."
          />
        </div>

        {/* Thesis eingebettet */}
        <h2 className="section-title">Bachelorarbeit (PDF)</h2>
        <div className="card" style={{ height: '75vh', marginBottom: '1.5rem' }}>
          <object
            data={`${base}ecal-tests/bachelor-thesis-ipc-testing.pdf`}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              PDF kann nicht angezeigt werden.&nbsp;
              <a
                href={`${base}ecal-tests/bachelor-thesis-ipc-testing.pdf`}
                target="_blank"
                rel="noreferrer"
              >
                Hier herunterladen
              </a>
              .
            </p>
          </object>
        </div>

        <Link className="btn" to="/projects">
          ← Zur Projektübersicht
        </Link>
      </section>
    )
  }

    // Spezielle Detailansicht: Persönliche Portfolio-Webseite
  if (project.id === 'personal-site') {
    return (
      <section className="project-detail">
        <header className="project-detail-header card">
          <div>
            <h1 className="section-title">{project.title}</h1>
            <p className="muted">
              Mehrsprachige Portfolio-Webseite mit Dark Theme, Projektübersicht,
              Zeitstrahl, Tech-Stack und eingebettetem CV – bereitgestellt über GitHub Pages.
            </p>
          </div>
          <div className="project-detail-tags">
            {project.technologies?.map(tech => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-2 project-detail-body" style={{ marginBottom: '1.5rem' }}>
          <article className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>Projektüberblick</h2>
            <p className="muted">
              Dieses Portfolio dient als zentrale Anlaufstelle für meine Projekte, meinen Werdegang
              und meinen Tech-Stack. Die Seite ist in Deutsch, Englisch und Türkisch verfügbar und
              nutzt ein modernes Dark Theme mit React, Vite und i18next.
            </p>
            <ul className="muted" style={{ paddingLeft: '1.1rem', marginTop: '.75rem' }}>
              <li>Mehrsprachige Oberfläche (DE/EN/TR) mit i18next</li>
              <li>Seiten für Zeitstrahl, Projekte, Technologien, Lebenslauf und Kontakt</li>
              <li>PDF-Einbettung für den Lebenslauf direkt im Browser</li>
              <li>Deployment über GitHub Pages und automatisierten Build</li>
            </ul>
          </article>

          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>Links & Stack</h2>
            <p className="muted" style={{ marginBottom: '.75rem' }}>
              Die Seite ist als React-Single-Page-Application aufgebaut und wird mit Vite gebündelt.
            </p>
            <p className="muted" style={{ marginBottom: '.5rem' }}>
              <strong>Haupttechnologien:</strong> React, Vite, React Router, i18next, CSS
            </p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                GitHub-Repository:{' '}
                <a
                  href="https://github.com/EmirTutar/Portfolio"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/EmirTutar/Portfolio
                </a>
              </li>
              <li>
                Live (GitHub Pages):{' '}
                <a
                  href="https://emirtutar.github.io/Portfolio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  emirtutar.github.io/Portfolio
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/projects" className="btn">
            ← Zur Projektübersicht
          </Link>
        </div>
      </section>
    )
  }

if (project.id === 'rateme') {
    return (
      <section className="project-detail">
        <header className="project-detail-header card">
          <div>
            <h1 className="section-title">{project.title}</h1>
            <p className="muted">Projekt im Studium – Android Bewertungs-App.</p>
          </div>
          <div className="project-detail-tags">
            {project.technologies?.map(tech => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-2 project-detail-body">
          {/* linke Spalte: Text */}
          <article className="card">
             <h3 style={{ marginTop: '1.2rem' }}>Aufbau der App</h3>
              <p className="muted">
                Die RateMe App ist eine benutzerfreundliche Plattform, mit der Nutzer Produkte bewerten
                und im Blick behalten können. Die Anmeldung erfolgt über eine E-Mail-Verifizierung, um die
                Echtheit der Nutzer sicherzustellen. Nach dem Login gelangen die Nutzer direkt auf die
                Hauptseite.
              </p>
              <p className="muted">
                Dort können sie Produkte über das Scannen von Barcodes prüfen. Die Produktdaten werden
                über eine API abgefragt, woraufhin die App Produktbild, zentrale Informationen und den
                Durchschnitt der vorhandenen Bewertungen anzeigt.
              </p>
              <p className="muted">
                Über den Button <strong>„Rate Product“</strong> können eigene Bewertungen abgegeben und
                Kommentare hinterlassen werden. Kommentare anderer Nutzer sind sichtbar, aber nur die
                eigenen können gelöscht werden. Produkte lassen sich als Favoriten markieren oder aus der
                Liste entfernen, und eine Historie speichert bereits gescannte Produkte.
              </p>
              <p className="muted">
                In den Einstellungen können sich Nutzer abmelden, Berechtigungen verwalten und im Bereich
                <strong> „About us“</strong> Informationen über die Entwickler der App einsehen. Über das
                Profil werden persönliche Daten angezeigt und es kann ein Profilbild hinterlegt werden.
              </p>
              <p className="muted">
                Technisch basiert die App auf Firebase für Authentifizierung und Datenverwaltung sowie auf
                einer externen API für Produktinformationen.
              </p>

              <h3 style={{ marginTop: '1.2rem' }}>Sinn und Zweck der App</h3>
              <p className="muted">
                RateMe ermöglicht es Nutzern, Produkte zu bewerten, zu kommentieren, zu verfolgen und
                persönliche Favoritenlisten anzulegen. So können Kaufentscheidungen gezielter getroffen
                werden, Fragen zu bestimmten Produkten lassen sich schneller klären und es entsteht eine
                persönliche Sammlung relevanter Produkte.
              </p>

              <h3 style={{ marginTop: '1.2rem' }}>Zielgruppe</h3>
              <p className="muted">
                Die App richtet sich an Verbraucher, die eine einfache Möglichkeit suchen, unabhängig von
                einzelnen Plattformen auf Produktbewertungen und Kommentare zuzugreifen. Sie bietet
                kompakte Informationen zu Produkten und unterstützt Nutzer dabei, ihre
                Einkaufserfahrungen besser zu organisieren und zu optimieren.
              </p>

            {project.links?.github && (
              <p style={{ marginTop: '1.2rem' }}>
                <strong>GitHub:&nbsp;</strong>
                <a href={project.links.github} target="_blank" rel="noreferrer">
                  {project.links.github}
                </a>
              </p>
            )}
          </article>

          {/* rechte Spalte: Videos & Doku */}
          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>Videos & Dokumentation</h2>
            <p className="muted" style={{ marginBottom: '0.75rem' }}>
              Kurze App-Demos und begleitende Projektunterlagen.
            </p>

            <div className="project-images-placeholder">
              <div className="project-image-slot">
                <video
                  src={`${base}rateme/rateme-login.mp4`}
                  controls
                  muted
                  playsInline
                  style={{ width: '100%', borderRadius: '0.5rem' }}
                >
                  Dein Browser unterstützt das Video-Tag nicht.
                </video>
                <p className="muted" style={{ fontSize: '.8rem', marginTop: '.3rem' }}>
                  Login / Signup
                </p>
              </div>

              <div className="project-image-slot">
                <video
                  src={`${base}rateme/rateme-scan.mp4`}
                  controls
                  muted
                  playsInline
                  style={{ width: '100%', borderRadius: '0.5rem' }}
                >
                  Dein Browser unterstützt das Video-Tag nicht.
                </video>
                <p className="muted" style={{ fontSize: '.8rem', marginTop: '.3rem' }}>
                  Barcode-Scan & Produktansicht
                </p>
              </div>

              <div className="project-image-slot">
                <video
                  src={`${base}rateme/rateme-history.mp4`}
                  controls
                  muted
                  playsInline
                  style={{ width: '100%', borderRadius: '0.5rem' }}
                >
                  Dein Browser unterstützt das Video-Tag nicht.
                </video>
                <p className="muted" style={{ fontSize: '.8rem', marginTop: '.3rem' }}>
                  History & Favourites
                </p>
              </div>

              <div className="project-image-slot">
                <video
                  src={`${base}rateme/rateme-settings.mp4`}
                  controls
                  muted
                  playsInline
                  style={{ width: '100%', borderRadius: '0.5rem' }}
                >
                  Dein Browser unterstützt das Video-Tag nicht.
                </video>
                <p className="muted" style={{ fontSize: '.8rem', marginTop: '.3rem' }}>
                  Settings / About us
                </p>
              </div>
            </div>

            <h3 style={{ marginTop: '1rem', marginBottom: '.4rem' }}>Projektunterlagen</h3>
            <ul className="muted" style={{ paddingLeft: '1.1rem', margin: 0 }}>
              <li>
                <a href={`${base}rateme/RateMe_Presentation.pptx`} target="_blank" rel="noreferrer">
                  Projektpräsentation (PPTX)
                </a>
              </li>
              <li>
                <a href={`${base}rateme/RateMe_Report.pdf`} target="_blank" rel="noreferrer">
                  Projektdokumentation (PDF)
                </a>
              </li>
              <li>
                <a href={`${base}rateme/RateMe_Description.pdf`} target="_blank" rel="noreferrer">
                  Funktions- & Feature-Beschreibung (PDF)
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/projects" className="btn">
            ← Zur Projektübersicht
          </Link>
        </div>
      </section>
    )
  }

  // Spezielle Detailansicht: Outdoor-Planer (Wetter-App)
  if (project.id === 'outdoor-planner') {
    const base = import.meta.env.BASE_URL || '/'

    return (
      <section className="project-detail">
        <header className="project-detail-header card">
          <div>
            <h1 className="section-title">{project.title}</h1>
            <p className="muted">
              Single-Page-Webanwendung, die das aktuelle Wetter in Weingarten anzeigt
              und Outdoor-Termine inklusive Datum, Uhrzeit, Beschreibung und
              „ganztägig“-Option verwalten kann.
            </p>
          </div>
          <div className="project-detail-tags">
            {project.technologies?.map(tech => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-2 project-detail-body" style={{ marginBottom: '1.5rem' }}>
          {/* linke Spalte: Beschreibung */}
          <article className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>Projektüberblick</h2>
            <p className="muted">
              Die App kombiniert Wetterabfrage und Terminverwaltung: Auf der Startseite
              wird das aktuelle Wetter (Icon, Temperatur, Regenrisiko) für Weingarten
              angezeigt. Im Outdoor-Planer können Nutzer eigene Termine anlegen,
              als ganztägig markieren und verwalten.
            </p>
            <p className="muted">
              Jeder Termin besteht aus Titel, Datum, optionaler Uhrzeit, Beschreibung
              und der Info, ob er ganztägig stattfindet. Termine lassen sich speichern
              und wieder löschen. Das Layout ist bewusst klar gehalten, damit auch auf
              kleineren Bildschirmen eine gute Übersicht erhalten bleibt.
            </p>

            <h3 style={{ marginTop: '1.2rem' }}>Technik</h3>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>React Single Page Application mit einfachem Routing</li>
              <li>Wetterdaten über eine externe Wetter-API (z. B. OpenWeatherMap)</li>
              <li>State-Management mit React Hooks für Terminliste und Formulare</li>
              <li>Responsives Layout mit CSS für Desktop-Ansicht</li>
            </ul>

            <h3 style={{ marginTop: '1.2rem' }}>Links</h3>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                Live-Demo:&nbsp;
                <a
                  href="https://outdoorplaner.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  outdoorplaner.netlify.app
                </a>
              </li>
              <li>
                GitHub-Repository:&nbsp;
                <a
                  href="https://github.com/EmirTutar/wetterapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/EmirTutar/wetterapp
                </a>
              </li>
            </ul>
          </article>

          {/* rechte Spalte: Screenshots */}
          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>Screenshots</h2>
            <p className="muted" style={{ marginBottom: '0.75rem' }}>
              Einblicke in Home-Ansicht und Outdoor-Planer.
            </p>

            <div className="project-images-placeholder">
              <ZoomableImage
                src={`${base}outdoor-planner/home.png`}
                alt="Home-Ansicht mit aktuellem Wetter in Weingarten"
                caption="Home: aktuelles Wetter in Weingarten mit Temperatur und Regenrisiko."
              />
              <ZoomableImage
                src={`${base}outdoor-planner/planner.png`}
                alt="Outdoor-Planer mit Terminformular und Terminliste"
                caption="Outdoor-Planer: Terminformular und Liste der geplanten Outdoor-Termine."
              />
            </div>
          </aside>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/projects" className="btn">
            ← Zur Projektübersicht
          </Link>
        </div>
      </section>
    )
  }

  // Fallback für alle anderen Projekte
  return (
    <section className="project-detail">
      <header className="project-detail-header card">
        <div>
          <h1 className="section-title">{project.title}</h1>
          <p className="muted">
            {project.category === 'work' && 'Berufliches Projekt'}
            {project.category === 'study' && 'Projekt im Studium'}
            {project.category === 'private' && 'Privates Projekt'}
          </p>
        </div>
        <div className="project-detail-tags">
          {project.technologies?.map(tech => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </header>

      <article className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>Kurzbeschreibung</h2>
        <p className="muted">{project.description}</p>

        {project.links?.github && (
          <p style={{ marginTop: '1.2rem' }}>
            <strong>GitHub:&nbsp;</strong>
            <a href={project.links.github} target="_blank" rel="noreferrer">
              {project.links.github}
            </a>
          </p>
        )}
      </article>

      <div style={{ marginTop: '1.5rem' }}>
        <Link to="/projects" className="btn">
          ← Zur Projektübersicht
        </Link>
      </div>
    </section>
  )
}