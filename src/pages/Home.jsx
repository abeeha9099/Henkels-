import Seo from '../components/Seo'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Practice from '../components/home/Practice'
import FreshStart from '../components/home/FreshStart'
import Reviews from '../components/home/Reviews'
import Team from '../components/home/Team'
import Attorneys from '../components/home/Attorneys'
import BankruptcyGuide from '../components/home/BankruptcyGuide'
import Faq from '../components/home/Faq'
import Location from '../components/home/Location'
import { firm } from '../data/site'
import { faqs } from '../data/home'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: firm.name,
    url: firm.url,
    logo: `${firm.url}/images/logo.png`,
    image: `${firm.url}/images/hero.webp`,
    telephone: '+1-563-556-4060',
    foundingDate: String(firm.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: firm.address.street,
      addressLocality: firm.address.city,
      addressRegion: firm.address.region,
      postalCode: firm.address.postalCode,
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '17:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '15:00' },
    ],
    areaServed: 'Dubuque and Northeast Iowa',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
]

export default function Home() {
  return (
    <>
      <Seo
        title="Bankruptcy Attorneys in Dubuque, IA - Henkels & Baker, PC"
        description="Do you need bankruptcy attorneys in Dubuque IA? Henkels & Baker PC has attorneys who are ready to work with you. Book an appointment with us today."
        path="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <About />
      <Practice />
      <FreshStart />
      <Reviews />
      <Team />
      <Attorneys />
      <BankruptcyGuide />
      <Faq />
      <Location />
    </>
  )
}
