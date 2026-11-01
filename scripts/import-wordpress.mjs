// Imports pages and posts from the live henkelsbaker.com WordPress REST API (read-only)
// and converts the Divi markup into clean content blocks for the React site.
//
//   npm run import                 fetch from the live site
//   npm run import -- <dir>        use a folder of saved API responses (pages-1.json, posts-1.json, media-*.json …)
//
// Output: public/content/<slug>.json (one per page/post) and src/content/index.json (bundled list).

import fs from 'node:fs'
import path from 'node:path'
import * as cheerio from 'cheerio'

const API = 'https://www.henkelsbaker.com/wp-json/wp/v2'
const SITE = /^https?:\/\/(www\.)?henkelsbaker\.com/i
const ROOT = path.resolve(import.meta.dirname, '..')
const OUT_PAGES = path.join(ROOT, 'public/content')
const OUT_INDEX = path.join(ROOT, 'src/content/index.json')

// Unfinished WordPress drafts that are not part of the public site.
const SKIP = new Set(['homepage-test', 'practice-page', 'resource-page'])
// Pages rebuilt by hand in React; their content is still exported for reference and reuse.
const TEAM = new Set(['hannah-seiler', 'jamie', 'kylie', 'asia-oleskow', 'teri-hooper', 'lauren-klein', 'tabitha', 'vance-koehler', 'hillary-baker', 'lynsey-freiburger'])
const CORE = new Set(['home', 'about', 'contact', 'testimonials', 'reviews', 'blog', 'privacy-policy', 'terms-of-service', 'thank-you', 'pay-toward-bankruptcy'])
const LOCATION = /davenport|cedar-rapids|iowa-city|johnson-county|linn-county/
const CRIMINAL = /owi|dui|dwi|drug|criminal|felony|misdemeanor|traffic|breathalyzer|blood-testing|checkpoint|conviction|interlock|commercial-drivers|sealing/

