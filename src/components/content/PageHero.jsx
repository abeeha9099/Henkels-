import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Phone } from 'lucide-react'
import { firm } from '../../data/site'
import { formatPhone } from '../../content/content'
import Button from '../ui/Button'
import { Panel, Pill } from '../ui/Section'

const ease = [0.22, 1, 0.36, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/55">
        {items.map((item, i) => (
          <li key={item.label} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3" aria-hidden="true" />}
            {item.to ? (
              <Link to={item.to} className="hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white/80">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Dark inset hero used on every inner page. Pass `image` for a picture beside the
 * title, `phone` (digits) for the page's own "Call Us" number, and `actions={false}`
 * to hide the buttons.
 */
export default function PageHero({ eyebrow, title, tagline, image, imageAlt = '', phone, breadcrumbs, meta, actions = true, children }) {
  const callUs = phone || firm.phone.href.replace('tel:', '')
  return (
    <Panel labelledBy="page-title" inner="pt-10 pb-14 sm:pt-12 sm:pb-20 lg:pb-24">
      <div className="pointer-events-none absolute -top-48 right-[-15%] -z-10 size-[40rem] rounded-full bg-brand/25 blur-[120px]" aria-hidden="true" />

      {breadcrumbs && (
        <motion.div {...rise(0)}>
          <Breadcrumbs items={breadcrumbs} />
        </motion.div>
      )}

      <div className={`mt-10 grid gap-12 sm:mt-14 ${image ? 'lg:grid-cols-12 lg:items-end' : ''}`}>
        <div className={image ? 'lg:col-span-7' : 'max-w-5xl'}>
          {eyebrow && (
            <motion.div {...rise(0.05)}>
              <Pill tone="light">{eyebrow}</Pill>
            </motion.div>
          )}
          <motion.h1
            {...rise(0.1)}
            id="page-title"
            className="mt-6 font-display text-[2.6rem] leading-[1] font-medium tracking-[-0.025em] text-white sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          {tagline && (
            <motion.p {...rise(0.18)} className="mt-6 max-w-2xl font-display text-xl leading-snug text-white/70 sm:text-2xl">
              {tagline}
            </motion.p>
          )}
          {meta && (
            <motion.div {...rise(0.22)} className="mt-6">
              {meta}
            </motion.div>
          )}
          {actions && (
            <motion.div {...rise(0.26)} className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact" arrow>
                Free Case Evaluations
              </Button>
              <Button href={`tel:${callUs}`} variant="outlineLight">
                <Phone className="size-4" aria-hidden="true" />
                Call Us
                <span className="hidden sm:inline">· {formatPhone(callUs)}</span>
              </Button>
            </motion.div>
          )}
          {children}
        </div>

        {image && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="lg:col-span-5"
          >
            <img
              src={image}
              alt={imageAlt}
              className="aspect-[4/3] w-full rounded-[2rem] object-cover ring-1 ring-white/10"
              fetchPriority="high"
            />
          </motion.div>
        )}
      </div>
    </Panel>
  )
}
