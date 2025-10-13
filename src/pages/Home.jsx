import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  return (
    <section>
      <h1 className="section-title">{t('home.title')}</h1>
      <p className="muted">{t('home.subtitle')}</p>

      <div className="grid grid-3" style={{marginTop:'1rem'}}>
        <div className="card">
          <h3>{t('home.highlights.projects')}</h3>
          <p>{t('home.highlights.projects_desc')}</p>
        </div>
        <div className="card">
          <h3>{t('home.highlights.testing')}</h3>
          <p>{t('home.highlights.testing_desc')}</p>
        </div>
        <div className="card">
          <h3>{t('home.highlights.stack')}</h3>
          <p>{t('home.highlights.stack_desc')}</p>
        </div>
      </div>
    </section>
  )
}