async function load(dir, type) {
  if (dir) {
    return fs
      .readdirSync(dir)
      .filter((f) => f.startsWith(`${type}-`) && f.endsWith('.json'))
      .sort()
      .flatMap((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
  }
  const items = []
  for (let page = 1; ; page++) {
    const res = await fetch(`${API}/${type}?per_page=100&page=${page}`)
    if (!res.ok) break
    const batch = await res.json()
    items.push(...batch)
    if (batch.length < 100) break
  }
  return items
}

const decode = (s) => cheerio.load(`<p>${s}</p>`)('p').text()
const clean = (s) => s.replace(/\s+/g, ' ').trim()

function localPath(href) {
  if (!href || !SITE.test(href) || /wp-content|wp-json/.test(href)) return href
  const p = href.replace(SITE, '').replace(/[?#].*$/, '').replace(/\/+$/, '')
  return p || '/'
}

function groupOf(slug, type) {
  if (type === 'post') return 'blog'
  if (CORE.has(slug)) return 'core'
  if (TEAM.has(slug)) return 'team'
  if (LOCATION.test(slug)) return 'location'
  if (CRIMINAL.test(slug)) return 'criminal'
  return 'bankruptcy'
}

/** Turns one WordPress page/post into { title, tagline, heroPhone, blocks, schema }. */
function convert(rawHtml) {
  const html = rawHtml.replace(/\[\/?et_pb_[^\]]*\]/g, '')
  const $ = cheerio.load(html, null, false)
  const schema = []
  const special = []
  const mark = (block) => `<hb-block data-i="${special.push(block) - 1}"></hb-block>`

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      schema.push(JSON.parse($(el).text()))
    } catch {
      /* ignore malformed schema */
    }
  })
  $('.et_pb_code_inner').each((_, el) => {
    const text = $(el).text().trim()
    if (text.startsWith('{') && text.includes('schema.org')) {
      try {
        schema.push(JSON.parse(text))
      } catch {
        /* ignore malformed schema */
      }
      $(el).remove()
    }
  })
  $('script, style, noscript, meta, link').remove()

  // /bankruptcy embeds a copy of the old site footer (address, hours, agency ad).
  // The new site has its own footer, so that section is dropped.
  $('a[href*="goconstellation.com"]').closest('.et_pb_section').remove()

  // Lazy-loaded images keep the real URL in a data attribute.
  $('img').each((_, el) => {
    const real = $(el).attr('data-lazy-src') || $(el).attr('data-src')
    if (real) $(el).attr('src', real)
  })

  // Hero: the first section holding the H1, tagline and the two hero buttons.
  let title = ''
  let tagline = ''
  let heroPhone = ''
  const h1 = $('h1').first()
  if (h1.length) {
    title = clean(h1.text())
    const hero = h1.closest('.et_pb_section')
    if (hero.length && hero.find('h1').length) {
      heroPhone = (hero.find('a[href^="tel:"]').attr('href') || '').replace('tel:', '')
      tagline = clean(hero.find('.et_pb_text_inner').first().text())
      if (hero.find('.et_pb_text_inner').length > 1 || hero.find('h2, h3').length) {
        // Hero holds more than the title: keep the rest, drop only title and buttons.
        h1.closest('.et_pb_post_title, .et_pb_module').remove()
        hero.find('.et_pb_button_module_wrapper').remove()
        tagline = ''
      } else {
        hero.remove()
      }
    } else {
      h1.remove()
    }
  }

  // Google Map embeds become one map block.
  $('iframe').each((_, el) => {
    const replacement = ($(el).attr('src') || '').includes('google.com/maps') ? mark({ type: 'map' }) : ''
    const wrapper = $(el).closest('.et_pb_code, .et_pb_module')
    if (wrapper.length) wrapper.replaceWith(replacement)
    else $(el).replaceWith(replacement)
  })

  // Short client reviews shown as blurbs with a 5-star image.
  $('.et_pb_blurb').each((_, el) => {
    const blurb = $(el)
    if (!blurb.find('img[src*="5star"]').length) return
    const name = clean(blurb.find('h4').text())
    blurb.find('h4, img').remove()
    blurb.replaceWith(mark({ type: 'review', name, text: clean(blurb.text()) }))
  })

  // Testimonial modules: “quote” - Name
  $('.et_pb_testimonial').each((_, el) => {
    const text = clean($(el).text())
    const m = text.match(/^[“"](.*)[”"]\s*[-–—]\s*(.+)$/s)
    $(el).replaceWith(mark({ type: 'testimonial', text: m ? m[1].trim() : text, name: m ? m[2].trim() : '' }))
  })

  // Buttons: hero-style "Free Case Evaluations" / "Call Us" pairs become a CTA block,
  // other buttons stay as links.
  $('.et_pb_button_module_wrapper').each((_, el) => {
    const a = $(el).find('a').first()
    const label = clean(a.text())
    const href = a.attr('href') || ''
    if (/free case evaluation/i.test(label)) $(el).replaceWith(mark({ type: 'cta' }))
    else if (/^call us$/i.test(label)) $(el).replaceWith(mark({ type: 'cta', phone: href.replace('tel:', '') }))
    else $(el).replaceWith(`<p><a data-button href="${href}">${label}</a></p>`)
  })

  // Flatten Divi wrappers and strip presentational attributes.
  $('div, span, section, article, font, center, footer').each((_, el) => {
    $(el).replaceWith($(el).contents())
  })
  $('*').each((_, el) => {
    const keep = { a: ['href', 'data-button'], img: ['src', 'alt'], td: ['colspan', 'rowspan'], th: ['colspan', 'rowspan'], 'hb-block': ['data-i'] }[el.tagName] || []
    for (const attr of Object.keys(el.attribs || {})) if (!keep.includes(attr)) $(el).removeAttr(attr)
  })
  $('a').each((_, el) => {
    const href = $(el).attr('href')
    if (!href) return $(el).replaceWith($(el).contents())
    $(el).attr('href', localPath(href))
  })
  $('img').each((_, el) => {
    const src = $(el).attr('src') || ''
    if (!src || src.startsWith('data:') || /5star|branding-google/.test(src)) $(el).remove()
  })
  $('p, h2, h3, h4, h5, h6, li, ul, ol, strong, b, em').each((_, el) => {
    if (!$(el).text().trim() && !$(el).find('img, hb-block').length) $(el).remove()
  })

  // Split the flat HTML on block markers and merge neighbouring special blocks.
  const blocks = []
  const push = (block) => {
    const last = blocks[blocks.length - 1]
    if (block.type === 'html') {
      const body = block.html.replace(/<p>\s*<\/p>/g, '').trim()
      if (!body || !cheerio.load(body).root().text().trim() && !/<img/.test(body)) return
      block.html = body
    }
    if (last && block.type === 'cta' && last.type === 'cta') {
      last.phone ||= block.phone
      return
    }
    if (last && (block.type === 'review' || block.type === 'testimonial') && last.type === `${block.type}s`) {
      last.items.push({ name: block.name, text: block.text })
      return
    }
    if (block.type === 'review' || block.type === 'testimonial') {
      blocks.push({ type: `${block.type}s`, items: [{ name: block.name, text: block.text }] })
      return
    }
    blocks.push(block)
  }
  for (const part of $.html().split(/(<hb-block data-i="\d+"><\/hb-block>)/)) {
    const m = part.match(/data-i="(\d+)"/)
    push(m ? { ...special[Number(m[1])] } : { type: 'html', html: part })
  }

  // Pull FAQ sections (an H2 mentioning FAQ / Frequently Asked Questions followed by H3 questions) into FAQ blocks.
  const out = []
  for (const block of blocks) {
    if (block.type !== 'html' || !/<h2>[^<]*(FAQ|Frequently Asked)/i.test(block.html)) {
      out.push(block)
      continue
    }
    const $$ = cheerio.load(block.html, null, false)
    const nodes = $$.root().contents().toArray()
    let before = ''
    let after = ''
    let faq = null
    let current = null
    for (const node of nodes) {
      const tag = node.tagName
      const text = $$(node).text().trim()
      if (!faq && tag === 'h2' && /(FAQ|Frequently Asked)/i.test(text)) {
        faq = { type: 'faq', title: text, items: [] }
        continue
      }
      if (!faq) {
        before += $$.html(node)
      } else if (tag === 'h2' && faq.items.length) {
        after += $$.html(node)
        faq.done = true
      } else if (faq.done) {
        after += $$.html(node)
      } else if (tag === 'h3') {
        current = { q: text.replace(/^\d+\.\s*/, ''), a: '' }
        faq.items.push(current)
      } else if (current) {
        current.a += $$.html(node)
      } else {
        before += $$.html(node)
      }
    }
    if (before.trim()) out.push({ type: 'html', html: before.trim() })
    if (faq?.items.length) {
      delete faq.done
      faq.items.forEach((item) => (item.a = item.a.trim()))
      out.push(faq)
    } else if (faq) out.push({ type: 'html', html: `<h2>${faq.title}</h2>` })
    if (after.trim()) out.push({ type: 'html', html: after.trim() })
  }

  // A "Client Reviews" heading right before a reviews block becomes the block title.
  for (let i = 0; i < out.length - 1; i++) {
    if (out[i].type === 'html' && out[i + 1].type === 'reviews') {
      const m = out[i].html.match(/<h2>([^<]*Reviews[^<]*)<\/h2>\s*$/i)
      if (m) {
        out[i + 1].title = m[1]
        out[i].html = out[i].html.slice(0, m.index).trim()
      }
    }
  }

  if (tagline === title) tagline = ''
  return { title, tagline, heroPhone, blocks: out.filter((b) => b.type !== 'html' || b.html), schema }
}

