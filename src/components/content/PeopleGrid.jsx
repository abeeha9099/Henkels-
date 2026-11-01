import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { attorneys, staff } from '../../data/people'
import Reveal from '../ui/Reveal'

/** Three attorney portraits linking to their profile pages. */
export function AttorneyCards() {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {attorneys.map((a, i) => (
        <Reveal as="li" key={a.slug} delay={i * 0.08} className={i === 1 ? 'lg:mt-16' : ''}>
          <Link to={`/attorneys/${a.slug}`} className="group block">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-mist">
              <img
                src={a.image}
                alt={`${a.name}, ${a.role}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-label text-xs font-bold tracking-[0.14em] text-brand uppercase">{a.role}</p>
                <h3 className="mt-1 font-display text-3xl text-ink group-hover:text-brand">{a.name}</h3>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 transition-all group-hover:rotate-45 group-hover:border-tan group-hover:bg-tan">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}

/** Support staff linking to their original bio pages. */
export function StaffGrid() {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
      {staff.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={(i % 5) * 0.06}>
          <Link to={`/${p.slug}`} className="group block">
            <div className="overflow-hidden rounded-[1.5rem] bg-mist">
              <img
                src={p.image}
                alt={`${p.name}, ${p.role}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-display text-xl text-ink group-hover:text-brand sm:text-2xl">{p.name}</h3>
            <p className="mt-0.5 font-label text-xs font-bold tracking-[0.12em] text-taupe uppercase">{p.role}</p>
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}
