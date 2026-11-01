import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/content/PageHero'
import { AttorneyCards, StaffGrid } from '../components/content/PeopleGrid'
import FreshStart from '../components/home/FreshStart'
import Reveal from '../components/ui/Reveal'
import Section, { Display, Panel, Pill } from '../components/ui/Section'
import { bySlug } from '../content/content'
import { focus, history } from '../data/about'
import { firm } from '../data/site'

const inlineLink = 'font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand'
// The About page uses its own "Call Us" number on the live site.
const ABOUT_PHONE = '5632171923'

export default function About() {
  const entry = bySlug.about
  return (
    <>
      <Seo title={`${entry.menuTitle} - ${firm.name}`} description={entry.excerpt} path="/about" />
      <PageHero
        eyebrow={`Since ${firm.founded}`}
        title={entry.title}
        phone={ABOUT_PHONE}
        image="/images/team-group.webp"
        imageAlt={`The ${firm.name} team in Dubuque`}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      <Section labelledBy="focus-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Pill>Our focus</Pill>
            <Display id="focus-title" className="mt-6 text-ink">
              {focus.title}
            </Display>
            <img src={focus.image} alt={focus.imageAlt} loading="lazy" className="mt-10 aspect-[4/3] w-full rounded-[2rem] object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-20">
            <p className="text-xl leading-relaxed text-ink">{focus.intro}</p>
            <ol className="mt-8 border-b border-ink/10">
              {focus.points.map((point, i) => (
                <li key={point} className="flex gap-6 border-t border-ink/10 py-6">
                  <span className="font-display text-4xl leading-none text-tan">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-2xl leading-snug text-ink">{point}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 space-y-5 text-lg leading-relaxed">
              {focus.body.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Panel tone="tan" labelledBy="history-title" inner="py-20 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <Pill>{history.subtitle}</Pill>
            <Display id="history-title" className="mt-6 text-ink">
              {history.title}
            </Display>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-cocoa">
              {history.body.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
              <p>
                <a href={`tel:${ABOUT_PHONE}`} className={inlineLink}>
                  Call us today
                </a>{' '}
                to learn more or{' '}
                <Link to="/contact" className={inlineLink}>
                  schedule a free consultation
                </Link>{' '}
                to experience exceptional legal service for yourself.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <ol className="relative border-l border-tan/50 pl-8" aria-label="Firm timeline">
              {history.timeline.map((item) => (
                <li key={item.year} className="relative pb-10 last:pb-0">
                  <span className="absolute top-2 -left-[2.4rem] size-3 rounded-full bg-tan ring-4 ring-tan-pale" aria-hidden="true" />
                  <p className="font-display text-5xl leading-none text-ink">{item.year}</p>
                  <p className="mt-2 text-cocoa">{item.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <dl className="mt-20 grid gap-px overflow-hidden rounded-[1.75rem] bg-tan/30 sm:grid-cols-2 lg:grid-cols-4">
          {history.facts.map((fact) => (
            <div key={fact.label} className="bg-white p-7">
              <dt className="font-label text-xs font-bold tracking-[0.16em] text-taupe uppercase">{fact.label}</dt>
              <dd className="mt-4">
                <ul className="space-y-1 text-ink">
                  {fact.items.map((item) => (
                    <li key={item} className={fact.items.length === 1 && fact.label === 'Year Established' ? 'font-display text-5xl' : ''}>
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Panel>

      <Section labelledBy="attorneys-title">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Pill>Attorneys</Pill>
            <Display id="attorneys-title" className="mt-6 text-ink">
              Our Attorneys.
            </Display>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/attorneys" className="font-medium text-brand hover:text-brand-dark">
              Attorneys &amp; team →
            </Link>
          </Reveal>
        </div>
        <div className="mt-14">
          <AttorneyCards />
        </div>
      </Section>

      <Section labelledBy="team-title" className="border-t border-ink/10">
        <Reveal>
          <Pill>Our people</Pill>
          <Display id="team-title" className="mt-6 text-ink">
            Your Dedicated <span className="text-brand">Legal Team</span>
          </Display>
        </Reveal>
        <div className="mt-14">
          <StaffGrid />
        </div>
      </Section>

      <FreshStart />
    </>
  )
}
