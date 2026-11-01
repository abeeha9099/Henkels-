import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/content/PageHero'
import ContentBlocks from '../components/content/ContentBlocks'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import Stars from '../components/ui/Stars'
import { Container } from '../components/ui/Section'
import { bySlug, useContent } from '../content/content'
import { firm } from '../data/site'
import { LoadError, LoadingBody } from './PageStates'

export default function Testimonials() {
  const entry = bySlug.testimonials
  const { doc, loading, error } = useContent('testimonials')

  return (
    <>
      <Seo title={`${entry.title} - ${firm.name}`} description={entry.excerpt} path="/testimonials" />
      <PageHero eyebrow="Client reviews" title={entry.title} phone={doc?.heroPhone} breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Testimonials' }]}>
        <Link to="/reviews" className="mt-10 inline-flex items-center gap-4 rounded-full border border-white/15 py-2 pr-5 pl-3 text-sm text-white/80 hover:border-white/40">
          <Stars />
          <span>
            <strong className="font-semibold text-white">{firm.reviews.rating}</strong> · Based on {firm.reviews.count} reviews on Google
          </span>
        </Link>
      </PageHero>

      <Container className="py-16 sm:py-24">
        {loading && <LoadingBody />}
        {error && <LoadError slug="testimonials" />}
        {doc && (
          <Reveal>
            <ContentBlocks blocks={doc.blocks} phone={doc.heroPhone} />
          </Reveal>
        )}
        <div className="mt-12">
          <Button to="/reviews" variant="dark" arrow>
            Read our Google reviews
          </Button>
        </div>
      </Container>
    </>
  )
}
