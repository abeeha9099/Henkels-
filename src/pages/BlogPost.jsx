import Seo from '../components/Seo'
import PageHero from '../components/content/PageHero'
import ContentBlocks, { CtaBar } from '../components/content/ContentBlocks'
import PostCard from '../components/content/PostCard'
import Sidebar from '../components/content/Sidebar'
import { Container } from '../components/ui/Section'
import { formatDate, posts, readingTime, useContent } from '../content/content'
import { firm } from '../data/site'
import { LoadError, LoadingBody } from './PageStates'

export default function BlogPost({ entry }) {
  const { doc, loading, error } = useContent(entry.slug)
  const sameCategory = posts.filter((p) => p.slug !== entry.slug && p.category === entry.category)
  const related = (sameCategory.length >= 3 ? sameCategory : posts.filter((p) => p.slug !== entry.slug)).slice(0, 3)
  const minutes = doc ? readingTime(doc.blocks.map((b) => b.html || '').join(' ')) : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: entry.title,
    datePublished: entry.date,
    dateModified: entry.modified,
    image: entry.image || undefined,
    publisher: { '@type': 'LegalService', name: firm.name, url: firm.url },
    mainEntityOfPage: `${firm.url}/${entry.slug}/`,
  }

  return (
    <>
      <Seo title={`${entry.menuTitle} - ${firm.name}`} description={entry.excerpt} path={`/${entry.slug}`} jsonLd={[jsonLd, ...(doc?.schema || [])]} />
      <PageHero
        eyebrow={entry.category && entry.category !== 'Uncategorized' ? entry.category : 'Blog'}
        title={doc?.title || entry.title}
        image={entry.image || undefined}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: entry.menuTitle }]}
        actions={false}
        meta={
          <p className="font-label text-sm font-bold tracking-wide text-white/60 uppercase">
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            {minutes && ` · ${minutes} min read`}
          </p>
        }
      />

      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <article className="min-w-0 lg:col-span-8">
            {loading && <LoadingBody />}
            {error && <LoadError slug={entry.slug} />}
            {doc && (
              <>
                <ContentBlocks blocks={doc.blocks} />
                <div className="mt-14">
                  <CtaBar />
                </div>
              </>
            )}
          </article>
          <div className="lg:col-span-4">
            <Sidebar related={posts.filter((p) => p.slug !== entry.slug).slice(0, 5)} relatedTitle="Recent articles" moreLink={{ label: 'All articles', to: '/blog' }} />
          </div>
        </div>
      </Container>

      <section aria-labelledby="related-title" className="border-t border-ink/10 py-16 sm:py-24">
        <Container>
          <h2 id="related-title" className="font-display text-4xl text-ink sm:text-5xl">
            Keep reading
          </h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {related.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
