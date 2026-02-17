import { useEffect, useRef, useState } from 'react'

interface TypewriterTextProps {
  /** The full text to type out */
  text: string
  /** Typing speed in ms per character */
  speed?: number
  /** Whether to start the animation */
  active?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Renders text with a typewriter animation effect.
 * Uses monospace font to evoke declassified document feel.
 */
export default function TypewriterText({
  text,
  speed = 30,
  active = true,
  className = '',
}: TypewriterTextProps) {
  const [displayedLength, setDisplayedLength] = useState(0)
  const lengthRef = useRef(0)

  useEffect(() => {
    if (!active) {
      lengthRef.current = 0
      return
    }

    let cancelled = false
    lengthRef.current = 0

    function tick() {
      if (cancelled) return
      lengthRef.current++
      setDisplayedLength(lengthRef.current)
      if (lengthRef.current < text.length) {
        setTimeout(tick, speed)
      }
    }

    setTimeout(tick, speed)

    return () => {
      cancelled = true
    }
  }, [active, text, speed])

  return (
    <span className={`typewriter ${className}`}>
      {text.slice(0, displayedLength)}
      {active && displayedLength < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}
