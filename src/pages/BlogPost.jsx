import { Link, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiClock, FiCalendar, FiArrowLeft } from 'react-icons/fi'
import { blogPosts } from '../data/blog'
import { formatDate } from '../utils/formatDate'

function renderBlock(block, i) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i} className="blog-post-h2">{block.text}</h2>

    case 'p':
      return <p key={i} className="blog-post-p">{block.text}</p>

    case 'ul':
      return (
        <ul key={i} className="blog-post-ul">
          {block.items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      )

    case 'callout':
      return (
        <div key={i} className="blog-callout">
          <span className="blog-callout-icon">💡</span>
          <p>{block.text}</p>
        </div>
      )

    case 'code':
      return (
        <pre key={i} className="blog-code">
          <code>{block.text}</code>
        </pre>
      )

    case 'image':
      return (
        <figure key={i} className="blog-figure">
          <img src={block.src} alt={block.alt || ''} className="blog-img" loading="lazy" />
          {block.caption && <figcaption className="blog-caption">{block.caption}</figcaption>}
        </figure>
      )

    default:
      return null
  }
}

export default function BlogPost() {
  const { id } = useParams()
  const { t } = useTranslation()
  const post = blogPosts.find((p) => p.id === id)
  const postIndex = blogPosts.findIndex((p) => p.id === id)

  if (!post) return <Navigate to="/blog" replace />

  const prevPost = blogPosts[postIndex + 1] ?? null
  const nextPost = blogPosts[postIndex - 1] ?? null

  return (
    <article className="blog-post">

      {/* Back link */}
      <Link to="/blog" className="blog-back-link">
        <FiArrowLeft size={14} /> {t('blog.back')}
      </Link>

      {/* Header */}
      <div className="blog-post-header">
        <div className="blog-post-meta-row">
          <span className="blog-post-meta-item">
            <FiCalendar size={12} /> {formatDate(post.date)}
          </span>
          <span className="blog-meta-sep">·</span>
          <span className="blog-post-meta-item">
            <FiClock size={12} /> {post.readTime} {t('blog.min_read')}
          </span>
        </div>

        <h1 className="blog-post-title">{post.title}</h1>

        <div className="blog-post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="blog-post-body card">
        {post.content.map((block, i) => renderBlock(block, i))}
      </div>

      {/* Prev / Next navigation */}
      {(prevPost || nextPost) && (
        <nav className="blog-post-nav">
          {prevPost ? (
            <Link to={`/blog/${prevPost.id}`} className="blog-nav-link blog-nav-link--prev">
              <span className="blog-nav-dir">← Older</span>
              <span className="blog-nav-title">{prevPost.title}</span>
            </Link>
          ) : <span />}
          {nextPost ? (
            <Link to={`/blog/${nextPost.id}`} className="blog-nav-link blog-nav-link--next">
              <span className="blog-nav-dir">Newer →</span>
              <span className="blog-nav-title">{nextPost.title}</span>
            </Link>
          ) : <span />}
        </nav>
      )}

    </article>
  )
}
