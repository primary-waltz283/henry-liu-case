import { useCallback, useRef } from 'react'
import { Application, Graphics } from 'pixi.js'
import PixiCanvas from '../PixiCanvas'

// Color palette
const BG = 0x1a1816
const CLOCK_BORDER = 0xb8943e
const CLOCK_FACE = 0x2d2a26
const NUM_NORMAL = 0xc9b99a
const NUM_WARNING = 0xc23b22
const MAP_BG = 0x3d3833
const ROUTE_BLUE = 0x4a6fa5

const W = 320
const H = 180

// Key dates for the flip animation
const DATES = [
  { month: 'AUG', day: '02', label: '陽明山會議' },
  { month: 'AUG', day: '14', label: '赴美行前' },
  { month: 'AUG', day: '15', label: '出發' },
  { month: 'AUG', day: '18', label: '松竹山莊' },
  { month: 'SEP', day: '14', label: '抵洛杉磯' },
  { month: 'SEP', day: '20', label: '偵察行動' },
  { month: 'OCT', day: '13', label: '董桂森抵達' },
  { month: 'OCT', day: '15', label: '執行' },
]

// Map points
const TAIPEI = { x: 70, y: 145 }
const LA = { x: 215, y: 145 }
const SF = { x: 200, y: 138 }

interface SceneState {
  clockFrame: Graphics
  clockFace: Graphics
  dateDisplay: Graphics
  map: Graphics
  routes: Graphics
  icons: Graphics
  hourDisplay: Graphics
  overlay: Graphics
}

function drawRect(g: Graphics, x: number, y: number, w: number, h: number, color: number) {
  g.rect(x, y, w, h).fill(color)
}

function setupScene(app: Application): SceneState {
  // Clock frame (gold border)
  const clockFrame = new Graphics()
  drawRect(clockFrame, 95, 15, 130, 65, CLOCK_BORDER)
  drawRect(clockFrame, 98, 18, 124, 59, CLOCK_FACE)
  clockFrame.alpha = 0
  app.stage.addChild(clockFrame)

  // Clock face content
  const clockFace = new Graphics()
  app.stage.addChild(clockFace)

  // Date display (large text area)
  const dateDisplay = new Graphics()
  app.stage.addChild(dateDisplay)

  // Mini world map at bottom
  const map = new Graphics()
  // Map background
  drawRect(map, 60, 120, 200, 55, MAP_BG)
  // Simplified landmasses
  drawRect(map, 65, 130, 25, 25, 0x4a4540)    // Asia
  drawRect(map, 190, 125, 55, 35, 0x4a4540)    // North America
  // Taiwan dot
  map.circle(TAIPEI.x, TAIPEI.y, 2).fill(CLOCK_BORDER)
  // SF dot
  map.circle(SF.x, SF.y, 2).fill(NUM_WARNING)
  // LA dot
  map.circle(LA.x, LA.y, 2).fill(ROUTE_BLUE)
  map.alpha = 0
  app.stage.addChild(map)

  // Flight routes
  const routes = new Graphics()
  app.stage.addChild(routes)

  // Character icons
  const icons = new Graphics()
  app.stage.addChild(icons)

  // Hour countdown display
  const hourDisplay = new Graphics()
  app.stage.addChild(hourDisplay)

  // Overlay
  const overlay = new Graphics()
  overlay.rect(0, 0, W, H).fill(0x000000)
  overlay.alpha = 0
  app.stage.addChild(overlay)

  return { clockFrame, clockFace, dateDisplay, map, routes, icons, hourDisplay, overlay }
}

function drawDateOnClock(g: Graphics, month: string, day: string, color: number) {
  g.clear()

  // Flip card background
  drawRect(g, 110, 22, 50, 48, 0x1a1816)
  // Top half (month)
  drawRect(g, 112, 24, 46, 20, 0x252220)
  // Bottom half (day)
  drawRect(g, 112, 46, 46, 22, 0x252220)
  // Divider line
  drawRect(g, 112, 45, 46, 1, 0x3a3632)

  // Month indicator (small blocks as pixel text)
  const monthX = 118
  for (let i = 0; i < month.length; i++) {
    g.rect(monthX + i * 8, 28, 6, 10).fill({ color, alpha: 0.8 })
  }

  // Day digits (larger)
  for (let i = 0; i < day.length; i++) {
    g.rect(120 + i * 16, 48, 12, 16).fill(color)
  }
}

