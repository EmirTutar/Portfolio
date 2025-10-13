import timeline from '../data/timeline.js'
import { useTranslation } from 'react-i18next'

export default function Timeline() {
  const { t } = useTranslation()

  return (
    <section>
      <h1 className="section-title">{t('timeline.title')}</h1>
      <div className="grid">
        {timeline.map((item, idx) => (
          <div className="card" key={idx}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
              <h3 style={{margin:'0'}}>{item.title}</h3>
              <span className="muted">{item.period}</span>
            </div>
            <div className="muted" style={{marginTop:'.25rem'}}>{item.org}</div>
            <ul>
              {item.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
