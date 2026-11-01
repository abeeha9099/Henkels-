import { useNavigate } from 'react-router-dom'

// External links in imported content open in a new tab.
const withExternalTargets = (html) =>
  html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"')

/**
 * Renders imported WordPress HTML with the site's article styles. Internal links
 * are routed client-side instead of reloading the page.
 */
export default function Prose({ html, className = '' }) {
  const navigate = useNavigate()

  const onClick = (e) => {
    const link = e.target.closest('a')
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
    const href = link.getAttribute('href') || ''
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    // Click handling only intercepts links; the content itself is not interactive.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={`prose-hb ${className}`} onClick={onClick} dangerouslySetInnerHTML={{ __html: withExternalTargets(html) }} />
  )
}
