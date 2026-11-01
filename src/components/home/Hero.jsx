import { motion } from 'framer-motion'
import { Check, Phone } from 'lucide-react'
import { firm } from '../../data/site'
import { heroAttorney, stats, valuePoints } from '../../data/home'
import Button from '../ui/Button'
import Stars from '../ui/Stars'
import { Panel, Pill } from '../ui/Section'
import CountUp from '../ui/CountUp'

const ease = [0.22, 1, 0.36, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
})

const heroStats = [{ value: String(firm.founded), label: 'Year established', plain: true }, ...stats]

export default function Hero() {
  return (
    <Panel labelledBy="hero-title" inner="pt-12 pb-6 sm:pt-16 lg:pt-20">
      {/* Teal glow behind the portrait */}
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 size-[44rem] rounded-full bg-brand/30 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-10%] -z-10 size-[28rem] rounded-full bg-tan/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 lg:pb-16">
          <motion.div {...rise(0)}>
            <Pill tone="light">
              Since {firm.founded} · {firm.address.city}, {firm.address.region}
            </Pill>
          </motion.div>

          <motion.h1
            {...rise(0.1)}
            id="hero-title"
            className="mt-8 font-display text-[3.1rem] leading-[0.95] font-medium tracking-[-0.03em] text-white sm:text-7xl lg:text-[6.25rem] xl:text-[7rem]"
          >
            Bankruptcy Attorneys <span className="text-tan">in Dubuque, IA</span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-8 max-w-md font-display text-2xl leading-snug text-white/75 sm:text-[1.75rem]">
            You Deserve a Fresh Start.
            <br />
            We Can Help.
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button to="/contact" arrow>
              Free Case Evaluations
            </Button>
            <Button href={firm.callUsPhone.href} variant="outlineLight">
              <Phone className="size-4" aria-hidden="true" />
              Call Us
            </Button>
          </motion.div>

          <motion.ul {...rise(0.4)} className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {valuePoints.map((point) => (
              <li key={point} className="inline-flex items-center gap-2 font-label text-sm font-semibold text-white/80">
                <Check className="size-4 text-tan" aria-hidden="true" />
                {point}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
        >
          <figure className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl ring-1 ring-white/10">
            <img
              src={heroAttorney.image}
              alt={`${heroAttorney.name}, ${heroAttorney.role} at ${firm.name}`}
              width="1100"
              height="1375"
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden="true" />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-ink/60 px-4 py-2 text-xs text-white backdrop-blur-md">
              <span className="font-semibold">{heroAttorney.name}</span>
              <span className="text-white/60"> · {heroAttorney.role}</span>
            </figcaption>
          </figure>

          <motion.a
            href="#reviews"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="relative mt-4 block rounded-2xl border border-white/15 bg-white/5 p-4 text-white transition-colors hover:bg-white/10 sm:absolute sm:top-[18%] sm:-left-10 sm:mt-0 sm:w-56 sm:bg-ink/55 sm:shadow-lift sm:backdrop-blur-xl sm:hover:bg-ink/70 lg:-left-16"
          >
            <span className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-full bg-white font-display text-lg font-bold text-ink" aria-hidden="true">
                G
              </span>
              <span className="text-right">
                <Stars className="size-3" />
                <span className="block text-[0.6875rem] text-white/60">{firm.reviews.count} reviews</span>
              </span>
            </span>
            <span className="mt-3 block font-display text-xl">{firm.reviews.rating}</span>
            <span className="block text-xs text-white/60">Based on {firm.reviews.count} reviews · Posted on Google</span>
          </motion.a>
        </motion.div>
      </div>

      {/* 1px gaps over a hairline background draw the dividers between stats */}
      <dl className="relative mt-6 grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 lg:mt-0 lg:grid-cols-4">
        {heroStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            {...rise(0.5 + i * 0.08)}
            className="flex flex-col-reverse gap-1 bg-ink py-6 pr-4 sm:py-8 [&:nth-child(even)]:pl-5 sm:[&:nth-child(even)]:pl-8 lg:[&:not(:first-child)]:pl-8"
          >
            <dt className="font-label text-[0.6875rem] font-bold tracking-[0.16em] text-white/55 uppercase">{stat.label}</dt>
            <dd className="font-display text-[1.75rem] leading-tight text-white sm:text-4xl">
              {stat.plain ? stat.value : <CountUp value={stat.value} />}
            </dd>
          </motion.div>
        ))}
      </dl>
    </Panel>
  )
}
