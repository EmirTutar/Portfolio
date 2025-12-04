// src/pages/Projects.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import projects from '../data/projects'

// Kleine Hilfskomponente für den Effort-Level (1–5 Sterne)
function Effort({ level = 0, max = 5 }) {
  const safeLevel = Math.min(Math.max(level, 0), max)

  return (
    <div className="Effort">
      <span className="Effort-label">Effort:&nbsp;</span>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < safeLevel ? 'star star-fill' : 'star star-empty'}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')

  const filtered = projects.filter(p =>
    filter === 'all' ? true : p.category === filter
  )

  const getButtonClass = key =>
    `btn btn--ghost${filter === key ? ' btn--active' : ''}`

  return (
    <section>
      <h1 className="section-title">{t('projects.title')}</h1>
      <p className="muted" style={{ marginBottom: '1rem' }}>
        {t('projects.subtitle') ||
          'Ausgewählte Projekte aus Studium, Beruf und privaten Initiativen.'}
      </p>

      {/* Filter-Leiste */}
      <div className="toolbar" style={{ marginBottom: '1rem' }}>
        <button
          type="button"
          className={getButtonClass('all')}
          onClick={() => setFilter('all')}
        >
          {t('projects.filter.all')}
        </button>
        <button
          type="button"
          className={getButtonClass('work')}
          onClick={() => setFilter('work')}
        >
          {t('projects.filter.work')}
        </button>
        <button
          type="button"
          className={getButtonClass('study')}
          onClick={() => setFilter('study')}
        >
          {t('projects.filter.study')}
        </button>
        <button
          type="button"
          className={getButtonClass('private')}
          onClick={() => setFilter('private')}
        >
          {t('projects.filter.private')}
        </button>
      </div>

      {/* Projektkarten */}
      <div className="grid grid-2 grid-projects">
        {filtered.map(project => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="card project-card"
          >
            <h2 style={{ marginTop: 0, marginBottom: '.25rem' }}>
              {project.title}
            </h2>

            {/* Effort-Level (1–5 Sterne, aus projects.js: Effort) */}
            {typeof project.Effort === 'number' && (
              <Effort level={project.Effort} />
            )}

            <p className="muted" style={{ marginBottom: '.6rem', marginTop: '.25rem' }}>
              {project.description}
            </p>

            <div style={{ marginBottom: '.6rem' }}>
              {project.technologies?.slice(0, 5).map(tech => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
              {project.technologies?.length > 5 && (
                <span className="tag">+{project.technologies.length - 5}</span>
              )}
            </div>

            <p className="muted" style={{ fontSize: '.85rem' }}>
              {project.category === 'work' && 'Berufliches Projekt'}
              {project.category === 'study' && 'Projekt im Studium'}
              {project.category === 'private' && 'Privates Projekt'}
            </p>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="muted">
            Aktuell gibt es in dieser Kategorie noch keine Projekte.
          </p>
        )}
      </div>
    </section>
  )
}
