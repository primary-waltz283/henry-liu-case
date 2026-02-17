import { useCallback, useRef } from 'react'
import { Application, Graphics } from 'pixi.js'
import PixiCanvas from '../PixiCanvas'

// Color palette
const WALL = 0x4a4a4a
const BARS = 0x2d2d2d
const FLOOR = 0x3a3a3a
const WINDOW_LIGHT = 0x6a7a8a
const DONG = 0x5a5248
const PAPER = 0xf5f0e8
const BLOOD = 0x6b2020

const W = 320
const H = 180

interface SceneState {
  room: Graphics
  windowBars: Graphics
  lightBeam: Graphics
  bed: Graphics
  table: Graphics
  letters: Graphics[]
  dong: Graphics
  overlay: Graphics
  ditherOverlay: Graphics
}

function drawRect(g: Graphics, x: number, y: number, w: number, h: number, color: number) {
  g.rect(x, y, w, h).fill(color)
}

function setupScene(app: Application): SceneState {
  // Prison room
  const room = new Graphics()
  drawRect(room, 0, 0, W, H, WALL)
  // Floor
  drawRect(room, 0, 145, W, 35, FLOOR)
  // Wall details - cracks
  drawRect(room, 80, 30, 1, 40, 0x424242)
  drawRect(room, 200, 50, 1, 30, 0x424242)
  drawRect(room, 150, 20, 1, 25, 0x424242)
  app.stage.addChild(room)

  // Window with bars (upper left)
  const windowBars = new Graphics()
  drawRect(windowBars, 20, 15, 40, 50, WINDOW_LIGHT)
  // Bars
  for (let i = 0; i < 5; i++) {
    drawRect(windowBars, 22 + i * 9, 15, 2, 50, BARS)
  }
  // Horizontal bars
  drawRect(windowBars, 20, 30, 40, 2, BARS)
  drawRect(windowBars, 20, 50, 40, 2, BARS)
  app.stage.addChild(windowBars)

  // Light beam from window
  const lightBeam = new Graphics()
  // Diagonal light cone
  lightBeam.moveTo(60, 15).lineTo(120, 145).lineTo(60, 145).lineTo(20, 65).closePath()
    .fill({ color: WINDOW_LIGHT, alpha: 0.06 })
  app.stage.addChild(lightBeam)

  // Bed
  const bed = new Graphics()
  drawRect(bed, 230, 130, 55, 15, 0x5a5050)
  drawRect(bed, 230, 125, 18, 8, 0x6a6060)  // pillow
  // Bed frame
  drawRect(bed, 228, 143, 2, 8, 0x3a3a3a)
  drawRect(bed, 286, 143, 2, 8, 0x3a3a3a)
  app.stage.addChild(bed)

  // Small table
  const table = new Graphics()
  drawRect(table, 210, 128, 20, 2, 0x5a5a50)
  drawRect(table, 212, 130, 2, 15, 0x4a4a42)
  drawRect(table, 226, 130, 2, 15, 0x4a4a42)
  app.stage.addChild(table)

  // Letters (3 pieces of paper)
  const letters: Graphics[] = []
  const letterPositions = [
    { x: 213, y: 120 },
    { x: 218, y: 122 },
    { x: 215, y: 118 },
  ]
  for (const pos of letterPositions) {
    const letter = new Graphics()
    drawRect(letter, 0, 0, 8, 10, PAPER)
    // Writing lines
    drawRect(letter, 1, 2, 6, 1, 0xd0d0d0)
    drawRect(letter, 1, 4, 5, 1, 0xd0d0d0)
    drawRect(letter, 1, 6, 6, 1, 0xd0d0d0)
    letter.position.set(pos.x, pos.y)
    app.stage.addChild(letter)
    letters.push(letter)
  }

  // Dong Guisen
  const dong = new Graphics()
  // Head
  drawRect(dong, 2, 0, 10, 10, DONG)
  // Body (seated)
  drawRect(dong, 0, 10, 14, 14, 0x4a4240)
  // Legs
  drawRect(dong, 1, 24, 5, 8, 0x3a3a32)
  drawRect(dong, 8, 24, 5, 8, 0x3a3a32)
  // Arm holding letter
  drawRect(dong, 14, 14, 8, 3, 0x4a4240)
  dong.position.set(240, 95)
  app.stage.addChild(dong)

  // Overlay for fade
  const overlay = new Graphics()
  overlay.rect(0, 0, W, H).fill(0x000000)
  overlay.alpha = 0
  app.stage.addChild(overlay)

  // Dither dissolve overlay
  const ditherOverlay = new Graphics()
  ditherOverlay.alpha = 0
  app.stage.addChild(ditherOverlay)

  return { room, windowBars, lightBeam, bed, table, letters, dong, overlay, ditherOverlay }
}

