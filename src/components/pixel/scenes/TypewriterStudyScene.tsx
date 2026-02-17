import { useCallback, useRef } from 'react'
import { Application, Graphics } from 'pixi.js'
import PixiCanvas from '../PixiCanvas'

// Color palette
const ROOM_BG = 0x3d3833
const DESK = 0x6b5d4d
const TYPEWRITER = 0x2d2a26
const PAPER = 0xf5f0e8
const LAMP_GLOW = 0xe8c878
const BOOKSHELF = 0x5a4a3a
const WINDOW_NIGHT = 0x2d3a4a
const WINDOW_DAWN = 0x4a5a6a
const FLOWER = 0xf0e8d8

const W = 320
const H = 180

// Book colors for bookshelf
const BOOK_COLORS = [0x8b4040, 0x405a8b, 0x4a7a4a, 0x7a7a6a, 0x8b6040, 0x5a4a6a]

interface SceneState {
  room: Graphics
  window: Graphics
  bookshelf: Graphics
  desk: Graphics
  typewriter: Graphics
  papers: Graphics
  lamp: Graphics
  lampGlow: Graphics
  liu: Graphics
  flower: Graphics
  greyBook: Graphics
  overlay: Graphics
}

function drawRect(g: Graphics, x: number, y: number, w: number, h: number, color: number) {
  g.rect(x, y, w, h).fill(color)
}

function setupScene(app: Application): SceneState {
  // Room background
  const room = new Graphics()
  drawRect(room, 0, 0, W, H, ROOM_BG)
  // Floor
  drawRect(room, 0, 150, W, 30, 0x352f2a)
  // Baseboard
  drawRect(room, 0, 148, W, 2, 0x4a4238)
  app.stage.addChild(room)

  // Window (upper left)
  const window = new Graphics()
  drawRect(window, 20, 20, 40, 50, WINDOW_NIGHT)
  // Window frame
  drawRect(window, 18, 18, 44, 2, 0x4a4238)
  drawRect(window, 18, 70, 44, 2, 0x4a4238)
  drawRect(window, 18, 18, 2, 54, 0x4a4238)
  drawRect(window, 60, 18, 2, 54, 0x4a4238)
  drawRect(window, 39, 18, 2, 54, 0x4a4238)
  app.stage.addChild(window)

  // Bookshelf (right side)
  const bookshelf = new Graphics()
  drawRect(bookshelf, 240, 20, 60, 130, BOOKSHELF)
  // Shelf dividers
  for (let i = 0; i < 4; i++) {
    drawRect(bookshelf, 240, 50 + i * 30, 60, 2, 0x4a3a2a)
  }
  // Books
  for (let row = 0; row < 4; row++) {
    for (let b = 0; b < 6; b++) {
      const color = BOOK_COLORS[(row * 6 + b) % BOOK_COLORS.length]
      const bw = 6 + (b % 3) * 2
      drawRect(bookshelf, 244 + b * 9, 22 + row * 30, bw, 26, color)
    }
  }
  bookshelf.alpha = 0.3
  app.stage.addChild(bookshelf)

  // Desk
  const desk = new Graphics()
  drawRect(desk, 80, 115, 130, 8, DESK)
  // Desk legs
  drawRect(desk, 85, 123, 4, 27, 0x5a4d3d)
  drawRect(desk, 201, 123, 4, 27, 0x5a4d3d)
  app.stage.addChild(desk)

  // Typewriter
  const typewriter = new Graphics()
  drawRect(typewriter, 100, 98, 32, 17, TYPEWRITER)
  // Paper in typewriter
  drawRect(typewriter, 106, 88, 20, 12, PAPER)
  // Keys
  drawRect(typewriter, 102, 110, 28, 4, 0x3a3632)
  app.stage.addChild(typewriter)

  // Paper stack
  const papers = new Graphics()
  papers.position.set(160, 100)
  app.stage.addChild(papers)

  // Desk lamp
  const lamp = new Graphics()
  drawRect(lamp, 195, 90, 6, 25, 0x6b5d4d)
  drawRect(lamp, 188, 86, 16, 6, 0x8b7d6d)
  app.stage.addChild(lamp)

  // Lamp glow (circle overlay)
  const lampGlow = new Graphics()
  lampGlow.circle(198, 100, 60).fill({ color: LAMP_GLOW, alpha: 0.12 })
  lampGlow.circle(198, 100, 35).fill({ color: LAMP_GLOW, alpha: 0.08 })
  lampGlow.alpha = 0
  app.stage.addChild(lampGlow)

  // Liu Yiliang (seated)
  const liu = new Graphics()
  // Head
  drawRect(liu, 3, 0, 10, 10, 0x5a5248)
  // Glasses
  drawRect(liu, 5, 3, 3, 2, 0x8a8a8a)
  drawRect(liu, 9, 3, 3, 2, 0x8a8a8a)
  // Body (seated posture)
  drawRect(liu, 0, 10, 14, 14, 0x4a4a42)
  // Arms forward (typing)
  drawRect(liu, -4, 16, 6, 3, 0x4a4a42)
  drawRect(liu, 14, 16, 6, 3, 0x4a4a42)
  liu.position.set(110, 80)
  liu.alpha = 0
  app.stage.addChild(liu)

  // Flower (曇花)
  const flower = new Graphics()
  // Pot
  drawRect(flower, 0, 10, 10, 8, 0x6a5040)
  // Stem
  drawRect(flower, 4, 2, 2, 10, 0x5a7a4a)
  flower.position.set(80, 97)
  app.stage.addChild(flower)

  // Grey book (蔣經國傳)
  const greyBook = new Graphics()
  drawRect(greyBook, 0, 0, 8, 10, 0x9a9a9a)
  greyBook.position.set(140, 103)
  greyBook.alpha = 0
  app.stage.addChild(greyBook)

  // Overlay for final fade
  const overlay = new Graphics()
  overlay.rect(0, 0, W, H).fill(0x000000)
  overlay.alpha = 0
  app.stage.addChild(overlay)

  return { room, window, bookshelf, desk, typewriter, papers, lamp, lampGlow, liu, flower, greyBook, overlay }
}

