import { useState } from 'react'

type NodeCategory = 'evidence' | 'taiwan' | 'us' | 'result'

interface FlowNode {
  id: string
  date: string
  title: string
  description: string
  category: NodeCategory
  isKeyEvidence?: boolean
}

interface FlowEdge {
  from: string
  to: string
}

const categoryStyle: Record<
  NodeCategory,
  { fill: string; stroke: string; label: string }
> = {
  evidence: { fill: '#b8943e18', stroke: '#b8943e', label: '關鍵證物' },
  taiwan: { fill: '#c23b2218', stroke: '#c23b22', label: '台灣側' },
  us: { fill: '#4a6fa518', stroke: '#4a6fa5', label: '美國側' },
  result: { fill: '#3d383318', stroke: '#3d3833', label: '結果' },
}

const nodes: FlowNode[] = [
  {
    id: 'fingerprint',
    date: '1984.10',
    title: '指紋（自行車把手）',
    description: '劉宜良車庫現場的自行車把手上採集到的指紋，成為破案的第一條線索。',
    category: 'evidence',
    isKeyEvidence: true,
  },
  {
    id: 'chen-id',
    date: '1984.10',
    title: '陳啟禮身份確認',
    description: '指紋比對結果鎖定陳啟禮，將調查方向從普通刑案轉向有組織犯罪。',
    category: 'taiwan',
  },
  {
    id: 'fbi',
    date: '1984.10.22',
    title: 'FBI 介入',
    description: '竹聯幫成員阮大方與李乃義在舊金山唐人街假日酒店與 FBI 幹員 Tony Lau 會面，美方正式介入。',
    category: 'us',
  },
  {
    id: 'pi-arrest',
    date: '1984.11.22',
    title: '皮繼昂被捕',
    description: '皮繼昂在舊金山落網，成為被捕的第一人，口供確認兩名槍手身分。',
    category: 'us',
  },
  {
    id: 'informants',
    date: '1984.11',
    title: '阮大方/李乃義提供線索',
    description: '竹聯幫內部線人持續向 FBI 提供情報，拼湊出完整的任務脈絡。',
    category: 'us',
  },
  {
    id: 'yiqing',
    date: '1984.11.12',
    title: '一清專案',
    description: '汪敬煦主導的全台掃黑行動，表面掃黑，實則「大汪鬥小汪」——藉此打擊汪希苓的竹聯幫人脈。',
    category: 'taiwan',
  },
  {
    id: 'chen-arrest',
    date: '1984.11.12',
    title: '陳啟禮被捕',
    description: '陳啟禮落網時高喊自己是情報局人員。警方在他身上搜出一本筆記，記載任務細節。',
    category: 'taiwan',
  },
  {
    id: 'notebook',
    date: '1984.11',
    title: '筆記本「誅殺叛逆」',
    description: '陳啟禮親筆書寫的任務供述，成為指向情報局的直接證據。',
    category: 'evidence',
    isKeyEvidence: true,
  },
  {
    id: 'tape',
    date: '1985.01.13',
    title: '白狼交出錄音帶',
    description: '紐約林肯廣場酒店 707 號房，張安樂將陳啟禮的「保命錄音帶」親手交給 FBI。',
    category: 'evidence',
    isKeyEvidence: true,
  },
  {
    id: 'fbi-play',
    date: '1985.01.14',
    title: 'FBI 播放錄音帶',
    description: '錄音帶內容證實情報局涉案，整個政治架構在此刻開始崩塌。',
    category: 'us',
  },
  {
    id: 'wang-suspend',
    date: '1985.01',
    title: '汪希苓停職',
    description: '情報局長汪希苓被免職停職，全案正式曝光。台灣政壇震動。',
    category: 'result',
  },
]

const edges: FlowEdge[] = [
  { from: 'fingerprint', to: 'chen-id' },
  { from: 'chen-id', to: 'fbi' },
  { from: 'fbi', to: 'pi-arrest' },
  { from: 'fbi', to: 'informants' },
  { from: 'pi-arrest', to: 'informants' },
  { from: 'informants', to: 'yiqing' },
  { from: 'yiqing', to: 'chen-arrest' },
  { from: 'chen-arrest', to: 'notebook' },
  { from: 'notebook', to: 'tape' },
  { from: 'tape', to: 'fbi-play' },
  { from: 'fbi-play', to: 'wang-suspend' },
]

