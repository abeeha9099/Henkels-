import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/content/PageHero'
import ContentBlocks from '../components/content/ContentBlocks'
import Sidebar from '../components/content/Sidebar'
import { Container } from '../components/ui/Section'
import { byGroup, useContent } from '../content/content'
import { firm, practiceAreas } from '../data/site'
import { LoadError, LoadingBody } from './PageStates'

const groupInfo = {
  bankruptcy: { label: 'Debt & Bankruptcy', to: '/bankruptcy' },
  criminal: { label: 'Criminal Defense & OWI', to: '/criminal-defense' },
  location: { label: 'Service Areas', to: '/practice-areas#service-areas' },
}

// The three main practice pages get their sub-services listed under the hero.
const practiceLinks = {
  bankruptcy: practiceAreas[1].children,
  'criminal-defense': practiceAreas[0].children,
  owi: [
    { label: 'Criminal Defense', to: '/criminal-defense' },
    { label: 'Traffic Offenses', to: '/traffic-lawyer-dubuque' },
    { label: 'Drug Crime', to: '/drug-crime-lawyer-dubuque-ia' },
  ],
}

const NARROW = new Set(['privacy-policy', 'terms-of-service', 'thank-you', 'pay-toward-bankruptcy'])

/** Template for every imported page: practice, service and city landing pages, and simple legal pages. */
export default function ContentPage({ entry }) {
  const { doc, loading, error } = useContent(entry.slug)
  const group = groupInfo[entry.group]
  const narrow = NARROW.has(entry.slug)
  const related = group ? byGroup(entry.group).filter((e) => e.slug !== entry.slug).slice(0, 8) : []
  const subLinks = practiceLinks[entry.slug]

  const breadcrumbs = [{ label: 'Home', to: '/' }]
  if (group && group.to !== `/${entry.slug}`) breadcrumbs.push({ label: group.label, to: group.to })
  breadcrumbs.push({ label: entry.menuTitle })

  return (
    <>
      <Seo
        title={`${entry.menuTitle} - ${firm.name}`}
        description={entry.excerpt || `${entry.menuTitle} — ${firm.name}, ${firm.address.city}, ${firm.address.region}.`}
        path={`/${entry.slug}`}
        jsonLd={doc?.schema?.length ? doc.schema : undefined}
      />
      <PageHero
        eyebrow={group?.label || firm.name}
        title={doc?.title || entry.title}
        tagline={doc?.tagline}
        phone={doc?.heroPhone}
        image={narrow ? undefined : entry.image || undefined}
        breadcrumbs={breadcrumbs}
        actions={!narrow}
      >
        {subLinks && (
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Related services">
            {subLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="inline-block rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/80 transition-colors hover:border-white hover:bg-white hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PageHero>

      <Container className="py-16 sm:py-20 lg:py-24">
        {narrow ? (
          <div className="mx-auto max-w-3xl">
            {loading && <LoadingBody />}
            {error && <LoadError slug={entry.slug} />}
            {doc && <ContentBlocks blocks={doc.blocks} phone={doc.heroPhone} />}
          </div>
        ) : (
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <article className="min-w-0 lg:col-span-8">
              {loading && <LoadingBody />}
              {error && <LoadError slug={entry.slug} />}
              {doc && <ContentBlocks blocks={doc.blocks} phone={doc.heroPhone} />}
            </article>
            <div className="lg:col-span-4">
              <Sidebar
                phone={doc?.heroPhone}
                related={related}
                relatedTitle={group ? group.label : 'Related pages'}
                moreLink={{ label: 'All practice areas', to: '/practice-areas' }}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
