import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/content/PageHero'
import Reveal from '../components/ui/Reveal'
import { Container } from '../components/ui/Section'
import { bySlug, formatDate, posts } from '../content/content'
import { firm } from '../data/site'

const categories = ['All', ...new Set(posts.map((p) => p.category).filter((c) => c && c !== 'Uncategorized'))]

export default function Blog() {
  const [category, setCategory] = useState('All')
  const [hovered, setHovered] = useState(null)
  const list = category === 'All' ? posts : posts.filter((p) => p.category === category)
  const [featured, ...rest] = list
  const blog = bySlug.blog

  return (
    <>
      <Seo title={`${blog.menuTitle} - ${firm.name}`} description={blog.excerpt || `Articles from ${firm.name}.`} path="/blog" />
      <PageHero eyebrow="Blog" title={blog.title} breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} actions={false}>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter posts by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                category === c ? 'bg-tan text-ink' : 'border border-white/20 text-white/80 hover:border-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </PageHero>

      <Container className="py-16 sm:py-20 lg:py-24">
        {featured && (
          <Reveal>
            <Link to={`/${featured.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="overflow-hidden rounded-[2rem] bg-mist lg:col-span-7">
                <img src={featured.image} alt="" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="lg:col-span-5">
                <p className="font-label text-xs font-bold tracking-[0.14em] text-taupe uppercase">
                  Latest · <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                </p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-ink group-hover:text-brand sm:text-5xl">{featured.title}</h2>
                <p className="mt-5 line-clamp-4">{featured.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-medium text-brand">
                  Read article
                  <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Editorial index: title, category, date */}
        <div className="relative mt-20 lg:mt-28">
          <div className="hidden grid-cols-12 gap-6 border-b border-ink/10 pb-4 font-label text-xs font-bold tracking-[0.14em] text-taupe uppercase md:grid">
            <span className="col-span-7">Title</span>
            <span className="col-span-2">Category</span>
            <span className="col-span-2">Date</span>
          </div>
          <ul onMouseLeave={() => setHovered(null)}>
            {rest.map((post) => (
              <li key={post.slug} onMouseEnter={() => setHovered(post)} className="border-b border-ink/10">
                <Link to={`/${post.slug}`} className="group grid gap-2 py-6 md:grid-cols-12 md:items-center md:gap-6 md:py-7">
                  <span className="font-display text-2xl leading-snug text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand md:col-span-7 sm:text-[1.75rem]">
                    {post.title}
                  </span>
                  <span className="md:col-span-2">
                    {post.category && post.category !== 'Uncategorized' && (
                      <span className="inline-block rounded-full border border-ink/15 px-3 py-1 font-label text-[0.6875rem] font-bold tracking-[0.1em] text-ink uppercase">
                        {post.category}
                      </span>
                    )}
                  </span>
                  <time dateTime={post.date} className="font-label text-sm font-bold tracking-wide text-ink uppercase md:col-span-2">
                    {formatDate(post.date)}
                  </time>
                  <span className="hidden justify-end md:col-span-1 md:flex">
                    <span className="grid size-11 place-items-center rounded-full border border-ink/15 transition-all group-hover:rotate-45 group-hover:border-tan group-hover:bg-tan">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Floating preview of the hovered post (desktop) */}
          <AnimatePresence>
            {hovered?.image && (
              <motion.img
                key={hovered.slug}
                src={hovered.image}
                alt=""
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute top-0 right-[10%] hidden aspect-[4/3] w-72 rounded-2xl object-cover shadow-lift xl:block"
              />
            )}
          </AnimatePresence>
        </div>
      </Container>
    </>
  )
}
