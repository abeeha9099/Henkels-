export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

/** Small outlined label that opens a section, e.g. "ABOUT THE FIRM". */
export function Pill({ tone = 'dark', className = '', children }) {
  const tones = {
    dark: 'border-ink/15 text-ink',
    light: 'border-white/20 text-white/80',
  }
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-label text-[0.6875rem] font-bold tracking-[0.16em] uppercase ${tones[tone]} ${className}`}
    >
      <span className="size-1.5 rounded-full bg-tan" aria-hidden="true" />
      {children}
    </span>
  )
}

/** Oversized editorial heading used to open sections. */
export function Display({ as: Tag = 'h2', id, className = '', children }) {
  return (
    <Tag
      id={id}
      className={`font-display text-[2.5rem] leading-[1.02] font-medium tracking-[-0.02em] sm:text-6xl lg:text-7xl ${className}`}
    >
      {children}
    </Tag>
  )
}

/** Full-bleed white section with generous vertical rhythm. */
export default function Section({ id, labelledBy, className = '', children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-20 sm:py-28 lg:py-36 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

/** Inset, rounded panel that floats inside the page margins (dark or tinted). */
export function Panel({ id, labelledBy, tone = 'ink', className = '', inner = '', children }) {
  const tones = {
    ink: 'bg-ink text-white',
    tan: 'bg-tan-pale',
    teal: 'bg-brand-pale',
    mist: 'bg-mist',
  }
  return (
    <section id={id} aria-labelledby={labelledBy} className="px-2 sm:px-3">
      {/* overflow-clip (not hidden) so sticky children inside panels still stick */}
      <div className={`relative isolate overflow-clip rounded-[1.75rem] sm:rounded-[2.5rem] ${tones[tone]} ${className}`}>
        <Container className={inner}>{children}</Container>
      </div>
    </section>
  )
}
