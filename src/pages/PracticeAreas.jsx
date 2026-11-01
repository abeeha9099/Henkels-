import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/content/PageHero'
import Practice from '../components/home/Practice'
import Reveal from '../components/ui/Reveal'
import Section, { Display, Pill } from '../components/ui/Section'
import { byGroup } from '../content/content'
import { firm } from '../data/site'

const cities = [
  { label: 'Davenport', match: /davenport/ },
  { label: 'Cedar Rapids', match: /cedar-rapids/ },
  { label: 'Iowa City & Johnson County', match: /iowa-city|johnson-county/ },
  { label: 'Linn County', match: /linn-county/ },
]

const byTitle = (a, b) => a.menuTitle.localeCompare(b.menuTitle)

function LinkList({ items }) {
  return (
    <ul className="grid border-t border-ink/10 sm:grid-cols-2 sm:gap-x-10 xl:grid-cols-3">
      {items.map((item) => (
        <li key={item.slug} className="border-b border-ink/10">
          <Link to={`/${item.slug}`} className="group flex items-start justify-between gap-4 py-4 text-[0.9375rem] text-ink hover:text-brand">
            {item.menuTitle}
            <ArrowUpRight className="mt-0.5 size-4 shrink-0 opacity-40 transition-all group-hover:rotate-45 group-hover:opacity-100" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function PracticeAreas() {
  const locations = byGroup('location')
  const directory = [
    { id: 'debt-bankruptcy', title: 'Debt & Bankruptcy', items: byGroup('bankruptcy').sort(byTitle) },
    { id: 'criminal-defense', title: 'Criminal Defense & OWI', items: byGroup('criminal').sort(byTitle) },
  ]

  return (
    <>
      <Seo
        title={`Practice Areas - ${firm.name}`}
        description={`Bankruptcy, debt relief, criminal defense and OWI. ${firm.tagline}`}
        path="/practice-areas"
      />
      <PageHero
        eyebrow="Practice areas"
        title="Practice Areas"
        tagline={firm.tagline}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Practice Areas' }]}
      />

      <div className="mt-2 sm:mt-3">
        <Practice />
      </div>

      {directory.map((section) => (
        <Section key={section.id} id={section.id} labelledBy={`${section.id}-title`} className="scroll-mt-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Pill>{section.items.length} pages</Pill>
              <Display id={`${section.id}-title`} className="mt-6 text-ink lg:text-6xl">
                {section.title}
              </Display>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <LinkList items={section.items} />
            </Reveal>
          </div>
        </Section>
      ))}

      <section id="service-areas" aria-labelledby="service-areas-title" className="scroll-mt-24 px-2 sm:px-3">
        <div className="rounded-[1.75rem] bg-tan-pale py-20 sm:rounded-[2.5rem] sm:py-28">
          <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <Pill>{locations.length} pages</Pill>
              <Display id="service-areas-title" className="mt-6 max-w-4xl text-ink">
                Service Areas
              </Display>
            </Reveal>
            <div className="mt-14 grid gap-12 lg:grid-cols-2">
              {cities.map((city) => (
                <Reveal key={city.label}>
                  <h3 className="font-display text-3xl text-ink">{city.label}</h3>
                  <ul className="mt-5 border-t border-ink/10">
                    {locations
                      .filter((l) => city.match.test(l.slug))
                      .sort(byTitle)
                      .map((l) => (
                        <li key={l.slug} className="border-b border-ink/10">
                          <Link to={`/${l.slug}`} className="group flex items-center justify-between gap-4 py-3.5 text-[0.9375rem] text-ink hover:text-brand">
                            {l.menuTitle}
                            <ArrowUpRight className="size-4 shrink-0 opacity-40 transition-all group-hover:rotate-45 group-hover:opacity-100" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
