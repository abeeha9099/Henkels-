import { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import { Breadcrumbs } from '../components/content/PageHero'
import { CtaBar } from '../components/content/ContentBlocks'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { Container, Panel, Pill } from '../components/ui/Section'
import { attorneyBySlug, attorneys } from '../data/people'
import { firm } from '../data/site'
import NotFound from './NotFound'

const external = { target: '_blank', rel: 'noopener noreferrer' }
const linkClass = 'text-ink underline decoration-ink/20 underline-offset-4 hover:text-brand hover:decoration-brand'

function Note({ note }) {
  if (!note) return null
  if (typeof note === 'string') return <>, {note}</>
  return (
    <>
      ,{' '}
      {note.map((part) =>
        typeof part === 'string' ? (
          <Fragment key={part}>{part}</Fragment>
        ) : (
          <a key={part.href} href={part.href} className={linkClass} {...external}>
            {part.text}
          </a>
        ),
      )}
    </>
  )
}

function Bio({ person }) {
  return person.bio.map((p) => {
    if (!person.bioLink || !p.includes(person.bioLink.text)) return <p key={p.slice(0, 20)}>{p}</p>
    const [before, after] = p.split(person.bioLink.text)
    return (
      <p key={p.slice(0, 20)}>
        {before}
        <Link to={person.bioLink.to} className="font-medium text-brand underline decoration-brand/30 underline-offset-4">
          {person.bioLink.text}
        </Link>
        {after}
      </p>
    )
  })
}

export default function AttorneyProfile() {
  const { slug } = useParams()
  const person = attorneyBySlug[slug]
  if (!person) return <NotFound />
  const others = attorneys.filter((a) => a.slug !== slug)

  return (
    <>
      <Seo
        title={`${person.name}, ${person.role} - ${firm.name}`}
        description={person.bio[0].slice(0, 160)}
        path={`/attorneys/${slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: person.fullName || person.name,
          jobTitle: person.role,
          worksFor: { '@type': 'LegalService', name: firm.name, url: firm.url },
          alumniOf: person.education,
        }}
      />

      <Panel labelledBy="page-title" inner="pt-10 pb-14 sm:pt-12 lg:pb-0">
        <div className="pointer-events-none absolute -top-48 right-[-15%] -z-10 size-[40rem] rounded-full bg-brand/25 blur-[120px]" aria-hidden="true" />
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Attorneys', to: '/attorneys' }, { label: person.name }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7 lg:pb-20">
            <Pill tone="light">{person.secondaryRole ? `${person.role} · ${person.secondaryRole}` : person.role}</Pill>
            <h1 id="page-title" className="mt-6 font-display text-[3.25rem] leading-[0.95] tracking-[-0.03em] text-white sm:text-7xl lg:text-8xl">
              {person.name}
            </h1>
            {person.fullName && <p className="mt-4 font-display text-2xl text-white/60">{person.fullName}</p>}
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
          <Reveal delay={0.1} className="lg:col-span-5">
            <img
              src={person.image}
              alt={`${person.name}, ${person.role}`}
              className="mx-auto aspect-[4/5] w-full max-w-md rounded-t-[999px] rounded-b-[2rem] object-cover object-top lg:rounded-b-none"
            />
          </Reveal>
        </div>
      </Panel>

      <Container className="py-16 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="space-y-6 text-lg leading-relaxed lg:col-span-7">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">About {person.name.split(' ')[0]}</h2>
            <Bio person={person} />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-ink/10 border-y border-ink/10">
              <div className="py-6">
                <dt className="font-label text-xs font-bold tracking-[0.16em] text-taupe uppercase">Education</dt>
                <dd className="mt-3">
                  <ul className="space-y-2 text-ink">
                    {person.education.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="py-6">
                <dt className="font-label text-xs font-bold tracking-[0.16em] text-taupe uppercase">Bar Admissions</dt>
                <dd className="mt-3 font-display text-2xl text-ink">{person.bar}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-16 lg:mt-24">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Activities &amp; Affiliations</h2>
          <ul className="mt-8 grid border-t border-ink/10 md:grid-cols-2 md:gap-x-12">
            {person.affiliations.map((a) => (
              <li key={a.label} className="border-b border-ink/10 py-5 text-[0.9375rem]">
                {a.href ? (
                  <a href={a.href} className={linkClass} {...external}>
                    {a.label}
                  </a>
                ) : (
                  <span className="text-ink">{a.label}</span>
                )}
                <Note note={a.note} />
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 lg:mt-24">
          <CtaBar />
        </div>
      </Container>

      <section aria-labelledby="other-attorneys" className="border-t border-ink/10 py-16 sm:py-20">
        <Container>
          <h2 id="other-attorneys" className="font-display text-3xl text-ink sm:text-4xl">
            Our Attorneys.
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {others.map((a) => (
              <li key={a.slug}>
                <Link to={`/attorneys/${a.slug}`} className="group flex items-center gap-6 rounded-[1.75rem] bg-mist p-4 pr-6 transition-colors hover:bg-tan-pale">
                  <img src={a.image} alt="" loading="lazy" className="size-24 rounded-2xl object-cover object-top" />
                  <div className="flex-1">
                    <p className="font-label text-xs font-bold tracking-[0.14em] text-brand uppercase">{a.role}</p>
                    <p className="mt-1 font-display text-2xl text-ink">{a.name}</p>
                  </div>
                  <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
