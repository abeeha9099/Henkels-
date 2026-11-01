# Henkels & Baker — Content Inventory

Source: live WordPress REST API at henkelsbaker.com, downloaded 2026-11-01. **109 published pages** and **14 blog posts**. Every item below must exist in the new site with its original text, at its original URL.

Status key: `[x]` rebuilt in the new design and checked against the original · `[ ]` open · `[–]` intentionally excluded.

**How content is carried over:** `npm run import` converts every page and post from the WordPress REST API into `public/content/<slug>.json`; `npm run verify:content` compares every sentence of the originals with the imported content (last run: 119 pages/posts, 0 missing sentences). Each page keeps its original URL and its own “Call Us” number (most landing pages use (563) 217-1915).

## Site-wide items

- [x] Header phone (563) 556-4060 → tel:5635564060
- [x] Hero “Call Us” → (563) 217-1966 (number used by the original hero button)
- [x] Contact page phone (563) 217-1923 (used on the original Contact page)
- [x] Address: 40 Main St., Suite 100, Dubuque, IA 52001
- [x] Hours: Mon–Thu 9:00 am–5:00 pm · Fri 9:00 am–3:00 pm · Sat/Sun Closed
- [x] Google Maps short link (maps.app.goo.gl/piZdjKHc4CVpYeJ16) and map embed
- [x] Make a Payment → LawPay trust page (secure.lawpay.com/pages/henkelsandbakerpc/trust)
- [x] Google reviews: “Excellent”, 201 reviews, 10 review texts. Trustindex widget replaced by the same reviews as static text — **demo-only**: live sync needs the Trustindex embed code
- [x] Main navigation incl. Practice Areas menu (Criminal Defense: OWI, Traffic Offenses, Drug Crime · Debt & Bankruptcy: Chapter 7, Chapter 13, Debt Settlement, Wage Garnishment, Student Loan, Foreclosure, Debt Relief)
- [x] Footer links: Privacy Policy, Testimonials, Contact
- [x] Copyright line and content-ownership notice
- [ ] UserWay accessibility widget (script on /bankruptcy) — **demo-only**, needs the firm’s UserWay account ID
- [–] Constellation Marketing footer credit and the copy of the old footer embedded in /bankruptcy — removed (site furniture, not page content); confirm with firm
- [ ] Contact forms: **none exist on the live site** — consultations are by phone; /thank-you page kept as content

## Homepage sections (original order)

- [x] Hero: “Since 1973”, H1 “Bankruptcy Attorneys in Dubuque, IA”, “You Deserve a Fresh Start. We Can Help.”, Free Case Evaluations + Call Us
- [x] Google review badge and 10 reviews
- [x] Value points: Full-service, Compassionate, Experienced
- [x] About Our Dubuque Bankruptcy Lawyers (3 paragraphs)
- [x] Dubuque Bankruptcy Attorneys — 01 Bankruptcy, 02 Criminal Defense, 03 OWI with descriptions
- [x] A Fresh Start Is Possible. Let Us Guide You. + stats ($40 Million+ debt eliminated, 1000s satisfied clients, 50+ years)
- [x] Your Dedicated Legal Team — Hannah, Teri, Lauren, Dustin + Read More About Us
- [x] Friendly Attorneys Who Care — intro, Dustin Baker (Attorney) and Francis Wm. Henkels (Of Counsel) bios, Learn More
- [x] Henkels & Baker, PC — Bankruptcy Attorneys in Dubuque, IA (3 paragraphs + 3 jump links)
- [x] Why Choose Henkels & Baker, PC — Experience That Matters, A Personal Touch to Legal Solutions, Proven Results + closing paragraph
- [x] How a Dubuque Bankruptcy Attorney Can Help — 4 items
- [x] Seek Assistance from Henkels & Baker, PC Today! — paragraph, 5 items, closing CTA
- [x] Common Questions About Bankruptcy in Iowa — 8 FAQs with full answers
- [x] Our Office Location — Visit Us, address, hours, Contact Us phone

## Core pages (10)

