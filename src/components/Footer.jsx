import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="footer-inner">
        <div>{t('footer.copyright', { year })}</div>
        <div className="muted">{t('footer.built_with')}</div>
      </div>
    </footer>
  )
}
