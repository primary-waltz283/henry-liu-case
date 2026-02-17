import { useState } from 'react'

type NodeCategory = 'violence' | 'investigation' | 'reform' | 'result'

interface ChainNode {
  id: string
  date: string
  title: string
  description: string
  category: NodeCategory
}

interface ChainEdge {
  from: string
  to: string
  strong?: boolean
}

const categoryStyle: Record<
  NodeCategory,
  { fill: string; stroke: string; label: string }
> = {
  violence: { fill: '#c23b2218', stroke: '#c23b22', label: '暗殺/暴力' },
  investigation: { fill: '#4a6fa518', stroke: '#4a6fa5', label: '調查/司法' },
  reform: { fill: '#b8943e18', stroke: '#b8943e', label: '政治改革' },
  result: { fill: '#4a8a4a18', stroke: '#4a8a4a', label: '結果' },
}

const nodes: ChainNode[] = [
  {
    id: 'assassination',
    date: '1984.10.15',
    title: '暗殺劉宜良',
    description: '吳敦、董桂森在 Daly City 車庫槍殺江南。一槍三響，震動太平洋兩岸。',
    category: 'violence',
  },
  {
    id: 'fbi',
    date: '1984.11',
    title: 'FBI 介入調查',
    description: 'FBI 特工劉善謙鎖定竹聯幫，循線追查至台灣情報局。',
    category: 'investigation',
  },
  {
    id: 'yiqing',
    date: '1984.11',
    title: '一清專案',
    description: '汪敬煦主導全台掃黑行動，竹聯幫遭大規模逮捕。',
    category: 'investigation',
  },
  {
    id: 'tape',
    date: '1985.01',
    title: '錄音帶曝光',
    description: '張安樂將陳啟禮的「保命錄音帶」交給 FBI，案情全面曝光。',
    category: 'investigation',
  },
  {
    id: 'trial',
    date: '1985.04',
    title: '汪希苓受審',
    description: '台灣軍事法庭審判，汪希苓、陳啟禮、吳敦判無期徒刑。',
    category: 'investigation',
  },
  {
    id: 'us-pressure',
    date: '1985',
    title: '美國施壓',
    description: '美國國會要求停止對台軍售，台美關係面臨斷交以來最大危機。',
    category: 'investigation',
  },
  {
    id: 'chiang-statement',
    date: '1985',
    title: '蔣經國宣示',
    description: '「蔣家人不會競選下一任總統，軍隊不干政。」——蔣家王朝終結的起點。',
    category: 'reform',
  },
  {
    id: 'intel-reform',
    date: '1985–86',
    title: '情報局改組',
    description: '情報局移交國防部監管，更名軍事情報局。蔣孝武外放新加坡。',
    category: 'reform',
  },
  {
    id: 'martial-law',
    date: '1987.07.15',
    title: '解除戒嚴',
    description: '長達 38 年的戒嚴令解除。黨禁開放，政治犯獲釋，《蔣經國傳》公開販售。',
    category: 'reform',
  },
  {
    id: 'chiang-death',
    date: '1988.01',
    title: '蔣經國逝世',
    description: '李登輝繼任總統——台灣第一位本省籍國家元首。',
    category: 'result',
  },
  {
    id: 'abolish',
    date: '1991',
    title: '廢除動員戡亂',
    description: '李登輝宣告廢止《動員戡亂時期臨時條款》，終結兩岸內戰法律狀態。',
    category: 'result',
  },
  {
    id: 'democracy',
    date: '1990s–',
    title: '台灣民主化',
    description: '從威權到民主的轉型完成。一顆子彈引發的連鎖效應，改變了一座島嶼的命運。',
    category: 'result',
  },
]

const edges: ChainEdge[] = [
  { from: 'assassination', to: 'fbi' },
  { from: 'assassination', to: 'yiqing' },
  { from: 'fbi', to: 'tape', strong: true },
  { from: 'yiqing', to: 'tape' },
  { from: 'tape', to: 'trial', strong: true },
  { from: 'fbi', to: 'us-pressure' },
  { from: 'trial', to: 'us-pressure' },
  { from: 'us-pressure', to: 'chiang-statement', strong: true },
  { from: 'us-pressure', to: 'intel-reform' },
  { from: 'chiang-statement', to: 'martial-law', strong: true },
  { from: 'intel-reform', to: 'martial-law' },
  { from: 'martial-law', to: 'chiang-death' },
  { from: 'chiang-death', to: 'abolish', strong: true },
  { from: 'abolish', to: 'democracy', strong: true },
]

/** Vertical layout positions for each node (desktop: horizontal, mobile: vertical) */
const nodePositions: Record<string, { col: number; row: number }> = {
  assassination: { col: 0, row: 0 },
  fbi: { col: 0, row: 1 },
  yiqing: { col: 1, row: 1 },
  tape: { col: 0, row: 2 },
  trial: { col: 0, row: 3 },
  'us-pressure': { col: 1, row: 3 },
  'chiang-statement': { col: 0, row: 4 },
  'intel-reform': { col: 1, row: 4 },
  'martial-law': { col: 0, row: 5 },
  'chiang-death': { col: 0, row: 6 },
  abolish: { col: 0, row: 7 },
  democracy: { col: 0, row: 8 },
}

interface CausalityChainProps {
  className?: string
}

