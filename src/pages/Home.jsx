import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import {
  FiBriefcase, FiBook, FiArrowDown,
  FiGithub, FiExternalLink, FiArrowRight,
} from 'react-icons/fi'
import timeline from '../data/timeline'
import projects from '../data/projects'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ─── typed effect ────────────────────────────────────────────── */
const PHRASES = ['Software Developer', 'Problem Solver', 'CS Student', 'Team Player']

function TypedBadge() {
  const [phrase, setPhrase] = useState('')
  const [idx, setIdx] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const target = PHRASES[idx % PHRASES.length]
    if (typing) {
      if (phrase.length < target.length) {
        const t = setTimeout(() => setPhrase(target.slice(0, phrase.length + 1)), 70)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (phrase.length > 0) {
        const t = setTimeout(() => setPhrase(phrase.slice(0, -1)), 38)
        return () => clearTimeout(t)
      } else {
        setIdx((i) => i + 1)
        setTyping(true)
      }
    }
  }, [phrase, typing, idx])

  return (
    <div className="hero-typed-badge">
      <span className="hero-typed-text">{phrase}</span>
      <span className="typed-cursor">▍</span>
    </div>
  )
}

/* ─── scroll-reveal wrapper ───────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' revealed' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── timeline helpers ────────────────────────────────────────── */
function parseStartYYYYMM(period) {
  const m = period.match(/(\d{2})\/(\d{4})/)
  return m ? parseInt(m[2]) * 100 + parseInt(m[1]) : 0
}

function buildTimelineEntries(t) {
  const exp = timeline.experience.map((e, i) => ({
    ...e,
    type: 'work',
    sortKey: parseStartYYYYMM(e.period),
    title: t(e.titleKey),
    org: t(e.orgKey),
  }))
  const edu = timeline.education.map((e, i) => ({
    ...e,
    type: 'edu',
    sortKey: parseStartYYYYMM(e.period),
    title: t(e.titleKey),
    org: t(e.orgKey),
  }))
  return [...exp, ...edu].sort((a, b) => b.sortKey - a.sortKey)
}

/* ─── featured projects (top 3 by effort) ────────────────────── */
const FEATURED_IDS = ['ecal-test-suite', 'rateme', 'patient-monitoring']
const featuredProjects = projects.filter((p) => FEATURED_IDS.includes(p.id))

