import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/** Counts up the number inside a value like "$40 Million+" once it scrolls into view. */
export default function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [, prefix, digits, suffix] = value.match(/^(\D*)([\d,]+)(.*)$/) ?? [null, '', '', value]
  const target = Number(digits.replace(/,/g, ''))
  const [current, setCurrent] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!inView || reduce || !target) return
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCurrent(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, target])

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {prefix}
        {target ? current.toLocaleString('en-US') : ''}
        {suffix}
      </span>
    </span>
  )
}
