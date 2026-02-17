import { useCallback, useRef } from 'react'
import { Application, Graphics } from 'pixi.js'
import PixiCanvas from '../PixiCanvas'

// Color palette
const ROOM_BG = 0x3a2a20
const TABLE = 0x6b4d3d
const TABLECLOTH = 0x8b3030
const CERAMIC = 0xc9b99a
const WANG = 0x3d5040
const CHEN = 0x2d2a26
const LAMP_COLOR = 0xe8b050
const SHADOW = 0x1a1412
const RED_LINE = 0xc23b22

const W = 320
const H = 180

// Guest colors
const GUEST_COLORS = [0x4a4040, 0x504838, 0x3a3a4a, 0x4a3a3a, 0x3a4a3a, 0x4a4a3a]

interface SceneState {
  room: Graphics
  table: Graphics
  lamp: Graphics
  guests: Graphics[]
  wang: Graphics
  chen: Graphics
  dishes: Graphics
  eyes: Graphics
  redLine: Graphics
  overlay: Graphics
}

function drawRect(g: Graphics, x: number, y: number, w: number, h: number, color: number) {
  g.rect(x, y, w, h).fill(color)
}

function drawPerson(g: Graphics, color: number) {
  // Head
  drawRect(g, 2, 0, 10, 10, color)
  // Body
  drawRect(g, 0, 10, 14, 16, color)
}

function setupScene(app: Application): SceneState {
  // Room background
  const room = new Graphics()
  drawRect(room, 0, 0, W, H, ROOM_BG)
  // Darker floor
  drawRect(room, 0, 155, W, 25, 0x2a1a10)
  // Wall decorations (subtle)
  drawRect(room, 30, 15, 2, 40, 0x4a3a28)
  drawRect(room, 290, 15, 2, 40, 0x4a3a28)
  app.stage.addChild(room)

  // Hanging lamp
  const lamp = new Graphics()
  // Chain
  drawRect(lamp, 158, 0, 2, 20, 0x8a7a5a)
  // Shade
  drawRect(lamp, 146, 20, 26, 10, 0x8a7050)
  // Glow
  lamp.circle(160, 30, 50).fill({ color: LAMP_COLOR, alpha: 0.08 })
  lamp.circle(160, 30, 30).fill({ color: LAMP_COLOR, alpha: 0.06 })
  app.stage.addChild(lamp)

  // Round table (isometric oval)
  const table = new Graphics()
  table.ellipse(160, 110, 55, 25).fill(TABLECLOTH)
  table.ellipse(160, 108, 50, 22).fill(TABLE)
  app.stage.addChild(table)

  // Dishes and glasses on table
  const dishes = new Graphics()
  app.stage.addChild(dishes)

  // Guests (6 positions around the table)
  const guestPositions = [
    { x: 95, y: 85 },
    { x: 125, y: 75 },
    { x: 190, y: 75 },
    { x: 220, y: 85 },
    { x: 210, y: 125 },
    { x: 110, y: 125 },
  ]

  const guests: Graphics[] = []
  for (let i = 0; i < 6; i++) {
    const g = new Graphics()
    drawPerson(g, GUEST_COLORS[i])
    g.position.set(guestPositions[i].x, guestPositions[i].y)
    g.alpha = 0
    app.stage.addChild(g)
    guests.push(g)
  }

  // Wang Hsi-ling (military green, position 1 - top-right)
  const wang = new Graphics()
  drawPerson(wang, WANG)
  // Epaulette detail
  drawRect(wang, 0, 10, 2, 3, 0x6a7a5a)
  drawRect(wang, 12, 10, 2, 3, 0x6a7a5a)
  wang.position.set(190, 75)
  wang.alpha = 0
  app.stage.addChild(wang)

  // Chen Chi-li (dark suit, position 6 - bottom-left)
  const chen = new Graphics()
  drawPerson(chen, CHEN)
  chen.position.set(110, 125)
  chen.alpha = 0
  app.stage.addChild(chen)

  // Eyes detail (Wang's zoom-in)
  const eyes = new Graphics()
  drawRect(eyes, 0, 0, 4, 2, 0xd0c8b0)
  drawRect(eyes, 1, 0, 1, 1, SHADOW)
  drawRect(eyes, 6, 0, 4, 2, 0xd0c8b0)
  drawRect(eyes, 7, 0, 1, 1, SHADOW)
  eyes.position.set(155, 55)
  eyes.scale.set(3)
  eyes.alpha = 0
  app.stage.addChild(eyes)

  // Red connection line
  const redLine = new Graphics()
  redLine.alpha = 0
  app.stage.addChild(redLine)

  // Overlay
  const overlay = new Graphics()
  overlay.rect(0, 0, W, H).fill(0x000000)
  overlay.alpha = 0
  app.stage.addChild(overlay)

  // Draw initial dishes
  drawDishes(dishes, 0)

  return { room, table, lamp, guests, wang, chen, dishes, eyes, redLine, overlay }
}

function drawDishes(g: Graphics, _animPhase: number) {
  g.clear()
  // Wine glasses
  const glassPositions = [
    { x: 130, y: 95 }, { x: 150, y: 92 }, { x: 170, y: 92 }, { x: 190, y: 95 },
    { x: 180, y: 115 }, { x: 155, y: 118 }, { x: 135, y: 115 }, { x: 165, y: 100 },
  ]
  for (const pos of glassPositions) {
    g.rect(pos.x, pos.y, 3, 5).fill({ color: CERAMIC, alpha: 0.6 })
    g.rect(pos.x - 1, pos.y + 5, 5, 1).fill({ color: CERAMIC, alpha: 0.4 })
  }
  // Plates
  g.ellipse(150, 108, 8, 4).fill({ color: CERAMIC, alpha: 0.4 })
  g.ellipse(170, 106, 8, 4).fill({ color: CERAMIC, alpha: 0.4 })
  g.ellipse(145, 100, 6, 3).fill({ color: CERAMIC, alpha: 0.3 })
  g.ellipse(175, 100, 6, 3).fill({ color: CERAMIC, alpha: 0.3 })
}

