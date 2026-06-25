import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <section>
      <div className="hero">
        <div className="hero-inner">

          {/* ── Right: Avatar + Orbit Rings ── */}
          <div className="hero-image-col">
            <div className="avatar-outer">
              {/* Ring A – green nodes */}
              <div className="orbit-ring orbit-ring--a">
                <div className="orbit-node-at" style={{ transform: 'rotate(0deg)' }}>
                  <span className="orbit-node" />
                </div>
                <div className="orbit-node-at" style={{ transform: 'rotate(120deg)' }}>
                  <span className="orbit-node orbit-node--gold" />
                </div>
                <div className="orbit-node-at" style={{ transform: 'rotate(240deg)' }}>
                  <span className="orbit-node" />
                </div>
              </div>

              {/* Ring B – amber nodes, reverse */}
              <div className="orbit-ring orbit-ring--b">
                <div className="orbit-node-at" style={{ transform: 'rotate(40deg)' }}>
                  <span className="orbit-node" />
                </div>
                <div className="orbit-node-at" style={{ transform: 'rotate(160deg)' }}>
                  <span className="orbit-node orbit-node--gold" />
                </div>
                <div className="orbit-node-at" style={{ transform: 'rotate(280deg)' }}>
                  <span className="orbit-node" />
                </div>
              </div>

              {/* Ring C – subtle */}
              <div className="orbit-ring orbit-ring--c">
                <div className="orbit-node-at" style={{ transform: 'rotate(90deg)' }}>
                  <span className="orbit-node orbit-node--gold" />
                </div>
                <div className="orbit-node-at" style={{ transform: 'rotate(270deg)' }}>
                  <span className="orbit-node" />
                </div>
              </div>

              {/* Initials avatar */}
              <div className="avatar-circle">
                <span className="avatar-initials">ET</span>
              </div>
            </div>

            {/* Typed badge */}
            <div className="hero-typed-badge">
              <span className="hero-typed-text">{t('home.hero.badge')}</span>
              <span className="typed-cursor"> ❯</span>
            </div>
          </div>

          {/* ── Left: Text content ── */}
          <div className="hero-text-col">
            <p className="hero-intro">
              {t('home.hero.greeting')} <strong>Emircan</strong>
            </p>
            <h1 className="hero-h1">
              <span className="hero-h1-block">{t('home.hero.role_line1')}</span>
              <span className="hero-h1-block">
                <span className="gradient-text">{t('home.hero.role_line2')}</span>
              </span>
            </h1>
            <p className="hero-sub">{t('home.subtitle')}</p>
            <div className="hero-ctas">
              <Link to="/projects" className="btn btn--primary">
                {t('home.hero.cta_projects')}
              </Link>
              <Link to="/resume" className="btn btn--ghost">
                {t('home.hero.cta_resume')}
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Highlight cards */}
      <div className="highlight-section">
        <div className="grid grid-3">
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
      </div>
    </section>
  )
}
