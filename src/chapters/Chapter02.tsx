import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'

/**
 * 第二章：江南其人
 * 時間：1932-1984
 * 劉宜良的雙面人生：記者、作家、線人？
 */
export default function Chapter02() {
  return (
    <article id="chapter-02">
      <ChapterTitle chapter={2} title="江南其人" />

      {/* 靖江少年、從廣播到寫作、美國夢 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 敘事內容將從 data/chapters/ch02.json 引入 */}
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: typewriter-study */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            {/* TODO: Task 4.7 — TypewriterStudyScene pixel art */}
            <div className="text-center text-neutral">
              <p className="text-sm">[typewriter-study pixel art scene]</p>
              <p className="text-xs">progress: {progress.toFixed(2)}</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 暗殺動機之謎、三重身份 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 矛盾：assassination-motive, liu-identity, liu-codename */}
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
