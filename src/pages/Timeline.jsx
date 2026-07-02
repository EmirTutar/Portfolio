import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiBriefcase, FiBook } from 'react-icons/fi'
import timeline from '../data/timeline'
import Reveal from '../components/Reveal'

const WORK_TAGS = [
  ['Java', 'Python', 'C++', 'Docker', 'Robot Framework', 'GitHub Actions', 'eCAL', 'CI/CD'],
  ['C++', 'Python', 'Jenkins', 'eCAL', 'CI/CD', 'Agile/Scrum', 'IPC'],
  ['Java', 'Spring', 'Maven', 'OOP'],
  ['KUKA', 'Quality Assurance', 'Series Production'],
  ['Automation', 'Control Systems', 'Electronics'],
]

function WorkEntry({ item, idx, t }) {
  return (
    <Reveal delay={idx * 70}>
      <div className="ftl-entry">
        <div className="ftl-dot ftl-dot--work">
          <FiBriefcase size={10} />
        </div>
        <div className="card ftl-card">
          <div className="ftl-card-top">
            <span className="ftl-badge ftl-badge--work">{t('timeline.section_experience')}</span>
            <span className="ftl-period">{item.period}</span>
          </div>
          <h3 className="ftl-title">{t(item.titleKey)}</h3>
          <p className="ftl-org muted">{t(item.orgKey)}</p>
          <ul className="ftl-details">
            {item.detailKeys.map((key, i) => (
              <li key={i}>{t(key)}</li>
            ))}
          </ul>
          {WORK_TAGS[idx] && (
            <div className="ftl-tags">
              {WORK_TAGS[idx].map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}

function EduEntry({ item, idx, t }) {
  return (
    <Reveal delay={idx * 70}>
      <div className="ftl-entry">
        <div className="ftl-dot ftl-dot--edu">
          <FiBook size={10} />
        </div>
        <div className="card ftl-card">
          <div className="ftl-card-top">
            <span className="ftl-badge ftl-badge--edu">{t('timeline.section_education')}</span>
            <span className="ftl-period">{item.period}</span>
          </div>
          <h3 className="ftl-title">{t(item.titleKey)}</h3>
          <p className="ftl-org muted">{t(item.orgKey)}</p>
          <ul className="ftl-details">
            {item.detailKeys.map((key, i) => (
              <li key={i}>{t(key)}</li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}

export default function Timeline() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const { experience, education } = timeline

  const showWork = filter === 'all' || filter === 'work'
  const showEdu  = filter === 'all' || filter === 'edu'

  return (
    <section className="ftl-page">
      <Reveal>
        <h1 className="section-title">{t('timeline.title')}</h1>
        <p className="muted" style={{ marginBottom: '1.75rem' }}>
          {t('home.timeline_sub')}
        </p>
      </Reveal>

      <div className="toolbar" style={{ marginBottom: '2.5rem' }}>
        {[
          { key: 'all',  label: 'All' },
          { key: 'work', label: t('timeline.section_experience') },
          { key: 'edu',  label: t('timeline.section_education') },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`toolbar-btn${filter === key ? ' toolbar-btn--active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {key === 'work' && <FiBriefcase size={13} />}
            {key === 'edu'  && <FiBook size={13} />}
            {label}
          </button>
        ))}
      </div>

      {showWork && (
        <div className="ftl-section">
          <div className="ftl-section-header">
            <div className="ftl-section-icon ftl-section-icon--work"><FiBriefcase size={15} /></div>
            <h2 className="ftl-section-title">{t('timeline.section_experience')}</h2>
          </div>
          <div className="ftl-track">
            {experience.map((item, idx) => (
              <WorkEntry key={idx} item={item} idx={idx} t={t} />
            ))}
          </div>
        </div>
      )}

      {showEdu && (
        <div className="ftl-section" style={{ marginTop: showWork ? '3rem' : 0 }}>
          <div className="ftl-section-header">
            <div className="ftl-section-icon ftl-section-icon--edu"><FiBook size={15} /></div>
            <h2 className="ftl-section-title">{t('timeline.section_education')}</h2>
          </div>
          <div className="ftl-track">
            {education.map((item, idx) => (
              <EduEntry key={idx} item={item} idx={idx} t={t} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
