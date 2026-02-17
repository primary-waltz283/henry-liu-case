import { useCallback, useRef } from 'react'
import { Application, Graphics } from 'pixi.js'
import PixiCanvas from '../PixiCanvas'

// Color palette — LA basement, October 1984
const BASEMENT_DARK = 0x1a1612
const BASEMENT_WALL = 0x2d2820
const CONCRETE_FLOOR = 0x3a3530
const BULB_GLOW = 0xe8c878
const TABLE_WOOD = 0x5a4a3a
const SILHOUETTE = 0x1a1816
const RECORDER_BODY = 0x4a4a4a
const RECORDER_CHROME = 0x8a8a8a
const REEL_DARK = 0x2d2d2d
const TAPE_BROWN = 0x6b4a2a
const REC_RED = 0xc23b22
const PAPER = 0xf5f0e8
const EVIDENCE_GOLD = 0xb8943e

const W = 320
const H = 180

interface SceneState {
  bg: Graphics
  bulb: Graphics
  bulbGlow: Graphics
  table: Graphics
  chen: Graphics
  recorder: Graphics
  reelLeft: Graphics
  reelRight: Graphics
  recLight: Graphics
  waveform: Graphics
  cassette: Graphics
  overlay: Graphics
}

function drawRect(g: Graphics, x: number, y: number, w: number, h: number, color: number) {
  g.rect(x, y, w, h).fill(color)
}

