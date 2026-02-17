import { useState } from 'react'

interface Perspective {
  /** Who holds this perspective */
  label: string
  /** Their claim */
  claim: string
  /** Source citation */
  source: string
}

interface ContradictionBoxProps {
  /** Title of the contradiction */
  title: string
  /** The different perspectives (2-4) */
  perspectives: Perspective[]
  /** Optional public record / verdict */
  publicRecord?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Displays 2-4 conflicting accounts of the same event,
 * with red contradiction markers. Can be expanded/collapsed.
 */
export default function ContradictionBox({
  title,
  perspectives,
  publicRecord,
  className = '',
}: ContradictionBoxProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`border-l-4 border-stamp-red bg-paper-100 p-4 ${className}`}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-stamp-red text-xs font-bold">
            矛盾
          </span>
          <h3 className="font-serif text-lg font-semibold text-ink-800">
            {title}
          </h3>
        </div>
        <span className="text-neutral text-sm">
          {expanded ? '收合' : '展開'}
        </span>
      </button>

      {expanded && (
        <div className="mt-4 space-y-3">
          {perspectives.map((p) => (
            <div
              key={p.label}
              className="border-l-2 border-paper-300 pl-3"
            >
              <p className="text-sm font-bold text-ink-800">{p.label}</p>
              <p className="mt-1 text-ink-700">{p.claim}</p>
              <p className="mt-1 text-xs text-neutral">
                （來源：{p.source}）
              </p>
            </div>
          ))}

          {publicRecord && (
            <div className="mt-2 border-t border-paper-300 pt-2">
              <p className="text-sm font-bold text-neutral">公開紀錄</p>
              <p className="mt-1 text-ink-700">{publicRecord}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