| Status | Title | URL | Words | Headings | Images | Notes |
|---|---|---|---:|---:|---:|---|
| [x] | About | `/about/` | 963 | 22 | 1 |  |
| [x] | Henkels & Baker, PC Blog / Dubuque, IA | `/blog/` | 377 | 10 | 10 |  |
| [x] | Contact | `/contact/` | 243 | 3 | 0 | Google Map |
| [x] | Bankruptcy Attorneys in Dubuque, IA | `/` | 2581 | 33 | 78 | Google Map, ~8 Q&A |
| [x] | Pay Toward Bankruptcy | `/pay-toward-bankruptcy/` | 58 | 1 | 0 | LawPay |
| [x] | Privacy Policy | `/privacy-policy/` | 1475 | 5 | 0 |  |
| [x] | Reviews / Henkels & Baker, PC | `/reviews/` | 398 | 1 | 11 | Google reviews link |
| [x] | Terms Of Service | `/terms-of-service/` | 181 | 0 | 0 |  |
| [x] | Reviews / Henkels & Baker, PC | `/testimonials/` | 419 | 1 | 0 |  |
| [x] | Thank You | `/thank-you/` | 28 | 0 | 0 |  |

## Team bio pages (10)

| Status | Title | URL | Words | Headings | Images | Notes |
|---|---|---|---:|---:|---:|---|
| [x] | Asia Oleskow | `/asia-oleskow/` | 58 | 1 | 1 |  |
| [x] | Hannah Seiler | `/hannah-seiler/` | 175 | 1 | 0 |  |
| [x] | Hillary Baker | `/hillary-baker/` | 76 | 1 | 1 |  |
| [x] | Jamie Virga | `/jamie/` | 79 | 1 | 1 |  |
| [x] | Kylie Clayton | `/kylie/` | 67 | 1 | 1 |  |
| [x] | Lauren Klein | `/lauren-klein/` | 77 | 1 | 1 |  |
| [x] | Lynsey Freiburger | `/lynsey-freiburger/` | 73 | 1 | 1 |  |
| [x] | Tabitha Sodawasser | `/tabitha/` | 64 | 1 | 1 |  |
| [x] | Teri Hooper | `/teri-hooper/` | 114 | 1 | 1 |  |
| [x] | Vance Koehler | `/vance-koehler/` | 76 | 1 | 1 |  |

## Bankruptcy & debt — Dubuque / Iowa (33)

