import { useRef, useEffect, useState, type RefObject } from 'react'

interface ChapterDividerProps {
  /** Stamp text to display (e.g. "極機密", "鋤奸") */
  stamp?: string
  className?: string
}

/**
 * Animated divider between chapters.
 * Shows a horizontal line that expands, with an optional stamp
 * that rotates and fades in when scrolled into view.
 */
export default function ChapterDivider({
  stamp,
  className = '',
}: ChapterDividerProps) {
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
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`relative flex flex-col items-center justify-center py-20 ${className}`}
    >
      {/* Expanding line */}
      <div
        className="h-px bg-paper-300"
        style={{
          width: isVisible ? '8rem' : '0',
          transition: 'width 0.8s ease-out',
        }}
      />

      {/* Stamp animation */}
      {stamp && (
        <div
          className="mt-6"
          style={{
            opacity: isVisible ? 0.85 : 0,
            transform: isVisible ? 'rotate(-5deg) scale(1)' : 'rotate(-15deg) scale(0.7)',
            transition: 'opacity 0.5s ease-out 0.4s, transform 0.5s ease-out 0.4s',
          }}
        >
          <span className="inline-block border-2 border-stamp-red px-4 py-1 text-lg font-bold tracking-widest text-stamp-red">
            {stamp}
          </span>
        </div>
      )}

      {/* Bottom line */}
      <div
        className="mt-6 h-px bg-paper-300"
        style={{
          width: isVisible ? '8rem' : '0',
          transition: 'width 0.8s ease-out 0.2s',
        }}
      />
    </div>
  )
}
