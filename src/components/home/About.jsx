import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { firm } from '../../data/site'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import Section, { Display, Pill } from '../ui/Section'

export default function About() {
  const photo = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: photo, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])

  return (
    <Section labelledBy="about-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-6">
          <Pill>About the firm</Pill>
          <Display id="about-title" className="mt-6 text-ink">
            About Our Dubuque Bankruptcy Lawyers
          </Display>
        </Reveal>

        <Reveal delay={0.1} className="space-y-6 lg:col-span-5 lg:col-start-8 lg:pt-16">
          <p className="text-xl leading-relaxed text-ink">
            As soon as you walk through our door, you’ll notice that {firm.name} is a different kind of law firm. Our
            office is small, our legal team is friendly, and we care about you as a person, not a case number.
          </p>
          <p>
            We proudly provide trusted guidance in bankruptcy, criminal defense, and OWI cases. Contact us today to{' '}
            <Link to="/contact" className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
              schedule your free consultation
            </Link>{' '}
            and take the first step toward a fresh start.
          </p>
          <Button to="/about" variant="dark" arrow>
            Learn more about us
          </Button>
        </Reveal>
      </div>

      <div className="mt-16 grid items-end gap-6 lg:mt-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-8 lg:col-start-1 lg:row-start-1">
          <div ref={photo} className="overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
            <motion.img
              style={{ y, scale: 1.14 }}
              src="/images/team-group.webp"
              alt={`The ${firm.name} team outside in Dubuque`}
              width="1152"
              height="768"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover sm:aspect-[3/2]"
            />
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="relative z-10 rounded-[1.75rem] bg-tan-pale p-8 sm:p-10 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:-mb-16"
        >
          <p className="font-label text-xs font-bold tracking-[0.16em] text-taupe uppercase">Year established</p>
          <p className="mt-2 font-display text-8xl leading-none tracking-tight text-ink sm:text-9xl">{firm.founded}</p>
          <div className="my-8 h-px bg-tan/40" aria-hidden="true" />
          <p className="text-cocoa">
            Francis Henkels assisted many during the farm and mortgage crisis of the 1980s. His extensive experience in
            bankruptcy, business, and agribusiness law is the foundation of {firm.name}. While Fran is now retired, he
            remains deeply involved in the community where he has served as a member of many boards and associations.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
