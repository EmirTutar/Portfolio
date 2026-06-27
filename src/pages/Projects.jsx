import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import projects from '../data/projects'

const ALL_TECHS = [...new Set(projects.flatMap(p => p.technologies))].sort()

export default function Projects() {
  const { t } = useTranslation()
  const [catFilter, setCatFilter] = useState('all')
  const [techFilter, setTechFilter] = useState(null)

  const filtered = useMemo(() =>
    projects.filter(p => {
      const catOk = catFilter === 'all' || p.category === catFilter
      const techOk = !techFilter || p.technologies.includes(techFilter)
      return catOk && techOk
    }),
    [catFilter, techFilter]
  )

  const catBtn = (key) =>
    `btn btn--ghost${catFilter === key ? ' btn--active' : ''}`

  const techBtn = (tech) =>
    `tech-chip${techFilter === tech ? ' tech-chip--active' : ''}`

  const categoryLabel = (cat) => {
    if (cat === 'work')    return t('projects.category_work')
    if (cat === 'study')   return t('projects.category_study')
    if (cat === 'private') return t('projects.category_private')
    return ''
  }

  return (
    <section>
      <h1 className="section-title">{t('projects.title')}</h1>
      <p className="muted" style={{ marginBottom: '1.25rem' }}>
        {t('projects.subtitle')}
      </p>

      {/* ── category filter ── */}
      <div className="toolbar" style={{ marginBottom: '1rem' }}>
        {['all', 'work', 'study', 'private'].map(key => (
          <button key={key} type="button" className={catBtn(key)} onClick={() => setCatFilter(key)}>
            {t(`projects.filter.${key}`)}
          </button>
        ))}
      </div>

      {/* ── technology chip filter ── */}
      <div className="tech-chip-bar" style={{ marginBottom: '1.75rem' }}>
        <button
          type="button"
          className={`tech-chip${!techFilter ? ' tech-chip--active' : ''}`}
          onClick={() => setTechFilter(null)}
        >
          {t('projects.filter.all_tech')}
        </button>
        {ALL_TECHS.map(tech => (
          <button
            key={tech}
            type="button"
            className={techBtn(tech)}
            onClick={() => setTechFilter(prev => prev === tech ? null : tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* ── project grid ── */}
      <div className="grid grid-2 grid-projects">
        {filtered.map(project => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="card project-card"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, lineHeight: 1.35 }}>
                {t(project.titleKey)}
              </h2>
              <span className={`home-proj-badge home-proj-badge--${project.category}`} style={{ flexShrink: 0 }}>
                {categoryLabel(project.category)}
              </span>
            </div>

            <p className="muted" style={{ marginBottom: '0.75rem', marginTop: '0.25rem', fontSize: '0.875rem' }}>
              {t(project.descriptionKey)}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {project.technologies?.slice(0, 6).map(tech => (
                <span
                  key={tech}
                  className={`tag${techFilter === tech ? ' tag--active' : ''}`}
                >
                  {tech}
                </span>
              ))}
              {project.technologies?.length > 6 && (
                <span className="tag">+{project.technologies.length - 6}</span>
              )}
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="muted">{t('projects.no_projects')}</p>
        )}
      </div>
    </section>
  )
}