// Layout positions: col 0 = Taiwan side, col 1 = US side
const nodePositions: Record<string, { col: number; row: number }> = {
  fingerprint: { col: 0, row: 0 },
  'chen-id': { col: 0, row: 1 },
  fbi: { col: 1, row: 1 },
  'pi-arrest': { col: 1, row: 2 },
  informants: { col: 1, row: 3 },
  yiqing: { col: 0, row: 3 },
  'chen-arrest': { col: 0, row: 4 },
  notebook: { col: 0, row: 5 },
  tape: { col: 0, row: 6 },
  'fbi-play': { col: 1, row: 6 },
  'wang-suspend': { col: 0, row: 7 },
}

interface InvestigationFlowchartProps {
  className?: string
}

export default function InvestigationFlowchart({
  className = '',
}: InvestigationFlowchartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const hoveredNode = hoveredId ? nodes.find((n) => n.id === hoveredId) : null

  const colWidth = 280
  const rowHeight = 65
  const nodeW = 220
  const nodeH = 45
  const padX = 50
  const padY = 40
  const svgW = padX * 2 + colWidth * 2
  const svgH = padY * 2 + rowHeight * 8

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
        偵查線索追蹤
      </h2>
      <p className="mb-4 text-center text-sm text-neutral">
        從車庫指紋到全案曝光——一場橫跨太平洋的偵查拼圖。
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

      {/* Column labels */}
      <div className="mb-2 hidden justify-center gap-4 md:flex" style={{ maxWidth: svgW, margin: '0 auto' }}>
        <div className="flex-1 text-center">
          <span className="text-xs font-bold" style={{ color: '#c23b22' }}>台灣側</span>
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs font-bold" style={{ color: '#4a6fa5' }}>美國側</span>
        </div>
      </div>

      {/* Desktop: SVG */}
      <div className="hidden overflow-x-auto md:block">
        <div className="relative mx-auto" style={{ maxWidth: svgW }}>
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full"
            aria-label="偵查流程圖：從指紋線索到全案曝光的調查過程"
          >
            <defs>
              <marker
                id="flow-arrow"
                markerWidth={8}
                markerHeight={6}
                refX={8}
                refY={3}
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#8b7d6b" />
              </marker>
            </defs>

            {/* Edges */}
            {edges.map((edge) => {
              const from = getNodeCenter(edge.from)
              const to = getNodeCenter(edge.to)
              const fromPos = nodePositions[edge.from]
              const toPos = nodePositions[edge.to]
              const isHighlighted = hoveredId === edge.from || hoveredId === edge.to
              const isCrossColumn = fromPos.col !== toPos.col

              // Use the appropriate side color
              const lineColor = isCrossColumn
                ? '#8b7d6b'
                : toPos.col === 0
                  ? '#c23b2280'
                  : '#4a6fa580'

              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x}
                  y1={from.y + nodeH / 2 - 2}
                  x2={to.x}
                  y2={to.y - nodeH / 2 + 2}
                  stroke={isHighlighted ? '#3d3833' : lineColor}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeOpacity={hoveredId && !isHighlighted ? 0.15 : 0.7}
                  strokeDasharray={isCrossColumn ? '4 3' : undefined}
                  markerEnd="url(#flow-arrow)"
                />
              )
            })}

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
                    stroke={node.isKeyEvidence ? '#b8943e' : style.stroke}
                    strokeWidth={node.isKeyEvidence ? 2.5 : isHovered ? 2.5 : 1.5}
                  />
                  {node.isKeyEvidence && (
                    <text
                      x={x + nodeW - 8}
                      y={y + 12}
                      fontSize={9}
                      fill="#b8943e"
                      textAnchor="end"
                      fontWeight="bold"
                    >
                      證物
                    </text>
                  )}
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
              <p className="font-mono text-xs text-neutral">{hoveredNode.date}</p>
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
                <span
                  className="absolute -left-[31px] top-3 h-3 w-3 rounded-full border-2"
                  style={{
                    borderColor: node.isKeyEvidence ? '#b8943e' : style.stroke,
                    backgroundColor: node.isKeyEvidence ? '#b8943e30' : style.fill,
                  }}
                />
                {i < nodes.length - 1 && (
                  <span className="absolute -left-[26px] bottom-[-12px] text-xs text-neutral">
                    ▼
                  </span>
                )}
                <div
                  className="rounded border bg-paper-100 p-3"
                  style={{ borderColor: node.isKeyEvidence ? '#b8943e' : style.stroke + '60' }}
                >
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-neutral">{node.date}</p>
                    {node.isKeyEvidence && (
                      <span className="rounded bg-[#b8943e20] px-1.5 py-0.5 text-[10px] font-bold text-[#b8943e]">
                        關鍵證物
                      </span>
                    )}
                  </div>
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
