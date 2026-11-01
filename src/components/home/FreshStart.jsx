import { Phone } from 'lucide-react'
import { firm } from '../../data/site'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { Panel } from '../ui/Section'

export default function FreshStart() {
  return (
    <Panel tone="mist" labelledBy="fresh-start-title" className="mt-2 sm:mt-3" inner="py-24 sm:py-32 lg:py-44">
      {/* Meadow photo from the original homepage hero */}
      <img
        src="/images/hero.webp"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white/85 via-white/70 to-white/20 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/70 lg:to-white/0"
        aria-hidden="true"
      />

      <Reveal className="max-w-4xl">
        <h2
          id="fresh-start-title"
          className="font-display text-[2.75rem] leading-[0.98] font-medium tracking-[-0.03em] text-ink sm:text-7xl lg:text-[6.5rem]"
        >
          A Fresh Start Is Possible. <span className="text-brand">Let Us Guide You.</span>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/contact" variant="primary" arrow>
            Free Case Evaluations
          </Button>
          <Button href={firm.phone.href} variant="outlineDark" className="bg-white/70 backdrop-blur">
            <Phone className="size-4 text-brand" aria-hidden="true" />
            {firm.phone.display}
          </Button>
        </div>
      </Reveal>
    </Panel>
  )
}
