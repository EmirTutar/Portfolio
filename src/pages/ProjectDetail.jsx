// src/pages/ProjectDetail.jsx
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import projects from '../data/projects'

export default function ProjectDetail() {
  const { projectId } = useParams()
  const { t } = useTranslation()
  const project = projects.find(p => p.id === projectId)

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

  const isRateMe = project.id === 'rateme'
  const base = import.meta.env.BASE_URL || '/'

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

      <div className="grid grid-2 project-detail-body">
        {/* linke Spalte: Text / Beschreibung */}
        <article className="card">
          <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>Kurzbeschreibung</h2>
          <p className="muted" style={{ marginBottom: '1rem' }}>
            {project.description}
          </p>

          {isRateMe ? (
            <>
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
            </>
          ) : (
            <>
              <h3 style={{ marginTop: '1.2rem' }}>Schwerpunkte</h3>
              <p className="muted">
                Für dieses Projekt kannst du hier Ziele, Architektur, Herausforderungen und deine Rolle im
                Detail beschreiben.
              </p>
            </>
          )}

          {project.links?.github && (
            <p style={{ marginTop: '1.2rem' }}>
              <strong>GitHub:&nbsp;</strong>
              <a href={project.links.github} target="_blank" rel="noreferrer">
                {project.links.github}
              </a>
            </p>
          )}
        </article>

        {/* rechte Spalte: Screenshots & Doku */}
        <aside className="card">
          <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>Screenshots & Dokumentation</h2>
          <p className="muted" style={{ marginBottom: '0.75rem' }}>
            Hier kannst du Screenshots, Ablaufdiagramme oder Links zu Dokumenten einfügen.
          </p>

          {isRateMe && (
            <>
              <div className="project-images-placeholder">
                <div className="project-image-slot">Login / Signup</div>
                <div className="project-image-slot">Barcode-Scan & Produktansicht</div>
                <div className="project-image-slot">History & Favourites</div>
                <div className="project-image-slot">Settings / About us</div>
              </div>

              <h3 style={{ marginTop: '1rem', marginBottom: '.4rem' }}>Projektunterlagen</h3>
              <ul className="muted" style={{ paddingLeft: '1.1rem', margin: 0 }}>
                <li>
                  <a
                    href={`${base}rateme/RateMe_Presentation.pptx`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Projektpräsentation (PPTX)
                  </a>
                </li>
                <li>
                  <a
                    href={`${base}rateme/RateMe_Report.pdf`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Projektdokumentation (PDF)
                  </a>
                </li>
                <li>
                  <a
                    href={`${base}rateme/RateMe_Description.pdf`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Funktions- & Feature-Beschreibung (PDF)
                  </a>
                </li>
              </ul>

              <p className="muted" style={{ marginTop: '0.75rem' }}>
                Lege die Dateien unter <code>public/rateme/</code> im Projekt ab und passe die Dateinamen
                bei Bedarf an.
              </p>
            </>
          )}

          {!isRateMe && (
            <div className="project-images-placeholder">
              <div className="project-image-slot">Screenshot 1</div>
              <div className="project-image-slot">Screenshot 2</div>
            </div>
          )}
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
