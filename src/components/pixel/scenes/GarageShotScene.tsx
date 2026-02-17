import { useCallback, useRef } from 'react'
import { Application, Graphics } from 'pixi.js'
import PixiCanvas from '../PixiCanvas'

// Color palette
const SKY = 0x2d3a4a
const WALL = 0x5a5248
const FLOOR = 0x4a4540
const SILHOUETTE = 0x1a1816
const FLASH_YELLOW = 0xe8a832
const FLASH_RED = 0xc23b22
const BLOOD = 0x8b2020
const DAWN_LIGHT = 0xc9b99a
const WHITE = 0xffffff

const W = 320
const H = 180

interface SceneState {
  bg: Graphics
  garageDoor: Graphics
  stairs: Graphics
  pillar: Graphics
  washer: Graphics
  wuDun: Graphics
  dong: Graphics
  liu: Graphics
  flash1: Graphics
  flash2: Graphics
  blood: Graphics
  overlay: Graphics
}

function drawRect(g: Graphics, x: number, y: number, w: number, h: number, color: number) {
  g.rect(x, y, w, h).fill(color)
}

function setupScene(app: Application): SceneState {
  const bg = new Graphics()
  // Sky
  drawRect(bg, 0, 0, W, 60, SKY)
  // House exterior wall
  drawRect(bg, 0, 20, W, 40, 0x4a4540)
  // Garage interior walls
  drawRect(bg, 0, 60, W, 120, WALL)
  // Floor
  drawRect(bg, 0, 150, W, 30, FLOOR)
  app.stage.addChild(bg)

  // Garage door opening (light from outside)
  const garageDoor = new Graphics()
  drawRect(garageDoor, 100, 60, 120, 80, 0x3a4a5a)
  // Dawn light gradient at door
  garageDoor.rect(100, 60, 120, 80).fill({ color: DAWN_LIGHT, alpha: 0.15 })
  app.stage.addChild(garageDoor)

  // Stairs (left side)
  const stairs = new Graphics()
  for (let i = 0; i < 5; i++) {
    drawRect(stairs, 20 + i * 2, 70 + i * 18, 36 - i * 2, 4, 0x5a5a52)
  }
  // Stair rail
  drawRect(stairs, 18, 60, 2, 100, 0x4a4a42)
  app.stage.addChild(stairs)

  // Pillar (Wu Dun's hiding spot)
  const pillar = new Graphics()
  drawRect(pillar, 55, 80, 12, 70, 0x626058)
  app.stage.addChild(pillar)

  // Washing machine (Dong's hiding spot)
  const washer = new Graphics()
  drawRect(washer, 250, 120, 24, 28, 0x8a8a82)
  drawRect(washer, 252, 122, 20, 16, 0x6a7a8a)
  drawRect(washer, 258, 140, 8, 4, 0x9a9a92)
  app.stage.addChild(washer)

  // Wu Dun silhouette (crouching behind pillar)
  const wuDun = new Graphics()
  // Head
  drawRect(wuDun, 0, 0, 8, 8, SILHOUETTE)
  // Body (crouching)
  drawRect(wuDun, -1, 8, 10, 12, SILHOUETTE)
  // Legs (crouching)
  drawRect(wuDun, -2, 20, 12, 6, SILHOUETTE)
  wuDun.position.set(58, 118)
  wuDun.alpha = 0.3
  app.stage.addChild(wuDun)

  // Dong Guisen silhouette (crouching by washer)
  const dong = new Graphics()
  drawRect(dong, 0, 0, 8, 8, SILHOUETTE)
  drawRect(dong, -1, 8, 10, 12, SILHOUETTE)
  drawRect(dong, -2, 20, 12, 6, SILHOUETTE)
  dong.position.set(240, 118)
  dong.alpha = 0.3
  app.stage.addChild(dong)

  // Liu Yiliang (on stairs, will animate down)
  const liu = new Graphics()
  // Head
  drawRect(liu, 2, 0, 10, 10, 0x5a5248)
  // Body
  drawRect(liu, 0, 10, 14, 16, 0x4a4a42)
  // Legs
  drawRect(liu, 1, 26, 5, 10, 0x3a3a32)
  drawRect(liu, 8, 26, 5, 10, 0x3a3a32)
  liu.position.set(30, 40)
  liu.alpha = 0
  app.stage.addChild(liu)

  // Muzzle flash effects
  const flash1 = new Graphics()
  drawRect(flash1, -4, -4, 8, 8, FLASH_YELLOW)
  drawRect(flash1, -2, -2, 4, 4, WHITE)
  flash1.position.set(64, 130)
  flash1.alpha = 0
  app.stage.addChild(flash1)

  const flash2 = new Graphics()
  drawRect(flash2, -4, -4, 8, 8, FLASH_RED)
  drawRect(flash2, -2, -2, 4, 4, FLASH_YELLOW)
  flash2.position.set(246, 130)
  flash2.alpha = 0
  app.stage.addChild(flash2)

  // Blood pool
  const blood = new Graphics()
  blood.position.set(140, 150)
  blood.alpha = 0
  app.stage.addChild(blood)

  // Full-screen overlay (for white flash and fade)
  const overlay = new Graphics()
  overlay.rect(0, 0, W, H).fill(WHITE)
  overlay.alpha = 0
  app.stage.addChild(overlay)

  return { bg, garageDoor, stairs, pillar, washer, wuDun, dong, liu, flash1, flash2, blood, overlay }
}

