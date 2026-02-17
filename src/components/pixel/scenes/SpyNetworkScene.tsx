import { useCallback, useRef } from 'react'
import { Application, Graphics } from 'pixi.js'
import PixiCanvas from '../PixiCanvas'

// Color palette
const BG = 0x1a2a1a
const LAND = 0x3d4a3d
const TAIWAN = 0xb8943e
const LINE_ACTIVE = 0x4a6fa5
const LINE_DIM = 0x5a5248
const NODE_EMBASSY = 0xc23b22
const NODE_INTEL = 0xe8a832
const TEXT_COLOR = 0xc9b99a

const W = 320
const H = 180

// Simplified Pacific-region map coordinates (pixel positions)
const TAIWAN_POS = { x: 85, y: 85 }
const INTEL_POSTS = [
  { x: 70, y: 100, label: 'HK' },    // Hong Kong
  { x: 55, y: 80, label: 'TYO' },    // Tokyo
  { x: 75, y: 115, label: 'SGP' },   // Singapore
  { x: 60, y: 110, label: 'BKK' },   // Bangkok
  { x: 15, y: 65, label: 'PAR' },    // Paris
]
const US_CITIES = [
  { x: 230, y: 55 }, { x: 245, y: 60 }, { x: 260, y: 50 },  // East coast
  { x: 200, y: 50 }, { x: 210, y: 55 }, { x: 220, y: 60 },  // Midwest
  { x: 190, y: 70 }, { x: 205, y: 75 }, { x: 195, y: 60 },  // Central
  { x: 175, y: 55 }, { x: 180, y: 65 }, { x: 170, y: 70 },  // West
  { x: 165, y: 60 }, { x: 250, y: 70 }, { x: 240, y: 80 },  // More cities
]

interface SceneState {
  mapBg: Graphics
  taiwan: Graphics
  connections: Graphics
  intNodes: Graphics
  usNodes: Graphics
  pulses: Graphics
  textLayer: Graphics
  warning: Graphics
}

function drawSimplifiedMap(g: Graphics) {
  // Asia landmass (simplified)
  g.rect(20, 40, 80, 70).fill(LAND)
  g.rect(10, 50, 30, 40).fill(LAND)
  // Japan
  g.rect(60, 55, 4, 15).fill(LAND)
  // Southeast Asia
  g.rect(55, 100, 30, 30).fill(LAND)
  // Australia
  g.rect(70, 140, 30, 18).fill(LAND)
  // Americas
  g.rect(160, 30, 60, 50).fill(LAND)   // North America
  g.rect(170, 20, 45, 30).fill(LAND)   // Canada
  g.rect(200, 80, 30, 15).fill(LAND)   // Central America
  g.rect(210, 95, 35, 45).fill(LAND)   // South America
  // Pacific ocean is the gap between
}

function setupScene(app: Application): SceneState {
  const mapBg = new Graphics()
  drawSimplifiedMap(mapBg)
  mapBg.alpha = 0
  app.stage.addChild(mapBg)

  const taiwan = new Graphics()
  taiwan.rect(-4, -8, 8, 16).fill(TAIWAN)
  taiwan.position.set(TAIWAN_POS.x, TAIWAN_POS.y)
  taiwan.alpha = 0
  app.stage.addChild(taiwan)

  const connections = new Graphics()
  app.stage.addChild(connections)

  const intNodes = new Graphics()
  intNodes.alpha = 0
  app.stage.addChild(intNodes)

  const usNodes = new Graphics()
  usNodes.alpha = 0
  app.stage.addChild(usNodes)

  const pulses = new Graphics()
  app.stage.addChild(pulses)

  const textLayer = new Graphics()
  app.stage.addChild(textLayer)

  const warning = new Graphics()
  warning.alpha = 0
  app.stage.addChild(warning)

  return { mapBg, taiwan, connections, intNodes, usNodes, pulses, textLayer, warning }
}

function drawLine(g: Graphics, x1: number, y1: number, x2: number, y2: number, color: number, alpha: number) {
  g.moveTo(x1, y1).lineTo(x2, y2).stroke({ width: 1, color, alpha })
}

