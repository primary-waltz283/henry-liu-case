interface ChapterTitleProps {
  /** Chapter number (0 = prologue) */
  chapter: number
  /** Chapter title */
  title: string
  /** Optional stamp text (e.g. "極機密", "鋤奸") */
  stamp?: string
  /** Additional CSS classes */
  className?: string
}

const CHAPTER_LABELS: Record<number, string> = {
  0: '序章',
  1: '第壹章',
  2: '第貳章',
  3: '第參章',
  4: '第肆章',
  5: '第伍章',
  6: '第陸章',
  7: '第柒章',
}

/**
 * Chapter title with optional classified stamp overlay.
 */
export default function ChapterTitle({
  chapter,
  title,
  stamp,
  className = '',
}: ChapterTitleProps) {
  const label = CHAPTER_LABELS[chapter] ?? `第${chapter}章`

  return (
    <header
      className={`relative py-12 text-center ${className}`}
      aria-label={`${label}：${title}`}
    >
      {stamp && (
        <div className="stamp mb-4 text-lg" aria-hidden="true">{stamp}</div>
      )}
      <p className="text-sm tracking-widest text-neutral uppercase">
        {label}
      </p>
      <h2 className="mt-2 font-serif text-3xl font-bold text-ink-900 md:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-6 h-px w-24 bg-paper-300" aria-hidden="true" />
    </header>
  )
}
