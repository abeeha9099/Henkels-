import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { team } from '../../data/home'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import Section, { Display, Pill } from '../ui/Section'

// Staggered vertical offsets give the portrait row an editorial rhythm on large screens.
const offsets = ['lg:mt-0', 'lg:mt-24', 'lg:mt-10', 'lg:mt-32']

export default function Team() {
  return (
    <Section labelledBy="team-title" className="border-t border-ink/10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <Pill>Our people</Pill>
          <Display id="team-title" className="mt-6 max-w-3xl text-ink">
            Your Dedicated <em className="text-brand not-italic">Legal Team</em>
          </Display>
        </Reveal>
        <Reveal delay={0.1}>
          <Button to="/about" variant="outlineDark" arrow>
            Read more about us
          </Button>
        </Reveal>
      </div>

      <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-20 lg:grid-cols-4">
        {team.map((person, i) => (
          <Reveal as="li" key={person.name} delay={i * 0.08} className={offsets[i]}>
            <Link to={person.to} className="group block">
              <div className="overflow-hidden rounded-[1.5rem] bg-mist">
                <img
                  src={person.image}
                  alt={`${person.name}, Henkels & Baker team member`}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-display text-2xl text-ink sm:text-3xl">{person.name}</h3>
                <ArrowUpRight
                  className="size-5 text-body transition-all duration-300 group-hover:rotate-45 group-hover:text-brand"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-1 font-label text-xs font-bold tracking-[0.14em] text-taupe uppercase">Read more about us</p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