function updateScene(state: SceneState, p: number) {
  const { window: win, bookshelf, lampGlow, liu, papers, flower, greyBook, overlay } = state

  // Draw paper stack based on progress
  papers.clear()
  const numPapers = p < 0.40 ? 0 : Math.min(Math.floor((p - 0.40) * 30), 8)
  for (let i = 0; i < numPapers; i++) {
    const offset = (i % 3) * 0.5
    papers.rect(offset, -i * 1.5, 22, 1.5).fill({ color: PAPER, alpha: 0.8 })
  }

  // 0.00-0.20: Dark room, lamp turns on
  if (p < 0.20) {
    const t = p / 0.20
    lampGlow.alpha = t * 0.8
    liu.alpha = 0
    bookshelf.alpha = 0.2 + t * 0.1
    overlay.alpha = 0

    // Typewriter text - none yet
  }

  // 0.20-0.40: Liu appears, typing animation
  else if (p < 0.40) {
    const t = (p - 0.20) / 0.20
    lampGlow.alpha = 0.8
    liu.alpha = Math.min(t * 2, 1)

    // Typing animation - slight hand movement
    const typingOffset = Math.sin(t * Math.PI * 12) * 1
    liu.position.set(110 + typingOffset * 0.3, 80)

    bookshelf.alpha = 0.3
    overlay.alpha = 0
  }

  // 0.40-0.55: Bookshelf illuminated, papers stack
  else if (p < 0.55) {
    const t = (p - 0.40) / 0.15
    lampGlow.alpha = 0.8
    liu.alpha = 1
    bookshelf.alpha = 0.3 + t * 0.5

    // Still typing
    const typingOffset = Math.sin(p * Math.PI * 20) * 1
    liu.position.set(110 + typingOffset * 0.3, 80)

    overlay.alpha = 0
  }

  // 0.55-0.70: Night to dawn transition
  else if (p < 0.70) {
    const t = (p - 0.55) / 0.15
    lampGlow.alpha = 0.8
    liu.alpha = 1
    bookshelf.alpha = 0.8

    // Window transitions from night to dawn
    win.clear()
    const r = Math.round(0x2d + (0x4a - 0x2d) * t)
    const g = Math.round(0x3a + (0x5a - 0x3a) * t)
    const b = Math.round(0x4a + (0x6a - 0x4a) * t)
    const winColor = (r << 16) | (g << 8) | b
    win.rect(20, 20, 40, 50).fill(winColor)
    // Window frame
    win.rect(18, 18, 44, 2).fill(0x4a4238)
    win.rect(18, 70, 44, 2).fill(0x4a4238)
    win.rect(18, 18, 2, 54).fill(0x4a4238)
    win.rect(60, 18, 2, 54).fill(0x4a4238)
    win.rect(39, 18, 2, 54).fill(0x4a4238)

    // Still typing
    const typingOffset = Math.sin(p * Math.PI * 20) * 1
    liu.position.set(110 + typingOffset * 0.3, 80)

    overlay.alpha = 0
  }

  // 0.70-0.85: Flower blooms, grey book appears
  else if (p < 0.85) {
    const t = (p - 0.70) / 0.15
    lampGlow.alpha = 0.8
    liu.alpha = 1
    bookshelf.alpha = 0.8

    // Flower blooming animation
    flower.clear()
    // Pot
    flower.rect(0, 10, 10, 8).fill(0x6a5040)
    // Stem
    flower.rect(4, 2, 2, 10).fill(0x5a7a4a)
    // Petals bloom
    if (t > 0) {
      const petalSize = Math.min(t, 1) * 4
      flower.circle(5, 1, petalSize).fill({ color: FLOWER, alpha: Math.min(t * 1.5, 0.9) })
      if (t > 0.3) {
        flower.circle(3, -1, petalSize * 0.7).fill({ color: FLOWER, alpha: Math.min((t - 0.3) * 2, 0.7) })
        flower.circle(7, -1, petalSize * 0.7).fill({ color: FLOWER, alpha: Math.min((t - 0.3) * 2, 0.7) })
      }
    }

    // Grey book fades in
    greyBook.alpha = Math.min(t * 2, 1)

    // Dawn window
    win.clear()
    win.rect(20, 20, 40, 50).fill(WINDOW_DAWN)
    win.rect(18, 18, 44, 2).fill(0x4a4238)
    win.rect(18, 70, 44, 2).fill(0x4a4238)
    win.rect(18, 18, 2, 54).fill(0x4a4238)
    win.rect(60, 18, 2, 54).fill(0x4a4238)
    win.rect(39, 18, 2, 54).fill(0x4a4238)

    overlay.alpha = 0
  }

  // 0.85-1.00: Lamp fades, only window light remains
  else {
    const t = (p - 0.85) / 0.15
    lampGlow.alpha = 0.8 * (1 - t)
    liu.alpha = 1 - t * 0.6
    bookshelf.alpha = 0.8 * (1 - t * 0.7)
    greyBook.alpha = 1 - t * 0.5

    // Window stays dawn
    win.clear()
    win.rect(20, 20, 40, 50).fill(WINDOW_DAWN)
    win.rect(18, 18, 44, 2).fill(0x4a4238)
    win.rect(18, 70, 44, 2).fill(0x4a4238)
    win.rect(18, 18, 2, 54).fill(0x4a4238)
    win.rect(60, 18, 2, 54).fill(0x4a4238)
    win.rect(39, 18, 2, 54).fill(0x4a4238)

    // Subtle darkening
    overlay.alpha = t * 0.3
  }
}

interface TypewriterStudySceneProps {
  progress?: number
  className?: string
}

export default function TypewriterStudyScene({ progress = 0, className }: TypewriterStudySceneProps) {
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
      backgroundColor={0x2a2520}
      progress={progress}
      onSetup={handleSetup}
      onUpdate={handleUpdate}
      className={className}
    />
  )
}
