import { useCallback, useRef } from 'react'
import { Application, Graphics } from 'pixi.js'
import PixiCanvas from '../PixiCanvas'

// Color palette — Songzhu Mountain Lodge (松竹山莊), August 1984
const NIGHT_SKY = 0x1a2030
const MOUNTAIN_FAR = 0x2a3a2a
const MOUNTAIN_NEAR = 0x3a4a32
const TREE_DARK = 0x2a3a22
const TREE_MID = 0x3a4a30
const BUILDING_WALL = 0x5a5a52
const BUILDING_ROOF = 0x4a3a2a
const WINDOW_LIGHT = 0xe8c878
const WINDOW_DARK = 0x2a3a4a
const GROUND = 0x4a5040
const PATH = 0x6a6a5a
const SILHOUETTE = 0x1a1816
const MILITARY_GREEN = 0x3d5040
const STAMP_RED = 0xc23b22
const PAPER = 0xf5f0e8

const W = 320
const H = 180

interface SceneState {
  sky: Graphics
  mountains: Graphics
  trees: Graphics
  building: Graphics
  windows: Graphics[]
  trainingYard: Graphics
  figures: Graphics[]
  car: Graphics
  headlights: Graphics
  wangSilhouette: Graphics
  privateRoom: Graphics
  orderText: Graphics
  overlay: Graphics
}

function drawRect(g: Graphics, x: number, y: number, w: number, h: number, color: number) {
  g.rect(x, y, w, h).fill(color)
}

