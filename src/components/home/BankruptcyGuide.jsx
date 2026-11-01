import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { firm } from '../../data/site'
import { assistance, howWeHelp, whyChoose } from '../../data/home'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import Section, { Pill } from '../ui/Section'

const toc = [
  { id: 'why-choose', label: `Why Choose ${firm.name}` },
  { id: 'how-we-help', label: 'How a Dubuque Bankruptcy Attorney Can Help' },
  { id: 'seek-assistance', label: `Seek Assistance from ${firm.name} Today!` },
]

const inlineLink = 'font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand'

function NumberedList({ items }) {
  return (
    <ol className="mt-8 border-b border-ink/10">
      {items.map((item, i) => (
        <li key={item} className="flex gap-6 border-t border-ink/10 py-5">
          <span className="w-8 shrink-0 font-label text-sm font-bold text-tan">{String(i + 1).padStart(2, '0')}</span>
          <span className="text-charcoal">{item}</span>
        </li>
      ))}
    </ol>
  )
}

export default function BankruptcyGuide() {
  return (
    <Section labelledBy="guide-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Pill>Bankruptcy in Iowa</Pill>
              <h2
                id="guide-title"
                className="mt-6 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.5rem]"
              >
                {firm.name} — Bankruptcy Attorneys in Dubuque, IA
              </h2>
            </Reveal>
            <nav aria-label="On this page" className="mt-10 hidden lg:block">
              <ol className="border-l border-ink/10">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px flex gap-4 border-l border-transparent py-2.5 pl-5 text-sm text-body transition-colors hover:border-brand hover:text-ink"
                    >
                      <span className="font-label font-bold text-tan">{String(i + 1).padStart(2, '0')}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal className="space-y-6 text-lg leading-relaxed">
            <p className="text-xl text-ink">
              Are you overwhelmed by debt and considering bankruptcy? At {firm.name}, our{' '}
              <Link to="/chapter-7-attorney-dubuque" className={inlineLink}>
                bankruptcy attorneys in Dubuque, IA
              </Link>{' '}
              have more than 50 years of experience helping individuals and families regain financial control. We’ve
              helped thousands of clients protect their property, eliminate debt, and move toward a fresh start with
              confidence.
            </p>
            <p>
              Founded in 1973, our firm is deeply rooted in the Dubuque community. When you step into our welcoming
              office, you’ll immediately notice that we’re different from most law firms. Our team is small, our
              approach is personal, and every client is treated as an individual, not a case number.
            </p>
          </Reveal>

          <Reveal className="my-12">
            <img
              src="/images/office.webp"
              alt="A hand stopping a row of falling dominoes"
              width="1600"
              height="900"
              loading="lazy"
              className="aspect-[16/10] w-full rounded-[2rem] object-cover"
            />
          </Reveal>

          <Reveal>
            <p className="text-lg leading-relaxed">
              Bankruptcy provides legal protection against creditor actions such as foreclosures, garnishments, and
              collection calls. It also gives you the space to rebuild your financial life. Whether you need guidance
              with Chapter 7 or Chapter 13 bankruptcy, we’re here to help you understand your options and find the
              right path forward.
            </p>
          </Reveal>

          {/* Mobile jump links (desktop uses the sticky list beside the article) */}
          <nav aria-label="On this page" className="mt-10 lg:hidden">
            <ul className="flex flex-col gap-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm font-medium text-brand">
                    {item.label} →
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Reveal as="article" id="why-choose" className="mt-20 scroll-mt-28">
            <h3 className="font-display text-3xl text-ink sm:text-4xl">{toc[0].label}</h3>
            <p className="mt-5">
              If you are facing legal challenges in Iowa, you don’t have to navigate them alone. Reach out to{' '}
              {firm.name}, today and experience the difference that compassionate, experienced legal professionals can
              make in your life.
            </p>
            <div className="mt-10 border-b border-ink/10">
              {whyChoose.map((item, i) => (
                <div key={item.title} className="grid gap-3 border-t border-ink/10 py-8 sm:grid-cols-[4rem_1fr]">
                  <span className="font-display text-4xl leading-none text-tan">{['I', 'II', 'III'][i]}</span>
                  <div>
                    <h4 className="font-display text-2xl text-ink">{item.title}</h4>
                    <p className="mt-3">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <blockquote className="mt-10 border-l-2 border-tan pl-6 font-display text-2xl leading-snug text-ink">
              In the legal world, where experience and empathy often walk separate paths, {firm.name}, bridges the gap.
              We are your friendly attorneys who care deeply about your well-being, rights, and future.
            </blockquote>
          </Reveal>

          <Reveal as="article" id="how-we-help" className="mt-20 scroll-mt-28">
            <h3 className="font-display text-3xl text-ink sm:text-4xl">{toc[1].label}</h3>
            <p className="mt-5">
              IA lawyers for bankruptcy can assist clients by accomplishing the following tasks both within and outside
              courts:
            </p>
            <NumberedList items={howWeHelp} />
          </Reveal>

          <Reveal as="article" id="seek-assistance" className="mt-20 scroll-mt-28 rounded-[2rem] bg-ink p-8 text-white/75 sm:p-12">
            <h3 className="font-display text-3xl text-white sm:text-4xl">{toc[2].label}</h3>
            <p className="mt-5">
              Do you feel like you are sinking under a never-ending sea of debt and the pressure of mounting financial
              uncertainty? We understand the pain and stress you are experiencing and are here to lend a compassionate
              hand. Numerous people like you have received assistance from {firm.name}, in regaining financial
              security.
            </p>
            <p className="mt-5">Our bankruptcy attorneys in Dubuque, IA, can help in the following ways:</p>
            <ol className="mt-6 space-y-3">
              {assistance.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="w-6 shrink-0 font-label text-sm font-bold text-tan">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8">
              Don’t allow your life to be defined by your debt. Your journey to a brighter future begins with a simple
              call.{' '}
              <Link to="/contact" className="font-medium text-tan underline decoration-tan/40 underline-offset-4 hover:decoration-tan">
                Contact us today for a free consultation.
              </Link>{' '}
              Our bankruptcy attorneys will get to work immediately to help you get back on your feet.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact" arrow>
                Free Case Evaluations
              </Button>
              <Button href={firm.phone.href} variant="outlineLight">
                <Phone className="size-4" aria-hidden="true" />
                {firm.phone.display}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
