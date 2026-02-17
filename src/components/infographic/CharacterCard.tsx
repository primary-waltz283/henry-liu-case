import type { Character } from '../../data/characters'
import { groupMeta } from '../../data/characters'

interface CharacterCardProps {
  character: Character
  onClose: () => void
}

/**
 * Dossier-style detail card for a single character.
 * Shown when a node is clicked in the CharacterMap.
 */
export default function CharacterCard({ character, onClose }: CharacterCardProps) {
  const meta = groupMeta[character.group]

  return (
    <div className="paper-texture border border-paper-300 bg-paper-100 p-5 shadow-md max-w-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl font-bold text-ink-900">
            {character.nameCht}
          </h3>
          {character.nameEng && (
            <p className="text-sm text-neutral">{character.nameEng}</p>
          )}
          {character.aliases.length > 0 && (
            <p className="text-xs text-neutral mt-0.5">
              別名：{character.aliases.join('、')}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-neutral hover:text-ink-800 text-lg leading-none"
          aria-label="關閉"
        >
          &times;
        </button>
      </div>

      {/* Group badge */}
      <span
        className="mt-2 inline-block rounded-sm px-2 py-0.5 text-xs font-bold"
        style={{ color: meta.color, backgroundColor: meta.bgColor }}
      >
        {meta.label}
      </span>

      {/* Role */}
      <p className="mt-2 text-sm font-medium text-ink-800">{character.role}</p>

      {/* Life dates */}
      {(character.birth || character.death) && (
        <p className="mt-1 text-xs text-neutral">
          {character.birth ?? '?'} — {character.death ?? '存'}
        </p>
      )}

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-ink-700">
        {character.description}
      </p>

      {/* Relationships */}
      {character.relationships.length > 0 && (
        <div className="mt-3 border-t border-paper-300 pt-3">
          <p className="text-xs font-bold text-neutral mb-1">關係</p>
          <ul className="space-y-1">
            {character.relationships.map((r) => (
              <li key={`${r.target}-${r.type}`} className="text-xs text-ink-700">
                <span className="text-ink-800 font-medium">{r.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
