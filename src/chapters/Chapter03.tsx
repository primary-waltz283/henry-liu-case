import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'

/**
 * 第三章：竹林裡的兄弟
 * 時間：1956-1984
 * 竹聯幫的崛起、幫派與情治的交集。
 */
export default function Chapter03() {
  return (
    <article id="chapter-03">
      <ChapterTitle chapter={3} title="竹林裡的兄弟" />

      {/* 竹林路上的少年、陳啟禮、吳敦、董桂森 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 敘事內容將從 data/chapters/ch03.json 引入 */}
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: bamboo-meeting */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            {/* TODO: Task 4.7 — BambooMeetingScene pixel art */}
            <div className="text-center text-neutral">
              <p className="text-sm">[bamboo-meeting pixel art scene]</p>
              <p className="text-xs">progress: {progress.toFixed(2)}</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 國黨招募黑道 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 白景瑞飯局、國防部座談會 */}
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
