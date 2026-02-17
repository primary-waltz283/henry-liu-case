import { useEffect, useState, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseScrollProgressOptions {
  /** Start trigger position (default: "top bottom") */
  start?: string
  /** End trigger position (default: "bottom top") */
  end?: string
  /** Scrub smoothing (true = instant, number = seconds) */
  scrub?: boolean | number
}

/**
 * Returns a 0-1 progress value based on how far the referenced
 * element has scrolled through the viewport.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  options: UseScrollProgressOptions = {},
): number {
  const [progress, setProgress] = useState(0)
  const { start = 'top bottom', end = 'bottom top', scrub = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      scrub: scrub === true ? 0 : scrub,
      onUpdate: (self) => setProgress(self.progress),
    })

    return () => {
      trigger.kill()
    }
  }, [ref, start, end, scrub])

  return progress
}
