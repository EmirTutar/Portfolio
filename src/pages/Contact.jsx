import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <section>
      <h1 className="section-title">{t('contact.title')}</h1>
      <div className="card">
        <p>{t('contact.intro')}</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:etutar42@gmail.com">etutar42@gmail.com</a></li>
          <li><strong>GitHub:</strong> <a href="https://github.com/EmirTutar" target="_blank" rel="noreferrer">github.com/EmirTutar</a></li>
          <li><strong>Telefon:</strong> <a href="tel:+4915906741534">+49 1590 6741534</a></li>
        </ul>
      </div>
    </section>
  )
}