| Status | Title | URL | Words | Headings | Images | Notes |
|---|---|---|---:|---:|---:|---|
| [x] | Bankruptcy Lawyers in Iowa | `/bankruptcy/` | 2043 | 26 | 6 | Google Map, UserWay, ~3 Q&A |
| [x] | Can You File Bankruptcy on Back Taxes: Understanding Your Options | `/bankruptcy-back-taxes/` | 1940 | 21 | 8 | ~1 Q&A |
| [x] | Can Utility Bills Be Included in Chapter 13 Bankruptcy? | `/can-utility-bills-be-included-in-chapter-13/` | 2078 | 17 | 9 | ~5 Q&A |
| [x] | Chapter 13 Bankruptcy Iowa | `/chapter-13-bankruptcy-iowa/` | 1788 | 22 | 6 | ~3 Q&A |
| [x] | Chapter 13 Attorney Dubuque | `/chapter-13-lawyer-dubuque/` | 2251 | 34 | 7 | Google Map |
| [x] | Chapter 7 Lawyer Dubuque | `/chapter-7-attorney-dubuque/` | 2139 | 28 | 7 | Google Map |
| [x] | Chapter 7 Bankruptcy Iowa | `/chapter-7-bankruptcy-iowa/` | 2173 | 29 | 7 | Google Map |
| [x] | Understanding Chapter 7 Debt Limits | `/chapter-7-debt-limits/` | 2243 | 13 | 9 |  |
| [x] | How Much Does It Cost to File Bankruptcy in Iowa: Your Quick Guide to Expenses | `/cost-file-bankruptcy-iowa/` | 1672 | 17 | 6 |  |
| [x] | Debt Relief Lawyer Dubuque | `/debt-relief-lawyer-dubuque/` | 2203 | 32 | 5 | Google Map |
| [x] | Debt Settlement Attorney Dubuque, IA | `/debt-settlement-lawyer-dubuque-ia/` | 1886 | 26 | 6 |  |
| [x] | Foreclosure Lawyer In Iowa | `/foreclosure-in-iowa/` | 2233 | 27 | 7 | Google Map, ~5 Q&A |
| [x] | Foreclosure Lawyer Dubuque, IA | `/foreclosure-lawyer-dubuque-ia/` | 1886 | 19 | 5 | Google Map |
| [x] | How to File Bankruptcy in Iowa | `/how-to-file-bankruptcy-in-iowa/` | 1875 | 22 | 8 |  |
| [x] | How to Stop Wage Garnishment Without Filing for Bankruptcy: Legal Options and Solutions | `/how-to-stop-wage-garnishment-without-filing-for-bankruptcy/` | 1635 | 14 | 5 | ~1 Q&A |
| [x] | Iowa Attorney for Debt Settlement | `/iowa-attorney-for-debt-settlement/` | 1496 | 20 | 5 | Google Map |
| [x] | Iowa Bankruptcy Exemptions | `/iowa-bankruptcy-exemptions/` | 2215 | 13 | 2 |  |
| [x] | Iowa Bankruptcy Laws | `/iowa-bankruptcy-laws/` | 1691 | 12 | 8 |  |
| [x] | Iowa Foreclosure Laws | `/iowa-foreclosure-laws/` | 1758 | 22 | 7 |  |
| [x] | Iowa Garnishment Laws | `/iowa-garnishment-laws/` | 1595 | 19 | 9 |  |
| [x] | Using the Iowa Homestead Exemption: A Simple Guide to Chapter 7 Bankruptcy | `/iowa-homestead-exemption-chapter-7-bankruptcy/` | 1870 | 16 | 7 |  |
| [x] | Iowa Stop Creditor Harassment Lawyer | `/iowa-stop-creditor-harassment-lawyer/` | 1753 | 22 | 5 | Google Map |
| [x] | What Happens If You Have a Late Mortgage in Chapter 13? | `/late-mortgage-in-chapter-13/` | 1916 | 16 | 6 |  |
| [x] | Navigating Priority Debts in Chapter 13 Bankruptcy for a Fresh Financial Start | `/priority-debts-chapter-13-bankruptcy/` | 1500 | 14 | 6 |  |
| [x] | Understanding Secured Debts in Bankruptcy | `/secured-debts-in-bankruptcy/` | 2134 | 23 | 6 |  |
| [x] | How to Stop Creditor Harassment: Insights From Henkels & Baker, PC | `/stop-creditor-harassment/` | 1800 | 16 | 9 |  |
| [x] | How to Stop a Garnishment in Iowa: Insights from Henkels & Baker, PC | `/stop-garnishment-iowa/` | 1963 | 25 | 10 |  |
| [x] | Student Loan Adversary Cases | `/student-loans/` | 2011 | 27 | 7 | Google Map |
| [x] | Tax Settlements Strategies for Effective Debt Resolution | `/tax-settlement/` | 1809 | 19 | 8 |  |
| [x] | Wage Garnishment Lawyer in Iowa | `/wage-garnishment-iowa/` | 2512 | 30 | 7 | Google Map |
| [x] | Wage Garnishment Lawyer Dubuque | `/wage-garnishment-lawyer-dubuque/` | 1885 | 21 | 5 | Google Map |
| [x] | What Assets Can I Keep if I File Bankruptcy | `/what-assets-can-i-keep-if-i-file-bankruptcy/` | 1158 | 17 | 6 |  |
| [x] | What Happens if Your Co-signer Files Chapter 7 Bankruptcy? | `/what-happens-co-signer-files-chapter-7/` | 1948 | 19 | 6 |  |

## Criminal defense & OWI — Dubuque / Iowa (26)

