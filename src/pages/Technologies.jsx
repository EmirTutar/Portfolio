import technologies from '../data/technologies.js'
import { useTranslation } from 'react-i18next'

export default function Technologies() {
  const { t } = useTranslation()
  return (
    <section>
      <h1 className="section-title">{t('technologies.title')}</h1>
      <div className="grid grid-2">
        {technologies.map((group, idx) => (
          <div className="card" key={idx}>
            <h3>{group.group}</h3>
            <div style={{marginTop:'.5rem'}}>
              {group.items.map((it, i) => <span className="tag" key={i}>{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
