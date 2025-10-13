import { useMemo, useState } from 'react'
import projects from '../data/projects.js'
import { useTranslation } from 'react-i18next'

const categories = [
  { key:'all', labelKey:'projects.filter.all' },
  { key:'work', labelKey:'projects.filter.work' },
  { key:'study', labelKey:'projects.filter.study' },
  { key:'private', labelKey:'projects.filter.private' },
]

export default function Projects() {
  const { t } = useTranslation()
  const [cat, setCat] = useState('all')

  const filtered = useMemo(() => {
    if (cat === 'all') return projects
    return projects.filter(p => p.category === cat)
  }, [cat])

  return (
    <section>
      <h1 className="section-title">{t('projects.title')}</h1>
      <div className="toolbar" style={{marginBottom:'1rem'}}>
        {categories.map(c => (
          <button key={c.key} className="btn" onClick={() => setCat(c.key)}>
            {t(c.labelKey)}
          </button>
        ))}
      </div>
      <div className="grid grid-2">
        {filtered.map(p => (
          <div className="card" key={p.id}>
            <h3>{p.title}</h3>
            <p className="muted">{p.description}</p>
            <div style={{margin:'0.5rem 0'}}>
              {p.technologies.map((t,i) => <span className="tag" key={i}>{t}</span>)}
            </div>
            <div className="toolbar">
              {p.links.github && <a className="btn" href={p.links.github} target="_blank" rel="noreferrer">GitHub</a>}
              {p.links.demo && <a className="btn" href={p.links.demo} target="_blank" rel="noreferrer">Demo</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