/** Google reviews list on /reviews (BNE Testimonials plugin markup). */
function parseGoogleReviews(rawHtml) {
  const $ = cheerio.load(rawHtml)
  const summary = clean($('.et_pb_code_inner').first().text())
  const items = []
  // Each review carries schema.org microdata: author name, date, rating and body.
  $('[itemprop="review"]').each((_, el) => {
    const node = $(el)
    const name = node.find('[itemprop="author"] meta[itemprop="name"]').attr('content') || ''
    const date = node.find('meta[itemprop="datePublished"]').attr('content') || ''
    const rating = Number(node.find('meta[itemprop="ratingValue"]').attr('content') || 5)
    const text = node
      .find('[itemprop="reviewBody"]')
      .find('p')
      .toArray()
      .map((p) => clean($(p).text()))
      .filter(Boolean)
      .join('\n\n') || clean(node.find('[itemprop="reviewBody"]').text())
    const avatar = node.find('img[src*="googleusercontent"]').attr('src') || ''
    if (name && text && !items.some((i) => i.name === name && i.text === text)) items.push({ name, date, rating, text, avatar })
  })
  return { summary, items }
}

const dir = process.argv[2]
const [pages, posts, media, categories] = await Promise.all(['pages', 'posts', 'media', 'categories'].map((t) => load(dir, t)))
const mediaUrl = Object.fromEntries(media.map((m) => [m.id, m.source_url]))
const categoryName = Object.fromEntries(categories.map((c) => [c.id, decode(c.name)]))

