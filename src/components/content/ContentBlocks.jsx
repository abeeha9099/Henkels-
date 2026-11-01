import { Phone } from 'lucide-react'
import { firm } from '../../data/site'
import { formatPhone } from '../../content/content'
import Accordion from '../ui/Accordion'
import Button from '../ui/Button'
import MapEmbed from '../ui/MapEmbed'
import Reveal from '../ui/Reveal'
import Stars from '../ui/Stars'
import Prose from './Prose'

/** The "Free Case Evaluations / Call Us" button pair that appears between sections. */
export function CtaBar({ phone }) {
  const callUs = phone || firm.phone.href.replace('tel:', '')
  return (
    <div className="flex flex-col gap-5 rounded-[1.75rem] bg-tan-pale p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <p className="font-display text-2xl text-ink">{firm.name}</p>
        <p className="mt-1 text-sm">
          {firm.address.street}, {firm.address.city}, {firm.address.region}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button to="/contact" variant="dark" arrow>
          Free Case Evaluations
        </Button>
        <Button href={`tel:${callUs}`} variant="outlineDark">
          <Phone className="size-4 text-brand" aria-hidden="true" />
          Call Us · {formatPhone(callUs)}
        </Button>
      </div>
    </div>
  )
}

function Quotes({ title, items, columns = 2 }) {
  return (
    <section>
      {title && <h2 className="mb-8 font-display text-3xl text-ink sm:text-[2.5rem]">{title}</h2>}
      <div className={`gap-5 ${columns === 3 ? 'sm:columns-2 lg:columns-3' : 'sm:columns-2'}`}>
        {items.map((item) => (
          <figure key={`${item.name}-${item.text.slice(0, 20)}`} className="mb-5 break-inside-avoid rounded-[1.75rem] border border-ink/10 bg-white p-7">
            <Stars className="size-3.5" />
            <blockquote className="mt-4 text-[0.9375rem] leading-relaxed whitespace-pre-line text-charcoal">
              <p>{item.text}</p>
            </blockquote>
            {item.name && <figcaption className="mt-5 font-label text-sm font-bold text-ink">{item.name}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  )
}

/** Renders the content blocks produced by scripts/import-wordpress.mjs. */
export default function ContentBlocks({ blocks, phone }) {
  return (
    <div className="space-y-12">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`
        switch (block.type) {
          case 'html':
            return <Prose key={key} html={block.html} />
          case 'cta':
            return (
              <Reveal key={key}>
                <CtaBar phone={block.phone || phone} />
              </Reveal>
            )
          case 'faq':
            return (
              <section key={key} aria-label={block.title}>
                <h2 className="mb-6 font-display text-3xl text-ink sm:text-[2.5rem]">{block.title}</h2>
                <Accordion items={block.items} html />
              </section>
            )
          case 'reviews':
            return <Quotes key={key} title={block.title} items={block.items} />
          case 'testimonials':
            return <Quotes key={key} items={block.items} columns={3} />
          case 'map':
            return (
              <section key={key} aria-label="Office location">
                <MapEmbed className="h-80 sm:h-96" />
                <p className="mt-4 text-sm">
                  <a href={firm.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-brand hover:text-brand-dark">
                    {firm.name}, {firm.address.street}, {firm.address.city}, {firm.address.region} {firm.address.postalCode}
                  </a>
                </p>
              </section>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
