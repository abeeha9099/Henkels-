import { Phone } from 'lucide-react'
import { firm } from '../../data/site'
import { faqs } from '../../data/home'
import Accordion from '../ui/Accordion'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { Display, Panel, Pill } from '../ui/Section'

export default function Faq() {
  return (
    <Panel tone="mist" labelledBy="faq-title" inner="py-20 sm:py-28 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Pill>FAQ</Pill>
            <Display id="faq-title" className="mt-6 text-ink lg:text-6xl">
              Common Questions About Bankruptcy in Iowa
            </Display>
            <div className="mt-10 rounded-[1.75rem] bg-ink p-7 text-white">
              <p className="font-display text-xl leading-snug">
                We’ll go over our fees with you at your free consultation.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button to="/contact" arrow className="justify-between">
                  Free Case Evaluations
                </Button>
                <Button href={firm.phone.href} variant="outlineLight">
                  <Phone className="size-4" aria-hidden="true" />
                  {firm.phone.display}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </Panel>
  )
}
