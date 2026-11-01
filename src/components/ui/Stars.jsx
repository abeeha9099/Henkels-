import { Star } from 'lucide-react'

export default function Stars({ className = 'size-4' }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} fill-star text-star`} aria-hidden="true" />
      ))}
    </span>
  )
}
