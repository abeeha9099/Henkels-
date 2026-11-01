import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { formatDate } from '../../content/content'

/** Blog post teaser used for related posts. */
export default function PostCard({ post }) {
  return (
    <Link to={`/${post.slug}`} className="group flex h-full flex-col">
      <div className="overflow-hidden rounded-[1.5rem] bg-mist">
        {post.image && (
          <img src={post.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
      </div>
      <p className="mt-5 flex items-center gap-3 font-label text-xs font-bold tracking-[0.12em] text-taupe uppercase">
        {post.category && post.category !== 'Uncategorized' && <span className="text-brand">{post.category}</span>}
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h3 className="mt-2 flex items-start justify-between gap-4 font-display text-2xl leading-snug text-ink group-hover:text-brand">
        {post.title}
        <ArrowUpRight className="mt-1 size-5 shrink-0 transition-transform group-hover:rotate-45" aria-hidden="true" />
      </h3>
    </Link>
  )
}
