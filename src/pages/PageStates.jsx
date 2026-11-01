import { firm } from '../data/site'
import Button from '../components/ui/Button'

export function LoadingBody() {
  return (
    <div className="animate-pulse space-y-4" role="status" aria-label="Loading content">
      {[90, 100, 85, 95, 70, 100, 80].map((w, i) => (
        <div key={i} className="h-4 rounded-full bg-mist" style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}

export function LoadError({ slug }) {
  return (
    <div className="rounded-[1.75rem] bg-tan-pale p-8">
      <p className="font-display text-2xl text-ink">This page didn’t load.</p>
      <p className="mt-2">Check your connection and reload, or read it on the current website.</p>
      <Button href={`${firm.url}/${slug}/`} variant="dark" arrow className="mt-6">
        Open on henkelsbaker.com
      </Button>
    </div>
  )
}
