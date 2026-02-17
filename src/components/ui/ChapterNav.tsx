import { useState, useEffect } from 'react'

const CHAPTERS = [
  { id: 'prologue', label: '序', title: '車庫裡的槍聲' },
  { id: 'chapter-01', label: '壹', title: '龍的爪牙' },
  { id: 'chapter-02', label: '貳', title: '江南其人' },
  { id: 'chapter-03', label: '參', title: '竹林裡的兄弟' },
  { id: 'chapter-04', label: '肆', title: '鋤奸' },
  { id: 'chapter-05', label: '伍', title: '紙包不住火' },
  { id: 'chapter-06', label: '陸', title: '審判與餘波' },
  { id: 'chapter-07', label: '柒', title: '解嚴之路' },
  { id: 'sources', label: '源', title: '資料來源' },
  { id: 'afterword', label: '記', title: '後記' },
  { id: 'guestbook', label: '言', title: '留言板' },
]

/**
 * Floating chapter navigation menu.
 * Shows a hamburger button that expands into a chapter list overlay.
 * Highlights the currently visible chapter based on scroll position.
 */
export default function ChapterNav() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  // Track which chapter is currently in view
  useEffect(() => {
    const ids = CHAPTERS.map((c) => c.id)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const handleClick = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav aria-label="章節導覽" className="fixed right-4 top-4 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-paper-300 bg-paper-50/95 text-ink-800 shadow-md backdrop-blur-sm transition-colors hover:bg-paper-200"
        aria-expanded={open}
        aria-label={open ? '關閉章節選單' : '開啟章節選單'}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Chapter list overlay */}
      {open && (
        <ul className="absolute right-0 top-12 w-56 rounded-lg border border-paper-300 bg-paper-50/95 py-2 shadow-lg backdrop-blur-sm">
          {CHAPTERS.map((ch) => (
            <li key={ch.id}>
              <button
                onClick={() => handleClick(ch.id)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-paper-200 ${
                  activeId === ch.id
                    ? 'font-bold text-stamp-red'
                    : 'text-ink-700'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                    activeId === ch.id
                      ? 'bg-stamp-red text-paper-50'
                      : 'bg-paper-200 text-ink-700'
                  }`}
                >
                  {ch.label}
                </span>
                <span className="truncate">{ch.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