| Status | Title | URL | Words | Headings | Images | Notes |
|---|---|---|---:|---:|---:|---|
| [x] | Are OWI Checkpoints Illegal in Iowa | `/are-owi-checkpoints-illegal-in-iowa/` | 2059 | 19 | 8 |  |
| [x] | Can an OWI Conviction Be Expunged in Iowa? | `/can-an-owi-conviction-be-expunged-in-iowa/` | 1465 | 21 | 7 |  |
| [x] | Commercial Driver’s Licenses and OWI Charges | `/commercial-drivers-licenses-and-owi-charges/` | 1431 | 12 | 4 |  |
| [x] | Dubuque Criminal Defense Lawyer | `/criminal-defense/` | 2454 | 29 | 5 | Google Map, ~4 Q&A |
| [x] | Drug Crime Lawyer in Dubuque, IA | `/drug-crime-lawyer-dubuque-ia/` | 2123 | 27 | 5 | ~4 Q&A |
| [x] | Drug Distribution Lawyer Dubuque, IA | `/drug-distribution-lawyer-dubuque-ia/` | 1601 | 24 | 7 |  |
| [x] | Drug Possession Lawyer Dubuque, IA | `/drug-possession-lawyer-dubuque-ia/` | 1729 | 22 | 8 |  |
| [x] | Dubuque IA Felony Lawyer | `/dubuque-ia-felony-lawyer/` | 1859 | 18 | 5 | Google Map |
| [x] | Errors in Blood Testing for Alcohol or Drugs in Dubuque | `/errors-in-blood-testing-for-alcohol-or-drugs-in-dubuque/` | 1867 | 22 | 6 |  |
| [x] | How Long Does a DUI Stay on Your Record in Iowa? | `/how-long-dui-stays-on-record-iowa/` | 1357 | 24 | 8 |  |
| [x] | Iowa OWI First Offense Deferred Judgment: What You Need to Know | `/iowa-owi-first-offense-deferred-judgment/` | 2424 | 27 | 8 |  |
| [x] | Iowa OWI Ignition Interlock Defense Attorney | `/iowa-owi-ignition-interlock-defense-attorney/` | 2053 | 25 | 7 |  |
| [x] | Understanding Iowa OWI Laws and How Henkels & Baker, PC Can Help | `/iowa-owi-laws/` | 1412 | 19 | 7 |  |
| [x] | Iowa OWI Penalties for Second and Third Offenses: Protect Your Future | `/iowa-owi-penalties-second-third-offenses/` | 2154 | 25 | 7 |  |
| [x] | Misdemeanors Attorney in Dubuque, IA | `/misdemeanors-attorney-dubuque-ia/` | 1640 | 19 | 5 | Google Map |
| [x] | Dubuque IA OWI Attorneys | `/owi/` | 2043 | 25 | 5 | Google Map, ~4 Q&A |
| [x] | OWI First Offense Iowa: Penalties and Consequences Explained | `/owi-first-offense-iowa/` | 1545 | 17 | 5 |  |
| [x] | OWI Revocation Hearing Iowa | `/owi-revocation-hearing-iowa/` | 1515 | 24 | 6 |  |
| [x] | OWI Under 21 Defense Attorney in Iowa | `/owi-under-21-defense-attorney-in-iowa/` | 1709 | 24 | 6 |  |
| [x] | OWI With a Minor in the Vehicle Iowa | `/owi-with-minor-in-vehicle-iowa/` | 1654 | 18 | 7 | ~6 Q&A |
| [x] | Prescription Drug OWI Iowa | `/prescription-drug-owi-iowa/` | 1706 | 25 | 8 |  |
| [x] | Refusing a Breathalyzer Test in Iowa: Your Rights, Risks, and Legal Guidance | `/refuse-a-breathalyzer-test-in-iowa/` | 1571 | 14 | 6 |  |
| [x] | How Sealing a Conviction in Dubuque Can Help You Move Forward After a Conviction | `/sealing-conviction-dubuque/` | 2089 | 16 | 7 |  |
| [x] | Traffic Lawyer in Dubuque | `/traffic-lawyer-dubuque/` | 2195 | 31 | 7 | Google Map, ~5 Q&A |
| [x] | What is an OWI for Drugs? | `/what-is-an-owi-for-drugs/` | 1934 | 22 | 5 | ~3 Q&A |
| [x] | What Is the Penalty for a Driver Receiving Their First OWI in Iowa? | `/what-is-the-penalty-for-a-driver-receiving-their-first-owi/` | 1762 | 24 | 6 |  |

## Location landing pages (Davenport, Cedar Rapids, Iowa City, Johnson & Linn County) (27)

