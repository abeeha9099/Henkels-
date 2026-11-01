import { Link } from 'react-router-dom'
import { ArrowUpRight, Phone } from 'lucide-react'
import { firm } from '../../data/site'
import { formatPhone } from '../../content/content'
import Button from '../ui/Button'

/** Sticky sidebar for long pages: consultation card plus related links. */
export default function Sidebar({ phone, related = [], relatedTitle = 'Related pages', moreLink }) {
  const callUs = phone || firm.phone.href.replace('tel:', '')
  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <div className="rounded-[1.75rem] bg-ink p-7 text-white">
        <p className="font-label text-xs font-bold tracking-[0.16em] text-tan uppercase">Free Case Evaluations</p>
        <a href={`tel:${callUs}`} className="mt-4 flex items-center gap-3 font-display text-3xl hover:text-tan">
          <Phone className="size-5 text-tan" aria-hidden="true" />
          {formatPhone(callUs)}
        </a>
        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-t border-white/10 pt-5 text-sm">
          {firm.hours.map((h) => (
            <div key={h.days} className="contents">
              <dt className="text-white">{h.days}</dt>
              <dd className="text-white/60">{h.time}</dd>
            </div>
          ))}
        </dl>
        <Button to="/contact" arrow className="mt-6 w-full justify-between">
          Free Case Evaluations
        </Button>
      </div>

      {related.length > 0 && (
        <nav aria-label={relatedTitle} className="rounded-[1.75rem] bg-mist p-7">
          <p className="font-label text-xs font-bold tracking-[0.16em] text-taupe uppercase">{relatedTitle}</p>
          <ul className="mt-4 divide-y divide-ink/10">
            {related.map((item) => (
              <li key={item.slug}>
                <Link to={`/${item.slug}`} className="group flex items-start justify-between gap-3 py-3 text-sm text-ink hover:text-brand">
                  {item.menuTitle || item.title}
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 opacity-40 transition-all group-hover:rotate-45 group-hover:opacity-100" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          {moreLink && (
            <Link to={moreLink.to} className="mt-4 inline-block text-sm font-medium text-brand hover:text-brand-dark">
              {moreLink.label} →
            </Link>
          )}
        </nav>
      )}
    </aside>
  )
}
