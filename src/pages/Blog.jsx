import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { blogPosts } from '../data/blog'
import { formatDate } from '../utils/formatDate'

export default function Blog() {
  const { t } = useTranslation()

  return (
    <section>
      <div style={{ padding: '2.5rem 0 1.5rem' }}>
        <h1 className="section-title">{t('blog.title')}</h1>
        <p className="muted" style={{ maxWidth: 560 }}>
          {t('blog.subtitle')}
        </p>
      </div>

      <div className="blog-list">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-entry card">
            <div className="blog-entry-meta">
              <span>{formatDate(post.date)}</span>
              <span className="blog-dot">·</span>
              <span>{post.readTime} {t('blog.min_read')}</span>
            </div>

            <h2 className="blog-entry-title">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>

            <p className="blog-entry-excerpt">{post.excerpt}</p>

            <div className="blog-entry-footer">
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link to={`/blog/${post.id}`} className="btn btn--primary blog-read-more">
                {t('blog.read_more')} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
