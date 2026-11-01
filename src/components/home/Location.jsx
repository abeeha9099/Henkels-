import { Navigation, Phone } from 'lucide-react'
import { firm } from '../../data/site'
import Button from '../ui/Button'
import MapEmbed from '../ui/MapEmbed'
import Reveal from '../ui/Reveal'
import Section, { Display, Pill } from '../ui/Section'

export default function Location() {
  const { address } = firm
  return (
    <Section labelledBy="location-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <Pill>Visit Us</Pill>
          <Display id="location-title" className="mt-6 text-ink">
            Our Office Location
          </Display>

          <address className="mt-10 font-display text-3xl leading-tight text-ink not-italic sm:text-4xl">
            {firm.name}
            <br />
            {address.street},
            <br />
            {address.city}, {address.region} {address.postalCode}
          </address>

          <div className="mt-10 grid gap-10 border-t border-ink/10 pt-8 sm:grid-cols-2">
            <div>
              <h3 className="font-label text-xs font-bold tracking-[0.16em] text-taupe uppercase">Hours</h3>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[0.9375rem]">
                {firm.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-ink">{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="font-label text-xs font-bold tracking-[0.16em] text-taupe uppercase">Contact Us</h3>
              <a href={firm.phone.href} className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink hover:text-brand">
                <Phone className="size-4 text-brand" aria-hidden="true" />
                Phone: {firm.phone.display}
              </a>
            </div>
          </div>

          <Button href={firm.mapsUrl} variant="dark" arrow className="mt-10">
            <Navigation className="size-4" aria-hidden="true" />
            Get directions
            <span className="sr-only">(opens Google Maps in a new tab)</span>
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <MapEmbed className="h-96 sm:h-[32rem] lg:h-full lg:min-h-[36rem]" />
        </Reveal>
      </div>
    </Section>
  )
}
