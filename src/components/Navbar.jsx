import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  FiHome, FiCalendar, FiFolder, FiCode,
  FiEdit2, FiCheckSquare, FiFile, FiMail,
  FiGithub, FiMenu, FiX,
} from 'react-icons/fi'

const NAV_ITEMS = [
  { to: '/', labelKey: 'nav.home',            Icon: FiHome,       end: true },
  { to: '/timeline',       labelKey: 'nav.timeline',       Icon: FiCalendar           },
  { to: '/projects',       labelKey: 'nav.projects',       Icon: FiFolder             },
  { to: '/technologies',   labelKey: 'nav.technologies',   Icon: FiCode               },
  { to: '/blog',           labelKey: 'nav.blog',           Icon: FiEdit2              },
  { to: '/impossible-list',labelKey: 'nav.impossible_list',Icon: FiCheckSquare        },
  { to: '/resume',         labelKey: 'nav.resume',         Icon: FiFile               },
  { to: '/contact',        labelKey: 'nav.contact',        Icon: FiMail               },
]

export default function Navbar() {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)

  const changeLang = (lng) => { i18n.changeLanguage(lng); setOpen(false) }
  const curLang = i18n.language?.slice(0, 2).toUpperCase()

  return (
    <>
      {/* ── Desktop right sidebar ─────────────────────────────── */}
      <aside className="sidebar" aria-label="Site navigation">
        <Link to="/" className="sidebar-brand" title="Emircan Tutar">
          <span className="sidebar-brand-mono">ET</span>
          <span className="sidebar-brand-full">Emircan Tutar</span>
        </Link>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, labelKey, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' sidebar-link--active' : ''}`
              }
              title={t(labelKey)}
            >
              <Icon className="sidebar-icon" size={17} />
              <span className="sidebar-label">{t(labelKey)}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a
            href="https://github.com/EmirTutar"
            target="_blank"
            rel="noreferrer"
            className="sidebar-link"
            title="GitHub"
          >
            <FiGithub className="sidebar-icon" size={17} />
            <span className="sidebar-label">GitHub</span>
          </a>

          <div className="sidebar-langs">
            {['DE', 'EN', 'TR'].map((lng) => (
              <button
                key={lng}
                className={`sidebar-lang${curLang === lng ? ' sidebar-lang--active' : ''}`}
                onClick={() => changeLang(lng.toLowerCase())}
              >
                {lng}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Mobile hamburger button ────────────────────────────── */}
      <button
        className="mobile-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <FiMenu size={22} />
      </button>

      {/* ── Mobile overlay menu ───────────────────────────────── */}
      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <span className="mobile-drawer-brand">
                <span className="nav-brand-accent">E</span>mircan Tutar
              </span>
              <button
                className="mobile-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <FiX size={20} />
              </button>
            </div>

            <nav className="mobile-nav">
              {NAV_ITEMS.map(({ to, labelKey, Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `mobile-nav-link${isActive ? ' mobile-nav-link--active' : ''}`
                  }
                  onClick={() => setOpen(false)}
                >
                  <Icon size={16} />
                  {t(labelKey)}
                </NavLink>
              ))}
            </nav>

            <div className="mobile-drawer-footer">
              <a
                href="https://github.com/EmirTutar"
                target="_blank"
                rel="noreferrer"
                className="mobile-nav-link"
              >
                <FiGithub size={16} /> GitHub
              </a>
              <div className="mobile-langs">
                {['DE', 'EN', 'TR'].map((lng) => (
                  <button
                    key={lng}
                    className={`btn btn--ghost${curLang === lng ? ' btn--active' : ''}`}
                    style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}
                    onClick={() => changeLang(lng.toLowerCase())}
                  >
                    {lng}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
