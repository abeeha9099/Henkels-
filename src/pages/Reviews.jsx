import Seo from '../components/Seo'
import PageHero from '../components/content/PageHero'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import Stars from '../components/ui/Stars'
import { Container } from '../components/ui/Section'
import { bySlug, formatDate, useContent } from '../content/content'
import { reviews as homeReviews } from '../data/home'
import { firm } from '../data/site'
import { LoadError, LoadingBody } from './PageStates'

export default function Reviews() {
  const entry = bySlug.reviews
  const { doc, loading, error } = useContent('reviews')
  const google = doc?.googleReviews
  // The plugin's summary reads "Henkels & Baker PC4.9 Stars - Based on 202 User Reviews".
  const summary = google?.summary.match(/([\d.]+) Stars\s*-\s*(.+)$/)
  const heading = doc?.blocks.find((b) => b.type === 'html' && /<h2>/.test(b.html))?.html.match(/<h2>(.*?)<\/h2>/)?.[1]

  return (
    <>
      <Seo title={entry.title} description={entry.excerpt} path="/reviews" />
      <PageHero eyebrow="Google reviews" title={entry.title} phone={doc?.heroPhone} breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Reviews' }]} />

      <Container className="py-16 sm:py-24">
        {loading && <LoadingBody />}
        {error && <LoadError slug="reviews" />}
        {google && (
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                {summary && (
                  <>
                    <p className="font-display text-8xl leading-none text-ink">{summary[1]}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <Stars className="size-5" />
                      <span className="text-sm">{summary[2]}</span>
                    </div>
                  </>
                )}
                <p className="mt-2 text-sm">{firm.name} · Google</p>
                <Button href={firm.mapsUrl} variant="outlineDark" arrow className="mt-8">
                  View on Google Maps
                </Button>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              {heading && <h2 className="font-display text-3xl text-ink sm:text-4xl" dangerouslySetInnerHTML={{ __html: heading }} />}
              <ul className="mt-8 space-y-5">
                {google.items.map((r) => (
                  <Reveal as="li" key={r.name} className="rounded-[1.75rem] border border-ink/10 p-7 sm:p-8">
                    <div className="flex items-center gap-4">
                      {r.avatar ? (
                        <img src={r.avatar} alt="" loading="lazy" referrerPolicy="no-referrer" className="size-12 rounded-full object-cover" />
                      ) : (
                        <span className="grid size-12 place-items-center rounded-full bg-brand-pale font-label font-bold text-brand" aria-hidden="true">
                          {r.name[0]}
                        </span>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-ink">{r.name}</p>
                        <p className="text-xs">{r.date && <time dateTime={r.date}>{formatDate(r.date)}</time>} · Posted on Google</p>
                      </div>
                      <Stars className="size-4" />
                    </div>
                    <p className="mt-5 leading-relaxed whitespace-pre-line text-charcoal">{r.text}</p>
                  </Reveal>
                ))}
              </ul>

              <h2 className="mt-20 font-display text-3xl text-ink sm:text-4xl">
                {firm.reviews.rating} · {firm.reviews.count} reviews
              </h2>
              <ul className="mt-8 gap-5 sm:columns-2">
                {homeReviews
                  .filter((r) => !google.items.some((g) => g.name === r.name))
                  .map((r) => (
                    <li key={r.name} className="mb-5 break-inside-avoid rounded-[1.75rem] bg-mist p-7">
                      <Stars className="size-3.5" />
                      <p className="mt-4 text-[0.9375rem] leading-relaxed whitespace-pre-line text-charcoal">{r.text}</p>
                      <p className="mt-4 font-label text-sm font-bold text-ink">{r.name}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
