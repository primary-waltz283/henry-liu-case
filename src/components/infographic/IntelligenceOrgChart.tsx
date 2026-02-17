import { useState } from 'react'

interface OrgNode {
  id: string
  title: string
  name: string | null
  description: string
  highlight?: boolean
  children?: OrgNode[]
}

const orgTree: OrgNode = {
  id: 'president',
  title: '總統',
  name: '蔣經國',
  description: '中華民國總統，情治系統最高掌控者。所有情報機構最終向其負責。',
  children: [
    {
      id: 'nsb',
      title: '國家安全局',
      name: '汪敬煦',
      description:
        '國家安全最高統籌機構，汪敬煦任局長。與汪希苓存在權力競爭（「兩汪之爭」）。',
      children: [
        {
          id: 'garrison',
          title: '警備總部',
          name: null,
          description: '負責戒嚴時期社會治安及政治犯監控，白色恐怖時期的執行機構之一。',
        },
      ],
    },
    {
      id: 'mod',
      title: '國防部',
      name: null,
      description: '統轄軍事情報與政戰系統。',
      children: [
        {
          id: 'bmi',
          title: '情報局',
          name: '汪希苓',
          description:
            '軍事情報局前身。汪希苓任局長，直接下令制裁劉宜良。江南案的核心機構。',
          highlight: true,
          children: [
            {
              id: 'dept3',
              title: '第三處',
              name: '陳虎門',
              description:
                '負責海外情報行動的執行部門。副處長陳虎門負責聯絡陳啟禮、安排受訓及任務協調。',
              highlight: true,
            },
            {
              id: 'deputy',
              title: '副局長',
              name: '胡儀敏',
              description:
                '情報局副局長（少將）。汪希苓繞開不支持計畫的副局長荊自立，改用胡儀敏參與暗殺計畫。',
              highlight: true,
            },
          ],
        },
        {
          id: 'political-warfare',
          title: '政戰部',
          name: null,
          description:
            '蘇聯模式政工體系，在軍隊及政府機關安插政治監察員。1951年創立政工幹部學校，劉宜良為首批學員。',
        },
      ],
    },
    {
      id: 'investigation-bureau',
      title: '調查局',
      name: null,
      description: '隸屬行政院，負責國內安全調查、反間諜及社會監控。',
    },
  ],
}

/** Collect all nodes into a flat list */
function flattenNodes(node: OrgNode): OrgNode[] {
  const result = [node]
  if (node.children) {
    for (const child of node.children) {
      result.push(...flattenNodes(child))
    }
  }
  return result
}

const allNodes = flattenNodes(orgTree)

interface IntelligenceOrgChartProps {
  className?: string
}

/**
 * Hierarchical intelligence agency org chart for Chapter 1.
 *
 * Desktop: tree layout with hover interactions.
 * Mobile: indented list with expand/collapse.
 */
