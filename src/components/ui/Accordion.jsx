import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Prose from '../content/Prose'

function AccordionItem({ index, question, answer, html, open, onToggle }) {
  const id = useId()
  return (
    <div className="border-t border-ink/10">
      <h3 className="font-sans">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-start gap-5 py-6 text-left sm:gap-8 sm:py-7"
        >
          <span className={`pt-1 font-label text-sm font-bold transition-colors ${open ? 'text-brand' : 'text-tan'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`flex-1 font-display text-xl leading-snug transition-colors sm:text-2xl ${
              open ? 'text-brand' : 'text-ink group-hover:text-brand'
            }`}
          >
            {question}
          </span>
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
              open ? 'rotate-45 bg-brand text-white' : 'bg-white text-ink group-hover:bg-brand-pale'
            }`}
            aria-hidden="true"
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {html ? (
              <Prose html={answer} className="pb-8 pl-10 sm:pr-16 sm:pl-14" />
            ) : (
              <p className="pb-8 pl-10 text-[0.9375rem] leading-relaxed sm:pr-16 sm:pl-14 sm:text-base">{answer}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Numbered FAQ list where one answer is open at a time. Set `html` when answers are HTML strings. */
export default function Accordion({ items, html = false }) {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <div className="border-b border-ink/10">
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          index={i}
          question={item.q}
          answer={item.a}
          html={html}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  )
}