function updateScene(state: SceneState, p: number) {
  const { mapBg, taiwan, connections, intNodes, usNodes, pulses, warning } = state

  connections.clear()
  pulses.clear()

  // 0.00-0.20: Map fades in, Taiwan lights up
  if (p < 0.20) {
    const t = p / 0.20
    mapBg.alpha = t * 0.7
    taiwan.alpha = t
    // Taiwan pulse effect
    const pulse = Math.sin(t * Math.PI * 4) * 0.3 + 0.7
    taiwan.scale.set(pulse)
    intNodes.alpha = 0
    usNodes.alpha = 0
    warning.alpha = 0
  }

  // 0.20-0.40: First wave - Asia intel posts
  else if (p < 0.40) {
    const t = (p - 0.20) / 0.20
    mapBg.alpha = 0.7
    taiwan.alpha = 1
    taiwan.scale.set(1)

    // Draw connections to intel posts
    for (let i = 0; i < INTEL_POSTS.length; i++) {
      const nodeT = Math.max(0, Math.min(1, (t - i * 0.15) * 3))
      if (nodeT > 0) {
        const post = INTEL_POSTS[i]
        const ex = TAIWAN_POS.x + (post.x - TAIWAN_POS.x) * nodeT
        const ey = TAIWAN_POS.y + (post.y - TAIWAN_POS.y) * nodeT
        drawLine(connections, TAIWAN_POS.x, TAIWAN_POS.y, ex, ey, LINE_ACTIVE, nodeT * 0.6)
      }
    }

    // Intel nodes appear
    intNodes.clear()
    for (let i = 0; i < INTEL_POSTS.length; i++) {
      const nodeT = Math.max(0, Math.min(1, (t - i * 0.15) * 3))
      if (nodeT > 0) {
        const post = INTEL_POSTS[i]
        intNodes.rect(post.x - 2, post.y - 2, 4, 4).fill({ color: NODE_INTEL, alpha: nodeT })
      }
    }
    intNodes.alpha = 1
    usNodes.alpha = 0
    warning.alpha = 0
  }

  // 0.40-0.60: Second wave - US embassy nodes
  else if (p < 0.60) {
    const t = (p - 0.40) / 0.20
    mapBg.alpha = 0.7
    taiwan.alpha = 1
    taiwan.scale.set(1)

    // Keep Asia connections
    for (const post of INTEL_POSTS) {
      drawLine(connections, TAIWAN_POS.x, TAIWAN_POS.y, post.x, post.y, LINE_ACTIVE, 0.6)
    }
    intNodes.alpha = 1

    // US connections appear
    for (let i = 0; i < US_CITIES.length; i++) {
      const nodeT = Math.max(0, Math.min(1, (t - i * 0.04) * 2.5))
      if (nodeT > 0) {
        const city = US_CITIES[i]
        const ex = TAIWAN_POS.x + (city.x - TAIWAN_POS.x) * nodeT
        const ey = TAIWAN_POS.y + (city.y - TAIWAN_POS.y) * nodeT
        drawLine(connections, TAIWAN_POS.x, TAIWAN_POS.y, ex, ey, LINE_DIM, nodeT * 0.3)
      }
    }

    // US nodes
    usNodes.clear()
    for (let i = 0; i < US_CITIES.length; i++) {
      const nodeT = Math.max(0, Math.min(1, (t - i * 0.04) * 2.5))
      if (nodeT > 0) {
        const city = US_CITIES[i]
        usNodes.circle(city.x, city.y, 1.5).fill({ color: NODE_EMBASSY, alpha: nodeT })
      }
    }
    usNodes.alpha = 1
    warning.alpha = 0
  }

  // 0.60-0.80: All connections active, pulses flow
  else if (p < 0.80) {
    const t = (p - 0.60) / 0.20
    mapBg.alpha = 0.7
    taiwan.alpha = 1
    taiwan.scale.set(1)
    intNodes.alpha = 1
    usNodes.alpha = 1

    // All connections
    for (const post of INTEL_POSTS) {
      drawLine(connections, TAIWAN_POS.x, TAIWAN_POS.y, post.x, post.y, LINE_ACTIVE, 0.6)
    }
    for (const city of US_CITIES) {
      drawLine(connections, TAIWAN_POS.x, TAIWAN_POS.y, city.x, city.y, LINE_DIM, 0.3)
    }

    // Animated pulses along connections
    const pulsePhase = t * 8
    for (let i = 0; i < 5; i++) {
      const pulsePct = ((pulsePhase + i * 0.2) % 1)
      const target = INTEL_POSTS[i % INTEL_POSTS.length]
      const px = TAIWAN_POS.x + (target.x - TAIWAN_POS.x) * pulsePct
      const py = TAIWAN_POS.y + (target.y - TAIWAN_POS.y) * pulsePct
      pulses.circle(px, py, 2).fill({ color: LINE_ACTIVE, alpha: 0.8 })
    }

    // Counter text simulated with small rectangles
    const counterAlpha = Math.min(t * 2, 1)
    pulses.rect(250, 150, 60, 10).fill({ color: TEXT_COLOR, alpha: counterAlpha * 0.5 })

    warning.alpha = 0
  }

  // 0.80-1.00: Warning indicator on US
  else {
    const t = (p - 0.80) / 0.20
    mapBg.alpha = 0.7
    taiwan.alpha = 1
    taiwan.scale.set(1)
    intNodes.alpha = 1
    usNodes.alpha = 1

    // All connections
    for (const post of INTEL_POSTS) {
      drawLine(connections, TAIWAN_POS.x, TAIWAN_POS.y, post.x, post.y, LINE_ACTIVE, 0.6)
    }
    for (const city of US_CITIES) {
      drawLine(connections, TAIWAN_POS.x, TAIWAN_POS.y, city.x, city.y, LINE_DIM, 0.3)
    }

    // Warning flash on US
    const flash = Math.sin(t * Math.PI * 6) > 0 ? 1 : 0.3
    warning.clear()
    warning.circle(200, 60, 8).fill({ color: NODE_EMBASSY, alpha: flash * 0.6 })
    // HOSTILE text indicator (small red bar)
    warning.rect(188, 72, 24, 6).fill({ color: NODE_EMBASSY, alpha: flash * 0.8 })
    warning.alpha = Math.min(t * 3, 1)

    // Scene trembles
    const shake = Math.sin(t * 40) * t * 1.5
    mapBg.position.set(shake, 0)
  }
}

interface SpyNetworkSceneProps {
  progress?: number
  className?: string
}

export default function SpyNetworkScene({ progress = 0, className }: SpyNetworkSceneProps) {
  const stateRef = useRef<SceneState | null>(null)

  const handleSetup = useCallback((app: Application) => {
    stateRef.current = setupScene(app)
  }, [])

  const handleUpdate = useCallback((_app: Application, p: number) => {
    if (stateRef.current) {
      updateScene(stateRef.current, p)
    }
  }, [])

  return (
    <PixiCanvas
      width={W}
      height={H}
      scale={3}
      backgroundColor={BG}
      progress={progress}
      onSetup={handleSetup}
      onUpdate={handleUpdate}
      className={className}
    />
  )
}
