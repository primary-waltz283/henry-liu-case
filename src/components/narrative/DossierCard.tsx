import type { ReactNode } from 'react'

interface DossierCardProps {
  /** Card content */
  children: ReactNode
  /** Optional card title */
  title?: string
  /** Whether to apply paper texture */
  textured?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * A styled container that looks like a page from a declassified dossier.
 * Paper-colored background with subtle border and optional texture.
 */
export default function DossierCard({
  children,
  title,
  textured = true,
  className = '',
}: DossierCardProps) {
  return (
    <div
      className={`
        border border-paper-300 bg-paper-100 p-6 shadow-sm
        ${textured ? 'paper-texture' : ''}
        ${className}
      `}
    >
      {title && (
        <h3 className="mb-4 font-serif text-xl font-bold text-ink-800">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
