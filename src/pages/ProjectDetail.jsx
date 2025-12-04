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

  // Spezielle Detailansicht: RadarGame
  if (project.id === 'radar-game') {
    const base = import.meta.env.BASE_URL || '/'

    return (
      <section className="project-detail">
        <header className="project-detail-header card">
          <div>
            <h1 className="section-title">{project.title}</h1>
            <p className="muted">
              Kleines Game-Projekt mit Space-Setting: Ein Raumschiff bewegt sich durch den
              Spielraum, während der Spieler auf Objekte und Ereignisse reagiert, die auf
              einer Art „Radar“-Ansicht sichtbar werden.
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
              RadarGame ist ein experimentelles Spielprojekt mit Fokus auf einfachen,
              aber klaren Spielmechaniken: Der Spieler steuert ein SpaceShip und
              orientiert sich an einer radarbasierten Ansicht, um sich im Raum zu
              bewegen, Hindernissen auszuweichen und auf Ereignisse zu reagieren.
            </p>
            <p className="muted">
              Ziel des Projekts war es, Spiel- und UI-Logik sauber zu strukturieren
              und grundlegende Game-Loop-Mechaniken (Update, Bewegung, Kollisionslogik
              etc.) umzusetzen. Das Projekt eignet sich gut, um Gameplay-Ideen schnell
              auszuprobieren und später zu erweitern.
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

          {/* rechte Spalte: SpaceShip Trailer */}
          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>SpaceShip Trailer</h2>
            <p className="muted" style={{ marginBottom: '0.75rem' }}>
              Kurzer Gameplay-Trailer, der das SpaceShip und die grundlegende
              Spielmechanik zeigt.
            </p>

            <video
              src={`${base}radar-game/SpaceshipTrailer.mp4`}
              controls
              muted
              playsInline
              style={{ width: '100%', borderRadius: '0.5rem' }}
            >
              Dein Browser unterstützt das Video-Tag nicht.
            </video>

            <p className="muted" style={{ fontSize: '.8rem', marginTop: '.4rem' }}>
              Tipp: Für beste Qualität das Video im Vollbild ansehen.
            </p>
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

    // Spezielle Detailansicht: Mission Fried Chicken
  if (project.id === 'mission-fried-chicken') {
    const base = import.meta.env.BASE_URL || '/'

    return (
      <section className="project-detail">
        <header className="project-detail-header card">
          <div>
            <h1 className="section-title">{project.title}</h1>
            <p className="muted">
              Kleines Game-Projekt mit Arcade-Charakter: Mission Fried Chicken kombiniert
              ein simples, fokussiertes Gameplay mit einem humorvollen Setting rund um ein
              „Space Chicken“ auf Mission.
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
              Ziel des Projekts war es, ein kleines, abgeschlossenes Spiel zu bauen und
              dabei Spiellogik, UI und einfache Animationen sauber zu strukturieren.
              Im Mittelpunkt steht ein Chicken-Space-Setting, bei dem Steuerung,
              Reaktionsfähigkeit und Timing im Fokus stehen.
            </p>
            <p className="muted">
              Mission Fried Chicken eignet sich gut, um grundlegende Game-Loop-Konzepte
              (Update-Zyklus, Eingaben, Kollisionslogik, Zustand des Spiels) sowie Menü-
              und Szenenstruktur zu demonstrieren und später weiter auszubauen.
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

          {/* rechte Spalte: Trailer & Präsentation */}
          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>Trailer & Präsentation</h2>
            <p className="muted" style={{ marginBottom: '0.75rem' }}>
              Kurzer Gameplay-Trailer sowie eine Präsentation, die Idee und Aufbau des
              Spiels zusammenfassen.
            </p>

            <video
              src={`${base}mfc/mfctrailer.mp4`}
              controls
              muted
              playsInline
              style={{ width: '100%', borderRadius: '0.5rem' }}
            >
              Dein Browser unterstützt das Video-Tag nicht.
            </video>

            <p className="muted" style={{ fontSize: '.8rem', marginTop: '.4rem' }}>
              SpaceShip / Mission Fried Chicken – Gameplay Trailer.
            </p>

            <h3 style={{ marginTop: '1rem', marginBottom: '.4rem' }}>Projektunterlagen</h3>
            <ul className="muted" style={{ paddingLeft: '1.1rem', margin: 0 }}>
              <li>
                <a
                  href={`${base}mfc/mfc-presentation.pptx`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Mission Fried Chicken – Präsentation (PPTX)
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

    if (project.id === 'patient-monitoring') {
    const base = import.meta.env.BASE_URL || '/'

    return (
      <section className="project-detail">
        <header className="project-detail-header card">
          <div>
            <h1 className="section-title">{project.title}</h1>
            <p className="muted">
              Kamera-basiertes Patient Monitoring System mit Fall-Erkennung über YOLOv5,
              Docker-basierter Server-Infrastruktur und Alarmierung per MQTT, Matrix
              (Chat) und Hardware-Alarm auf Raspberry&nbsp;Pi.
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

        {/* Überblick + Architektur */}
        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>Projektüberblick</h2>
            <p className="muted" style={{ marginBottom: '.75rem' }}>
              Im Rahmen eines Systemadministrations-Projekts wurde ein
              <strong> Patient Monitoring System</strong> umgesetzt, das Stürze und kritische
              Situationen automatisch erkennt und Pflegekräfte aktiv warnt.
              Mehrere Raspberry&nbsp;Pis mit Kameras überwachen Bett und Raum; ein
              Docker-basierter Server verarbeitet die Bilder mit YOLOv5 und verteilt
              Zustände über MQTT.
            </p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>YOLOv5-basiertes Fall-Erkennungssystem (walking / sitting / fall detected)</li>
              <li>Docker- &amp; Docker-Compose-Setup für alle Services (MQTT, Matrix, Mail, YOLO)</li>
              <li>MQTT-Broker als zentrale Kommunikationsschicht zwischen allen Komponenten</li>
              <li>Matrix-Server für verschlüsselte Alarm-Nachrichten an Pflegekräfte</li>
              <li>Hardware-Alarm über Raspberry&nbsp;Pi (LEDs, Buzzer, Taster)</li>
            </ul>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>Ziel & Nutzen</h2>
            <p className="muted">
              Ziel des Systems ist es, die <strong>Sicherheit von Patienten</strong> in Kliniken
              und Pflegeeinrichtungen zu erhöhen, ohne teure proprietäre Lösungen
              einsetzen zu müssen. Das System kombiniert kostengünstige Hardware
              (Raspberry&nbsp;Pi) mit Open-Source-Software (Docker, Mosquitto, Matrix,
              YOLOv5) und ermöglicht:
            </p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>frühe Erkennung von Stürzen und kritischen Situationen</li>
              <li>Echtzeit-Benachrichtigungen an das Pflegepersonal (Matrix &amp; E-Mail)</li>
              <li>klare visuelle/akustische Alarme direkt auf Station</li>
              <li>einen modularen Aufbau, der sich leicht erweitern und warten lässt</li>
            </ul>
          </div>
        </div>

        {/* Screenshots / Diagramme */}
        <h2 className="section-title">Screenshots &amp; Diagramme</h2>
        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          <figure className="card">
            <img
              src={`${base}patient-monitoring/systemaufbau.png`}
              alt="Systemaufbau mit Bed-View, Room-View und Broker"
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <figcaption className="muted" style={{ marginTop: '.5rem' }}>
              Systemaufbau: Zwei Kamera-Perspektiven (Bett &amp; Raum) senden Daten über einen
              Broker an die Erkennungs- und Alarm-Komponenten.
            </figcaption>
          </figure>

          <figure className="card">
            <img
              src={`${base}patient-monitoring/Matrix.png`}
              alt="Architektur des Matrix-Servers"
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <figcaption className="muted" style={{ marginTop: '.5rem' }}>
              Matrix-Server-Architektur: verschlüsselte Chat-/Alarm-Kanäle für Pflegekräfte.
            </figcaption>
          </figure>

          <figure className="card">
            <img
              src={`${base}patient-monitoring/Yolo.png`}
              alt="YOLOv5 Klassenerkennung für walking, sitting, fall detected"
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <figcaption className="muted" style={{ marginTop: '.5rem' }}>
              YOLOv5-Fall-Erkennung mit drei Klassen: „walking“, „sitting“ und „fall detected“.
            </figcaption>
          </figure>

          <figure className="card">
            <img
              src={`${base}patient-monitoring/alarm.png`}
              alt="Raspberry Pi Alarm-Hardware mit LEDs und Buzzer"
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <figcaption className="muted" style={{ marginTop: '.5rem' }}>
              Alarm-Hardware: Raspberry&nbsp;Pi mit LEDs (Normal/Warnung/Alarm) und Buzzer
              zur lokalen Signalisierung.
            </figcaption>
          </figure>
        </div>

        {/* PDFs eingebettet */}
        <h2 className="section-title">Dokumentation &amp; Präsentation</h2>

        <div className="card" style={{ height: '70vh', marginBottom: '1.25rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '.5rem' }}>Projektdokumentation (PDF)</h3>
          <object
            data={`${base}patient-monitoring/Doku.pdf`}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              PDF kann nicht angezeigt werden.&nbsp;
              <a
                href={`${base}patient-monitoring/Doku.pdf`}
                target="_blank"
                rel="noreferrer"
              >
                Hier herunterladen
              </a>
              .
            </p>
          </object>
        </div>

        <div className="card" style={{ height: '65vh', marginBottom: '1.5rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '.5rem' }}>Präsentation (PDF)</h3>
          <object
            data={`${base}patient-monitoring/Presentation.pdf`}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              PDF kann nicht angezeigt werden.&nbsp;
              <a
                href={`${base}patient-monitoring/Presentation.pdf`}
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

    if (project.id === 'java-testing') {
    return (
      <section className="project-detail">
        <header className="project-detail-header card">
          <div>
            <h1 className="section-title">{project.title}</h1>
            <p className="muted">
              Projektseminar zur KI-gestützten Erstellung von Softwaretests in Java:
              Auswertung, wie gut ChatGPT beim Generieren von Unit-, Integrations-
              und UI-Tests unterstützt.
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
              Ziel des Projekts war es, das Potenzial von ChatGPT&nbsp;4 für die
              automatisierte Testgenerierung in Java zu evaluieren. Untersucht wurden
              drei Beispielprojekte (Inventory-Manager, Bank-Manager, Farm-Product-Store)
              mit unterschiedlichen Anforderungen an Unit-, UI- und Integrationstests.
            </p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>Vergleich von Code-Coverage, Fehlerrate und Prompt-Aufwand</li>
              <li>Generierung von Unit-, UI- und Integrationstests mit ChatGPT</li>
              <li>Iteratives Prompt-Engineering zur Verbesserung der Tests</li>
              <li>Bewertung der Stärken & Schwächen von KI-gestütztem Testen</li>
            </ul>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>Links & Ressourcen</h2>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                GitHub-Repository:{' '}
                <a
                  href="https://github.com/EmirTutar/PA_KI_Softwaretests_Java"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/EmirTutar/PA_KI_Softwaretests_Java
                </a>
              </li>
              <li>
                Projektdokumentation (PDF):{' '}
                <a
                  href={`${base}java-testing/ChatGPT_Testing_Java.pdf`}
                  target="_blank"
                  rel="noreferrer"
                >
                  KI-gestützte Erstellung von Softwaretests in Java
                </a>
              </li>
              <li>
                Projektpräsentation (PPTX):{' '}
                <a
                  href={`${base}java-testing/Testgenerierung_Java.pptx`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Testgenerierung mit ChatGPT – Präsentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Kurz zusammengefasste Ergebnisse */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '.75rem' }}>Wesentliche Ergebnisse</h2>
          <p className="muted">
            Die Auswertung zeigt, dass ChatGPT insbesondere bei klassischen Unit- und
            Integrationstests eine hohe Code-Coverage mit relativ wenig Prompt-Aufwand
            erreichen kann. Bei UI-Tests steigen Fehlerrate und Korrekturaufwand, die
            generierten Klassen liefern aber oft eine gute Ausgangsbasis, die von einem
            Entwickler weiterverfeinert werden kann. Insgesamt bestätigt das Projekt,
            dass KI-gestützte Testgenerierung den manuellen Aufwand deutlich reduzieren
            kann, allerdings immer kombiniert mit Review und Fachwissen.
          </p>
        </div>

        {/* PDF eingebettet */}
        <h2 className="section-title">Projektbericht (PDF)</h2>
        <div className="card" style={{ height: '70vh', marginBottom: '1.5rem' }}>
          <object
            data={`${base}java-testing/ChatGPT_Testing_Java.pdf`}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              PDF kann nicht angezeigt werden.&nbsp;
              <a
                href={`${base}java-testing/ChatGPT_Testing_Java.pdf`}
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

    // Turtlebot – Autonome Navigation mit ROS
  if (project.id === 'turtlebot_driving') {
    return (
      <section className="project-detail">
        <header className="project-detail-header card">
          <div>
            <h1 className="section-title">{project.title}</h1>
            <p className="muted">
              Autonome Navigation eines mobilen Roboters mit ROS und dem
              <code>move_base</code>-Stack – inklusive Zonen-Konzept, 
              Zielauswahl-Algorithmus und robuster Behandlung von Deadlocks.
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
              Ziel des Projekts ist es, einen Turtlebot selbstständig durch eine Arena
              navigieren zu lassen. Auf Basis einer vorher erstellten Karte
              (gmapping) und der <code>amcl_pose</code>-Lokalisierung fährt der
              Roboter nacheinander zu vordefinierten Navigationszielen.
              Diese Ziele sind in <strong>„easy“</strong> und
              <strong>„hard“</strong> Zonen unterteilt.
            </p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>Speicherung aller Ziele (Koordinaten, Zone, Reward) in einer YAML-Datei</li>
              <li>Algorithmus zur Wahl des jeweils nächsten erreichbaren Ziels</li>
              <li>Phasenweises Vorgehen: zuerst Easy-Zone, danach Hard-Zone</li>
              <li>Aufbau einer modularen Klassenstruktur für Ziele und Ziellisten</li>
            </ul>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>Links & Ressourcen</h2>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                GitHub-Repository:{' '}
                <a
                  href="https://github.com/EmirTutar/turtlebot_driving"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/EmirTutar/turtlebot_driving
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Verhalten, Probleme & Lösungen */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '.75rem' }}>Robot Behavior & Lösungen</h2>
          <p className="muted" style={{ marginBottom: '.75rem' }}>
            Die Codebasis ist in klare Klassen aufgeteilt: Eine zentrale
            <strong> Main-Klasse</strong> steuert den Ablauf, während die
            Klassen <strong>Goal</strong> und <strong>GoalsList</strong> für
            einzelne Ziele bzw. die Verwaltung der gesamten Zielliste
            verantwortlich sind. So bleibt der Code gut wartbar und
            erweiterbar.
          </p>
          <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
            <li>
              <strong>Goal-Precision:</strong> höhere Kartenauflösung, Helper-Goals
              vor dem eigentlichen Ziel und regelmäßiges Leeren der Costmap.
            </li>
            <li>
              <strong>Blockierte Ziele:</strong> Timeout nach 30&nbsp;Sekunden,
              anschließende Wiederaufnahme nach Cool-Down über eine zweite Liste.
            </li>
            <li>
              <strong>Deadlocks:</strong> Erkennung von festgefahrenen Situationen
              und Rückwärtsfahren/Rotieren, um anderen Robotern Platz zu machen.
            </li>
            <li>
              <strong>Future Work:</strong> dynamische Zonen-Strategie und
              mögliche „Verhandlungs-Protokolle“ zwischen Robotern zur
              Wegfreigabe.
            </li>
          </ul>
        </div>

        {/* Turtlebot Bild */}
        <h2 className="section-title">Hardware – Turtlebot Plattform</h2>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <figure>
            <img
              src={`${base}turtlebot/turtlebot.png`}
              alt="Turtlebot mit LiDAR, Raspberry Pi und DYNAMIXEL-Rädern"
              style={{ width: '100%', borderRadius: '0.5rem' }}
            />
            <figcaption className="muted" style={{ marginTop: '.5rem' }}>
              Turtlebot-Plattform mit 360°-LiDAR, Raspberry&nbsp;Pi, OpenCR-Controller
              und DYNAMIXEL-Antrieben – Basis für autonome Navigation mit ROS.
            </figcaption>
          </figure>
        </div>

        <Link className="btn" to="/projects">
          ← Zur Projektübersicht
        </Link>
      </section>
    )
  }

    if (project.id === 'systemsicherheit-labs') {
    return (
      <section className="project-detail">
        <header className="project-detail-header card">
          <div>
            <h1 className="section-title">{project.title}</h1>
            <p className="muted">
              Praktisch orientierte Laborübungen zu Netzwerksicherheit
              und Web Application Security – mit Fokus auf das
              Verständnis von Angriffswegen und passenden
              Gegenmaßnahmen.
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

        <div className="grid grid-2 project-detail-body">
          <article className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>
              Überblick
            </h2>
            <p className="muted">
              Im Modul <strong>Systemsicherheit</strong> habe ich mehrere
              praktische Labs durchgeführt und jeweils in ausführlichen
              Berichten dokumentiert. Die Übungen decken den kompletten
              Ablauf eines strukturierten Security-Tests ab – von
              Reconnaissance über Netzwerkanalyse bis hin zu typischen
              Web-Schwachstellen.
            </p>

            <h3 style={{ marginTop: '1.2rem' }}>Inhalte der Labs</h3>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                <strong>Grundlagen &amp; Reconnaissance:</strong> Arbeiten
                in einer Security-Lab-Umgebung, OSINT, Port-Scanning und
                Service-Enumeration.
              </li>
              <li>
                <strong>Netzwerksicherheit:</strong> Analyse und
                Konfiguration von Firewalls sowie ausgewählte Angriffe
                gegen Netzwerke in einer isolierten Testumgebung.
              </li>
              <li>
                <strong>Web Application Security:</strong> Untersuchung
                von Schwachstellen wie LFI, SQL Injection, XSS, OS
                Command Injection, SSRF und Angriffen auf verwundbare CMS.
              </li>
              <li>
                <strong>Exploitation &amp; Hardening:</strong> Aufbau von
                Shells in der Lab-Umgebung, Dokumentation von
                Schwachstellen und Ableitung geeigneter
                Schutzmaßnahmen.
              </li>
            </ul>

            <p className="muted" style={{ marginTop: '1rem' }}>
              Alle Übungen fanden in einer <strong>kontrollierten
              Laborumgebung</strong> statt. Ziel war das Verständnis von
              Angriffspfaden und die Entwicklung eines Security-Mindsets.
            </p>
          </article>

          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>
              Rolle &amp; Lernziele
            </h2>
            <p className="muted">
              Durch die Kombination aus praktischen Aufgaben und
              schriftlichen Berichten konnte ich mein Verständnis für
              Angriffs- und Verteidigungsmechanismen deutlich vertiefen:
            </p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                Systematisches Vorgehen bei Security-Analysen
                (Recon → Exploit → Hardening).
              </li>
              <li>
                Sicherer Umgang mit typischen Web- und
                Netzwerkschwachstellen.
              </li>
              <li>
                Bewusstsein für verantwortungsvollen und ethischen Umgang
                mit Security-Wissen.
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