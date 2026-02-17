import { useRef, useEffect, useCallback, type RefObject } from 'react'
import { Application } from 'pixi.js'

interface PixiCanvasProps {
  /** Base resolution width (will be scaled up) */
  width?: number
  /** Base resolution height (will be scaled up) */
  height?: number
  /** Scale factor for pixel art (integer for crisp pixels) */
  scale?: number
  /** Background color */
  backgroundColor?: number
  /** Scroll progress 0-1 for scene animation */
  progress?: number
  /** Called when the PixiJS Application is ready */
  onSetup?: (app: Application) => void
  /** Called each frame with current progress */
  onUpdate?: (app: Application, progress: number) => void
  /** Additional CSS classes */
  className?: string
  /** Accessible label for the scene */
  ariaLabel?: string
}

export default function PixiCanvas({
  width = 320,
  height = 180,
  scale: scaleProp = 2,
  backgroundColor = 0xfaf8f4,
  progress = 0,
  onSetup,
  onUpdate,
  className = '',
  ariaLabel,
}: PixiCanvasProps) {
  // Reduce scale on mobile for performance
  const scale = typeof window !== 'undefined' && window.innerWidth < 640
    ? Math.max(1, scaleProp - 1)
    : scaleProp
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const progressRef = useRef(progress)
  const onUpdateRef = useRef(onUpdate)

  // Keep refs in sync via effect
  useEffect(() => {
    progressRef.current = progress
    onUpdateRef.current = onUpdate
  })

  const initApp = useCallback(
    async (container: HTMLDivElement) => {
      const app = new Application()
      await app.init({
        width: width * scale,
        height: height * scale,
        backgroundColor,
        antialias: false,
        resolution: 1,
      })

      // Crisp pixel rendering
      const canvas = app.canvas as HTMLCanvasElement
      canvas.style.imageRendering = 'pixelated'
      canvas.style.width = '100%'
      canvas.style.height = 'auto'

      container.appendChild(canvas)
      appRef.current = app

      onSetup?.(app)

      // Render loop
      app.ticker.add(() => {
        onUpdateRef.current?.(app, progressRef.current)
      })
    },
    [width, height, scale, backgroundColor, onSetup],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Intersection Observer for lazy init / resource cleanup
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !appRef.current) {
          initApp(container)
        } else if (!entry.isIntersecting && appRef.current) {
          appRef.current.destroy(true)
          appRef.current = null
          // Clear the container
          while (container.firstChild) {
            container.removeChild(container.firstChild)
          }
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (appRef.current) {
        appRef.current.destroy(true)
        appRef.current = null
      }
    }
  }, [initApp])

  return (
    <div
      ref={containerRef as RefObject<HTMLDivElement>}
      className={`overflow-hidden ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
      role="img"
      aria-label={ariaLabel}
    />
  )
}