function setupScene(app: Application): SceneState {
  // Dark basement background
  const bg = new Graphics()
  drawRect(bg, 0, 0, W, H, BASEMENT_DARK)
  // Walls with slight variation
  drawRect(bg, 0, 0, W, 30, BASEMENT_WALL)
  drawRect(bg, 0, 30, 4, 150, BASEMENT_WALL)
  drawRect(bg, W - 4, 30, 4, 150, BASEMENT_WALL)
  // Concrete floor
  drawRect(bg, 0, 140, W, 40, CONCRETE_FLOOR)
  // Wall details - pipes and cracks
  drawRect(bg, 280, 10, 2, 130, 0x3a3530) // pipe
  drawRect(bg, 278, 10, 6, 2, 0x3a3530) // pipe bracket
  drawRect(bg, 278, 60, 6, 2, 0x3a3530)
  drawRect(bg, 50, 25, 1, 20, 0x252018) // crack
  drawRect(bg, 180, 20, 1, 15, 0x252018)
  // Boxes in background
  drawRect(bg, 10, 110, 30, 30, 0x3a3028)
  drawRect(bg, 15, 95, 20, 18, 0x342a22)
  app.stage.addChild(bg)

  // Hanging bulb wire + bulb
  const bulb = new Graphics()
  drawRect(bulb, 158, 0, 2, 30, 0x3a3a3a) // wire
  drawRect(bulb, 155, 30, 8, 6, 0x5a5a5a) // socket
  drawRect(bulb, 156, 36, 6, 8, 0x888870) // bulb glass
  bulb.alpha = 0.3
  app.stage.addChild(bulb)

  // Light glow (radial approximation with concentric rects)
  const bulbGlow = new Graphics()
  bulbGlow.circle(160, 40, 80).fill({ color: BULB_GLOW, alpha: 0.04 })
  bulbGlow.circle(160, 40, 50).fill({ color: BULB_GLOW, alpha: 0.06 })
  bulbGlow.circle(160, 40, 25).fill({ color: BULB_GLOW, alpha: 0.08 })
  bulbGlow.alpha = 0
  app.stage.addChild(bulbGlow)

  // Folding table
  const table = new Graphics()
  drawRect(table, 100, 105, 120, 4, TABLE_WOOD)
  // Legs
  drawRect(table, 105, 109, 3, 32, 0x4a3a2a)
  drawRect(table, 215, 109, 3, 32, 0x4a3a2a)
  // Cross brace
  drawRect(table, 108, 125, 107, 2, 0x4a3a2a)
  table.alpha = 0
  app.stage.addChild(table)

  // Chen Chi-li silhouette (seated at table)
  const chen = new Graphics()
  // Head
  drawRect(chen, 3, 0, 12, 12, SILHOUETTE)
  // Shoulders/body
  drawRect(chen, 0, 12, 18, 16, SILHOUETTE)
  // Arms on table
  drawRect(chen, -4, 22, 8, 4, SILHOUETTE)
  drawRect(chen, 14, 22, 8, 4, SILHOUETTE)
  // Legs (seated)
  drawRect(chen, 2, 28, 6, 14, SILHOUETTE)
  drawRect(chen, 10, 28, 6, 14, SILHOUETTE)
  chen.position.set(140, 63)
  chen.alpha = 0
  app.stage.addChild(chen)

  // Tape recorder body
  const recorder = new Graphics()
  drawRect(recorder, 0, 0, 50, 30, RECORDER_BODY)
  // Chrome trim
  drawRect(recorder, 0, 0, 50, 2, RECORDER_CHROME)
  drawRect(recorder, 0, 28, 50, 2, RECORDER_CHROME)
  // Button panel
  drawRect(recorder, 5, 22, 8, 5, 0x3a3a3a) // play
  drawRect(recorder, 15, 22, 8, 5, 0x3a3a3a) // stop
  drawRect(recorder, 25, 22, 8, 5, REC_RED) // record button
  // Tape window
  drawRect(recorder, 8, 4, 34, 14, 0x2a2a2a)
  recorder.position.set(135, 74)
  recorder.alpha = 0
  app.stage.addChild(recorder)

  // Reel left
  const reelLeft = new Graphics()
  reelLeft.circle(0, 0, 5).fill(REEL_DARK)
  reelLeft.circle(0, 0, 2).fill(TAPE_BROWN)
  reelLeft.position.set(152, 85)
  reelLeft.alpha = 0
  app.stage.addChild(reelLeft)

  // Reel right
  const reelRight = new Graphics()
  reelRight.circle(0, 0, 5).fill(REEL_DARK)
  reelRight.circle(0, 0, 2).fill(TAPE_BROWN)
  reelRight.position.set(172, 85)
  reelRight.alpha = 0
  app.stage.addChild(reelRight)

  // Recording indicator light
  const recLight = new Graphics()
  recLight.circle(0, 0, 2).fill(REC_RED)
  recLight.position.set(190, 78)
  recLight.alpha = 0
  app.stage.addChild(recLight)

  // Voice waveform visualization
  const waveform = new Graphics()
  waveform.position.set(100, 55)
  waveform.alpha = 0
  app.stage.addChild(waveform)

  // Cassette tape (for final reveal)
  const cassette = new Graphics()
  drawRect(cassette, 0, 0, 28, 18, 0x2a2a2a)
  drawRect(cassette, 1, 1, 26, 16, 0x3a3a3a)
  // Label
  drawRect(cassette, 3, 3, 22, 8, PAPER)
  // Writing on label
  drawRect(cassette, 5, 5, 12, 1, 0x8a8a8a)
  drawRect(cassette, 5, 7, 10, 1, 0x8a8a8a)
  // Tape window
  drawRect(cassette, 8, 12, 12, 3, TAPE_BROWN)
  // Reel holes
  drawRect(cassette, 10, 13, 2, 1, 0x1a1a1a)
  drawRect(cassette, 16, 13, 2, 1, 0x1a1a1a)
  cassette.position.set(146, 96)
  cassette.alpha = 0
  app.stage.addChild(cassette)

  // Full-screen overlay
  const overlay = new Graphics()
  overlay.rect(0, 0, W, H).fill(0x000000)
  overlay.alpha = 0
  app.stage.addChild(overlay)

  return { bg, bulb, bulbGlow, table, chen, recorder, reelLeft, reelRight, recLight, waveform, cassette, overlay }
}

function drawWaveform(g: Graphics, p: number, width: number) {
  g.clear()
  const bars = 30
  const barW = width / bars
  for (let i = 0; i < bars; i++) {
    // Simulated audio waveform with pseudo-random heights
    const seed = Math.sin(i * 3.7 + p * 50) * 0.5 + 0.5
    const h = 2 + seed * 12
    const x = i * barW
    const y = -h / 2
    g.rect(x, y, barW - 1, h).fill({ color: EVIDENCE_GOLD, alpha: 0.6 + seed * 0.4 })
  }
}

