import { Link, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { blogPosts } from '../data/blog'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} className="blog-post-h2">
          {block.text}
        </h2>
      )
    case 'p':
      return (
        <p key={i} className="blog-post-p">
          {block.text}
        </p>
      )
    case 'ul':
      return (
        <ul key={i} className="blog-post-ul">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default function BlogPost() {
  const { id } = useParams()
  const { t } = useTranslation()
  const post = blogPosts.find((p) => p.id === id)

  if (!post) return <Navigate to="/blog" replace />

  return (
    <article className="blog-post">
      <div className="blog-post-header">
        <Link to="/blog" className="btn btn--ghost" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
          ← {t('blog.back')}
        </Link>

        <div className="blog-entry-meta" style={{ marginBottom: '0.75rem' }}>
          <span>{formatDate(post.date)}</span>
          <span className="blog-dot">·</span>
          <span>{post.readTime} {t('blog.min_read')}</span>
        </div>

        <h1 className="blog-post-title">{post.title}</h1>

        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="blog-post-body card">
        {post.content.map((block, i) => renderBlock(block, i))}
      </div>
    </article>
  )
}
