import { useTranslation } from 'react-i18next'
import GROUPS from '../data/technologies'
import Reveal from '../components/Reveal'

function SkillCard({ name, Icon, color, level, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="skill-card" style={{ '--skill-color': color }}>
        <div className="skill-icon">
          <Icon size={34} color={color} />
        </div>
        <div className="skill-name">{name}</div>
        <div className="skill-dots">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className={`skill-dot${i < level ? ' skill-dot--on' : ''}`}
              style={i < level ? { background: color } : {}}
            />
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export default function Technologies() {
  const { t } = useTranslation()

  return (
    <section>
      <Reveal>
        <h1 className="section-title">{t('technologies.title')}</h1>
        <p className="muted" style={{ marginBottom: '2.5rem' }}>
          {t('technologies.subtitle')}
        </p>
      </Reveal>

      {GROUPS.map((group, gi) => (
        <div key={group.key} className="skill-group">
          <Reveal delay={gi * 30}>
            <div className="skill-group-header">
              <group.GroupIcon size={16} />
              <h2 className="skill-group-title">{t(group.labelKey)}</h2>
            </div>
          </Reveal>
          <div className="skill-grid">
            {group.skills.map((skill, si) => (
              <SkillCard key={skill.name} {...skill} delay={si * 45} />
            ))}
          </div>
        </div>
      ))}

      <Reveal delay={100}>
        <div className="skill-legend">
          {[1, 2, 3, 4].map((lvl) => (
            <div key={lvl} className="skill-legend-item">
              <div className="skill-dots">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className={`skill-dot${i < lvl ? ' skill-dot--on' : ''}`} />
                ))}
              </div>
              <span className="muted" style={{ fontSize: '0.78rem' }}>
                {t(`technologies.level.${lvl}`)}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
