import Seo from '../components/Seo'
import Button from '../components/ui/Button'
import { Display, Panel, Pill } from '../components/ui/Section'
import { firm } from '../data/site'

export default function NotFound() {
  return (
    <Panel tone="tan" inner="py-24 sm:py-32">
      <Seo title={`Page not found - ${firm.name}`} description="The page you were looking for could not be found." path="/404" />
      <meta name="robots" content="noindex" />
      <div className="max-w-2xl">
        <Pill>404</Pill>
        <Display as="h1" className="mt-6 text-ink">
          Page not found
        </Display>
        <p className="mt-6 text-lg">The page you were looking for doesn’t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/" variant="dark" arrow>
            Back to home
          </Button>
          <Button to="/practice-areas" variant="outlineDark">
            Practice areas
          </Button>
          <Button href={firm.phone.href} variant="outlineDark">
            Call {firm.phone.display}
          </Button>
        </div>
      </div>
    </Panel>
  )
}
