import { useRef, useEffect, useState, type ReactNode, type RefObject } from 'react'

interface FadeInSectionProps {
  children: ReactNode
  className?: string
  /** Delay before fade starts (ms) */
  delay?: number
  /** Animation direction */
  direction?: 'up' | 'none'
}

/**
 * Wraps content in a fade-in animation triggered by Intersection Observer.
 * Elements fade in and optionally slide up when they enter the viewport.
 */
export default function FadeInSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const translateY = direction === 'up' ? 'translateY(24px)' : 'none'

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : translateY,
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
