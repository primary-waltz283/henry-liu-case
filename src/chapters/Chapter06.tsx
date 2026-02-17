import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'

/**
 * 第六章：審判與餘波
 * 時間：1985-1991
 * 台美審判、蔣孝武之謎、董桂森獄中身亡。
 */
export default function Chapter06() {
  return (
    <article id="chapter-06">
      <ChapterTitle chapter={6} title="審判與餘波" />

      {/* 美國調查團赴台、台灣軍事審判 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 敘事內容將從 data/chapters/ch06.json 引入 */}
            {/* 矛盾：trial-political-performance */}
          </div>
        )}
      </ScrollSection>

      {/* Infographic: dual-trial-comparison */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-4xl px-4 py-16">
            {/* TODO: Task 4.6 — DualTrialComparison */}
            <div className="text-center text-neutral">
              <p className="text-sm">[dual-trial-comparison infographic]</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 蔣孝武之謎、美國審判 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 矛盾：chiang-hsiao-wu-role, chiang-hsiao-wu-or-hsiao-yung */}
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: prison-fade */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            {/* TODO: Task 4.7 — PrisonFadeScene pixel art */}
            <div className="text-center text-neutral">
              <p className="text-sm">[prison-fade pixel art scene]</p>
              <p className="text-xs">progress: {progress.toFixed(2)}</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 董桂森之死 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 矛盾：dong-prison-death */}
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
