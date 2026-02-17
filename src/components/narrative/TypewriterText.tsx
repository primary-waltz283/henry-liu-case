import { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (!active) {
      setDisplayedLength(0)
      return
    }

    if (displayedLength >= text.length) return

    const timer = setTimeout(() => {
      setDisplayedLength((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [active, displayedLength, text.length, speed])

  return (
    <span className={`typewriter ${className}`}>
      {text.slice(0, displayedLength)}
      {active && displayedLength < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}
