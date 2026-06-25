import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import projects from '../data/projects'

function ZoomableImage({ src, alt, caption }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <figure className="card zoomable-figure" onClick={() => setOpen(true)}>
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', borderRadius: '8px' }}
        />
        <figcaption className="muted" style={{ marginTop: '.5rem' }}>
          {caption}{' '}
          <span style={{ fontSize: '.75rem', opacity: 0.8 }}>
            {t('common.click_to_zoom')}
          </span>
        </figcaption>
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

function ProjectHeader({ titleKey, subtitleKey, technologies, t }) {
  return (
    <header className="project-detail-header card">
      <div>
        <h1 className="section-title">{t(titleKey)}</h1>
        <p className="muted">{t(subtitleKey)}</p>
      </div>
      <div className="project-detail-tags">
        {technologies?.map(tech => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>
    </header>
  )
}

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

  // ── eCAL Test Suite / Bachelor thesis ──────────────────────────────────────
  if (project.id === 'ecal-test-suite') {
    return (
      <section className="project-detail">
        <ProjectHeader
          titleKey={project.titleKey}
          subtitleKey="projects.ecal.subtitle"
          technologies={project.technologies}
          t={t}
        />

        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>{t('projects.detail.overview')}</h2>
            <p className="muted" style={{ marginBottom: '.75rem' }}>
              {t('projects.ecal.overview_p')}
            </p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>{t('projects.ecal.li0')}</li>
              <li>{t('projects.ecal.li1')}</li>
              <li>{t('projects.ecal.li2')}</li>
              <li>{t('projects.ecal.li3')}</li>
            </ul>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>{t('projects.detail.links_resources')}</h2>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                {t('projects.ecal.link_suite')}:{' '}
                <a href="https://github.com/eclipse-ecal/ecal-test-suite" target="_blank" rel="noreferrer">
                  github.com/eclipse-ecal/ecal-test-suite
                </a>
              </li>
              <li>
                {t('projects.ecal.link_middleware')}:{' '}
                <a href="https://github.com/eclipse-ecal/ecal" target="_blank" rel="noreferrer">
                  github.com/eclipse-ecal/ecal
                </a>
              </li>
              <li>
                {t('projects.detail.thesis_pdf')}:{' '}
                <a href={`${base}ecal-tests/bachelor-thesis-ipc-testing.pdf`} target="_blank" rel="noreferrer">
                  {t('projects.ecal.link_thesis')}
                </a>
              </li>
              <li>
                {t('projects.detail.presentation_pdf')}:{' '}
                <a href={`${base}ecal-tests/ipc_testing_final.pptx`} target="_blank" rel="noreferrer">
                  {t('projects.ecal.link_presentation')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="section-title">{t('projects.detail.screenshots_diagrams')}</h2>
        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          <ZoomableImage src={`${base}ecal-tests/github-pages-tests.png`} alt="eCAL Integration Test Reports overview" caption={t('projects.ecal.cap0')} />
          <ZoomableImage src={`${base}ecal-tests/test-report.png`} alt="Robot Framework test report" caption={t('projects.ecal.cap1')} />
          <ZoomableImage src={`${base}ecal-tests/execution.png`} alt="Test execution flow" caption={t('projects.ecal.cap2')} />
          <ZoomableImage src={`${base}ecal-tests/structer.png`} alt="Test case folder structure" caption={t('projects.ecal.cap3')} />
          <ZoomableImage src={`${base}ecal-tests/rpc-bsp.png`} alt="RPC Reconnect sequence diagram" caption={t('projects.ecal.cap4')} />
          <ZoomableImage src={`${base}ecal-tests/pub-crash-bsp.png`} alt="Publisher Crash sequence diagram" caption={t('projects.ecal.cap5')} />
        </div>

        <h2 className="section-title">{t('projects.detail.thesis_pdf')}</h2>
        <div className="card" style={{ height: '75vh', marginBottom: '1.5rem' }}>
          <object
            data={`${base}ecal-tests/bachelor-thesis-ipc-testing.pdf`}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              {t('common.pdf_not_supported')}&nbsp;
              <a href={`${base}ecal-tests/bachelor-thesis-ipc-testing.pdf`} target="_blank" rel="noreferrer">
                {t('common.download_here')}
              </a>.
            </p>
          </object>
        </div>

        <Link className="btn" to="/projects">{t('projects.back_link')}</Link>
      </section>
    )
  }

  // ── Personal Portfolio ──────────────────────────────────────────────────────
  if (project.id === 'personal-site') {
    return (
      <section className="project-detail">
        <ProjectHeader
          titleKey={project.titleKey}
          subtitleKey="projects.personal_site.subtitle"
          technologies={project.technologies}
          t={t}
        />

        <div className="grid grid-2 project-detail-body" style={{ marginBottom: '1.5rem' }}>
          <article className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.detail.overview')}</h2>
            <p className="muted">{t('projects.personal_site.overview_p')}</p>
            <ul className="muted" style={{ paddingLeft: '1.1rem', marginTop: '.75rem' }}>
              <li>{t('projects.personal_site.li0')}</li>
              <li>{t('projects.personal_site.li1')}</li>
              <li>{t('projects.personal_site.li2')}</li>
              <li>{t('projects.personal_site.li3')}</li>
            </ul>
          </article>

          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.detail.links_stack')}</h2>
            <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.personal_site.links_p')}</p>
            <p className="muted" style={{ marginBottom: '.5rem' }}>
              <strong>{t('projects.detail.main_technologies')}:</strong> React, Vite, React Router, i18next, CSS
            </p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                {t('common.github_repo')}:{' '}
                <a href="https://github.com/EmirTutar/Portfolio" target="_blank" rel="noreferrer">
                  github.com/EmirTutar/Portfolio
                </a>
              </li>
              <li>
                {t('common.live_demo')} (GitHub Pages):{' '}
                <a href="https://emirtutar.github.io/Portfolio/" target="_blank" rel="noreferrer">
                  emirtutar.github.io/Portfolio
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/projects" className="btn">{t('projects.back_link')}</Link>
        </div>
      </section>
    )
  }

  // ── RateMe ─────────────────────────────────────────────────────────────────
  if (project.id === 'rateme') {
    return (
      <section className="project-detail">
        <ProjectHeader
          titleKey={project.titleKey}
          subtitleKey="projects.rateme.subtitle"
          technologies={project.technologies}
          t={t}
        />

        <div className="grid grid-2 project-detail-body">
          <article className="card">
            <h3 style={{ marginTop: '1.2rem' }}>{t('projects.rateme.app_structure')}</h3>
            <p className="muted">{t('projects.rateme.p0')}</p>
            <p className="muted">{t('projects.rateme.p1')}</p>
            <p className="muted">{t('projects.rateme.p2')}</p>
            <p className="muted">{t('projects.rateme.p3')}</p>
            <p className="muted">{t('projects.rateme.p4')}</p>

            <h3 style={{ marginTop: '1.2rem' }}>{t('projects.rateme.purpose')}</h3>
            <p className="muted">{t('projects.rateme.purpose_p')}</p>

            <h3 style={{ marginTop: '1.2rem' }}>{t('projects.rateme.target')}</h3>
            <p className="muted">{t('projects.rateme.target_p')}</p>

            {project.links?.github && (
              <p style={{ marginTop: '1.2rem' }}>
                <strong>{t('common.github')}:&nbsp;</strong>
                <a href={project.links.github} target="_blank" rel="noreferrer">
                  {project.links.github}
                </a>
              </p>
            )}
          </article>

          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.detail.videos_documentation')}</h2>
            <p className="muted" style={{ marginBottom: '0.75rem' }}>{t('projects.rateme.videos_p')}</p>

            <div className="project-images-placeholder">
              {[
                { src: 'rateme-login.mp4',    label: 'projects.rateme.login_signup'   },
                { src: 'rateme-scan.mp4',     label: 'projects.rateme.barcode_scan'   },
                { src: 'rateme-history.mp4',  label: 'projects.rateme.history_fav'    },
                { src: 'rateme-settings.mp4', label: 'projects.rateme.settings_about' },
              ].map(({ src, label }) => (
                <div className="project-image-slot" key={src}>
                  <video
                    src={`${base}rateme/${src}`}
                    controls muted playsInline
                    style={{ width: '100%', borderRadius: '0.5rem' }}
                  >
                    {t('common.video_not_supported')}
                  </video>
                  <p className="muted" style={{ fontSize: '.8rem', marginTop: '.3rem' }}>
                    {t(label)}
                  </p>
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: '1rem', marginBottom: '.4rem' }}>{t('projects.detail.materials')}</h3>
            <ul className="muted" style={{ paddingLeft: '1.1rem', margin: 0 }}>
              <li>
                <a href={`${base}rateme/RateMe_Presentation.pptx`} target="_blank" rel="noreferrer">
                  {t('projects.rateme.link_pptx')}
                </a>
              </li>
              <li>
                <a href={`${base}rateme/RateMe_Report.pdf`} target="_blank" rel="noreferrer">
                  {t('projects.rateme.link_pdf')}
                </a>
              </li>
              <li>
                <a href={`${base}rateme/RateMe_Description.pdf`} target="_blank" rel="noreferrer">
                  {t('projects.rateme.link_features')}
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/projects" className="btn">{t('projects.back_link')}</Link>
        </div>
      </section>
    )
  }

  // ── Outdoor Planner ─────────────────────────────────────────────────────────
  if (project.id === 'outdoor-planner') {
    return (
      <section className="project-detail">
        <ProjectHeader
          titleKey={project.titleKey}
          subtitleKey="projects.outdoor.subtitle"
          technologies={project.technologies}
          t={t}
        />

        <div className="grid grid-2 project-detail-body" style={{ marginBottom: '1.5rem' }}>
          <article className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.detail.overview')}</h2>
            <p className="muted">{t('projects.outdoor.overview_p0')}</p>
            <p className="muted">{t('projects.outdoor.overview_p1')}</p>

            <h3 style={{ marginTop: '1.2rem' }}>{t('projects.outdoor.tech_h')}</h3>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>{t('projects.outdoor.li0')}</li>
              <li>{t('projects.outdoor.li1')}</li>
              <li>{t('projects.outdoor.li2')}</li>
              <li>{t('projects.outdoor.li3')}</li>
            </ul>

            <h3 style={{ marginTop: '1.2rem' }}>{t('projects.detail.links')}</h3>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                {t('common.live_demo')}:&nbsp;
                <a href="https://outdoorplaner.netlify.app/" target="_blank" rel="noreferrer">
                  outdoorplaner.netlify.app
                </a>
              </li>
              <li>
                {t('common.github_repo')}:&nbsp;
                <a href="https://github.com/EmirTutar/wetterapp" target="_blank" rel="noreferrer">
                  github.com/EmirTutar/wetterapp
                </a>
              </li>
            </ul>
          </article>

          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.detail.screenshots')}</h2>
            <p className="muted" style={{ marginBottom: '0.75rem' }}>{t('projects.outdoor.screenshots_p')}</p>
            <div className="project-images-placeholder">
              <ZoomableImage
                src={`${base}outdoor-planner/home.png`}
                alt="Home view with current weather in Weingarten"
                caption={t('projects.outdoor.cap0')}
              />
              <ZoomableImage
                src={`${base}outdoor-planner/planner.png`}
                alt="Outdoor planner with appointment form"
                caption={t('projects.outdoor.cap1')}
              />
            </div>
          </aside>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/projects" className="btn">{t('projects.back_link')}</Link>
        </div>
      </section>
    )
  }

  // ── RadarGame ───────────────────────────────────────────────────────────────
  if (project.id === 'radar-game') {
    return (
      <section className="project-detail">
        <ProjectHeader
          titleKey={project.titleKey}
          subtitleKey="projects.radar.subtitle"
          technologies={project.technologies}
          t={t}
        />

        <div className="grid grid-2 project-detail-body" style={{ marginBottom: '1.5rem' }}>
          <article className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.detail.overview')}</h2>
            <p className="muted">{t('projects.radar.overview_p0')}</p>
            <p className="muted">{t('projects.radar.overview_p1')}</p>

            {project.links?.github && (
              <p style={{ marginTop: '1.2rem' }}>
                <strong>{t('common.github')}:&nbsp;</strong>
                <a href={project.links.github} target="_blank" rel="noreferrer">
                  {project.links.github}
                </a>
              </p>
            )}
          </article>

          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.radar.trailer_h')}</h2>
            <p className="muted" style={{ marginBottom: '0.75rem' }}>{t('projects.radar.trailer_p')}</p>

            <video
              src={`${base}radar-game/SpaceshipTrailer.mp4`}
              controls muted playsInline
              style={{ width: '100%', borderRadius: '0.5rem' }}
            >
              {t('common.video_not_supported')}
            </video>

            <p className="muted" style={{ fontSize: '.8rem', marginTop: '.4rem' }}>
              {t('projects.detail.fullscreen_tip')}
            </p>
          </aside>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/projects" className="btn">{t('projects.back_link')}</Link>
        </div>
      </section>
    )
  }

  // ── Mission Fried Chicken ───────────────────────────────────────────────────
  if (project.id === 'mission-fried-chicken') {
    return (
      <section className="project-detail">
        <ProjectHeader
          titleKey={project.titleKey}
          subtitleKey="projects.mfc.subtitle"
          technologies={project.technologies}
          t={t}
        />

        <div className="grid grid-2 project-detail-body" style={{ marginBottom: '1.5rem' }}>
          <article className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.detail.overview')}</h2>
            <p className="muted">{t('projects.mfc.overview_p0')}</p>
            <p className="muted">{t('projects.mfc.overview_p1')}</p>

            {project.links?.github && (
              <p style={{ marginTop: '1.2rem' }}>
                <strong>{t('common.github')}:&nbsp;</strong>
                <a href={project.links.github} target="_blank" rel="noreferrer">
                  {project.links.github}
                </a>
              </p>
            )}
          </article>

          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.mfc.trailer_h')}</h2>
            <p className="muted" style={{ marginBottom: '0.75rem' }}>{t('projects.mfc.trailer_p')}</p>

            <video
              src={`${base}mfc/mfctrailer.mp4`}
              controls muted playsInline
              style={{ width: '100%', borderRadius: '0.5rem' }}
            >
              {t('common.video_not_supported')}
            </video>

            <p className="muted" style={{ fontSize: '.8rem', marginTop: '.4rem' }}>
              {t('projects.mfc.trailer_caption')}
            </p>

            <h3 style={{ marginTop: '1rem', marginBottom: '.4rem' }}>{t('projects.detail.materials')}</h3>
            <ul className="muted" style={{ paddingLeft: '1.1rem', margin: 0 }}>
              <li>
                <a href={`${base}mfc/mfc-presentation.pptx`} target="_blank" rel="noreferrer">
                  {t('projects.mfc.link_pptx')}
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/projects" className="btn">{t('projects.back_link')}</Link>
        </div>
      </section>
    )
  }

  // ── Patient Monitoring ──────────────────────────────────────────────────────
  if (project.id === 'patient-monitoring') {
    return (
      <section className="project-detail">
        <ProjectHeader
          titleKey={project.titleKey}
          subtitleKey="projects.patient.subtitle"
          technologies={project.technologies}
          t={t}
        />

        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>{t('projects.detail.overview')}</h2>
            <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.patient.overview_p')}</p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>{t('projects.patient.li0')}</li>
              <li>{t('projects.patient.li1')}</li>
              <li>{t('projects.patient.li2')}</li>
              <li>{t('projects.patient.li3')}</li>
              <li>{t('projects.patient.li4')}</li>
            </ul>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>{t('projects.patient.purpose_h')}</h2>
            <p className="muted">{t('projects.patient.purpose_p')}</p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>{t('projects.patient.purpose_li0')}</li>
              <li>{t('projects.patient.purpose_li1')}</li>
              <li>{t('projects.patient.purpose_li2')}</li>
              <li>{t('projects.patient.purpose_li3')}</li>
            </ul>
          </div>
        </div>

        <h2 className="section-title">{t('projects.detail.screenshots_diagrams')}</h2>
        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          {[
            { img: 'systemaufbau.png', alt: 'System architecture', cap: 'projects.patient.cap0' },
            { img: 'Matrix.png',       alt: 'Matrix server architecture', cap: 'projects.patient.cap1' },
            { img: 'Yolo.png',         alt: 'YOLOv5 fall detection', cap: 'projects.patient.cap2' },
            { img: 'alarm.png',        alt: 'Raspberry Pi alarm hardware', cap: 'projects.patient.cap3' },
          ].map(({ img, alt, cap }) => (
            <figure className="card" key={img}>
              <img
                src={`${base}patient-monitoring/${img}`}
                alt={alt}
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <figcaption className="muted" style={{ marginTop: '.5rem' }}>
                {t(cap)}
              </figcaption>
            </figure>
          ))}
        </div>

        <h2 className="section-title">{t('projects.detail.documentation_presentation')}</h2>

        <div className="card" style={{ height: '70vh', marginBottom: '1.25rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.detail.documentation_pdf')}</h3>
          <object data={`${base}patient-monitoring/Doku.pdf`} type="application/pdf" width="100%" height="100%">
            <p>
              {t('common.pdf_not_supported')}&nbsp;
              <a href={`${base}patient-monitoring/Doku.pdf`} target="_blank" rel="noreferrer">
                {t('common.download_here')}
              </a>.
            </p>
          </object>
        </div>

        <div className="card" style={{ height: '65vh', marginBottom: '1.5rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.detail.presentation_pdf')}</h3>
          <object data={`${base}patient-monitoring/Presentation.pdf`} type="application/pdf" width="100%" height="100%">
            <p>
              {t('common.pdf_not_supported')}&nbsp;
              <a href={`${base}patient-monitoring/Presentation.pdf`} target="_blank" rel="noreferrer">
                {t('common.download_here')}
              </a>.
            </p>
          </object>
        </div>

        <Link className="btn" to="/projects">{t('projects.back_link')}</Link>
      </section>
    )
  }

  // ── Java Testing ────────────────────────────────────────────────────────────
  if (project.id === 'java-testing') {
    return (
      <section className="project-detail">
        <ProjectHeader
          titleKey={project.titleKey}
          subtitleKey="projects.java.subtitle"
          technologies={project.technologies}
          t={t}
        />

        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>{t('projects.detail.overview')}</h2>
            <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.java.overview_p')}</p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>{t('projects.java.li0')}</li>
              <li>{t('projects.java.li1')}</li>
              <li>{t('projects.java.li2')}</li>
              <li>{t('projects.java.li3')}</li>
            </ul>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>{t('projects.detail.links_resources')}</h2>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                {t('common.github_repo')}:{' '}
                <a href="https://github.com/EmirTutar/PA_KI_Softwaretests_Java" target="_blank" rel="noreferrer">
                  github.com/EmirTutar/PA_KI_Softwaretests_Java
                </a>
              </li>
              <li>
                {t('projects.detail.documentation_pdf')}:{' '}
                <a href={`${base}java-testing/ChatGPT_Testing_Java.pdf`} target="_blank" rel="noreferrer">
                  {t('projects.java.link_doc')}
                </a>
              </li>
              <li>
                {t('projects.detail.presentation_pptx')}:{' '}
                <a href={`${base}java-testing/Testgenerierung_Java.pptx`} target="_blank" rel="noreferrer">
                  {t('projects.java.link_pres')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '.75rem' }}>{t('projects.detail.key_results')}</h2>
          <p className="muted">{t('projects.java.results_p')}</p>
        </div>

        <h2 className="section-title">{t('projects.detail.report_pdf')}</h2>
        <div className="card" style={{ height: '70vh', marginBottom: '1.5rem' }}>
          <object data={`${base}java-testing/ChatGPT_Testing_Java.pdf`} type="application/pdf" width="100%" height="100%">
            <p>
              {t('common.pdf_not_supported')}&nbsp;
              <a href={`${base}java-testing/ChatGPT_Testing_Java.pdf`} target="_blank" rel="noreferrer">
                {t('common.download_here')}
              </a>.
            </p>
          </object>
        </div>

        <Link className="btn" to="/projects">{t('projects.back_link')}</Link>
      </section>
    )
  }

  // ── Turtlebot ───────────────────────────────────────────────────────────────
  if (project.id === 'turtlebot_driving') {
    return (
      <section className="project-detail">
        <ProjectHeader
          titleKey={project.titleKey}
          subtitleKey="projects.turtlebot.subtitle"
          technologies={project.technologies}
          t={t}
        />

        <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>{t('projects.detail.overview')}</h2>
            <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.turtlebot.overview_p')}</p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>{t('projects.turtlebot.li0')}</li>
              <li>{t('projects.turtlebot.li1')}</li>
              <li>{t('projects.turtlebot.li2')}</li>
              <li>{t('projects.turtlebot.li3')}</li>
            </ul>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '.75rem' }}>{t('projects.detail.links_resources')}</h2>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>
                {t('common.github_repo')}:{' '}
                <a href="https://github.com/EmirTutar/turtlebot_driving" target="_blank" rel="noreferrer">
                  github.com/EmirTutar/turtlebot_driving
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '.75rem' }}>{t('projects.turtlebot.behavior_h')}</h2>
          <p className="muted" style={{ marginBottom: '.75rem' }}>{t('projects.turtlebot.behavior_p')}</p>
          <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
            <li><strong>Goal Precision:</strong> {t('projects.turtlebot.bli0')}</li>
            <li><strong>Blocked Goals:</strong> {t('projects.turtlebot.bli1')}</li>
            <li><strong>Deadlocks:</strong> {t('projects.turtlebot.bli2')}</li>
            <li><strong>Future Work:</strong> {t('projects.turtlebot.bli3')}</li>
          </ul>
        </div>

        <h2 className="section-title">{t('projects.turtlebot.hardware_h')}</h2>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <figure>
            <img
              src={`${base}turtlebot/turtlebot.png`}
              alt="Turtlebot with LiDAR, Raspberry Pi and DYNAMIXEL wheels"
              style={{ width: '100%', borderRadius: '0.5rem' }}
            />
            <figcaption className="muted" style={{ marginTop: '.5rem' }}>
              {t('projects.turtlebot.caption')}
            </figcaption>
          </figure>
        </div>

        <Link className="btn" to="/projects">{t('projects.back_link')}</Link>
      </section>
    )
  }

  // ── System Security ─────────────────────────────────────────────────────────
  if (project.id === 'systemsicherheit-labs') {
    return (
      <section className="project-detail">
        <ProjectHeader
          titleKey={project.titleKey}
          subtitleKey="projects.sicherheit.subtitle"
          technologies={project.technologies}
          t={t}
        />

        <div className="grid grid-2 project-detail-body">
          <article className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.sicherheit.overview_h')}</h2>
            <p className="muted">{t('projects.sicherheit.overview_p')}</p>

            <h3 style={{ marginTop: '1.2rem' }}>{t('projects.sicherheit.lab_h')}</h3>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li><strong>Grundlagen &amp; Reconnaissance:</strong> {t('projects.sicherheit.li_recon')}</li>
              <li><strong>Netzwerksicherheit:</strong> {t('projects.sicherheit.li_network')}</li>
              <li><strong>Web Application Security:</strong> {t('projects.sicherheit.li_web')}</li>
              <li><strong>Exploitation &amp; Hardening:</strong> {t('projects.sicherheit.li_exploit')}</li>
            </ul>

            <p className="muted" style={{ marginTop: '1rem' }}>{t('projects.sicherheit.lab_note')}</p>
          </article>

          <aside className="card">
            <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.sicherheit.role_h')}</h2>
            <p className="muted">{t('projects.sicherheit.role_p')}</p>
            <ul className="muted" style={{ paddingLeft: '1.1rem' }}>
              <li>{t('projects.sicherheit.role_li0')}</li>
              <li>{t('projects.sicherheit.role_li1')}</li>
              <li>{t('projects.sicherheit.role_li2')}</li>
            </ul>
          </aside>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/projects" className="btn">{t('projects.back_link')}</Link>
        </div>
      </section>
    )
  }

  // ── Generic fallback ────────────────────────────────────────────────────────
  const categoryLabel = () => {
    if (project.category === 'work')    return t('projects.category_work')
    if (project.category === 'study')   return t('projects.category_study')
    if (project.category === 'private') return t('projects.category_private')
    return ''
  }

  return (
    <section className="project-detail">
      <header className="project-detail-header card">
        <div>
          <h1 className="section-title">{t(project.titleKey)}</h1>
          <p className="muted">{categoryLabel()}</p>
        </div>
        <div className="project-detail-tags">
          {project.technologies?.map(tech => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
      </header>

      <article className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '.5rem' }}>{t('projects.detail.short_description')}</h2>
        <p className="muted">{t(project.descriptionKey)}</p>

        {project.links?.github && (
          <p style={{ marginTop: '1.2rem' }}>
            <strong>{t('common.github')}:&nbsp;</strong>
            <a href={project.links.github} target="_blank" rel="noreferrer">
              {project.links.github}
            </a>
          </p>
        )}
      </article>

      <div style={{ marginTop: '1.5rem' }}>
        <Link to="/projects" className="btn">{t('projects.back_link')}</Link>
      </div>
    </section>
  )
}
