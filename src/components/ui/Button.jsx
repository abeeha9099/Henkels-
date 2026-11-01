import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const variants = {
  // Tan pill with ink text: the main call to action
  accent: 'bg-tan text-ink hover:bg-tan-pale',
  primary: 'bg-brand text-white hover:bg-brand-dark',
  dark: 'bg-ink text-white hover:bg-charcoal',
  outlineLight: 'border border-white/25 text-white hover:border-white/60 hover:bg-white/5',
  outlineDark: 'border border-ink/15 text-ink hover:border-ink/40',
}

const badgeTone = {
  accent: 'bg-white text-ink',
  primary: 'bg-white text-brand',
  dark: 'bg-tan text-ink',
  outlineLight: 'bg-white text-ink',
  outlineDark: 'bg-ink text-white',
}

/**
 * Pill button used across the site. Renders a router Link for `to`, an anchor
 * for `href` (external links open in a new tab), or a <button>. `arrow` adds
 * the round arrow badge on the right.
 */
export default function Button({
  to,
  href,
  variant = 'accent',
  arrow = false,
  className = '',
  children,
  ...props
}) {
  const classes = `group inline-flex items-center justify-center gap-3 rounded-full font-sans text-sm font-medium whitespace-nowrap transition-all duration-300 ${
    arrow ? 'py-1.5 pr-1.5 pl-6' : 'px-6 py-3.5'
  } ${variants[variant]} ${className}`

  const content = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow && (
        <span
          className={`grid size-9 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${badgeTone[variant]}`}
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4" />
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