function setupScene(app: Application): SceneState {
  // Night sky
  const sky = new Graphics()
  drawRect(sky, 0, 0, W, 60, NIGHT_SKY)
  // Stars
  const starPositions = [
    [25, 8], [60, 15], [95, 5], [140, 12], [180, 8], [220, 18], [260, 6], [290, 14],
    [45, 22], [110, 28], [170, 25], [240, 10], [310, 20],
  ]
  for (const [sx, sy] of starPositions) {
    sky.rect(sx, sy, 1, 1).fill({ color: 0xc9b99a, alpha: 0.6 })
  }
  app.stage.addChild(sky)

  // Mountains (layered)
  const mountains = new Graphics()
  // Far mountains
  mountains.moveTo(0, 55).lineTo(40, 30).lineTo(80, 45).lineTo(120, 25).lineTo(160, 40)
    .lineTo(200, 20).lineTo(240, 35).lineTo(280, 28).lineTo(320, 42).lineTo(320, 60).lineTo(0, 60)
    .closePath().fill(MOUNTAIN_FAR)
  // Near mountains
  mountains.moveTo(0, 60).lineTo(50, 40).lineTo(100, 50).lineTo(150, 38).lineTo(200, 48)
    .lineTo(250, 35).lineTo(300, 45).lineTo(320, 50).lineTo(320, 70).lineTo(0, 70)
    .closePath().fill(MOUNTAIN_NEAR)
  app.stage.addChild(mountains)

  // Trees on hillside
  const trees = new Graphics()
  const treePositions = [
    [10, 60], [30, 58], [50, 62], [75, 56], [90, 64],
    [245, 58], [265, 60], [285, 56], [300, 62],
  ]
  for (const [tx, ty] of treePositions) {
    // Simple pixel tree: triangle top + trunk
    trees.moveTo(tx, ty - 12).lineTo(tx - 6, ty).lineTo(tx + 6, ty).closePath().fill(TREE_DARK)
    trees.moveTo(tx, ty - 16).lineTo(tx - 4, ty - 6).lineTo(tx + 4, ty - 6).closePath().fill(TREE_MID)
    drawRect(trees, tx - 1, ty, 2, 4, 0x4a3a2a)
  }
  app.stage.addChild(trees)

  // Main building (training compound)
  const building = new Graphics()
  // Ground
  drawRect(building, 0, 130, W, 50, GROUND)
  // Path
  drawRect(building, 140, 130, 40, 50, PATH)
  // Main building
  drawRect(building, 80, 70, 160, 60, BUILDING_WALL)
  // Roof
  building.moveTo(75, 70).lineTo(160, 55).lineTo(245, 70).closePath().fill(BUILDING_ROOF)
  // Door
  drawRect(building, 150, 105, 20, 25, 0x3a3028)
  // Building sign area
  drawRect(building, 115, 73, 90, 8, 0x4a4a42)
  app.stage.addChild(building)

  // Windows (6 windows, will light up)
  const windows: Graphics[] = []
  const windowPositions = [
    [95, 80], [120, 80], [145, 80], [170, 80], [195, 80], [220, 80],
  ]
  for (const [wx, wy] of windowPositions) {
    const win = new Graphics()
    drawRect(win, 0, 0, 16, 16, WINDOW_DARK)
    // Window frame
    drawRect(win, 7, 0, 2, 16, BUILDING_WALL)
    drawRect(win, 0, 7, 16, 2, BUILDING_WALL)
    win.position.set(wx, wy)
    app.stage.addChild(win)
    windows.push(win)
  }

  // Training yard
  const trainingYard = new Graphics()
  trainingYard.alpha = 0
  app.stage.addChild(trainingYard)

  // Training figures (4 figures)
  const figures: Graphics[] = []
  for (let i = 0; i < 4; i++) {
    const fig = new Graphics()
    drawRect(fig, 2, 0, 8, 8, SILHOUETTE) // head
    drawRect(fig, 0, 8, 12, 14, MILITARY_GREEN) // body
    drawRect(fig, 1, 22, 4, 8, SILHOUETTE) // leg
    drawRect(fig, 7, 22, 4, 8, SILHOUETTE) // leg
    fig.position.set(100 + i * 30, 100)
    fig.alpha = 0
    app.stage.addChild(fig)
    figures.push(fig)
  }

  // Wang's car
  const car = new Graphics()
  drawRect(car, 0, 0, 32, 14, 0x1a1a1a) // body
  drawRect(car, 4, -6, 22, 8, 0x1a1a1a) // cabin
  drawRect(car, 6, -4, 8, 5, 0x3a4a5a) // front window
  drawRect(car, 16, -4, 8, 5, 0x3a4a5a) // rear window
  drawRect(car, 2, 12, 6, 6, 0x2a2a2a) // front wheel
  drawRect(car, 24, 12, 6, 6, 0x2a2a2a) // rear wheel
  car.position.set(-40, 128)
  car.alpha = 0
  app.stage.addChild(car)

  // Headlights
  const headlights = new Graphics()
  headlights.moveTo(32, 4).lineTo(80, -10).lineTo(80, 18).closePath()
    .fill({ color: WINDOW_LIGHT, alpha: 0.15 })
  headlights.position.set(-40, 128)
  headlights.alpha = 0
  app.stage.addChild(headlights)

  // Wang's silhouette (for private room scene)
  const wangSilhouette = new Graphics()
  drawRect(wangSilhouette, 3, 0, 12, 12, MILITARY_GREEN) // head
  drawRect(wangSilhouette, 0, 12, 18, 18, MILITARY_GREEN) // uniform body
  // Epaulettes
  drawRect(wangSilhouette, -2, 12, 4, 3, 0xb8943e)
  drawRect(wangSilhouette, 16, 12, 4, 3, 0xb8943e)
  // Legs
  drawRect(wangSilhouette, 2, 30, 6, 10, 0x3a3a32)
  drawRect(wangSilhouette, 10, 30, 6, 10, 0x3a3a32)
  wangSilhouette.position.set(130, 68)
  wangSilhouette.alpha = 0
  app.stage.addChild(wangSilhouette)

  // Private room overlay (interior scene)
  const privateRoom = new Graphics()
  privateRoom.alpha = 0
  app.stage.addChild(privateRoom)

  // Order text: 一定要殺死
  const orderText = new Graphics()
  orderText.alpha = 0
  app.stage.addChild(orderText)

  // Full-screen overlay
  const overlay = new Graphics()
  overlay.rect(0, 0, W, H).fill(0x000000)
  overlay.alpha = 0
  app.stage.addChild(overlay)

  return { sky, mountains, trees, building, windows, trainingYard, figures, car, headlights, wangSilhouette, privateRoom, orderText, overlay }
}

