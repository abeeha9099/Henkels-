// Attorneys and staff, verbatim from the original About page and staff bio pages.
import { byGroup } from '../content/content'

export const attorneys = [
  {
    slug: 'dustin-baker',
    name: 'Dustin Baker',
    role: 'Managing Attorney',
    image: '/images/attorney-dustin-lg.webp',
    bio: [
      'Dustin Baker was born and raised in Dubuque, Iowa, and graduated from Loras College in 2001 and the University of Iowa College of Law in 2003. After working on trusts and estates, regulatory compliance and corporate legal matters for a national bank holding company, he consulted with international clients in Chicago and Washington, D.C., before returning to Iowa to open his own criminal defense practice. While his focus is mainly on bankruptcy, complex debt negotiation and student loan adversary cases, he continues to manage the criminal defense department and consults on criminal cases daily.',
    ],
    education: ['University of Iowa School of Law – Juris Doctor, 2003', 'Loras College – B.S., Mathematics, 2001'],
    affiliations: [
      { label: 'Dubuque/Jackson Counties Habitat for Humanity', href: 'https://www.habitat.org/us-ia/dubuque/dubuquejackson-counties-hfh-ia', note: 'Vice President' },
      { label: 'Multicultural Family Center', href: 'https://www.mfcdbq.org/', note: 'Board Member' },
      { label: 'Dubuque Jaycees', href: 'http://www.dubuquejaycees.org/', note: 'Past President' },
      { label: 'Dubuque Montessori School', href: 'https://www.dubuquemontessori.org/', note: 'Past Board Member' },
      { label: 'Carnegie-Stout Public Library Foundation', href: 'https://carnegiestout.org/library-foundation/', note: 'Past Board Member' },
      { label: 'Leadership Dubuque', href: 'https://www.dubuquechamber.com/programs/leadership-dubuque', note: 'Class of 2017' },
    ],
    bar: 'Iowa',
  },
  {
    slug: 'jason-van-hemert',
    name: 'Jason Van Hemert',
    role: 'Associate Attorney',
    image: '/images/attorney-jason.webp',
    bio: [
      'Jason Van Hemert was born and raised in Des Moines, Iowa, and graduated from Cornell University (NY, 2001) and the University of Illinois College of Law (Champaign-Urbana, 2004). Beginning his career as an Illinois assistant state’s attorney, he then practiced criminal defense as part of a larger general practice before becoming an advocate for homeowners distressed by the mortgage foreclosure crisis of 2008. Jason helped to save his clients’ homes through a combined strategy of bankruptcy, mortgage refinance, foreclosure defense, and other real estate strategies. Since returning to Iowa, Jason continues to assist his clients with bankruptcy and financial matters but has resumed his focus on criminal law, where he has tried dozens of successful trials before the bench and juries, and is committed to ensuring fair and just results for his clients on both sides of the river.',
    ],
    education: [
      'Cornell University (NY) – B.A., Government, Law & Society Concentration, 2001',
      'University of Illinois School of Law – Juris Doctor, 2004',
    ],
    affiliations: [
      { label: 'Galena Schools Music Boosters', href: 'https://galenamakesmusic.wixsite.com/galena-music', note: 'Current President' },
      { label: 'Dubuque County Bar Association', href: 'https://dubuquecobar.org/', note: 'Current Member' },
      { label: 'Dubuque Multi-Cultural Family Center', href: 'https://www.mfcdbq.org/', note: 'Current Governance Committee Member' },
      { label: 'Galena Chamber of Commerce', href: 'https://galenachamber.com/', note: 'Past Member, Business Law Lecturer' },
      { label: 'Galena High School Referendum Campaign', href: 'https://www.facebook.com/VoteYesGHS/', note: 'Past Committee Member' },
      {
        label: 'Northwest Illinois Economic Development Counsel',
        href: 'https://www.nwiled.org/',
        // The note contains its own link, so it is stored as parts.
        note: [
          'Past ',
          { text: 'Workforce Housing Study', href: 'https://www.nwiled.org/pdf/doc-jo-daviess-county-housing-study-2022-1674159758.pdf' },
          ', Past Board Member and Outreach Facilitator',
        ],
      },
      { label: 'St. Andrews Lutheran School', href: 'https://www.standrewsparkridge.org/', note: '(Park Ridge, IL), Past School Board Member' },
      { label: 'Association of Foreclosure and Consumer Protection Attorneys', note: 'Past Member' },
      { label: 'Illinois Real Estate Lawyers Association', href: 'https://irela.org/', note: 'Past Member & Legal Education Lecturer' },
      { label: 'Illinois State Bar Association', href: 'https://www.isba.org/sections/realestate', note: 'Past Member & Legal Education Lecturer' },
    ],
    bar: 'Iowa and Illinois',
  },
  {
    slug: 'fran-henkels',
    name: 'Fran Henkels',
    fullName: 'Francis Wm. Henkels',
    role: 'Founder, Retired',
    secondaryRole: 'Of Counsel',
    image: '/images/attorney-francis-lg.webp',
    bio: [
      'Fran Henkels has over 50 years of experience practicing business and finance law. As an attorney specializing in bankruptcy and business/agribusiness restructures, he helped many community members during the farm and mortgage crisis of the 1980s. Local officials have also relied on his expertise as a member of the County Compensation Board, as well as the City of Dubuque Arts and Cultural Affairs Advisory Commission and Civic Center Advisory Commission. Fran is also certified as a mediator by the International Academy of Dispute Resolution.',
    ],
    bioLink: { text: 'specializing in bankruptcy', to: '/bankruptcy' },
    education: ['Drake University Law School – Juris Doctor, 1973', 'Loras College – B.A., History, 1970'],
    affiliations: [
      { label: 'Dubuque Art Association', note: 'Former Board Chair' },
      { label: 'Committee for the Center for Dubuque History' },
      { label: 'County Compensation Board', note: 'Former Member' },
    ],
    bar: 'Iowa',
  },
]

export const attorneyBySlug = Object.fromEntries(attorneys.map((a) => [a.slug, a]))

// Staff bio pages keep their original URLs (e.g. /hannah-seiler). Order follows the About page.
const staffOrder = ['hannah-seiler', 'teri-hooper', 'lauren-klein', 'asia-oleskow', 'hillary-baker', 'jamie', 'kylie', 'tabitha', 'lynsey-freiburger', 'vance-koehler']
export const staff = byGroup('team')
  .map((e) => ({ slug: e.slug, name: e.title, role: e.role, image: `/images/team/${e.slug}.webp` }))
  .sort((a, b) => staffOrder.indexOf(a.slug) - staffOrder.indexOf(b.slug))
