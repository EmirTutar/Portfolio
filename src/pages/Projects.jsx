// src/pages/Projects.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import projects from '../data/projects'

export default function Projects() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')

  const filtered = projects.filter(p => (filter === 'all' ? true : p.category === filter))

  return (
    <section>
      <h1 className="section-title">{t('projects.title')}</h1>
      <p className="muted" style={{ marginBottom: '1rem' }}>
        {t('projects.subtitle') || 'Ausgewählte Projekte aus Studium, Beruf und privaten Initiativen.'}
      </p>

      <div className="toolbar" style={{ marginBottom: '1rem' }}>
        <button className="btn btn--ghost" onClick={() => setFilter('all')}>
          {t('projects.filter.all')}
        </button>
        <button className="btn btn--ghost" onClick={() => setFilter('work')}>
          {t('projects.filter.work')}
        </button>
        <button className="btn btn--ghost" onClick={() => setFilter('study')}>
          {t('projects.filter.study')}
        </button>
        <button className="btn btn--ghost" onClick={() => setFilter('private')}>
          {t('projects.filter.private')}
        </button>
      </div>

      <div className="grid grid-2 grid-projects">
        {filtered.map(project => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="card project-card"
          >
            <h2 style={{ marginTop: 0, marginBottom: '.4rem' }}>{project.title}</h2>
            <p className="muted" style={{ marginBottom: '.6rem' }}>
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
      </div>
    </section>
  )
}
