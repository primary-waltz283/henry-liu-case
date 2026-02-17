import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'

/**
 * 第四章：鋤奸
 * 時間：1984.08-10.15
 * 最緊密的一章，任務策劃到執行。
 */
export default function Chapter04() {
  return (
    <article id="chapter-04">
      <ChapterTitle chapter={4} title="鋤奸" stamp="鋤奸" />

      {/* 第一個巧合：白景瑞的飯局 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 敘事內容將從 data/chapters/ch04.json 引入 */}
            {/* 矛盾：wang-chen-first-meeting */}
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: mission-clock */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            {/* TODO: Task 4.7 — MissionClockScene pixel art */}
            <div className="text-center text-neutral">
              <p className="text-sm">[mission-clock pixel art scene]</p>
              <p className="text-xs">progress: {progress.toFixed(2)}</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* Infographic: 48-hour-timeline */}
      <ScrollSection minHeight="150vh">
        {(_progress) => (
          <div className="sticky top-0 flex min-h-screen items-center justify-center">
            {/* TODO: Task 4.3 — FortyEightHourTimeline */}
            <div className="text-center text-neutral">
              <p className="text-sm">[48-hour-timeline infographic]</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* Infographic: contradiction-table */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-5xl px-4 py-16">
            {/* TODO: Task 4.5 — ContradictionTable */}
            <div className="text-center text-neutral">
              <p className="text-sm">[contradiction-table infographic]</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 第三個巧合、回到序章 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 矛盾：mission-cancellation */}
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