function updateScene(state: SceneState, p: number) {
  const { lamp, guests, wang, chen, eyes, redLine, overlay } = state

  redLine.clear()

  // 0.00-0.15: Empty table, lamp swaying
  if (p < 0.15) {
    const t = p / 0.15
    // Lamp sway
    const sway = Math.sin(t * Math.PI * 6) * 2
    lamp.position.set(sway, 0)

    for (const g of guests) g.alpha = 0
    wang.alpha = 0
    chen.alpha = 0
    eyes.alpha = 0
    overlay.alpha = 0
  }

  // 0.15-0.35: Guests enter one by one
  else if (p < 0.35) {
    const t = (p - 0.15) / 0.20
    lamp.position.set(Math.sin(p * 40) * 1, 0)

    // Regular guests appear first (indices 0-3)
    for (let i = 0; i < 4; i++) {
      guests[i].alpha = Math.max(0, Math.min(1, (t - i * 0.15) * 4))
    }
    // Then Chen (takes position of guest 5)
    chen.alpha = Math.max(0, Math.min(1, (t - 0.6) * 4))
    guests[5].alpha = 0
    // Then Wang (takes position of guest 2)
    wang.alpha = Math.max(0, Math.min(1, (t - 0.75) * 4))
    guests[2].alpha = 0

    guests[4].alpha = Math.max(0, Math.min(1, (t - 0.4) * 4))
    eyes.alpha = 0
    overlay.alpha = 0
  }

  // 0.35-0.55: Dining animation
  else if (p < 0.55) {
    const t = (p - 0.35) / 0.20
    lamp.position.set(Math.sin(p * 40) * 0.5, 0)

    for (let i = 0; i < 6; i++) {
      if (i !== 2 && i !== 5) guests[i].alpha = 1
    }
    wang.alpha = 1
    chen.alpha = 1

    // Subtle toast animation - guests bob slightly
    const bobPhase = Math.sin(t * Math.PI * 8)
    for (const g of guests) {
      if (g.alpha > 0) {
        g.position.y += bobPhase * 0.3
      }
    }

    eyes.alpha = 0
    overlay.alpha = 0
  }

  // 0.55-0.70: Eyes zoom in on Wang
  else if (p < 0.70) {
    const t = (p - 0.55) / 0.15
    lamp.position.set(0, 0)

    for (let i = 0; i < 6; i++) {
      if (i !== 2 && i !== 5) guests[i].alpha = 1
    }
    wang.alpha = 1
    chen.alpha = 1

    // Dim lighting
    overlay.clear()
    overlay.rect(0, 0, W, H).fill({ color: 0x000000, alpha: t * 0.2 })
    overlay.alpha = 1

    // Eyes appear
    eyes.alpha = Math.min(t * 2, 1)
    const eyeScale = 2 + t
    eyes.scale.set(eyeScale)
  }

  // 0.70-0.85: Others fade to silhouettes, red line appears
  else if (p < 0.85) {
    const t = (p - 0.70) / 0.15

    // Fade out regular guests
    for (let i = 0; i < 6; i++) {
      if (i !== 2 && i !== 5) {
        guests[i].alpha = 1 - t * 0.7
      }
    }
    wang.alpha = 1
    chen.alpha = 1
    eyes.alpha = 1 - t

    // Red line between Wang and Chen
    const lineAlpha = Math.min(t * 2, 0.6)
    redLine.moveTo(197, 85).lineTo(117, 135).stroke({ width: 2, color: RED_LINE, alpha: lineAlpha })
    redLine.alpha = 1

    overlay.clear()
    overlay.rect(0, 0, W, H).fill({ color: 0x000000, alpha: 0.2 + t * 0.15 })
    overlay.alpha = 1
  }

  // 0.85-1.00: Scene darkens, only wine glass reflection and red line
  else {
    const t = (p - 0.85) / 0.15

    for (let i = 0; i < 6; i++) {
      if (i !== 2 && i !== 5) guests[i].alpha = 0.3 * (1 - t)
    }
    wang.alpha = 1 - t * 0.7
    chen.alpha = 1 - t * 0.7
    eyes.alpha = 0

    // Red line persists
    redLine.clear()
    redLine.moveTo(197, 85).lineTo(117, 135).stroke({ width: 2, color: RED_LINE, alpha: 0.6 })
    redLine.alpha = 1

    // Deep darkness
    overlay.clear()
    overlay.rect(0, 0, W, H).fill({ color: 0x000000, alpha: 0.35 + t * 0.45 })
    // Wine glass reflection
    overlay.rect(155, 118, 3, 2).fill({ color: CERAMIC, alpha: (1 - t) * 0.5 })
    overlay.alpha = 1
  }
}

interface BambooMeetingSceneProps {
  progress?: number
  className?: string
}

export default function BambooMeetingScene({ progress = 0, className }: BambooMeetingSceneProps) {
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
      backgroundColor={0x2a1a10}
      progress={progress}
      onSetup={handleSetup}
      onUpdate={handleUpdate}
      className={className}
    />
  )
}
