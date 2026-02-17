import { useState } from 'react'

interface TrialRow {
  label: string
  taiwan: string
  us: string
  highlight?: 'red' | 'gold'
}

const trialData: TrialRow[] = [
  {
    label: '審判日期',
    taiwan: '1985 年 4 月 19 日',
    us: '1986 年 7–9 月（RICO）\n1988 年（加州謀殺罪）',
  },
  {
    label: '審判性質',
    taiwan: '秘密軍事法庭',
    us: '公開陪審團審判',
    highlight: 'red',
  },
  {
    label: '被告與判決',
    taiwan:
      '汪希苓 — 無期徒刑\n陳啟禮 — 無期徒刑\n吳　敦 — 無期徒刑\n胡儀敏 — 兩年六個月\n陳虎門 — 兩年六個月',
    us: '董桂森 — 20 年（毒品）+ 27 年（謀殺）\n張安樂 — 15 年\n陳志一 — 20 年',
  },
  {
    label: '實際服刑',
    taiwan: '全員約 6.5 年\n（1991 年特赦／減刑出獄）',
    us: '董桂森：獄中身亡（1991）\n張安樂：服刑後返台\n陳志一：服滿刑期',
    highlight: 'red',
  },
  {
    label: '法庭定性',
    taiwan: '「個人行為」\n（切斷與蔣家及政府的關聯）',
    us: '「政府的行為」\n（加州法庭 1988 年判決）',
    highlight: 'gold',
  },
  {
    label: '後續影響',
    taiwan: '陳虎門出獄後晉升少將\n汪希苓出獄後保持沉默',
    us: '民事訴訟：崔蓉芝獲 145 萬美元和解金\n附帶條件：不得改編為影視作品',
  },
]

interface DualTrialComparisonProps {
  className?: string
}

/**
 * Side-by-side Taiwan vs US trial comparison infographic for Chapter 6.
 *
 * Desktop: dual-column table with row hover.
 * Mobile: tab switching between Taiwan and US perspectives.
 */
export default function DualTrialComparison({
  className = '',
}: DualTrialComparisonProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'taiwan' | 'us'>('taiwan')

  return (
    <div className={`py-12 ${className}`}>
      <h2 className="mb-2 text-center font-serif text-2xl font-bold text-ink-800">
        台美審判對照
      </h2>
      <p className="mb-8 text-center text-sm text-neutral">
        同一案件，兩套司法體系。紅色標記為判決差異最大之處，金色標記為最關鍵定性。
      </p>

      {/* Desktop: dual-column table */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded border border-paper-300">
          {/* Header */}
          <div className="grid grid-cols-[180px_1fr_1fr]">
            <div className="bg-paper-200 px-4 py-3" />
            <div className="border-l border-paper-300 bg-paper-100 px-4 py-3 text-center">
              <p className="font-serif text-lg font-bold text-ink-800">
                台灣軍事審判
              </p>
              <p className="mt-1 text-xs text-neutral">中華民國</p>
            </div>
            <div
              className="border-l border-paper-300 px-4 py-3 text-center"
              style={{ backgroundColor: '#e8eef4' }}
            >
              <p className="font-serif text-lg font-bold text-ink-800">
                美國聯邦法庭
              </p>
              <p className="mt-1 text-xs text-neutral">United States</p>
            </div>
          </div>

          {/* Rows */}
          {trialData.map((row, i) => {
            const isHovered = hoveredRow === i
            let rowBg = ''
            if (row.highlight === 'gold') {
              rowBg = isHovered ? '#d4ac4d30' : '#b8943e18'
            } else if (isHovered) {
              rowBg = '#e8dfd2'
            }

            return (
              <div
                key={row.label}
                className="grid grid-cols-[180px_1fr_1fr] border-t border-paper-300"
                style={rowBg ? { backgroundColor: rowBg } : undefined}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Label column */}
                <div className="flex items-start gap-2 bg-paper-200/50 px-4 py-3">
                  {row.highlight === 'red' && (
                    <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-stamp-red" />
                  )}
                  {row.highlight === 'gold' && (
                    <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-evidence-gold" />
                  )}
                  <span className="font-serif text-sm font-semibold text-ink-800">
                    {row.label}
                  </span>
                </div>
                {/* Taiwan column */}
                <div className="border-l border-paper-300 px-4 py-3">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">
                    {row.taiwan}
                  </p>
                </div>
                {/* US column */}
                <div className="border-l border-paper-300 px-4 py-3">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">
                    {row.us}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: tab-based */}
      <div className="md:hidden">
        <div className="mb-4 flex border-b border-paper-300">
          <button
            type="button"
            onClick={() => setActiveTab('taiwan')}
            className={`flex-1 px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'taiwan'
                ? 'border-b-2 border-ink-800 text-ink-800'
                : 'text-neutral'
            }`}
          >
            台灣軍事審判
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('us')}
            className={`flex-1 px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'us'
                ? 'border-b-2 border-ink-800 text-ink-800'
                : 'text-neutral'
            }`}
          >
            美國聯邦法庭
          </button>
        </div>

        <div className="space-y-3">
          {trialData.map((row) => {
            let borderColor = 'border-paper-300'
            if (row.highlight === 'red') borderColor = 'border-stamp-red'
            if (row.highlight === 'gold') borderColor = 'border-evidence-gold'

            return (
              <div
                key={row.label}
                className={`rounded border ${borderColor} bg-paper-100 p-3`}
              >
                <p className="mb-1 font-serif text-sm font-bold text-ink-800">
                  {row.label}
                </p>
                <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">
                  {activeTab === 'taiwan' ? row.taiwan : row.us}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
