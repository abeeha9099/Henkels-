import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ExternalLink, Menu, Phone, X } from 'lucide-react'
import { firm, mainNav } from '../../data/site'
import Button from '../ui/Button'
import { Container } from '../ui/Section'

const pillLink = 'inline-flex items-center gap-1 rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-colors'

function PracticeDropdown({ groups }) {
  const [open, setOpen] = useState(false)
  const wrapper = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => !wrapper.current?.contains(e.target) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <div
      ref={wrapper}
      className="relative"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
      onBlur={(e) => !wrapper.current?.contains(e.relatedTarget) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="practice-menu"
        onClick={() => setOpen((v) => !v)}
        className={`${pillLink} ${open ? 'bg-white text-ink shadow-soft' : 'text-ink/70 hover:text-ink'}`}
      >
        Practice Areas
        <ChevronDown className={`size-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="practice-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 z-50 w-[40rem] -translate-x-1/2 pt-4"
          >
            <div className="grid grid-cols-[1fr_1.3fr] overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-black/[0.07]">
              {groups.map((group, i) => (
                <div key={group.label} className={`p-6 ${i === 0 ? 'bg-tan-pale' : ''}`}>
                  <Link
                    to={group.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between font-display text-2xl text-ink hover:text-brand"
                  >
                    {group.label}
                    <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" aria-hidden="true" />
                  </Link>
                  <ul className={`mt-4 grid gap-0.5 ${group.children.length > 4 ? 'grid-cols-2' : ''}`}>
                    {group.children.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg py-1.5 text-sm text-body hover:text-brand"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                to="/practice-areas"
                onClick={() => setOpen(false)}
                className="col-span-2 flex items-center justify-between border-t border-black/[0.07] px-6 py-4 text-sm font-medium text-ink hover:bg-mist hover:text-brand"
              >
                All practice areas &amp; service areas
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileMenu({ open, onClose }) {
  const panel = useRef(null)
  const [practiceOpen, setPracticeOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector('a, button')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      // Keep keyboard focus inside the open menu.
      if (e.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll('a, button')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [open, onClose])

  const bigLink = 'flex w-full items-center justify-between py-4 font-display text-3xl text-white'

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          ref={panel}
          id="mobile-menu"
          aria-label="Main"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-2 z-50 flex flex-col overflow-hidden rounded-[1.75rem] bg-ink text-white lg:hidden"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <span className="font-label text-xs font-bold tracking-[0.16em] text-white/60 uppercase">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close menu"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-5">
            {mainNav.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={practiceOpen}
                      onClick={() => setPracticeOpen((v) => !v)}
                      className={`${bigLink} text-left`}
                    >
                      {item.label}
                      <ChevronDown className={`size-6 text-tan transition-transform ${practiceOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {practiceOpen && (
                      <div className="grid gap-6 pb-6">
                        {item.children.map((group) => (
                          <div key={group.label}>
                            <Link to={group.to} onClick={onClose} className="font-label text-xs font-bold tracking-[0.16em] text-tan uppercase">
                              {group.label}
                            </Link>
                            <ul className="mt-2 grid grid-cols-2 gap-x-4">
                              {group.children.map((child) => (
                                <li key={child.to}>
                                  <Link to={child.to} onClick={onClose} className="block py-1.5 text-[0.9375rem] text-white/75 hover:text-white">
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link to="/practice-areas" onClick={onClose} className="text-sm font-medium text-tan">
                          All practice areas &amp; service areas →
                        </Link>
                      </div>
                    )}
                  </>
                ) : item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={bigLink}>
                    {item.label}
                    <ExternalLink className="size-5 text-white/50" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <NavLink to={item.to} onClick={onClose} className={bigLink} end>
                    {item.label}
                  </NavLink>
                )}
              </motion.li>
            ))}
          </ul>

          <div className="grid gap-3 p-5">
            <Button to="/contact" arrow onClick={onClose} className="w-full justify-between">
              Free Case Evaluations
            </Button>
            <Button href={firm.phone.href} variant="outlineLight" className="w-full">
              <Phone className="size-4" aria-hidden="true" />
              {firm.phone.display}
            </Button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/85 shadow-soft backdrop-blur-xl' : 'bg-white'
        }`}
      >
        <Container className="flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link to="/" className="shrink-0" aria-label={`${firm.name}, home`}>
            <img src="/images/logo.png" alt={`${firm.name}, Attorneys at Law`} className="h-8 w-auto sm:h-9 lg:h-10" width="400" height="87" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full bg-mist p-1">
              {mainNav.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <PracticeDropdown groups={item.children} />
                  ) : item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${pillLink} text-ink/70 hover:text-ink`}>
                      {item.label}
                      <ExternalLink className="size-3 opacity-60" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `${pillLink} ${isActive ? 'bg-white text-ink shadow-soft' : 'text-ink/70 hover:text-ink'}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a href={firm.phone.href} className="hidden items-center gap-2 text-sm font-medium text-ink hover:text-brand xl:inline-flex">
              <Phone className="size-4 text-brand" aria-hidden="true" />
              {firm.phone.display}
            </a>
            <div className="hidden sm:block">
              <Button to="/contact" arrow>
                Free Case Evaluations
              </Button>
            </div>
            <a
              href={firm.phone.href}
              className="grid size-11 place-items-center rounded-full bg-mist text-ink hover:bg-brand-pale sm:hidden"
              aria-label={`Call ${firm.phone.display}`}
            >
              <Phone className="size-[1.125rem]" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-11 place-items-center rounded-full bg-ink text-white hover:bg-charcoal lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  )
}
