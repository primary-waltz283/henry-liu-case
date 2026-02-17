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

  if (acknowledged) {
    return <>{children}</>
  }

  return (
    <div
      className={`border border-paper-300 bg-paper-100 p-8 text-center ${className}`}
    >
      <p className="text-sm font-bold uppercase tracking-widest text-neutral">
        內容警告
      </p>
      <p className="mx-auto mt-3 max-w-md text-ink-700">{message}</p>
      <button
        type="button"
        onClick={() => setAcknowledged(true)}
        className="mt-6 border border-ink-700 px-6 py-2 text-sm text-ink-700 transition-colors hover:bg-paper-200"
      >
        我了解，繼續閱讀
      </button>
    </div>
  )
}