/* ─── component ──────────────────────────────────────────────── */
export default function Home() {
  const { t } = useTranslation()
  const entries = buildTimelineEntries(t)

  return (
    <div className="home-page">

      {/* ════ HERO ════════════════════════════════════════════════ */}
      <section className="home-hero">
        <div className="home-hero-inner container">

          {/* Avatar */}
          <div className="hero-image-col">
            <div className="avatar-outer">
              <div className="orbit-ring orbit-ring--a">
                <div className="orbit-node-at" style={{ transform: 'rotate(0deg)' }}><span className="orbit-node" /></div>
                <div className="orbit-node-at" style={{ transform: 'rotate(120deg)' }}><span className="orbit-node orbit-node--gold" /></div>
                <div className="orbit-node-at" style={{ transform: 'rotate(240deg)' }}><span className="orbit-node" /></div>
              </div>
              <div className="orbit-ring orbit-ring--b">
                <div className="orbit-node-at" style={{ transform: 'rotate(40deg)' }}><span className="orbit-node" /></div>
                <div className="orbit-node-at" style={{ transform: 'rotate(160deg)' }}><span className="orbit-node orbit-node--gold" /></div>
                <div className="orbit-node-at" style={{ transform: 'rotate(280deg)' }}><span className="orbit-node" /></div>
              </div>
              <div className="orbit-ring orbit-ring--c">
                <div className="orbit-node-at" style={{ transform: 'rotate(90deg)' }}><span className="orbit-node orbit-node--gold" /></div>
                <div className="orbit-node-at" style={{ transform: 'rotate(270deg)' }}><span className="orbit-node" /></div>
              </div>
              <div className="avatar-circle">
                <span className="avatar-initials">ET</span>
              </div>
            </div>
            <TypedBadge />
          </div>

          {/* Text */}
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
              <Link to="/projects" className="btn btn--primary">{t('home.hero.cta_projects')}</Link>
              <Link to="/resume"   className="btn btn--ghost">{t('home.hero.cta_resume')}</Link>
              <a href="https://github.com/EmirTutar" target="_blank" rel="noreferrer" className="btn btn--ghost">
                <FiGithub /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <a href="#timeline" className="scroll-hint" aria-label="Scroll down">
          <FiArrowDown size={18} />
        </a>
      </section>

      {/* ════ STATS BAR ══════════════════════════════════════════ */}
      <div className="home-stats-bar">
        <div className="container home-stats-inner">
          {[
            { value: '10+', label: t('home.stats.projects') },
            { value: '2', label: t('home.stats.internships') },
            { value: '3+', label: t('home.stats.years') },
            { value: 'B.Sc.', label: t('home.stats.degree') },
          ].map(({ value, label }, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="home-stat">
                <span className="home-stat-value">{value}</span>
                <span className="home-stat-label">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ════ TIMELINE ═══════════════════════════════════════════ */}
      <section className="home-section" id="timeline">
        <div className="container">
          <Reveal>
            <h2 className="section-title">{t('timeline.title')}</h2>
            <p className="muted" style={{ marginBottom: '2.5rem' }}>
              {t('home.timeline_sub')}
            </p>
          </Reveal>

          <div className="ctl">
            {entries.slice(0, 6).map((entry, i) => {
              const isLeft = i % 2 === 0
              const m = entry.period.match(/(\d{2}\/\d{4})/)
              const startDate = m ? m[1] : ''
              const Icon = entry.type === 'work' ? FiBriefcase : FiBook
              const dotClass = `ctl-dot${entry.type === 'edu' ? ' ctl-dot--edu' : ''}`
              return (
                <Reveal key={i} delay={i * 90} className="ctl-entry">
                  {isLeft ? (
                    <>
                      <div className="ctl-card card ctl-card--left">
                        <div className="ctl-card-title">{entry.title}</div>
                        <div className="ctl-card-org">{entry.org}</div>
                        <div className="ctl-card-period">{entry.period}</div>
                      </div>
                      <div className="ctl-node">
                        <div className={dotClass}><Icon size={18} /></div>
                      </div>
                      <div className="ctl-date">{startDate}</div>
                    </>
                  ) : (
                    <>
                      <div className="ctl-date ctl-date--right">{startDate}</div>
                      <div className="ctl-node">
                        <div className={dotClass}><Icon size={18} /></div>
                      </div>
                      <div className="ctl-card card ctl-card--right">
                        <div className="ctl-card-title">{entry.title}</div>
                        <div className="ctl-card-org">{entry.org}</div>
                        <div className="ctl-card-period">{entry.period}</div>
                      </div>
                    </>
                  )}
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={200}>
            <Link to="/timeline" className="btn btn--ghost" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              {t('home.timeline_full')} <FiArrowRight style={{ marginLeft: '0.4rem' }} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ════ FEATURED PROJECTS ══════════════════════════════════ */}
      <section className="home-section home-section--alt">
        <div className="container">
          <Reveal>
            <h2 className="section-title">{t('projects.title')}</h2>
            <p className="muted" style={{ marginBottom: '2rem' }}>{t('projects.subtitle')}</p>
          </Reveal>

          <div className="grid grid-3">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <Link to={`/projects/${p.id}`} className="card project-card home-project-card">
                  <div className="home-proj-header">
                    <h3 className="home-proj-title">{t(p.titleKey)}</h3>
                    <span className={`home-proj-badge home-proj-badge--${p.category}`}>
                      {t(`projects.category_${p.category}`)}
                    </span>
                  </div>
                  <p className="home-proj-desc">{t(p.descriptionKey)}</p>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                    {p.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <Link to="/projects" className="btn btn--ghost" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              {t('home.all_projects')} <FiArrowRight style={{ marginLeft: '0.4rem' }} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ════ CONTACT CTA ════════════════════════════════════════ */}
      <section className="home-section home-cta">
        <div className="container home-cta-inner">
          <Reveal>
            <h2 className="home-cta-title">{t('home.cta.title')}</h2>
            <p className="home-cta-sub">{t('home.cta.subtitle')}</p>
            <div className="hero-ctas" style={{ justifyContent: 'center', marginTop: '1.75rem' }}>
              <Link to="/contact" className="btn btn--primary">{t('home.cta.btn')}</Link>
              <a href="https://github.com/EmirTutar" target="_blank" rel="noreferrer" className="btn btn--ghost">
                <FiGithub /> GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
