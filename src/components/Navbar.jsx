import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'

export default function Navbar() {
  const { i18n, t } = useTranslation()

  const changeLang = (lng) => i18n.changeLanguage(lng)

  const linkClass = ({ isActive }) => isActive ? 'active' : ''

  return (
    <nav className="site">
      <div className="container nav-wrap">
        <div style={{display:'flex', alignItems:'center', gap:'.75rem'}}>
          <strong>Emircan Tutar</strong>
          <a href="https://github.com/EmirTutar" target="_blank" rel="noreferrer" className="btn">
            <FaGithub /> GitHub
          </a>
        </div>
        <div className="nav-links">
          <NavLink to="/" className={linkClass}>{t('nav.home')}</NavLink>
          <NavLink to="/timeline" className={linkClass}>{t('nav.timeline')}</NavLink>
          <NavLink to="/projects" className={linkClass}>{t('nav.projects')}</NavLink>
          <NavLink to="/technologies" className={linkClass}>{t('nav.technologies')}</NavLink>
          <NavLink to="/resume" className={linkClass}>{t('nav.resume')}</NavLink>
          <NavLink to="/contact" className={linkClass}>{t('nav.contact')}</NavLink>
        </div>
        <div className="toolbar">
          <button className="btn" onClick={() => changeLang('de')}>DE</button>
          <button className="btn" onClick={() => changeLang('en')}>EN</button>
          <button className="btn" onClick={() => changeLang('tr')}>TR</button>
        </div>
      </div>
    </nav>
  )
}