function updateScene(state: SceneState, p: number) {
  const { bulb, bulbGlow, table, chen, recorder, reelLeft, reelRight, recLight, waveform, cassette, overlay } = state

  // 0.00-0.15: Dark basement, bulb flickers on
  if (p < 0.15) {
    const t = p / 0.15
    // Flicker effect
    const flicker = t < 0.3 ? 0 :
      t < 0.5 ? (Math.sin(t * 80) > 0 ? 0.6 : 0.1) :
        t < 0.7 ? (Math.sin(t * 40) > 0 ? 0.8 : 0.3) :
          0.8 + t * 0.2
    bulb.alpha = flicker
    bulbGlow.alpha = flicker * 0.8
    table.alpha = flicker * 0.8
    chen.alpha = 0
    recorder.alpha = 0
    reelLeft.alpha = 0
    reelRight.alpha = 0
    recLight.alpha = 0
    waveform.alpha = 0
    cassette.alpha = 0
    overlay.alpha = 0
  }

  // 0.15-0.30: Chen enters and sits down
  else if (p < 0.30) {
    const t = (p - 0.15) / 0.15
    bulb.alpha = 1
    bulbGlow.alpha = 0.9
    table.alpha = 1
    recorder.alpha = t > 0.5 ? (t - 0.5) * 2 : 0
    reelLeft.alpha = recorder.alpha
    reelRight.alpha = recorder.alpha

    // Chen walks in from right and sits
    chen.alpha = Math.min(t * 2, 1)
    if (t < 0.6) {
      chen.position.set(220 - t * 130, 63 + (t < 0.3 ? 0 : (t - 0.3) * 10))
    } else {
      chen.position.set(140, 66)
    }

    recLight.alpha = 0
    waveform.alpha = 0
    cassette.alpha = 0
    overlay.alpha = 0
  }

  // 0.30-0.45: Presses record, reels start spinning, red light on
  else if (p < 0.45) {
    const t = (p - 0.30) / 0.15
    bulb.alpha = 1
    bulbGlow.alpha = 0.9
    table.alpha = 1
    chen.alpha = 1
    chen.position.set(140, 66)
    recorder.alpha = 1
    reelLeft.alpha = 1
    reelRight.alpha = 1
    cassette.alpha = 0
    overlay.alpha = 0

    // Arm reaching to press record
    if (t < 0.3) {
      chen.clear()
      drawRect(chen, 3, 0, 12, 12, SILHOUETTE)
      drawRect(chen, 0, 12, 18, 16, SILHOUETTE)
      drawRect(chen, -4, 22, 8, 4, SILHOUETTE)
      // Right arm extended to recorder
      drawRect(chen, 14, 18, 16, 3, SILHOUETTE)
      drawRect(chen, 2, 28, 6, 14, SILHOUETTE)
      drawRect(chen, 10, 28, 6, 14, SILHOUETTE)
    } else {
      // Arm back to resting
      chen.clear()
      drawRect(chen, 3, 0, 12, 12, SILHOUETTE)
      drawRect(chen, 0, 12, 18, 16, SILHOUETTE)
      drawRect(chen, -4, 22, 8, 4, SILHOUETTE)
      drawRect(chen, 14, 22, 8, 4, SILHOUETTE)
      drawRect(chen, 2, 28, 6, 14, SILHOUETTE)
      drawRect(chen, 10, 28, 6, 14, SILHOUETTE)
    }

    // Reels spin (rotate)
    reelLeft.rotation = t * Math.PI * 4
    reelRight.rotation = -t * Math.PI * 4

    // REC light blinks on
    recLight.alpha = t > 0.3 ? (Math.sin(t * 30) > 0 ? 1 : 0.3) : 0

    waveform.alpha = t > 0.5 ? (t - 0.5) * 4 : 0
    if (waveform.alpha > 0) {
      drawWaveform(waveform, p, 120)
    }
  }

  // 0.45-0.70: Full recording — reels spinning, waveform active, recording light blinks
  else if (p < 0.70) {
    const t = (p - 0.45) / 0.25
    bulb.alpha = 1
    bulbGlow.alpha = 0.85 + Math.sin(p * 20) * 0.05
    table.alpha = 1
    chen.alpha = 1
    chen.position.set(140, 66)
    recorder.alpha = 1
    reelLeft.alpha = 1
    reelRight.alpha = 1
    cassette.alpha = 0
    overlay.alpha = 0

    // Continuous reel rotation
    reelLeft.rotation = t * Math.PI * 8
    reelRight.rotation = -t * Math.PI * 8

    // Left reel gets smaller (tape feeds), right reel gets bigger
    reelLeft.clear()
    const leftRadius = 5 - t * 2
    reelLeft.circle(0, 0, leftRadius).fill(REEL_DARK)
    reelLeft.circle(0, 0, 2).fill(TAPE_BROWN)

    reelRight.clear()
    const rightRadius = 3 + t * 2.5
    reelRight.circle(0, 0, rightRadius).fill(REEL_DARK)
    reelRight.circle(0, 0, 2).fill(TAPE_BROWN)

    // Blinking REC light
    recLight.alpha = Math.sin(p * 30) > 0 ? 1 : 0.2

    // Active waveform
    waveform.alpha = 1
    drawWaveform(waveform, p, 120)
  }

  // 0.70-0.85: Recording stops, Chen removes cassette
  else if (p < 0.85) {
    const t = (p - 0.70) / 0.15
    bulb.alpha = 1
    bulbGlow.alpha = 0.85
    table.alpha = 1
    chen.alpha = 1
    recorder.alpha = 1
    overlay.alpha = 0

    // Reels stop
    reelLeft.rotation = 0
    reelRight.rotation = 0

    // REC light fades
    recLight.alpha = Math.max(0, 1 - t * 3)

    // Waveform fades
    waveform.alpha = Math.max(0, 1 - t * 3)

    // Cassette emerges
    if (t > 0.4) {
      const cassetteT = (t - 0.4) / 0.6
      cassette.alpha = cassetteT
      // Cassette rises from recorder position to prominent display
      cassette.position.set(
        146 - cassetteT * 10,
        96 - cassetteT * 20,
      )
      // Hide reels as cassette is removed
      reelLeft.alpha = 1 - cassetteT
      reelRight.alpha = 1 - cassetteT
    } else {
      cassette.alpha = 0
    }
  }

  // 0.85-1.00: Cassette glows gold — the evidence — scene fades
  else {
    const t = (p - 0.85) / 0.15
    chen.alpha = 1 - t * 0.7
    recorder.alpha = 1 - t * 0.5
    table.alpha = 1 - t * 0.5
    recLight.alpha = 0
    waveform.alpha = 0
    reelLeft.alpha = 0
    reelRight.alpha = 0

    // Cassette glows gold
    cassette.alpha = 1
    cassette.position.set(136, 76)
    cassette.clear()
    // Gold glow behind cassette
    const glowAlpha = 0.1 + Math.sin(t * Math.PI) * 0.08
    cassette.circle(14, 9, 20 + t * 5).fill({ color: EVIDENCE_GOLD, alpha: glowAlpha })
    // Cassette body
    drawRect(cassette, 0, 0, 28, 18, 0x2a2a2a)
    drawRect(cassette, 1, 1, 26, 16, 0x3a3a3a)
    drawRect(cassette, 3, 3, 22, 8, PAPER)
    drawRect(cassette, 5, 5, 12, 1, 0x8a8a8a)
    drawRect(cassette, 5, 7, 10, 1, 0x8a8a8a)
    drawRect(cassette, 8, 12, 12, 3, TAPE_BROWN)
    drawRect(cassette, 10, 13, 2, 1, 0x1a1a1a)
    drawRect(cassette, 16, 13, 2, 1, 0x1a1a1a)
    // Gold border on cassette
    cassette.rect(0, 0, 28, 18).stroke({ color: EVIDENCE_GOLD, width: 1, alpha: 0.5 + t * 0.5 })

    // Bulb dims
    bulb.alpha = 1 - t * 0.8
    bulbGlow.alpha = (1 - t) * 0.5

    // Scene darkens
    overlay.clear()
    overlay.rect(0, 0, W, H).fill({ color: 0x000000, alpha: t * 0.7 })
    overlay.alpha = 1
  }
}

interface TapeRecorderSceneProps {
  progress?: number
  className?: string
}

export default function TapeRecorderScene({ progress = 0, className }: TapeRecorderSceneProps) {
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
      backgroundColor={0x1a1612}
      progress={progress}
      onSetup={handleSetup}
      onUpdate={handleUpdate}
      className={className}
    />
  )
}