/**
 * Causality chain infographic for Chapter 7.
 * Shows the chain of events from the assassination to Taiwan's democratization.
 *
 * Desktop: SVG flow chart with hover.
 * Mobile: vertical card list with arrows.
 */
export default function CausalityChain({
  className = '',
}: CausalityChainProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const hoveredNode = hoveredId ? nodes.find((n) => n.id === hoveredId) : null

  // SVG layout constants
  const colWidth = 300
  const rowHeight = 65
  const nodeW = 240
  const nodeH = 45
  const padX = 60
  const padY = 40
  const svgW = padX * 2 + colWidth * 2
  const svgH = padY * 2 + rowHeight * 9

  function getNodeCenter(id: string): { x: number; y: number } {
    const pos = nodePositions[id]
    return {
      x: padX + pos.col * colWidth + nodeW / 2,
      y: padY + pos.row * rowHeight + nodeH / 2,
    }
  }

  return (
    <div className={`py-12 ${className}`}>
      <h2 className="mb-2 text-center font-serif text-2xl font-bold text-ink-800">
        一槍改變台灣：因果鏈
      </h2>
      <p className="mb-4 text-center text-sm text-neutral">
        從 1984 年車庫槍聲到台灣民主化——一條跨越七年的因果連鎖。
      </p>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        {Object.entries(categoryStyle).map(([key, style]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full border-2"
              style={{ borderColor: style.stroke, backgroundColor: style.fill }}
            />
            <span className="text-xs text-neutral">{style.label}</span>
          </div>
        ))}
      </div>

      {/* Desktop: SVG */}
      <div className="hidden overflow-x-auto md:block">
        <div className="relative mx-auto" style={{ maxWidth: svgW }}>
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full"
            aria-label="因果鏈圖：從1984年暗殺劉宜良到台灣民主化的連鎖事件"
          >
            {/* Edges */}
            {edges.map((edge) => {
              const from = getNodeCenter(edge.from)
              const to = getNodeCenter(edge.to)
              const isHighlighted =
                hoveredId === edge.from || hoveredId === edge.to
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x}
                  y1={from.y + nodeH / 2 - 2}
                  x2={to.x}
                  y2={to.y - nodeH / 2 + 2}
                  stroke={isHighlighted ? '#3d3833' : '#8b7d6b'}
                  strokeWidth={edge.strong ? 2.5 : 1.5}
                  strokeOpacity={
                    hoveredId && !isHighlighted ? 0.2 : edge.strong ? 0.8 : 0.5
                  }
                  markerEnd="url(#arrowhead)"
                />
              )
            })}

            {/* Arrow marker */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth={8}
                markerHeight={6}
                refX={8}
                refY={3}
                orient="auto"
              >
                <polygon
                  points="0 0, 8 3, 0 6"
                  fill="#8b7d6b"
                />
              </marker>
            </defs>

            {/* Nodes */}
            {nodes.map((node) => {
              const pos = nodePositions[node.id]
              const x = padX + pos.col * colWidth
              const y = padY + pos.row * rowHeight
              const style = categoryStyle[node.category]
              const isHovered = hoveredId === node.id
              const dimmed = hoveredId !== null && !isHovered

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ cursor: 'pointer' }}
                  opacity={dimmed ? 0.35 : 1}
                >
                  <rect
                    x={x}
                    y={y}
                    width={nodeW}
                    height={nodeH}
                    rx={4}
                    fill={isHovered ? style.stroke + '25' : style.fill}
                    stroke={style.stroke}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                  />
                  <text
                    x={x + 8}
                    y={y + 16}
                    fontSize={10}
                    fill="#8b7d6b"
                    fontFamily="monospace"
                  >
                    {node.date}
                  </text>
                  <text
                    x={x + 8}
                    y={y + 33}
                    fontSize={13}
                    fontWeight="bold"
                    fill="#2d2a26"
                  >
                    {node.title}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredNode && (
            <div
              className="pointer-events-none absolute right-4 top-4 rounded border border-paper-300 bg-paper-100 p-3 shadow-md"
              style={{ maxWidth: 280 }}
            >
              <p className="font-mono text-xs text-neutral">
                {hoveredNode.date}
              </p>
              <p className="font-serif text-sm font-bold text-ink-800">
                {hoveredNode.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-700">
                {hoveredNode.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: vertical card list */}
      <div className="md:hidden">
        <div className="relative ml-4 border-l-2 border-paper-300 pl-6">
          {nodes.map((node, i) => {
            const style = categoryStyle[node.category]
            return (
              <div key={node.id} className="relative mb-4 last:mb-0">
                {/* Connector dot */}
                <span
                  className="absolute -left-[31px] top-3 h-3 w-3 rounded-full border-2"
                  style={{
                    borderColor: style.stroke,
                    backgroundColor: style.fill,
                  }}
                />
                {/* Arrow between cards */}
                {i < nodes.length - 1 && (
                  <span className="absolute -left-[26px] bottom-[-12px] text-xs text-neutral">
                    ▼
                  </span>
                )}
                <div
                  className="rounded border bg-paper-100 p-3"
                  style={{ borderColor: style.stroke + '60' }}
                >
                  <p className="font-mono text-xs text-neutral">{node.date}</p>
                  <p className="font-serif text-sm font-bold text-ink-800">
                    {node.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-700">
                    {node.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
