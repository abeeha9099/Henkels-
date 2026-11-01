import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { firm } from '../../data/site'
import { services } from '../../data/home'
import Reveal from '../ui/Reveal'
import { Display, Panel, Pill } from '../ui/Section'

export default function Practice() {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <Panel labelledBy="practice-title" inner="py-20 sm:py-28 lg:py-32">
      {/* Seedling photo from the original About page, toned into the brand's ink and teal */}
      <img
        src="/images/seedling.webp"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30 grayscale"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-ink/90 to-brand-dark/70" aria-hidden="true" />

      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Pill tone="light">Practice areas</Pill>
          <Display id="practice-title" className="mt-6 text-white">
            Dubuque <span className="text-tan">Bankruptcy Attorneys</span>
          </Display>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-lg text-white/70">{firm.tagline}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
        {/* Sticky preview that follows the hovered practice area (desktop) */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={current.image}
                src={current.image}
                alt=""
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden="true" />
            <p className="absolute bottom-6 left-6 font-display text-[7rem] leading-none text-white/90" aria-hidden="true">
              {String(active + 1).padStart(2, '0')}
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {services.map((service, i) => {
            const isActive = active === i
            return (
              <Reveal
                as="li"
                key={service.title}
                delay={i * 0.08}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                className="border-t border-white/15 py-8 last:border-b sm:py-10"
              >
                <div className="flex items-start gap-5 sm:gap-8">
                  <span
                    className={`pt-3 font-label text-sm font-bold tracking-[0.16em] transition-colors ${isActive ? 'text-tan' : 'text-white/40'}`}
                  >
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3>
                      <Link
                        to={service.to}
                        className={`group/title inline-flex items-center gap-4 font-display text-4xl leading-none text-white transition-transform duration-500 sm:text-5xl lg:text-6xl ${
                          isActive ? 'lg:translate-x-2' : ''
                        }`}
                      >
                        {service.title}
                        <span
                          className={`grid size-11 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                            isActive ? 'rotate-45 bg-tan text-ink' : 'bg-white/10 text-white'
                          }`}
                          aria-hidden="true"
                        >
                          <ArrowUpRight className="size-5" />
                        </span>
                      </Link>
                    </h3>
                    <img
                      src={service.image}
                      alt=""
                      loading="lazy"
                      className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover lg:hidden"
                    />
                    <p className="mt-5 max-w-xl text-white/70">{service.text}</p>
                    {service.links.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${service.title} services`}>
                        {service.links.map((link) => (
                          <li key={link.to}>
                            <Link
                              to={link.to}
                              className="inline-block rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/80 transition-colors hover:border-white hover:bg-white hover:text-ink"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </Panel>
  )
}
