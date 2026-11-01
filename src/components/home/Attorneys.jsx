import { attorneys } from '../../data/home'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { Display, Panel, Pill } from '../ui/Section'

export default function Attorneys() {
  return (
    <Panel tone="tan" labelledBy="attorneys-title" inner="py-20 sm:py-28 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Pill>Attorneys</Pill>
          <Display id="attorneys-title" className="mt-6 text-ink">
            Friendly Attorneys <span className="text-taupe">Who Care</span>
          </Display>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-lg text-cocoa">{attorneys.intro}</p>
        </Reveal>
      </div>

      <div className="mt-16 space-y-16 lg:mt-24 lg:space-y-24">
        {attorneys.people.map((person, i) => {
          const flip = i % 2 === 1
          return (
            <article key={person.name} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
                <img
                  src={person.image}
                  alt={`${person.name}, ${person.role}`}
                  width="512"
                  height="512"
                  loading="lazy"
                  className={`aspect-[4/5] w-full max-w-md rounded-[2rem] object-cover object-top ${flip ? 'lg:ml-auto' : ''}`}
                />
              </Reveal>
              <Reveal delay={0.1} className={`lg:col-span-6 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
                <p className="flex items-center gap-4 font-label text-xs font-bold tracking-[0.16em] text-brand uppercase">
                  <span className="font-display text-5xl font-normal tracking-normal text-tan">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-px w-10 bg-tan/50" aria-hidden="true" />
                  {person.role}
                </p>
                <h3 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">{person.name}</h3>
                <p className="mt-6 text-lg leading-relaxed text-cocoa">{person.bio}</p>
              </Reveal>
            </article>
          )
        })}
      </div>

      <Reveal className="mt-16 lg:mt-20">
        <Button to="/about" variant="dark" arrow>
          Learn More
        </Button>
      </Reveal>
    </Panel>
  )
}
