import { useTranslation } from 'react-i18next'
import timeline from '../data/timeline'

export default function Timeline() {
  const { t } = useTranslation()
  const { experience, education } = timeline

  const renderCard = (item, prefix, idx) => (
    <article className="card" key={`${prefix}-${idx}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ margin: 0 }}>{t(item.titleKey)}</h3>
        <span className="muted">{item.period}</span>
      </div>
      <div className="muted" style={{ marginTop: '.25rem' }}>
        {t(item.orgKey)}
      </div>
      <ul style={{ marginTop: '.5rem' }}>
        {item.detailKeys.map((key, i) => (
          <li key={i}>{t(key)}</li>
        ))}
      </ul>
    </article>
  )

  return (
    <section>
      <h1 className="section-title">{t('timeline.title')}</h1>

      <h2 style={{ marginTop: '1.5rem' }}>{t('timeline.section_experience')}</h2>
      <div className="grid">
        {experience.map((item, idx) => renderCard(item, 'exp', idx))}
      </div>

      <h2 style={{ marginTop: '2rem' }}>{t('timeline.section_education')}</h2>
      <div className="grid">
        {education.map((item, idx) => renderCard(item, 'edu', idx))}
      </div>
    </section>
  )
}
