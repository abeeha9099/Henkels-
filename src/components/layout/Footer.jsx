import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { firm, footerLinks, practiceAreas } from '../../data/site'
import Button from '../ui/Button'
import { Container } from '../ui/Section'

const year = new Date().getFullYear()

function FooterHeading({ children }) {
  return <h2 className="mb-5 font-label text-xs font-bold tracking-[0.16em] text-tan uppercase">{children}</h2>
}

function FooterLink({ item, strong = false }) {
  const className = `inline-flex items-center gap-1.5 py-1 text-sm transition-colors hover:text-white ${
    strong ? 'font-medium text-white' : 'text-white/60'
  }`
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
        <ExternalLink className="size-3.5 opacity-60" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    )
  }
  return (
    <Link to={item.to} className={className}>
      {item.label}
    </Link>
  )
}

export default function Footer() {
  const { address } = firm
  return (
    <footer className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-ink text-white sm:rounded-[2.5rem]">
        <div className="pointer-events-none absolute -top-48 -left-32 -z-10 size-[36rem] rounded-full bg-brand/25 blur-[120px]" aria-hidden="true" />

        <Container className="pt-20 sm:pt-28">
          <div className="grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-12 lg:items-end">
            <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:col-span-7">
              Your journey to a brighter future begins with a <span className="text-tan">simple call.</span>
            </h2>
            <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9">
              <a href={firm.phone.href} className="group inline-flex items-center gap-3 font-display text-4xl hover:text-tan sm:text-5xl">
                {firm.phone.display}
                <ArrowUpRight className="size-7 transition-transform group-hover:rotate-45" aria-hidden="true" />
              </a>
              <Button to="/contact" arrow>
                Free Case Evaluations
              </Button>
            </div>
          </div>

          <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
            <nav aria-label="Practice areas" className="sm:col-span-2 lg:col-span-5">
              <FooterHeading>Practice Areas</FooterHeading>
              <div className="grid gap-8 sm:grid-cols-2">
                {practiceAreas.map((group) => (
                  <ul key={group.to}>
                    <li>
                      <FooterLink item={group} strong />
                    </li>
                    {group.children.map((child) => (
                      <li key={child.to}>
                        <FooterLink item={child} />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </nav>

            <nav aria-label="Firm" className="lg:col-span-2 lg:col-start-7">
              <FooterHeading>Firm</FooterHeading>
              <ul>
                {footerLinks.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-3 lg:col-start-10">
              <FooterHeading>Visit Us</FooterHeading>
              <address className="not-italic">
                <a href={firm.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm leading-relaxed text-white/60 hover:text-white">
                  {firm.name}
                  <br />
                  {address.street},
                  <br />
                  {address.city}, {address.region} {address.postalCode}
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </a>
              </address>
              <h2 className="mt-8 mb-3 font-label text-xs font-bold tracking-[0.16em] text-tan uppercase">Hours</h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                {firm.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-white">{h.days}</dt>
                    <dd className="text-white/60">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>

        <p
          className="pointer-events-none text-center font-display text-[12.5vw] leading-[0.85] tracking-[-0.04em] whitespace-nowrap text-white/[0.06] select-none"
          aria-hidden="true"
        >
          Henkels & Baker
        </p>

        <div className="border-t border-white/10">
          <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 lg:flex-row lg:items-center lg:justify-between">
            <p>
              © {year} | {firm.name} | All rights reserved
            </p>
            <p>The content on this website is owned by us and our licensors. Do not copy any content (including images) without our consent.</p>
          </Container>
        </div>
      </div>
    </footer>
  )
}
