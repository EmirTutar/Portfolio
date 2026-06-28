import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  FiArrowLeft, FiGithub, FiExternalLink, FiBookOpen,
  FiZap, FiCheckSquare, FiCode, FiServer, FiDatabase, FiCloud, FiSmartphone,
  FiNavigation, FiShield, FiGlobe, FiActivity, FiCamera, FiCpu, FiBell,
  FiPackage, FiTarget, FiUsers, FiLayers, FiBookOpen as FiDoc, FiAlertTriangle,
  FiTool, FiBarChart2, FiMonitor, FiPlay, FiLock, FiRadio, FiBox
} from 'react-icons/fi'
import projects from '../data/projects'

// ── Shared helpers ──────────────────────────────────────────────────────────

function ZoomableImage({ src, alt, caption }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <figure className="card zoomable-figure" onClick={() => setOpen(true)} style={{ margin: 0 }}>
        <img src={src} alt={alt} style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
        {caption && (
          <figcaption className="muted" style={{ marginTop: '.5rem', fontSize: '0.8rem' }}>
            {caption}
          </figcaption>
        )}
      </figure>
      {open && (
        <div className="lightbox" onClick={() => setOpen(false)}>
          <div className="lightbox-inner">
            <img src={src} alt={alt} />
          </div>
        </div>
      )}
    </>
  )
}

