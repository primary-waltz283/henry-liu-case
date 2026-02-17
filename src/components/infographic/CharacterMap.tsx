import { useState, useMemo } from 'react'
import {
  coreCharacters,
  characterById,
  groupMeta,
  type Character,
  type CharacterGroup,
} from '../../data/characters'
import CharacterCard from './CharacterCard'

/** SVG layout constants */
const CX = 500
const CY = 400
const OUTER_R = 300
const NODE_R = 28
const CENTER_R = 38
const SVG_W = 1000
const SVG_H = 800

/** Groups to display (in radial order) */
const GROUP_ORDER: CharacterGroup[] = [
  'bamboo-union',
  'intelligence',
  'chiang-family',
  'investigation',
  'family',
  'international',
]

interface NodePos {
  x: number
  y: number
  character: Character
}

/**
 * Interactive SVG-based radial character relationship map.
 * Liu Yi-liang at center, six groups arranged radially.
 */
export default function CharacterMap() {
  const [selected, setSelected] = useState<Character | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const centerChar = characterById.get('liu-yi-liang')!

  /** Position nodes by group in radial sectors */
  const nodePositions = useMemo(() => {
    const positions: NodePos[] = []
    const sectorAngle = (2 * Math.PI) / GROUP_ORDER.length

    GROUP_ORDER.forEach((group, gi) => {
      const members = coreCharacters.filter(
        (c) => c.group === group && c.id !== 'liu-yi-liang',
      )
      const sectorStart = gi * sectorAngle - Math.PI / 2
      const sectorMid = sectorStart + sectorAngle / 2

      members.forEach((char, ci) => {
        const count = members.length
        // Spread within sector
        const angleSpread = sectorAngle * 0.7
        const angleOffset =
          count === 1
            ? 0
            : ((ci / (count - 1)) - 0.5) * angleSpread
        const angle = sectorMid + angleOffset
        // Vary radius slightly to avoid overlap
        const r = OUTER_R + (ci % 2 === 0 ? 0 : 25)

        positions.push({
          x: CX + r * Math.cos(angle),
          y: CY + r * Math.sin(angle),
          character: char,
        })
      })
    })

    return positions
  }, [])

  /** All relationship edges (only between core characters) */
  const edges = useMemo(() => {
    const result: Array<{
      from: string
      to: string
      type: string
    }> = []
    const seen = new Set<string>()

    for (const node of nodePositions) {
      for (const rel of node.character.relationships) {
        if (!characterById.has(rel.target)) continue
        const key = [node.character.id, rel.target].sort().join('|')
        if (seen.has(key)) continue
        seen.add(key)
        result.push({
          from: node.character.id,
          to: rel.target,
          type: rel.type,
        })
      }
    }
    // Also edges from center character
    for (const rel of centerChar.relationships) {
      if (!characterById.has(rel.target)) continue
      const key = [centerChar.id, rel.target].sort().join('|')
      if (!seen.has(key)) {
        seen.add(key)
        result.push({ from: centerChar.id, to: rel.target, type: rel.type })
      }
    }

    return result
  }, [nodePositions, centerChar])

  const getPos = (id: string): { x: number; y: number } => {
    if (id === 'liu-yi-liang') return { x: CX, y: CY }
    const node = nodePositions.find((n) => n.character.id === id)
    return node ?? { x: CX, y: CY }
  }

  /** Check if a character is connected to hovered/selected */
  const isHighlighted = (id: string) => {
    const focusId = hoveredId ?? selected?.id
    if (!focusId) return true // nothing focused, show all
    if (id === focusId) return true
    return edges.some(
      (e) =>
        (e.from === focusId && e.to === id) ||
        (e.to === focusId && e.from === id),
    )
  }

  const isEdgeHighlighted = (from: string, to: string) => {
    const focusId = hoveredId ?? selected?.id
    if (!focusId) return false
    return focusId === from || focusId === to
  }

  return (
    <section
      id="character-map"
      className="mx-auto max-w-5xl px-4 py-16"
      aria-label="人物關係圖"
    >
      <h2 className="mb-2 text-center font-serif text-2xl font-bold text-ink-900">
        人物關係圖
      </h2>
      <p className="mb-8 text-center text-sm text-neutral">
        點擊人物節點查看詳細資料；連線表示人物之間的關係。
      </p>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {GROUP_ORDER.map((g) => {
          const meta = groupMeta[g]
          return (
            <span
              key={g}
              className="inline-flex items-center gap-1.5 text-xs"
            >
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: meta.color }}
              />
              {meta.label}
            </span>
          )
        })}
        <span className="inline-flex items-center gap-1.5 text-xs">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: groupMeta.victim.color }}
          />
          {groupMeta.victim.label}
        </span>
      </div>

      <div className="relative">
        {/* SVG map */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          role="img"
          aria-label="江南案人物關係圖"
        >
          {/* Edges */}
          {edges.map((e) => {
            const from = getPos(e.from)
            const to = getPos(e.to)
            const highlighted = isEdgeHighlighted(e.from, e.to)
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={highlighted ? '#c23b22' : '#d4c9b8'}
                strokeWidth={highlighted ? 2 : 1}
                opacity={highlighted ? 0.8 : 0.3}
              />
            )
          })}

          {/* Group sector labels */}
          {GROUP_ORDER.map((group, gi) => {
            const sectorAngle = (2 * Math.PI) / GROUP_ORDER.length
            const angle = gi * sectorAngle - Math.PI / 2 + sectorAngle / 2
            const labelR = 140 * 0.6
            const x = CX + labelR * Math.cos(angle)
            const y = CY + labelR * Math.sin(angle)
            const meta = groupMeta[group]
            return (
              <text
                key={group}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={meta.color}
                fontSize="12"
                fontWeight="bold"
                opacity={0.5}
              >
                {meta.label}
              </text>
            )
          })}

          {/* Outer nodes */}
          {nodePositions.map(({ x, y, character }) => {
            const meta = groupMeta[character.group]
            const highlighted = isHighlighted(character.id)
            const isSelected = selected?.id === character.id
            return (
              <g
                key={character.id}
                className="cursor-pointer"
                opacity={highlighted ? 1 : 0.3}
                onClick={() => setSelected(character)}
                onMouseEnter={() => setHoveredId(character.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={NODE_R}
                  fill={meta.bgColor}
                  stroke={isSelected ? '#c23b22' : meta.color}
                  strokeWidth={isSelected ? 3 : 1.5}
                />
                <text
                  x={x}
                  y={y - 4}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={meta.color}
                  fontSize="13"
                  fontWeight="bold"
                >
                  {character.nameCht.length > 3
                    ? character.nameCht.slice(0, 3)
                    : character.nameCht}
                </text>
                {character.aliases.length > 0 && (
                  <text
                    x={x}
                    y={y + 12}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={meta.color}
                    fontSize="9"
                    opacity={0.7}
                  >
                    {character.aliases[0]}
                  </text>
                )}
              </g>
            )
          })}

          {/* Center node: Liu Yi-liang */}
          <g
            className="cursor-pointer"
            onClick={() => setSelected(centerChar)}
            onMouseEnter={() => setHoveredId('liu-yi-liang')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <circle
              cx={CX}
              cy={CY}
              r={CENTER_R}
              fill="#c23b2220"
              stroke="#c23b22"
              strokeWidth={selected?.id === 'liu-yi-liang' ? 4 : 2}
            />
            <text
              x={CX}
              y={CY - 6}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#c23b22"
              fontSize="16"
              fontWeight="bold"
            >
              劉宜良
            </text>
            <text
              x={CX}
              y={CY + 12}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#c23b22"
              fontSize="10"
              opacity={0.7}
            >
              江南
            </text>
          </g>
        </svg>

        {/* Character detail card overlay */}
        {selected && (
          <div className="absolute top-4 right-4 z-10">
            <CharacterCard
              character={selected}
              onClose={() => setSelected(null)}
            />
          </div>
        )}
      </div>
    </section>
  )
}
