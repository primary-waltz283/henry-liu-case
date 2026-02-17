import type { TimelineEvent as TimelineEventData } from '../../data/timeline'

interface TimelineEventProps {
  event: TimelineEventData
  /** Whether this event has been revealed by scroll progress */
  revealed: boolean
}

const significanceStyles = {
  background: 'border-paper-300',
  'turning-point': 'border-evidence-gold',
  critical: 'border-stamp-red',
} as const

const significanceDotStyles = {
  background: 'bg-paper-300',
  'turning-point': 'bg-evidence-gold',
  critical: 'bg-stamp-red',
} as const

/**
 * A single event node in the 48-hour timeline.
 * Shows date/time, title, description, and optional multi-perspective quotes.
 */
export default function TimelineEvent({ event, revealed }: TimelineEventProps) {
  return (
    <div
      className={`relative pl-8 transition-opacity duration-700 ${
        revealed ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-1 h-3 w-3 rounded-full border-2 ${significanceDotStyles[event.significance]} ${significanceStyles[event.significance]}`}
      />

      {/* Date label */}
      <p className="text-xs font-mono text-neutral whitespace-pre-line">
        {event.dateLabel}
        {event.time && (
          <span className="ml-1 text-stamp-red font-bold">{event.time}</span>
        )}
      </p>

      {/* Title */}
      <h4
        className={`mt-1 font-serif text-lg font-bold ${
          event.significance === 'critical' ? 'text-ink-900' : 'text-ink-800'
        } ${event.isContradiction ? 'text-stamp-red' : ''}`}
      >
        {event.title}
        {event.isContradiction && (
          <span className="ml-2 text-xs font-bold text-stamp-red border border-stamp-red px-1 py-0.5 align-middle">
            矛盾
          </span>
        )}
      </h4>

      {/* Description */}
      <p className="mt-1 text-sm text-ink-700 leading-relaxed">
        {event.description}
      </p>

      {/* Perspectives */}
      {event.perspectives && event.perspectives.length > 0 && (
        <div className="mt-3 space-y-2">
          {event.perspectives.map((p) => (
            <div
              key={p.speaker}
              className="border-l-2 border-evidence-gold pl-3"
            >
              <p className="text-xs font-bold text-neutral">{p.speaker}</p>
              <p className="mt-0.5 font-mono text-sm text-ink-700">
                {p.quote}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Sources */}
      <p className="mt-2 text-xs text-neutral opacity-70">
        {event.sources.map((s, i) => (
          <span key={s}>
            {i > 0 && '；'}（來源：{s}）
          </span>
        ))}
      </p>
    </div>
  )
}