| Status | Title | URL | Words | Headings | Images | Notes |
|---|---|---|---:|---:|---:|---|
| [x] | Bankruptcy Attorney Cedar Rapids | `/bankruptcy-attorney-cedar-rapids-guide/` | 2275 | 26 | 5 |  |
| [x] | Bankruptcy lawyer in Davenport | `/bankruptcy-lawyer-in-davenport/` | 1484 | 21 | 5 |  |
| [x] | Bankruptcy Lawyers in Linn County, IA | `/bankruptcy-lawyers-linn-county-ia/` | 1578 | 25 | 5 |  |
| [x] | Chapter 7 Bankruptcy Attorney Cedar Rapids | `/cedar-rapids-chapter-7-lawyer-fresh-start-options/` | 2505 | 28 | 6 |  |
| [x] | OWI Attorney Cedar Rapids | `/cedar-rapids-owi-lawyer-what-you-need-to-know/` | 2267 | 25 | 6 | ~3 Q&A |
| [x] | Chapter 13 Bankruptcy Attorney Cedar Rapids | `/chapter-13-bankruptcy-attorney-cedar-rapids/` | 1565 | 25 | 6 |  |
| [x] | Chapter 13 Bankruptcy Attorney Davenport | `/chapter-13-bankruptcy-attorney-davenport/` | 2432 | 30 | 6 | ~4 Q&A |
| [x] | Chapter 7 Bankruptcy Attorney Davenport | `/chapter-7-bankruptcy-attorney-davenport/` | 1620 | 23 | 7 |  |
| [x] | Criminal Defense Attorney Davenport | `/criminal-defense-attorney-davenport/` | 2553 | 29 | 6 | ~3 Q&A |
| [x] | Criminal Defense Attorney Cedar Rapids | `/criminal-defense-lawyer-cedar-rapids/` | 2261 | 27 | 6 | ~4 Q&A |
| [x] | Davenport Debt Relief Lawyer | `/davenport-debt-relief-lawyer/` | 2143 | 28 | 4 | Google Map, ~5 Q&A |
| [x] | Davenport Debt Settlement Lawyer | `/davenport-debt-settlement-lawyer/` | 2011 | 26 | 5 | Google Map, ~6 Q&A |
| [x] | Drug Crime Attorney Cedar Rapids | `/drug-crime-attorney-cedar-rapids/` | 1607 | 23 | 5 |  |
| [x] | Drug Crime Lawyer Davenport | `/drug-crime-lawyer-davenport/` | 2061 | 25 | 5 | Google Map, ~5 Q&A |
| [x] | Linn County, IA DWI Attorney | `/dwi-lawyer-linn-county-iowa/` | 2384 | 28 | 6 |  |
| [x] | Felony OWI Lawyer Cedar Rapids | `/felony-owi-lawyer-cedar-rapids/` | 2353 | 30 | 6 | ~3 Q&A |
| [x] | First-Offense OWI Defense Lawyer Davenport | `/first-offense-owi-defense-lawyer-davenport/` | 1534 | 18 | 5 | Google Map |
| [x] | Foreclosure Defense Attorney Cedar Rapids | `/foreclosure-defense-attorney-cedar-rapids/` | 1439 | 22 | 7 |  |
| [x] | Foreclosure Defense Lawyer Davenport | `/foreclosure-defense-lawyer-davenport/` | 2330 | 31 | 5 | ~4 Q&A |
| [x] | Iowa City Criminal Defense Lawyer | `/iowa-city-criminal-defense-lawyer/` | 1601 | 22 | 8 |  |
| [x] | Johnson County Criminal Defense Lawyer | `/johnson-county-criminal-defense-lawyer/` | 2199 | 26 | 6 |  |
| [x] | Johnson County, IA Bankruptcy Lawyers | `/johnson-county-ia-bankruptcy-lawyers/` | 1559 | 18 | 5 | Google Map |
| [x] | Johnson County, IA DWI Attorney | `/johnson-county-ia-dwi-attorney/` | 1536 | 23 | 5 |  |
| [x] | Johnson County, IA Traffic Lawyer | `/johnson-county-ia-traffic-lawyer/` | 1722 | 24 | 7 |  |
| [x] | OWI Lawyer in Davenport, IA | `/owi-lawyer-in-davenport-ia/` | 2413 | 29 | 7 |  |
| [x] | Stop Wage Garnishment Davenport | `/stop-wage-garnishment-davenport/` | 1168 | 14 | 5 |  |
| [x] | Wage Garnishment Lawyer Cedar Rapids | `/wage-garnishment-lawyer-cedar-rapids/` | 1533 | 22 | 5 |  |

