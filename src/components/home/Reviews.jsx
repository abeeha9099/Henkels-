import { useState } from 'react'
import { firm } from '../../data/site'
import { reviews } from '../../data/home'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import Section, { Pill } from '../ui/Section'
import Stars from '../ui/Stars'

const LONG_REVIEW = 240

function ReviewItem({ review }) {
  const [expanded, setExpanded] = useState(false)
  const long = review.text.length > LONG_REVIEW
  return (
    <figure className="break-inside-avoid border-t border-ink/10 py-8">
      <Stars className="size-3.5" />
      <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal">
        <p className={`whitespace-pre-line ${long && !expanded ? 'line-clamp-5' : ''}`}>{review.text}</p>
      </blockquote>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 text-sm font-medium text-brand hover:text-brand-dark"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
      <figcaption className="mt-5 flex items-baseline justify-between gap-4">
        <span className="font-label text-sm font-bold text-ink">{review.name}</span>
        <span className="text-xs text-body">Posted on Google</span>
      </figcaption>
    </figure>
  )
}

export default function Reviews() {
  // The last review on the original widget is the most personal one; it leads here as the featured quote.
  const featured = reviews[reviews.length - 1]
  const rest = reviews.slice(0, -1)

  return (
    <Section id="reviews" labelledBy="reviews-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Pill>Client reviews</Pill>
            <h2 id="reviews-title" className="mt-6 font-display text-7xl leading-none tracking-[-0.03em] text-ink sm:text-8xl">
              {firm.reviews.rating}
            </h2>
            <div className="mt-5 flex items-center gap-3">
              <Stars className="size-5" />
              <span className="text-sm text-body">Based on {firm.reviews.count} reviews</span>
            </div>
            <p className="mt-2 text-sm text-body">Posted on {firm.reviews.source}</p>
            <Button to="/testimonials" variant="outlineDark" arrow className="mt-10">
              Read more testimonials
            </Button>
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal as="figure" className="relative rounded-[2rem] bg-brand-pale p-8 sm:p-12">
            <span className="absolute -top-6 right-8 font-display text-[9rem] leading-none text-tan select-none" aria-hidden="true">
              “
            </span>
            <blockquote className="relative font-display text-2xl leading-snug text-ink sm:text-[2rem]">
              <p>{featured.text}</p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <Stars />
              <span className="font-label text-sm font-bold text-ink">{featured.name}</span>
              <span className="text-xs text-body">Posted on Google</span>
            </figcaption>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 gap-10 sm:columns-2">
            {rest.map((review) => (
              <ReviewItem key={review.name} review={review} />
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