function drawDitherDissolve(g: Graphics, t: number) {
  g.clear()
  // Pixel-by-pixel dissolve from edges to center
  const centerX = W / 2
  const centerY = H / 2
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)
  const threshold = t * maxDist * 1.3

  // Draw black pixels in a grid pattern
  const step = 4  // Every 4px for performance
  for (let x = 0; x < W; x += step) {
    for (let y = 0; y < H; y += step) {
      const dx = x - centerX
      const dy = y - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Dissolve from edges inward with some randomness
      const noise = Math.sin(x * 0.7 + y * 1.3) * 15
      if (dist + noise > maxDist - threshold) {
        g.rect(x, y, step, step).fill(0x000000)
      }
    }
  }
}

function updateScene(state: SceneState, p: number) {
  const { windowBars, lightBeam, letters, dong, overlay, ditherOverlay } = state

  ditherOverlay.alpha = 0

  // 0.00-0.20: Prison established, Dong sitting with letter
  if (p < 0.20) {
    lightBeam.alpha = 0.8
    dong.position.set(240, 95)
    dong.alpha = 1
    for (let i = 0; i < letters.length; i++) {
      letters[i].position.set(213 + i * 5, 120 + i * 2)
      letters[i].alpha = 1
    }
    overlay.alpha = 0
  }

  // 0.20-0.40: Letters flutter down to floor
  else if (p < 0.40) {
    const t = (p - 0.20) / 0.20
    lightBeam.alpha = 0.8

    dong.position.set(240, 95)
    dong.alpha = 1

    for (let i = 0; i < letters.length; i++) {
      const letterT = Math.max(0, Math.min(1, (t - i * 0.25) * 2))
      // Flutter: slight horizontal wobble as they fall
      const wobble = Math.sin(letterT * Math.PI * 4) * 5
      const startY = 120 + i * 2
      const endY = 148
      letters[i].position.set(
        100 + i * 25 + wobble * (1 - letterT),
        startY + (endY - startY) * letterT,
      )
      letters[i].rotation = (letterT * 0.3) * (i % 2 === 0 ? 1 : -1)
    }

    overlay.alpha = 0
  }

  // 0.40-0.55: Day/night cycles - window light changes
  else if (p < 0.55) {
    const t = (p - 0.40) / 0.15
    dong.position.set(240, 95)
    dong.alpha = 1

    // 2-3 day/night cycles
    const cycle = Math.sin(t * Math.PI * 5)
    const lightAlpha = 0.4 + cycle * 0.4

    // Redraw window with varying light
    windowBars.clear()
    const lightColor = cycle > 0 ? WINDOW_LIGHT : 0x3a4a5a
    windowBars.rect(20, 15, 40, 50).fill(lightColor)
    for (let i = 0; i < 5; i++) {
      windowBars.rect(22 + i * 9, 15, 2, 50).fill(BARS)
    }
    windowBars.rect(20, 30, 40, 2).fill(BARS)
    windowBars.rect(20, 50, 40, 2).fill(BARS)

    lightBeam.alpha = lightAlpha

    // Letters on floor
    for (let i = 0; i < letters.length; i++) {
      letters[i].position.set(100 + i * 25, 148)
      letters[i].rotation = 0.3 * (i % 2 === 0 ? 1 : -1)
    }

    overlay.alpha = 0
  }

  // 0.55-0.70: Dong stands, gets struck, blood appears
  else if (p < 0.70) {
    const t = (p - 0.55) / 0.15
    lightBeam.alpha = 0.6

    if (t < 0.4) {
      // Standing up
      const standT = t / 0.4
      dong.position.set(240 - standT * 30, 95 - standT * 10)
    } else if (t < 0.5) {
      // Flash - the strike
      dong.position.set(210, 85)
      overlay.clear()
      overlay.rect(0, 0, W, H).fill({ color: BLOOD, alpha: 0.3 })
      overlay.alpha = 1
    } else {
      // Blood on chest, hand reaches up
      dong.clear()
      // Head
      drawRect(dong, 2, 0, 10, 10, DONG)
      // Body
      drawRect(dong, 0, 10, 14, 14, 0x4a4240)
      // Blood on chest
      drawRect(dong, 4, 12, 6, 5, BLOOD)
      // Hand on chest
      drawRect(dong, 2, 13, 4, 3, DONG)
      // Legs
      drawRect(dong, 1, 24, 5, 8, 0x3a3a32)
      drawRect(dong, 8, 24, 5, 8, 0x3a3a32)
      dong.position.set(210, 85)
      overlay.alpha = 0
    }

    for (let i = 0; i < letters.length; i++) {
      letters[i].position.set(100 + i * 25, 148)
    }
  }

  // 0.70-0.85: Dong falls, letters scatter, light dims
  else if (p < 0.85) {
    const t = (p - 0.70) / 0.15

    // Dong falls (4 frames simulated)
    const fallPhase = Math.min(t * 4, 3)
    if (fallPhase < 1) {
      dong.position.set(210, 85 + fallPhase * 10)
    } else if (fallPhase < 2) {
      dong.position.set(210, 95 + (fallPhase - 1) * 15)
      dong.rotation = (fallPhase - 1) * 0.5
    } else {
      dong.position.set(210, 120)
      dong.rotation = 1.2
    }

    // Letters scatter
    for (let i = 0; i < letters.length; i++) {
      const scatterT = Math.min(t * 2, 1)
      letters[i].position.set(
        100 + i * 25 + scatterT * (i - 1) * 15,
        148 - scatterT * 5,
      )
      letters[i].rotation = scatterT * (i - 1) * 0.4
    }

    // Light dims
    lightBeam.alpha = 0.6 - t * 0.4
    windowBars.clear()
    const dimLight = Math.round(0x6a - t * 0x30)
    const dimColor = (dimLight << 16) | ((dimLight + 0x10) << 8) | (dimLight + 0x20)
    windowBars.rect(20, 15, 40, 50).fill(dimColor)
    for (let i = 0; i < 5; i++) {
      windowBars.rect(22 + i * 9, 15, 2, 50).fill(BARS)
    }
    windowBars.rect(20, 30, 40, 2).fill(BARS)
    windowBars.rect(20, 50, 40, 2).fill(BARS)

    overlay.alpha = 0
  }

  // 0.85-1.00: Pixel dither dissolve from edges to center
  else {
    const t = (p - 0.85) / 0.15

    dong.position.set(210, 120)
    dong.rotation = 1.2
    lightBeam.alpha = 0.2 * (1 - t)

    // Dither dissolve effect
    drawDitherDissolve(ditherOverlay, t)
    ditherOverlay.alpha = 1

    overlay.alpha = 0
  }
}

interface PrisonFadeSceneProps {
  progress?: number
  className?: string
}

export default function PrisonFadeScene({ progress = 0, className }: PrisonFadeSceneProps) {
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
      backgroundColor={0x2a2a2a}
      progress={progress}
      onSetup={handleSetup}
      onUpdate={handleUpdate}
      className={className}
    />
  )
}