// Convert everything first; existing output is only replaced once all items succeed.
const index = []
const docs = []
for (const item of [...pages, ...posts]) {
  if (item.status !== 'publish' || SKIP.has(item.slug) || item.slug === 'home') continue
  const type = item.type === 'post' ? 'post' : 'page'
  const converted = convert(item.content.rendered)
  const excerpt = clean(cheerio.load(item.excerpt?.rendered || '').text()).replace(/\s*\[…\]$|\s*Read more$/i, '')
  const entry = {
    slug: item.slug,
    type,
    group: groupOf(item.slug, type),
    title: converted.title,
    // WordPress titles sometimes end in "| Henkels & Baker, PC"; the site adds the brand itself.
    menuTitle: decode(item.title.rendered).replace(/\s*[|–-]\s*Henkels\s*&\s*Baker,?\s*P\.?C\.?\s*$/i, ''),
    date: item.date,
    modified: item.modified,
    image: mediaUrl[item.featured_media] || '',
    category: type === 'post' ? (item.categories || []).map((c) => categoryName[c]).filter(Boolean)[0] || '' : '',
    excerpt: excerpt.slice(0, 300),
  }
  // Pages without an H1 (blog posts) use the cleaned WordPress title.
  entry.title ||= entry.menuTitle
  if (entry.group === 'team') {
    // Bio pages: portrait, then the name (H2) and job title (first paragraph after it).
    const $ = cheerio.load(converted.blocks.map((b) => b.html || '').join(''), null, false)
    // Pages with unrendered shortcodes keep the photo URL inside the shortcode text.
    const shortcodeImage = item.content.rendered.match(/src=[^h]{0,10}(https:\/\/www\.henkelsbaker\.com\/wp-content\/uploads\/[^&"'\s]+\.(?:jpe?g|png|webp))/i)
    entry.image = $('img').first().attr('src') || shortcodeImage?.[1] || entry.image
    entry.title = clean($('h2').first().text()) || entry.title
    entry.role = clean($('h2').first().nextAll('p').first().text())
  }
  const doc = { ...entry, ...converted, title: entry.title }
  if (item.slug === 'reviews') doc.googleReviews = parseGoogleReviews(item.content.rendered)
  docs.push(doc)
  index.push(entry)
}

fs.rmSync(OUT_PAGES, { recursive: true, force: true })
fs.mkdirSync(OUT_PAGES, { recursive: true })
fs.mkdirSync(path.dirname(OUT_INDEX), { recursive: true })
for (const doc of docs) fs.writeFileSync(path.join(OUT_PAGES, `${doc.slug}.json`), JSON.stringify(doc))

index.sort((a, b) => (a.type === b.type ? a.slug.localeCompare(b.slug) : a.type.localeCompare(b.type)))
fs.writeFileSync(OUT_INDEX, JSON.stringify(index, null, 1))
const counts = index.reduce((acc, e) => ({ ...acc, [e.group]: (acc[e.group] || 0) + 1 }), {})
console.log(`Imported ${index.length} items`, counts)
