import { motion } from 'framer-motion'

/**
 * Fades content up as it scrolls into view. Reduced-motion users get no
 * movement (handled by <MotionConfig reducedMotion="user"> in App).
 */
export default function Reveal({ as = 'div', delay = 0, className = '', children, ...props }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  )
}