## Draft / test pages (not linked publicly) (3)

Unfinished WordPress drafts. Not carried over: they return the site’s 404 page (`[–]` = intentionally excluded).

| Status | Title | URL | Words | Headings | Images | Notes |
|---|---|---|---:|---:|---:|---|
| [–] | Homepage test | `/homepage-test/` | 2567 | 32 | 78 | Google Map, ~8 Q&A |
| [–] | Practice Page | `/practice-page/` | 1883 | 21 | 5 | Google Map |
| [–] | Resource Page | `/resource-page/` | 1609 | 14 | 7 |  |

## Blog posts (14)

Blog index at `/blog/`, each post at its original slug.

| Status | Title | URL | Words | Headings | Images | Notes |
|---|---|---|---:|---:|---:|---|
| [x] | Understanding the Automatic Stay in Bankruptcy: A Comprehensive Guide | `/automatic-stay-bankruptcy/` | 2041 | 21 | 0 | 2025-11-19 |
| [x] | Bankruptcy and Child Support in Dubuque | `/bankruptcy-child-support-dubuque/` | 1666 | 10 | 5 | 2025-10-15 |
| [x] | Budgeting After Bankruptcy | `/budgeting-after-bankruptcy-henkels-baker/` | 1732 | 15 | 0 | 2025-12-03 |
| [x] | Navigating Car Repossession After Chapter 7 Discharge / Henkels & Baker PC | `/car-repossession-after-chapter-7/` | 1895 | 18 | 0 | 2025-09-10 |
| [x] | Will I Lose My House If I File for Chapter 7 Bankruptcy? Understanding Your Rights | `/chapter-7-bankruptcy-keep-house/` | 1044 | 6 | 0 | 2025-11-05 |
| [x] | Debt Consolidation Iowa | `/debt-consolidation-iowa/` | 1382 | 12 | 0 | 2024-01-17 |
| [x] | Debt Relief Options in Iowa | `/debt-relief-options-iowa/` | 1415 | 13 | 0 | 2026-05-20 |
| [x] | Bankruptcy Myths | `/debunking-10-bankruptcy-myths-what-creditors-dont-want-you-to-know/` | 1392 | 25 | 0 | 2026-05-20 |
| [x] | Iowa Bankruptcy Courts | `/iowa-bankruptcy-courts/` | 1186 | 11 | 0 | 2023-09-14 |
| [x] | Iowa’s OWI 2-Hour Rule | `/iowa-owi-2-hour-rule/` | 1906 | 24 | 3 | 2026-07-24 |
| [x] | Understanding Chapter 13 Bankruptcy | `/pros-and-cons-of-converting-chapter-13-to-chapter-7/` | 1923 | 7 | 4 | 2025-06-20 |
| [x] | Home Equity Loan: Understanding Your Borrowing Options | `/understanding-home-equity-loans-henkels-baker/` | 1592 | 11 | 0 | 2025-10-08 |
| [x] | What’s the Difference Between DUI and OWI? | `/whats-the-difference-between-dui-and-owi-iowa/` | 2167 | 24 | 0 | 2026-03-26 |
| [x] | Why Shame is Keeping You from Filing Bankruptcy (and Why It Shouldn’t) | `/why-shame-is-keeping-you-from-filing-bankruptcy-and-why-it-shouldnt/` | 639 | 3 | 0 | 2023-05-23 |

## Known issues on the live site (kept as-is unless the firm decides otherwise)

- Three different phone numbers are used in different places; each is preserved in its original location.
- The post “Understanding Chapter 13 Bankruptcy” lives at `/pros-and-cons-of-converting-chapter-13-to-chapter-7/`.
- The menu links “Student Loan” to `/student-loan-forgiveness-lawyers/`, but the page that exists is `/student-loans/` — needs a redirect in the new site.
- Footer showed both “© 2023” and “© 2026”.