function drawPrivateRoomInterior(g: Graphics) {
  g.clear()
  // Dark room interior
  drawRect(g, 0, 0, W, H, 0x2a2420)
  // Wall details
  drawRect(g, 0, 0, W, 8, 0x3a3028)
  drawRect(g, 0, H - 30, W, 30, 0x3a3530)
  // Table
  drawRect(g, 80, 110, 160, 4, 0x6b5d4d)
  drawRect(g, 85, 114, 3, 20, 0x5a4a3a)
  drawRect(g, 232, 114, 3, 20, 0x5a4a3a)
  // Desk lamp
  drawRect(g, 220, 95, 3, 15, 0x4a4a4a)
  drawRect(g, 215, 90, 14, 6, 0x5a5a52)
  g.circle(222, 100, 15).fill({ color: WINDOW_LIGHT, alpha: 0.08 })
  // Map on wall
  drawRect(g, 100, 20, 60, 40, 0x4a5040)
  drawRect(g, 100, 20, 60, 2, 0x5a5a4a)
  // Pins on map
  g.circle(120, 35, 2).fill(STAMP_RED)
  g.circle(140, 45, 2).fill(STAMP_RED)
  // Tea cups on table
  drawRect(g, 140, 105, 6, 5, 0xc9b99a)
  drawRect(g, 170, 105, 6, 5, 0xc9b99a)
  // Documents
  drawRect(g, 110, 105, 20, 5, PAPER)
}

function drawOrderChars(g: Graphics, progress: number) {
  g.clear()
  // Draw 「一定要殺死」 as pixel blocks representing the characters
  // Each character represented as a red stamp-style block
  const chars = 5
  const charW = 20
  const spacing = 6
  const totalW = chars * charW + (chars - 1) * spacing
  const startX = (W - totalW) / 2
  const y = 55

  const visibleChars = Math.floor(progress * (chars + 1))

  for (let i = 0; i < Math.min(visibleChars, chars); i++) {
    const x = startX + i * (charW + spacing)
    // Character block with stamp effect
    drawRect(g, x, y, charW, charW, STAMP_RED)
    // Inner lighter area
    drawRect(g, x + 2, y + 2, charW - 4, charW - 4, 0xd04030)
    // Rough edge effect (stamp aesthetic)
    drawRect(g, x + 1, y, 1, 1, 0x000000) // corner notch
    drawRect(g, x + charW - 2, y + charW - 1, 1, 1, 0x000000)
    // Simple pixel representation of each character
    switch (i) {
      case 0: // 一
        drawRect(g, x + 3, y + 9, charW - 6, 2, PAPER)
        break
      case 1: // 定
        drawRect(g, x + 3, y + 4, charW - 6, 2, PAPER) // top stroke
        drawRect(g, x + 5, y + 6, 2, 8, PAPER) // left vertical
        drawRect(g, x + charW - 7, y + 6, 2, 8, PAPER) // right vertical
        drawRect(g, x + 5, y + 14, charW - 10, 2, PAPER) // bottom
        drawRect(g, x + 9, y + 8, 2, 6, PAPER) // center
        break
      case 2: // 要
        drawRect(g, x + 3, y + 3, charW - 6, 2, PAPER) // top
        drawRect(g, x + 5, y + 5, 2, 5, PAPER)
        drawRect(g, x + charW - 7, y + 5, 2, 5, PAPER)
        drawRect(g, x + 3, y + 10, charW - 6, 2, PAPER)  // middle
        drawRect(g, x + 7, y + 12, 2, 5, PAPER) // legs
        drawRect(g, x + 11, y + 12, 2, 5, PAPER)
        break
      case 3: // 殺
        drawRect(g, x + 9, y + 3, 2, 14, PAPER) // center vertical
        drawRect(g, x + 4, y + 5, 12, 2, PAPER) // horizontal
        drawRect(g, x + 4, y + 10, 12, 2, PAPER) // horizontal
        drawRect(g, x + 3, y + 3, 2, 12, PAPER) // left
        drawRect(g, x + 15, y + 3, 2, 12, PAPER) // right
        break
      case 4: // 死
        drawRect(g, x + 3, y + 4, charW - 6, 2, PAPER) // top
        drawRect(g, x + 5, y + 6, 2, 10, PAPER) // left vertical
        drawRect(g, x + 5, y + 14, charW - 10, 2, PAPER) // bottom
        drawRect(g, x + 10, y + 6, 2, 8, PAPER) // middle
        drawRect(g, x + 13, y + 8, 2, 8, PAPER) // right
        break
    }
  }
}

