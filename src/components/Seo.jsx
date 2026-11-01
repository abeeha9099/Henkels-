import { firm } from '../data/site'

/**
 * Per-page meta tags. React 19 hoists <title>, <meta> and <link> into <head>.
 */
export default function Seo({ title, description, path = '/', jsonLd }) {
  const url = `${firm.url}${path}`
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={firm.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${firm.url}/images/hero.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}