export default function IntelligenceOrgChart({
  className = '',
}: IntelligenceOrgChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [expandedMobile, setExpandedMobile] = useState<Set<string>>(
    new Set(['president'])
  )

  const hoveredNode = hoveredId
    ? allNodes.find((n) => n.id === hoveredId)
    : null

  const toggleMobile = (id: string) => {
    setExpandedMobile((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className={`py-12 ${className}`}>
      <h2 className="mb-2 text-center font-serif text-2xl font-bold text-ink-800">
        情治系統組織圖
      </h2>
      <p className="mb-8 text-center text-sm text-neutral">
        1980 年代台灣五大情報機構架構。金色邊框標示江南案核心單位。
      </p>

      {/* Desktop: SVG tree */}
      <div className="hidden md:block">
        <div className="relative mx-auto" style={{ maxWidth: 800 }}>
          <svg
            viewBox="0 0 800 520"
            className="w-full"
            aria-label="台灣情治系統組織圖：蔣經國為頂端，下轄國家安全局、國防部、調查局三大系統"
          >
            {/* Connection lines */}
            {/* President -> 3 children */}
            <line x1={400} y1={60} x2={400} y2={90} stroke="#8b7d6b" strokeWidth={2} />
            <line x1={150} y1={90} x2={650} y2={90} stroke="#8b7d6b" strokeWidth={2} />
            <line x1={150} y1={90} x2={150} y2={120} stroke="#8b7d6b" strokeWidth={2} />
            <line x1={400} y1={90} x2={400} y2={120} stroke="#8b7d6b" strokeWidth={2} />
            <line x1={650} y1={90} x2={650} y2={120} stroke="#8b7d6b" strokeWidth={2} />

            {/* NSB -> Garrison */}
            <line x1={150} y1={180} x2={150} y2={260} stroke="#8b7d6b" strokeWidth={2} />

            {/* MoD -> Intelligence Bureau + Political Warfare */}
            <line x1={400} y1={180} x2={400} y2={210} stroke="#8b7d6b" strokeWidth={2} />
            <line x1={310} y1={210} x2={530} y2={210} stroke="#8b7d6b" strokeWidth={2} />
            <line x1={310} y1={210} x2={310} y2={240} stroke="#8b7d6b" strokeWidth={2} />
            <line x1={530} y1={210} x2={530} y2={240} stroke="#8b7d6b" strokeWidth={2} />

            {/* Intelligence Bureau -> Dept3 + Deputy */}
            <line x1={310} y1={310} x2={310} y2={340} stroke="#8b7d6b" strokeWidth={2} />
            <line x1={230} y1={340} x2={390} y2={340} stroke="#8b7d6b" strokeWidth={2} />
            <line x1={230} y1={340} x2={230} y2={370} stroke="#8b7d6b" strokeWidth={2} />
            <line x1={390} y1={340} x2={390} y2={370} stroke="#8b7d6b" strokeWidth={2} />

            {/* "兩汪之爭" conflict line */}
            <line
              x1={200} y1={150} x2={260} y2={275}
              stroke="#c23b22"
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
            <text
              x={195} y={215}
              fill="#c23b22"
              fontSize={11}
              fontStyle="italic"
              transform="rotate(-35, 195, 215)"
            >
              兩汪之爭
            </text>

            {/* Node rendering */}
            <OrgNodeSvg
              x={400} y={30}
              node={orgTree}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
            {/* Level 2: NSB, MoD, Investigation Bureau */}
            <OrgNodeSvg x={150} y={120} node={orgTree.children![0]} hoveredId={hoveredId} onHover={setHoveredId} />
            <OrgNodeSvg x={400} y={120} node={orgTree.children![1]} hoveredId={hoveredId} onHover={setHoveredId} />
            <OrgNodeSvg x={650} y={120} node={orgTree.children![2]} hoveredId={hoveredId} onHover={setHoveredId} />
            {/* Level 3: Garrison, Intelligence Bureau, Political Warfare */}
            <OrgNodeSvg x={150} y={260} node={orgTree.children![0].children![0]} hoveredId={hoveredId} onHover={setHoveredId} />
            <OrgNodeSvg x={310} y={240} node={orgTree.children![1].children![0]} hoveredId={hoveredId} onHover={setHoveredId} />
            <OrgNodeSvg x={530} y={240} node={orgTree.children![1].children![1]} hoveredId={hoveredId} onHover={setHoveredId} />
            {/* Level 4: Dept3, Deputy */}
            <OrgNodeSvg x={230} y={370} node={orgTree.children![1].children![0].children![0]} hoveredId={hoveredId} onHover={setHoveredId} />
            <OrgNodeSvg x={390} y={370} node={orgTree.children![1].children![0].children![1]} hoveredId={hoveredId} onHover={setHoveredId} />
          </svg>

          {/* Hover tooltip */}
          {hoveredNode && (
            <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 rounded border border-paper-300 bg-paper-100 p-3 shadow-md"
              style={{ maxWidth: 320 }}
            >
              <p className="font-serif text-sm font-bold text-ink-800">
                {hoveredNode.title}
                {hoveredNode.name && (
                  <span className="ml-2 font-normal text-neutral">
                    {hoveredNode.name}
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-700">
                {hoveredNode.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: indented list */}
      <div className="md:hidden">
        <MobileOrgNode
          node={orgTree}
          depth={0}
          expanded={expandedMobile}
          onToggle={toggleMobile}
        />
      </div>
    </div>
  )
}

/** SVG org chart node */
function OrgNodeSvg({
  x,
  y,
  node,
  hoveredId,
  onHover,
}: {
  x: number
  y: number
  node: OrgNode
  hoveredId: string | null
  onHover: (id: string | null) => void
}) {
  const isHovered = hoveredId === node.id
  const w = 120
  const h = 55

  return (
    <g
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x={x - w / 2}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill={isHovered ? '#e8dfd2' : '#f5f0e8'}
        stroke={node.highlight ? '#b8943e' : '#3d3833'}
        strokeWidth={node.highlight ? 2.5 : 1.5}
      />
      <text
        x={x}
        y={y + 22}
        textAnchor="middle"
        fontSize={13}
        fontWeight="bold"
        fill="#2d2a26"
      >
        {node.title}
      </text>
      {node.name && (
        <text
          x={x}
          y={y + 40}
          textAnchor="middle"
          fontSize={11}
          fill="#8b7d6b"
        >
          {node.name}
        </text>
      )}
    </g>
  )
}

/** Mobile recursive list node */
function MobileOrgNode({
  node,
  depth,
  expanded,
  onToggle,
}: {
  node: OrgNode
  depth: number
  expanded: Set<string>
  onToggle: (id: string) => void
}) {
  const isExpanded = expanded.has(node.id)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div style={{ marginLeft: depth * 16 }}>
      <button
        type="button"
        onClick={() => onToggle(node.id)}
        className={`mb-1 w-full rounded border px-3 py-2 text-left transition-colors ${
          node.highlight
            ? 'border-evidence-gold bg-paper-100'
            : 'border-paper-300 bg-paper-50'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="font-serif text-sm font-bold text-ink-800">
              {node.title}
            </span>
            {node.name && (
              <span className="ml-2 text-xs text-neutral">{node.name}</span>
            )}
          </div>
          {hasChildren && (
            <span className="text-xs text-neutral">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
        </div>
        {isExpanded && (
          <p className="mt-1 text-xs leading-relaxed text-ink-700">
            {node.description}
          </p>
        )}
      </button>
      {isExpanded &&
        hasChildren &&
        node.children!.map((child) => (
          <MobileOrgNode
            key={child.id}
            node={child}
            depth={depth + 1}
            expanded={expanded}
            onToggle={onToggle}
          />
        ))}
    </div>
  )
}
