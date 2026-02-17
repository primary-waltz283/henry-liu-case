interface CitationProps {
  /** Source book or document name */
  source: string
  /** Chapter, page, or line reference */
  reference?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Inline citation marker styled as a subtle footnote reference.
 * Format: （來源：龍之火，第 XX 頁）
 */
export default function Citation({
  source,
  reference,
  className = '',
}: CitationProps) {
  const label = reference
    ? `（來源：${source}，${reference}）`
    : `（來源：${source}）`

  return (
    <cite
      className={`text-sm text-neutral not-italic opacity-70 ${className}`}
    >
      {label}
    </cite>
  )
}
