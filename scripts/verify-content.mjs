// Checks that the imported content keeps every sentence of the original WordPress pages.
//   npm run verify:content -- <dir with saved API responses>
import fs from 'node:fs'
import path from 'node:path'
import * as cheerio from 'cheerio'

const dir = process.argv[2]
const ROOT = path.resolve(import.meta.dirname, '..')
const items = fs
  .readdirSync(dir)
  .filter((f) => /^(pages|posts)-\d+\.json$/.test(f))
  .flatMap((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9$%]+/g, ' ').trim()

function originalSentences(html) {
  const $ = cheerio.load(html.replace(/\[\/?et_pb_[^\]]*\]/g, ''))
  $('script, style, noscript, iframe, .et_pb_button_module_wrapper').remove()
  // Same rule as the importer: the embedded copy of the old site footer is not page content.
  $('a[href*="goconstellation.com"]').closest('.et_pb_section').remove()
  $('.et_pb_code_inner').each((_, el) => {
    if (/schema\.org|jQuery/.test($(el).text())) $(el).remove()
  })
  $('p, li, h1, h2, h3, h4, h5, h6, td, th, br, div').after('\n')
  return $.root()
    .text()
    .split(/\n|(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => norm(s).split(' ').length >= 4)
}

function importedText(doc) {
  const parts = [doc.title, doc.tagline]
  for (const b of doc.blocks) {
    if (b.html) parts.push(cheerio.load(b.html).root().text())
    if (b.title) parts.push(b.title)
    for (const i of b.items || []) parts.push(i.q, cheerio.load(i.a || '').root().text(), i.name, i.text)
  }
  for (const r of doc.googleReviews?.items || []) parts.push(r.name, r.text)
  if (doc.googleReviews?.summary) parts.push(doc.googleReviews.summary)
  return norm(parts.filter(Boolean).join(' '))
}

let checked = 0
let missingTotal = 0
for (const item of items) {
  const file = path.join(ROOT, 'public/content', `${item.slug}.json`)
  if (!fs.existsSync(file)) continue
  const doc = JSON.parse(fs.readFileSync(file, 'utf8'))
  const text = importedText(doc)
  const missing = originalSentences(item.content.rendered).filter((s) => !text.includes(norm(s)))
  checked++
  if (missing.length) {
    missingTotal += missing.length
    console.log(`\n${item.slug}: ${missing.length} sentence(s) missing`)
    missing.slice(0, 5).forEach((s) => console.log(`  - ${s.slice(0, 120)}`))
  }
}
console.log(`\nChecked ${checked} pages/posts. Missing sentences: ${missingTotal}`)
process.exitCode = missingTotal ? 1 : 0
