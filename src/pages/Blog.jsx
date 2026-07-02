import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi'
import { blogPosts } from '../data/blog'
import { formatDate } from '../utils/formatDate'
import Reveal from '../components/Reveal'

export default function Blog() {
  const { t } = useTranslation()
  const [featured, ...rest] = blogPosts

  return (
    <section className="blog-page">
      <Reveal>
        <div className="blog-page-header">
          <h1 className="section-title">{t('blog.title')}</h1>
          <p className="muted" style={{ maxWidth: 520 }}>
            {t('blog.subtitle')}
          </p>
        </div>
      </Reveal>

      {/* Featured post */}
      <Reveal delay={80}>
        <Link to={`/blog/${featured.id}`} className="blog-featured card">
          <div className="blog-featured-badge">Latest</div>
          <div className="blog-featured-meta">
            <span><FiCalendar size={11} /> {formatDate(featured.date)}</span>
            <span className="blog-dot">·</span>
            <span><FiClock size={11} /> {featured.readTime} {t('blog.min_read')}</span>
          </div>
          <h2 className="blog-featured-title">{featured.title}</h2>
          <p className="blog-featured-excerpt">{featured.excerpt}</p>
          <div className="blog-featured-footer">
            <div className="blog-tag-row">
              {featured.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <span className="blog-read-more-text">
              {t('blog.read_more')} <FiArrowRight size={12} />
            </span>
          </div>
        </Link>
      </Reveal>

      {/* Rest of posts */}
      <div className="blog-list">
        {rest.map((post, i) => (
          <Reveal key={post.id} delay={i * 60}>
            <article className="blog-entry card">
              <div className="blog-entry-meta">
                <span><FiCalendar size={11} /> {formatDate(post.date)}</span>
                <span className="blog-dot">·</span>
                <span><FiClock size={11} /> {post.readTime} {t('blog.min_read')}</span>
              </div>

              <h2 className="blog-entry-title">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h2>

              <p className="blog-entry-excerpt">{post.excerpt}</p>

              <div className="blog-entry-footer">
                <div className="blog-tag-row">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/blog/${post.id}`} className="btn btn--ghost blog-read-more">
                  {t('blog.read_more')} →
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
