// Firm details and shared content, taken from henkelsbaker.com.

export const firm = {
  name: 'Henkels & Baker, PC',
  url: 'https://www.henkelsbaker.com',
  founded: 1973,
  tagline: 'Proudly serving clients throughout Dubuque and Northeast Iowa since 1973.',
  // The live site uses different numbers in different places; each is kept where it was used.
  phone: { display: '(563) 556-4060', href: 'tel:5635564060' },
  callUsPhone: { display: '(563) 217-1966', href: 'tel:5632171966' },
  address: {
    street: '40 Main St., Suite 100',
    city: 'Dubuque',
    region: 'IA',
    postalCode: '52001',
  },
  mapsUrl: 'https://maps.app.goo.gl/piZdjKHc4CVpYeJ16',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Henkels+%26+Baker+PC,+40+Main+St+Suite+100,+Dubuque,+IA+52001&output=embed',
  paymentUrl: 'https://secure.lawpay.com/pages/henkelsandbakerpc/trust',
  hours: [
    { days: 'Mon – Thu', time: '9:00 am – 5:00 pm' },
    { days: 'Fri', time: '9:00 am – 3:00 pm' },
    { days: 'Sat', time: 'Closed' },
    { days: 'Sun', time: 'Closed' },
  ],
  reviews: { rating: 'Excellent', count: 201, source: 'Google' },
}

// Paths match the live site's URLs so existing links and rankings carry over.
export const practiceAreas = [
  {
    label: 'Criminal Defense',
    to: '/criminal-defense',
    children: [
      { label: 'OWI', to: '/owi' },
      { label: 'Traffic Offenses', to: '/traffic-lawyer-dubuque' },
      { label: 'Drug Crime', to: '/drug-crime-lawyer-dubuque-ia' },
    ],
  },
  {
    label: 'Debt & Bankruptcy',
    to: '/bankruptcy',
    children: [
      { label: 'Chapter 7 Bankruptcy', to: '/chapter-7-attorney-dubuque' },
      { label: 'Chapter 13 Bankruptcy', to: '/chapter-13-lawyer-dubuque' },
      { label: 'Debt Settlement', to: '/debt-settlement-lawyer-dubuque-ia' },
      { label: 'Wage Garnishment', to: '/wage-garnishment-lawyer-dubuque' },
      { label: 'Student Loan', to: '/student-loans' },
      { label: 'Foreclosure', to: '/foreclosure-lawyer-dubuque-ia' },
      { label: 'Debt Relief', to: '/debt-relief-lawyer-dubuque' },
    ],
  },
]

export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'Practice Areas', children: practiceAreas },
  { label: 'Make a Payment', href: firm.paymentUrl },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const footerLinks = [
  { label: 'About', to: '/about' },
  { label: 'Attorneys & Team', to: '/attorneys' },
  { label: 'Practice Areas', to: '/practice-areas' },
  { label: 'Blog', to: '/blog' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
  { label: 'Make a Payment', href: firm.paymentUrl },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
]
