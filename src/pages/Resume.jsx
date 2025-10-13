import { useTranslation } from 'react-i18next'

export default function Resume() {
  const { t } = useTranslation()
  const pdf = `${import.meta.env.BASE_URL}EmircanTutar_CV.pdf`

  return (
    <section>
      <h1 className="section-title">{t('resume.title')}</h1>
      <p className="muted">{t('resume.hint')}</p>
      <div className="card" style={{ height: '85vh' }}>
        <object data={pdf} type="application/pdf" width="100%" height="100%">
          <p>
            {t('resume.no_pdf')}{' '}
            <a href={pdf} target="_blank" rel="noreferrer">
              {t('resume.download')}
            </a>
          </p>
        </object>
      </div>
    </section>
  )
}
