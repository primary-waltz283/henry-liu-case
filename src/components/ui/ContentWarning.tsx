import { useState } from 'react'
import type { ReactNode } from 'react'

interface ContentWarningProps {
  /** Warning message */
  message: string
  /** Content to reveal after acknowledgment */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Content warning gate. Shows a warning message and requires
 * explicit acknowledgment before revealing sensitive content.
 */
export default function ContentWarning({
  message,
  children,
  className = '',
}: ContentWarningProps) {
  const [acknowledged, setAcknowledged] = useState(false)
  const [dismissing, setDismissing] = useState(false)

  if (acknowledged) {
    return <>{children}</>
  }

  const handleDismiss = () => {
    setDismissing(true)
    setTimeout(() => setAcknowledged(true), 500)
  }

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="cw-title"
      aria-describedby="cw-desc"
      className={`flex min-h-screen items-center justify-center bg-paper-50 ${className}`}
      style={{
        opacity: dismissing ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <div className="mx-4 max-w-md border border-paper-300 bg-paper-100 p-8 text-center paper-texture">
        <p
          id="cw-title"
          className="text-sm font-bold uppercase tracking-widest text-neutral"
        >
          內容警告
        </p>
        <p id="cw-desc" className="mt-3 text-ink-700">{message}</p>
        <button
          type="button"
          onClick={handleDismiss}
          className="mt-6 border border-ink-700 px-6 py-2 text-sm text-ink-700 transition-colors hover:bg-paper-200 focus:outline-none focus:ring-2 focus:ring-link-blue focus:ring-offset-2"
        >
          我了解，繼續閱讀
        </button>
      </div>
    </div>
  )
}
