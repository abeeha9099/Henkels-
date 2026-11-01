import { useParams } from 'react-router-dom'
import { bySlug } from '../content/content'
import BlogPost from './BlogPost'
import ContentPage from './ContentPage'
import NotFound from './NotFound'
import StaffProfile from './StaffProfile'

/** Resolves any original URL (/<slug>) to the right template. */
export default function DynamicPage() {
  const { slug } = useParams()
  const entry = bySlug[slug]
  if (!entry) return <NotFound />
  // key resets page state when navigating between two pages that share a template
  if (entry.type === 'post') return <BlogPost key={slug} entry={entry} />
  if (entry.group === 'team') return <StaffProfile key={slug} entry={entry} />
  return <ContentPage key={slug} entry={entry} />
}
