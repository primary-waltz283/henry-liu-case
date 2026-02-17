import { useState } from 'react'
import contradictions, { type Contradiction } from '../../data/contradictions'

/** All contradiction entries sorted by ID */
const allContradictions: Contradiction[] = Object.values(contradictions).sort(
  (a, b) => a.id.localeCompare(b.id)
)

/** Unique perspective labels across all contradictions, ordered by frequency */
function collectPerspectiveLabels(): string[] {
  const freq = new Map<string, number>()
  for (const c of allContradictions) {
    for (const p of c.perspectives) {
      freq.set(p.label, (freq.get(p.label) ?? 0) + 1)
    }
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label]) => label)
}

const perspectiveLabels = collectPerspectiveLabels()

/** Shorten a label for mobile tab display */
function shortLabel(label: string): string {
  if (label.includes('（')) return label.slice(0, label.indexOf('（'))
  if (label.includes('假說')) return label
  return label.length > 6 ? label.slice(0, 6) + '…' : label
}

interface ContradictionTableProps {
  className?: string
}

/**
 * Full-page four-perspective contradiction comparison table.
 *
 * Desktop: fixed left column (topic), perspectives as columns.
 * Mobile: tab-based switching between perspectives.
 */
export default function ContradictionTable({
  className = '',
}: ContradictionTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className={`py-12 ${className}`}>
      <h2 className="mb-2 text-center font-serif text-2xl font-bold text-ink-800">
        四方矛盾對照表
      </h2>
      <p className="mb-8 text-center text-sm text-neutral">
        同一事件，不同說法。紅色標記為各方陳述直接矛盾之處。
      </p>

      {/* Desktop table (hidden on small screens) */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-paper-300">
              <th className="sticky left-0 z-10 min-w-[180px] bg-paper-50 px-3 py-3 text-left font-serif text-base font-bold text-ink-800">
                議題
              </th>
              {perspectiveLabels.map((label) => (
                <th
                  key={label}
                  className="min-w-[200px] px-3 py-3 text-left font-semibold text-ink-800"
                >
                  {label}
                </th>
              ))}
              <th className="min-w-[180px] px-3 py-3 text-left font-semibold text-neutral">
                公開紀錄
              </th>
            </tr>
          </thead>
          <tbody>
            {allContradictions.map((c) => {
              const isHovered = hoveredRow === c.id
              return (
                <tr
                  key={c.id}
                  onMouseEnter={() => setHoveredRow(c.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`border-b border-paper-300 transition-colors ${
                    isHovered ? 'bg-paper-200' : 'bg-paper-50 even:bg-paper-100'
                  }`}
                >
                  {/* Fixed left column: topic */}
                  <td className="sticky left-0 z-10 bg-inherit px-3 py-3 align-top">
                    <span className="mr-1 inline-block rounded bg-stamp-red px-1.5 py-0.5 font-mono text-xs text-white">
                      {c.id}
                    </span>
                    <span className="font-serif font-semibold text-ink-800">
                      {c.title}
                    </span>
                  </td>

                  {/* Perspective columns */}
                  {perspectiveLabels.map((label) => {
                    const p = c.perspectives.find((p) => p.label === label)
                    return (
                      <td
                        key={label}
                        className="px-3 py-3 align-top text-ink-700"
                      >
                        {p ? (
                          <>
                            <p className="leading-relaxed">{p.claim}</p>
                            <p className="mt-1 text-xs text-neutral">
                              （{p.source}）
                            </p>
                          </>
                        ) : (
                          <span className="text-xs text-paper-300">—</span>
                        )}
                      </td>
                    )
                  })}

                  {/* Public record */}
                  <td className="px-3 py-3 align-top text-neutral">
                    {c.publicRecord ?? '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile view: tab-based (visible on small screens) */}
      <div className="md:hidden">
        {/* Tab bar */}
        <div className="mb-4 flex gap-1 overflow-x-auto border-b border-paper-300 pb-1">
          {perspectiveLabels.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`shrink-0 rounded-t px-3 py-2 text-xs font-semibold transition-colors ${
                activeTab === i
                  ? 'bg-paper-200 text-ink-800'
                  : 'text-neutral hover:bg-paper-100'
              }`}
            >
              {shortLabel(label)}
            </button>
          ))}
        </div>

        {/* Cards for active tab */}
        <div className="space-y-4">
          {allContradictions.map((c) => {
            const activeLabel = perspectiveLabels[activeTab]
            const p = c.perspectives.find((p) => p.label === activeLabel)
            return (
              <div
                key={c.id}
                className="rounded border border-paper-300 bg-paper-100 p-3"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-block rounded bg-stamp-red px-1.5 py-0.5 font-mono text-xs text-white">
                    {c.id}
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-ink-800">
                    {c.title}
                  </h4>
                </div>
                {p ? (
                  <>
                    <p className="text-sm leading-relaxed text-ink-700">
                      {p.claim}
                    </p>
                    <p className="mt-1 text-xs text-neutral">（{p.source}）</p>
                  </>
                ) : (
                  <p className="text-xs text-neutral">此方無相關陳述</p>
                )}
                {c.publicRecord && (
                  <div className="mt-2 border-t border-paper-300 pt-2">
                    <p className="text-xs text-neutral">
                      <span className="font-semibold">公開紀錄：</span>
                      {c.publicRecord}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
