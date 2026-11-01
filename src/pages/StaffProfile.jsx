import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/Seo'
import Prose from '../components/content/Prose'
import { Breadcrumbs } from '../components/content/PageHero'
import Reveal from '../components/ui/Reveal'
import { Panel, Pill } from '../components/ui/Section'
import { useContent } from '../content/content'
import { firm } from '../data/site'
import { staff } from '../data/people'
import { LoadError, LoadingBody } from './PageStates'

// The bio HTML repeats the photo, name and title shown in the layout; drop those
// and the "Back to About Us" button that the layout replaces.
const bioOnly = (html) =>
  html
    .replace(/<img[^>]*>/, '')
    .replace(/<h2>[\s\S]*?<\/h2>\s*<p>[\s\S]*?<\/p>/, '')
    .replace(/<p><a data-button[^>]*>Back to About Us<\/a><\/p>/i, '')

/** Staff bio pages at their original URLs, e.g. /hannah-seiler. */
export default function StaffProfile({ entry }) {
  const { doc, loading, error } = useContent(entry.slug)
  const person = staff.find((s) => s.slug === entry.slug)
  const others = staff.filter((s) => s.slug !== entry.slug).slice(0, 4)
  const html = doc ? bioOnly(doc.blocks.map((b) => b.html || '').join('')) : ''

  return (
    <>
      <Seo title={`${entry.title} - ${firm.name}`} description={`${entry.title}, ${entry.role} at ${firm.name}.`} path={`/${entry.slug}`} />
      <Panel labelledBy="page-title" inner="pt-10 pb-14 sm:pt-12 lg:pb-20">
        <div className="pointer-events-none absolute -top-48 right-[-15%] -z-10 size-[40rem] rounded-full bg-brand/25 blur-[120px]" aria-hidden="true" />
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Our Team', to: '/attorneys' }, { label: entry.title }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-4">
            <img
              src={person.image}
              alt={`${entry.title}, ${entry.role}`}
              width="640"
              height="800"
              className="aspect-[4/5] w-full max-w-sm rounded-t-[999px] rounded-b-[2rem] object-cover object-top"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6 lg:pb-6">
            <Pill tone="light">{entry.role}</Pill>
            <h1 id="page-title" className="mt-6 font-display text-5xl leading-none tracking-[-0.025em] text-white sm:text-7xl">
              {entry.title}
            </h1>
          </Reveal>
        </div>
      </Panel>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        {loading && <LoadingBody />}
        {error && <LoadError slug={entry.slug} />}
        {doc && <Prose html={html} className="text-lg" />}
        <Link to="/attorneys" className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to our team
        </Link>
      </section>

      <section aria-labelledby="more-team" className="border-t border-ink/10 py-16 sm:py-20">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
          <h2 id="more-team" className="font-display text-3xl text-ink sm:text-4xl">
            More of our team
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {others.map((p) => (
              <li key={p.slug}>
                <Link to={`/${p.slug}`} className="group block">
                  <div className="overflow-hidden rounded-[1.5rem] bg-mist">
                    <img src={p.image} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 font-display text-xl text-ink group-hover:text-brand">{p.name}</p>
                  <p className="font-label text-xs font-bold tracking-[0.12em] text-taupe uppercase">{p.role}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