function PdHero({ project, subtitle, links = [], t }) {
  const catLabel = project.category === 'work' ? t('projects.category_work')
    : project.category === 'study' ? t('projects.category_study')
    : t('projects.category_private')
  return (
    <div className="pd-hero card pd-animate">
      <div className="pd-hero-meta">
        <span className={`home-proj-badge home-proj-badge--${project.category}`}>{catLabel}</span>
      </div>
      <h1 className="pd-hero-title">{t(project.titleKey)}</h1>
      <p className="pd-hero-sub muted">{subtitle}</p>
      <div className="pd-hero-tags">
        {project.technologies.map(tech => <span key={tech} className="tag">{tech}</span>)}
      </div>
      {links.filter(l => l.url).length > 0 && (
        <div className="pd-hero-links">
          {links.filter(l => l.url).map(({ label, url, Icon, primary }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer"
               className={`pd-link-btn${primary ? ' pd-link-btn--primary' : ''}`}>
              <Icon size={14} />{label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function PdFeature({ Icon, title, text }) {
  return (
    <div className="pd-feature">
      <div className="pd-feature-icon"><Icon size={18} /></div>
      <div className="pd-feature-title">{title}</div>
      <p className="pd-feature-text muted">{text}</p>
    </div>
  )
}

function PdSectionH({ children }) {
  return <h2 className="pd-section-h">{children}</h2>
}

function PdBack({ t }) {
  return (
    <Link to="/projects" className="pd-link-btn" style={{ alignSelf: 'flex-start', marginBottom: '0.25rem' }}>
      <FiArrowLeft size={14} /> Back to Projects
    </Link>
  )
}

// ── Project Detail ──────────────────────────────────────────────────────────

export default function ProjectDetail() {
  const { projectId } = useParams()
  const { t } = useTranslation()
  const project = projects.find(p => p.id === projectId)
  const base = import.meta.env.BASE_URL || '/'

  if (!project) {
    return (
      <section>
        <h1 className="section-title">{t('projects.title')}</h1>
        <p className="muted">{t('projects.not_found')}</p>
        <Link to="/projects" className="btn" style={{ marginTop: '1rem' }}>
          {t('projects.back_link')}
        </Link>
      </section>
    )
  }

  // ── eCAL Test Suite ─────────────────────────────────────────────────────────
  if (project.id === 'ecal-test-suite') {
    return (
      <section className="project-detail">
        <PdBack t={t} />

        <PdHero
          project={project}
          subtitle="Docker and Robot Framework integration tests for the open-source eCAL IPC middleware — covering Pub/Sub, RPC, crash and network failure scenarios with CI/CD automation."
          links={[
            { label: 'GitHub', url: project.links.github, Icon: FiGithub },
            { label: 'View Thesis', url: `${base}ecal-tests/bachelor-thesis-ipc-testing.pdf`, Icon: FiBookOpen, primary: true },
          ]}
          t={t}
        />

        <div className="pd-features pd-animate" style={{ animationDelay: '80ms' }}>
          <PdFeature
            Icon={FiZap}
            title="Automated Test Infrastructure"
            text="Robot Framework + Docker-based integration tests span Pub/Sub, RPC, crash and network-partition scenarios across SHM, UDP and TCP transport layers."
          />
          <PdFeature
            Icon={FiTarget}
            title="CI/CD with GitHub Actions"
            text="Every commit triggers the full test suite automatically. Results are published to GitHub Pages, making regression detection instant instead of end-of-sprint."
          />
          <PdFeature
            Icon={FiBarChart2}
            title="~70 % Reduction in Manual Work"
            text="Standardized test-case structure with Docker isolation made regression testing fully reproducible, cutting manual validation effort by approximately 70 %."
          />
        </div>

        <div className="pd-animate" style={{ animationDelay: '160ms' }}>
          <PdSectionH>{t('projects.detail.overview')}</PdSectionH>
          <div className="card">
            <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.ecal.overview_p')}</p>
            <ul className="pd-list">
              <li>{t('projects.ecal.li0')}</li>
              <li>{t('projects.ecal.li1')}</li>
              <li>{t('projects.ecal.li2')}</li>
              <li>{t('projects.ecal.li3')}</li>
            </ul>
          </div>
        </div>

        <div className="pd-animate" style={{ animationDelay: '240ms' }}>
          <PdSectionH>{t('projects.detail.screenshots_diagrams')}</PdSectionH>
          <div className="grid grid-2">
            <ZoomableImage src={`${base}ecal-tests/github-pages-tests.png`} alt="eCAL test reports overview" caption={t('projects.ecal.cap0')} />
            <ZoomableImage src={`${base}ecal-tests/test-report.png`} alt="Robot Framework test report" caption={t('projects.ecal.cap1')} />
            <ZoomableImage src={`${base}ecal-tests/execution.png`} alt="Test execution flow" caption={t('projects.ecal.cap2')} />
            <ZoomableImage src={`${base}ecal-tests/structer.png`} alt="Test case folder structure" caption={t('projects.ecal.cap3')} />
            <ZoomableImage src={`${base}ecal-tests/rpc-bsp.png`} alt="RPC Reconnect sequence diagram" caption={t('projects.ecal.cap4')} />
            <ZoomableImage src={`${base}ecal-tests/pub-crash-bsp.png`} alt="Publisher Crash sequence diagram" caption={t('projects.ecal.cap5')} />
          </div>
        </div>

        <div className="pd-animate" style={{ animationDelay: '320ms' }}>
          <PdSectionH>{t('projects.detail.thesis_pdf')}</PdSectionH>
          <div className="card" style={{ height: '75vh' }}>
            <object data={`${base}ecal-tests/bachelor-thesis-ipc-testing.pdf`} type="application/pdf" width="100%" height="100%">
              <p>
                {t('common.pdf_not_supported')}&nbsp;
                <a href={`${base}ecal-tests/bachelor-thesis-ipc-testing.pdf`} target="_blank" rel="noreferrer">{t('common.download_here')}</a>.
              </p>
            </object>
          </div>
        </div>

        <div className="pd-animate" style={{ animationDelay: '400ms' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="https://github.com/eclipse-ecal/ecal-test-suite" target="_blank" rel="noreferrer" className="pd-link-btn">
              <FiGithub size={14} /> eCAL Test Suite (upstream)
            </a>
            <a href={`${base}ecal-tests/ipc_testing_final.pptx`} target="_blank" rel="noreferrer" className="pd-link-btn">
              <FiPlay size={14} /> Presentation (PPTX)
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ── Personal Portfolio ──────────────────────────────────────────────────────
  if (project.id === 'personal-site') {
    return (
      <section className="project-detail">
        <PdBack t={t} />

        <PdHero
          project={project}
          subtitle="Multilingual developer portfolio (DE / EN / TR) built with React and Vite — featuring a dark theme, center timeline, project showcase, tech stack overview, and an embedded PDF résumé."
          links={[
            { label: 'GitHub', url: project.links.github, Icon: FiGithub },
            { label: 'Live Site', url: project.links.demo, Icon: FiExternalLink, primary: true },
          ]}
          t={t}
        />

        <div className="pd-features pd-animate" style={{ animationDelay: '80ms' }}>
          <PdFeature
            Icon={FiGlobe}
            title="Fully Multilingual"
            text="Complete DE / EN / TR interface powered by i18next — all content, navigation and project descriptions switch instantly without a page reload."
          />
          <PdFeature
            Icon={FiZap}
            title="Modern Stack"
            text="React 18 + Vite 5 SPA with React Router, HashRouter for GitHub Pages, CSS custom properties for theming, and IBM Plex Mono for code aesthetics."
          />
          <PdFeature
            Icon={FiDoc}
            title="Embedded Résumé"
            text="The CV is embedded directly in the browser as a PDF object so recruiters can read it without downloading — with a fallback download link."
          />
        </div>

        <div className="pd-animate" style={{ animationDelay: '160ms' }}>
          <PdSectionH>Features</PdSectionH>
          <div className="card">
            <ul className="pd-list">
              <li>Sidebar navigation with icon tooltips and language switcher</li>
              <li>Center-line alternating timeline for work experience and education</li>
              <li>Projects grid with category + technology chip filter</li>
              <li>Technologies page with brand logos, skill levels and scroll-reveal animations</li>
              <li>Blog section and Impossible List page</li>
              <li>Deployed via GitHub Pages with automated Vite build</li>
            </ul>
          </div>
        </div>
      </section>
    )
  }

  // ── RateMe ─────────────────────────────────────────────────────────────────
  if (project.id === 'rateme') {
    return (
      <section className="project-detail">
        <PdBack t={t} />

        <PdHero
          project={project}
          subtitle="Android community product rating app — scan any barcode to instantly retrieve product information, read community ratings, leave your own review, and build a personal favourites list."
          links={[
            { label: 'GitHub', url: project.links.github, Icon: FiGithub },
          ]}
          t={t}
        />

        <div className="pd-features pd-animate" style={{ animationDelay: '80ms' }}>
          <PdFeature
            Icon={FiSmartphone}
            title="Barcode Scanning"
            text="ZXing library powers instant barcode scanning. A single scan retrieves product images, metadata and the community average rating from Firestore."
          />
          <PdFeature
            Icon={FiServer}
            title="Firebase Backend"
            text="Firebase Auth handles secure email-verified registration. Cloud Firestore stores ratings, comments and favourites in real time — no custom server required."
          />
          <PdFeature
            Icon={FiUsers}
            title="Community & History"
            text="Users can post ratings and comments, mark products as favourites, and revisit their full scan history — with profile pictures and personal settings."
          />
        </div>

        <div className="grid grid-2 pd-animate" style={{ animationDelay: '160ms', gap: '1.25rem' }}>
          <div>
            <PdSectionH>App Overview</PdSectionH>
            <div className="card">
              <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.rateme.p0')}</p>
              <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.rateme.p1')}</p>
              <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.rateme.p2')}</p>
              <p className="muted">{t('projects.rateme.p4')}</p>
            </div>
          </div>

          <div>
            <PdSectionH>Demo Videos</PdSectionH>
            <div className="card">
              <p className="muted" style={{ marginBottom: '0.75rem' }}>{t('projects.rateme.videos_p')}</p>
              <div className="project-images-placeholder">
                {[
                  { src: 'rateme-login.mp4',    label: t('projects.rateme.login_signup') },
                  { src: 'rateme-scan.mp4',     label: t('projects.rateme.barcode_scan') },
                  { src: 'rateme-history.mp4',  label: t('projects.rateme.history_fav') },
                  { src: 'rateme-settings.mp4', label: t('projects.rateme.settings_about') },
                ].map(({ src, label }) => (
                  <div className="project-image-slot" key={src}>
                    <video src={`${base}rateme/${src}`} controls muted playsInline style={{ width: '100%', borderRadius: '0.5rem' }}>
                      {t('common.video_not_supported')}
                    </video>
                    <p className="muted" style={{ fontSize: '.8rem', marginTop: '.3rem' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pd-animate" style={{ animationDelay: '240ms' }}>
          <PdSectionH>{t('projects.detail.materials')}</PdSectionH>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={`${base}rateme/RateMe_Presentation.pptx`} target="_blank" rel="noreferrer" className="pd-link-btn">
              <FiPlay size={14} /> {t('projects.rateme.link_pptx')}
            </a>
            <a href={`${base}rateme/RateMe_Report.pdf`} target="_blank" rel="noreferrer" className="pd-link-btn">
              <FiDoc size={14} /> {t('projects.rateme.link_pdf')}
            </a>
            <a href={`${base}rateme/RateMe_Description.pdf`} target="_blank" rel="noreferrer" className="pd-link-btn">
              <FiDoc size={14} /> {t('projects.rateme.link_features')}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ── Outdoor Planner ─────────────────────────────────────────────────────────
  if (project.id === 'outdoor-planner') {
    return (
      <section className="project-detail">
        <PdBack t={t} />

        <PdHero
          project={project}
          subtitle="Vue.js single-page app that combines a 14-day weather forecast (Open-Meteo API) with an appointment manager — so you never schedule an outdoor event on a rainy day."
          links={[
            { label: 'GitHub', url: project.links.github, Icon: FiGithub },
            { label: 'Live Demo', url: project.links.demo, Icon: FiExternalLink, primary: true },
          ]}
          t={t}
        />

        <div className="pd-features pd-animate" style={{ animationDelay: '80ms' }}>
          <PdFeature
            Icon={FiCloud}
            title="Live Weather Forecast"
            text="Open-Meteo API delivers up to a 14-day forecast. 13 weather condition categories are mapped to clear icons (sun, rain, snow, thunderstorm variants) via Axios."
          />
          <PdFeature
            Icon={FiCheckSquare}
            title="Outdoor Appointment Manager"
            text="Full CRUD for appointments: title, date, optional time, description and an all-day toggle. Entries persist in the session and are displayed in a clean overview list."
          />
          <PdFeature
            Icon={FiGlobe}
            title="Deployed on Netlify"
            text="Built with Vue.js and SweetAlert2 for notifications. Deployed on Netlify with continuous integration — always live at outdoorplaner.netlify.app."
          />
        </div>

        <div className="grid grid-2 pd-animate" style={{ animationDelay: '160ms', gap: '1.25rem' }}>
          <div>
            <PdSectionH>Technical Details</PdSectionH>
            <div className="card">
              <ul className="pd-list">
                <li>Vue.js SPA with component-based architecture</li>
                <li>Open-Meteo REST API via Axios — free, no API key required</li>
                <li>SweetAlert2 for user-friendly form feedback and confirmations</li>
                <li>Responsive CSS layout optimised for desktop and tablet</li>
                <li>Collaborative project by 3 developers</li>
              </ul>
            </div>
          </div>
          <div>
            <PdSectionH>{t('projects.detail.screenshots')}</PdSectionH>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <ZoomableImage
                src={`${base}outdoor-planner/home.png`}
                alt="Home view – current weather"
                caption={t('projects.outdoor.cap0')}
              />
              <ZoomableImage
                src={`${base}outdoor-planner/planner.png`}
                alt="Outdoor planner with appointment form"
                caption={t('projects.outdoor.cap1')}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── RadarGame ───────────────────────────────────────────────────────────────
  if (project.id === 'radar-game') {
    return (
      <section className="project-detail">
        <PdBack t={t} />

        <PdHero
          project={project}
          subtitle="C# game prototype set in space: the player controls a spaceship using a radar-style interface to navigate, detect obstacles and respond to incoming events."
          links={[
            { label: 'GitHub', url: project.links.github, Icon: FiGithub },
          ]}
          t={t}
        />

        <div className="pd-features pd-animate" style={{ animationDelay: '80ms' }}>
          <PdFeature
            Icon={FiMonitor}
            title="Radar-Based Navigation"
            text="The core mechanic centres on a radar view: the player reads the radar to detect objects and events, then reacts accordingly — a fresh twist on spatial awareness in games."
          />
          <PdFeature
            Icon={FiCode}
            title="GLSL Shader Programming"
            text="Custom GLSL shaders power the radar visuals and visual effects, providing practical experience in GPU-side rendering and shader pipelines in C#."
          />
          <PdFeature
            Icon={FiActivity}
            title="Clean Game Loop Architecture"
            text="Structured around a clear update / movement / collision cycle with clean separation of game logic and rendering, making the codebase easy to extend."
          />
        </div>

        <div className="grid grid-2 pd-animate" style={{ animationDelay: '160ms', gap: '1.25rem' }}>
          <div>
            <PdSectionH>Project Context</PdSectionH>
            <div className="card">
              <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.radar.overview_p0')}</p>
              <p className="muted">{t('projects.radar.overview_p1')}</p>
            </div>
          </div>
          <div>
            <PdSectionH>{t('projects.radar.trailer_h')}</PdSectionH>
            <div className="card">
              <video src={`${base}radar-game/SpaceshipTrailer.mp4`} controls muted playsInline style={{ width: '100%', borderRadius: '0.5rem' }}>
                {t('common.video_not_supported')}
              </video>
              <p className="muted" style={{ fontSize: '.8rem', marginTop: '.4rem' }}>{t('projects.detail.fullscreen_tip')}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Mission Fried Chicken ───────────────────────────────────────────────────
  if (project.id === 'mission-fried-chicken') {
    return (
      <section className="project-detail">
        <PdBack t={t} />

        <PdHero
          project={project}
          subtitle="Arcade-style C# game prototype: a space chicken on a mission — focused on demonstrating a clean game loop, responsive controls, and structured scene management."
          links={[
            { label: 'GitHub', url: project.links.github, Icon: FiGithub },
          ]}
          t={t}
        />

        <div className="pd-features pd-animate" style={{ animationDelay: '80ms' }}>
          <PdFeature
            Icon={FiPlay}
            title="Arcade Core Mechanics"
            text="Tight, humorous 'Space Chicken on a mission' setting with emphasis on control responsiveness, timing and a satisfying core loop — proving that simple games are about feel."
          />
          <PdFeature
            Icon={FiActivity}
            title="Structured Game Loop"
            text="Clean update / input / collision / game-state cycle demonstrates core game engine concepts without over-engineering — a good teaching example for C# game dev."
          />
          <PdFeature
            Icon={FiLayers}
            title="Scene & Menu Structure"
            text="Menu, in-game and game-over scenes are managed cleanly, providing hands-on experience with state machines and scene transitions in a real C# game context."
          />
        </div>

        <div className="grid grid-2 pd-animate" style={{ animationDelay: '160ms', gap: '1.25rem' }}>
          <div>
            <PdSectionH>Project Overview</PdSectionH>
            <div className="card">
              <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.mfc.overview_p0')}</p>
              <p className="muted">{t('projects.mfc.overview_p1')}</p>
            </div>
          </div>
          <div>
            <PdSectionH>{t('projects.mfc.trailer_h')}</PdSectionH>
            <div className="card">
              <video src={`${base}mfc/mfctrailer.mp4`} controls muted playsInline style={{ width: '100%', borderRadius: '0.5rem' }}>
                {t('common.video_not_supported')}
              </video>
              <p className="muted" style={{ fontSize: '.8rem', marginTop: '.4rem' }}>{t('projects.mfc.trailer_caption')}</p>
              <div style={{ marginTop: '1rem' }}>
                <a href={`${base}mfc/mfc-presentation.pptx`} target="_blank" rel="noreferrer" className="pd-link-btn">
                  <FiPlay size={14} /> {t('projects.mfc.link_pptx')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Patient Monitoring ──────────────────────────────────────────────────────
  if (project.id === 'patient-monitoring') {
    return (
      <section className="project-detail">
        <PdBack t={t} />

        <PdHero
          project={project}
          subtitle="Camera-based patient safety system: YOLOv5 detects falls and bed exits in real time, then routes alerts through MQTT, Matrix chat, email, and a hardware alarm on Raspberry Pi."
          links={[
            { label: 'GitHub', url: project.links.github, Icon: FiGithub },
          ]}
          t={t}
        />

        <div className="pd-features pd-animate" style={{ animationDelay: '80ms' }}>
          <PdFeature
            Icon={FiCamera}
            title="YOLOv5 Fall Detection"
            text="Real-time object detection with three classes — walking, sitting, fall detected. Runs on GPU-accelerated Docker container (NVIDIA Docker Toolkit) on Raspberry Pi hardware."
          />
          <PdFeature
            Icon={FiBox}
            title="7-Container Microservices"
            text="Full Docker Compose stack: YOLOv5, MQTT broker (Mosquitto), alarm service, mail client, Mailcow server, Matrix and Matrix bridge — all isolated and independently scalable."
          />
          <PdFeature
            Icon={FiBell}
            title="Multi-Channel Alerting"
            text="Detected events flow through MQTT to Matrix chat (encrypted), email (Mailcow) and a hardware alarm — LEDs for status levels and a buzzer for immediate ward notification."
          />
        </div>

        <div className="pd-animate" style={{ animationDelay: '160ms' }}>
          <PdSectionH>{t('projects.detail.screenshots_diagrams')}</PdSectionH>
          <div className="grid grid-2">
            {[
              { img: 'systemaufbau.png', alt: 'System architecture',          cap: 'projects.patient.cap0' },
              { img: 'Matrix.png',       alt: 'Matrix server architecture',   cap: 'projects.patient.cap1' },
              { img: 'Yolo.png',         alt: 'YOLOv5 fall detection',        cap: 'projects.patient.cap2' },
              { img: 'alarm.png',        alt: 'Raspberry Pi alarm hardware',  cap: 'projects.patient.cap3' },
            ].map(({ img, alt, cap }) => (
              <ZoomableImage key={img} src={`${base}patient-monitoring/${img}`} alt={alt} caption={t(cap)} />
            ))}
          </div>
        </div>

        <div className="grid grid-2 pd-animate" style={{ animationDelay: '240ms', gap: '1.25rem' }}>
          <div>
            <PdSectionH>{t('projects.detail.documentation_pdf')}</PdSectionH>
            <div className="card" style={{ height: '60vh' }}>
              <object data={`${base}patient-monitoring/Doku.pdf`} type="application/pdf" width="100%" height="100%">
                <a href={`${base}patient-monitoring/Doku.pdf`} target="_blank" rel="noreferrer" className="pd-link-btn">
                  <FiDoc size={14} /> {t('common.download_here')}
                </a>
              </object>
            </div>
          </div>
          <div>
            <PdSectionH>{t('projects.detail.presentation_pdf')}</PdSectionH>
            <div className="card" style={{ height: '60vh' }}>
              <object data={`${base}patient-monitoring/Presentation.pdf`} type="application/pdf" width="100%" height="100%">
                <a href={`${base}patient-monitoring/Presentation.pdf`} target="_blank" rel="noreferrer" className="pd-link-btn">
                  <FiDoc size={14} /> {t('common.download_here')}
                </a>
              </object>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Java Testing ────────────────────────────────────────────────────────────
  if (project.id === 'java-testing') {
    return (
      <section className="project-detail">
        <PdBack t={t} />

        <PdHero
          project={project}
          subtitle="Academic research project evaluating ChatGPT-4 as a Java test-generation assistant — measuring code coverage, error rates and prompt effort across unit, integration and UI test types."
          links={[
            { label: 'GitHub', url: project.links.github, Icon: FiGithub },
            { label: 'View Report', url: `${base}java-testing/ChatGPT_Testing_Java.pdf`, Icon: FiBookOpen, primary: true },
          ]}
          t={t}
        />

        <div className="pd-features pd-animate" style={{ animationDelay: '80ms' }}>
          <PdFeature
            Icon={FiZap}
            title="AI-Generated Test Suites"
            text="ChatGPT-4 generates complete JUnit test classes from prompts. Iterative prompt engineering is applied to improve coverage and fix compilation errors across multiple rounds."
          />
          <PdFeature
            Icon={FiBarChart2}
            title="3 Java Projects Evaluated"
            text="Inventory Manager, Bank Manager and Farm Product Store were each tested with unit, integration and UI test types, providing a broad basis for comparing AI test quality."
          />
          <PdFeature
            Icon={FiCheckSquare}
            title="Key Finding"
            text="AI excels at unit and integration tests with high coverage and low effort. UI tests require significantly more correction but AI-generated classes still provide a useful starting point."
          />
        </div>

        <div className="grid grid-2 pd-animate" style={{ animationDelay: '160ms', gap: '1.25rem' }}>
          <div>
            <PdSectionH>{t('projects.detail.key_results')}</PdSectionH>
            <div className="card">
              <p className="muted">{t('projects.java.results_p')}</p>
            </div>
          </div>
          <div>
            <PdSectionH>{t('projects.detail.links_resources')}</PdSectionH>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href="https://github.com/EmirTutar/PA_KI_Softwaretests_Java" target="_blank" rel="noreferrer" className="pd-link-btn">
                <FiGithub size={14} /> GitHub Repository
              </a>
              <a href={`${base}java-testing/ChatGPT_Testing_Java.pdf`} target="_blank" rel="noreferrer" className="pd-link-btn">
                <FiDoc size={14} /> {t('projects.java.link_doc')}
              </a>
              <a href={`${base}java-testing/Testgenerierung_Java.pptx`} target="_blank" rel="noreferrer" className="pd-link-btn">
                <FiPlay size={14} /> {t('projects.java.link_pres')}
              </a>
            </div>
          </div>
        </div>

        <div className="pd-animate" style={{ animationDelay: '240ms' }}>
          <PdSectionH>{t('projects.detail.report_pdf')}</PdSectionH>
          <div className="card" style={{ height: '70vh' }}>
            <object data={`${base}java-testing/ChatGPT_Testing_Java.pdf`} type="application/pdf" width="100%" height="100%">
              <a href={`${base}java-testing/ChatGPT_Testing_Java.pdf`} target="_blank" rel="noreferrer" className="pd-link-btn">
                <FiDoc size={14} /> {t('common.download_here')}
              </a>
            </object>
          </div>
        </div>
      </section>
    )
  }

  // ── Turtlebot ───────────────────────────────────────────────────────────────
  if (project.id === 'turtlebot_driving') {
    return (
      <section className="project-detail">
        <PdBack t={t} />

        <PdHero
          project={project}
          subtitle="ROS Noetic autonomous navigation software for a TurtleBot mobile robot — sequentially reaching predefined goals with zone-based strategy, deadlock recovery, and costmap tuning."
          links={[
            { label: 'GitHub', url: project.links.github, Icon: FiGithub },
          ]}
          t={t}
        />

        <div className="pd-features pd-animate" style={{ animationDelay: '80ms' }}>
          <PdFeature
            Icon={FiNavigation}
            title="ROS move_base Navigation"
            text="move_base with amcl localization and a pre-built gmapping map delivers robust path planning. Costmap inflation parameters are tuned for close-obstacle navigation."
          />
          <PdFeature
            Icon={FiTarget}
            title="Zone-Based Goal Strategy"
            text="Goals are stored in a YAML file with coordinates, zone (easy/hard) and reward. The algorithm targets easy goals first, then transitions to the harder zone once cleared."
          />
          <PdFeature
            Icon={FiShield}
            title="Deadlock & Timeout Recovery"
            text="Stuck detection triggers a reverse/rotation manoeuvre. Goals with 30 s timeout are moved to a cool-down list. Costmap clearing helps when paths become temporarily blocked."
          />
        </div>

        <div className="grid grid-2 pd-animate" style={{ animationDelay: '160ms', gap: '1.25rem' }}>
          <div>
            <PdSectionH>{t('projects.detail.overview')}</PdSectionH>
            <div className="card">
              <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.turtlebot.overview_p')}</p>
              <ul className="pd-list">
                <li>{t('projects.turtlebot.li0')}</li>
                <li>{t('projects.turtlebot.li1')}</li>
                <li>{t('projects.turtlebot.li2')}</li>
                <li>{t('projects.turtlebot.li3')}</li>
              </ul>
            </div>
          </div>
          <div>
            <PdSectionH>{t('projects.turtlebot.hardware_h')}</PdSectionH>
            <div className="card">
              <figure style={{ margin: 0 }}>
                <img src={`${base}turtlebot/turtlebot.png`} alt="Turtlebot hardware" style={{ width: '100%', borderRadius: '0.5rem' }} />
                <figcaption className="muted" style={{ marginTop: '.5rem', fontSize: '0.8rem' }}>
                  {t('projects.turtlebot.caption')}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="pd-animate" style={{ animationDelay: '240ms' }}>
          <PdSectionH>{t('projects.turtlebot.behavior_h')}</PdSectionH>
          <div className="card">
            <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.turtlebot.behavior_p')}</p>
            <ul className="pd-list">
              <li><strong style={{ color: 'var(--text)' }}>Goal Precision:</strong> {t('projects.turtlebot.bli0')}</li>
              <li><strong style={{ color: 'var(--text)' }}>Blocked Goals:</strong> {t('projects.turtlebot.bli1')}</li>
              <li><strong style={{ color: 'var(--text)' }}>Deadlocks:</strong> {t('projects.turtlebot.bli2')}</li>
              <li><strong style={{ color: 'var(--text)' }}>Future Work:</strong> {t('projects.turtlebot.bli3')}</li>
            </ul>
          </div>
        </div>
      </section>
    )
  }

  // ── System Security ─────────────────────────────────────────────────────────
  if (project.id === 'systemsicherheit-labs') {
    return (
      <section className="project-detail">
        <PdBack t={t} />

        <PdHero
          project={project}
          subtitle="Hands-on security lab exercises covering the full offensive–defensive workflow: from OSINT and reconnaissance through network attacks, web vulnerabilities, exploitation and hardening."
          links={[]}
          t={t}
        />

        <div className="pd-features pd-animate" style={{ animationDelay: '80ms' }}>
          <PdFeature
            Icon={FiTarget}
            title="Reconnaissance & Enumeration"
            text="OSINT, port scanning and service enumeration in a dedicated security lab environment — establishing a systematic methodology for structured security assessments."
          />
          <PdFeature
            Icon={FiShield}
            title="Web Application Security"
            text="Hands-on exploitation of LFI, SQL Injection, XSS, OS Command Injection and SSRF vulnerabilities against intentionally vulnerable web applications and CMS."
          />
          <PdFeature
            Icon={FiLock}
            title="Exploitation & Hardening"
            text="Building shells in a controlled environment, documenting each vulnerability and deriving targeted countermeasures — building a responsible, defence-oriented security mindset."
          />
        </div>

        <div className="grid grid-2 pd-animate" style={{ animationDelay: '160ms', gap: '1.25rem' }}>
          <div>
            <PdSectionH>Lab Overview</PdSectionH>
            <div className="card">
              <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.sicherheit.overview_p')}</p>
              <ul className="pd-list">
                <li><strong style={{ color: 'var(--text)' }}>Recon:</strong> {t('projects.sicherheit.li_recon')}</li>
                <li><strong style={{ color: 'var(--text)' }}>Network:</strong> {t('projects.sicherheit.li_network')}</li>
                <li><strong style={{ color: 'var(--text)' }}>Web:</strong> {t('projects.sicherheit.li_web')}</li>
                <li><strong style={{ color: 'var(--text)' }}>Exploit:</strong> {t('projects.sicherheit.li_exploit')}</li>
              </ul>
              <p className="muted" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>{t('projects.sicherheit.lab_note')}</p>
            </div>
          </div>
          <div>
            <PdSectionH>Learning Outcomes</PdSectionH>
            <div className="card">
              <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.sicherheit.role_p')}</p>
              <ul className="pd-list">
                <li>{t('projects.sicherheit.role_li0')}</li>
                <li>{t('projects.sicherheit.role_li1')}</li>
                <li>{t('projects.sicherheit.role_li2')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Generic fallback ────────────────────────────────────────────────────────
  const catLabel = project.category === 'work' ? t('projects.category_work')
    : project.category === 'study' ? t('projects.category_study')
    : t('projects.category_private')

  return (
    <section className="project-detail">
      <PdBack t={t} />

      <div className="pd-hero card pd-animate">
        <div className="pd-hero-meta">
          <span className={`home-proj-badge home-proj-badge--${project.category}`}>{catLabel}</span>
        </div>
        <h1 className="pd-hero-title">{t(project.titleKey)}</h1>
        <div className="pd-hero-tags">
          {project.technologies?.map(tech => <span key={tech} className="tag">{tech}</span>)}
        </div>
        {(project.links?.github || project.links?.demo) && (
          <div className="pd-hero-links">
            {project.links?.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer" className="pd-link-btn">
                <FiGithub size={14} /> GitHub
              </a>
            )}
            {project.links?.demo && (
              <a href={project.links.demo} target="_blank" rel="noreferrer" className="pd-link-btn pd-link-btn--primary">
                <FiExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>

      <div className="card pd-animate" style={{ animationDelay: '80ms' }}>
        <h2 style={{ marginTop: 0, marginBottom: '.75rem' }}>{t('projects.detail.short_description')}</h2>
        <p className="muted">{t(project.descriptionKey)}</p>
      </div>
    </section>
  )
}
