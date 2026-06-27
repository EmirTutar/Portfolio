import { useTranslation } from 'react-i18next'
import { impossibleList } from '../data/impossibleList'
import { FiCheck } from 'react-icons/fi'

export default function ImpossibleList() {
  const { t } = useTranslation()

  const allItems = impossibleList.flatMap((cat) => cat.items)
  const doneCount = allItems.filter((i) => i.done).length
  const totalCount = allItems.length
  const pct = Math.round((doneCount / totalCount) * 100)

  return (
    <section>
      <div style={{ padding: '2.5rem 0 0.5rem' }}>
        <h1 className="section-title">{t('impossible.title')}</h1>
        <p className="muted" style={{ maxWidth: 600, lineHeight: 1.7, marginTop: '0.5rem' }}>
          {t('impossible.subtitle')}
        </p>

        <div className="impossible-progress card" style={{ marginTop: '1.75rem' }}>
          <div className="impossible-progress-header">
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t('impossible.progress')}</span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.85rem', color: 'var(--primary)' }}>
              {doneCount} / {totalCount}
            </span>
          </div>
          <div className="impossible-bar-track">
            <div
              className="impossible-bar-fill"
              style={{ width: `${pct}%` }}
              title={`${pct}%`}
            />
          </div>
          <span className="muted" style={{ fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>
            {pct}% {t('impossible.complete')}
          </span>
        </div>
      </div>

      <div className="impossible-categories">
        {impossibleList.map((cat) => (
          <div key={cat.category} className="impossible-category">
            <h2 className="impossible-cat-title">{cat.category}</h2>
            <div className="impossible-items">
              {cat.items.map((item, i) => (
                <div
                  key={i}
                  className={`impossible-item${item.done ? ' impossible-item--done' : ''}`}
                >
                  <span className={`impossible-checkbox${item.done ? ' impossible-checkbox--done' : ''}`}>
                    {item.done && <FiCheck size={12} strokeWidth={3} />}
                  </span>
                  <span className="impossible-item-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