function drawFlightRoute(g: Graphics, from: { x: number; y: number }, to: { x: number; y: number }, t: number) {
  const cx = (from.x + to.x) / 2
  const cy = Math.min(from.y, to.y) - 15

  // Draw dashed arc
  const steps = Math.floor(t * 20)
  for (let i = 0; i < steps; i++) {
    const pct = i / 20
    const x = (1 - pct) * (1 - pct) * from.x + 2 * (1 - pct) * pct * cx + pct * pct * to.x
    const y = (1 - pct) * (1 - pct) * from.y + 2 * (1 - pct) * pct * cy + pct * pct * to.y
    if (i % 2 === 0) {
      g.circle(x, y, 0.8).fill({ color: ROUTE_BLUE, alpha: 0.7 })
    }
  }
}

function updateScene(state: SceneState, p: number) {
  const { clockFrame, dateDisplay, map, routes, icons, hourDisplay, overlay } = state

  routes.clear()
  icons.clear()
  hourDisplay.clear()

  // 0.00-0.10: Clock appears from darkness
  if (p < 0.10) {
    const t = p / 0.10
    clockFrame.alpha = t
    drawDateOnClock(dateDisplay, 'AUG', '02', NUM_NORMAL)
    map.alpha = 0
    overlay.alpha = 0
  }

  // 0.10-0.25: Date flips AUG 02 → 14 → 15 → 18
  else if (p < 0.25) {
    const t = (p - 0.10) / 0.15
    clockFrame.alpha = 1
    const dateIdx = Math.min(Math.floor(t * 4), 3)
    const d = DATES[dateIdx]
    drawDateOnClock(dateDisplay, d.month, d.day, NUM_NORMAL)

    // Map starts appearing
    map.alpha = Math.min(t * 0.5, 0.5)

    // Label area
    drawRect(icons, 170, 25, 50, 8, BG)
    icons.rect(170, 25, 50, 8).fill({ color: NUM_NORMAL, alpha: 0.3 })

    overlay.alpha = 0
  }

  // 0.25-0.40: SEP 14, flight route Taipei → LA
  else if (p < 0.40) {
    const t = (p - 0.25) / 0.15
    clockFrame.alpha = 1
    drawDateOnClock(dateDisplay, 'SEP', '14', NUM_NORMAL)

    map.alpha = 0.5 + t * 0.5

    // Draw route Taipei → LA
    drawFlightRoute(routes, TAIPEI, LA, Math.min(t * 1.5, 1))

    // Character icons moving along route
    if (t > 0.2) {
      const iconT = Math.min((t - 0.2) / 0.8, 1)
      const ix = TAIPEI.x + (LA.x - TAIPEI.x) * iconT
      const iy = TAIPEI.y - Math.sin(iconT * Math.PI) * 15
      // 4 small squares for 4 characters
      icons.rect(ix - 2, iy - 2, 4, 4).fill(CLOCK_BORDER)
      icons.rect(ix + 2, iy - 2, 4, 4).fill(0x5a5248)
      icons.rect(ix - 2, iy + 2, 4, 4).fill(0x4a4a42)
      icons.rect(ix + 2, iy + 2, 4, 4).fill(NUM_WARNING)
    }

    overlay.alpha = 0
  }

  // 0.40-0.55: Dates flip through Sep-Oct, routes expand in US
  else if (p < 0.55) {
    const t = (p - 0.40) / 0.15
    clockFrame.alpha = 1

    const dateIdx = 4 + Math.min(Math.floor(t * 3), 2)
    const d = DATES[dateIdx]
    drawDateOnClock(dateDisplay, d.month, d.day, NUM_NORMAL)

    map.alpha = 1

    // Full route Taipei → LA
    drawFlightRoute(routes, TAIPEI, LA, 1)
    // Route LA → SF developing
    drawFlightRoute(routes, LA, SF, Math.min(t * 2, 1))

    // One icon returns to Taipei (帥嶽峰)
    if (t > 0.3) {
      const retT = Math.min((t - 0.3) / 0.7, 1)
      const rx = LA.x + (TAIPEI.x - LA.x) * retT
      const ry = LA.y - Math.sin(retT * Math.PI) * 12
      icons.rect(rx - 2, ry - 2, 4, 4).fill(0x4a4a42)
    }

    // Remaining icons at LA
    icons.rect(LA.x - 3, LA.y - 6, 4, 4).fill(CLOCK_BORDER)
    icons.rect(LA.x + 1, LA.y - 6, 4, 4).fill(0x5a5248)

    overlay.alpha = 0
  }

  // 0.55-0.70: OCT 13, Dong arrives, icons converge at SF
  else if (p < 0.70) {
    const t = (p - 0.55) / 0.15
    clockFrame.alpha = 1
    drawDateOnClock(dateDisplay, 'OCT', '13', NUM_NORMAL)

    map.alpha = 1
    drawFlightRoute(routes, TAIPEI, LA, 1)
    drawFlightRoute(routes, LA, SF, 1)

    // Dong's icon moves LA → SF
    const dongT = Math.min(t * 1.5, 1)
    const dx = LA.x + (SF.x - LA.x) * dongT
    const dy = LA.y + (SF.y - LA.y) * dongT
    icons.rect(dx - 2, dy - 2, 4, 4).fill(NUM_WARNING)

    // Other icons at SF
    if (t > 0.5) {
      icons.rect(SF.x - 5, SF.y - 8, 4, 4).fill(CLOCK_BORDER)
      icons.rect(SF.x + 1, SF.y - 8, 4, 4).fill(0x5a5248)
    }

    overlay.alpha = 0
  }

  // 0.70-0.85: OCT 15, date turns red, hour countdown
  else if (p < 0.85) {
    const t = (p - 0.70) / 0.15
    clockFrame.alpha = 1
    drawDateOnClock(dateDisplay, 'OCT', '15', NUM_WARNING)

    map.alpha = 1
    drawFlightRoute(routes, TAIPEI, LA, 1)
    drawFlightRoute(routes, LA, SF, 1)

    // All icons converged at SF
    icons.rect(SF.x - 5, SF.y - 8, 4, 4).fill(CLOCK_BORDER)
    icons.rect(SF.x + 1, SF.y - 8, 4, 4).fill(0x5a5248)
    icons.rect(SF.x - 5, SF.y - 3, 4, 4).fill(NUM_WARNING)

    // Hour countdown 09:00 → 09:58
    const hour = 9
    const minute = Math.floor(t * 58)
    const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

    // Time display below clock
    drawRect(hourDisplay, 120, 72, 80, 16, BG)
    // Simulated digit blocks
    for (let i = 0; i < timeStr.length; i++) {
      if (timeStr[i] === ':') {
        hourDisplay.rect(142 + i * 10, 74, 2, 2).fill(NUM_WARNING)
        hourDisplay.rect(142 + i * 10, 80, 2, 2).fill(NUM_WARNING)
      } else {
        hourDisplay.rect(138 + i * 10, 74, 8, 12).fill(NUM_WARNING)
      }
    }

    overlay.alpha = 0
  }

  // 0.85-1.00: Clock stops at 09:58, red flash, fade to black
  else {
    const t = (p - 0.85) / 0.15
    clockFrame.alpha = 1 - t * 0.5

    // Frozen at 09:58
    drawDateOnClock(dateDisplay, 'OCT', '15', NUM_WARNING)

    // Time display frozen
    drawRect(hourDisplay, 120, 72, 80, 16, BG)
    const timeDigits = '09:58'
    for (let i = 0; i < timeDigits.length; i++) {
      if (timeDigits[i] === ':') {
        hourDisplay.rect(142 + i * 10, 74, 2, 2).fill(NUM_WARNING)
        hourDisplay.rect(142 + i * 10, 80, 2, 2).fill(NUM_WARNING)
      } else {
        hourDisplay.rect(138 + i * 10, 74, 8, 12).fill(NUM_WARNING)
      }
    }

    map.alpha = 1 - t * 0.7

    // Red flash then fade
    overlay.clear()
    if (t < 0.15) {
      overlay.rect(0, 0, W, H).fill({ color: NUM_WARNING, alpha: (0.15 - t) * 5 })
    } else {
      overlay.rect(0, 0, W, H).fill({ color: 0x000000, alpha: (t - 0.15) * 1.1 })
    }
    overlay.alpha = 1
  }
}

interface MissionClockSceneProps {
  progress?: number
  className?: string
}

export default function MissionClockScene({ progress = 0, className }: MissionClockSceneProps) {
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
