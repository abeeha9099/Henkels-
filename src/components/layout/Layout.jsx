import { Suspense, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CalendarCheck, Phone } from 'lucide-react'
import { firm } from '../../data/site'
import Header from './Header'
import Footer from './Footer'

/** Always-visible call and consultation buttons on phones. */
function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.07] bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg sm:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={firm.phone.href}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white py-3 text-sm font-medium text-ink"
        >
          <Phone className="size-4 text-brand" aria-hidden="true" />
          Call Us
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-tan py-3 text-sm font-medium text-ink"
        >
          <CalendarCheck className="size-4" aria-hidden="true" />
          Free Evaluation
        </Link>
      </div>
    </div>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()

  // Start each new page at the top, unless the link targets a section.
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="flex min-h-svh flex-col pb-[4.75rem] sm:pb-0">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  )
}
