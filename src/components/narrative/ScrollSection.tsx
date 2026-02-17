import { useRef, type ReactNode, type RefObject } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'

interface ScrollSectionProps {
  /** Content to render inside the section */
  children: (progress: number) => ReactNode
  /** Minimum height of the scroll section (CSS value) */
  minHeight?: string
  /** Additional CSS classes */
  className?: string
  /** ScrollTrigger start position */
  start?: string
  /** ScrollTrigger end position */
  end?: string
}

/**
 * A section that tracks its scroll progress (0-1) and passes
 * it to children via render prop, enabling scroll-driven animations.
 */
export default function ScrollSection({
  children,
  minHeight = '100vh',
  className = '',
  start,
  end,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useScrollProgress(sectionRef, { start, end })

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className={`relative ${className}`}
      style={{ minHeight }}
    >
      {children(progress)}
    </section>
  )
}
