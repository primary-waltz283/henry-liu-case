import TimelineEvent from './TimelineEvent'
import { fortyEightHourEvents } from '../../data/timeline'

interface FortyEightHourTimelineProps {
  /** Scroll progress (0-1) drives the reveal animation */
  progress: number
}

/**
 * 48-hour timeline infographic for Chapter 4.
 * Vertical axis showing events from Oct 13-15, 1984,
 * revealing progressively as the user scrolls.
 */
export default function FortyEightHourTimeline({
  progress,
}: FortyEightHourTimelineProps) {
  const totalEvents = fortyEightHourEvents.length
  // Each event reveals at an evenly-spaced progress threshold,
  // with the first appearing at ~10% and the last by ~90%.
  const revealedCount = Math.floor(progress * (totalEvents + 1))

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="text-xs font-mono text-neutral tracking-widest">
          1984 年 10 月 13 日 — 15 日
        </p>
        <h3 className="mt-2 font-serif text-2xl font-bold text-ink-900">
          48 小時
        </h3>
        <p className="mt-1 text-sm text-neutral">
          從殺手集結到三聲槍響
        </p>
      </div>

      {/* Timeline axis + events */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[5px] top-0 w-0.5 bg-paper-300 transition-all duration-500"
          style={{ height: `${Math.min(progress * 110, 100)}%` }}
        />

        {/* Events */}
        <div className="space-y-8">
          {fortyEightHourEvents.map((event, i) => (
            <TimelineEvent
              key={`${event.date}-${event.title}`}
              event={event}
              revealed={i < revealedCount}
            />
          ))}
        </div>
      </div>

      {/* Time-zone paradox footer — appears last */}
      <div
        className={`mt-10 border-t-2 border-stamp-red pt-4 text-center transition-opacity duration-1000 ${
          progress > 0.92 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="font-serif text-sm text-stamp-red font-bold">
          台北與舊金山之間的 16 小時時差，
        </p>
        <p className="font-serif text-sm text-stamp-red font-bold">
          讓「取消」與「完成」同時抵達。
        </p>
      </div>
    </div>
  )
}