function updateScene(state: SceneState, p: number) {
  const { wuDun, dong, liu, flash1, flash2, blood, overlay, bg, garageDoor } = state

  // 0.00-0.15: Static garage, silhouettes barely visible, light flickers
  if (p < 0.15) {
    const flicker = 0.12 + Math.sin(p * 200) * 0.03
    garageDoor.alpha = 0.8 + flicker
    wuDun.alpha = 0.15 + p * 1.0
    dong.alpha = 0.15 + p * 1.0
    liu.alpha = 0
    flash1.alpha = 0
    flash2.alpha = 0
    blood.alpha = 0
    overlay.alpha = 0
  }

  // 0.15-0.25: Liu walks down stairs
  else if (p < 0.25) {
    const t = (p - 0.15) / 0.1
    liu.alpha = 1
    liu.position.set(30 + t * 10, 40 + t * 80)
    wuDun.alpha = 0.4
    dong.alpha = 0.4
    flash1.alpha = 0
    flash2.alpha = 0
    overlay.alpha = 0
  }

  // 0.25-0.30: Liu stops, looks around
  else if (p < 0.30) {
    liu.alpha = 1
    liu.position.set(40, 120)
    wuDun.alpha = 0.5
    dong.alpha = 0.5
    flash1.alpha = 0
    flash2.alpha = 0
    overlay.alpha = 0
  }

  // 0.30-0.35: First shot from Wu Dun
  else if (p < 0.35) {
    const t = (p - 0.30) / 0.05
    liu.position.set(40, 120)
    wuDun.alpha = 0.8

    // Muzzle flash
    flash1.alpha = t < 0.4 ? 1 : 0
    // White flash
    overlay.alpha = t < 0.2 ? 0.8 : 0

    // Liu falls backward
    if (t > 0.3) {
      liu.position.set(40 + (t - 0.3) * 140, 120 + (t - 0.3) * 40)
      liu.rotation = (t - 0.3) * 2.2
    }
    flash2.alpha = 0
  }

  // 0.35-0.45: Second & third shots from Dong, blood spreads
  else if (p < 0.45) {
    const t = (p - 0.35) / 0.1
    liu.position.set(138, 142)
    liu.rotation = 1.57
    liu.alpha = 1
    wuDun.alpha = 0.8
    dong.alpha = 0.8
    flash1.alpha = 0
    overlay.alpha = 0

    // Dong's muzzle flashes
    flash2.alpha = (t < 0.3 || (t > 0.5 && t < 0.7)) ? 1 : 0

    // Blood pool expands
    blood.clear()
    const radius = Math.min(t, 1.0) * 16
    blood.circle(0, 0, radius).fill(BLOOD)
    blood.alpha = Math.min(t * 1.5, 0.8)
  }

  // 0.45-0.60: Silhouettes exit
  else if (p < 0.60) {
    const t = (p - 0.45) / 0.15
    liu.position.set(138, 142)
    liu.rotation = 1.57
    flash1.alpha = 0
    flash2.alpha = 0
    overlay.alpha = 0

    // Killers move toward door
    wuDun.position.set(58 + t * 100, 118 - t * 10)
    wuDun.alpha = 0.8 - t * 0.6
    dong.position.set(240 - t * 80, 118 - t * 10)
    dong.alpha = 0.8 - t * 0.6

    blood.alpha = 0.8
  }

  // 0.60-0.80: Zoom out effect (darken edges)
  else if (p < 0.80) {
    const t = (p - 0.60) / 0.20
    wuDun.alpha = 0
    dong.alpha = 0
    flash1.alpha = 0
    flash2.alpha = 0

    // Simulated zoom-out by darkening scene edges
    overlay.clear()
    overlay.rect(0, 0, W, H).fill({ color: 0x000000, alpha: t * 0.3 })
    // Light at garage door persists
    overlay.rect(110, 60, 100, 70).fill({ color: DAWN_LIGHT, alpha: t * 0.08 })
    overlay.alpha = 1

    blood.alpha = 0.8
    bg.alpha = 1
  }

  // 0.80-1.00: Fade to near-black, only dawn light at door
  else {
    const t = (p - 0.80) / 0.20
    wuDun.alpha = 0
    dong.alpha = 0
    flash1.alpha = 0
    flash2.alpha = 0

    overlay.clear()
    overlay.rect(0, 0, W, H).fill({ color: 0x000000, alpha: 0.3 + t * 0.65 })
    // Dawn light at garage door remains
    overlay.rect(140, 90, 40, 20).fill({ color: DAWN_LIGHT, alpha: (1 - t) * 0.2 })
    overlay.alpha = 1
  }
}

interface GarageShotSceneProps {
  progress?: number
  className?: string
}

export default function GarageShotScene({ progress = 0, className }: GarageShotSceneProps) {
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
      backgroundColor={0x2d3a4a}
      progress={progress}
      onSetup={handleSetup}
      onUpdate={handleUpdate}
      className={className}
    />
  )
}
