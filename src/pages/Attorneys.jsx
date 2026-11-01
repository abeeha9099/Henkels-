import Seo from '../components/Seo'
import PageHero from '../components/content/PageHero'
import { AttorneyCards, StaffGrid } from '../components/content/PeopleGrid'
import Reveal from '../components/ui/Reveal'
import Section, { Display, Pill } from '../components/ui/Section'
import { attorneys as attorneysIntro } from '../data/home'
import { firm } from '../data/site'

export default function Attorneys() {
  return (
    <>
      <Seo
        title={`Attorneys & Team - ${firm.name}`}
        description={attorneysIntro.intro}
        path="/attorneys"
      />
      <PageHero
        eyebrow="Attorneys & team"
        title="Friendly Attorneys Who Care"
        tagline={attorneysIntro.intro}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Attorneys & Team' }]}
      />

      <Section labelledBy="attorneys-title">
        <Reveal>
          <Pill>Attorneys</Pill>
          <Display id="attorneys-title" className="mt-6 text-ink">
            Our Attorneys.
          </Display>
        </Reveal>
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
    </>
  )
}