function updateScene(state: SceneState, p: number) {
  const { windows, figures, car, headlights, wangSilhouette, privateRoom, orderText, overlay } = state

  // Reset private room
  privateRoom.alpha = 0
  orderText.alpha = 0

  // 0.00-0.15: Mountain compound at dusk, windows light up one by one
  if (p < 0.15) {
    const t = p / 0.15
    for (let i = 0; i < windows.length; i++) {
      const lightTime = i * 0.15
      if (t > lightTime) {
        const intensity = Math.min((t - lightTime) * 3, 1)
        windows[i].clear()
        const c = intensity > 0.5 ? WINDOW_LIGHT : WINDOW_DARK
        drawRect(windows[i], 0, 0, 16, 16, c)
        drawRect(windows[i], 7, 0, 2, 16, BUILDING_WALL)
        drawRect(windows[i], 0, 7, 16, 2, BUILDING_WALL)
      }
    }
    for (const fig of figures) fig.alpha = 0
    car.alpha = 0
    headlights.alpha = 0
    wangSilhouette.alpha = 0
    overlay.alpha = 0
  }

  // 0.15-0.40: Training montage — figures appear, do exercises
  else if (p < 0.40) {
    const t = (p - 0.15) / 0.25
    // All windows lit
    for (const win of windows) {
      win.clear()
      drawRect(win, 0, 0, 16, 16, WINDOW_LIGHT)
      drawRect(win, 7, 0, 2, 16, BUILDING_WALL)
      drawRect(win, 0, 7, 16, 2, BUILDING_WALL)
    }

    // Figures appear and do training activities
    for (let i = 0; i < figures.length; i++) {
      const figT = Math.max(0, (t - i * 0.1) * 2)
      figures[i].alpha = Math.min(figT, 1)

      // Training positions change over time
      const phase = (t + i * 0.25) % 1
      const baseX = 100 + i * 30
      const baseY = 100

      if (phase < 0.25) {
        // Standing attention
        figures[i].position.set(baseX, baseY)
      } else if (phase < 0.5) {
        // Crouching (camera training)
        figures[i].position.set(baseX, baseY + 4)
      } else if (phase < 0.75) {
        // Arms up (radio training)
        figures[i].position.set(baseX + 2, baseY - 2)
      } else {
        // Writing (code training)
        figures[i].position.set(baseX - 2, baseY + 2)
      }
    }

    car.alpha = 0
    headlights.alpha = 0
    wangSilhouette.alpha = 0
    overlay.alpha = 0
  }

  // 0.40-0.55: Night falls deeper, car arrives with headlights
  else if (p < 0.55) {
    const t = (p - 0.40) / 0.15

    // Figures retreat indoors
    for (let i = 0; i < figures.length; i++) {
      figures[i].alpha = Math.max(0, 1 - t * 2)
    }

    // Some windows go dark as night deepens
    for (let i = 0; i < windows.length; i++) {
      windows[i].clear()
      const lit = i === 2 || i === 3 // Only Wang's quarters lit
      drawRect(windows[i], 0, 0, 16, 16, lit ? WINDOW_LIGHT : WINDOW_DARK)
      drawRect(windows[i], 7, 0, 2, 16, BUILDING_WALL)
      drawRect(windows[i], 0, 7, 16, 2, BUILDING_WALL)
    }

    // Car drives in from left
    car.alpha = Math.min(t * 2, 1)
    headlights.alpha = car.alpha * 0.8
    const carX = -40 + t * 180
    car.position.set(carX, 128)
    headlights.position.set(carX, 128)

    wangSilhouette.alpha = 0
    overlay.alpha = 0
  }

  // 0.55-0.75: Transition to private room interior, Wang delivers order
  else if (p < 0.75) {
    const t = (p - 0.55) / 0.20

    // Transition to interior
    if (t < 0.2) {
      // Fade exterior
      const fadeT = t / 0.2
      overlay.clear()
      overlay.rect(0, 0, W, H).fill({ color: 0x000000, alpha: fadeT })
      overlay.alpha = 1
      car.alpha = 1 - fadeT
      headlights.alpha = 0
    } else {
      // Interior scene
      overlay.alpha = 0
      car.alpha = 0
      headlights.alpha = 0
      for (const fig of figures) fig.alpha = 0

      drawPrivateRoomInterior(privateRoom)
      privateRoom.alpha = Math.min((t - 0.2) * 2, 1)

      // Wang appears
      if (t > 0.35) {
        wangSilhouette.alpha = Math.min((t - 0.35) * 3, 1)
        wangSilhouette.position.set(130, 68)
      }

      // Chen sitting across (reuse a figure)
      if (t > 0.5 && figures[0]) {
        figures[0].alpha = Math.min((t - 0.5) * 3, 1)
        figures[0].position.set(180, 68)
        figures[0].clear()
        drawRect(figures[0], 2, 0, 8, 8, SILHOUETTE)
        drawRect(figures[0], 0, 8, 12, 14, SILHOUETTE)
        drawRect(figures[0], 1, 22, 4, 8, SILHOUETTE)
        drawRect(figures[0], 7, 22, 4, 8, SILHOUETTE)
      }

      // Hide exterior elements
      for (const win of windows) win.alpha = 0
    }
  }

  // 0.75-0.90: The order — 「一定要殺死」 appears in stamp-red
  else if (p < 0.90) {
    const t = (p - 0.75) / 0.15
    overlay.alpha = 0
    car.alpha = 0
    headlights.alpha = 0
    for (const win of windows) win.alpha = 0

    drawPrivateRoomInterior(privateRoom)
    privateRoom.alpha = 1

    wangSilhouette.alpha = 1
    wangSilhouette.position.set(130, 68)
    figures[0].alpha = 1

    // Draw order text appearing character by character
    orderText.alpha = 1
    drawOrderChars(orderText, t)

    // Room darkens slightly when order appears
    if (t > 0.5) {
      const dimT = (t - 0.5) * 2
      privateRoom.alpha = 1 - dimT * 0.3
    }
  }

  // 0.90-1.00: Scene darkens, only red characters remain
  else {
    const t = (p - 0.90) / 0.10
    car.alpha = 0
    headlights.alpha = 0
    for (const win of windows) win.alpha = 0

    privateRoom.alpha = Math.max(0, 0.7 - t)
    wangSilhouette.alpha = Math.max(0, 1 - t * 1.5)
    figures[0].alpha = Math.max(0, 1 - t * 1.5)

    // Order text stays visible longest
    orderText.alpha = 1
    drawOrderChars(orderText, 1)

    // Final fade
    overlay.clear()
    overlay.rect(0, 0, W, H).fill({ color: 0x000000, alpha: t * 0.9 })
    overlay.alpha = 1
  }
}

interface TrainingCampSceneProps {
  progress?: number
  className?: string
}

export default function TrainingCampScene({ progress = 0, className }: TrainingCampSceneProps) {
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
      backgroundColor={0x1a2030}
      progress={progress}
      onSetup={handleSetup}
      onUpdate={handleUpdate}
      className={className}
    />
  )
}
