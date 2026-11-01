import { Clock, CreditCard, MapPin, Navigation, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/content/PageHero'
import Button from '../components/ui/Button'
import MapEmbed from '../components/ui/MapEmbed'
import Reveal from '../components/ui/Reveal'
import { Container } from '../components/ui/Section'
import { bySlug } from '../content/content'
import { firm } from '../data/site'

// The live Contact page lists its own number.
const CONTACT_PHONE = { display: '(563) 217-1923', href: 'tel:5632171923' }

function Card({ icon: Icon, title, children, className = '' }) {
  return (
    <div className={`rounded-[1.75rem] p-7 sm:p-8 ${className}`}>
      <span className="grid size-11 place-items-center rounded-full bg-tan text-ink">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-6 font-label text-xs font-bold tracking-[0.16em] uppercase">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export default function Contact() {
  const entry = bySlug.contact
  const { address } = firm
  return (
    <>
      <Seo title={`${entry.menuTitle} - ${firm.name}`} description={`Contact ${firm.name}: ${address.street}, ${address.city}, ${address.region} ${address.postalCode}. Phone ${CONTACT_PHONE.display}.`} path="/contact" />
      <PageHero
        eyebrow={`${address.city}, ${address.region}`}
        title={entry.title}
        tagline="Free Case Evaluations"
        phone={CONTACT_PHONE.href.replace('tel:', '')}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        actions={false}
      >
        <a href={CONTACT_PHONE.href} className="mt-10 inline-flex items-center gap-4 font-display text-4xl text-white hover:text-tan sm:text-6xl">
          <Phone className="size-8 text-tan sm:size-10" aria-hidden="true" />
          {CONTACT_PHONE.display}
        </a>
      </PageHero>

      <Container className="py-16 sm:py-24">
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <Card icon={Phone} title="Contact Us" className="h-full bg-ink text-white">
              <a href={CONTACT_PHONE.href} className="font-display text-3xl hover:text-tan">
                Phone: {CONTACT_PHONE.display}
              </a>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card icon={Clock} title="Hours" className="h-full bg-tan-pale text-ink">
              <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5">
                {firm.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-ink">{h.days}</dt>
                    <dd className="text-cocoa">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>
          <Reveal delay={0.16}>
            <Card icon={MapPin} title="Visit Us" className="h-full bg-mist text-ink">
              <address className="font-display text-2xl leading-snug not-italic">
                {firm.name}
                <br />
                {address.street},
                <br />
                {address.city}, {address.region} {address.postalCode}
              </address>
            </Card>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <MapEmbed className="h-96 sm:h-[30rem]" />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5 lg:col-span-4">
            <Button href={firm.mapsUrl} variant="dark" arrow className="justify-between">
              <Navigation className="size-4" aria-hidden="true" />
              Get directions
            </Button>
            <div className="flex-1 rounded-[1.75rem] border border-ink/10 p-7">
              <CreditCard className="size-6 text-brand" aria-hidden="true" />
              <h2 className="mt-4 font-display text-2xl text-ink">Make a Payment</h2>
              <Button href={firm.paymentUrl} variant="accent" arrow className="mt-6">
                Make a Payment
              </Button>
              <p className="mt-6 text-sm">
                Bankruptcy clients: read{' '}
                <Link to="/pay-toward-bankruptcy" className="font-medium text-brand underline decoration-brand/30 underline-offset-4">
                  Pay Toward Bankruptcy
                </Link>{' '}
                before paying.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  )
}
